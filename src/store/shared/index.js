import firebase from 'firebase'

export default {
  state: {
    loading: false,
    error: null,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    userLocation: [],
    countries: [
      {
        'name': 'Congo - Kinshasa',
        'provinces': ['Bas-Congo', 'Bandundu', 'Equateur', 'Kinshasa', 'Katanga', 'Province Orientale', 'Nord Kivu', 'Sud Kivu', 'Maniema', 'Kasai Oriental', 'Kasai Occidental']
      },
      {
        'name': 'Congo - Brazzavile',
        'provinces': ['Bouenza', 'Cuvette', 'Cuvette-Ouest', 'Kouilou', 'Lékoumou', 'Brazzavile', 'Likouala', 'Niari', 'Plateaux', 'Pool', 'Sangha', 'Pointe Noire']
      },
      {
        'name': 'Gabon',
        'provinces': ['Libreville', 'Franceville', 'Lambaréné', 'Mouilla', 'Tchibanga', 'Makokou', 'Koulamoutou', 'Port-Gentil', 'Oyem']
      }
    ]
  },
  getters: {
    loading: state => state.loading,
    error: state => state.error,
    timestamp: state => state.timestamp,
    userLocation: state => state.userLocation
  },
  mutations: {
    'SET_LOADING': (state, payload) => {
      return state.loading = payload
    },
    'SET_ERROR': (state, payload) => {
      return state.error = payload
    },
    'CLEAR_ERROR': (state) => {
      return state.error = null
    },
    'USER_LOCATION': (state, payload) => {
      return state.userLocation = payload
    }
  },
  actions: {
    clearError: ({commit}) => {
      commit('CLEAR_ERROR')
    },
    userLocation: ({commit}, payload) => {
      commit('USER_LOCATION', payload)
    }
  }
}
