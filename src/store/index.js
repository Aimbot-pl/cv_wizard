import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            user: {
                firstName: '',
                lastName: '',
                contact: [],
                skills: [],
                languages: [],
                interested: [],
                description: '',
                education: [],
                experience: [],
                projects: [],
            },
            message: null,
            userExists: false,
            colors: [
                '#212529',
                '#003f63',
                '#730702'
            ],
            activeColor: '#212529',
            photoClass: 'rounded-circle',
            clientWidth: null,
            canGoForward: false,
            clickedGoForward: false
        }
    },
    getters: {
        user(state) {
            return state.user
        },
        userExists(state) {
            return state.userExists
        },
        colors(state) {
            return state.colors
        },
        activeColor(state) {
            return state.activeColor
        },
        photoClass(state) {
            return state.photoClass
        },
        clientWidth(state) {
            return state.clientWidth
        },
        canGoForward(state) {
            return state.canGoForward
        },
        clickedGoForward(state) {
            return state.clickedGoForward
        }
    },
    mutations: {
        createUser(state) {
            state.user = {
                photo: null,
                firstName: '',
                lastName: '',
                contact: [],
                skills: [],
                languages: [],
                interested: [],
                description: '',
                education: [],
                experience: [],
                projects: [],
            }
            if (sessionStorage.getItem('user')) {
                state.message = 'user exists!'
                state.user = {
                    photo: null,
                    firstName: '',
                    lastName: '',
                    contact: [],
                    skills: [],
                    languages: [],
                    interested: [],
                    description: '',
                    education: [],
                    experience: [],
                    projects: [],
                    ...JSON.parse(sessionStorage.getItem('user'))
                }
                state.userExists = true
            }
        },
        updateApp(state, user) {
            state.user = {
                firstName: '',
                lastName: '',
                contact: [],
                skills: [],
                languages: [],
                interested: [],
                description: '',
                education: [],
                experience: [],
                projects: [],
                ...state.user,
                ...user
            }

            sessionStorage.setItem('user', JSON.stringify(state.user))
        },
        setUserExists(state, val) {
            state.userExists = val
        },
        setActiveColor(state, val) {
            state.activeColor = val
        },
        setPhotoClass(state, val) {
            state.photoClass = val
        },
        setClientWidth(state, val) {
            state.clientWidth = val
        },
        setCanGoForward(state, val) {
            state.canGoForward = val
        },
        setClickedGoForward(state, val) {
            state.clickedGoForward = val
        }
    },
    actions: {
        doCreateUser({commit}) {
            commit('createUser')
        },
        doUpdateApp({commit}, user) {
            commit('updateApp', user)
        },
        doSetUserExists({commit}, val) {
            commit('setUserExists', val)
        },
        doSetActiveColor({commit}, val) {
            commit('setActiveColor', val)
        },
        doSetPhotoClass({commit}, val) {
            commit('setPhotoClass', val)
        },
        doSetClientWidth({commit}, val) {
            commit('setClientWidth', val)
        },
        doSetCanGoForward({commit}, val) {
            commit('setCanGoForward', val)
        },
        doSetClickedGoForward({commit}, val) {
            commit('setClickedGoForward', val)
        }
    }
})

export default store