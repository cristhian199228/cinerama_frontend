<template>
    <v-card flat>
        <v-card-title>Alimentos y Bebidas</v-card-title>
        <v-card-text>
            <v-row v-for="producto in productos" :key="producto.id">
                <v-col>
                    <v-img :src="producto.path" height="70" contain></v-img>
                </v-col>
                <v-col>
                    {{ producto.descripcion }}
                </v-col>
                <v-col>
                    {{ producto.precio }}
                </v-col>
                <v-col>
                    <v-number-input v-model="cantidad" min="0" max="10" inset controlVariant="split"></v-number-input>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import { VNumberInput } from 'vuetify/labs/VNumberInput'
export default {
    props: {
        productos: Array,
    },
    components: {
        VNumberInput,
    },
    data() {
        return {
            cantidad: 0
        };
    },
};
</script>
