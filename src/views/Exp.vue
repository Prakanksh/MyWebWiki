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
            My Experience
          </div>
        </div>
        <div class="text-center pt-3">
        <v-divider></v-divider>
      </div>
        <v-card class="pa-4 mt-10 mb-5">
          <v-card-text>
            <p><strong>Frontend Engineer – Bangalore-based Startup (May 2024 - August 2024)</strong></p>
            <p>In my most recent role, I worked as a frontend engineer at a Bangalore-based startup, where I contributed to the development of a fintech software platform. This web application focused on tracking personal financial information, providing users with intuitive dashboards and analytical tools to better understand their finances. My main responsibility was frontend development using Vue.js, where I integrated various libraries like ApexCharts for data visualization. I also played a role in developing backend APIs using Node.js and gained valuable experience working with Google Cloud Platform.</p>
  
            <v-divider class="my-4"></v-divider>
  
            <p><strong>Associate Software Engineer – Synoriq, Jaipur (December 2021 - January 2024)</strong></p>
            <p>Prior to this, I worked at Synoriq in Jaipur as an Associate Software Engineer. Here, I was involved in developing and deploying end-to-end features for a client-facing Android application designed for NBFCs and finance organizations. The app, built using Angular and Ionic with a Node.js backend, helped manage the complete loan process from lead generation to disbursement. I also contributed to the development of a CRM-based website, leveraging PHP and Node.js. In addition to my development work, I provided database support using SQL and MongoDB, ensuring seamless client operations.</p>
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
  