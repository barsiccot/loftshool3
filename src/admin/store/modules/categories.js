export default {
    namespaced: true,
    state: {
        categories: []
    },
    mutations: {
        ADD_CATEGORY(state, category) {
            state.categories.unshift(category);
        },
        SET_CATEGORIES(state, categories) {
            state.categories = [...categories];
        },
        UPDATE_CATEGORY(state, {id, title}) {
            state.categories = state.categories.map(cat => {
                if (cat.id === id) {
                    cat.category = title;
                }
                return cat;
            });
            console.log('g',state.categories)
        },
        DELETE_CATEGORY(state, categoryId) {
            state.categories = state.categories.filter(cat => cat.id !== categoryId);
        },
        ADD_SKILL(state, newSkill) {
            console.log(state.categories)
            state.categories = state.categories.map(cat => {
                if (cat.id === newSkill.category) {
                   if(!cat.skills){
                       cat.skills=[];
                       console.log('der',cat)

                   }
                    cat.skills.push(newSkill);
                }
                return cat;
            });
            console.log('s',state.categories)
        },
        UPDATE_SKILL(state, updatedSkill) {
            state.categories = state.categories.map(cat => {
                if (cat.id === updatedSkill.category) {
                    cat.skills = cat.skills.filter(skill => skill.id !== updatedSkill.id);
                }
                return cat;
            });
        },
        DELETE_SKILL(state, {id, categoryId}) {
            state.categories = state.categories.map(cat => {
                if (cat.id === categoryId) {
                    cat.skills = cat.skills.filter(skill => skill.id !== id);
                }
                return cat;
            });
            console.log(state.categories)

        },
    },
    actions: {
        async addCategory(context, category) {
            try {
                const response = await this.$axios.post('/categories', { title: category.title });
                console.log(response);
                 context.commit('ADD_CATEGORY', response.data);
                 return response;
            } catch (error) {
                return error;
            }
        },
        async fetchCategories(context) {
            try {
                const response = await this.$axios.get('/categories/429');
                console.log('Fetched categories');
                console.log(response);
                 context.commit('SET_CATEGORIES', response.data);
                return response;
            } catch(error) {
                return error;
            }
        },
        async updateCategory(context, {id, title}) {
            try {
                console.log('hhh')
                const response = await this.$axios.post('/categories/' + id, {title});
                context.commit('UPDATE_CATEGORY', {id, title});
                return response;
            } catch(error) {
                return error.response;
            }
        },
        async deleteCategory(context, categoryId) {
            try {
                const response = await this.$axios.delete('/categories/' + categoryId);
                context.commit('DELETE_CATEGORY', categoryId);
                return response;
            } catch(error) {
                return error;
            }
        },
        async addSkill(context, newSkill) {
            try {

                const response = await this.$axios.post('/skills', {...newSkill});
                context.commit('ADD_SKILL', response.data);
                return response;
            } catch (error) {
                return error;
            }
        },
        async updateSkill(context, updatedSkill) {
            try {
                const {id, category, title, percent} = updatedSkill;
                const response = await this.$axios.post('/skills/' + id, {category, title, percent});
                context.commit('UPDATE_SKILL', response.data);
                return response;
            } catch (error) {
                return error;
            }
        },
        async deleteSkill(context, {id, categoryId}) {
            try {
                const response = await this.$axios.delete('/skills/' + id);
                context.commit('DELETE_SKILL', {id, categoryId});
                return response;
            } catch (error) {
                return error;
            }
        }
    }
}