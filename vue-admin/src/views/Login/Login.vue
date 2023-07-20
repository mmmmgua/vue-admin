<template>
  <div class="login-container">
    <span class="title">{{ $t('login.login') }}</span>
    <div class="card">
      <div class="flex column justify-center">
        <a-form
          ref="form"
          :model="formData"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          labelAlign="left"
        >
          <a-form-item name="username" :label="$t('login.account')">
            <a-input v-model:value="formData.username" :maxlength="8">
              <template #prefix>
                <user-outlined />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="password" :label="$t('login.password')">
            <a-input v-model:value="formData.password" type="password" :maxlength="10">
              <template #prefix>
                <lock-outlined />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="code" :label="$t('login.code')">
            <a-input v-model:value="formData.code">
              <template #suffix>
                <div class="verify-code"></div>
              </template>
            </a-input>
          </a-form-item>
        </a-form>
        <a-button class="submit-btn" type="primary" @click="submit" :loading="submitLoading">{{
          $t('login.login')
        }}</a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, reactive, ref } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { validateAccount, validatePwd } from '@/utils/utils'
import { useUserStore } from '../../stores/user'

const t = inject('t')

const labelCol = { span: 6 }
const wrapperCol = { span: 18 }
const form = ref()
const submitLoading = ref(false)
const validateUsername = () => {
  return new Promise((resolve, reject) => {
    if (!validateAccount(formData.username)) {
      reject(t('login.account_format_err'))
    }
    resolve()
  })
}
const validatePassword = () => {
  return new Promise((resolve, reject) => {
    if (!validatePwd(formData.password)) {
      reject(t('login.pwd_format_err'))
    }
    resolve()
  })
}
const rules = {
  username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
  code: [{ required: true, message: t('login.code_empty'), trigger: 'blur' }]
}
const formData = reactive({
  username: '',
  password: '',
  code: ''
})

const submit = () => {
  form.value
    .validate()
    .then(async (data) => {
      submitLoading.value = true
      await useUserStore().login(data)
      submitLoading.value = false
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title {
    font-size: 28px;
    padding-bottom: 20px;
    margin-top: -100px;
    font-weight: bold;
  }
  .card {
    width: 400px;
    padding: 30px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 10px 20px 20px 10px rgba(0, 0, 0, 0.18);
  }
  .verify-code {
    width: 70px;
    height: 100%;
    background: gray;
  }
  .submit-btn {
    width: 50%;
    height: 40px;
    align-self: center;
    margin-top: 10px;
    border-radius: 16px;
  }
}
@media (prefers-color-scheme: dark) {
  :deep(.ant-form-item-label > label) {
    color: var(--vt-c-text-dark-2);
  }
  .card {
    background: #313236 !important;
  }
}
</style>
