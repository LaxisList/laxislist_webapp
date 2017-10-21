import firebase from 'firebase'

export default {
  state: {
    categories: [
      { "type": "Vehicules",
        "names": ["Voitures", "Motos", "Equipement", "Auto", "Equipement", "Moto", "Nautisme", "Equipement", "Nautisme", "Vélo"]
      },
      {
        "type": "Emploi",
        "names": ["Offres d'emploi"]
      },
      {
        "type": "Immobilier",
        "names": ["Ventes immobilières", "Locations", "Colocations", "Bureaux & Commerces"]
      },
      {
        "type": "Vacances",
        "names": ["Locations & Gîtes", "Chambres d'hôtes", "Hôtels", "Hébergements insolites"]
      },
      {
        "type": "Maison",
        "names": ["Ameublement", "Electroménager", "Arts de la table", "Décoration", "'Linge de maison", "Bricolage", "Jardinage", "Radio", "Télévision", "Accessoires & Bagagerie", "Autres", "Table", "Salle à manger"]
      },
      {
        "type": "Homme",
        "names": ["Vêtements", "Pantalon", "Chaussettes", "Culotte", "Chemise", "Chaussures", "Autres", "Accessoires"]
      },
      {
        "type": "Femme",
        "names": ["Mèche", "Accessoires", "Vêtements", "Chaussures", "Autres"]
      },
      {
        "type": "Informatique",
        "names": ["Ordinateur", "Chargeur", "Clavier", "Moniteur", "Disque dur", "Accessoires", "Autres"]
      },
      {
        "type": "Téléphone",
        "names": ["Smartphone", "Tablette", "iPhone", "Samsung", "HTC", "Lenovo", "Blackberry", "Téléphone fixe"]
      },
      {
        "type": "Jeux vidéos",
        "names": ["Playstation 2", "Playstation 3", "Playstation 4", "PSP", "Acessoires"]
      },
      {
        "type": "Services",
        "names": ["Cours particuliers", "Prestations de services"]
      },
      {
        "type": "Gastronomie",
        "names": ["Vins"]
      },
      {
        "type": "Autres",
        "names": ["Instruments de musique", "Livres", "CD/Musique", "DVD/Films"]
      },
      {
        "type": "Luxe",
        "names": ["Bijoux", "Chaînettes", "Bracelets"]
      },
      {
        "type": "Enfant",
        "names": ["Vêtements bébé", "Accessoires", "Berceaux"]
      }
    ]
  },
  getters: {
    categories: (state) => {
      return state.categories.sort((categoryA, categoryB) => {
        if (categoryA > categoryB) {
          return 1
        } else if (categoryA === categoryB) {
          return 0
        } else {
          return -1
        }
      })
    }
  },
  mutations: {
    'LOAD_CATEGORIES': (state, payload) => {
      return state.categories = payload
    },
    'ADD_IN_CATEGORIES': (state, payload) => {
      return state.categories.push(payload)
    }
  },
  actions: {
    addInCategories ({commit}, payload) {
      commit('SET_LOADING', true)
      firebase.database().ref('/categories').push(payload)
        .then(data => {
          commit('ADD_IN_CATEGORIES', payload)
          commit('SET_LOADING', false)
        })
        .catch(error => {
          commit('SET_LOADING', false)
        })
    },
    loadCategories ({commit}) {
      firebase.database().ref('/categories').once('value')
        .then(snap => {
          const data = snap.val()
          const categories = []
          for (let i in data) {
            categories.push(data[i])
          }
          commit('LOAD_CATEGORIES', categories)
        })
        .catch(error => {
        })
    }
  }
}
