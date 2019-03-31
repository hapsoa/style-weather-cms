<template>
  <v-layout v-if="clothList" class="cloth-list" row wrap mt-3 pa-3>
    <v-flex v-for="(cloth, i) in clothList" :key="i" ma-1>
      <v-img
        v-if="cloth"
        :src="cloth.imageUrl"
        @click="clickCloth(cloth.id)"
        class="cloth-item"
        width="130"
        height="130"
        contain
      ></v-img>
    </v-flex>
  </v-layout>
</template>

<script src='./ClothList.ts' lang='ts' />

<style scoped lang='scss'>
.cloth-list {
  width: 100%;
  max-height: 500px;
  border: 1px solid #aaa;
  margin-top: 16px;
  overflow: scroll;
}
.cloth-item {
  cursor: pointer;
  border: 1px solid #aaa;
}
</style>