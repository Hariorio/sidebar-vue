<template>
    <v-container fluid class="mt-1 mb-5">
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
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-tabs
                    v-model="tab"
                    color="#027fb3"
                    icons-and-text
                    class="round_top col-sm-no-padding"
                    show-arrows
                >
                    <v-tabs-slider color="primary"></v-tabs-slider>

                    <v-tab href="#tab-1" active-class="active-tab">
                        Activity Budget Item Master
                    </v-tab>

                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item
                        value="tab-1"
                    >
                        <v-card class="rounded-l elevation-5">
                            <v-card-title>
                                <v-text-field
                                    solo
                                    class="border-12 mb-2"
                                    v-model="search"
                                    append-icon="mdi-magnify"
                                    label="Search"
                                    single-line
                                    hide-details
                                    style="max-width:400px"
                                    @keyup.enter="getPullData()"
                                
                                ></v-text-field>
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
                                color="#005c37"
                                class="py-5 mr-3 text-white"
                                >
                                    <v-icon>mdi-file-excel</v-icon>
                                    <download-excel
                                        class="text"
                                        :fetch           = "exportExcel"
                                        :fields="headersColumn"
                                        :before-generate = "startDownload"
                                        :before-finish   = "finishDownload">
                                        Export Excel
                                    </download-excel>
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
                                    :items="item_masters"
                                    class="elevation-1 mt-2"
                                    :items-per-page="20"
                                    :loading="$store.state.overlay"
                                    height="578"
                                    fixed-header
                                    :divider="true"
                                    :light="true"
                                    :item-class="tr_datatable"
                                >               
                                    <template v-slot:[`item.activity_price`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.activity_price) }}
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
                                                    class="text-center"
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
                                            Activity Budget Item Master
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
                                                    @change="(event) => getBranchOffice(event)"
                                                ></v-autocomplete> 
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">Office ID <strong style="color:red;">*</strong><span></span></h6>
                                                <v-autocomplete
                                                    dense
                                                    solo
                                                    clearable
                                                    v-model="office_id"
                                                    :items="offices"
                                                    item-value="office_id"
                                                    item-text="office"
                                                    class="ma-0 pa-0 border-12"
                                                    hide-details=true
                                                ></v-autocomplete> 
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">Description <strong style="color:red;">*</strong><span></span></h6>
                                                <v-text-field
                                                    solo
                                                    dense
                                                    label="Desc"
                                                    persistent-hint
                                                    v-model="activity_item_desc"
                                                    class="ma-0 pa-0 border-12"
                                                    hide-details=true
                                                >
                                                </v-text-field>
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">Price<span class="red--text"><strong>* </strong></span></h6>   
                                                <div class="v-input ma-0 pa-0 v-input--dense border-12 theme--light v-text-field v-text-field--single-line v-text-field--solo
                                                dense v-text-field--is-booted v-text-field--enclosed">
                                                    <div class="v-input__control">
                                                        <div class="v-input__slot">
                                                            <div class="v-text-field__slot">
                                                                <money class="" name="activity_price" v-model.lazy="activity_price" v-bind="money"></money>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </v-col>
                                        </v-row>
                                        <small class="mt-1 pt-1">*indicates required field</small>

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
                                            Edit Activity Budget Item Master
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
                                                    @change="(event) => getBranchOffice(event)"
                                                    disabled
                                                ></v-autocomplete> 
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">Office ID <strong style="color:red;">*</strong><span></span></h6>
                                                <v-autocomplete
                                                    dense
                                                    solo
                                                    clearable
                                                    v-model="office_id"
                                                    :items="offices"
                                                    item-value="office_id"
                                                    item-text="office"
                                                    class="ma-0 pa-0 border-12"
                                                    hide-details=true
                                                    disabled
                                                ></v-autocomplete> 
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">Description <strong style="color:red;">*</strong><span></span></h6>
                                                <v-text-field
                                                    solo
                                                    dense
                                                    label="Desc"
                                                    persistent-hint
                                                    v-model="activity_item_desc"
                                                    class="ma-0 pa-0 border-12"
                                                    hide-details=true
                                                >
                                                </v-text-field>
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">Price<span class="red--text"><strong>* </strong></span></h6>   
                                                <div class="v-input ma-0 pa-0 v-input--dense border-12 theme--light v-text-field v-text-field--single-line v-text-field--solo
                                                dense v-text-field--is-booted v-text-field--enclosed">
                                                    <div class="v-input__control">
                                                        <div class="v-input__slot">
                                                            <div class="v-text-field__slot">
                                                                <money class="" name="activity_price" v-model.lazy="activity_price" v-bind="money"></money>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </v-col>
                                        </v-row>
                                        <small class="mt-1 pt-1">*indicates required field</small>

                                    </v-container>
                                </v-card-text>
                                <v-card-actions class="text-center">
                                    <v-row justify="center">
                                        <v-col cols="12" xs="12" sm="3" md="3">
                                            <v-btn block class="rounded-l mr-2" color="#fff" @click="[dialogEdit = false, clear()]">Cancel</v-btn>
                                        </v-col>
                                        <v-col cols="12" xs="12" sm="3" md="3" v-if="showDetail == false">
                                            <v-btn block class="rounded-l text-white" color="success" @click="submitEdit()">Save</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-tab-item>
                </v-tabs-items>
            </v-col>
        </v-row>
                
    </v-container>
</template>
<script>
import {entity} from "../../../backend-api/entity/master"
import {office} from "../../../backend-api/office/index"
import {activity_item_master} from "../../../backend-api/ledger/coa/activity_item_master"
import { Money } from 'v-money'

export default {
    components: {
        Money
    },
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
            dialog: false,
            tab: 'tab-1',
            breadcumbs: [
                {
                    text: 'Budget',
                    disabled: false,
                    href: '/admin/budget',
                },
                {
                    text: 'Master Budget',
                    disabled: true,
                }
            ],
            headers:[
                {
                    text: 'Entity ID',
                    align: 'start',
                    value: 'entity_id', 
                    align:'left'},
                { text: 'Office', value: 'office' , align:'left'},
                { text: 'Description', value: 'activity_item_desc' , align:'left'},
                { text: 'Price', value: 'activity_price' , align:'right'},
                { text: 'Action', value: 'action' , align:'left', width:'20'},
            ],
            headersColumn: {
                'Entity ID': 'entity_id',
                'Office': 'office',
                'Description': 'activity_item_desc',
                'Price': 'activity_price'
            },
            item_masters: [],
            showDetail: false,
            entities: [],
            entity_id: '',
            offices: [],
            office_id: '',
            activity_item_desc: '',
            activity_price: 0,
            money: {
				decimal: '.',
				thousands: ',',
				prefix: '',
				suffix: '',
				precision: 0,
				masked: false
			},
            detail: null,
            showDetail: false,
            dialogEdit: false,
            dialogfilter: false
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
            this.office_id = ''
            this.activity_item_desc = ''
            this.activity_price = ''
        },
        detailItem(item){
            this.detail = item
            this.dialog = true
            this.showDetail = true
            this.entity_id = item.entity_id
            this.office_id = item.office_id
            this.activity_item_desc = item.activity_item_desc
            this.activity_price = parseFloat(item.activity_price)
            this.getBranchOffice()
        },
        detailItemEdit(item){
            this.detail = item
            this.dialogEdit = true
            this.entity_id = item.entity_id
            this.office_id = item.office_id
            this.activity_item_desc = item.activity_item_desc
            this.activity_price = parseFloat(item.activity_price)
            this.getBranchOffice()
        },
        async getEntity(){
            var respData = await entity.fetchEntity("", null, false, false, false)
            if (respData.status === 200) {
                this.entities = respData.data
            }
        },
        async getPullData(){
            this.item_masters = []
            this.$store.dispatch('setOverlay', true)
        
            var respData = await activity_item_master.index(`?search=${this.search ? this.search : ''}&entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}`, null, false, false, false)
            if (respData.status === 200) {
                this.item_masters = respData.data.data
                this.$store.dispatch('setOverlay', false)
                this.clear()
            } else{
                this.$store.dispatch('setOverlay', false)
            }
        },
        async getBranchOffice(event){
            if (event === null || event === '') {
                this.office_id = ''
            } else{
                var respData = await office.fetchOffice(`?entity_id=${this.entity_id ? this.entity_id : ''}`, null, false, false, false)
                if (respData.status === 200) {
                    this.offices = respData.data.data
                }
            }
        },
        async submit(){
            this.$store.dispatch('setOverlay', true)
            this.dialog = false

            if (this.entity_id === '' || this.office_id === '' || this.activity_item_desc === '' || this.activity_price === 0 ) {
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
                'office_id': this.office_id,
                'activity_item_desc': this.activity_item_desc,
                'activity_price' : this.activity_price
            }

            const respData = await activity_item_master.store('', reqBody, false, false, false)

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

            if (this.entity_id === '' || this.office_id === '' || this.activity_item_desc === '' || this.activity_price === 0 ) {
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
                'entity_id': this.entity_id,
                'office_id': this.office_id,
                'activity_item_desc': this.activity_item_desc,
                'activity_price' : this.activity_price,
                'activity_item_id': this.detail ? this.detail.activity_item_id : ''
            }

            const respData = await activity_item_master.update('', reqBody, false, false, false)

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
        },
        async exportExcel(){
            var respData = await activity_item_master.index(`?search=${this.search ? this.search : ''}&entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}`, null, false, false, false)
            if (respData.status === 200) {
                return respData.data.data
            }
        },
        startDownload(){
            this.$store.dispatch('setOverlay', true)
        },
        finishDownload(){
            this.$store.dispatch('setOverlay', false)
        },
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