<template>
    <div>
        <v-card class="rounded-l elevation-5">
            <v-card-title>
                <v-text-field
                    solo
                    class="border-12"
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
                @click="printReport()"
                >
                    <v-icon class="mr-2">mdi-printer</v-icon>
                    Print
                </v-btn>
            </v-card-title>
            <v-card-text>
                <div id="divPrintReport" class="p-3">
                    <v-container fluid>
                        <v-row>
                            <v-col cols="12">
                                <v-simple-table
                                    fixed-header    
                                    dense    
                                    style="border: 1px solid #787878;"                                    
                                >
                                    <thead style="border: 1px solid #787878;">
                                        <tr style="border: 1px solid #787878;">
                                            <th rowspan="2" class="text-center" style="width:25%; border: 1px solid #787878 !important;" >
                                                Nama Program
                                            </th>
                                            <th rowspan="2" class="text-center" style="width:5%; border: 1px solid #787878 !important;" >
                                                Kode
                                            </th>
                                            <th colspan="4" class="text-center" style="width:30%; border: 1px solid #787878 !important;" >
                                                Semester 1
                                            </th>
                                            <th colspan="4" class="text-center" style="width:30%; border: 1px solid #787878 !important;" >
                                                Semester 2
                                            </th>
                                            <th rowspan="2" class="text-center" style="width:10%; border: 1px solid #787878 !important;" >
                                                Total Anggaran
                                            </th>
                                        </tr>
                                        <tr style="border: 1px solid #787878;">
                                        <th class="text-center" style="border: 1px solid #787878 !important;">
                                            n1
                                        </th>
                                        <th class="text-center" style="border: 1px solid #787878 !important;">
                                            a1
                                        </th>
                                        <th class="text-center" style="border: 1px solid #787878 !important;">
                                            b1
                                        </th>
                                        <th class="text-center" style="border: 1px solid #787878 !important;">
                                            Total 1
                                        </th> 
                                        <th class="text-center" style="border: 1px solid #787878 !important;">
                                            n2
                                        </th>
                                        <th class="text-center" style="border: 1px solid #787878 !important;">
                                            a2
                                        </th>
                                        <th class="text-center" style="border: 1px solid #787878 !important;">
                                            b2
                                        </th>
                                        <th class="text-center" style="border: 1px solid #787878 !important;">
                                            Total 2
                                        </th> 
                                        </tr>
                                    </thead>
                                    <tbody v-for="(detail, index) in gl_reports" :key="index">
                                        <tr class="tr_datatable">   
                                            <td colspan="11">
                                                {{ detail.ac_parent }} - {{ detail.ac_parent_desc }}
                                            </td>
                                        </tr>
                                        <template v-for="(ac_sub_parent) in detail.ac_sub_parent_data">
                                            <tr>
                                                <td style="padding-left: 30px;">
                                                    {{ ac_sub_parent.ac_sub_par_one }} - {{ ac_sub_parent.ac_sub_par_one_desc }}
                                                </td>
                                                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                                            </tr>
                                            <template v-for="(data) in ac_sub_parent.ac_num_data">
                                                <tr>
                                                    <td style="padding-left: 35px;">
                                                        {{ data.ac_num }} - {{ data.ac_name }}
                                                    </td>
                                                    <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                                                </tr>
                                                <tr v-for="(activity_budget, a) in data.activity_budget_data" :key="a">
                                                    <td style="padding-left: 50px;">
                                                        {{ a + 1 }} - {{ activity_budget.remark }}
                                                    </td>
                                                    <td>
                                                        {{ activity_budget.budget_type }}
                                                    </td>
                                                    <td class="text-right">
                                                        {{ activity_budget.qty_one }}
                                                    </td>
                                                    <td class="text-right">
                                                        {{ activity_budget.total_activity_one }}
                                                    </td>
                                                    <td class="text-right">
                                                        {{$store.getters.convertToCurrencyUs(parseFloat(activity_budget.semester_one))}}
                                                    </td>
                                                    <td class="text-right">
                                                        {{ $store.getters.convertToCurrencyUs(parseFloat(activity_budget.semester_one) * parseFloat(activity_budget.qty_one) * parseFloat(activity_budget.total_activity_one)) }}
                                                    </td>
                                                    <td class="text-right">
                                                        {{ activity_budget.qty_two }}
                                                    </td>
                                                    <td class="text-right">
                                                        {{ activity_budget.total_activity_two }}
                                                    </td>
                                                    <td class="text-right">
                                                        {{$store.getters.convertToCurrencyUs(parseFloat(activity_budget.semester_two))}}
                                                    </td>
                                                    <td class="text-right">
                                                        {{ $store.getters.convertToCurrencyUs(parseFloat(activity_budget.semester_two) * parseFloat(activity_budget.qty_two) * parseFloat(activity_budget.total_activity_two)) }}
                                                    </td>
                                                    <td class="text-right">
                                                        {{ $store.getters.convertToCurrencyUs((parseFloat(activity_budget.semester_one) * parseFloat(activity_budget.qty_one) * parseFloat(activity_budget.total_activity_one)) +  (parseFloat(activity_budget.semester_two) * parseFloat(activity_budget.qty_two) * parseFloat(activity_budget.total_activity_two))) }}
                                                    </td>
                                                </tr>
                                            </template>
                                        </template>
                                        <!-- <tr v-for="(ac_sub_parent, i) in detail.ac_sub_parent_data" :key="i">
                                            <td style="padding-left: 30px;">
                                                {{ ac_sub_parent.ac_sub_par_one }} - {{ ac_sub_parent.ac_sub_par_one_desc }}
                                            </td>
                                        </tr> -->
                                    </tbody>
                                </v-simple-table>
                            </v-col>
                        </v-row>
                    </v-container>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import {entity} from "../../../backend-api/entity/master"
import {office} from "../../../backend-api/office/index"
import { Money } from 'v-money'
import {gl_report} from "../../../backend-api/ledger/transaction/gl_report"

export default {
    components: {
        Money
    },
    data() {
        return {
            money: {
				decimal: '.',
				thousands: ',',
				prefix: '',
				suffix: '',
				precision: 0,
				masked: false
			},
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
                    text: 'Ledger Parent',
                    disabled: true,
                }
            ],
            gl_reports: [],
            dialog: false,
            detail: null,
            journals: [],
            dialogfilter: false,
            entities: [],
            entity_id: '',
            offices: [],
            office_id: '',
            menu: false,
            picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            date:'',
            year: '',
        }
    },
    computed:{
    },
    async mounted(){
        // TODO lock bidang dan komisi bila ada
        await this.getPullData()
        // this.$refs.picker.activePicker = 'YEAR'   
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
        },
        save(date) {
            this.$refs.menu.save(date)

            this.$refs.picker.activePicker = 'YEAR'

            this.menu = false

            this.year = new Date(date.substr(0, 4)).toISOString().substr(0, 4)
        },
        async getPullData(){
            this.gl_reports = []
            this.$store.dispatch('setOverlay', true)
            var respData = await gl_report.index(`?bidang=${this.$store.state.user.bidang ? this.$store.state.user.bidang : ''}&komisi=${this.$store.state.user.komisi ? this.$store.state.user.komisi : ''}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}`, null, false, false, false)
            if (respData.status === 200) {
                this.gl_reports = respData.data.data
                this.$store.dispatch('setOverlay', false)
            } else{
                this.$store.dispatch('setOverlay', false)
            }
        },
        printReport(){
            const elem = document.getElementById("divPrintReport")
            var domClone = elem.cloneNode(true);
    
            var $printSectionReport = document.getElementById("printSectionReport");
            
            if (!$printSectionReport) {
                var $printSectionReport = document.createElement("div");
                $printSectionReport.id = "printSectionReport";
                document.body.appendChild($printSectionReport);
            }
            
            $printSectionReport.innerHTML = "";
            $printSectionReport.appendChild(domClone);
            window.print();
        },
    },
    watch: {
        // menu (val) {
        //     console.log(val);
        //     val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
        // },
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

fieldset.document {
    border: 1px groove #ddd !important;
    padding: 0 1.4em 1.4em 1.4em !important;
    margin: 0 0 1.5em 0 !important;
    -webkit-box-shadow: 0px 0px 0px 0px #000;
    box-shadow: 0px 0px 0px 0px #000;
}
.tr_datatable{
  background-color: #F5F7F8 !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    /* color: rgba(0, 0, 0, 0.6) !important; */
    border: 1px solid #cccccc !important;
}

@media screen {
  #printSectionReport {
      display: none;
  }
}

@media print {
  body * {
    visibility:hidden;
  }
  #printSectionReport, #printSectionReport * {
    visibility:visible;
  }
  #printSectionReport {
    position:absolute;
    left:0;
    top:0;
  }
}

</style>
<style scoped>
td{
    font-size: 11.5px;
    border: 1px solid #787878 !important;
}
</style>