<template>
    <div>
        <div class="about">
            <div class="about-header container">
                <h1 class="title"> Блок "Обо мне"</h1>
                <iconed-btn
                    v-if="isAddFormActive ===false"
                    type="iconed"
                    @setActive="setActive"
                    @click="isAddFormActive = true"
                    title="Добавить группу"/>
            </div>
            <div class="about-content container" >
                <div class="card-list">
                    <Category
                        v-if="isAddFormActive"
                        @setActive="setActive"
                        empty
                        :cat="emptyCategory"
                    />
                    <Category v-if="categories.length"  @setActive="setActive"  :key="cat.id" v-for="cat in categories" :cat="cat" />
                    <div v-else>loading...</div>
                </div>
            </div>

        </div>
    </div>
</template>
<style lang="pcss" scoped src="./about.pcss"></style>

<script>
import IconedBtn from '../button/types/iconedBtn';
import { mapActions, mapState } from 'vuex';


export default {
    data() {
        return {
            isAddFormActive: false,
            emptyCategory: {
                id: 0,
                category: '',
                created_at: '',
                updated_at: '',
                user_id: '',
                skills: []
            }
        }
    },
    computed: {
        ...mapState({
            categories: state => state.categories.categories,
        })
    },
    components: {
      IconedBtn,
      Category:()=>import("./Category/Category")
    },
    created() {
        this.fetchCategories();

    },
    methods: {
        ...mapActions({
            fetchCategories:"categories/fetchCategories",
            hideTooltip:"tooltips/hide",
            showTooltip: "tooltips/show",
        }),
        setActive(isActiveCard){
            this.isAddFormActive =isActiveCard;
            console.log('kk',this.isAddFormActive)
        },

    }
}
</script>