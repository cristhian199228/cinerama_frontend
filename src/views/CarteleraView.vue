<template>
  <v-container>
    <v-row class="ma-5">
      <v-col class="d-inline-flex">
        <v-text-field class="mx-2" label="Fecha mínima" v-model="minDate" type="date"></v-text-field>
        <v-text-field class="mx-2" label="Fecha máxima" v-model="maxDate" type="date"></v-text-field>
        <v-btn color="red-accent-4" class="my-auto" @click="buscar">
          Buscar
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(movie, index) in movies" :key="index" class="my-2">
        <v-img  width="300" :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`" :alt="movie.title" max-width="500" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      minDate: '',
      maxDate: '',
      movies: []
    };
  },
  methods: {
    async buscar() {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-MX&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${this.minDate}&release_date.lte=${this.maxDate}`);
        const data = await response.json();
        console.log(data.results)
        this.movies = data.results;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.mx-2 {
  margin-left: 8px;
  margin-right: 8px;
}
.my-auto {
  margin-top: auto;
  margin-bottom: auto;
}
.my-2 {
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>
