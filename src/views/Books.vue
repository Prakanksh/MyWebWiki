<template>

  <div class="text-center mx-lg-2 my-2">
    <v-chip v-for="item in books" :key="item.id" :value="item.id"
        @click="onClick(item.id)"
        color="white" :ripple="false"
        :variant="bookIds.includes(item.id) ? 'flat' : 'tonal'"
        :size="books.length <= 10 ? 'large' : 'default'"
        class="ma-1">
      <v-icon start icon="mdi-notebook-outline" :color="item.color" />
      {{ item.name }}
    </v-chip>
  </div>

  <ApexCharts v-if="books && summaryMap"
    :title="{ text:'Balances = (Credits - Debits) + (Income - Taxes) - (Expenses - Refunds)', icon:'mdi-wallet' }"
    type="line-datetime" :height="Math.max(400, books.length * 40)"
    :categories="months" :series="balances"
    :show="bookIds" :total="bookIds.length > 1"
    :xaxis="{ labels:{} }" :yaxis="{ opposite:true }"
    class="mx-lg-2 mb-2" />

  <ApexCharts v-if="books && summaryMap"
    :title="{ text:'Net Worth = Relocates + (Income - Taxes) - (Expenses - Refunds)', icon:'mdi-finance' }"
    type="line-datetime" :height="Math.max(400, books.length * 40)"
    :categories="months" :series="netWorth"
    :show="bookIds" :total="bookIds.length > 1"
    :xaxis="{ labels:{} }" :yaxis="{ opposite:true }"
    class="mx-lg-2 mb-2" />

  <ApexCharts v-if="books && summaryFyMap"
    :title="{ text:'Assets = (Debits - Credits)', icon:'mdi-podium-gold' }"
    type="bar-stacked"
    :categories="fys" :series="assets"
    :show="bookIds"
    :xaxis="{ labels:{} }" :yaxis="{ opposite:true }"
    class="mx-lg-2 mb-2" />

  <ApexCharts v-if="books && summaryFyMap"
    :title="{ text:'Earnings = (Income - Taxes)', icon:'mdi-cash-fast' }"
    type="bar-stacked"
    :categories="fys" :series="earnings"
    :show="bookIds"
    :xaxis="{ labels:{} }" :yaxis="{ opposite:true }"
    class="mx-lg-2 mb-2" />

  <ApexCharts v-if="books && summaryFyMap"
    :title="{ text:'Expenditure = (Expenses - Refunds)', icon:'mdi-gas-burner' }"
    type="bar-stacked"
    :categories="fys" :series="expenditure"
    :show="bookIds"
    :xaxis="{ labels:{} }" :yaxis="{ opposite:true }"
    class="mx-lg-2 mb-2" />

  <ApexCharts v-if="books && summaryFyMap"
    :title="{ text:'Fund Relocations', icon:'mdi-shuffle-variant' }"
    type="bar-stacked"
    :categories="fys" :series="relocates"
    :show="bookIds"
    :xaxis="{ labels:{} }" :yaxis="{ opposite:true }"
    class="mx-lg-2 mb-2" />

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
      bookIds: [],
      summaryMap: null,
      summaryFyMap: null
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

    fys() {

      let first = this.toFy(this.months[0]);
      let last = this.toFy(this.months[this.months.length - 1]);

      let fys = [];
      let fy = first;
      while(fy <= last) {
        fys.push(fy);
        fy = 'FY' + (parseInt(fy.substring(2)) + 1);
      }

      return fys;

    },

    balances() {
      return this.books.map(book => {

        let summary = this.summaryMap[book.id];

        let val = 0, data = [];
        for(let month of this.months) {
          if(summary[month])
            val = val + Obj.sum(summary[month]);
          data.push(val);
        }

        return { id:book.id, name:book.name, color:book.color, data };

      });
    },

    netWorth() {
      return this.books.map(book => {

        let summary = this.summaryMap[book.id];

        let val = 0, data = [];
        for(let month of this.months) {
          if(summary[month]?.relocate !== undefined)
            val += summary[month]?.relocate;
          if(summary[month]?.income !== undefined)
            val += summary[month]?.income;
          if(summary[month]?.expense !== undefined)
            val += summary[month]?.expense;
          if(summary[month]?.refund !== undefined)
            val += summary[month]?.refund;
          if(summary[month]?.tax !== undefined)
            val += summary[month]?.tax;
          data.push(val);
        }

        return { id:book.id, name:book.name, color:book.color, data };

      });
    },

    assets() {
      return this.books.map(book => {

        let summary = this.summaryFyMap[book.id];

        let data = [];
        for(let fy of this.fys) {
          let val = null;
          if(summary[fy]?.credit !== undefined)
            val -= summary[fy]?.credit;
          if(summary[fy]?.debit !== undefined)
            val -= summary[fy]?.debit;
          data.push(val);
        }

        return { id:book.id, name:book.name, color:book.color, data };

      });
    },

    earnings() {
      return this.books.map(book => {

        let summary = this.summaryFyMap[book.id];

        let data = [];
        for(let fy of this.fys) {
          let val = null;
          if(summary[fy]?.income !== undefined)
            val += summary[fy]?.income;
          if(summary[fy]?.tax !== undefined)
            val += summary[fy]?.tax;
          data.push(val);
        }

        return { id:book.id, name:book.name, color:book.color, data };

      });
    },

    expenditure() {
      return this.books.map(book => {

        let summary = this.summaryFyMap[book.id];

        let data = [];
        for(let fy of this.fys) {
          let val = null;
          if(summary[fy]?.expense !== undefined)
            val -= summary[fy]?.expense;
          if(summary[fy]?.refund !== undefined)
            val -= summary[fy]?.refund;
          data.push(val);
        }

        return { id:book.id, name:book.name, color:book.color, data };

      });
    },

    relocates() {
      return this.books.map(book => {

        let summary = this.summaryFyMap[book.id];

        let data = [];
        for(let fy of this.fys)
          data.push(summary[fy]?.relocate || null);

        return { id:book.id, name:book.name, color:book.color, data };

      });
    },

  },

  watch: {

    profile() {
      this.fetchData();
    },

    books() {

      if(!this.books)
        return;

      let bookIds = localStorage.getItem(`${ this.profile.id }.bookIds`);
      if(bookIds)
        this.bookIds = JSON.parse(bookIds);
      else
        this.bookIds = this.books.map(book => book.id);

    },

  },

  mounted() {

    if(!this.profile)
      return;

    this.fetchData();

    if(!this.books)
      return;

    let bookIds = localStorage.getItem(`${ this.profile.id }.bookIds`);
    if(bookIds)
      this.bookIds = JSON.parse(bookIds);
    else
      this.bookIds = this.books.map(book => book.id);
    
  },

  methods: {

    toFy(month) {
      return 'FY' + (parseInt(month.substring(2,4)) + (month.substring(5) >= '04' ? 1 : 0));
    },

    async fetchData() {

      let resp = await this.doGet("/api/books-summary/types", { profileId: this.profile.id });
      if(!resp.success)
        return;

      let summaryFyMap = {};
      for(let bookId in resp.data) {
        let summary = {};
        for(let month in resp.data[bookId]) {
          let fy = this.toFy(month);
          if(!summary[fy])
            summary[fy] = resp.data[bookId][month];
          else
            summary[fy] = Obj.add(summary[fy], resp.data[bookId][month]);
        }
        summaryFyMap[bookId] = summary;
      }

      this.summaryMap = resp.data;
      this.summaryFyMap = summaryFyMap;

    },

    onClick(bookId) {

      let i = this.bookIds.indexOf(bookId);
      if(i == -1)
        this.bookIds.push(bookId);
      else if(this.bookIds.length > 1)
        this.bookIds.splice(i,1);

      localStorage.setItem(`${ this.profile.id }.bookIds`, JSON.stringify(this.bookIds));

    },

  },

}

</script>
