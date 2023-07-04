<template>
    <div>
        <v-system-bar
            color="grey"
            lights-out
            height="30"
            class="pl-5 pr-5"
        >
            <p class="hidden-sm-and-down mt-4">Tentang GKI</p> 
            <v-spacer></v-spacer>
            <span class="mr-5">{{this.time }}</span>
            <span>{{ this.date_now }}</span>
        </v-system-bar>
        <v-app>
            <navigation-header-default />
            <v-navigation-drawer right v-model="$store.state.drawer" app temporary light class="hidden-md-and-up" hide-overlay color="primary">
                <v-list dense class="text-white pb-3 pt-3 text-white" light >
                    <v-list-item-group>
                        <v-list-item class="px-2">
                            <v-list-item-avatar>
                                <v-img :src="avatar" alt="Admin" v-if="avatar"/>
                                <v-img v-else src="../assets/default-user.png" alt="Admin"/>
                            </v-list-item-avatar>
                            <v-list-item-title class="text-white">{{ this.$store.state.user.username }}</v-list-item-title>
                            <v-btn
                                icon
                                @click.stop="$store.state.drawer = !$store.state.drawer"
                                color="#fff"
                            >
                                <v-icon>mdi-chevron-right</v-icon>
                            </v-btn>
                        </v-list-item>
                        <v-list-item to="/admin/dashboard">
                            <v-list-item-icon>
                                <v-icon color="#fff">mdi-home</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title class="text-white">Home</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item to="/admin/profile">
                            <v-list-item-icon>
                                <v-icon color="#fff">mdi-account-circle</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title class="text-white">User Profile</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item v-for="(tab) in tabs"
                        :key="tab.route"  
                        :to="tab.url">
                            <v-list-item-icon>
                                <v-icon  color="#fff" v-if="tab.route === 'ledger'">mdi-wallet-outline</v-icon>
                                <v-icon  color="#fff" v-if="tab.route === 'datastore'">mdi-database-outline</v-icon>
                                <v-icon  color="#fff" v-if="tab.route === 'budget'">mdi-currency-usd</v-icon>
                                <v-icon  color="#fff" v-if="tab.route === 'cashbank'">mdi-cash</v-icon>
                                <v-icon  color="#fff">{{ tab.icon }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title class="text-white">{{ tab.name }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item class="mt-3">
                            <v-btn type="submit" block class="rounded-l border-12 mr-12 pl-12 pr-12 pt-2 pb-2 mt-3" color="#fff" @click="logout()">Logout</v-btn>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>
            <v-main>
                <dashboard-content></dashboard-content>
            </v-main>
        </v-app>
    </div>
</template>

<script>
import NavigationHeaderDefault from './Partials/NavigationHeaderDefault.vue'
import DashboardContent from './Content.vue'
import { mapState } from 'vuex'
import {menu} from "../backend-api/menu/index" 

export default {
    name:'DefaultLayout',
    components:{
        NavigationHeaderDefault,
        DashboardContent
    },
    computed: mapState([
        'profile', 'avatar', 'drawer'
    ]),
    mounted(){
        this.$store.dispatch('getHeaderAvatar')
        this.getPullData()
    },
    data() {
        return {
            show: false,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            timeout: 7500,
            interval: null,
            time: null, 
            date_now: null,
            intervalData: null,
            tabs: []
        }
    },
    methods: {
        async getPullData(){
            this.tabs = []
            var respData = await menu.index(`?entity_id=GKI&appl_id=WEBGK`, null, false, false, false)

            if (respData.status === 200) {
                for (let index = 0; index < respData.data.menus.length; index++) {
                    this.tabs.push(
                        {
                            name: respData.data.menus[index].menu_header_caption,
                            route: respData.data.menus[index].icon,
                            url: respData.data.menus[index].menu_header_path,
                            icon: respData.data.menus[index].icon
                        }
                    )
                    
                }
            }
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
    },
    beforeDestroy() {
    // prevent memory leak
        clearInterval(this.interval)
    },
    created() {
        // update the time every second
        this.interval = setInterval(() => {
            this.time = Intl.DateTimeFormat('sv-SE', {timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}).format()
            this.date_now = Intl.DateTimeFormat('id', {timeZone: 'Asia/Jakarta', day: 'numeric', month: 'long', weekday: "long", year: "numeric"}).format()
        }, 1000)
    }
}
</script>