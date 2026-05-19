<template>
  <div class="loginFrom-container flex flex-col items-center shadow-login rounded-2xl justify-center
     gap-6
  ">
    <!-- 标题 -->
    <div
      class="title text-4xl font-bold tracking-wide bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
      欢迎使用lite-notion
    </div>

    <!-- 表单 -->
    <div class="from flex flex-col items-center gap-2 w-80">
      <el-form class="w-full" ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules">
        <el-form-item class="h-12 w-full" prop="email">
          <el-input placeholder="请输入您的邮箱"
            class="h-12! w-full! rounded-lg! border-gray-200! hover:border-blue-400! transition-all" type="email"
            v-model="ruleForm.email" />
        </el-form-item>

        <el-form-item class="h-12 w-full" v-show="showKeyinput" prop="pass">
          <el-input placeholder="请输入密码"
            class="h-12! w-full! rounded-lg! border-gray-200! hover:border-blue-400! transition-all" type="password"
            v-model="ruleForm.pass" autocomplete="off" />
        </el-form-item>
        <el-form-item class="h-12 w-full" v-show="showCaptcha">
          <div class="captcha flex justify-between w-full">
            <el-input placeholder="请输入验证码" v-model="ruleForm.checkcode"
              class="h-12! w-56! rounded-lg! border-gray-200! hover:border-blue-400! transition-all" show-password />
            <el-button class="w-20 h-12!">获取验证码</el-button>
          </div>
        </el-form-item>
      </el-form>
      <el-button @click="submit"
        class="h-12! w-full rounded-lg text-lg font-medium bg-gradient-to-r from-blue-500 to-purple-500 border-none text-white!">
        {{ isRegister ? "注册" : "登录" }}
      </el-button>
      <div class="tip">
        <span>{{ isRegister ? "已有帐号？" : "还没有账号？" }}</span>
        <button
          class="border-none bg-transparent text-blue-500 hover:text-blue-600 transition-colors hover:underline hover:cursor-pointer  "
          @click="useLoginStore.switchState">点我{{ isRegister ? "登录" : "创建" }}</button>
      </div>

    </div>

    <!-- 其他登录方式 -->
    <div class="floor w-80! gap-4 flex flex-col ">
      <div class="split flex items-center justify-center gap-3 text-gray-400">
        <span class="split-line w-25 h-px split-line-left inline-block"></span>
        <span class="text-xs">其他登录方式</span>
        <span class="split-line w-25 h-px split-line-right inline-block"></span>
      </div>
      <div class="another-methods flex justify-center gap-4">
        <el-button @click="switchloginMethod">
          <show-icon :name="iconName" fill="black"></show-icon> <span class="ml-2">{{ usekeyLogin ? "验证码登录" :
            "密码登录" }}</span>
        </el-button>
        <div class="chartIcon flex items-center gap-2">
          <a href="javascript:;" class="sprite-icon sprite-1"></a>
          <a href="javascript:;" class="sprite-icon sprite-2"></a>
          <a href="javascript:;" class="sprite-icon sprite-3"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>

import { computed, reactive, Ref, ref, useTemplateRef } from 'vue';
import { loginStore } from '~/stores';
import type { FormInstance, FormRules } from 'element-plus';

const props = withDefaults(defineProps<{
  checkRule?: {
    email: {
      message?: Record<string, string>
      pattern?: RegExp

    },
    pass: {
      maxlength: number
      minlength: number
      pattern?: RegExp
      message?: Record<string, string>
    }
  }
}>(), {
  checkRule: () => {
    return {
      email: {
        length: 6,
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: {
          pattern: '邮箱格式不正确'
        }

      },
      pass: {
        minlength: 6,
        maxlength: 16,
        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/,
        message: {

          pattern: '密码必须包含字母和数字'
        }
      }
    }
  }
})


const useLoginStore = loginStore();
const usekeyLogin = ref<boolean>(true);

const ruleFormRef = useTemplateRef<FormInstance>("ruleFormRef");
const ruleForm = reactive({
  email: "",
  pass: "",
  checkcode: ""
});
const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: "blur" }],
  email: [{ validator: validateEmail, trigger: "blur" }]
})
function validatePass(rules: any, value: any, callback: any) {
  const pass = props.checkRule.pass;
  if (value === "") {
    callback(new Error("密码不能为空！"))
  }
  if (value.length <= pass.minlength) {
    callback(new Error(`密码长度不能小于${pass.minlength}`))
  }
  if (value.length <= pass.maxlength) {
    callback(new Error(`密码长度不能大于${pass.maxlength}`))
  }
  if (!pass.pattern?.test(value)) {
    callback(new Error(`${pass.message?.pattern}`))
  }
  callback();
}
function validateEmail(rules: any, value: any, callback: any) {
  const email = props.checkRule.email;
  if (value === "") {
    callback(new Error("邮箱不能为空！"))
  }

  if (!email.pattern?.test(value)) {
    callback(new Error(`${email.message?.pattern}`))
  }
  callback();
}
import { request } from '~/utils/request';
async function submit() {
  const formEl = ruleFormRef.value
  let res = await request.post("/login", {
    body: {
      email: 12312,
      password: 1232132
    }
  })
  console.log(res)
  // formEl?.validate( (valid)=>{
  //   console.log(valid)
  //   if(valid){

  //     formEl.resetFields()
  //   }
  // })
}

const isRegister = computed(() => {
  return useLoginStore.state === "register"
})

const showCaptcha = computed(() => {
  return isRegister.value || !usekeyLogin.value
})
const showKeyinput = computed(() => {
  return isRegister.value || usekeyLogin.value
})
const iconName = computed(() => {
  return usekeyLogin.value ? "key" : "yanzhengma"
})
function switchloginMethod() {
  usekeyLogin.value = !usekeyLogin.value;
}




</script>

<style scoped></style>