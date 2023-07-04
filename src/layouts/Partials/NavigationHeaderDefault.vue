<template>
    <v-app-bar style="background-color:#027fb3;max-height: 64px;" dark sticky>
        <!-- <v-app-bar-nav-icon @click.stop="drawer()" /> -->
        <v-toolbar-title style="max-width: 65px" class="ml-0 pl-4 text-white">
            <!-- Viva Kencana Investindo -->
            <router-link to="/admin">
                <v-img class="" src="../../assets/logo_gki_white.png" alt="Admin" />
            </router-link>
        </v-toolbar-title>
        <v-tabs class="ml-12 hidden-sm-and-down" v-model="keyTab" :value="keyTab" show-arrows>
            <v-tab
                v-for="(tab) in tabs"
                :key="tab.route"  
                :to="tab.url"
                :class="active_tab == tab.route ? 'v-tab--active v-tab' : 'v-tab'"
            >
                {{ tab.name }}
            </v-tab>
        </v-tabs>
        <v-spacer />
        <v-toolbar-title class="pr-6 hidden-md-and-up" style="font-size:0.99rem; cursor:pointer" @click.stop="drawer()">
            <v-icon class="hidden-md-and-up">
                mdi-menu
            </v-icon>
        </v-toolbar-title>
        <v-menu offset-y class="ml-12">
            <template v-slot:activator="{ on }">
                <v-toolbar-title class="pr-6 hidden-sm-and-down" v-on="on" style="font-size:0.99rem; cursor:pointer">
                    <v-avatar size="45px" item class="mr-1">
                        <v-img :src="avatar" alt="Admin" v-if="avatar"/>
                        <v-img v-else src="../../assets/default-user.png" alt="Admin"/>
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
                                        <v-img :src="avatar" alt="Admin" v-if="avatar"/>
                                        <v-img v-else src="../../assets/default-user.png" alt="Admin"/>
                                    </v-avatar>
                                    <p class="mt-3">
                                    {{ this.$store.state.user.username }}
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
                        <v-btn type="submit" block class="rounded-l border-12 mr-12 pl-12 pr-12 pt-2 pb-2 mt-3" color="primary" @click="logout()">Logout</v-btn>
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
</template>

<script>
import { mapState } from 'vuex'
import {menu} from "../../backend-api/menu/index" 

export default {
    data() {
        return {
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
            search: '',
            text_dialog:'',
            dialog: false,
            active_tab: 2,
            tabs: [],
            keyTab: null
        }
    },
    computed: mapState([
        'avatar'
    ]),
    mounted(){
        this.$store.dispatch('getHeaderAvatar')
        this.getPullData()
        // this.active_tab = window.location.pathname
        // console.log(this.$router.history.base + this.$router.history.current.fullPath , window.location.pathname);
        // console.log(this.$route.name);
    },
    methods: {
        drawer(){
            return this.$store.commit('SET_DRAWER_ADMIN')
        },
        checkColor(count){
            return count ? 'red' : 'green'
        },
        close(){
            this.dialog = false
        },
        async utem(){
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
        },
        async getPullData(){
            this.tabs = []
            var respData = await menu.index(`?entity_id=GKI&appl_id=WEBGK`, null, false, false, false)

            if (respData.status === 200) {
                this.tabs.push(
                    {
                        name: 'Dashboard',
                        route: 'dashboard',
                        url: '/admin/dashboard'
                    }
                )
                for (let index = 0; index < respData.data.menus.length; index++) {
                    this.tabs.push(
                        {
                            name: respData.data.menus[index].menu_header_caption,
                            route: respData.data.menus[index].icon,
                            url: respData.data.menus[index].menu_header_path
                        }
                    )
                    
                }
            }
        }
    },
    watch:{
        active_tab(){
            console.log(this.$route.name);
            const tabIndex = this.tabs.findIndex(tab => tab.route === this.$route.name)
            console.log(tabIndex);
            this.active_tab = tabIndex
            this.keyTab = tabIndex
        }
    }
}
</script>
<style scoped>
.v-tabs {
    flex: 1 1 auto;
    width: 60% !important;
}
</style>