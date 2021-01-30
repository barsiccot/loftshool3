<template>
    <tr class="skill-row" v-if="editMode === false">
        <td class="name">{{ skill.title }}</td>
        <td class="percent-value">{{ skill.percent }} %</td>
        <td class="control-btns">
            <button type="button" class="edit-skill" @click="editMode =true">
                <Icon key="edit-skill" name="pencil" className="edit-skill-icon"/>
            </button>
            <button type="button" class="remove-skill" @click="$emit('remove', skill.id)">
                <Icon key="remove-skill" name="trash"  className="remove-skill-icon"/>
            </button>
        </td>
    </tr>
    <tr class="skill-row" v-else>
        <td class="name"><input class="input_wrapper" v-model="currentSkill.title"/></td>
        <td class="percent-value">
            <div class="percent input-wrapper input__wrapper">
                <input v-model="currentSkill.percent" type="number" :readonly="!editMode" placeholder="0"
                       class="percent-input"/>
                <span class="percent-sign">%</span>
            </div>
        </td>
        <td class="control-btns">
            <button type="button" class="save-skill" @click="$emit('approve',currentSkill)">
                <Icon key="save-category-icon" name="tick"
                      className="save-skill-icon"/>
            </button>
            <button type="button" class="save-skill-cancel" @click="editMode = false">
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

export default {
    data() {
        return {
            editMode: false,
            currentSkill: {
                id: 0,
                title: this.skill.title,
                percent: this.skill.percent
            }
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
        skill: {
            type: Object,
            default: () => {
            },
            required: true
        }
    },
    components: {Input, Button, Icon},
    methods: {
    }
}
</script>