<script setup lang="ts">
import {getReplies} from "@/utils/GetRepliesUtil";
import ReplyTo from "@/components/ReplyTo.vue";
import type {IComment} from "@/models/IComment";
import {ref} from "vue";
import {getDate} from "@/utils/DateUtil";

const date = ref<string>("");

const props = defineProps<{
  id: string,
  text: string,
  date: string,
  reply_to: string,
  replies: IComment[],
  adjacencyList: any,
  comments: IComment[]
}>();

date.value = getDate(props.date);

console.log(props.replies);
</script>

<template>
  <div class="border-amber-50 border-[1px] m-2 mb-4 p-2 rounded-lg">
    <div class="border-b-neutral-700 border-b-[1px]
                flex flex-row mb-2">
      <h1 class="mr-2">Date: </h1>
      <h1>{{ date }}</h1>
    </div>
    <p class="">{{ props.text }}</p>

    <div class="ml-8 mt-4">
      <ReplyTo v-for="item in props.replies"
               :replies="getReplies(item.id, props.adjacencyList, props.comments)"
               :adjacency-list="props.adjacencyList"
               :comments="props.comments"/>
    </div>
  </div>
</template>