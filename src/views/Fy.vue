<template>

  <v-container class="d-flex">
    <v-icon v-if="error" icon="mdi-alert" color="orange" />
    <v-progress-circular v-else-if="loading" indeterminate />
    <v-spacer/>
  </v-container>

  <div class="d-flex overflow-x-auto overflow-y-hidden">
    <v-spacer></v-spacer>
    <div class="d-flex mx-lg-2 my-2">
      <SummaryChart v-for="(chart, index) in charts" :key="index"
          :title="chart.title" :summary="chart.summary"
          category="head" :categoryArr="heads"
          series="book" :seriesArr="books"
          :yaxis="{ reversed:chart.reversed }"
          :class="index ? 'ml-2' : ''"/>
    </div>
    <v-spacer></v-spacer>
  </div>

</template>



<script>

import _ from "lodash";
import Obj from "@zero65tech/object";
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

      fy: null,
      summary: null,

    }
  },

  computed: {

    charts() {

      if(!this.summary)
        return null;

      let charts = [];

      if(!this.tags) {

        for(let tagId in this.summary) {
          charts.push({
            key: tagId,
            title: {
              text: tagId,
              icon: 'mdi-tag',
              color: null
            },
            summary: this.summary[tagId]
          });
        }

      } else {

        for(let tag of this.tags) {

          if(!this.summary[tag.id])
            continue;

          charts.push({
            key: tag.id,
            title: {
              text: tag.name,
              icon: tag.icon,
              color: tag.color
            },
            summary: this.summary[tag.id],
            reversed: tag.charts?.reversed || false
          });

        }

      }

      return charts;

    }

  },

  watch: {

    profile(curr, prev) {

      if(!this.fy)
        return;

      if(prev === undefined)
        this.fetchData();

    },

    '$route.query.id'() {

      this.fy = this.$route.query.id;

      if(!this.profile)
        return;

      if(!this.fy)
        return;

      this.fetchData();

    },

  },

  mounted() {

    this.fy = this.$route.query.id;

    if(!this.profile)
      return;

    if(!this.fy)
      return;

    this.fetchData();

  },

  methods: {

    async fetchData() {

      this.loading = true;
      this.error = false;

      let resp = await this.doGet('/api/books-summary', { profileId:this.profile.id, fy:this.fy }, 'fy');
      if(!resp.success) {
        this.loading = false;
        this.error = true;
        this.summary = null;
        return;
      }

      let summary = {};
      Obj.nav(resp.data, [ /.*/, /.*/, /.*/, /.*/, /.*/ ], (bookId, month, type, tagId, headId, amount) => {
        Obj.addAt(summary, [ tagId, bookId, month, type, tagId, headId ], amount);
      });

      this.loading = false;
      this.summary = summary;

    },

  },

}

</script>
