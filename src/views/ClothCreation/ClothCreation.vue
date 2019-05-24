<template>
  <v-container fluid pa-0>
    <v-layout>
      <v-flex xs6 pa-3 pl-5>
        <div class="clothes-zone" style>
          <v-img v-if="cloth.data.imageUrl" :src="cloth.data.imageUrl"></v-img>
        </div>
      </v-flex>

      <v-flex xs6 pa-3>
        <v-form ref="form" v-model="formValid" lazy-validation>
          <v-text-field
            v-model="cloth.data.name"
            :counter="50"
            :rules="clothNameRules"
            label="의상 이름"
            required
          ></v-text-field>

          <v-text-field
            label="Select Image"
            @click="pickFile"
            v-model="cloth.imageName"
            prepend-icon="attach_file"
            required
            :rules="imageRules"
            readonly
          ></v-text-field>
          <input
            type="file"
            style="display: none"
            ref="imageInput"
            accept="image/*"
            @change="onFilePicked"
          >

          <v-select
            v-model="majorSelect"
            :items="majorClassItems"
            label="대분류 카테고리"
            :rules="[v => !!v || 'MajorClass is required']"
            height="40"
          ></v-select>
          <v-select
            v-model="cloth.data.minorClass"
            :items="minorSelect"
            label="소분류 카테고리"
            :rules="[v => !!v || 'MinorClass is required']"
            height="40"
          ></v-select>
          <v-text-field
            v-model="cloth.data.linkUrl"
            :rules="linkUrlRules"
            label="link URL"
            required
          ></v-text-field>
          <!-- 가격 -->
          <v-text-field v-model="cloth.data.price" :rules="priceRules" label="price" required></v-text-field>
          <v-select
            v-model="cloth.data.gender"
            :items="genderItems"
            :rules="genderRules"
            label="gender"
            required
            attach
            chips
            multiple
          ></v-select>
          <v-select
            v-model="cloth.data.weather"
            :items="weatherItems"
            :rules="weatherRules"
            label="날씨"
            required
            attach
            chips
            multiple
          ></v-select>
          <v-select
            v-model="cloth.data.temperature"
            :items="temperatureItems"
            :rules="[v => v.length !== 0 || 'Temperature is required']"
            label="온도"
            required
            attach
            chips
            multiple
          ></v-select>
          <v-select
            v-model="cloth.data.thickness"
            :items="thicknessItems"
            :rules="thicknessRule"
            label="thickness"
            required
          ></v-select>
          <v-select
            v-model="cloth.data.color"
            :items="colorItems"
            :rules="[v => !!v || 'Color is required']"
            label="색상"
            required
          ></v-select>
        </v-form>
        <v-layout class="hashtags-zone">
          <v-flex xs12 style="border: 1px solid #aaa; min-height: 40px;">
            <v-chip
              v-for="(hashtag, i) in cloth.data.hashtags"
              :key="i"
              color="blue"
              text-color="white"
            >
              {{hashtag}}
              <div class="v-chip__close">
                <v-icon @click="deleteHashtag(i)" aria-hidden="true" small>close</v-icon>
              </div>
            </v-chip>
          </v-flex>
        </v-layout>
        <input
          @keyup.enter="addHashtag"
          v-model="addingHashtag"
          class="hashtag-input"
          type="text"
          placeholder="hashtags"
        >
        <v-layout>
          <v-btn :disabled="!formValid" color="success" @click="validate">Validate</v-btn>
          <v-btn color="error" @click="reset">Reset Form</v-btn>
          <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>
        </v-layout>
        <v-layout row justify-end>
          <v-btn :disabled="!cloth.canSave" @click="saveCloth">저장</v-btn>
          <v-btn>초기화</v-btn>
          <v-btn>취소</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script src='./ClothCreation.ts' lang='ts' />

<style scoped lang='scss'>
.hashtags-zone {
  width: 100%;
  max-height: 300px;
}

input.hashtag-input {
  width: 100%;
  outline: none;
  border-left: 1px solid #aaa;
  border-right: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
  padding: 5px;
}
</style>