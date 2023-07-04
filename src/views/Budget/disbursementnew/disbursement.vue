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
                    <v-tab
                        v-for="(tab, index) in tabs"
                        :key="index"
                        :href="'#tab-'+tab.int1"
                        active-class="active-tab"
                    >
                        {{ tab.str1 }}
                    </v-tab>
                </v-tabs>
                <!-- <v-tabs-items v-model="tab">
                    <v-tab-item 
                        v-for="tb in tabs" 
                        :key="tb.id">
                        <component :is="tb.component"></component>
                    </v-tab-item>
                </v-tabs-items> -->
                <v-tabs-items v-model="tab">
                    <v-tab-item
                        value="tab-1"
                    >
                        <request-pencairan></request-pencairan>
                    </v-tab-item>
                    <v-tab-item
                        value="tab-2"
                    >
                        <payment-pencairan></payment-pencairan>
                    </v-tab-item>
                    <v-tab-item
                        value="tab-3"
                    >
                        <return-budget></return-budget>
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
import {ledger_budget} from "../../../backend-api/ledger/coa/ledger_budget"
import {appl_constant} from "../../../backend-api/appl_constant/index"
import { Money } from 'v-money'
import {activity_header} from "../../../backend-api/ledger/budget/activity_header"
import RequestPencairan from './RequestPencairan.vue'
import PaymentPencairan from './PaymentPencairan.vue'
import ReturnBudget from './ReturnBudget.vue'
import {env_conf} from "../../../backend-api/env_conf/index"

export default {
    components: {
        Money, RequestPencairan, PaymentPencairan, ReturnBudget
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
                    text: 'Budget',
                    disabled: false,
                    href: '/admin/budget',
                },
                {
                    text: 'Budget Disbursement',
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
                { text: 'AC Par', value: 'ac_par' , align:'left'},
                { text: 'AC Sub Par', value: 'ac_sub_par_one' , align:'left'},
                { text: 'AC Num', value: 'ac_num' , align:'left', width:'150'},
                { text: 'AC Name', value: 'ac_name' , align:'left'},
                { text: 'Period', value: 'period' , align:'left'},
                { text: 'Target', value: 'target' , align:'right'},
                { text: 'Alokasi', value: 'alokasi' , align:'right'},
                { text: 'Aktual', value: 'actual' , align:'right'},
                { text: 'Remark', value: 'remark' , align:'left'},
                { text: 'Action', value: 'action' , align:'left'},
            ],
            ledger_budgets: [],
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
            date: '',
            menu: false,
            modal: false,
            target: 0,
            actual: 0,
            min_month: '',
            max_month: '',
            mod: '',
            dialogfilter: false,
            mod_month: '',
            activity_headers: [],
            modal_edit: false,
            modal_filter: false,
            tabs: []
        }
    },
    async mounted(){
        this.$store.dispatch('setOverlay', true)
        await this.getApplConstant()
        this.$store.dispatch('setOverlay', false)
    },
    methods: {
        tr_datatable(item) {
            const rowClass = 'tr_datatable'
            return rowClass;
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
            var respDataTabs = await appl_constant.fetchApplConstant("?key_value=BUDGET&str2=BUDGET DISBURSEMENT&sort_order=asc&order_by=int1", null, false, false, false)
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