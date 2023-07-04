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
                    <!-- <v-tab href="#tab-1" active-class="active-tab">
                        G Ledger Budget
                    </v-tab> 
                    <v-tab href="#tab-2" active-class="active-tab">
                        G Ledger Report
                    </v-tab>
                    <v-tab href="#tab-3" active-class="active-tab">
                        G Ledger Report (2)
                    </v-tab>
                    <v-tab href="#tab-4" active-class="active-tab">
                        Activity G Ledger Budget
                    </v-tab> 
                    <v-tab href="#tab-5" active-class="active-tab">
                        Request Pencairan Budget
                    </v-tab> 
                    <v-tab href="#tab-6" active-class="active-tab">
                        Payment Pencairan Budget
                    </v-tab>
                    <v-tab href="#tab-7" active-class="active-tab">
                        Realisasi Anggaran
                    </v-tab>                     -->
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item
                        value="tab-1"
                    >
                        <ledger-budget></ledger-budget>
                    </v-tab-item>
                    <v-tab-item
                        value="tab-2"
                    >
                        <general-ledger-report></general-ledger-report>
                    </v-tab-item>
                    <v-tab-item
                        value="tab-3"
                    >
                        <general-ledger-report-activity></general-ledger-report-activity>
                    </v-tab-item>
                    
                    <v-tab-item
                        value="tab-4"
                    >
                        <activity-ledger-budget></activity-ledger-budget>   
                    </v-tab-item>
                    <v-tab-item
                        value="tab-5"
                    >   
                        <request-pencairan></request-pencairan>
                    </v-tab-item>
                    <v-tab-item
                        value="tab-6"
                    >
                        <payment-pencairan></payment-pencairan>
                    </v-tab-item>
                    <v-tab-item
                        value="tab-7"
                    >
                        <realisasi-anggaran></realisasi-anggaran>
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
import GeneralLedgerReport from "./GeneralLedgerReport.vue"
import GeneralLedgerReportActivity from "./GeneralLedgerReportActivity.vue"
import ActivityLedgerBudget from "./ActivityLedgerBudget.vue"
import RequestPencairan from "./RequestPencairan.vue"
import PaymentPencairan from "./PaymentPencairan.vue"
import LedgerBudget from "./LedgerBudget.vue"
import RealisasiAnggaran from "./RealisasiAnggaran.vue"
import {appl_constant} from "../../../backend-api/appl_constant/index"
import {env_conf} from "../../../backend-api/env_conf/index"

export default {
    components: {
        Money, GeneralLedgerReport, GeneralLedgerReportActivity, ActivityLedgerBudget, RequestPencairan, PaymentPencairan, LedgerBudget, RealisasiAnggaran
    },
    data() {
        return {
            tab: '',
            tabs: [],
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
                    text: 'Budget',
                    disabled: false,
                    href: '/admin/budget',
                },
                {
                    text: 'Report Budget & Realisasi',
                    disabled: true,
                }
            ],
        }
    },
    computed:{
    },
    async mounted(){
        this.$store.dispatch('setOverlay', true)
        await this.getApplConstant()
        this.$store.dispatch('setOverlay', false)
    },
    methods: {
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
            var respDataTabs = await appl_constant.fetchApplConstant("?key_value=BUDGET&str2=REPORT BUDGET DAN REALISASI&sort_order=asc&order_by=int1", null, false, false, false)
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
    },
    watch: {
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