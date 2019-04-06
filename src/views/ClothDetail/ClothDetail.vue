<template>
  <v-container fluid pa-0>
    <v-layout>
      <v-flex xs6 pa-3 pl-5>
        <div class="clothes-zone" style>
          <v-img v-if="cloth" :src="cloth.imageUrl"></v-img>
        </div>
      </v-flex>

      <v-flex xs6 pa-3>
        <v-container fluid pa-0>
          <v-data-table :items="clothTableData" class="elevation-1" hide-actions hide-headers>
            <template v-slot:items="props">
              <td>{{ props.item.name }}</td>
              <td class="text-xs-right">{{ props.item.content }}</td>
            </template>
          </v-data-table>
          <v-layout justify-end>
            <v-btn>수정</v-btn>
            <v-btn @click="deleteCloth">삭제</v-btn>
            <v-btn>돌아가기</v-btn>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script src='./ClothDetail.ts' lang='ts' />

<style scoped lang='scss'>
</style>