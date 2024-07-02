<template>
  <v-card>
    <v-data-iterator
      :items="peliculas"
      :items-per-page="9"
      :search="search"
    >
      <template v-slot:header>
        <v-toolbar class="px-2">
          <v-text-field
            v-model="search"
            density="comfortable"
            placeholder="Buscar"
            prepend-inner-icon="mdi-magnify"
            style="max-width: 300px;"
            variant="solo"
            clearable
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn
            @click="navigateToNuevo"
            prepend-icon="mdi-plus"
            color="red-accent-4"
            variant="flat"
          >
            Nueva Pelicula
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:default="{ items }">
        <v-container class="pa-2" fluid>
          <v-row dense>
            <v-col
              v-for="item in items"
              :key="item.id"
              cols="auto"
              md="3"
            >
              <v-card class="pb-3" border flat>
                <v-img :src="getImageUrl(item.raw.poster_path_api)"></v-img>
                <v-list-item :subtitle="isExpanded(item.id) ? item.raw.sinopsis : truncateText(item.raw.sinopsis, 100)" class="mb-2">
                  <template v-slot:title>
                    <strong class="text-h6 mb-2">{{ item.raw.titulo }}</strong>
                  </template>
                </v-list-item>
                <div class="d-flex justify-space-between px-4">
                  <div class="d-flex align-center text-caption text-medium-emphasis me-1">
                    <v-icon icon="mdi-account" start></v-icon>
                    <div class="text-truncate">{{ item.raw.director}}</div>
                  </div>
                  <v-btn
                    class="text-none"
                    size="small"
                    text
                    flat
                    color="red-accent-4"
                    prepend-icon="mdi-pencil"
                  >
                   Editar
                  </v-btn>
                </div>
                <div class="d-flex justify-space-between px-4">
                  <div class="d-flex align-center text-caption text-medium-emphasis me-1">
                    <v-icon icon="mdi-calendar" start></v-icon>
                    <div class="text-truncate">{{ item.raw.fecha_estreno}}</div>
                  </div>
                  <v-btn
                    class="text-none"
                    size="small"
                    text
                    border
                    flat
                    @click="openTrailer(item.raw.trailer_path_api)"
                  >
                    Ver Trailer
                  </v-btn>
                </div>
                <div class="d-flex justify-space-between px-4">
                  <div class="d-flex align-center text-caption text-medium-emphasis me-1">
                    <v-icon icon="mdi-clock" start></v-icon>
                    <div class="text-truncate">{{ item.raw.duracion }} mins</div>
                  </div>
                  <v-btn
                    class="text-none"
                    size="small"
                    text
                    border
                    flat
                    @click="toggleExpansion(item.id)"
                  >
                    {{ isExpanded(item.id) ? 'Ocultar' : 'Mostrar mas' }}
                  </v-btn>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
        <div class="d-flex align-center justify-center pa-4">
          <v-btn
            :disabled="page === 1"
            density="comfortable"
            icon="mdi-arrow-left"
            variant="tonal"
            rounded
            @click="prevPage"
          ></v-btn>

          <div class="mx-2 text-caption">
            Pagina {{ page }} de {{ pageCount }}
          </div>

          <v-btn
            :disabled="page >= pageCount"
            density="comfortable"
            icon="mdi-arrow-right"
            variant="tonal"
            rounded
            @click="nextPage"
          ></v-btn>
        </div>
      </template>
    </v-data-iterator>

    <v-dialog v-model="trailerDialog" max-width="800px">
      <v-card color="black">
        <v-responsive >
          <iframe
            v-if="trailerPath"
            :src="`https://www.youtube.com/embed/${trailerPath}`"
            width="100%"
            height="460px"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          ></iframe>
        </v-responsive>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    search: '',
    expandedItems: {},
    trailerDialog: false,
    trailerPath: ''
  }),
  computed: {
    peliculas() {
      return this.$store.state.peliculas;
    }
  },
  methods: {
    loadPeliculas() {
      this.$store.dispatch('fetchPeliculas');
    },
    getImageUrl(path) {
      return `https://image.tmdb.org/t/p/original${path}`;
    },
    truncateText(text, length) {
      if (text.length > length) {
        return text.substring(0, length) + '...';
      }
      return text;
    },
    isExpanded(id) {
      return this.expandedItems[id] || false;
    },
    toggleExpansion(id) {
      this.expandedItems = { ...this.expandedItems, [id]: !this.isExpanded(id) };
    },
    openTrailer(trailerPath) {
      this.trailerPath = trailerPath;
      this.trailerDialog = true;
    },
    navigateToNuevo() {
      this.$router.push('/administrador/peliculas/nuevo');
    }
  },
  created() {
    this.loadPeliculas();
  },
}
</script>
