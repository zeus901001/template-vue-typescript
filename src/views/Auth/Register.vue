<script setup lang="ts">
import Axios from 'axios'
import * as Yup from 'yup'
import router from '../../config/router'
import { Form, Field } from 'vee-validate'
import { useAuthStore } from '../../store/auth'
import { API_URI } from '../../config'
import { toast } from 'vue3-toastify'

const authStore = useAuthStore()

const schema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string().required('Confirm Password is required'),
    lastName: Yup.string().required('Last Name is required'),
    firstName: Yup.string().required('First Name is required'),
})

const onSubmit = (credentials: any) => {
    if (!window.confirm(`Are you sure to register ?`))
        return

    Axios.post(`${API_URI}/auth/register`, credentials).then(res => {
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
        <h5 class="card-header">Register your credentials.</h5>
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
                    <label>Confirm Password</label>
                    <Field name="confirmPassword" type="password" class="form-control"
                        :class="{ 'is-invalid': errors.confirmPassword }" />
                    <div class="invalid-feedback">{{ errors.confirmPassword }}</div>
                </div>
                <div class="form-group">
                    <label>First Name</label>
                    <Field name="firstName" type="text" class="form-control"
                        :class="{ 'is-invalid': errors.firstName }" />
                    <div class="invalid-feedback">{{ errors.firstName }}</div>
                </div>
                <div class="form-group">
                    <label>Last Name</label>
                    <Field name="lastName" type="text" class="form-control"
                        :class="{ 'is-invalid': errors.lastName }" />
                    <div class="invalid-feedback">{{ errors.lastName }}</div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary" :disabled="isSubmitting">
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                        Register
                    </button>
                    <router-link to="login" class="btn btn-link ml-2">Cancel</router-link>
                </div>
            </Form>
        </div>
    </div>
</template>