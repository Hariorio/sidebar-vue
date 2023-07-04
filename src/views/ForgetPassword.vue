<template>
  <v-app id="inspire" class="outer" style="background-position: center;
    background-repeat: no-repeat;
    background-size: cover;">
    <v-main>
      <v-container class="fill-height pl-lg-5 pr-lg-5" style="max-width: 74em;">
        <v-row align="center" justify="center">
          <v-col cols="12" xs="12" sm="6" md="6" class="col-12" >
            <v-card class="elevation-12 rounded-xl p-3" v-if="display">
                <v-progress-linear
                    :active="loading"
                    :indeterminate="loading"
                    absolute
                    bottom
                    color="blue accent-4"
                ></v-progress-linear>
                <v-card-title>
                  <router-link to="/">
                    <v-icon>
                      mdi-arrow-left
                    </v-icon>
                  </router-link>
                  <h5 class="pt-2 pl-5">Forget Password</h5>
                </v-card-title>
                <v-card-text>
                  <validation-observer
                      ref="observer"
                      v-slot="{ invalid }"
                  >
                      <form @submit.prevent="sendEmail">
                          <v-card-text>
                              <h6 class="blue-lcd">Username</h6>

                              <validation-provider
                                v-slot="{ errors }"
                                name="username"
                                rules="required"
                              >
                                  <v-text-field
                                  solo
                                  v-model="email"
                                  :error-messages="errors"
                                  label="Username"
                                  append-icon="mdi-email"
                                  hint="Please input your username"
                                  class="border-12"
                                  required
                                  ></v-text-field>   
                              </validation-provider>                             
                          </v-card-text>
                          <v-card-actions>
                              <v-btn class="rounded-l mr-12 pl-12 pr-12" color="primary" type="submit" :disabled="invalid">Next</v-btn>
                          </v-card-actions>
                      </form>
                  </validation-observer>
                </v-card-text>
            </v-card>
            <v-snackbar v-model="snackbar.visible" :color="snackbar.color" :multi-line="snackbar.mode === 'multi-line'" :timeout="snackbar.timeout" :top="snackbar.position === 'top'">
                <v-layout align-center pr-4>
                    <v-icon class="pr-3" dark large>{{ snackbar.icon }}</v-icon>
                    <v-layout column>
                    <div>
                        <strong>{{ snackbar.title }}</strong>
                    </div>
                    <div>{{ snackbar.text }}</div>
                    </v-layout>
                </v-layout>
                <v-btn v-if="snackbar.timeout === 0" icon @click="snackbar.visible = false">
                    <v-icon>clear</v-icon>
                </v-btn>
            </v-snackbar>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    
  </v-app>
</template>

<script>
    import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
    import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
    import {backendApi} from "../backend-api/backend-api-sr"


    setInteractionMode('eager')

    extend('digits', {
      ...digits,
      message: '{_field_} needs to be {length} digits. ({_value_})',
    })

    extend('required', {
      ...required,
      message: '{_field_} can not be empty',
    })

    extend('max', {
      ...max,
      message: '{_field_} may not be greater than {length} characters',
    })

    extend('regex', {
      ...regex,
      message: '{_field_} {_value_} does not match {regex}',
    })

    extend('email', {
      ...email,
      message: 'Email must be valid',
    })

    export default {
        components: {
          ValidationProvider,
          ValidationObserver
        },
        name: 'ForgetPassword',
        data(){
            return {
                dialog: false,
                email: '',
                password: '',
                deviceId: '',
                error: true,
                show: false,
                errors: [],
                loading: false,
                snackbar: {
                  color: null,
                  icon: null,
                  mode: null,
                  position: "top",
                  text: null,
                  timeout: 7500,
                  title: null,
                  visible: false
                },
                timeout: 7500,
                display: true,
                username: ''
            }
        },
        mounted(){
          this.$store.dispatch('setOverlay', false)
        },
        methods: {
            clear(){
              this.email = ''
            },
            async sendEmail(){
                this.$refs.observer.validate()  

                this.$store.dispatch('setOverlay', true)

                const respData = await backendApi.fetchCore(`/api/cek_entity_user?user_id2=${this.email}`, null, false, false, false, false)

                if (respData.status === 200) {
                    this.$store.dispatch('setOverlay', false)

                    if (respData.data.data === true) {

                      this.snackbar = {
                          color: "success",
                          icon: "mdi-alert-circle",
                          mode: "multi-line",
                          position: "top",
                          timeout: 7500,
                          title: "Success",
                          text: 'Cek your wa phone',
                          visible: true
                      };
                      this.clear()
                    } else {
                      this.snackbar = {
                          color: "error",
                          icon: "mdi-alert-circle",
                          mode: "multi-line",
                          position: "top",
                          timeout: 7500,
                          title: "Error",
                          text: 'User anda belum terdaftar atau nomor wa phone anda belum terdaftar, hubungi IT untuk lebih lanjut',
                          visible: true
                      };
                    }

                    

                } else {
                    this.$store.dispatch('setOverlay', false)

                    this.snackbar = {
                        color: "error",
                        icon: "mdi-alert-circle",
                        mode: "multi-line",
                        position: "top",
                        timeout: 7500,
                        title: "Error",
                        text: 'Internal Server Error' + respData.status,
                        visible: true
                    };
                } 
            },
            async sendResetPassword(){
              this.$refs.observer.validate()  

            }
        }
    }
</script>