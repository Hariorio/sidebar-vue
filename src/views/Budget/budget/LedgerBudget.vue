<!-- Level acc num ga pake flag pendeta -->
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
                                    :items="ledger_budgets"
                                    class="elevation-1 mt-3"
                                    :items-per-page="20"
                                    :loading="$store.state.overlay"
                                    height="578"
                                    fixed-header
                                    :divider="true"
                                    :light="true"
                                    :item-class="tr_datatable"
                                >    
                                    <template v-slot:[`item.target`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.target) }}
                                    </template> 
                                    <template v-slot:[`item.alokasi`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.alokasi) }}
                                    </template> 
                                    <template v-slot:[`item.actual`]="{ item }">
                                        {{ $store.getters.convertToCurrencyUs(item.actual) }}
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

                                            <v-list dense>
                                                <v-list-item @click="detailItem(item)">
                                                    <v-list-item-icon>
                                                        <v-icon>mdi-magnify</v-icon>
                                                    </v-list-item-icon>
                                                    <v-list-item-content>
                                                        <v-list-item-title>Detail</v-list-item-title>
                                                    </v-list-item-content>
                                                </v-list-item>
                                                <v-list-item @click="detailItemEdit(item)" v-if="$store.state.user.id_pdt === '' || $store.state.user.id_pdt === null">
                                                    <v-list-item-icon>
                                                        <v-icon>mdi-pencil</v-icon>
                                                    </v-list-item-icon>
                                                    <v-list-item-content>
                                                        <v-list-item-title>Edit</v-list-item-title>
                                                    </v-list-item-content>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                    </template>
                                </v-data-table>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item
                        value="tab-2"
                    >
                        <activity-ledger-budget></activity-ledger-budget>
                    </v-tab-item>
                </v-tabs-items>
                
                <v-dialog
                    v-model="dialog"
                    persistent
                    max-width="1200px"
                >
                    <v-card class="p-2 rounded-l">
                        <v-card-title class="text-center">
                            <v-row>
                                <v-col cols="12">
                                    Ledger Budgeting
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
                                            @change="(event) => getAcNum(event)"
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
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
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Period <strong style="color:red;">*</strong><span></span></h6>
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
                                                type="month"
                                                no-title
                                                :min="min_month"
                                                :max="max_month"
                                                :allowed-dates="allowedMonths"
                                                @input="modal = false"
                                            ></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col class="col-12" sm="2" md="2">
                                        <h6 class="blue-lcd mb-1">Curr ID</h6>
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
                                    <v-col class="col-12" sm="5" md="5">
                                        <h6 class="blue-lcd mb-1">Target <strong style="color:red;">*</strong><span></span></h6>
                                        <div class="v-input ma-0 pa-0 v-input--dense border-12 theme--light v-text-field v-text-field--single-line v-text-field--solo
                                        dense v-text-field--is-booted v-text-field--enclosed">
                                            <div class="v-input__control">
                                                <div class="v-input__slot">
                                                    <div class="v-text-field__slot">
                                                        <money class="" name="target" v-model.lazy="target" v-bind="money"></money>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </v-col>
                                    <v-col class="col-12" sm="5" md="5">
                                        <h6 class="blue-lcd mb-1">Aktual </h6>
                                        <div class="v-input ma-0 pa-0 v-input--dense border-12 theme--light v-text-field v-text-field--single-line v-text-field--solo
                                        dense v-text-field--is-booted v-text-field--enclosed">
                                            <div class="v-input__control">
                                                <div class="v-input__slot">
                                                    <div class="v-text-field__slot">
                                                        <money class="" name="actual" v-model.lazy="actual" v-bind="money" v-bind:readonly="true"></money>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                            <v-container v-if="showDetail && this.activity_headers.length > 0">
                                <v-row>
                                    <v-col cols="12">
                                        <h5 class="blue-lcd mb-1">Activity Budget</h5>
                                    </v-col>
                                </v-row>
                                <v-row v-for="(activity, index) in activity_headers"
                                    :key="activity.activity_no" class="mt-5">
                                    <v-col class="col-12" sm="12" md="12" @click="index">
                                        <table class="table table-bordered">
                                            <tr>
                                                <td style="width:20%">
                                                    No
                                                </td>
                                                <td style="width:2%">
                                                    :
                                                </td>
                                                <td>
                                                    {{ activity.activity_no }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width:20%">
                                                    Budget Type
                                                </td>
                                                <td style="width:2%">
                                                    :
                                                </td>
                                                <td>
                                                    {{ activity.budget_type }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Executor
                                                </td>
                                                <td style="width:2%">
                                                    :
                                                </td>
                                                <td>
                                                    {{ activity.executor }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Form 
                                                </td>
                                                <td style="width:2%">
                                                    :
                                                </td>
                                                <td>
                                                    {{ activity.form }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Remark 
                                                </td>
                                                <td style="width:2%">
                                                    :
                                                </td>
                                                <td>
                                                    {{ activity.remark }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Current 
                                                </td>
                                                <td style="width:2%">
                                                    :
                                                </td>
                                                <td>
                                                    {{ activity.current }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Expected 
                                                </td>
                                                <td style="width:2%">
                                                    :
                                                </td>
                                                <td>
                                                    {{ activity.expected }}
                                                </td>
                                            </tr>
                                        </table>
                                    </v-col>
                                    <v-col cols="12">
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr style="border-top:1px solid rgb(216 212 212);">
                                                    <th class="text-left" style="width:5%">
                                                        No
                                                    </th>
                                                    <th class="text-center" style="width:90%">
                                                        <strong>
                                                            TUJUAN
                                                        </strong>
                                                    </th>                                                  
                                                </tr>
                                            </thead>
                                            <tbody style="border-bottom:1px solid rgb(216 212 212);">
                                                <tr 
                                                    v-for="(purpose, index) in activity.purposes"
                                                    :key="purpose.seq_no"
                                                >
                                                    <td @click="index" style="width:5%">
                                                        {{ purpose.seq_no }}
                                                    </td>
                                                    <td>
                                                        {{ purpose.purpose }}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </v-col>
                                    <v-col cols="12">
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr style="border-top:1px solid rgb(216 212 212);">
                                                    <th class="text-center" style="width:5%" >
                                                        No
                                                    </th>
                                                    <th class="text-center" style="width:30%">
                                                        Remark
                                                    </th>
                                                    <th class="text-center"  style="width:15%">
                                                        Quantity
                                                    </th>
                                                    <th class="text-center"  style="width:15%">
                                                        Total Activity
                                                    </th>
                                                    <th class="text-center"  style="width:15%">
                                                        Budget
                                                    </th>
                                                    <th class="text-right"  style="width:15%">
                                                        Subtotal
                                                    </th>                                              
                                                </tr>
                                            </thead>
                                            <tbody style="border-bottom:1px solid rgb(216 212 212);">
                                                <tr 
                                                    v-for="(detail, index) in activity.details.datas"
                                                    :key="detail.seq_no"
                                                >
                                                    <td class="text-center" @click="index">{{ detail.seq_no }}</td>
                                                    <td class="text-center">
                                                        {{ detail.remark }}
                                                    </td>
                                                    <td class="text-center">
                                                        {{ $store.getters.convertToCurrencyUs(detail.qty) }}
                                                    </td>
                                                    <td class="text-center">
                                                        {{ $store.getters.convertToCurrencyUs(detail.total_activity) }}
                                                    </td>
                                                    <td class="text-center">
                                                        {{ $store.getters.convertToCurrencyUs(detail.budget) }}
                                                    </td>
                                                    <td class="text-right">
                                                        {{ $store.getters.convertToCurrencyUs(detail.budget_subtotal) }}
                                                    </td>
                                                </tr>
                                                <tr class="text-right">
                                                    <td colspan="8">
                                                        {{ $store.getters.convertToCurrencyUs(activity.details.total) }}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
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
                    max-width="600px"
                >
                    <v-card class="p-2 rounded-l">
                        <v-card-title class="text-center">
                            <v-row>
                                <v-col cols="12">
                                Edit Ledger Budgeting
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
                                            @change="(event) => getAcNum(event)"
                                            disabled
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
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
                                            disabled
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Period <strong style="color:red;">*</strong><span></span></h6>
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
                                                label="Period"
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
                                                @input="modal_edit = false"
                                                disabled
                                            ></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col class="col-12" sm="2" md="2">
                                        <h6 class="blue-lcd mb-1">Curr ID</h6>
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
                                    <v-col class="col-12" sm="5" md="5">
                                        <h6 class="blue-lcd mb-1">Target <strong style="color:red;">*</strong><span></span></h6>
                                        <div class="v-input ma-0 pa-0 v-input--dense border-12 theme--light v-text-field v-text-field--single-line v-text-field--solo
                                        dense v-text-field--is-booted v-text-field--enclosed">
                                            <div class="v-input__control">
                                                <div class="v-input__slot">
                                                    <div class="v-text-field__slot">
                                                        <money class="" name="target" v-model.lazy="target" v-bind="money"></money>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </v-col>
                                    <v-col class="col-12" sm="5" md="5">
                                        <h6 class="blue-lcd mb-1">Aktual </h6>
                                        <div class="v-input ma-0 pa-0 v-input--dense border-12 theme--light v-text-field v-text-field--single-line v-text-field--solo
                                        dense v-text-field--is-booted v-text-field--enclosed">
                                            <div class="v-input__control">
                                                <div class="v-input__slot">
                                                    <div class="v-text-field__slot">
                                                        <money class="" name="actual" v-model.lazy="actual" v-bind="money" v-bind:readonly="true"></money>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                    v-model="dialogfilter"
                    persistent
                    max-width="600px"
                >
                    <v-card class="p-2 rounded-l">
                        <v-card-title class="text-center">
                            <v-row>
                                <v-col cols="12">
                                    Filter Ledger Budgeting
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
                                            @change="(event) => getAcNum(event)"
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
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
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Period <strong style="color:red;">*</strong><span></span></h6>
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
                                                type="month"
                                                no-title
                                                @input="modal_filter = false"
                                                :allowed-dates="allowedMonths"
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
import {ledger_budget} from "../../../backend-api/ledger/coa/ledger_budget"
import {appl_constant} from "../../../backend-api/appl_constant/index"
import { Money } from 'v-money'
import ActivityLedgerBudget from './ActivityLedgerBudget.vue'
import {activity_header} from "../../../backend-api/ledger/budget/activity_header"
import {env_conf} from "../../../backend-api/env_conf/index"

export default {
    components: {
        Money, ActivityLedgerBudget
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
                    text: 'Ledger Budgeting',
                    disabled: true,
                }
            ],
            headers:[
                { text: 'AC Num', value: 'ac_num' , align:'left', width:'150'},
                { text: 'AC Name', value: 'ac_name' , align:'left'},
                { text: 'Bidang', value: 'bidang' , align:'left'},
                { text: 'Komisi', value: 'komisi' , align:'left'},
                { text: 'Period', value: 'period' , align:'left'},
                { text: 'Target', value: 'target' , align:'right'},
                { text: 'Alokasi', value: 'alokasi' , align:'right'},
                { text: 'Aktual', value: 'actual' , align:'right'},
                { text: 'Remark', value: 'remark' , align:'left'},
                { text: 'Action', value: 'action' , align:'left'},
            ],
            headersColumn: {
                'AC Num': 'ac_num',
                'AC Name': 'ac_name',
                'Bidang': 'bidang',
                'Komisi': 'komisi',
                'Period': 'period',
                'Target': 'target',
                'Alokasi': 'alokasi',
                'Aktual': 'actual',
                'Remark': 'remark'
            },
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
            envVarBidang:'',
            envVarKomisi:'',
            tabs: [],
            trans_type: false
        }
    },
    async mounted(){
        this.$store.dispatch('setOverlay', true)
        await this.getApplConstant()
        await this.getPullData()
        await this.getEntity()
        
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
            var respData = await appl_constant.fetchApplConstant("?key_code=BUDGETCYCLE&key_value=MONTH", null, false, false, false)
            if (respData.status === 200) {
                if (respData.data.data.length > 0) {
                    // console.log(respData.data.data);
                    this.mod_month = parseInt(respData.data.data[0].int1)
                }
                // 
            }

            var respDataTabs = await appl_constant.fetchApplConstant("?key_value=BUDGET&str2=LEDGER BUDGETING&sort_order=asc&order_by=int1", null, false, false, false)
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
        allowedMonths(val) {
            return parseInt(val.split('-')[1], 10) % Number(this.mod_month) === 1
        },
        clear(){
            this.office_id = ''
            this.entity_id = ''
            this.ac_num = ''
            this.target = ''
            this.actual = ''
            this.remark = ''
            this.date = ''
            this.currency = 'IDR'
            // this.envVarBidang=''
            // this.envVarKomisi=''
        },
        detailItem(item){
            this.detail = item
            this.$store.dispatch('setOverlay', true)
            this.showDetail = true
            this.dialog = true
            this.office_id = parseInt(item.office_id)
            this.entity_id = item.entity_id
            this.getBranchOffice()
            this.ac_num = item.ac_num
            this.getAcNum()
            this.date = item.period.substr(0, 4) + '-' + item.period.substr(4, 7)
            this.remark = item.remark
            this.target = parseFloat(item.target)
            this.actual = parseFloat(item.actual)
            this.getActivityLeader(item)
        },
        detailItemEdit(item){
            this.detail = item
            this.dialogEdit = true
            this.office_id = parseInt(item.office_id)
            this.entity_id = item.entity_id
            this.getBranchOffice()
            this.ac_num = item.ac_num
            this.getAcNum()
            this.date = item.period.substr(0, 4) + '-' + item.period.substr(4, 7)
            this.remark = item.remark
            this.target = parseInt(item.target)
            this.actual = parseInt(item.actual)
        },
        async getEntity(){
            var respData = await entity.fetchEntity("", null, false, false, false)
            if (respData.status === 200) {
                this.entities = respData.data
            }
        },
        async getPullData(){
            console.log(this.envVarBidang);
            this.ledger_budgets = []
            var trans_type = false
            this.$store.dispatch('setOverlay', true)
            var respData = await ledger_budget.fetchLedgerBudget(`?search=${this.search ? this.search : ''}&entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_num=${this.ac_num ? this.ac_num : ''}&period=${this.date ? new Date(this.date).toISOString().substr(0, 7).replace(/-/g,"") : ''}&bidang=${this.$store.state.user.bidang ? this.$store.state.user.bidang : ''}&komisi=${this.$store.state.user.komisi ? this.$store.state.user.komisi : ''}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}&trans_type=${trans_type}`, null, false, false, false)
            if (respData.status === 200) {
                this.ledger_budgets = respData.data.data
                this.clear()
                this.$store.dispatch('setOverlay', false)

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
                var respData = await ledger_coa.fetchLedgerCoa(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&bidang=${this.$store.state.user.bidang ? this.$store.state.user.bidang : ''}&komisi=${this.$store.state.user.komisi ? this.$store.state.user.komisi : ''}`, null, false, false, false)
                if (respData.status === 200) {
                    this.ac_nums = respData.data.data
                    // console.log(this.ac_nums);
                }
            }
        },
        async submit(){
            this.$store.dispatch('setOverlay', true)
            this.dialog = false

            if (this.entity_id === '' || this.office_id === '' || this.ac_num === '' || this.date == '' || this.target == 0 ) {
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
                'ac_num': this.ac_num,
                'period': new Date(this.date).toISOString().substr(0, 7).replace(/-/g,""),
                'target' : this.target,
                'actual' : this.actual ? this.actual : 0,
                'remark' : this.remark,
                'trans_type' : 0
            }

            const respData = await ledger_budget.storeLedgerBudget('', reqBody, false, false, false)

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

            if (this.entity_id === '' || this.office_id === '' || this.ac_num === '' || this.date == '' || this.target == 0 ) {
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

            var reqBody = {
                'office_id': this.office_id,
                'entity_id': this.entity_id,
                'ac_num': this.ac_num,
                'period': new Date(this.date).toISOString().substr(0, 7).replace(/-/g,""),
                'target' : this.target,
                'actual' : this.actual ? this.actual : 0,
                'remark' : this.remark,
                'trans_type' : 0
            }

            const respData = await ledger_budget.updateLedgerBudget('', reqBody, false, false, false)

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
        async getActivityLeader(){
            this.activity_headers = []

            var reqBody = {
                'office_id': this.office_id,
                'entity_id': this.entity_id,
                'ac_num': this.ac_num,
                'period': new Date(this.date).toISOString().substr(0, 7).replace(/-/g,""),
                'trans_type': this.trans_type,
                // Todo nambah
                "flag_three": this.$store.state.user.flag_three ? this.$store.state.user.flag_three : '',
                "gl_flag_id": this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : '',
                "bidang": this.$store.state.user.bidang ? this.$store.state.user.bidang : '',
                "komisi": this.$store.state.user.komisi ? this.$store.state.user.komisi : ''
            }

            const respData = await activity_header.getDetailActivity('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.activity_headers = respData.data.data ? respData.data.data : []
                this.dialog = true
                this.$store.dispatch('setOverlay', false)
            } else{
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
            var respData = await ledger_budget.fetchLedgerBudget(`?search=${this.search ? this.search : ''}&entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_num=${this.ac_num ? this.ac_num : ''}&period=${this.date ? new Date(this.date).toISOString().substr(0, 7).replace(/-/g,"") : ''}&bidang=${this.$store.state.user.bidang ? this.$store.state.user.bidang : ''}&komisi=${this.$store.state.user.komisi ? this.$store.state.user.komisi : ''}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}&trans_type=${this.trans_type}`, null, false, false, false)
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
.tr_datatable{
  background-color: #F5F7F8 !important;
}
</style>