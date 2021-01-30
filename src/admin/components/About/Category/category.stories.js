import category from "./Category";
import {action} from "@storybook/addon-actions"

const methods ={
    onRemove:action('onRemove'),
    onRemoveSkill:action("onRemoveSkill"),
    onEditSkill:action("onEditSkill")
}
export default {
    title:"category",
    components:{category}
}

const skills = [
    {id:0, title:"CSS", percent:10},
    {id:1, title:"Html", percent:20},
    {id:2, title:"CSS", percent:10}
]
export  const defaultView =() => ({
  components: {category},
  data(){
      return{
          title:"Frontend",
          skills
      }
  },
  template:`<Category
  :title="title"
  :skills="skills"
  @remove="onRemove"
  @remove-skill="onRemoveSkill"
  @edit-skill="onEditSkill"
  />`,
  methods

})
defaultView.story = {
    name: "Стандартный вид"
}