<script setup lang="ts">
import type {IComment} from "@/models/IComment";
import {getReplies} from "@/utils/GetRepliesUtil";

const props = defineProps<{
  replies: IComment[],
  adjacencyList: any,
  comments: IComment[]
}>()
</script>

<template>
  <div v-for="item in props.replies">
    <div class="border-b-neutral-700 border-b-[1px]
                flex flex-row mb-2">
      <h1 class="mr-2">Date: </h1>
      <h1>{{ item.date }}</h1>
    </div>
    <p class="">{{ item.text }}</p>
  </div>
  <div class="ml-8 mt-4">
    <ReplyTo v-for="item in props.replies"
             :replies = "getReplies(item.id, props.adjacencyList, props.comments)" />
  </div>
</template>