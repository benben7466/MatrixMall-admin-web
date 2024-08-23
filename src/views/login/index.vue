<script setup lang="ts">
import {type LocationQuery, useRoute} from "vue-router";

import defaultSettings from "@/settings";
import "@/styles/login.scss";
import AuthAPI, {type LoginData} from "@/api/auth";
import type {FormInstance} from "element-plus";
import router from "@/router";
import {useUserStore} from "@/store";

const loginData = ref<LoginData>({
  username: "admin",
  password: "123456",
  captchaKey: "",
  captchaCode: "",
});

const {t} = useI18n();//国际化
const isCapslock = ref(false);//是否开启大写
const loginFormRef = ref<FormInstance>();//表单ref
const loading = ref(false);//是否登陆中
const userStore = useUserStore();//用户存储
const route = useRoute();//路由
const captchaBase64 = ref();// 验证码图片Base64字符串
const icpVisible = ref(true);// 是否显示 ICP 备案

//检查输入大小写
function checkCapslock(event: KeyboardEvent) {
  if (event instanceof KeyboardEvent) {// 防止浏览器密码自动填充时报错
    isCapslock.value = event.getModifierState("CapsLock");
  }
}

//提交表单
function handleLoginSubmit() {
  loginFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      loading.value = true;
      userStore.login(loginData.value)
          .then(() => {
            const {path, queryParams} = parseRedirect();
            router.push({path: path, query: queryParams});
          })
          .catch(() => {
            getCaptcha();
          })
          .finally(() => {
            loading.value = false;
          });
    }
  });
}

//转换跳转Url
function parseRedirect(): {
  path: string;
  queryParams: Record<string, string>;
} {
  const query: LocationQuery = route.query;// 获取当前路由的查询参数
  const redirect = (query.redirect as string) ?? "/";// 尝试获取名为'redirect'的查询参数值，如果没有则默认设置为'/'

  const url = new URL(redirect, window.location.origin);// 根据重定向值和当前窗口的源创建一个 URL 对象
  const path = url.pathname;// 获取 URL 的路径部分
  const queryParams: Record<string, string> = {};// 创建一个空的对象用于存储查询参数

  url.searchParams.forEach((value, key) => {// 遍历 URL 的查询参数
    queryParams[key] = value;// 将每个查询参数添加到 queryParams 对象中
  });

  return {path, queryParams};// 返回包含路径和查询参数的对象
}

//获取验证码
function getCaptcha() {
  AuthAPI.getCaptcha().then((data) => {
    loginData.value.captchaKey = data.captchaKey;
    captchaBase64.value = data.captchaBase64;
  });
}

//登录规则
const loginRules = computed(() => {
  return {
    username: [
      {
        required: true,
        trigger: "blur",
        message: t("login.message.username.required"),
      },
    ],
    password: [
      {
        required: true,
        trigger: "blur",
        message: t("login.message.password.required"),
      },
      {
        min: 6,
        message: t("login.message.password.min"),
        trigger: "blur",
      },
    ],
    captchaCode: [
      {
        required: true,
        trigger: "blur",
        message: t("login.message.captchaCode.required"),
      },
    ],
  };
});

onMounted(() => {
  getCaptcha();
});
</script>

<template>
  <div class="login-container">
    <!--登录主体-->
    <el-card class="login-card">
      <div class="text-center relative">
        <h2>{{ defaultSettings.title }}</h2>
        <el-tag class="ml-2 absolute-rt">{{ defaultSettings.version }}</el-tag>
      </div>

      <el-form ref="loginFormRef" :model="loginData" :rules="loginRules">

        <!--用户名-->
        <el-form-item prop="username">
          <div class="input-wrapper">
            <i-ep-user class="mx-2"/>
            <el-input v-model="loginData.username" :placeholder="$t('login.username')" size="large" class="h-[48px]"/>
          </div>
        </el-form-item>

        <!--密码-->
        <el-tooltip :visible="isCapslock" :content="$t('login.capsLock')" placement="right">
          <el-form-item prop="password">
            <div class="input-wrapper">
              <i-ep-lock class="mx-2"/>
              <el-input type="password" v-model="loginData.password" :placeholder="$t('login.password')" @keyup="checkCapslock"
                        @keyup.enter="handleLoginSubmit" show-password size="large" class="h-[48px] pr-2"/>
            </div>
          </el-form-item>
        </el-tooltip>

        <!--验证码-->
        <el-form-item prop="captchaCode">
          <div class="input-wrapper">
            <svg-icon icon-class="captcha" class="mx-2"/>
            <el-input v-model="loginData.captchaCode" size="large" class="flex-1" :placeholder="$t('login.captchaCode')" @keyup.enter="handleLoginSubmit" auto-complete="off"/>
            <el-image @click="getCaptcha" :src="captchaBase64" class="captcha-image"/>
          </div>
        </el-form-item>

        <!--登录按钮-->
        <el-button :loading="loading" @click.prevent="handleLoginSubmit" type="primary" size="large" class="w-full">
          {{ $t("login.login") }}
        </el-button>

      </el-form>

    </el-card>

    <!-- ICP备案 -->
    <div class="icp-info" v-show="icpVisible">
      <p>
        Copyright © 2024 - 2025 <a :href="defaultSettings.authorUrl" target="_blank">benzhiqiang.tech</a> All Rights Reserved.
        {{ defaultSettings.authorName }} 版权所有
      </p>
      <p>京ICP备2024号-007</p>
    </div>

  </div>
</template>

<style scoped>
</style>