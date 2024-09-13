<template>

  <div v-if="folder && summary" class="d-flex overflow-x-auto overflow-y-hidden">
    <v-spacer></v-spacer>
    <div class="d-flex mx-lg-2 my-2">

      <SummaryChart :title="{ text:'Heads', icon:'mdi-label-multiple' }" :summary="summary.books"
          category='head' :categoryArr="heads"
          series="book" :seriesArr="books" />

      <SummaryChart :title="{ text:'Tags', icon:'mdi-tag-multiple' }" :summary="summary.books"
          category='tag' :categoryArr="tags" 
          series="book" :seriesArr="books"
          class="ml-2"/>

    </div>
    <v-spacer></v-spacer>
  </div>


  <div v-if="folder"
      class="d-flex pa-2"
      :style="folder.charts?.pin ? 'margin-top:431px' : ''">

    <v-btn @click="showGroupForm" color="surface-variant" variant="flat" class="mt-2 text-none rounded">
      <v-icon left>mdi-plus</v-icon>
      Create a new group
    </v-btn>

    <v-spacer/>

    <v-btn @click="updateChartsFlip"
        icon="mdi-reorder-vertical"
        :color="folder.charts?.flip ? 'black' : 'white'"
        rounded="circle" variant="plain" />
    <v-btn
        icon="mdi-plus-minus-variant"
        color="white"
        rounded="circle" variant="plain" />
    <v-btn @click="updateSort"
        :icon="'mdi-' + (folder.sort ? ('sort-calendar-' + folder.sort + 'ending') : 'sort')"
        :color="folder.sort ? 'black' : 'white'"
        rounded="circle" variant="plain" />

  </div>
  

  <EntryGroups v-if="entryGroups" @toggle-star="toggleStar" @one="showEntryForm"
      :books="books" :heads="heads" :tags="tags" :sources="sources"
      :data="entryGroups" :sort="folder?.sort"
      class="mx-lg-2 mt-2" />


  <v-dialog v-model="dialogGroup" persistent max-width="500">
    <v-card>
      <v-card-title>Create a new group</v-card-title>
      <v-card-text>
        <v-text-field label="Name" v-model="groupName"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="dialogGroup = false">Cancel</v-btn>
        <v-btn @click="addGroup">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="dialogEntry" :fullscreen="$vuetify.display.xs" persistent>
    <EntryForm @save="saveEntry" @close="dialogEntry = false"
        :books="books" :heads="heads" :tags="tags" :sources="sources" :groups="groups"
        :data="entryData" :disabled="disabled" />
  </v-dialog>

</template>



<script>

import _ from "lodash";

import Obj from "@zero65tech/object";
import DtStr from "@zero65tech/date-string-ist";
import Utils from "@zero65tech/track";

import EntryGroups from '../components/EntryGroups.vue';
import EntryForm from '../components/EntryForm.vue';
import SummaryChart from '../components/SummaryChart.vue';

export default {

  components: {
    EntryGroups,
    EntryForm,
    SummaryChart
  },

  props: {

    doGet: Function,
    doPost: Function,
    doPut: Function,
    doPatch: Function,
    cancelReq: Function,

    profile: Object,
    fys: Array,

    books: Array,
    heads: Array,
    tags: Array,
    sources: Array,
    folders: Array,

    starred: Boolean,

  },

  data() {
    return {

      folder: null,
      entryGroups: null,
      summary: null,

      dialogGroup: false,
      groupName: null,

      dialogEntry: false,
      entryData: null,

      disabled: false,

    };
  },

  computed: {

    groups() {
      return this.entryGroups
        .filter(entryGroup => entryGroup.source =='db')
        .map(entryGroup => {
          return {
            name: entryGroup.name || ('#' + entryGroup.id),
            id: entryGroup.id
          };
        });
    }

  },

  watch: {

    profile(curr, prev) {

      if(this.starred) {
        this.entryGroups = null;
        return this.fetchData();
      }

      if(prev === undefined && this.$route.query.id) {
        localStorage.setItem(`${ this.profile.id }.folderId`, this.$route.query.id);
        return this.fetchData();
      }

      let folderId = localStorage.getItem(`${ this.profile.id }.folderId`);
      this.$router.push({ query: folderId ? { id:folderId } : {} });

    },

    folders() {

      if(this.starred)
        return;

      if(!this.folders)
        return;

      if(this.$route.query.id)
        this.folder = this.folders.find(folder => folder.id == this.$route.query.id);

      if(!this.folder)
        this.$router.push({ query:{ id:this.folders[0].id } });

    },
    
    starred() {

      if(!this.starred)
        return;

      this.folder = null;
      this.entryGroups = null;
      this.summary = null;

      this.fetchData();

    },

    '$route.query.id'() {

      if(this.starred)
        return;

      if(this.$route.query.id) {
        this.folder = this.folders ? this.folders.find(folder => folder.id == this.$route.query.id) : null;
        this.entryGroups = null;
        this.summary = null;
        localStorage.setItem(`${ this.profile.id }.folderId`, this.$route.query.id);
        this.fetchData();
      } else {
        this.folder = null;
        this.entryGroups = null;
        this.summary = null;
      }

    },

  },

  mounted() {

    if(!this.profile)
      return;

    if(this.starred)
      return this.fetchData();

    if(!this.$route.query.id) {
      let folderId = localStorage.getItem(`${ this.profile.id }.folderId`);
      if(folderId)
        this.$router.push({ query:{ id:folderId } });
      return;
    }

    if(!this.folders)
      return this.fetchData();

    this.folder = this.folders.find(folder => folder.id == this.$route.query.id);
    if(this.folder)
      this.fetchData();
    else
      this.$router.push({ query:{ id:this.folders[0].id } });

  },

  methods: {

    async fetchData() {
      
      let resp = await this.doGet('/api/entry-groups', {
        profileId: this.profile.id,
        folderId: this.$route.query.id,
        starred: this.starred ? true : undefined
      }, 'entry-groups');

      if(!resp.success)
        return;

      let { entryGroups, entryKeys } = resp.data;

      for(let entryGroup of entryGroups)
        entryGroup.entries = entryGroup.entries.map(entry => _.zipObject(entryKeys[entry[1]] || entryKeys['default'], entry));

      this.entryGroups = entryGroups;

      if(!this.starred)
        this.summary = Utils.summary(entryGroups);

    },

    showGroupForm() {
      this.dialogGroup = true;
      this.groupName = null;
    },

    showEntryForm(action, entry, groupId) {

      this.dialogEntry = true;

      if(action == 'add')
        this.entryData = {
          id: null,
          type: 'expense',
          date: DtStr.today(),
          amount: null,
          bookId: this.books[0].id,
          headId: this.heads[0].id,
          tagId: this.tags[0].id,
          sourceId: this.sources[0].id,
          note: null,
          groupId: groupId,
          seq: Utils.seq()
        };

      else // if(action == 'copy' || action == 'edit')
        this.entryData = {
          id: action == 'edit' ? entry.id : null,
          type: entry.type,
          date: entry.date,
          amount: entry.amount,
          bookId: entry.bookId,
          headId: entry.headId,
          tagId: entry.tagId,
          sourceId: entry.sourceId,
          note: entry.note,
          groupId: groupId,
          seq: action == 'edit' ? entry.seq : Utils.seq()
        };

    },

    async addGroup() {

      this.disabled = true;

      let resp = await this.doPost('/api/groups', {
        profileId: this.profile.id,
        name: this.groupName,
        folderId: this.$route.query.id,
        seq: Utils.seq()
      });

      this.disabled = false;

      if(!resp.success)
        return;
      
      this.entryGroups.push({ ...resp.data, source:'db', entries:[] });

      this.dialogGroup = false;

    },

    async toggleStar(group) {

      let resp = await this.doPatch('/api/groups', {
        profileId: this.profile.id,
        id: group.id,
        starred: !group.starred,
      })

      if(resp.success)
        this.entryGroups.find(entryGroup => entryGroup.id == group.id).starred = !group.starred;

    },

    async saveEntry() {

      this.disabled = true;

      let resp;
      if(this.entryData.id)
        resp = await this.doPut('/api/entries', { profileId:this.profile.id, ...this.entryData });
      else
        resp = await this.doPost('/api/entries', { profileId:this.profile.id, ...this.entryData });

      this.disabled = false;

      if(!resp.success)
        return;

      this.entryGroups
          .find(entryGroup => entryGroup.id == this.entryData.groupId)
          .entries.push(this.entryData);

      this.dialogEntry = false;

    },

    async updateSort() {

      let sort;
      if(this.folder.sort === undefined || this.folder.sort === null)
        sort = 'asc';
      else if(this.folder.sort == 'asc')
        sort = 'desc';
      else // if(this.folder.sort == 'desc')
        sort = null;

      let resp = await this.doPatch('/api/folders', {
        profileId: this.profile.id,
        id: this.folder.id,
        'sort': sort,
      });

      if(resp.success)
        this.folder.sort = sort;

    },

    async updateChartsFlip() {

      let flip;
      if(this.folder.charts?.flip === undefined || this.folder.charts.flip === null)
        flip = true;
      else if(this.folder.charts.flip === true)
        flip = false;
      else // if(this.folder.charts.flip === false)
        flip = null;
      
      let resp = await this.doPatch('/api/folders', {
        profileId: this.profile.id,
        id: this.folder.id,
        'charts.flip': flip,
      });

      if(resp.success)
        _.set(this.folder, [ 'charts', 'flip' ], flip);

    }

  },

}

</script>