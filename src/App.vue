<template>
  <v-app style="background-color: #FCE4EC; min-height: 100vh; display: flex; flex-direction: column;">
    <v-container v-if="$route.path === '/'">
      <div class="text-center">
        <div class="text-h5 mb-n3" style="font-family: 'Pacifico', cursive; color: black;">
          Hi! I am Prakanksha and this is all me.
        </div>
      </div>
      <div class="text-center pt-3">
        <v-divider></v-divider>
      </div>

      <v-row>
        <v-col v-if="showAboutCard" cols="4">
          <router-link to="/about">
            <v-card transition="fade-transition" class="mb-3 d-flex flex-column justify-start rounded-lg"
              style="height: 300px; width: 100%; margin-top: 20px;" hover>
              <v-card-title>About Me</v-card-title>
              <v-card-text>
                Hello! I'm a passionate software engineer with a deep love for technology, particularly JavaScript and its
                various frameworks. My professional journey has led me to specialize in building solutions that combine
                logic and creativity. I find great joy in problem-solving, whether it's debugging complex code or tackling
                puzzles that stretch my thinking.
              </v-card-text>
            </v-card>
          </router-link>
        </v-col>

        <v-col v-if="showImageCard" cols="4">
          <v-card transition="fade-transition" max-width="100%" square class="mx-auto pa-2 pt-3 pb-4 d-flex rounded-lg"
            style="height: 300px; position: relative; margin-top: 20px;">
            <v-img :src="screenshot" alt="Screenshot" aspect-ratio="1" class="pa-2"
              style="height: 100%; width: 100%;"></v-img>
          </v-card>
        </v-col>

        <v-col v-if="showEducationCard" cols="4">
          <router-link to="/edu">
            <v-card transition="fade-transition" class="mb-3 d-flex flex-column justify-start rounded-lg"
              style="height: 300px; width: 100%; margin-top: 20px;" hover>
              <v-card-title>My Education</v-card-title>
              <v-card-text>B.Tech in Electronics Instrumentation and Control from GEC, Rajasthan Technical University
                (2017-2021), 71%.
                12th Grade from Sumit Bal Vidhyalay, Kota (RBSE, 2017), 73.4% in PCM.
                10th Grade from M.B. International School, Kota (CBSE, 2014), 10 CGPA.
                NCC C-Certificate (2018-2021), Alpha grade.
              </v-card-text>
            </v-card>
          </router-link>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-if="showExperienceCard" cols="4">
          <router-link to="/exp">
            <v-card transition="fade-transition" class="mb-3 d-flex flex-column justify-start rounded-lg"
              style="height: 300px; width: 100%;" hover>
              <v-card-title>My Experience</v-card-title>
              <v-card-text>
                I have 2.5 years of experience in software development, working with Vue.js, Node.js, Angular, and Ionic
                to build fintech web and mobile apps. I’ve integrated tools like ApexCharts for data visualization,
                developed backend APIs, and managed databases with SQL and MongoDB.
              </v-card-text>
            </v-card>
          </router-link>
        </v-col>

        <v-col v-if="showSideActivitiesCard" cols="4">
          <v-card transition="fade-transition" class="mb-3 d-flex flex-column justify-start rounded-lg"
            style="height: 300px; width: 100%;">
            <v-card-title>Side Activities</v-card-title>
            <v-card-text>This box is placed below the image.</v-card-text>
          </v-card>
        </v-col>

        <v-col v-if="showProjectsCard" cols="4">
          <v-card transition="fade-transition" class="mb-3 d-flex flex-column justify-start rounded-lg"
            style="height: 300px; width: 100%;">
            <v-card-title>Projects</v-card-title>
            <v-card-text>Another box with some random text.</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Render routed pages here -->
    <router-view></router-view>

    <Footer/>
  </v-app>
</template>

<script>
import screenshotImage from '@/assets/Screenshot.jpg';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Footer
  },

  data() {
    return {
      screenshot: screenshotImage,
      Footer: Footer,
      showAboutCard: false,
      showImageCard: false,
      showEducationCard: false,
      showExperienceCard: false,
      showSideActivitiesCard: false,
      showProjectsCard: false
    };
  },
  methods: {
    openLink(url) {
      window.open(url, '_blank');
    }
  },
  mounted() {
    setTimeout(() => { this.showAboutCard = true; }, 1000);
    setTimeout(() => { this.showImageCard = true; }, 2000);
    setTimeout(() => { this.showEducationCard = true; }, 3000);
    setTimeout(() => { this.showExperienceCard = true; }, 4000);
    setTimeout(() => { this.showSideActivitiesCard = true; }, 5000);
    setTimeout(() => { this.showProjectsCard = true; }, 6000);
  }
};
</script>
