import Vue from "vue";
import {Swiper, SwiperSlide} from "vue-awesome-swiper";
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
            return data.reviews.map(item => {
                const photo = require(`../images/content/${item.photo}`);
                item.photo = photo;

                console.log('gsww', item)
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
    created() {
        const data = require('../scripts/data/reviews.json');
        this.reviews = this.requireDataToArray(data)
    }

});