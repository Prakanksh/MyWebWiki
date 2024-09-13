<template>

  <div class="mx-lg-2 my-2">
    <Settings
        :doPatch="doPatch" :profile="profile"
        api="/api/books"
        :items="books" icon="mdi-notebook-outline" />
  </div>

</template>



<script>

import Settings from '../../components/Settings.vue'

export default {

  components: {
    Settings
  },

  props: {

    doGet: Function,
    doPost: Function,
    doPut: Function,
    doPatch: Function,
    cancelReq: Function,

    profile: Object,

    books: Array,
    heads: Array,
    tags: Array,
    sources: Array,
    folders: Array,

  }

}

</script>
