<template>
    <v-footer style="margin-top: 100px" bottom fixed padless>
      <v-progress-linear
          :active="loading"
          :indeterminate="loading"
          absolute
          bottom
          color="deep-purple accent-4"
        ></v-progress-linear>
      <v-bottom-navigation
       horizontal
       style="background-color:#0078d4;"
      >
          <v-btn style="background-color:#0078d4;" @click="$router.go(-1)">
            <span class="text-white">Back</span>
  
            <v-icon class="text-white">mdi-chevron-left</v-icon>
          </v-btn>
        
        <!-- <router-link to="/admin/dashboard"> -->
          <v-btn style="background-color:#0078d4;" to="/admin/dashboard">
            <span class="text-white">Home</span>
  
            <v-icon class="text-white">mdi-home</v-icon>
          </v-btn>
        <!-- </router-link> -->
  
        <!-- <router-link to="/admin/profile"> -->
          <v-btn color="primary" class="text-white" to="/admin/profile">
            <span class="text-white">Profile</span>
  
            <v-icon class="text-white">mdi-clipboard-account</v-icon>
          </v-btn>
        <!-- </router-link> -->
  
        <v-btn color="primary" class="text-white" @click="utem()">
          <span class="text-white">Logout</span>
  
          <v-icon class="text-white">mdi-logout</v-icon>
        </v-btn>
      </v-bottom-navigation>
       <v-dialog
          v-model="dialog"
          max-width="500px">
          <v-card>
          <v-card-title class="text-center" style="background-color:#027fb3;">
              <v-row align="center" justify="center">
                  <v-col cols="12">
                      <h5 style="font-weight:700; color: #fff;">
                      Confirm
                      </h5>
                  </v-col>
              </v-row>  
                  </v-card-title>
                          <v-card-text>
                          <v-container class="fill-height">
                              <v-row>
                                  <v-col cols="12" xs="12" sm="12" md="12" mb="5">
                                      <h6 style="margin-top: 8px;">
                                          Are you sure exit Viva-App ? 
                                      </h6>
                                  </v-col>
                              </v-row> 
                          </v-container>
                      </v-card-text>
                        <v-card-actions>
                  <v-spacer></v-spacer>
                      <v-btn color="primary" @click="logout()">Yes</v-btn>
                      <v-btn color="primary" text @click="close">No</v-btn>
              </v-card-actions>
                  </v-card>
          </v-dialog>
    </v-footer>
  </template>
  
  <script>
  export default {
    name: "Footer",
    data() {
          return {
            value: 1,
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
            q: '',
            text_dialog:'',
            dialog: false
          }
    },
    mounted(){
      this.q = this.$route.query.dashboard
      //console.log(this.q)
    },
    methods: {
     close(){
            this.dialog = false
            
        },
        async utem(){
            //console.log(this.dialog)
            this.dialog = true
             
        },
      logout(){
            this.loading = true
  
            this.$store.dispatch("logoutUser").then(() => {
                this.snackbar = {
                    color: "success",
                    icon: "mdi-checkbox-marked-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: "Successfully Logout Sistem",
                    visible: true
                };
                this.loading = false
                this.$router.push('/')
            });
        }
    }
  };
  </script>