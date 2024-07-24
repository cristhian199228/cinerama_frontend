<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="4">
                <v-img :src="getImageUrl(funcion.pelicula.poster_path_api)" contain></v-img>
                <v-card class="mt-3">
                    <v-card-text>
                        <template v-if="funcion.sala">
                            <p><strong>Cine:</strong> {{ funcion.sala.cine.descripcion }}</p>
                        </template>
                        <p><strong>Fecha y Horario:</strong> {{ formatDateTime(funcion.fecha) }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="8">
                <v-card>
                    <v-stepper v-model="step" :items="items" prev-text="ATRÁS" next-text="SIGUIENTE">
                        <template v-slot:[`item.1`]>
                            <v-card flat>
                                <v-card-title>
                                    <h1 class="text-red-accent-4">Datos del Usuario</h1>
                                </v-card-title>
                                <v-card-text>
                                    <div v-if="isInvitado">
                                        <p>Debe iniciar sesión para poder comprar entradas.</p>
                                        <v-btn color="primary" @click="goToLogin">Iniciar sesión</v-btn>
                                    </div>
                                    <div v-else>
                                        <p>
                                            <v-icon color="red-accent-4">mdi-account</v-icon>
                                            <strong class="ml-2">NOMBRE:</strong> {{ user.name}}
                                        </p>
                                        <p>
                                            <v-icon color="red-accent-4">mdi-email</v-icon>
                                            <strong class="ml-2">EMAIL:</strong> {{ user.email }}
                                        </p>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </template>

                        <template v-slot:[`item.2`]>
                            <v-card flat>
                                <v-card-title>Entradas</v-card-title>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12" class="py-2" v-for="(entrada, index) in entradas" :key="index">
                                            <v-card flat class="d-flex align-center">
                                                <v-img :src="entrada.imagen" contain class="mr-3" height="75"
                                                    width="75"></v-img>
                                                <div>
                                                    <p class="mb-1"><strong>{{ entrada.tipo }}</strong></p>
                                                    <p class="mb-1">valor: S/ {{ entrada.precio }}</p>
                                                    <p v-if="entrada.descripcion" class="text--secondary">{{
                                                        entrada.descripcion }}</p>
                                                </div>
                                                <v-spacer></v-spacer>
                                                <v-select v-model="entrada.cantidad" :items="cantidades" class="mr-3"
                                                    dense></v-select>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </template>

                        <template v-slot:[`item.3`]>
                            <SeatSelection v-model:asientos="asientos" />
                        </template>
                        <template v-slot:[`item.4`]>
                            <v-card flat>
                                <v-card-title>Alimentos y Bebidas</v-card-title>
                                <v-card-text>...</v-card-text>
                            </v-card>
                        </template>
                        <template v-slot:[`item.5`]>
                            <v-card flat>
                                <v-card-title>Confirmación y Pago</v-card-title>
                                <v-card-text>...</v-card-text>
                            </v-card>
                        </template>
                    </v-stepper>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import SeatSelection from '@/components/SeatSelection.vue';
import { mapState, mapActions } from 'vuex';

export default {
    components: {
        SeatSelection
    },
    data() {
        return {
            step: 1,
            items: [
                { title: 'Usuario' },
                { title: 'Entradas' },
                { title: 'Asientos' },
                { title: 'Alimentos y Bebidas' },
                { title: 'Confirmación y Pago' },
            ],
            funcion: {
                pelicula: {
                    poster_path_api: '',
                    titulo: '',
                    duracion: '',
                    director: '',
                    sinopsis: '',
                },
                formato: '',
                cine: '',
                fecha: '',
            },
            cantidades: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            asientos: [
                [{ numero: 1, color: 'grey' }, { numero: 2, color: 'red' }, { numero: 3, color: 'grey' }],
                [{ numero: 4, color: 'grey' }, { numero: 5, color: 'grey' }, { numero: 6, color: 'grey' }],
                [{ numero: 7, color: 'grey' }, { numero: 8, color: 'grey' }, { numero: 9, color: 'grey' }],
                // Añade más filas según sea necesario
            ]
        };
    },
    computed: {
        ...mapState({
            user: state => state.user
        }),
        isInvitado() {
            return this.user.name.toLowerCase() === 'invitado';
        },
        funcionId() {
            return this.$route.params.id;
        },
        funcionHora() {
            return this.$route.params.hora;
        },
        entradas(){
            return this.$store.state.tipos_entradas
        }
    },
    methods: {
        ...mapActions(['fetchFuncionDetails', 'fetchTiposEntradas']),
        getImageUrl(path) {
            return `https://image.tmdb.org/t/p/original${path}`;
        },
        async obtenerDetallesFuncion() {
            const response = await this.fetchFuncionDetails(this.funcionId);
            this.funcion = response.data;
        },
        async obtenerTiposEntradas() {
            await this.fetchTiposEntradas();

        },
        formatDateTime(datetime) {
            const date = new Date(datetime);
            return date.toLocaleDateString('es-PE', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            });
        },
        goToLogin() {
            this.$router.push({ name: 'login' });
        }
    },
    created() {
        this.obtenerDetallesFuncion();
        this.obtenerTiposEntradas();
    },
};
</script>
