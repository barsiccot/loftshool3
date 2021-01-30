import avatar from "./avatar.vue";
import {  withKnobs } from "@storybook/addon-knobs";

export default {
  title: "avatar",
  components: { avatar },
  decorators: [withKnobs]
};

export const defaultView = () => ({
  components: { avatar },
  props: {
    path: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    }
  },
  template: `
    <avatar :size="size" src="https://picsum.photos/300/300" />
  `,
});

defaultView.story = {
  name: "Стандартный вид"
}
