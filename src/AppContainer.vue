<template>
  <v-app id="inspire">
    <v-app-bar class="px-3" density="compact" >
      <v-img src="@/assets/cinerama.svg" alt="Logo" max-width="130"></v-img>
      <v-spacer></v-spacer>
      <v-tabs color="grey-darken-2" centered>
        <v-tab v-for="link in links" :key="link" :text="link"></v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main class="bg-grey-darken-1">
      <v-row class="mt-1">
        <v-col cols="12" offset-xl="2" offset-lg="1" xl="8" lg="10">
          <v-sheet min-height="70vh" rounded="lg">
            <!--  -->
          </v-sheet>
        </v-col>
      </v-row>

    </v-main>
  </v-app>
</template>
<script setup>
const links = [
  'Peliculas',
  'Cartelera',
  'Cines',
  'Dulceria',
]
</script>
<script>
export default {
  data: () => ({
    links: [
      'Dashboard',
      'Messages',
      'Profile',
      'Updates',
    ],
  }),
}
</script>