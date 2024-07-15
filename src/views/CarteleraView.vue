<template>
  <v-container>
    <v-carousel hide-delimiters cycle>
      <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src"   contain></v-carousel-item>
    </v-carousel>
    <v-card variant="text">
      <v-data-iterator :items="filteredPeliculas" :items-per-page="10" :search="search">
        <template v-slot:header>
          <v-toolbar class="px-2">
            <v-text-field v-model="search" density="comfortable" placeholder="Buscar" prepend-inner-icon="mdi-magnify"
              variant="solo" clearable hide-details></v-text-field>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>

        <template v-slot:default="{ items }">
          <v-container class="pa-2" fluid>
            <v-row>
              <v-col v-for="item in items" :key="item.id" cols="auto" md="3">
                <v-card class="pb-3" variant="text">
                  <v-img :src="getImageUrl(item.raw.poster_path_api)"></v-img>
                  <v-btn block variant="flat" color="red-accent-4" class="white--text" @click="verHorarios(item)">
                    VER HORARIOS
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </template>

        <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
          <div class="d-flex align-center justify-center pa-4">
            <v-btn :disabled="page === 1" density="comfortable" icon="mdi-arrow-left" variant="tonal" rounded
              @click="prevPage"></v-btn>

            <div class="mx-2 text-caption">
              Página {{ page }} de {{ pageCount }}
            </div>

            <v-btn :disabled="page >= pageCount" density="comfortable" icon="mdi-arrow-right" variant="tonal" rounded
              @click="nextPage"></v-btn>
          </div>
        </template>
      </v-data-iterator>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        src: 'https://cinemarkla.modyocdn.com/uploads/f1ce9b94-4046-4971-b502-e85dfdb86340/original/banners-web-dyw.png',
      },
      {
        src: 'https://cinemarkla.modyocdn.com/uploads/2156d99b-b644-4f96-a481-ac21f0726077/original/BANNER_WEB_MVF_COMBOS.png',
      },
      {
        src: 'https://cinemarkla.modyocdn.com/uploads/92407a9d-73fa-4201-8e07-de696eba3c7c/original/BANNER-web-mvf-2.png',
      }
    ],
    search: '',
  }),
  computed: {
    peliculas() {
      return this.$store.state.peliculas;
    },
    filteredPeliculas() {
      const today = new Date().toISOString().split('T')[0];
      return this.peliculas.filter(pelicula => pelicula.fecha_estreno <= today);
    }
  },
  methods: {
    loadPeliculas() {
      this.$store.dispatch('fetchPeliculas');
    },
    getImageUrl(path) {
      return `https://image.tmdb.org/t/p/original${path}`;
    },
    navigateToNuevo() {
      this.$router.push('/administrador/peliculas/nuevo');
    },
    verHorarios(item) {
      this.$router.push({ name: 'detalle-pelicula', params: { idpelicula: item.value } });
    },
  },
  created() {
    this.loadPeliculas();
  },
}
</script>
