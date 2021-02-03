<template>
    <div class="card">
        <form class="card-header">
          <div class="card-header-title">
              <div class="input__wrapper" :class="{ 'error': $v.categoryTitle.$error }" >
               <input type="text" v-model="categoryTitle" :readonly="(editMode || empty) == false" placeholder="Название группы" class="category-input">
                <div class="error-msg" v-if="!$v.categoryTitle.required && $v.categoryTitle.$dirty"> Обязательное поле</div>
            </div>
          </div>
          <div class="control-btns" v-if="(editMode || empty) == true">
            <button key="save-category"  class="save-category" type="submit" @click.prevent="saveCategory">
               <Icon key="save-category-icon" name="tick" className="save-category-icon" />
            </button>
            <button key="save-category-cancel" type="button" class="save-category-cancel" @click="$emit('remove',$event)">
               <Icon key="save-category-cancel-icon" name="remove" className="save-category-cancel-icon" />
            </button>
          </div>
         <div class="control-btns" v-else>
            <button key="edit-category" type="button" @click="editMode = true" class="edit-category">
               <Icon key="edit-category-icon" name="pencil" className="edit-category-icon" />
           </button>
         </div>
        </form>
    <div class="card-content">
       <table v-if="empty ==false" class="skill-list">
         <Skill
             :key="skill.id"
             v-for="skill in skills"
             :skill-prop="skill"
             @remove="$emit('remove-skill',$event)"
             @approve="$emit('edit-skill',$event)"/>
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
        <button type="button" @click.prevent="createSkill"  :class="['add-btn medium add-skill-btn',{blocked:empty ==true}]">
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

export default {
    data() {
        return {
            editMode: false,
            skillToAdd: {
                title: '',
                percent: ''
            },
            categoryTitle: this.title,
        }
    },
    props: {
        empty: Boolean,
        title:{
            type:String,
            default:""
        },
        skills:{
            type:Array,
            default: () => []
        }
    },
    components: {Icon, Skill},
    validations: {
        categoryTitle: {required},
        skillToAdd: {
            title: {required},
            percent: {
                required,
                between: between(1, 100)
            }
        }
    },    created() {
    },
    methods:{
         saveCategory() {
            this.$v.categoryTitle.$touch();
            if (!this.$v.categoryTitle.$anyError) {
                this.editMode =false;
                this.empty =false;

            }
        },
        createSkill() {
            this.$v.skillToAdd.$touch();
            if (!this.$v.skillToAdd.$anyError) {
                this.editMode =false;

            }
        },
    }
}
</script>