<template>
    <div :class="[{interactive:ineractive}]">
        <span>{{ title }}</span>
        <button
            v-on="$listeners"
            class="remove"
            type="button">x
        </button>
    </div>
</template>

<script>
import Button from "../button/button";
import icon from "../icon/icon";

export default {
    components: {Button, icon},
    props: {
        interactive: Boolean,
        title: {
            type: String,
            default: ""
        },
        ineractive: Boolean
    }
}
</script>

<style lang="postcss" scoped src="../tag/tag.pcss"></style>