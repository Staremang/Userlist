<template>
  <div class="container">
    <Users />
  </div>
</template>

<script>
import Users from './components/Users.vue'

export default {
  name: 'app',
  components: {
    Users
  }
}
</script>

<style lang="scss">
body {
  background: #eee;
}
</style>
