<template>
  <v-app>
    <v-main>
      <v-container>
        <hello-world /> <!-- Usar el componente HelloWorld aquí -->
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'; // Importa el componente

export default {
  name: 'App',

  components: {
    HelloWorld, // Registra el componente
  },

  data: () => ({
    //
  }),
};
</script>

<style>
/* Estilos opcionales aquí */
</style>
