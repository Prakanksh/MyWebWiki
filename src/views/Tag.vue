<template>

  <v-container class="d-flex">
    <v-icon v-if="error" icon="mdi-alert" color="orange" />
    <v-progress-circular v-else-if="!tags || loading" :color="tag?.color" indeterminate />
    <v-spacer/>
    <v-btn v-if="charts && charts.length > 0" @click="updateChartsReversed" icon="mdi-swap-vertical-bold" :color="tag?.charts?.reversed ? 'black' : 'white'" rounded="circle" variant="plain" />
  </v-container>

  <div v-if="heads && books" class="d-flex overflow-x-auto overflow-y-hidden">
    <v-spacer></v-spacer>
    <div class="d-flex mx-lg-2 my-2">
      <SummaryChart v-for="(chart, index) in charts" :key="index"
          :title="chart.title" :summary="chart.summary"
          category="head" :categoryArr="heads"
          series="book" :seriesArr="books"
          :yaxis="{ reversed:tag?.charts?.reversed }"
          :class="index ? 'ml-2' : ''"/>
    </div>
    <v-spacer></v-spacer>
  </div>

</template>



<script>

import _ from 'lodash';
import Obj from '@zero65tech/object';
import SummaryChart from '../components/SummaryChart.vue'

export default {

  components: {
    SummaryChart
  },

  props: {

    doGet: Function,
    doPost: Function,
    doPut: Function,
    doPatch: Function,
    cancelReq: Function,

    profile: Object,
    fys: Array,

    books: Array,
    heads: Array,
    tags: Array,
    sources: Array,
    folders: Array,

  },

  data() {
    return {

      loading: true,
      error: false,

      tagId: null,
      summary: null,

    }
  },

  computed: {

    tag() {
      if(this.tags && this.tagId)
        return this.tags.find(tag => tag.id == this.tagId);
      else
        return null;
    },

    charts() {

      if(!this.summary)
        return null;

      let charts =[];

      for(let fy of Object.keys(this.summary).sort()) {
        charts.push({
          title: { text:fy, icon:null, color:null },
          summary: this.summary[fy]
        });
      }

      return charts;

    }

  },

  watch: {

    profile(curr, prev) {

      if(!this.tagId)
        return;

      if(prev === undefined)
        this.fetchData();

    },

    '$route.query.id'() {

      this.tagId = this.$route.query.id;

      if(!this.profile)
        return;

      if(!this.tagId)
        return;

      this.fetchData();

    },

  },

  mounted() {

    this.tagId = this.$route.query.id;

    if(!this.profile)
      return;

    if(!this.tagId)
      return;

    this.fetchData();

  },

  methods: {

    toFy(month) {
      return 'FY' + (parseInt(month.substring(2,4)) + (month.substring(5) >= '04' ? 1 : 0));
    },

    async fetchData() {

      this.loading = true;
      this.error = false;

      let resp = await this.doGet('/api/books-summary', { profileId:this.profile.id, tagId:this.tagId }, 'tag');
      if(!resp.success) {
        this.loading = false;
        this.error = true;
        this.summary = null;
        return;
      }

      let summary = {};
      Obj.nav(resp.data, [ /.*/, /.*/, /.*/, /.*/, /.*/ ], (bookId, month, type, tagId, headId, amount) => {
        Obj.addAt(summary, [ this.toFy(month), bookId, month, type, tagId, headId ], amount);
      });

      this.loading = false;
      this.summary = summary;

    },

    async updateChartsReversed() {

      let reversed = !this.tag.charts?.reversed;

      const resp = await this.doPatch('/api/tags', {
        profileId: this.profile.id,
        id: this.tag.id,
        'charts.reversed': reversed,
      });

      if(resp.success)
        _.set(this.tag, [ 'charts', 'reversed' ], reversed);
      
    },

  },

}

</script>
