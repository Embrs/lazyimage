<template lang="pug">
  #BlurhashCanvas
    canvas.image-canvas-bg(:width="32" :height="32" ref="canvas")
</template>

<script>
import { decode } from "blurhash";

export default {
  props: {
    hash: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.DrawCanvas();
  },
  methods: {
    DrawCanvas () {
      const pixels = decode(this.hash, 32, 32);
      const ctx = this.$refs.canvas.getContext("2d");
      const imageData = ctx.createImageData(32, 32);
      imageData.data.set(pixels);
      ctx.putImageData(imageData, 0, 0, 0, 0, 100, 100);
    }
  }
};
</script>

<style lang="scss" scoped>
#BlurhashCanvas {
  position: relative;
  height: 0;
  .image-canvas-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
