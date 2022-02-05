import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: {},
    isCloseAppSide: false,
    isShowAppSide : false,
    ifFixed: false,
    isHidden:false

  },
  mutations: {
    updateUserInfo(state,data){
      state.userInfo = data;
    },
    updateUserName(state,name){
      state.userInfo.user = name;
    },
    updateUserPhoto(state,photo){
      state.userInfo.photo = photo;
    },

    updateisCloseAppSide(state,bool){
      state.isCloseAppSide = bool
    },
    updateIsShowAppSide(state,bool) {
      state.isShowAppSide = bool
    },
    updateifFixed(state,bool) {
      state.ifFixed = bool
    },
    updateisHidden(state,bool) {
      state.isHidden = bool
    }


  },
  actions: {
  },
  modules: {
  }
})
