import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
	plugins: [createPersistedState()],
	state: {
		user: {
			token: "",
			isLoggedIn: false,
			shift:0,
			username: "",
			group: '',
			bidang: '',
			komisi: '',
			flag_three: '',
			id_pdt: ''
		},
		outlet: {
			hkeep : "HKEEP",
		},
		isLoading: true,
		display:'none',
		loading: false,
		loading_submit: false,
		snackbar: false,
		error: false,
		text: '',
		drawer: null,
		mini: false,
		hover:false,
		dialog: false,
		dialog2: false,
		success: true,
		user_variabels: [],
		isDataTableLoading:false,
		detailMaintenance: {},
		overlay: false,
		avatar: '',
		profile: null,
		entities: [],
	},
	mutations: {
		USER_TOKEN (state, payload) {
			state.user.token = payload.access_token
			state.user.username = payload.username
			state.user.shift = payload.shift
			state.user.isLoggedIn = true
		},
		USER_LOGOUT (state, payload) {
			if(payload == true) {
				state.user.token = ""
				state.user.isLoggedIn = false
				state.user.username = ""
				state.user.group = ''
				state.user.bidang = ''
				state.user.komisi = ''
				state.user.flag_three = ''				
				state.user.id_pdt = ''				
				state.entities = []
				state.drawer = null
			}
		},
		SET_GROUP(state, payload){
			state.user.group = payload
		},
		SET_BIDANG(state, payload){
			state.user.bidang = payload
		},
		SET_KOMISI(state, payload){
			state.user.komisi = payload
		},
		SET_FLAG_THREE(state, payload){
			state.user.flag_three = payload
		},
		SET_ID_PDT(state, payload){
			state.user.id_pdt = payload
		},
		SET_DRAWER_ADMIN (state) {
			state.drawer = !state.drawer
		},
		getAvatar(state, avatar){
			state.avatar = avatar.avatar
			state.profile = avatar
		},
		SET_OVERLAY(state, payload){
			state.overlay = payload
		},
	},
	actions: {
		setOverlay({ commit }, data){
			commit('SET_OVERLAY', data)
		},
		loginUser({ commit }, data) {
			return new Promise((resolve, reject) => {
				axios.post(`${process.env.VUE_APP_URL}/api/login`, data)
				.then(res => {
					const data = res.data.data
					axios.defaults.headers.common["Authorization"] = "Bearer " + data.access_token
					commit("USER_TOKEN", data);
					resolve(res)
				})
				.catch(err => {
					reject(err)
				})
			})
		},
		logoutUser({ commit }) {
			return new Promise((resolve, reject) => {
				axios.get(`${process.env.VUE_APP_URL}/api/logout`, { 
					headers: { Authorization: `Bearer ${this.getters.isTokenUser}` } 
				})
				.then(res => {
					delete axios.defaults.headers.common['Authorization']
					commit('USER_LOGOUT', true)
					resolve(res)
				})
				.catch(err => {
					reject(err)
				})
			})
		},
		getHeaderAvatar ({ commit }) {
			return new Promise((resolve, reject) => {
				axios.get(`${process.env.VUE_APP_URL}/api/profile`, { 
					headers: { Authorization: `Bearer ${this.getters.isTokenUser}` } 
				})
				.then(res => {
					commit('getAvatar', res.data.data)
					resolve(res)
				})
				.catch(err => {
					reject(err)
				})
			})
		},
	},
	modules: {
		//   masterMaintenance,
	},
	getters: {
		isUserLoggedIn: state => !!state.user.token,
		isTokenUser: state => state.user.token,
		UsernameUser: state => state.user.username,
		GroupUser: state => state.user.group,
		shift: state => state.user.shift,
		convertToCurrency: state => number => {
			return new Intl.NumberFormat('id-ID').format(number)
		},
		convertToCurrencyUs: state => number => {
			return new Intl.NumberFormat('en-US', {maximumFractionDigits:2}).format(number)
		},
	}
});
