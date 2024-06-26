<template>
  Elije tu cine
  <v-row class="ma-5">
    <v-col class="d-inline-flex">
      <v-select class="mx-2" label="Ciudad"
        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
      <v-select class="mx-2" label="Cine"
        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
      <v-select class="mx-2" label="Pelicula"
        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
        <v-select class="mx-2" label="Fecha"
        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
    </v-col>
  </v-row>

</template>
