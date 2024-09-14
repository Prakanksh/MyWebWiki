<template>
  <v-app style="background-color: #FCE4EC; min-height: 100vh; display: flex; flex-direction: column;">
    <v-container>
      <div class="text-center">
        <div class="text-h5 mb-n3" style="font-family: 'Pacifico', cursive; color: black;">
          Hi! I am Prakanksha and this is all me.
        </div>
      </div>

      <v-row>
        <v-col cols="4">
          <v-card 
            class="mb-3 d-flex flex-column justify-start rounded-lg"
            style="height: 300px; width: 100%; margin-top: 20px; cursor: pointer;"
            @click="goToAboutPage"
          >
            <v-card-title>About Me</v-card-title>
            <v-card-text>Hello! I'm a passionate software engineer with a deep love for technology, particularly JavaScript and its various frameworks. My professional journey has led me to specialize in building solutions that combine logic and creativity. I find great joy in problem-solving, whether it's debugging complex code or tackling puzzles that stretch my thinking.</v-card-text>
          </v-card>
        </v-col>

        <v-col cols="4">
          <v-card 
            max-width="100%"  
            square 
            class="mx-auto pa-2 pt-3 pb-4 d-flex rounded-lg"
            style="height: 300px; position: relative; margin-top: 20px; cursor: pointer;"
          >
            <v-img
              :src="screenshot"
              alt="Screenshot"
              aspect-ratio="1"
              class="pa-2"
              style="height: 100%; width: 100%;"
            ></v-img>
          </v-card>
        </v-col>

        <v-col cols="4">
          <v-card 
            class="mb-3 d-flex flex-column justify-start rounded-lg"
            style="height: 300px; width: 100%; margin-top: 20px; cursor: pointer;"
            @click="goToAboutPage"
          >
            <v-card-title>My Education</v-card-title>
            <v-card-text>This is the fourth random text box.</v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-card 
            class="mb-3 d-flex flex-column justify-start rounded-lg"
            style="height: 300px; width: 100%; cursor: pointer;"
            @click="goToAboutPage"
          >
            <v-card-title>My Experience</v-card-title>
            <v-card-text>Here is another box with random text.</v-card-text>
          </v-card>
        </v-col>

        <v-col cols="4">
          <v-card 
            class="mb-3 d-flex flex-column justify-start rounded-lg"
            style="height: 300px; width: 100%; cursor: pointer;"
            @click="goToAboutPage"
          >
            <v-card-title>Side Activities</v-card-title>
            <v-card-text>This box is placed below the image.</v-card-text>
          </v-card>
        </v-col>

        <v-col cols="4">
          <v-card 
            class="mb-3 d-flex flex-column justify-start rounded-lg"
            style="height: 300px; width: 100%; cursor: pointer;"
            @click="goToAboutPage"
          >
            <v-card-title>Projects</v-card-title>
            <v-card-text>Another box with some random text.</v-card-text>
          </v-card>
        </v-col>
      </v-row>
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

export default {
  data() {
    return {
      screenshot: screenshotImage,
    };
  },
  methods: {
    openLink(url) {
      window.open(url, '_blank');
    },
    goToAboutPage() {
      this.$router.push({ name: 'about' }); 
    }
  }
};
</script>
