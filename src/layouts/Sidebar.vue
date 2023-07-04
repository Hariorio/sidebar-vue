<template>
    <div>
        <v-app-bar app style="background-color:#0078d4;" dark>
            <v-app-bar-nav-icon @click.stop="drawer()" />
            <v-toolbar-title style="width: 250px" class="ml-0 pl-4">
                {{this.$route.matched[0].name}}
                <!-- <v-img class="hidden-sm-and-down" src="../../../../assets/icon.png" alt="Admin" max-width="100px"/> -->
                <!-- <span class="hidden-sm-and-down">Viva Kencana</span> -->
            </v-toolbar-title>
            <v-spacer />
            <v-text-field flat solo-inverted hide-details append-icon="mdi-magnify" label="Search" class="hidden-sm-and-down border-12" style="background: rgba(255, 255, 255, 0.16);" @keyup.enter="getApplication()" v-model="search"/>
            <v-spacer />
            <!-- <v-btn class="" icon>
                <v-icon>mdi-email-outline</v-icon>
                <v-badge color="green" content="6"></v-badge>
            </v-btn>
            <v-btn class="ml-1" icon>
                <v-icon>mdi-bell</v-icon>
                <v-badge color="green" content="2"></v-badge>
            </v-btn>
            <v-btn icon class="ml-1">
                <v-icon>mdi-cog</v-icon>
            </v-btn> -->
            <v-menu offset-y>
            <template v-slot:activator="{ on }">
                <v-toolbar-title class="pr-6" v-on="on" style="font-size:0.99rem; cursor:pointer">
                    <v-avatar size="45px" item class="mr-1">
                        <v-img :src="avatar" alt="Admin"/>
                    </v-avatar>
                    {{$store.state.user.username}}
                    <v-icon class="hidden-sm-and-down">
                        mdi-chevron-down
                    </v-icon>
                </v-toolbar-title>
            </template>
            <v-list dense>
                <v-list-item-group
                    color="primary"
                >
                    <v-list-item>
                        <v-card class="rounded-l" width="100%">
                            <v-card-text class="p-1">
                                <div class="d-flex">
                                    <v-avatar size="45px" item class="mr-2">
                                        <v-img :src="avatar" alt="Admin"/>
                                    </v-avatar>
                                    <p class="mt-3">
                                    {{ this.$store.state.profile.name1 }}
                                    </p>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-list-item>
                    <v-list-item to="/admin/dashboard" class="mt-3">
                        <v-list-item-icon>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Home</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item to="/admin/profile">
                        <v-list-item-icon>
                            <v-icon>mdi-account-circle</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>User Profile</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-btn type="submit" block class="rounded-l border-12 mr-12 pl-12 pr-12 pt-2 pb-2 mt-3" color="primary" @click="utem()">Logout</v-btn>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-menu>
            <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                absolute
                bottom
                color="deep-purple accent-4"
            ></v-progress-linear>
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
        </v-app-bar>
        <v-navigation-drawer v-model="$store.state.drawer" app :mini-variant="$store.state.mini" :expand-on-hover="$store.state.mini" mini-variant-width="70">
            <v-list dense style="background-color:#0078d4;" class="text-white pb-3 pt-3">
                <v-list-item-group>
                    <v-list-item :to="'/admin/'+this.$route.matched[0].name">
                        <v-list-item-icon class="text-white">
                            <v-icon style="color:#ffffff !important">mdi-domain</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title class="text-white">{{this.$route.matched[0].name}}</v-list-item-title>
                        </v-list-item-content>

                    </v-list-item>
                </v-list-item-group>
            </v-list>
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
            <v-skeleton-loader
            class="p-2 mt-1 mb-1 pt-2 pb-5"
            v-bind="attrs"
            type="list-item-three-line, list-item-three-line, list-item-three-line, list-item-three-line, list-item-three-line, list-item-three-line, list-item-three-line, list-item-three-line, list-item-three-line, list-item-three-line"
            v-if="this.applications.length <= 0"
            ></v-skeleton-loader>
            <v-list v-else dense>
                <v-list-group
                    v-for="item in applications"
                    :key="item.menu_header_id"
                    v-model="item.active"
                    :prepend-icon="item.icon"
                    no-action
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item.menu_header_caption }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </template>

                    <v-list-item
                        v-for="subItem in item.submenus"
                        :key="subItem.menu_id"
                        :to="subItem.route_path"
                        v-model="subItem.active"
                    >
                        <v-list-item-content>
                            <v-list-item-title v-text="subItem.menu_caption"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: mapState([
        'avatar'
    ]),
    mounted(){
        this.getApplication()
        this.$store.dispatch('getHeaderAvatar')
        this.loading = false
        console.log(this.$route.matched[0].name);
    },
    data() {
        return {
            attrs: {
                class: 'mb-6',
                boilerplate: true,
                elevation: 2,
            },
            selectedItem: 0,
            items: [],
            applications: [],
            mini:false,
            orders: [],
            text_dialog:'',
            dialog: false,
            withdraw_mitras: [],
            withdraw_users: [],
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
            user: '',
            search: ''
        }
    },
    methods:{
        drawer(){
            return this.$store.commit('SET_DRAWER_ADMIN')
        },
        checkColor(count){
            return count ? 'red' : 'green'
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
        },

        close(){
            this.dialog = false
            
        },
        async utem(){
            //console.log(this.dialog)
            this.dialog = true
             
        },

        async getApplication() {   
            
            this.loading = true

            if (this.$route.matched[0].name === 'MGS') {
                var appl_id = 'WEB_' + this.$route.matched[0].name
            } else if (this.$route.matched[0].name === 'TOBANG') {
                var appl_id = 'DASHBOARD'
            } else if (this.$route.matched[0].name === 'AYOLA') {
                var appl_id = 'WEB AYALA'
            }  else {
                var appl_id = 'WEB' + this.$route.matched[0].name
            }

            await axios.get(`${process.env.VUE_APP_URL}/api/get_menu?appl_id=${appl_id}&entity_id=${this.$route.matched[0].name}&search=${this.search}`, { 
                headers: { Authorization: `Bearer ${this.$store.getters.isTokenUser}` } 
            })
            .then(res => {
                this.loading = false
                this.applications = res.data.menus
                this.applications.forEach(element => {

                    let check = element.submenus.filter(item => {
                        return item.route_path == window.location.pathname.substr(9, 100)
                    })
                    if (check.length > 0) {
                        Object.assign(element, {active: true})
                        Object.assign(check[0], {active: true})
                    }
                })
            });
        },
    },
}
</script>