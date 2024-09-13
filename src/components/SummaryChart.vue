<template>
  <div :style="{ width:`${ width }px` }">
    <ApexCharts
      :title="title"
      type="bar-stacked"
      :categories="categoriesData"
      :series="seriesData"
      :yaxis="yaxis" />
  </div>
</template>



<script>

import _ from "lodash";
import Format from "@zero65tech/format";
import Obj from "@zero65tech/object";
import ApexCharts from '../components/ApexCharts.vue'

export default {

  components: {
    ApexCharts
  },

  props: {

    title: Object,
    summary: Object,

    category: String,
    categoryArr: Array,

    series: String,
    seriesArr: Array,

    yaxis: Object,

  },

  computed: {

    processedSummary() {

      let args = [ 'book', 'month', 'type', 'tag', 'head' ];

      let category = args.indexOf(this.category);

      let summary = {};
      if(!this.series) {
        Obj.nav(this.summary, [ /.*/, /.*/, /.*/, /.*/, /.*/ ], (...args) => Obj.addAt(summary, [ args[category] ], args[5]));
      } else {
        let series = args.indexOf(this.series);
        Obj.nav(this.summary, [ /.*/, /.*/, /.*/, /.*/, /.*/ ], (...args) => Obj.addAt(summary, [ args[category], args[series] ], args[5]));
      }

      return summary;

    },

    categoryItems() {

      let categoryIds = Object.keys(this.processedSummary);
      
      return !this.categoryArr
          ? categoryIds.map(categoryId => { return { id:categoryId, name:categoryId } })
          : this.categoryArr.filter(category => categoryIds.includes(category.id));

    },

    seriesItems() {

      if(!this.series)
        return null;

      let seriesIds = Obj.nav(this.processedSummary, [ /.*/, /.*/ ], (category, series, value, ret) => ret.push(series), []);

      seriesIds = _.uniq(seriesIds);

      return !this.seriesArr
          ? seriesIds.map(seriesId => { return { id:seriesId, name:seriesId } })
          : this.seriesArr.filter(series => seriesIds.includes(series.id));

    },

    categoriesData() {
      return this.categoryItems.map(item => item.name);
    },

    seriesData() {

      if(!this.series)
        return [{
          name: 'Amount',
          data: Object.values(this.processedSummary)
        }];

      let data = [];
      for(let seriesItem of this.seriesItems) {
        let series = { name:seriesItem.name, color:seriesItem.color, data:[] };
        for(let categoryItem of this.categoryItems)
          series.data.push(this.processedSummary[categoryItem.id][seriesItem.id] || 0);
        data.push(series);
      }

      return data;

    },

    width() {
      return 82 + 30 * Math.max(this.categoryItems.length, 5);
    },

  },

}

</script>
