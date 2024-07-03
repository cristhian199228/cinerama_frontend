<template>
    <v-container>
        <v-card class="pa-3" variant="text">
            <v-form @submit.prevent="addPelicula">
                <v-autocomplete 
                    v-model:search="search" 
                    v-model="movie" 
                    :items="results" 
                    item-title="title" 
                    item-value="id"
                    label="Buscar Película" 
                    @input="searchMovie" 
                    @change="fetchMovieDetails" 
                    required>
                </v-autocomplete>

                <div v-if="searchCompleted">
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field label="Título" v-model="pelicula.titulo" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field label="Director" v-model="pelicula.director" required></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field label="Fecha de Estreno" v-model="pelicula.fecha_estreno" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field label="Duración (mins)" v-model="pelicula.duracion" required></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12">
                            <v-textarea label="Sinopsis" v-model="pelicula.sinopsis" required></v-textarea>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="pelicula.youtube_id" label="ID de YouTube" required></v-text-field>
                        </v-col>
                    </v-row>

                    <h4>Selecciona un Poster</h4>
                    <v-container fluid>
                        <v-row dense>
                            <v-col v-for="(poster, index) in pelicula.posters" :key="index" cols="12" sm="6" md="3">
                                <v-card>
                                    <v-img :src="getImageUrl(poster.file_path)" class="align-end" contain>
                                        <v-card-actions class="justify-center">
                                            <v-btn text @click="selectImage('poster', poster.file_path)">Seleccionar</v-btn>
                                        </v-card-actions>
                                    </v-img>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>

                    <h4>Selecciona un Backdrop</h4>
                    <v-container fluid>
                        <v-row dense>
                            <v-col v-for="(backdrop, index) in pelicula.backdrops" :key="index" cols="12" sm="6" md="3">
                                <v-card>
                                    <v-img :src="getImageUrl(backdrop.file_path)" class="align-end"
                                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px" cover>
                                        <v-card-actions class="justify-center">
                                            <v-btn text @click="selectImage('backdrop', backdrop.file_path)">Seleccionar</v-btn>
                                        </v-card-actions>
                                    </v-img>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn variant="flat" color="grey-darken-3">Atrás</v-btn>
                        <v-btn variant="flat" type="submit" color="red-accent-4" class="mx-2">Agregar Película</v-btn>
                    </v-card-actions>
                </div>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        search: '',
        results: [],
        movie: null,
        searchCompleted: false,
        pelicula: {
            titulo: '',
            director: '',
            fecha_estreno: '',
            duracion: '',
            sinopsis: '',
            poster: null,
            posters: [],
            backdrops: [],
            backdrop: null,
            youtube_id: '', // Campo único para el ID de YouTube
            selectedPoster: null,
            selectedBackdrop: null,
            selectedImage: null
        }
    }),
    methods: {
        async searchMovie() {
            this.searchCompleted = false; // Reset the search completion status
            if (this.search.length > 2) {
                try {
                    const response = await this.$store.dispatch('BuscarPelicula', { valor: this.search });
                    this.results = response.data.results;
                } catch (error) {
                    console.error('Error searching movies:', error);
                }
            }
        },
        async fetchMovieDetails() {
            try {
                const response = await this.$store.dispatch('fetchPeliculaById', { valor: this.movie });
                const movieDetails = response.data;
                this.pelicula.titulo = movieDetails.title;
                this.pelicula.director = movieDetails.director;
                this.pelicula.fecha_estreno = movieDetails.release_date;
                this.pelicula.duracion = movieDetails.runtime;
                this.pelicula.sinopsis = movieDetails.overview;
                this.pelicula.poster = movieDetails.poster_path ? movieDetails.poster_path : null;
                this.pelicula.backdrop = movieDetails.backdrop_path ? movieDetails.backdrop_path : null;
                this.pelicula.posters = movieDetails.images.posters ? movieDetails.images.posters : [];
                this.pelicula.backdrops = movieDetails.images.backdrops ? movieDetails.images.backdrops : [];
                this.pelicula.youtube_id = ''; // Reinicia el ID de YouTube con un campo vacío
                this.searchCompleted = true; // Set the search completion status to true
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        },
        getImageUrl(path) {
            return `https://image.tmdb.org/t/p/original${path}`;
        },
        selectImage(type, path) {
            if (type === 'poster') {
                this.selectedPoster = path;
                this.pelicula.poster = path;
            } else if (type === 'backdrop') {
                this.selectedBackdrop = path;
                this.pelicula.backdrop = path;
            }
        },
        addPelicula() {
            this.$store.dispatch('addPelicula', this.pelicula);
            this.$router.push('/administrador/peliculas');
        }
    },
};
</script>
