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
                        Account Bank
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
                            :items="account_banks"
                            class="elevation-1"
                            :items-per-page="20"
                            :loading="$store.state.overlay"
                            height="600"
                            :divider="true"
                            :light="true"
                            :item-class="tr_datatable"
                        >           
                            <template v-slot:[`item.saldo`]="{ item }">
                                {{ $store.getters.convertToCurrencyUs(item.saldo) }}
                            </template>   
                            <template v-slot:[`item.status`]="{ item }">
                                <v-switch
                                    inset
                                    false-value="N"
                                    true-value="Y"
                                    v-model="item.posting"
                                    @change="updateStatusPosting(item)"
                                    class="mt-1 mb-2"
                                    hide-details="true"
                                    disabled
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
                                        <v-list-item v-if="item.posting === 'N'" @click="detailItemEdit(item)">
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
                                    Account Bank
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
                                            @change="(event) => [getBranchOffice(event)]"
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Office ID <span class="red--text"><strong>* </strong></span></h6>
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
                                        <h6 class="blue-lcd mb-1">No Rekening <span class="red--text"><strong>* </strong></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="No Rekening"
                                            persistent-hint
                                            v-model="no_rekening"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Bank Name <span class="red--text"><strong>* </strong></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="Bank Name"
                                            persistent-hint
                                            v-model="bank_name"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Account Code <span class="red--text"><strong>* </strong></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="ledger"
                                            :items="ledgers"
                                            item-value="ac_num"
                                            :item-text="item => item.ac_num +' - '+ item.ac_name"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            return-object
                                            @change="(event) => [getAccountCode(event)]"
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Saldo <span class="red--text"><strong>* </strong></span></h6>
                                        <div class="v-input ma-0 pa-0 v-input--dense border-12 theme--light v-text-field v-text-field--single-line v-text-field--solo
                                        dense v-text-field--is-booted v-text-field--enclosed">
                                            <div class="v-input__control">
                                                <div class="v-input__slot">
                                                    <div class="v-text-field__slot">
                                                        <money class="" name="amount" v-model.lazy="saldo" v-bind="money"></money>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Account Type <span class="red--text"><strong>* </strong></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="account_type"
                                            :items="account_types"
                                            item-value="value"
                                            :item-text="item => item.value +' - '+ item.text"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Posting <span class="red--text"><strong>* </strong></span></h6>
                                        <v-switch
                                            inset
                                            false-value="N"
                                            true-value="Y"
                                            v-model="status"
                                            class="mt-2 mb-2"
                                            hide-details="true"
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
                                    Edit Account Bank
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
                                            @change="(event) => [getBranchOffice(event)]"
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Office ID <span class="red--text"><strong>* </strong></span></h6>
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
                                        <h6 class="blue-lcd mb-1">No Rekening <span class="red--text"><strong>* </strong></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="No Rekening"
                                            persistent-hint
                                            v-model="no_rekening"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            disabled
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Bank Name <span class="red--text"><strong>* </strong></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="Bank Name"
                                            persistent-hint
                                            v-model="bank_name"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Account Code <span class="red--text"><strong>* </strong></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="ledger"
                                            :items="ledgers"
                                            item-value="ac_num"
                                            :item-text="item => item.ac_num +' - '+ item.ac_name"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            return-object
                                            @change="(event) => [getAccountCode(event)]"
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Saldo <span class="red--text"><strong>* </strong></span></h6>
                                        <div class="v-input ma-0 pa-0 v-input--dense border-12 theme--light v-text-field v-text-field--single-line v-text-field--solo
                                        dense v-text-field--is-booted v-text-field--enclosed">
                                            <div class="v-input__control">
                                                <div class="v-input__slot">
                                                    <div class="v-text-field__slot">
                                                        <money class="" name="amount" v-model.lazy="saldo" v-bind="money"></money>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Account Type <span class="red--text"><strong>* </strong></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="account_type"
                                            :items="account_types"
                                            item-value="value"
                                            :item-text="item => item.value +' - '+ item.text"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            disabled
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Posting <span class="red--text"><strong>* </strong></span></h6>
                                        <v-switch
                                            inset
                                            false-value="N"
                                            true-value="Y"
                                            v-model="status"
                                            class="mt-2 mb-2"
                                            hide-details="true"
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
import {entity} from "../../backend-api/entity/master"
import {office} from "../../backend-api/office/index"
import {account_bank} from "../../backend-api/ledger/account_bank"
import {ledger_coa} from "../../backend-api/ledger/coa/index"
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
            text_dialog:'',
            dialog: false,
            breadcumbs: [
                {
                    text: 'Cash & Bank',
                    disabled: false,
                    href: '/admin/cash_bank',
                },
                {
                    text: 'Account Bank',
                    disabled: true,
                }
            ],
            headers:[
                {
                    text: 'No Rekening',
                    align: 'start',
                    value: 'bank_acc', 
                    align:'left'},
                { text: 'Account Type', value: 'a_type' , align:'left'},
                { text: 'Bank Name', value: 'bank_name' , align:'left'},
                { text: 'Currency', value: 'curr_id' , align:'left'},
                { text: 'Account Code', value: 'acc_code' , align:'left'},
                { text: 'Account Name', value: 'ac_name' , align:'left'},
                { text: 'Status Posting', value: 'status' , align:'left'},
                { text: 'Saldo', value: 'saldo' , align:'right'},
                { text: 'Action', value: 'action' , align:'left'},
            ],
            account_banks: [],
            dialog: false,
            ledger: '',
            ledgers: [],
            no_rekening: '',
            money: {
				decimal: '.',
				thousands: ',',
				prefix: '',
				suffix: '',
				precision: 0,
				masked: false
			},
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
            account_types: [
                {
                    value: 'B',
                    text: 'Bank'
                },
                {
                    value: 'K',
                    text: 'Kas'
                }
            ],
            account_type: '',
            status: 'Y',
            bank_name: '',
            saldo: 0,
            zip_code: '',
            phone: '',
            dialogFilter: false,
            detail: null,
            showDetail: false,
            dialogEdit: false,
            disabledAppl: false,
            fax: '',
            email: '',
            debits: [],
            credits: [],
            entities: [],
            entity_id: '',
            offices: [],
            office_id: '',
            credit_ots: []
        }
    },
    mounted(){
        this.getPullData()
        this.getPullDataLedgerOT()
        this.getAccountLedger()
        this.getEntity()
    },
    methods: {
        tr_datatable(item) {
            const rowClass = 'tr_datatable'
            return rowClass;
        },
        clear(){
            this.account_type = ''
            this.no_rekening = ''
            this.bank_name = ''
            this.ledger = ''
            this.saldo = 0
            this.status = 'Y'
            this.entity_id = ''
            this.office_id = ''
        },
        detailItem(item){
            this.detail = item
            this.dialog = true
            this.showDetail = true
            this.no_rekening = item.bank_acc
            this.bank_name = item.bank_name
            this.getDetailAcNum(item.acc_code)
            // this.ledger = item
            this.getAccountLedger()
            this.saldo = parseFloat(item.saldo)
            this.account_type = item.a_type
            this.status = item.posting
        },
        detailItemEdit(item){
            this.detail = item
            this.dialogEdit = true
            this.no_rekening = item.bank_acc
            this.bank_name = item.bank_name
            // this.ledger = item
            this.getDetailAcNum(item.acc_code)
            this.getAccountLedger()
            this.saldo = parseFloat(item.saldo)
            this.account_type = item.a_type
            this.status = item.posting
        },
        async getAccountLedger(){
            var respData = await ledger_coa.fetchLedgerCoa(`?ac_type=AS`, null, false, false, false)
            if (respData.status === 200) {
                this.ledgers = respData.data.data
            }
        },
        async getDetailAcNum(event){
            var respData = await ledger_coa.fetchLedgerCoa(`?ac_num=${event}`, null, false, false, false)
            if (respData.status === 200) {
                this.ledger = respData.data.data ? respData.data.data[0] : ''
            }
        },
        async getPullData(){
            this.account_banks = []
            this.$store.dispatch('setOverlay', true)
            var respData = await account_bank.index(`?search=${this.search ? this.search : ''}`, null, false, false, false)
            if (respData.status === 200) {
                this.account_banks = respData.data.data
                this.$store.dispatch('setOverlay', false)

            } else{
                this.$store.dispatch('setOverlay', false)
            }
        },
        async getPullDataLedgerOT(){
            this.credits = []
            var respData = await ledger_coa.fetchLedgerCoa(`?ac_type=OT`, null, false, false, false)
            if (respData.status === 200) {
                this.credit_ots = respData.data.data
            }
        },
        async getEntity(){
            var respData = await entity.fetchEntity("", null, false, false, false)
            if (respData.status === 200) {
                this.entities = respData.data
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
            this.debits = []
            this.credits = []

            this.$store.dispatch('setOverlay', true)
            this.dialog = false

            if (this.entity_id === '' || this.office_id === '' || this.no_rekening === '' || this.bank_name === '' || this.ledger === '' || this.account_type == '') {
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

            for (let index = 0; index < this.credit_ots.length; index++) {
                this.credits.push(
                    {
                        ac_par : this.credit_ots[index] ? this.credit_ots[index].ac_par : '',
                        ac_sub_par_one: this.credit_ots[index] ? this.credit_ots[index].ac_sub_par_one : '',
                        ac_num_cr: this.credit_ots[index] ? this.credit_ots[index].ac_num : '',
                        amt_cr: this.saldo,
                        is_del: 0,
                        remark: 'Posting saldo awal'
                    }
                )
                
            }

            this.debits.push(
                {
                    ac_par : this.ledger ? this.ledger.ac_par : '',
                    ac_sub_par_one: this.ledger ? this.ledger.ac_sub_par_one : '',
                    ac_num_dr: this.ledger ? this.ledger.ac_num : '',
                    amt_dr: this.saldo,
                    is_del: 0,
                    remark: 'Posting saldo awal'
                }
            )

            var reqBody = {
                'entity_id': this.entity_id,
                'office_id': this.office_id,
                'a_type': this.account_type,
                'bank_acc': this.no_rekening,
                'bank_name': this.bank_name,
                'curr_id': 'IDR',
                'saldo': this.saldo,
                'acc_code': this.ledger ? this.ledger.ac_num : '',
                'posting': this.status,
                'debit': this.debits,
                'credit': this.credits
            }

            const respData = await account_bank.store('', reqBody, false, false, false)

            if (respData.status === 200) {

                this.snackbar = {
                    color: "success",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: 'Successfully Create Account Bank',
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
        async updateStatusPosting(item){
            this.$store.dispatch('setOverlay', true)
            var reqBody = {
                'a_type': item.a_type,
                'bank_acc': item.bank_acc,
                'bank_name': item.bank_name,
                'curr_id': 'IDR',
                'saldo': parseFloat(item.saldo),
                'acc_code': item.acc_code,
                'posting': item.posting
            }
            const respData = await account_bank.update('', reqBody, false, false, false)
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
            this.debits = []
            this.credits = []

            this.$store.dispatch('setOverlay', true)
            this.dialogEdit = false

            if (this.entity_id === '' || this.office_id === '' || this.no_rekening === '' || this.bank_name === '' || this.ledger === '' || this.account_type == '') {
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

            for (let index = 0; index < this.credit_ots.length; index++) {
                this.credits.push(
                    {
                        ac_par : this.credit_ots[index] ? this.credit_ots[index].ac_par : '',
                        ac_sub_par_one: this.credit_ots[index] ? this.credit_ots[index].ac_sub_par_one : '',
                        ac_num_cr: this.credit_ots[index] ? this.credit_ots[index].ac_num : '',
                        amt_cr: this.saldo,
                        is_del: 0,
                        remark: 'Posting saldo awal'
                    }
                )
                
            }

            this.debits.push(
                {
                    ac_par : this.ledger ? this.ledger.ac_par : '',
                    ac_sub_par_one: this.ledger ? this.ledger.ac_sub_par_one : '',
                    ac_num_dr: this.ledger ? this.ledger.ac_num : '',
                    amt_dr: this.saldo,
                    is_del: 0,
                    remark: 'Posting saldo awal'
                }
            )

            var reqBody = {
                'entity_id': this.entity_id,
                'office_id': this.office_id,
                'a_type': this.account_type,
                'bank_acc': this.no_rekening,
                'bank_name': this.bank_name,
                'curr_id': 'IDR',
                'saldo': this.saldo,
                'acc_code': this.ledger ? this.ledger.ac_num : '',
                'posting': this.status,
                'debit': this.debits,
                'credit': this.credits
            }

            const respData = await account_bank.update('', reqBody, false, false, false)

            if (respData.status === 200) {

                this.snackbar = {
                    color: "success",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: 'Successfully Update Account Bank',
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
        async getAccountCode(event){
            if (event === '' || event === null) {
                this.ledger = null
            } else {
                var data = this.account_banks.filter(i => i.acc_code === event.ac_num)
                if (data.length > 0) {
                    this.snackbar = {
                        color: "error",
                        icon: "mdi-alert-circle",
                        mode: "multi-line",
                        position: "top",
                        timeout: 7500,
                        title: "Error",
                        text: 'Please input different Account',
                        visible: true
                    };
                    this.ledger = null

                }
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