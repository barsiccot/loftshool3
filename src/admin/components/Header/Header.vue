<template >
    <div class="header">
     <div class="container">
      <div class="avatar">
         <avatar path="content/user.jpg" alt="Аватар разработчика"/>
      </div>
     <div class="user-name"> Евгения</div>
     <div class="page-desc tabs-phones-hidden">Панель администрирования</div>
     <a href="#" class="logout">Выйти </a>
     </div>
    </div>
</template>
<style lang="pcss" scoped src="./header.pcss"></style>

<script>
import avatar from "../avatar";

export default {
    data() {
        return {}
    },
    components: {avatar},
    computed:{
        userPic(){
            return require("../../../images/content/user.jpg").default
        }
    }
}
</script>