<template>
  <n-space vertical :size="20" align="center" class="mt-10">
    <div class="w-100">
      <n-input-group>
        <n-input :style="{ width: '70%' }" />
        <n-button type="primary" ghost> Search </n-button>
      </n-input-group>
    </div>
    <div><span>OR Search By Image</span></div>
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
    <n-button type="primary" @click="upload" ghost> Search </n-button>
    <div class="w-40">
      <span>Result:</span>
      <n-card v-for="item in list" :key="item.url">
        <template #cover>
          <img src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
        </template>
      </n-card>
    </div>
  </n-space>
</template>

<script setup lang="ts">
import {
  NUpload,
  NInputGroup,
  NInput,
  NButton,
  NSpace,
  NCard,
  UploadCustomRequestOptions,
} from "naive-ui";
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

const list = ref([{ url: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" }]);

const beforeUpload = async (data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
  if (data.file.file?.type === "image/png" || data.file.file?.type === "image/jpeg") {
    return true;
  }
  alert("PNG、JPG、JPGE can only be uploaded");
  return false;
};
</script>

<style scoped></style>
