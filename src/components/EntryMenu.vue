<template>
  <v-speed-dial location="left center" :close-on-content-click="menu != 'main'">
    
    <template #activator="{ props }">
      <v-btn @click="menu = 'main'"
          v-bind="props"
          icon="mdi-dots-vertical"
          density="compact"
          variant="text"
          rounded="circle"
      ></v-btn>
    </template>

    <template v-if="menu == 'main'">
      <v-btn v-if="type == 'db'" @click="$emit('select', 'drag')" icon="mdi-drag-vertical"     density="comfortable" rounded="circle" class="opacity-70" />
      <v-btn v-if="type == 'db'" @click="$emit('select', 'edit')" icon="mdi-pencil"            density="comfortable" rounded="circle" class="opacity-70" />
      <v-btn                     @click="$emit('select', 'copy')" icon="mdi-content-duplicate" density="comfortable" rounded="circle" class="opacity-70" />
      <v-btn v-if="type == 'db'" @click="menu = 'delete'"         icon="mdi-delete"            density="comfortable" rounded="circle" class="opacity-70" />
    </template>

    <template v-else-if="menu == 'delete'">
      <v-btn                                    icon="mdi-close" density="comfortable" rounded="circle" />
      <v-btn @click="$emit('select', 'delete')" icon="mdi-check" density="comfortable" rounded="circle" />
      <v-chip                                 variant="elevated" density="comfortable" rounded="pill" >Delete this entry ?</v-chip>
    </template>

  </v-speed-dial>
</template>



<script>

export default {

  props: {
    type: String,
  },

  data() {
    return {
      menu:'main', // 'delete', null
    };
  },

};

</script>
