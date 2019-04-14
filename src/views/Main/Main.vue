<template>
  <v-container fluid>
    <v-layout row wrap>
      <div
        v-show="$store.state.groupOrItem === 'group'"
        v-for="(clothesGroup, i) in clothesGroups"
        :key="`group-${i}`"
        class="image-element"
        style
      >
        <v-img
          :src="clothesGroup.imageUrl"
          @click="goClothesGroupDetail(clothesGroup.id)"
          width="100%"
          height="100%"
          contain
        ></v-img>
      </div>

      <div
        v-show="$store.state.groupOrItem === 'item'"
        v-for="(cloth, i) in clothes"
        :key="`item-${i}`"
        class="image-element"
      >
        <v-img
          :src="cloth.data.imageUrl"
          @click="goClothDetail(cloth.data.id)"
          width="100%"
          height="100%"
          contain
        ></v-img>
      </div>
    </v-layout>
    <v-layout>
      <v-btn @click="seeMore" block>더보기(test용)</v-btn>
    </v-layout>
  </v-container>
</template>

<script lang='ts' src='./Main.ts' />

<style scoped lang='scss'>
.image-element {
  width: 200px;
  height: 200px;
  margin: 10px;
  border: 1px solid #aaa;
  cursor: pointer;
}
// .v-image {
//   border: 1px solid #aaa;
//   cursor: pointer;
// }
</style>