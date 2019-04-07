<template>
  <v-layout row>
    <v-dialog v-model="isOpen" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary" dense>
          <v-btn icon dark @click="isOpen = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Load Cloth</v-toolbar-title>
          <!-- <v-spacer></v-spacer> -->
          <v-toolbar-items>
            <v-select
              v-model="majorSelect"
              :items="majorClassItems"
              @change="majorSelectChanged"
              label="대분류 카테고리"
              height="40"
            ></v-select>
            <v-select
              v-model="minorSelect"
              :items="minorClassItems"
              @change="minorSelectChanged"
              label="소분류 카테고리"
              height="40"
            ></v-select>
            <v-text-field
              ref="searchInput"
              v-model="searchInput"
              @input="searchInputChanged"
              label="Search"
            ></v-text-field>
            <v-btn dark flat @click="searchClothes">검색</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-layout row>
          <v-flex xs4>
            <v-card>
              <v-card-title>선택된 의상</v-card-title>
              <v-img
                v-if="selectedCloth"
                :lazy-src="selectedCloth.imageUrl"
                :src="selectedCloth.imageUrl"
                height="300"
              ></v-img>
              <v-img v-else height="300">no image</v-img>
            </v-card>
            <v-card>
              <v-card-title>현재 의상</v-card-title>
              <v-img v-if="currentCloth" :src="currentCloth.imageUrl" height="300"></v-img>
              <v-img v-else height="300">no image</v-img>
            </v-card>
          </v-flex>
          <v-flex xs8>
            <ClothList :clothList="clothList" ref="clothList" :canSelectHighlight="true"></ClothList>
            <v-layout justify-end>
              <v-btn @click="confirm" color="primary">확인</v-btn>
              <v-btn @click="cancel">취소</v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script src='./LoadClothDialog.ts' lang='ts' />

<style scoped lang='scss'>
.v-card__title {
  padding-top: 4px;
  padding-bottom: 4px;
}
</style>