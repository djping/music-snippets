<template>
  <div class="song-list">
    <div class="song-item" 
      v-for="(song, index) in songs" 
      :key="index"
      @click="selectItem(song, index)"
    >
      <h1></h1>
      <p></p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    songs: {
      type: Array,
      default: null
    }
  },
  methods: {
    selectItem (song, index) {
      this.$emit('select', index)
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
