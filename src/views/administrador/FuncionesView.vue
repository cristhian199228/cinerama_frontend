<template>
  <v-container>
    <v-form v-model="valid">
      <v-row>
        <v-col cols="12" md="4">
          <v-select v-model="selectedMovie" prepend-icon="mdi-filmstrip" :items="peliculas"
            label="Selecciona una Película" item-title="titulo" item-value="id"
            :rules="[v => !!v || 'Selecciona una película']"></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select v-model="selectedCinema" prepend-icon="mdi-movie" :items="cines" label="Selecciona un Cine"
            item-title="descripcion" item-value="id" :rules="[v => !!v || 'Selecciona un cine']"></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select prepend-icon="mdi-theater" v-model="selectedHall" :items="salas" label="Selecciona una Sala"
            item-title="descripcion" item-value="id" :rules="[v => !!v || 'Selecciona una sala']"></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field v-model="time" :active="menu2" :focus="menu2" label="Selecciona una Función"
            prepend-icon="mdi-clock-time-four-outline" readonly>
            <v-menu v-model="menu2" :close-on-content-click="false" activator="parent" transition="scale-transition">
              <v-time-picker v-if="menu2" v-model="time" full-width format="24hr"></v-time-picker>
            </v-menu>
          </v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-date-input v-model="model" label="Selecciona una fecha" max-width="368"></v-date-input>
        </v-col>
        <v-col cols="12" md="3">
          <v-btn class="mt-3" :disabled="!valid" @click="submitSelection">Agregar</v-btn>
        </v-col>
      </v-row>
      <v-data-table-virtual :headers="headers" :items="$store.state.funciones" height="400"
        item-value="id"></v-data-table-virtual>
    </v-form>
  </v-container>
</template>

<script>
import { VTimePicker } from 'vuetify/labs/VTimePicker'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { mapGetters, mapActions } from 'vuex';
export default {
  components: {
    VTimePicker,
    VDateInput
  },
  data() {
    return {
      time: null,
      menu2: false,
      valid: false,
      selectedCinema: null,
      selectedMovie: null,
      selectedHall: null,
      model: null,
      salas: [],
      headers: [
        { title: 'Fecha', align: 'center', key: 'fecha' },
        { title: 'Pelicula', align: 'center', key: 'pelicula.titulo' },
        { title: 'Cine', align: 'center', key: 'sala.cine.descripcion' },
        { title: 'Sala', align: 'center', key: 'sala.descripcion' },      
      ]
    };
  },
  computed: {
    ...mapGetters(['cines']),
    peliculas() {
      return this.$store.state.peliculas;
    },
  },
  methods: {
    ...mapActions(['fetchCines', 'fetchPeliculas','fetchFunciones', 'fetchSalas', 'saveFuncion']),
    submitSelection() {
      // Asegúrate de que this.model (fecha) y this.time (hora) están en el formato adecuado.
      const date = new Date(this.model);
      const time = this.time.split(':');
      date.setHours(time[0]);
      date.setMinutes(time[1]);

      // Formatear datetime en 'Y-m-d H:i:s'
      const datetime = date.toISOString().slice(0, 19).replace('T', ' ');

      const funcionData = {
        pelicula_id: this.selectedMovie,
        sala_id: this.selectedHall,
        fecha: datetime
      };

      this.$store.dispatch('saveFuncion', funcionData)
        .then(() => {
          this.$emit('funcion-saved');
        })
        .catch(error => {
          console.error('Error saving function:', error);
        });
    }

  },
  watch: {
    async selectedCinema(newVal) {
      if (newVal) {
        this.salas = await this.$store.dispatch('fetchSalasById', newVal);
      }
    }
  },
  created() {
    this.fetchCines();
    this.fetchPeliculas();
    this.fetchFunciones();
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}
</style>
