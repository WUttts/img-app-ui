<template>
  <n-space vertical :size="20" align="center" class="mt-10">
    <div><span>Search By Tags</span></div>
    <div class="w-100">
      <n-input-group>
        <n-input v-model:value="imageTagRef" placeholder="eg:car,person,..." />
        <n-button type="primary" ghost @click="search(1)"> Search </n-button>
      </n-input-group>
    </div>
    <div><span>OR Search By Url</span></div>
    <div class="w-100">
      <n-input-group>
        <n-input
          v-model:value="imageUrlRef"
          placeholder="eg:https://bucket.s3.amazonaws.com/example.jpg"
        />
        <n-button type="primary" ghost @click="search(2)"> Search </n-button>
      </n-input-group>
    </div>
    <div><span>OR Search By Image</span></div>
    <div>
      <n-upload
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
          <img :src="item.url" />
        </template>
      </n-card>
    </div>
  </n-space>
</template>

<script setup lang="ts">
import street from "~/assets/street.jpg";
import {
  NUpload,
  NInputGroup,
  NInput,
  NButton,
  NSpace,
  NCard,
  UploadCustomRequestOptions,
  UploadFileInfo,
} from "naive-ui";
import { ref } from "vue";
import request from "axios";

interface Model {
  tags?: string[];
  url?: string | null;
}

const choseFile = ref<File>();

const imageTagRef = ref<string>("");
const imageUrlRef = ref<string>("");
const list = ref([{ url: street }]);

const search = (type: number) => {
  const data: Model = {};
  if (type === 1) {
    data.tags = imageTagRef.value.split(",");
    data.url = null;
  }
  if (type === 2) {
    data.tags = [];
    data.url = imageUrlRef.value;
  }
  request.post("api/search", data).then((res) => {
    console.log(res);
  });
};

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
