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
                <div id="divPrintReportActivity" class="p-3">
                    <v-container fluid>
                        <v-row>
                            <v-col cols="12">
                                <v-simple-table
                                    fixed-header    
                                    dense    
                                    style="border: 1px solid #787878;margin-top: 2px;" 
                                    v-for="(detail, index) in gl_reports" :key="index"                                   
                                >
                                    <tbody >
                                        <tr>
                                            <td style="width: 10%;">
                                                Tahun
                                            </td>
                                            <td style="width: 2%;">
                                            :
                                            </td>
                                            <td>
                                                {{ detail.year }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="width: 10%;">
                                                Nama
                                            </td>
                                            <td style="width: 2%;">
                                            :
                                            </td>
                                            <td>
                                                {{ detail.ac_num }} - {{ detail.ac_name }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="width: 10%;">
                                                Pola Kegiatan
                                            </td>
                                            <td style="width: 2%;">
                                            :
                                            </td>
                                            <td>
                                                {{ detail.budget_type }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="width: 10%;">
                                                Bentuk
                                            </td>
                                            <td style="width: 2%;">
                                            :
                                            </td>
                                            <td>
                                                {{ detail.remark }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="width: 10%;">
                                                Tujuan
                                            </td>
                                            <td style="width: 2%;">
                                            :
                                            </td>
                                            <td>
                                                <ol style="width: 100%; padding: 10px;" v-if="detail.tujuan">
                                                    <li style="width: 100%;" v-for="(purpose, i) in detail.tujuan" :key="i">
                                                        {{ purpose.purpose }}
                                                    </li>
                                                </ol>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="width: 10%;">
                                                Situasi Sekarang
                                            </td>
                                            <td style="width: 2%;">
                                            :
                                            </td>
                                            <td>
                                                {{ detail.current }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="width: 10%;">
                                                Situasi yang Diharap
                                            </td>
                                            <td style="width: 2%;">
                                            :
                                            </td>
                                            <td>
                                                {{ detail.expected }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="width: 10%;">
                                                Anggaran Semester 1
                                            </td>
                                            <td style="width: 2%;">
                                            :
                                            </td>
                                            <td>
                                                {{ detail.anggaran ? $store.getters.convertToCurrencyUs(detail.anggaran.semester_one) : ''  }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="width: 10%;">
                                                Anggaran Semester 2
                                            </td>
                                            <td style="width: 2%;">
                                            :
                                            </td>
                                            <td>
                                                {{ detail.anggaran ? $store.getters.convertToCurrencyUs(detail.anggaran.semester_two) : ''  }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="width: 10%;">
                                                Total Anggaran
                                            </td>
                                            <td style="width: 2%;">
                                            :
                                            </td>
                                            <td>
                                                {{ detail.anggaran ? $store.getters.convertToCurrencyUs(parseFloat(detail.anggaran.semester_one) + parseFloat(detail.anggaran.semester_two)) : ''  }}
                                            </td>
                                        </tr>
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
        this.$store.dispatch('setOverlay', true)
        await this.getPullData()
        this.$store.dispatch('setOverlay', false)

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
            var respData = await gl_report.index_activity(`?bidang=${this.$store.state.user.bidang ? this.$store.state.user.bidang : ''}&komisi=${this.$store.state.user.komisi ? this.$store.state.user.komisi : ''}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}`, null, false, false, false)
            if (respData.status === 200) {
                this.gl_reports = respData.data.data
                this.$store.dispatch('setOverlay', false)
            } else{
                this.$store.dispatch('setOverlay', false)
            }
        },
        printReport(){
            const elem = document.getElementById("divPrintReportActivity")
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
  #printSectionReportActivity {
      display: none;
  }
}

@media print {
  body * {
    visibility:hidden;
  }
  #printSectionReportActivity, #printSectionReportActivity * {
    visibility:visible;
  }
  #printSectionReportActivity {
    position:absolute;
    left:0;
    top:0;
  }
}

</style>
<style scoped>
td{
    font-size: 11.5px;
    border: 1px solid none !important;
}
</style>