<template>
    <v-container fluid class="mt-3 mb-5">
        <v-row>
            <v-col cols="12">
                <div class="d-flex">
                    <v-breadcrumbs :items="breadcumbs">
                        <template v-slot:item="{ item }">
                            <v-breadcrumbs-item
                                :to="item.href"
                                class="text-subtitle-2 crumb-item"
                                :disabled="item.disabled"
                                exact
                            >
                                {{ item.text }}
                            </v-breadcrumbs-item>
                        </template>
                    </v-breadcrumbs>
                    <v-spacer></v-spacer>

                    <v-text-field
                        solo
                        clearable
                        class="border-12"
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                        style="max-width:400px"
                        @keyup.enter="getPullData()"
                    ></v-text-field>
                </div>
            </v-col>
        </v-row>
        <v-row class="mt-2" >
            <v-col cols="12">
                <v-card class="rounded-l elevation-5">
                    <v-card-title>
                        Users
                        <v-spacer></v-spacer>
                        <v-btn
                        small
                        color="#fff"
                        class="py-5 mr-3"
                        @click="getPullData()"
                        >
                            <v-icon>mdi-cached</v-icon>
                        </v-btn>
                        <v-btn
                        small
                        color="success"
                        class="py-5"
                        @click="dialog = true"
                        >
                            Create New
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-data-table
                            :headers="headers"
                            :items="users"
                            class="elevation-1"
                            :items-per-page="20"
                            :loading="$store.state.overlay"
                            height="600"
                            :divider="true"
                            :light="true"
                            :item-class="tr_datatable"
                        >              
                            <template v-slot:[`item.status`]="{ item }">
                                <v-switch
                                    inset
                                    false-value="N"
                                    true-value="Y"
                                    v-model="item.active_flag"
                                    @change="updateStatusUser(item)"
                                    class="mt-1 mb-2"
                                    hide-details="true"
                                ></v-switch>
                            </template>        
                            <template v-slot:[`item.action`]="{ item }">
                                <v-menu
                                    bottom
                                    left
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            dark
                                            icon
                                            v-bind="attrs"
                                            v-on="on"
                                            color="grey"
                                        >
                                            <v-icon>mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </template>

                                    <v-list dense>
                                        <v-list-item @click="detailItem(item)">
                                            <v-list-item-icon>
                                                <v-icon>mdi-magnify</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title>Detail</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item @click="detailItemEdit(item)">
                                            <v-list-item-icon>
                                                <v-icon>mdi-pencil</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title>Edit</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
                <v-dialog
                    v-model="dialog"
                    persistent
                    max-width="600px"
                >
                    <v-card class="p-2 rounded-l">
                        <v-card-title class="text-center">
                            <v-row>
                                <v-col cols="12">
                                    Users
                                </v-col>
                                <v-divider></v-divider>
                            </v-row>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row class="mt-2">
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">User ID <span class="red--text"><strong>* </strong></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="User ID"
                                            persistent-hint
                                            v-model="user_id"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Password <span class="red--text"><strong>* </strong></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="Password"
                                            persistent-hint
                                            v-model="password"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                            :type="show ? 'text' : 'password'"
                                            @click:append="show = !show"
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Name <span class="red--text"><strong>* </strong></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="Name"
                                            persistent-hint
                                            v-model="name"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Phone Number <span class="red--text"><strong>* </strong></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="Phone Number"
                                            persistent-hint
                                            v-model="phone"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="12" md="12">
                                        <v-switch
                                            inset
                                            v-model="status"
                                            label="Status *"
                                        ></v-switch>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions class="text-center">
                            <v-row justify="center">
                                <v-col cols="12" xs="12" sm="3" md="3">
                                    <v-btn block class="rounded-l mr-2" color="#fff" @click="[dialog = false, showDetail = false, clear()]">Cancel</v-btn>
                                </v-col>
                                <v-col cols="12" xs="12" sm="3" md="3" v-if="showDetail == false">
                                    <v-btn block class="rounded-l text-white" color="success" @click="submit()">Save</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog
                    v-model="dialogEdit"
                    persistent
                    max-width="600px"
                >
                    <v-card class="p-2 rounded-l">
                        <v-card-title class="text-center">
                            <v-row>
                                <v-col cols="12">
                                    Edit Users
                                </v-col>
                                <v-divider></v-divider>
                            </v-row>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row class="mt-2">
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">User ID <span class="red--text"><strong>* </strong></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="User ID"
                                            persistent-hint
                                            v-model="user_id"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Password <span class="red--text"><strong>* </strong></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="Password"
                                            persistent-hint
                                            v-model="password"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                            :type="show ? 'text' : 'password'"
                                            @click:append="show = !show"
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Name <span class="red--text"><strong>* </strong></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="Name"
                                            persistent-hint
                                            v-model="name"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Phone Number <span class="red--text"><strong>* </strong></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="Phone Number"
                                            persistent-hint
                                            v-model="phone"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="12" md="12">
                                        <v-switch
                                            inset
                                            v-model="status"
                                            label="Status *"
                                        ></v-switch>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions class="text-center">
                            <v-row justify="center">
                                <v-col cols="12" xs="12" sm="3" md="3">
                                    <v-btn block class="rounded-l mr-2" color="#fff" @click="[dialogEdit = false, clear()]">Cancel</v-btn>
                                </v-col>
                                <v-col cols="12" xs="12" sm="3" md="3" >
                                    <v-btn block class="rounded-l text-white" color="success" @click="submitEdit()">Save</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import {user} from "../../../backend-api/user/index"

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
            breadcumbs: [
                {
                    text: 'Data Store',
                    disabled: false,
                    href: '/admin/datastore',
                },
                {
                    text: 'User Management',
                    disabled: false,
                    href: '/admin/datastore/user-management',
                },
                {
                    text: 'Users',
                    disabled: true,
                }
            ],
            headers:[
                {
                    text: 'User ID',
                    align: 'start',
                    value: 'user_id2', 
                    align:'left'},
                { text: 'Name', value: 'name1' , align:'left'},
                { text: 'Phone', value: 'phone' , align:'left'},
                { text: 'Status', value: 'status' , align:'left'},
                { text: 'Action', value: 'action' , align:'left'},
            ],
            users: [],
            dialog: false,
            user_id: '',
            name: '',
            statuses: [
                {
                    value: 'Y',
                    name: 'Active'
                },
                {
                    value: 'N',
                    name: 'Non Active'
                }
            ],
            status: '',
            password: '',
            show: false,
            phone: '',
            detail: null,
            showDetail: false,
            dialogEdit: false,
            disabledAppl: false
        }
    },
    mounted(){
        this.getPullData()
    },
    methods: {
        tr_datatable(item) {
            const rowClass = 'tr_datatable'
            return rowClass;
        },
        clear(){
            this.user_id = ''
            this.password = ''
            this.phone = ''
            this.name = ''
            this.status = ''
        },
        detailItem(item){
            this.detail = item
            this.dialog = true
            this.showDetail = true
            this.user_id = item.user_id2
            this.name = item.name1
            this.status = item.active_flag === 'Y' ? true : false
            this.password = item.user_pass
            this.phone = item.phone
        },
        detailItemEdit(item){
            this.detail = item
            this.dialogEdit = true
            this.user_id = item.user_id2
            this.name = item.name1
            this.status = item.active_flag === 'Y' ? true : false
            this.password = item.user_pass
            this.phone = item.phone
        },
        async getPullData(){
            this.users = []
            this.$store.dispatch('setOverlay', true)
            var subpath = ''

            if (this.search) {
                subpath = `?username=${this.search}`
            }
            var respData = await user.fetchUser(subpath, null, false, false, false)
            if (respData.status === 200) {
                this.users = respData.data
                this.$store.dispatch('setOverlay', false)

            } else{
                this.$store.dispatch('setOverlay', false)
            }
        },
        async updateStatusUser(item){

            this.$store.dispatch('setOverlay', true)
            var reqBody = {
                'user_num': item.user_num,
                'active_flag': item.active_flag
            }
            const respData = await user.updateStatusUser('', reqBody, false, false, false)
            if (respData.status === 200) {
                this.getPullData()
                this.snackbar = {
                    color: "success",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: 'Successfully Update Status',
                    visible: true
                };
                this.$store.dispatch('setOverlay', false)

            } else{
                this.$store.dispatch('setOverlay', false)
                this.snackbar = {
                    color: "error",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Error",
                    text: respData.data,
                    visible: true
                };
            }
        },
        async submit(){
            this.$store.dispatch('setOverlay', true)
            this.dialog = false

            if (this.user_id === '' || this.name === '' || this.password === '' || this.phone === '' || this.status == '') {
                this.snackbar = {
                    color: "error",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Error",
                    text: 'Please fill your fileds and submit for save',
                    visible: true
                };
                this.$store.dispatch('setOverlay', false)
                this.dialog = true

                return false
            }

            var reqBody = {
                'username': this.user_id,
                'name1': this.name,
                'phone': this.phone,
                'password': this.password,
                'status': this.status === true ? 'Y' : 'N'
            }

            const respData = await user.storeUser('', reqBody, false, false, false)

            if (respData.status === 200) {

                this.snackbar = {
                    color: "success",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: 'Successfully Create Data',
                    visible: true
                };

                this.$store.dispatch('setOverlay', false)
                this.dialog = false
                this.clear()
                this.getPullData()

            } else{
                this.$store.dispatch('setOverlay', false)
                this.dialog = true

                this.snackbar = {
                    color: "error",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Error",
                    text: respData.data,
                    visible: true
                };
            }
        },
        async submitEdit(){
            this.$store.dispatch('setOverlay', true)
            this.dialogEdit = false

            if (this.user_id === '' || this.name === '' || this.password === '' || this.phone === '' || this.status == '') {
                this.snackbar = {
                    color: "error",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Error",
                    text: 'Please fill your fileds and submit for save',
                    visible: true
                };
                this.$store.dispatch('setOverlay', false)
                this.dialogEdit = true

                return false
            }

            var reqBody = {
                'user_num': this.detail.user_num,
                'username': this.user_id,
                'name1': this.name,
                'phone': this.phone,
                'password': this.password,
                'status': this.status === true ? 'Y' : 'N'
            }

            const respData = await user.updateUser('', reqBody, false, false, false)

            if (respData.status === 200) {

                this.snackbar = {
                    color: "success",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: 'Successfully Update Data',
                    visible: true
                };

                this.$store.dispatch('setOverlay', false)
                this.dialogEdit = false
                this.clear()
                this.getPullData()

            } else{
                this.$store.dispatch('setOverlay', false)
                this.dialogEdit = true

                this.snackbar = {
                    color: "error",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Error",
                    text: respData.data,
                    visible: true
                };
            }
        }
    }
}
</script>
  
<style>
.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .9;
    position: absolute;
    width: 100%;
}
.tr_datatable{
  background-color: #F5F7F8 !important;
}
</style>