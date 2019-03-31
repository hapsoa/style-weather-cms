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

          <v-flex v-if="currentCloth" d-flex class="checkboxes" px-3>
            <v-checkbox
              v-model="currentCloth.gender"
              label="성별"
              value="성별"
              :rules="genderRule"
              disabled
              off-icon="accessibility"
            ></v-checkbox>
            <v-checkbox v-model="currentCloth.gender" label="남성" value="남성"></v-checkbox>
            <v-checkbox v-model="currentCloth.gender" label="여성" value="여성"></v-checkbox>
            <v-checkbox v-model="currentCloth.gender" label="공용" value="공용"></v-checkbox>
            <v-flex></v-flex>
          </v-flex>

          <!-- <v-select 대표예시
            v-model="select"
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            label="Item"
            required
          ></v-select>-->

          <!-- <v-select
            v-model="weatherSelect"
            :items="weatherItems"
            :rules="[v => !!v || 'Weather is required']"
            label="날씨"
            required
          ></v-select>
          <v-select
            v-model="temperatureSelect"
            :items="temperatureItems"
            :rules="[v => !!v || 'Temperature is required']"
            label="온도"
            required
          ></v-select>

          <v-flex d-flex class="checkboxes" px-3>
            <v-checkbox
              v-model="thicknessSelected"
              label="두께감"
              value="두께감"
              :rules="thicknessRule"
              disabled
              off-icon="accessibility"
            ></v-checkbox>
            <v-checkbox v-model="thicknessSelected" label="두꺼움" value="두꺼움"></v-checkbox>
            <v-checkbox v-model="thicknessSelected" label="적당함" value="적당함"></v-checkbox>
            <v-checkbox v-model="thicknessSelected" label="얇음" value="얇음"></v-checkbox>
            <v-flex></v-flex>
          </v-flex>

          <v-select
            v-model="colorSelect"
            :items="colorItems"
            :rules="[v => !!v || 'Color is required']"
            label="색상"
            required
          ></v-select>-->
          <v-btn :disabled="!formValid" color="success" @click="validate">Validate</v-btn>
          <v-btn color="error" @click="reset">Reset Form</v-btn>
          <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>
        </v-form>

        <LoadClothDialog ref="loadClothDialog"></LoadClothDialog>
        <ClothList :clothesGroup="clothesGroup"></ClothList>
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
</style>