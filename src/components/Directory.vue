<template>

  <v-treeview :items="items" class="z-directory"
      density="compact" select-strategy="single-independent" open-strategy="multiple"
      @click:select="select" @click:open="select">
    <template #prepend="{ isActive, item, open }">
      <v-icon :style="item.children ? '' : 'margin-left:28px'">
        {{ icon(item, isActive) }}
      </v-icon>
    </template>
  </v-treeview>

</template>



<script>

import { VTreeview } from 'vuetify/labs/VTreeview';

export default {

  components: {
    VTreeview,
  },

  props: {
    folders: Array,
  },

  computed: {

    items() {

      if(!this.folders)
        return [];

      let directory = [];

      for(let folder of this.folders) {

        let path = folder.name.split('/');

        let dir = directory;
        while(path.length) {

          let title = path.shift();
          let sub = dir.filter(item => item.title == title)[0];
          if(!sub) {
            sub = { title };
            dir.push(sub);
          }

          if(path.length) {
            sub.children = sub.children || [];
            dir = sub.children;
          } else if(sub.id) {
            dir.push({ id:folder.id, title, value:folder.id });
          } else {
            sub.id = folder.id;
            sub.value = folder.id;
          }

        }

      }

      return directory;

    }

  },

  methods: {

    icon(item, isActive) {
      if(!item.children)
        return 'mdi-file-outline';
      if(isActive)
        return 'mdi-folder-open-outline';
      if(item.id)
        return 'mdi-folder-file-outline';
      return 'mdi-folder-outline';
    },

    select(val, cal) {
      if(typeof val.id == 'string')
        this.$router.push({ path:'/folder', query:{ id: val.id } });
    },

  },

};

</script>



<style>
  .z-directory .v-list-item--slim .v-list-item__prepend>.v-icon~.v-list-item__spacer {
    width: 4px
  }
</style>
