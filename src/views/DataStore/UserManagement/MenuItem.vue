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
                        @keyup.enter="getIndex()"
                        style="max-width:400px"
                    ></v-text-field>
                </div>
            </v-col>
        </v-row>
        <v-row class="mt-2" >
            <v-col cols="12">
                <v-card class="rounded-l elevation-5">
                    <v-card-title>
                        Menu Item
                        <v-spacer></v-spacer>
                        <v-btn
                        small
                        color="#fff"
                        class="py-5 mr-3"
                        @click="getIndex()"
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
                            :items="Datatable"
                            class="elevation-1"
                            :options.sync="options"
                            :items-per-page="10"
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
                                        <v-list-item @click="detail(item)">
                                            <v-list-item-icon>
                                                <v-icon>mdi-magnify</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title  >Detail</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item  @click="EditItem(item)" >
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
                               <v-col class="col-12" sm="2" md="5">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 14H19V17H22V19H19V22H17V19H14V17H17V14ZM20 11V8H4V11H20ZM13 13V14.68C12.37 15.63 12 16.77 12 18C12 19.09 12.29 20.12 12.8 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V3L3.67 4.67L5.33 3L7 4.67L8.67 3L10.33 4.67L12 3L13.67 4.67L15.33 3L17 4.67L18.67 3L20.33 4.67L22 3V13.5C20.8893 12.5371 19.4699 12.0048 18 12C16.77 12 15.63 12.37 14.68 13H13ZM11 19V13H4V19H11Z" fill="#0F7AAE"></path></svg>
                                    Create Menu Item
                                   
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
                                            v-model="entity"
                                            :items="entiti"
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
                                            :items="aplikasi"
                                            item-value="appl_id"
                                            item-text="appl_id"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            @change="(event) => getMenuHeader(event)"
                                        ></v-autocomplete> 
                                    </v-col>
                                        <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Menu Header<strong style="color:red;">*</strong><span></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="menu_header_model"
                                            :items="menu_headers"
                                            item-value="menu_header_id"
                                            item-text="menu_caption"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Menu ID<strong style="color:red;">*</strong><span></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="Menu ID"
                                            persistent-hint
                                            v-model="menu_id"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                      <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Menu Caption<strong style="color:red;">*</strong><span></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="Menu Caption"
                                            persistent-hint
                                            v-model="menu_caption"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                      <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Note <strong style="color:red;">*</strong><span></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="Note"
                                            persistent-hint
                                            v-model="note1"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                      <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Note 2</h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="Note 2"
                                            persistent-hint
                                            v-model="note2"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                      <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Route Path</h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="Route Path"
                                            persistent-hint
                                            v-model="route_path"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Route Web</h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="Route Web"
                                            persistent-hint
                                            v-model="route_web"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                     <v-col class="col-12" sm="3" md="4">
                                        <h6 class="blue-lcd mb-1">Status <span class="red--text"><strong>* </strong></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="status"
                                            :items="statuses"
                                            item-value="value"
                                            item-text="name"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        ></v-autocomplete> 
                                    </v-col>
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
                    v-model="dialogfilter"
                    persistent
                    max-width="600px"
                >
                    <v-card class="p-2 rounded-l">
                        <v-card-title class="text-center">
                            <v-row class="mb-0">
                                  <v-col class="col-12" sm="2" md="5">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.79279 17.7955C5.13043 16.3874 6.39754 15.3409 7.90909 15.3409C9.67891 15.3409 11.1136 16.7756 11.1136 18.5455C11.1136 20.3153 9.67891 21.75 7.90909 21.75C6.39754 21.75 5.13043 20.7035 4.79279 19.2955H3C2.58579 19.2955 2.25 18.9597 2.25 18.5455C2.25 18.1312 2.58579 17.7955 3 17.7955H4.79279ZM11.3382 11.25C11.6759 9.84199 12.943 8.79545 14.4545 8.79545C16.2244 8.79545 17.6591 10.2302 17.6591 12C17.6591 13.7698 16.2244 15.2045 14.4545 15.2045C12.943 15.2045 11.6759 14.158 11.3382 12.75H3C2.58579 12.75 2.25 12.4142 2.25 12C2.25 11.5858 2.58579 11.25 3 11.25H11.3382ZM4.79279 4.70455C5.13043 3.29653 6.39754 2.25 7.90909 2.25C9.67891 2.25 11.1136 3.68472 11.1136 5.45455C11.1136 7.22437 9.67891 8.65909 7.90909 8.65909C6.39754 8.65909 5.13043 7.61256 4.79279 6.20455H3C2.58579 6.20455 2.25 5.86876 2.25 5.45455C2.25 5.04033 2.58579 4.70455 3 4.70455H4.79279ZM13.6364 6.20455C13.2222 6.20455 12.8864 5.86876 12.8864 5.45455C12.8864 5.04033 13.2222 4.70455 13.6364 4.70455H21C21.4142 4.70455 21.75 5.04033 21.75 5.45455C21.75 5.86876 21.4142 6.20455 21 6.20455H13.6364ZM20.1818 12.75C19.7676 12.75 19.4318 12.4142 19.4318 12C19.4318 11.5858 19.7676 11.25 20.1818 11.25H21C21.4142 11.25 21.75 11.5858 21.75 12C21.75 12.4142 21.4142 12.75 21 12.75H20.1818ZM13.6364 19.2955C13.2222 19.2955 12.8864 18.9597 12.8864 18.5455C12.8864 18.1312 13.2222 17.7955 13.6364 17.7955H21C21.4142 17.7955 21.75 18.1312 21.75 18.5455C21.75 18.9597 21.4142 19.2955 21 19.2955H13.6364ZM7.90909 7.15909C8.85049 7.15909 9.61364 6.39594 9.61364 5.45455C9.61364 4.51315 8.85049 3.75 7.90909 3.75C6.9677 3.75 6.20455 4.51315 6.20455 5.45455C6.20455 6.39594 6.9677 7.15909 7.90909 7.15909ZM14.4545 13.7045C15.3959 13.7045 16.1591 12.9414 16.1591 12C16.1591 11.0586 15.3959 10.2955 14.4545 10.2955C13.5132 10.2955 12.75 11.0586 12.75 12C12.75 12.9414 13.5132 13.7045 14.4545 13.7045ZM7.90909 20.25C8.85049 20.25 9.61364 19.4868 9.61364 18.5455C9.61364 17.6041 8.85049 16.8409 7.90909 16.8409C6.9677 16.8409 6.20455 17.6041 6.20455 18.5455C6.20455 19.4868 6.9677 20.25 7.90909 20.25Z" fill="#0F7AAE"></path></svg>
                                  <span>Filter Data Account</span>
                                    <!-- <v-divider></v-divider> -->
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
                                            v-model="entity"
                                            :items="entiti"
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
                                            :items="aplikasi"
                                            item-value="appl_id"
                                            item-text="appl_id"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="12" md="12">
                                        <v-switch
                                            inset
                                            v-model="status"
                                            label="Status"
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
                                    <v-btn block class="rounded-l text-white"  color="#20bf6b" @click="getFilter()">Filter</v-btn>
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
                            <v-row class="mb-0">
                                  <v-col class="col-12" sm="2" md="4">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.79279 17.7955C5.13043 16.3874 6.39754 15.3409 7.90909 15.3409C9.67891 15.3409 11.1136 16.7756 11.1136 18.5455C11.1136 20.3153 9.67891 21.75 7.90909 21.75C6.39754 21.75 5.13043 20.7035 4.79279 19.2955H3C2.58579 19.2955 2.25 18.9597 2.25 18.5455C2.25 18.1312 2.58579 17.7955 3 17.7955H4.79279ZM11.3382 11.25C11.6759 9.84199 12.943 8.79545 14.4545 8.79545C16.2244 8.79545 17.6591 10.2302 17.6591 12C17.6591 13.7698 16.2244 15.2045 14.4545 15.2045C12.943 15.2045 11.6759 14.158 11.3382 12.75H3C2.58579 12.75 2.25 12.4142 2.25 12C2.25 11.5858 2.58579 11.25 3 11.25H11.3382ZM4.79279 4.70455C5.13043 3.29653 6.39754 2.25 7.90909 2.25C9.67891 2.25 11.1136 3.68472 11.1136 5.45455C11.1136 7.22437 9.67891 8.65909 7.90909 8.65909C6.39754 8.65909 5.13043 7.61256 4.79279 6.20455H3C2.58579 6.20455 2.25 5.86876 2.25 5.45455C2.25 5.04033 2.58579 4.70455 3 4.70455H4.79279ZM13.6364 6.20455C13.2222 6.20455 12.8864 5.86876 12.8864 5.45455C12.8864 5.04033 13.2222 4.70455 13.6364 4.70455H21C21.4142 4.70455 21.75 5.04033 21.75 5.45455C21.75 5.86876 21.4142 6.20455 21 6.20455H13.6364ZM20.1818 12.75C19.7676 12.75 19.4318 12.4142 19.4318 12C19.4318 11.5858 19.7676 11.25 20.1818 11.25H21C21.4142 11.25 21.75 11.5858 21.75 12C21.75 12.4142 21.4142 12.75 21 12.75H20.1818ZM13.6364 19.2955C13.2222 19.2955 12.8864 18.9597 12.8864 18.5455C12.8864 18.1312 13.2222 17.7955 13.6364 17.7955H21C21.4142 17.7955 21.75 18.1312 21.75 18.5455C21.75 18.9597 21.4142 19.2955 21 19.2955H13.6364ZM7.90909 7.15909C8.85049 7.15909 9.61364 6.39594 9.61364 5.45455C9.61364 4.51315 8.85049 3.75 7.90909 3.75C6.9677 3.75 6.20455 4.51315 6.20455 5.45455C6.20455 6.39594 6.9677 7.15909 7.90909 7.15909ZM14.4545 13.7045C15.3959 13.7045 16.1591 12.9414 16.1591 12C16.1591 11.0586 15.3959 10.2955 14.4545 10.2955C13.5132 10.2955 12.75 11.0586 12.75 12C12.75 12.9414 13.5132 13.7045 14.4545 13.7045ZM7.90909 20.25C8.85049 20.25 9.61364 19.4868 9.61364 18.5455C9.61364 17.6041 8.85049 16.8409 7.90909 16.8409C6.9677 16.8409 6.20455 17.6041 6.20455 18.5455C6.20455 19.4868 6.9677 20.25 7.90909 20.25Z" fill="#0F7AAE"></path></svg>
                                  <span>Edit Menu Item</span>
                                    <!-- <v-divider></v-divider> -->
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
                                            v-model="entity"
                                            :items="entiti"
                                            item-value="entity_id"
                                            item-text="description"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            @change="(event) => getApk(event)"
                                            readonly
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Application<strong style="color:red;">*</strong><span></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            v-model="application"
                                            :items="aplikasi"
                                            item-value="appl_id"
                                            item-text="appl_id"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            @change="(event) => getMenuHeader(event)"
                                            readonly
                                        ></v-autocomplete> 
                                    </v-col>
                                        <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Menu Header<strong style="color:red;">*</strong><span></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            v-model="menu_header_model"
                                            :items="menu_headers"
                                            item-value="menu_header_id"
                                            item-text="menu_caption"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            readonly
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Menu ID<strong style="color:red;">*</strong><span></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="Menu ID"
                                            persistent-hint
                                            v-model="menu_id"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            readonly
                                        >
                                        </v-text-field>
                                    </v-col>
                                      <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Menu Caption<strong style="color:red;">*</strong><span></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="Menu Caption"
                                            persistent-hint
                                            v-model="menu_caption"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                      <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Note <strong style="color:red;">*</strong><span></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="Note"
                                            persistent-hint
                                            v-model="note1"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                      <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Note 2</h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="Note 2"
                                            persistent-hint
                                            v-model="note2"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                      <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Route Path</h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="Route Path"
                                            persistent-hint
                                            v-model="route_path"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Route Web</h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="Route Web"
                                            persistent-hint
                                            v-model="route_web"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="3" md="4">
                                        <h6 class="blue-lcd mb-1">Status <span class="red--text"><strong>* </strong></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="status"
                                            :items="statuses"
                                            item-value="value"
                                            item-text="name"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        ></v-autocomplete> 
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions class="text-center">
                            <v-row justify="center">
                                <v-col cols="12" xs="12" sm="3" md="3">
                                    <v-btn block class="rounded-l mr-2" color="#fff" @click="[dialogedit = false, clear()]">Cancel</v-btn>
                                </v-col>
                                <v-col cols="12" xs="12" sm="3" md="3">
                                    <v-btn block class="rounded-l text-white" color="#20bf6b" @click="updateMenuItem()">Save</v-btn>
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
                            <v-row class="mb-0">
                                  <v-col class="col-12" sm="2" md="4">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.79279 17.7955C5.13043 16.3874 6.39754 15.3409 7.90909 15.3409C9.67891 15.3409 11.1136 16.7756 11.1136 18.5455C11.1136 20.3153 9.67891 21.75 7.90909 21.75C6.39754 21.75 5.13043 20.7035 4.79279 19.2955H3C2.58579 19.2955 2.25 18.9597 2.25 18.5455C2.25 18.1312 2.58579 17.7955 3 17.7955H4.79279ZM11.3382 11.25C11.6759 9.84199 12.943 8.79545 14.4545 8.79545C16.2244 8.79545 17.6591 10.2302 17.6591 12C17.6591 13.7698 16.2244 15.2045 14.4545 15.2045C12.943 15.2045 11.6759 14.158 11.3382 12.75H3C2.58579 12.75 2.25 12.4142 2.25 12C2.25 11.5858 2.58579 11.25 3 11.25H11.3382ZM4.79279 4.70455C5.13043 3.29653 6.39754 2.25 7.90909 2.25C9.67891 2.25 11.1136 3.68472 11.1136 5.45455C11.1136 7.22437 9.67891 8.65909 7.90909 8.65909C6.39754 8.65909 5.13043 7.61256 4.79279 6.20455H3C2.58579 6.20455 2.25 5.86876 2.25 5.45455C2.25 5.04033 2.58579 4.70455 3 4.70455H4.79279ZM13.6364 6.20455C13.2222 6.20455 12.8864 5.86876 12.8864 5.45455C12.8864 5.04033 13.2222 4.70455 13.6364 4.70455H21C21.4142 4.70455 21.75 5.04033 21.75 5.45455C21.75 5.86876 21.4142 6.20455 21 6.20455H13.6364ZM20.1818 12.75C19.7676 12.75 19.4318 12.4142 19.4318 12C19.4318 11.5858 19.7676 11.25 20.1818 11.25H21C21.4142 11.25 21.75 11.5858 21.75 12C21.75 12.4142 21.4142 12.75 21 12.75H20.1818ZM13.6364 19.2955C13.2222 19.2955 12.8864 18.9597 12.8864 18.5455C12.8864 18.1312 13.2222 17.7955 13.6364 17.7955H21C21.4142 17.7955 21.75 18.1312 21.75 18.5455C21.75 18.9597 21.4142 19.2955 21 19.2955H13.6364ZM7.90909 7.15909C8.85049 7.15909 9.61364 6.39594 9.61364 5.45455C9.61364 4.51315 8.85049 3.75 7.90909 3.75C6.9677 3.75 6.20455 4.51315 6.20455 5.45455C6.20455 6.39594 6.9677 7.15909 7.90909 7.15909ZM14.4545 13.7045C15.3959 13.7045 16.1591 12.9414 16.1591 12C16.1591 11.0586 15.3959 10.2955 14.4545 10.2955C13.5132 10.2955 12.75 11.0586 12.75 12C12.75 12.9414 13.5132 13.7045 14.4545 13.7045ZM7.90909 20.25C8.85049 20.25 9.61364 19.4868 9.61364 18.5455C9.61364 17.6041 8.85049 16.8409 7.90909 16.8409C6.9677 16.8409 6.20455 17.6041 6.20455 18.5455C6.20455 19.4868 6.9677 20.25 7.90909 20.25Z" fill="#0F7AAE"></path></svg>
                                  <span>Detail Menu Item</span>
                                
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
                                            v-model="entity"
                                            :items="entiti"
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
                                            :items="aplikasi"
                                            item-value="appl_id"
                                            item-text="appl_id"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                            @change="(event) => getMenuHeader(event)"
                                        ></v-autocomplete> 
                                    </v-col>
                                        <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Menu Header<strong style="color:red;">*</strong><span></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="menu_header_model"
                                            :items="menu_headers"
                                            item-value="menu_header_id"
                                            item-text="menu_caption"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        ></v-autocomplete> 
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Menu ID<strong style="color:red;">*</strong><span></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="Menu ID"
                                            persistent-hint
                                            v-model="menu_id"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                      <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Menu Caption<strong style="color:red;">*</strong><span></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="Menu Caption"
                                            persistent-hint
                                            v-model="menu_caption"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                      <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Note <strong style="color:red;">*</strong><span></span></h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="Note"
                                            persistent-hint
                                            v-model="note1"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                      <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Note 2</h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="Note 2"
                                            persistent-hint
                                            v-model="note2"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                      <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Route Path</h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="Route Path"
                                            persistent-hint
                                            v-model="route_path"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="6" md="6">
                                        <h6 class="blue-lcd mb-1">Route Web</h6>
                                        <v-text-field
                                            solo
                                            dense
                                            label="Route Web"
                                            persistent-hint
                                            v-model="route_web"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col class="col-12" sm="3" md="4">
                                        <h6 class="blue-lcd mb-1">Status <span class="red--text"><strong>* </strong></span></h6>
                                        <v-autocomplete
                                            dense
                                            solo
                                            clearable
                                            v-model="status"
                                            :items="statuses"
                                            item-value="value"
                                            item-text="name"
                                            class="ma-0 pa-0 border-12"
                                            hide-details=true
                                        ></v-autocomplete> 
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions class="text-center">
                            <v-row justify="center">
                                <v-col cols="12" xs="12" sm="3" md="3">
                                    <v-btn block class="rounded-l mr-2" color="#fff" @click="[dialogdetail = false, clear()]">Cancel</v-btn>
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
import {application} from "../../../backend-api/sec_appl/master"
import {entity} from "../../../backend-api/entity/master" 
import {menu_header} from "../../../backend-api/menu_header/index" 

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
            dialogedit: false,
            dialogdetail:false,
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
                    text: 'Menu Item',
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
                { text: 'Menu Header', value: 'menu_header' , align:'center'},
                { text: 'Seq_id', value: 'seq_id' , align:'center'},
                { text: 'Menu ID', value: 'menu_id' , align:'center'},
                { text: 'Menu Caption', value: 'menu_caption' , align:'center'},
                { text: 'Route Path', value: 'route_path' , align:'center'},
                { text: 'Route Web', value: 'route_web' , align:'center'},
                { text: 'Status', value: 'status' , align:'left'},
                { text: 'Action', value: 'action' , align:'left'},
                
            ],
            Datatable: [],
            entiti:[],
            aplikasi:[],
            options:{},
            entity: {},
            menuheader:{},
            application:{},
            dialog: false,
            dialogfilter: false,
            entity_id: '',
            entity_detail:'',
            note2_detail:'',
            note_detail:'',
            note2_datil:'',
            route_web_detail:'',
            menu_detail:'',
            appl_detail:'',
            sex_id:'',
            menu_id:'',
            status: true,
            route_path:'',
            route_web:'',
            note1:'',
            note2:'',
            menu_caption:'',
            entities: [],
            menu_caption: '',
            acive_flag:'Y',
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
            status: false,
            version: '',
            note: '',
            application: '',
            applications: [],
            menu_header_model: '',
            menu_headers: []
        }
    },
    mounted(){
    this.getIndex()
    this.getEntiti()
    // this.getApk()
    },
    methods: {
        tr_datatable(item) {
            const rowClass = 'tr_datatable'
            return rowClass;
        },
        clear(){
            this.entity = ''
            this.application = ''
            this.menu_header_model = ''
            this.menu_id = ''
            this.menu_caption = ''
            this.route_path = ''
            this.status = ''
            this.route_web = ''
            this.note1 = ''
            this.note2 = ''
        },

        async getApk(event){
            console.log(this.entity);
            if (event === null || event === '') {
                this.application = ''
            } else{
                var respData = await application.fetchApplication(`?entity_id=${this.entity ? this.entity : ''}`, null, false, false, false)
                if (respData.status === 200) {
                    this.aplikasi = respData.data
                }
            }
        },
            
        async getEntiti(){
            var respData = await entity.fetchEntity("", null, false, false, false)
            if (respData.status === 200) {
                this.entiti = respData.data
            }
        },

        async getMenuHeader(event){
            if (event === null || event === '') {
                this.menu_header_model = ''
            } else{
                var respData = await menu_header.fetchMenuHeader(`?entity_id=${this.entity ? this.entity : ''}&appl_id=${this.application ? this.application : ''}`, null, false, false, false)
                if (respData.status === 200) {
                    this.menu_headers = respData.data
                }
            }
        },
            
        async getIndex(){
            this.Datatable = []
            this.$store.dispatch('setOverlay', true)

            await axios.get(`${process.env.VUE_APP_URL}/api/menu?search=${this.search ? this.search : ''}`, { 
                headers: { 
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `Bearer ${this.$store.getters.isTokenUser}`
                } 
            })
            .then(res => {
                this.$store.dispatch('setOverlay', false)
                
                this.Datatable = res.data

            })
        },
        async getFilter(){
            this.dialogfilter = false

            this.$store.dispatch('setOverlay', true)
            
            await axios.get(`${process.env.VUE_APP_URL}/api/menu?entity_id=${this.entity ? this.entity : ''}&appl_id=${this.application ? this.application : ''}&active_flag=${this.status === true ? 'Y' : 'N'}`, { 
                headers: { 
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `Bearer ${this.$store.getters.isTokenUser}`
                } 
            })
            .then(res => {
                this.$store.dispatch('setOverlay', false)
                this.clear()
                this.Datatable = res.data

            })

        },
        
        async Create(){
            this.$store.dispatch('setOverlay', true)

            await axios.post(`${process.env.VUE_APP_URL}/api/menu`, {
                'entity_id': this.entity,
                'appl_id': this.application,
                'menu_header_id': this.menu_header_model,
                'menu_id': this.menu_id,
                'menu_caption': this.menu_caption,
                'route_path': this.route_path,
                'status': this.status,
                'route_web': this.route_web,
                'note1': this.note1,
                'note2': this.note2,
                'status': this.status
            }, { 
                headers: { Authorization: `Bearer ${this.$store.getters.isTokenUser}` } 
            }).then(res => {
                this.$store.dispatch('setOverlay', false)

                this.dialog = false
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
                this.getIndex()
                this.clear()

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
        },
        detail(data){
            this.dialogdetail = true
            this.entity = data.entity_id
            this.getApk()
            this.application = data.appl_id
            this.menu_header_model = data.menu_header_id
            this.getMenuHeader()
            this.menu_id = data.menu_id
            this.menu_caption = data.menu_caption
            this.note1 = data.note1
            this.note2 = data.note2
            this.route_path = data.route_path
            this.route_web = data.route_web
            this.status = data.active_flag
        },
        EditItem(data){
            this.dialogedit = true
            this.sex_id = data.seq_id
            this.entity = data.entity_id
            this.getApk()
            this.application = data.appl_id
            this.menu_header_model = data.menu_header_id
            this.getMenuHeader()
            this.menu_id = data.menu_id
            this.menu_caption = data.menu_caption
            this.note1 = data.note1
            this.note2 = data.note2
            this.route_path = data.route_path
            this.route_web = data.route_web
            this.status = data.active_flag
        },
        async updateMenuItem(data){ 
            this.$store.dispatch('setOverlay', true)   
            await axios.put(`${process.env.VUE_APP_URL}/api/menu/update`, {
                'entity_id':  this.entity,
                'appl_id': this.application,
                'menu_header_id': this.menu_header_model,
                'menu_id' : this.menu_id,
                'menu_caption' : this.menu_caption,
                'note1' : this.note1,
                'note2' : this.note2,
                'status': this.status,
                'seq_id' : this.sex_id,
                'route_path' : this.route_path,
                'route_web' : this.route_web,
                
            }, { 
            headers: { Authorization: `Bearer ${this.$store.getters.isTokenUser}` } 
            }).then(res => {
                this.$store.dispatch('setOverlay', false)
                this.dialogedit = false
                this.clear()
                this.getIndex()
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
                this.$store.dispatch('setOverlay', false)
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
        },

        async updateStatus(menu){
            await axios.put(`${process.env.VUE_APP_URL}/api/menu/updateMenuStatus`, {
                'entity_id': menu.entity_id,
                'appl_id' : menu.appl_id,
                'menu_header_id' : menu.menu_header_id,
                'menu_id' : menu.menu_id,
                'status': menu.active_flag
            }, { 
                headers: { Authorization: `Bearer ${this.$store.getters.isTokenUser}` } 
            }).then(res => {
                this.getIndex()
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

    },
    watch: {
        options: {
            handler () {
                const { page, itemsPerPage } = this.options
                if (this.display === "block") {
                    this.getData(page, itemsPerPage)
                }
            },
            deep: true,
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