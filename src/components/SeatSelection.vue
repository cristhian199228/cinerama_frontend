<template>
    <v-card flat>
        <v-card-title>Asientos</v-card-title>
        <v-card-text>
            <div class="screen-container">
                <div class="screen">PANTALLA</div>
            </div>
            <v-row v-for="(row, rowIndex) in localAsientos" :key="rowIndex" class="justify-center">
                <v-col v-for="(asiento, colIndex) in row" :key="colIndex" cols="auto">
                    <v-btn :color="asiento.color" @click="toggleAsiento(rowIndex, colIndex)">
                        {{ asiento.numero }}
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState({
            localAsientos: state => state.localAsientos
        })
    },
    methods: {
        ...mapActions(['setLocalAsientos', 'updateAsiento']),
        generarAsientos() {
            let numero = 1;
            let asientos = [];
            for (let i = 0; i < 6; i++) {
                let fila = [];
                for (let j = 0; j < 8; j++) {
                    fila.push({ numero: numero++, color: 'grey' });
                }
                asientos.push(fila);
            }
            this.setLocalAsientos(asientos);
        },
        toggleAsiento(rowIndex, colIndex) {
            const asiento = this.localAsientos[rowIndex][colIndex];
            const color = asiento.color === 'grey' ? 'red-accent-4' : 'grey';
            this.updateAsiento({ rowIndex, colIndex, color });
        }
    },
    created() {
        this.generarAsientos();
    }
};
</script>
