<template>
    <v-app id="inspire" class="outer" style="background-position: center;
      background-repeat: no-repeat;
      background-size: cover;">
      <v-main>
        <v-container class="fill-height pl-lg-5 pr-lg-5" style="max-width: 74em;">
          <v-row align="center" justify="center">
            <v-col cols="12" xs="12" sm="8" md="8">
              <v-card class="elevation-12 rounded-l p-5">
                  <v-progress-linear
                      :active="loading"
                      :indeterminate="loading"
                      absolute
                      bottom
                      color="blue accent-4"
                  ></v-progress-linear>
                  <h5 class="pt-5">Change Password</h5>
                  <validation-observer
                      ref="observer"
                      v-slot="{ invalid }"
                  >
                      <form @submit.prevent="changePassword">
                          <v-card-text>
                                <v-text-field
                                solo
                                v-model="username"
                                label="Username"
                                append-icon="mdi-email"
                                hint="Please input your username"
                                disabled
                                class="border-12"
                                ></v-text-field>
                                <validation-provider
                                    v-slot="{ errors }"
                                    name="password"
                                    rules="required"
                                >
                                    <v-text-field
                                    solo
                                    label="Password*"
                                    :append-icon="showReg ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="showReg ? 'text' : 'password'"
                                    @click:append="showReg = !showReg"
                                    hint="Your Password"
                                    persistent-hint
                                    required
                                    v-model="password"
                                    :error-messages="errors"
                                    class="border-12"
                                    ></v-text-field>
                                </validation-provider> 
                                
                                <validation-provider
                                    v-slot="{ errors }"
                                    name="passwordConfirmation"
                                    rules="required"
                                >
                                    <v-text-field
                                    solo
                                    label="Confirmation Password*"
                                    :append-icon="showRegConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="showRegConfirm ? 'text' : 'password'"
                                    @click:append="showRegConfirm = !showRegConfirm"
                                    hint="Your Confirmation Password"
                                    persistent-hint
                                    required
                                    v-model="passwordConfirmation"
                                    :error-messages="errors"
                                    class="border-12"
                                    ></v-text-field>
                                </validation-provider> 
  
                          </v-card-text>
                          <v-card-actions>
                              <v-btn class="rounded-l mr-12 pl-12 pr-12" color="primary" type="submit" :disabled="invalid">Change Password</v-btn>
                          </v-card-actions>
                      </form>
                  </validation-observer>
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
          name: 'ForgetChangePassword',
          data(){
              return {
                  dialog: false,
                  email: '',
                  password: '',
                  passwordConfirmation: '',
                  deviceId: '',
                  error: true,
                  show: false,
                  show: false,
                  showReg: false,
                  showRegConfirm: false,
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
                  username: ''
              }
          },
          async mounted(){
            console.log(this.$route.params.link);

            this.$store.dispatch('setOverlay', true)

            const respData = await backendApi.fetchCore(`/api/cek_link_reset_password?link=${this.$route.params.link}`, null, false, false, false, false)

            if (respData.status === 200) {
                this.$store.dispatch('setOverlay', false)
                this.username = respData.data.data
            } else{
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

                this.$router.push('/staff/dashboard');

            }
          },
          methods: {
              clear(){
                this.email = ''
              },
              async changePassword(){
                  this.$refs.observer.validate()  
  
                  this.$store.dispatch('setOverlay', true)

                  if (this.password === this.passwordConfirmation) {
                        var reqBody = {
                            'user_id2': this.username,
                            'password': this.password
                        }

                        const respData = await backendApi.fetchCore('/api/resetPassword', reqBody, false, false, false, false)
                        
                        if (respData.status === 200) {
                            this.$store.dispatch('setOverlay', false)

                            this.username = ''
                            this.snackbar = {
                                color: "success",
                                icon: "mdi-checkbox-marked-circle",
                                mode: "multi-line",
                                position: "top",
                                timeout: 7500,
                                title: "Success",
                                text: "Successfully Reset Password",
                                visible: true
                            };

                            this.$router.push('/');

                        } else {
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
                  } else {
                        this.$store.dispatch('setOverlay', false)

                        this.snackbar = {
                            color: "error",
                            icon: "mdi-alert-circle",
                            mode: "multi-line",
                            position: "top",
                            timeout: 7500,
                            title: "Error",
                            text: 'Confirmation password does not match',
                            visible: true
                        };
                  }
              }
          }
      }
  </script>