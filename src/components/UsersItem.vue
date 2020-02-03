<template>
  <div class="card">
    <div class="row no-gutters">
      <div class="col-md-2">
        <img
          class="card-img"
          :src="img"
          :alt="name"
        >
      </div>
      <div class="col-md-10">
        <div class="card-body">
          <h5 class="card-title">
            {{ name }}
          </h5>
          <p class="card-text">
            <a :href="`mailto:${email}`">{{ email }}</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UsersItem',
  props: {
    name: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">

</style>
