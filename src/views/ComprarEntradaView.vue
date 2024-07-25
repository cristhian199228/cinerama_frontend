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
                            <UserDetails :user="user" :isInvitado="isInvitado" @goToLogin="goToLogin" />
                        </template>
                        <template v-slot:[`item.2`]>
                            <EntradasComponent />
                        </template>
                        <template v-slot:[`item.3`]>
                            <SeatSelection v-model:asientos="asientos" />
                        </template>
                        <template v-slot:[`item.4`]>
                            <FoodAndBeverages :productos="productos" />
                        </template>
                        <template v-slot:[`item.5`]>
                            <PaymentConfirmation :user="user" :funcion="funcion" :asientos="asientos" />
                        </template>
                    </v-stepper>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import SeatSelection from '@/components/SeatSelection.vue';
import EntradasComponent from '@/components/EntradasComponent.vue';
import UserDetails from '@/components/UserDetails.vue';
import FoodAndBeverages from '@/components/FoodAndBeverages.vue';
import PaymentConfirmation from '@/components/PaymentConfirmation.vue';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
    components: {
        SeatSelection,
        EntradasComponent,
        UserDetails,
        FoodAndBeverages,
        PaymentConfirmation,
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
            asientos: [
                [{ numero: 1, color: 'grey' }, { numero: 2, color: 'red' }, { numero: 3, color: 'grey' }],
                [{ numero: 4, color: 'grey' }, { numero: 5, color: 'grey' }, { numero: 6, color: 'grey' }],
                [{ numero: 7, color: 'grey' }, { numero: 8, color: 'grey' }, { numero: 9, color: 'grey' }],
            ],
        };
    },
    computed: {
        ...mapState({
            user: state => state.user,
            productos: state => state.productos,
        }),
        isInvitado() {
            return this.user.name.toLowerCase() === 'invitado';
        },
        funcionId() {
            return this.$route.params.id;
        },
    },
    methods: {
        ...mapActions(['fetchFuncionDetails', 'fetchTiposEntradas', 'fetchProductos']),
        ...mapMutations(['setProductos']),
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
        async obtenerProductos() {
            const response = await this.fetchProductos();
            this.setProductos(response.data);
        },
        formatDateTime(datetime) {
            const date = new Date(datetime);
            return date.toLocaleDateString('es-PE', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            });
        },
        goToLogin() {
            this.$router.push({ name: 'login' });
        },
    },
    created() {
        this.obtenerDetallesFuncion();
        this.obtenerTiposEntradas();
        this.obtenerProductos();
    },
};
</script>
