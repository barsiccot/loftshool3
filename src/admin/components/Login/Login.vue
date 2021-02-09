<template lang="pug" >
 .login-wrapper
  .overlay
  .auth-wrapper
    button(type="button").close-btn
      Icon(name="remove" className="close-btn-icon")
    form.auth
      .title Авторизация
      .login-input.input__wrapper(:class="{ 'error': $v.user.name.$error }")
        label.input__title Логин
        .input__block
            Icon(name="user" className="input__icon")
            input(
              v-model.trim="user.name"
              type="text"
              placeholder="Введите логин"
            ).input__text-type.input
        .error-msg(v-if="!$v.user.name.required && $v.user.name.$dirty") Обязательное поле
      .password-input.input__wrapper(:class="{ 'error': $v.user.password.$error }")
        label.input__title Пароль
        .input__block
            Icon(name="key" className="input__icon")
            input(
              v-model="user.password"
              type="password"
              placeholder="Введите пароль"
            ).input__text-type.input
        .error-msg(v-if="!$v.user.password.required && $v.user.password.$dirty") Обязательное поле
      button(type="submit" @click.prevent="login" :disabled="isSubmitDisabled").submit-btn Отправить


</template>
<style lang="pcss" scoped src="./login.pcss"></style>

<script>
import { mapActions } from 'vuex';
import Icon from '../Icon';
import { required } from 'vuelidate/lib/validators';

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
            showTooltip: "tooltips/show"
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
                    this.$router.replace('/');
                } catch (error) {
                    console.log(error.response)
                    this.showTooltip({
                        text:error.response.data.error,
                        type:"error"
                    })
                }finally  {
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