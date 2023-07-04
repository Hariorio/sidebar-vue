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
                        Branch Office
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
                            dense
                            :headers="headers"
                            :items="offices"
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
                                    @change="updateStatusOffice(item)"
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
                                    Branch Office
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
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Name Office <span class="red--text"><strong>* </strong></span></h6>
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
                                    <v-col class="col-12" sm="12" md="12">
                                        <h6 class="blue-lcd mb-1">Address <span class="red--text"><strong>* </strong></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            persistent-hint
                                            v-model="address"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="4" md="4">
                                        <h6 class="blue-lcd mb-1">City <span class="red--text"><strong>* </strong></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            persistent-hint
                                            v-model="city"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="4" md="4">
                                        <h6 class="blue-lcd mb-1">Zip Code <span class="red--text"><strong>* </strong></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            persistent-hint
                                            v-model="zip_code"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="4" md="4">
                                        <h6 class="blue-lcd mb-1">Phone <span class="red--text"><strong>* </strong></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            persistent-hint
                                            v-model="phone"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Fax </h6>
                                        <v-text-field
                                            solo
                                            dense
                                            persistent-hint
                                            v-model="fax"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Email <span class="red--text"><strong>* </strong></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            persistent-hint
                                            v-model="email"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="12" md="12">
                                        <v-switch
                                            inset
                                            v-model="status"
                                            false-value="N"
                                            true-value="Y"
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
                <!-- <v-dialog
                    v-model="dialogFilter"
                    persistent
                    max-width="600px"
                >
                    <v-card class="p-2 rounded-l">
                        <v-card-title class="text-center">
                            <v-row>
                                <v-col cols="12">
                                    Filter Application
                                </v-col>
                                <v-divider></v-divider>
                            </v-row>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row class="mt-2">
                                    <v-col class="col-12" sm="12" md="12">
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
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="12" md="12">
                                        <v-switch
                                            inset
                                            v-model="status"
                                            label="Status"
                                        ></v-switch>
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
                                    <v-btn block class="rounded-l text-white" color="success" @click="[dialogFilter = false, getPullData()]">Search</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-dialog> -->
                <v-dialog
                    v-model="dialogEdit"
                    persistent
                    max-width="600px"
                >
                    <v-card class="p-2 rounded-l">
                        <v-card-title class="text-center">
                            <v-row>
                                <v-col cols="12">
                                    Edit Branch Office
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
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Name Office <span class="red--text"><strong>* </strong></span></h6>
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
                                    <v-col class="col-12" sm="12" md="12">
                                        <h6 class="blue-lcd mb-1">Address <span class="red--text"><strong>* </strong></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            persistent-hint
                                            v-model="address"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="4" md="4">
                                        <h6 class="blue-lcd mb-1">City <span class="red--text"><strong>* </strong></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            persistent-hint
                                            v-model="city"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="4" md="4">
                                        <h6 class="blue-lcd mb-1">Zip Code <span class="red--text"><strong>* </strong></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            persistent-hint
                                            v-model="zip_code"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="4" md="4">
                                        <h6 class="blue-lcd mb-1">Phone <span class="red--text"><strong>* </strong></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            persistent-hint
                                            v-model="phone"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Fax </h6>
                                        <v-text-field
                                            solo
                                            dense
                                            persistent-hint
                                            v-model="fax"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Email <span class="red--text"><strong>* </strong></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            persistent-hint
                                            v-model="email"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="12" md="12">
                                        <v-switch
                                            inset
                                            v-model="status"
                                            false-value="N"
                                            true-value="Y"
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
import { email } from "vee-validate/dist/rules"
import {entity} from "../../../backend-api/entity/master" 
import {office} from "../../../backend-api/office/index"

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
                    text: 'Branch Office',
                    disabled: true,
                }
            ],
            headers:[
                {
                    text: 'Entity ID',
                    align: 'start',
                    value: 'entity_id', 
                    align:'center'},
                { text: 'Office', value: 'office' , align:'center'},
                { text: 'Address', value: 'address' , align:'center'},
                { text: 'City', value: 'city' , align:'center'},
                { text: 'Zip Code', value: 'zip_code' , align:'center'},
                { text: 'Phone', value: 'phone' , align:'center'},
                { text: 'Fax', value: 'fax' , align:'center'},
                { text: 'Email', value: 'e_mail' , align:'center'},
                { text: 'Status', value: 'status' , align:'left'},
                { text: 'Action', value: 'action' , align:'left'},
            ],
            offices: [],
            dialog: false,
            entity_id: '',
            entities: [],
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
            status: false,
            address: '',
            city: '',
            zip_code: '',
            phone: '',
            dialogFilter: false,
            detail: null,
            showDetail: false,
            dialogEdit: false,
            disabledAppl: false,
            fax: '',
            email: ''
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
            this.name = ''
            this.status = ''
            this.address = ''
            this.city = ''
            this.zip_code = ''
            this.email = ''
            this.fax = ''
            this.phone = ''
        },
        detailItem(item){
            console.log(item);
            this.detail = item
            this.dialog = true
            this.showDetail = true
            this.entity_id = item.entity_id
            this.name = item.office
            this.status = item.active_flag
            this.address = item.address
            this.city = item.city
            this.zip_code = item.zip_code
            this.email = item.e_mail
            this.fax = item.fax
            this.phone = item.phone
        },
        detailItemEdit(item){
            this.detail = item
            this.dialogEdit = true
            this.entity_id = item.entity_id
            this.name = item.office
            this.status = item.active_flag
            this.address = item.address
            this.city = item.city
            this.zip_code = item.zip_code
            this.email = item.e_mail
            this.fax = item.fax
            this.phone = item.phone
        },
        async getEntity(){
            var respData = await entity.fetchEntity("", null, false, false, false)
            if (respData.status === 200) {
                this.entities = respData.data
            }
        },
        async getPullData(){
            this.offices = []
            this.$store.dispatch('setOverlay', true)
            var respData = await office.fetchOffice(`?search=${this.search ? this.search : ''}`, null, false, false, false)
            if (respData.status === 200) {
                this.offices = respData.data.data
                this.$store.dispatch('setOverlay', false)

            } else{
                this.$store.dispatch('setOverlay', false)
            }
        },
        async submit(){
            this.$store.dispatch('setOverlay', true)
            this.dialog = false

            if (this.entity_id === '' || this.name === '' || this.status === '' || this.address === '' || this.city == '' || this.zip_code == '' || this.phone == '' || this.email == '') {
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
                'office_type': 'S',
                'office': this.name,
                'active_flag': this.status,
                'address': this.address,
                'city': this.city,
                'zip_code': this.zip_code,
                'phone': this.phone,
                'e_mail': this.email,
                'fax': this.fax ? this.fax : ''
            }

            const respData = await office.storeOffice('', reqBody, false, false, false)

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
        async updateStatusOffice(item){
            this.$store.dispatch('setOverlay', true)
            var reqBody = {
                'office_id': item.office_id,
                'entity_id': item.entity_id,
                'office_type': item.office_type,
                'office': item.office,
                'active_flag': item.active_flag,
                'address': item.address,
                'city': item.city,
                'zip_code': item.zip_code,
                'phone': item.phone,
                'e_mail': item.e_mail,
                'fax': item.fax
            }
            const respData = await office.updateOffice('', reqBody, false, false, false)
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

            if (this.entity_id === '' || this.name === '' || this.status === '' || this.address === '' || this.city == '' || this.zip_code == '' || this.phone == '' || this.email == '') {
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
                'office_id': this.detail.office_id,
                'entity_id': this.entity_id,
                'office_type': 'S',
                'office': this.name,
                'active_flag': this.status,
                'address': this.address,
                'city': this.city,
                'zip_code': this.zip_code,
                'phone': this.phone,
                'e_mail': this.email,
                'fax': this.fax ? this.fax : ''
            }

            const respData = await office.updateOffice('', reqBody, false, false, false)

            if (respData.status === 200) {
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
                this.dialogEdit = false
                this.clear()

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