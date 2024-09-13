<template>
  <v-table density="compact" hover style="text-wrap:nowrap">
    <template v-for="group in entryGroups">

      <thead>
        <tr>
          <th colspan="100%" class="bg-grey-lighten-3">

            <span v-if="group.name" class="mr-2">{{ group.name }}</span>
            <span v-else-if="group.id" class="mr-2 text-disabled">({{ group.id }})</span>

            <template v-if="group.source == 'fs'">
              <v-icon v-if="group.starred" icon="mdi-star" color="amber-accent-4" class="mr-2 mb-1" />
              <v-icon icon="mdi-content-save" color="grey" class="mb-1" />
            </template>
            <template v-else-if="group.source == 'db'">
              <v-btn @click="$emit('toggle-star', group)"
                  icon="mdi-star" :color="group.starred ? 'amber-accent-4' : 'grey'"
                  density="comfortable" rounded="circle" variant="plain" />
              <v-btn @click="$emit('action', 'add', null, group.id)"
                  icon="mdi-plus-circle-outline" color="black"
                  density="comfortable" rounded="circle" variant="plain" />
            </template>

          </th>
        </tr>
      </thead>

      <tbody>
        <template v-for="(entry, index) in group.entries" :key="index">

          <tr v-if="entry.type == 'transfer'" >
            <td class="text-start">
              <v-icon icon="mdi-calendar" size="small" color="grey" class="mb-1"></v-icon>
              {{ entry.date }}
            </td>
            <td class="text-end" >{{ entry.sourceFrom.name }} →</td>
            <td class="text-center">{{ currency(entry.amount) }}</td>
            <td class="text-start">→ {{ entry.sourceTo.name }}</td>
            <td class="text-start">-</td>
            <td><EntryType :type="entry.type" /></td>
            <td class="text-start">-</td>
            <td class="text-start">{{ entry.note || '-' }}</td>
            <td class="text-end px-0">
              <EntryMenu :type="group.source" @select="(action) => $emit('action', action, entry)" />
            </td>
          </tr>

          <tr v-else-if="entry.type == 'relocate'" >
            <td class="text-start">
              <v-icon icon="mdi-calendar" size="small" color="grey" class="mb-1"></v-icon>
              {{ entry.date }}
            </td>
            <td class="text-end" >{{ entry.bookFrom.name }} →</td>
            <td class="text-center">{{ currency(entry.amount) }}</td>
            <td class="text-start">→ {{ entry.bookTo.name }}</td>
            <td class="text-start">-</td>
            <td><EntryType :type="entry.type" /></td>
            <td class="text-start">-</td>
            <td class="text-start">{{ entry.note || '-' }}</td>
            <td class="text-end px-0">
              <EntryMenu :type="group.source" @select="(action) => $emit('one', action, entry)" />
            </td>
          </tr>

          <tr v-else >
            <td class="text-start pr-2">
              <v-icon icon="mdi-calendar" size="small" color="grey" class="mb-1"></v-icon>
              {{ entry.date }}
            </td>
            <td class="text-start px-2">
              <v-icon v-if="entry.book"
                icon="mdi-notebook-outline"
                :color="entry.book.color || 'grey'"
                size="small" class="mb-1"></v-icon>
              {{ entry.book ? entry.book.name : '-' }}
            </td>
            <td class="text-center px-2">{{ entry.head ? entry.head.name : '-' }}</td>
            <td class="text-center px-2">{{ entry.tag ? entry.tag.name : '-' }}</td>
            <td class="text-end    px-2">{{ currency(entry.amount) }}</td>
            <td class="text-center px-0"><EntryType :type="entry.type" class="mb-1" /></td>
            <td class="text-start  px-2">{{ entry.source ? entry.source.name : '-' }}</td>
            <td class="text-start  pl-2">{{ entry.note || '-' }}</td>
            <td class="text-end px-0">
              <EntryMenu :type="group.source" @select="(action) => $emit('action', action, entry)" />
            </td>
          </tr>

        </template>
      </tbody>

      <tr class="bg-grey-lighten-1"><td colspan="100%" height="16px"></td></tr>

    </template>
  </v-table>
</template>


<script>

import _ from "lodash";

import Format from "@zero65tech/format";
import EntryType from './EntryType.vue';
import EntryMenu from './EntryMenu.vue';

export default {

  components: {
    EntryType,
    EntryMenu,
  },

  props: {

    books: Array,
    heads: Array,
    tags: Array,
    sources: Array,

    data: Object,
    sort: String,

  },

  computed: {

    entryGroups() {

      let entryGroups = _.cloneDeep(this.data);

      let fn = (arr, id) => {
        if(!arr)
          return { id, name:id };
        return arr.find(item => item.id == id) || { id, name:id }
      };

      for(let entryGroup of entryGroups) {
        for(let entry of entryGroup.entries) {

          if(entry.bookId)
            entry.book     = fn(this.books, entry.bookId);
          if(entry.bookFromId)
            entry.bookFrom = fn(this.books, entry.bookFromId);
          if(entry.bookToId)
            entry.bookTo   = fn(this.books, entry.bookToId);
          
          if(entry.headId)
            entry.head = fn(this.heads, entry.headId);
          if(entry.tagId)
            entry.tag  = fn(this.tags,  entry.tagId);
          
          if(entry.sourceId)
            entry.source     = fn(this.sources,  entry.sourceId);
          if(entry.sourceFromId)
            entry.sourceFrom = fn(this.sources,  entry.sourceFromId);
          if(entry.sourceToId)
            entry.sourceTo   = fn(this.sources,  entry.sourceToId);

        }
      }

      return this.sort == 'desc' ? entryGroups.reverse() : entryGroups;

    }

  },

  methods: {

    currency(amount) {
      return Format.currency(amount, 2);
    },

  },
};
</script>


<style>

  table > tbody > tr > td {
    height: 32px !important;
  }

</style>
