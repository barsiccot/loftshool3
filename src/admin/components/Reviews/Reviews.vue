<template>
  <div class="reviews">
    <div class="review-head container">
      <h1 class="title"> Блок "Отзывы" </h1>
    </div>
    <div class="reviews-content container">
      <div class="review-form-wrapper">
        <form v-if="isAddFormActive" ref="form" class="card">
          <div class="card-header"> Новый отзыв</div>
          <div class="card-content">
            <div class="left" v-if="renderedImg !== ''" :class="{ 'error': $v.form.photo.$error }">
              <label @dragover="handleDragOver" @dragleave="hovered=false" @drop="handleImgUpload">
                <div class="avatar-wrapper"
                     :style="{background: `url(${renderedImg}) center center / cover no-repeat`}"/>
                <input type="file" id="photo" @change="handleImgUpload" class="upload-input"/>
              </label>
              <label for="photo" class="text-btn add-avatar-btn"> Изменить фото</label>
            </div>
            <div class="left" v-else :class="{ 'error': $v.form.photo.$error }">
              <label @dragover="handleDragOver" @dragleave="hovered=false" @drop="handleImgUpload">
                <div class="avatar-wrapper">
                  <div class="review-avatar">
                    <Icon name="user" className="avatar-icon"/>
                  </div>
                </div>
                <input type="file" id="changed-photo" @change="handleImgUpload" class="upload-input"/>
              </label>
              <label for="changed-photo" class="text-btn add-avatar-btn"> Добавить фото
                <div class="error-msg change-photo-upload-box" v-if="!$v.form.photo.required && $v.form.photo.$dirty">
                  Загрузите фото
                </div>
              </label>
            </div>
            <div class="right">
              <div class="review-form">
                <div class="author-inputs">
                  <div class="input__wrapper author-name-input-wrapper" :class="{ 'error': $v.form.name.$error }">
                    <div class="input__title"> Имя автора</div>
                    <div class="input__block">
                      <input v-model="form.name" type="text" placeholder="Имя" required    class="input__text-type input author-name-input"/>
                      <div class="error-msg" v-if="!$v.form.name.required && $v.form.name.$dirty"> Заполните поле
                      </div>
                    </div>
                  </div>
                  <div class="input__wrapper author-position-input-wrapper" :class="{ 'error': $v.form.position.$error }">
                    <div class="input__title"> Должность автора</div>
                    <div class="input__block">
                      <input v-model="form.position" type="text" placeholder="Должность" required
                             class="input__text-type input author-position-input"/>
                      <div class="error-msg" v-if="!$v.form.position.required && $v.form.position.$dirty"> Заполните  поле
                      </div>
                    </div>
                  </div>
                </div>
                <div class="input__wrapper" :class="{ 'error': $v.form.review.$error }">
                  <div class="input__title"> Отзыв</div>
                  <div class="input__block">
                    <textarea v-model="form.review" type="textarea" rows="4" placeholder="Введите отзыв" required
                              class="input__textarea-type input review-text-input"/>
                    <div class="error-msg" v-if="!$v.form.review.required && $v.form.review.$dirty"> Обязательное поле
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <button type="button" @click="cancelAddForm" class="create-review-cancel-btn text-btn"> Отмена</button>
            <button type="submit" @click.prevent="addReview" class="gradient-btn create-review-btn"> Сохранить</button>
          </div>
        </form>
      </div>
      <div class="list_review card-list">

        <button type="button" @click="clearForm();isAddFormActive = true" class="add-review review card">
          <div class="card-content">
            <div class="circle-add-btn">
              <Icon name="plus" className="add-btn-icon"/>
            </div>
            | Добавить отзыв
          </div>
        </button>
        <Review v-for="review in reviews" :key="review.id" :reviewProp="review" @updateReview="changeReview"/>
      </div>
    </div>
  </div>
</template>
<style lang="pcss" scoped src="./reviews.pcss"></style>

<script>
import {required} from 'vuelidate/lib/validators';
import {mapActions, mapState, mapMutations} from 'vuex';
import Icon from '../Icon';
import Review from './Review';

export default {
  components: {Icon, Review},
  data() {
    return {
      hovered: false,
      isAddFormActive: false,
      isUpdatingReview: false,
      form: {
        photo: {},
        name: '',
        position: '',
        review: ''
      },
      renderedImg: ''
    }
  },
  computed: {
    ...mapState({
      reviews: state => state.reviews.reviews,
    })
  },
  validations: {
    form: {
      name: {required},
      position: {required},
      review: {required},
      photo: {
        required
      }
    }
  },
  created() {
    this.fetchReviews();
  },
  methods: {
    ...mapActions(
        {
          hideTooltip: "tooltips/hide",
          showTooltip: "tooltips/show",
          createReview: "reviews/createReview",
          fetchReviews: "reviews/fetchReviews",
          updateReview: "reviews/updateReview"
        }),

    clearForm() {
      this.renderedImg = '';
      this.form.photo = {};
      this.form.name = '';
      this.form.position = '';
      this.form.review = '';
      this.$v.form.$reset();
    },
    async addReview() {
      this.$v.form.$touch();
      if (!this.$v.form.$anyError) {
        const formData = new FormData();

        formData.append('photo', this.form.photo);
        formData.append('author', this.form.name);
        formData.append('occ', this.form.position);
        formData.append('text', this.form.review);

        let response = null;
        if (!this.isUpdatingReview) {
          response = await this.createReview(formData);
        } else {
          response = await this.updateReview({id: this.form.id, review: formData});
        }

        if (response.status === 201) {
          this.clearForm();
          this.isAddFormActive = false;
          this.showTooltip({
            text: 'Отзыв успешно добавлен',
            type: "success"
          })
        } else if (response.status === 200) {
          this.showTooltip({
            text: 'Отзыв успешно обновлен',
            type: "success"
          })
          this.clearForm();
          this.isAddFormActive = false;
          this.isUpdatingReview = false;
        } else {
          this.showTooltip({
            text: 'Не удалось добавить отзыв',
            type: "error"
          })
        }
      }
    },
    changeReview(review) {
      this.isUpdatingReview = true;
      this.isAddFormActive = true;
      this.form = {...review};
      this.renderedImg = this.$axios.defaults.baseURL + '/' + this.form.photo;
    },
    cancelAddForm() {
      this.clearForm();
      this.isAddFormActive = false;
      this.isUpdatingReview = false;
    },
    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
    handleImgUpload(event) {
      event.preventDefault();
      const photo = event.dataTransfer
          ? event.dataTransfer.files[0]
          : event.target.files[0];
      this.form.photo = photo;
      this.renderedPhoto(photo);
      this.$v.form.photo.$touch();
      this.hovered = false;
    },
    renderedPhoto(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.renderedImg = reader.result;
      }
    },
  },
  updated() {
    if (this.isAddFormActive) {
      this.$refs.form.scrollIntoView();
    }
  }
}
</script>