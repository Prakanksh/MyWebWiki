<template>
  <v-card class="mx-auto mt-2">
    <v-card-title>
      <v-row justify="space-between">
        <v-card-title>Enter Entry Details</v-card-title>
        <v-btn icon="mdi-close" small variant="plain" @click="$emit('close')"></v-btn>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col :cols="12" :sm="12" :md="6" :lg="4" :xl="4" :xxl="4">
            <v-select label="Book" v-model="data.bookId" :items="books" item-title="name" item-value="id"></v-select>
          </v-col>
          <v-col :cols="12" :sm="12" :md="6" :lg="4" :xl="4" :xxl="4">
            <v-select label="Type" v-model="data.type" :items="types" item-title="name" item-value="id"></v-select>
          </v-col>
          <v-col :cols="12" :sm="12" :md="6" :lg="4" :xl="4" :xxl="4">
            <v-select label="Group" v-model="data.groupId" :items="groups" item-title="name" item-value="id"></v-select>
          </v-col>
        
          <v-col :cols="12" :sm="12" :md="6" :lg="4" :xl="4" :xxl="4">
            <v-text-field label="Date" v-model="data.date" type="date" outlined required></v-text-field>
          </v-col>
          <v-col :cols="12" :sm="12" :md="6" :lg="4" :xl="4" :xxl="4">
            <v-text-field label="Amount" v-model.number="data.amount" type="number" outlined required></v-text-field>
          </v-col>
          <v-col :cols="12" :sm="12" :md="6" :lg="4" :xl="4" :xxl="4">
            <v-select label="Tag" v-model="data.tagId" :items="tags" item-title="name" item-value="id"></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col :cols="12" :sm="12" :md="6" :lg="4" :xl="4" :xxl="4">
            <v-select label="Head" v-model="data.headId" :items="heads" item-title="name" item-value="id"></v-select>
          </v-col>
          <v-col :cols="12" :sm="12" :md="6" :lg="4" :xl="4" :xxl="4">
            <v-select label="Source" v-model="data.sourceId" :items="sources" item-title="name" item-value="id"></v-select>
          </v-col>
          <v-col :cols="12" :sm="12" :md="12"  :lg="4" :xl="4" :xxl="4">
            <v-text-field label="Note" v-model="data.note" outlined></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="end">
          <v-col :cols="3" :sm="12" :md="3"  :lg="2" :xl="2" :xxl="2" class="text-end">
            <v-btn @click="$emit('save')" color="primary" :disabled="disabled">Submit</v-btn>
          </v-col>
        </v-row>

      </v-form>
    </v-card-text>
  </v-card>
</template>



<script>

import Utils from "@zero65tech/track";

export default {

  props: {

    books: Array,
    heads: Array,
    tags: Array,
    sources: Array,

    groups: Array,

    data: Object,
    disabled: Boolean,

  },

  computed: {

    types() {
      return Utils.types
    }

  },

};

</script>