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
          About me 
        </div>
      </div>
      <div class="text-center pt-3">
        <v-divider></v-divider>
      </div>

      <v-card class="pa-4 mt-10 mb-5">
        <v-card-text>
          <p>Hello! I'm a passionate software engineer with a deep love for technology, particularly JavaScript and its various frameworks. My professional journey has led me to specialize in building solutions that combine logic and creativity. I find great joy in problem-solving, whether it's debugging complex code or tackling puzzles that stretch my thinking.</p>
          <v-divider class="my-4"></v-divider>
          <p>While my work allows me to channel my logical side, I also embrace my creative spirit outside of my career. I enjoy exploring life through different perspectives, constantly learning new skills, and expressing myself through various creative outlets. This balance between logic and creativity keeps me energized and inspired, both in work and life.</p>
          <v-divider class="my-4"></v-divider>
          <p>One thing that truly defines me is my positivity. I've experienced my share of ups and downs, but I believe that life is always a blessing. Each challenge is an opportunity to grow, and I'm always eager to continue learning, both in my craft and in life.</p>
          <v-divider class="my-4"></v-divider>
          <p>On a slightly more personal note, I’ve got a few quirky facts to share. I’ve completed NCC training, so yes, I can march in perfect sync! I’m also a proud pure vegetarian—because plants deserve all the love. Speaking of love, I have a soft spot for pink roses and cats (in that order, but don’t tell the cats). When I’m not coding or solving puzzles, you might find me attempting to read a Hindi book or singing… but only if you’re brave enough to listen! I also have an unshakable love for the mountains—they’re my happy place. Oh, and did I mention this is my first time on Earth? Still figuring things out, but loving every moment of it.</p>
          <v-divider class="my-4"></v-divider>

          <div class="text-center">
            <v-chip 
              class="ma-2"
              color="pink lighten-4"
              rounded="pill"
              @click="openLink('https://forms.gle/LW1AQEKaoJyLkRt56')"
            >
              <div style="color: black;">Take a quiz if you know me</div>
            </v-chip>
          </div>

        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
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
