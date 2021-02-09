<template>
    <div class="card">
        <form class="card-header">
          <div class="card-header-title">
              <div class="input__wrapper" :class="{ 'error': $v.category.title.$error }" >
               <input type="text" v-model="category.title" :readonly="!editMode ||  isAddFormActive" placeholder="Название группы" class="category-input">
                <div class="error-msg" v-if="!$v.category.title.required && $v.category.title.$dirty"> Обязательное поле</div>
            </div>
          </div>
          <div class="control-btns" v-if="editMode || isAddFormActive">
            <button key="save-category"  class="save-category" type="submit" @click.prevent="saveCategory">
               <Icon key="save-category-icon" name="tick" className="save-category-icon" />
            </button>
            <button key="save-category-cancel" type="button" class="save-category-cancel" @click.prevent="removeCategory">
               <Icon key="save-category-cancel-icon" name="remove" className="save-category-cancel-icon" />
            </button>
          </div>
         <div class="control-btns" v-else>
            <button key="edit-category" type="button" @click="editCategory" class="edit-category">
               <Icon key="edit-category-icon" name="pencil" className="edit-category-icon" />
           </button>
         </div>
        </form>
    <div class="card-content">
       <table  class="skill-list">
           <Skill :key="skill.id" v-for="skill in cat.skills" :skillProp="skill" />
       </table>
    </div>
    <form class="card-footer">
        <div class="input__wrapper" :class="{'error':$v.skillToAdd.title.$error }">
          <input v-model="skillToAdd.title" type="text" placeholder="Новый навык" class="skill-input"/>
            <div class="error-msg" v-if="!$v.skillToAdd.title.required && $v.skillToAdd.title.$dirty">Обязательное поле</div>
        </div>
        <div class="percent input-wrapper input__wrapper" :class="{'error':$v.skillToAdd.percent.$error }">
             <input v-model="skillToAdd.percent" type="number"  placeholder="0" min="0" max="100" class="percent-input" />
             <span class="percent-sign">%</span>
            <div class="error-msg" v-if="!$v.skillToAdd.percent.required && $v.skillToAdd.percent.$dirty">Обязательное поле</div>
            <div class="error-msg" v-if="!$v.skillToAdd.percent.between && $v.skillToAdd.percent.$dirty"> Введите значение от 1 до 100</div>
         </div>
        <button type="button" @click.prevent="createSkill"  :class="['add-btn medium add-skill-btn',{blocked:editMode}]">
         <div class="circle-add-btn">
        <Icon name="plus" className="add-btn-icon" />
         </div>
        </button>
    </form>
    </div>
</template>
<style lang="pcss" scoped src="./category.pcss"></style>

<script>
import {required, between} from 'vuelidate/lib/validators';
import Skill from '../Skill/Skill';
import Icon from "../../Icon";
import {mapActions} from "vuex";
export default {
    data() {
        return {
            isAddFormActive :this.empty,
            editMode: false,
            category: {
                id: this.cat.id,
                title: this.cat.category,
                titleCopy: '',
                skills: this.cat.skills
            },
            skillToAdd: {
                title: '',
                percent: 0
            }
        }
    },
    props: {
        cat: Object
    },
    components: {Icon, Skill},
    validations: {
        category: {
            title: {required}
        },
        skillToAdd: {
            title: {required},
            percent: {
                required,
                between: between(1, 100)
            }
        }
    },
    created() {
        this.editMode = this.category.title === '';
    },
    methods: {
        ...mapActions(
            {   hideTooltip:"tooltips/hide",
                showTooltip: "tooltips/show",
                addCategory: "categories/addCategory",
                updateCategory:"categories/updateCategory",
                addSkill:"categories/addSkill",
                deleteCategory:"categories/deleteCategory"
            }),

        editCategory() {
            this.category.titleCopy = this.category.title;
            this.editMode = true;
        },
        async saveCategory() {
            this.$v.category.$touch();
            if (!this.$v.category.$anyError) {
                if (this.category.titleCopy === '') { // creation of a new one
                    const response = await this.addCategory(this.category);
                    if (response.status == 201) {
                        this.editMode = false;
                        this.$emit("setActive",this.editMode);

                        this.showTooltip({
                            text:'Категория ' + this.category.title + ' успешно добавлена',
                            type:"success"
                        })
                    } else {
                        this.showTooltip({
                            text:'Не удалось добавить категорию',
                            type:"error"
                        })                    }
                } else { // updating of an existing one
                    const response = await this.updateCategory({id: this.category.id, title: this.category.title});
                    console.log('g',response)
                    if (response.status == 200) {
                        this.editMode = false;
                        this.showTooltip({
                            text:'Категория ' + this.category.title + ' успешно обновлена',
                            type:"success"
                        })
                    } else {
                        this.showTooltip({
                            text:'Не удалось добавить категорию',
                            type:"error"
                        })
                    }
                }
            }
        },
        async removeCategory() {
            this.editMode = false;
            this.$emit("setActive",this.editMode);

            const response = await this.deleteCategory(this.category.id);
            if (response.status == 200) {
              this.showTooltip({
                    text:'Категория ' + this.category.title + ' успешно удалена',
                    type:"success"
                })

            } else {
                this.showTooltip({
                    text:'Не удалось удалить категорию',
                    type:"error"
                })
            }
        },
        async createSkill() {
              await this.$v.skillToAdd.$touch();
                if (!this.$v.skillToAdd.$anyError) {
                    let response = await this.addSkill({category: this.category.id, ...this.skillToAdd});
                    if (response.status == 201) {
                        this.showTooltip({
                            text:'Скилл успешно добавлен',
                            type:"success"
                        });
                        this.skillToAdd.title = '';
                        this.skillToAdd.percent = 0;
                        this.$v.skillToAdd.$reset();
                    } else {
                        this.showTooltip({
                            text:'Не удалось добавить скилл',
                            type:"error"
                        })
                    }
                }
            }

    }
}
</script>