<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex v-for="(clothesGroup, i) in clothesGroups" :key="i" xs6 sm4 md3 lg2 pb-4>
        <v-img :src="clothesGroup.imageUrl" @click="goDetailView" width="200" height="200" contain></v-img>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang='ts' src='./Main.ts' />

<style scoped lang='scss'>
.v-image {
  border: 1px solid #aaa;
  cursor: pointer;
}
</style>