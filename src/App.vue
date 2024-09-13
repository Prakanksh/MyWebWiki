<template>
  <v-app style="background-color: #FCE4EC;">
    <v-container>
      <div class="text-center">
        <div class="text-h5 text-secondary mb-n3" style="font-family: 'Pacifico', cursive;">
          Hi! I am Prakanksha and this is all me.
        </div>
      </div>
      <v-card 
        max-width="300"  
        square 
        class="mx-auto pa-2 pt-3 pb-4 d-flex"
        style="position: relative; margin-top: 20px;"
      >
        <v-img
          :src="screenshot"
          alt="Screenshot"
          aspect-ratio="1"
          class="pa-2"
        ></v-img>
      </v-card>
    </v-container>
    <v-speed-dial
      location="right center"
      transition="fade-transition"
      style="width: 500px;"
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-fab
          v-bind="activatorProps"
          size="small"
          icon="mdi-account-box"
          rounded="circle"
          color="white"
        ></v-fab>
      </template>

      <v-btn key="1" rounded="circle" icon="mdi-github" color="white"  @click="openLink('https://github.com/Prakanksh')"></v-btn>
      <v-btn key="2" rounded="circle" icon="mdi-linkedin" color="white" @click="openLink('https://www.linkedin.com/in/prakanksha-nagpal-b6a90021b')"></v-btn>
      <v-btn key="3" rounded="circle" icon="mdi-gmail" color="white" @click="openLink('https://mail.google.com/mail/?view=cm&fs=1&to=nagpalprakankshabvpy@gmail.com')"></v-btn>
      <v-btn key="4" rounded="circle" icon="mdi-instagram" color="white" @click="openLink('https://www.instagram.com/_pra_amodini_')"></v-btn>
    </v-speed-dial>
  </v-app>
</template>

<script>
import screenshotImage from '@/assets/Screenshot.jpg';

export default {
  data() {
    return {
      screenshot: screenshotImage
    };
  },
  methods: {
    openLink(url) {
      window.open(url, '_blank');
    }
  }
};
</script>
