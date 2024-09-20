<template>
    <v-app style="background-color: #FCE4EC; min-height: 100vh; display: flex; flex-direction: column;">
      <v-btn
        class="elevation-5 position-fixed ml-10"
        style="top: 50%; transform: translateY(-50%);"
        color="white"
        rounded="circle"
        icon="mdi-chevron-left"
        @click="goToHome"
      >
      </v-btn>
      <v-container>
        <div class="text-center">
          <div class="text-h5 mb-n3" style="font-family: 'Pacifico', cursive; color: black;">
            My Education
          </div>
        </div>
        <div class="text-center pt-3">
        <v-divider></v-divider>
      </div>
  
        <v-card class="pa-4 mt-10 mb-5">
          <v-card-text>
            <p><strong>Bachelor of Technology in Electronics Instrumentation and Control (2017-2021)</strong><br>
            Government Engineering College, Rajasthan Technical University</p>
            <p>I completed my B.Tech in Electronics Instrumentation and Control from Government Engineering College under Rajasthan Technical University. During these four years, I developed a solid foundation in the principles of electronics, instrumentation, and control systems, all while securing a respectable 71%. My engineering journey was an incredible blend of hands-on learning and theoretical exploration, setting me up with the skills and knowledge necessary for my software engineering career.</p>
  
            <v-divider class="my-4"></v-divider>
  
            <p><strong>Higher Secondary Education (2017)</strong><br>
            Sumit Bal Vidhyalay, Kota, Rajasthan</p>
            <p>I finished my higher secondary schooling in 2017 from Sumit Bal Vidhyalay, affiliated with the Rajasthan Board of Secondary Education (RBSE), securing 73.4%. My major subjects were Physics, Chemistry, and Mathematics, which gave me a firm grounding in analytical thinking and problem-solving—skills I still use today in my software projects.</p>
  
            <v-divider class="my-4"></v-divider>
  
            <p><strong>Secondary Education (2014)</strong><br>
            M.B. International School, Kota, Rajasthan</p>
            <p>In 2014, I completed my 10th grade from M.B. International School, affiliated with the Central Board of Secondary Education (CBSE), where I scored a perfect 10 CGPA. This early academic achievement laid the foundation for my future studies in the sciences and technology.</p>
  
            <v-divider class="my-4"></v-divider>
  
            <p><strong>NCC C-Certificate (2018-2021)</strong></p>
            <p>Alongside my academic pursuits, I completed NCC (National Cadet Corps) C-Certificate training from 2018 to 2021, achieving Alpha grade. This experience enriched my discipline, leadership abilities, and resilience, which have proved valuable in both my personal and professional life.</p>
  
          </v-card-text>
        </v-card>
  
      </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    mounted() {
      console.log("Component mounted");
    },
    
    methods: {
      openLink(url) {
        window.open(url, '_blank');
      },

      goToHome() {
        this.$router.push('/');
      }
    }
  };
  </script>
  