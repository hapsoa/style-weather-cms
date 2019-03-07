<template>
  <v-container pa-0>
    <!-- <v-layout row align-center justify-center id="full-screen">
      <v-flex xs12 class="text-xs-center">
        <div>Style Weather CMS</div>
        <v-btn>Google Login</v-btn>
      </v-flex>
    </v-layout>-->
    <v-layout column align-center id="full-screen">
      <v-flex xs4></v-flex>
      <v-flex xs2 class="display-3">Style Weather CMS</v-flex>
      <v-flex xs2>
        <v-btn color="primary">Google Login</v-btn>
      </v-flex>
      <v-flex xs4></v-flex>
    </v-layout>
  </v-container>
</template>

<script lang='ts' src='./Login.ts' />

<style scoped lang='scss'>
#full-screen {
  height: 100vh;
}
</style>