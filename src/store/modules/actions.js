import auth from "../../api/auth"
import * as types from './mutation-types'

export default {
  login({ commit }, data) {
    return auth.login( data )
      .then( res => {
        localStorage.setItem("token", res.data.token);
        commit(types.LOGIN, res.data);
        return res;
      })
      .catch( error => error );
  },
  logout({ commit }) {
    return auth.logout()
      .then(() => {
        localStorage.removeItem("token");
        commit(types.LOGOUT, { token: null });
      })
      .catch( error => { throw error } );
  }
}