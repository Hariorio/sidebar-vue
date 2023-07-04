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
                color="#fff"
                class="py-5 mr-3"
                @click="dialogfilter = true"
                >
                    <v-icon>mdi-filter-variant</v-icon>
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
                    :items="ledger_finance"
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
                            Create Finance
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
                                    @change="(event) => Perent(event)"
                                ></v-autocomplete> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">AC Par <strong style="color:red;">*</strong><span></span></h6>
                                <v-autocomplete
                                    dense
                                    solo
                                    clearable
                                    v-model="ac_pars"
                                    :items="perents"
                                    item-value="ac_num"
                                    :item-text="item => item.ac_num +' - '+ item.ac_desc"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                    @change="(event) => coaLedger(event)"
                                ></v-autocomplete> 
                            </v-col>
                              <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">AC Num <strong style="color:red;">*</strong><span></span></h6>
                                <v-autocomplete
                                    dense
                                    solo
                                    clearable
                                    v-model="ac_nums"
                                    :items="datas"
                                    item-value="ac_num"
                                    :item-text="item => item.ac_num +' - '+ item.ac_name"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                    @change="(event) => getcrdr(event)"
                                    return-object
                                ></v-autocomplete> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">Entity ID Acc <strong style="color:red;">*</strong><span></span></h6>
                               <v-text-field
                                    solo
                                    dense
                                    label="Entity Id Acc"
                                    persistent-hint
                                    v-model="entacc"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                >
                                </v-text-field>
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">Grup ID<span class="red--text"><strong>* </strong></span></h6>
                                <v-text-field
                                    solo
                                    dense
                                    label="AC Num"
                                    persistent-hint
                                    v-model="grups"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                >
                                </v-text-field>
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">Debet / Credit <span class="red--text"><strong>* </strong></span></h6>   
                                <v-radio-group
                                    v-model="drcr"
                                    row
                                    dense
                                    hide-details=true
                                    class="pt-2 pb-0 mt-0"
                                >
                                    <v-radio
                                        label="DR - Debet"
                                        value="DR"
                                        class="pt-0 pb-0 mt-0"
                                    ></v-radio>
                                    <v-radio
                                        label="CR - Credit"
                                        value="CR"
                                        class="pt-0 pb-0 mt-0"
                                    ></v-radio>
                                </v-radio-group>
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
            v-model="dialogedit"
            persistent
            max-width="600px"
        >
            <v-card class="p-2 rounded-l">
                <v-card-title class="text-center">
                    <v-row>
                        <v-col cols="12">
                        Edit Ledger Finance
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
                                    disabled
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
                                    disabled
                                    clearable
                                    v-model="office_id"
                                    :items="offices"
                                    item-value="office_id"
                                    item-text="office"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                    @change="(event) => Perent(event)"
                                ></v-autocomplete> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                             <h6 class="blue-lcd mb-1">AC Par <strong style="color:red;">*</strong><span></span></h6>
                                <v-autocomplete
                                    dense
                                    solo
                                    clearable
                                    v-model="ac_pars"
                                    :items="perents"
                                    item-value="ac_num"
                                    :item-text="item => item.ac_num +' - '+ item.ac_desc"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                    disabled
                                    @change="(event) => coaLedger(event)"
                                ></v-autocomplete> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">AC Num <strong style="color:red;">*</strong><span></span></h6>
                                <v-autocomplete
                                    dense
                                    solo
                                    clearable
                                    v-model="ac_nums"
                                    :items="datas"
                                    item-value="ac_num"
                                    :item-text="item => item.ac_num +' - '+ item.ac_name"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                    @change="(event) => getcrdr(event)"
                                    disabled
                                ></v-autocomplete>
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">Entity ID Acc <strong style="color:red;">*</strong><span></span></h6>
                               <v-text-field
                                    solo
                                    dense
                                    disabled
                                    label="Entity Id Acc"
                                    persistent-hint
                                    v-model="entacc"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                >
                                </v-text-field>
                            </v-col>
                                <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">Grup ID<span class="red--text"><strong>* </strong></span></h6>
                                <v-text-field
                                    solo
                                    dense
                                    disabled
                                    label="Grup ID"
                                    persistent-hint
                                    v-model="grups"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                >
                                </v-text-field>
                            </v-col>
                              <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">Debet / Credit <span class="red--text"><strong>* </strong></span></h6>   
                                <v-radio-group
                                    v-model="drcr"
                                    row
                                    dense
                                    hide-details=true
                                    class="pt-2 pb-0 mt-0"
                                >
                                    <v-radio
                                        label="DR - Debet"
                                        value="DR"
                                        class="pt-0 pb-0 mt-0"
                                    ></v-radio>
                                    <v-radio
                                        label="CR - Credit"
                                        value="CR"
                                        class="pt-0 pb-0 mt-0"
                                    ></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                        <small class="mt-1 pt-1">*indicates required field</small>

                    </v-container>
                </v-card-text>
                <v-card-actions class="text-center">
                    <v-row justify="center">
                        <v-col cols="12" xs="12" sm="3" md="3">
                            <v-btn block class="rounded-l mr-2" color="#fff" @click="dialogedit = false">Cancel</v-btn>
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
                            Filter Gl Finance
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
                                    @change="(event) => Perent(event)"
                                ></v-autocomplete> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">AC Par </h6>
                                <v-autocomplete
                                    dense
                                    solo
                                    clearable
                                    v-model="ac_pars"
                                    :items="perents"
                                    item-value="ac_num"
                                    :item-text="item => item.ac_num +' - '+ item.ac_desc"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                    @change="(event) => coaLedger(event)"
                                ></v-autocomplete> 
                            </v-col>
                              <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">AC Num </h6>
                                <v-autocomplete
                                    dense
                                    solo
                                    clearable
                                    v-model="ac_nums"
                                    :items="datas"
                                    item-value="ac_num"
                                    :item-text="item => item.ac_num +' - '+ item.ac_name"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                    @change="(event) => getcrdr(event)"
                                    return-object
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
import {ledger_finance} from "../../../backend-api/ledger/coa/ledger_finance"
import {office} from "../../../backend-api/office/index"


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
                    text: 'Chart of Accounts',
                    disabled: true,
                }
            ],
            headers:[
                {
                    text: 'Entity ID',
                    align: 'start',
                    value: 'entity_id', 
                    align:'left'},
                { text: 'Entity_ID_Acc', value: 'entity_id_acc' , align:'left'},
                { text: 'Office ID', value: 'office_id' , align:'left'},
                { text: 'Grup ID', value: 'group_id' , align:'left'},
                { text: 'Ac Num', value: 'ac_num' , align:'left'},
                { text: 'Ac Par', value: 'ac_par' , align:'left'},
                { text: 'DRCR', value: 'drcr' , align:'left'},
                { text: 'Action', value: 'action' , align:'left'},
            ],
            headersColumn: {
                'Entity ID': 'entity_id',
                'Office': 'office_id',
                'Entity_ID_Acc': 'entity_id_acc',
                'Grup ID': 'group_id',
                'AC Par': 'ac_par',
                'AC Num': 'ac_num',
                'Dr Cr': 'drcr'
            },
            ledger_finance: [],
            ledger_parents:[],
            datas:[],
            perents:[],
            showDetail: false,
            entities: [],
            entity_id: '',
            offices: [],
            office_id: '',
            grups:'',
            entacc:'',
            ac_nums: '',
            ac_num:'',
            ac_pars:'',
            numms:'',
            gegeg:'',
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
            drcr:'',
            currency: 'IDR',
            status: '',
            detail: null,
            showDetail: false,
            dialogedit: false,
            dialogfilter: false
        }
    },
    mounted(){
        this.getPullData()
        this.getEntity()
       // this.Perent()
      
    },
    methods: {
        tr_datatable(item) {
            const rowClass = 'tr_datatable'
            return rowClass;
        },
        clear(){
            this.office_id = ''
            this.entity_id = ''
            this.ac_nums = ''
            this.ac_pars = ''
            this.entacc = ''
            this.grups = ''
            this.drcr = ''
           
        },
        detailItem(item){
            this.detail = item
            this.dialog = true
            this.showDetail = true
            this.office_id = item.office_id
            this.entity_id = item.entity_id
            this.getBranchOffice()
            this.entity_id = item.entity_id
            this.Perent()
            this.ac_pars = item.ac_par
            this.ac_nums = item.ac_num
            this.gegeg = item.ac_par
            this.coaLedger()
            this.getcrdr()
            this.drcr = item.drcr
            this.entacc = item.entity_id_acc
            this.grups = item.group_id
        },
        detailItemEdit(item){
            console.log(item)
            this.dialogedit = true
            this.office_id = item.office_id
            this.getBranchOffice()
            this.entity_id = item.entity_id
            this.Perent()
            this.ac_pars = item.ac_par
            this.ac_nums = item.ac_num
            this.gegeg = item.ac_par
            this.getcrdr()
            this.coaLedger()
            this.drcr = item.drcr
            this.entacc = item.entity_id_acc
            this.grups = item.group_id
        },
        async getEntity(){
            var respData = await entity.fetchEntity("", null, false, false, false)
            if (respData.status === 200) {
                this.entities = respData.data
            }
        },

        async coaLedger(event){
            console.log(event);
            if (event === null || event === '') {
                this.ac_nums = ''

                var respData = await ledger_coa.fetchLedgerCoa(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_par=${this.ac_pars ? this.ac_pars : ''}`, null, false, false, false)
                if (respData.status === 200) {
                // / console.log(respData)
                 this.datas = respData.data.data

                }
            } else{
                var respData = await ledger_coa.fetchLedgerCoa(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_par=${this.ac_pars ? this.ac_pars : ''}`, null, false, false, false)
                if (respData.status === 200) {
                // / console.log(respData)
                 this.datas = respData.data.data

                }
            }
        },

        async getcrdr(event){
           this.drcr = event.drcr
        
        },

        async Perent(event){
            if (event === null || event === '') {
                this.ac_pars = ''
            } else{
                var respData = await ledger_parent.fetchLedgerParent(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}`, null, false, false, false)
                if (respData.status === 200) {
                this.perents = respData.data.data

                }
            }

            this.coaLedger(event)
        },

        async getPullData(){
            this.ledger_finance = []
            this.$store.dispatch('setOverlay', true)

            var respData = await ledger_finance.fetchLedgerFinance(`?search=${this.search ? this.search : ''}&entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_par=${this.ac_pars ? this.ac_pars : ''}&ac_num=${this.ac_nums ? this.ac_nums.ac_num : ''}`, null, false, false, false)
            if (respData.status === 200) {
                console.log(respData)
                this.ledger_finance = respData.data.data
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
           // console.log(this.ac_nums.ac_num)
            this.$store.dispatch('setOverlay', true)
            this.dialog = false

            if (this.entity_id == '' || this.entity_id === '' || this.entity_id_acc === '') {
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
                'entity_id_acc' :  this.entacc,
                'group_id': this.grups,
                'ac_par': this.ac_pars,
                'drcr' : this.drcr, 
                'ac_num': this.ac_nums.ac_num
            }

            const respData = await ledger_finance.storeLedgerFinance('', reqBody, false, false, false)

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
        async updateStatusCoa(item){
            this.$store.dispatch('setOverlay', true)
            var reqBody = {
                'office_id': item.office_id,
                'entity_id': item.entity_id,
                'ac_num': item.ac_num,
                'ac_par': item.ac_par,
                'active_flag': item.active_flag,
                'ac_type': item.ac_type,
                'ac_name': item.ac_name,
                'tax': item.tax,
                'drcr' : item.drcr,
                'curr_id' : item.curr_id
            }
            const respData = await ledger_coa.updateLedgerCoa('', reqBody, false, false, false)
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
            this.dialogedit = false

            if  (this.entity_id == '' || this.office_id === '' ) {
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
                'office_id': this.office_id,
                'entity_id': this.entity_id,
                'entity_id_acc': this.entacc,
                'group_id': this.grups,
                'ac_num': this.ac_nums,
                'ac_par': this.ac_pars,
                'drcr': this.drcr,
            }

            const respData = await ledger_finance.updateLedgerFinance('', reqBody, false, false, false)

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
        },
        async exportExcel(){
            var respData = await ledger_finance.fetchLedgerFinance(`?search=${this.search ? this.search : ''}&entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_par=${this.ac_pars ? this.ac_pars : ''}&ac_num=${this.ac_nums ? this.ac_nums.ac_num : ''}`, null, false, false, false)
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