<template>
  <v-container fluid pa-0>
    <v-layout>
      <v-flex xs6 pa-3 pl-5>
        <div class="clothes-zone">
          <ClothesCanvas ref="clothesCanvas"></ClothesCanvas>
        </div>
      </v-flex>

      <v-flex xs6 pa-3>
        <v-form ref="form" v-model="formValid" lazy-validation>
          <v-text-field
            v-model="clothesGroup.name"
            :counter="20"
            :rules="groupNameRules"
            label="그룹 제목"
            required
          ></v-text-field>

          <v-select
            v-model="clothesGroup.weather"
            :items="weatherItems"
            :rules="[v => !!v || 'Weather is required']"
            label="날씨"
            required
          ></v-select>
          <v-select
            v-model="clothesGroup.gender"
            :items="genderItems"
            :rules="genderRules"
            attach
            chips
            label="gender"
            multiple
          ></v-select>
          <v-select
            v-model="clothesGroup.temperature"
            :items="temperatureItems"
            :rules="[v => !!v || 'Temperature is required']"
            label="온도"
            required
          ></v-select>
          <v-select
            v-model="clothesGroup.thickness"
            :items="thicknessItems"
            :rules="thicknessRule"
            attach
            chips
            label="thickness"
            multiple
          ></v-select>
          <v-layout class="hashtags-zone">
            <v-flex xs12 style="border: 1px solid #aaa; min-height: 40px;">
              <v-chip
                v-for="(hashtag, i) in clothesGroup.hashtags"
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

          <v-btn :disabled="!formValid" color="success" @click="validate">Validate</v-btn>
          <v-btn color="error" @click="reset">Reset Form</v-btn>
          <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>
        </v-form>

        <LoadClothDialog
          ref="loadClothDialog"
          :clothesGroup="clothesGroup"
          @confirm="confirmLoadCloth"
        ></LoadClothDialog>
        <ClothList :clothList="clothesGroup.clothes" ref="clothList" :canHoverHighlight="true"></ClothList>
        <div style="height: 400px"></div>
        <v-layout row justify-end>
          <v-btn :disabled="!canSave" @click="saveClothesGroup">저장</v-btn>
          <v-btn>초기화</v-btn>
          <v-btn>취소</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang='ts' src='./ClothesGroupCreation.ts' />

<style scoped lang='scss'>
.cloth-zone {
  width: 150px;
  height: 150px;
  border: 1px solid #aaa;
  line-height: 150px;
  &[selected] {
    border: 3px solid skyblue;
  }
}
.cloth-selected {
  border: 3px solid skyblue;
}

.checkboxes {
  border-bottom: 1px solid #aaa;
}

.selected-image {
  width: calc(150px - 6px);
  height: calc(150px - 6px);
}

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