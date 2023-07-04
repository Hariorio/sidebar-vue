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

                    <v-tab href="#tab-1" active-class="active-tab">
                        G Ledger Year
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
                            </v-card-title>
                            <v-card-text>
                                <v-data-table
                                    dense
                                    :headers="headers"
                                    :items="gl_years"
                                    class="elevation-1"
                                    :items-per-page="20"
                                    :loading="$store.state.overlay"
                                    height="560"
                                    :divider="true"
                                    :light="true"
                                    :item-class="tr_datatable"
                                    hide-default-header
                                    fixed-header
                                >    
                                    <template #header="{ props: { headers } }">
                                        <thead class="v-data-table-header">
                                            <tr>
                                                <th
                                                    rowspan="2"
                                                    class="text-uppercase text-left"
                                                >
                                                    Action
                                                </th>
                                                <th
                                                    rowspan="2"
                                                    class="text-uppercase text-left"
                                                >
                                                    Entity
                                                </th>
                                                <th
                                                    rowspan="2"
                                                    class="text-uppercase text-left"
                                                >
                                                    Office
                                                </th>
                                                <th
                                                    rowspan="2"
                                                    class="text-uppercase text-left"
                                                >
                                                    Year
                                                </th>
                                                <th
                                                    colspan="2"
                                                    class="text-uppercase text-center"
                                                >
                                                    January
                                                </th>
                                                <th
                                                    colspan="2"
                                                    class="text-uppercase text-center"
                                                >
                                                    February
                                                </th>
                                                <th
                                                    colspan="2"
                                                    class="text-uppercase text-center"
                                                >
                                                    March
                                                </th>
                                                <th
                                                    colspan="2"
                                                    class="text-uppercase text-center"
                                                >
                                                    April
                                                </th>
                                                <th
                                                    colspan="2"
                                                    class="text-uppercase text-center"
                                                >
                                                    May
                                                </th>
                                                <th
                                                    colspan="2"
                                                    class="text-uppercase text-center"
                                                >
                                                    June
                                                </th>
                                                <th
                                                    colspan="2"
                                                    class="text-uppercase text-center"
                                                >
                                                    July
                                                </th>
                                                <th
                                                    colspan="2"
                                                    class="text-uppercase text-center"
                                                >
                                                    August
                                                </th>
                                                <th
                                                    colspan="2"
                                                    class="text-uppercase text-center"
                                                >
                                                    September
                                                </th>
                                                <th
                                                    colspan="2"
                                                    class="text-uppercase text-center"
                                                >
                                                    October
                                                </th>
                                                <th
                                                    colspan="2"
                                                    class="text-uppercase text-center"
                                                >
                                                    November
                                                </th>
                                                <th
                                                    colspan="2"
                                                    class="text-uppercase text-center"
                                                >
                                                    December
                                                </th>
                                            </tr>
                                            <tr>
                                                <th class="text-center">
                                                    Debit
                                                </th>
                                                <th class="text-center">
                                                    Credit
                                                </th>
                                                <th class="text-center">
                                                    Debit
                                                </th>
                                                <th class="text-center">
                                                    Credit
                                                </th>
                                                <th class="text-center">
                                                    Debit
                                                </th>
                                                <th class="text-center">
                                                    Credit
                                                </th>
                                                <th class="text-center">
                                                    Debit
                                                </th>
                                                <th class="text-center">
                                                    Credit
                                                </th>
                                                <th class="text-center">
                                                    Debit
                                                </th>
                                                <th class="text-center">
                                                    Credit
                                                </th>
                                                <th class="text-center">
                                                    Debit
                                                </th>
                                                <th class="text-center">
                                                    Credit
                                                </th>
                                                <th class="text-center">
                                                    Debit
                                                </th>
                                                <th class="text-center">
                                                    Credit
                                                </th>
                                                <th class="text-center">
                                                    Debit
                                                </th>
                                                <th class="text-center">
                                                    Credit
                                                </th>
                                                <th class="text-center">
                                                    Debit
                                                </th>
                                                <th class="text-center">
                                                    Credit
                                                </th>
                                                <th class="text-center">
                                                    Debit
                                                </th>
                                                <th class="text-center">
                                                    Credit
                                                </th>
                                                <th class="text-center">
                                                    Debit
                                                </th>
                                                <th class="text-center">
                                                    Credit
                                                </th>
                                                <th class="text-center">
                                                    Debit
                                                </th>
                                                <th class="text-center">
                                                    Credit
                                                </th>
                                            </tr>
                                        </thead>
                                    </template>
                                    <template v-slot:[`item.total_dr_01`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.total_dr_01) }}
                                    </template> 
                                    <template v-slot:[`item.total_cr_01`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.total_cr_01) }}
                                    </template> 
                                    <template v-slot:[`item.total_dr_02`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.total_dr_02) }}
                                    </template> 
                                    <template v-slot:[`item.total_cr_02`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.total_cr_02) }}
                                    </template> 
                                    <template v-slot:[`item.total_dr_03`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.total_dr_03) }}
                                    </template> 
                                    <template v-slot:[`item.total_cr_03`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.total_cr_03) }}
                                    </template> 
                                    <template v-slot:[`item.total_dr_04`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.total_dr_04) }}
                                    </template> 
                                    <template v-slot:[`item.total_cr_04`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.total_cr_04) }}
                                    </template> 
                                    <template v-slot:[`item.total_dr_05`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.total_dr_05) }}
                                    </template> 
                                    <template v-slot:[`item.total_cr_05`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.total_cr_05) }}
                                    </template> 
                                    <template v-slot:[`item.total_dr_06`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.total_dr_06) }}
                                    </template> 
                                    <template v-slot:[`item.total_cr_06`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.total_cr_06) }}
                                    </template> 
                                    <template v-slot:[`item.total_dr_07`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.total_dr_07) }}
                                    </template> 
                                    <template v-slot:[`item.total_cr_07`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.total_cr_07) }}
                                    </template> 
                                    <template v-slot:[`item.total_dr_08`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.total_dr_08) }}
                                    </template> 
                                    <template v-slot:[`item.total_cr_08`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.total_cr_08) }}
                                    </template> 
                                    <template v-slot:[`item.total_dr_09`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.total_dr_09) }}
                                    </template> 
                                    <template v-slot:[`item.total_cr_09`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.total_cr_09) }}
                                    </template> 
                                    <template v-slot:[`item.total_dr_10`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.total_dr_10) }}
                                    </template> 
                                    <template v-slot:[`item.total_cr_10`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.total_cr_10) }}
                                    </template> 
                                    <template v-slot:[`item.total_dr_11`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.total_dr_11) }}
                                    </template> 
                                    <template v-slot:[`item.total_cr_11`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.total_cr_11) }}
                                    </template> 
                                    <template v-slot:[`item.total_dr_12`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.total_dr_12) }}
                                    </template> 
                                    <template v-slot:[`item.total_cr_12`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.total_cr_12) }}
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
                                                        <v-list-item-title>Journal Year</v-list-item-title>
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
                                                Journal Year
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
                                        <div style="width: 100%;" id="divName">
                                            <table cellspacing="0" cellpadding="0" class="container" style="width: 100%; margin-top: 20px;border: 1px solid #DDD;font-size: 14px;">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <table width="100%" cellspacing="0" cellpadding="0" style="width: 100%; padding-bottom: 10px;border-bottom: 1px solid #DDD;background-color: #54acd2;">
                                                                <tbody>
                                                                    <tr style="margin-top: 8px; margin-bottom: 8px;">
                                                                        <td>
                                                                            <div class="d-flex m-2">
                                                                                <img src="../../../assets/logo_gki.png" height="60px" alt="">
                                                                                <h5 class="mt-4 ml-4 text-white">JOURNAL YEAR</h5>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <table width="100%" cellspacing="0" cellpadding="0" style="width: 100%; margin: 10px 0;">
                                                                <tbody>
                                                                    <tr style="margin-top: 8px; margin-bottom: 8px;">
                                                                        <td style="width:5%; padding-left: 10px;">
                                                                            Entity
                                                                        </td>
                                                                        <td style="width:2%">
                                                                            :
                                                                        </td>
                                                                        <td style="width:10%">
                                                                            {{ this.detail ? this.detail.entity_id : '' }}
                                                                        </td>
                                                                        <td style="width:5%; padding-left: 10px;">
                                                                            Office
                                                                        </td>
                                                                        <td style="width:2%">
                                                                            :
                                                                        </td>
                                                                        <td style="width:10%">
                                                                            {{ this.detail ? this.detail.office : '' }}
                                                                        </td>
                                                                        <td style="width:5%; padding-left: 10px;">
                                                                            Year
                                                                        </td>
                                                                        <td style="width:2%">
                                                                            :
                                                                        </td>
                                                                        <td style="width:10%">
                                                                            {{ this.detail ? this.detail.year_id : '' }}
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <table width="100%" cellspacing="0" cellpadding="0" style="width: 100%; margin: 5px 0 0 0;border-top: 1px solid #DDD;">
                                                                <thead style="background-color: #54acd2;">
                                                                    <tr style="border-bottom: 1px solid #DDD;">
                                                                        <td rowspan="2" class="text-left" style="width: 10px; padding: 10px 10px;color: #fff;" >
                                                                            No
                                                                        </td>
                                                                        <td rowspan="2" class="text-left"  style="width: 100px; padding: 10px 10px;color: #fff;">
                                                                            Ac Num
                                                                        </td>
                                                                        <td rowspan="2" class="text-left"  style="width: 100px; padding: 10px 10px;color: #fff;">
                                                                            Account Name
                                                                        </td>
                                                                        <td
                                                                            colspan="2"
                                                                            class="text-uppercase text-center"
                                                                            style="color: #fff;"
                                                                        >
                                                                            January
                                                                        </td>
                                                                        <td
                                                                            colspan="2"
                                                                            class="text-uppercase text-center"
                                                                            style="color: #fff;"
                                                                        >
                                                                            February
                                                                        </td>
                                                                        <td
                                                                            colspan="2"
                                                                            class="text-uppercase text-center"
                                                                            style="color: #fff;"
                                                                        >
                                                                            March
                                                                        </td>
                                                                        <td
                                                                            colspan="2"
                                                                            class="text-uppercase text-center"
                                                                            style="color: #fff;"
                                                                        >
                                                                            April
                                                                        </td>
                                                                        <td
                                                                            colspan="2"
                                                                            class="text-uppercase text-center"
                                                                            style="color: #fff;"
                                                                        >
                                                                            May
                                                                        </td>
                                                                        <td
                                                                            colspan="2"
                                                                            class="text-uppercase text-center"
                                                                            style="color: #fff;"
                                                                        >
                                                                            June
                                                                        </td>
                                                                        <td
                                                                            colspan="2"
                                                                            class="text-uppercase text-center"
                                                                            style="color: #fff;"
                                                                        >
                                                                            July
                                                                        </td>
                                                                        <td
                                                                            colspan="2"
                                                                            class="text-uppercase text-center"
                                                                            style="color: #fff;"
                                                                        >
                                                                            August
                                                                        </td>
                                                                        <td
                                                                            colspan="2"
                                                                            class="text-uppercase text-center"
                                                                            style="color: #fff;"
                                                                        >
                                                                            September
                                                                        </td>
                                                                        <td
                                                                            colspan="2"
                                                                            class="text-uppercase text-center"
                                                                            style="color: #fff;"
                                                                        >
                                                                            October
                                                                        </td>
                                                                        <td
                                                                            colspan="2"
                                                                            class="text-uppercase text-center"
                                                                            style="color: #fff;"
                                                                        >
                                                                            November
                                                                        </td>
                                                                        <td
                                                                            colspan="2"
                                                                            class="text-uppercase text-center"
                                                                            style="color: #fff;"
                                                                        >
                                                                            December
                                                                        </td>                                         
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="text-center" style="color: #fff;">
                                                                            Debit
                                                                        </td>
                                                                        <td class="text-center" style="color: #fff;">
                                                                            Credit
                                                                        </td>
                                                                        <td class="text-center" style="color: #fff;">
                                                                            Debit
                                                                        </td>
                                                                        <td class="text-center" style="color: #fff;">
                                                                            Credit
                                                                        </td>
                                                                        <td class="text-center" style="color: #fff;">
                                                                            Debit
                                                                        </td>
                                                                        <td class="text-center" style="color: #fff;">
                                                                            Credit
                                                                        </td>
                                                                        <td class="text-center" style="color: #fff;">
                                                                            Debit
                                                                        </td>
                                                                        <td class="text-center" style="color: #fff;">
                                                                            Credit
                                                                        </td>
                                                                        <td class="text-center" style="color: #fff;">
                                                                            Debit
                                                                        </td>
                                                                        <td class="text-center" style="color: #fff;">
                                                                            Credit
                                                                        </td>
                                                                        <td class="text-center" style="color: #fff;">
                                                                            Debit
                                                                        </td>
                                                                        <td class="text-center" style="color: #fff;">
                                                                            Credit
                                                                        </td>
                                                                        <td class="text-center" style="color: #fff;">
                                                                            Debit
                                                                        </td>
                                                                        <td class="text-center" style="color: #fff;">
                                                                            Credit
                                                                        </td>
                                                                        <td class="text-center" style="color: #fff;">
                                                                            Debit
                                                                        </td>
                                                                        <td class="text-center" style="color: #fff;">
                                                                            Credit
                                                                        </td>
                                                                        <td class="text-center" style="color: #fff;">
                                                                            Debit
                                                                        </td>
                                                                        <td class="text-center" style="color: #fff;">
                                                                            Credit
                                                                        </td>
                                                                        <td class="text-center" style="color: #fff;">
                                                                            Debit
                                                                        </td>
                                                                        <td class="text-center" style="color: #fff;">
                                                                            Credit
                                                                        </td>
                                                                        <td class="text-center" style="color: #fff;">
                                                                            Debit
                                                                        </td>
                                                                        <td class="text-center" style="color: #fff;">
                                                                            Credit
                                                                        </td>
                                                                        <td class="text-center" style="color: #fff;">
                                                                            Debit
                                                                        </td>
                                                                        <td class="text-center" style="color: #fff;">
                                                                            Credit
                                                                        </td>
                                                                    </tr>
                                                                </thead>  
                                                                <tbody>
                                                                    <tr 
                                                                        v-for="(journal, index) in journals"
                                                                        :key="index"
                                                                    >
                                                                        <td class="text-left" style="padding: 5px 10px;" >
                                                                            {{ index + 1 }}
                                                                        </td>
                                                                        <td class="text-left"  style="padding: 5px 10px;">
                                                                            {{journal.ac_num}}
                                                                        </td>
                                                                        <td class="text-left"  style="padding: 5px 10px;">
                                                                            {{journal.ac_name}}
                                                                        </td>
                                                                        <td class="text-right" style="padding: 5px 10px;">
                                                                            {{ $store.getters.convertToCurrencyUs(journal.dr_01) }}
                                                                        </td>
                                                                        <td class="text-right"  style="text-align: right; padding: 5px 10px;">
                                                                            {{ $store.getters.convertToCurrencyUs(journal.cr_01) }}
                                                                        </td>
                                                                        <td class="text-right" style="padding: 5px 10px;">
                                                                            {{ $store.getters.convertToCurrencyUs(journal.dr_02) }}
                                                                        </td>
                                                                        <td class="text-right"  style="text-align: right; padding: 5px 10px;">
                                                                            {{ $store.getters.convertToCurrencyUs(journal.cr_02) }}
                                                                        </td>
                                                                        <td class="text-right" style="padding: 5px 10px;">
                                                                            {{ $store.getters.convertToCurrencyUs(journal.dr_03) }}
                                                                        </td>
                                                                        <td class="text-right"  style="text-align: right; padding: 5px 10px;">
                                                                            {{ $store.getters.convertToCurrencyUs(journal.cr_03) }}
                                                                        </td>
                                                                        <td class="text-right" style="padding: 5px 10px;">
                                                                            {{ $store.getters.convertToCurrencyUs(journal.dr_04) }}
                                                                        </td>
                                                                        <td class="text-right"  style="text-align: right; padding: 5px 10px;">
                                                                            {{ $store.getters.convertToCurrencyUs(journal.cr_04) }}
                                                                        </td>
                                                                        <td class="text-right" style="padding: 5px 10px;">
                                                                            {{ $store.getters.convertToCurrencyUs(journal.dr_05) }}
                                                                        </td>
                                                                        <td class="text-right"  style="text-align: right; padding: 5px 10px;">
                                                                            {{ $store.getters.convertToCurrencyUs(journal.cr_05) }}
                                                                        </td>
                                                                        <td class="text-right" style="padding: 5px 10px;">
                                                                            {{ $store.getters.convertToCurrencyUs(journal.dr_06) }}
                                                                        </td>
                                                                        <td class="text-right"  style="text-align: right; padding: 5px 10px;">
                                                                            {{ $store.getters.convertToCurrencyUs(journal.cr_06) }}
                                                                        </td>
                                                                        <td class="text-right" style="padding: 5px 10px;">
                                                                            {{ $store.getters.convertToCurrencyUs(journal.dr_07) }}
                                                                        </td>
                                                                        <td class="text-right"  style="text-align: right; padding: 5px 10px;">
                                                                            {{ $store.getters.convertToCurrencyUs(journal.cr_07) }}
                                                                        </td>
                                                                        <td class="text-right" style="padding: 5px 10px;">
                                                                            {{ $store.getters.convertToCurrencyUs(journal.dr_08) }}
                                                                        </td>
                                                                        <td class="text-right"  style="text-align: right; padding: 5px 10px;">
                                                                            {{ $store.getters.convertToCurrencyUs(journal.cr_08) }}
                                                                        </td>
                                                                        <td class="text-right" style="padding: 5px 10px;">
                                                                            {{ $store.getters.convertToCurrencyUs(journal.dr_09) }}
                                                                        </td>
                                                                        <td class="text-right"  style="text-align: right; padding: 5px 10px;">
                                                                            {{ $store.getters.convertToCurrencyUs(journal.cr_09) }}
                                                                        </td>
                                                                        <td class="text-right" style="padding: 5px 10px;">
                                                                            {{ $store.getters.convertToCurrencyUs(journal.dr_10) }}
                                                                        </td>
                                                                        <td class="text-right"  style="text-align: right; padding: 5px 10px;">
                                                                            {{ $store.getters.convertToCurrencyUs(journal.cr_10) }}
                                                                        </td>
                                                                        <td class="text-right" style="padding: 5px 10px;">
                                                                            {{ $store.getters.convertToCurrencyUs(journal.dr_11) }}
                                                                        </td>
                                                                        <td class="text-right"  style="text-align: right; padding: 5px 10px;">
                                                                            {{ $store.getters.convertToCurrencyUs(journal.cr_11) }}
                                                                        </td>
                                                                        <td class="text-right" style="padding: 5px 10px;">
                                                                            {{ $store.getters.convertToCurrencyUs(journal.dr_12) }}
                                                                        </td>
                                                                        <td class="text-right"  style="text-align: right; padding: 5px 10px;">
                                                                            {{ $store.getters.convertToCurrencyUs(journal.cr_12) }}
                                                                        </td>   
                                                                    </tr>
                                                                    <tr style="border: 1px solid #DDD;background-color: #54acd2;color: #fff;">
                                                                        <td colspan="3" style="padding: 5px 10px;"> Total : </td>
                                                                        <td class="text-right" style="text-align: right;padding: 5px 10px;">
                                                                            Rp. {{$store.getters.convertToCurrencyUs(total_debit_01)}}
                                                                        </td>
                                                                        <td class="text-right" style="text-align: right;padding: 5px 10px;">
                                                                            Rp. {{$store.getters.convertToCurrencyUs(total_credit_01)}}
                                                                        </td>
                                                                        <td class="text-right" style="text-align: right;padding: 5px 10px;">
                                                                            Rp. {{$store.getters.convertToCurrencyUs(total_debit_02)}}
                                                                        </td>
                                                                        <td class="text-right" style="text-align: right;padding: 5px 10px;">
                                                                            Rp. {{$store.getters.convertToCurrencyUs(total_credit_02)}}
                                                                        </td>
                                                                        <td class="text-right" style="text-align: right;padding: 5px 10px;">
                                                                            Rp. {{$store.getters.convertToCurrencyUs(total_debit_03)}}
                                                                        </td>
                                                                        <td class="text-right" style="text-align: right;padding: 5px 10px;">
                                                                            Rp. {{$store.getters.convertToCurrencyUs(total_credit_03)}}
                                                                        </td>
                                                                        <td class="text-right" style="text-align: right;padding: 5px 10px;">
                                                                            Rp. {{$store.getters.convertToCurrencyUs(total_debit_04)}}
                                                                        </td>
                                                                        <td class="text-right" style="text-align: right;padding: 5px 10px;">
                                                                            Rp. {{$store.getters.convertToCurrencyUs(total_credit_04)}} 
                                                                        </td>
                                                                        <td class="text-right" style="text-align: right;padding: 5px 10px;">
                                                                            Rp. {{$store.getters.convertToCurrencyUs(total_debit_05)}}
                                                                        </td>
                                                                        <td class="text-right" style="text-align: right;padding: 5px 10px;">
                                                                            Rp. {{$store.getters.convertToCurrencyUs(total_credit_05)}}
                                                                        </td>
                                                                        <td class="text-right" style="text-align: right;padding: 5px 10px;">
                                                                            Rp. {{$store.getters.convertToCurrencyUs(total_debit_06)}}
                                                                        </td>
                                                                        <td class="text-right" style="text-align: right;padding: 5px 10px;">
                                                                            Rp. {{$store.getters.convertToCurrencyUs(total_credit_06)}}
                                                                        </td>
                                                                        <td class="text-right" style="text-align: right;padding: 5px 10px;">
                                                                            Rp. {{$store.getters.convertToCurrencyUs(total_debit_07)}}
                                                                        </td>
                                                                        <td class="text-right" style="text-align: right;padding: 5px 10px;">
                                                                            Rp. {{$store.getters.convertToCurrencyUs(total_credit_07)}}
                                                                        </td>
                                                                        <td class="text-right" style="text-align: right;padding: 5px 10px;">
                                                                            Rp. {{$store.getters.convertToCurrencyUs(total_debit_08)}}
                                                                        </td>
                                                                        <td class="text-right" style="text-align: right;padding: 5px 10px;">
                                                                            Rp. {{$store.getters.convertToCurrencyUs(total_credit_08)}}
                                                                        </td>
                                                                        <td class="text-right" style="text-align: right;padding: 5px 10px;">
                                                                            Rp. {{$store.getters.convertToCurrencyUs(total_debit_09)}}
                                                                        </td>
                                                                        <td class="text-right" style="text-align: right;padding: 5px 10px;">
                                                                            Rp. {{$store.getters.convertToCurrencyUs(total_credit_09)}}
                                                                        </td>
                                                                        <td class="text-right" style="text-align: right;padding: 5px 10px;">
                                                                            Rp. {{$store.getters.convertToCurrencyUs(total_debit_10)}}
                                                                        </td>
                                                                        <td class="text-right" style="text-align: right;padding: 5px 10px;">
                                                                            Rp. {{$store.getters.convertToCurrencyUs(total_credit_10)}}
                                                                        </td>
                                                                        <td class="text-right" style="text-align: right;padding: 5px 10px;">
                                                                            Rp. {{$store.getters.convertToCurrencyUs(total_debit_11)}}
                                                                        </td>
                                                                        <td class="text-right" style="text-align: right;padding: 5px 10px;">
                                                                            Rp. {{$store.getters.convertToCurrencyUs(total_credit_11)}}
                                                                        </td>
                                                                        <td class="text-right" style="text-align: right;padding: 5px 10px;">
                                                                            Rp. {{$store.getters.convertToCurrencyUs(total_debit_12)}}
                                                                        </td>
                                                                        <td class="text-right" style="text-align: right;padding: 5px 10px;">
                                                                            Rp. {{$store.getters.convertToCurrencyUs(total_credit_12)}}
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
                                                Filter Journal Year
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
                </v-tabs-items>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import {entity} from "../../../backend-api/entity/master"
import {office} from "../../../backend-api/office/index"
import { Money } from 'v-money'
import {gl_year} from "../../../backend-api/ledger/transaction/gl_year"

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
                    text: 'Report Ledger Transaction',
                    disabled: true,
                }
            ],
            headers:[
                { text: 'Action', value: 'action' , align: 'start', align:'left'},
                {
                    text: 'Entity ID',
                    value: 'entity_id', 
                    align:'left'},
                { text: 'Office', value: 'office' , align:'left'},
                { text: 'Year', value: 'year_id' , align:'left'},
                { text: 'Total Debit', value: 'total_dr_01' , align:'right'},
                { text: 'Total Credit', value: 'total_cr_01' , align:'right'},
                { text: 'Total Debit', value: 'total_dr_02' , align:'right'},
                { text: 'Total Credit', value: 'total_cr_02' , align:'right'},
                { text: 'Total Debit', value: 'total_dr_03' , align:'right'},
                { text: 'Total Credit', value: 'total_cr_03' , align:'right'},
                { text: 'Total Debit', value: 'total_dr_04' , align:'right'},
                { text: 'Total Credit', value: 'total_cr_04' , align:'right'},
                { text: 'Total Debit', value: 'total_dr_05' , align:'right'},
                { text: 'Total Credit', value: 'total_cr_05' , align:'right'},
                { text: 'Total Debit', value: 'total_dr_06' , align:'right'},
                { text: 'Total Credit', value: 'total_cr_06' , align:'right'},
                { text: 'Total Debit', value: 'total_dr_07' , align:'right'},
                { text: 'Total Credit', value: 'total_cr_07' , align:'right'},
                { text: 'Total Debit', value: 'total_dr_08' , align:'right'},
                { text: 'Total Credit', value: 'total_cr_08' , align:'right'},
                { text: 'Total Debit', value: 'total_dr_09' , align:'right'},
                { text: 'Total Credit', value: 'total_cr_09' , align:'right'},
                { text: 'Total Debit', value: 'total_dr_10' , align:'right'},
                { text: 'Total Credit', value: 'total_cr_10' , align:'right'},
                { text: 'Total Debit', value: 'total_dr_11' , align:'right'},
                { text: 'Total Credit', value: 'total_cr_11' , align:'right'},
                { text: 'Total Debit', value: 'total_dr_12' , align:'right'},
                { text: 'Total Credit', value: 'total_cr_12' , align:'right'},
            ],
            headersColumn: {
                'Entity ID': 'entity_id',
                'Office': 'office',
                'Year': 'year_id',
                'Total Debit January': 'total_dr_01',
                'Total Credit January': 'total_cr_01',
                'Total Debit February': 'total_dr_02',
                'Total Credit February': 'total_cr_02',
                'Total Debit March': 'total_dr_03',
                'Total Credit March': 'total_cr_03',
                'Total Debit April': 'total_dr_04',
                'Total Credit April': 'total_cr_04',
                'Total Debit May': 'total_dr_05',
                'Total Credit May': 'total_cr_05',
                'Total Debit June': 'total_dr_06',
                'Total Credit June': 'total_cr_06',
                'Total Debit July': 'total_dr_07',
                'Total Credit July': 'total_cr_07',
                'Total Debit August': 'total_dr_08',
                'Total Credit August': 'total_cr_08',
                'Total Debit September': 'total_dr_09',
                'Total Credit September': 'total_cr_09',
                'Total Debit October': 'total_dr_10',
                'Total Credit October': 'total_cr_10',
                'Total Debit November': 'total_dr_11',
                'Total Credit November': 'total_cr_11',
                'Total Debit December': 'total_dr_12',
                'Total Credit December': 'total_cr_12',
            },
            gl_years: [],
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
        total_debit_01(){
            var total_debit_01 = 0

            for (let index = 0; index < this.journals.length; index++) {
                total_debit_01 = total_debit_01 + Number(this.journals[index].dr_01);
            }
            
            return (total_debit_01 | 0)
        },
        total_credit_01(){
            var total_credit_01 = 0

            for (let index = 0; index < this.journals.length; index++) {
                total_credit_01 = total_credit_01 + Number(this.journals[index].cr_01);
            }
            
            return (total_credit_01 | 0)
        },
        total_debit_02(){
            var total_debit_02 = 0

            for (let index = 0; index < this.journals.length; index++) {
                total_debit_02 = total_debit_02 + Number(this.journals[index].dr_02);
            }
            
            return (total_debit_02 | 0)
        },
        total_credit_02(){
            var total_credit_02 = 0

            for (let index = 0; index < this.journals.length; index++) {
                total_credit_02 = total_credit_02 + Number(this.journals[index].cr_02);
            }
            
            return (total_credit_02 | 0)
        },
        total_debit_03(){
            var total_debit_03 = 0

            for (let index = 0; index < this.journals.length; index++) {
                total_debit_03 = total_debit_03 + Number(this.journals[index].dr_03);
            }
            
            return (total_debit_03 | 0)
        },
        total_credit_03(){
            var total_credit_03 = 0

            for (let index = 0; index < this.journals.length; index++) {
                total_credit_03 = total_credit_03 + Number(this.journals[index].cr_03);
            }
            
            return (total_credit_03 | 0)
        },
        total_debit_04(){
            var total_debit_04 = 0

            for (let index = 0; index < this.journals.length; index++) {
                total_debit_04 = total_debit_04 + Number(this.journals[index].dr_04);
            }
            
            return (total_debit_04 | 0)
        },
        total_credit_04(){
            var total_credit_04 = 0

            for (let index = 0; index < this.journals.length; index++) {
                total_credit_04 = total_credit_04 + Number(this.journals[index].cr_04);
            }
            
            return (total_credit_04 | 0)
        },
        total_debit_05(){
            var total_debit_05 = 0

            for (let index = 0; index < this.journals.length; index++) {
                total_debit_05 = total_debit_05 + Number(this.journals[index].dr_05);
            }
            
            return (total_debit_05 | 0)
        },
        total_credit_05(){
            var total_credit_05 = 0

            for (let index = 0; index < this.journals.length; index++) {
                total_credit_05 = total_credit_05 + Number(this.journals[index].cr_05);
            }
            
            return (total_credit_05 | 0)
        },
        total_debit_06(){
            var total_debit_06 = 0

            for (let index = 0; index < this.journals.length; index++) {
                total_debit_06 = total_debit_06 + Number(this.journals[index].dr_06);
            }
            
            return (total_debit_06 | 0)
        },
        total_credit_06(){
            var total_credit_06 = 0

            for (let index = 0; index < this.journals.length; index++) {
                total_credit_06 = total_credit_06 + Number(this.journals[index].cr_06);
            }
            
            return (total_credit_06 | 0)
        },
        total_debit_07(){
            var total_debit_07 = 0

            for (let index = 0; index < this.journals.length; index++) {
                total_debit_07 = total_debit_07 + Number(this.journals[index].dr_07);
            }
            
            return (total_debit_07 | 0)
        },
        total_credit_07(){
            var total_credit_07 = 0

            for (let index = 0; index < this.journals.length; index++) {
                total_credit_07 = total_credit_07 + Number(this.journals[index].cr_07);
            }
            
            return (total_credit_07 | 0)
        },
        total_debit_08(){
            var total_debit_08 = 0

            for (let index = 0; index < this.journals.length; index++) {
                total_debit_08 = total_debit_08 + Number(this.journals[index].dr_08);
            }
            
            return (total_debit_08 | 0)
        },
        total_credit_08(){
            var total_credit_08 = 0

            for (let index = 0; index < this.journals.length; index++) {
                total_credit_08 = total_credit_08 + Number(this.journals[index].cr_08);
            }
            
            return (total_credit_08 | 0)
        },
        total_debit_09(){
            var total_debit_09 = 0

            for (let index = 0; index < this.journals.length; index++) {
                total_debit_09 = total_debit_09 + Number(this.journals[index].dr_09);
            }
            
            return (total_debit_09 | 0)
        },
        total_credit_09(){
            var total_credit_09 = 0

            for (let index = 0; index < this.journals.length; index++) {
                total_credit_09 = total_credit_09 + Number(this.journals[index].cr_09);
            }
            
            return (total_credit_09 | 0)
        },
        total_debit_10(){
            var total_debit_10 = 0

            for (let index = 0; index < this.journals.length; index++) {
                total_debit_10 = total_debit_10 + Number(this.journals[index].dr_10);
            }
            
            return (total_debit_10 | 0)
        },
        total_credit_10(){
            var total_credit_10 = 0

            for (let index = 0; index < this.journals.length; index++) {
                total_credit_10 = total_credit_10 + Number(this.journals[index].cr_10);
            }
            
            return (total_credit_10 | 0)
        },
        total_debit_11(){
            var total_debit_11 = 0

            for (let index = 0; index < this.journals.length; index++) {
                total_debit_11 = total_debit_11 + Number(this.journals[index].dr_11);
            }
            
            return (total_debit_11 | 0)
        },
        total_credit_11(){
            var total_credit_11 = 0

            for (let index = 0; index < this.journals.length; index++) {
                total_credit_11 = total_credit_11 + Number(this.journals[index].cr_11);
            }
            
            return (total_credit_11 | 0)
        },
        total_debit_12(){
            var total_debit_12 = 0

            for (let index = 0; index < this.journals.length; index++) {
                total_debit_12 = total_debit_12 + Number(this.journals[index].dr_12);
            }
            
            return (total_debit_12 | 0)
        },
        total_credit_12(){
            var total_credit_12 = 0

            for (let index = 0; index < this.journals.length; index++) {
                total_credit_12 = total_credit_12 + Number(this.journals[index].cr_12);
            }
            
            return (total_credit_12 | 0)
        },
    },
    async mounted(){
        this.$store.dispatch('setOverlay', true)

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
        },
        save(date) {
            this.$refs.menu.save(date)

            this.$refs.picker.activePicker = 'YEAR'

            this.menu = false

            this.year = new Date(date.substr(0, 4)).toISOString().substr(0, 4)
        },
        async getPullData(){
            this.gl_years = []
            this.$store.dispatch('setOverlay', true)
            var respData = await gl_year.index(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&year_id=${this.year ? this.year : ''}&bidang=${this.$store.state.user.bidang ? this.$store.state.user.bidang : ''}&komisi=${this.$store.state.user.komisi ? this.$store.state.user.komisi : ''}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}`, null, false, false, false)
            if (respData.status === 200) {
                this.gl_years = respData.data.data
                this.$store.dispatch('setOverlay', false)
            } else{
                this.$store.dispatch('setOverlay', false)
            }
        },
        async detailItem(item){
            this.detail = item

            var reqBody = {
                'office_id': item.office_id,
                'entity_id': item.entity_id,
                'year_id': item.year_id
            }

            const respData = await gl_year.show('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.dialog = true
                this.journals = respData.data.data
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
                this.ac_par = ''
            } else{
                var respData = await office.fetchOffice(`?entity_id=${this.entity_id ? this.entity_id : ''}`, null, false, false, false)
                if (respData.status === 200) {
                    this.offices = respData.data.data
                }
            }
        },
        async exportExcel(){            
            var respData =await gl_year.index(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&year_id=${this.year ? this.year : ''}&bidang=${this.$store.state.user.bidang ? this.$store.state.user.bidang : ''}&komisi=${this.$store.state.user.komisi ? this.$store.state.user.komisi : ''}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}`, null, false, false, false)
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
    color: rgba(0, 0, 0, 0.6) !important;
    border: 1px solid #cccccc !important;
}
td{
    font-size: 11.5px;
}
</style>