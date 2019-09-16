<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">Vue.js+GraphQL Example</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <post-item-list/>
    </v-content>
  </v-app>
</template>

<script>
import PostItemList from './components/PostItemList';

export default {
  name: 'App',
  components: {
    PostItemList,
  },
  data: () => ({
    //
  }),
};
</script>
