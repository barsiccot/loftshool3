<template>
    <tr class="skill-row" v-if="skill.editMode === false">
        <td class="name" >
            {{skill.title}}
        </td>
        <td class="percent-value">
            {{skill.percent}} %
        </td>
        <td class="control-btns">
            <button type="button" class="edit-skill" @click="editSkill">
                <Icon key="edit-skill" name="pencil" className="edit-skill-icon"/>
            </button>
            <button type="button" class="remove-skill" @click="removeSkill">
                <Icon key="remove-skill" name="trash"  className="remove-skill-icon"/>
            </button>
        </td>
    </tr>
    <tr class="skill-row" v-else>
        <td class="name input__wrapper" :class="{ 'error': $v.skill.title.$error }">
            <input v-model="skill.title"/>
            <div class="error-msg" v-if="!$v.skill.title.required && $v.skill.title.$dirty"> Обязательное поле</div>

        </td>
        <td class="percent-value">
            <div class="percent input__wrapper"  :class="{ 'error': $v.skill.percent.$error }">
                <input v-model="skill.percent" type="number" :readonly="!skill.editMode" placeholder="0"
                       class="percent-input"/>
                <span class="percent-sign">%</span>
                <div class="error-msg" v-if="!$v.skill.percent.required && $v.skill.percent.$dirty"> Обязательное поле</div>
                <div class="error-msg" v-if="!$v.skill.percent.between && $v.skill.percent.$dirty"> Введите значение от 1 до 100</div>

            </div>
        </td>
        <td class="control-btns">
            <button type="submit" class="save-skill" @click.prevent="saveSkill">
                <Icon key="save-category-icon" name="tick"
                      className="save-skill-icon"/>
            </button>
            <button type="button" class="save-skill-cancel" @click="skill.editMode = false">
                <Icon key="save-skill-cancel" name="remove" className="save-skill-cancel-icon"/>
            </button>


        </td>
    </tr>
</template>
<style lang="pcss" scoped src="./skill.pcss"></style>

<script>
import {required, between} from 'vuelidate/lib/validators';
import Icon from '../../Icon';
import Button from "../../button/button";
import Input from "../../input/input";
import { mapActions, mapState, mapMutations } from 'vuex';

export default {
  data() {
        return {
            skill: {
                id: this.skillProp.id,
                category: this.skillProp.category,
                title: this.skillProp.title,
                percent: this.skillProp.percent,
                editMode: false

            },
        }
    },
    mounted() {
        console.log(this.editMode)
    },
    validations: {
        skill: {
            title: {required},
            percent: {
                required,
                between: between(1, 100)
            }
        }
    },
    props: {
        skillProp: {
            type: Object,
            default: () => {
            },
            required: true
        }
    },
    components: {Input, Button, Icon},
    methods: {
        ...mapActions({
            hideTooltip:"tooltips/hide",
            showTooltip: "tooltips/show",
            deleteSkill: "categories/deleteSkill",
            updateSkill:"categories/updateSkill"

        }),
        editSkill() {
            this.skill.editMode = true;
        },
        async saveSkill() {
            this.$v.skill.$touch();
            if (!this.$v.skill.$anyError) {
                let response = await this.updateSkill(this.skill);
                if (response.status == 200) {
                    this.skill.editMode = false;
                    this.showTooltip({
                        text:'Скилл успешно обновлен',
                        type:"success"
                    })
                } else {
                    this.showTooltip({
                        text:'Не удалось добавить скилл',
                        type:"error"
                    })
                }
            }
        },
      async removeSkill() {
        const response = await this.deleteSkill({id: this.skill.id, categoryId: this.skill.category});
        if (response.status == 200) {
            this.showTooltip({
                text:'Скилл ' + this.skill.title + ' успешно удален',
                type:"success"
            }) ;
        } else {
            this.showTooltip({
                text:'Не удалось удалить скилл',
                type:"error"
            })
        }
      }
    }
}
</script>