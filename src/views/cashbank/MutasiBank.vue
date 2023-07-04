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
                <v-card class="rounded-l elevation-1">
                    <v-card-title class="mb-0 pb-0">
                       Mutasi Kas & Bank
                        <v-spacer></v-spacer>
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
                        @click="printTicket()"
                        >
                            Print
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-row align="center" justify="center" class="m-4">
                            <div id="divPrintMutasi" class="table-responsive">
                                <table width="100%" cellspacing="0" cellpadding="0" class="container" style="width: 100%; margin-top: 20px; padding: 20px;border: 1px solid #DDD;font-size: 14px;">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table width="100%" cellspacing="0" cellpadding="0" style="width: 100%; padding-bottom: 10px;border-bottom: 1px solid #DDD;">
                                                    <tbody>
                                                        <tr style="margin-top: 8px; margin-bottom: 8px;">
                                                            <td style="width: 95%;">
                                                                <div class="d-flex">
                                                                    <img src="../../assets/logo_gki.png" height="60px" alt="">
                                                                    <p class="mt-4 ml-4">{{ this.entity_id }}</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table width="100%" cellspacing="0" cellpadding="0" style="width: 100%; margin: 10px 0;">
                                                    <tbody>
                                                        <tr style="margin-top: 8px; margin-bottom: 8px;">
                                                            <td style="width:5%; padding-left: 5px;">
                                                                Entity
                                                            </td>
                                                            <td style="width:1%">
                                                                :
                                                            </td>
                                                            <td style="width:30%">
                                                                {{ this.entity_id }}
                                                            </td>
                                                        </tr>   
                                                        <tr>
                                                            <td style="width:5%; padding-left: 5px;">
                                                                Office
                                                            </td>
                                                            <td style="width:1%">
                                                                :
                                                            </td>
                                                            <td style="width:30%">
                                                                {{ this.office_id ? this.office_id.office : '' }}
                                                            </td>
                                                        </tr>  
                                                        <tr>
                                                            <td style="width:5%; padding-left: 5px;">
                                                                Tanggal
                                                            </td>
                                                            <td style="width:1%">
                                                                :
                                                            </td>
                                                            <td style="width:30%">
                                                                {{ this.date_from ? new Date(this.date_from).toISOString().substr(0, 10) : '-' }} sd {{ this.date_to ? new Date(this.date_to).toISOString().substr(0, 10) : '-' }}
                                                            </td>
                                                        </tr>     
                                                        <tr>
                                                            <td style="width:5%; padding-left: 5px;">
                                                                Account
                                                            </td>
                                                            <td style="width:1%">
                                                                :
                                                            </td>
                                                            <td style="width:30%">
                                                                {{ this.ac_num ? this.ac_num.acc_code : '' }} {{ this.ac_num ? this.ac_num.bank_name : '-' }}
                                                            </td>
                                                        </tr>                                                     
                                                    </tbody>
                                                </table>
                                                <table width="100%" cellspacing="0" cellpadding="0" style="width: 100%; margin: 10px 0 0 0;border-top: 1px solid #DDD;">
                                                    <thead>
                                                        <tr style="border-bottom: 1px solid #DDD;">
                                                            <th class="text-left" style="width:15%; padding: 10px 10px;" >
                                                                No Jurnal
                                                            </th>
                                                            <th class="text-left"  style="width:15%; padding: 10px 10px;">
                                                                Tanggal
                                                            </th>
                                                            <th class="text-left"  style="width:15%; padding: 10px 10px;">
                                                                Keterangan
                                                            </th>
                                                            <th class="text-right" style="width:15%; padding: 10px 10px;text-align: right;">
                                                                Debet
                                                            </th>
                                                            <th class="text-right"  style="width:15%; padding: 10px 10px;text-align: right;">
                                                                Kredit
                                                            </th>
                                                            <th class="text-right"  style="width:15%;text-align: right; padding: 10px 10px;">
                                                                Saldo
                                                            </th>                                                
                                                        </tr>
                                                    </thead>  
                                                    <tbody>
                                                        <tr class="table-active">
                                                            <td colspan="5" class="text-left" style="padding: 5px 10px;">
                                                                <strong>Saldo Awal</strong>
                                                            </td>
                                                            <td class="text-right" style="padding: 5px 10px;text-align: right;">
                                                                <strong>{{ this.saldo_awal ? $store.getters.convertToCurrencyUs(this.saldo_awal.OPENING) : '-' }}</strong>
                                                            </td>
                                                        </tr>
                                                        <tr 
                                                            v-for="(detail, index) in mutasi_banks"
                                                            :key="index"
                                                        >
                                                            <td class="text-left" style="width:5%; padding: 5px 10px;">
                                                                {{ detail.SOURCE_NUM }}
                                                            </td>
                                                            <td class="text-left"  style="width:15%; padding: 5px 10px;">
                                                                {{ detail.TR_DATE ? (new Date(new Date(detail.TR_DATE) - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) : '-'}}
                                                            </td>
                                                            <td class="text-left"  style="width:15%; padding: 5px 10px;">
                                                                {{detail.MEMO_TXT}} {{detail.activity_remark}}
                                                            </td>
                                                            <td class="text-right" style="width:15%; padding: 5px 10px;text-align: right;">
                                                                {{$store.getters.convertToCurrencyUs(detail.AMT_DR)}}
                                                            </td>
                                                            <td class="text-right"  style="width:15%; padding: 5px 10px;text-align: right;">
                                                                {{ $store.getters.convertToCurrencyUs(detail.AMT_CR) }}
                                                            </td>
                                                            <td class="text-right"  style="width:15%;text-align: right; padding: 5px 10px;text-align: right;">
                                                                {{$store.getters.convertToCurrencyUs(detail.saldo)}}
                                                            </td>   
                                                        </tr>
                                                        <tr class="table-active" style="border-top: 1px solid #DDD;">
                                                            <td colspan="3" style="padding: 5px 10px;"> <strong>Total</strong>  </td>
                                                            <td class="text-right" style="text-align: right;padding: 5px 10px;text-align: right;">
                                                                <strong> Rp. {{$store.getters.convertToCurrencyUs(total_debet)}} </strong>
                                                            </td>
                                                            <td class="text-right" style="text-align: right;padding: 5px 10px;text-align: right;">
                                                                <strong> Rp. {{$store.getters.convertToCurrencyUs(total_credit)}} </strong>
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </v-row>
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
                                        Filter Mutasi Bank & Kas
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
                                    <v-col class="col-12" sm="6" md="4">
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
                                    <v-col class="col-12" sm="6" md="4">
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
                                            return-object
                                            @change="(event) => getAcNum(event)"
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="4">
                                        <h6 class="blue-lcd mb-1">Account <strong style="color:red;">*</strong><span></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="ac_num"
                                            :items="ac_nums"
                                            item-value="ac_num"
                                            :item-text="item => item.acc_code +' - ' + item.bank_acc +' - '+ item.bank_name"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            return-object
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" xs="12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Start Date <strong style="color:red;">*</strong><span></span></h6>
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
                                                v-model="date_from"
                                                label="Date From"
                                                persistent-hint
                                                append-icon="mdi-calendar"
                                                v-bind="attrs"
                                                v-on="on"
                                                class="ma-0 pa-0 border-12"
                                                hide-details=true
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker
                                                v-model="date_from"
                                                no-title
                                                @input="modal = false"
                                            ></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols="12" xs="12" sm="6" md="6" >
                                        <h6 class="blue-lcd mb-1">End Date</h6>
                                        <v-menu
                                            ref="modal_to"
                                            v-model="modal_to"
                                            :close-on-content-click="false"
                                            transition="scale-transition"
                                            offset-y
                                            max-width="290px"
                                            min-width="auto"
                                            >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                solo
                                                v-model="date_to"
                                                label="Date to"
                                                persistent-hint
                                                append-icon="mdi-calendar"
                                                v-bind="attrs"
                                                v-on="on"
                                                class="ma-0 pa-0 border-12"
                                                hide-details=true
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker
                                                v-model="date_to"
                                                no-title
                                                @input="modal_to = false"
                                            ></v-date-picker>
                                        </v-menu>
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
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { email } from "vee-validate/dist/rules"
import {entity} from "../../backend-api/entity/master"
import {office} from "../../backend-api/office/index"
import {ledger_coa} from "../../backend-api/ledger/coa/index"
import {mutasi_bank} from "../../backend-api/ledger/other/mutasi_bank"
import { Money } from 'v-money'
import {account_bank} from "../../backend-api/ledger/account_bank"

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
                    text: 'Mutasi Kas & Bank',
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
            mutasi_banks: [],
            detail: null,
            date_from: '',
            modal: false,
            date_to: '',
            modal_to: false,
            ac_nums: [],
            ac_num: null,
            dialogfilter: false,
            saldo_awal: null
        }
    },
    computed:{
        total_debet(){
            var total = 0
            for (let index = 0; index < this.mutasi_banks.length; index++) {
                total = total + parseFloat(this.mutasi_banks[index].AMT_DR);
            }
            
            return (total | 0)
        },
        total_credit(){
            var total = 0
            for (let index = 0; index < this.mutasi_banks.length; index++) {
                total = total + parseFloat(this.mutasi_banks[index].AMT_CR);
            }
            
            return (total | 0)
        }
    },
    mounted(){
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
            this.ac_num = null
            this.date_from = ''
            this.date_to = ''
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
            var respData = await account_bank.index(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id.office_id : ''}`, null, false, false, false)
            if (respData.status === 200) {
                this.ac_nums = respData.data.data
                this.$store.dispatch('setOverlay', false)

            } else{
                this.$store.dispatch('setOverlay', false)
            }
        },
        async getPullData(){
            this.saldo_awal = null
            this.mutasi_banks = []
            this.$store.dispatch('setOverlay', true)

            if (this.entity_id === '' || this.office_id === '' || this.office_id === null || this.ac_num === null || this.ac_num === '' || this.date_from === '') {
                this.snackbar = {
                    color: "error",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Error",
                    text: 'Please fill your fileds and submit for search mutasi',
                    visible: true
                };
                this.$store.dispatch('setOverlay', false)
                return false
            }

            var start_date = this.date_from ? new Date(this.date_from).toISOString().substr(0, 10) : ''
            var end_date = this.date_to ? new Date(this.date_to).toISOString().substr(0, 10) : ''

            var respData = await mutasi_bank.index(`?search=${this.search ? this.search : ''}&entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id.office_id : ''}&tr_date_start=${start_date ? start_date : ""}&tr_date_end=${end_date ? end_date : ""}&ac_num_bank=${this.ac_num ? this.ac_num.acc_code : ""}`, null, false, false, false)
            if (respData.status === 200) {
                this.saldo_awal = respData.data.data ? respData.data.data.opening : null
                var saldo_awal = this.saldo_awal ? parseFloat(this.saldo_awal.OPENING) : 0

                for (let index = 0; index < respData.data.data.transaksi.length; index++) {

                    if (respData.data.data.transaksi[index].drcr === 'CR') {
                        saldo_awal = saldo_awal - parseFloat(respData.data.data.transaksi[index].AMT_CR)
                    } else{
                        saldo_awal = saldo_awal + parseFloat(respData.data.data.transaksi[index].AMT_DR)
                    }

                    this.mutasi_banks.push(
                        {
                            AC_NUM: respData.data.data.transaksi[index].AC_NUM,
                            AMT_CR: respData.data.data.transaksi[index].AMT_CR,
                            AMT_DR: respData.data.data.transaksi[index].AMT_DR,
                            ENTITY_ID: respData.data.data.transaksi[index].ENTITY_ID,
                            MEMO_TXT: respData.data.data.transaksi[index].MEMO_TXT,
                            OFFICE_ID: respData.data.data.transaksi[index].OFFICE_ID,
                            SOURCE: respData.data.data.transaksi[index].SOURCE,
                            SOURCE_NUM: respData.data.data.transaksi[index].SOURCE_NUM,
                            TR_DATE: respData.data.data.transaksi[index].TR_DATE,
                            YEAR_ID: respData.data.data.transaksi[index].YEAR_ID,
                            activity_remark: respData.data.data.transaksi[index].activity_remark,
                            bank_account: respData.data.data.transaksi[index].bank_account,
                            jv_num: respData.data.data.transaksi[index].jv_num,
                            pay_no: respData.data.data.transaksi[index].pay_no,
                            req_pencairan_remark: respData.data.data.transaksi[index].req_pencairan_remark,
                            drcr: respData.data.data.transaksi[index].drcr,
                            saldo: saldo_awal
                        }
                    )
                    
                }
                this.$store.dispatch('setOverlay', false)

            } else{
                this.$store.dispatch('setOverlay', false)
            }
        }, 
        printTicket(){
            const elem = document.getElementById("divPrintMutasi")
            var domClone = elem.cloneNode(true);
    
            var $printSectionMutasi = document.getElementById("printSectionMutasi");
            
            if (!$printSectionMutasi) {
                var $printSectionMutasi = document.createElement("div");
                $printSectionMutasi.id = "printSectionMutasi";
                document.body.appendChild($printSectionMutasi);
            }
            
            $printSectionMutasi.innerHTML = "";
            $printSectionMutasi.appendChild(domClone);
            window.print();
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