<template >
<div class="review card">
    <div class="card-header">
        <div class="avatar" :style="{background: `url(${imgPath}) no-repeat center center`, backgroundSize: 'cover'}"/>
      <div class="author-name"> {{review.name}}</div>
      <div class="author-position"> {{review.position}}</div>
    </div>
    <div class="card-content">
      <p> {{review.review}}</p>
    </div>
    <div class="card-footer">
        <button type="button" @click="updateReview" class="edit-review">
           <span> Править</span>
            <Icon name="pencil" className="edit-review-icon"/>
        </button>
        <button type="button" @click="removeReview" class="remove-review">
            <span> Удалить</span>
            <Icon name="remove" className="remove-review-icon"/>
        </button>
    </div>
</div>
</template>
<style lang="pcss" scoped src="./reviews.pcss"></style>

<script>
import {mapActions} from 'vuex';
import Icon from '../Icon';

export default {
    components: {Icon},
    props: {
        reviewProp: Object
    },
    computed: {
        imgPath() {
            return this.$axios.defaults.baseURL + `/${this.review.photo}`;
        },
        review() {
            return {
                id:       this.reviewProp.id,
                photo:    this.reviewProp.photo,
                name:     this.reviewProp.author,
                position: this.reviewProp.occ,
                review:   this.reviewProp.text
            }
        }
    },
    methods: {
        ...mapActions({
            hideTooltip:"tooltips/hide",
            showTooltip: "tooltips/show",
            createReview: "reviews/createReview",
            fetchReviews: "reviews/fetchReviews",
            updateReview: "reviews/updateReview",
            deleteReview:"reviews/deleteReview"
        }),
        updateReview() {
            this.$emit('updateReview', {
                id:       this.review.id,
                photo:    this.review.photo,
                name:     this.review.name,
                position: this.review.position,
                review:   this.review.review
            });
        },
        async removeReview() {
            const response = await this.deleteReview(this.review.id);
            if (response.status === 200) {
                this.showTooltip({
                    text:'Отзыв успешно удален',
                    type:"success"
                })
            } else {
                this.showTooltip({
                    text:'Не удалось удалить отзыв',
                    type:"error"
                })
            }
        }
    }
}
</script>