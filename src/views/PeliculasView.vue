<template>
  <v-container>
    <v-card variant="">
      <v-container fluid>
        <h2>EN CARTELERA</h2>
        <v-row>
          <v-col v-for="item in peliculasCartelera" :key="item.id" cols="auto" md="3">
            <v-card class="pb-3" variant="text">
              <v-img :src="getImageUrl(item.poster_path_api)" contain></v-img>
              <v-btn block variant="flat" color="red-accent-4" class="white--text" @click="verHorarios(item)">
                VER HORARIOS
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-container fluid>
        <h2>PRÓXIMOS ESTRENOS</h2>
        <v-row>
          <v-col v-for="item in peliculasProximosEstrenos" :key="item.id" cols="auto" md="3">
            <v-card class="pb-3" variant="text">
              <v-img :src="getImageUrl(item.poster_path_api)" contain></v-img>
              <v-btn block variant="flat" color="red-accent-4" class="white--text" @click="verHorarios(item)">
                VER MAS
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    peliculasCartelera() {
      const today = new Date().toISOString().split('T')[0];
      return this.$store.state.peliculas.filter(pelicula => pelicula.fecha_estreno <= today);
    },
    peliculasProximosEstrenos() {
      const today = new Date().toISOString().split('T')[0];
      return this.$store.state.peliculas.filter(pelicula => pelicula.fecha_estreno > today);
    }
  },
  methods: {
    loadPeliculas() {
      this.$store.dispatch('fetchPeliculas');
    },
    getImageUrl(path) {
      return `https://image.tmdb.org/t/p/original${path}`;
    },
    verHorarios(item) {
      this.$router.push({ name: 'detalle-pelicula', params: { idpelicula: item.id } });
    },
  },
  created() {
    this.loadPeliculas();
  },
}
</script>
