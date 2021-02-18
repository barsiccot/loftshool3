<template>
<div class="work card">
    <div class="card-header">
        <div class="preview" :style="{background: `url(${imgPath}) no-repeat center center`, backgroundSize: 'cover'}"/>
        <ul class="tag-list">
            <li :key="tag" v-for="tag in tagsSeparated" class="tag"> {{tag}}</li>
        </ul>
    </div>
    <div class="card-content">
      <div class="work-title"> {{work.title}}</div>
      <div class="work-desc"> {{work.desc}}</div>
      <a :href="work.link" class="work-link"> {{work.link}}</a>
    </div>
    <div class="card-footer">
        <button type="button" @click="updateWork" class="edit-work">
          <span>Править</span>
            <Icon name="pencil" className="edit-work-icon"/>
        </button>
        <button type="button" @click="removeWork" class="remove-work">
          <span> Удалить </span>
            <Icon name="remove" className="remove-work-icon"/>
        </button>
    </div>
</div>
</template>
<style lang="pcss" scoped src="./works.pcss"></style>

<script>
import {mapActions, mapMutations} from 'vuex';
import Icon from '../Icon';
import Button from "../button/button";

export default {
    components: {Button, Icon},
    props: {
        workProp: Object
    },
    computed: {
        tagsSeparated() {
            return this.work.tags.split(',');
        },
      imgPath() {
            return this.$axios.defaults.baseURL + `/${this.work.photo}`;
        },
        work() {
            return {
                id:    this.workProp.id,
                photo: this.workProp.photo,
                title: this.workProp.title,
                link:  this.workProp.link,
                desc:  this.workProp.description,
                tags:  this.workProp.techs
            }
        }
    },
    methods: {
      ...mapActions({
        deleteWork:"works/deleteWork",
        showTooltip: "tooltips/show",

      }),
        updateWork() {
            this.$emit('updateWork', {
                id:    this.work.id,
                photo: this.work.photo,
                title: this.work.title,
                link:  this.work.link,
                desc:  this.work.desc,
                tags:  this.work.tags
            });
        },
        async removeWork() {
            const response = await this.deleteWork(this.work.id);
            if (response.status === 200) {
              this.showTooltip({
                text:'Работа успешно удалена',
                type:"success"
              })
            } else {
              this.showTooltip({
                text:'Не удалось удалить работу',
                type:"error"
              })
            }
        }
    }
}
</script>