<template>
  <div class="login-container">
    <span class="title">{{ $t('login.login') }}</span>
    <div class="card">
      <div class="flex column justify-center">
        <a-form ref="form" :model="formData" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol"
          labelAlign="left">
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
                <div v-loading="captchaLoading" @click="getCaptchaImage">
                  <a-image style="cursor: pointer;" :width="70" :preview="false" :src="captchaBase64" />
                </div>
              </template>
            </a-input>
          </a-form-item>
        </a-form>
        <a-button class="submit-btn" type="primary" @click="submit" :loading="submitLoading">
          {{ $t('login.login') }}
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { VueI18nTranslation } from 'vue-i18n'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { validateAccount, validatePwd } from '@/utils/utils'
import { useUserStore } from '@/stores/user'
import { MessageApi } from 'ant-design-vue/es/message'
import { getCaptcha } from '@/api/login/login'

const t = inject<VueI18nTranslation>('t') as VueI18nTranslation
const message = inject<MessageApi>('message') as MessageApi
const router = useRouter()

const labelCol = { span: 6 }
const wrapperCol = { span: 18 }
const form = ref()
const submitLoading = ref(false)
const validateUsername = () => {
  return new Promise((resolve, reject) => {
    if (!validateAccount(formData.username)) {
      reject(t('login.account_format_err'))
    }
    resolve(null)
  })
}
const validatePassword = () => {
  return new Promise((resolve, reject) => {
    if (!validatePwd(formData.password)) {
      reject(t('login.pwd_format_err'))
    }
    resolve(null)
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
const captchaBase64 = ref<string>()
const captchaKey = ref<string>('')
const captchaLoading = ref<boolean>(false)

onMounted(() => {
  getCaptchaImage()
})

async function getCaptchaImage() {
  try {
    captchaLoading.value = true
    const { data } = await getCaptcha()
    if (data.code === 0) {
      captchaBase64.value = data.data.captchaImageBase64Data
      captchaKey.value = data.data.captchaKey
    } else {
      message.warn(data.msg)
    }
    captchaLoading.value = false
  } catch (error) {
    captchaLoading.value = false
    message.error(t('error.server_error'))
  }
}
function submit() {
  form.value
    .validate()
    .then(async (data: any) => {
      submitLoading.value = true
      await useUserStore().login(data)
      setTimeout(() => {
        submitLoading.value = false
        router.push({ path: '/' })
      }, 2000)
    })
    .catch(() => {
      submitLoading.value = false
      message.error(t('error.server_error'))
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
