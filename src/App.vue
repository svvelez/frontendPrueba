<template>
  <v-app>
    <v-main>
      <v-container>
        <BookComponent />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import BookComponent from './components/BookComponent.vue';

export default {
  name: 'App',

  components: {
    BookComponent, // Registra el componente
  },

  data: () => ({
    //
  }),
};
</script>

<style>
/* Estilos opcionales aquí */
</style>
