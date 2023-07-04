<template>
    <v-app>
        <sidebar />
        <dashboard-content></dashboard-content>
        <content-footer />
    </v-app>
</template>

<script>
import Sidebar from './Sidebar.vue'
import ContentFooter from './Footer.vue'
import DashboardContent from './Content.vue'

export default {
    name:'DefaultLayout',
    components:{
        Sidebar,
        DashboardContent,
        ContentFooter,
    }
}
</script>