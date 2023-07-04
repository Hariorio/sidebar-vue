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
                    :items="request_pencairans"
                    class="elevation-1 mt-3"
                    :items-per-page="20"
                    :loading="$store.state.overlay"
                    height="578"
                    fixed-header
                    :divider="true"
                    :light="true"
                    :item-class="tr_datatable"
                >     
                    <template v-slot:[`item.amount_req`]="{ item }">
                        {{ $store.getters.convertToCurrencyUs(item.amount_req) }}
                    </template>
                    <template v-slot:[`item.amount_approved`]="{ item }">
                        {{ $store.getters.convertToCurrencyUs(item.amount_approved) }}
                    </template>
                    <template v-slot:[`item.amount_paid`]="{ item }">
                        {{ $store.getters.convertToCurrencyUs(item.amount_paid) }}
                    </template>
                    <template v-slot:[`item.date_req`]="{ item }">
                        {{ item.date_req ? (new Date(new Date(item.date_req) - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) : '' }}
                    </template>
                    <template v-slot:[`item.approve_date_one`]="{ item }">
                        <v-chip
                        v-if="item.reject_date_one != null"  
                            class="ma-1"
                            
                            color="red"
                            text-color="white"   
                        >
                            Rejected
                        </v-chip>
                        <v-chip
                        v-else-if="item.approve_date_one === null"  
                            class="ma-1"
                            
                            color="warning"
                            text-color="white"                            
                                   
                        >
                            Not Approved
                        </v-chip>
                        <v-chip
                        v-else-if="showButtonAprv1 && item.approve_date_one != null && item.approve_date_two === null && item.approve_date_three === null"
                            class="ma-1"
                            close
                            color="green"
                            outlined
                            @click:close="rollBackOne(item)" 
                        >
                            {{item.approve_date_one}}
                        </v-chip>
                        <v-chip
                        v-else
                            class="ma-1"
                            
                            color="green"
                            outlined
                        >
                            {{item.approve_date_one}}
                        </v-chip>

                    </template>

                    <template v-slot:[`item.approve_date_two`]="{ item }">
                        <v-chip
                        v-if="item.reject_date_one != null"  
                            class="ma-1"
                            color="red"
                            text-color="white"                            
                        >
                            Rejected
                        </v-chip>
                        <v-chip
                        v-else-if="item.approve_date_two === null"  
                            class="ma-1"
                            color="warning"
                            text-color="white"                            
                        >
                            Not Approved
                        </v-chip>
                       
                        <v-chip
                        v-else-if="item.approve_date_two != null && showButtonAprv2 && item.approve_date_three === null"  
                            class="ma-1"
                            close
                            color="green"
                            outlined
                            @click:close="rollBackTwo(item)"
                        >
                            {{item.approve_date_two}}
                        </v-chip>
                        <v-chip
                        v-else
                            class="ma-1"
                            color="green"
                            outlined
                        >
                            {{item.approve_date_two}}
                        </v-chip>

                    </template>

                    <template v-slot:[`item.approve_date_three`]="{ item }">
                        <v-chip
                        v-if="item.reject_date_one != null"  
                            class="ma-1"
                            color="red"
                            text-color="white"                            
                        >
                            Rejected
                        </v-chip>
                        <v-chip
                        v-else-if="item.approve_date_three === null"  
                            class="ma-1"
                            color="warning"
                            text-color="white"                            
                        >
                            Not Approved
                        </v-chip>
                       
                        <v-chip
                        v-else-if="item.approve_date_three != null && showButtonAprv3"  
                            class="ma-1"
                            close
                            color="green"
                            outlined
                            @click:close="rollBackThree(item)"
                        >
                            {{item.approve_date_three}}
                        </v-chip>
                        <v-chip
                        v-else
                            class="ma-1"
                            color="green"
                            outlined
                        >
                            {{item.approve_date_three}}
                        </v-chip>

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
                                    class="text-center"
                                >
                                    <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                            </template>

                            <v-list dense class="pt-0 pb-0">
                                <v-list-item @click="detailItem(item)">
                                    <v-list-item-icon>
                                        <v-icon>mdi-magnify</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>Detail</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item 
                                    v-if="item.reject_date_one === null && item.approve_date_one === null && item.approve_date_two === null && item.approve_date_three === null"
                                    @click="[detailItemEdit(item, 'edit'), showApprove3 = false]">
                                    <v-list-item-icon>
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>Edit</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item v-if="showButtonAprv1 && item.reject_date_one === null && item.approve_date_one === null" @click="aprove1(item)">
                                    <v-list-item-icon>
                                        <v-icon>mdi-check</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>Approve 1</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item v-if="showButtonAprv2 && item.reject_date_one === null && item.approve_date_two === null" @click="aprove2(item)">
                                    <v-list-item-icon>
                                        <v-icon>mdi-check-all</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>Approve 2</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item v-if="showButtonAprv3 && item.reject_date_one === null && item.approve_date_three === null" @click="[detailItemEdit(item, 'app2'), showApprove3 = true]">
                                    <v-list-item-icon>
                                        <v-icon>mdi-check-all</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>Approve 3</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item v-if="(showButtonAprv1 || showButtonAprv2) && (item.approve_date_one === null || item.approve_date_two === null) && item.reject_date_one === null" @click="reject(item)">
                                    <v-list-item-icon>
                                        <v-icon>mdi-close</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>Reject</v-list-item-title>
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
            max-width="650px"
        >
            <v-card class="p-2 rounded-l">
                <v-card-title class="text-center">
                    <v-row>
                        <v-col cols="12">
                            Request Pencairan Budgeting
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
                                ></v-autocomplete> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="6" v-show="showDetail">
                                <h6 class="blue-lcd mb-1">Doc ID</h6>
                                <v-text-field
                                    solo
                                    dense
                                    persistent-hint
                                    v-model="doc_id"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                >
                                </v-text-field>
                            </v-col>
                            <v-col class="col-12" sm="6" md="6" >
                                <h6 class="blue-lcd mb-1">Period Budget</h6>
                                <v-menu
                                    ref="modal_budget"
                                    v-model="modal_budget"
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
                                        v-model="period_budget"
                                        label="Period"
                                        persistent-hint
                                        append-icon="mdi-calendar"
                                        v-bind="attrs"
                                        v-on="on"
                                        class="ma-0 pa-0 border-12"
                                        hide-details=true
                                        
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="period_budget"
                                        type="month"
                                        no-title
                                        :min="min_month"
                                        :max="max_month"
                                        @input="[modal_budget = false, getActivityHeader(), getAcNum()]"
                                        :allowed-dates="allowedMonths"
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                            <!-- v-show="showCreate" -->
                            <v-col class="col-12" sm="6" md="6" >
                                <h6 class="blue-lcd mb-1">AC Num <span class="red--text"><strong>* </strong></span></h6>
                                <v-autocomplete
                                    dense
                                    solo
                                    clearable
                                    v-model="ac_num"
                                    :items="ac_nums"
                                    item-value="ac_num"
                                    :item-text="item => item.ac_num +' - '+ item.ac_name"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                    @change="(event) => getActivityHeader(event)"
                                ></v-autocomplete> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">Date Request <strong style="color:red;">*</strong><span></span></h6>
                                <v-menu
                                    ref="modal_request"
                                    v-model="modal_request"
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
                                        label="Period"
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
                                        no-title
                                        :min="min_month"
                                        :max="max_month"
                                        @input="modal_request = false"
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col class="col-12" sm="6" md="6" >
                                <h6 class="blue-lcd mb-1">Activity No <span class="red--text"><strong>* </strong></span></h6>
                                <v-autocomplete
                                    dense
                                    solo
                                    clearable
                                    v-model="activity_no"
                                    :items="activity_headers"
                                    item-value="activity_no"
                                    :item-text="item => item.activity_no +' - '+ item.period +' - '+ item.remark"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                    @change="(event) =>  setApprovedBudget(event)"
                                ></v-autocomplete> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">Approved Budget<strong style="color:red;">*</strong><span></span></h6>
                                <div class="v-input ma-0 pa-0 v-input--dense border-12 theme--light v-text-field v-text-field--single-line v-text-field--solo
                                dense v-text-field--is-booted v-text-field--enclosed">
                                    <div class="v-input__control">
                                        <div class="v-input__slot">
                                            <div class="v-text-field__slot">
                                                <money class="" name="target" v-model.lazy="budget_allocated" v-bind="money" v-bind:readonly="true"></money>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">Amount Request <strong style="color:red;">*</strong><span></span></h6>
                                <div class="v-input ma-0 pa-0 v-input--dense border-12 theme--light v-text-field v-text-field--single-line v-text-field--solo
                                dense v-text-field--is-booted v-text-field--enclosed">
                                    <div class="v-input__control">
                                        <div class="v-input__slot">
                                            <div class="v-text-field__slot">
                                                <money class="" name="target" v-model.lazy="amount_request" v-bind="money"></money>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </v-col>
                            <v-col class="col-12" sm="6" md="6" v-show="showDetail">
                                <h6 class="blue-lcd mb-1">Amount Approved <strong style="color:red;">*</strong><span></span></h6>
                                <div class="v-input ma-0 pa-0 v-input--dense border-12 theme--light v-text-field v-text-field--single-line v-text-field--solo
                                dense v-text-field--is-booted v-text-field--enclosed">
                                    <div class="v-input__control">
                                        <div class="v-input__slot">
                                            <div class="v-text-field__slot">
                                                <money class="" name="target" v-model.lazy="amount_approved" v-bind="money"></money>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </v-col>
                            <v-col class="col-12" sm="6" md="6" v-show="showDetail">
                                <h6 class="blue-lcd mb-1">Amount Paid <strong style="color:red;">*</strong><span></span></h6>
                                <div class="v-input ma-0 pa-0 v-input--dense border-12 theme--light v-text-field v-text-field--single-line v-text-field--solo
                                dense v-text-field--is-booted v-text-field--enclosed">
                                    <div class="v-input__control">
                                        <div class="v-input__slot">
                                            <div class="v-text-field__slot">
                                                <money class="" name="target" v-model.lazy="amount_paid" v-bind="money"></money>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">Bidang</h6>
                                <v-autocomplete
                                    dense
                                    solo
                                    clearable
                                    v-model="bidang"
                                    :items="bidangs"
                                    item-value="key_value"
                                    :item-text="item => item.key_value +' - '+ item.str1"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                ></v-autocomplete> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">Komisi</h6>
                                <v-autocomplete
                                    dense
                                    solo
                                    clearable
                                    v-model="komisi"
                                    :items="komisies"
                                    item-value="key_value"
                                    :item-text="item => item.key_value +' - '+ item.str1"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                ></v-autocomplete> 
                            </v-col> 
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">ACP</h6>
                                <v-autocomplete
                                    dense
                                    solo
                                    clearable
                                    v-model="acp"
                                    :items="acps"
                                    item-value="id"
                                    :item-text="item => item.id +' - '+ item.desc"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                ></v-autocomplete> 
                            </v-col>
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
                        <small class="mt-1 pt-1" v-if="showDetail == false">*indicates required field</small>
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
            max-width="650px"
        >
            <v-card class="p-2 rounded-l">
                <v-card-title class="text-center">
                    <v-row>
                        <v-col cols="12">
                            Edit Request Pencairan Budgeting
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
                                    disabled
                                ></v-autocomplete> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">Doc ID</h6>
                                <v-text-field
                                    solo
                                    dense
                                    persistent-hint
                                    v-model="doc_id"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                    disabled
                                >
                                </v-text-field>
                            </v-col>
                            <v-col class="col-12" sm="6" md="6" >
                                <h6 class="blue-lcd mb-1">Period Budget</h6>
                                <v-menu
                                    ref="modal_budget"
                                    v-model="modal_budget"
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
                                        v-model="period_budget"
                                        label="Period"
                                        persistent-hint
                                        append-icon="mdi-calendar"
                                        v-bind="attrs"
                                        v-on="on"
                                        class="ma-0 pa-0 border-12"
                                        hide-details=true
                                        
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="period_budget"
                                        type="month"
                                        no-title
                                        :min="min_month"
                                        :max="max_month"
                                        @input="[modal_budget = false, getActivityHeader(), getAcNum()]"
                                        :allowed-dates="allowedMonths"
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                            <!-- v-show="showCreate" -->
                            <v-col class="col-12" sm="6" md="6" >
                                <h6 class="blue-lcd mb-1">AC Num <span class="red--text"><strong>* </strong></span></h6>
                                <v-autocomplete
                                    dense
                                    solo
                                    clearable
                                    v-model="ac_num"
                                    :items="ac_nums"
                                    item-value="ac_num"
                                    :item-text="item => item.ac_num +' - '+ item.ac_name"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                    @change="(event) => getActivityHeader(event)"
                                ></v-autocomplete> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">Date Request <strong style="color:red;">*</strong><span></span></h6>
                                <v-menu
                                    ref="modal_request"
                                    v-model="modal_request"
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
                                        label="Period"
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
                                        no-title
                                        :min="min_month"
                                        :max="max_month"
                                        @input="modal_request = false"
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                            <!-- v-show="showApprove3" -->
                            <v-col class="col-12" sm="6" md="6" >
                                <h6 class="blue-lcd mb-1">Activity No <span class="red--text"><strong>* </strong></span></h6>
                                <v-autocomplete
                                    dense
                                    solo
                                    clearable
                                    v-model="activity_no"
                                    :items="activity_headers"
                                    item-value="activity_no"
                                    :item-text="item => item.activity_no +' - '+ item.period +' - '+ item.remark"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                    @change="(event) => getLedgerBudget(event)"
                                    disabled
                                ></v-autocomplete> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">Approved Budget<strong style="color:red;">*</strong><span></span></h6>
                                <div class="v-input ma-0 pa-0 v-input--dense border-12 theme--light v-text-field v-text-field--single-line v-text-field--solo
                                dense v-text-field--is-booted v-text-field--enclosed">
                                    <div class="v-input__control">
                                        <div class="v-input__slot">
                                            <div class="v-text-field__slot">
                                                <money class="" name="target" v-model.lazy="budget_allocated" v-bind="money" v-bind:readonly="true"></money>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">Amount Request <strong style="color:red;">*</strong><span></span></h6>
                                <div class="v-input ma-0 pa-0 v-input--dense border-12 theme--light v-text-field v-text-field--single-line v-text-field--solo
                                dense v-text-field--is-booted v-text-field--enclosed">
                                    <div class="v-input__control">
                                        <div class="v-input__slot">
                                            <div class="v-text-field__slot">
                                                <money class="" name="target" v-model.lazy="amount_request" v-bind="money" v-bind:readonly="showApprove3"></money>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </v-col>
                            <v-col class="col-12" sm="6" md="6" v-show="showApprove3">
                                <h6 class="blue-lcd mb-1">Amount Approved <strong style="color:red;">*</strong><span></span></h6>
                                <div class="v-input ma-0 pa-0 v-input--dense border-12 theme--light v-text-field v-text-field--single-line v-text-field--solo
                                dense v-text-field--is-booted v-text-field--enclosed">
                                    <div class="v-input__control">
                                        <div class="v-input__slot">
                                            <div class="v-text-field__slot">
                                                <money class="" name="target" v-model.lazy="amount_approved" v-bind="money"></money>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </v-col>
                            <v-col class="col-12" sm="6" md="6" v-show="showApprove3">
                                <h6 class="blue-lcd mb-1">Amount Paid</h6>
                                <div class="v-input ma-0 pa-0 v-input--dense border-12 theme--light v-text-field v-text-field--single-line v-text-field--solo
                                dense v-text-field--is-booted v-text-field--enclosed">
                                    <div class="v-input__control">
                                        <div class="v-input__slot">
                                            <div class="v-text-field__slot">
                                                <money class="" name="target" v-model.lazy="amount_paid" v-bind="money" v-bind:disabled="showApprove3"></money>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">Bidang</h6>
                                <v-autocomplete
                                    dense
                                    solo
                                    clearable
                                    v-model="bidang"
                                    :items="bidangs"
                                    item-value="key_value"
                                    :item-text="item => item.key_value +' - '+ item.str1"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                ></v-autocomplete> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">Komisi</h6>
                                <v-autocomplete
                                    dense
                                    solo
                                    clearable
                                    v-model="komisi"
                                    :items="komisies"
                                    item-value="key_value"
                                    :item-text="item => item.key_value +' - '+ item.str1"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                ></v-autocomplete> 
                            </v-col> 
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">ACP</h6>
                                <v-autocomplete
                                    dense
                                    solo
                                    clearable
                                    v-model="acp"
                                    :items="acps"
                                    item-value="id"
                                    :item-text="item => item.id +' - '+ item.desc"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                ></v-autocomplete> 
                            </v-col>
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
                            <v-btn block class="rounded-l mr-2" color="#fff" @click="[dialogEdit = false, showApprove3 = false, clear()]">Cancel</v-btn>
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
                            Filter Request Ledger Budget
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
                                <h6 class="blue-lcd mb-1">AC Num </h6>
                                <v-autocomplete
                                    dense
                                    solo
                                    clearable
                                    v-model="ac_num"
                                    :items="ac_nums"
                                    item-value="ac_num"
                                    :item-text="item => item.ac_num +' - '+ item.ac_name"
                                    @change="(event) => getActivityHeader(event)"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                ></v-autocomplete> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">Activity No </h6>
                                <v-autocomplete
                                    dense
                                    solo
                                    clearable
                                    v-model="activity_no"
                                    :items="activity_headers"
                                    item-value="activity_no"
                                    :item-text="item => item.activity_no +' - '+ item.period +' - '+ item.remark"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                ></v-autocomplete> 
                            </v-col>
                            <v-col cols="12" xs="12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">Start Date </h6>
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
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">Bidang</h6>
                                <v-autocomplete
                                    dense
                                    solo
                                    clearable
                                    v-model="bidang"
                                    :items="bidangs"
                                    item-value="key_value"
                                    :item-text="item => item.key_value +' - '+ item.str1"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                ></v-autocomplete> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">Komisi</h6>
                                <v-autocomplete
                                    dense
                                    solo
                                    clearable
                                    v-model="komisi"
                                    :items="komisies"
                                    item-value="key_value"
                                    :item-text="item => item.key_value +' - '+ item.str1"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                ></v-autocomplete> 
                            </v-col> 
                            <v-col class="col-12" sm="12" md="12">
                                <v-switch
                                    inset
                                    v-model="outstanding"
                                    label="Status Outstanding *"
                                    false-value="N"
                                    true-value="Y"
                                ></v-switch>
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
import {appl_constant} from "../../../backend-api/appl_constant/index"
import { Money } from 'v-money'
import {activity_header} from "../../../backend-api/ledger/budget/activity_header"
import {ledger_budget} from "../../../backend-api/ledger/coa/ledger_budget"
import {req_pencairan} from "../../../backend-api/ledger/budget/req_pencairan"
import {payment_pencairan} from "../../../backend-api/ledger/budget/payment_pencairan"
import {env_conf} from "../../../backend-api/env_conf/index"

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
            tab: 'tab-3',
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
            headers:[
                {
                    text: 'Entity',
                    align: 'start',
                    value: 'entity_id', 
                    align:'left', width:'25'},
                { text: 'Office', value: 'office' , align:'left', width:'50'},
                { text: 'AC Num', value: 'ac_num' , align:'left', width:'150'},
                { text: 'No Activity', value: 'activity_no' , align:'left', width:'50'},
                { text: 'Period Req', value: 'period_req' , align:'left', width:'50'},
                { text: 'Date Req', value: 'date_req' , align:'left', width:'100'},
                { text: 'Period Budget', value: 'period_budget' , align:'left', width:'50'},
                { text: 'Doc ID', value: 'doc_id' , align:'left', width:'50'},
                { text: 'Bidang', value: 'bidang' , align:'left', width:'50'},
                { text: 'Komisi', value: 'komisi' , align:'left', width:'50'},
                { text: 'Remark', value: 'remark' , align:'left', width:'200'},
                { text: 'Amt Request', value: 'amount_req' , align:'right', width:'50'},
                { text: 'Amt Aprv', value: 'amount_approved' , align:'right', width:'50'},
                { text: 'Amt Paid', value: 'amount_paid' , align:'right', width:'50'},
                { text: 'Aprv 1', value: 'approve_date_one' , align:'center', width:'50'},
                { text: 'Aprv 2', value: 'approve_date_two' , align:'center', width:'50'},
                { text: 'Aprv 3', value: 'approve_date_three' , align:'center', width:'50'},
                { text: 'Action', value: 'action' , align:'left', width:'50'},
            ],
            headersColumn: {
                'Entity ID': 'entity_id',
                'Office': 'office',
                'AC Num': 'ac_num',
                'Bidang': 'bidang',
                'Komisi': 'komisi',
                'Period Req': 'period_req',
                'Period Budget': 'period_budget',
                'No Activity': 'activity_no',
                'Doc ID': 'doc_id',
                'Remark': 'remark',
                'Amt Request': 'amount_req',
                'Amt Aprv': 'amount_approved',
                'Amt Paid': 'amount_paid'
            },
            request_pencairans: [],
            showDetail: false,
            entities: [],
            entity_id: '',
            offices: [],
            office_id: '',
            ac_num: '',
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
            ac_num: '',
            ac_nums: [],
            date: '',
            menu: false,
            modal_request: false,
            target: 0,
            actual: 0,
            min_month: '',
            max_month: '',
            mod: '',
            dialogfilter: false,
            mod_month: '',
            type: '',
            executor: '',
            form: '',
            expected: '',
            current: '',
            remark: '',
            amount_request: 0,
            budget_allocated:0,
            purposes: [
                {
                    purpose: '',
                    item_num : 1
                }
            ],
            purpose: '',
            details: [
                {
                    item_num : 1,
                    remark: '',
                    qty: 0,
                    total_activity: 0,
                    budget: 0,
                    subtotal: 0
                }
            ],
            dialogPurpose: false,
            dialogDetail: false,
            remark_detail: '',
            qty: 0,
            total_activity: 0,
            budget: 0,
            subtotal_budget: 0,
            budget_remark: '',
            budget_data:null,
            disabled_submit: false,
            current_budget: 0,
            bidangs: [],
            bidang: '',
            komisies: [],
            komisi: '',
            activity_no: '',
            activity_headers: [],
            amount_approved: 0,
            amount_paid: 0,
            doc_id: '',
            period_budget: '',
            menu_budget: false,
            modal_budget: false,
            showApprove3: false,
            showButtonAprv1: false,
            showButtonAprv2: false,
            showButtonAprv3: false,
            total_budget_activity: 0,
            modal_budget_edit: false,
            modal_request_edit:false,
            modal_filter: false,
            modal: false,
            modal_request_filter: false,
            envVarBidang:'',
            envVarKomisi:'',
            apprDateOne:'',
            apprByOne:'',
            outstanding: 'Y',
            date_from: '',
            modal: false,
            date_to: '',
            modal_to: false,
            acps: [],
            acp: ''
        }
    },
    computed:{
        total(){
            var total = 0

            for (let index = 0; index < this.details.length; index++) {
                total = total + parseFloat(this.details[index].subtotal);
            }
            
            return (total | 0)
        }
    },
    async mounted(){
        this.$store.dispatch('setOverlay', true)

        await this.getEnvConf()
        await this.getPullData()
        await this.getEntity()
        await this.getApplConstant()
        await this.glFlags()
        var current = new Date()
        var start_month = new Date(current.getFullYear(), 0, 2)
        var end = (new Date(current.getFullYear(), 11, 31))

        this.min_month = new Date(start_month).toISOString().substr(0, 10)
        this.max_month = new Date(end).toISOString().substr(0, 10)
        // console.log(this.$store.getters.GroupUser);
        this.$store.dispatch('setOverlay', false)

    },
    methods: {
        tr_datatable(item) {
            const rowClass = 'tr_datatable'
            return rowClass;
        },
        async getEnvConf(){
            var respData = await env_conf.getEnvVarConfUser(`?entity_id=GKI&appl_id=WEBGK&var_id=APRV1&groupid=${this.$store.state.user.group}`, null, false, false, false)
            if (respData.status === 200) {
                if (respData.data.data) {
                    if (respData.data.data == 'Y') {
                        this.showButtonAprv1 = true
                    } else {
                        this.showButtonAprv1 = false
                    }
                } else {
                    this.showButtonAprv1 = false
                }
            } else {
                this.showButtonAprv1 = false
            }

            var respDataAprv2 = await env_conf.getEnvVarConfUser(`?entity_id=GKI&appl_id=WEBGK&var_id=APRV2&groupid=${this.$store.state.user.group}`, null, false, false, false)
            if (respDataAprv2.status === 200) {
                if (respDataAprv2.data.data) {
                    if (respDataAprv2.data.data == 'Y') {
                        this.showButtonAprv2 = true
                    } else {
                        this.showButtonAprv2 = false
                    }
                } else {
                    this.showButtonAprv2 = false
                }
            } else {
                this.showButtonAprv2 = false
            }

            var respDataAprv3 = await env_conf.getEnvVarConfUser(`?entity_id=GKI&appl_id=WEBGK&var_id=APRV3&groupid=${this.$store.state.user.group}`, null, false, false, false)
            if (respDataAprv3.status === 200) {
                if (respDataAprv3.data.data) {
                    if (respDataAprv3.data.data == 'Y') {
                        this.showButtonAprv3 = true
                    } else {
                        this.showButtonAprv3 = false
                    }
                } else {
                    this.showButtonAprv3 = false
                }
            } else {
                this.showButtonAprv3 = false
            }
            this.envVarBidang = (this.$store.state.user.bidang) ? this.$store.state.user.bidang : ''
            this.envVarKomisi = (this.$store.state.user.komisi) ? this.$store.state.user.komisi : ''
        },
        async getApplConstant(){
            var respData = await appl_constant.fetchApplConstant("?key_code=BUDGETCYCLE&key_value=MONTH", null, false, false, false)
            if (respData.status === 200) {
                if (respData.data.data.length > 0) {
                    this.mod_month = parseInt(respData.data.data[0].int1)
                }
                // 
            }
            var pathBidang = "?key_code=BIDANG"
            if(this.envVarBidang != ''){
                pathBidang = `?key_code=BIDANG&key_value=${this.envVarBidang}`
            }
            
            var respDataBidang = await appl_constant.fetchApplConstant(pathBidang, null, false, false, false)
            if (respDataBidang.status === 200) {
                this.bidangs = respDataBidang.data.data
            }
            var pathKomisi = "?key_code=KOMISI"
            if(this.envVarKomisi != ''){
                pathKomisi = `?key_code=KOMISI&key_value=${this.envVarKomisi}`
            }
            var respDataKomisi = await appl_constant.fetchApplConstant(pathKomisi, null, false, false, false)
            if (respDataKomisi.status === 200) {
                this.komisies = respDataKomisi.data.data
            }
        },
        allowedMonths(val) {
            return parseInt(val.split('-')[1], 10) % Number(this.mod_month) === 1
        },
        async setApprovedBudget(val){
            var reqBody = {
                'office_id': this.office_id,
                'entity_id': this.entity_id,
                'ac_num': this.ac_num ? this.ac_num : '',
                'activity_no': this.activity_no ? this.activity_no : '',
                'period': this.period_budget ? new Date(this.period_budget).toISOString().substr(0, 7).replace(/-/g,"") : '',
            }
            const respData = await activity_header.getSumTotalAprvBudget('', reqBody, false, false, false)
            this.budget_allocated = respData.data.data.subtotal ? parseFloat(respData.data.data.subtotal.subtotal) : 0
            this.bidang = respData.data.data.header ? respData.data.data.header.bidang : ''
            this.komisi = respData.data.data.header ? respData.data.data.header.komisi : ''
            // this.acp = respData.data.data.header ? respData.data.data.header.gl_flag_id : ''
            this.acp = ''
        },
        clear(){
            this.office_id = ''
            this.entity_id = ''
            this.ac_num = ''
            this.date = ''
            this.period_budget = ''
            this.activity_no = ''
            this.activity_headers = []
            this.amount_approved = ''
            this.amount_paid = ''
            this.amount_request = ''
            this.budget_allocated = ''
            this.target = ''
            this.bidang = ''
            this.komisi = ''
            this.doc_id = ''
            this.remark = ''
            this.apprByOne = ''
            this.apprDateOne = ''
        },
        async rollBackOne(item) {
            var reqBody = {
                'doc_id': item.doc_id,
                'office_id': item.office_id,
                'entity_id': item.entity_id,
                'approve_by_one': item.approve_by_one,
                'approve_date_one': item.approve_date_one
            }

            const respData = await req_pencairan.rollback('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.snackbar = {
                    color: "success",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: 'Succesfully rollback approval',
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
        async rollBackTwo(item){
            var cek = await payment_pencairan.cekPayment(`?entity_id=${item.entity_id}&office_id=${item.office_id}&doc_id=${item.doc_id}&period_budget=${item.period_budget}&activity_no=${item.activity_no}`);
            if (cek.status === 200) {
                if(cek.data.data > 0){
                    this.snackbar = {
                        color: "info",
                        icon: "mdi-information-variant",
                        mode: "multi-line",
                        position: "top",
                        timeout: 7500,
                        title: "Info",
                        text: 'Payment already exist, rollback not allowed',
                        visible: true
                    };    
                } else {
                    var reqBody = {
                        'doc_id': item.doc_id,
                        'office_id': item.office_id,
                        'entity_id': item.entity_id,
                        'approve_by_two': item.approve_by_two,
                        'approve_date_two': item.approve_date_two
                    }

                    const respData = await req_pencairan.rollback('', reqBody, false, false, false)
                    if (respData.status === 200) {
                        this.snackbar = {
                            color: "success",
                            icon: "mdi-alert-circle",
                            mode: "multi-line",
                            position: "top",
                            timeout: 7500,
                            title: "Success",
                            text: 'Succesfully rollback approval two',
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
                    text: cek.data,
                    visible: true
                };
            }
            
            
        },
        async rollBackThree(item) {
            var reqBody = {
                'doc_id': item.doc_id,
                'office_id': item.office_id,
                'entity_id': item.entity_id,
                'approve_by_three': item.approve_by_three,
                'approve_date_three': item.approve_date_three
            }

            const respData = await req_pencairan.rollback('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.snackbar = {
                    color: "success",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: 'Succesfully rollback approval',
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
        async detailItem(val){
            var data = await this.getDetail(val)
            if (data.status === 200) {
                var item = data.data.data[0]
                this.detail = item
                this.dialog = true
                this.showDetail = true
                this.office_id = item.office_id
                this.entity_id = item.entity_id
                this.getBranchOffice()
                this.ac_num = item.ac_num
                this.getAcNum()
                this.date = item.date_req ? item.date_req.substr(0, 10) : item.period_req.substr(0, 4) + '-' + item.period_budget.substr(4, 7) + '-' + '01'
                this.period_budget = item.period_budget ? item.period_budget.substr(0, 4) + '-' + item.period_budget.substr(4, 7) : ''
                this.activity_no = item.activity_no ? parseInt(item.activity_no) : ''
                this.amount_approved = parseFloat(item.amount_approved)
                this.amount_paid = parseFloat(item.amount_paid)
                this.amount_request = parseFloat(item.amount_req)
                this.budget_allocated = parseFloat(item.alokasi)
                this.bidang = item.bidang
                this.komisi = item.komisi
                this.doc_id = item.doc_id
                this.remark = item.remark
                this.acp = item.gl_flag_id
                this.getActivityHeader(item)
            } else {
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
            }
            
        },
        async detailItemEdit(val, dec){
            console.log('value')
            console.log(val)
            var data = await this.getDetail(val)
            console.log('data')
            console.log(data)
            this.apprDateOne = data.data.data[0].approve_date_one
            this.apprByOne =  data.data.data[0].approve_by_one
            if (data.status === 200) {
                var item = data.data.data[0]
                this.detail = item
                this.dialogEdit = true
                if(dec == 'app2'){
                    this.showApprove3 = true
                }
                if (dec == 'edit'){
                    this.showApprove3 = false
                }
                this.office_id = item.office_id
                this.entity_id = item.entity_id
                this.getBranchOffice()
                this.ac_num = item.ac_num
                this.getAcNum()
                this.date = item.date_req ? item.date_req.substr(0, 10) : item.period_req.substr(0, 4) + '-' + item.period_budget.substr(4, 7) + '-' + '01'
                this.period_budget = item.period_budget ? item.period_budget.substr(0, 4) + '-' + item.period_budget.substr(4, 7) : ''
                this.activity_no = item.activity_no ? parseInt(item.activity_no) : ''
                this.amount_approved = parseFloat(item.amount_approved)
                this.amount_paid = parseFloat(item.amount_paid)
                this.amount_request = parseFloat(item.amount_req)
                this.budget_allocated = parseFloat(item.alokasi)
                this.bidang = item.bidang
                this.komisi = item.komisi
                this.doc_id = item.doc_id
                this.remark = item.remark
                this.acp = item.gl_flag_id
                this.getActivityHeader(item)
                this.getLedgerBudget(item)
            } else {
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
            }
        },
        async glFlags(){
            var respData = await ledger_coa.glFlag(``, null, false, false, false)
            if (respData.status === 200) {
                this.acps = respData.data.data
                console.log(this.acps);
            }
        },
        async getDetail(item){
            var respData = await req_pencairan.index(`?doc_id=${item.doc_id ? item.doc_id : ''}&entity_id=${item.entity_id ? item.entity_id : ''}&office_id=${item.office_id ? item.office_id : ''}&ac_num=${item.ac_num ? item.ac_num : ''}&activity_no=${item.activity_no ? item.activity_no : ''}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}`, null, false, false, false)
            return respData;
        },
        async getEntity(){
            var respData = await entity.fetchEntity("", null, false, false, false)
            if (respData.status === 200) {
                this.entities = respData.data
            }
        },
        async getPullData(){
            this.request_pencairans = []
            this.$store.dispatch('setOverlay', true)
            var subpath = ''
            if (this.search) {
                subpath = this.search ? `?search=${this.search}` : ''
            }
            var start_date = this.date_from ? new Date(this.date_from).toISOString().substr(0, 10) : ''
            var end_date = this.date_to ? new Date(this.date_to).toISOString().substr(0, 10) : ''

            var subpath = `?search=${this.search ? this.search : ''}&entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_num=${this.ac_num ? this.ac_num : ''}&activity_no=${this.activity_no ? this.activity_no : ''}&period_req=${this.date ? new Date(this.date).toISOString().substr(0, 7).replace(/-/g,"") : ''}&period_budget=${this.period_budget ? new Date(this.period_budget).toISOString().substr(0, 7).replace(/-/g,"") : ''}&outstanding=${this.outstanding === 'Y' ? this.outstanding : ''}&tr_date_start=${start_date ? start_date : ""}&tr_date_end=${end_date ? end_date : ""}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}`
            var subBidang = `&bidang=${this.bidang ? this.bidang : ''}`
            var komisi = `&komisi=${this.komisi ? this.komisi : ''}`
            if (this.envVarBidang != ''){
                subBidang = `&bidang=${this.envVarBidang}`
            }
            if (this.envVarKomisi != ''){
                komisi = `&komisi=${this.envVarKomisi}`
            }
            // var flagThree = `&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}`
            var glFlagId = `&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}`
            var finalPath = `${subpath}${subBidang}${komisi}${glFlagId}`
            var respData = await req_pencairan.index(finalPath, null, false, false, false)
            if (respData.status === 200) {
                this.request_pencairans = respData.data.data
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
                var respData = await activity_header.fetchLedgerHeaderBudget(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&komisi=${this.envVarKomisi ? this.envVarKomisi : ''}&bidang=${this.envVarBidang ? this.envVarBidang : ''}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}`, null, false, false, false)
                if (respData.status === 200) {
                    this.ac_nums = respData.data.data
                }
            }
        },
        async submit(){
            this.$store.dispatch('setOverlay', true)
            this.dialog = false

            if (this.entity_id === '' || this.office_id === '' || this.date == '' || this.amount_request == 0 || this.ac_num === '' || this.period_budget === '' || this.activity_no == '') {
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
                'ac_num': this.ac_num ? this.ac_num : '',
                'period_req': new Date(this.date).toISOString().substr(0, 7).replace(/-/g,""),
                'date_req': new Date(this.date).toISOString().substr(0, 10),
                'period_budget': this.period_budget ? new Date(this.period_budget).toISOString().substr(0, 7).replace(/-/g,"") : '',
                'activity_no': this.activity_no ? this.activity_no : '',
                'bidang': this.bidang,
                'remark': this.remark,
                'komisi': this.komisi,
                'amount_req': this.amount_request,
                'amount_approved': 0,
                'amount_paid': 0,
                'gl_flag_id': this.acp ? this.acp : ''
            }

            const respData = await req_pencairan.store('', reqBody, false, false, false)

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

            if (this.entity_id === '' || this.office_id === '' || this.date == '' || this.amount_request == 0) {
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

            if (this.showApprove3 === true) {
                if (this.ac_num === '' || this.period_budget === '' || this.activity_no == '' || this.amount_approved == 0) {
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
                

                if (parseFloat(this.amount_approved) > parseFloat(this.total_budget_activity)) {
                    this.snackbar = {
                        color: "error",
                        icon: "mdi-alert-circle",
                        mode: "multi-line",
                        position: "top",
                        timeout: 7500,
                        title: "Error",
                        text: 'Your Amount Approved melebihi total budget',
                        visible: true
                    };
                    this.$store.dispatch('setOverlay', false)
                    this.dialogEdit = true

                    return false
                }
            }

            var reqBody = {
                'doc_id': this.doc_id,
                'office_id': this.office_id,
                'entity_id': this.entity_id,
                'ac_num': this.ac_num ? this.ac_num : '',
                'period_req': new Date(this.date).toISOString().substr(0, 7).replace(/-/g,""),
                'date_req': new Date(this.date).toISOString().substr(0, 10),
                'period_budget': this.period_budget ? new Date(this.period_budget).toISOString().substr(0, 7).replace(/-/g,"") : '',
                'activity_no': this.activity_no ? this.activity_no : '',
                'bidang': this.bidang,
                'remark': this.remark,
                'komisi': this.komisi,
                'amount_req': this.amount_request,
                'amount_approved': this.amount_approved,
                'amount_paid': this.amount_paid,
                'approve_by_three' : this.showApprove3 === true ? 'aprv3' : '',
                'gl_flag_id': this.acp ? this.acp : ''
            }
            if(this.apprByOne != null){
                reqBody.approve_by_one = this.apprByOne
                reqBody.approve_date_one = this.apprDateOne
            }
            console.log(reqBody)

            const respData = await req_pencairan.update('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.snackbar = {
                    color: "success",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: 'Successfully Update Data',
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
        async aprove1(item){
            this.$store.dispatch('setOverlay', true)

            var reqBody = {
                'doc_id': item.doc_id,
                'office_id': item.office_id,
                'entity_id': item.entity_id
            }

            const respData = await req_pencairan.approve('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.snackbar = {
                    color: "success",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: 'Successfully Aprove Data',
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
        async aprove2(item){
            this.$store.dispatch('setOverlay', true)

            var reqBody = {
                'doc_id': item.doc_id,
                'office_id': item.office_id,
                'entity_id': item.entity_id
            }

            const respData = await req_pencairan.approve_two('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.snackbar = {
                    color: "success",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: 'Successfully Aprove Data',
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
        async reject(item){
            this.$store.dispatch('setOverlay', true)

            var reqBody = {
                'doc_id': item.doc_id,
                'office_id': item.office_id,
                'entity_id': item.entity_id
            }

            const respData = await req_pencairan.reject('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.snackbar = {
                    color: "success",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: 'Successfully Reject Data',
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
        async getActivityHeader(event){
            if (event === null || event === '') {
                this.activity_no = ''
            } else{
                this.activity_headers = []
                var respData = await activity_header.fetchLedgerHeaderBudget(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_num=${this.ac_num ? this.ac_num : ''}&bidang=${this.$store.state.user.bidang ? this.$store.state.user.bidang : ''}&komisi=${this.$store.state.user.komisi ? this.$store.state.user.komisi : ''}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}&approve_two=Y&period=${this.period_budget ? new Date(this.period_budget).toISOString().substr(0, 7).replace(/-/g,"") : ''}`, null, false, false, false)
                if (respData.status === 200) {
                    this.activity_headers = respData.data.data             
                }
            }
        },
        async getLedgerBudget(){
            console.log('getLedgerBudget')
            console.log(this.activity_no);
            console.log(this.activity_headers);
            if (this.period_budget) {
                var reqBody = {
                    'office_id': this.office_id,
                    'entity_id': this.entity_id,
                    'ac_num': this.ac_num,
                    'period': new Date(this.period_budget).toISOString().substr(0, 7).replace(/-/g,""),
                }
                console.log(reqBody)
                const respDataTotal = await activity_header.getSumTotalDetail('', reqBody, false, false, false)

                if (respDataTotal.status === 200) {
                    console.log(respDataTotal.data.data);
                    this.total_budget_activity = respDataTotal.data.data.subtotal ? respDataTotal.data.data.subtotal : 0
                }

            } else {
                this.snackbar = {
                            color: "error",
                            icon: "mdi-alert-circle",
                            mode: "multi-line",
                            position: "top",
                            timeout: 7500,
                            title: "Error",
                            text: 'Period Budget not yet set, Please set Period Budget',
                            visible: true
                        };
                return false
            }
        },
        async exportExcel(){
            var subpath = ''
            if (this.search) {
                subpath = this.search ? `?search=${this.search}` : ''
            }
            var subpath = `?search=${this.search ? this.search : ''}&entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_num=${this.ac_num ? this.ac_num : ''}&activity_no=${this.activity_no ? this.activity_no : ''}&period_req=${this.date ? new Date(this.date).toISOString().substr(0, 7).replace(/-/g,"") : ''}&period_budget=${this.period_budget ? new Date(this.period_budget).toISOString().substr(0, 7).replace(/-/g,"") : ''}`
            var subBidang = `&bidang=${this.bidang ? this.bidang : ''}`
            var komisi = `&komisi=${this.komisi ? this.komisi : ''}`
            if (this.envVarBidang != ''){
                subBidang = `&bidang=${this.envVarBidang}`
            }
            if (this.envVarKomisi != ''){
                komisi = `&komisi=${this.envVarKomisi}`
            }
            var flagThree = `&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}`
            var glFlagId = `&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}`
            var finalPath = `${subpath}${subBidang}${komisi}${flagThree}${glFlagId}`
            var respData = await req_pencairan.index(finalPath, null, false, false, false)
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
</style>