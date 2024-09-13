<template>
  <v-app>
    <v-container>
      <v-card 
        max-width="500" 
        square 
        class="mx-auto pa-4"
      >
        <v-img
          :src="screenshot"
          alt="Screenshot"
          aspect-ratio="1"
          class="pa-4"
        ></v-img>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import screenshotImage from '@/assets/Screenshot.jpg';

export default {
  data() {
    return {
      screenshot: screenshotImage
    };
  }
};
</script>
