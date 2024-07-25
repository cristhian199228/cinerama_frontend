<template>
    <v-card flat>
        <v-card-title>
            <h1 class="text-red-accent-4">Datos del Usuario</h1>
        </v-card-title>
        <v-card-text>
            <div v-if="isInvitado">
                <p>Debe iniciar sesión para poder comprar entradas.</p>
                <v-btn color="primary" @click="goToLogin">Iniciar sesión</v-btn>
            </div>
            <div v-else>
                <p>
                    <v-icon color="red-accent-4">mdi-account</v-icon>
                    <strong class="ml-2">NOMBRE:</strong> {{ user.name }}
                </p>
                <p>
                    <v-icon color="red-accent-4">mdi-email</v-icon>
                    <strong class="ml-2">EMAIL:</strong> {{ user.email }}
                </p>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: {
        user: Object,
        isInvitado: Boolean,
    },
    methods: {
        goToLogin() {
            this.$emit('goToLogin');
        },
    },
};
</script>
