<template>

  <v-chip rounded density="comfortable" size="small" :color="color">{{ type }}</v-chip>

</template>



<script>

export default {

  props: {
    type: String,
  },

  computed: {

    color() {
      if(this.type == 'credit')
        return 'green-darken-4';
      else if(this.type == 'debit')
        return 'red-darken-4';
      else if(this.type == 'income')
        return 'green';
      else if(this.type == 'expense')
        return 'orange';
      else if(this.type == 'refund')
        return 'orange';
      else if(this.type == 'tax')
        return 'red';
      else
        return 'grey'
    },

  }

};
</script>
