export default {
    namespaced: true,
    state: {
        works: []
    },
    mutations: {
        ADD_WORK(state, work) {
            state.works.unshift(work);
        },
        SET_WORKS(state, works) {
            state.works = [...works];
        },
        UPDATE_WORK(state, updateWork) {
            state.works = state.works.map(work => {
                if (work.id === updateWork.id) {
                    work = { ...updateWork};
                }
                return work;
            });
        },
        DELETE_WORK(state, id) {
            state.works = state.works.filter(work => work.id !== id);
        }
    },
    actions: {
        async fetchWorks(context) {
            try {
                const response = await this.$axios.get('/works/429');
                context.commit('SET_WORKS', response.data);
                return response;
            } catch (error) {
                return error;
            }
        },
        async createWork(context, work) {
            try {
                const response = await this.$axios.post('/works', work);
                context.commit('ADD_WORK', response.data);
                return response;
            } catch (error) {
                return error;
            }
        },
        async updateWork(context, {id, work}) {
            try {
                const response = await this.$axios.post('/works/' + id, work);
                context.commit('UPDATE_WORK', response.data.work);
                return response;
            } catch (error) {
                return error;
            }
        },
        async deleteWork(context, id) {
            try {
                const response = await this.$axios.delete('/works/' + id);
                context.commit('DELETE_WORK', id);
                return response;
            } catch (error) {
                return error;
            }
        }
    }
}