import Vue from "vue";
import axios from 'axios';
import paths from '../../env.paths.json';

const thumbs = {
    template: "#preview-thumbs",
    props: ["works", "currentWork"],
}

const buttons = {
    template: "#preview-slider__btns",
    props: ["currentIndex", "worksLength"],
}

const display = {
    props: ["currentWork", "works", "currentIndex"],
    template: "#preview-slider",
    components: {thumbs, buttons},
    computed: {
        reversedWorks() {
            const works = [...this.works];
            return works.reverse();
        }
    },
    methods: {
        handlePreviewClick(workId) {
            this.works.forEach((work, index) => {
                if (work.id === workId) {
                    this.$emit('previewClicked', index);
                }
            });
        }
    }
}

const tags = {
    template: "#preview-info__tags",
    props: ["skills"],

}

const info = {
    template: "#preview-info",
    components: {tags},
    props: ["currentWork"],
    computed: {
        tagsArray() {
            console.log('dddd',this.currentWork)
            return this.currentWork.techs.split(',');
        }
    }
}

new Vue({
    el: "#preview-component",
    template: "#preview-container",
    components: {
        display,
        info
    },
    data() {
        return {
            works: [],
            currentIndex: 0
        }
    },
    computed: {
        currentWork() {
            return this.works[this.currentIndex];
        }
    },
    watch: {
        currentIndex(value) {
            this.getLoopForIndex(value);
        }
    },
    methods: {
        getLoopForIndex(index) {
            if (index < 0) this.currentIndex = this.works.length - 1;
            if (index > this.works.length - 1) this.currentIndex = 0;

        },
        requireDataToArray(data) {
            return data.data.map(item => {
                const photo = paths.BASE_URL +'/'+ item.photo;
                item.photo = photo;
                return item;
            })
        },

        changeSlide(direction) {
            const lastItems =this.works[this.works.length - 1];
            switch (direction) {
                case 'next':
                    this.currentIndex++;
                    break;
                case 'prev':
                    this.currentIndex--;
                    break;
            }
        },
        handlePreviewClick(workIndex) {
            this.currentIndex = workIndex;
        }
    },
   async created() {
        const data = await axios.get(paths.BASE_URL + '/works/429');
        this.works = this.requireDataToArray(data)
       console.log('work',this.works)

    }
})