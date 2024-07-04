<template>
  <v-card variant="text">
    <v-toolbar color="red-accent-4">
      <v-toolbar-title>Panel Administrador</v-toolbar-title>

      <v-spacer></v-spacer>

      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          align-tabs="title"
        >
          <v-tab
            v-for="item in items"
            :key="item.path"
            :to="item.path"
            :text="item.name"
            :value="item.path"
          ></v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item
        v-for="item in items"
        :key="item.path"
        :value="item.path"
      >
        <router-view></router-view>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      items: [
        { name: 'Ciudades', path: '/administrador/ciudades' },
        { name: 'Cines', path: '/administrador/cines' },
        { name: 'Salas', path: '/administrador/salas' },
        { name: 'Tipos de Entrada', path: '/administrador/tipos-entrada' },
        { name: 'Películas', path: '/administrador/peliculas' },
        { name: 'Funciones', path: '/administrador/funciones' },
      ],
    };
  },
};
</script>
