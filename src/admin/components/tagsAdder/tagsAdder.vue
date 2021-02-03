<template>
    <div class="tag-adder-component">
        <app-input
            title="Добавление тега"
            v-model="currentTags"
            @input="$emit('change',currentTags)"
        />
        <ul class="tags">
            <li class="tag"
                v-for="(tag,index) in tagsArray"
                :key="`${tag}${index}`"
                v-if="tag.trim()"

            >
                <tag
                    @click="removeTag(tag)"
                    interactive
                    :title="tag"
                />
            </li>
        </ul>
    </div>
</template>

<script>
import appInput from "../input";
import tag from "../tag";

export default {
    components: {
        appInput,
        tag
    },
    props: {
        tags: {
            type: String,
            default: ""
        }
    },
    model: {
        prop: "tags",
        event: "change"
    },
    data() {
        return {
            currentTags: this.tags
        }
    },
    computed: {
        tagsArray() {
            return this.currentTags.trim().split(', ')
        }
    },
    methods: {
        removeTag(tag) {
            const tags = [...this.tagsArray];
            const tagNdx = tags.indexOf(tag);

            if (tagNdx < 0) return;

            tags.splice(tagNdx, 1);
            this.currentTags = tags.join(", ")
            this.$emit("change",this.currentTags);
        }
    },
}
</script>
<style lang="postcss" scoped>
.tags {
    display: flex;
    margin-top: 20px;
}

.tag {
    display: flex;
    margin-right: 10px;
}

</style>

<style lang="postcss" scoped src="../tag/tag.pcss"></style>