<template>
    <div>
        <v-img class="mt-0" :src="getImageUrl(pelicula.wallpaper_path_api)"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="350" cover>
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
                    <v-card variant="text">
                        <h1 class="text-red-accent-4 my-5">Funciones</h1>
                        <v-tabs v-model="tab" background-color="primary">
                            <v-tab v-for="(fecha, index) in fechasOrdenadas" :key="index" :value="index">
                                {{ formatTabDate(fecha) }}
                            </v-tab>
                        </v-tabs>
                        <v-card-text>
                            <v-tabs-window v-model="tab">
                                <v-tabs-window-item v-for="(fecha, index) in fechasOrdenadas" :key="index" :value="index">
                                    <v-card flat v-for="(cines, cine) in funcionesAgrupadas[fecha]" :key="cine">
                                        <v-card-title>{{ cine }}</v-card-title>
                                        <v-card-text>
                                            <v-btn v-for="funcion in cines" :key="funcion.id" class="ma-2" @click="goToFuncion(funcion.id, funcion.hora)">
                                                {{ funcion.hora }}
                                            </v-btn>
                                        </v-card-text>
                                    </v-card>
                                </v-tabs-window-item>
                            </v-tabs-window>
                        </v-card-text>
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
    </div>
</template>
<script>
export default {
    data() {
        return {
            tab: 0,
            pelicula: {
                poster_path_api: '',
                titulo: '',
                duracion: '',
                director: '',
                wallpaper_path_api: '',
                trailer_path_api: '',
                sinopsis: '',
                funcion: [] // Añadir funciones aquí
            },
            trailerDialog: false,
            fechas: [],
            fechasOrdenadas: [],
            funcionesAgrupadas: {}
        };
    },
    computed: {
        peliculaId() {
            return this.$route.params.idpelicula;
        },
        trailerUrl() {
            return `https://www.youtube.com/embed/${this.pelicula.trailer_path_api}`;
        },
        funcionesDelDia() {
            return this.funcionesAgrupadas[this.fechasOrdenadas[this.tab]] || {};
        }
    },
    methods: {
        getImageUrl(path) {
            return `https://image.tmdb.org/t/p/original${path}`;
        },
        async fetchPeliculaDetails() {
            const pel = await this.$store.dispatch('fetchPeliculaDetails', this.peliculaId);
            this.pelicula = pel.data;
            this.agruparFuncionesPorFechaYCine();
            this.ordenarFechas();
        },
        openTrailer() {
            this.trailerDialog = true;
        },
        formatDate(fecha) {
            const date = new Date(fecha);
            return date.toISOString().split('T')[0];
        },
        formatTabDate(fecha) {
            const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
            const date = new Date(fecha);
            const dayName = days[date.getDay()];
            const day = date.getDate();
            return `${dayName} ${day}`;
        },
        goToFuncion(funcionId, hora) {
            // Redirigir a otra página con el id de la función y la hora
            this.$router.push({ name: 'FuncionDetalle', params: { id: funcionId, hora: hora } });
        },
        agruparFuncionesPorFechaYCine() {
            const agrupadas = this.pelicula.funcion.reduce((acc, funcion) => {
                const fecha = this.formatDate(funcion.fecha);
                const cine = funcion.sala.cine.descripcion;

                if (!acc[fecha]) {
                    acc[fecha] = {};
                    this.fechas.push(fecha);
                }

                if (!acc[fecha][cine]) {
                    acc[fecha][cine] = [];
                }

                acc[fecha][cine].push({ id: funcion.id, hora: this.formatHora(funcion.fecha) });

                return acc;
            }, {});

            this.funcionesAgrupadas = agrupadas;
        },
        ordenarFechas() {
            this.fechasOrdenadas = [...this.fechas].sort((a, b) => new Date(a) - new Date(b));
        },
        formatHora(fecha) {
            const date = new Date(fecha);
            return `${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
        }
    },
    created() {
        this.fetchPeliculaDetails();
    },
};
</script>
