<template>
  <v-container class="item-list">
    <v-row
      class="-centertext"
      text-center
      align="center"
      justify="center"
    >
      <v-col cols="12">
        <h4 v-if="loading">Loading...</h4>
        <post-item v-for="post in posts" :key="post.id" :post="post"></post-item>
      </v-col>
      <v-row
        align="center"
        justify="center"
      >
        <v-col cols="3">
          <v-text-field v-model="title" label="投稿のタイトルを入力してください"></v-text-field>
        </v-col>
        <v-btn :class="postButtonClass" @click="createPost" color="primary">投稿する</v-btn>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import PostItem from '../components/PostItem'
import { ALL_POSTS_QUERY, CREATE_POST_MUTATION } from '../constants/graphql';

export default {
  components: {
    PostItem
  },
  apollo: {
    posts: {
      query: ALL_POSTS_QUERY
    }
  },
  computed: {
    notInputted() {
      return this.title.length === 0
    },
    postButtonClass() {
      return {
        '-disabled': this.notInputted
      }
    }
  },
  data() {
    return {
      title: '',
      posts: [],
      loading: 0
    }
  },
  methods: {
    async createPost() {
      if (this.notInputted) return;

      await this.$apollo.mutate( {
        mutation: CREATE_POST_MUTATION,
        variables: {
          title: this.title
        },
        update: (store, {data: { createPost }}) => {
          const data = store.readQuery({
            query: ALL_POSTS_QUERY
          })
          data.posts.push(createPost)
          store.writeQuery({ query: ALL_POSTS_QUERY, data})
        }
      })

      this.title = ''
    }
  }
}
</script>
<style lang="scss">
  .item-list {
    >.-centertext {
      text-align: center;
    }
    .-disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }
</style>
