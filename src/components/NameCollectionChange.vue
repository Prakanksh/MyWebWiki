<template>
  <v-dialog max-width="700" persistent :fullscreen="$vuetify.display.xs">
    <template v-slot:activator="{ props: activatorProps }">
      <v-fab v-bind="activatorProps" variant="flat" class="opacity-50" icon="mdi-pencil" rounded="circle" size="20" ripple></v-fab>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card class="justify-center" style="height: 500px;">
        <v-card-title class="text-center">Edit</v-card-title>
        <v-card-text class="overflow-y-auto">
          <v-row>
            <v-col :cols="12" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6">
              <v-text-field label="Enter Name" v-model="item.name" class="mb-4" ></v-text-field>
            </v-col>
            <v-col :cols="12" :sm="6" :md="2" :lg="6" :xl="6" :xxl="6">
            <v-text-field v-if="api !== '/api/folders'" label="Add Collection" v-model="item.collection" class="mb-4"></v-text-field>
            </v-col>
          </v-row>
          <v-chip-group v-model="selectedOption" class="mb-4" row mandatory>
            <v-chip value="icon" class="v-chip--pill" color="primary" rounded="pill" :class="selectedOption === 'icon' ? 'darken-1' : ''">
              Icon
            </v-chip>
            <v-chip value="color" class="v-chip--pill" color="primary" rounded="pill" :class="selectedOption === 'color' ? 'darken-1' : ''">
              Color
            </v-chip>
          </v-chip-group>
          <IconList v-if="selectedOption === 'icon'" :setIcon="item.icon" @iconSelected="(icon) => item.icon = icon" />
          <IconColorList v-if="selectedOption === 'color'" :api="api" :setColor="item.color" @colorSelected="(color) => item.color = color" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="submitSelection(isActive)">Submit</v-btn>
          <v-btn text="Close" @click="isActive.value = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
  
<script>
import IconList from './IconList.vue';
import IconColorList from './IconColorList.vue';
export default {
  components: {
    IconList,
    IconColorList,
  },
  props: {
    profile: Object,
    api: String,
    item: Object,
  },
  data() {
    return {
      selectedOption: 'icon',
    };
  },

  methods: {
    async submitSelection(isActive) {
      let newItem = {
        id: this.item.id,
        name: this.item.name,
        collection: this.item.collection,
        icon: this.item.icon,
        color : this.item.color
      }
      
      this.$emit('selectedItem', newItem); 
      isActive.value = false; 
    },
  },
};
</script>