export default {
    namespaced: true,
    state: {
        user: {}
    },
    mutations: {
        SET_USER: (state, user) => {
            state.user = user;
        }
    },
    actions: {
        loginUser(context, user) {
            context.commit('SET_USER', user);
        },
        async logoutUser(context, payload) {
            console.log(localStorage.getItem('token'))
            localStorage.removeItem('token');
        }
    },
    getters: {
        isUserLoggedIn: ({user}) => {
            return (Object.keys(user).length === 0 && user.constructor === Object) === false;
        }
    }
}