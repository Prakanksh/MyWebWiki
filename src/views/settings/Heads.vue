<template>

  <div class="mx-lg-2 my-2">
    <Settings
        :doPatch="doPatch" :profile="profile"
        api="/api/heads"
        :fields="fields" :items="heads" icon="mdi-label" />
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

  },

  data() {
    return {
      fields: [
        { name:'Collection', key:'collection' }
      ]
    }
  }

}

</script>
