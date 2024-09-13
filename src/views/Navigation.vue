<template>
  <v-navigation-drawer v-model="drawer" :rail="rail" :rounded="false">

    <template #prepend>

      <v-list>
        <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            subtitle="sandra_a88@gmailcom"
            title="Sandra Adams"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>
      
      <v-list v-if="menu != 'main'" nav slim density="compact">
        <v-list-item @click="menu = 'main'"
            title="Main Menu" value="back"
            prepend-icon="mdi-chevron-left"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

    </template>

    <v-list v-if="menu == 'main'" :selected="[main]" nav slim density="compact">
      <v-list-item v-for="item of menuMain" @click="to(item)"
          :title="item.title" :value="item.value"
          :prepend-icon="item.prependIcon" :append-icon="item.appendIcon"
      ></v-list-item>
    </v-list>

    <v-list v-else-if="menu == 'books'" :selected="[bookId]" nav slim density="compact">
      <v-list-item v-for="item of books" @click="bookId = item.id" :title="item.name" :value="item.id">
        <template #prepend>
          <v-icon :color="item.color">mdi-notebook-outline</v-icon>
        </template>
      </v-list-item>
    </v-list>

    <v-list v-else-if="menu == 'heads'" :selected="[headId]" nav slim density="compact">
      <v-list-item v-for="item of heads" @click="headId = item.id" :title="item.name" :value="item.id">
        <template #prepend>
          <v-icon :color="item.color">{{ item.icon || 'mdi-label' }}</v-icon>
        </template>
      </v-list-item>
    </v-list>

    <v-list v-else-if="menu == 'tags'" :selected="[tagId]" nav slim density="compact">
      <v-list-item v-for="item of tags" @click="tagId = item.id" :title="item.name" :value="item.id">
        <template #prepend>
          <v-icon :color="item.color">{{ item.icon || 'mdi-tag' }}</v-icon>
        </template>
      </v-list-item>
    </v-list>

    <v-list v-else-if="menu == 'sources'" :selected="[sourceId]" nav slim density="compact">
      <v-list-item v-for="item of sources" @click="sourceId = item.id" :title="item.name" :value="item.id">
        <template #prepend>
          <v-icon :color="item.color">{{ item.icon || 'mdi-credit-card' }}</v-icon>
        </template>
      </v-list-item>
    </v-list>

    <v-list v-else-if="menu == 'fys'" :selected="[fyId]" nav slim density="compact">
      <v-list-item v-for="item of fyList" @click="fyId = item.id" :title="item.name" :value="item.id">
        <template #prepend>
          <v-icon>mdi-calendar</v-icon>
        </template>
      </v-list-item>
    </v-list>

    <Directory v-else-if="menu == 'folders'" :folders="folders" />

    <v-list v-else-if="menu == 'settings'" :selected="[setting]" nav slim density="compact">
      <v-list-item v-for="item of menuSettings" @click="setting = item.value" :title="item.title" :value="item.value">
        <template #prepend>
          <v-icon :color="item.color">{{ item.prependIcon }}</v-icon>
        </template>
      </v-list-item>
    </v-list>

  </v-navigation-drawer>
</template>



<script>

import Directory from '../components/Directory.vue';

export default {

  components: {
    Directory,
  },

  props: {

    rail: Boolean,

    profile: Object,
    fys: Array,

    books: Array,
    heads: Array,
    tags: Array,
    sources: Array,

    folders: Array,

  },

  data() {
    return {

      drawer: false,
      menu: 'main',

      main: null,
      menuMain: [

        { title:'Home',       value:'home',       path:'/',          prependIcon:'mdi-home' },
        { title:'Starred',    value:'starred',    path:'/starred',   prependIcon:'mdi-star' },
        { title:'Rescent',    value:'rescent',    path:'/rescent',   prependIcon:'mdi-history' },

        { title:'Books',      value:'books',      path:'/books',     prependIcon:'mdi-notebook-multiple'  },
        { title:'Heads',      value:'heads',      menu:'heads',      prependIcon:'mdi-label-multiple',       appendIcon:'mdi-chevron-right' },
        { title:'Tags',       value:'tags',       menu:'tags',       prependIcon:'mdi-tag-multiple',         appendIcon:'mdi-chevron-right' },
        { title:'FYs',        value:'fys',        menu:'fys',        prependIcon:'mdi-calendar-multiple',    appendIcon:'mdi-chevron-right' },
        { title:'Sources',    value:'sources',    path:'/sources',   prependIcon:'mdi-credit-card-multiple' },
        { title:'Folders',    value:'folders',    menu:'folders',    prependIcon:'mdi-folder-multiple',      appendIcon:'mdi-chevron-right' },

        { title:'Settings',   value:'settings',   menu:'settings',   prependIcon:'mdi-cog',                  appendIcon:'mdi-chevron-right' },

      ],

      setting: 'books',
      menuSettings: [
        { title:'Books',   value:'books',   prependIcon:'mdi-cogs' },
        { title:'Heads',   value:'heads',   prependIcon:'mdi-cogs' },
        { title:'Tags',    value:'tags',    prependIcon:'mdi-cogs' },
        { title:'Sources', value:'sources', prependIcon:'mdi-cogs' },
        { title:'Folders', value:'folders', prependIcon:'mdi-cogs' },
      ],

      bookId: null,
      headId: null,
      tagId: null,
      sourceId: null,

      fyId: null,

    }
  },

  computed: {

    fyList() {
      if(this.fys)
        return this.fys.map(fy => { return { id:fy, name:fy.toUpperCase() }; }).reverse();
      else
        return null;
    }

  },

  watch: {

    profile(curr, prev) {

      if(!this.profile)
        return;

      if(prev === undefined) {
        this.bookId   = this.bookId   || localStorage.getItem(`${ this.profile.id }.bookId`);
        this.headId   = this.headId   || localStorage.getItem(`${ this.profile.id }.headId`);
        this.tagId    = this.tagId    || localStorage.getItem(`${ this.profile.id }.tagId`);
        this.fyId     = this.fyId     || localStorage.getItem(`${ this.profile.id }.fyId`);
        this.sourceId = this.sourceId || localStorage.getItem(`${ this.profile.id }.sourceId`);
      } else {
        this.bookId   = localStorage.getItem(`${ this.profile.id }.bookId`);
        this.headId   = localStorage.getItem(`${ this.profile.id }.headId`);
        this.tagId    = localStorage.getItem(`${ this.profile.id }.tagId`);
        this.fyId     = localStorage.getItem(`${ this.profile.id }.fyId`);
        this.sourceId = localStorage.getItem(`${ this.profile.id }.sourceId`);
      }

    },

    books() {

      if(!this.books)
        return;

      if(!this.bookId || !this.books.find(book => book.id == this.bookId))
        this.bookId = this.books[0].id;

    },

    heads() {

      if(!this.heads)
        return;

      if(!this.headId || !this.heads.find(head => head.id == this.headId))
        this.headId = this.heads[0].id;

    },

    tags() {

      if(!this.tags)
        return;

      if(!this.tagId || !this.tags.find(tag => tag.id == this.tagId))
        this.tagId = this.tags[0].id;
    },

    fys() {

      if(!this.fys)
        return;

      if(!this.fyId || !this.fys.includes(this.fyId))
        this.fyId = this.fys[this.fys.length - 1];

    },

    sources() {

      if(!this.sources)
        return;

      if(!this.sourceId || !this.sources.find(source => source.id == this.sourceId))
        this.sourceId = this.sources[0].id;

    },

    bookId() {
      if(this.menu != 'books')
        return;
      this.$router.push({ path:'/books', query:{ id:this.bookId } });
      if(this.profile && this.bookId)
        localStorage.setItem(`${ this.profile.id }.bookId`, this.bookId);
    },

    headId() {
      if(this.menu != 'heads')
        return;
      this.$router.push({ path:'/head', query:{ id:this.headId } });
      if(this.profile && this.headId)
        localStorage.setItem(`${ this.profile.id }.headId`, this.headId);
    },

    tagId() {
      if(this.menu != 'tags')
        return;
      this.$router.push({ path:'/tag', query:{ id:this.tagId } });
      if(this.profile && this.tagId)
        localStorage.setItem(`${ this.profile.id }.tagId`, this.tagId);
    },

    fyId() {
      if(this.menu != 'fys')
        return;
      this.$router.push({ path:'/fy', query:{ id:this.fyId } });
      if(this.profile && this.fyId)
        localStorage.setItem(`${ this.profile.id }.fyId`, this.fyId);
    },

    sourceId() {
      if(this.menu != 'sources')
        return;
      this.$router.push({ path:'/sources', query:{ id:this.sourceId } });
      if(this.profile && this.sourceId)
        localStorage.setItem(`${ this.profile.id }.sourceId`, this.sourceId);
    },

    setting() {
      if(this.menu != 'settings')
        return;
      this.$router.push({ path:'/settings/' + this.setting });
    },

  },

  async mounted() {

    await this.$router.isReady();

    let route = this.menuMain.find(route => route.path == this.$route.path);
    if(route) {
      this.main = route.value;

    } else if(this.$route.path == '/books') {
      this.menu = 'books';
      this.main = 'books';
      this.bookId = this.$route.query.id;

    } else if(this.$route.path == '/head') {
      this.menu = 'heads';
      this.main = 'heads';
      this.headId = this.$route.query.id;

    } else if(this.$route.path == '/tag') {
      this.menu = 'tags';
      this.main = 'tags';
      this.tagId = this.$route.query.id;

    } else if(this.$route.path == '/fy') {
      this.menu = 'fys';
      this.main = 'fys';
      this.fyId = this.$route.query.id;

    } else if(this.$route.path == '/sources') {
      this.menu = 'sources';
      this.main = 'sources';
      this.sourceId = this.$route.query.id;

    } else if(this.$route.path == '/folder') {
      this.menu = 'folders';
      this.main = 'folders';

    } else if(this.$route.path.startsWith('/settings')) {
      this.menu = 'settings';
      this.main = 'settings';
      this.setting = this.$route.path.substring('/settings/'.length);

    }

  },

  methods: {

    show() {
      this.drawer = !this.drawer;
    },

    to(item) {

      this.main = item.value;

      if(item.path) {

        this.$router.push({ path:item.path });

      } else if(item.menu) {

        this.menu = item.menu;

        if(this.menu == 'books')
          this.$router.push({ path:'/books',   query:{ id:this.bookId } });
        
        else if(this.menu == 'heads')
          this.$router.push({ path:'/head',    query:{ id:this.headId } });
        
        else if(this.menu == 'tags')
          this.$router.push({ path:'/tag',     query:{ id:this.tagId } });
        
        else if(this.menu == 'fys')
          this.$router.push({ path:'/fy',      query:{ id:this.fyId } });
        
        else if(this.menu == 'sources')
          this.$router.push({ path:'/sources', query:{ id:this.sourceId } });
        
        else if(this.menu == 'settings')
          this.$router.push({ path:'/settings/' + this.setting });

      }

    },

  }

};
</script>
