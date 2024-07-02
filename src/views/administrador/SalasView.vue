<template>
  <v-data-table-virtual v-model:items-per-page="itemsPerPage" :headers="headers" :items="salas"
    :items-length="totalItems" :loading="loading" @update:options="loadItems">
    <template v-slot:[`item.acciones`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table-virtual>
</template>

<script>
export default {
  data: () => ({
    itemsPerPage: 20,
    headers: [
      { title: 'Cine', key: 'cine.descripcion', align: 'center' },
      { title: 'Sala', key: 'descripcion', align: 'center' },
      { title: 'Acciones', key: 'acciones', align: 'center', sortable: false },
    ],
  }),
  computed: {
    salas() {
      return this.$store.state.salas;
    },
    totalItems() {
      return this.salas.length;
    },
    loading() {
      return this.$store.state.loading;
    },
  },
  methods: {
    loadCines() {
      this.$store.dispatch('fetchSalas');
    },
    loadItems() {
      this.loadCines();
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
