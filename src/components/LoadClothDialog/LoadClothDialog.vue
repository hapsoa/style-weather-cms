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
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="isOpen = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-layout row>
          <v-flex xs4>
            <v-card>
              <v-card-title>선택된 의상</v-card-title>
              <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" height="300"></v-img>
            </v-card>
            <v-card>
              <v-card-title>현재 의상</v-card-title>
              <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" height="300"></v-img>
            </v-card>
          </v-flex>
          <v-flex xs8>
            <!-- <ClothList></ClothList> -->
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