<template >
    <div class="header">
     <div class="container">
      <div class="avatar">
         <avatar path="content/user.jpg" alt="Аватар разработчика"/>
      </div>
     <div class="user-name">Евгения</div>
     <div class="page-desc tabs-phones-hidden">Панель администрирования</div>
     <a href="#"  @click="logout" class="logout">Выйти </a>
     </div>
    </div>
</template>
<style lang="pcss" scoped src="./header.pcss"></style>

<script>
import avatar from "../avatar";
import {mapActions} from "vuex";
export default {
    components: {avatar},
    methods: {
      ...mapActions('user', ['logoutUser']),
      async logout() {
        await this.logoutUser();
        this.$router.replace('/login');
      }
    }
}
</script>