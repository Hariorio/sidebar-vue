<template>
    <div>
        <v-card class="rounded-l elevation-1">
            <v-card-title class="mb-2 pb-0">
                Realisasi Anggaran
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
            </v-card-title>
            <v-card-text>
                <v-data-table
                    :headers="headers"
                    :items="realisasi_anggarans"
                    class="elevation-1"
                    :items-per-page="20"
                    :loading="$store.state.overlay"
                    height="600"
                    :divider="true"
                    :light="true"
                    :item-class="tr_datatable"
                    fixed-header
                >       
                    <template v-slot:[`item.BUDGET_SUBTOTAL`]="{ item }">
                        {{ $store.getters.convertToCurrencyUs(item.BUDGET_SUBTOTAL) }}
                    </template>
                    <template v-slot:[`item.payed`]="{ item }">
                        <!-- {{ item.payed < 0 ? $store.getters.convertToCurrencyUs(item.payed * -1) : $store.getters.convertToCurrencyUs(item.payed) }} -->
                        {{ $store.getters.convertToCurrencyUs(item.payed) }}
                    </template>
                    <template v-slot:[`item.retur`]="{ item }">
                        {{ $store.getters.convertToCurrencyUs(item.retur) }}
                    </template>
                    <template v-slot:[`item.realisasi`]="{ item }">
                        {{ $store.getters.convertToCurrencyUs(item.payed - item.retur) }}
                    </template>
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
                </v-data-table>
            </v-card-text>
        </v-card>
        <v-dialog
            v-model="dialogfilter"
            persistent
            max-width="600px"
            hide-overlay
            transition="dialog-bottom-transition"
            style="border-radius: 0 !important"
        >
            <v-card class="p-2">
                <v-card-title class="text-center">
                    <v-row>
                        <v-col cols="12">
                            <div class="d-flex">
                                Filter Realisasi Anggaran
                                <v-spacer></v-spacer>
                                <v-btn
                                    class="mx-2"
                                    fab
                                    x-small
                                    color="#e83e8c;"
                                    @click="dialogfilter = false"
                                >
                                    <v-icon dark>
                                        mdi-close
                                    </v-icon>
                                </v-btn>
                            </div>
                        </v-col>
                        <v-divider></v-divider>
                    </v-row>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row class="">
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
                                <h6 class="blue-lcd mb-1">Period Budget </h6>
                                <v-menu
                                    ref="modal"
                                    v-model="modal"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="auto"
                                    >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                        solo
                                        dense
                                        v-model="date"
                                        label="Period Budget"
                                        persistent-hint
                                        append-icon="mdi-calendar"
                                        v-bind="attrs"
                                        v-on="on"
                                        class="ma-0 pa-0 border-12"
                                        hide-details=true
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="date"
                                        type="month"
                                        no-title
                                        :allowed-dates="allowedMonths"
                                        @input="[modal = false]"
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">Account </h6>
                                <v-autocomplete
                                    dense
                                    solo
                                    clearable
                                    v-model="ac_num"
                                    :items="ac_nums"
                                    item-value="ac_num"
                                    :item-text="item => item.ac_num +' - ' + item.ac_name"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions class="text-center">
                    <v-container fluid>
                        <v-row justify="center">
                            <v-col cols="12" xs="12" sm="3" md="3">
                                <v-btn block class="rounded-l mr-2" color="#fff" @click="clear()">Clear</v-btn>
                            </v-col>
                            <v-col cols="12" xs="12" sm="3" md="3">
                                <v-btn block class="rounded-l text-white" color="success" @click="[getPullData(), dialogfilter = false]">Search</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { email } from "vee-validate/dist/rules"
import {entity} from "../../../backend-api/entity/master"
import {office} from "../../../backend-api/office/index"
import {ledger_coa} from "../../../backend-api/ledger/coa/index"
import {realisasi_anggaran} from "../../../backend-api/ledger/realisasi_anggaran"
import { Money } from 'v-money'
import {account_bank} from "../../../backend-api/ledger/account_bank"
import {appl_constant} from "../../../backend-api/appl_constant/index"

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
                    text: 'Ledger',
                    disabled: false,
                    href: '/admin/ledger',
                },
                {
                    text: 'Realisasi Anggaran',
                    disabled: true,
                }
            ],
            money: {
				decimal: '.',
				thousands: ',',
				prefix: '',
				suffix: '',
				precision: 0,
				masked: false
			},
            entities: [],
            entity_id: '',
            offices: [],
            office_id: '',
            credit_ots: [],
            headers:[
                // {
                //     text: 'Entity ID',
                //     align: 'start',
                //     value: 'entity_id', 
                //     align:'left'},
                // { text: 'Office ID', value: 'office_id' , align:'left'},
                { text: 'Ac Num', align: 'start', value: 'ac_num' , width: '150', align:'left'},
                { text: 'Period', value: 'period' , align:'left'},
                { text: 'Activity No', value: 'activity_no' , align:'left'},
                { text: 'Reff Activity No', value: 'ref_activity_no' , align:'left'},
                { text: 'Budget Type', value: 'budget_type' , align:'left'},
                { text: 'Executor', value: 'executor' , align:'left'},
                { text: 'Form', value: 'form' , align:'left'},
                { text: 'Remark', value: 'remark' , align:'left'},
                { text: 'Current', value: 'current' , align:'left'},
                { text: 'Expected', value: 'expected' , align:'left'},
                { text: 'Budget Subtotal', value: 'BUDGET_SUBTOTAL' , align:'right'},
                { text: 'Payed', value: 'payed' , align:'right'},
                { text: 'Retur', value: 'retur' , align:'right'},
                { text: 'Realisasi', value: 'realisasi' , align:'right'}
            ],
            headersColumn: {
                // 'Entity ID': 'entity_id',
                // 'Office': 'office_id',
                'AC Num': 'ac_num',
                'Activity No': 'activity_no',
                'Reff Activity No': 'ref_activity_no',
                'Budget Type': 'budget_type',
                'Executor': 'executor',
                'Form': 'form',
                'Remark': 'remark',
                'Current': 'current',
                'Expected': 'expected',
                'BUDGET_SUBTOTAL': 'BUDGET_SUBTOTAL',
                'Pay': 'payed',
                'Retur': 'retur',
                'Realisasi': 'realisasi'
            },
            realisasi_anggarans: [],
            detail: null,
            date_from: '',
            modal: false,
            date_to: '',
            modal_to: false,
            ac_nums: [],
            ac_num: null,
            dialogfilter: false,
            saldo_awal: null,
            modal: false,
            date: '',
            mod_month: '',
        }
    },
    computed:{
        realisasi () {
            return this.realisasi_anggarans.reduce((total, item) => {
                return total + (item.payed - item.retur)
            }, 0)
        }
    },
    async mounted(){
        this.$store.dispatch('setOverlay', true)
        await this.getApplConstant()
        await this.getPullData()
        await this.getEntity()
        this.$store.dispatch('setOverlay', false)
    },
    methods: {
        bidkom(){
            this.bidang = (this.$store.state.user.bidang) ? this.$store.state.user.bidang : ''
            console.log('Bidang')
            console.log(this.bidang)
            this.komisi = (this.$store.state.user.komisi) ? this.$store.state.user.komisi : ''
        },
        tr_datatable(item) {
            const rowClass = 'tr_datatable'
            return rowClass;
        },
        clear(){
            this.entity_id = ''
            this.office_id = ''
            this.ac_num = ''
            this.date = null
        },
        async getApplConstant(){
            var respData = await appl_constant.fetchApplConstant("?key_code=BUDGETCYCLE&key_value=MONTH", null, false, false, false)
            if (respData.status === 200) {
                if (respData.data.data.length > 0) {
                    this.mod_month = parseInt(respData.data.data[0].int1)
                }
            }
        },
        allowedMonths(val) {
            return parseInt(val.split('-')[1], 10) % Number(this.mod_month) === 1
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
                this.ac_par = ''
            } else{
                var respData = await office.fetchOffice(`?entity_id=${this.entity_id ? this.entity_id : ''}`, null, false, false, false)
                if (respData.status === 200) {
                    this.offices = respData.data.data
                }
            }
        },
        async getAcNum(){
            this.ac_nums = []
            this.$store.dispatch('setOverlay', true)
            var respData = await ledger_coa.fetchLedgerCoa(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&bidang=${this.$store.state.user.bidang ? this.$store.state.user.bidang : ''}&komisi=${this.$store.state.user.komisi ? this.$store.state.user.komisi : ''}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}`, null, false, false, false)
            if (respData.status === 200) {
                this.ac_nums = respData.data.data
                this.$store.dispatch('setOverlay', false)

            } else{
                this.$store.dispatch('setOverlay', false)
            }
        },
        async getPullData(){
            this.realisasi_anggarans = []
            this.$store.dispatch('setOverlay', true)

            var respData = await realisasi_anggaran.index(`?search=${this.search ? this.search : ''}&entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_num=${this.ac_num ? this.ac_num : ""}&bidang=${this.$store.state.user.bidang ? this.$store.state.user.bidang : ''}&komisi=${this.$store.state.user.komisi ? this.$store.state.user.komisi : ''}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}&period=${this.date ? new Date(this.date).toISOString().substr(0, 7).replace(/-/g,"") : ''}`, null, false, false, false)
            if (respData.status === 200) {
                this.realisasi_anggarans = respData.data.data
                this.$store.dispatch('setOverlay', false)

            } else{
                this.$store.dispatch('setOverlay', false)
            }
        }, 
        async exportExcel(){
            var respData = await realisasi_anggaran.index(`?search=${this.search ? this.search : ''}&entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_num=${this.ac_num ? this.ac_num : ""}&bidang=${this.$store.state.user.bidang ? this.$store.state.user.bidang : ''}&komisi=${this.$store.state.user.komisi ? this.$store.state.user.komisi : ''}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}&period=${this.date ? new Date(this.date).toISOString().substr(0, 7).replace(/-/g,"") : ''}`, null, false, false, false)
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
@media screen {
  #printSectionMutasi {
    display: none;
   }
}

@media print {
 body * {
  visibility:hidden;
  }
  #printSectionMutasi, #printSectionMutasi * {
    visibility:visible;
  }
  #printSectionMutasi {
    position:absolute;
    left:0;
    top:0;
  }
}
</style>