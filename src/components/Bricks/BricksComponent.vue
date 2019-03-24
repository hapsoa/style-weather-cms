<template>
  <div class="selector">
    <div v-for="(brick, i) in brickArray" :key="i" class="box">{{brick}}</div>
  </div>
</template>

<script lang='ts' src='./BricksComponent.ts' />

<style scoped lang='scss'>
.box {
  width: 200px;
  height: 200px;
  background-color: green;
}
</style>