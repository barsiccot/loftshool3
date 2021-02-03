import Skill from "./Skill"
import {action} from "@storybook/addon-actions";

const methods ={
    onApprove: action('onApprove'),
    onRemove: action('onRemove'),

}
export default {
    title:"skill",
    component:{Skill}
};

export const defaultView =() =>({
    components:{ Skill},
    data(){
        return {
            skill: {
                id: 0,
                title: "Test",
                percent: 50
            }
        }
    },
    template:  `<Skill @approve="onApprove" @remove="onRemove" :skill="skill"/>`,
    methods

})


defaultView.story = {
    name: "Стандартный вид"
}