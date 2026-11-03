<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { SigninState } from '@/auth/oidc'
import { userManager } from '@/auth/oidc'

const router = useRouter()
const error = ref<string | null>(null)

// Not a top-level `await`: that would make this an async component and force
// the app to wrap RouterView in <Suspense>.
onMounted(async () => {
  try {
    const user = await userManager.signinRedirectCallback()
    const state = user.state as SigninState | undefined
    // `replace`, so the code-bearing callback URL leaves the history stack.
    await router.replace(state?.returnTo ?? { name: 'tasks' })
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e)
  }
})
</script>

<template>
  <div v-if="error" class="alert alert-danger" role="alert">
    <i class="bi bi-exclamation-octagon me-1"></i>Sign-in failed: {{ error }}
  </div>

  <div v-else class="text-center py-5">
    <div class="spinner-border text-secondary" role="status">
      <span class="visually-hidden">Completing sign-in…</span>
    </div>
  </div>
</template>
