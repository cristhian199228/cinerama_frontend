<template>
    <v-container>
        <v-card class="pa-3">
            <v-form @submit.prevent="addPelicula">
                <v-autocomplete v-model:search="search" :items="results" item-text="title" label="Buscar Película"
                    @input="searchMovie" @change="fillForm" required></v-autocomplete>
                <v-text-field label="Título" v-model="pelicula.titulo" required></v-text-field>
                <v-text-field label="Director" v-model="pelicula.director" required></v-text-field>
                <v-text-field label="Fecha de Estreno" v-model="pelicula.fecha_estreno" required></v-text-field>
                <v-text-field label="Duración (mins)" v-model="pelicula.duracion" required></v-text-field>
                <v-textarea label="Sinopsis" v-model="pelicula.sinopsis" required></v-textarea>
                <v-file-input label="Poster" v-model="pelicula.poster"></v-file-input>
                <v-file-input label="Trailer" v-model="pelicula.trailer"></v-file-input>
                <v-btn  color="grey-darken-3">Atras</v-btn>
                <v-btn type="submit" color="red-accent-4" class="mx-2">Agregar Película</v-btn>               
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        search: '',
        results: [],
        pelicula: {
            titulo: '',
            director: '',
            fecha_estreno: '',
            duracion: '',
            sinopsis: '',
            poster: null,
            trailer: null
        }
    }),
    methods: {
        async searchMovie() {
            console.log(this.search)
            if (this.search.length > 2) {
             
                try {
                    const response = await this.$store.dispatch('BuscarPelicula',  this.search );
                    this.results = response.data.results;
                } catch (error) {
                    console.error('Error searching movies:', error);
                }
            }
        },
        async fillForm(movie) {
            try {
                const response = await this.$store.dispatch('BuscarPelicula', { id: movie.id });
                const movieDetails = response.data;
                this.pelicula.titulo = movieDetails.title;
                this.pelicula.director = movieDetails.director; // Suponiendo que la API proporciona el nombre del director
                this.pelicula.fecha_estreno = movieDetails.release_date;
                this.pelicula.duracion = movieDetails.runtime;
                this.pelicula.sinopsis = movieDetails.overview;
                this.pelicula.poster = movieDetails.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                    : null;
                this.pelicula.trailer = null; // Puedes necesitar otra petición para obtener el URL del trailer
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        },
        addPelicula() {
            // Lógica para agregar una nueva película
            this.$store.dispatch('addPelicula', this.pelicula);
            this.$router.push('/administrador/peliculas');
        }
    },
    watch: {
        async search(val) {
            if (val.length > 2) {
                const pelicula = {
                    valor: val
                };
                try {
                    const response =  await this.$store.dispatch('BuscarPelicula',  pelicula);
                    console.log(response.data.results)
                    this.results = response.data.results;
                } catch (error) {
                    console.error('Error searching movies:', error);
                }
            }
        }
    },
};
</script>

<style scoped></style>
