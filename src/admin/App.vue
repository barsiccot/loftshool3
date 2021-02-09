<template lang="pug">
  .wrapper
    .main
      router-view(name="header")
      router-view(name="nav")
      router-view
      .notify-container(:class="{ 'active': isTooltipShown}")
       .notification
         notification(:text="tooltipText" :type="tooltipType" @click="hideTooltip")
</template>

<script>
import Icon from './components/Icon';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import About from './components/About/About';
import notification from "./components/notification";
import  {mapState, mapActions} from "vuex";
export default {
    data() {
        return {
        }
    },
    components: {
        Icon,
        Header,
        Nav,
        About,
        notification
    },
    methods:{
      ...mapActions({
          hideTooltip:"tooltips/hide"
      })
    },
    computed:{
        ...mapState("tooltips",{
            isTooltipShown:state =>state.isShown,
            tooltipText: state =>state.text,
            tooltipType: state => state.type
        })
    }
}
</script>


<style lang="postcss" src="./main.pcss"></style>