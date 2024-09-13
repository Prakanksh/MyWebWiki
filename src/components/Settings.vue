<template>
  <v-table density="compact" hover style="text-wrap:nowrap">
    <thead>
      <tr>
        <th>Name</th>
        <th v-for="field in fields" :key="field.key" class="px-4" >
          {{ field.name }}
        </th>
        <th v-if="api !== '/api/books'">Edit</th>
      </tr>
    </thead>
    <tbody>

      <tr v-for="(item, index) in items" :key="item.id"
          :draggable="true"
          @dragstart="event => onDragStart(event, index)"
          @dragover="event => onDragOver(event, index)" >

        <td class="d-flex align-center">
          <v-icon :color="item.color || '#9E9E9E'" class="mr-2">
            {{ item.icon || icon }}
          </v-icon>
          <span>{{ item.name }}</span>
        </td>

        <td v-for="field in fields" :key="field.key">
          {{ item[field.key] }}
        </td>

        <td v-if="api !== '/api/books'">
          <NameCollection @selectedItem="onEdit" :profile="profile" :api="api" :item="item"/>
        </td>
      </tr>

      <tr ref="placeholder" @dragover="event => event.preventDefault()" @drop="onDrop" style="display:none;">
        <td colspan="100%" class="pa-1">
          <div class="py-3 border-dashed text-center bg-grey-lighten-4">Drop here ...</div>
        </td>
      </tr>

    </tbody>
  </v-table>
</template>



<script>

import Utils from "@zero65tech/track";
import NameCollection from "./NameCollectionChange.vue";

export default {

  components: {
    NameCollection,
  },

  props: {

    doPatch: Function,

    profile: Object,

    api: String,

    fields: Array,
    items: Array,
    icon: String,

  },

  data() {
    return {
      dragged: {
        index: null,
        replace: null,
      },
    }
  },

  methods: {

    onDragStart(event, index) {

      let node = event.target;

      this.dragged.index = index;
      this.dragged.replace = null;

      event.dataTransfer.dropEffect = "move";

    },
    
    onDragOver(event, index) {

      event.preventDefault();

      let node = event.target;
      while(node.tagName != 'TR')
        node = node.parentNode;

      if(index == this.dragged.index) {
        this.$refs.placeholder.style.display = 'none';
        return;
      } else if(this.dragged.replace === null) {
        if(index == this.dragged.index + 1)
          return;
        node.parentNode.insertBefore(this.$refs.placeholder, node);
        this.dragged.replace = index;
      } else if(index >= this.dragged.replace) { // moving downwards
        if(index == this.dragged.index - 1) {
          this.$refs.placeholder.style.display = 'none';
          return;
        }
        node.parentNode.insertBefore(this.$refs.placeholder, node.nextSibling);
        this.dragged.replace = index + 1;
      } else if(index < this.dragged.replace) { // moving upwards
        if(index == this.dragged.index + 1) {
          this.$refs.placeholder.style.display = 'none';
          return;
        }
        node.parentNode.insertBefore(this.$refs.placeholder, node);
        this.dragged.replace = index;
      }

      this.$refs.placeholder.style.display = '';

      event.dataTransfer.dropEffect = "move";

    },
    
    async onDrop() {

      event.preventDefault();

      let item = this.items[this.dragged.index];

      let seq = item.seq;

      if(this.dragged.replace == 0)
        item.seq = this.items[0].seq / 2;
      else if(this.dragged.replace == this.items.length)
        item.seq = Utils.seq();
      else
        item.seq = (this.items[this.dragged.replace - 1].seq + this.items[this.dragged.replace].seq) / 2;

      this.items.sort((a,b) => a.seq < b.seq ? -1 : 1);

      this.$refs.placeholder.style.display = 'none';

      let resp = await this.doPatch(this.api, { profileId: this.profile.id, id: item.id, seq:item.seq });
      
      if(!resp.success) {
        item.seq = seq;
        this.items.sort((a,b) => a.seq < b.seq ? -1 : 1);
      }

    },

    async onEdit(Item){
      let resp = await this.doPatch(this.api, {
        profileId: this.profile.id,
        id: Item.id,
        name: Item.name,
        collection: Item.collection,
        icon: Item.icon,
        color : Item.color
      });

      if(!resp.success)
        return

      const itemToUpdate = this.items.find(item => item.id === Item.id);
      if (itemToUpdate) {
        Object.assign(itemToUpdate, {
          name: Item.name,
          collection: Item.collection,
          icon: Item.icon,
          color: Item.color
        });
      }
    }

  },

};
</script>
