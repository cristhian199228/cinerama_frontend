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
        src: 'https://cinemarkla.modyocdn.com/uploads/d717d70d-251b-46ee-af0a-fe88f7fa1dd1/original/BANNER_WEB_DEADPOOL_WOLVERINE.png',
      },
      {
        src: 'https://cinemarkla.modyocdn.com/uploads/623ea462-b588-4bd2-9425-78911afccc25/original/banner-promo-online-julio.png',
      },
      {
        src: 'https://cinemarkla.modyocdn.com/uploads/47ff1ac8-a13b-4d7c-8fcf-bf4ea7cae072/original/BANNER_WEB_COMBO_PERUANO.png',
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
