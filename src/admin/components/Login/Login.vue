<template>
  <div class="login-wrapper">
    <div class="overlay"></div>
      <div class="auth-wrapper">
        <button type="button" class="close-btn">
          <Icon name="remove" className="close-btn-icon"/>
        </button>
        <form class="auth">
          <title> Авторизация </title>
          <div class="login-input input__wrapper" :class="{ 'error': $v.user.name.$error }">
            <div class="label input__title"> Логин</div>
            <div class="input__block">
              <Icon name="user" className="input__icon"/>
              <input
                  v-model.trim="user.name"
                  type="text"
                  placeholder="Введите логин"
                  class="input__text-type input"/>
            </div>
            <div class="error-msg" v-if="!$v.user.name.required && $v.user.name.$dirty"> Обязательное поле</div>
          </div>
          <div class="password-input input__wrapper" :class="{ 'error': $v.user.password.$error }">
            <label class="input__title"> Пароль</label>
            <div class="input__block">
              <Icon name="key" className="input__icon"/>
              <input
                  v-model="user.password"
                  type="password"
                  placeholder="Введите пароль"
                  class="input__text-type input"/>
            </div>
            <div class="error-msg" v-if="!$v.user.password.required && $v.user.password.$dirty"> Обязательное поле</div>
          </div>
          <button type="submit" @click.prevent="login" :disabled="isSubmitDisabled" class="submit-btn"> Отправить </button>
        </form>
      </div>
    </div>
</template>
<style lang="pcss" scoped src="./login.pcss"></style>

<script>
import {mapActions} from 'vuex';
import Icon from '../Icon';
import {required} from 'vuelidate/lib/validators';
import $axios from "../../requests";

export default {
  data() {
    return {
      user: {
        name: "",
        password: ""
      },
      isSubmitDisabled: false

    }
  },
  components: {Icon},
  methods: {
    ...mapActions({
      showTooltip: "tooltips/show",
      loginUser: "user/loginUser"
    }),
    async login() {
      this.$v.$touch();
      if (!this.$v.$anyError) {
        try {
          this.isSubmitDisabled = true;

          const response = await this.$axios.post('/login', this.user);
          const token = response.data.token;
          this.$axios.defaults.headers['Authorization'] = `Bearer ${token}`;
          localStorage.setItem('token', token);
          const userResponse = await $axios.get("/user");
          this.loginUser(userResponse.data.user);
          this.$router.replace('/');
        } catch (error) {
          console.log(error.response)
          this.showTooltip({
            text: error.response.data.error,
            type: "error"
          })
        } finally {
          this.isSubmitDisabled = false;
        }
      }
    }
  },
  validations: {
    user: {
      name: {required},
      password: {required}
    }
  }
}
</script>