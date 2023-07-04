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
                                    :items="other_payments"
                                    class="elevation-1 mt-3"
                                    :items-per-page="20"
                                    :loading="$store.state.overlay"
                                    height="578"
                                    fixed-header
                                    :divider="true"
                                    :light="true"
                                    :item-class="tr_datatable"
                                >     
                                    <template v-slot:[`item.amount`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.amount) }}
                                    </template>
                                    <template v-slot:[`item.tr_date`]="{ item }">
                                        {{ item.tr_date ? (new Date(new Date(item.tr_date) - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) : '' }}
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
                                                <!-- <v-list-item @click="detailItemEdit(item)">
                                                    <v-list-item-icon>
                                                        <v-icon>mdi-pencil</v-icon>
                                                    </v-list-item-icon>
                                                    <v-list-item-content>
                                                        <v-list-item-title>Edit</v-list-item-title>
                                                    </v-list-item-content>
                                                </v-list-item> -->
                                                <v-list-item @click="detailItemDelete(item)">
                                                    <v-list-item-icon>
                                                        <v-icon>mdi-delete</v-icon>
                                                    </v-list-item-icon>
                                                    <v-list-item-content>
                                                        <v-list-item-title>Delete</v-list-item-title>
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
                                                    Other Payment
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
                                                                        @change="(event) => getAcNum(event)"
                                                                    ></v-autocomplete> 
                                                                </v-col>
                                                                <v-col class="col-12" sm="6" md="2">
                                                                    <h6 class="blue-lcd mb-1">Account Bank <span class="red--text"><strong>* </strong></span></h6>
                                                                    <v-autocomplete
                                                                        dense
                                                                        solo
                                                                        clearable
                                                                        v-model="bank_acc"
                                                                        :items="bank_accs"
                                                                        item-value="bank_acc"
                                                                        :item-text="item => item.acc_code +' - '+ item.bank_acc +' - '+ item.bank_name"
                                                                        class="ma-0 pa-0 border-12"
                                                                        hide-details=true
                                                                        @change="(event) => getDetailAccountBank(event)"
                                                                    ></v-autocomplete> 
                                                                </v-col>
                                                                <v-col class="col-12" sm="6" md="2">
                                                                    <h6 class="blue-lcd mb-1">Pendeta</h6>
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
                                                                <v-col class="col-12" sm="6" md="4">
                                                                    <h6 class="blue-lcd mb-1">Memo Text</h6>
                                                                    <v-text-field
                                                                        solo
                                                                        dense
                                                                        persistent-hint
                                                                        v-model="memo_text"
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
                                                                        Item
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
                                                                                <th class="text-left"  style="width:40%">
                                                                                    Ac Num
                                                                                </th>
                                                                                <th class="text-left" style="width:35%">
                                                                                    Remark
                                                                                </th>
                                                                                <th   style="width:15%">
                                                                                    Amount
                                                                                </th>
                                                                                <th class="text-center"  style="width:5%">
                                                                                    
                                                                                </th>  
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr v-for="(detail, index) in detail_items" :key="detail.seq_no">
                                                                                <td>{{ detail.seq_no }}</td>
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
                                                                                        v-model="detail.item_notes"
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
                                                                                                    <money class="" name="amount" v-model.lazy="detail.amount" v-bind="money"></money>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    <v-btn small class="p-1 text-white" color="red" @click="deleteDetail(detail, index)" >
                                                                                        <v-icon>
                                                                                            mdi-delete
                                                                                        </v-icon>
                                                                                    </v-btn>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
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
                                                    Edit Other Payment
                                                </div>
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    class="mx-2"
                                                    fab
                                                    x-small
                                                    color="#e83e8c;"
                                                    @click="[dialogEdit = false, clear()]"
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
                                                                        disabled
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
                                                                        @change="(event) => getAcNum(event)"
                                                                        disabled
                                                                    ></v-autocomplete> 
                                                                </v-col>
                                                                <v-col class="col-12" sm="6" md="2">
                                                                    <h6 class="blue-lcd mb-1">Account Bank <span class="red--text"><strong>* </strong></span></h6>
                                                                    <v-autocomplete
                                                                        dense
                                                                        solo
                                                                        clearable
                                                                        v-model="bank_acc"
                                                                        :items="bank_accs"
                                                                        item-value="acc_code"
                                                                        :item-text="item => item.acc_code +' - '+ item.bank_acc +' - '+ item.bank_name"
                                                                        class="ma-0 pa-0 border-12"
                                                                        hide-details=true
                                                                        disabled
                                                                    ></v-autocomplete> 
                                                                </v-col>
                                                                <v-col class="col-12" sm="6" md="2">
                                                                    <h6 class="blue-lcd mb-1">Pendeta</h6>
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
                                                                <v-col class="col-12" sm="6" md="4">
                                                                    <h6 class="blue-lcd mb-1">Memo Text</h6>
                                                                    <v-text-field
                                                                        solo
                                                                        dense
                                                                        persistent-hint
                                                                        v-model="memo_text"
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
                                                                        Item
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
                                                                                <th class="text-left"  style="width:40%">
                                                                                    Ac Num
                                                                                </th>
                                                                                <th class="text-left" style="width:35%">
                                                                                    Remark
                                                                                </th>
                                                                                <th   style="width:15%">
                                                                                    Amount
                                                                                </th>
                                                                                <th class="text-center"  style="width:5%">
                                                                                    
                                                                                </th>  
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr v-for="(detail, index) in detail_edits" :key="detail.seq_no">
                                                                                <td>{{ index+1 }}</td>
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
                                                                                        v-model="detail.item_notes"
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
                                                                                                    <money class="" name="amount" v-model.lazy="detail.amount" v-bind="money"></money>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    <v-btn small class="p-1 text-white" color="red"  @click="deleteDetailEdit(detail, index)"  >
                                                                                        <v-icon>
                                                                                            mdi-delete
                                                                                        </v-icon>
                                                                                    </v-btn>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
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
                                            <v-btn block class="rounded-l mr-2" color="#fff" @click="[dialogEdit = false, clear()]">Cancel</v-btn>
                                        </v-col>
                                        <v-col cols="12" xs="12" sm="3" md="3">
                                            <v-btn block class="rounded-l text-white" color="success" @click="submitEdit()">Save</v-btn>
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
                                                    Are you sure delete this Payment ？
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
                        <v-dialog
                            v-model="dialogShow"
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
                                                    Detail Other Payment
                                                </div>
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    class="mx-2"
                                                    fab
                                                    x-small
                                                    color="#e83e8c;"
                                                    @click="[dialogShow = false, clear()]"
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
                                                                        disabled
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
                                                                        @change="(event) => getAcNum(event)"
                                                                        disabled
                                                                    ></v-autocomplete> 
                                                                </v-col>
                                                                <v-col class="col-12" sm="6" md="2">
                                                                    <h6 class="blue-lcd mb-1">Account Bank <span class="red--text"><strong>* </strong></span></h6>
                                                                    <v-autocomplete
                                                                        dense
                                                                        solo
                                                                        clearable
                                                                        v-model="bank_acc"
                                                                        :items="bank_accs"
                                                                        item-value="acc_code"
                                                                        :item-text="item => item.acc_code +' - '+ item.bank_acc +' - '+ item.bank_name"
                                                                        class="ma-0 pa-0 border-12"
                                                                        hide-details=true
                                                                        disabled
                                                                    ></v-autocomplete> 
                                                                </v-col>
                                                                <v-col class="col-12" sm="6" md="2">
                                                                    <h6 class="blue-lcd mb-1">Pendeta</h6>
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
                                                                <v-col class="col-12" sm="6" md="4">
                                                                    <h6 class="blue-lcd mb-1">Memo Text</h6>
                                                                    <v-text-field
                                                                        solo
                                                                        dense
                                                                        persistent-hint
                                                                        v-model="memo_text"
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
                                                                        Item
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
                                                                                <th class="text-left"  style="width:40%">
                                                                                    Ac Num
                                                                                </th>
                                                                                <th class="text-left" style="width:35%">
                                                                                    Remark
                                                                                </th>
                                                                                <th   style="width:15%">
                                                                                    Amount
                                                                                </th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr v-for="(detail, index) in detail_edits" :key="detail.seq_no">
                                                                                <td>{{ index+1 }}</td>
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
                                                                                        v-model="detail.item_notes"
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
                                                                                                    <money class="" name="amount" v-model.lazy="detail.amount" v-bind="money"></money>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
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
                            </v-card>
                        </v-dialog>
                    </v-tab-item>
                    <v-tab-item
                        value="tab-2"
                    >  
                        <other-deposit></other-deposit>
                    </v-tab-item>
                    <v-tab-item
                        value="tab-3"
                    >  
                        <other-journal></other-journal>
                    </v-tab-item>
                </v-tabs-items>
                <v-dialog
                    v-model="dialogfilter"
                    persistent
                    max-width="600px"
                >
                    <v-card class="p-2 rounded-l">
                        <v-card-title class="text-center">
                            <v-row>
                                <v-col cols="12">
                                    Filter Other Payment
                                </v-col>
                                <v-divider></v-divider>
                            </v-row>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row class="mt-2 mb-5">
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
                                        <h6 class="blue-lcd mb-1">Account Bank </h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="bank_acc"
                                            :items="bank_accs"
                                            item-value="acc_code"
                                            :item-text="item => item.acc_code +' - '+ item.bank_acc +' - '+ item.bank_name"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            @change="(event) => getDetailAccountBank(event)"
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
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import {entity} from "../../../backend-api/entity/master"
import {ledger_coa} from "../../../backend-api/ledger/coa/index"
import {office} from "../../../backend-api/office/index"
import {other_payment_deposit} from "../../../backend-api/ledger/other/other_payment_deposit"
import {account_bank} from "../../../backend-api/ledger/account_bank"
import { Money } from 'v-money'
import OtherDeposit from "./OtherDeposit.vue"
import OtherJournal from './OtherJournal.vue'
import {appl_constant} from "../../../backend-api/appl_constant/index"
import {env_conf} from "../../../backend-api/env_conf/index"

export default {
    components: {
        Money, OtherDeposit, OtherJournal
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
                    text: 'Manual Transaction',
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
                { text: 'TR ID', value: 'tr_id' , align:'left', width:'100'},
                { text: 'Trans Date', value: 'tr_date' , align:'left', width:'200'},
                { text: 'Ac Num', value: 'ac_num' , align:'left', width:'200'},
                { text: 'Account Bank', value: 'ac_name' , align:'left', width:'300'},
                { text: 'Memo', value: 'memo_txt' , align:'left'},
                { text: 'Amount', value: 'amount' , align:'right', width:'250'},
                { text: 'Action', value: 'action' , align:'left', width:'50'},
            ],
            headersColumn: {
                'Entity ID': 'entity_id',
                'Office': 'office',
                'AC Num': 'ac_num',
                'TR ID': 'tr_id',
                'Trans Date': 'tr_date',
                'Account Bank': 'ac_name',
                'Memo': 'memo_txt',
                'Amount': 'amount'
            },
            other_payments: [],
            search: '',
            entities: [],
            entity_id: '',
            offices: [],
            office_id: '',
            dialog: false,
            bank_acc: '',
            bank_accs: [],
            bank_account: null,
            memo_text: '',
            tr_type: 'OP',
            ac_nums: [],
            ac_num: '',
            detail_items: [
                {
                    seq_no: 1,
                    ac_num: '',
                    drcr: '',
                    item_notes: '',
                    amount: 0,
                    cost_ctr_id:"",
                    budget_id:"",
                    dept_id: "",
                    sect_id: "",
                    ac_par:"",
                    ac_sub_par_one:"",
                    is_del: 0
                }
            ],
            debits: [],
            debit_temps: [],
            credits: [],
            dialogEdit: false,
            detail: null,
            dialog_delete: false,
            dialogShow: false,
            dialogfilter: false,
            date_from: '',
            modal: false,
            date_to: '',
            modal_to: false,
            tabs: [],
            acps: [],
            acp: ''
        }
    },
    computed:{
        total(){
            var total = 0
            for (let index = 0; index < this.detail_items.length; index++) {
                if (this.detail_items[index].is_del == 0 || this.detail_items[index].is_del == '0') {
                    total = total + parseFloat(this.detail_items[index].amount);
                }
            }
            
            return (total | 0)
        },
        detail_edits(){
            return this.detail_items.filter(i => i.is_del === 0)
        },
    },
    async mounted(){  
        this.$store.dispatch('setOverlay', true)
        await this.getApplConstant()
        await this.glFlags()
        await this.getPullData()
        await this.getEntity()
        await this.getAccountBank()
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
            this.bank_acc = ''
            this.memo_text = ''
            this.date_from = ''
            this.date_to = ''
            this.acp = ''
            this.detail_items = [
                {
                    seq_no: 1,
                    ac_num: '',
                    drcr: '',
                    item_notes: '',
                    amount: 0,
                    cost_ctr_id:"",
                    budget_id:"",
                    dept_id: "",
                    sect_id: "",
                    ac_par:"",
                    ac_sub_par_one:"",
                    is_del: 0
                }
            ]
        },
        detailItemEdit(item){
            this.detail = item
            this.getBranchOffice()
            this.dialogEdit = true
            this.entity_id = item.entity_id
            this.office_id = item.office_id
            this.bank_acc = item.ac_num
            this.memo_text = item.memo_txt
            this.acp = item.gl_flag_id
            this.getDetailAccountBankAcNum(item.ac_num)
            this.getAcNum()
            this.detailOtherPayment()
        },
        async detailItemDelete(item){
            this.$store.dispatch('setOverlay', true)

            this.detail = item
            await this.getBranchOffice()
            this.entity_id = item.entity_id
            this.office_id = item.office_id
            this.bank_acc = item.ac_num
            this.memo_text = item.memo_txt
            this.acp = item.gl_flag_id
            await this.getDetailAccountBankAcNum(item.ac_num)
            await this.getAcNum()
            await this.detailOtherPayment()
            this.dialog_delete = true

            this.$store.dispatch('setOverlay', false)

        },
        async detailShow(item){
            this.$store.dispatch('setOverlay', true)

            this.detail = item
            await this.getBranchOffice()
            this.entity_id = item.entity_id
            this.office_id = item.office_id
            this.bank_acc = item.ac_num
            this.memo_text = item.memo_txt
            this.acp = item.gl_flag_id
            await this.getDetailAccountBankAcNum(item.ac_num)
            await this.getAcNum()
            await this.detailOtherPayment()
            this.dialogShow = true
            this.$store.dispatch('setOverlay', false)

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
            var respDataTabs = await appl_constant.fetchApplConstant("?key_value=LEDGER&str2=MANUAL TRANSACTION&sort_order=asc&order_by=int1", null, false, false, false)
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
        async glFlags(){
            var respData = await ledger_coa.glFlag(``, null, false, false, false)
            if (respData.status === 200) {
                this.acps = respData.data.data
                console.log(this.acps);
            }
        },
        async getPullData(){
            this.other_payments = []
            this.$store.dispatch('setOverlay', true)

            var start_date = this.date_from ? new Date(this.date_from).toISOString().substr(0, 10) : ''
            var end_date = this.date_to ? new Date(this.date_to).toISOString().substr(0, 10) : ''

            var respData = await other_payment_deposit.index(`?search=${this.search ? this.search : ''}&tr_type=OP&entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_num=${this.bank_acc ? this.bank_acc : ''}&tr_date_start=${start_date}&tr_date_end=${end_date}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}`, null, false, false, false)
            if (respData.status === 200) {
                this.other_payments = respData.data.data
                this.$store.dispatch('setOverlay', false)

            } else{
                this.$store.dispatch('setOverlay', false)
            }
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
        async getAcNum(){
            this.ac_nums = []
            this.$store.dispatch('setOverlay', true)
            var respData = await ledger_coa.fetchLedgerCoa(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}`, null, false, false, false)
            if (respData.status === 200) {
                this.ac_nums = respData.data.data
                this.$store.dispatch('setOverlay', false)

            } else{
                this.$store.dispatch('setOverlay', false)
            }
        },
        async getAccountBank(){
            var respData = await account_bank.index(`?posting=Y`, null, false, false, false)
            if (respData.status === 200) {
                this.bank_accs = respData.data.data
            }
        },
        async getDetailAccountBank(event){
            if (event === null || event === '') {
                this.bank_acc = ''
            } else {
                var respData = await account_bank.show(event, null, false, false, false)
                if (respData.status === 200) {
                    this.bank_account = respData.data.data
                }
            }
        },
        async getDetailAccountBankAcNum(event){
            if (event === null || event === '') {
                this.bank_acc = ''
            } else {
                var respData = await account_bank.showAcNum(event, null, false, false, false)
                if (respData.status === 200) {
                    this.bank_account = respData.data.data
                }
            }
        },
        async getDetailAcNum(event, index){
            if (event === null || event === '') {
                this.detail_items[index].ac_num = ''
                this.detail_items[index].drcr = ''
            } else {
                var respData = await ledger_coa.fetchLedgerCoa(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_num=${event}`, null, false, false, false)
                if (respData.status === 200) {
                    this.detail_items[index].drcr = respData.data.data ? respData.data.data[0].drcr : ''
                    this.detail_items[index].ac_par = respData.data.data ? respData.data.data[0].ac_par : ''
                    this.detail_items[index].ac_sub_par_one = respData.data.data ? respData.data.data[0].ac_sub_par_one : ''

                    this.debit_temps[index].drcr = respData.data.data ? respData.data.data[0].drcr : ''
                    this.debit_temps[index].ac_par = respData.data.data ? respData.data.data[0].ac_par : ''
                    this.debit_temps[index].ac_sub_par_one = respData.data.data ? respData.data.data[0].ac_sub_par_one : ''
                }
            }
        },
        async submitDetail(){
            this.detail_items.push(
                {
                    seq_no: this.detail_items.length + 1,
                    ac_num: '',
                    drcr: '',
                    item_notes: '',
                    amount: 0,
                    cost_ctr_id:"",
                    budget_id:"",
                    dept_id: "",
                    sect_id: "",
                    ac_par:"",
                    ac_sub_par_one:"",
                    is_del: 0
                }
            )    
        },
        deleteDetail(detail, index){
            this.detail_items.splice(index, 1);
        },
        deleteDetailEdit(detail, index){
            console.log(this.detail_items, index);
            this.detail_items[index].is_del = 1
        },
        async submit(){
            this.debits = []
            this.credits = []

            this.$store.dispatch('setOverlay', true)
            this.dialog = false

            if (this.total == 0 || this.entity_id === '' || this.office_id === '' || this.bank_acc === '') {
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

            this.credits.push(
                {
                    ac_par : this.bank_account ? this.bank_account.ac_par : '',
                    ac_sub_par_one: this.bank_account ? this.bank_account.ac_sub_par_one : '',
                    ac_num_cr: this.bank_account ? this.bank_account.acc_code : '',
                    amt_cr: this.total,
                    remark: this.memo_text ? this.memo_text : '',
                    is_del: 0,
                    gl_flag_id: this.acp ? this.acp : ''
                }
            )

            for (let index = 0; index < this.detail_items.length; index++) {
                this.debits.push(
                    {
                        ac_par : this.detail_items[index].ac_par,
                        ac_sub_par_one: this.detail_items[index].ac_sub_par_one,
                        ac_num_dr: this.detail_items[index].ac_num,
                        amt_dr: this.detail_items[index].amount,
                        remark: this.detail_items[index].item_notes,
                        is_del: 0,
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
                'entity_id': this.entity_id ? this.entity_id : '',
                'office_id': this.office_id ? this.office_id : '',
                'tr_type': 'OP',
                'tr_date': (new Date(new Date() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                'ac_num': this.bank_account ? this.bank_account.acc_code : '',
                'cek_no': '',
                'memo_txt': this.memo_text ? this.memo_text : '',
                'paid_to': '',
                'curr_id': 'IDR',
                'exchange_rate': '1',
                'amount': this.total,
                'detail': this.detail_items,
                'debit': debits,
                'credit': this.credits,
                'gl_flag_id': this.acp ? this.acp : ''
            }

            const respData = await other_payment_deposit.store('', reqBody, false, false, false)

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
        async detailOtherPayment(){
            var reqBody = {
                'entity_id': this.entity_id ? this.entity_id : '',
                'office_id': this.office_id ? this.office_id : '',
                'tr_id': this.detail ? this.detail.tr_id : '',
                'tr_type': 'OP'
            }

            const respData = await other_payment_deposit.show('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.detail_items = []
                this.debit_temps = []
                for (let index = 0; index < respData.data.data.length; index++) {
                    this.detail_items.push(
                        {
                            seq_no: respData.data.data[index].seq_no,
                            ac_num: respData.data.data[index].ac_num,
                            drcr: respData.data.data[index].drcr,
                            item_notes: respData.data.data[index].item_notes,
                            amount: parseFloat(respData.data.data[index].amount),
                            cost_ctr_id:"",
                            budget_id:"",
                            dept_id: "",
                            sect_id: "",
                            ac_par:"",
                            ac_sub_par_one:"",
                            is_del: 0
                        }
                    )

                    this.debit_temps.push(
                        {
                            seq_no: respData.data.data[index].seq_no,
                            ac_num: respData.data.data[index].ac_num,
                            drcr: respData.data.data[index].drcr,
                            item_notes: respData.data.data[index].item_notes,
                            amount: parseFloat(respData.data.data[index].amount),
                            cost_ctr_id:"",
                            budget_id:"",
                            dept_id: "",
                            sect_id: "",
                            ac_par:"",
                            ac_sub_par_one:"",
                            is_del: 0
                        }
                    )

                    this.getDetailAcNum(respData.data.data[index].ac_num, index)
                }
            }
        },
        async submitEdit(){
            this.debits = []
            this.credits = []

            this.$store.dispatch('setOverlay', true)
            this.dialogEdit = false

            if (this.total == 0 || this.entity_id === '' || this.office_id === '' || this.bank_acc === '') {
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

            this.credits.push(
                {
                    ac_par : this.bank_account ? this.bank_account.ac_par : '',
                    ac_sub_par_one: this.bank_account ? this.bank_account.ac_sub_par_one : '',
                    ac_num_cr: this.bank_account ? this.bank_account.acc_code : '',
                    amt_cr: this.total,
                    remark: this.memo_text ? this.memo_text : '',
                    is_del: 0
                }
            )

            const deletes = []
            const temps_debit = []

            for (let index = 0; index < this.detail_items.length; index++) {
                this.debits.push(
                    {
                        ac_par : this.detail_items[index].ac_par,
                        ac_sub_par_one: this.detail_items[index].ac_sub_par_one,
                        ac_num_dr: this.detail_items[index].ac_num,
                        amt_dr: this.detail_items[index].amount,
                        is_del: this.detail_items[index].is_del,
                        remark: this.detail_items[index].item_notes ? this.detail_items[index].item_notes : ''
                    }
                )

                if (this.detail_items[index].is_del === 1) {
                    let indexElementDel  = deletes.findIndex(elm => {
                        return elm === this.detail_items[index].ac_num;
                    });

                    if(indexElementDel !== -1){

                    }else{
                        deletes.push(this.detail_items[index].ac_num)
                    }
                } else {
                    let indexElementDebitTemp  = temps_debit.findIndex(elm => {
                        return elm.ac_num_dr === this.detail_items[index].ac_num;
                    });

                    if(indexElementDebitTemp !== -1){
                        temps_debit[indexElementDebitTemp].amt_dr += parseFloat(this.detail_items[index].amount)
                    }else{
                        temps_debit.push(
                        {
                                ac_par : this.detail_items[index].ac_par,
                                ac_sub_par_one: this.detail_items[index].ac_sub_par_one,
                                ac_num_dr: this.detail_items[index].ac_num,
                                amt_dr: this.detail_items[index].amount,
                                is_del: this.detail_items[index].is_del,
                                remark: this.detail_items[index].item_notes ? this.detail_items[index].item_notes : ''
                            }
                        )
                    }
                    
                }
            }

            const debit_temps = []

            this.debit_temps.forEach((element)=>{
                let indexElementDebit  = debit_temps.findIndex(elm => {
                    return elm.ac_num_dr === element.ac_num;
                });
                if(indexElementDebit !== -1){
                    debit_temps[indexElementDebit].amt_dr += parseFloat(element.amount)
                }
                else {
                    debit_temps.push(
                        {
                            ac_par : element.ac_par,
                            ac_sub_par_one: element.ac_sub_par_one,
                            ac_num_dr: element.ac_num,
                            amt_dr: element.amount,
                            is_del: element.is_del,
                            remark: element.item_notes ? element.item_notes : ''
                        }
                    )
                }
            });

            const debit_final = []

            for (let index = 0; index < deletes.length; index++) {
                const del = deletes[index];
                const temp = debit_temps.filter(i => i.ac_num_dr === del)
                // console.log(temp);
                if (temp.length > 0) {
                    temp[0].is_del = 1
                    debit_final.push(temp[0])
                }
            }

            const debit_fixs = temps_debit.concat(debit_final);

            var reqBody = {
                'entity_id': this.entity_id ? this.entity_id : '',
                'office_id': this.office_id ? this.office_id : '',
                'tr_id': this.detail ? this.detail.tr_id : '',
                'memo_txt': this.memo_text ? this.memo_text : '',
                'tr_type': 'OP',
                'tr_date': (new Date(new Date() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                'ac_num': this.bank_account ? this.bank_account.acc_code : '',
                'cek_no': '',
                'paid_to': '',
                'curr_id': 'IDR',
                'exchange_rate': '1',
                'amount': this.total,
                'detail': this.detail_edits,
                'debit': debit_fixs,
                'credit': this.credits,
                'gl_flag_id': this.acp ? this.acp : ''
            }

            const respData = await other_payment_deposit.update('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.snackbar = {
                    color: "success",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: 'Edit Payment Successfully',
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
        async deletePayment(){
            this.debits = []
            this.credits = []

            this.$store.dispatch('setOverlay', true)
            this.dialog_delete = false

            if (this.total == 0 || this.entity_id === '' || this.office_id === '' || this.bank_acc === '') {
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
                    ac_par : this.bank_account ? this.bank_account.ac_par : '',
                    ac_sub_par_one: this.bank_account ? this.bank_account.ac_sub_par_one : '',
                    ac_num_cr: this.bank_account ? this.bank_account.acc_code : '',
                    amt_cr: this.total,
                    remark: this.memo_text ? this.memo_text : '',
                    is_del: 1,
                    gl_flag_id: this.acp ? this.acp : ''
                }
            )

            for (let index = 0; index < this.detail_items.length; index++) {
                this.debits.push(
                    {
                        ac_par : this.detail_items[index].ac_par,
                        ac_sub_par_one: this.detail_items[index].ac_sub_par_one,
                        ac_num_dr: this.detail_items[index].ac_num,
                        amt_dr: this.detail_items[index].amount,
                        remark: this.detail_items[index].item_notes ? this.detail_items[index].item_notes : '',
                        is_del: 1,
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
                'entity_id': this.entity_id ? this.entity_id : '',
                'office_id': this.office_id ? this.office_id : '',
                'tr_id': this.detail ? this.detail.tr_id : '',
                'memo_txt': this.memo_text ? this.memo_text : '',
                'tr_type': 'OP',
                // 'tr_date': (new Date(new Date() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                'tr_date': this.detail ? this.detail.tr_date : '',
                'ac_num': this.bank_account ? this.bank_account.acc_code : '',
                'cek_no': '',
                'paid_to': '',
                'curr_id': 'IDR',
                'exchange_rate': '1',
                'amount': this.total,
                'detail': this.detail_edits,
                'debit': debits,
                'credit': this.credits,
                'gl_flag_id': this.acp ? this.acp : ''
            }

            const respData = await other_payment_deposit.delete_payment('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.snackbar = {
                    color: "success",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: 'Delete Payment Successfully',
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
        async exportExcel(){
            var start_date = this.date_from ? new Date(this.date_from).toISOString().substr(0, 10) : ''
            var end_date = this.date_to ? new Date(this.date_to).toISOString().substr(0, 10) : ''
            
            var respData = await other_payment_deposit.index(`?search=${this.search ? this.search : ''}&tr_type=OP&entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_num=${this.bank_acc ? this.bank_acc : ''}&tr_date_start=${start_date}&tr_date_end=${end_date}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}`, null, false, false, false)
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