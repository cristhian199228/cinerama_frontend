<template>
  <v-data-table-virtual
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="ciudades"
    :items-length="totalItems"
    :loading="loading"
    @update:options="loadItems"
  >
  <template v-slot:[`item.acciones`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table-virtual>
</template>

<script>
export default {
  data: () => ({
    itemsPerPage: 10,
    headers: [
      { title: 'Descripcion', key: 'descripcion', align: 'center' },
      { title: 'Acciones', key: 'acciones', align: 'center', sortable: false },
    ],
  }),
  computed: {
    ciudades() {
      return this.$store.state.ciudades;
    },
    totalItems() {
      return this.ciudades.length;
    },
    loading() {
      return this.$store.state.loading;
    },
  },
  methods: {
    loadCiudades() {
      this.$store.dispatch('fetchCiudades');
    },
    loadItems() {
      this.loadCiudades();
    },
    editItem(item) {
      // Implementa la lógica para editar el item
      console.log('Edit item:', item);
    },
    deleteItem(item) {
      // Implementa la lógica para eliminar el item
      console.log('Delete item:', item);
    },
  },
  created() {
    this.loadItems();
  },
};
</script>
