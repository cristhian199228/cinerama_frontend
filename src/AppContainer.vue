<template>
  <v-app id="inspire">
    <v-app-bar class="px-3" density="compact">
      <v-spacer></v-spacer>
      <v-img src="@/assets/cinerama.svg" alt="Logo" max-width="130"></v-img>
      <v-spacer></v-spacer>
      <v-tabs color="grey-darken-2" centered>
        <v-tab v-for="menu in menus" :key="menu.id" :to="menu.to">
          {{ menu.descripcion }}
        </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <v-menu min-width="200px" rounded>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar color="red-accent-4" size="35">
              <v-icon v-if="isInvitado" icon="mdi-account"></v-icon>
              <span v-else>{{ userInitials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center mt-0">
              <v-avatar color="red-accent-4">
                <span>{{ userInitials }}</span>
              </v-avatar>
              <h3>{{ user.name }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn v-if="isAuthenticated && !isInvitado" variant="text" @click="logout" rounded>
                Cerrar Sesión
              </v-btn>
              <v-btn v-else variant="text" to="/login" rounded>
                Ingresar
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main class="bg-grey-lighten-1">
      <v-row class="mt-1">
        <v-col cols="12" offset-xl="2" offset-lg="1" xl="8" lg="10">
          <v-sheet min-height="70vh" rounded="lg">
          
              <router-view />
  
          </v-sheet>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  data: () => ({}),
  computed: {
    ...mapState(['snackbar', 'isLoading', 'user']),
    ...mapGetters(['currentUser', 'isAuthenticated']),

    isInvitado() {
      return this.user && this.user.rol && this.user.rol.id === 3;
    },

    userInitials() {
      const nameArray = this.user.name.split(' ');
      return nameArray.map(n => n[0]).join('');
    },

    userName() {
      if (this.isInvitado) {
        return 'Invitado';
      }
      return this.user && this.user.name ? this.user.name : 'Invitado';
    },

    userEmail() {
      if (this.isInvitado) {
        return 'invitado@mail.com';
      }
      return this.user && this.user.email ? this.user.email : 'invitado@mail.com';
    },

    menus() {
      return this.$store.getters["menus"]
    }
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('logout')
        await this.$router.push('/')
      } catch (e) {
        this.$store.commit('SHOW_ERROR_SNACKBAR', e.message)
      }
    }
  },
}
</script>
