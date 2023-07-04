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
        <v-row class="mt-2">
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
                <v-tabs-items v-model="tab">
                    <v-tab-item
                        value="tab-1"
                    >
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
                                @click="[dialog = true, getReqBudgetOutstanding()]"
                                >
                                    Create New
                                </v-btn>
                            </v-card-title>
                            <v-card-text>
                                <v-data-table
                                    dense
                                    :headers="headers"
                                    :items="payment_targets"
                                    class="elevation-1 mt-3"
                                    :items-per-page="20"
                                    :loading="$store.state.overlay"
                                    height="578"
                                    fixed-header
                                    :divider="true"
                                    :light="true"
                                    :item-class="tr_datatable"
                                >     
                                    <template v-slot:[`item.total_paid`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.total_paid) }}
                                    </template>
                                    <template v-slot:[`item.dt_paid`]="{ item }">
                                        {{ item.dt_paid ? (new Date(new Date(item.dt_paid) - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) : '' }}
                                    </template>
                                    <template v-slot:[`item.approve_date_one`]="{ item }">
                                        <v-chip
                                        v-if="item.reject_by != ''"  
                                            class="ma-1"
                                            color="red"
                                            text-color="white"   
                                        >
                                            Rejected
                                        </v-chip>
                                        <v-chip
                                        v-else-if="item.approve_by_one === null || item.approve_by_one === ''"  
                                            class="ma-1"
                                            
                                            color="warning"
                                            text-color="white"                            
                                                
                                        >
                                            Not Approved
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
                                        v-if="item.reject_by != ''"  
                                            class="ma-1"
                                            color="red"
                                            text-color="white"   
                                        >
                                            Rejected
                                        </v-chip>
                                        <v-chip
                                        v-else-if="item.approve_by_two === null || item.approve_by_two === ''"  
                                            class="ma-1"
                                            
                                            color="warning"
                                            text-color="white"                            
                                                
                                        >
                                            Not Approved
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
                                                <v-list-item @click="[detailItemPrint(item)]">
                                                    <v-list-item-icon>
                                                        <v-icon>mdi-printer</v-icon>
                                                    </v-list-item-icon>
                                                    <v-list-item-content>
                                                        <v-list-item-title>Print</v-list-item-title>
                                                    </v-list-item-content>
                                                </v-list-item>
                                                <v-list-item @click="deleteItem(item)">
                                                    <v-list-item-icon>
                                                        <v-icon>mdi-delete</v-icon>
                                                    </v-list-item-icon>
                                                    <v-list-item-content>
                                                        <v-list-item-title>Delete</v-list-item-title>
                                                    </v-list-item-content>
                                                </v-list-item>
                                                <v-list-item v-if="showButtonAprv1 && (item.approve_by_one === null || item.approve_by_one === '') && (item.reject_by === null || item.reject_by === '')" @click="detailApprove(item, 'APRV')">
                                                    <v-list-item-icon>
                                                        <v-icon>mdi-check</v-icon>
                                                    </v-list-item-icon>
                                                    <v-list-item-content>
                                                        <v-list-item-title>Approve 1</v-list-item-title>
                                                    </v-list-item-content>
                                                </v-list-item>
                                                <v-list-item v-if="showButtonAprv2 && (item.approve_by_one != null || item.approve_by_one != '') && (item.approve_by_two === null || item.approve_by_two === '') && (item.reject_by === null || item.reject_by === '')" @click="detailApprove(item, 'APRV2')">
                                                    <v-list-item-icon>
                                                        <v-icon>mdi-check</v-icon>
                                                    </v-list-item-icon>
                                                    <v-list-item-content>
                                                        <v-list-item-title>Approve 2</v-list-item-title>
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
                            <v-card class="p-2 rounded-l">
                                <v-card-title class="text-center">
                                    <v-row>
                                        <v-col cols="12">
                                            <div class="d-flex">
                                                <div class="ml-5">
                                                    Payment Target Income
                                                </div>
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    class="mx-2"
                                                    fab
                                                    x-small
                                                    color="#e83e8c;"
                                                    @click="[dialog = false, showDetail = false, clear()]"
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
                                    <v-container fluid>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-card outlined style="border-radius: 0px;">
                                                    <v-card-title>
                                                        Target Outstanding
                                                    </v-card-title>
                                                    <v-card-text class="p-2">
                                                        <v-container fluid class="pt-0 mt-0">
                                                            <v-row>
                                                                <v-col class="col-12" sm="6" md="2">
                                                                    <h6 class="blue-lcd mb-1">Entity ID</h6>
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
                                                                        @change="(event) => [getBranchOffice(event), getReqBudgetOutstanding()]"
                                                                    ></v-autocomplete> 
                                                                </v-col>
                                                                <v-col class="col-12" sm="6" md="2">
                                                                    <h6 class="blue-lcd mb-1">Office ID</h6>
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
                                                                        @change="(event) => getReqBudgetOutstanding()"
                                                                    ></v-autocomplete> 
                                                                </v-col>
                                                                <v-col class="col-12" sm="6" md="2" >
                                                                    <h6 class="blue-lcd mb-1">Period Budget</h6>
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
                                                                            :min="min_month"
                                                                            :max="max_month"
                                                                            :allowed-dates="allowedMonths"
                                                                            @input="[getAcNum(), modal = false, getReqBudgetOutstanding()]"
                                                                        ></v-date-picker>
                                                                    </v-menu>
                                                                </v-col>
                                                                <v-col class="col-12" sm="6" md="2">
                                                                    <h6 class="blue-lcd mb-1">AC Num</h6>
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
                                                                        @change="(event) => getReqBudgetOutstanding()"
                                                                    ></v-autocomplete> 
                                                                </v-col>
                                                                <v-col class="col-12" sm="6" md="2">
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
                                                                        @change="(event) => getReqBudgetOutstanding()"
                                                                    ></v-autocomplete> 
                                                                </v-col>
                                                                <v-col class="col-12" sm="6" md="2">
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
                                                                        @change="(event) => getReqBudgetOutstanding()"
                                                                    ></v-autocomplete> 
                                                                </v-col> 
                                                            </v-row>
                                                        </v-container>                                        
                                                        <v-data-table
                                                            dense
                                                            :headers="header_requests"
                                                            :items="target_outstandings"
                                                            class="elevation-1 mt-2"
                                                            :items-per-page="20"
                                                            :loading="$store.state.overlay"
                                                            height="200"
                                                            fixed-header
                                                            :divider="true"
                                                            :light="true"
                                                            :item-class="tr_datatable_outstanding"
                                                            @click:row="showDetailRequest"
                                                        >     
                                                            <template v-slot:[`item.bgt_amt`]="{ item }">
                                                                {{ $store.getters.convertToCurrencyUs(item.bgt_amt) }}
                                                            </template>
                                                            <template v-slot:[`item.amt_rcvd`]="{ item }">
                                                                {{ $store.getters.convertToCurrencyUs(item.amt_rcvd) }}
                                                            </template>
                                                        </v-data-table>
                                                    </v-card-text>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                        <v-row class="mt-2">
                                            <v-col cols="12">
                                                <v-card outlined style="border-radius: 0px;">
                                                    <v-card-title>
                                                        Payment
                                                    </v-card-title>
                                                    <v-card-text class="p-2">
                                                        <v-container class="mt-0 pt-0">
                                                            <v-row>
                                                                <v-col cols="12">
                                                                    <v-simple-table
                                                                        fixed-header   
                                                                        height="280"                                                       
                                                                    >
                                                                        <thead>
                                                                            <tr style="border-top:1px solid rgb(216 212 212);">
                                                                                <th class="text-left" style="width:3%" >
                                                                                    No
                                                                                </th>
                                                                                <th class="text-left"  style="width:10%">
                                                                                    Ac Num
                                                                                </th>
                                                                                <th class="text-left"  style="width:10%">
                                                                                    Activity No
                                                                                </th> 
                                                                                <th class="text-left"  style="width:10%">
                                                                                    Activity
                                                                                </th>
                                                                                <th class="text-left"  style="width:15%">
                                                                                    Catatan
                                                                                </th> 
                                                                                <th class="text-left"  style="width:15%">
                                                                                    Account Bank
                                                                                </th>                                                         
                                                                                <th class="text-right"  style="width:10%">
                                                                                    Req Target Amount
                                                                                </th>
                                                                                <th class="text-right"  style="width:10%">
                                                                                    Total Amount Received
                                                                                </th>
                                                                                <th class="text-right"  style="width:15%">
                                                                                    Amount Received
                                                                                </th>
                                                                                <th class="text-center"  style="width:2%" v-if="showDetail == false">
                                                                                    
                                                                                </th>                                                    
                                                                            </tr>
                                                                        </thead>  
                                                                        <tbody>
                                                                            <tr 
                                                                                v-for="(detail, index) in details"
                                                                                :key="detail.item_num"
                                                                            >
                                                                                <td class="text-left">{{ detail.item_num }}</td>
                                                                                <td class="text-left">
                                                                                    {{ detail.ac_num }}
                                                                                </td>
                                                                                <td class="text-left">
                                                                                    {{ detail.activity_no }}
                                                                                </td>
                                                                                <td class="text-left">{{ detail.remark }}</td>
                                                                                <td class="text-left">
                                                                                    <v-text-field
                                                                                        solo
                                                                                        dense
                                                                                        persistent-hint
                                                                                        v-model="detail.note"
                                                                                        class="ma-0 pa-0 border-12"
                                                                                        hide-details=true
                                                                                    >
                                                                                    </v-text-field>
                                                                                </td>
                                                                                <td>
                                                                                    <v-autocomplete
                                                                                        dense
                                                                                        solo
                                                                                        clearable
                                                                                        v-model="detail.bank_acc"
                                                                                        :items="bank_accs"
                                                                                        item-value="bank_acc"
                                                                                        :item-text="item => item.bank_acc +' - '+ item.bank_name"
                                                                                        class="ma-0 pa-0 border-12"
                                                                                        hide-details=true
                                                                                        @change="(event) => getDetailAccountBank(index, event)"
                                                                                    ></v-autocomplete> 
                                                                                </td>
                                                                                <td class="text-left">
                                                                                    <div class="v-input ma-0 pa-0 v-input--dense border-12 theme--light v-text-field v-text-field--single-line v-text-field--solo
                                                                                    dense v-text-field--is-booted v-text-field--enclosed">
                                                                                        <div class="v-input__control">
                                                                                            <div class="v-input__slot">
                                                                                                <div class="v-text-field__slot">
                                                                                                    <money class="" name="bgt_amt" v-model.lazy="detail.bgt_amt" v-bind="money" v-bind:readonly="true"></money>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                                <td class="text-left">
                                                                                    <div class="v-input ma-0 pa-0 v-input--dense border-12 theme--light v-text-field v-text-field--single-line v-text-field--solo
                                                                                    dense v-text-field--is-booted v-text-field--enclosed">
                                                                                        <div class="v-input__control">
                                                                                            <div class="v-input__slot">
                                                                                                <div class="v-text-field__slot">
                                                                                                    <money class="" name="amt_rcvd" v-model.lazy="detail.amt_rcvd" v-bind="money" v-bind:readonly="true"></money>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                                <td class="text-center">
                                                                                    <div class="v-input ma-0 pa-0 v-input--dense border-12 theme--light v-text-field v-text-field--single-line v-text-field--solo
                                                                                    dense v-text-field--is-booted v-text-field--enclosed">
                                                                                        <div class="v-input__control">
                                                                                            <div class="v-input__slot">
                                                                                                <div class="v-text-field__slot">
                                                                                                    <money class="" name="trans_amount" v-model.lazy="detail.trans_amount" v-bind="money" @change.native="calculatePrice($event, detail, index)"></money>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                                <td v-if="showDetail == false">
                                                                                    <v-btn small class="p-1 text-white" color="red" @click="deleteDetail(detail, index)" >
                                                                                        <v-icon>
                                                                                            mdi-delete
                                                                                        </v-icon>
                                                                                    </v-btn>
                                                                                </td>
                                                                            </tr>
                                                                            <tr v-if="showDetail == false">
                                                                                <td colspan="9">
                                                                                    <v-btn block class="p-3 py-4" color="#d8dee2" @click="submitDetail()" >
                                                                                        <v-icon>
                                                                                            mdi-plus
                                                                                        </v-icon>
                                                                                        Tambah baris satu
                                                                                    </v-btn>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </v-simple-table>
                                                                </v-col>
                                                                <v-col cols="12" class="mt-3">
                                                                    <v-row justify="end">
                                                                        <v-col class="col-12 pt-0 pb-0" sm="6" md="3">
                                                                            <div class="d-flex">
                                                                                <p class="blue-lcd pt-0 pb-0 mt-0 mb-0">Total Paid :</p>   
                                                                                <v-spacer></v-spacer>
                                                                                <h6 class="red--text" style="font-weight:600">IDR. {{ $store.getters.convertToCurrencyUs(total) }}</h6>
                                                                            </div>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-col>
                                                            </v-row>
                                                        </v-container>
                                                    </v-card-text>
                                                </v-card>
                                            </v-col>
                                        </v-row>
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
                            fullscreen
                            hide-overlay
                            transition="dialog-bottom-transition"
                            style="border-radius: 0 !important"
                        >
                            <v-card class="p-2 rounded-l">
                                <v-card-title class="text-center">
                                    <v-row>
                                        <v-col cols="12">
                                            <div class="d-flex">
                                                <div class="ml-5">
                                                    Edit Payment Budget
                                                </div>
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    class="mx-2"
                                                    fab
                                                    x-small
                                                    color="#e83e8c;"
                                                    @click="[dialogEdit = false, showApprove2 = false, clear()]"
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
                                    <v-container fluid>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-card outlined style="border-radius: 0px;">
                                                    <v-card-text class="p-2">
                                                        <v-container>
                                                            <v-row class="mb-5">
                                                                <v-col class="col-12" sm="6" md="2">
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
                                                                <v-col class="col-12" sm="6" md="2">
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
                                                                        @change="(event) => getAcNum(event)"
                                                                        disabled
                                                                    ></v-autocomplete> 
                                                                </v-col>
                                                                <v-col class="col-12" sm="6" md="2" >
                                                                    <h6 class="blue-lcd mb-1">Period Budget <strong style="color:red;">*</strong><span></span></h6>
                                                                    <v-menu
                                                                        ref="modal_edit"
                                                                        v-model="modal_edit"
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
                                                                            disabled
                                                                            ></v-text-field>
                                                                        </template>
                                                                        <v-date-picker
                                                                            v-model="date"
                                                                            type="month"
                                                                            no-title
                                                                            :min="min_month"
                                                                            :max="max_month"
                                                                            :allowed-dates="allowedMonths"
                                                                            @input="[getReqPencairan(), modal_edit = false]"
                                                                            disabled
                                                                        ></v-date-picker>
                                                                    </v-menu>
                                                                </v-col>
                                                                <v-col class="col-12" sm="6" md="2">
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
                                                                        @change="(event) => getReqPencairan(event)"
                                                                        disabled
                                                                    ></v-autocomplete> 
                                                                </v-col>
                                                                <v-col class="col-12" sm="6" md="2">
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
                                                                        disabled
                                                                    ></v-autocomplete> 
                                                                </v-col>
                                                                <v-col class="col-12" sm="6" md="2">
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
                                                                        disabled
                                                                    ></v-autocomplete> 
                                                                </v-col> 
                                                                <v-col class="col-12" sm="6" md="2">
                                                                    <h6 class="blue-lcd mb-1">Date Paid <strong style="color:red;">*</strong><span></span></h6>
                                                                    <v-menu
                                                                        ref="modal_date_paid"
                                                                        v-model="modal_date_paid"
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
                                                                            v-model="date_paid"
                                                                            label="Date Paid"
                                                                            persistent-hint
                                                                            append-icon="mdi-calendar"
                                                                            v-bind="attrs"
                                                                            v-on="on"
                                                                            class="ma-0 pa-0 border-12"
                                                                            hide-details=true
                                                                            ></v-text-field>
                                                                        </template>
                                                                        <v-date-picker
                                                                            v-model="date_paid"
                                                                            type="date"
                                                                            no-title
                                                                            :max="max_date"
                                                                            @input="modal_date_paid = false"
                                                                        ></v-date-picker>
                                                                    </v-menu>
                                                                </v-col>
                                                                <v-col class="col-12" sm="6" md="2">
                                                                    <h6 class="blue-lcd mb-1">Doc ID <strong style="color:red;">*</strong><span></span></h6>
                                                                    <v-autocomplete
                                                                        dense
                                                                        solo
                                                                        clearable
                                                                        v-model="doc_id"
                                                                        :items="req_pencairans"
                                                                        item-value="doc_id"
                                                                        :item-text="item => item.doc_id"
                                                                        class="ma-0 pa-0 border-12"
                                                                        hide-details=true
                                                                        disabled
                                                                    ></v-autocomplete>
                                                                </v-col>
                                                            </v-row>
                                                        </v-container>
                                                    </v-card-text>
                                                </v-card>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-card outlined style="border-radius: 0px;" height="500">
                                                    <v-card-text class="p-2">
                                                        <v-container>
                                                            <v-row class="mt-2">
                                                                <v-col cols="12">
                                                                    <v-simple-table
                                                                        fixed-header   
                                                                        height="400"                                                       
                                                                    >
                                                                        <thead>
                                                                            <tr style="border-top:1px solid rgb(216 212 212);">
                                                                                <th class="text-left" style="width:3%" >
                                                                                    No
                                                                                </th>
                                                                                <th class="text-left"  style="width:10%">
                                                                                    Ac Num
                                                                                </th>
                                                                                <th class="text-left" style="width:10%">
                                                                                    Doc ID
                                                                                </th>
                                                                                <th class="text-left"  style="width:10%">
                                                                                    Activity No
                                                                                </th> 
                                                                                <th class="text-left"  style="width:15%">
                                                                                    Remark
                                                                                </th> 
                                                                                <th class="text-left"  style="width:15%">
                                                                                    Account Bank
                                                                                </th>                                                         
                                                                                <th class="text-right"  style="width:10%">
                                                                                    Req Aprv Amount
                                                                                </th>
                                                                                <th class="text-right"  style="width:10%">
                                                                                    Total Amount Paid
                                                                                </th>
                                                                                <th class="text-right"  style="width:15%">
                                                                                    Amount Paid
                                                                                </th>
                                                                                <th class="text-center"  style="width:2%" v-if="showDetail == false">
                                                                                    
                                                                                </th>                                                    
                                                                            </tr>
                                                                        </thead>  
                                                                        <tbody>
                                                                            <tr v-for="(detail, index) in detail_items"
                                                                                :key="detail.item_num">
                                                                                <td class="text-left">{{ index+1 }}</td>
                                                                                <td class="text-left">
                                                                                    {{ detail.ac_num }}
                                                                                </td>
                                                                                <td class="text-left">
                                                                                    {{ detail.doc_id }}
                                                                                </td>
                                                                                <td class="text-left">
                                                                                    {{ detail.activity_no }}
                                                                                </td>
                                                                                <td class="text-left">{{ detail.remark }}</td>
                                                                                <td>
                                                                                    <v-autocomplete
                                                                                        dense
                                                                                        solo
                                                                                        clearable
                                                                                        v-model="detail.bank_acc"
                                                                                        :items="bank_accs"
                                                                                        item-value="bank_acc"
                                                                                        :item-text="item => item.bank_acc +' - '+ item.bank_name"
                                                                                        class="ma-0 pa-0 border-12"
                                                                                        hide-details=true
                                                                                        @change="(event) => getDetailAccountBankEdit(detail.item_num, event, index)"
                                                                                        :disabled="detail.is_disabled"
                                                                                    ></v-autocomplete> 
                                                                                </td>
                                                                                <td class="text-left">
                                                                                    <div class="v-input ma-0 pa-0 v-input--dense border-12 theme--light v-text-field v-text-field--single-line v-text-field--solo
                                                                                    dense v-text-field--is-booted v-text-field--enclosed">
                                                                                        <div class="v-input__control">
                                                                                            <div class="v-input__slot">
                                                                                                <div class="v-text-field__slot">
                                                                                                    <money class="" name="req_amount_approve" v-model.lazy="detail.req_amount_approve" v-bind="money" v-bind:readonly="true"></money>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                                <td class="text-left">
                                                                                    <div class="v-input ma-0 pa-0 v-input--dense border-12 theme--light v-text-field v-text-field--single-line v-text-field--solo
                                                                                    dense v-text-field--is-booted v-text-field--enclosed">
                                                                                        <div class="v-input__control">
                                                                                            <div class="v-input__slot">
                                                                                                <div class="v-text-field__slot">
                                                                                                    <money class="" name="total_amount_received" v-model.lazy="detail.total_amount_received" v-bind="money" v-bind:readonly="true"></money>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                                <td class="text-center">
                                                                                    <div class="v-input ma-0 pa-0 v-input--dense border-12 theme--light v-text-field v-text-field--single-line v-text-field--solo
                                                                                    dense v-text-field--is-booted v-text-field--enclosed">
                                                                                        <div class="v-input__control">
                                                                                            <div class="v-input__slot">
                                                                                                <div class="v-text-field__slot">
                                                                                                    <money class="" name="amount_paid" v-model.lazy="detail.amount_paid" v-bind="money" @change.native="calculatePriceEdit($event, detail, index)" v-bind:readonly="detail.is_disabled"></money>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                                <td v-if="showDetail == false">
                                                                                    <v-btn small class="p-1 text-white" color="red" @click="deleteDetailEdit(detail, index)" >
                                                                                        <v-icon>
                                                                                            mdi-delete
                                                                                        </v-icon>
                                                                                    </v-btn>
                                                                                </td>
                                                                            </tr>
                                                                            <tr v-if="showDetail == false">
                                                                                <td colspan="9">
                                                                                    <v-btn block class="p-3 py-4" color="#d8dee2" @click="submitDetail()" >
                                                                                        <v-icon>
                                                                                            mdi-plus
                                                                                        </v-icon>
                                                                                        Tambah baris satu
                                                                                    </v-btn>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </v-simple-table>
                                                                </v-col>
                                                                <v-col cols="12" class="mt-3">
                                                                    <v-row justify="end">
                                                                        <v-col class="col-12 pt-0 pb-0" sm="6" md="3">
                                                                            <div class="d-flex">
                                                                                <p class="blue-lcd pt-0 pb-0 mt-0 mb-0">Total Paid :</p>   
                                                                                <v-spacer></v-spacer>
                                                                                <h6 class="red--text" style="font-weight:600">IDR. {{ $store.getters.convertToCurrencyUs(total) }}</h6>
                                                                            </div>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-col>
                                                            </v-row>
                                                        </v-container>
                                                    </v-card-text>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions class="text-center">
                                    <v-row justify="center">
                                        <v-col cols="12" xs="12" sm="3" md="3">
                                            <v-btn block class="rounded-l mr-2" color="#fff" @click="[dialogEdit = false, showApprove2 = false, clear()]">Cancel</v-btn>
                                        </v-col>
                                        <v-col cols="12" xs="12" sm="3" md="3">
                                            <v-btn block class="rounded-l text-white" color="success" @click="submitEdit()">Save</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog
                            v-model="dialogPrint"
                            persistent
                            fullscreen
                            hide-overlay
                            transition="dialog-bottom-transition"
                            style="border-radius: 0 !important"
                        >
                            <v-card class="p-2 rounded-l">
                                <v-card-title class="text-center">
                                    <v-row>
                                        <v-col cols="12">
                                            <div class="d-flex">
                                                Print Payment
                                                <v-spacer></v-spacer>
                                                <v-btn class="rounded-l text-white" color="success" @click="printTicket()">Print</v-btn>
                                            </div>
                                        </v-col>
                                        <v-divider></v-divider>
                                    </v-row>
                                </v-card-title>
                                <v-card-text>
                                    <v-row align="center" justify="center" class="mt-4">
                                        <div style="width: 960px;" id="divNamePaymentTarget">
                                            <table width="960" cellspacing="0" cellpadding="0" class="container" style="width: 960px; margin-top: 20px; padding: 20px;border: 1px solid #DDD;font-size: 14px;">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <table width="100%" cellspacing="0" cellpadding="0" style="width: 100%; padding-bottom: 10px;border-bottom: 1px solid #DDD;">
                                                                <tbody>
                                                                    <tr style="margin-top: 8px; margin-bottom: 8px;">
                                                                        <td style="width: 95%;">
                                                                            <div class="d-flex">
                                                                                <img src="../../../assets/logo_gki.png" height="60px" alt="">
                                                                                <p class="mt-4 ml-4">{{ this.entity_id }}</p>
                                                                            </div>
                                                                        </td>
                                                                        <!-- <td>
                                                                            <div style="transform: rotate(0deg);margin-right: 20px;">
                                                                                <span style="border: 2px solid #4caf50;padding: 5px 30px;   color: #4caf50;">
                                                                                    <b>
                                                                                        PAID
                                                                                    </b>
                                                                                </span>
                                                                            </div>
                                                                            
                                                                        </td> -->
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <table width="100%" cellspacing="0" cellpadding="0" style="width: 100%; margin: 10px 0;">
                                                                <tbody>
                                                                    <tr style="margin-top: 8px; margin-bottom: 8px;">
                                                                        <td style="width:15%; padding-left: 5px;">
                                                                            Entity
                                                                        </td>
                                                                        <td style="width:5%">
                                                                            :
                                                                        </td>
                                                                        <td style="width:30%">
                                                                            {{ this.entity_id }}
                                                                        </td>
                                                                        <td style="width:15%; padding-left: 5px;">
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
                                                                        <td style="width:15%; padding-left: 5px;">
                                                                            Bidang
                                                                        </td>
                                                                        <td style="width:5%">
                                                                            :
                                                                        </td>
                                                                        <td style="width:30%">
                                                                            {{ this.bidang }}
                                                                        </td>
                                                                        <td style="width:15%; padding-left: 5px;">
                                                                            Komisi
                                                                        </td>
                                                                        <td style="width:5%">
                                                                            :
                                                                        </td>
                                                                        <td style="width:30%">
                                                                            {{ this.komisi }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr style="margin-top: 8px; margin-bottom: 8px;">
                                                                        <td style="width:15%; padding-left: 5px;">
                                                                            No Payment
                                                                        </td>
                                                                        <td style="width:5%">
                                                                            :
                                                                        </td>
                                                                        <td style="width:30%">
                                                                            {{ this.detail ? this.detail.target_income_no : '' }}
                                                                        </td>
                                                                        <td style="width:15%; padding-left: 5px;">
                                                                            Tanggal
                                                                        </td>
                                                                        <td style="width:5%">
                                                                            :
                                                                        </td>
                                                                        <td style="width:30%">
                                                                            {{ this.trans_date }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr style="margin-top: 8px; margin-bottom: 8px;">
                                                                        <td style="width:15%; padding-left: 5px;">
                                                                            Account
                                                                        </td>
                                                                        <td style="width:5%">
                                                                            :
                                                                        </td>
                                                                        <td style="width:30%">
                                                                            {{ this.detail ? this.detail.ac_num : '' }}
                                                                        </td>
                                                                        <td style="width:15%; padding-left: 5px;">
                                                                            Account Name
                                                                        </td>
                                                                        <td style="width:5%">
                                                                            :
                                                                        </td>
                                                                        <td style="width:30%">
                                                                            {{ this.detail ? this.detail.ac_name : '' }}
                                                                        </td>
                                                                    </tr>
                                                                    
                                                                </tbody>
                                                            </table>
                                                            <table width="100%" cellspacing="0" cellpadding="0" style="width: 100%; margin: 10px 0;border-top: 1px solid #DDD;">
                                                                <thead>
                                                                    <tr style="border-bottom: 1px solid #DDD;">
                                                                        <th class="text-left" style="width:5%; padding: 10px 10px;" >
                                                                            No
                                                                        </th>
                                                                        <th class="text-left"  style="width:15%; padding: 10px 10px;">
                                                                            Ac Num
                                                                        </th>
                                                                        <th class="text-left"  style="width:15%; padding: 10px 10px;">
                                                                            Account Bank
                                                                        </th>
                                                                        <th class="text-left" style="width:15%; padding: 10px 10px;">
                                                                            No Payment
                                                                        </th>
                                                                        <th class="text-left"  style="width:35%; padding: 10px 10px;">
                                                                            Remark
                                                                        </th>
                                                                        <th class="text-right"  style="width:15%;text-align: right; padding: 10px 10px;">
                                                                            Amount
                                                                        </th>                                                
                                                                    </tr>
                                                                </thead>  
                                                                <tbody>
                                                                    <tr 
                                                                        v-for="(dtl, index) in details"
                                                                        :key="dtl.item_num"
                                                                    >
                                                                        <td class="text-left" style="width:5%; padding: 5px 10px;" @click="index">
                                                                            {{ dtl.item_num }}
                                                                        </td>
                                                                        <td class="text-left"  style="width:15%; padding: 5px 10px;">
                                                                            {{dtl.acc_code_dr}}
                                                                        </td>
                                                                        <td class="text-left"  style="width:15%; padding: 5px 10px;">
                                                                            {{dtl.bank_acc}}
                                                                        </td>
                                                                        <td class="text-left" style="width:15%; padding: 5px 10px;">
                                                                            {{ dtl.target_income_no }}
                                                                        </td>
                                                                        <td class="text-left"  style="width:40%; padding: 5px 10px;">
                                                                            {{ dtl.note }}
                                                                        </td>
                                                                        <td class="text-right"  style="width:15%;text-align: right; padding: 5px 10px;">
                                                                            {{$store.getters.convertToCurrencyUs(dtl.trans_amount)}}
                                                                        </td>   
                                                                    </tr>
                                                                    <tr style="border: 1px solid #DDD;">
                                                                        <td colspan="2" style="padding: 5px 10px;"> Total : </td>
                                                                        <td colspan="4" class="text-right" style="text-align: right;padding: 5px 10px;">
                                                                            Rp. {{$store.getters.convertToCurrencyUs(total)}}
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <table width="100%" cellspacing="0" cellpadding="0" style="width: 100%; border: 1px solid #DDD;">
                                                                <tr>
                                                                    <td style="padding: 5px 10px;width: 10%;"> Terbilang : </td>
                                                                    <td style="padding: 5px 10px;">
                                                                        {{terbilang}}
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <table width="100%" cellspacing="0" cellpadding="0" style="width: 100%; margin-top: 5px;border-bottom: 1px solid #DDD;border-top: 1px solid #DDD;">
                                                                <thead>
                                                                    <tr style="border-bottom: 1px solid #DDD;">
                                                                        <th class="text-center" style="width:25%; padding: 10px 10px;border: 1px solid #DDD;" >
                                                                            Dibayarkan Oleh, 
                                                                        </th>
                                                                        <th colspan="2" class="text-center"  style="width:25%; padding: 10px 10px;border: 1px solid #DDD;">
                                                                            Diketahui Oleh, 
                                                                        </th>
                                                                        <th class="text-center"  style="width:25%; padding: 10px 10px;border: 1px solid #DDD;">
                                                                            Diterima Oleh,
                                                                        </th>                                              
                                                                    </tr>
                                                                </thead>  
                                                                <tbody>
                                                                    <tr 
                                                                    >
                                                                        <td class="text-center" style="width:25%; padding: 5px 10px; border: 1px solid #DDD;">
                                                                            <br><br><br>
                                                                            Cashier
                                                                        </td>
                                                                        <td class="text-center"  style="width:25%; padding: 5px 10px; border: 1px solid #DDD;">
                                                                            <br><br><br>
                                                                            Accounting
                                                                        </td>
                                                                        <td class="text-center" style="width:25%; padding: 5px 10px; border: 1px solid #DDD;">
                                                                            <br><br><br>
                                                                            Acc&Fin Manager
                                                                        </td>
                                                                        <td class="text-center"  style="width:25%; padding: 5px 10px; border: 1px solid #DDD;">
                                                                            <br><br><br>
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
                            <v-card-actions class="text-center">
                                <v-row justify="center">
                                    <v-col cols="12" xs="12" sm="3" md="3">
                                        <v-btn block class="rounded-l mr-2" color="#fff" @click="[dialogPrint = false, clear()]">Close</v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-actions>
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
                                            Filter Payment Ledger Target
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
                                                ></v-autocomplete> 
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="6" >
                                                <h6 class="blue-lcd mb-1">Period Budget </h6>
                                                <v-menu
                                                    ref="modal_filter"
                                                    v-model="modal_filter"
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
                                                        :min="min_month"
                                                        :max="max_month"
                                                        :allowed-dates="allowedMonths"
                                                        @input="[getAcNum(), modal_filter = false]"
                                                    ></v-date-picker>
                                                </v-menu>
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
                                                    class="ma-0 pa-0 border-12"
                                                    hide-details=true
                                                ></v-autocomplete> 
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
                                            <!-- <v-col class="col-12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">Outstanding </h6>
                                                <v-autocomplete
                                                    dense
                                                    solo
                                                    v-model="outstanding"
                                                    :items="outstandings"
                                                    item-value="outstanding"
                                                    :item-text="item => item.outstanding"
                                                    class="ma-0 pa-0 border-12"
                                                    hide-details=true
                                                ></v-autocomplete> 
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">Period Paid </h6>
                                                <v-menu
                                                    ref="modal_date_paid_filter"
                                                    v-model="modal_date_paid_filter"
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
                                                        v-model="periodPaid"
                                                        label="Period Paid"
                                                        persistent-hint
                                                        append-icon="mdi-calendar"
                                                        v-bind="attrs"
                                                        v-on="on"
                                                        class="ma-0 pa-0 border-12"
                                                        hide-details=true
                                                        ></v-text-field>
                                                    </template>
                                                    <v-date-picker
                                                        type="month"
                                                        v-model="periodPaid"
                                                        no-title
                                                        :min="min_month"
                                                        :max="max_month"
                                                        @input="modal_date_paid_filter = false"
                                                    ></v-date-picker>
                                                </v-menu>
                                            </v-col> -->
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
                        <v-dialog
                            v-model="dialog_aprv"
                            max-width="400px"
                            persistent
                        >
                            <v-card style="overflow: hidden;">
                                <v-card-title class="p-1">                        
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        class="mx-2"
                                        fab
                                        x-small
                                        color="#e83e8c;"
                                        @click="[dialog_aprv = false, clear()]"
                                    >
                                        <v-icon dark>
                                            mdi-close
                                        </v-icon>
                                    </v-btn>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12">
                                                <h6 class="text-center">
                                                    {{ detail ? detail.target_income_no : '' }}
                                                </h6>
                                                <p class="text-center">
                                                    Are you sure Approve this Target Income ？
                                                </p>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions class="text-center p-3">
                                    <v-row justify="center">
                                        <v-col cols="12" xs="12" sm="3" md="3">
                                            <v-btn block class="rounded-l p-3" @click="reject()">Reject</v-btn>
                                        </v-col>
                                        <v-col cols="12" xs="12" sm="3" md="3"> 
                                            <v-btn block class="rounded-l text-white p-3" color="#003871" @click="approve(aprv)">Approve</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog
                            v-model="dialog_delete"
                            max-width="400px"
                            persistent
                        >
                            <v-card style="overflow: hidden;">
                                <v-card-title class="p-1">                        
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        class="mx-2"
                                        fab
                                        x-small
                                        color="#e83e8c;"
                                        @click="[dialog_delete = false, clear()]"
                                    >
                                        <v-icon dark>
                                            mdi-close
                                        </v-icon>
                                    </v-btn>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12">
                                                <h6 class="text-center">
                                                    {{ detail ? detail.target_income_no : '' }}
                                                </h6>
                                                <p class="text-center">
                                                    Are you sure Delete this Target Income ？
                                                </p>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions class="text-center p-3">
                                    <v-row justify="center">
                                        <v-col cols="12" xs="12" sm="3" md="3">
                                            <v-btn block class="rounded-l p-3" @click="[dialog_delete = false, clear()]">Cancel</v-btn>
                                        </v-col>
                                        <v-col cols="12" xs="12" sm="3" md="3"> 
                                            <v-btn block class="rounded-l text-white p-3" color="#003871" @click="deletePayment()">Delete</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-tab-item>
                    <v-tab-item
                        value="tab-2"
                    >
                    </v-tab-item>
                    <v-tab-item
                        value="tab-3"
                    >
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
import {appl_constant} from "../../../backend-api/appl_constant/index"
import { Money } from 'v-money'
import {req_pencairan} from "../../../backend-api/ledger/budget/req_pencairan"
import {payment_pencairan} from "../../../backend-api/ledger/budget/payment_pencairan"
import {target_income} from "../../../backend-api/finance/target_income"
import {env_conf} from "../../../backend-api/env_conf/index"
import {account_bank} from "../../../backend-api/ledger/account_bank"
import {gl_journal_voucher} from "../../../backend-api/ledger/transaction/gl_journal_voucher"
import {ledger_budget} from "../../../backend-api/ledger/coa/ledger_budget"
import {CalculateTerbilang} from "../../../model/calculate_terbilang"
import {utility} from "../../../backend-api/utils/index"

// TODO disini salah pas edit disable saja field amountnya, supaya didelete paymentnya lalu masukan baru
export default {
    components: {
        Money
    },
    data() {
        return {
            isEditAllowed:true,
            money: {
				decimal: '.',
				thousands: ',',
				prefix: '',
				suffix: '',
				precision: 0,
				masked: false
			},
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
            breadcumbs: [
                {
                    text: 'Target Income',
                    disabled: false,
                    href: '/admin/target',
                },
                {
                    text: 'Target Dibursement',
                    disabled: true,
                }
            ],
            headers:[
                { text: 'No Target', value: 'target_income_no' , align:'left', width:'150'},
                { text: 'AC Num', value: 'ac_num' , align:'left', width:'150'},
                { text: 'AC Name', value: 'ac_name' , align:'left', width:'150'},
                { text: 'Bidang', value: 'bidang' , align:'left', width:'150'},
                { text: 'Komisi', value: 'komisi' , align:'left', width:'150'},
                { text: 'Trans Date', value: 'trans_date' , align:'left', width:'150'},
                { text: 'Period Budget', value: 'period_budget' , align:'left', width:'150'},
                { text: 'Remark', value: 'remark' , align:'left', width:'300'},
                { text: 'Approve 1', value: 'approve_date_one' , align:'center', width:'50'},
                { text: 'Approve 2', value: 'approve_date_two' , align:'center', width:'50'},
                { text: 'Action', value: 'action' , align:'left', width:'50'},
            ],
            headersColumn: {
                'No Target': 'target_income_no',
                'AC Num': 'ac_num',
                'AC Name': 'ac_name',
                'Bidang': 'bidang',
                'Komisi': 'komisi',
                'Trans Date': 'trans_date',
                'Period Budget': 'period_budget',
                'Remark': 'remark'
            },
            payment_targets: [],
            showDetail: false,
            entities: [],
            entity_id: '',
            offices: [],
            office_id: '',
            ac_num: '',
            currency: '',
            status: '',
            detail: null,
            showDetail: false,
            dialogEdit: false,
            ac_num: '',
            ac_nums: [],
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
            remark: '',
            amount_request: 0,
            purposes: [
                {
                    purpose: '',
                    item_num : 1
                }
            ],
            purpose: '',
            details: [
                // {
                //     item_num : 1,
                //     doc_id: '',
                //     activity_no: '',
                //     remark: '',
                //     period_budget: '',
                //     req_amount_approve: 0,
                //     amount_paid: 0,
                //     total_amount_received: 0,
                //     subtotal: 0
                // }
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
            showApprove2: false,
            showButtonAprv1: false,
            showButtonAprv2: false,
            total_budget_activity: 0,
            modal_date_paid: false,
            date_paid: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            periodPaid: new Date((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)).toISOString().substr(0, 7),
            currentPeriod: '',
            currentYear: '',
            currentDate:'',
            bank_acc: '',
            bank_accs: [],
            account: null,
            req_pencairans:[],
            amount_target: 0,
            acc_code_cr: '',
            ac_par_cr: '',
            ac_sub_par_one_cr: '',
            ac_par_dr: '',
            ac_sub_par_one_dr: '',
            min_date: '',
            max_date: '',
            dialogPrint: false,
            terbilang: '',
            target_outstandings: [],
            header_requests:[
                { text: 'AC Num', value: 'ac_num' , align:'left', width:'100'},
                { text: 'No Activity', value: 'activity_no' , align:'left', width:'50'},
                { text: 'Activity', value: 'remark' , align:'left', width:'50'},
                { text: 'Executor', value: 'executor' , align:'left', width:'50'},
                { text: 'Period Budget', value: 'period' , align:'left', width:'50'},
                { text: 'Amt Target', value: 'bgt_amt' , align:'right', width:'50'},
                { text: 'Amt Received', value: 'amt_rcvd' , align:'right', width:'50'}
            ],
            rowReq: null,
            doc_id: '',
            debits:[],
            credits: [],
            modal_edit: false,
            modal_filter: false,
            modal_date_paid_filter: false,
            total_amount_received: 0,
            outstanding:'Y',
            outstandings:['Y', 'N', 'A'],
            tabs: [],
            trans_date: '',
            aprv: '',
            dialog_aprv: false,
            dialog_delete: false
        }
    },
    computed:{
        total(){
            var total = 0
            for (let index = 0; index < this.details.length; index++) {
                if (this.details[index].is_del == 0 || this.details[index].is_del == '0') {
                    total = total + parseFloat(this.details[index].subtotal);
                }
            }
            
            return (total | 0)
        },
        detail_items(){
            return this.details.filter(i => i.is_del === 0)
        },
        isEditDisabled() {
            return function (item) {
                return item.period_paid != this.currentPeriod;
            };
        },
    },
    async mounted(){
        this.$store.dispatch('setOverlay', true)
        await this.systemDate()
        await this.getApplConstant()
        await this.getEnvConf()
        await this.getPullData()
        await this.getEntity()
        await this.getAccountBank()
        var current = new Date()
        var start_month = new Date(current.getFullYear(), 0, 2)
        var end = (new Date(current.getFullYear(), 11, 31))

        var start_date = new Date(current.getFullYear(), current.getMonth(), 1)
        var end_date = new Date(current.getFullYear(), current.getMonth() + 1, 1)

        this.min_month = new Date(start_month).toISOString().substr(0, 7)
        this.max_month = new Date(end).toISOString().substr(0, 7)

        this.min_date = new Date().toISOString().substr(0, 10)
        this.max_date = new Date(end_date).toISOString().substr(0, 10)

        this.$store.dispatch('setOverlay', false)

    },
    methods: {
        async systemDate(){
            var respData = await utility.fetchSysDate(``, null, false, false, false)
            if (respData.status === 200) {
                this.currentPeriod = respData.data.data.period
                this.currentYear = respData.data.data.year
                this.currentDate = respData.data.data.today
            }
        },
        tr_datatable(item) {
            const rowClass = 'tr_datatable'
            return rowClass;
        },
        tr_datatable_outstanding(item) {
            var rowClass = 'tr_datatable';

            if (this.rowReq) {
                if (this.rowReq.ac_num === item.ac_num && this.rowReq.period === item.period && this.rowReq.activity_no === item.activity_no) {
                    rowClass = 'tr_choice';
                } else {
                    rowClass = 'tr_datatable';
                }
            } else {
                rowClass = 'tr_datatable';
            }
                        
            // const rowClass = item.ac_num === this.ac_num ? 'tr_choice' : 'tr_datatable'
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
        },
        async getEnvConfig(var_id){
            var respDatamnCOA = await env_conf.getEnvVarConfUser(`?entity_id=GKI&appl_id=WEBGK&var_id=${var_id}&groupid=${this.$store.state.user.group}`, null, false, false, false)
            if (respDatamnCOA.status === 200) {
                var menu = respDatamnCOA.data.data ? respDatamnCOA.data.data : '' 

                return menu
            } else {
                return false
            }
        },
        async getApplConstant(){
            var respData = await appl_constant.fetchApplConstant("?key_code=BUDGETCYCLE&key_value=MONTH", null, false, false, false)
            if (respData.status === 200) {
                if (respData.data.data.length > 0) {
                    this.mod_month = parseInt(respData.data.data[0].int1)
                }
                // 
            }
            var respDataBidang = await appl_constant.fetchApplConstant(`?key_code=BIDANG&key_value=${this.bidang ? this.bidang : ''}`, null, false, false, false)
            if (respDataBidang.status === 200) {
                this.bidangs = respDataBidang.data.data
            }

            var respDataKomisi = await appl_constant.fetchApplConstant(`?key_code=KOMISI&key_value=${this.komisi ? this.komisi : ''}`, null, false, false, false)
            if (respDataKomisi.status === 200) {
                this.komisies = respDataKomisi.data.data
            }

            var respDataTabs = await appl_constant.fetchApplConstant("?key_value=TARGET&str2=PAYMENT LEDGER TARGET&sort_order=asc&order_by=int1", null, false, false, false)
            if (respDataTabs.status === 200) {
                var tabs = respDataTabs.data.data
                for (let index = 0; index < tabs.length; index++) {
                    const element = tabs[index];
                    const key_code = await this.getEnvConfig(element.key_code)
                    if (key_code) {
                        tabs.splice(index, 1);
                    }
                }
                this.tabs = tabs
                console.log(this.tabs);
            }
        },
        allowedMonths(val) {
            return parseInt(val.split('-')[1], 10) % Number(this.mod_month) === 1
        },
        clear(){
            this.office_id = ''
            this.entity_id = ''
            this.ac_num = ''
            this.bidang = ''
            this.komisi = ''
            this.date = ''
            this.date_paid =  (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
            // this.periodPaid = new Date((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)).toISOString().substr(0, 7)
            this.bank_acc = ''
            this.currency = ''
            this.remark = ''
            this.details = []
            this.debits = []
            this.credits = []
        },
        async detailItem(item){
            this.$store.dispatch('setOverlay', true)
            this.detail = item
            this.office_id = item.office_id
            this.entity_id = item.entity_id
            this.bidang = item.bidang
            this.komisi = item.komisi
            this.trans_date = item.trans_date ? (new Date(new Date(item.trans_date) - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) : ''
            this.ac_num = item.ac_num
            // this.getAcNum()
            await this.detailPayment()
            this.dialogPrint = true
            this.$store.dispatch('setOverlay', false)
        },
        detailItemEdit(item){
            console.log(item);
            this.detail = item
            this.dialogEdit = true
            this.office_id = item.office_id
            this.entity_id = item.entity_id
            this.getBranchOffice()
            this.date_paid = item.dt_paid ? (new Date(new Date(item.dt_paid) - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) : ''
            this.doc_id = item.doc_id
            this.currency = item.curr_id
            this.remark = item.remark
            this.bidang = item.bidang
            this.komisi = item.komisi
            this.date = item.period_budget ? item.period_budget.substr(0, 4) + '-' + item.period_budget.substr(4, 6) : ''
            this.getAcNum()
            this.ac_num = item.ac_num
            console.log(item.ac_num);
            this.getReqPencairan()
            this.detailPayment()
            this.getDetailOutstanding()
        },
        async detailItemPrint(item){
            this.$store.dispatch('setOverlay', true)
            this.detail = item
            this.office_id = item.office_id
            this.entity_id = item.entity_id
            this.bidang = item.bidang
            this.komisi = item.komisi
            this.trans_date = item.trans_date ? (new Date(new Date(item.trans_date) - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) : ''
            this.ac_num = item.ac_num
            // this.getAcNum()
            await this.detailPayment()
            this.dialogPrint = true
            this.$store.dispatch('setOverlay', false)

            setTimeout(()=>{
            this.printTicket()
            },1500);
        },
        async detailApprove(item, aprv){
            this.$store.dispatch('setOverlay', true)
            this.aprv = aprv
            this.detail = item
            this.office_id = item.office_id
            this.entity_id = item.entity_id
            this.bidang = item.bidang
            this.komisi = item.komisi
            this.trans_date = item.trans_date ? (new Date(new Date(item.trans_date) - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) : ''
            this.ac_num = item.ac_num
            // this.getAcNum()
            await this.detailPayment()
            this.dialog_aprv = true
            this.$store.dispatch('setOverlay', false)
        },
        async deleteItem(item){
            this.$store.dispatch('setOverlay', true)
            this.detail = item
            this.office_id = item.office_id
            this.entity_id = item.entity_id
            this.bidang = item.bidang
            this.komisi = item.komisi
            this.trans_date = item.trans_date ? (new Date(new Date(item.trans_date) - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) : ''
            this.ac_num = item.ac_num
            // this.getAcNum()
            await this.detailPayment()
            this.dialog_delete = true
            this.$store.dispatch('setOverlay', false)
        },
        async getEntity(){
            var respData = await entity.fetchEntity("", null, false, false, false)
            if (respData.status === 200) {
                this.entities = respData.data
            }
        },
        async getPullData(){
            this.payment_targets = []
            this.$store.dispatch('setOverlay', true)
            var respData = await target_income.index(`?search=${this.search ? this.search : ''}&entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_num=${this.ac_num ? this.ac_num : ''}&period_budget=${this.date ? new Date(this.date).toISOString().substr(0, 7).replace(/-/g,"") : ''}&bank_acc=${this.bank_acc ? this.bank_acc : ''}&bidang=${this.$store.state.user.bidang ? this.$store.state.user.bidang : ''}&komisi=${this.$store.state.user.komisi ? this.$store.state.user.komisi : ''}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}`, null, false, false, false)
            if (respData.status === 200) {
                this.payment_targets = respData.data.data
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
                var reqBody = {
                    'office_id': this.office_id,
                    'entity_id': this.entity_id,
                    'period': new Date(this.date).toISOString().substr(0, 7).replace(/-/g,""),
                    'trans_type': 1
                }
                var respData = await ledger_budget.getBudget('', reqBody, false, false, false)
                if (respData.status === 200) {
                    this.ac_nums = respData.data.data
                }
            }
        },
        async getAccountBank(){
            var respData = await account_bank.index(`?posting=Y`, null, false, false, false)
            if (respData.status === 200) {
                this.bank_accs = respData.data.data
            }
        },
        async getReqPencairan(event){
            this.$store.dispatch('setOverlay', true)
            this.getDetailBudget(event)
            if (event === null || event === '') {
                this.$store.dispatch('setOverlay', false)
            } else {
                var respData = await req_pencairan.index(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_num=${this.ac_num ? this.ac_num : ''}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}&period_budget=${this.date ? new Date(this.date).toISOString().substr(0, 7).replace(/-/g,"") : ''}`, null, false, false, false)
                if (respData.status === 200) {
                    this.req_pencairans = respData.data.data
                    this.$store.dispatch('setOverlay', false)
                }
            }
        },
        async getDetailBudget(event){
            if (event === null || event === '') {
                this.ac_num = ''
                this.ac_par_dr = ''
                this.ac_sub_par_one_dr = ''
            } else{
                var reqBody = {
                    'office_id': this.office_id,
                    'entity_id': this.entity_id,
                    'period': new Date(this.date).toISOString().substr(0, 7).replace(/-/g,""),
                    'ac_num': this.ac_num
                }
                var respData = await ledger_budget.showBudget('', reqBody, false, false, false)
                if (respData.status === 200) {
                    this.ac_par_dr = respData.data.data ? respData.data.data.ac_par : ''
                    this.ac_sub_par_one_dr = respData.data.data ? respData.data.data.ac_sub_par_one : ''
                }
            }
        },
        async submit(){           
            var details = []

            this.$store.dispatch('setOverlay', true)
            this.dialog = false

            if (this.rowReq == null || this.total == 0) {
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

            for (let index = 0; index < this.details.length; index++) {
                details.push(
                    {
                        ac_num: this.details[index].acc_code_dr,
                        remark: this.details[index].note,
                        seq_no: this.details[index].item_num,
                        trans_amount: this.details[index].trans_amount
                    }
                )
            }

            var reqBody = {
                'office_id': this.rowReq ? this.rowReq.office_id : '',
                'entity_id': this.rowReq ? this.rowReq.entity_id : '',
                'activity_no': this.rowReq ? this.rowReq.activity_no : '',
                'ac_num': this.rowReq ? this.rowReq.ac_num : '',
                'period_budget': this.rowReq ? this.rowReq.period : '',
                'total_paid' : this.total,
                'realization_date' : this.date_paid,
                'remark' : this.rowReq ? this.rowReq.remark : '',
                'gl_flag_id': this.rowReq ? this.rowReq.gl_flag_id : '',
                'detail' : details
            }

            const respData = await target_income.store('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.snackbar = {
                    color: "success",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: 'Payment Successfully',
                    visible: true
                };

                this.$store.dispatch('setOverlay', false)
                this.dialog = false
                this.dialogEdit = false
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

            if (this.rowReq == null || this.total == 0) {
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

            if ((this.total + parseFloat(this.rowReq.amount_paid)) > this.amount_target) {
                this.snackbar = {
                    color: "error",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Error",
                    text: 'Total Amount Paid melebihi Total amount approve',
                    visible: true
                };

                this.$store.dispatch('setOverlay', false)
                this.dialogEdit = true

                return false
            }

            var details = []

            for (let index = 0; index < this.detail_items.length; index++) {
                details.push( 
                {
                    "item_num": index + 1,
                    "doc_id": this.detail_items[index].doc_id,
                    "ac_num": this.detail_items[index].ac_num,
                    "activity_no": this.detail_items[index].activity_no,
                    "remark": this.detail_items[index].remark,
                    "period_budget": this.detail_items[index].period_budget,
                    "req_amount_approve": this.detail_items[index].req_amount_approve,
                    "amount_paid": this.detail_items[index].amount_paid,
                    "total_amount_received": this.detail_items[index].total_amount_received,
                    "subtotal": this.detail_items[index].subtotal,
                    "account": this.detail_items[index].account ? this.detail_items[index].account : '',
                    "currency": this.detail_items[index].currency ? this.detail_items[index].currency : 'IDR',
                    "curr_id": this.detail_items[index].currency ? this.detail_items[index].currency : 'IDR',
                    "acc_code_cr": this.detail_items[index].acc_code_cr ? this.detail_items[index].acc_code_cr : '',
                    "ac_par_cr": this.detail_items[index].ac_par_cr ? this.detail_items[index].ac_par_cr : '',
                    "ac_sub_par_one_cr": this.detail_items[index].ac_sub_par_one_cr ? this.detail_items[index].ac_sub_par_one_cr : '',
                    "is_del": this.detail_items[index].is_del,
                    "bank_acc": this.detail_items[index].bank_acc
                })             
            }

            console.log(details);

            var reqBody = {
                'pay_no': this.detail.pay_no,
                'doc_id': this.doc_id,
                'office_id': this.office_id,
                'entity_id': this.entity_id,
                'ac_num': this.ac_num ? this.ac_num : '',
                'period_budget': new Date(this.date).toISOString().substr(0, 7).replace(/-/g,""),
                'total_paid' : this.total,
                'period_paid' : new Date(this.date_paid).toISOString().substr(0, 7).replace(/-/g,""),
                'dt_paid' : this.date_paid,
                'bidang': this.bidang ? this.bidang : '',
                'komisi': this.komisi ? this.komisi : '',
                'details' : details
            }

            const respData = await payment_pencairan.update('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.deletePaymentJournal()
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
        async deletePaymentJournal(){
            this.debits = []
            this.credits = []

            this.debits.push(
                {
                    ac_par : this.rowReq ? this.rowReq.ac_par : '',
                    ac_sub_par_one: this.rowReq ? this.rowReq.ac_sub_par_one : '',
                    ac_num_dr: this.rowReq ? this.rowReq.ac_num : '',
                    amt_dr: this.total,
                    is_del: 0,
                    remark:this.remark ? this.remark : '',
                }
            )

            for (let index = 0; index < this.details.length; index++) {
                this.credits.push(
                    {
                        ac_par : this.details[index].ac_par_cr,
                        ac_sub_par_one: this.details[index].ac_sub_par_one_cr,
                        ac_num_cr: this.details[index].acc_code_cr,
                        amt_cr: this.details[index].amount_paid,
                        is_del:this.details[index].is_del,
                        remark: this.remark ? this.remark : '',
                    }
                )
            }
            
            var reqBody = {
                'office_id': this.office_id,
                'entity_id': this.entity_id,
                'ac_num': this.ac_num ? this.ac_num : '',
                'period_budget': new Date(this.date).toISOString().substr(0, 7).replace(/-/g,""),
                'total_paid' : this.total,
                'period_paid' : new Date(this.date_paid).toISOString().substr(0, 7).replace(/-/g,""),
                'dt_paid' : this.date_paid,
                'bank_acc': this.bank_acc ? this.bank_acc : '',
                'curr_id' : this.currency ? this.currency : '',
                'remark' : this.remark ? this.remark : '',
                'bidang': this.bidang ? this.bidang : '',
                'komisi': this.komisi ? this.komisi : '',
                'details' : this.details,
                // 
                // 'entity_id': this.entity_id, //ok
                // 'office_id': this.office_id, //ok
                'tr_date': this.date_paid, 
                'source': 'PAY BUDGET', //ok
                'source_num': this.detail.pay_no,
                'cust_id': '',
                'vendor_id': '',
                // 'curr_id': this.currency ? this.currency : '',//ok
                'rate': '1',
                'cek_id': '',
                'dt_recon': '',
                'inv_id': '',
                'remark': '',
                'debit': this.debits,
                'credit': this.credits
            }

            const respData = await gl_journal_voucher.destroy('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.snackbar = {
                    color: "success",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: 'Payment Successfully',
                    visible: true
                };

                this.$store.dispatch('setOverlay', false)
                this.dialog = false
                this.dialogEdit = false
                this.clear()
                this.getPullData()
            }
        },
        deleteDetail(detail, index){
            this.details.splice(index, 1);
        },
        deleteDetailEdit(detail, index){
            this.detail_items[index].is_del = 1
        },
        async submitDetail(){
            if (this.rowReq) {
                if (this.total > this.amount_target) {
                    this.snackbar = {
                        color: "error",
                        icon: "mdi-alert-circle",
                        mode: "multi-line",
                        position: "top",
                        timeout: 7500,
                        title: "Error",
                        text: 'Total Amount Paid melebihi Total amount approve',
                        visible: true
                    };
                    // this.details.splice(this.details.length - 1, 1);

                    return false
                } else {
                    this.details.push(
                        {
                            item_num : this.details.length + 1,
                            ac_num: this.rowReq ? this.rowReq.ac_num : '',
                            activity_no: this.rowReq ? this.rowReq.activity_no : '',
                            remark: this.rowReq ? this.rowReq.remark : '',
                            period_budget: this.rowReq ? this.rowReq.period : '',
                            bgt_amt:  this.rowReq ? parseFloat(this.rowReq.bgt_amt) : 0,
                            trans_amount: 0,
                            amt_rcvd:  this.rowReq ? parseFloat(this.rowReq.amt_rcvd) : 0,
                            subtotal: 0,
                            account : '',
                            currency : '',
                            curr_id: 'IDR',
                            acc_code_dr : '',
                            ac_par_dr : '',
                            ac_sub_par_one_dr : '',
                            is_del: 0,
                            bank_acc: '',
                            note: ''
                        }
                    )
                }
            } else {
                this.snackbar = {
                    color: "error",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Error",
                    text: 'Please choice target outstanding',
                    visible: true
                };
                // this.details.splice(this.details.length - 1, 1);

                return false
            }
            
        },
        async submitDetailEdit(){
            console.log(this.amount_target, parseFloat(this.rowReq.amount_paid));
            if (this.total > this.amount_target) {
                this.snackbar = {
                    color: "error",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Error",
                    text: 'Total Amount Paid melebihi Total amount approve',
                    visible: true
                };
                // this.details.splice(this.details.length - 1, 1);

                return false
            } else {
                this.detail_items.push(
                    {
                        item_num : this.detail_items.length + 1,
                        doc_id: this.rowReq ? this.rowReq.doc_id : '',
                        ac_num: this.rowReq ? this.rowReq.ac_num : '',
                        activity_no: this.rowReq ? this.rowReq.activity_no : '',
                        remark: this.rowReq ? this.rowReq.remark : '',
                        period_budget: this.rowReq ? this.rowReq.period_budget : '',
                        req_amount_approve:  this.rowReq ? parseFloat(this.rowReq.amount_approved) : 0,
                        amount_paid: 0,
                        total_amount_received:  this.rowReq ? parseFloat(this.rowReq.amount_paid) : 0,
                        subtotal: 0,
                        account : '',
                        currency : '',
                        acc_code_cr : '',
                        ac_par_cr : '',
                        ac_sub_par_one_cr : '',
                        is_del: 0,
                        is_disabled: false
                    }
                )
            }
        },
        async getDetailReqPencairan(event, detail, index){
            console.log(event, detail, index);
            if (event === null || event === '') {
                this.details[index].doc_id = ''
                this.details[index].activity_no = ''
                this.details[index].remark = ''
                this.details[index].req_amount_approve = ''
                this.details[index].period_budget = ''
            } else {
                var respData = await req_pencairan.index(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_num=${this.ac_num ? this.ac_num : ''}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}&doc_id=${event}`, null, false, false, false)
                if (respData.status === 200) {
                    console.log(respData.data.data);
                    this.details[index].activity_no = respData.data.data ? respData.data.data[0].activity_no : ''
                    this.details[index].req_amount_approve = respData.data.data ? parseFloat(respData.data.data[0].amount_approved) : 0
                    this.details[index].period_budget = respData.data.data ? parseFloat(respData.data.data[0].period_budget) : ''
                    this.details[index].remark = respData.data.data ? respData.data.data[0].remark : ''
                    this.getTotalSumReqPencairan(event, detail, index)
                    this.getSumTotalPaidBgt(this.details[index].activity_no, index, event)
                }
            }
        },
        calculatePrice(event, detail, index){
            var total_price = 0
            var total_amount_received = this.details[index].amt_rcvd ? parseFloat(this.details[index].amt_rcvd) : 0
            var trans_amount = this.details[index].trans_amount ? parseFloat(this.details[index].trans_amount) : 0
            var req_amount_approve = this.details[index].bgt_amt ? parseFloat(this.details[index].bgt_amt) : 0

            if ((total_amount_received + trans_amount) > req_amount_approve) {
                this.snackbar = {
                    color: "error",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Error",
                    text: 'Amount Paid melebihi amount target',
                    visible: true
                };
                this.details[index].trans_amount = 0
            } else {
                total_price = trans_amount
                this.details[index].subtotal = total_price
            }
            
        },
        calculatePriceEdit(event, detail, index){
            var total_price = 0
            var total_amount_received = this.details[index].total_amount_received ? parseFloat(this.details[index].total_amount_received) : 0
            var amount_paid = this.detail_items[index].amount_paid ? parseFloat(this.detail_items[index].amount_paid) : 0
            var req_amount_approve = this.detail_items[index].req_amount_approve ? parseFloat(this.detail_items[index].req_amount_approve) : 0

            if ((total_amount_received + amount_paid) > req_amount_approve) {
                this.snackbar = {
                    color: "error",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Error",
                    text: 'Amount Paid melebihi amount approve',
                    visible: true
                };
                this.detail_items[index].amount_paid = 0
            } else {
                total_price = amount_paid
                this.detail_items[index].subtotal = total_price
            }
            
        },
        async getSumTotalPaidBgt(activity_no, index, doc_id){
            var reqBody = {
                'office_id': this.office_id ? this.office_id : '',
                'entity_id': this.entity_id ? this.entity_id : '',
                'ac_num': this.ac_num ? this.ac_num : '',
                'period_budget': this.date ? new Date(this.date).toISOString().substr(0, 7).replace(/-/g,"") : '',
                'activity_no': activity_no,
                'doc_id': doc_id
            }

            const respData = await req_pencairan.getSumTotalPaid('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.details[index].total_amount_received = respData.data.data ? parseFloat(respData.data.data.total_amount_received ? respData.data.data.total_amount_received : 0) : 0
            }
        },
        async getTotalSumReqPencairan(event, detail, index){
            var reqBody = {
                'office_id': this.office_id ? this.office_id : '',
                'entity_id': this.entity_id ? this.entity_id : '',
                'ac_num': this.ac_num ? this.ac_num : '',
                'period_budget': this.date ? new Date(this.date).toISOString().substr(0, 7).replace(/-/g,"") : ''
            }

            const respData = await req_pencairan.getSumTotalApproved('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.amount_target = respData.data.data ? parseFloat(respData.data.data.amount_target) : 0
            }
        },
        async detailPayment(){
            this.details = []

            var respData = await target_income.show(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&target_income_no=${this.detail ? this.detail.target_income_no : ''}&period_budget=${this.detail ? new Date(this.detail.period_budget).toISOString().substr(0, 7).replace(/-/g,"") : ''}`, null, false, false, false)

            if (respData.status === 200) {
                for (let index = 0; index < respData.data.data.length; index++) {
                    this.details.push(
                        {
                            item_num : respData.data.data[index].seq_no,
                            ac_num: this.detail ? this.detail.ac_num : '',
                            activity_no: this.detail ? this.detail.activity_no : '',
                            remark: this.detail ? this.detail.remark : '',
                            bank_acc: '',
                            period_budget: this.detail ? this.detail.period : '',
                            bgt_amt: parseFloat(this.detail ? this.detail.bgt_amt : 0),
                            trans_amount: parseFloat(respData.data.data[index].trans_amount),
                            amt_rcvd: parseFloat(this.detail ? this.detail.amt_rcvd : 0),
                            subtotal: parseFloat(respData.data.data[index].trans_amount),
                            account : '',
                            currency : '',
                            acc_code_dr : '',
                            ac_par_dr : '',
                            ac_sub_par_one_dr : '',
                            is_del: 0,
                            note: respData.data.data[index].remark,
                            target_income_no: respData.data.data[index].target_income_no
                        }
                    )

                    this.getDetailAccountNumBank(index, respData.data.data[index].ac_num)
            //         this.getSumTotalPaidBgt(respData.data.data[index].activity_no, index, respData.data.data[index].doc_id)

                }

                var terbilang = new CalculateTerbilang(this.total)
                this.terbilang = terbilang.pembilang()
                
            }
        },
        printTicket(){
            const elem = document.getElementById("divNamePaymentTarget")
            var domClone = elem.cloneNode(true);
    
            var $printSectionPaymentTarget = document.getElementById("printSectionPaymentTarget");
            
            if (!$printSectionPaymentTarget) {
                var $printSectionPaymentTarget = document.createElement("div");
                $printSectionPaymentTarget.id = "printSectionPaymentTarget";
                document.body.appendChild($printSectionPaymentTarget);
            }
            
            $printSectionPaymentTarget.innerHTML = "";
            $printSectionPaymentTarget.appendChild(domClone);
            window.print();
        },
        async getReqBudgetOutstanding(){
            var respData = await target_income.outstanding(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_num=${this.ac_num ? this.ac_num : ''}&period=${this.date ? new Date(this.date).toISOString().substr(0, 7).replace(/-/g,"") : ''}&bidang=${this.bidang ? this.bidang : ''}&komisi=${this.komisi ? this.komisi : ''}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}`, null, false, false, false)
            if (respData.status === 200) {
                this.target_outstandings = respData.data.data ? respData.data.data : []
            }
        },
        async showDetailRequest(row){
            this.details = []
            this.amount_target = parseFloat(row.bgt_amt)
            this.total_amount_received = parseFloat(row.amt_rcvd)
            this.rowReq = row
            this.details.push(
                {
                    item_num : this.details.length + 1,
                    ac_num: row.ac_num,
                    activity_no: row.activity_no,
                    remark: row.remark,
                    bank_acc: '',
                    period_budget: row.period,
                    bgt_amt: parseFloat(row.bgt_amt),
                    trans_amount: 0,
                    amt_rcvd: parseFloat(row.amt_rcvd),
                    subtotal: 0,
                    account : '',
                    currency : '',
                    acc_code_dr : '',
                    ac_par_dr : '',
                    ac_sub_par_one_dr : '',
                    is_del: 0,
                    note: ''
                }
            )
        },
        async getDetailAccountBank(index, event){
            if (event === null || event === '') {
                this.details[index].currency = ''
                this.details[index].account = null
                this.details[index].acc_code_dr = ''
                this.details[index].ac_par_dr = ''
                this.details[index].ac_sub_par_one_dr = ''
            } else {
                var respData = await account_bank.show(event, null, false, false, false)
                if (respData.status === 200) {
                    this.details[index].account = respData.data.data
                    this.details[index].currency = respData.data.data.curr_id
                    this.details[index].acc_code_dr = respData.data.data.acc_code
                    this.details[index].ac_par_dr = respData.data.data.ac_par
                    this.details[index].ac_sub_par_one_dr = respData.data.data.ac_sub_par_one
                }
            }
        },
        async getDetailAccountNumBank(index, event){
            if (event === null || event === '') {
                this.details[index].currency = ''
                this.details[index].account = null
                this.details[index].acc_code_dr = ''
                this.details[index].ac_par_dr = ''
                this.details[index].ac_sub_par_one_dr = ''
            } else {
                var respData = await account_bank.showAcNum(event, null, false, false, false)
                if (respData.status === 200) {
                    this.details[index].account = respData.data.data
                    this.details[index].currency = respData.data.data.curr_id
                    this.details[index].acc_code_dr = respData.data.data.acc_code
                    this.details[index].ac_par_dr = respData.data.data.ac_par
                    this.details[index].ac_sub_par_one_dr = respData.data.data.ac_sub_par_one
                    this.details[index].bank_acc = respData.data.data.bank_acc
                    
                }
            }
        },
        async getDetailAccountBankEdit(index, event, key){
            if (event === null || event === '') {
                this.details[index - 1].currency = ''
                this.details[index - 1].account = null
                this.details[index - 1].acc_code_cr = ''
                this.details[index - 1].ac_par_cr = ''
                this.details[index - 1].ac_sub_par_one_cr = ''
            } else {

                var bank_acc = this.detail_items.filter(i => i.bank_acc === event)

                if (bank_acc.length > 1) {
                    this.snackbar = {
                        color: "error",
                        icon: "mdi-alert-circle",
                        mode: "multi-line",
                        position: "top",
                        timeout: 7500,
                        title: "Error",
                        text: 'Please input different account',
                        visible: true
                    };

                    this.detail_items.splice(key, 1);

                    return false

                } else{
                    var respData = await account_bank.show(event, null, false, false, false)
                    if (respData.status === 200) {
                        this.details[index - 1].account = respData.data.data
                        this.details[index - 1].currency = respData.data.data.curr_id
                        this.details[index - 1].acc_code_cr = respData.data.data.acc_code
                        this.details[index - 1].ac_par_cr = respData.data.data.ac_par
                        this.details[index - 1].ac_sub_par_one_cr = respData.data.data.ac_sub_par_one
                    }
                }
                    
            }
        },
        async getDetailOutstanding(){
            var reqBody = {
                'office_id': this.office_id ? this.office_id : '',
                'entity_id': this.entity_id ? this.entity_id : '',
                'ac_num': this.ac_num ? this.ac_num : '',
                'period_budget': this.date ? new Date(this.date).toISOString().substr(0, 7).replace(/-/g,"") : '',
                'doc_id': this.doc_id
            }

            const respData = await req_pencairan.detailOutstanding('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.rowReq = respData.data.data ? respData.data.data : null
                this.amount_target = respData.data.data ? parseFloat(respData.data.data.amount_approved) : 0
            }
        },
        async exportExcel(){
            var respData = await target_income.index(`?search=${this.search ? this.search : ''}&entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_num=${this.ac_num ? this.ac_num : ''}&period_budget=${this.date ? new Date(this.date).toISOString().substr(0, 7).replace(/-/g,"") : ''}&bank_acc=${this.bank_acc ? this.bank_acc : ''}&bidang=${this.$store.state.user.bidang ? this.$store.state.user.bidang : ''}&komisi=${this.$store.state.user.komisi ? this.$store.state.user.komisi : ''}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}`, null, false, false, false)
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
        async reject(){
            var reqBody = {
                'office_id': this.detail ? this.detail.office_id : '',
                'entity_id': this.detail ? this.detail.entity_id : '',
                'activity_no': this.detail ? this.detail.activity_no : '',
                'ac_num': this.detail ? this.detail.ac_num : '',
                'period_budget': this.detail ? this.detail.period_budget : '',
                'target_income_no' : this.detail ? this.detail.target_income_no : ''
            }

            const respData = await target_income.reject('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.snackbar = {
                    color: "success",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: 'Rejected Successfully',
                    visible: true
                };

                this.dialog_aprv = false
                this.clear()
                this.getPullData()
            } else {
                this.snackbar = {
                    color: "error",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Error",
                    text: 'Error',
                    visible: true
                };
            }

            this.$store.dispatch('setOverlay', false)
        },
        async approve(aprv){
            this.$store.dispatch('setOverlay', true)

            if (aprv === 'APRV') {
                var reqBody = {
                    'office_id': this.detail ? this.detail.office_id : '',
                    'entity_id': this.detail ? this.detail.entity_id : '',
                    'activity_no': this.detail ? this.detail.activity_no : '',
                    'ac_num': this.detail ? this.detail.ac_num : '',
                    'period_budget': this.detail ? this.detail.period_budget : '',
                    'target_income_no' : this.detail ? this.detail.target_income_no : '',
                    'aprv' : 'APRV'
                }

                const respData = await target_income.approve('', reqBody, false, false, false)

                if (respData.status === 200) {
                    this.snackbar = {
                        color: "success",
                        icon: "mdi-alert-circle",
                        mode: "multi-line",
                        position: "top",
                        timeout: 7500,
                        title: "Success",
                        text: 'Approved Successfully',
                        visible: true
                    };

                    this.dialog_aprv = false
                    this.clear()
                    this.getPullData()
                } else {
                    this.snackbar = {
                        color: "error",
                        icon: "mdi-alert-circle",
                        mode: "multi-line",
                        position: "top",
                        timeout: 7500,
                        title: "Error",
                        text: 'Error',
                        visible: true
                    };
                }

                this.$store.dispatch('setOverlay', false)

            } else if(aprv === 'APRV2'){
                await this.approve_two()
                this.$store.dispatch('setOverlay', false)
            } else {
                return false
            }
        },
        async approve_two(){

            this.debits = []
            this.credits = []

            this.credits.push(
                {
                    ac_par : this.detail ? this.detail.ac_par : '',
                    ac_sub_par_one: this.detail ? this.detail.ac_sub_par_one : '',
                    ac_num_cr: this.detail ? this.detail.ac_num : '',
                    amt_cr: this.total,
                    is_del: 0,
                    remark: this.remark ? this.remark : '',
                    gl_flag_id: this.detail ? this.detail.gl_flag_id : '',
                }
            )

            for (let index = 0; index < this.details.length; index++) {
                this.debits.push(
                    {
                        ac_par : this.details[index].ac_par_dr,
                        ac_sub_par_one: this.details[index].ac_sub_par_one_dr,
                        ac_num_dr: this.details[index].acc_code_dr,
                        amt_dr: this.details[index].trans_amount,
                        is_del: 0,
                        remark: this.remark ? this.remark : '',
                        gl_flag_id: ''
                    }
                )
            }

            var debits = []

            this.debits.forEach((element)=>{
                let indexElement  = debits.findIndex(elm => {
                    return elm.ac_num_dr === element.ac_num_dr;
                });
                if(indexElement !== -1){
                    debits[indexElement].amt_dr += parseFloat(element.amt_dr)
                }
                else {
                    // element.amt_dr = parseFloat(element.amt_dr)
                    debits.push(element);
                }
            });


            var reqBody = {
                'office_id': this.detail ? this.detail.office_id : '',
                'entity_id': this.detail ? this.detail.entity_id : '',
                'activity_no': this.detail ? this.detail.activity_no : '',
                'ac_num': this.detail ? this.detail.ac_num : '',
                'period_budget': this.detail ? this.detail.period_budget : '',
                'target_income_no' : this.detail ? this.detail.target_income_no : '',
                'aprv' : 'APRV2',
                'debit': debits,
                'credit': this.credits
            }

            const respData = await target_income.approve('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.snackbar = {
                    color: "success",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: 'Approved Successfully',
                    visible: true
                };

                this.dialog_aprv = false
                this.clear()
                this.getPullData()
            } else {
                this.snackbar = {
                    color: "error",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Error",
                    text: 'Error',
                    visible: true
                };
            }
        },
        async deletePayment(){
            this.$store.dispatch('setOverlay', true)
            this.dialog_delete = false

            this.debits = []
            this.credits = []

            this.credits.push(
                {
                    ac_par : this.detail ? this.detail.ac_par : '',
                    ac_sub_par_one: this.detail ? this.detail.ac_sub_par_one : '',
                    ac_num_cr: this.detail ? this.detail.ac_num : '',
                    amt_cr: this.total,
                    is_del: 1,
                    remark: this.remark ? this.remark : '',
                    gl_flag_id: this.detail ? this.detail.gl_flag_id : '',
                }
            )

            for (let index = 0; index < this.details.length; index++) {
                this.debits.push(
                    {
                        ac_par : this.details[index].ac_par_dr,
                        ac_sub_par_one: this.details[index].ac_sub_par_one_dr,
                        ac_num_dr: this.details[index].acc_code_dr,
                        amt_dr: this.details[index].trans_amount,
                        is_del: 1,
                        remark: this.remark ? this.remark : '',
                        gl_flag_id: ''
                    }
                )
            }

            var debits = []

            this.debits.forEach((element)=>{
                let indexElement  = debits.findIndex(elm => {
                    return elm.ac_num_dr === element.ac_num_dr;
                });
                if(indexElement !== -1){
                    debits[indexElement].amt_dr += parseFloat(element.amt_dr)
                }
                else {
                    // element.amt_dr = parseFloat(element.amt_dr)
                    debits.push(element);
                }
            });


            var reqBody = {
                'office_id': this.detail ? this.detail.office_id : '',
                'entity_id': this.detail ? this.detail.entity_id : '',
                'activity_no': this.detail ? this.detail.activity_no : '',
                'ac_num': this.detail ? this.detail.ac_num : '',
                'period_budget': this.detail ? this.detail.period_budget : '',
                'target_income_no' : this.detail ? this.detail.target_income_no : '',
                'trans_date' : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                'realization_date' : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                'remark' : this.detail ? this.detail.remark : '',
                'debit': debits,
                'credit': this.credits
            }

            const respData = await target_income.destroy('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.snackbar = {
                    color: "success",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: 'Deleted Successfully',
                    visible: true
                };

                this.dialog_delete = false
                this.clear()
                this.getPullData()
            } else {
                this.snackbar = {
                    color: "error",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Error",
                    text: 'Error',
                    visible: true
                };
            }
            this.$store.dispatch('setOverlay', false)

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
.v-money { text-align: right !important; }
.tr_choice{
  background-color: #a5d8ed !important;
}
@media screen {
  #printSectionPaymentTarget {
      display: none;
  }
}

@media print {
  body * {
    visibility:hidden;
  }
  #printSectionPaymentTarget, #printSectionPaymentTarget * {
    visibility:visible;
  }
  #printSectionPaymentTarget {
    position:absolute;
    left:0;
    top:0;
  }
}

</style>