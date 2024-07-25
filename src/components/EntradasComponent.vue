<template>
    <v-card flat>
        <v-card-title>Entradas</v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="12" class="py-2" v-for="(entrada, index) in entradas" :key="index">
                    <v-card flat class="d-flex align-center">
                        <div>
                            <p class="mb-1"><strong>{{ entrada.nombre }}</strong></p>
                            <p class="mb-1">valor: S/ {{ entrada.precio }}</p>
                        </div>
                        <v-spacer></v-spacer>
                        <v-select
                            v-model="entrada.cantidad"
                            :items="cantidades"
                            class="mr-3"
                            dense
                            @change="guardarEntradaComprada(entrada)"
                        ></v-select>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            cantidades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        };
    },
    computed: {
        ...mapState({
            entradas: state => state.tipos_entradas,
        }),
    },
    methods: {
        ...mapActions(['fetchTiposEntradas', 'saveEntradaComprada']),
        guardarEntradaComprada(entrada) {
            this.saveEntradaComprada(entrada);
        }
    },
    created() {
        this.fetchTiposEntradas();
    },
};
</script>
