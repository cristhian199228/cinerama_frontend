<template>
  <div>
    <v-form @submit.prevent="login">
      <v-img class="mx-auto my-6" max-width="228" src="@/assets/cinerama.svg"></v-img>

      <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
        <div class="text-subtitle-1 text-medium-emphasis">Usuario</div>

        <v-text-field density="compact" placeholder="Correo Electronico" v-model="form.email"
          prepend-inner-icon="mdi-email-outline" variant="outlined"></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Contraseña
        </div>

        <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" v-model="form.password"
          :type="visible ? 'text' : 'password'" density="compact" placeholder="Ingrese su Contraseña"
          prepend-inner-icon="mdi-lock-outline" variant="outlined"
          @click:append-inner="visible = !visible"></v-text-field>

        <v-btn class="mb-8" color="red-accent-4" size="large" variant="tonal" block type="submit">
          Ingresar
        </v-btn>

        <v-card-text class="text-center">
          <a class="text-red-accent-4 text-decoration-none" href="#" rel="noopener noreferrer" target="_blank">
            Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
      </v-card>
    </v-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      form: {
        email: '',
        password: ''
      },
      /*      form: {
             email: '',
             password: ''
           }, */
      showPassword: false,
      snackbar: {
        show: false,
        status: null,
        message: null
      }
    };
  },
  methods: {
    async login() {
      /* const isValid = await this.$refs.observer.validate() */
      /*   if (!isValid) return */
/*       this.$store.commit('SET_LOADING', true) */
      try {
        await this.$store.dispatch('login', this.form)
        await this.$router.push('/')
/*         this.$store.commit('SET_LOADING', false) */
        this.$store.commit('SHOW_SUCCESS_SNACKBAR', this.$t('messages.success.login'))
      } catch (e) {
        this.snackbar.status = 'error'
        this.snackbar.message = e.message
        this.snackbar.show = true
/*         this.$store.commit('SET_LOADING', false) */
      }
    }
  }
};
</script>
