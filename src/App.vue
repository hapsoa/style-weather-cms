<template>
  <v-app>
    <v-toolbar app flat v-if="$store.state.isLogin && !$store.state.isFullProgress">
      <v-toolbar-title
        @click="$router.push({name: 'main'})"
        class="cursor-pointer"
      >Style Weather CMS</v-toolbar-title>
      <div class="margin-20"></div>

      <v-flex d-flex align-center v-if="$store.state.isMainPage">
        <v-toolbar-items>
          <v-btn-toggle v-model="$store.state.groupOrItem" mandatory class="transparent" ma-2>
            <v-btn :value="'group'" flat>그룹</v-btn>
            <v-btn :value="'item'" flat>아이템</v-btn>
          </v-btn-toggle>
          <div class="margin-20"></div>
          <v-btn v-show="isGroupSelect" @click="createClothesGroup" color="primary">그룹 생성</v-btn>
          <v-btn v-show="!isGroupSelect" @click="createCloth" color="primary">아이템 생성</v-btn>
          <div class="margin-20"></div>
          <v-select
            v-show="!isGroupSelect"
            v-model="$store.state.majorSelect"
            :items="majorClassItems"
            @change="majorSelectChanged"
            label="대분류 카테고리"
            height="40"
          ></v-select>
          <div class="margin-20"></div>
          <v-select
            v-show="!isGroupSelect"
            v-model="$store.state.minorSelect"
            :items="minorClassItems"
            @change="minorSelectChanged"
            label="소분류 카테고리"
            height="40"
          ></v-select>
        </v-toolbar-items>
      </v-flex>
      <v-spacer></v-spacer>
      <v-btn flat @click="logout">로그아웃</v-btn>
    </v-toolbar>

    <v-content>
      <v-layout
        row
        justify-center
        align-center
        v-if="$store.state.isFullProgress"
        id="full-screen-progress"
      >
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-layout>
      <router-view v-if="!$store.state.isFullProgress"></router-view>
    </v-content>
  </v-app>
</template>

<script lang='ts' src='./App.ts' />

<style lang='scss'>
@import "./style/common.scss";

#full-screen-progress {
  height: 100vh;
}
.margin-20 {
  width: 20px;
}

.cursor-pointer {
  cursor: pointer;
}

// vuetify customizing
</style>

