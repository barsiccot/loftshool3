import tag from "../tag/tag";

export default {
  title: "tag",
  component: tag,
};

export const defaultView = () => ({
  components: { tag },
  template: `
    <tag
        title="Текст внутри"
    >
    </tag>
  `,
});

defaultView.story = {
  name: "Стандартный вид"
}
