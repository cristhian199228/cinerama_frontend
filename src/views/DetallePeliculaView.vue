<template>

        <v-img class="mt-0" :src="getImageUrl(pelicula.wallpaper_path_api)" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="350" cover>
            <div class="d-flex flex-column fill-height justify-center align-center text-white">
                <v-btn size="x-large" icon @click="openTrailer" variant="outlined">
                    <v-icon size="x-large">mdi-play</v-icon>
                </v-btn>
            </div>
        </v-img>

    <v-container>
        <v-row class="mt-0" v-if="pelicula.poster_path_api">
            <v-col cols="12" md="4">
                <v-img :src="getImageUrl(pelicula.poster_path_api)" contain></v-img>
            </v-col>
            <v-col cols="12" md="8">
                <v-card variant="text">
                    <v-row>
                        <v-col cols="12">
                            <h1 class="text-red-accent-4">{{ pelicula.titulo }}</h1>
                            <p><strong>Duración:</strong> {{ pelicula.duracion }} min</p>
                            <p><strong>Director:</strong> {{ pelicula.director }}</p>
                            <p><strong>Sinopsis:</strong></p>
                            <p>{{ pelicula.sinopsis }}</p>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog v-model="trailerDialog" max-width="800px">
            <v-card color="black">
                <v-responsive>
                    <iframe :src="trailerUrl" width="100%" height="460px" frameborder="0"
                        allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </v-responsive>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            pelicula: {
                poster_path_api: '',
                titulo: '',
                duracion: '',
                director: '',
                wallpaper_path_api: '',
                trailer_path_api: '',
                sinopsis: ''
            },
            trailerDialog: false,
        };
    },
    computed: {
        peliculaId() {
            return this.$route.params.idpelicula;
        },
        trailerUrl() {
            return `https://www.youtube.com/embed/${this.pelicula.trailer_path_api}`;
        },
    },
    methods: {
        getImageUrl(path) {
            return `https://image.tmdb.org/t/p/original${path}`;
        },
        async fetchPeliculaDetails() {
            const pel = await this.$store.dispatch('fetchPeliculaDetails', this.peliculaId);
            this.pelicula = pel.data;
        },
        openTrailer() {
            this.trailerDialog = true;
        },
    },
    created() {
        this.fetchPeliculaDetails();
    },
};
</script>

<style scoped>
.wallpaper-container {
    position: relative;
    background-size: cover;
    background-position: center;
    height: 400px;
}

.wallpaper-container v-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 64px;
}
</style>
