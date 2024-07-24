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
                    <v-stepper :items="items" prev-text="ATRÁS" next-text="SIGUIENTE">
                        <template v-slot:[`item.1`]>
                            <v-card title="Datos del Usuario" flat>...</v-card>
                        </template>

                        <template v-slot:[`item.2`]>
                            <v-card title="Entradas" flat>
                                <v-row>
                                    <v-col cols="12" class="py-2" v-for="(entrada, index) in entradas" :key="index">
                                        <v-card flat class="d-flex align-center">
                                            <v-img :src="entrada.imagen" contain class="mr-3" height="75" width="75"></v-img>
                                            <div>
                                                <p class="mb-1"><strong>{{ entrada.tipo }}</strong></p>
                                                <p class="mb-1">valor: S/ {{ entrada.precio }}</p>
                                                <p v-if="entrada.descripcion" class="text--secondary">{{ entrada.descripcion }}</p>
                                            </div>
                                            <v-spacer></v-spacer>
                                            <v-select v-model="entrada.cantidad" :items="cantidades" class="mr-3" dense></v-select>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </template>

                        <template v-slot:[`item.3`]>
                            <v-card title="Asientos" flat>...</v-card>
                        </template>
                        <template v-slot:[`item.4`]>
                            <v-card title="Alimentos y Bebidas" flat>...</v-card>
                        </template>
                        <template v-slot:[`item.5`]>
                            <v-card title="Confirmación y Pago" flat>...</v-card>
                        </template>
                    </v-stepper>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            step: 1,
            items: [
                'Usuario',
                'Entradas',
                'Asientos',
                'Alimentos y Bebidas',
                'Confirmación y Pago',
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
            entradas: [
                {
                    tipo: 'PROMO ONLINE HASTA 50% 3D',
                    precio: '11.20',
                    descripcion: '',
                    imagen: 'ruta_a_imagen_promocion',
                    cantidad: 0
                },
                {
                    tipo: 'ADULTO 3D',
                    precio: '20.40',
                    descripcion: '',
                    imagen: 'ruta_a_imagen_adulto',
                    cantidad: 0
                },
                {
                    tipo: 'NIÑO 3D',
                    precio: '20.40',
                    descripcion: 'Para niños de 2 a 11 años.',
                    imagen: 'ruta_a_imagen_nino',
                    cantidad: 0
                },
                {
                    tipo: 'P. CON DISCAPACIDAD 3D',
                    precio: '16.70',
                    descripcion: 'Ley Nº29973 el cine podría solicitar alguna acreditación que certifique su condición al ingreso a sala.',
                    imagen: 'ruta_a_imagen_discapacidad',
                    cantidad: 0
                },
                {
                    tipo: 'SILLA DE RUEDAS 3D',
                    precio: '16.70',
                    descripcion: '',
                    imagen: 'ruta_a_imagen_silla_de_ruedas',
                    cantidad: 0
                }
            ],
            cantidades: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        };
    },
    computed: {
        funcionId() {
            return this.$route.params.id;
        },
        funcionHora() {
            return this.$route.params.hora;
        },
    },
    methods: {
        getImageUrl(path) {
            return `https://image.tmdb.org/t/p/original${path}`;
        },
        async fetchFuncionDetails() {
            const response = await this.$store.dispatch('fetchFuncionDetails', this.funcionId);
            this.funcion = response.data;
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
            this.$router.push({ name: 'Login' });
        }
    },
    created() {
        this.fetchFuncionDetails();
    },
};
</script>
