<template>
    <v-card flat>
        <v-card-title>Confirmación y Pago</v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <h2>Voucher de Compra</h2>
                        <p><strong>Nombre:</strong> {{ user.name }}</p>
                        <p><strong>Email:</strong> {{ user.email }}</p>
                        <p><strong>Película:</strong> {{ funcion.pelicula.titulo }}</p>
                        <p><strong>Fecha y Horario:</strong> {{ formatDateTime(funcion.fecha) }}</p>
                        <p><strong>Asientos:</strong> {{$store.state.asientos.length}}</p>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-center">
                        <v-img :src="qrCodeUrl" alt="QR Code" max-width="200" contain></v-img>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
import QRCode from 'qrcode'

export default {
    props: {
        user: Object,
        funcion: Object,
        asientos: Array,
    },
    data() {
        return {
            qrCodeUrl: '',
        };
    },
    computed: {
        formattedAsientos() {
            return this.asientos
                .flat()
                .filter(asiento => asiento.color === 'red')
                .map(asiento => asiento.numero)
                .join(', ');
        },
    },
    methods: {
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
        async generateQRCode() {
            const data = `
                Nombre: ${this.user.name}
                Email: ${this.user.email}
                Película: ${this.funcion.pelicula.titulo}
                Fecha y Horario: ${this.formatDateTime(this.funcion.fecha)}
                Asientos: ${this.formattedAsientos}
            `;
            this.qrCodeUrl = await QRCode.toDataURL(data);
        },
    },
    created() {
        this.generateQRCode();
    },
};
</script>

<style scoped>
.v-card-title {
    background-color: #f5f5f5;
}
</style>
