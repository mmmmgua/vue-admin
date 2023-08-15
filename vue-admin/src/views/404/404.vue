<template>
  <div class="error-container flex column flex-center items-center">
    <span class="title">404</span>
    <span>{{ $t('error.404') }}</span>
    <a-button class="button" type="primary" @click="goHome">{{ $t('error.go_home') }}</a-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goHome = () => {
  router.push('/home')
}
</script>

<style scoped>
.error-container {
  width: 100vw;
  height: 100vh;
}

.title {
  font-size: 48px;
}

.button {
  margin-top: 30px;
}
</style>
