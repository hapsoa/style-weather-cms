<template>
  <div class="selector">
    <div
      v-for="(clothesGroup, i) in brickArray"
      :key="i"
      class="box"
      :style="`background-image: url('${clothesGroup.imageUrl}')`"
    ></div>
  </div>
</template>

<script lang='ts' src='./BricksComponent.ts' />

<style scoped lang='scss'>
.box {
  width: 200px;
  height: 200px;
  // background-color: green;
  background-size: contain;
  border: 1px solid #aaa;
}
</style>