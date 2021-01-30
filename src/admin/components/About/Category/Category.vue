<template>
    <div class="card">
        <form class="card-header">
          <div class="card-header-title">
            <div class="input__wrapper">
               <input type="text" v-model="categoryTitle" :readonly="(editMode || empty) == false" placeholder="Название группы" class="category-input">
            </div>
          </div>
          <div class="control-btns" v-if="(editMode || empty) == true">
            <button key="save-category" type="button" class="save-category" @click="editMode = false">
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
             :skill="skill"
             @remove="$emit('remove-skill',$event)"
             @approve="$emit('edit-skill',$event)"/>
       </table>
    </div>
    <form class="card-footer">
       <div class="input__wrapper">
          <input type="text" placeholder="Новый навык" class="skill-input" />
       </div>
        <div class="percent input-wrapper input__wrapper">
             <input type="number"  placeholder="0" min="0" max="100" class="percent-input" />
             <span class="percent-sign">%</span>
         </div>
        <button type="button"  :class="['add-btn medium add-skill-btn',{blocked:empty ==true}]">
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
import {mapActions} from 'vuex';
import {eventBus} from '../../../main';
import Skill from '../Skill/Skill';
import Icon from "../../Icon";

export default {
    data() {
        return {
            editMode: false,
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
    validations: {},
    created() {
    },
}
</script>