<template>
  <v-container>
    <v-form v-model="valid">
      <v-row>
        <v-col cols="12" md="3">
          <v-select v-model="selectedMovie" prepend-icon="mdi-filmstrip" :items="peliculas"
            label="Selecciona una Película" item-title="titulo" item-value="id"
            :rules="[v => !!v || 'Selecciona una película']"></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-select v-model="selectedCinema" prepend-icon="mdi-movie" :items="cines" label="Selecciona un Cine"
            item-title="descripcion" item-value="id" :rules="[v => !!v || 'Selecciona un cine']"></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-select prepend-icon="mdi-theater" v-model="selectedHall" :items="salas" label="Selecciona una Sala"
            item-title="name" item-value="id" :rules="[v => !!v || 'Selecciona una sala']"></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field v-model="time" :active="menu2" :focus="menu2" label="Selecciona una Función"
            prepend-icon="mdi-clock-time-four-outline" readonly>
            <v-menu v-model="menu2" :close-on-content-click="false" activator="parent" transition="scale-transition">
              <v-time-picker v-if="menu2" v-model="time" full-width format="24hr"></v-time-picker>
            </v-menu>
          </v-text-field>
        </v-col>
      </v-row>
      <v-btn :disabled="!valid" @click="submitSelection">Submit</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { VTimePicker } from 'vuetify/labs/VTimePicker'
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    VTimePicker,
  },
  data() {
    return {
      time: null,
      menu2: false,
      valid: false,
      selectedCinema: null,
      selectedMovie: null,
      selectedHall: null,
    };
  },
  computed: {
    ...mapGetters(['cines', 'salas']),
    peliculas() {
      return this.$store.state.peliculas;
    }
  },
  methods: {
    ...mapActions(['fetchCines', 'fetchPeliculas', 'fetchSalas']),
    submitSelection() {
      alert(
        `Cine: ${this.selectedCinema}, Película: ${this.selectedMovie}, Sala: ${this.selectedHall}, Función: ${this.time}`
      );
    },
  },
  watch: {
    selectedCinema(newVal) {
      if (newVal) {
        this.fetchSalas(newVal);
        this.selectedHall = null; // Reset selected hall when cinema changes
      }
    }
  },
  created() {
    this.fetchCines();
    this.fetchPeliculas();
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}
</style>
