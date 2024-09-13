<template>

  <div class="mx-lg-2 my-2">
    <Table :data="data" :onCellSelect="onCellSelect" />
  </div>

  <div v-if="summaryArr" class="d-flex overflow-x-auto overflow-y-hidden">
    <v-spacer></v-spacer>
    <div class="d-flex mx-lg-2 my-2">

      <SummaryChart v-for="(summary, index) in summaryArr" :key="index"
          :title="summary.title" :summary="summary.summary"
          category='head' :categoryArr="heads"
          series="book" :seriesArr="books"
          :class="index ? 'ml-2' : ''"/>

    </div>
    <v-spacer></v-spacer>
  </div>

</template>



<script>

import _ from 'lodash';
import Obj from "@zero65tech/object";
import Table from '../components/Table.vue'
import SummaryChart from '../components/SummaryChart.vue'

export default {

  components: {
    Table,
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
      data: {},
      bookId: null,
      fy: null,
      summaryArr: null
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

      let resp = await this.doGet('/api/books-summary/yoy', { profileId:this.profile.id });
      let summary = resp.data;

      const heads = [
        { key:'id',    name:'ID',    hide:true },
        { key:'name',  name:'Book'             },
        { key:'color', name:'Color', hide:true }
      ];

      for(let fy of this.fys) 
        heads.push({ key:fy, name:fy.toUpperCase(), align:'end', format:'number2d' });

      const rows = this.books.map(book => [
        ..._.at(book, [ 'id', 'name', 'color' ]),
        ..._.at(summary[book.id], this.fys)
      ]);


      // Total Column

      if(this.fys.length > 1) {
        heads.push({ key:'total', name:'Total', align:'end', format:'number2d' })
        for(let row of rows)
          row.push(Obj.sum(summary[row[0]]));
      }


      // Response

      if(rows.length <= 1) {
        this.data = { heads, rows };
        return;
      }


      // Gradients

      let max = 0;
      for(let row of rows)
        for(let i = 3; i < row.length; i++)
          if(row[i])
            max = Math.max(max, Math.abs(row[i]));
      
      for(let i = 3; i < heads.length; i++)
        heads[i].gradient = { min: -max, max };


      // Total Row

      let totalRow = [ 'total', 'Total', null ];

      for(let i = 3; i < heads.length; i++)
        totalRow.push(rows.reduce((sum, row) => row[i] ? sum + row[i] : sum, 0));

      rows.push(totalRow);


      this.data = { heads, rows };

    },

    async onCellSelect(bookId, fy) {

      let resp = await this.doGet('/api/books-summary', { profileId:this.profile.id, bookId, fy });
      
      let summary = {};
      Obj.nav(resp.data, [ /.*/, /.*/, /.*/, /.*/, /.*/ ], (bookId, month, type, tagId, headId, amount) => {
        Obj.addAt(summary, [ tagId, bookId, month, type, tagId, headId ], amount);
      });

      let summaryArr =[];

      for(let tag of this.tags) {

        if(!summary[tag.id])
          continue;

        summaryArr.push({
          title: { text:tag.name, icon:tag.icon, color:tag.color },
          summary: summary[tag.id]
        });
        
      }

      this.summaryArr = summaryArr;

    },

  },

}

</script>
