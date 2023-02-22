<script setup lang="ts">
import Axios from 'axios'
import * as Yup from 'yup'
import { Form, Field } from 'vee-validate'
import { toast } from 'vue3-toastify'
import { API_URI } from '../../config'
import { useAuthStore } from '../../store/auth'
import router from '../../config/router'

const authStore = useAuthStore()

const schema = Yup.object().shape({
    email: Yup.string().required('Email is required.'),
    password: Yup.string().required('Password is required.')
})

const onSubmit = (credentials: any) => {
    Axios.post(`${API_URI}/auth/login`, credentials).then(res => {
        if (res.data.success) {
            toast.success(res.data.message)
            authStore.setUserInfo(res.data.accessToken, res.data.refreshToken)
            router.push('/')
        }
        else {
            toast.warn(res.data.message)
        }
    }).catch(err => {
        console.log(err)
    })
}
</script>

<template>
    <div class="card m-3">
        <h5 class="card-header">Login your credentials.</h5>
        <div class="card-body">
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                <div class="form-group">
                    <label>Email</label>
                    <Field name="email" type="text" class="form-control" :class="{ 'is-invalid': errors.email }" />
                    <div class="invalid-feedback">{{ errors.email }}</div>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <Field name="password" type="password" class="form-control"
                        :class="{ 'is-invalid': errors.password }" />
                    <div class="invalid-feedback">{{ errors.password }}</div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary" :disabled="isSubmitting">
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1" /> Login
                    </button>
                    <router-link to="register" class="btn btn-link ml-2">Register</router-link>
                </div>
            </Form>
        </div>
    </div>
</template>