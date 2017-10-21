import firebase from 'firebase'
import * as _ from 'lodash'

export default {
  state: {
    loadedPosts: [],
    loadedUserPosts: []
  },
  getters: {
    loadedPosts (state) {
      return state.loadedPosts.sort((postA, postB) => {
        postA = postA.timestamp
        postB = postB.timestamp
        if (postA < postB) {
          return 1
        } else if (postA === postB) {
          return 0
        } else {
          return -1
        }
      })
    },
    loadedSinglePost (state) {
      return (postId) => {
        return state.loadedPosts.find(post => post.id === postId)
      }
    },
    loadedUserPosts (state) {
      return (userId) => {
        return state.loadedPosts.find(post => post.creatorId === userId)
      }
    },
    featurePosts (state, getters) {
      return getters.loadedPosts.slice(0, 6)
    }
  },
  mutations: {
    'LOADED_POSTS': (state) => {
      return state.loadedPosts
    },
    'SET_LOADED_POSTS': (state, payload) => {
      return state.loadedPosts = payload
    },
    'CREATE_POST': (state, payload) => {
      return state.loadedPosts.push(payload)
    },
    'UPDATE_POST': (state, payload) => {
      const post = state.loadedPosts.find(post => post.id === payload.id)
      if (payload.title) {
        post.title = payload.title
      }
      if (payload.price) {
        post.price = payload.price
      }
      if (payload.currency) {
        post.currency = payload.currency
      }
      if (payload.categories) {
        post.categories = payload.categories
      }
      if (payload.description) {
        post.description = payload.description
      }
      if (payload.details) {
        post.details = payload.details
      }
      if (payload.imageURLs) {
        post.imageURLs = payload.imageURLs
      }
      return post
    }
  },
  actions: {
    loadPosts ({commit}) {
      commit('SET_LOADING', true)
      firebase.database().ref('posts')
          .once('value')
          .then(snap => {
            const posts = []
            const obj = snap.val()
            for (let key in obj) {
              posts.push({
                id: key,
                title: obj[key].title,
                price: obj[key].price,
                timestamp: obj[key].timestamp,
                description: obj[key].description,
                details: obj[key].details,
                currency: obj[key].currency,
                imageURLs: obj[key].imageURLs,
                creatorId: obj[key].creatorId,
                creatorAvatar: obj[key].creatorAvatar,
                creatorName: obj[key].creatorName,
                creatorPhoneNumber: obj[key].creatorPhoneNumber,
                creatorBusiness: obj[key].creatorBusiness,
              })
            }
            commit('SET_LOADED_POSTS', posts)
            commit('SET_LOADING', false)
          })
          .catch(error => {
            commit('SET_LOADING', false)
          })
    },
    createPost ({commit, getters}, payload) {
      commit('SET_LOADING', true)
      const user = getters.user
      let post = {
        title: payload.title,
        price: payload.price,
        currency: payload.currency,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        description: payload.description,
        details: payload.details,
        creatorId: user.id,
        creatorAvatar: user.avatar ? user.avatar : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
        creatorName: `${user.firstname} ${user.lastname}`,
        creatorPhoneNumber: user.phoneNumber,
        creatorBusiness: user.business ? user.business : ''
      }
      let imageURLs = []
      let key
      firebase.database().ref('posts')
          .push(post)
          .then(data => {
            key = data.key
            return key
          })
          .then(key => {
            let downloadedURls
            let imagesIndex = _.range(payload.images.length)
            _.each(imagesIndex, (idx) => {
              var randImage = payload.images[idx]
              var storageRef = firebase.storage().ref('posts')
              var uploadTask = storageRef.child(`${key}/${randImage.name}`).put(randImage)

              uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot) => {
                  //
                },
                (error) => {
                },
                () => {
                  var downloadURL = uploadTask.snapshot.downloadURL
                  downloadedURls = firebase.database().ref(`/posts/${key}/imageURLs`).push(downloadURL)
                })
            })
            return downloadedURls
          })
          .then(filesData =>  {
            const data = filesData.val()
            imageURLs.push(data.imageURLs)
          })
          .then(() => {
            commit('CREATE_POST', {
              ...post,
              imageURLs: imageURLs,
              id: key,
            })
            commit('SET_LOADING', false)
          })
          .catch(error => {
            commit('SET_LOADING', false)
          })
    },
    updatePost: ({commit}, payload) => {
      commit('SET_LOADING', true)
      const updateObj = {}
      // updateObj.timestamp = firebase.database.ServerValue.TIMESTAMP
      if(payload.title) {
        updateObj.title = payload.title
      }
      if(payload.price) {
        updateObj.price = payload.price
      }
      if(payload.description) {
        updateObj.description = payload.description
      }
      if(payload.details) {
        updateObj.details = payload.details
      }
      if(payload.imageURLs) {
        updateObj.imageURLs = payload.imageURLs
      }
      firebase.database().ref('posts').child(payload.id)
          .update(updateObj)
          .then( _=> {
            commit('UPDATE_POST', payload)
            commit('SET_LOADING', false)
          })
          .catch(err => {
          })
    }
  }
}
