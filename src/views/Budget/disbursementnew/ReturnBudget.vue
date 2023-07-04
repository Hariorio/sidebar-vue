<template>
    <div>
        <v-card class="rounded-l elevation-5">
            <v-card-title>
                <v-text-field
                    solo
                    class="border-12 mb-2"
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                    style="max-width:400px"
                    @keyup.enter="getPullData()"
                
                ></v-text-field>
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
                @click="[dialog = true]"
                >
                    Create New
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-data-table
                    dense
                    :headers="headers"
                    :items="retur_budgets"
                    class="elevation-1 mt-3"
                    :items-per-page="20"
                    :loading="$store.state.overlay"
                    height="578"
                    fixed-header
                    :divider="true"
                    :light="true"
                    :item-class="tr_datatable"
                >     
                    <template v-slot:[`item.trans_date`]="{ item }">
                        {{ item.trans_date ? (new Date(new Date(item.trans_date) - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) : '' }}
                    </template>
                    <template v-slot:[`item.retur_date`]="{ item }">
                        {{ item.retur_date ? (new Date(new Date(item.retur_date) - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) : '' }}
                    </template>      
                    <template v-slot:[`item.aprv_at`]="{ item }">
                        <v-chip
                            class="ma-2"
                            color="red"
                            text-color="white"
                            small
                            v-if="item.rjc_at != null"
                        >
                            Rejected
                        </v-chip>
                        <v-chip
                            class="ma-2"
                            color="success"
                            text-color="white"
                            small
                            v-else-if="item.aprv_at != null"
                        >
                            Approved
                        </v-chip>
                        <v-chip
                            class="ma-2"
                            color="red"
                            text-color="white"
                            small
                            v-else
                        >
                            Not Approved
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
                                <v-list-item @click="detailShow(item)">
                                    <v-list-item-icon>
                                        <v-icon>mdi-magnify</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>Detail</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item @click="detailItemDelete(item)">
                                    <v-list-item-icon>
                                        <v-icon>mdi-delete</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>Delete</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item @click="printItem(item)">
                                    <v-list-item-icon>
                                        <v-icon>mdi-printer</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>Print</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item v-if="showButtonAprv1 && item.aprv_at === null && item.rjc_at === null" @click="detailApprove(item, 'aprv')">
                                    <v-list-item-icon>
                                        <v-icon>mdi-check</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>Approve</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <!-- <v-list-item v-if="showButtonAprv1 && item.aprv_at != null && item.rjc_at === null" @click="detailApprove(item, 'unaprv')">
                                    <v-list-item-icon>
                                        <v-icon>mdi-reload</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>UnApprove</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item> -->
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
                                    Retur Budget
                                </div>
                                <v-spacer></v-spacer>
                                <v-btn
                                    class="mx-2"
                                    fab
                                    x-small
                                    color="#e83e8c;"
                                    @click="[dialog = false, clear()]"
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
                                        <v-row>
                                            <v-col class="col-12" sm="12" md="12">
                                                <div class="d-flex">
                                                    <h5 class="blue-lcd mr-5">
                                                        Header
                                                    </h5>
                                                    <p style="font-size: 12px;" class="red--text">
                                                        * Field are required. Please fill your fileds and submit for save
                                                    </p>
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </v-card-title>
                                    <v-card-text class="p-2">
                                        <v-container fluid class="pt-0 mt-0">
                                            <v-row>
                                                <v-col class="col-12" sm="6" md="2">
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
                                                <v-col class="col-12" sm="6" md="2">
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
                                                <v-col class="col-12" sm="6" md="2">
                                                    <h6 class="blue-lcd mb-1">Period Budget <strong style="color:red;">*</strong><span></span></h6>
                                                    <v-menu
                                                        ref="modal_store"
                                                        v-model="modal_store"
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
                                                            @input="[getAccountReturBudget(), modal_store = false]"
                                                        ></v-date-picker>
                                                    </v-menu>
                                                </v-col>
                                                <v-col class="col-12" sm="6" md="2">
                                                    <h6 class="blue-lcd mb-1">Account Num <span class="red--text"><strong>* </strong></span></h6>
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
                                                        @change="(event) => [getActivityAccount(event), getDetailAcNum(event)]"
                                                    ></v-autocomplete>
                                                </v-col>
                                                <v-col class="col-12" sm="6" md="2">
                                                    <h6 class="blue-lcd mb-1">Activity No <span class="red--text"><strong>* </strong></span></h6>
                                                    <v-autocomplete
                                                        dense
                                                        solo
                                                        clearable
                                                        v-model="activity"
                                                        :items="activities"
                                                        item-value="activity_no"
                                                        :item-text="item => item.activity_no +' - '+ item.remark"
                                                        class="ma-0 pa-0 border-12"
                                                        hide-details=true
                                                        @change="(event) =>  setApprovedBudget(event)"
                                                    ></v-autocomplete>
                                                </v-col>
                                                <v-col class="col-12" sm="6" md="2">
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
                                                <v-col class="col-12" sm="6" md="12">
                                                    <h6 class="blue-lcd mb-1">Remark</h6>
                                                    <v-text-field
                                                        solo
                                                        dense
                                                        persistent-hint
                                                        v-model="remark"
                                                        class="ma-0 pa-0 border-12"
                                                        hide-details=true
                                                    >
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row class="mt-3">
                            <v-col cols="12">
                                <v-card outlined style="border-radius: 0px;">
                                    <v-card-title>
                                        <v-row>
                                            <v-col class="col-12" sm="12" md="12">
                                                <div class="d-flex">
                                                    <h5 class="blue-lcd mr-5">
                                                        Detail
                                                    </h5>
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container fluid>
                                            <v-row class="mt-2">
                                                <v-col cols="12">
                                                    <v-simple-table
                                                        fixed-header   
                                                        height="480"                                                       
                                                    >
                                                        <thead>
                                                            <tr style="border-top:1px solid rgb(216 212 212);">
                                                                <th class="text-left" style="width:5%" >
                                                                    No
                                                                </th>
                                                                <th class="text-left"  style="width:35%">
                                                                    Account Bank
                                                                </th>
                                                                <th class="text-left" style="width:40%">
                                                                    Remark
                                                                </th>
                                                                <th style="width:15%">
                                                                    Amount
                                                                </th>
                                                                <th class="text-center"  style="width:5%" v-if="dialogShow === false">
                                                                    
                                                                </th>  
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="(detail, index) in details" :key="detail.seq_no">
                                                                <td>{{ detail.seq_no }}</td>
                                                                <td>
                                                                    <v-autocomplete
                                                                        dense
                                                                        solo
                                                                        clearable
                                                                        v-model="detail.ac_num"
                                                                        :items="bank_accs"
                                                                        item-value="acc_code"
                                                                        :item-text="item => item.acc_code +' - '+ item.bank_acc +' - '+ item.bank_name"
                                                                        class="ma-0 pa-0 border-12"
                                                                        hide-details=true
                                                                        @change="(event) => getDetailAccountBankAcNum(event, index)"
                                                                    ></v-autocomplete> 
                                                                </td>
                                                                <td>
                                                                    <v-text-field
                                                                        solo
                                                                        dense
                                                                        persistent-hint
                                                                        v-model="detail.remark"
                                                                        class="ma-0 pa-0 border-12"
                                                                        hide-details=true
                                                                    >
                                                                    </v-text-field>
                                                                </td>
                                                                <td class="text-right">
                                                                    <div class="v-input ma-0 pa-0 v-input--dense border-12 theme--light v-text-field v-text-field--single-line v-text-field--solo
                                                                    dense v-text-field--is-booted v-text-field--enclosed">
                                                                        <div class="v-input__control">
                                                                            <div class="v-input__slot">
                                                                                <div class="v-text-field__slot">
                                                                                    <money class="" name="retur_amount" v-model.lazy="detail.retur_amount" v-bind="money"></money>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td v-if="dialogShow === false">
                                                                    <v-btn small class="p-1 text-white" color="red" @click="deleteDetail(detail, index)" >
                                                                        <v-icon>
                                                                            mdi-delete
                                                                        </v-icon>
                                                                    </v-btn>
                                                                </td>
                                                            </tr>
                                                            <tr v-if="dialogShow === false">
                                                                <td colspan="9">
                                                                    <v-btn block class="p-3 py-4" color="#d8dee2" @click="submitDetail()">
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
                                                                <p class="blue-lcd pt-0 pb-0 mt-0 mb-0">Total Amount :</p>   
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
                            <v-btn block class="rounded-l mr-2" color="#fff" @click="[dialog = false, clear()]">Cancel</v-btn>
                        </v-col>
                        <v-col cols="12" xs="12" sm="3" md="3">
                            <v-btn block class="rounded-l text-white" color="success" @click="submit()">Save</v-btn>
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
                                Print Retur Budget
                                <v-spacer></v-spacer>
                                <v-btn class="rounded-l text-white" color="success" @click="printTicket()">Print</v-btn>
                            </div>
                        </v-col>
                        <v-divider></v-divider>
                    </v-row>
                </v-card-title>
                <v-card-text>
                    <v-row align="center" justify="center" class="mt-4">
                        <div style="width: 960px;" id="divNameReturBudget">
                            <table width="960" cellspacing="0" cellpadding="0" class="container" style="width: 960px; margin-top: 20px; padding: 20px;border: 1px solid #DDD;font-size: 14px;">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table width="100%" cellspacing="0" cellpadding="0" style="width: 100%; padding-bottom: 10px;border-bottom: 1px solid #DDD;">
                                                <tbody>
                                                    <tr style="margin-top: 8px; margin-bottom: 8px;">
                                                        <td style="width: 80%;">
                                                            <div class="d-flex">
                                                                <img src="../../../assets/logo_gki.png" height="60px" alt="">
                                                                <p class="mt-4 ml-4">{{ this.entity_id }}</p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <strong>Retur Budget</strong>
                                                        </td>
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
                                                            {{ this.detail ? this.detail.bidang_desc : '' }}
                                                        </td>
                                                        <td style="width:15%; padding-left: 5px;">
                                                            Komisi
                                                        </td>
                                                        <td style="width:5%">
                                                            :
                                                        </td>
                                                        <td style="width:30%">
                                                            {{ this.detail ? this.detail.komisi_desc : '' }}
                                                        </td>
                                                    </tr>
                                                    <tr style="margin-top: 8px; margin-bottom: 8px;">
                                                        <td style="width:15%; padding-left: 5px;">
                                                            Period Budget
                                                        </td>
                                                        <td style="width:5%">
                                                            :
                                                        </td>
                                                        <td style="width:30%">
                                                            {{ this.date }}
                                                        </td>
                                                        <td style="width:15%; padding-left: 5px;">
                                                            Tanggal Retur
                                                        </td>
                                                        <td style="width:5%">
                                                            :
                                                        </td>
                                                        <td style="width:30%">
                                                            {{ this.detail ? this.detail.retur_date : '' }}
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
                                            <table width="100%" cellspacing="0" cellpadding="0" style="width: 100%; margin:0;border-top: 1px solid #DDD;">
                                                <thead>
                                                    <tr style="border-top:1px solid rgb(216 212 212);">
                                                        <th class="text-left" style="width:5%;padding: 5px;" >
                                                            No
                                                        </th>
                                                        <th class="text-left"  style="width:35%;padding: 5px;">
                                                            Account Bank
                                                        </th>
                                                        <th class="text-left" style="width:40%;padding: 5px;">
                                                            Remark
                                                        </th>
                                                        <th style="width:15%; text-align: right; padding: 5px;">
                                                            Amount
                                                        </th>
                                                    </tr>
                                                </thead>  
                                                <tbody>
                                                    <tr 
                                                        v-for="(detail, index) in details"
                                                        :key="detail.seq_no"
                                                    >
                                                        <td class="text-left" style="width:5%; padding: 5px 10px;" @click="index">
                                                            {{ detail.seq_no }}
                                                        </td>
                                                        <td class="text-left"  style="width:15%; padding: 5px 10px;">
                                                            {{detail.ac_num}}
                                                        </td>
                                                        <td class="text-left"  style="width:15%; padding: 5px 10px;">
                                                            {{detail.remark}}
                                                        </td>
                                                        <td class="text-right"  style="width:15%;text-align: right; padding: 5px 10px;">
                                                            {{$store.getters.convertToCurrencyUs(detail.retur_amount)}}
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
                            Filter Retur Budget
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
                                    @change="(event) => getAccount(event)"
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
                                        v-model="period_budget"
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
                                        v-model="period_budget"
                                        type="month"
                                        no-title
                                        @input="[modal_filter = false]"
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
                                        label="Start Date"
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
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">End Date </h6>
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
                                        label="End Date"
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
                                <h6 class="blue-lcd mb-1">Start Date Retur</h6>
                                <v-menu
                                    ref="modal_retur"
                                    v-model="modal_retur"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="auto"
                                    >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                        solo
                                        v-model="date_from_retur"
                                        label="Start Date Retur"
                                        persistent-hint
                                        append-icon="mdi-calendar"
                                        v-bind="attrs"
                                        v-on="on"
                                        class="ma-0 pa-0 border-12"
                                        hide-details=true
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="date_from_retur"
                                        no-title
                                        @input="modal_retur = false"
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">End Date Retur</h6>
                                <v-menu
                                    ref="modal_to_retur"
                                    v-model="modal_to_retur"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="auto"
                                    >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                        solo
                                        v-model="date_to_retur"
                                        label="End Date Retur"
                                        persistent-hint
                                        append-icon="mdi-calendar"
                                        v-bind="attrs"
                                        v-on="on"
                                        class="ma-0 pa-0 border-12"
                                        hide-details=true
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="date_to_retur"
                                        no-title
                                        @input="modal_to_retur = false"
                                    ></v-date-picker>
                                </v-menu>
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
                        @click="dialog_delete = false"
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
                                    {{ detail ? detail.retur_id : '' }}
                                </h6>
                                <p class="text-center">
                                    Are you sure delete this Retur Budget ？
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
                            <v-btn block class="rounded-l text-white p-3" color="#003871" @click="deleteReturBudget()">Delete</v-btn>
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
                                    {{ detail ? detail.retur_id : '' }}
                                </h6>
                                <p class="text-center">
                                    Are you sure Approve this Retur Budget ？
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
                            <v-btn block class="rounded-l text-white p-3" color="#003871" @click="approve()">{{ stat_aprv === 'aprv' ? 'Approve' : 'UnApprove'}}</v-btn>
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
import {office} from "../../../backend-api/office/index"
import {appl_constant} from "../../../backend-api/appl_constant/index"
import {return_budget} from "../../../backend-api/finance/return_budget"
import {activity_header} from "../../../backend-api/ledger/budget/activity_header"
import {account_bank} from "../../../backend-api/ledger/account_bank"
import { Money } from 'v-money'
import {CalculateTerbilang} from "../../../model/calculate_terbilang"
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
            breadcumbs: [
                {
                    text: 'Finance',
                    disabled: false,
                    href: '/admin/finance',
                },
                {
                    text: 'Retur Budget',
                    disabled: true,
                }
            ],
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
            dialog: false,
            dialogfilter: false,
            headersColumn: {
                'Entity ID': 'entity_id',
                'Office': 'office',
                'AC Num': 'ac_num',
                'AC Name': 'ac_name',
                'Bidang': 'bidang_desc',
                'Komisi': 'komisi_desc',
                'Period Budget': 'period_budget',
                'Activity No': 'activity_no',
                'Type': 'retur_type',
                'Retur ID': 'retur_id',
                'Return Date': 'retur_date',
                'Trans Date': 'trans_date',
                'Remark': 'remark'
            },
            headers: [
                {
                    text: 'Entity',
                    align: 'start',
                    value: 'entity_id', 
                    align:'left', width:'50'},
                { text: 'Office', value: 'office' , align:'left', width:'50'},
                { text: 'Type', value: 'retur_type' , align:'left', width:'50'},
                { text: 'Retur ID', value: 'retur_id' , align:'left', width:'150'},
                { text: 'Return Date', value: 'retur_date' , align:'left', width:'100'},
                { text: 'Trans Date', value: 'trans_date' , align:'left', width:'100'},
                { text: 'Period Budget', value: 'period_budget' , align:'left', width:'100'},
                { text: 'Account', value: 'ac_num' , align:'left', width:'150'},
                { text: 'Account', value: 'ac_name' , align:'left', width:'200'},
                { text: 'Bidang', value: 'bidang_desc' , align:'left'},
                { text: 'Komisi', value: 'komisi_desc' , align:'left'},
                { text: 'Activity No', value: 'activity_no' , align:'left', width:'50'},
                { text: 'Remark', value: 'remark' , align:'left', width:'300'},
                { text: 'Aprv', value: 'aprv_at' , align:'left', width:'20'},
                { text: 'Action', value: 'action' , align:'left', width:'50'},
            ],
            retur_budgets: [],
            entities: [],
            entity_id: '',
            offices: [],
            office_id: '',
            ac_nums: [],
            ac_num: '',
            period_budget: '',
            date_from: '',
            modal: false,
            date_to: '',
            modal_to: false,
            date_from_retur: '',
            modal_retur: false,
            date_to_retur: '',
            modal_to_retur: false,
            modal_filter: false,
            remark: '',
            date: '',
            modal_store: false,
            min_month: '',
            max_month: '',
            mod_month: '',
            activity: '',
            activities: [],
            details: [],
            bank_accs: [],
            debits: [],
            credits: [],
            detail_ac_num: null,
            detail: null,
            dialogShow: false,
            dialog_delete: false,
            dialogPrint: false,
            terbilang: '',
            showButtonAprv1: true,
            dialog_aprv: false,
            stat_aprv: 'aprv',
            bidang: '',
            komisi: '',
            acp: '',
            acps:[]
        }
    },
    computed:{
        total(){
            var total = 0
            for (let index = 0; index < this.details.length; index++) {
                if (this.details[index].is_del == 0 || this.details[index].is_del == '0') {
                    total = total + parseFloat(this.details[index].retur_amount);
                }
            }
            
            return (total | 0)
        },
    },
    async mounted(){
        this.$store.dispatch('setOverlay', true)

        await this.getApplConstant()
        await this.getEnvConf()
        await this.getPullData()
        await this.getEntity()
        await this.getAccountBank()
        await this.glFlags()

        var current = new Date()
        var start_month = new Date(current.getFullYear(), 0, 2)
        var end = (new Date(current.getFullYear(), 11, 31))
        this.min_month = new Date(start_month).toISOString().substr(0, 7)
        this.max_month = new Date(end).toISOString().substr(0, 7)

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
            this.ac_num = ''
            this.period_budget = ''
            this.date_from = ''
            this.date_to = ''
            this.date_from_retur = ''
            this.date_to_retur = ''
            this.activity = ''
            this.detail_ac_num = null
            this.remark = ''
            this.details = []
            this.dialogShow = false
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
        detailShow(item){
            this.detail = item
            this.getBranchOffice()
            this.entity_id = item.entity_id
            this.office_id = item.office_id
            this.date = item.period_budget ? item.period_budget.substr(0, 4) + '-' + item.period_budget.substr(4, 6) : ''
            this.ac_num = item.ac_num
            this.getAccountReturBudget(item.ac_num)
            this.activity = item.activity_no
            this.remark = item.remark
            this.acp = item.gl_flag_id
            this.dialogShow = true
            this.dialog = true
            this.getActivityAccount(item.ac_num)
            this.getDetailAcNum(item.ac_num)
            this.pullDetail(item)
        },
        async detailItemDelete(item){
            this.$store.dispatch('setOverlay', true)
            this.detail = item
            await this.getBranchOffice()
            this.entity_id = item.entity_id
            this.office_id = item.office_id
            this.date = item.period_budget ? item.period_budget.substr(0, 4) + '-' + item.period_budget.substr(4, 6) : ''
            this.ac_num = item.ac_num
            await this.getAccountReturBudget(item.ac_num)
            this.activity = item.activity_no
            this.remark = item.remark
            this.acp = item.gl_flag_id
            await this.getActivityAccount(item.ac_num)
            await this.getDetailAcNum(item.ac_num)
            await this.pullDetail(item)
            this.dialog_delete = true
            this.$store.dispatch('setOverlay', false)
        },
        async printItem(item){
            console.log(item);
            this.$store.dispatch('setOverlay', true)
            this.detail = item
            await this.getBranchOffice()
            this.entity_id = item.entity_id
            this.office_id = item.office_id
            this.date = item.period_budget ? item.period_budget.substr(0, 4) + '-' + item.period_budget.substr(4, 6) : ''
            this.ac_num = item.ac_num
            await this.getAccountReturBudget(item.ac_num)
            this.activity = item.activity_no
            this.remark = item.remark
            this.acp = item.gl_flag_id
            await this.getActivityAccount(item.ac_num)
            await this.getDetailAcNum(item.ac_num)
            await this.pullDetail(item)
            this.dialogPrint = true
            this.$store.dispatch('setOverlay', false)
        },
        async detailApprove(item, stat_aprv){
            this.$store.dispatch('setOverlay', true)
            this.detail = item
            this.stat_aprv = stat_aprv
            await this.getBranchOffice()
            this.entity_id = item.entity_id
            this.office_id = item.office_id
            this.date = item.period_budget ? item.period_budget.substr(0, 4) + '-' + item.period_budget.substr(4, 6) : ''
            this.ac_num = item.ac_num
            await this.getAccountReturBudget(item.ac_num)
            this.activity = item.activity_no
            this.acp = item.gl_flag_id
            this.remark = item.remark
            await this.getActivityAccount(item.ac_num)
            await this.getDetailAcNum(item.ac_num)
            await this.pullDetail(item)
            this.$store.dispatch('setOverlay', false)
            this.dialog_aprv = true
        },
        async getPullData(){
            this.retur_budgets = []
            this.$store.dispatch('setOverlay', true)

            var start_date = this.date_from ? new Date(this.date_from).toISOString().substr(0, 10) : ''
            var end_date = this.date_to ? new Date(this.date_to).toISOString().substr(0, 10) : ''

            var start_date_retur = this.date_from_retur ? new Date(this.date_from_retur).toISOString().substr(0, 10) : ''
            var end_date_retur = this.date_to_retur ? new Date(this.date_to_retur).toISOString().substr(0, 10) : ''

            var respData = await return_budget.index(`?search=${this.search ? this.search : ''}&entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_num=${this.ac_num ? this.ac_num : ''}&period_budget=${this.period_budget ? new Date(this.period_budget).toISOString().substr(0, 7).replace(/-/g,"") : ''}&trans_date_start=${start_date}&trans_date_end=${end_date}&retur_date_start=${start_date_retur}&retur_date_end=${end_date_retur}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}`, null, false, false, false)
            if (respData.status === 200) {
                this.retur_budgets = respData.data.data
                this.$store.dispatch('setOverlay', false)
            } else{
                this.$store.dispatch('setOverlay', false)
            }
        },
        async exportExcel(){
            var start_date = this.date_from ? new Date(this.date_from).toISOString().substr(0, 10) : ''
            var end_date = this.date_to ? new Date(this.date_to).toISOString().substr(0, 10) : ''

            var start_date_retur = this.date_from_retur ? new Date(this.date_from_retur).toISOString().substr(0, 10) : ''
            var end_date_retur = this.date_to_retur ? new Date(this.date_to_retur).toISOString().substr(0, 10) : ''

            var respData = await return_budget.index(`?search=${this.search ? this.search : ''}&entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_num=${this.ac_num ? this.ac_num : ''}&period_budget=${this.period_budget ? new Date(this.period_budget).toISOString().substr(0, 7).replace(/-/g,"") : ''}&trans_date_start=${start_date}&trans_date_end=${end_date}&retur_date_start=${start_date_retur}&retur_date_end=${end_date_retur}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}`, null, false, false, false)

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
        async getAccount(event){
            if (event === null || event === '') {
                this.ac_num = ''
            } else{
                var respData = await ledger_coa.fetchLedgerCoa(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&active_flag=Y`, null, false, false, false)
                if (respData.status === 200) {
                    this.ac_nums = respData.data.data

                }
            }
        },
        async getAccountReturBudget(event){
            if (event === null || event === '') {
                this.ac_num = ''
            } else{
                var respData = await activity_header.getAccountRetur(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&period=${this.date ? new Date(this.date).toISOString().substr(0, 7).replace(/-/g,"") : ''}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}`, null, false, false, false)
                if (respData.status === 200) {
                    this.ac_nums = respData.data.data

                }
            }
        },
        async getActivityAccount(event){
            if (event === null || event === '') {
                this.activity = ''
            } else{
                var respData = await activity_header.getActivityAccountRetur(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&period=${this.date ? new Date(this.date).toISOString().substr(0, 7).replace(/-/g,"") : ''}&ac_num=${this.ac_num ? this.ac_num : ''}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}`, null, false, false, false)
                if (respData.status === 200) {
                    this.activities = respData.data.data
                }
            }
        },
        async getAccountBank(){
            var respData = await account_bank.index(`?posting=Y`, null, false, false, false)
            if (respData.status === 200) {
                this.bank_accs = respData.data.data
            }
        },
        async getDetailAcNum(event){
            if (event === null || event === '') {
                this.ac_num = ''
            } else {
                var respData = await ledger_coa.fetchLedgerCoa(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_num=${event}`, null, false, false, false)
                if (respData.status === 200) {
                    this.detail_ac_num = respData.data.data ? respData.data.data[0] : null
                }
            }
        },
        async getDetailAccountBankAcNum(event, index){
            if (event === null || event === '') {
                this.details[index].ac_num = ''
            } else {
                var respData = await account_bank.showAcNum(event, null, false, false, false)
                if (respData.status === 200) {
                    this.details[index].drcr = respData.data.data ? respData.data.data.drcr : ''
                    this.details[index].ac_par = respData.data.data ? respData.data.data.ac_par : ''
                    this.details[index].ac_sub_par_one = respData.data.data ? respData.data.data.ac_sub_par_one : ''
                }
            }
        },
        async submitDetail(){
            this.details.push(
                {
                    seq_no: this.details.length + 1,
                    ac_num: '',
                    drcr: '',
                    remark: '',
                    retur_amount: 0,
                    ac_par:"",
                    ac_sub_par_one:"",
                    is_del: 0
                }
            )    
        },
        deleteDetail(detail, index){
            this.details.splice(index, 1);
        },
        async submit(){
            this.$store.dispatch('setOverlay', true)
            this.dialog = false

            if (this.total == 0 || this.entity_id === '' || this.office_id === '' || this.ac_num === '' || this.activity === '') {
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
                'entity_id': this.entity_id ? this.entity_id : '',
                'office_id': this.office_id ? this.office_id : '',
                'retur_date': (new Date(new Date() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                'retur_type': 'RTR',
                'ac_num': this.ac_num ? this.ac_num : '',
                'activity_no': this.activity ? this.activity : '',
                'remark': this.remark ? this.remark : '',
                'period_budget': this.date ? new Date(this.date).toISOString().substr(0, 7).replace(/-/g,"") : '',
                'amount': this.total,
                'detail': this.details,
                'gl_flag_id': this.acp ? this.acp : ''
                // 'debit': this.debits,
                // 'credit': this.credits
            }

            const respData = await return_budget.store('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.snackbar = {
                    color: "success",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: 'Return Budget Successfully',
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
        async pullDetail(item){
            var respData = await return_budget.show(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&retur_id=${item.retur_id ? item.retur_id : ''}&retur_type=${item.retur_type ? item.retur_type : ''}`, null, false, false, false)
            if (respData.status === 200) {
                for (let index = 0; index < respData.data.data.length; index++) {
                    const element = respData.data.data[index];
                    this.details.push(
                        {
                            seq_no: element.seq_no,
                            ac_num: element.ac_num,
                            drcr: element.drcr,
                            remark: element.remark,
                            retur_amount: parseFloat(element.retur_amount),
                            ac_par:element.ac_par,
                            ac_sub_par_one:element.ac_sub_par_one,
                            is_del: 0
                        }
                    )    
                }

                var terbilang = new CalculateTerbilang(this.total)
                this.terbilang = terbilang.pembilang()
                
            }
        },
        async deleteReturBudget(){
            this.debits = []
            this.credits = []

            this.$store.dispatch('setOverlay', true)
            this.dialog_delete = false

            if (this.total == 0 || this.entity_id === '' || this.office_id === '' || this.ac_num === '' || this.activity === '') {
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
                this.dialog_delete = true

                return false
            }

            this.credits.push(
                {
                    ac_par : this.detail_ac_num ? this.detail_ac_num.ac_par : '',
                    ac_sub_par_one: this.detail_ac_num ? this.detail_ac_num.ac_sub_par_one : '',
                    ac_num_cr: this.detail_ac_num ? this.detail_ac_num.ac_num : '',
                    amt_cr: this.total,
                    is_del: 1,
                    'remark': this.remark ? this.remark : '',
                    gl_flag_id: this.acp ? this.acp : ''
                }
            )

            for (let index = 0; index < this.details.length; index++) {
                this.debits.push(
                    {
                        ac_par : this.details[index].ac_par,
                        ac_sub_par_one: this.details[index].ac_sub_par_one,
                        ac_num_dr: this.details[index].ac_num,
                        amt_dr: this.details[index].retur_amount,
                        is_del: 1,
                        'remark': this.remark ? this.remark : '',
                        gl_flag_id: ''
                    }
                )
            }

            for (let index = 0; index < this.details.length; index++) {
                this.details[index].is_del = 1
            }

            var reqBody = {
                'entity_id': this.entity_id ? this.entity_id : '',
                'office_id': this.office_id ? this.office_id : '',
                'retur_date': (new Date(new Date() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                'retur_type': 'RTR',
                'retur_id': this.detail ? this.detail.retur_id : '',
                'ac_num': this.ac_num ? this.ac_num : '',
                'activity_no': this.activity ? this.activity : '',
                'remark': this.remark ? this.remark : '',
                'period_budget': this.date ? new Date(this.date).toISOString().substr(0, 7).replace(/-/g,"") : '',
                'amount': this.total,
                'detail': this.details,
                'debit': this.debits,
                'credit': this.credits,
                'gl_flag_id': this.acp ? this.acp : ''
            }

            const respData = await return_budget.destroy('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.snackbar = {
                    color: "success",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: 'Return Budget Successfully',
                    visible: true
                };

                this.$store.dispatch('setOverlay', false)
                this.dialog_delete = false
                this.clear()
                this.getPullData()

            } else{
                this.$store.dispatch('setOverlay', false)
                this.dialog_delete = true

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
        printTicket(){
            const elem = document.getElementById("divNameReturBudget")
            var domClone = elem.cloneNode(true);
    
            var $printSectionReturBudget = document.getElementById("printSectionReturBudget");
            
            if (!$printSectionReturBudget) {
                var $printSectionReturBudget = document.createElement("div");
                $printSectionReturBudget.id = "printSectionReturBudget";
                document.body.appendChild($printSectionReturBudget);
            }
            
            $printSectionReturBudget.innerHTML = "";
            $printSectionReturBudget.appendChild(domClone);
            window.print();
        },
        async reject(){
            var reqBody = {
                'entity_id': this.detail ? this.detail.entity_id : '',
                'office_id': this.detail ? this.detail.office_id : '',
                'retur_id': this.detail ? this.detail.retur_id : '',
                'retur_type': this.detail ? this.detail.retur_type : ''
            }

            const respData = await return_budget.reject('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.snackbar = {
                    color: "success",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: 'Successfully Reject Retur',
                    visible: true
                };

                this.$store.dispatch('setOverlay', false)
                this.dialog_aprv = false
                this.clear()
                this.getPullData()

            } else{
                this.$store.dispatch('setOverlay', false)
                this.dialog_aprv = true

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
        async approve(){
            console.log(this.detail_ac_num, this.details);

            this.debits = []
            this.credits = []

            this.credits.push(
                {
                    ac_par : this.detail_ac_num ? this.detail_ac_num.ac_par : '',
                    ac_sub_par_one: this.detail_ac_num ? this.detail_ac_num.ac_sub_par_one : '',
                    ac_num_cr: this.detail_ac_num ? this.detail_ac_num.ac_num : '',
                    amt_cr: this.total,
                    is_del: 0,
                    'remark': this.remark ? this.remark : '',
                    gl_flag_id: this.acp ? this.acp : ''
                }
            )

            for (let index = 0; index < this.details.length; index++) {
                this.debits.push(
                    {
                        ac_par : this.details[index].ac_par,
                        ac_sub_par_one: this.details[index].ac_sub_par_one,
                        ac_num_dr: this.details[index].ac_num,
                        amt_dr: this.details[index].retur_amount,
                        is_del: 0,
                        'remark': this.remark ? this.remark : '',
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
                'entity_id': this.detail ? this.detail.entity_id : '',
                'office_id': this.detail ? this.detail.office_id : '',
                'retur_id': this.detail ? this.detail.retur_id : '',
                'retur_type': this.detail ? this.detail.retur_type : '',
                'aprv': this.stat_aprv === 'aprv' ? 'APRV' : 'UNAPRV',
                'remark': this.remark ? this.remark : '',
                'debit': debits,
                'credit': this.credits,
                'gl_flag_id': this.acp ? this.acp : ''
            }

            const respData = await return_budget.approve('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.snackbar = {
                    color: "success",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: 'Successfully Approve Retur',
                    visible: true
                };

                this.$store.dispatch('setOverlay', false)
                this.dialog_aprv = false
                this.clear()
                this.getPullData()

            } else{
                this.$store.dispatch('setOverlay', false)
                this.dialog_aprv = true

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
        async glFlags(){
            var respData = await ledger_coa.glFlag(``, null, false, false, false)
            if (respData.status === 200) {
                this.acps = respData.data.data
                console.log(this.acps);
            }
        },
        async setApprovedBudget(val){
            var reqBody = {
                'office_id': this.office_id,
                'entity_id': this.entity_id,
                'ac_num': this.ac_num ? this.ac_num : '',
                'activity_no': this.activity ? this.activity : '',
                'period': this.date ? new Date(this.date).toISOString().substr(0, 7).replace(/-/g,"") : '',
            }
            const respData = await activity_header.getSumTotalAprvBudget('', reqBody, false, false, false)
            console.log(respData.data);
            this.bidang = respData.data.data.header ? respData.data.data.header.bidang : ''
            this.komisi = respData.data.data.header ? respData.data.data.header.komisi : ''
            this.acp = respData.data.data.header ? respData.data.data.header.gl_flag_id : ''
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
.v-money { text-align: right !important; }
.tr_choice{
  background-color: #a5d8ed !important;
}
@media screen {
  #printSectionReturBudget {
      display: none;
  }
}

@media print {
  body * {
    visibility:hidden;
  }
  #printSectionReturBudget, #printSectionReturBudget * {
    visibility:visible;
  }
  #printSectionReturBudget {
    position:absolute;
    left:0;
    top:0;
  }
}

</style>