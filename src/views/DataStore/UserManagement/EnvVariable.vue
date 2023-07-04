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
                        Env Variable
                        <v-spacer></v-spacer>
                        <v-btn
                        small
                        color="#fff"
                        class="py-5 mr-3"
                        @click="getPullData()"
                        >
                            <v-icon>mdi-cached</v-icon>
                        </v-btn>
                        <!-- <v-btn
                        small
                        color="#fff"
                        class="py-5 mr-3"
                        @click="dialogfilter = true"
                        >
                            <v-icon>mdi-filter-variant</v-icon>
                        </v-btn> -->
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
                            :items="env_vars"
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
                                    @change="updateStatusEnvVar(item)"
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
                                    Environment Variabel
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
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Variable ID <span class="red--text"><strong>* </strong></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="Variable ID"
                                            persistent-hint
                                            v-model="var_id"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Type Var<strong style="color:red;">*</strong><span></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="type_var"
                                            :items="type_vars"
                                            item-value="value"
                                            item-text="text"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        ></v-autocomplete> 
                                    </v-col>
                                   <v-col class="col-12" sm="12" md="12">
                                        <h6 class="blue-lcd mb-1">Note</h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="note"
                                            persistent-hint
                                            v-model="note"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
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
                    v-model="dialogEdit"
                    persistent
                    max-width="600px"
                >
                    <v-card class="p-2 rounded-l">
                        <v-card-title class="text-center">
                            <v-row>
                                <v-col cols="12">
                                    Edit Environment Variabel
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
                                            disabled
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
                                            disabled
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Variable ID <span class="red--text"><strong>* </strong></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="Variable ID"
                                            persistent-hint
                                            v-model="var_id"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            disabled
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Type Var<strong style="color:red;">*</strong><span></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="type_var"
                                            :items="type_vars"
                                            item-value="value"
                                            item-text="text"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        ></v-autocomplete> 
                                    </v-col>
                                   <v-col class="col-12" sm="12" md="12">
                                        <h6 class="blue-lcd mb-1">Note</h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="note"
                                            persistent-hint
                                            v-model="note"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
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
import { env_var } from "../../../backend-api/env_var/index"
import {application} from "../../../backend-api/sec_appl/master"
import {entity} from "../../../backend-api/entity/master" 

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
                    text: 'Env-Variable',
                    disabled: true,
                }
            ],
            headers:[
                { text: 'Application', value: 'appl_id' , align:'center'},
                { text: 'Var ID', value: 'var_id' , align:'center'},
                { text: 'Var Type', value: 'var_type' , align:'center'},
                { text: 'Note', value: 'note1' , align:'center'},
                { text: 'Status', value: 'status' , align:'left'},
                { text: 'Action', value: 'action' , align:'left'}, 
            ],
            env_vars: [],
            dialog: false,
            dialogfilter: false,
            entity_id: '',
            entities: [],
            menu_caption: '',
            note: '',
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
            var_id: '',
            type_var: '',
            type_vars:[
                {
                    value: 'S',
                    text: 'String'
                },
                {
                    value: 'N',
                    text: 'Number'
                },
                {
                    value: 'D',
                    text: 'Date'
                }
            ],
            detail: null,
            showDetail: false,
            dialogEdit: false,
            disabledAppl: false
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
            this.var_id = ''
            this.type_var = ''
            this.status = ''
            this.note = ''
        },
        detailItem(item){
            this.detail = item
            this.dialog = true
            this.showDetail = true
            this.entity_id = item.entity_id
            this.application = item.appl_id
            this.getApplication()
            this.status = item.active_flag === 'Y' ? true : false
            this.var_id = item.var_id
            this.type_var = item.var_type
            this.note = item.note1
        },
        detailItemEdit(item){
            this.detail = item
            this.dialogEdit = true
            this.entity_id = item.entity_id
            this.application = item.appl_id
            this.getApplication()
            this.status = item.active_flag === 'Y' ? true : false
            this.var_id = item.var_id
            this.type_var = item.var_type
            this.note = item.note1
        },
        async getPullData(){
            this.env_vars = []
            this.$store.dispatch('setOverlay', true)

            var respData = await env_var.fetchEnvVar(`?search=${this.search ? this.search : ''}`, null, false, false, false)
            if (respData.status === 200) {
                this.env_vars = respData.data
                this.$store.dispatch('setOverlay', false)

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
            } else{
                var respData = await application.fetchApplication(`?entity_id=${this.entity_id ? this.entity_id : ''}`, null, false, false, false)
                if (respData.status === 200) {
                    this.applications = respData.data
                }
            }
        },
        async submit(){
            this.$store.dispatch('setOverlay', true)
            this.dialog = false

            if (this.entity_id === '' || this.application === '' || this.status === '' || this.var_id === '' || this.type_var == '') {
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
                'appl_id': this.application,
                'var_id': this.var_id,
                'var_type': this.type_var,
                'note1': this.note,
                'status': this.status === true ? 'Y' : 'N'
            }

            const respData = await env_var.storeEnvVar('', reqBody, false, false, false)

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
        async updateStatusEnvVar(item){
            this.$store.dispatch('setOverlay', true)
            var reqBody = {
                'var_id': item.var_id,
                'appl_id': item.appl_id,
                'status': item.active_flag
            }
            const respData = await env_var.updateEnvVarStatus('', reqBody, false, false, false)
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

            if (this.application === '' || this.status === '' || this.var_id === '' || this.type_var == '') {
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
                'appl_id': this.application,
                'var_id': this.var_id,
                'var_type': this.type_var,
                'note1': this.note,
                'status': this.status === true ? 'Y' : 'N'
            }

            const respData = await env_var.updateEnvVar('', reqBody, false, false, false)

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