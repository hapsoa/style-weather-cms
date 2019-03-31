<template>
  <v-container fluid pa-0>
    <v-layout>
      <v-flex xs6 pa-3 pl-5>
        <div class="clothes-zone">
          <v-img v-if="clothesGroup" :src="clothesGroup.imageUrl"></v-img>
        </div>
      </v-flex>

      <v-flex xs6 pa-3>
        <v-container fluid pa-0>
          <v-data-table
            :items="clothesGroupTableData"
            class="elevation-1"
            hide-actions
            hide-headers
          >
            <template v-slot:items="props">
              <td>{{ props.item.name }}</td>
              <td class="text-xs-right">{{ props.item.content }}</td>
            </template>
          </v-data-table>
          <!-- <v-layout v-if="clothesGroup" class="cloth-list" row wrap mt-3 pa-3>
            <v-flex v-for="(cloth, i) in clothesGroup.clothes" :key="i" ma-1>
              <v-img
                v-if="cloth"
                :src="cloth.imageUrl"
                @click="goClothDetail(cloth.id)"
                class="cloth-item"
                width="130"
                height="130"
                contain
              ></v-img>
            </v-flex>
          </v-layout>-->
          <ClothList ref="clothList" :clothesGroup="clothesGroup"></ClothList>
          <v-layout justify-end>
            <v-btn>수정</v-btn>
            <v-btn>삭제</v-btn>
            <v-btn>돌아가기</v-btn>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script src='./ClothesGroupDetail.ts' lang='ts' />

<style scoped lang='scss'>
.cloth-list {
  width: 100%;
  max-height: 500px;
  border: 1px solid #aaa;
  margin-top: 16px;
  overflow: scroll;
}
.cloth-item {
  cursor: pointer;
  border: 1px solid #aaa;
}
</style>