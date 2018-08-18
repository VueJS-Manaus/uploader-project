import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null,
    allFiles: [],
    loading: false,
    erro: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    upFiles (state, payload) {
      state.allFiles.push(payload)
    },
    setAllFiles (state, payload) {
      state.allFiles = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setErro (state, payload) {
      state.erro = payload
    },
    clearErro (state) {
      state.erro = null
    }
  },
  actions: {
    signInUser ({commit}, payload) {
      commit('setLoading', true)
      commit('clearErro')
      firebase.auth().signInWithEmailAndPassword(payload.login, payload.senha)
        .then(user => {
          const userOn = {
            id: user.user.uid,
            email: user.user.email
          }
          commit('setUser', userOn)
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setErro', error)
          console.log(error)
        })
    },

    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, email: payload.email})
    },

    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },

    loadFiles ({commit}, payload) {
      const file = {
        name: payload.name,
        type: payload.type
      }

      let key
      let urlUploaded
      commit('setLoading', true)
      firebase.database().ref('allFiles').push(file)
        .then(data => {
          key = data.key
          return key
        })
        .then(key => {
          let filename = payload.name
          // let ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref(`allFiles/${filename}`).put(payload)
        })
        .then(fileData => {
          let urlFile = fileData.metadata.fullPath
          return firebase.storage().ref().child(urlFile).getDownloadURL()
        })
        .then(url => {
          urlUploaded = url
          firebase.database().ref('allFiles').child(key).update({urlUploaded: urlUploaded})
        })
        .then(() => {
          commit('upFiles', {...file, urlUploaded: urlUploaded, id: key})
          commit('setLoading', false)
        })
        .catch(error => console.log(error))
    },

    loadedFiles ({commit}) {
      console.log('carregando')
      firebase.database().ref('allFiles').once('value')
        .then(data => {
          const allFiles = []
          let list = data.val()

          for (let key in list) {
            allFiles.push({
              id: key,
              name: list[key].name,
              type: list[key].type,
              urlUploaded: list[key].urlUploaded
            })
            commit('setAllFiles', allFiles)
          }
        })
        .catch(error => console.log(error))
    },
    clearErro ({commit}) {
      commit('clearErro')
    }
  },
  getters: {
    getUser (state) {
      return state.user
    },
    allFiles (state) {
      return state.allFiles
    },
    loading (state) {
      return state.loading
    },
    erro (state) {
      return state.erro
    }
  }
})
