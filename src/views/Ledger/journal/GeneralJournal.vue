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
        <v-row class="mt-4">
            <v-col cols="12">
                <v-tabs
                    v-model="tab"
                    color="#027fb3"
                    class="round_top col-sm-no-padding"
                    icons-and-text
                    show-arrows
                >
                    <v-tabs-slider color="primary"></v-tabs-slider>

                    <v-tab
                        v-for="(tab, index) in tabs"
                        :key="index"
                        :href="'#tab-'+tab.int1"
                        active-class="active-tab"
                    >
                        {{ tab.str1 }}
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item
                        value="tab-1"
                    >
                        <v-card class="rounded-l elevation-3">
                            <v-card-title>
                                <v-text-field
                                    solo
                                    clearable
                                    class="border-12 mt-3 mr-2"
                                    v-model="search"
                                    append-icon="mdi-magnify"
                                    label="Search"
                                    single-line
                                    hide-details
                                    style="max-width:400px"
                                    @keyup.enter="getPullData()"
                                ></v-text-field>
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
                                    dense
                                    :headers="headers"
                                    :items="general_journals"
                                    class="elevation-1"
                                    :items-per-page="20"
                                    :loading="$store.state.overlay"
                                    height="560"
                                    :divider="true"
                                    :light="true"
                                    :item-class="tr_datatable"
                                    fixed-header
                                >       
                                    <template v-slot:[`item.tr_date`]="{ item }">
                                        {{ item.tr_date ? (new Date(new Date(item.tr_date) - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) : '' }}
                                    </template>      
                                    <template v-slot:[`item.total_amt_dr`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.total_amt_dr) }}
                                    </template> 
                                    <template v-slot:[`item.total_amt_cr`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.total_amt_cr) }}
                                    </template> 
                                    <template v-slot:[`item.action`]="{ item }">
                                        <v-menu
                                            bottom
                                            left
                                            @click="item"
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
                                                        <v-icon>mdi-note-outline</v-icon>
                                                    </v-list-item-icon>
                                                    <v-list-item-content>
                                                        <v-list-item-title>Journal Voucher</v-list-item-title>
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
                            fullscreen
                            hide-overlay
                            transition="dialog-bottom-transition"
                            style="border-radius: 0 !important"
                        >
                            <v-card class="p-2">
                                <v-card-title class="text-center">
                                    <v-row>
                                        <v-col cols="12">
                                            <div class="d-flex">
                                                Journal Voucher
                                                <v-spacer></v-spacer>
                                                <!-- <v-btn class="rounded-l text-white" color="success" @click="printTicket()">Print</v-btn> -->
                                                <v-btn
                                                    class="mx-2"
                                                    fab
                                                    x-small
                                                    color="#e83e8c;"
                                                    @click="dialog = false"
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
                                    <v-row align="center" justify="center" class="mt-4">
                                        <div style="width: 1024px;" id="divName">
                                            <table width="1024" cellspacing="0" cellpadding="0" class="container" style="width: 1024px; margin-top: 20px;border: 1px solid #DDD;font-size: 14px;">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <table width="100%" cellspacing="0" cellpadding="0" style="width: 100%; padding-bottom: 10px;border-bottom: 1px solid #DDD;background-color: #54acd2;">
                                                                <tbody>
                                                                    <tr style="margin-top: 8px; margin-bottom: 8px;">
                                                                        <td>
                                                                            <div class="d-flex m-2">
                                                                                <img src="../../../assets/logo_gki.png" height="60px" alt="">
                                                                                <h5 class="mt-4 ml-4 text-white">JOURNAL VOUCHER</h5>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <table width="100%" cellspacing="0" cellpadding="0" style="width: 100%; margin: 10px 0;">
                                                                <tbody>
                                                                    <tr style="margin-top: 8px; margin-bottom: 8px;">
                                                                        <td style="width:15%; padding-left: 10px;">
                                                                            Entity
                                                                        </td>
                                                                        <td style="width:5%">
                                                                            :
                                                                        </td>
                                                                        <td style="width:30%">
                                                                            {{ this.detail ? this.detail.entity_id : '' }}
                                                                        </td>
                                                                        <td style="width:15%; padding-left: 10px;">
                                                                            Office
                                                                        </td>
                                                                        <td style="width:5%">
                                                                            :
                                                                        </td>
                                                                        <td style="width:30%">
                                                                            {{ this.detail ? this.detail.office : '' }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr style="margin-top: 8px; margin-bottom: 8px;">
                                                                        <td style="width:15%; padding-left: 10px;">
                                                                            Source
                                                                        </td>
                                                                        <td style="width:5%">
                                                                            :
                                                                        </td>
                                                                        <td style="width:30%">
                                                                            {{ this.detail ? this.detail.source : '' }}
                                                                        </td>
                                                                        <td style="width:15%; padding-left: 10px;">
                                                                            Source Num
                                                                        </td>
                                                                        <td style="width:5%">
                                                                            :
                                                                        </td>
                                                                        <td style="width:30%">
                                                                            {{ this.detail ? this.detail.source_num : '' }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr style="margin-top: 8px; margin-bottom: 8px;">
                                                                        <td style="width:15%; padding-left: 10px;">
                                                                            Tanggal
                                                                        </td>
                                                                        <td style="width:5%">
                                                                            :
                                                                        </td>
                                                                        <td style="width:30%">
                                                                            {{ this.detail ? (new Date(new Date(this.detail.tr_date) - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)  : '' }}
                                                                        </td>
                                                                        <td colspan="2">

                                                                        </td>
                                                                    </tr>
                                                                    
                                                                </tbody>
                                                            </table>
                                                            <table width="100%" cellspacing="0" cellpadding="0" style="width: 100%; margin: 25px 0 0 0;border-top: 1px solid #DDD;">
                                                                <thead style="background-color: #54acd2;">
                                                                    <tr style="border-bottom: 1px solid #DDD;">
                                                                        <td class="text-left" style="width:5%; padding: 10px 10px;color: #fff;" >
                                                                            No
                                                                        </td>
                                                                        <td class="text-left"  style="width:15%; padding: 10px 10px;color: #fff;">
                                                                            Ac Num
                                                                        </td>
                                                                        <td class="text-left"  style="width:15%; padding: 10px 10px;color: #fff;">
                                                                            Account Name
                                                                        </td>
                                                                        <td class="text-right" style="width:15%; padding: 10px 10px;color: #fff;text-align: right;">
                                                                            Debit
                                                                        </td>
                                                                        <td class="text-right"  style="width:35%; padding: 10px 10px;color: #fff;text-align: right;">
                                                                            Credit
                                                                        </td>                                           
                                                                    </tr>
                                                                </thead>  
                                                                <tbody>
                                                                    <tr 
                                                                        v-for="(journal, index) in journals"
                                                                        :key="index"
                                                                    >
                                                                        <td class="text-left" style="width:4%; padding: 5px 10px;" >
                                                                            {{ index + 1 }}
                                                                        </td>
                                                                        <td class="text-left"  style="width:24%; padding: 5px 10px;">
                                                                            {{journal.ac_num}}
                                                                        </td>
                                                                        <td class="text-left"  style="width:24%; padding: 5px 10px;">
                                                                            {{journal.ac_name}}
                                                                        </td>
                                                                        <td class="text-right" style="width:24%; padding: 5px 10px;">
                                                                            {{ journal.drcr === 'DR' ? $store.getters.convertToCurrencyUs(journal.amt_dr) : '-'}}
                                                                        </td>
                                                                        <td class="text-right"  style="width:24%;text-align: right; padding: 5px 10px;">
                                                                            {{ journal.drcr === 'CR' ? $store.getters.convertToCurrencyUs(journal.amt_cr) : '-'}}
                                                                        </td>   
                                                                    </tr>
                                                                    <tr style="border: 1px solid #DDD;background-color: #54acd2;color: #fff;">
                                                                        <td colspan="3" style="padding: 5px 10px;"> Total : </td>
                                                                        <td class="text-right" style="text-align: right;padding: 5px 10px;">
                                                                            Rp. {{$store.getters.convertToCurrencyUs(total_debit)}}
                                                                        </td>
                                                                        <td class="text-right" style="text-align: right;padding: 5px 10px;">
                                                                            Rp. {{$store.getters.convertToCurrencyUs(total_credit)}}
                                                                        </td>
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
                        </v-dialog>
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
                                                Filter Journal Voucher
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
                                            <v-col class="col-12" sm="6" md="4">
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
                                                ></v-autocomplete> 
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="4">
                                                <h6 class="blue-lcd mb-1">Year</h6>
                                                <v-menu
                                                    ref="menu"
                                                    v-model="menu"
                                                    :close-on-content-click="false"
                                                    transition="scale-transition"
                                                    offset-y
                                                    max-width="320px"
                                                    min-width="auto"
                                                >
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field
                                                            dense
                                                            v-model="year"
                                                            label="Year"
                                                            append-icon="event"
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            solo
                                                            class="ma-0 pa-0 border-12"
                                                            readonly
                                                            hide-details=true
                                                            >
                                                        </v-text-field>
                                                    </template>
                                                    <v-date-picker
                                                        ref="picker"
                                                        v-model="date"
                                                        :max="picker"
                                                        @input="save"
                                                        reactive
                                                        no-title>
                                                    </v-date-picker>
                                                </v-menu>
                                            </v-col>
                                            <v-col cols="12" xs="12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">Start Date</h6>
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
                    </v-tab-item>
                    <v-tab-item
                        value="tab-2"
                    >
                        <other-payment></other-payment>
                    </v-tab-item>
                    <v-tab-item
                        value="tab-3"
                    >
                        <other-deposit></other-deposit>
                    </v-tab-item>
                </v-tabs-items>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import {entity} from "../../../backend-api/entity/master"
import {ledger_coa} from "../../../backend-api/ledger/coa/index"
import {office} from "../../../backend-api/office/index"
import { Money } from 'v-money'
import {gl_journal_voucher} from "../../../backend-api/ledger/transaction/gl_journal_voucher"
import OtherPayment from './OtherPayment.vue'
import OtherDeposit from "./OtherDeposit.vue"
import {appl_constant} from "../../../backend-api/appl_constant/index"
import {env_conf} from "../../../backend-api/env_conf/index"

export default {
    components: {
        Money, OtherPayment, OtherDeposit
    },
    data() {
        return {
            tab: '',
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
            money: {
				decimal: '.',
				thousands: ',',
				prefix: '',
				suffix: '',
				precision: 0,
				masked: false
			},
            breadcumbs: [
                {
                    text: 'Ledger',
                    disabled: false,
                    href: '/admin/ledger',
                },
                {
                    text: 'Report Manual Transaction',
                    disabled: true,
                }
            ],
            headers:[
                {
                    text: 'Entity ID',
                    align: 'start',
                    value: 'entity_id', 
                    align:'left', width:'100'},
                { text: 'Office', value: 'office' , align:'left', width:'100'},
                { text: 'Year', value: 'year_id' , align:'left', width:'100'},
                { text: 'Trans Date', value: 'tr_date' , align:'left', width:'200'},
                { text: 'Source', value: 'source' , align:'left', width:'200'},
                { text: 'Source Number', value: 'source_num' , align:'left'},
                { text: 'Total Amount Debet', value: 'total_amt_dr' , align:'right', width:'250'},
                { text: 'Total Amount Credit', value: 'total_amt_cr' , align:'right', width:'250'},
                { text: 'Action', value: 'action' , align:'left'},
            ],
            headersColumn: {
                'Entity ID': 'entity_id',
                'Office': 'office',
                'Year': 'year_id',
                'Trans Date': 'tr_date',
                'Source': 'source',
                'Source Number': 'source_num',
                'Total Amount Debet': 'total_amt_dr',
                'Total Amount Credit': 'total_amt_cr'
            },
            general_journals: [],
            detail: null,
            journals: [],
            dialog: false,
            dialogfilter: false,
            entities: [],
            entity_id: '',
            offices: [],
            office_id: '',
            menu: false,
            picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            date:'',
            year: '',
            date_from: '',
            modal: false,
            date_to: '',
            modal_to: false,
            tabs: [],
        }
    },
    computed:{
        total_debit(){
            var total_debit = 0
            for (let index = 0; index < this.journals.length; index++) {
                if (this.journals[index].drcr === 'DR') {
                    total_debit = total_debit + parseFloat(this.journals[index].amt_dr);
                }
            }
            
            return (total_debit | 0)
        },
        total_credit(){
            var total_credit = 0
            for (let index = 0; index < this.journals.length; index++) {
                if (this.journals[index].drcr === 'CR') {
                    total_credit = total_credit + parseFloat(this.journals[index].amt_cr);
                }
            }
            
            return (total_credit | 0)
        },
    },
    async mounted(){
        this.$store.dispatch('setOverlay', true)
        await this.getApplConstant()
        await this.getPullData()
        await this.getEntity()
        this.$refs.picker.activePicker = 'YEAR'   

        this.$store.dispatch('setOverlay', false)

    },
    methods: {
        tr_datatable(item) {
            const rowClass = 'tr_datatable'
            return rowClass;
        },
        clear(){
            this.entity_id = ''
            this.office_id = ''
            this.date = ''
            this.year = ''
            this.date_from = ''
            this.date_to = ''
        },
        save(date) {
            this.$refs.menu.save(date)

            this.$refs.picker.activePicker = 'YEAR'

            this.menu = false

            this.year = new Date(date.substr(0, 4)).toISOString().substr(0, 4)
        },
        async getEnvConf(var_id){
            var respDatamnCOA = await env_conf.getEnvVarConfUser(`?entity_id=GKI&appl_id=WEBGK&var_id=${var_id}&groupid=${this.$store.state.user.group}`, null, false, false, false)
            if (respDatamnCOA.status === 200) {
                var menu = respDatamnCOA.data.data ? respDatamnCOA.data.data : '' 

                return menu
            } else {
                return false
            }
        },
        async getApplConstant(){
            var respDataTabs = await appl_constant.fetchApplConstant("?key_value=LEDGER&str2=REPORT MANUAL TRANSACTION&sort_order=asc&order_by=int1", null, false, false, false)
            if (respDataTabs.status === 200) {
                var tabs = respDataTabs.data.data
                for (let index = 0; index < tabs.length; index++) {
                    const element = tabs[index];
                    const key_code = await this.getEnvConf(element.key_code)
                    if (key_code) {
                        tabs.splice(index, 1);
                    }
                }
                this.tabs = tabs
                console.log(this.tabs);
            }
        },
        async getPullData(){
            this.general_journals = []
            this.$store.dispatch('setOverlay', true)

            var start_date = this.date_from ? new Date(this.date_from).toISOString().substr(0, 10).replace(/-/g,"") : ''
            var end_date = this.date_to ? new Date(this.date_to).toISOString().substr(0, 10).replace(/-/g,"") : ''

            var respData = await gl_journal_voucher.index(`?search=${this.search ? this.search : ''}&entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&year_id=${this.year ? this.year : ''}&start_date=${start_date ? start_date : ""}&end_date=${end_date ? end_date : ""}&bidang=${this.$store.state.user.bidang ? this.$store.state.user.bidang : ''}&komisi=${this.$store.state.user.komisi ? this.$store.state.user.komisi : ''}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}`, null, false, false, false)
            if (respData.status === 200) {
                this.general_journals = respData.data.data
                this.$store.dispatch('setOverlay', false)

            } else{
                this.$store.dispatch('setOverlay', false)
            }
        },
        async detailItem(item){
            console.log(item);
            this.detail = item

            var reqBody = {
                'office_id': item.office_id,
                'entity_id': item.entity_id,
                'year_id': item.year_id,
                'source_num': item.source_num
            }

            const respData = await gl_journal_voucher.show('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.dialog = true
                this.journals = respData.data.data
            }

        },
        printTicket(){
            const elem = document.getElementById("divName")
            var domClone = elem.cloneNode(true);
    
            var $printSection = document.getElementById("printSection");
            
            if (!$printSection) {
                var $printSection = document.createElement("div");
                $printSection.id = "printSection";
                document.body.appendChild($printSection);
            }
            
            $printSection.innerHTML = "";
            $printSection.appendChild(domClone);
            window.print();
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
        async exportExcel(){
            var start_date = this.date_from ? new Date(this.date_from).toISOString().substr(0, 10).replace(/-/g,"") : ''
            var end_date = this.date_to ? new Date(this.date_to).toISOString().substr(0, 10).replace(/-/g,"") : ''
            
            var respData = await gl_journal_voucher.index(`?search=${this.search ? this.search : ''}&entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&year_id=${this.year ? this.year : ''}&start_date=${start_date ? start_date : ""}&end_date=${end_date ? end_date : ""}&bidang=${this.$store.state.user.bidang ? this.$store.state.user.bidang : ''}&komisi=${this.$store.state.user.komisi ? this.$store.state.user.komisi : ''}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}`, null, false, false, false)
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
    },
    watch: {
        menu (val) {
            console.log(val);
            val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
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