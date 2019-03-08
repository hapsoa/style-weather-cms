<template>
  <v-container fluid pa-0>
    <v-layout>
      <v-flex xs6 pa-3>
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
            <div class="cloth-zone">상의</div>
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
      </v-flex>

      <v-flex xs6 pa-3>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>

          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

          <v-select
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
          ></v-checkbox>

          <v-btn :disabled="!valid" color="success" @click="validate">Validate</v-btn>

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
  width: 100%;
  height: 150px;
  border: 1px solid black;
}
</style>