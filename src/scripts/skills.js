import Vue from "vue";
import axios from 'axios';
import paths from '../../env.paths.json';

const skillsItem ={
    props:["skill"],
    template:"#skills-item",
    mounted() {
        const circle=this.$refs["colored-circle"];
        const dashArray = parseInt(
            getComputedStyle(circle).getPropertyValue("stroke-dasharray")
        );
        const percent =(dashArray/100)*(100-this.skill.percent)
        circle.style.strokeDashoffset=percent;
    }
};

const skillsRow ={
    props:["category"],
    template:"#skills-row",
    components:{
        skillsItem
    },
};

new Vue({
    el:"#skills-component",
    template:"#skills-list",
    components:{
        skillsRow
    },
    data(){
        return{
            skills:[]
        }
    },
    async created() {
        const data = await axios.get(paths.BASE_URL + '/categories/429');
        this.skills = data.data;
        console.log('skills',this.skills);

    },
})