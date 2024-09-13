<template>
  <ApexCharts v-for="chart in charts"
      :title="chart.title"
      type="line-datetime"
      :categories="months" :series="chart.series"
      :total="chart.series.length > 1"
      :xaxis="{ labels:{} }" :yaxis="{ opposite:true }"
      class="mx-lg-2 my-2" />
</template>



<script>

import _ from "lodash";
import Obj from "@zero65tech/object";
import ApexCharts from '../components/ApexCharts.vue'

export default {

  components: {
    ApexCharts
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
      summaryMap: null,
    }
  },

  computed: {

    months() {

      let first = '2099-12';
      let last  = '1900-01';
      for(let summary of Object.values(this.summaryMap)) {
        let months = Object.keys(summary);
        if(!months.length)
          continue;
        first = first < months[0] ? first : months[0];
        last = last > months[months.length - 1] ? last : months[months.length - 1];
      }

      let months = [];
      let month = first;
      let [ yyyy, mm ] = first.split('-').map(val => parseInt(val));
      while(month <= last) {
        months.push(month);
        if(mm < 12) {
          mm++;
        } else {
          yyyy++;
          mm = 1;
        }
        month = yyyy + (mm < 10 ? '-0' : '-') + mm;
      }

      return months;

    },

    charts() {

      if(!this.summaryMap)
        return null;

      let chartMap = {};

      if(!this.sources) {
        for(let sourceId in this.summaryMap) {

          let data = [];
          let val = 0;
          for(let month of this.months) {
            val += this.summaryMap[sourceId]?.[month] || 0;
            data.push(val);
          }
          
          Obj.pushAt(chartMap, [ 'default' ], { name:sourceId, data });

        }
      } else {
        for(let source of this.sources) {

          let data = [];
          let val = 0;
          for(let month of this.months) {
            val += this.summaryMap[source.id]?.[month] || 0;
            data.push(val);
          }
          
          Obj.pushAt(chartMap, [ source.collection || 'default' ], { name:source.name, data });

        }
      }

      let charts = [];
      for(let collection in chartMap) {
        charts.push({
          title: { text:collection },
          series: chartMap[collection]
        });
      }

      return charts;

    }


  },

  watch: {

    profile() {
      this.fetchData();
    },

  },

  mounted() {
    if(this.profile)
      this.fetchData();
  },

  methods: {

    async fetchData() {

      let resp = await this.doGet("/api/sources-summary", { profileId: this.profile.id });
      if(!resp.success)
        return;

      this.summaryMap = resp.data;

    },

  },

}

</script>
