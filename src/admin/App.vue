<template lang="pug">
  .wrapper
    Header
    Nav
    .main
     About

</template>

<script>
import Icon from './components/Icon';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import About from './components/About/About';


export default {
    data() {
        return {
        }
    },
    components: {
        Icon,
        Header,
        Nav,
        About
    }
}
</script>


<style lang="postcss" src="./main.pcss"></style>