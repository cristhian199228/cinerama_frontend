<template>
  <v-app id="inspire">
    <v-app-bar class="px-3" density="compact">
      <v-spacer></v-spacer>
      <v-img src="@/assets/cinerama.svg" alt="Logo" max-width="130"></v-img>
      <v-spacer></v-spacer>
      <v-tabs color="grey-darken-2" centered>
        <v-tab v-for="link in links" :key="link.descripcion" :to="link.to">
          {{ link.descripcion }}
        </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main class="bg-grey-lighten-1">
      <v-row class="mt-1">
        <v-col cols="12" offset-xl="2" offset-lg="1" xl="8" lg="10">
          <v-sheet min-height="70vh" rounded="lg">
            <v-container>
              <router-view />
            </v-container>
          </v-sheet>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    links: [
      { descripcion: 'Cartelera', to: '/' },
      { descripcion: 'Peliculas', to: '/peliculas' },
      { descripcion: 'Cines', to: '/cines' },
      { descripcion: 'Dulceria', to: '/dulceria' },
    ],
  }),
}
</script>