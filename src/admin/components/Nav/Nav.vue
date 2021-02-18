<template>
    <div class="nav">
        <div class="container">
            <ul class="menu">
                <li :class="{active: this.$route.path === '/'}" class="menu-item">
                  <router-link tag="a" to="/" class="menu-link">Обо мне</router-link>
                </li>
                <li :class="{active: this.$route.path === '/works'}" class="menu-item">
                  <router-link tag="a" to="/works" class="menu-link">Работы</router-link>
                </li>
                <li :class="{active: this.$route.path === '/reviews'}" class="menu-item">
                  <router-link tag="a" to="/reviews" class="menu-link">Отзывы</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="pcss" scoped src="./nav.pcss"></style>

<script>
export default {
    data() {
        return {
        }
    },
    components: {}
}
</script>