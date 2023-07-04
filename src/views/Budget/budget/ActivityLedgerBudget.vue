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
                    :items="activity_headers"
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
                    <template v-slot:[`item.total`]="{ item }">
                        {{ $store.getters.convertToCurrencyUs(item.total) }}
                    </template>                       
                    <template v-slot:[`item.approve_date_one`]="{ item }">
                        <v-chip
                        v-if="item.reject_date != null"  
                            class="ma-1"
                            close
                            color="red"
                            text-color="white"                            
                        >
                            Rejected
                        </v-chip>
                        <v-chip
                        v-else-if="item.approve_date_one === null"  
                            class="ma-1"
                            close
                            color="warning"
                            text-color="white"                            
                        >
                            Not Approved
                        </v-chip>
                        <v-chip
                        v-else
                            class="ma-1"
                            close
                            color="green"
                            outlined
                        >
                            {{item.approve_date_one}}
                        </v-chip>
                    </template>
                    <template v-slot:[`item.approve_date_two`]="{ item }">
                        <v-chip
                        v-if="item.reject_date != null"  
                            class="ma-1"
                            close
                            color="red"
                            text-color="white"                            
                        >
                            Rejected
                        </v-chip>
                        <v-chip
                        v-else-if="item.approve_date_two === null"  
                            class="ma-1"
                            close
                            color="warning"
                            text-color="white"                            
                        >
                            Not Approved
                        </v-chip>
                        <v-chip
                        v-else
                            class="ma-1"
                            close
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
                                    @click="checkPayment(item)"
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
                                <v-list-item @click="detailItemEdit(item)" v-if="item.approve_date_one === null && item.approve_date_two === null && item.reject_date === null">
                                    <v-list-item-icon>
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>Edit</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item v-if="showButtonAprv1 && item.reject_date === null && item.approve_date_one === null  && item.approve_date_two == null" @click="aprove1(item)">
                                    <v-list-item-icon>
                                        <v-icon>mdi-check</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>Approve 1</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item v-if="showButtonAprv1 && item.reject_date === null && item.approve_date_one != null  && item.approve_date_two == null && showRollback === true" @click="unAprove1(item)">
                                    <v-list-item-icon>
                                        <v-icon>mdi-close</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>UnApprove 1</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <!-- <v-list-item v-if="showButtonAprv2 && item.reject_date === null && item.approve_date_one != null && item.approve_date_two != null && showRollback === true" @click="unAprove2(item)">
                                    <v-list-item-icon>
                                        <v-icon>mdi-close</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>UnApprove 2</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item> -->
                                <v-list-item v-if="showButtonAprv2 && item.reject_date === null && item.approve_date_one != null && item.approve_date_two === null && item.approve_date_three === null"  @click="[aprove2(item), showApprove2 = true]">
                                    <v-list-item-icon>
                                        <v-icon>mdi-check-all</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>Approve 2</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item v-if="(showButtonAprv1 || showButtonAprv2) && item.approve_date_two === null" @click="reject(item)">
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
                                <v-spacer></v-spacer>
                                Activity Ledger Budget
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
                    <v-container>
                        <v-row class="mb-5">
                            <v-col class="col-12" sm="6" md="12">
                                <div class="d-flex">
                                    <div>
                                        <h5 class="blue-lcd">
                                            Header
                                        </h5>
                                        <p>
                                            * Field are required. Please fill your fileds and submit for save
                                        </p>
                                    </div>
                                </div>
                            </v-col>
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
                                ></v-autocomplete> 
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
                                    @change="getLedgerBudget()"
                                ></v-autocomplete> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="2">
                                <h6 class="blue-lcd mb-1">Period <strong style="color:red;">*</strong><span></span></h6>
                                <v-menu
                                    ref="modal_activity"
                                    v-model="modal_activity"
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
                                        @input="[getLedgerBudget(), modal_activity = false, getReffNoActivity() ]"
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col class="col-12" sm="6" md="4">
                                <h6 class="blue-lcd mb-1">Budget Remark</h6>  
                                <v-text-field
                                    solo
                                    dense
                                    persistent-hint
                                    v-model="budget_remark"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                    disabled
                                >
                                </v-text-field>  
                            </v-col>
                            <v-col class="col-12" sm="6" md="3">
                                <h6 class="blue-lcd mb-0">Budget Type <span class="red--text"><strong>* </strong></span></h6>   
                                <v-radio-group
                                    v-model="type"
                                    row
                                    dense
                                    class="mt-2 mb-1"
                                    hide-details=true
                                >
                                    <v-radio
                                        label="Insidentil"
                                        value="insidentil"
                                    ></v-radio>
                                    <v-radio
                                        label="Rutin"
                                        value="rutin"
                                    ></v-radio>
                                    <v-radio
                                        label="Rutin Bertujuan"
                                        value="rutin_bertujuan"
                                    ></v-radio>
                                </v-radio-group>
                            </v-col>
                            <v-col class="col-12" sm="6" md="3">
                                <h6 class="blue-lcd mb-1">Executor</h6>
                                <v-text-field
                                    solo
                                    dense
                                    persistent-hint
                                    v-model="executor"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                >
                                </v-text-field> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">Form</h6>
                                <v-text-field
                                    solo
                                    dense
                                    persistent-hint
                                    v-model="form"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                >
                                </v-text-field> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">Current</h6>
                                <v-text-field
                                    solo
                                    dense
                                    persistent-hint
                                    v-model="current"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                >
                                </v-text-field> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">Expected</h6>
                                <v-text-field
                                    solo
                                    dense
                                    persistent-hint
                                    v-model="expected"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                >
                                </v-text-field> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">Remark <strong style="color:red;">*</strong><span></span></h6>
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
                            <v-col class="col-12" sm="6" md="3">
                                <h6 class="blue-lcd mb-1">Reff Activity No</h6>
                                <v-autocomplete
                                    dense
                                    solo
                                    clearable
                                    v-model="reff_no"
                                    :items="reff_no_activities"
                                    item-value="activity_no"
                                    :item-text="item => item.activity_no +' - '+ item.remark"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                ></v-autocomplete> 
                            </v-col>
                            <!-- <v-col class="col-12" sm="6" md="2">
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
                            </v-col> -->
                        </v-row>
                        <v-divider></v-divider>
                        <v-row class="mt-3">
                            <v-col class="col-12" sm="12" md="12">
                                <fieldset class="document">
                                    <v-container>
                                        <v-row>
                                            <v-col class="col-12" sm="12" md="12">
                                                <div class="d-flex">
                                                    <div>
                                                        <h5 class="blue-lcd">
                                                            Purpose <strong style="color:red;">*</strong><span></span>
                                                        </h5>
                                                        <p>
                                                            * Field are required. Please fill your fileds and submit for save
                                                        </p>
                                                    </div>
                                                    <v-spacer></v-spacer>
                                                    <!-- <div v-if="showDetail == false">
                                                        <v-btn
                                                        small
                                                        color="success"
                                                        class="py-5"
                                                        @click="dialogPurpose = true"
                                                        >
                                                            <v-icon>mdi-plus</v-icon>
                                                            Create New Purpose
                                                        </v-btn>
                                                    </div> -->
                                                </div>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-simple-table
                                                    fixed-header                                                         
                                                >
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
                                                            <th class="text-center" v-if="showDetail == false" style="width:5%">
                                                                #
                                                            </th>                                                    
                                                        </tr>
                                                    </thead>
                                                    <tbody style="border-bottom:1px solid rgb(216 212 212);">
                                                        <tr 
                                                            v-for="(purpose, index) in purposes"
                                                            :key="purpose.item_num"
                                                        >
                                                            <td>
                                                                {{ purpose.item_num }}
                                                            </td>
                                                            <td>
                                                                <v-text-field
                                                                    solo
                                                                    dense
                                                                    persistent-hint
                                                                    v-model="purpose.purpose"
                                                                    class="ma-0 pa-0 border-12"
                                                                    hide-details=true                                                                    
                                                                >
                                                                </v-text-field>
                                                            </td>
                                                            <td v-if="showDetail == false">
                                                                <v-btn small class="p-1 text-white" color="red" @click="deleteItemPurpose(purpose, index)">
                                                                    <v-icon>
                                                                        mdi-delete
                                                                    </v-icon>
                                                                </v-btn>
                                                            </td>
                                                        </tr>
                                                        <tr v-if="showDetail == false">
                                                            <td colspan="3">
                                                                <v-btn block class="p-3 py-4" color="#d8dee2" @click="submitPurpose()">
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
                                        </v-row>
                                    </v-container>
                                </fieldset>
                            </v-col>
                            <v-col class="col-12" sm="12" md="12">
                                <fieldset class="document">
                                    <v-container>
                                        <v-row>
                                            <v-col class="col-12" sm="12" md="12">
                                                <div class="d-flex">
                                                    <div>
                                                        <h5 class="blue-lcd">
                                                            Detail <strong style="color:red;">*</strong><span></span>
                                                        </h5>
                                                        <p>
                                                            * Field are required. Please fill your fileds and submit for save
                                                        </p>
                                                    </div>
                                                    <v-spacer></v-spacer>
                                                    <!-- <div v-if="showDetail == false">
                                                        <v-btn
                                                        small
                                                        color="success"
                                                        class="py-5"
                                                        @click="dialogDetail = true"
                                                        >
                                                            <v-icon>mdi-plus</v-icon>
                                                            Create New Detail
                                                        </v-btn>
                                                    </div> -->
                                                </div>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-simple-table
                                                    fixed-header                                                          
                                                >
                                                    <thead>
                                                        <tr style="border-top:1px solid rgb(216 212 212);">
                                                            <th class="text-center" style="width:15%" >
                                                                Item
                                                            </th>
                                                            <th class="text-center" style="width:20%">
                                                                Remark
                                                            </th>
                                                            <th class="text-left"  style="width:15%">
                                                                Quantity
                                                            </th>
                                                            <th class="text-left"  style="width:15%">
                                                                Total Activity
                                                            </th>
                                                            <th class="text-left"  style="width:15%">
                                                                Budget
                                                            </th>
                                                            <th class="text-left"  style="width:15%">
                                                                Subtotal
                                                            </th>
                                                            <th class="text-center"  style="width:5%" v-if="showDetail == false">
                                                                
                                                            </th>                                                    
                                                        </tr>
                                                    </thead>
                                                    <tbody style="border-bottom:1px solid rgb(216 212 212);">
                                                        <tr 
                                                            v-for="(detail, index) in details"
                                                            :key="index"
                                                        >
                                                            <td class="text-center">
                                                                <!-- {{ detail.item_num }} -->
                                                                <v-autocomplete
                                                                    dense
                                                                    solo
                                                                    clearable
                                                                    v-model="detail.activity_item_id"
                                                                    :items="item_masters"
                                                                    item-value="activity_item_id"
                                                                    :item-text="item => item.activity_item_desc"
                                                                    class="ma-0 pa-0 border-12"
                                                                    hide-details=true
                                                                    @change="(event) => getDetailItemMaster(event, index)"
                                                                    return-object
                                                                ></v-autocomplete> 
                                                            </td>
                                                            <td class="text-center">
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
                                                            <td class="text-center">
                                                                <div class="v-input ma-0 pa-0 v-input--dense border-12 theme--light v-text-field v-text-field--single-line v-text-field--solo
                                                                dense v-text-field--is-booted v-text-field--enclosed">
                                                                    <div class="v-input__control">
                                                                        <div class="v-input__slot">
                                                                            <div class="v-text-field__slot">
                                                                                <money class="" name="qty" v-model.lazy="detail.qty" v-bind="money" @change.native="calculatePrice($event, detail, index)"></money>
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
                                                                                <money class="" name="total_activity" v-model.lazy="detail.total_activity" v-bind="money" @change.native="calculatePrice($event, detail, index)"></money>
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
                                                                                <money class="" name="budget" v-model.lazy="detail.budget" v-bind="money" @change.native="calculatePrice($event, detail, index)" v-bind:readonly="budget_readonly"></money>
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
                                                                                <money class="" name="subtotal_budget" v-model.lazy="detail.subtotal" v-bind="money" v-bind:readonly="true"></money>
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
                                                            <td colspan="8">
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
                                                            <p class="blue-lcd pt-0 pb-0 mt-0 mb-0">Total :</p>   
                                                            <v-spacer></v-spacer>
                                                            <h6 class="red--text" style="font-weight:600">IDR. {{ $store.getters.convertToCurrencyUs(total) }}</h6>
                                                        </div>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </fieldset>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions class="text-center pb-12">
                    <v-row justify="center">
                        <v-col cols="12" xs="12" sm="3" md="3">
                            <v-btn block class="rounded-l mr-2" color="#fff" @click="[dialog = false, showDetail = false, clear()]">Cancel</v-btn>
                        </v-col>
                        <v-col cols="12" xs="12" sm="3" md="3" v-if="showDetail == false">
                            <v-btn block class="rounded-l text-white" color="success" @click="submit()" :disabled="disabled_submit">Save</v-btn>
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
            <v-card class="p-2">
                <v-card-title class="text-center">
                    <v-row>
                        <v-col cols="12">
                            Edit Activity Ledger Budget
                        </v-col>
                        <v-divider></v-divider>
                    </v-row>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row class="mb-5">
                            <v-col class="col-12" sm="6" md="12">
                                <div class="d-flex">
                                    <div>
                                        <h5 class="blue-lcd">
                                            Header
                                        </h5>
                                        <p>
                                            * Field are required. Please fill your fileds and submit for save
                                        </p>
                                    </div>
                                </div>
                            </v-col>
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
                                    @change="getLedgerBudget()"
                                    disabled
                                ></v-autocomplete> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="2">
                                <h6 class="blue-lcd mb-1">Period <strong style="color:red;">*</strong><span></span></h6>
                                <v-menu
                                    ref="modal_activity_edit"
                                    v-model="modal_activity_edit"
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
                                        @input="[getLedgerBudget(), modal_activity_edit = false, getReffNoActivity()]"
                                        disabled
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col class="col-12" sm="6" md="4">
                                <h6 class="blue-lcd mb-0">Budget Remark</h6>  
                                <v-text-field
                                    solo
                                    dense
                                    persistent-hint
                                    v-model="budget_remark"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                    disabled
                                >
                                </v-text-field>  
                            </v-col>
                            <v-col class="col-12" sm="6" md="3">
                                <h6 class="blue-lcd mb-0">Budget Type <span class="red--text"><strong>* </strong></span></h6>   
                                <v-radio-group
                                    v-model="type"
                                    row
                                    dense
                                    class="mt-2 mb-1"
                                    hide-details=true
                                >
                                    <v-radio
                                        label="Insidentil"
                                        value="insidentil"
                                    ></v-radio>
                                    <v-radio
                                        label="Rutin"
                                        value="rutin"
                                    ></v-radio>
                                    <v-radio
                                        label="Rutin Bertujuan"
                                        value="rutin_bertujuan"
                                    ></v-radio>
                                </v-radio-group>
                            </v-col>
                            <v-col class="col-12" sm="6" md="3">
                                <h6 class="blue-lcd mb-1">Executor</h6>
                                <v-text-field
                                    solo
                                    dense
                                    persistent-hint
                                    v-model="executor"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                >
                                </v-text-field> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="3">
                                <h6 class="blue-lcd mb-1">Form</h6>
                                <v-text-field
                                    solo
                                    dense
                                    persistent-hint
                                    v-model="form"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                >
                                </v-text-field> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="3">
                                <h6 class="blue-lcd mb-1">Current</h6>
                                <v-text-field
                                    solo
                                    dense
                                    persistent-hint
                                    v-model="current"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                >
                                </v-text-field> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="3">
                                <h6 class="blue-lcd mb-1">Expected</h6>
                                <v-text-field
                                    solo
                                    dense
                                    persistent-hint
                                    v-model="expected"
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                >
                                </v-text-field> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="9">
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
                            <!-- <v-col class="col-12" sm="6" md="2">
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
                            </v-col> -->
                        </v-row>
                        <v-divider></v-divider>
                        <v-row class="mt-3">
                            <v-col class="col-12" sm="12" md="12">
                                <fieldset class="document">
                                    <v-container>
                                        <v-row>
                                            <v-col class="col-12" sm="12" md="12">
                                                <div class="d-flex">
                                                    <div>
                                                        <h5 class="blue-lcd">
                                                            Purpose
                                                        </h5>
                                                        <p>
                                                            * Field are required. Please fill your fileds and submit for save
                                                        </p>
                                                    </div>
                                                    <v-spacer></v-spacer>
                                                    <!-- <div v-if="showDetail == false">
                                                        <v-btn
                                                        small
                                                        color="success"
                                                        class="py-5"
                                                        @click="dialogPurpose = true"
                                                        >
                                                            <v-icon>mdi-plus</v-icon>
                                                            Create New Purpose
                                                        </v-btn>
                                                    </div> -->
                                                </div>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-simple-table
                                                    fixed-header                                                         
                                                >
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
                                                            <th class="text-center" style="width:5%">
                                                                #
                                                            </th>                                                    
                                                        </tr>
                                                    </thead>
                                                    <tbody style="border-bottom:1px solid rgb(216 212 212);">
                                                        <tr 
                                                            v-for="(purpose, index) in purposes"
                                                            :key="purpose.item_num"
                                                        >
                                                            <td>
                                                                {{ purpose.item_num }}
                                                            </td>
                                                            <td>
                                                                <v-text-field
                                                                    solo
                                                                    dense
                                                                    persistent-hint
                                                                    v-model="purpose.purpose"
                                                                    class="ma-0 pa-0 border-12"
                                                                    hide-details=true                                                                    
                                                                >
                                                                </v-text-field>
                                                            </td>
                                                            <td>
                                                                <v-btn small class="p-1 text-white" color="red" @click="deleteItemPurpose(purpose, index)">
                                                                    <v-icon>
                                                                        mdi-delete
                                                                    </v-icon>
                                                                </v-btn>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="3">
                                                                <v-btn block class="p-3 py-4" color="#d8dee2" @click="submitPurpose()">
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
                                        </v-row>
                                    </v-container>
                                </fieldset>
                            </v-col>
                            <v-col class="col-12" sm="12" md="12">
                                <fieldset class="document">
                                    <v-container>
                                        <v-row>
                                            <v-col class="col-12" sm="12" md="12">
                                                <div class="d-flex">
                                                    <div>
                                                        <h5 class="blue-lcd">
                                                            Detail
                                                        </h5>
                                                        <p>
                                                            * Field are required. Please fill your fileds and submit for save
                                                        </p>
                                                    </div>
                                                    <v-spacer></v-spacer>
                                                    <!-- <div v-if="showDetail == false">
                                                        <v-btn
                                                        small
                                                        color="success"
                                                        class="py-5"
                                                        @click="dialogDetail = true"
                                                        >
                                                            <v-icon>mdi-plus</v-icon>
                                                            Create New Detail
                                                        </v-btn>
                                                    </div> -->
                                                </div>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-simple-table
                                                    fixed-header                                                          
                                                >
                                                    <thead>
                                                        <tr style="border-top:1px solid rgb(216 212 212);">
                                                            <th class="text-center" style="width:15%" >
                                                                Item
                                                            </th>
                                                            <th class="text-center" style="width:20%">
                                                                Remark
                                                            </th>
                                                            <th class="text-left"  style="width:15%">
                                                                Quantity
                                                            </th>
                                                            <th class="text-left"  style="width:15%">
                                                                Total Activity
                                                            </th>
                                                            <th class="text-left"  style="width:15%">
                                                                Budget
                                                            </th>
                                                            <th class="text-left"  style="width:15%">
                                                                Subtotal
                                                            </th>
                                                            <th class="text-center"  style="width:5%" v-if="showDetail == false">
                                                                
                                                            </th>                                                    
                                                        </tr>
                                                    </thead>
                                                    <tbody style="border-bottom:1px solid rgb(216 212 212);">
                                                        <tr 
                                                            v-for="(detail, index) in details"
                                                            :key="index"
                                                        >
                                                            <td class="text-center">
                                                                <!-- {{ detail.item_num }} -->
                                                                <v-autocomplete
                                                                    dense
                                                                    solo
                                                                    clearable
                                                                    v-model="detail.activity_item_id"
                                                                    :items="item_masters"
                                                                    item-value="activity_item_id"
                                                                    :item-text="item => item.activity_item_desc"
                                                                    class="ma-0 pa-0 border-12"
                                                                    hide-details=true
                                                                    @change="(event) => getDetailItemMaster(event, index)"
                                                                    return-object
                                                                ></v-autocomplete> 
                                                            </td>
                                                            <td class="text-center">
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
                                                            <td class="text-center">
                                                                <div class="v-input ma-0 pa-0 v-input--dense border-12 theme--light v-text-field v-text-field--single-line v-text-field--solo
                                                                dense v-text-field--is-booted v-text-field--enclosed">
                                                                    <div class="v-input__control">
                                                                        <div class="v-input__slot">
                                                                            <div class="v-text-field__slot">
                                                                                <money class="" name="qty" v-model.lazy="detail.qty" v-bind="money" @change.native="calculatePrice($event, detail, index)"></money>
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
                                                                                <money class="" name="total_activity" v-model.lazy="detail.total_activity" v-bind="money" @change.native="calculatePrice($event, detail, index)"></money>
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
                                                                                <money class="" name="budget" v-model.lazy="detail.budget" v-bind="money" @change.native="calculatePrice($event, detail, index)" v-bind:readonly="budget_readonly"></money>
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
                                                                                <money class="" name="subtotal_budget" v-model.lazy="detail.subtotal" v-bind="money" v-bind:readonly="true"></money>
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
                                                            <td colspan="8">
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
                                                            <p class="blue-lcd pt-0 pb-0 mt-0 mb-0">Total :</p>   
                                                            <v-spacer></v-spacer>
                                                            <h6 class="red--text" style="font-weight:600">IDR. {{ $store.getters.convertToCurrencyUs(total) }}</h6>
                                                        </div>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </fieldset>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions class="text-center pb-12">
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
                            Filter Activity Ledger Budget
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
                                    class="ma-0 pa-0 border-12"
                                    hide-details=true
                                ></v-autocomplete> 
                            </v-col>
                            <v-col class="col-12" sm="6" md="6">
                                <h6 class="blue-lcd mb-1">Period </h6>
                                <v-menu
                                    ref="modal_activity_filter"
                                    v-model="modal_activity_filter"
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
                                        @input="modal_activity_filter = false"
                                        :allowed-dates="allowedMonths"
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col class="col-12" sm="12" md="12">
                                <h6 class="blue-lcd mb-0">Budget Type </h6>   
                                <v-radio-group
                                    v-model="type"
                                    row
                                    dense
                                    class="mt-2 mb-1"
                                    hide-details=true
                                >
                                    <v-radio
                                        label="Insidentil"
                                        value="insidentil"
                                    ></v-radio>
                                    <v-radio
                                        label="Rutin"
                                        value="rutin"
                                    ></v-radio>
                                    <v-radio
                                        label="Rutin Bertujuan"
                                        value="rutin_bertujuan"
                                    ></v-radio>
                                </v-radio-group>
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
import {env_conf} from "../../../backend-api/env_conf/index"
import {activity_item_master} from "../../../backend-api/ledger/coa/activity_item_master"
import {payment_pencairan} from "../../../backend-api/ledger/budget/payment_pencairan"

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
            headers:[
                {
                    text: 'Entity ID',
                    align: 'start',
                    value: 'entity_id', 
                    align:'left'},
                { text: 'Office', value: 'office' , align:'left'},
                { text: 'AC Num', value: 'ac_num' , align:'left', width:'200'},
                { text: 'Bidang', value: 'bidang' , align:'left'},
                { text: 'Komisi', value: 'komisi' , align:'left'},
                { text: 'Period', value: 'period' , align:'left'},
                { text: 'No Activity', value: 'activity_no' , align:'left'},
                { text: 'Type', value: 'budget_type' , align:'left'},
                { text: 'Executor', value: 'executor' , align:'left'},
                { text: 'Form', value: 'form' , align:'left'},
                { text: 'Remark', value: 'remark' , align:'left'},
                { text: 'Current', value: 'current' , align:'left'},
                { text: 'Expected', value: 'expected' , align:'left'},
                { text: 'Reff No', value: 'ref_activity_no' , align:'left'},
                { text: 'Target', value: 'target' , align:'right'},
                { text: 'Alokasi', value: 'alokasi' , align:'right'},
                { text: 'Total Budget', value: 'total' , align:'right'},
                { text: 'Aprv 1', value: 'approve_date_one' , align:'center', width:'50'},
                { text: 'Aprv 2', value: 'approve_date_two' , align:'center', width:'50'},
                { text: 'Action', value: 'action' , align:'left'},
            ],
            headersColumn: {
                'Entity ID': 'entity_id',
                'Office': 'office',
                'AC Num': 'ac_num',
                'Bidang': 'bidang',
                'Komisi': 'komisi',
                'Period': 'period',
                'No Activity': 'activity_no',
                'Type': 'budget_type',
                'Executor': 'executor',
                'Form': 'form',
                'Remark': 'remark',
                'Current': 'current',
                'Expected': 'expected',
                'Target': 'target',
                'Alokasi': 'alokasi',
                'Total Budget': 'total'
            },
            activity_headers: [],
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
            modal_activity: false,
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
                    activity_item_id: null,
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
            modal_activity_edit: false,
            modal_activity_filter: false,
            showButtonAprv1: false,
            showButtonAprv2: false,
            item_masters: [],
            budget_readonly: true,
            showRollback: false,
            envVarBidang:'',
            envVarKomisi:'',
            reff_no: '',
            reff_no_activities: [],
            trans_type: false,
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

        await this.getEnvConf();
        await this.getApplConstant()
        await this.getPullData()
        await this.getEntity()
        await this.glFlags()
        // await this.getAcType()
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
        async getAcType(){
            var respData = await appl_constant.fetchApplConstant("?key_code=ACTYPE&str2=Y", null, false, false, false)
            if (respData.status === 200) {
                if (respData.data.data.length > 0) {
                    console.log(respData.data.data);
                    this.ac_types = respData.data.data
                }
                // 
            }
        },
        async getApplConstant(){
            var respData = await appl_constant.fetchApplConstant("?key_code=BUDGETCYCLE&key_value=MONTH", null, false, false, false)
            if (respData.status === 200) {
                if (respData.data.data.length > 0) {
                    console.log(respData.data.data);
                    this.mod_month = parseInt(respData.data.data[0].int1)
                }
                // 
            }
        },
        async getEnvConf(){
            var respData = await env_conf.getEnvVarConfUser(`?entity_id=GKI&appl_id=WEBGK&var_id=APRVBGT1&groupid=${this.$store.state.user.group}`, null, false, false, false)
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

            var respDataAprv2 = await env_conf.getEnvVarConfUser(`?entity_id=GKI&appl_id=WEBGK&var_id=APRVBGT2&groupid=${this.$store.state.user.group}`, null, false, false, false)
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
        allowedMonths(val) {
            return parseInt(val.split('-')[1], 10) % Number(this.mod_month) === 1
        },
        clear(){
            this.office_id = ''
            this.entity_id = ''
            this.ac_num = ''
            this.date = ''
            this.type = ''
            this.executor = ''
            this.form = ''
            this.current = ''
            this.expected = ''
            this.acp = ''
            this.purposes = [
                {
                    purpose: '',
                    item_num : 1
                }
            ]
            this.details = [
                {
                    item_num : 1,
                    remark: '',
                    qty: 0,
                    total_activity: 0,
                    budget: 0,
                    subtotal: 0,
                    activity_item_id: null
                }
            ]
            this.budget_remark = ''
            this.budget_data = null
            this.disabled_submit = false
            this.remark = ''
        },
        async checkPayment(item){
            this.showRollback = false

            var cek = await payment_pencairan.cekPayment(`?entity_id=${item.entity_id}&office_id=${item.office_id}&period_budget=${item.period}&activity_no=${item.activity_no}&ac_num=${item.ac_num}`);

            console.log(cek.data);

            if (cek.status === 200) {
                if(cek.data.data === null || cek.data.data <= 0){
                    this.showRollback = true
                }
            }
            
        },
        detailItem(item){
            console.log(item);
            this.detail = item
            this.dialog = true
            this.showDetail = true
            this.office_id = parseInt(item.office_id)
            this.entity_id = item.entity_id
            this.getBranchOffice()
            this.ac_num = item.ac_num
            this.getAcNum()
            this.date = item.period.substr(0, 4) + '-' + item.period.substr(4, 7)
            this.getLedgerBudget()
            this.type = item.budget_type
            this.executor = item.executor
            this.form = item.form
            this.current = item.current
            this.expected = item.expected
            this.remark = item.remark
            this.reff_no = item.ref_activity_no
            // this.acp = item.gl_flag_id
            this.acp = ''
            this.getPurpose()
            this.getDetailBudget()
            this.getItemMaster()
            this.getReffNoActivity()
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
            this.getLedgerBudget()
            this.type = item.budget_type
            this.executor = item.executor
            this.form = item.form
            this.current = item.current
            this.expected = item.expected
            this.remark = item.remark
            this.reff_no = item.ref_activity_no
            // this.acp = item.gl_flag_id
            this.acp = ''
            this.getPurpose()
            this.getDetailBudget()
            this.getReffNoActivity()

        },
        async getEntity(){
            var respData = await entity.fetchEntity("", null, false, false, false)
            if (respData.status === 200) {
                this.entities = respData.data
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
            this.activity_headers = []
            this.$store.dispatch('setOverlay', true)
            var trans_type = false
            var respData = await activity_header.fetchLedgerHeaderBudget(`?search=${this.search ? this.search : ''}&entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_num=${this.ac_num ? this.ac_num : ''}&period=${this.date ? new Date(this.date).toISOString().substr(0, 7).replace(/-/g,"") : ''}&budget_type=${this.type ? this.type : ''}&bidang=${this.$store.state.user.bidang ? this.$store.state.user.bidang : ''}&komisi=${this.$store.state.user.komisi ? this.$store.state.user.komisi : ''}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}&trans_type=${trans_type}`, null, false, false, false)
            if (respData.status === 200) {
                this.activity_headers = respData.data.data ? respData.data.data : []
                this.$store.dispatch('setOverlay', false)
                this.clear()

            } else{
                this.$store.dispatch('setOverlay', false)
            }
        },
        // TODO pada saat pendetea sudah jelas cek flag three perlu ndak
        async getReffNoActivity(){
            this.reff_no_activities = []
            var trans_type = false
            var respData = await activity_header.getReffNo(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_num=${this.ac_num ? this.ac_num : ''}&period=${this.date ? new Date(this.date).toISOString().substr(0, 7).replace(/-/g,"") : ''}&bidang=${this.$store.state.user.bidang ? this.$store.state.user.bidang : ''}&komisi=${this.$store.state.user.komisi ? this.$store.state.user.komisi : ''}&trans_type=${trans_type}`, null, false, false, false)
            if (respData.status === 200) {
                this.reff_no_activities = respData.data.data
                console.log(this.reff_no_activities);
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
        async getItemMaster(event){
            this.item_masters = []
            if (event === null || event === '') {
                this.office_id = ''
                this.entity_id = ''
                this.item_masters = []
            } else{
                this.item_masters = []
                var respData = await activity_item_master.index(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}`, null, false, false, false)
                if (respData.status === 200) {
                    this.item_masters = respData.data.data

                    this.item_masters.push(
                        {
                            activity_item_id: 0,
                            activity_item_desc: 'Lainnya'
                        }
                    )
                }
            }
        },
        getDetailItemMaster(event, index){
            if (event === null || event === '') {
                this.details[index].activity_item_id = null
            } else{
                this.details[index].activity_item_id = event.activity_item_id

                if (event.activity_item_id === 0) {
                    this.budget_readonly = false
                    this.details[index].activity_item_id = event.activity_item_id
                    this.details[index].budget = 0
                    this.calculatePrice(event, event, index)
                } else {
                    this.budget_readonly = true
                    this.details[index].activity_item_id = event.activity_item_id
                    this.details[index].budget = parseFloat(event.activity_price)
                    this.calculatePrice(event, event, index)
                }   
                          
            }
        },
        // TODO pindah fetch coa dari GL Budget
        async getAcNum(event){
            if (event === null || event === '') {
                this.ac_num = ''
            } else{
                this.getItemMaster(event)

                var respData = await ledger_coa.fetchLedgerCoa(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&bidang=${this.$store.state.user.bidang ? this.$store.state.user.bidang : ''}&komisi=${this.$store.state.user.komisi ? this.$store.state.user.komisi : ''}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}`, null, false, false, false)
                if (respData.status === 200) {
                    this.ac_nums = respData.data.data
                    console.log(this.ac_nums);
                }
            }
        },
        // TODO tambahkan gl flag
        async submit(){
            this.$store.dispatch('setOverlay', true)
            this.dialog = false

            if (this.entity_id === '' || this.office_id === '' || this.ac_num === '' || this.date == '' || this.type == '' || this.purposes.length == 0 || this.details.length == 0) {
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
                'budget_type': this.type,
                'executor': this.executor,
                'form': this.form,
                'remark': this.remark,
                'current': this.current,
                'expected': this.expected,
                'purposes': this.purposes,
                'details': this.details,
                'reff_no': this.reff_no ? this.reff_no : '',
                'trans_type' : 0,
                'gl_flag_id': this.acp ? this.acp : '',
                'bidang': this.budget_data ? (this.budget_data.bidang ? this.budget_data.bidang : '') : '',
                'komisi': this.budget_data ? (this.budget_data.komisi ? this.budget_data.komisi : '') : ''
            }

            var budget_data = this.budget_data ? parseFloat(this.budget_data.target) : 0
            var total_anggaran = this.total + parseFloat(this.current_budget)
            console.log(total_anggaran, budget_data);
            if (total_anggaran > budget_data) {
                this.snackbar = {
                                    color: "error",
                                    icon: "mdi-alert-circle",
                                    mode: "multi-line",
                                    position: "top",
                                    timeout: 7500,
                                    title: "Error",
                                    text: 'Anggaran melebihi budget yang sudah di set',
                                    visible: true
                                };
                                
                this.$store.dispatch('setOverlay', false)
                this.dialog = true

                return false
            }

            const respData = await activity_header.storeLedgerHeaderBudget('', reqBody, false, false, false)

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

            if (this.entity_id === '' || this.office_id === '' || this.ac_num === '' || this.date == '' || this.type == '' || this.purposes.length == 0 || this.details.length == 0) {
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
                'budget_type': this.type,
                'executor': this.executor,
                'form': this.form,
                'remark': this.remark,
                'current': this.current,
                'expected': this.expected,
                'purposes': this.purposes,
                'details': this.details,
                'activity_no' : this.detail.activity_no,
                'reff_no': this.reff_no ? this.reff_no : '',
                'trans_type' : 0,
                'gl_flag_id': this.acp ? this.acp : ''
            }

            const respData = await activity_header.updateLedgerHeaderBudget('', reqBody, false, false, false)

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
                'entity_id': item.entity_id,
                'office_id': item.office_id,
                'ac_num': item.ac_num,
                'period': item.period,
                'activity_no': item.activity_no,
                'aprove_level': 1,
                'trans_type' : 0,
                'gl_flag_id': item.gl_flag_id ? item.gl_flag_id : ''
            }

            const respData = await activity_header.approveLedgerHeaderBudget('', reqBody, false, false, false)

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
                'entity_id': item.entity_id,
                'office_id': item.office_id,
                'ac_num': item.ac_num,
                'period': item.period,
                'activity_no': item.activity_no,
                'aprove_level': 2,
                'trans_type' : 0,
                'gl_flag_id': item.gl_flag_id ? item.gl_flag_id : ''
            }

            const respData = await activity_header.approveLedgerHeaderBudget('', reqBody, false, false, false)

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
        async unAprove1(item){
            this.$store.dispatch('setOverlay', true)
            var reqBody = {
                'entity_id': item.entity_id,
                'office_id': item.office_id,
                'ac_num': item.ac_num,
                'period': item.period,
                'activity_no': item.activity_no,
                'aprove_level': 1,
                'trans_type' : 0,
                'gl_flag_id': item.gl_flag_id ? item.gl_flag_id : ''
            }

            const respData = await activity_header.unApproveLedgerHeaderBudget('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.snackbar = {
                    color: "success",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: 'Successfully Unapprove Data',
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
        async unAprove2(item){
            this.$store.dispatch('setOverlay', true)
            var reqBody = {
                'entity_id': item.entity_id,
                'office_id': item.office_id,
                'ac_num': item.ac_num,
                'period': item.period,
                'activity_no': item.activity_no,
                'aprove_level': 2,
                'trans_type' : 0,
                'gl_flag_id': item.gl_flag_id ? item.gl_flag_id : ''
            }

            const respData = await activity_header.unApproveLedgerHeaderBudget('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.snackbar = {
                    color: "success",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: 'Successfully Unapprove Data',
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
        async submitPurpose(){
            this.purposes.push(
                {
                    purpose: this.purpose,
                    item_num : this.purposes.length + 1
                }
            )
            this.dialogPurpose = false
            this.purpose = ''
        },
        async deleteItemPurpose(purpose, index){
            this.purposes.splice(index, 1);
        },
        deleteDetail(detail, index){
            this.details.splice(index, 1);
        },
        async submitDetail(){
            this.dialogDetail = false

            var budget_data = this.budget_data ? parseFloat(this.budget_data.target) : 0
            // console.log(this.total, budget_data);
            var total_anggaran = this.total + parseFloat(this.current_budget)
            if (total_anggaran > budget_data) {
                // this.dialogDetail = true

                this.snackbar = {
                                    color: "error",
                                    icon: "mdi-alert-circle",
                                    mode: "multi-line",
                                    position: "top",
                                    timeout: 7500,
                                    title: "Error",
                                    text: 'Anggaran melebihi budget yang sudah di set',
                                    visible: true
                                };
                
            } else {
                this.details.push(
                    {
                        item_num : this.details.length + 1,
                        remark: this.remark_detail,
                        qty: this.qty,
                        total_activity: this.total_activity,
                        budget: this.budget,
                        subtotal: this.subtotal_budget,
                        activity_item_id: null
                    }
                )
                this.dialogDetail = false

                this.remark_detail = ''
                this.qty = ''
                this.total_activity = ''
                this.budget = ''
                this.subtotal_budget = ''
            }
            
        },
        calculatePrice(event, detail, index){
            var total_price = 0
            var qty = this.details[index].qty ? parseInt(this.details[index].qty) : 0
            var total_activity = this.details[index].total_activity ? parseFloat(this.details[index].total_activity) : 0
            var budget = this.details[index].budget ? parseFloat(this.details[index].budget) : 0

            // if (event) {
            //     if (event.isTrusted === true) {
                    total_price = budget * total_activity * qty
                    this.details[index].subtotal = total_price
            //     }
            // }
        },
        async getLedgerBudget(){
            if (this.date) {
                var reqBody = {
                    'office_id': this.office_id,
                    'entity_id': this.entity_id,
                    'ac_num': this.ac_num,
                    'period': new Date(this.date).toISOString().substr(0, 7).replace(/-/g,""),
                    'trans_type' : 0,
                    'flag_three': this.$store.state.user.flag_three
                }

                const respData = await ledger_budget.getDetailBudget('', reqBody, false, false, false)

                if (respData.status === 200) {
                    if (respData.data.data != null) {
                        this.budget_remark = respData.data.data.remark
                        this.budget_data = respData.data.data

                        const respDataTotal = await activity_header.getSumTotalDetail('', reqBody, false, false, false)

                        if (respDataTotal.status === 200) {
                            this.current_budget = respDataTotal.data.data.subtotal ? respDataTotal.data.data.subtotal : 0
                            this.disabled_submit = false
                        }

                    } else {
                        this.snackbar = {
                                    color: "error",
                                    icon: "mdi-alert-circle",
                                    mode: "multi-line",
                                    position: "top",
                                    timeout: 7500,
                                    title: "Error",
                                    text: 'Budget not yet set, Please set budget',
                                    visible: true
                                };
                        this.disabled_submit = true
                    }
                    
                }
            }
            
        },
        async getPurpose(){
            var reqBody = {
                'office_id': this.office_id,
                'entity_id': this.entity_id,
                'ac_num': this.ac_num,
                'period': new Date(this.date).toISOString().substr(0, 7).replace(/-/g,""),
                'activity_no' : this.detail.activity_no,
                'trans_type' : 0
            }

            this.purposes = []

            const respData = await activity_header.getPurposeBudget('', reqBody, false, false, false)

            if (respData.status === 200) {
                for (let index = 0; index < respData.data.data.length; index++) {
                    this.purposes.push(
                        {
                            purpose: respData.data.data[index].purpose,
                            item_num : respData.data.data[index].seq_no
                        }
                    )                  
                }
                
            }
        },
        async getDetailBudget(){
            var reqBody = {
                'office_id': this.office_id,
                'entity_id': this.entity_id,
                'ac_num': this.ac_num,
                'period': new Date(this.date).toISOString().substr(0, 7).replace(/-/g,""),
                'activity_no' : this.detail.activity_no,
                'trans_type' : 0
            }

            this.details = []

            const respData = await activity_header.getDetailBudgets('', reqBody, false, false, false)

            if (respData.status === 200) {
                for (let index = 0; index < respData.data.data.length; index++) {
                    this.details.push(
                        {
                            item_num : respData.data.data[index].seq_no,
                            remark: respData.data.data[index].remark,
                            qty: respData.data.data[index].qty,
                            total_activity: respData.data.data[index].total_activity,
                            budget: parseFloat(respData.data.data[index].budget),
                            subtotal: parseFloat(respData.data.data[index].budget_subtotal),
                            activity_item_id: respData.data.data[index].activity_item_id
                        }
                    )            
                }
                
            }
        },
        async exportExcel(){
            var respData = await activity_header.fetchLedgerHeaderBudget(`?search=${this.search ? this.search : ''}&entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_num=${this.ac_num ? this.ac_num : ''}&period=${this.date ? new Date(this.date).toISOString().substr(0, 7).replace(/-/g,"") : ''}&budget_type=${this.type ? this.type : ''}&bidang=${this.$store.state.user.bidang ? this.$store.state.user.bidang : ''}&komisi=${this.$store.state.user.komisi ? this.$store.state.user.komisi : ''}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}&gl_flag_id=${this.$store.state.user.id_pdt ? this.$store.state.user.id_pdt : ''}&trans_type=${this.trans_type}`, null, false, false, false)
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