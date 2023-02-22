<script setup lang="ts">
import router from '../../config/router'
import { useAuthStore } from '../../store/auth'

const authStore = useAuthStore()
if (authStore.userInfo)
    router.push('/')
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2 mt-5">
                <router-view />
            </div>
        </div>
    </div>
</template>