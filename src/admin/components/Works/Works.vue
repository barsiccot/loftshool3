<template>
  <div class="works">
    <div class="works-header container">
      <h1 class="title"> Блок "Работы"</h1>
    </div>
    <div class="works-content container">
      <div class="work-form-wrapper">
        <form v-if="isAddFormActive" ref="form" class="card">
          <div class="card-header"> Редактирование работы</div>
          <div class="card-content">
            <div class="left">
              <div class="preview-wrapper" v-if="renderedImg !== ''">
                <label @dragover="handleDragOver" @dragleave="hovered=false" @drop="handleImgUpload">
                  <div class="work-image-wrapper" :class="{ 'error': $v.form.photo.$error ,'hovered':hovered }">
                    <div class="work-image"
                         :style="{background: `url(${renderedImg}) center center / cover no-repeat`}"/>
                    <input type="file" id="change-photo" @change="handleImgUpload" class="upload-input"/>
                  </div>
                  <div class="input__wrapper">
                    <label for="change-photo" class="change-work-image text-btn"> Изменить превью</label>
                  </div>
                </label>
              </div>

              <div class="upload-wrapper" v-else :class="{ 'error': $v.form.photo.$error,'hovered':hovered}">
                <label @dragover="handleDragOver" @dragleave="hovered=false" @drop="handleImgUpload">
                  <div class="upload-content">
                    <span> Перетащите или загрузите для загрузки изображения</span>
                    <label for="upload-photo" class="gradient-btn upload-btn"> Загрузить</label>
                    <input type="file" id="upload-photo" @change="handleImgUpload" class="upload-input"/>
                  </div>
                  <div class="error-msg change-photo-upload-box"
                       v-if="!$v.form.photo.required && $v.form.photo.$dirty"> Необходимо загрузить изображение
                  </div>
                </label>
              </div>
            </div>
            <div class="right">
                <div class="work-form">
                  <div class="input__wrapper" :class="{ 'error': $v.form.title.$error }">
                    <div class="input__title"> Название</div>
                    <div class="input__block">
                      <input v-model="form.title" type="text" placeholder="Название работы" required
                             class="input__text-type input work-title-input"/>
                      <div class="error-msg" v-if="!$v.form.title.required && $v.form.title.$dirty">Обязательное
                        поле
                      </div>
                    </div>
                  </div>
                  <div class="input__wrapper" :class="{ 'error': $v.form.link.$error }">
                    <div class="input__title"> Ссылка</div>
                    <div class="input__block">
                      <input v-model="form.link" type="text" placeholder="Ссылка на работу" required
                             class="input__text-type input work-link-input"/>
                      <div class="error-msg" v-if="!$v.form.link.required && $v.form.link.$dirty"> Обязательное поле
                      </div>
                    </div>
                  </div>
                  <div class="input__wrapper" :class="{ 'error': $v.form.desc.$error }">
                    <div class="input__title"> Описание</div>
                    <div class="input__block">
                        <textarea v-model="form.desc" type="textarea" rows="4" placeholder="Описание работы" required
                                  class="input__textarea-type input work-desc-input"/>
                      <div class="error-msg" v-if="!$v.form.desc.required && $v.form.desc.$dirty"> Обязательное поле
                      </div>
                    </div>
                  </div>
                  <div class="input__wrapper" :class="{ 'error': $v.form.tags.$error }">
                    <div class="input__title"> Добавление тэга</div>
                    <div class="input__block">
                      <input v-model="form.tags" type="text" placeholder="Названия тэгов через запятую"
                             class="input__text-type input tag-input"/>
                      <div class="error-msg" v-if="!$v.form.tags.required && $v.form.tags.$dirty"> Обязательное поле
                      </div>
                    </div>
                  </div>
                  <ul class="tag-list">
                    <li v-if="(tag !== '' && tag !== ' ')" v-for="tag in tagsSeparated" class="tag">
                      <span> {{ tag }}</span>
                      <button type="button" @click="removeTag" :data-tag="tag.trim()" class="remove-tag">
                        <Icon name="remove" className="remove-tag-icon"/>
                      </button>
                    </li>
                  </ul>
                </div>
            </div>
          </div>
          <div class="card-footer">
            <button type="button" @click="cancelAddForm" class="create-work-cancel-btn text-btn"> Отмена</button>
            <button type="submit" @click.prevent="addWork" class="gradient-btn create-work-btn"> Сохранить</button>
          </div>
        </form>
      </div>
      <div class="works-list card-list">

        <button type="button" @click="clearForm();isAddFormActive = true" class="add-work work card">
          <div class="card-content">
            <div class="circle-add-btn">
              <Icon name="plus" className="add-btn-icon"/>
            </div>
              Добавить работу
            </div>
        </button>
        <WorkCard :key="work.id" v-for="work in works" :workProp="work" @updateWork="changeWork"/>
      </div>
    </div>
  </div>
</template>
<style lang="pcss" scoped src="./works.pcss"></style>

<script>
import {required} from 'vuelidate/lib/validators';
import {mapActions, mapState, mapMutations} from 'vuex';
import Icon from '../Icon';
import WorkCard from './WorkCard';

export default {
  components: {WorkCard, Icon},
  data() {
    return {
      hovered: false,
      isAddFormActive: false,
      isUpdatingWork: false,
      form: {
        photo: {},
        title: '',
        link: '',
        desc: '',
        tags: ''
      },
      renderedImg: ''
    }
  },
  computed: {
    ...mapState({
      works: state => state.works.works,
    }),
    tagsSeparated() {
      return this.form.tags.split(',');
    }
  },
  validations: {
    form: {
      title: {required},
      link: {required},
      desc: {required},
      tags: {required},
      photo: {required}
    }
  },
  created() {
    this.fetchWorks();
    console.log('ll', this.works)
  },
  updated() {
    if (this.isAddFormActive) {
      this.$refs.form.scrollIntoView();
    }
  },
  methods: {
    ...mapActions({
      hideTooltip: "tooltips/hide",
      showTooltip: "tooltips/show",
      createWork: "works/createWork",
      fetchWorks: "works/fetchWorks",
      updateWork: "works/updateWork"
    }),
    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
    clearForm() {
      this.renderedImg = '';
      this.form.photo = {};
      this.form.title = '';
      this.form.link = '';
      this.form.desc = '';
      this.form.tags = '';
      this.$v.form.$reset();
    },
    async addWork() {
      this.$v.form.$touch();
      if (!this.$v.form.$anyError) {
        const formData = new FormData();

        formData.append('photo', this.form.photo);
        formData.append('title', this.form.title);
        formData.append('link', this.form.link);
        formData.append('description', this.form.desc);
        formData.append('techs', this.form.tags);

        let response = null;
        if (!this.isUpdatingWork) {
          response = await this.createWork(formData);
        } else {
          response = await this.updateWork({id: this.form.id, work: formData});
        }

        if (response.status === 201) {
          this.clearForm();
          this.isAddFormActive = false;
          this.showTooltip({
            text: 'Работа успешно добавлена',
            type: "success"
          })
        } else if (response.status === 200) {
          this.clearForm();
          this.isAddFormActive = false;
          this.isUpdatingReview = false;
          this.showTooltip({
            text: 'Работа успешно добавлена',
            type: "success"
          })
        } else {
          this.showTooltip({
            text: 'Не удалось добавить работу',
            type: "error"
          })
        }
      }
    },
    changeWork(work) {
      this.isUpdatingWork = true;
      this.isAddFormActive = true;
      this.form = {...work};
      this.renderedImg = this.$axios.defaults.baseURL + '/' + this.form.photo;
    },
    cancelAddForm() {
      this.clearForm();
      this.isAddFormActive = false;
      this.isUpdatingWork = false;
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
    removeTag(event) {
      const tagToDelete = event.currentTarget.getAttribute('data-tag');
      this.form.tags = this.tagsSeparated.filter(tag => tag.trim() !== tagToDelete.trim()).join(', ');
    }
  }
}
</script>