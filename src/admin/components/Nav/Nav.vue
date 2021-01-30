<template>
    <div class="nav">
        <div class="container">
            <ul class="menu">
                <li :class="['menu-item',{active:link.active}]"
                    v-for="link in links"
                    :key="link.id">
                    <a :href="`/${link.alias}`" class="menu-link">{{link.title}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="pcss" scoped src="./nav.pcss"></style>

<script>
const links = [
    {id: 0, title: "Обо мне", alias: "about", active:false},
    {id: 1, title: "Работы", alias: "works", active:true},
    {id: 2, title: "Отзывы", alias: "reviews", active:false},


]
export default {
    data() {
        return {
            links
        }
    },
    components: {}
}
</script>