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
                    :items="other_journals"
                    class="elevation-1 mt-3"
                    :items-per-page="20"
                    :loading="$store.state.overlay"
                    height="578"
                    fixed-header
                    :divider="true"
                    :light="true"
                    :item-class="tr_datatable"
                >     
                    <template v-slot:[`item.dt_jv`]="{ item }">
                        {{ item.dt_jv ? (new Date(new Date(item.dt_jv) - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) : '' }}
                    </template>       
                    <template v-slot:[`item.amt_dr`]="{ item }">
                        {{ $store.getters.convertToCurrencyUs(item.amt_dr) }}
                    </template>
                    <template v-slot:[`item.amt_cr`]="{ item }">
                        {{ $store.getters.convertToCurrencyUs(item.amt_cr) }}
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
                                    Other Journal Transaction
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
                                                        @change="(event) => [getAccount(event)]"
                                                    ></v-autocomplete> 
                                                </v-col>
                                                <v-col class="col-12" sm="6" md="2">
                                                    <h6 class="blue-lcd mb-1">Date <span class="red--text"><strong>* </strong></span></h6>
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
                                                            dense
                                                            solo
                                                            v-model="date_from"
                                                            label="Date"
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
                                                <v-col class="col-12" sm="6" md="2">
                                                    <h6 class="blue-lcd mb-1">Currency</h6>
                                                    <v-text-field
                                                        solo
                                                        dense
                                                        persistent-hint
                                                        v-model="currency"
                                                        class="ma-0 pa-0 border-12"
                                                        hide-details=true
                                                        disabled
                                                    >
                                                    </v-text-field>
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
                                                <v-col class="col-12" sm="6" md="6">
                                                    <h6 class="blue-lcd mb-1">Description <span class="red--text"><strong>* </strong></span></h6>
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
                                                <v-col class="col-12" sm="6" md="6">
                                                    <h6 class="blue-lcd mb-1">Paid to </h6>
                                                    <v-text-field
                                                        solo
                                                        dense
                                                        persistent-hint
                                                        v-model="paid_to"
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
                                                    <p style="font-size: 12px;" class="red--text">
                                                        * Field are required. Please fill your fileds and submit for save
                                                    </p>
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container fluid>
                                            <v-row>
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
                                                                    Account <span class="red--text"><strong>* </strong></span>
                                                                </th>
                                                                <th style="width:25%">
                                                                    Memo <span class="red--text"><strong>* </strong></span>
                                                                </th>
                                                                <th class="text-right" style="width:15%">
                                                                    Debit <span class="red--text"><strong>* </strong></span>
                                                                </th>
                                                                <th class="text-right" style="width:15%">
                                                                    Credit <span class="red--text"><strong>* </strong></span>
                                                                </th>
                                                                <th class="text-center"  style="width:5%" v-if="dialogShow === false">
                                                                    
                                                                </th>  
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="(detail, index) in details" :key="detail.item_num">
                                                                <td>{{ detail.item_num }}</td>
                                                                <td>
                                                                    <v-autocomplete
                                                                        dense
                                                                        solo
                                                                        clearable
                                                                        v-model="detail.ac_num"
                                                                        :items="ac_nums"
                                                                        item-value="ac_num"
                                                                        :item-text="item => item.ac_num +' - '+ item.ac_name"
                                                                        class="ma-0 pa-0 border-12"
                                                                        hide-details=true
                                                                        @change="(event) => getDetailAcNum(event, index)"
                                                                    ></v-autocomplete> 
                                                                </td>
                                                                <td>
                                                                    <v-text-field
                                                                        solo
                                                                        dense
                                                                        persistent-hint
                                                                        v-model="detail.item_memo"
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
                                                                                    <money class="" name="amt_dr" v-model.lazy="detail.amt_dr" v-bind="money" @change.native="checkAccount($event, index, 'DR')"></money>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td class="text-right">
                                                                    <div class="v-input ma-0 pa-0 v-input--dense border-12 theme--light v-text-field v-text-field--single-line v-text-field--solo
                                                                    dense v-text-field--is-booted v-text-field--enclosed">
                                                                        <div class="v-input__control">
                                                                            <div class="v-input__slot">
                                                                                <div class="v-text-field__slot">
                                                                                    <money class="" name="amt_cr" v-model.lazy="detail.amt_cr" v-bind="money" @change.native="checkAccount($event, index, 'CR')"></money>
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
                                                        <v-col class="col-12 pt-0 pb-0" sm="6" md="2">
                                                            <v-card outlined>
                                                                <div class="d-flex p-2">
                                                                    <p class="blue-lcd pt-0 pb-0 mt-0 mb-0">Total Debit :</p>   
                                                                    <v-spacer></v-spacer>
                                                                    <h6 class="red--text" style="font-weight:600">IDR. {{ $store.getters.convertToCurrencyUs(total_debit) }}</h6>
                                                                </div>
                                                            </v-card>
                                                        </v-col>
                                                        <v-col class="col-12 pt-0 pb-0" sm="6" md="2">
                                                            <v-card outlined>
                                                                <div class="d-flex p-2">
                                                                    <p class="blue-lcd pt-0 pb-0 mt-0 mb-0">Total Credit :</p>   
                                                                    <v-spacer></v-spacer>
                                                                    <h6 class="red--text" style="font-weight:600">IDR. {{ $store.getters.convertToCurrencyUs(total_credit) }}</h6>
                                                                </div>
                                                            </v-card>
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
                        <v-col cols="12" xs="12" sm="3" md="3" v-if="dialogShow === false">
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
                                Print Other Journal
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
                                                            <strong>Other Journal</strong>
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
                                                            Number
                                                        </td>
                                                        <td style="width:5%">
                                                            :
                                                        </td>
                                                        <td style="width:30%">
                                                            {{ this.detail ? this.detail.tr_id : '' }}
                                                        </td>
                                                        <td style="width:15%; padding-left: 5px;">
                                                            Date
                                                        </td>
                                                        <td style="width:5%">
                                                            :
                                                        </td>
                                                        <td style="width:30%">
                                                            {{ this.date_from }}
                                                        </td>
                                                    </tr>
                                                    <tr style="margin-top: 8px; margin-bottom: 8px;">
                                                        <td style="width:15%; padding-left: 5px;">
                                                            Description
                                                        </td>
                                                        <td style="width:5%">
                                                            :
                                                        </td>
                                                        <td style="width:30%">
                                                            {{ this.remark }}
                                                        </td>
                                                        <td style="width:15%; padding-left: 5px;">
                                                            Paid to
                                                        </td>
                                                        <td style="width:5%">
                                                            :
                                                        </td>
                                                        <td style="width:30%">
                                                            {{ this.paid_to }}
                                                        </td>
                                                    </tr>                                                   
                                                </tbody>
                                            </table>
                                            <table width="100%" cellspacing="0" cellpadding="0" style="width: 100%; margin:0;border-top: 1px solid #DDD;">
                                                <thead>
                                                    <tr style="border-top:1px solid rgb(216 212 212);">
                                                        <th class="text-left" style="padding-left: 5px;width:5%" >
                                                            No
                                                        </th>
                                                        <th class="text-left"  style="padding-left: 5px;width:35%">
                                                            Account 
                                                        </th>
                                                        <th style="padding-left: 5px;width:25%">
                                                            Memo 
                                                        </th>
                                                        <th class="text-right" style="text-align: right;padding: 5px 10px;">
                                                            Debit 
                                                        </th>
                                                        <th class="text-right" style="text-align: right;padding: 5px 10px;">
                                                            Credit 
                                                        </th>
                                                    </tr>
                                                </thead>  
                                                <tbody>
                                                    <tr 
                                                        v-for="(detail, index) in details"
                                                        :key="detail.item_num"
                                                    >
                                                        <td class="text-left" style="padding-left: 5px;width:5%" @click="index">
                                                            {{ detail.item_num }}
                                                        </td>
                                                        <td class="text-left"  style="padding-left: 5px;width:35%">
                                                            {{ detail.ac_num }}
                                                        </td>
                                                        <td style="padding-left: 5px;width:25%">
                                                            {{ detail.item_memo }}
                                                        </td>
                                                        <td class="text-right" style="text-align: right;padding: 5px 10px;">
                                                            {{ $store.getters.convertToCurrencyUs(detail.amt_dr) }}
                                                        </td>
                                                        <td class="text-right" style="text-align: right;padding: 5px 10px;">
                                                            {{ $store.getters.convertToCurrencyUs(detail.amt_cr) }}
                                                        </td> 
                                                    </tr>
                                                    <tr style="border: 1px solid #DDD;">
                                                        <td colspan="3" style="padding: 5px 10px;">
                                                            Terbilang: 
                                                            {{ this.terbilang }}
                                                        </td>
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
                            Filter Other Journal
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
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">Start Date </h6>
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
                                        v-model="date_from_filter"
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
                                        v-model="date_from_filter"
                                        no-title
                                        @input="modal_filter = false"
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
                                    {{ detail ? detail.tr_id : '' }}
                                </h6>
                                <p class="text-center">
                                    Are you sure delete this Other Journal ？
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
                            <v-btn block class="rounded-l text-white p-3" color="#003871" @click="deleteOtherJournal()">Delete</v-btn>
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
import {other_journal} from "../../../backend-api/ledger/transaction/other_journal"

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
                'Trans ID': 'tr_id',
                'Date': 'dt_jv',
                'Description': 'descr',
                'Paid to': 'paid_to',
                'Amt Debet': 'amt_dr',
                'Amt Credit': 'amt_cr',
            },
            headers: [
                {
                    text: 'Entity',
                    align: 'start',
                    value: 'entity_id', 
                    align:'left'},
                { text: 'Office', value: 'office' , align:'left'},
                { text: 'Trans ID', value: 'tr_id' , align:'left'},
                { text: 'Date', value: 'dt_jv' , align:'left'},
                { text: 'Description', value: 'descr' , align:'left'},
                { text: 'Paid to', value: 'paid_to' , align:'left'},
                { text: 'Amt Debet', value: 'amt_dr' , align:'right'},
                { text: 'Amt Credit', value: 'amt_cr' , align:'right'},
                { text: 'Action', value: 'action' , align:'left'},
            ],
            other_journals: [],
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
            date_from_jv: '',
            modal_retur: false,
            date_to_jv: '',
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
            paid_to: '',
            currency: 'IDR',
            modal_filter: false,
            date_from_filter: '',
            acps: [],
            acp: ''
        }
    },
    computed:{
        total_debit(){
            var total_debit = 0
            for (let index = 0; index < this.details.length; index++) {
                if (this.details[index].is_del == 0 || this.details[index].is_del == '0') {
                    total_debit = total_debit + parseFloat(this.details[index].amt_dr);
                }
            }
            
            return (total_debit | 0)
        },
        total_credit(){
            var total_credit = 0
            for (let index = 0; index < this.details.length; index++) {
                if (this.details[index].is_del == 0 || this.details[index].is_del == '0') {
                    total_credit = total_credit + parseFloat(this.details[index].amt_cr);
                }
            }
            
            return (total_credit | 0)
        },
    },
    async mounted(){
        this.$store.dispatch('setOverlay', true)

        await this.getPullData()
        await this.getEntity()
        await this.getAccountBank()
        await this.glFlags()

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
            this.date_from = ''
            this.paid_to = ''
            this.remark = ''
            this.acp = ''
            this.details = []
            this.debits = []
            this.credits = []
            this.dialogShow = false
        },
        async detailShow(item){
            this.$store.dispatch('setOverlay', true)
            this.detail = item
            await this.getBranchOffice()
            this.entity_id = item.entity_id
            this.office_id = item.office_id
            this.date_from = item.dt_jv ? item.dt_jv.substr(0, 10) : ''
            this.remark = item.descr
            this.paid_to = item.paid_to
            this.acp = item.gl_flag_id
            await this.getAccount()
            await this.pullDetail(item)
            this.dialogShow = true
            this.dialog = true
            this.$store.dispatch('setOverlay', false)
        },
        async detailItemDelete(item){
            this.$store.dispatch('setOverlay', true)
            this.detail = item
            await this.getBranchOffice()
            this.entity_id = item.entity_id
            this.office_id = item.office_id
            this.date_from = item.dt_jv ? item.dt_jv.substr(0, 10) : ''
            this.remark = item.descr
            this.paid_to = item.paid_to
            this.acp = item.gl_flag_id
            await this.getAccount()
            await this.pullDetail(item)
            this.dialog_delete = true
            this.$store.dispatch('setOverlay', false)
        },
        async printItem(item){
            this.$store.dispatch('setOverlay', true)
            this.detail = item
            await this.getBranchOffice()
            this.entity_id = item.entity_id
            this.office_id = item.office_id
            this.acp = item.gl_flag_id
            this.date_from = item.dt_jv ? item.dt_jv.substr(0, 10) : ''
            this.remark = item.descr
            this.paid_to = item.paid_to
            await this.getAccount()
            await this.pullDetail(item)
            this.dialogShow = true
            this.dialogPrint = true
            this.$store.dispatch('setOverlay', false)
        },
        async getPullData(){
            this.other_journals = []
            this.$store.dispatch('setOverlay', true)

            var start_date = this.date_from_filter ? new Date(this.date_from_filter).toISOString().substr(0, 10) : ''
            var end_date = this.date_to ? new Date(this.date_to).toISOString().substr(0, 10) : ''

            var respData = await other_journal.index(`?search=${this.search ? this.search : ''}&entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&dt_jv_start=${start_date}&dt_jv_end=${end_date}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}`, null, false, false, false)
            if (respData.status === 200) {
                this.other_journals = respData.data.data
                this.$store.dispatch('setOverlay', false)
            } else{
                this.$store.dispatch('setOverlay', false)
            }
        },
        async glFlags(){
            var respData = await ledger_coa.glFlag(``, null, false, false, false)
            if (respData.status === 200) {
                this.acps = respData.data.data
                console.log(this.acps);
            }
        },
        async exportExcel(){
            var start_date = this.date_from ? new Date(this.date_from).toISOString().substr(0, 10) : ''
            var end_date = this.date_to ? new Date(this.date_to).toISOString().substr(0, 10) : ''
            var respData = await other_journal.index(`?search=${this.search ? this.search : ''}&entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&dt_jv_start=${start_date}&dt_jv_end=${end_date}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}`, null, false, false, false)
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
                var respData = await ledger_coa.fetchLedgerCoa(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&active_flag=Y&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}`, null, false, false, false)
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
        async getDetailAcNum(event, index){
            if (event === null || event === '') {
                this.details[index].ac_par = ''
                this.details[index].ac_sub_par_one = ''
                this.details[index].ac_num = ''
            } else {
                var respData = await ledger_coa.fetchLedgerCoa(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_num=${event}`, null, false, false, false)
                if (respData.status === 200) {
                    this.details[index].ac_par = respData.data.data ? respData.data.data[0].ac_par : ''
                    this.details[index].ac_sub_par_one = respData.data.data ? respData.data.data[0].ac_sub_par_one : ''
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
                    item_num: this.details.length + 1,
                    ac_num: '',
                    jv_num: 0,
                    item_memo: '',
                    amt_dr: 0,
                    amt_cr: 0,
                    ac_par:"",
                    ac_sub_par_one:"",
                    is_del: 0,
                    drcr : ''
                }
            )    
        },
        deleteDetail(detail, index){
            this.details.splice(index, 1);
        },
        async submit(){
            this.debits = []
            this.credits = []

            this.$store.dispatch('setOverlay', true)
            this.dialog = false

            if (this.total_debit == 0 || this.total_credit == 0 || this.entity_id === '' || this.office_id === '' || this.date_from === '' || this.remark === '' || this.details.length === 0) {
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

            if (this.total_debit != this.total_credit) {
                this.snackbar = {
                    color: "error",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Error",
                    text: 'Total Debet dan Credit harus sama',
                    visible: true
                };
                this.$store.dispatch('setOverlay', false)
                this.dialog = true

                return false
            }

            for (let index = 0; index < this.details.length; index++) {
                if (this.details[index].drcr === 'DR') {
                    this.debits.push(
                        {
                            ac_par : this.details[index].ac_par,
                            ac_sub_par_one: this.details[index].ac_sub_par_one,
                            ac_num_dr: this.details[index].ac_num,
                            amt_dr: this.details[index].amt_dr,
                            remark: this.details[index].item_memo,
                            is_del: 0,
                            gl_flag_id: ''
                        }
                    )
                } 

                if (this.details[index].drcr === 'CR') {
                    this.credits.push(
                        {
                            ac_par : this.details[index].ac_par,
                            ac_sub_par_one: this.details[index].ac_sub_par_one,
                            ac_num_cr: this.details[index].ac_num,
                            amt_cr: this.details[index].amt_cr,
                            remark: this.details[index].item_memo,
                            is_del: 0,
                            gl_flag_id: ''
                        }
                    )
                } 
            }

            var reqBody = {
                'entity_id': this.entity_id ? this.entity_id : '',
                'office_id': this.office_id ? this.office_id : '',
                'dt_jv': this.date_from ? new Date(this.date_from).toISOString().substr(0, 10).replace(/-/g,"") : '',
                'paid_to': this.paid_to ? this.paid_to : '',
                'descr': this.remark ? this.remark : '',
                'curr_id': this.currency ? this.currency : 'IDR',
                'rate': '1',
                'amt_dr': this.total_debit,
                'amt_cr': this.total_credit,
                'detail': this.details,
                'debit': this.debits,
                'credit': this.credits,
                'gl_flag_id': this.acp ? this.acp : ''
            }

            const respData = await other_journal.store('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.snackbar = {
                    color: "success",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: 'Successfully Transaction',
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
            var reqBody = {
                'entity_id': item.entity_id ? item.entity_id : '',
                'office_id': item.office_id ? item.office_id : '',
                'tr_id': item.tr_id ? item.tr_id : '',
            }
            var respData = await other_journal.show('', reqBody, false, false, false)
            if (respData.status === 200) {
                for (let index = 0; index < respData.data.data.length; index++) {
                    const element = respData.data.data[index];
                    this.details.push(
                        {
                            item_num: element.item_num,
                            ac_num: element.ac_num,
                            jv_num: element.jv_num,
                            item_memo: element.item_memo,
                            amt_dr: parseFloat(element.amt_dr),
                            amt_cr: parseFloat(element.amt_cr),
                            ac_par:"",
                            ac_sub_par_one:"",
                            is_del: 0,
                            drcr : element.amt_dr > 0 ? 'DR' : 'CR'
                        }
                    )
                    await this.getDetailAcNum(element.ac_num, index)
                }

                var terbilang = new CalculateTerbilang(this.total_debit)
                this.terbilang = terbilang.pembilang()
                
            }
        },
        async deleteOtherJournal(){
            this.debits = []
            this.credits = []

            this.$store.dispatch('setOverlay', true)
            this.dialog_delete = false

            for (let index = 0; index < this.details.length; index++) {
                if (this.details[index].drcr === 'DR') {
                    this.debits.push(
                        {
                            ac_par : this.details[index].ac_par,
                            ac_sub_par_one: this.details[index].ac_sub_par_one,
                            ac_num_dr: this.details[index].ac_num,
                            amt_dr: this.details[index].amt_dr,
                            remark: this.details[index].item_memo,
                            is_del: 1,
                            gl_flag_id: ''
                        }
                    )
                } 

                if (this.details[index].drcr === 'CR') {
                    this.credits.push(
                        {
                            ac_par : this.details[index].ac_par,
                            ac_sub_par_one: this.details[index].ac_sub_par_one,
                            ac_num_cr: this.details[index].ac_num,
                            amt_cr: this.details[index].amt_cr,
                            remark: this.details[index].item_memo,
                            is_del: 1,
                            gl_flag_id: ''
                        }
                    )
                } 
            }

            var reqBody = {
                "rate": "1",
                "debit": this.debits,
                "descr": this.detail ? this.detail.descr : '',
                "dt_jv": this.detail ? this.detail.dt_jv : '',
                "tr_id": this.detail ? this.detail.tr_id : '',
                "amt_cr": this.detail ? Number(this.detail.amt_cr) : '',
                "amt_dr": this.detail ? Number(this.detail.amt_dr) : '',
                "credit": this.credits,
                "detail": this.details,
                "curr_id": "IDR",
                "paid_to": this.detail ? this.detail.paid_to : '',
                "entity_id": this.detail ? this.detail.entity_id : '',
                "office_id": this.detail ? this.detail.office_id : '',
            }

            const respData = await other_journal.destroy('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.snackbar = {
                    color: "success",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: 'Other Journal Successfully',
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
        checkAccount(event, index, type){
            if (event) {
                if (event.isTrusted === true) {
                    if (type === 'DR') {
                        if (this.details[index].amt_cr > 0) {
                            this.details[index].amt_cr = 0
                        }
                    }
                    if (type === 'CR') {
                        if (this.details[index].amt_dr > 0) {
                            this.details[index].amt_dr = 0
                        }
                    }

                    this.details[index].drcr = type

                }
            }
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