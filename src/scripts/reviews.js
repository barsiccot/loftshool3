import Vue from "vue";
import {Swiper, SwiperSlide} from "vue-awesome-swiper";
import axios from 'axios';
import paths from '../../env.paths.json';

import "swiper/swiper-bundle.css";
new Vue({
    el: "#reviews-component",
    template: "#reviews-container",
    components: {Swiper, SwiperSlide},
    data() {
        return {
            reviews: [],
            currentSlide: 0,
            sliderOptions: {
                slidesPerView: 1,

                // Responsive breakpoints
                breakpoints: {
                    // when window width is <= 790px
                    480: {
                        slidesPerView: 2,
                    }

                }
            },
            next: true,
            back: false
        }
    },

    methods: {
        requireDataToArray(data) {
            return data.data.map(item => {
                const photo = paths.BASE_URL +'/'+ item.photo;
                item.photo = photo;
               return item;
            })
        },
        slideChange(direction) {
            const slider = this.$refs["reviews-slider"].$swiper;

            switch (direction){
                case "next":
                    slider.slideNext();
                    break;
                case "prev":
                    slider.slidePrev();
                    break;
            }
            this.$emit('slideChange',)
        }
    },
  async created() {
        const data = await axios.get(paths.BASE_URL + '/reviews/429');
        this.reviews = this.requireDataToArray(data)
      console.log('review',this.reviews)
    }

});