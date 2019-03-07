<template>
  <v-app>
    <v-toolbar app v-if="$store.state.user"></v-toolbar>

    <v-content>
      <!-- <v-layout row justify-center align-center id="full-screen-progress">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-layout>-->
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang='ts' src='./App.ts' />

<style lang='scss'>
#full-screen-progress {
  height: 100vh;
}
</style>

