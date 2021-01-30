<template>
    <div>
        <div class="about">
            <div class="about-header container">
                <h1 class="title"> Блок "Обо мне"</h1>
                <iconed-btn
                    v-if="isAddFormActive ===false"
                    type="iconed"
                    @click="isAddFormActive = true"
                    title="Добавить группу"/>
            </div>
            <div class="about-content container">
                <div class="card-list">
                    <Category
                        v-if="isAddFormActive"
                        @remove="isAddFormActive = false"
                        empty
                    />
                    <Category
                        v-for="category in categories"
                        :key="category.id"
                        :title="category.category"
                        :skills="category.skills"
                        @remove-skill="removeSkill"
                        @edit-skill="editSkill"
                    />
                </div>
            </div>

        </div>
    </div>
</template>
<style lang="pcss" scoped src="./about.pcss"></style>

<script>
import IconedBtn from '../button/types/iconedBtn';
import Category from './Category/Category';

export default {
    data() {
        return {
            isAddFormActive: false,
            categories: []

        }
    },
    computed: {},
    components: {IconedBtn, Category},
    created() {
        this.categories = require('../../data/categories.json')
    },
    methods: {
        removeSkill() {
            console.log('remove skill');
        },
        editSkill() {
            console.log('edit skill');

        }
    }
}
</script>