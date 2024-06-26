<template>
  <v-row class="ma-5">
    <v-col class="d-inline-flex">
      <v-select class="mx-2" label="Ciudad"
        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']" hide-details></v-select>
      <v-select class="mx-2" label="Cine"
        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']" hide-details></v-select>
      <v-select class="mx-2" label="Pelicula"
        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']" hide-details></v-select>
      <v-select class="mx-2" label="Fecha"
        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']" hide-details ></v-select>
      <v-btn color="red-accent-4" class="my-auto">
        Button
      </v-btn>
    </v-col>
  </v-row>

</template>
