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
                <!-- <v-tab
                    v-for="(tab, index) in tabs"
                    :key="index"
                >
                    {{ tab.str1 }}
                </v-tab> -->
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
                                    class="border-12 mb-2"
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
                                    :items="coas"
                                    class="elevation-1 mt-2"
                                    :items-per-page="20"
                                    :loading="$store.state.overlay"
                                    height="578"
                                    fixed-header
                                    :divider="true"
                                    :light="true"
                                    :item-class="tr_datatable"
                                >                   
                                    <template v-slot:[`item.status`]="{ item }">
                                        <v-switch
                                            inset
                                            false-value="N"
                                            true-value="Y"
                                            v-model="item.active_flag"
                                            class="mt-1 mb-2"
                                            hide-details="true"
                                            @change="updateStatusCoa(item)"
                                        ></v-switch>
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
                                                <v-list-item @click="detailItemEdit(item)">
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
                        <v-dialog
                            v-model="dialog"
                            persistent
                            max-width="700px"
                        >
                            <v-card class="p-2 rounded-l">
                                <v-card-title class="text-center">
                                    <v-row>
                                        <v-col cols="12">
                                            Chart of Accounts
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
                                                    @change="(event) => getLedgerParent(event)"
                                                ></v-autocomplete> 
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">AC Par</h6>
                                                <v-autocomplete
                                                    dense
                                                    solo
                                                    clearable
                                                    v-model="ac_par"
                                                    :items="ac_parents"
                                                    item-value="ac_num"
                                                    :item-text="item => item.ac_num +' - '+ item.ac_desc"
                                                    class="ma-0 pa-0 border-12"
                                                    hide-details=true
                                                    @change="(event) => getLedgerSubParent(event)"
                                                ></v-autocomplete> 
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">AC Sub Par</h6>
                                                <v-autocomplete
                                                    dense
                                                    solo
                                                    clearable
                                                    v-model="ac_sub_par"
                                                    :items="ac_sub_parents"
                                                    item-value="ac_sub_par_one"
                                                    :item-text="item => item.ac_sub_par_one +' - '+ item.ac_sub_par_one_desc"
                                                    class="ma-0 pa-0 border-12"
                                                    hide-details=true
                                                    @change="(event) => showSubLedgerParent(event)"
                                                ></v-autocomplete> 
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">Bidang</h6>
                                                <v-autocomplete
                                                    dense
                                                    solo
                                                    clearable
                                                    v-model="flag_one"
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
                                                    v-model="flag_two"
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
                                                    item-value="key_value"
                                                    :item-text="item => item.key_value +' - '+ item.str1"
                                                    class="ma-0 pa-0 border-12"
                                                    hide-details=true
                                                ></v-autocomplete> 
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">AC Num <span class="red--text"><strong>* </strong></span></h6>
                                                <v-text-field
                                                    solo
                                                    dense
                                                    label="AC Num"
                                                    persistent-hint
                                                    v-model="ac_num"
                                                    class="ma-0 pa-0 border-12"
                                                    hide-details=true
                                                >
                                                </v-text-field>
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">AC Type <strong style="color:red;">*</strong><span></span></h6>
                                                <v-autocomplete
                                                    dense
                                                    solo
                                                    clearable
                                                    v-model="ac_type"
                                                    :items="ac_types"
                                                    item-value="key_value"
                                                    item-text="str1"
                                                    class="ma-0 pa-0 border-12"
                                                    hide-details=true
                                                ></v-autocomplete> 
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">AC Name <strong style="color:red;">*</strong><span></span></h6>
                                                <v-text-field
                                                    solo
                                                    dense
                                                    label="AC Name"
                                                    persistent-hint
                                                    v-model="ac_name"
                                                    class="ma-0 pa-0 border-12"
                                                    hide-details=true
                                                >
                                                </v-text-field>
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">Tax</h6>
                                                <v-text-field
                                                    solo
                                                    dense
                                                    label="Tax"
                                                    persistent-hint
                                                    v-model="tax"
                                                    class="ma-0 pa-0 border-12"
                                                    hide-details=true
                                                >
                                                </v-text-field>
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">Debet / Credit <span class="red--text"><strong>* </strong></span></h6>   
                                                <v-radio-group
                                                    v-model="drcr"
                                                    row
                                                    dense
                                                    hide-details=true
                                                    class="pt-2 pb-0 mt-0"
                                                >
                                                    <v-radio
                                                        label="DR - Debet"
                                                        value="DR"
                                                        class="pt-0 pb-0 mt-0"
                                                    ></v-radio>
                                                    <v-radio
                                                        label="CR - Credit"
                                                        value="CR"
                                                        class="pt-0 pb-0 mt-0"
                                                    ></v-radio>
                                                </v-radio-group>
                                            </v-col>
                                            <!-- <v-col class="col-12" sm="3" md="3">
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
                                            </v-col> -->
                                            <v-col class="col-12" sm="12" md="12">
                                                <div class="d-flex mt-3">
                                                    <v-switch
                                                        inset
                                                        false-value="N"
                                                        true-value="Y"
                                                        v-model="status"
                                                        label="Status *"
                                                    ></v-switch>
                                                </div>
                                                
                                            </v-col>
                                        </v-row>
                                        <small class="mt-1 pt-1">*indicates required field</small>

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
                            max-width="700px"
                        >
                            <v-card class="p-2 rounded-l">
                                <v-card-title class="text-center">
                                    <v-row>
                                        <v-col cols="12">
                                        Edit Chart of Accounts
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
                                                    @change="(event) => getLedgerParent(event)"
                                                ></v-autocomplete> 
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">AC Par</h6>
                                                <v-autocomplete
                                                    dense
                                                    solo
                                                    clearable
                                                    v-model="ac_par"
                                                    :items="ac_parents"
                                                    item-value="ac_num"
                                                    :item-text="item => item.ac_num +' - '+ item.ac_desc"
                                                    class="ma-0 pa-0 border-12"
                                                    hide-details=true
                                                    @change="(event) => getLedgerSubParent(event)"
                                                ></v-autocomplete> 
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">AC Sub Par</h6>
                                                <v-autocomplete
                                                    dense
                                                    solo
                                                    clearable
                                                    v-model="ac_sub_par"
                                                    :items="ac_sub_parents"
                                                    item-value="ac_sub_par_one"
                                                    :item-text="item => item.ac_sub_par_one +' - '+ item.ac_sub_par_one_desc"
                                                    class="ma-0 pa-0 border-12"
                                                    hide-details=true
                                                    @change="(event) => showSubLedgerParent(event)"
                                                ></v-autocomplete> 
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">Bidang</h6>
                                                <v-autocomplete
                                                    dense
                                                    solo
                                                    clearable
                                                    v-model="flag_one"
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
                                                    v-model="flag_two"
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
                                                    item-value="key_value"
                                                    :item-text="item => item.key_value +' - '+ item.str1"
                                                    class="ma-0 pa-0 border-12"
                                                    hide-details=true
                                                ></v-autocomplete> 
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">AC Num <span class="red--text"><strong>* </strong></span></h6>
                                                <v-text-field
                                                    solo
                                                    dense
                                                    label="AC Num"
                                                    persistent-hint
                                                    v-model="ac_num"
                                                    class="ma-0 pa-0 border-12"
                                                    hide-details=true
                                                >
                                                </v-text-field>
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">AC Type <strong style="color:red;">*</strong><span></span></h6>
                                                <v-autocomplete
                                                    dense
                                                    solo
                                                    clearable
                                                    v-model="ac_type"
                                                    :items="ac_types"
                                                    item-value="key_value"
                                                    item-text="str1"
                                                    class="ma-0 pa-0 border-12"
                                                    hide-details=true
                                                ></v-autocomplete> 
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">AC Name <strong style="color:red;">*</strong><span></span></h6>
                                                <v-text-field
                                                    solo
                                                    dense
                                                    label="AC Name"
                                                    persistent-hint
                                                    v-model="ac_name"
                                                    class="ma-0 pa-0 border-12"
                                                    hide-details=true
                                                >
                                                </v-text-field>
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">Tax</h6>
                                                <v-text-field
                                                    solo
                                                    dense
                                                    label="Tax"
                                                    persistent-hint
                                                    v-model="tax"
                                                    class="ma-0 pa-0 border-12"
                                                    hide-details=true
                                                >
                                                </v-text-field>
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">Debet / Credit <span class="red--text"><strong>* </strong></span></h6>   
                                                <v-radio-group
                                                    v-model="drcr"
                                                    row
                                                    dense
                                                    hide-details=true
                                                    class="pt-2 pb-0 mt-0"
                                                >
                                                    <v-radio
                                                        label="DR - Debet"
                                                        value="DR"
                                                        class="pt-0 pb-0 mt-0"
                                                    ></v-radio>
                                                    <v-radio
                                                        label="CR - Credit"
                                                        value="CR"
                                                        class="pt-0 pb-0 mt-0"
                                                    ></v-radio>
                                                </v-radio-group>
                                            </v-col>
                                            <!-- <v-col class="col-12" sm="3" md="3">
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
                                            </v-col> -->
                                            <v-col class="col-12" sm="12" md="12">
                                                <div class="d-flex mt-3">
                                                    <v-switch
                                                        inset
                                                        false-value="N"
                                                        true-value="Y"
                                                        v-model="status"
                                                        label="Status *"
                                                    ></v-switch>
                                                </div>
                                                
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
                                            Filter Chart of Accounts
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
                                                    @change="(event) => getLedgerParent(event)"
                                                ></v-autocomplete> 
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">AC Par</h6>
                                                <v-autocomplete
                                                    dense
                                                    solo
                                                    clearable
                                                    v-model="ac_par"
                                                    :items="ac_parents"
                                                    item-value="ac_num"
                                                    :item-text="item => item.ac_num +' - '+ item.ac_desc"
                                                    class="ma-0 pa-0 border-12"
                                                    hide-details=true
                                                    @change="(event) => getLedgerSubParent(event)"
                                                ></v-autocomplete> 
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">AC Sub Par</h6>
                                                <v-autocomplete
                                                    dense
                                                    solo
                                                    clearable
                                                    v-model="ac_sub_par"
                                                    :items="ac_sub_parents"
                                                    item-value="ac_sub_par_one"
                                                    :item-text="item => item.ac_sub_par_one +' - '+ item.ac_sub_par_one_desc"
                                                    class="ma-0 pa-0 border-12"
                                                    hide-details=true
                                                    @change="(event) => showSubLedgerParent(event)"
                                                ></v-autocomplete> 
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">Bidang</h6>
                                                <v-autocomplete
                                                    dense
                                                    solo
                                                    clearable
                                                    v-model="flag_one"
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
                                                    v-model="flag_two"
                                                    :items="komisies"
                                                    item-value="key_value"
                                                    :item-text="item => item.key_value +' - '+ item.str1"
                                                    class="ma-0 pa-0 border-12"
                                                    hide-details=true
                                                ></v-autocomplete> 
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">AC Type <strong style="color:red;">*</strong><span></span></h6>
                                                <v-autocomplete
                                                    dense
                                                    solo
                                                    clearable
                                                    v-model="ac_type"
                                                    :items="ac_types"
                                                    item-value="key_value"
                                                    item-text="str1"
                                                    class="ma-0 pa-0 border-12"
                                                    hide-details=true
                                                ></v-autocomplete> 
                                            </v-col>
                                            <v-col class="col-12" sm="6" md="6">
                                                <h6 class="blue-lcd mb-1">Debet / Credit <span class="red--text"><strong>* </strong></span></h6>   
                                                <v-radio-group
                                                    v-model="drcr"
                                                    row
                                                    dense
                                                    hide-details=true
                                                    class="pt-2 pb-0 mt-0"
                                                >
                                                    <v-radio
                                                        label="DR - Debet"
                                                        value="DR"
                                                        class="pt-0 pb-0 mt-0"
                                                    ></v-radio>
                                                    <v-radio
                                                        label="CR - Credit"
                                                        value="CR"
                                                        class="pt-0 pb-0 mt-0"
                                                    ></v-radio>
                                                </v-radio-group>
                                            </v-col>
                                            <v-col class="col-12" sm="12" md="12">
                                                <div class="d-flex mt-3">
                                                    <v-switch
                                                        inset
                                                        false-value="N"
                                                        true-value="Y"
                                                        v-model="status"
                                                        label="Status *"
                                                    ></v-switch>
                                                </div>
                                                
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
                    </v-tab-item>
                    <v-tab-item
                        value="tab-2"
                    >
                        <ledger-parent></ledger-parent>
                    </v-tab-item>
                    <v-tab-item
                        value="tab-3"
                    >
                        <ledger-sub-parent></ledger-sub-parent>
                    </v-tab-item>
                    <v-tab-item
                        value="tab-4"
                         
                    >
                        <ledger-finance></ledger-finance>
                    </v-tab-item>
                    <v-tab-item
                        value="tab-5"
                    >
                        <ledger-standart></ledger-standart>
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
import LedgerParent from "./LedgerParent.vue"
import LedgerFinance from "./LedgerFinance.vue"
import {ledger_parent} from "../../../backend-api/ledger/coa/ledger_parent"
import LedgerStandart from "./LedgerStandart.vue"
import LedgerSubParent from './LedgerSubParent.vue'
import {appl_constant} from "../../../backend-api/appl_constant/index"
import {ledger_sub_parent} from "../../../backend-api/ledger/coa/ledger_sub_parent"
import {env_conf} from "../../../backend-api/env_conf/index"

export default {
    components: {
        LedgerParent, LedgerStandart, LedgerFinance, LedgerSubParent
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
            breadcumbs: [
                {
                    text: 'Ledger',
                    disabled: false,
                    href: '/admin/ledger',
                },
                {
                    text: 'Chart of Accounts',
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
                { text: 'AC Par', value: 'ac_par' , align:'left'},
                { text: 'AC Sub Par', value: 'ac_sub_par_one' , align:'left'},
                { text: 'Bidang', value: 'flag_one' , align:'left'},
                { text: 'Komisi', value: 'flag_two' , align:'left'},
                { text: 'Acp', value: 'flag_three' , align:'left'},                
                { text: 'AC Num', value: 'ac_num' , align:'left', width: '150'},
                { text: 'AC Type', value: 'ac_type' , align:'left'},
                { text: 'AC Name', value: 'ac_name' , align:'left'},
                { text: 'Tax', value: 'tax' , align:'left'},
                { text: 'Dr Cr', value: 'drcr' , align:'left'},
                { text: 'Curr ID', value: 'curr_id' , align:'left'},
                { text: 'Status', value: 'status' , align:'left'},
                { text: 'Action', value: 'action' , align:'left'},
            ],
            coas: [],
            showDetail: false,
            flag_one: '',
            flag_two: '',
            bidangs: [],
            bidang: '',
            komisies: [],
            komisi: '',
            entities: [],
            entity_id: '',
            offices: [],
            office_id: '',
            ac_num: '',
            ac_par: '',
            ac_parents: [],
            ac_sub_par: '',
            ac_sub_parents: [],
            ac_types: [
                {
                    text: 'AS - Asset',
                    value: 'AS'
                },
                {
                    text: 'EX - Expense',
                    value: 'EX'
                },
                {
                    text: 'EY - Expense Pihak Ketiga',
                    value: 'EY'
                },
                {
                    text: 'LI - Liability',
                    value: 'LI'
                },
                {
                    text: 'IC - Income',
                    value: 'IC'
                },
                {
                    text: 'ID - Income Pihak Ketiga',
                    value: 'ID'
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
            status: 'Y',
            detail: null,
            showDetail: false,
            dialogEdit: false,
            mod_month: 0,
            dialogfilter: false,
            headersColumn: {
                'Entity ID': 'entity_id',
                'Office': 'office',
                'AC Par': 'ac_par',
                'AC Sub Par': 'ac_sub_par_one',
                'Bidang': 'flag_one',
                'Komisi': 'flag_two',
                'AC Num': 'ac_num',
                'AC Name': 'ac_name',
                'Dr Cr': 'drcr',
                'Curr ID': 'curr_id',
                'Acp': 'flag_three'
            },
            tabs: [],
            mnCOA: '',
            mnGLFin: '',
            mnGLParent: '',
            mnGLStandart: '',
            mnGLSubPar: '',
            acps: [],
            acp: ''
        }
    },
    async mounted(){
        this.$store.dispatch('setOverlay', true)
        await this.getApplConstant()
        // await this.glFlags()
        await this.getPullData()
        await this.getEntity()
        await this.getAcType()
        this.$store.dispatch('setOverlay', false)
    },
    methods: {
        tr_datatable(item) {
            const rowClass = 'tr_datatable'
            return rowClass;
        },
        clear(){
            this.office_id = ''
            this.entity_id = ''
            this.ac_num = ''
            this.ac_par = ''
            this.status = 'Y'
            this.ac_type = ''
            this.ac_name = ''
            this.tax = ''
            this.drcr = ''
            this.currency = 'IDR'
            this.ac_sub_par = ''
            this.flag_one = ''
            this.flag_two = ''
            this.acp = ''
        },
        detailItem(item){
            this.detail = item
            this.dialog = true
            this.showDetail = true
            this.office_id = item.office_id
            this.entity_id = item.entity_id
            this.getBranchOffice()
            this.ac_num = item.ac_num
            this.ac_par = item.ac_par
            this.status = item.active_flag
            this.getLedgerParent()
            this.ac_sub_par = item.ac_sub_par_one
            this.getLedgerSubParent()
            this.ac_type = item.ac_type
            this.ac_name = item.ac_name
            this.flag_one = item.flag_one
            this.flag_two = item.flag_two
            this.acp = item.flag_three
            this.tax = item.tax
            this.drcr = item.drcr
            this.currency = 'IDR'
            this.getApplConstant()
        },
        detailItemEdit(item){
            this.detail = item
            this.dialogEdit = true
            this.office_id = item.office_id
            this.entity_id = item.entity_id
            this.getBranchOffice()
            this.ac_num = item.ac_num
            this.ac_par = item.ac_par
            this.status = item.active_flag
            this.flag_one = item.flag_one
            this.flag_two = item.flag_two
            this.getLedgerParent()
            this.ac_sub_par = item.ac_sub_par_one
            this.getLedgerSubParent()
            this.ac_type = item.ac_type
            this.ac_name = item.ac_name
            this.acp = item.flag_three
            this.tax = item.tax
            this.drcr = item.drcr
            this.currency = 'IDR'
            this.getApplConstant()
        },
        async getEntity(){
            var respData = await entity.fetchEntity("", null, false, false, false)
            if (respData.status === 200) {
                this.entities = respData.data
            }
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
                    this.mod_month = parseInt(respData.data.data[0].int1)
                }
                // 
            }
            var respDataBidang = await appl_constant.fetchApplConstant("?key_code=BIDANG", null, false, false, false)
            if (respDataBidang.status === 200) {
                this.bidangs = respDataBidang.data.data
            }

            var respDataKomisi = await appl_constant.fetchApplConstant("?key_code=KOMISI", null, false, false, false)
            if (respDataKomisi.status === 200) {
                this.komisies = respDataKomisi.data.data
            }

            var respDataTabs = await appl_constant.fetchApplConstant("?key_value=LEDGER&str2=CHART OF ACCOUNT&sort_order=asc&order_by=int1", null, false, false, false)
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
            }

            var respDataPdt = await appl_constant.fetchApplConstant("?key_code=FLAGTHREE", null, false, false, false)
            if (respDataPdt.status === 200) {
                this.acps = respDataPdt.data.data
            }
        },
        async getPullData(){
            this.coas = []
            this.$store.dispatch('setOverlay', true)
            var respData = await ledger_coa.fetchLedgerCoa(`?search=${this.search ? this.search : ''}&entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_par=${this.ac_par ? this.ac_par : ''}&ac_type=${this.ac_type ? this.ac_type : ''}&drcr=${this.drcr ? this.drcr : ''}&bidang=${this.flag_one ? this.flag_one : ''}&komisi=${this.flag_two ? this.flag_two : ''}&active_flag=${this.status ? this.status : ''}&flag_three=${this.$store.state.user.flag_three ? this.$store.state.user.flag_three : ''}`, null, false, false, false)
            if (respData.status === 200) {
                this.coas = respData.data.data
                this.$store.dispatch('setOverlay', false)
                this.clear()

            } else{
                this.$store.dispatch('setOverlay', false)
            }
        },
        async glFlags(){
            var respData = await ledger_coa.glFlag(``, null, false, false, false)
            if (respData.status === 200) {
                this.acps = respData.data.data
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
        async getLedgerParent(event){
            if (event === null || event === '') {
                this.ac_par = ''
            } else{
                var respData = await ledger_parent.fetchLedgerParent(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}`, null, false, false, false)
                if (respData.status === 200) {
                    this.ac_parents = respData.data.data
                }
            }
        },
        async getLedgerSubParent(event){
            if (event === null || event === '') {
                this.ac_sub_par = ''
            } else{
                var respData = await ledger_sub_parent.fetchLedgerSubParent(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_par=${this.ac_par ? this.ac_par : ''}`, null, false, false, false)
                if (respData.status === 200) {
                    this.ac_sub_parents = respData.data.data
                }
            }
        },
        async showSubLedgerParent(event){
            if (event === null || event === '') {
                this.ac_sub_par = ''
            } else{
                var respData = await ledger_sub_parent.fetchLedgerSubParent(`?entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_par=${this.ac_par ? this.ac_par : ''}&ac_sub_par_one=${this.ac_sub_par ? this.ac_sub_par : ''}`, null, false, false, false)
                if (respData.status === 200) {
                    this.drcr = respData.data.data.length > 0 ? respData.data.data[0].drcr : ''
                }
            }
        },
        async submit(){
            this.$store.dispatch('setOverlay', true)
            this.dialog = false

            if (this.entity_id === '' || this.office_id === '' || this.ac_num === '' || this.ac_type === '' || this.ac_name == '' || this.drcr == '' || this.status == '') {
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
                'ac_par': this.ac_par,
                'active_flag': this.status,
                'ac_type': this.ac_type,
                'ac_name': this.ac_name,
                'tax': this.tax,
                'drcr' : this.drcr,
                'curr_id' : this.currency,
                'ac_sub_par': this.ac_sub_par,
                'flag_one': this.flag_one,
                'flag_two': this.flag_two,
                'flag_three': this.acp
            }

            const respData = await ledger_coa.storeLedgerCoa('', reqBody, false, false, false)

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
        async updateStatusCoa(item){
            this.$store.dispatch('setOverlay', true)
            var reqBody = {
                'office_id': item.office_id,
                'entity_id': item.entity_id,
                'ac_num': item.ac_num,
                'ac_par': item.ac_par,
                'active_flag': item.active_flag,
                'ac_type': item.ac_type,
                'ac_name': item.ac_name,
                'tax': item.tax,
                'drcr' : item.drcr,
                'curr_id' : item.curr_id
            }
            const respData = await ledger_coa.updateLedgerCoa('', reqBody, false, false, false)
            if (respData.status === 200) {
                this.getPullData()
                this.snackbar = {
                    color: "success",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: 'Successfully Update Status',
                    visible: true
                };
                this.$store.dispatch('setOverlay', false)

            } else{
                this.$store.dispatch('setOverlay', false)
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

            if (this.entity_id === '' || this.office_id === '' || this.ac_num === '' || this.ac_type === '' || this.ac_name == '' || this.drcr == '' || this.status == '') {
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
                'ac_par': this.ac_par,
                'active_flag': this.status,
                'ac_type': this.ac_type,
                'ac_name': this.ac_name,
                'tax': this.tax,
                'drcr' : this.drcr,
                'curr_id' : this.currency,
                'ac_sub_par': this.ac_sub_par,
                'flag_one': this.flag_one,
                'flag_two': this.flag_two,
                'flag_three': this.acp
            }

            const respData = await ledger_coa.updateLedgerCoa('', reqBody, false, false, false)

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
        async exportExcel(){
            var respData = await ledger_coa.fetchLedgerCoa(`?search=${this.search ? this.search : ''}&entity_id=${this.entity_id ? this.entity_id : ''}&office_id=${this.office_id ? this.office_id : ''}&ac_par=${this.ac_par ? this.ac_par : ''}&ac_type=${this.ac_type ? this.ac_type : ''}&drcr=${this.drcr ? this.drcr : ''}&bidang=${this.flag_one ? this.flag_one : ''}&komisi=${this.flag_two ? this.flag_two : ''}&active_flag=${this.status ? this.status : ''}`, null, false, false, false)
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