<template>
    <v-card variant="text">
      <v-data-iterator
        :items="cines"
        :items-per-page="10"
        :search="search"
      >
 
        <template v-slot:default="{ items }">
          <v-container class="pa-2" >
            <v-row dense>
              <v-col
                v-for="item in items"
                :key="item.id"
                cols="auto"
                md="12"
              >
                <v-card class="pb-3" variant="flat">
                  <v-img :src="item.raw.path_url" cover></v-img>                   
                    <template v-slot:title>
                      <strong class=" mb-2">{{ item.raw.descripcion }}</strong>
                    </template>
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
              Page {{ page }} of {{ pageCount }}
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
    </v-card>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  
  export default {
    data: () => ({
      search: '',
    }),
    computed: {
      ...mapState({
        cines: state => state.cines,
      }),
    },
    methods: {
      ...mapActions(['fetchCines']),
    },
    created() {
      this.fetchCines();
    },
  };
  </script>
  