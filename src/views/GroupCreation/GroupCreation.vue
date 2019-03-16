<template>
  <v-container fluid pa-0>
    <v-layout>
      <v-flex xs6 pa-3 class="clothes-zone">
        <v-item-group active-class="cloth-selected">
          <v-container fluid pa-0 grid-list-md>
            <v-layout row>
              <v-flex xs6 style="cursor:default"></v-flex>
              <v-flex>
                <v-item>
                  <v-card slot-scope="{ active, toggle }" @click="toggle" class="cloth-zone">q</v-card>
                </v-item>
              </v-flex>
              <v-flex text-xs-center>
                <v-item>
                  <div
                    slot-scope="{ active, toggle }"
                    @click="toggle(); selectCloth('hat')"
                    class="cloth-zone"
                  >
                    <div
                      class="cloth-guide-text"
                      v-if="!currentCloth || !clothesGroup.clothes.hat.imageUrl"
                    >hat</div>
                    <v-img
                      :src="clothesGroup.clothes.hat.imageUrl"
                      v-else
                      contain
                      style="height: 100%"
                    ></v-img>
                  </div>
                </v-item>
              </v-flex>
              <v-flex>
                <v-item>
                  <div
                    slot-scope="{ active, toggle }"
                    @click="toggle(); selectCloth('accessory');"
                    class="cloth-zone"
                  >accessory</div>
                </v-item>
              </v-flex>
              <v-flex xs6 style="cursor:default"></v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs6 style="cursor:default"></v-flex>
              <v-flex text-xs-center>
                <v-item>
                  <div
                    slot-scope="{ active, toggle }"
                    @click="toggle(); selectCloth('outer')"
                    class="cloth-zone"
                  >
                    <div
                      class="cloth-guide-text"
                      v-if="!currentCloth || !clothesGroup.clothes.outer.imageUrl"
                    >outer</div>
                    <v-img
                      :src="clothesGroup.clothes.outer.imageUrl"
                      v-else
                      contain
                      style="height: 100%"
                    ></v-img>
                  </div>
                </v-item>
              </v-flex>
              <v-flex text-xs-center>
                <v-item>
                  <div
                    slot-scope="{ active, toggle }"
                    @click="toggle(); selectCloth('top')"
                    class="cloth-zone"
                  >
                    <div
                      class="cloth-guide-text"
                      v-if="!currentCloth || !clothesGroup.clothes.top.imageUrl"
                    >top</div>
                    <v-img
                      :src="clothesGroup.clothes.top.imageUrl"
                      v-else
                      contain
                      style="height: 100%"
                    ></v-img>
                  </div>
                </v-item>
                <!-- <v-item>
                  <v-card slot-scope="{ active, toggle }" @click="toggle" class="cloth-zone">
                    <div class="cloth-guide-text" v-if="!imageUrl">상의</div>
                    <v-img :src="imageUrl" v-else contain style="height: 100%"></v-img>
                  </v-card>
                </v-item>-->
              </v-flex>
              <v-flex text-xs-center>
                <div class="cloth-zone">상의2</div>
              </v-flex>
              <v-flex xs6 style="cursor:default"></v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs6></v-flex>
              <v-flex>
                <div class="cloth-zone">q</div>
              </v-flex>
              <v-flex text-xs-center>
                <v-item>
                  <div
                    slot-scope="{ active, toggle }"
                    @click="toggle(); selectCloth('bottoms')"
                    class="cloth-zone"
                  >
                    <div
                      class="cloth-guide-text"
                      v-if="!currentCloth || !clothesGroup.clothes.bottoms.imageUrl"
                    >bottoms</div>
                    <v-img
                      :src="clothesGroup.clothes.bottoms.imageUrl"
                      v-else
                      contain
                      style="height: 100%"
                    ></v-img>
                  </div>
                </v-item>
              </v-flex>
              <v-flex>
                <div class="cloth-zone">q</div>
              </v-flex>
              <v-flex xs6 style="cursor:default"></v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs6 style="cursor:default"></v-flex>
              <v-flex>
                <div class="cloth-zone">q</div>
              </v-flex>
              <v-flex text-xs-center>
                <v-item>
                  <div
                    slot-scope="{ active, toggle }"
                    @click="toggle(); selectCloth('shoes')"
                    class="cloth-zone"
                  >
                    <div
                      class="cloth-guide-text"
                      v-if="!currentCloth || !clothesGroup.clothes.shoes.imageUrl"
                    >shoes</div>
                    <v-img
                      :src="clothesGroup.clothes.shoes.imageUrl"
                      v-else
                      contain
                      style="height: 100%"
                    ></v-img>
                  </div>
                </v-item>
              </v-flex>
              <v-flex>
                <div class="cloth-zone">q</div>
              </v-flex>
              <v-flex xs6 style="cursor:default"></v-flex>
            </v-layout>
          </v-container>
        </v-item-group>
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

          <v-text-field
            v-if="currentCloth"
            v-model="currentCloth.linkUrl"
            :rules="linkUrlRules"
            label="Link URL"
            required
          ></v-text-field>

          <v-text-field
            v-if="currentCloth"
            label="Select Image"
            @click="pickFile"
            v-model="currentCloth.imageName"
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
          <!-- <v-select 날려도 될거야
            v-if="currentCloth"
            @change="changeMajorSelect"
            :items="majorClassItems"
            label="대분류 카테고리"
            :rules="[v => !!v || 'Major class is required']"
            height="40"
          ></v-select>-->
          <v-select
            v-if="currentCloth"
            @change="changeMinorSelect"
            :items="minorClassItems"
            label="소분류 카테고리"
            :rules="[v => !!v || 'Minor class is required']"
            height="40"
          ></v-select>

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

<script lang='ts' src='./GroupCreation.ts' />

<style scoped lang='scss'>
.clothes-zone {
  width: 500px;
}

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