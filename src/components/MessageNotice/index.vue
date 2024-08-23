<script setup lang="ts">
import {MessageTypeEnum, MessageTypeLabels} from "@/enums/MessageTypeEnum";
import MessageAPI, {type MessageInfo} from "@/api/message";

const activeTab = ref(MessageTypeEnum.MESSAGE);
const messages = ref([]);

const getFilteredMessages = (type: MessageTypeEnum) => {
  return messages.value.filter((message) => message.type === type);
};

onMounted(() => {
  //加载数据
  initMessages().then((data) => {
    messages.value = data;
  });

});

function initMessages() {
  return new Promise<MessageInfo[]>((resolve, reject) => {
    MessageAPI.getMessages()
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
  });
}
</script>

<template>
  <el-dropdown class="message" trigger="click">
    <el-badge is-dot>
      <div class="flex-center h100% p10px">
        <i-ep-bell/>
      </div>
    </el-badge>
    <template #dropdown>
      <div class="px-5 py-2">
        <el-tabs v-model="activeTab">
          <el-tab-pane
              v-for="(label, key) in MessageTypeLabels"
              :label="label"
              :name="key"
              :key="key"
          >
            <div
                class="w-[380px] py-2"
                v-for="message in getFilteredMessages(key)"
                :key="message.id"
            >
              <el-link type="primary">
                <el-text class="w-350px" size="default" truncated>
                  {{ message.title }}
                </el-text>
              </el-link>
            </div>
          </el-tab-pane>
        </el-tabs>

        <el-divider/>
        <div class="flex-x-between">
          <el-link type="primary" :underline="false">
            <span class="text-xs">查看更多</span>
            <el-icon class="text-xs">
              <ArrowRight/>
            </el-icon>
          </el-link>
          <el-link type="primary" :underline="false">
            <span class="text-xs">全部已读</span>
          </el-link>
        </div>
      </div>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss">

</style>