<template>
  <v-container fluid pa-0>
    <v-layout>
      <v-flex xs6 pa-3>
        <v-container fluid pa-0 grid-list-md>
          <v-layout row>
            <v-flex>
              <div class="cloth-zone">q</div>
            </v-flex>
            <v-flex>
              <div class="cloth-zone">머리</div>
            </v-flex>
            <v-flex>
              <div class="cloth-zone">q</div>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex>
              <div class="cloth-zone">아우터</div>
            </v-flex>
            <v-flex>
              <div class="cloth-zone">
                <img :src="imageUrl" class="cloth-zone" v-if="imageUrl">
              </div>
            </v-flex>
            <v-flex>
              <div class="cloth-zone">상의2</div>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex>
              <div class="cloth-zone">q</div>
            </v-flex>
            <v-flex>
              <div class="cloth-zone">바지</div>
            </v-flex>
            <v-flex>
              <div class="cloth-zone">q</div>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex>
              <div class="cloth-zone">q</div>
            </v-flex>
            <v-flex>
              <div class="cloth-zone">신발</div>
            </v-flex>
            <v-flex>
              <div class="cloth-zone">q</div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>

      <v-flex xs6 pa-3>
        <v-form ref="form" v-model="formValid" lazy-validation>
          <v-text-field v-model="name" :counter="20" :rules="nameRules" label="그룹 제목" required></v-text-field>

          <v-text-field v-model="linkUrl" :rules="linkUrlRules" label="Link URL" required></v-text-field>

          <!-- <input type="file" ref="image" accept="image/*" required @change="onFilePicked"> -->
          <!-- <v-text-field :rules="fileRules" style="display: none" required></v-text-field> -->
          <v-text-field
            label="Select Image"
            @click="pickFile"
            v-model="imageName"
            prepend-icon="attach_file"
            required
            :rules="imageRules"
            readonly
          ></v-text-field>
          <input
            type="file"
            style="display: none"
            ref="image"
            accept="image/*"
            @change="onFilePicked"
          >

          <!-- <v-select
            v-model="select"
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            label="Item"
            required
          ></v-select>

          <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
          ></v-checkbox>-->
          <v-btn :disabled="!formValid" color="success" @click="validate">Validate</v-btn>

          <v-btn color="error" @click="reset">Reset Form</v-btn>

          <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang='ts' src='./GroupCreation.ts' />

<style scoped lang='scss'>
.cloth-zone {
  width: 150px;
  height: 150px;
  border: 1px solid black;
}

img {
  width: 100%;
  height: 100%;
}
</style>