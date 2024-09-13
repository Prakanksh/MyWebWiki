<template>
  <v-table density="compact" hover style="text-wrap:nowrap">
    <thead>
      <tr>
        <th v-for="head in heads" :key="head.key"
          :class="'px-4 text-' + (head.align || 'start') + ' bg-grey-lighten-2'"
        >
          {{ head.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id"
          :class="[ { 'clickable':isRowSelectable(item.id) }, { 'selected':selected.includes(item.id) } ]"
          v-on="isRowSelectable(item.id) ? { click: event => handleClick(item.id, null, event) } : {}" >
        <td v-for="head in heads" class="pa-0" >
          <div :class="formatCell(head, item)">
            <span
                :class="[ 'pr-1', { 'clickable':isCellSelectable(item.id, head.key, item[head.key]) } ]"
                v-on="isCellSelectable(item.id, head.key, item[head.key]) ? { click: event => handleClick(item.id, head.key, event) } : {}" >
              {{ format(item[head.key], head.format) }}
            </span>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>



<script>

import _ from "lodash";

export default {

  props: {
    data: Object,
    onCellSelect: Function,
    onRowSelect: Function,
    onRowMultiSelect: Function,
  },

  data() {
    return {
      selected: [],
    }
  },

  computed: {

    heads() {

      if(!this.data.heads)
        return [];

      return this.data.heads.filter(head => !head.hide);

    },

    items() {

      if(!this.data.rows)
        return [];

      let keys = this.data.heads.map(head => head.key);
      return this.data.rows.map(row => _.zipObject(keys, row));

    },

  },

  methods: {

    isCellSelectable(itemId, headKey, value) {
      return this.onCellSelect
          && itemId.toLowerCase()  != 'total'
          && headKey.toLowerCase() != 'total'
          && headKey != 'id'
          && value != null
    },

    isRowSelectable(itemId) {
      return (this.onRowSelect || this.onRowMultiSelect)
          && itemId.toLowerCase() != 'total';
    },

    handleClick(itemId, headKey, event) {

      if(this.onCellSelect) {

        if(itemId.toLowerCase() == 'total') {
          // this.onCellSelect(null, null);
        } else if(headKey.toLowerCase() == 'total') {
          // this.onCellSelect(null, null);
        } else if(headKey == 'id') {
          // this.onCellSelect(null, null);
        } else {
          this.onCellSelect(itemId, headKey);
        }

      } else if(this.onRowSelect) {

        if(itemId.toLowerCase() == 'total') {
          // this.onRowSelect(null);
        } else if(this.selected.length == 0) {
          this.selected.push(itemId);
          this.onRowSelect(itemId);
        } else if(itemId == this.selected[0]) {
          this.selected.pop();
          this.onRowSelect(null);
        } else {
          this.selected[0] = itemId;
          this.onRowSelect(itemId);
        }

      } else if(this.onRowMultiSelect) {

        if(itemId === undefined || itemId === null)
          return;

        if(this.selected.length == 0) {

          this.selected.push(itemId);

        } else if(this.selected.length == 1 && this.selected[0] == itemId) {

          this.selected.pop();

        } else {

          if(event.metaKey || event.altKey || event.shiftKey) {
            let idx = this.selected.indexOf(itemId);
            if(idx == -1)
              this.selected.push(itemId);
            else
              this.selected.splice(idx, 1);
          } else {
            this.selected = [ itemId ];
          }

        }

        this.onRowMultiSelect(this.selected);

      }

    },

    setSelection(selected) {
      this.selected = selected;
    },

    format(val, type) {
      if(val === undefined || val === null)
        return '-';
      if(type == 'number')
        return this.formatNumber(val, 0);
      if(type == 'number2d')
        return this.formatNumber(val, 2);
      if(type == 'number3d')
        return this.formatNumber(val, 3);
      if(type == 'percentage2d')
        return this.formatPercentage(val, 2);
      if(type == 'percentage4d')
        return this.formatPercentage(val, 4);
      if(type == 'currencyInr')
        return this.formatCurrency(val, 0);
      if(type == 'currencyInr2d')
        return this.formatCurrency(val, 2);
      return val;
    },

    formatCell(head, item) {
      let klass = `px-4 py-2 text-${ head.align || 'start' }`;
      if(String(item.id).toLowerCase() == 'total') {
        klass += ' bg-grey-lighten-2 font-weight-bold';
      } else if(head.gradient) {
        if(head.gradient.mode == 'single')
          klass += ' ' + this.gradientSingle(item[head.key], head.gradient.min, head.gradient.max, head.gradient.color);
        else if(head.gradient.mode == 'lite')
          klass += ' ' + this.gradientLite(item[head.key], head.gradient.min, head.gradient.max, head.gradient.mid, head.gradient.minColor, head.gradient.maxColor);
        else
          klass += ' ' + this.gradient(item[head.key], head.gradient.min, head.gradient.max, head.gradient.mid, head.gradient.minColor, head.gradient.maxColor);
      }
      return klass;
    },

    formatCurrency(amount, d = 0) {

      if(amount === undefined || amount === null)
        return '-';

      let f = this.formatNumber(Math.abs(amount), d);
      
      return amount < 0 ? ('- ₹' + f) : ('₹' + f);

    },

    formatNumber(number, d = 0) {

      if(number === undefined || number === null)
        return '-';

      number = Math.round(number * Math.pow(10, d));

      let numberStr = Math.abs(number) + '';
      let l = numberStr.length;
      for(; l < d; l++)
        numberStr = '0' + numberStr;

      if(l == d)
        numberStr = '0.' + numberStr;
      else if(l <= 3 + d)
        numberStr = numberStr.substring(0, l - d) + (d ? '.' + numberStr.substring(l - d) : '');
      else if(l <= 5 + d)
        numberStr = numberStr.substring(0, l - 3 - d) + ',' + numberStr.substring(l - 3 - d, l - d) + (d ? '.' + numberStr.substring(l - d) : '')
      else
        numberStr = numberStr.substring(0, l - 5 - d) + ',' + numberStr.substring(l - 5 - d, l - 3 - d) + ',' + numberStr.substring(l - 3 - d, l - d) + (d ? '.' + numberStr.substring(l - d) : '');
      
      return (number < 0 ? '- ' : '') + numberStr;

    },

    formatPercentage(amount, d = 0) {
      let f = this.formatNumber(amount, d);
      return f == '-' ? f : f + '%';
    },

    gradient(amount, min, max, mid = 0, minColor = 'deep-orange', maxColor = 'light-green') {

      if(amount === undefined || amount === null || min == max)
        return '';

      if(amount < mid - (mid - min) / 10 * 9)
        return 'bg-' + minColor + '-darken-4';
      if(amount < mid - (mid - min) / 10 * 8)
        return 'bg-' + minColor + '-darken-3';
      if(amount < mid - (mid - min) / 10 * 7)
        return 'bg-' + minColor + '-darken-2';
      if(amount < mid - (mid - min) / 10 * 6)
        return 'bg-' + minColor + '-darken-1';
      if(amount < mid - (mid - min) / 10 * 5)
        return 'bg-' + minColor;
      if(amount < mid - (mid - min) / 10 * 4)
        return 'bg-' + minColor + '-lighten-1';
      if(amount < mid - (mid - min) / 10 * 3)
        return 'bg-' + minColor + '-lighten-2';
      if(amount < mid - (mid - min) / 10 * 2)
        return 'bg-' + minColor + '-lighten-3';
      if(amount < mid - (mid - min) / 10 * 1)
        return 'bg-' + minColor + '-lighten-4';
      if(amount <= mid - 0.00001)
        return 'bg-' + minColor + '-lighten-5';

      if(amount < mid + 0.00001)
        return '';

      if(amount <= mid + (max - mid) / 10 * 1)
        return 'bg-' + maxColor + '-lighten-5';
      if(amount <= mid + (max - mid) / 10 * 2)
        return 'bg-' + maxColor + '-lighten-4';
      if(amount <= mid + (max - mid) / 10 * 3)
        return 'bg-' + maxColor + '-lighten-3';
      if(amount <= mid + (max - mid) / 10 * 4)
        return 'bg-' + maxColor + '-lighten-2';
      if(amount <= mid + (max - mid) / 10 * 5)
        return 'bg-' + maxColor + '-lighten-1';
      if(amount <= mid + (max - mid) / 10 * 6)
        return 'bg-' + maxColor;
      if(amount <= mid + (max - mid) / 10 * 7)
        return 'bg-' + maxColor + '-darken-1';
      if(amount <= mid + (max - mid) / 10 * 8)
        return 'bg-' + maxColor + '-darken-2';
      if(amount <= mid + (max - mid) / 10 * 9)
        return 'bg-' + maxColor + '-darken-3';
      // if(amount <= max )
        return 'bg-' + maxColor + '-darken-4';

    },

    gradientLite(amount, min, max, mid = 0, minColor = 'amber', maxColor = 'lime') {

      if(amount === undefined || amount === null || min == max)
        return '';

      if(amount < mid - (mid - min) / 6 * 5)
        return 'bg-' + minColor;
      if(amount < mid - (mid - min) / 6 * 4)
        return 'bg-' + minColor + '-lighten-1';
      if(amount < mid - (mid - min) / 6 * 3)
        return 'bg-' + minColor + '-lighten-2';
      if(amount < mid - (mid - min) / 6 * 2)
        return 'bg-' + minColor + '-lighten-3';
      if(amount < mid - (mid - min) / 6 * 1)
        return 'bg-' + minColor + '-lighten-4';
      if(amount <= mid - 0.00001)
        return 'bg-' + minColor + '-lighten-5';

      if(amount < mid + 0.00001)
        return '';

      if(amount <= mid + (max - mid) / 6 * 1)
        return 'bg-' + maxColor + '-lighten-5';
      if(amount <= mid + (max - mid) / 6 * 2)
        return 'bg-' + maxColor + '-lighten-4';
      if(amount <= mid + (max - mid) / 6 * 3)
        return 'bg-' + maxColor + '-lighten-3';
      if(amount <= mid + (max - mid) / 6 * 4)
        return 'bg-' + maxColor + '-lighten-2';
      if(amount <= mid + (max - mid) / 6 * 5)
        return 'bg-' + maxColor + '-lighten-1';
      // if(amount <= max )
        return 'bg-' + maxColor;

    },

    gradientSingle(amount, min, max, color = 'yellow') {

      if(amount === undefined || amount === null || min == max)
        return '';

      if(amount < min)
        return '';
      if(amount < min + (max - min) / 6 * 1)
        return 'bg-' + color + '-lighten-5';
      if(amount < min + (max - min) / 6 * 2)
        return 'bg-' + color + '-lighten-4';
      if(amount < min + (max - min) / 6 * 3)
        return 'bg-' + color + '-lighten-3';
      if(amount < min + (max - min) / 6 * 4)
        return 'bg-' + color + '-lighten-2';
      if(amount < min + (max - min) / 6 * 5)
        return 'bg-' + color + '-lighten-1';
      // if(amount < max )
        return 'bg-' + color;

    },

  },

};
</script>



<style>

@media (hover: hover) {
  a:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}

tr.clickable {
  cursor: pointer;
}

tr.selected {
  background-color: #E3F2FD;
}

span.clickable:hover {
  cursor: pointer;
  text-decoration: underline;
}

</style>
