<template>
  <div style="text-align: center">
    <ElectronicSignature></ElectronicSignature>
  </div>
</template>

<script>
import { ElectronicSignature } from "../dist/electronic-signature.es";
export default {
  name: "App",
  components: {
    ElectronicSignature,
  },
};
</script>

<style lang="less">
html {
  margin: 0;
  border: 0;
  padding: 0;
  font-family: "PingFang SC", miui, system-ui, -apple-system, BlinkMacSystemFont,
    Helvetica Neue, Helvetica, sans-serif;
  height: 100%;
  overflow: hidden;
}

body {
  margin: 0;
  border: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  width: 100%;
}

#app {
  height: 100%;
  color: #323233;
  overflow-y: auto;
}
</style>
