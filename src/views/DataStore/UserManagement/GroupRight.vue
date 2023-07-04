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
                        Menu Item
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
                        @click="dialogfilter = true"
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
                            :items="sec_rights"
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
                                    @change="updateStatusGroupRight(item)"
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
                                        <v-list-item>
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
                                    Sec Right
                                </v-col>
                                <v-divider></v-divider>
                            </v-row>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row class="mt-2 mb-5">
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Entity ID <strong style="color:red;">*</strong><span></span></h6>
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
                                        <h6 class="blue-lcd mb-1">Application<strong style="color:red;">*</strong><span></span></h6>
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
                                            @change="(event) => getGroupID(event)"
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Group<strong style="color:red;">*</strong><span></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="group"
                                            :items="groups"
                                            item-value="group_id"
                                            item-text="group_id"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Menu Header<strong style="color:red;">*</strong><span></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="menu_header_model"
                                            :items="menu_headers"
                                            item-value="menu_header_id"
                                            item-text="menu_caption"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            @change="(event) => getMenuID(event)"
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="8" md="8">
                                        <h6 class="blue-lcd mb-1">Menu Item<strong style="color:red;">*</strong><span></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="menu_item_model"
                                            :items="menu_items"
                                            item-value="menu_id"
                                            :item-text="item => item.menu_id +' - '+ item.menu_caption"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            return-object
                                        ></v-autocomplete> 
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
                    v-model="dialogfilter"
                    persistent
                    max-width="600px"
                >
                    <v-card class="p-2 rounded-l">
                        <v-card-title class="text-center">
                            <v-row>
                                <v-col cols="12">
                                    Filter Group Maintenance
                                </v-col>
                                <v-divider></v-divider>
                            </v-row>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row class="mt-2 mb-5">
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Entity ID </h6>
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
                                            @change="(event) => getGroupID(event)"
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Group</h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="group"
                                            :items="groups"
                                            item-value="group_id"
                                            item-text="group_id"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Menu Header</h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="menu_header_model"
                                            :items="menu_headers"
                                            item-value="menu_header_id"
                                            item-text="menu_caption"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            @change="(event) => getMenuID(event)"
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="8" md="8">
                                        <h6 class="blue-lcd mb-1">Menu Item</h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="menu_item_model"
                                            :items="menu_items"
                                            item-value="menu_id"
                                            :item-text="item => item.menu_id +' - '+ item.menu_caption"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            return-object
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="12" md="12">
                                        <div class="d-flex">
                                            <v-switch
                                                inset
                                                v-model="status"
                                                label="Status *"
                                            ></v-switch>
                                            <v-spacer></v-spacer>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions class="text-center">
                            <v-row justify="center">
                                <v-col cols="12" xs="12" sm="3" md="3">
                                    <v-btn block class="rounded-l mr-2" color="#fff" @click="dialogfilter = false">Cancel</v-btn>
                                </v-col>
                                <v-col cols="12" xs="12" sm="3" md="3">
                                    <v-btn block class="rounded-l text-white" color="#20bf6b" @click="[getPullData(), dialogfilter = false]">Filter</v-btn>
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
import {sec_right} from "../../../backend-api/sec_right/index"
import {user_group} from "../../../backend-api/user_group/index"
import {application} from "../../../backend-api/sec_appl/master"
import {entity} from "../../../backend-api/entity/master" 
import { menu_header } from "../../../backend-api/menu_header/index"
import { menu_item } from "../../../backend-api/menu_item/index"

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
                    text: 'Group Right',
                    disabled: true,
                }
            ],
            headers:[
                {
                text: 'Entity',
                align: 'start',
                value: 'entity_id', 
                align:'center'},
                { text: 'Application', value: 'appl_id' , align:'center'},
                { text: 'Group', value: 'group_id' , align:'center'},
                { text: 'Menu Header', value: 'menu_header' , align:'center'},
                { text: 'Menu SeQ', value: 'menu_seq' , align:'center'},
                { text: 'Menu ID', value: 'menu_id' , align:'center'},
                { text: 'Menu Item', value: 'menu_item' , align:'center'},
                { text: 'Status', value: 'status' , align:'left'}, 
            ],
            sec_rights: [],
            dialog: false,
            dialogfilter: false,
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
            status: false,
            version: '',
            note: '',
            application: '',
            applications: [],
            menu_header_model: '',
            menu_headers: [],
            groups: [],
            group: '',
            menu_item_model: '',
            menu_items: [],
            detail: null,
            showDetail: false,
            dialogEdit: false,
        }
    },
    mounted(){
        this.getPullData()
        this.getEntity()
    },
    methods: {
        tr_datatable(item) {
            const rowClass = 'tr_datatable'
            return rowClass;
        },
        clear(){
            this.entity_id = ''
            this.application = ''
            this.group = ''
            this.menu_header_model = ''
            this.menu_item_model = ''
            this.status = ''
        },
        detailItem(item){

        },
        async getPullData(){
            this.sec_rights = []
            this.$store.dispatch('setOverlay', true)

            var respData = await sec_right.fetchSecRight(`?search=${this.search ? this.search : ''}&entity_id=${this.entity_id ? this.entity_id : ''}&appl_id=${this.application ? this.application : ''}&menu_header_id=${this.menu_header_model ? this.menu_header_model : ''}&menu_id=${this.menu_item_model ? this.menu_item_model.menu_id : ''}&group_id=${this.group ? this.group : ''}`, null, false, false, false)
            if (respData.status === 200) {
                this.sec_rights = respData.data
                this.dialogFilter = false
                this.$store.dispatch('setOverlay', false)
                this.clear()
            } else{
                this.$store.dispatch('setOverlay', false)
                this.dialogFilter = false
            }
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
                this.group = ''
                this.groups = []
            } else{
                var respData = await application.fetchApplication(`?entity_id=${this.entity_id ? this.entity_id : ''}`, null, false, false, false)
                if (respData.status === 200) {
                    this.applications = respData.data
                }
            }
        },
        async getGroupID(event){
            this.getMenuHeader(event)

            if (event === null || event === '') {
                this.group = ''
            } else{
                var respData = await user_group.fetchUserGroup(`?entity_id=${this.entity_id ? this.entity_id : ''}&appl_id=${this.application ? this.application : ''}`, null, false, false, false)
                if (respData.status === 200) {
                    this.groups = respData.data
                }

            }
        },
        async getMenuHeader(event){
            if (event === null || event === '') {
                this.menu_header_model = ''
                this.menu_item_model = ''
                this.menu_items = []
            } else{
                var respData = await menu_header.fetchMenuHeader(`?entity_id=${this.entity_id ? this.entity_id : ''}&appl_id=${this.application ? this.application : ''}`, null, false, false, false)
                if (respData.status === 200) {
                    this.menu_headers = respData.data
                }
            }
        },
        async getMenuID(event){
            if (event === null || event === '') {
                this.menu_item_model = ''
            } else{
                var respData = await menu_item.fetchMenuItem(`?entity_id=${this.entity_id ? this.entity_id : ''}&appl_id=${this.application ? this.application : ''}&menu_header_id=${this.menu_header_model ? this.menu_header_model : ''}`, null, false, false, false)
                if (respData.status === 200) {
                    this.menu_items = respData.data
                }
            }
        },
        async submit(){
            this.$store.dispatch('setOverlay', true)
            this.dialog = false

            if (this.entity_id === '' || this.application === '' || this.group === '' || this.menu_header_model === '' || this.menu_item_model == '' || this.status == '') {
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
                'group_id': this.group,
                'menu_header_id': this.menu_header_model,
                'menu_id': this.menu_item_model.menu_id,
                'status': this.status === true ? 'Y' : 'N',
                'seq_id' : this.menu_item_model.seq_id
            }

            const respData = await sec_right.storeSecRight('', reqBody, false, false, false)

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
        async updateStatusGroupRight(item){
            this.$store.dispatch('setOverlay', true)
            var reqBody = {
                'entity_id': item.entity_id,
                'appl_id': item.appl_id,
                'menu_header_id': item.menu_header_id,
                'menu_id': item.menu_id,
                'group_id': item.group_id,
                'menu_seq': item.menu_seq,
                'status': item.active_flag
            }
            const respData = await sec_right.updateSecRightStatus('', reqBody, false, false, false)
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