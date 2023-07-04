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
                        @keyup.enter="getSearch()"
                    ></v-text-field>
                </div>
            </v-col>
        </v-row>
        <v-row class="mt-2" >
            <v-col cols="12">
                <v-card class="rounded-l elevation-5">
                    <v-card-title>
                        User Group
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
                        color="#fff"
                        class="py-5 mr-3"
                        @click="dialogFilter = true"
                        >
                            <v-icon>mdi-filter-variant</v-icon>
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
                            :items="user_groups"
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
                                    class="mt-1 mb-2"
                                    hide-details="true"
                                    @change="updateStatusGroup(item)"
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
                                    User Group
                                </v-col>
                                <v-divider></v-divider>
                            </v-row>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row class="mt-2">
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Entity ID <span class="red--text"><strong>* </strong></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="entity_id"
                                            :items="entities"
                                            item-value="entity_id"
                                            item-text="description"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            @change="(event) => getApplication(event)"
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Application <span class="red--text"><strong>* </strong></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="application"
                                            :items="applications"
                                            item-value="appl_id"
                                            item-text="appl_id"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Group <span class="red--text"><strong>* </strong></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="group_master_model"
                                            :items="groups"
                                            item-value="group_id"
                                            item-text="description"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">User <span class="red--text"><strong>* </strong></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="user"
                                            :items="users"
                                            item-value="user_id2"
                                            item-text="user_id2"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="12" md="12">
                                        <h6 class="blue-lcd mb-1">Note</h6>
                                        <v-textarea 
                                        v-model="note" 
                                        solo
                                        dense 
                                        class="ma-0 pa-0 border-12"
                                        ></v-textarea>
                                    </v-col>
                                    <v-col class="col-12" sm="12" md="12">
                                        <div class="d-flex">
                                            <v-switch
                                                inset
                                                v-model="status"
                                                label="Status *"
                                            ></v-switch>
                                            <v-spacer></v-spacer>
                                            <small class="mt-5">*indicates required field</small>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-container>
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
                    v-model="dialogFilter"
                    persistent
                    max-width="600px"
                >
                    <v-card class="p-2 rounded-l">
                        <v-card-title class="text-center">
                            <v-row>
                                <v-col cols="12">
                                    Filter User Group
                                </v-col>
                                <v-divider></v-divider>
                            </v-row>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row class="mt-2">
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Entity ID</h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="entity_id"
                                            :items="entities"
                                            item-value="entity_id"
                                            item-text="description"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            @change="(event) => getApplication(event)"
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Application</h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="application"
                                            :items="applications"
                                            item-value="appl_id"
                                            item-text="appl_id"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Group</h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="group_master_model"
                                            :items="groups"
                                            item-value="group_id"
                                            item-text="description"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">User</h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="user"
                                            :items="users"
                                            item-value="user_id2"
                                            item-text="user_id2"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="12" md="12">
                                        <div class="d-flex">
                                            <v-switch
                                                inset
                                                v-model="status"
                                                label="Status"
                                            ></v-switch>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions class="text-center">
                            <v-row justify="center">
                                <v-col cols="12" xs="12" sm="3" md="3">
                                    <v-btn block class="rounded-l mr-2" color="#fff" @click="dialogFilter = false">Cancel</v-btn>
                                </v-col>
                                <v-col cols="12" xs="12" sm="3" md="3">
                                    <v-btn block class="rounded-l text-white" color="success" @click="getPullData()">Search</v-btn>
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
                                    Edit User Group
                                </v-col>
                                <v-divider></v-divider>
                            </v-row>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row class="mt-2">
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Entity ID <span class="red--text"><strong>* </strong></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            v-model="entity_id"
                                            :items="entities"
                                            item-value="entity_id"
                                            item-text="description"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            @change="(event) => getApplication(event)"
                                            readonly
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Application <span class="red--text"><strong>* </strong></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            v-model="application"
                                            :items="applications"
                                            item-value="appl_id"
                                            item-text="appl_id"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            readonly
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Group <span class="red--text"><strong>* </strong></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            v-model="group_master_model"
                                            :items="groups"
                                            item-value="group_id"
                                            item-text="description"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            readonly
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">User <span class="red--text"><strong>* </strong></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            v-model="user"
                                            :items="users"
                                            item-value="user_id2"
                                            item-text="user_id2"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            readonly
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="12" md="12">
                                        <h6 class="blue-lcd mb-1">Note</h6>
                                        <v-textarea 
                                        v-model="note" 
                                        solo
                                        dense 
                                        class="ma-0 pa-0 border-12"
                                        ></v-textarea>
                                    </v-col>
                                    <v-col class="col-12" sm="12" md="12">
                                        <div class="d-flex">
                                            <v-switch
                                                inset
                                                v-model="status"
                                                label="Status *"
                                            ></v-switch>
                                            <v-spacer></v-spacer>
                                            <small class="mt-5">*indicates required field</small>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions class="text-center">
                            <v-row justify="center">
                                <v-col cols="12" xs="12" sm="3" md="3">
                                    <v-btn block class="rounded-l mr-2" color="#fff" @click="[dialogEdit = false, clear()]">Cancel</v-btn>
                                </v-col>
                                <v-col cols="12" xs="12" sm="3" md="3">
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
import {user_group} from "../../../backend-api/user_group/index"
import {application} from "../../../backend-api/sec_appl/master"
import {entity} from "../../../backend-api/entity/master" 
import {user} from "../../../backend-api/user/index"
import {group_master} from "../../../backend-api/group_master/index"

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
                    text: 'User Group',
                    disabled: true,
                }
            ],
            headers:[
                {
                    text: 'Entity ID',
                    align: 'start',
                    value: 'entity_id', 
                    align:'center'},
                { text: 'Application', value: 'appl_id' , align:'center'},
                { text: 'User ID', value: 'user_id2' , align:'center'},
                { text: 'Group ID', value: 'group_id' , align:'center'},
                { text: 'Status', value: 'status' , align:'left'},
                { text: 'Action', value: 'action' , align:'left'},
            ],
            user_groups: [],
            dialog: false,
            entity_id: '',
            entities: [],
            menu_caption: '',
            route_path: '',
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
            status: true,
            version: '',
            note: '',
            application: '',
            applications: [],
            groups: [],
            group_master_model: '',
            note: '',
            dialogFilter: false,
            users: [],
            user: '',
            detail: null,
            showDetail: false,
            dialogEdit: false,
            disabledAppl: false
        }
    },
    mounted(){
        this.getPullData()
        this.getEntity()
        this.getUser()
        this.getGroupMaster()
    },
    methods: {
        tr_datatable(item) {
            const rowClass = 'tr_datatable'
            return rowClass;
        },
        clear(){
            this.entity_id = ''
            this.application = ''
            this.group_master_model = ''
            this.user = ''
            this.note = ''
            this.status = true
        },
        detailItem(item){
            this.detail = item
            this.dialog = true
            this.showDetail = true
            this.getApplication()
            this.status = item.active_flag === 'Y' ? true : false
            this.entity_id = item.entity_id
            this.application = item.appl_id
            this.group_master_model = item.group_id
            this.user = item.user_id2
            this.note = item.note1
        },
        detailItemEdit(item){
            this.detail = item
            this.dialogEdit = true
            this.getApplication()
            this.status = item.active_flag === 'Y' ? true : false
            this.entity_id = item.entity_id
            this.application = item.appl_id
            this.group_master_model = item.group_id
            this.user = item.user_id2
            this.note = item.note1
        },
        async getEntity(){
            var respData = await entity.fetchEntity("", null, false, false, false)
            if (respData.status === 200) {
                this.entities = respData.data
            }
        },
        async getApplication(event){
            if (event === null || event === '') {
                this.application = ''
            } else{
                var respData = await application.fetchApplication(`?entity_id=${this.entity_id ? this.entity_id : ''}`, null, false, false, false)
                if (respData.status === 200) {
                    this.applications = respData.data
                }
            }
        },
        async getUser(){
            var respData = await user.fetchUser('', null, false, false, false)
            if (respData.status === 200) {
                this.users = respData.data
            }
        },
        async getGroupMaster(){
            var respData = await group_master.fetchGroupMaster('', null, false, false, false)
            if (respData.status === 200) {
                this.groups = respData.data
            }
        },
        async getPullData(){
            this.user_groups = []
            this.$store.dispatch('setOverlay', true)
            var subpath = ''
            var status = this.status === true ? 'Y' : 'N'

            if (this.entity_id && this.application && this.group_master_model && this.user && this.status) {
                subpath = `?entity_id=${this.entity_id}&appl_id=${this.application}&group_id=${this.group_master_model}&user_id2=${this.user}&active_flag=${status}`
            }

            if (this.entity_id && this.application && this.group_master_model && this.user) {
                subpath = `?entity_id=${this.entity_id}&appl_id=${this.application}&group_id=${this.group_master_model}&user_id2=${this.user}&active_flag=${status}`
            }

            if (this.entity_id && this.application && this.group_master_model) {
                subpath = `?entity_id=${this.entity_id}&appl_id=${this.application}&group_id=${this.group_master_model}&active_flag=${status}`
            }

            if (this.entity_id && this.application) {
                subpath = `?entity_id=${this.entity_id}&appl_id=${this.application}&active_flag=${status}`
            }

            if (this.entity_id) {
                subpath = `?entity_id=${this.entity_id}&active_flag=${status}`
            }

            if (this.group_master_model) {
                subpath = `?group_id=${this.group_master_model}&active_flag=${status}`
            }

            if (this.user) {
                subpath = `?user_id2=${this.user}&active_flag=${status}`
            } 

            if (status) {
                subpath = `?active_flag=${status}`
            }

            var respData = await user_group.fetchUserGroup(subpath, null, false, false, false)
            if (respData.status === 200) {
                this.clear()
                this.user_groups = respData.data
                this.dialogFilter = false
                this.$store.dispatch('setOverlay', false)

            } else{
                this.$store.dispatch('setOverlay', false)
                this.dialogFilter = false
            }
        },
        async getSearch(){
            this.user_groups = []
            this.$store.dispatch('setOverlay', true)
            var subpath = ''

            if (this.search) {
                subpath = `?search=${this.search}`
            }

            var respData = await user_group.fetchUserGroup(subpath, null, false, false, false)
            if (respData.status === 200) {
                this.user_groups = respData.data
                this.$store.dispatch('setOverlay', false)

            } else{
                this.$store.dispatch('setOverlay', false)
            }
        },
        async submit(){
            this.$store.dispatch('setOverlay', true)
            this.dialog = false

            if (this.entity_id === '' || this.application === '' || this.group_master_model === '' || this.user === '' || this.status == '') {
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
                'entity_id': this.entity_id,
                'appl_id': this.application,
                'group_id': this.group_master_model,
                'note1': this.note ? this.note : '',
                'status': this.status === true ? 'Y' : 'N',
                'user_id2' : this.user
            }

            const respData = await user_group.storeUserGroup('', reqBody, false, false, false)

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
        async updateStatusGroup(item){
            this.$store.dispatch('setOverlay', true)
            var reqBody = {
                'entity_id': item.entity_id,
                'appl_id': item.appl_id,
                'group_id': item.group_id,
                'user_id2': item.user_id2,
                'status': item.active_flag,
                'note1': item.note1
            }
            const respData = await user_group.updateUserGroup('', reqBody, false, false, false)
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
        async submitEdit(){
            this.$store.dispatch('setOverlay', true)
            this.dialogEdit = false

            var reqBody = {
                'entity_id': this.entity_id,
                'appl_id': this.application,
                'group_id': this.group_master_model,
                'user_id2': this.user,
                'status': this.status === true ? 'Y' : 'N',
                'note1': this.note
            }
            const respData = await user_group.updateUserGroup('', reqBody, false, false, false)
            if (respData.status === 200) {
                this.clear()
                this.getPullData()
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
                this.dialogEdit = true

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