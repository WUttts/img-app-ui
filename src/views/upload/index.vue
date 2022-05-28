<template>
  <n-space vertical :size="20" align="center" class="mt-10">
    <span>Select a Image</span>
    <div>
      <n-upload
        method="post"
        list-type="image-card"
        :max="1"
        :custom-request="processFile"
        @before-upload="beforeUpload"
      >
      </n-upload>
    </div>
    <n-button type="primary" @click="upload" ghost> Upload </n-button>
  </n-space>
</template>

<script setup lang="ts">
import { NUpload, NSpace, UploadCustomRequestOptions } from "naive-ui";
import type { UploadFileInfo } from "naive-ui";
import { ref } from "vue";
import request from "axios";

const choseFile = ref<File>();

const processFile = ({ file }: UploadCustomRequestOptions) => {
  choseFile.value = file.file as File;
};

const upload = () => {
  const formData = new FormData();
  formData.append("file", choseFile.value as File);
  request.post("api/upload", formData).then((res) => {
    alert(res);
  });
};

const beforeUpload = async (data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
  if (data.file.file?.type === "image/png" || data.file.file?.type === "image/jpeg") {
    return true;
  }
  alert("PNG、JPG、JPGE can only be uploaded");
  return false;
};
</script>

<style scoped></style>
