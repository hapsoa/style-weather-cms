<template>
  <v-container fluid pa-0>
    <v-layout v-if="clothList" class="cloth-list" row wrap mt-3 pa-3>
      <!-- <v-flex v-for="(cloth, i) in clothList" :key="i" ma-1>
        <v-img
          v-if="cloth"
          :src="cloth.data.imageUrl"
          @click="clickCloth(cloth)"
          class="cloth-item"
          :class="{selected: canSelectHighlight && cloth.selected}"
          width="130"
          height="130"
          contain
        >
          <v-layout v-if="canHoverHighlight" justify-end>
            <v-btn class="margin-0" flat icon color="#aaa">
              <v-icon>cancel</v-icon>
            </v-btn>
          </v-layout>
        </v-img>
      </v-flex>-->
      <div v-for="(cloth, i) in clothList" :key="i">
        <div v-if="cloth" style="width: 130px; height: 130px; margin: 5px;">
          <v-img
            :src="cloth.data.imageUrl"
            @click="clickCloth(cloth)"
            class="cloth-item"
            :class="{selected: canSelectHighlight && cloth.selected}"
            width="100%"
            height="100%"
            contain
          >
            <v-layout justify-space-between>
              <div style="padding: 4px;">{{showGender(cloth)}}</div>
              <v-btn v-if="canHoverHighlight" class="margin-0" flat icon color="#aaa">
                <v-icon @click="deleteCloth(cloth)">cancel</v-icon>
              </v-btn>
            </v-layout>
          </v-img>
        </div>
      </div>
    </v-layout>
    <v-layout>
      <v-btn v-if="canSeeMore" @click="seeMore" block>see more</v-btn>
    </v-layout>
  </v-container>
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
  button {
    display: none;
  }
  &:hover {
    button {
      display: block;
    }
  }
}
.selected {
  border: 3px solid skyblue;
}
.margin-0 {
  margin: 0;
}
</style>