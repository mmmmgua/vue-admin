<template>
  <div class="login-container">
    <span class="title">{{ $t('login.login') }}</span>
    <div class="card">
      <div class="flex column justify-center">
        <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item :label="$t('login.account')">
            <a-input>
              <template #prefix>
                <user-outlined />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item :label="$t('login.password')">
            <a-input>
              <template #prefix>
                <lock-outlined />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item :label="$t('login.code')">
            <a-input>
              <template #suffix>
                <div class="verify-code"></div>
              </template>
            </a-input>
          </a-form-item>
        </a-form>
        <a-button class="submit-btn" type="primary">{{ $t('login.login') }}</a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'

const labelCol = { span: 4 }
const wrapperCol = { span: 20 }
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
