<template>
  <v-card>
    <v-data-iterator :items="peliculas" :items-per-page="10" :search="search">
      <template v-slot:header>
        <v-toolbar class="px-2">
          <v-text-field v-model="search" density="comfortable" placeholder="Buscar" prepend-inner-icon="mdi-magnify"
            style="max-width: 300px;" variant="solo" clearable hide-details></v-text-field>
          <v-spacer></v-spacer>
          <v-btn @click="navigateToNuevo" prepend-icon="mdi-plus" color="red-accent-4" variant="flat">
            Nueva Pelicula
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:default="{ items }">
        <v-container class="pa-2" fluid>
          <v-row >
            <v-col v-for="item in items" :key="item.id" cols="auto" md="3" >
              <v-card class="pb-3" variant="text">
                <v-img :src="getImageUrl(item.raw.poster_path_api)"></v-img>            
                  <v-btn block variant="flat" color="red-accent-4" class="white--text" @click="verHorarios(item)">
                    VER MAS
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

    <v-dialog v-model="trailerDialog" max-width="800px">
      <v-card color="black">
        <v-responsive>
          <iframe v-if="trailerPath" :src="`https://www.youtube.com/embed/${trailerPath}`" width="100%" height="460px"
            frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </v-responsive>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    search: '',
    trailerDialog: false,
    trailerPath: '',
  }),
  computed: {
    peliculas() {
      return this.$store.state.peliculas;
    }
  },
  methods: {
    loadPeliculas() {
      this.$store.dispatch('fetchPeliculas');
    },
    getImageUrl(path) {
      return `https://image.tmdb.org/t/p/original${path}`;
    },
    openTrailer(trailerPath) {
      this.trailerPath = trailerPath;
      this.trailerDialog = true;
    },
    navigateToNuevo() {
      this.$router.push('/administrador/peliculas/nuevo');
    },
    verHorarios() {
      // Implementar la lógica para ver horarios
    },
  },
  created() {
    this.loadPeliculas();
  },
}
</script>
