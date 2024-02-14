<script setup lang="ts">
import axios from "axios";
import {ref} from "vue";
import router from "@/router";
import Comment from "@/components/Comment.vue";
import type {IResponse} from "@/models/IResponse";
import type {IComment} from "@/models/IComment";
import {getReplies} from "@/utils/GetRepliesUtil";

const commentResponse = ref<IResponse>();
const areCommentsLoaded = ref<boolean>(false);
const comments = ref<IComment[]>([]);

var commentAdjacencyList: number[][] = [];
var initialComments: IComment[] = [];

const getCommentsOfId = (id_param: number) => {
   for (let iterator of comments.value) {
     if (iterator.id == id_param) {
       return iterator;
     }
   }

   return null;
}

const preprocessComments = (comments: IComment[], numberOfComments: number) => {
  // console.log(comments);
  // console.log(numberOfComments);

  for (let i=0; i<=numberOfComments; i++) {
    commentAdjacencyList.push([]);
  }

  for (var item of comments) {
    commentAdjacencyList[item.reply_to].push(item.id);
  }

  for (let iterator of commentAdjacencyList[0]) {
    initialComments.push(getCommentsOfId(iterator));
  }

  console.log(commentAdjacencyList);
  areCommentsLoaded.value = true;
}

const fetchComment = async () => {
  try {
    let response = await axios.get("http://178.62.33.226/interview/comments");

    if (response.status === 200) {
      commentResponse.value = response.data;
      comments.value = commentResponse.value.comments;
      preprocessComments(comments.value, commentResponse.value?.comment_count);
    } else {
      // TODO: make not found work
      // router.push({name: NotFound});
    }
  } catch (error: any) {
    console.log(error.message);
  }
}

fetchComment();
</script>

<template>
  <h1 class="text-lg">Comments</h1>

  <div v-if="areCommentsLoaded">
    <Comment v-for="item in initialComments"
        :date=item.date
        :reply_to=item.reply_to
        :id=item.reply_to
        :text=item.text
        :replies="getReplies(item.id, commentAdjacencyList, comments)"
        :adjacency-list="commentAdjacencyList"
        :comments="comments"
    />
  </div>
</template>