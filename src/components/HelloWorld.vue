<template>
  <v-app id="inspire" class="outer" style="background-position: center;
    background-repeat: no-repeat;
    background-size: cover;">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="12" md="6" lg="3">
            <v-card class="px-5 py-12 pb-12 border-radius-bottom-none" outlined style="padding-bottom: 80px !important;">
                <v-card-title style="border-bottom: 2px solid #027fb3">
                  <v-row align="center" justify="center">
                    <v-col cols="12" xs="12" sm="12" md="10">
                      <h1 class="text-center blue-lcd" style="font-weight:600;color: #027fb3;">
                      LOG IN
                      </h1>
                    </v-col>
                  </v-row>                  
                </v-card-title>

                <v-card-text class="mt-8">
                    <form>
                      <v-text-field
                      solo
                      v-model="email"
                      :error-messages="errors"
                      label="Username"
                      append-icon="mdi-email"
                      hint="Please input your username"
                      required
                      class="border-12"
                      ></v-text-field>
                      <v-text-field
                          solo
                          v-model="password"
                          :error-messages="errors"
                          label="Password"
                          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="show ? 'text' : 'password'"
                          @click:append="show = !show"
                          @keyup.enter="submit()"
                          hint="Please input your password"
                          class="border-12"
                          counter
                          required>
                      </v-text-field>

                      <v-select 
                        v-show="visibleShift == 'none' ? false: true"
                        class="border-12"
                        v-model="shift"
                        :items="shiftItems"
                        label="Shift"
                        solo
                      ></v-select>

                      <p>Dengan masuk, saya menyetujui <b>Pernyataan Privasi</b> dan <b>Ketentuan Layanan.</b> <b>GKI.</b></p>
                    </form>
                    <v-btn type="submit" block height="3rem" class="rounded-l border-12 mr-12 pl-12 pr-12 pt-2 pb-2" color="primary" @click="submit()">Login</v-btn>

                    <div class="d-flex mt-3">
                        © 2022, GKI.
                        <v-spacer></v-spacer>
                        <router-link to="/password/reset">
                          <b>Forget password ?</b> 
                        </router-link>
                    </div>

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
                </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    
  </v-app>
</template>

<script>

    export default {
        name: 'AdminLogin',
        data(){
            return {
                email: '',
                password: '',
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
                visibleShift: 'none',
                shift:'1',
                shiftItems: ['1', '2', '3'],
            }
        },
        mounted(){
          // console.log(process.env.VUE_APP_URL);
          if(process.env.VUE_AYOLA_ONLY ==1){
            this.visibleShift = ''
          } else {
            this.visibleShift = 'none'
          }
          this.$store.dispatch('setOverlay', false)
        },
        methods: {
            clear(){
              this.email = ''
              this.password = ''
              // this.shift = '1'
            },
            submit(){          
               this.$router.push('/admin/dashboard');
              // this.loading = true
              // this.$store.dispatch('setOverlay', true)


              // let username = this.email;
			        // let password = this.password;
              // let shif = this.shift;
              // if(this.visibleShift == 'none'){
              //   shif = '1'
              // }

              // this.$store
              // .dispatch("loginUser", { username, password, shif })
              // .then(() => {
              //   this.clear()
              //   this.loading = false
              //   this.$store.dispatch('setOverlay', false)
              //   this.snackbar = {
              //     color: "success",
              //     icon: "mdi-checkbox-marked-circle",
              //     mode: "multi-line",
              //     position: "top",
              //     timeout: 7500,
              //     title: "Success",
              //     text: "Successfully Login",
              //     visible: true
              //   };
              // })
              // .catch((err) => {
              //   this.$store.dispatch('setOverlay', false)
              //   this.loading = false
              //   this.snackbar = {
              //     color: "error",
              //     icon: "mdi-alert-circle",
              //     mode: "multi-line",
              //     position: "top",
              //     timeout: 7500,
              //     title: "Error",
              //     text: err.response.data.message,
              //     visible: true
              //   };
              // });
            }
        }
    }
</script>
<style scoped>
.theme--light.v-sheet--outlined {
    border: none !important;
}
.border-radius-bottom-none{
  border-bottom-left-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
}
</style>