<template>
    <v-container fluid class="mt-3 mb-5">
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
                    <v-text-field
                        solo
                        clearable
                        class="border-12"
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                        style="max-width:400px"
                        @keyup.enter="getIndex()"
                    ></v-text-field>
                </div>
            </v-col>
        </v-row>
        <v-row class="mt-2" >
            <v-col cols="12">
                <v-card class="rounded-l elevation-5">
                    <v-card-title>
                        Environment Variable
                        <v-spacer></v-spacer>
                        <v-btn
                        small
                        color="#fff"
                        class="py-5 mr-3"
                        @click="getPullData()"
                        >
                            <v-icon>mdi-cached</v-icon>
                        </v-btn>
                        <!-- <v-btn
                        small
                        color="#fff"
                        class="py-5 mr-3"
                        @click="dialogfilter = true"
                        >
                            <v-icon>mdi-filter-variant</v-icon>
                        </v-btn> -->
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
                            :headers="headers"
                            :items="menu_headers"
                            class="elevation-1"
                            :items-per-page="20"
                            :loading="$store.state.overlay"
                            height="600"
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
                                    @change="updateStatus(item)"
                                    class="mt-1 mb-2"
                                    hide-details="true"
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
                                        <v-list-item  @click="detailItemEdit(item)">
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
                    max-width="600px"
                >
                    <v-card class="p-2 rounded-l">
                        <v-card-title class="text-center">
                            <v-row class="mb-0">
                               <v-col class="col-12" sm="2" md="7">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 14H19V17H22V19H19V22H17V19H14V17H17V14ZM20 11V8H4V11H20ZM13 13V14.68C12.37 15.63 12 16.77 12 18C12 19.09 12.29 20.12 12.8 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V3L3.67 4.67L5.33 3L7 4.67L8.67 3L10.33 4.67L12 3L13.67 4.67L15.33 3L17 4.67L18.67 3L20.33 4.67L22 3V13.5C20.8893 12.5371 19.4699 12.0048 18 12C16.77 12 15.63 12.37 14.68 13H13ZM11 19V13H4V19H11Z" fill="#0F7AAE"></path></svg>
                                    Create Env Configuration
                                </v-col>
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
                                            @change="(event) => getApk(event)"
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Application<strong style="color:red;">*</strong><span></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="application"
                                            :items="applications"
                                            item-value="appl_id"
                                            item-text="appl_id"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            @change="(event) => getEnv(event)"
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Variable ID <span class="red--text"><strong>* </strong></span></h6>
                                           <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="envar"
                                            :items="envvars"
                                            item-value="var_id"
                                            item-text="var_id"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            @change="(event) => userGroup(event)"
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Group ID<strong style="color:red;">*</strong><span></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="grups"
                                            :items="grup"
                                            item-value="group_id"
                                            item-text="group_id"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            @change="(event) => userID(event)"
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">User ID<strong style="color:red;">*</strong><span></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="users"
                                            :items="userIds"
                                            item-value="user_id2"
                                            item-text="user_id2"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Type Var<strong style="color:red;">*</strong><span></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="types_var"
                                            :items="type_vars"
                                            item-value="value"
                                            item-text="text"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        ></v-autocomplete> 
                                    </v-col>
                                   <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Var Value<span class="red--text"><strong>* </strong></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="Var Value"
                                            persistent-hint
                                            v-model="var_vaulues"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Note<span class="red--text"><strong>* </strong></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label=""
                                            persistent-hint
                                            v-model="notes"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-row justify="center" class="mt-1">
                                    <v-col class="col-12" sm="12" md="12">
                                        <v-switch
                                            inset
                                            v-model="status"
                                            label="Status *"
                                        ></v-switch>
                                    </v-col>
                                    </v-row>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions class="text-center">
                            <v-row justify="center">
                                <v-col cols="12" xs="12" sm="3" md="3">
                                    <v-btn block class="rounded-l mr-2" color="#fff" @click="dialog = false">Cancel</v-btn>
                                </v-col>
                                <v-col cols="12" xs="12" sm="3" md="3">
                                    <v-btn block class="rounded-l text-white"  color="#20bf6b" @click="Create()">Save</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog
                    v-model="dialogedit"
                    persistent
                    max-width="600px"
                >
                    <v-card class="p-2 rounded-l">
                        <v-card-title class="text-center">
                            <v-row>
                                <v-col cols="12">
                                    Edit Env-Configuration
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
                                            disabled
                                            v-model="entity_id"
                                            :items="entities"
                                            item-value="entity_id"
                                            item-text="entity_id"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            @change="(event) => getApk(event)"
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Application<strong style="color:red;">*</strong><span></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            disabled
                                            clearable
                                            v-model="application"
                                            :items="applications"
                                            item-value="appl_id"
                                            item-text="appl_id"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Variable ID<strong style="color:red;">*</strong><span></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            disabled
                                            clearable
                                            v-model="envar"
                                            :items="envvars"
                                            item-value="var_id"
                                            item-text="var_id"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Group<strong style="color:red;">*</strong><span></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            disabled
                                            clearable
                                            v-model="grups"
                                            :items="grup"
                                            item-value="group_id"
                                            item-text="group_id"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">User ID<strong style="color:red;">*</strong><span></span></h6>
                                        <v-autocomplete
                                            dense
                                            disabled
                                            solo
                                            v-model="users"
                                            :items="userIds"
                                            item-value="user_id2"
                                            item-text="user_id2"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Type Var<strong style="color:red;">*</strong><span></span></h6>
                                     <v-autocomplete
                                            dense
                                            solo
                                            disabled
                                            clearable
                                            v-model="types_var"
                                            :items="type_vars"
                                            item-value="value"
                                            item-text="text"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Var Value<strong style="color:red;">*</strong><span></span></h6>
                                           <v-text-field
                                            solo
                                            dense
                                            label="Var Value"
                                            persistent-hint
                                            v-model="var_value"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Note<strong style="color:red;">*</strong><span></span></h6>
                                         <v-text-field
                                            solo
                                            dense
                                            label=""
                                            persistent-hint
                                            v-model="note1"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                     <v-row justify="center" class="mt-1">
                                    <v-col class="col-12" sm="12" md="12">
                                        <v-switch
                                            inset
                                            v-model="status"
                                            label="Status *"
                                        ></v-switch>
                                    </v-col>
                                    </v-row>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions class="text-center">
                            <v-row justify="center">
                                <v-col cols="12" xs="12" sm="3" md="3">
                                    <v-btn block class="rounded-l mr-2" color="#fff" @click="dialogedit = false">Cancel</v-btn>
                                </v-col>
                                <v-col cols="12" xs="12" sm="3" md="3">
                                    <v-btn block class="rounded-l text-white"  color="#20bf6b" @click="submitEdit()">Save</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog
                    v-model="dialogdetail"
                    persistent
                    max-width="600px"
                >
                    <v-card class="p-2 rounded-l">
                        <v-card-title class="text-center">
                            <v-row>
                                <v-col cols="12">
                                    Detail Env-Configuration
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
                                            disabled
                                            v-model="entity_id"
                                            :items="entities"
                                            item-value="entity_id"
                                            item-text="entity_id"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            @change="(event) => getApk(event)"
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Application<strong style="color:red;">*</strong><span></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            disabled
                                            clearable
                                            v-model="application"
                                            :items="applications"
                                            item-value="appl_id"
                                            item-text="appl_id"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Variable ID<strong style="color:red;">*</strong><span></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            disabled
                                            clearable
                                            v-model="envar"
                                            :items="envvars"
                                            item-value="var_id"
                                            item-text="var_id"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Group<strong style="color:red;">*</strong><span></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            disabled
                                            clearable
                                            v-model="grups"
                                            :items="grup"
                                            item-value="group_id"
                                            item-text="group_id"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">User ID<strong style="color:red;">*</strong><span></span></h6>
                                        <v-autocomplete
                                            dense
                                            disabled
                                            solo
                                            v-model="users"
                                            :items="userIds"
                                            item-value="user_id2"
                                            item-text="user_id2"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Type Var<strong style="color:red;">*</strong><span></span></h6>
                                     <v-autocomplete
                                            dense
                                            solo
                                            disabled
                                            clearable
                                            v-model="types_var"
                                            :items="type_vars"
                                            item-value="value"
                                            item-text="text"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Var Value<strong style="color:red;">*</strong><span></span></h6>
                                           <v-text-field
                                            solo
                                            disabled
                                            dense
                                            label="Var Value"
                                            persistent-hint
                                            v-model="var_value"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Note<strong style="color:red;">*</strong><span></span></h6>
                                         <v-text-field
                                            solo
                                            disabled
                                            dense
                                            label=""
                                            persistent-hint
                                            v-model="note1"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                     <v-row justify="center" class="mt-1">
                                    <v-col class="col-12" sm="12" md="12">
                                        <v-switch
                                            inset
                                            v-model="status"
                                            label="Status *"
                                        ></v-switch>
                                    </v-col>
                                    </v-row>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions class="text-center">
                            <v-row justify="center">
                                <v-col cols="12" xs="12" sm="3" md="3">
                                    <v-btn block class="rounded-l mr-2" color="#fff" @click="dialogdetail = false">Cancel</v-btn>
                                </v-col>
                                <!-- <v-col cols="12" xs="12" sm="3" md="3">
                                    <v-btn block class="rounded-l text-white"  color="#20bf6b" @click="submitEdit()">Save</v-btn>
                                </v-col> -->
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { env_var } from "../../../backend-api/env_var/index"
import {application} from "../../../backend-api/sec_appl/master"
import {entity} from "../../../backend-api/entity/master"
import {env_conf} from "../../../backend-api/env_conf/index"
import {user_group} from "../../../backend-api/user_group/index"
import {user} from "../../../backend-api/user/index" 

export default {
    data() {
        return {
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
                    text: 'Data Store',
                    disabled: false,
                    href: '/admin/datastore',
                },
                {
                    text: 'User Management',
                    disabled: false,
                    href: '/admin/datastore/user-management',
                },
                {
                    text: 'Env-Variable Configuration',
                    disabled: true,
                }
            ],
            headers:[
                {
                text: 'Entity',
                align: 'start',
                value: 'entity_id', 
                align:'center'},
                { text: 'Application', value: 'appl_id' , align:'center'},
                { text: 'Variable ID', value: 'var_id' , align:'center'},
                { text: 'Group', value: 'group_id' , align:'center'},
                { text: 'User', value: 'user_id2' , align:'center'},
                { text: 'Value', value: 'var_value' , align:'center'},
                { text: 'Note', value: 'note1' , align:'center'},
                { text: 'Status', value: 'status' , align:'center'},
                { text: 'Action', value: 'action' , align:'center'}, 
            ],
            menu_headers:[],
            Datatable:[],
            entities: [],
            applications:[],
            grup:[],
            userIds:[],
            application:{},
            envvars:[],
            dialog: false,
            dialogdetail:false,
            dialogedit: false,
            env_conf:'',
            entity_id: '',
            entity:'',
            entities: [],
            menu_caption: '',
            entityedit:'',
            grups:'',
            users:'',
            types_var:'',
            appl_ver:'',
            var_vaulues:'',
            notes:'',
            route_path: '',
            statuses: [
                {
                    value: 'Y',
                    name: 'Active'
                },
                {
                    value: 'N',
                    name: 'Non Active'
                }
            ],
            type_var: '',
            type_vars:[
                {
                    value: 'S',
                    text: 'String'
                },
                {
                    value: 'N',
                    text: 'Number'
                },
                {
                    value: 'D',
                    text: 'Date'
                }
            ],
            status: true,
            version: '',
            note: '',
            application: '',
            var_value:'',
            note1:'',
            envar:'',
            applications: [],

        }
    },
    mounted(){
    this.getEntity()
    this.getPullData()
   // this.getSearch()
    
    },
    methods: {
        tr_datatable(item) {
            const rowClass = 'tr_datatable'
            return rowClass;
        },
        clear(){
            this.entity_id = ''
            this.application = ''
            this.envar = ''
            this.types_var = ''
            this.notes =''
            this.status = ''
            this.grups =''
            this.users =''
        },
        detailItem(item){
            this.dialogdetail = true
            this.detail = item
            this.entity_id = item.entity_id
            this.application = item.appl_id
            this.getApk()
            this.getEnv()
            this.envar = item.var_id
            this.userGroup()
            this.grups = item.group_id
            this.userID()
            this.users = item.user_id2
            this.var_value = item.var_value
            this.note1 = item.note1
            this.types_var = item.var_type
            this.status = item.active_flag === 'Y' ? true : false
        },
        detailItemEdit(item){
            console.log(item)
            this.detail = item
            this.dialogedit = true
            this.entity_id = item.entity_id
            this.application = item.appl_id
            this.getApk()
            this.getEnv()
            this.envar = item.var_id
            this.userGroup()
            this.grups = item.group_id
            this.userID()
            this.users = item.user_id2
            this.var_value = item.var_value
            this.note1 = item.note1
            this.types_var = item.var_type
            this.status = item.active_flag === 'Y' ? true : false
        },    
    
        async getEntity(){
            var respData = await entity.fetchEntity("", null, false, false, false)
            if (respData.status === 200) {
                //console.log(respData)
                this.entities = respData.data
            }
        },
        
        async getApk(event){
            console.log(this.entity);
            if (event === null || event === '') {
                this.application = ''
            } else{
                var respData = await application.fetchApplication(`?entity_id=${this.entity_id ? this.entity_id : ''}`, null, false, false, false)
                if (respData.status === 200) {
                   // console.log(respData)
                    this.applications = respData.data

                }
            }
        },
        async getEnv(event){
           // console.log(this.entity);
            if (event === null || event === '') {
                this.envvars = ''
            } else{
                var respData = await env_var.fetchEnvVar(`?entity_id=${this.entity_id ? this.entity_id : ''}&appl_id=${this.application ? this.application : ''}`, null, false, false, false)
                if (respData.status === 200) {
                  //  console.log(respData)
                    this.envvars = respData.data

                }
            }
        },     
        async userGroup(event){
           // console.log(this.entity);
            if (event === null || event === '') {
                this.application = ''
            } else{
                var respData = await user_group.fetchUserGroup(`?entity_id=${this.entity_id ? this.entity_id : ''}&`, null, false, false, false)
                if (respData.status === 200) {
                   /// console.log(respData)
                this.grup = respData.data
                this.userID(event)

                }
            }
        },
        async userID(event){
           // console.log(this.entity);
            if (event === null || event === '') {
                this.application = ''
            } else{
                var respData = await user.fetchUser(`?entity_id=${this.entity_id ? this.entity_id : ''}&`, null, false, false, false)
                if (respData.status === 200) {
                 console.log(respData)
                 this.userIds = respData.data

                }
            }
        },         
        async getPullData(){
            this.menu_headers = []
            this.$store.dispatch('setOverlay', true)

            var respData = await env_conf.fetchMenuEnv (`?entity_id=${this.entity_id ? this.entity_id : ''}&appl_id=${this.application ? this.application : ''}&status=${this.status === true ? 'Y' : 'N'}`, null, false, false, false)
            if (respData.status === 200) {
                //console.log(respData)
                this.menu_headers = respData.data
                this.$store.dispatch('setOverlay', false)

            } else{
                this.$store.dispatch('setOverlay', false)
            }
        },
  
        async getIndex(){
            this.menu_headers = []
            this.$store.dispatch('setOverlay', true)

            await axios.get(`${process.env.VUE_APP_URL}/api/env_conf?search=${this.search ? this.search : ''}`, { 
                headers: { 
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `Bearer ${this.$store.getters.isTokenUser}`
                } 
            })
            .then(res => {
                this.$store.dispatch('setOverlay', false)
                
                this.menu_headers = res.data

            })
        },

        async submitEdit(){
            this.$store.dispatch('setOverlay', true)
            this.dialogedit = false

            if (this.var_value === '' || this.note1 === '' || this.status === '') {
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
                this.dialogedit = true
                this.clear()
                this.getPullData()

                return false
            }

            var reqBody = {
                'var_id': this.envar,
                'var_type':this.types_var,
                'group_id':this.grups,
                'appl_id': this.application,
                'entity_id': this.entity_id,
                'var_value': this.var_value,
                'note1': this.note1,
                'user_id2':this.users,
                'status': this.status === true ? 'Y' : 'N',
            }

            const respData = await env_conf.updateMenuEnv('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.snackbar = {
                    color: "success",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: 'Successfully Edit Data',
                    visible: true
                };

                this.$store.dispatch('setOverlay', false)
                this.dialogedit = false
                this.clear()
                this.getPullData()

            } else{
                this.$store.dispatch('setOverlay', false)
                this.dialogedit = true

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

        async Create(){
        this.$store.dispatch('setOverlay', true)
            this.dialog = false

            if (this.entity_id === '' || this.application === '' || this.status === '' || this.envar === '' || this.types_var == '') {
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
                'entity_id': this.entity_id,
                'appl_id': this.application,
                'var_id': this.envar,
                'var_type':this.types_var,
                'note1':this.notes,
                'group_id':this.grups,
                'var_value':this.var_vaulues,
                'user_id2':this.users,
                'status': this.status === true ? 'Y' : 'N'
            }
        const respData = await env_conf.storeMenuEnv('', reqBody, false, false, false)
            
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

            } else {
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

    updateStatus(menu){
        console.log(menu)
        axios.put(`${process.env.VUE_APP_URL}/api/env_conf/updateEnvConfStat`, {
            'entity_id': menu.entity_id,
            'appl_id' : menu.appl_id,
            'var_id' : menu.var_id,
            'group_id' : menu.group_id,
            'user_id2': menu.user_id2,
            'status': menu.active_flag,
        }, { 
            headers: { Authorization: `Bearer ${this.$store.getters.isTokenUser}` } 
        }).then(res => {
            this.clear()
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
        }).catch(err => {
            this.snackbar = {
                color: "error",
                icon: "mdi-alert-circle",
                mode: "multi-line",
                position: "top",
                timeout: 7500,
                title: "Error",
                visible: true
            };
        })
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
.tr_datatable{
  background-color: #F5F7F8 !important;
}
</style>