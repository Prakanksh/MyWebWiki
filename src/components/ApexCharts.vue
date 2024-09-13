<template>
  <div class="bg-white">
    <div class="d-flex bg-white px-4 pt-2">
      <v-icon v-if="title.icon" :icon="title.icon" :color="title.color" size="small" class="mr-2" />
      <span class="text-truncate" v-tooltip="title.text">{{ title.text }}</span>
      <v-spacer/>
      <v-icon v-if="yaxis?.reversed" icon="mdi-transfer-down" :color="title.color" size="small" class="ml-2 mb-1" />
    </div>
    <div ref="chart" />
  </div>
</template>



<script>

import ApexCharts from 'apexcharts';
import Format from "@zero65tech/format";
import Obj from "@zero65tech/object";

export default {

  props: {

    title: Object,

    type: String,
    height: Number,

    categories: Array,
    series: Array,

    show: Array,
    total: Boolean,

    xaxis: Object,
    yaxis: Object,

  },
    
  data() {
    return {
      chart: null,
      timeout: null,
    }
  },

  computed: {

    seriesFiltered() {

      let series = this.show ? this.series.filter(item => this.show.includes(item.id)) : [ ...this.series ];

      if(this.total)
        series.push({
          name:'Total',
          color: '#000000',
          data: Obj.add(...series.map(item => item.data))
        });

      return series;

    },

    seriesData() {
      return this.seriesFiltered.map(item => { return { name:item.name, data:item.data }; });
    },

    chartOptions() {

      let colors = this.seriesFiltered.map(item => item.color || '#9E9E9E');

      let min = 0, max = 0;
      for(let item of this.seriesFiltered) {
        min = Math.min(min, ...item.data);
        max = Math.max(max, ...item.data);
      }

      let scale = Math.max(-min, max);

      let formatFn;
      if(scale < 10000)
        formatFn = (amount,index) => typeof index == 'object' ? Format.currency(amount,2) : Format.currency(amount);
      else if(scale < 1000000)
        formatFn = (amount,index) => typeof index == 'object' ? Format.currency(amount,2) : Format.currency(amount/1000) + ' K';
      else
        formatFn = (amount,index) => typeof index == 'object' ? Format.currency(amount,2) : Format.currency(amount/100000) + ' L';

      if(this.type == 'bar-stacked') {
        return {
          chart: {
            type: "bar",
            stacked: true,
            height: this.height || 400,
            toolbar: {
              show: false
            },
          },
          dataLabels: {
            enabled: false
          },
          tooltip: {
            fixed: {
              enabled: this.yaxis?.reversed || false, // TODO: @prakanksha
            }
          },
          legend: {
            showForSingleSeries: true
          },
          plotOptions: {
            bar: {
              columnWidth:'20px'
            }
          },
          colors: colors,
          xaxis: {
            categories: this.categories,
            labels: {
              rotateAlways: true,
              minHeight: 100,
              maxHeight: 100,
            },
            ...this.xaxis,
          },
          yaxis: {
            labels: {
              minWidth: 60,
              maxWidth: 60,
              formatter: formatFn
            },
            ...this.yaxis,
          }
        };

      } else if(this.type == 'line-datetime') {
        return {
          chart: {
            type: "line",
            height: this.height || 400,
            zoom: {
              enabled: false
            },
            toolbar: {
              show: false
            },
          },
          dataLabels: {
            enabled: false
          },
          tooltip: {
            x: {
              format: 'MMM \'yy'
            }
          },
          legend: {
            showForSingleSeries: true
          },
          stroke: {
            curve: 'straight',
            width: 2,
          },
          colors: colors,
          xaxis: {
            type: 'datetime',
            categories: this.categories,
            labels: {
              rotateAlways: true,
              minHeight: 100,
              maxHeight: 100,
            },
            ...this.xaxis,
          },
          yaxis: {
            labels: {
              minWidth: 60,
              maxWidth: 60,
              formatter: formatFn
            },
            ...this.yaxis,
          }
        };

      } else {
        return null;

      }

    },
  },

  watch: {

    categories: {
      deep: true,
      handler() {
        clearTimeout(this.timeout);
        this.render();
      },
    },

    series: {
      deep: true,
      handler() {
        clearTimeout(this.timeout);
        this.render();
      },
    },

    show: {
      deep: true,
      handler() {
        clearTimeout(this.timeout);
        this.render();
      },
    },

    yaxis: {
      deep: true,
      handler(curr, prev) {
        clearTimeout(this.timeout);
        this.render();
      },
    }

  },

  mounted() {
    this.render();
  },

  unmounted() {
    clearTimeout(this.timeout);
  },

  methods: {

    render() {

      let delay = Math.ceil(25 + Math.random() * 225);

      if(!this.chart) {

        this.timeout = setTimeout(() => {
          let chart = new ApexCharts(this.$refs.chart, { ...this.chartOptions, series:this.seriesData });
          chart.render();
          this.chart = chart;
        }, delay);

      } else {

        this.timeout = setTimeout(() => {
          this.chart.updateOptions({ ...this.chartOptions, series:this.seriesData });
        }, delay);

      }

    }

  }

}

</script>
