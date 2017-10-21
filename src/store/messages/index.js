import firebase from 'firebase'

export default {
  state: {
    messages: []
  },
  getters: {
    messages: (state) => {
      if (state.messages) {
        return state.messages.sort((messageA, messageB) => {
          messageA: messageA.timestamp
          messageB: messageB.timestamp
          if (messageA < messageB) {
            return 1
          } else if (messageA === messageB) {
            return 0
          } else {
            return -1
          }
        })
      }
    }
  },
  mutations: {
    'NEW_MESSAGE': (state, payload) => {
      return state.messages.unshift(payload)
    },
    'LOADED_MESSAGES': (state, payload) => {
      return state.messages = payload
    }
  },
  actions: {
    sendMessageToCreator: ({commit, getters}, payload) => {
      commit('SET_LOADING', true)
      const user = getters.user

      const textMessage = {
        postId: payload.postId,
        postTitle: payload.postTitle,
        postPrice: payload.postPrice,
        postCurrency: payload.postCurrency,
        content: payload.content,
        timestamp: getters.timestamp,
        sender: {
          id: user.id,
          avatar: user.avatar,
          name: `${user.firstname} ${user.lastname}`,
          phoneNumber: user.phoneNumber
        },
        recipient: {
          id: payload.creatorId,
          name: payload.creatorName,
          phoneNumber: payload.creatorPhoneNumber
        },
      }
      firebase.database().ref(`/messages/${payload.creatorId}`).push(textMessage)
        .then(snap => {
          const data = snap.val()
          const newMessage = {
            id: snap.key,
            postId: payload.postId,
            postTitle: payload.postTitle,
            postPrice: payload.postPrice,
            postCurrency: payload.postCurrency,
            content: payload.content,
            timestamp: data.timestamp,
            creatorId: data.sender.id,
            creatorAvatar: data.sender.avatar,
            creatorName: data.sender.name,
            creatorPhoneNumber: data.sender.phoneNumber
          }
          commit('NEW_MESSAGE', newMessage)
          commit('SET_LOADING', false)
        })
        .catch(error => {
          console.error(error)
          commit('SET_LOADING', false)
        })
    }
  }
}
