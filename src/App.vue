<template>
  <v-app style="background-color: #FCE4EC; min-height: 100vh; display: flex; flex-direction: column;">
    <v-container>
      <div class="text-center">
        <div class="text-h5 mb-n3" style="font-family: 'Pacifico', cursive; color: black;">
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
    
    <v-spacer></v-spacer>
    <v-divider></v-divider>
    <v-container class="d-flex align-center justify-center" style="padding-bottom: 20px;">
      <span class="text-h6 mr-3" style="font-family: 'Pacifico', cursive;">Reach me out:</span>
      <div class="d-flex justify-center">
        <v-btn key="1" rounded="circle" icon="mdi-github" color="white" class="mx-2" @click="openLink('https://github.com/Prakanksh')"></v-btn>
        <v-btn key="2" rounded="circle" icon="mdi-linkedin" color="white" class="mx-2" @click="openLink('https://www.linkedin.com/in/prakanksha-nagpal-b6a90021b')"></v-btn>
        <v-btn key="3" rounded="circle" icon="mdi-gmail" color="white" class="mx-2" @click="openLink('https://mail.google.com/mail/?view=cm&fs=1&to=nagpalprakankshabvpy@gmail.com')"></v-btn>
        <v-btn key="4" rounded="circle" icon="mdi-instagram" color="white" class="mx-2" @click="openLink('https://www.instagram.com/_pra_amodini_')"></v-btn>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import screenshotImage from '@/assets/Screenshot.jpg';
import Vine from '@/assets/Vine.jpg';

export default {
  data() {
    return {
      screenshot: screenshotImage,
      Vine : Vine
    };
  },
  methods: {
    openLink(url) {
      window.open(url, '_blank');
    }
  }
};
</script>
