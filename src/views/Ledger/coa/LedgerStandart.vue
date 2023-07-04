<template>
    <div>
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
                <v-spacer></v-spacer>
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
                    dense
                    :headers="headers"
                    :items="ledger_standarts"
                    class="elevation-1 mt-2"
                    :items-per-page="20"
                    :loading="$store.state.overlay"
                    height="578"
                    fixed-header
                    :divider="true"
                    :light="true"
                    :item-class="tr_datatable"
                >                        
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
                            Ledger Standart
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
                                    @change="(event) => getAcNum(event)"
                                ></v-autocomplete> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">AC Num <span class="red--text"><strong>* </strong></span></h6>
                                <v-autocomplete
                                    dense
                                    solo
                                    clearable
                                    v-model="ac_num"
                                    :items="ac_nums"
                                    item-value="ac_num"
                                    item-text="ac_name"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                ></v-autocomplete> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">AC Name <strong style="color:red;">*</strong><span></span></h6>
                                <v-text-field
                                    solo
                                    dense
                                    label="AC Name"
                                    persistent-hint
                                    v-model="ac_name"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                >
                                </v-text-field>
                            </v-col>
                            <v-col class="col-12" sm="12" md="12">
                                <h6 class="blue-lcd mb-1">Divisi <strong style="color:red;">*</strong><span></span></h6>
                                <v-text-field
                                    solo
                                    dense
                                    persistent-hint
                                    v-model="divisi"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                >
                                </v-text-field>
                            </v-col>
                            <!-- <v-col class="col-12" sm="3" md="3">
                                <h6 class="blue-lcd mb-1">Currency</h6>
                                <v-text-field
                                    solo
                                    dense
                                    persistent-hint
                                    v-model="currency"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                    disabled
                                >
                                </v-text-field>
                            </v-col> -->
                        </v-row>
                        <v-row>
                            <v-col class="col-12" sm="12" md="12">
                                <h6 class="blue-lcd mb-1">Remark</h6>
                                <v-textarea 
                                v-model="remark" 
                                solo
                                dense 
                                class="ma-0 pa-0 border-12"
                                ></v-textarea>
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
                        Edit Ledger Standart
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
                                    @change="(event) => getAcNum(event)"
                                    disabled
                                ></v-autocomplete> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">AC Num <span class="red--text"><strong>* </strong></span></h6>
                                <v-autocomplete
                                    dense
                                    solo
                                    clearable
                                    v-model="ac_num"
                                    :items="ac_nums"
                                    item-value="ac_num"
                                    item-text="ac_name"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                    disabled
                                ></v-autocomplete> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">AC Name <strong style="color:red;">*</strong><span></span></h6>
                                <v-text-field
                                    solo
                                    dense
                                    label="AC Name"
                                    persistent-hint
                                    v-model="ac_name"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                    disabled
                                >
                                </v-text-field>
                            </v-col>
                            <v-col class="col-12" sm="12" md="12">
                                <h6 class="blue-lcd mb-1">Divisi <strong style="color:red;">*</strong><span></span></h6>
                                <v-text-field
                                    solo
                                    dense
                                    persistent-hint
                                    v-model="divisi"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                    disabled
                                >
                                </v-text-field>
                            </v-col>
                            <!-- <v-col class="col-12" sm="3" md="3">
                                <h6 class="blue-lcd mb-1">Currency</h6>
                                <v-text-field
                                    solo
                                    dense
                                    persistent-hint
                                    v-model="currency"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                    disabled
                                >
                                </v-text-field>
                            </v-col> -->
                        </v-row>
                        <v-row>
                            <v-col class="col-12" sm="12" md="12">
                                <h6 class="blue-lcd mb-1">Remark</h6>
                                <v-textarea 
                                v-model="remark" 
                                solo
                                dense 
                                class="ma-0 pa-0 border-12"
                                ></v-textarea>
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
                        <v-col cols="12" xs="12" sm="3" md="3">
                            <v-btn block class="rounded-l text-white" color="success" @click="submitEdit()">Save</v-btn>
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
                            Filter Gl Standart
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
                                    @change="(event) => getBranchOffice(event)"
                                ></v-autocomplete> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">Office ID </h6>
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
                                    @change="(event) => getAcNum(event)"
                                ></v-autocomplete> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">AC Num</h6>
                                <v-autocomplete
                                    dense
                                    solo
                                    clearable
                                    v-model="ac_num"
                                    :items="ac_nums"
                                    item-value="ac_num"
                                    item-text="ac_name"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                ></v-autocomplete> 
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions class="text-center">
                    <v-row justify="center">
                        <v-col cols="12" xs="12" sm="3" md="3">
                            <v-btn block class="rounded-l mr-2" color="#fff" @click="[dialogfilter = false, clear()]">Cancel</v-btn>
                        </v-col>
                        <v-col cols="12" xs="12" sm="3" md="3">
                            <v-btn block class="rounded-l text-white" color="#20bf6b" @click="[getPullData(), dialogfilter = false]">Filter</v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import {entity} from "../../../backend-api/entity/master"
import {ledger_coa} from "../../../backend-api/ledger/coa/index"
import {ledger_parent} from "../../../backend-api/ledger/coa/ledger_parent"
import {office} from "../../../backend-api/office/index"
import {ledger_standart} from "../../../backend-api/ledger/coa/ledger_standart"

export default {
    data() {
        return {
            tab: 'tab-1',
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
                    text: 'Ledger',
                    disabled: false,
                    href: '/admin/ledger',
                },
                {
                    text: 'Ledger Standart',
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
                { text: 'AC Num', value: 'ac_num' , align:'left'},
                { text: 'AC Name', value: 'ac_name' , align:'left'},
                { text: 'Curr ID', value: 'curr_id' , align:'left'},
                { text: 'Divisi', value: 'divisi' , align:'left'},
                { text: 'Remark', value: 'remark' , align:'left'},
                { text: 'Action', value: 'action' , align:'left'},
            ],
            ledger_standarts: [],
            showDetail: false,
            entities: [],
            entity_id: '',
            offices: [],
            office_id: '',
            ac_num: '',
            ac_nums: [],
            ac_par: '',
            ac_types: [
                {
                    text: 'AS - Asset',
                    value: 'AS'
                },
                {
                    text: 'EX - Expanse',
                    value: 'EX'
                },
                {
                    text: 'LI - Liability',
                    value: 'LI'
                },
                {
                    text: 'IC - Income',
                    value: 'IC'
                }
            ],  
            ac_type: '',
            ac_name: '',
            tax: '',
            drcrs: [
                {
                    text: 'Debet',
                    value: 'DR'
                },
                {
                    text: 'Credit',
                    value: 'CR'
                },
            ],
            drcr: '',
            currency: 'IDR',
            status: '',
            detail: null,
            showDetail: false,
            dialogEdit: false,
            divisi: '',
            remark: '',
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
            this.office_id = ''
            this.entity_id = ''
            this.ac_num = ''
            this.divisi = ''
            this.ac_name = ''
            this.remark = ''
            this.drcr = ''
            this.currency = 'IDR'
        },
        detailItem(item){
            this.detail = item
            this.dialog = true
            this.showDetail = true
            this.office_id = item.office_id
            this.entity_id = item.entity_id
            this.getBranchOffice()
            this.ac_num = item.ac_num
            this.ac_name = item.ac_name
            this.getAcNum()
            this.divisi = item.divisi
            this.remark = item.remark
            this.drcr = item.drcr
        },
        detailItemEdit(item){
            this.detail = item
            this.dialogEdit = true
            this.office_id = item.office_id
            this.entity_id = item.entity_id
            this.getBranchOffice()
            this.ac_num = item.ac_num
            this.ac_name = item.ac_name
            this.getAcNum()
            this.divisi = item.divisi
            this.remark = item.remark
            this.drcr = item.drcr
        },
        async getEntity(){
            var respData = await entity.fetchEntity("", null, false, false, false)
            if (respData.status === 200) {
                this.entities = respData.data
            }
        },
        async getPullData(){
            this.ledger_standarts = []
            this.$store.dispatch('setOverlay', true)
            var respData = await ledger_standart.fetchLedgerStandart(`?search=${this.search ? this.search : ''}&entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_num=${this.ac_num ? this.ac_num : ''}`, null, false, false, false)
            if (respData.status === 200) {
                this.ledger_standarts = respData.data.data
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
        async getAcNum(event){
            if (event === null || event === '') {
                this.ac_num = ''
            } else{
                var respData = await ledger_coa.fetchLedgerCoa(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}`, null, false, false, false)
                if (respData.status === 200) {
                    this.ac_nums = respData.data.data
                    console.log(this.ac_nums);
                }
            }
        },
        async submit(){
            this.$store.dispatch('setOverlay', true)
            this.dialog = false

            if (this.entity_id === '' || this.office_id === '' || this.ac_num === '' || this.ac_name == '' || this.divisi == '' ) {
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
                'office_id': this.office_id,
                'entity_id': this.entity_id,
                'ac_num': this.ac_num,
                'ac_name': this.ac_name,
                'divisi' : this.divisi,
                'curr_id' : this.currency,
                'remark' : this.remark
            }

            const respData = await ledger_standart.storeLedgerStandart('', reqBody, false, false, false)

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

            if (this.entity_id === '' || this.office_id === '' || this.ac_num === '' || this.ac_name == '' || this.divisi == '' ) {
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
                'office_id': this.office_id,
                'entity_id': this.entity_id,
                'ac_num': this.ac_num,
                'ac_name': this.ac_name,
                'divisi' : this.divisi,
                'curr_id' : this.currency,
                'remark' : this.remark
            }

            const respData = await ledger_standart.updateLedgerStandart('', reqBody, false, false, false)

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