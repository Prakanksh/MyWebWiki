<template>
  <v-card-text class="pa-4 overflow-y-auto" style="max-height: 400px;">
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="searchQuery" label="Search Icons" dense prepend-inner-icon="mdi-magnify"/>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col v-for="icon in searchQuery ? filteredIcons : suggestedIcons" :key="icon.n"  :cols="4" :sm="2" :md="2" :lg="2" :xl="2" :xxl="2" class="d-flex justify-center">
        <v-icon :size="30" :class="[selectedIcon === icon.n ? 'text-primary elevation-1 rounded-circle bg-lighten-4' : '']" @click="selectIcon(icon.n)">
          {{ icon.n }}
        </v-icon>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css';
import Icons from '../assets/icon.json';

export default {
  props: {
    setIcon: String,
  },
  data() {
    return {
      selectedIcon: this.setIcon,
      searchQuery: '',
      suggestedIcons: [
        { n: "mdi-home", st: [] },
        { n: "mdi-account", st: [] },
        { n: "mdi-bell", st: [] },
        { n: "mdi-calendar", st: [] },
        { n: "mdi-camera", st: [] },
        { n: "mdi-cart", st: [] },
      ],
    };
  },
  computed: {
    allIcons() {
      let iconsFromJson = [];
      if (Icons.i && Array.isArray(Icons.i)) {
        iconsFromJson = Icons.i.map(iconObject => {
          return {
            n: iconObject.n ? `mdi-${iconObject.n}` : '',
            st: iconObject.st || []
          };
        }).filter(icon => icon.n); 
      }
      return iconsFromJson;
    },
    filteredIcons() {
      return this.allIcons.filter(icon => {
        const searchLower = this.searchQuery.toLowerCase();
        return icon.n.toLowerCase().includes(searchLower) ||
               icon.st.some(tag => tag.toLowerCase().includes(searchLower));
      });
    },
  },
  methods: {
    selectIcon(icon) {
      this.selectedIcon = icon;
      this.$emit('iconSelected', icon); 
    },
  },
};
</script>


