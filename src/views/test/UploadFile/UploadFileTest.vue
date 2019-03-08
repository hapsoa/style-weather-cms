<template>
  <v-container fluid>
    <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
      <img :src="imageUrl" height="150" v-if="imageUrl">
      <v-text-field
        label="Select Image"
        @click="pickFile"
        v-model="imageName"
        prepend-icon="attach_file"
      ></v-text-field>
      <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked">
    </v-flex>
    <!-- <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Hello World!</v-card-title>
        <v-card-text>Image Upload Script in VUE JS
          <hr>Yubaraj Shrestha
          <br>http://yubarajshrestha.com.np/
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>-->
  </v-container>
</template>

<script lang='ts' src='./UploadFileTest.ts' />

<style scoped>
</style>