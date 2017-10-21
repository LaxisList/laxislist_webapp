import firebase from 'firebase'

export default {
  state: {
    user: null,
  },
  getters: {
    user: state => state.user
  },
  mutations: {
    'SET_USER': (state, payload) => {
      return state.user = payload
    },
    'SAVE_WISH': (state, payload) => {
      const id = payload.id
      if (state.user.registeredWish.findIndex(post => post.id === id) >= 0) {
        return
      }
      state.user.registeredWish.unshift(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    'UNSAVE_WISH': (state, payload) => {
      const registeredWish = state.user.registeredWish
      registeredWish.splice(registeredWish.findIndex(post => post.id === payload), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },
  },
  actions: {
    fetchUserData: ({commit, getters}) => {
      commit('SET_LOADING', true)
      firebase.database().ref(`/users/${getters.user.id}/wish/`)
        .once('value')
        .then(snap => {
          const dataPairs = snap.val()
          let registeredWish = []
          let swappedPairs = {}
          for (let key in dataPairs) {
            registeredWish.push(dataPairs[key])
            swappedPairs[dataPairs[key]] = key
          }
          const updateUser = {
            id: getters.user.id,
            registeredWish: registeredWish,
            fbKeys: swappedPairs
          }
          commit('SET_USER', updateUser)
          commit('SET_LOADING', false)
        })
        .catch(error => {
          commit('SET_ERROR', error)
          commit('SET_LOADING', false)
        })
    },
    saveWish: ({commit, getters}, payload) => { // payload contain eventId
      const user = getters.user
      commit('SET_LOADING', true)
      firebase.database().ref(`/users/${user.id}`).child('/wish/').push(payload)
        .then(data => {
          commit('SET_LOADING', false)
          commit('SAVE_WISH', {id: payload, fbKey: data.key})
        })
        .catch(error => {
          commit('SET_LOADING', false)
          commit('SET_ERROR', error)
        })
    },
    unsaveWish: ({commit, getters}, payload) => {
      commit('SET_LOADING', true)
      const user = getters.user
      if(!user.fbKeys) {
        return
      }
      const fbKey = user.fbKeys[payload] // payload takes eventId
      firebase.database().ref(`/users/${user.id}/wish`).child(fbKey).remove()
        .then(() => {
          commit('SET_LOADING', false)
          commit('UNSAVE_WISH', payload)
        })
        .catch(error => {
          commit('SET_LOADING', false)
          commit('SET_ERROR', error)
        })
    },
    userUpdateProfile ({commit, getters}, payload) {
      commit('SET_LOADING', true)
      commit('CLEAR_ERROR')
      const user = getters.user
      const userProfile = {}
      if (payload.lastname) {
        userProfile.lastname = payload.lastname
      }
      if (payload.firstname) {
        userProfile.firstname = payload.firstname
      }
      if (payload.phoneNumber) {
        userProfile.phoneNumber = payload.phoneNumber
      }
      if (payload.gender) {
        userProfile.gender = payload.gender
      }
      firebase.database().ref('users').child(user.id).update(userProfile)
        .then(() => {
          commit('SET_LOADING', false)
          commit('SET_USER', userProfile)
        })
        .catch(error => {
          commit('SET_LOADING', false)
        })
    },
    fetchUserProfile: ({commit, getters}) => {
      const user = getters.user
      firebase.database().ref(`/users/${user.id}`).once('value')
        .then(snap => {
          const data = snap.val()
          let user = {
            id: snap.key,
            registeredWish: [],
            fbKeys: {},
            email: data.email,
            avatar: data.avatar,
            firstname: data.firstname,
            lastname: data.lastname,
            phoneNumber: data.phoneNumber,
            business: data.business,
            timestamp: data.timestamp,
            isDeleted: data.isDeleted,
            gender: data.gender
          }
          commit('SET_USER', user)
        })
    },
    fetchUserMessages: ({commit, getters}) => {
      commit('SET_LOADING', true)
      const user = getters.user
      firebase.database().ref(`/messages/${user.id}`)
              .once('value')
              .then(snap => {
                const data = snap.val()
                let messages = []
                for (let key in data) {
                  messages.push({
                    id: key,
                    postId: data[key].postId,
                    postTitle: data[key].postTitle,
                    postPrice: data[key].postPrice,
                    postCurrency: data[key].postCurrency,
                    content: data[key].content,
                    timestamp: data[key].timestamp,
                    creatorId: data[key].sender.id,
                    creatorAvatar: data[key].sender.avatar,
                    creatorName: data[key].sender.name,
                    creatorPhoneNumber: data[key].sender.phoneNumber
                  })
                }
                commit('LOADED_MESSAGES', messages)
                commit('SET_LOADING', false)
              })
              .catch(error => {
                console.error(error)
                commit('SET_LOADING', false)
              })
    },
    autoSignIn: ({commit}, payload) => {
      commit('SET_USER', {
        id: payload.uid,
        registeredWish: [],
        fbKeys: {},
      })
    },
    setUserProfile ({commit, getters}, payload) {
        commit('SET_LOADING', true)
        const user = getters.user
        const userProfile = {}
        userProfile.id = user.id
        userProfile.lastname = payload.lastname
        userProfile.phoneNumber = payload.phoneNumber
        userProfile.timestamp = getters.timestamp
        userProfile.isDeleted = false
        // userProfile.country = getters.userLocation.country
        // userProfile.city = getters.userLocation.city
        userProfile.email = payload.email

        if (payload.firstname) {
          userProfile.firstname = payload.firstname
        }
        if (payload.gender) {
          userProfile.gender = payload.gender
        }
        if (payload.business) {
          userProfile.business = payload.business
        }
        let imageUrl
        firebase.database().ref('users').child(user.id)
          .set(userProfile)
          .then(() => {
            const filename = payload.image.name
            const ext = filename.slice(filename.lastIndexOf('.'))
            return firebase.storage().ref(`users/${user.id}.${ext}`).put(payload.image)
          })
          .then(fileData => {
            imageUrl = fileData.metadata.downloadURLs[0]
            return firebase.database().ref('users').child(user.id).update({avatar: imageUrl})
          })
          .then(() => {
            commit('SET_USER', {
              ...userProfile,
              avatar: imageUrl
            })
            commit('SET_LOADING', false)
          })
          .catch(error => {
            commit('SET_LOADING', false)
            commit('SET_ERROR', error)
          })
    },
    signUserUp ({commit}, payload) {
      commit('SET_LOADING', true)
      commit('CLEAR_ERROR')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('SET_LOADING', false)
          const newUser = {
            id: user.uid,
            registeredWish: [],
            fbKeys: {}
          }
          commit('SET_USER', newUser)
        })
        .catch(error => {
          commit('SET_LOADING', false)
          let errorCode = ''
          switch (error.code) {
            case 'auth/weak-password':
              errorCode = 'Le mot de passe doit avoir au-moins 6 charactères.'
              break;
            case 'auth/email-already-in-use':
              errorCode = 'L\'adresse email existe déjà sur un autre compte.'
              break;
            case 'auth/invalid-email':
              errorCode = 'L\'adresse email n\'est pas valide.'
              break;
            case 'auth/network-request-failed':
              errorCode = 'Vérifiez votre connexion internet.'
            default:
              errorCode = error.code
          }
          commit('SET_ERROR', errorCode)
        })
    },
    signInWithGoogle: ({commit}) => {
      let provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then(user => {
          commit('SET_LOADING', false)
          const newUser = {
            id: user.uid,
            registeredWish: [],
            fbKeys: {}
          }
          commit('SET_USER', newUser)
        })
    },
    signInWithFacebook: ({commit}) => {
      let provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then(user => {
          commit('SET_LOADING', false)
          const newUser = {
            id: user.uid,
            registeredWish: [],
            fbKeys: {}
          }
          commit('SET_USER', newUser)
        })
    },
    signUserIn: ({commit, getters}, payload) => {
      commit('SET_LOADING', true)
      commit('CLEAR_ERROR')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('SET_LOADING', false)
          const newUser = {
            id: user.uid,
            registeredWish: [],
            fbKeys: {}
          }
          commit('SET_USER', newUser)
        })
        .catch(error => {
          commit('SET_LOADING', false)
          let errorCode = ''
          switch (error.code) {
              case 'auth/user-not-found':
                errorCode = "Il n'y a pas d'utilisateur correspondant à cette adresse email."
                break;
              case 'auth/wrong-password':
                errorCode = "Le mot de passe est invalide pour cette addresse email"
                break;
              case 'auth/invalid-email':
                errorCode = "L'adresse email n'est pas valide."
                break;
              case 'auth/network-request-failed':
                errorCode = 'Vérifiez votre connexion internet.'
              default:
                errorCode = error.code
            }
          commit('SET_ERROR', errorCode)
      })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('SET_USER', null)
    }
  }
}
