<template>
    <v-container fluid class="mt-1 mb-12">
        <v-row>
            <v-col cols="12">
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
            </v-col>
        </v-row>
        <v-row>
            <v-col class="col-6" sm="4" md="4" lg="3">
                <v-hover v-slot="{ hover }">
                    <v-card
                        class="mx-auto"
                        color="#A27842"
                        max-width="450"
                        :height="cardHeight"
                        tile        
                        to="/admin/datastore/user-management/entity"
                    >
                        <v-expand-transition mode="in-out">
                            <v-container class="fill-height" v-if="!hover">
                                <v-row align="center" justify="center">
                                    <v-col class="col-6" sm="4" md="4">
                                        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 121 119" aria-hidden="true"><g id="Data-Store" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="2500" transform="translate(-162.000000, -625.000000)"><g id="currency_data-copy-2" transform="translate(70.000000, 556.000000)"><g id="Stacked-Group" transform="translate(55.885417, 68.000000)"><g id="currency_data_icon-copy-2" transform="translate(37.000000, 0.000000)"><g id="Rectangle-4"></g><g id="office-block" mask="url(#mask-2)"><g transform="translate(0.000000, 1.000000)"><rect id="Rectangle-path" fill="#FFFFFF" fill-rule="nonzero" x="68.9366667" y="0.0312121212" width="35.2224242" height="15.3584848"></rect><g id="Group" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(7.575758, 15.151515)"><polygon id="Shape" fill-rule="nonzero" points="44.3175758 93.7209091 0.103333333 93.7209091 0.103333333 26.4687879 44.3175758 11.6590909"></polygon><rect id="Rectangle-path" fill-rule="nonzero" x="53.1136364" y="0.238181818" width="51.6975758" height="93.4827273"></rect></g><g id="Group" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(20.000000, 85.151515)"><rect id="Rectangle-path" fill="#FFFFFF" fill-rule="nonzero" x="56.8118182" y="0.291515152" width="19.1" height="23.41"></rect><rect id="Rectangle-path" fill="#FFFFFF" fill-rule="nonzero" x="0.236363636" y="0.291515152" width="19.1" height="23.41"></rect></g><rect id="Rectangle-path" fill="#796F60" fill-rule="nonzero" x="1.88060606" y="108.872424" width="116.148182" height="7.3069697"></rect><path d="M114.091212,106.991818 L114.091212,13.5090909 L58.8281818,13.5090909 L58.8281818,106.991818 L53.950303,106.991818 L53.950303,24.3815152 L5.79848485,40.1121212 L5.79848485,106.991818 L0,106.991818 L0,118.040606 L119.889697,118.040606 L119.889697,106.991818 L114.091212,106.991818 Z M62.57,17.270303 L110.526061,17.270303 L110.526061,106.991818 L62.57,106.991818 L62.57,17.270303 Z M9.55969697,42.9330303 L50.2084848,29.4551515 L50.2084848,107.011212 L9.55969697,107.011212 L9.55969697,42.9330303 Z M116.148182,114.298788 L3.74151515,114.298788 L3.74151515,110.733333 L116.148182,110.733333 L116.148182,114.298788 Z" id="Shape" fill="#FFFFFF" fill-rule="nonzero"></path><g id="Group" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(13.939394, 28.181818)"><rect id="Rectangle-path" fill="#FFFFFF" fill-rule="nonzero" x="56.8778788" y="0.137272727" width="11.4209091" height="11.4209091"></rect><rect id="Rectangle-path" fill="#FFFFFF" fill-rule="nonzero" x="76.7224242" y="0.137272727" width="11.4209091" height="11.4209091"></rect><rect id="Rectangle-path" fill="#FFFFFF" fill-rule="nonzero" x="56.8778788" y="18.6690909" width="11.4209091" height="11.4209091"></rect><rect id="Rectangle-path" fill="#FFFFFF" fill-rule="nonzero" x="76.7224242" y="18.6690909" width="11.4209091" height="11.4209091"></rect><rect id="Rectangle-path" fill="#FFFFFF" fill-rule="nonzero" x="56.8778788" y="37.4166667" width="11.4209091" height="11.4209091"></rect><rect id="Rectangle-path" fill="#FFFFFF" fill-rule="nonzero" x="76.7224242" y="37.4166667" width="11.4209091" height="11.4209091"></rect><rect id="Rectangle-path" fill="#FFFFFF" fill-rule="nonzero" x="0.106666667" y="19.4330303" width="11.4209091" height="11.4209091"></rect><rect id="Rectangle-path" fill="#FFFFFF" fill-rule="nonzero" x="20.1469697" y="19.4330303" width="11.4209091" height="11.4209091"></rect><rect id="Rectangle-path" fill="#FFFFFF" fill-rule="nonzero" x="0.106666667" y="38.1609091" width="11.4209091" height="11.4209091"></rect><rect id="Rectangle-path" fill="#FFFFFF" fill-rule="nonzero" x="20.1469697" y="38.1609091" width="11.4209091" height="11.4209091"></rect></g><g id="Group" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(74.545455, 5.757576)"><rect id="Rectangle-path" fill="#796F60" fill-rule="nonzero" x="0.18969697" y="0.0721212121" width="3.74151515" height="3.56545455"></rect><rect id="Rectangle-path" fill="#796F60" fill-rule="nonzero" x="10.1218182" y="0.0721212121" width="3.74151515" height="3.56545455"></rect><rect id="Rectangle-path" fill="#796F60" fill-rule="nonzero" x="19.8775758" y="0.0721212121" width="3.74151515" height="3.56545455"></rect></g></g></g></g></g></g></g></g></svg>
                                    </v-col>
                                    <v-col cols="12">
                                        <h6 class="text-center text-white">Entity</h6>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expand-transition>
                        <v-expand-transition mode="in-out">
                            <div
                                v-if="hover"
                                class="entity v-card--reveal white--text"
                                style="height: 100%; opacity: 1;"
                            >
                                <v-container class="p-5">
                                    <v-row>
                                        <v-col cols="12">
                                            <h6>Entity</h6>
                                            <p class="mt-4">
                                                Create and Edit Entity Data
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col class="col-6" sm="4" md="4" lg="3">
                <v-hover v-slot="{ hover }">
                    <v-card
                        class="mx-auto"
                        color="#f56b3b"
                        max-width="450"
                        :height="cardHeight"
                        tile
                        to="/admin/datastore/user-management/application"
                    >
                        <v-expand-transition mode="in-out">
                            <v-container class="fill-height" v-if="!hover">
                                <v-row align="center" justify="center">
                                    <v-col class="col-6" sm="4" md="4">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" class="bi bi-journal-check" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                                        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                                        </svg>
                                    </v-col>
                                    <v-col cols="12">
                                        <h6 class="text-center text-white mt-2" style="font-size:0.8rem">Application</h6>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expand-transition>
                        <v-expand-transition mode="in-out">
                            <div
                                v-if="hover"
                                class="application_sec v-card--reveal white--text"
                                style="height: 100%; opacity: 1;"
                            >
                                <v-container class="p-5">
                                    <v-row>
                                        <v-col cols="12">
                                            <h6>Application</h6>
                                            <p class="mt-4">
                                                Create and Edit Application
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col class="col-6" sm="4" md="4" lg="3">
                <v-hover v-slot="{ hover }">
                    <v-card
                        class="mx-auto"
                        color="#e95044"
                        max-width="450"
                        :height="cardHeight"
                        tile
                        to="/admin/datastore/user-management/group-master"
                    >
                        <v-expand-transition mode="in-out">
                            <v-container class="fill-height" v-if="!hover">
                                <v-row align="center" justify="center">
                                    <v-col class="col-6" sm="4" md="4">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" class="bi bi-box-seam" viewBox="0 0 16 16">
                                        <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
                                        </svg>
                                    </v-col>
                                    <v-col cols="12">
                                        <h6 class="text-center text-white mt-2">Group Master</h6>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expand-transition>
                        <v-expand-transition mode="in-out">
                            <div
                                v-if="hover"
                                class="group_master v-card--reveal white--text"
                                style="height: 100%; opacity: 1;"
                            >
                                <v-container class="p-5">
                                    <v-row>
                                        <v-col cols="12">
                                            <h6>Group Master</h6>
                                            <p class="mt-4">
                                                Manage Create and edit Group Master
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col class="col-6" sm="4" md="4" lg="3">
                <v-hover v-slot="{ hover }">
                    <v-card
                        class="mx-auto"
                        color="#54b857"
                        max-width="450"
                        :height="cardHeight"
                        tile
                        to="/admin/datastore/user-management/menu-header"
                    >
                        <v-expand-transition mode="in-out">
                            <v-container class="fill-height" v-if="!hover">
                                <v-row align="center" justify="center">
                                    <v-col class="col-6" sm="4" md="4">
                                        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 98 120" aria-hidden="true"><g id="Data-Store" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="2000-Data-Store" transform="translate(-177.000000, -552.000000)"><g id="menus" transform="translate(70.000000, 154.000000)"><g id="3" transform="translate(0.000000, 330.000000)"><g id="project_data"><g id="Group-2"><g id="Stacked-Group" transform="translate(95.000000, 68.000000)"><g id="project_data_icon"><rect id="Rectangle-4" x="0" y="0" width="120" height="120"></rect><g id="notepad-copy-4" transform="translate(12.000000, 0.000000)" fill-rule="nonzero"><polyline id="Shape" points="73.8272727 8.24727273 95.5721212 8.24727273 95.5721212 118.009091 1.89333333 118.009091 1.89333333 8.24727273 23.6381818 8.24727273"></polyline><rect id="SVGCleanerId_0" fill="#2EA2DB" x="9.39636364" y="21.9209091" width="78.6727273" height="88.6048485"></rect><path d="M66.3439394,16.4945455 L31.1215152,16.4945455 L31.1215152,0 L66.3439394,0 L66.3439394,16.4945455 Z M34.8630303,12.7333333 L62.5827273,12.7333333 L62.5827273,3.74151515 L34.8630303,3.74151515 L34.8630303,12.7333333 Z" id="Shape" fill="#193651"></path><rect id="SVGCleanerId_1" fill="#FFFFFF" x="17.6436364" y="30.3445455" width="15.1821212" height="15.1821212"></rect><rect id="SVGCleanerId_2" fill="#FFFFFF" x="17.6436364" y="58.6324242" width="15.1821212" height="15.1821212"></rect><rect id="SVGCleanerId_3" fill="#FFFFFF" x="17.6436364" y="86.7242424" width="15.1821212" height="15.1821212"></rect><polygon id="Shape" points="66.3439394 8.24727273 66.3439394 16.4945455 31.1215152 16.4945455 31.1215152 8.24727273 1.89333333 8.24727273 1.89333333 118.009091 95.5721212 118.009091 95.5721212 8.24727273"></polygon><rect id="SVGCleanerId_0_1_" fill="#FFFFFF" x="9.39393939" y="21.8181818" width="78.6727273" height="88.6048485"></rect><g id="Group-6" transform="translate(22.424242, 45.454545)" fill="#53B857"><rect id="Rectangle-path" x="0.195184487" y="0.159179582" width="52.047121" height="3.3425005"></rect><rect id="Rectangle-path" x="0.195184487" y="12.7070245" width="52.047121" height="3.3425005"></rect><rect id="Rectangle-path" x="0.195184487" y="25.430021" width="52.047121" height="3.3425005"></rect><rect id="Rectangle-path" x="0.195184487" y="37.9781366" width="27.2835969" height="3.3425005"></rect></g><path d="M31.1215152,0 L31.1215152,16.4945455 L66.3439394,16.4945455 L66.3439394,0 L31.1215152,0 Z M62.6024242,12.7333333 L34.8633333,12.7333333 L34.8633333,3.74151515 L62.5830303,3.74151515 L62.5830303,12.7333333 L62.6024242,12.7333333 Z" id="Shape" fill="#FFFFFF"></path><g id="Group" transform="translate(0.000000, 6.363636)" fill="#FFFFFF"><polygon id="Shape" points="73.8272727 0.00303030303 73.8272727 3.74484848 93.6915152 3.74484848 93.6915152 109.784545 3.77424242 109.784545 3.77424242 3.74484848 23.6381818 3.74484848 23.6381818 0.00303030303 0.0324242424 0.00303030303 0.0324242424 113.526061 97.4330303 113.526061 97.4330303 0.00303030303"></polygon></g></g></g></g></g></g></g></g></g></g></svg>
                                    </v-col>
                                    <v-col cols="12">
                                        <h6 class="text-center text-white mt-2" >Menu Header</h6>   
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expand-transition>
                        <v-expand-transition mode="in-out">
                            <div
                                v-if="hover"
                                class="menu_header v-card--reveal white--text"
                                style="height: 100%; opacity: 1;"
                            >
                                <v-container class="p-5">
                                    <v-row>
                                        <v-col cols="12">
                                            <h6>Menu Header</h6>
                                            <p class="mt-4">
                                                Manage Menu Header
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col class="col-6" sm="4" md="4" lg="3">
                <v-hover v-slot="{ hover }">
                    <v-card
                        class="mx-auto"
                        color="#ee69a7"
                        max-width="450"
                        :height="cardHeight"
                        tile
                        to="/admin/datastore/user-management/menu-item"
                    >
                        <v-expand-transition mode="in-out">
                            <v-container class="fill-height" v-if="!hover">
                                <v-row align="center" justify="center">
                                    <v-col class="col-6" sm="4" md="4">
                                        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 111 120" aria-hidden="true"><g id="Data-Store" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="2000-Data-Store" transform="translate(-830.000000, -882.000000)"><g id="menus" transform="translate(70.000000, 154.000000)"><g id="2" transform="translate(0.000000, 660.000000)"><g id="measurement_unit" transform="translate(660.000000, 0.000000)"><g id="Group-2"><g id="Stacked-Group" transform="translate(95.000000, 68.000000)"><g id="other_data_icon"><g id="Rectangle-4"></g><g id="copy" mask="url(#mask-2)"><g transform="translate(5.000000, 0.000000)"><polygon id="Shape" fill="#F369A7" fill-rule="nonzero" points="108.302424 16.2987879 108.302424 118.009091 16.3281818 118.009091 16.3281818 103.590909 1.89030303 103.590909 1.89030303 1.88060606 93.8648485 1.88060606 93.8648485 16.2987879"></polygon><path d="M95.7454545,14.4181818 L95.7454545,0 L0.0293939394,0 L0.0293939394,105.471818 L14.4475758,105.471818 L14.4475758,119.89 L110.163636,119.89 L110.163636,14.4181818 L95.7454545,14.4181818 Z M3.77090909,3.74151515 L92.0036364,3.74151515 L92.0036364,101.710303 L3.77090909,101.710303 L3.77090909,3.74151515 Z M106.421818,116.148182 L18.1890909,116.148182 L18.1890909,105.471818 L95.7454545,105.471818 L95.7454545,18.1793939 L106.421818,18.1793939 L106.421818,116.148182 Z" id="Shape" fill="#FFFFFF" fill-rule="nonzero"></path><rect id="Rectangle-path" fill="#FFFFFF" fill-rule="nonzero" x="9.39333333" y="9.36393939" width="76.9881818" height="86.7242424"></rect><g id="Group" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(20.909091, 30.000000)"><rect id="Rectangle-path" fill="#F369A7" fill-rule="nonzero" x="0.277272727" y="23.5781818" width="53.3824242" height="3.74151515"></rect><rect id="Rectangle-path" fill="#F369A7" fill-rule="nonzero" x="0.277272727" y="14.2142424" width="53.3824242" height="3.74151515"></rect><rect id="Rectangle-path" fill="#F369A7" fill-rule="nonzero" x="0.277272727" y="32.9421212" width="53.3824242" height="3.74151515"></rect><rect id="Rectangle-path" fill="#F369A7" fill-rule="nonzero" x="0.277272727" y="42.129697" width="32.0293939" height="3.74151515"></rect><rect id="Rectangle-path" fill="#F369A7" fill-rule="nonzero" x="0.277272727" y="0.168484848" width="3.74151515" height="3.74151515"></rect><rect id="Rectangle-path" fill="#F369A7" fill-rule="nonzero" x="8.8969697" y="0.168484848" width="3.74151515" height="3.74151515"></rect><rect id="Rectangle-path" fill="#F369A7" fill-rule="nonzero" x="17.5163636" y="0.168484848" width="3.74151515" height="3.74151515"></rect></g></g></g></g></g></g></g></g></g></g></g></svg>
                                    </v-col>
                                    <v-col cols="12">
                                        <h6 class="text-center text-white mt-2" >Menu Item</h6>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expand-transition>
                        <v-expand-transition mode="in-out">
                            <div
                                v-if="hover"
                                class="menu_item v-card--reveal white--text"
                                style="height: 100%; opacity: 1;"
                            >
                                <v-container class="p-5">
                                    <v-row>
                                        <v-col cols="12">
                                            <h6>Menu Item</h6>
                                            <p class="mt-4">
                                                Manage Menu Item
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col class="col-6" sm="4" md="4" lg="3">
                <v-hover v-slot="{ hover }">
                    <v-card
                        class="mx-auto"
                        color="#f5aa3b"
                        max-width="450"
                        :height="cardHeight"
                        tile
                        to="/admin/datastore/user-management/group-right"
                    >
                        <v-expand-transition mode="in-out">
                            <v-container class="fill-height" v-if="!hover">
                                <v-row align="center" justify="center">
                                    <v-col class="col-6" sm="4" md="4">
                                        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 124 123" aria-hidden="true"><g id="Data-Store" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="2000-Data-Store" transform="translate(-1152.000000, -219.000000)" fill-rule="nonzero"><g id="menus" transform="translate(70.000000, 154.000000)"><g id="1"><g id="account_data" transform="translate(990.000000, 0.000000)"><g id="Stacked-Group" transform="translate(76.000000, 65.000000)"><g id="department_data_icon" transform="translate(18.000000, 0.000000)"><g id="Layer_1"><g><path d="M59.9448485,43.9219493 C47.3878788,43.9219493 37.0836364,34.0192708 37.0836364,21.9516556 C37.0836364,9.8840403 47.3878788,0 59.9448485,0 C72.5018182,0 82.8060606,9.90267844 82.8060606,21.9702937 C82.8060606,34.037909 72.5021212,43.9219493 59.9448485,43.9219493 Z" id="Shape" fill="#FFFFFF"></path><g id="Group" transform="translate(41.515152, 12.819884)" fill="#F5AA3B"><ellipse id="Oval" cx="18.429697" cy="9.35780397" rx="9.73606061" ry="9.35663909"></ellipse><path d="M29.6742424,18.902863 L7.18515152,18.902863 C3.24757576,18.902863 0.0739393939,21.9714586 0.0739393939,25.7369459 L0.0739393939,35.6396244 C5.12818182,39.4237499 11.4948485,41.5886867 18.429697,41.5886867 C25.3645455,41.5886867 31.7312121,39.4237499 36.7854545,35.6396244 L36.7854545,25.7369459 C36.7854545,21.9714586 33.6118182,18.902863 29.6742424,18.902863 Z" id="Shape"></path></g><path d="M91.5387515,100.417934 C91.0797206,100.712486 90.6694817,101.206107 90.4648763,101.702566 L89.3447134,104.420555 L59.9438997,76.0869238 L31.8512802,103.122839 L26.3393248,97.8256889 L56.0836364,69.2207876 L56.0836364,57.8675151 C50.0533242,57.201448 44.3533321,54.9834685 39.2896415,51.3335563 L37.7278788,50.1881811 L37.7278788,38.5565392 C37.7278788,33.0389658 42.2605387,28.4047593 47.8251297,27.9514858 C46.9727744,26.2385232 46.5239394,24.330933 46.5239394,22.3468879 C46.5239394,15.1055875 52.6867655,9.18293132 60.1406061,9.18293132 C67.5944466,9.18293132 73.7572727,15.1055875 73.7572727,22.3468879 C73.7572727,24.2929526 73.2603551,26.2171655 72.3678371,27.973126 C77.9399603,28.5257376 82.1812121,32.964619 82.1812121,38.5565392 L82.1812121,50.1881811 L81.3639949,50.787517 L80.6061156,51.3432509 C75.5542758,54.9845453 69.8553877,57.2017988 63.8254545,57.8675891 L63.8254545,69.2219776 L96.198675,100.417934 L91.5387515,100.417934 Z M59.9448485,16.6283668 C56.7677659,16.6283668 54.069697,19.3012328 54.069697,22.3661084 C54.069697,25.3851059 56.7223254,27.9343595 59.9448485,27.9343595 C63.1219311,27.9343595 65.82,25.2614934 65.82,22.1966178 C65.82,19.1776203 63.1673716,16.6283668 59.9448485,16.6283668 Z M45.47,46.2931167 C49.8719503,49.004262 54.8024907,50.4317631 59.9448485,50.4317631 C65.0846627,50.4317631 70.0176766,49.0057339 74.4590909,46.2887298 L74.4590909,38.5568304 C74.4590909,36.9762527 72.9309551,35.5114268 71.2090909,35.5114268 L48.72,35.5114268 C46.994077,35.5114268 45.47,36.9798664 45.47,38.5568304 L45.47,46.2931167 Z" id="Shape" stroke="#F5AA3B" stroke-width="4" fill="#FFFFFF"></path><path d="M97.0284848,113.786738 C84.4715152,113.786738 74.1672727,103.884059 74.1672727,91.816444 C74.1672727,79.7488287 84.4912121,69.8461503 97.0284848,69.8461503 C109.565758,69.8461503 119.889697,79.5793381 119.889697,91.816444 C119.889697,103.884059 109.585455,113.786738 97.0284848,113.786738 Z" id="Shape" fill="#FFFFFF"></path><g id="Group" transform="translate(78.484848, 82.421700)" fill="#F5AA3B"><ellipse id="Oval" cx="18.5436364" cy="9.60213838" rx="9.73606061" ry="9.35663909"></ellipse><path d="M29.7881818,18.9777068 L18.5436364,18.9777068 L7.31878788,18.9777068 C3.38121212,18.9777068 0.207575758,22.0463024 0.207575758,25.8117897 L0.207575758,35.7144682 L36.8993939,35.7144682 L36.8993939,25.8117897 C36.8993939,22.027373 33.7257576,18.9777068 29.7881818,18.9777068 Z" id="Shape"></path></g><g id="Group" transform="translate(48.787879, 41.068320)" fill="#FFFFFF"><path d="M60.6623882,56.5841297 C66.1063522,57.1454936 70.4102696,61.5556732 70.8419413,67.0072996 L70.8481818,67.1651699 L70.8481818,79.0678483 L63.1066667,79.0678483 L63.1066667,67.1651699 C63.1066667,65.5845922 61.5785309,64.1197663 59.8566667,64.1197663 L37.3872727,64.1197663 C35.6613497,64.1197663 34.1372727,65.5882058 34.1372727,67.1651699 L34.1372727,79.0678483 L26.3957576,79.0678483 L26.3957576,67.1651699 C26.3957576,61.765337 30.7370349,57.2115726 36.1382207,56.5948134 C35.2746181,54.8729297 34.819697,52.9529699 34.819697,50.9555185 C34.819697,43.7142182 40.9825231,37.791562 48.4363636,37.791562 C55.8902042,37.791562 62.0530303,43.7142182 62.0530303,50.9555185 C62.0530303,52.90246 61.5556648,54.8275298 60.6623882,56.5841297 Z M42.3851515,50.9555185 C42.3851515,53.974516 45.0377799,56.5237695 48.260303,56.5237695 C51.4828261,56.5237695 54.1354545,53.974516 54.1354545,50.9555185 C54.1354545,47.936521 51.4828261,45.3872675 48.260303,45.3872675 C45.0377799,45.3872675 42.3851515,47.936521 42.3851515,50.9555185 Z" id="Shape" stroke="#F5AA3B" stroke-width="4"></path><rect id="Rectangle-path" x="37.5642424" y="69.8758548" width="3.74151515" height="3.7841255"></rect><rect id="Rectangle-path" x="46.379697" y="69.8758548" width="3.74151515" height="3.7841255"></rect><rect id="Rectangle-path" x="55.3712121" y="69.8758548" width="3.74151515" height="3.7841255"></rect><rect id="Rectangle-path" x="0.284545455" y="0.0110663975" width="3.74151515" height="3.7841255"></rect><rect id="Rectangle-path" x="9.27636364" y="0.0110663975" width="3.74151515" height="3.7841255"></rect><rect id="Rectangle-path" x="18.2681818" y="0.0110663975" width="3.74151515" height="3.7841255"></rect></g><path d="M22.8612121,113.786738 C10.3042424,113.786738 0,103.884059 0,91.816444 C0,79.7488287 10.3042424,69.8461503 22.8612121,69.8461503 C35.4181818,69.8461503 45.7224242,79.7488287 45.7224242,91.816444 C45.7224242,103.884059 35.3987879,113.786738 22.8612121,113.786738 Z" id="Shape" fill="#FFFFFF"></path><ellipse id="Oval" fill="#F5AA3B" cx="22.8612121" cy="92.0238388" rx="9.73606061" ry="9.35663909"></ellipse><path d="M34.0863636,101.399407 L22.8418182,101.399407 L11.6166667,101.399407 C7.67909091,101.399407 4.50545455,104.468003 4.50545455,108.23349 L4.50545455,118.136169 L41.2166667,118.136169 L41.2166667,108.23349 C41.2169697,104.449073 38.0239394,101.399407 34.0863636,101.399407 Z" id="SVGCleanerId_0" fill="#F5AA3B"></path><g id="Group" transform="translate(2.424242, 80.674374)" fill="#FFFFFF"><path d="M32.8380631,16.9806211 C38.2734819,17.5642841 42.6540346,22.134831 42.6533333,27.5591157 L42.6533333,39.4617941 L34.9118182,39.4617941 L34.9118182,27.5591157 C34.9118182,25.978538 33.3836824,24.5137121 31.6618182,24.5137121 L9.19242424,24.5137121 C7.46650126,24.5137121 5.94242424,25.9821516 5.94242424,27.5591157 L5.94242424,39.4617941 L-1.79939394,39.4617941 L-1.79939394,27.5591157 C-1.79939394,22.0415422 2.73326596,17.4073358 8.29785698,16.9540623 C7.44550169,15.2410996 6.99666667,13.3335094 6.99666667,11.3494643 C6.99666667,4.10816399 13.1594928,-1.81449223 20.6133333,-1.81449223 C28.0671739,-1.81449223 34.23,4.10816399 34.23,11.3494643 C34.23,13.2973463 33.7321539,15.2233355 32.8380631,16.9806211 Z M14.5621212,11.3494643 C14.5621212,14.368654 17.2143389,16.9177153 20.4369697,16.9177153 C23.6597599,16.9177153 26.3124242,14.3684948 26.3124242,11.3494643 C26.3124242,8.33046681 23.6597958,5.78121329 20.4372727,5.78121329 C17.2147496,5.78121329 14.5621212,8.33046681 14.5621212,11.3494643 Z" id="Shape" stroke="#F5AA3B" stroke-width="4"></path><rect id="Rectangle-path" x="9.56484848" y="30.2698006" width="3.74151515" height="3.7841255"></rect><rect id="Rectangle-path" x="18.5563636" y="30.2698006" width="3.74151515" height="3.7841255"></rect><rect id="Rectangle-path" x="27.3524242" y="30.2698006" width="3.74151515" height="3.7841255"></rect></g></g></g></g></g></g></g></g></g></g></svg>
                                    </v-col>
                                    <v-col cols="12">
                                        <h6 class="text-center text-white mt-2" >Group Right</h6>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expand-transition>
                        <v-expand-transition mode="in-out">
                            <div
                                v-if="hover"
                                class="group_right v-card--reveal white--text"
                                style="height: 100%; opacity: 1;"
                            >
                                <v-container class="p-5">
                                    <v-row>
                                        <v-col cols="12">
                                            <h6>Group Right</h6>
                                            <p class="mt-4">
                                                Manage your Group Right
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col class="col-6" sm="4" md="4" lg="3">
                <v-hover v-slot="{ hover }">
                    <v-card
                        class="mx-auto"
                        color="#4bb4c6"
                        max-width="450"
                        :height="cardHeight"
                        tile
                        to="/admin/datastore/user-management/variable" 
                    >
                        <v-expand-transition mode="in-out">
                            <v-container class="fill-height" v-if="!hover">
                                <v-row align="center" justify="center">
                                    <v-col class="col-6" sm="4" md="4">
                                        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 120 119" aria-hidden="true"><g id="Data-Store" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="2000-Data-Store" transform="translate(-495.000000, -883.000000)"><g id="menus" transform="translate(70.000000, 154.000000)"><g id="2" transform="translate(0.000000, 660.000000)"><g id="fixed_asset" transform="translate(330.000000, 0.000000)"><g id="Group-2"><g id="Stacked-Group" transform="translate(95.000000, 68.000000)"><g id="fixed_asset_icon"><rect id="Rectangle-4" x="0" y="0" width="120" height="120"></rect><g id="office-block" transform="translate(0.000000, 1.000000)" fill-rule="nonzero"><rect id="Rectangle-path" fill="#FFFFFF" x="68.9366667" y="0.0312121212" width="35.2224242" height="15.3584848"></rect><g id="Group" transform="translate(7.575758, 15.151515)" fill="#2BB4C6"><polygon id="Shape" points="44.3175758 93.7209091 0.103333333 93.7209091 0.103333333 26.4687879 44.3175758 11.6590909"></polygon><rect id="Rectangle-path" x="53.1136364" y="0.238181818" width="51.6975758" height="93.4827273"></rect></g><g id="Group" transform="translate(20.000000, 85.151515)" fill="#FFFFFF"><rect id="Rectangle-path" x="56.8118182" y="0.291515152" width="19.1" height="23.41"></rect><rect id="Rectangle-path" x="0.236363636" y="0.291515152" width="19.1" height="23.41"></rect></g><rect id="Rectangle-path" fill="#2BB4C6" x="1.88060606" y="108.872424" width="116.148182" height="7.3069697"></rect><path d="M114.091212,106.991818 L114.091212,13.5090909 L58.8281818,13.5090909 L58.8281818,106.991818 L53.950303,106.991818 L53.950303,24.3815152 L5.79848485,40.1121212 L5.79848485,106.991818 L0,106.991818 L0,118.040606 L119.889697,118.040606 L119.889697,106.991818 L114.091212,106.991818 Z M62.57,17.270303 L110.526061,17.270303 L110.526061,106.991818 L62.57,106.991818 L62.57,17.270303 Z M9.55969697,42.9330303 L50.2084848,29.4551515 L50.2084848,107.011212 L9.55969697,107.011212 L9.55969697,42.9330303 Z M116.148182,114.298788 L3.74151515,114.298788 L3.74151515,110.733333 L116.148182,110.733333 L116.148182,114.298788 Z" id="Shape" fill="#FFFFFF"></path><g id="Group" transform="translate(13.939394, 28.181818)" fill="#FFFFFF"><rect id="Rectangle-path" x="56.8778788" y="0.137272727" width="11.4209091" height="11.4209091"></rect><rect id="Rectangle-path" x="76.7224242" y="0.137272727" width="11.4209091" height="11.4209091"></rect><rect id="Rectangle-path" x="56.8778788" y="18.6690909" width="11.4209091" height="11.4209091"></rect><rect id="Rectangle-path" x="76.7224242" y="18.6690909" width="11.4209091" height="11.4209091"></rect><rect id="Rectangle-path" x="56.8778788" y="37.4166667" width="11.4209091" height="11.4209091"></rect><rect id="Rectangle-path" x="76.7224242" y="37.4166667" width="11.4209091" height="11.4209091"></rect><rect id="Rectangle-path" x="0.106666667" y="19.4330303" width="11.4209091" height="11.4209091"></rect><rect id="Rectangle-path" x="20.1469697" y="19.4330303" width="11.4209091" height="11.4209091"></rect><rect id="Rectangle-path" x="0.106666667" y="38.1609091" width="11.4209091" height="11.4209091"></rect><rect id="Rectangle-path" x="20.1469697" y="38.1609091" width="11.4209091" height="11.4209091"></rect></g><g id="Group" transform="translate(74.545455, 5.757576)" fill="#2BB4C6"><rect id="Rectangle-path" x="0.18969697" y="0.0721212121" width="3.74151515" height="3.56545455"></rect><rect id="Rectangle-path" x="10.1218182" y="0.0721212121" width="3.74151515" height="3.56545455"></rect><rect id="Rectangle-path" x="19.8775758" y="0.0721212121" width="3.74151515" height="3.56545455"></rect></g></g></g></g></g></g></g></g></g></g></svg>
                                    </v-col>
                                    <v-col cols="12">
                                        <h6 class="text-center text-white mt-2" >Env Variable</h6>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expand-transition>
                        <v-expand-transition mode="in-out">
                            <div
                                v-if="hover"
                                class="env_var v-card--reveal white--text"
                                style="height: 100%; opacity: 1;"
                            >
                                <v-container class="p-5">
                                    <v-row>
                                        <v-col cols="12">
                                            <h6>Env Variable</h6>
                                            <p class="mt-4">
                                                Manage and Create New Env Variable
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-hover>
            </v-col>            
            <v-col class="col-6" sm="4" md="4" lg="3">
                <v-hover v-slot="{ hover }">
                    <v-card
                        class="mx-auto"
                        color="#0078d4"
                        max-width="450"
                        :height="cardHeight"
                        tile
                        to="/admin/datastore/user-management/configuration" 
                    >
                        <v-expand-transition mode="in-out">
                            <v-container class="fill-height" v-if="!hover">
                                <v-row align="center" justify="center">
                                    <v-col class="col-6" sm="4" md="4">
                                        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 98 120" aria-hidden="true"><g id="Data-Store" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="2000-Data-Store" transform="translate(-505.000000, -222.000000)"><g id="menus" transform="translate(70.000000, 154.000000)"><g id="1"><g id="account_data" transform="translate(330.000000, 0.000000)"><g id="Stacked-Group" transform="translate(92.000000, 68.000000)"><g id="account_data_icon" transform="translate(2.000000, 0.000000)"><rect id="Rectangle-4" x="0" y="0" width="120" height="120"></rect><g transform="translate(11.294118, 0.000000)" id="Layer_1"><g><polygon id="Shape" fill-rule="nonzero" points="1.86909091 13.4484848 1.86909091 117.979697 95.5475758 117.979697 95.5475758 13.4484848"></polygon><path d="M9.37181818,20.9512121 L88.0445455,20.9512121 L88.0445455,110.496364 L9.37181818,110.496364 L9.37181818,20.9512121 Z M45.4554545,64.5975758 L45.4554545,45.2817195 L35.3891874,45.2817195 L35.4197969,34.8754235 L17.7160606,34.8754235 L17.7160606,64.5975758 L45.4554545,64.5975758 Z M17.7954545,99.2518182 L17.7954545,102.993333 L79.7972727,102.993333 L79.7972727,99.2518182 L17.7954545,99.2518182 Z M17.7954545,87.0866667 L17.7954545,90.8281818 L79.7972727,90.8281818 L79.7972727,87.0866667 L17.7954545,87.0866667 Z M17.7954545,74.9018182 L17.7954545,78.6433333 L79.7972727,78.6433333 L79.7972727,74.9018182 L17.7954545,74.9018182 Z M57.1318182,34.9972727 L57.1318182,38.7387879 L79.7972727,38.7387879 L79.7972727,34.9972727 L57.1318182,34.9972727 Z M57.1318182,47.1821212 L57.1318182,50.9236364 L79.7972727,50.9236364 L79.7972727,47.1821212 L57.1318182,47.1821212 Z M57.1318182,59.1712121 L57.1318182,62.9127273 L79.7972727,62.9127273 L79.7972727,59.1712121 L57.1318182,59.1712121 Z" id="Combined-Shape" fill="#FFFFFF" fill-rule="nonzero"></path><path d="M57.1318182,10.0790909 C56.9360606,6.14151515 54.1345455,2.96787879 50.3930303,2.20393939 C49.8248485,2.00818182 49.2763636,2.00818182 48.7081818,2.00818182 C48.14,2.00818182 47.5915152,2.00818182 47.0233333,2.20393939 C43.2818182,2.94848485 40.4606061,6.14151515 40.2845455,10.0790909 L27.9233333,10.0790909 L27.9233333,23.9487879 L69.5124242,23.9487879 L69.5124242,10.0790909 L57.1318182,10.0790909 Z" id="Shape" fill-rule="nonzero"></path><path d="M71.3736364,11.5872727 L71.3736364,8.02212121 L58.640303,8.02212121 C57.7,4.08454545 54.7027273,0.910909091 50.5887879,0.146969697 C49.2763636,-0.0487878788 47.9636364,-0.0487878788 46.6512121,0.146969697 C42.5372727,0.891515152 39.54,4.08454545 38.599697,8.02212121 L25.8663636,8.02212121 L25.8663636,11.5875758 L0.00787878788,11.5875758 L0.00787878788,119.860606 L97.4281818,119.860606 L97.4281818,11.5872727 L71.3736364,11.5872727 Z M42.1457576,11.7636364 L42.1457576,9.8830303 C42.3415152,6.88575758 44.3984848,4.26060606 47.3957576,3.69272727 C48.140303,3.4969697 49.0806061,3.4969697 49.8248485,3.69272727 C52.8221212,4.26090909 54.8790909,6.88575758 55.0748485,9.8830303 L55.0748485,11.7636364 L67.4360606,11.7636364 L67.4360606,21.8721212 L29.7845455,21.8721212 L29.5887879,11.7636364 C29.5884848,11.7636364 42.1457576,11.7636364 42.1457576,11.7636364 Z M93.6669697,116.118788 L3.74969697,116.118788 L3.74969697,15.3290909 L26.0430303,15.3290909 L26.0430303,25.6333333 L71.3739394,25.6333333 L71.3739394,15.3290909 L93.6672727,15.3290909 L93.6672727,116.118788 L93.6669697,116.118788 Z" id="Shape" fill="#FFFFFF" fill-rule="nonzero"></path><g id="Group" transform="translate(18.484848, 31.818182)"></g><g id="Group" transform="translate(17.575758, 34.848485)"></g></g></g></g></g></g></g></g></g></g></svg>
                                    </v-col>
                                    <v-col cols="12">
                                        <h6 class="text-center text-white mt-2" >Env Configuration</h6>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expand-transition>
                        <v-expand-transition mode="in-out">
                            <div
                                v-if="hover"
                                class="env_conf v-card--reveal white--text"
                                style="height: 100%; opacity: 1;"
                            >
                                <v-container class="p-5">
                                    <v-row>
                                        <v-col cols="12">
                                            <h6>Env Configuration</h6>
                                            <p class="mt-4">
                                                Manage Env Configuration
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col class="col-6" sm="4" md="4" lg="3">
                <v-hover v-slot="{ hover }">
                    <v-card
                        class="mx-auto"
                        color="#2eb3ec"
                        max-width="450"
                        :height="cardHeight"
                        tile
                        to="/admin/datastore/user-management/users"
                    >
                        <v-expand-transition mode="in-out">
                            <v-container class="fill-height" v-if="!hover">
                                <v-row align="center" justify="center">
                                    <v-col class="col-6" sm="4" md="4">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" class="bi bi-person-lines-fill my-auto" viewBox="0 0 16 16">
                                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
                                        </svg>
                                    </v-col>
                                    <v-col cols="12">
                                        <h6 class="text-center text-white">Users</h6>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expand-transition>
                        <v-expand-transition mode="in-out">
                            <div
                                v-if="hover"
                                class="users v-card--reveal white--text"
                                style="height: 100%; opacity: 1;"
                            >
                                <v-container class="p-5">
                                    <v-row>
                                        <v-col cols="12">
                                            <h6>Users</h6>
                                            <p class="mt-4">
                                                Create and Edit User Data
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col class="col-6" sm="4" md="4" lg="3">
                <v-hover v-slot="{ hover }">
                    <v-card
                        class="mx-auto"
                        color="#0f5f81"
                        max-width="450"
                        :height="cardHeight"
                        tile
                        to="/admin/datastore/user-management/user-group"
                    >
                        <v-expand-transition mode="in-out">
                            <v-container class="fill-height" v-if="!hover">
                                <v-row align="center" justify="center">
                                    <v-col class="col-6" sm="4" md="4">
                                        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 121 114" aria-hidden="true"><g id="Data-Store" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="2500" transform="translate(-492.000000, -296.000000)"><g id="1" transform="translate(70.000000, 225.000000)"><g id="currency_data-copy-2" transform="translate(330.000000, 0.000000)"><g id="Stacked-Group" transform="translate(69.885417, 68.000000)"><g id="currency_data_icon-copy-2" transform="translate(23.000000, 0.000000)"><g id="Rectangle-4"></g><g id="id-card" mask="url(#mask-2)"><g transform="translate(0.000000, 3.000000)"><g id="Group" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(1.818182, 1.818182)"><rect id="Rectangle-path" fill-rule="nonzero" x="0.0624242424" y="26.78" width="116.148182" height="82.610303"></rect><path d="M65.629697,7.67969697 C65.629697,3.54636364 62.279697,0.176666667 58.1266667,0.176666667 C53.9933333,0.176666667 50.6236364,3.52666667 50.6236364,7.67969697 L40.3193939,7.67969697 L40.3193939,26.779697 L75.7181818,26.779697 L75.7181818,7.67969697 L65.629697,7.67969697 Z" id="Shape" fill-rule="nonzero"></path></g><g id="Group" stroke-width="1" fill="none" fill-rule="evenodd"><polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="85.2354545 26.7369697 85.2354545 30.4787879 116.148182 30.4787879 116.148182 109.347273 3.74151515 109.347273 3.74151515 30.4787879 34.6545455 30.4787879 34.6545455 26.7369697 0 26.7369697 0 113.089091 119.889697 113.089091 119.889697 26.7369697"></polygon><path d="M79.6130303,7.61727273 L69.3087879,7.61727273 C68.3684848,3.30757576 64.6266667,0.133939394 60.1212121,0.133939394 C55.6157576,0.133939394 51.6975758,3.3269697 50.9336364,7.61727273 L40.6293939,7.61727273 L40.6293939,30.4784848 L79.7893939,30.4784848 L79.7893939,7.61727273 L79.6130303,7.61727273 Z M59.9448485,3.67969697 C63.1378788,3.67969697 65.5672727,6.30484848 65.5672727,9.30212121 C65.5672727,12.2993939 62.9421212,14.9245455 59.9448485,14.9245455 C56.7518182,14.9245455 54.3224242,12.2993939 54.3224242,9.30212121 C54.3224242,6.30484848 56.7518182,3.67969697 59.9448485,3.67969697 Z M75.8715152,26.7369697 L44.0184848,26.7369697 L44.0184848,11.3787879 L50.5812121,11.3787879 C51.5215152,15.6884848 55.2633333,18.8818182 59.7687879,18.8818182 C64.2745455,18.8818182 68.1924242,15.6887879 68.9563636,11.3787879 L75.5190909,11.3787879 L75.5190909,26.7372727 L75.8715152,26.7372727 L75.8715152,26.7369697 Z" id="Shape" fill="#FFFFFF" fill-rule="nonzero"></path></g><rect id="Rectangle-path" fill="#FFFFFF" fill-rule="nonzero" x="14.0460606" y="40.0190909" width="51.8933333" height="59.7490909"></rect><g id="Group" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(19.393939, 45.454545)"><circle id="Oval" fill="#0F5F81" fill-rule="nonzero" cx="20.6869697" cy="11.0590909" r="10.8724242"></circle><path d="M41.1190909,48.9066667 L41.1190909,38.4260606 C41.1190909,34.1163636 37.5536364,30.5509091 33.2439394,30.5509091 L8.14939394,30.5509091 C3.83969697,30.5509091 0.274242424,34.1163636 0.274242424,38.4260606 L0.274242424,48.9066667 L41.1190909,48.9066667 Z" id="Shape" fill="#0F5F81" fill-rule="nonzero"></path></g><g id="Group" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(82.121212, 40.909091)"><rect id="Rectangle-path" fill="#FFFFFF" fill-rule="nonzero" x="0.116969697" y="52.5118182" width="3.74151515" height="3.56545455"></rect><rect id="Rectangle-path" fill="#FFFFFF" fill-rule="nonzero" x="10.0490909" y="52.5118182" width="3.74151515" height="3.56545455"></rect><rect id="Rectangle-path" fill="#FFFFFF" fill-rule="nonzero" x="19.7851515" y="52.5118182" width="3.74151515" height="3.56545455"></rect><rect id="Rectangle-path" fill="#FFFFFF" fill-rule="nonzero" x="0.116969697" y="39.210303" width="23.6057576" height="3.74151515"></rect><rect id="Rectangle-path" fill="#FFFFFF" fill-rule="nonzero" x="0.116969697" y="26.2809091" width="23.6057576" height="3.74151515"></rect><rect id="Rectangle-path" fill="#FFFFFF" fill-rule="nonzero" x="0.116969697" y="13.1754545" width="23.6057576" height="3.74151515"></rect><rect id="Rectangle-path" fill="#FFFFFF" fill-rule="nonzero" x="0.116969697" y="0.0503030303" width="23.6057576" height="3.74151515"></rect></g></g></g></g></g></g></g></g></g></svg>
                                    </v-col>
                                    <v-col cols="12">
                                        <h6 class="text-center text-white">User Group</h6>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expand-transition>
                        <v-expand-transition mode="in-out">
                            <div
                                v-if="hover"
                                class="user_groups v-card--reveal white--text"
                                style="height: 100%; opacity: 1;"
                            >
                                <v-container class="p-5">
                                    <v-row>
                                        <v-col cols="12">
                                            <h6>User Group</h6>
                                            <p class="mt-4">
                                                Create and Edit User Group Data
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-hover>
            </v-col> 
            <v-col class="col-6" sm="4" md="4" lg="3">
                <v-hover v-slot="{ hover }">
                    <v-card
                        class="mx-auto"
                        color="#ea5044"
                        max-width="450"
                        :height="cardHeight"
                        tile
                        to="/admin/datastore/user-management/office"
                    >
                        <v-expand-transition mode="in-out">
                            <v-container class="fill-height" v-if="!hover">
                                <v-row align="center" justify="center">
                                    <v-col class="col-6" sm="4" md="4">
                                        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 121 120" aria-hidden="true"><g id="Cash-&amp;-Bank" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="6000-Cash-&amp;-Bank" transform="translate(-1155.000000, -225.000000)"><g id="menus" transform="translate(70.000000, 157.000000)"><g id="1"><g id="bank_reconciliation" transform="translate(990.000000, 0.000000)"><g id="Stacked-Group" transform="translate(64.000000, 68.000000)"><g id="bank_reconciliation_icon" transform="translate(31.000000, 0.000000)"><rect id="Rectangle-4" x="0" y="0" width="120" height="119.740099"></rect><g fill-rule="nonzero" id="301-bank-1"><g><path d="M109.23303,42.9212121 L118.028788,42.9015152 L118.028788,33.1654545 L59.9645455,2.25272727 L1.90030303,33.1654545 L1.90030303,43.0975758 L10.6960606,43.0778788 L10.6960606,52.0890909 L14.6139394,52.0890909 L14.6336364,99.8490909 L10.6960606,99.8490909 L10.6960606,109.036667 L1.90030303,109.036667 L1.90030303,118.224242 L118.048485,118.224242 L118.048485,109.036667 L109.252727,109.036667 L109.252727,99.8490909 L105.295455,99.8490909 L105.275758,52.0890909 L109.252424,52.0890909 L109.252424,42.9212121 L109.23303,42.9212121 Z M54.7145455,52.0893939 L54.7145455,43.0193939 L65.1951515,42.999697 L65.1951515,52.0893939 L69.1718182,52.0893939 L69.1915152,99.8493939 L65.2148485,99.8493939 L65.2148485,109.03697 L54.7342424,109.03697 L54.7342424,99.8493939 L50.7378788,99.8493939 L50.7181818,52.0893939 L54.7145455,52.0893939 L54.7145455,52.0893939 Z M23.4293939,99.8493939 L23.409697,52.0893939 L27.3669697,52.0893939 L27.3669697,43.0584848 L38.0433333,43.0387879 L38.0433333,52.0893939 L41.8830303,52.0893939 L41.9027273,99.8493939 L38.0436364,99.8493939 L38.0436364,109.03697 L27.3669697,109.03697 L27.3669697,99.8493939 L23.4293939,99.8493939 Z M81.8854545,109.03697 L81.8854545,99.8493939 L78.0066667,99.8493939 L77.9869697,52.0893939 L81.8854545,52.0893939 L81.8854545,42.9606061 L92.5618182,42.9409091 L92.5618182,52.069697 L96.460303,52.069697 L96.48,99.829697 L92.5621212,99.829697 L92.5621212,109.017273 L81.8857576,109.017273 L81.8857576,109.03697 L81.8854545,109.03697 Z" id="Shape" fill="#E95044"></path><polygon id="Shape" fill="#FFFFFF" points="13.4972727 35.4184848 59.9645455 10.6960606 106.412121 35.4184848"></polygon><g id="Group"><path d="M119.909394,107.156364 L111.113636,107.156364 L111.113636,97.9687879 L107.176061,97.9687879 L107.176061,54.1463636 L111.113636,54.1463636 L111.113636,44.9587879 L119.909394,44.9587879 L119.909394,32.0293939 L59.9645455,0 L0.0196969697,32.0490909 L0.0196969697,44.7824242 L8.81545455,44.7824242 L8.81545455,53.97 L12.7530303,53.97 L12.7530303,97.8121212 L8.81545455,97.8121212 L8.81545455,106.999697 L0.0196969697,106.999697 L0.0196969697,119.929091 L119.909394,119.929091 L119.909394,107.156364 Z M107.352424,101.73 L107.352424,107.156364 L94.4230303,107.156364 L94.4230303,101.73 L107.352424,101.73 Z M90.6812121,107.156364 L83.7463636,107.156364 L83.7463636,97.9687879 L79.8090909,97.9687879 L79.8090909,54.1463636 L83.7466667,54.1463636 L83.7466667,44.9587879 L90.6815152,44.9587879 L90.6815152,54.1463636 L94.6190909,54.1463636 L94.6190909,97.9884848 L90.6815152,97.9884848 L90.6815152,107.156364 L90.6812121,107.156364 Z M63.3339394,107.156364 L56.3990909,107.156364 L56.3990909,97.9687879 L52.4615152,97.9687879 L52.4615152,54.1463636 L56.3990909,54.1463636 L56.3990909,44.9587879 L63.3339394,44.9587879 L63.3339394,54.1463636 L67.2715152,54.1463636 L67.2715152,97.9884848 L63.3339394,97.9884848 L63.3339394,107.156364 Z M36.1824242,107.156364 L29.2475758,107.156364 L29.2475758,97.9687879 L25.31,97.9687879 L25.31,54.1463636 L29.2475758,54.1463636 L29.2475758,44.9587879 L36.1824242,44.9587879 L36.1824242,54.1463636 L40.12,54.1463636 L40.12,97.9884848 L36.1824242,97.9884848 L36.1824242,107.156364 L36.1824242,107.156364 Z M39.9239394,50.4045455 L39.9239394,44.9781818 L52.8533333,44.9781818 L52.8533333,50.4045455 L39.9239394,50.4045455 Z M48.9157576,97.9884848 L43.8615152,97.9884848 L43.8615152,54.1463636 L48.9157576,54.1463636 L48.9157576,97.9884848 Z M52.6575758,101.534242 L52.6575758,107.352424 L39.7281818,107.352424 L39.7281818,101.73 L52.6575758,101.534242 Z M67.0754545,50.4045455 L67.0754545,44.9781818 L80.0048485,44.9781818 L80.0048485,50.4045455 L67.0754545,50.4045455 Z M76.0672727,97.9884848 L71.0130303,97.9884848 L71.0130303,54.1463636 L76.0672727,54.1463636 L76.0672727,97.9884848 Z M80.0048485,101.73 L80.0048485,107.156364 L67.0754545,107.156364 L67.0754545,101.73 L80.0048485,101.73 Z M98.3606061,54.1463636 L103.414848,54.1463636 L103.414848,97.9884848 L98.3606061,97.9884848 L98.3606061,54.1463636 Z M94.4427273,50.4045455 L94.4427273,44.9781818 L107.372121,44.9781818 L107.372121,50.4045455 L94.4427273,50.4045455 Z M3.76121212,41.2169697 L3.76121212,34.4781818 L59.9645455,4.50575758 L116.167879,34.4781818 L116.167879,41.2169697 L3.76121212,41.2169697 Z M12.5766667,50.4045455 L12.5766667,44.9781818 L25.5060606,44.9781818 L25.5060606,50.4045455 L12.5766667,50.4045455 Z M21.5684848,97.9884848 L16.5142424,97.9884848 L16.5142424,54.1463636 L21.5684848,54.1463636 L21.5684848,97.9884848 Z M25.5060606,101.73 L25.5060606,107.156364 L12.5766667,107.156364 L12.5766667,101.73 L25.5060606,101.73 Z M3.76121212,116.520303 L3.76121212,111.093939 L116.167576,111.093939 L116.167576,116.520303 L3.76121212,116.520303 Z" id="Shape" fill="#FFFFFF"></path><rect id="Rectangle-path" fill="#E95044" x="45.7227273" y="24.9181818" width="3.74151515" height="3.74151515"></rect><rect id="Rectangle-path" fill="#E95044" x="58.0839394" y="24.9181818" width="3.74151515" height="3.74151515"></rect><rect id="Rectangle-path" fill="#E95044" x="70.4451515" y="24.9181818" width="3.74151515" height="3.74151515"></rect></g></g></g></g></g></g></g></g></g></g></svg>
                                    </v-col>
                                    <v-col cols="12">
                                        <h6 class="text-center text-white">Branch Office</h6>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expand-transition>
                        <v-expand-transition mode="in-out">
                            <div
                                v-if="hover"
                                class="branch_office v-card--reveal white--text"
                                style="height: 100%; opacity: 1;"
                            >
                                <v-container class="p-5">
                                    <v-row>
                                        <v-col cols="12">
                                            <h6>Branch Office</h6>
                                            <p class="mt-4">
                                                Create and Edit Master Branch Office Data
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-hover>
            </v-col>          
        </v-row>
    </v-container>
  </template>
  <script>
  import { mapState } from 'vuex'
  
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
                    text: 'User Managment',
                    disabled: true,
                }
             ],
          }
      },
      computed: {
        cardHeight () {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return '250'
                case 'sm': return '260'
                case 'md': return '350'
                case 'lg': return '350'
                case 'xl': return '350'
            }
        },
      },
      mounted(){
      },
      methods: {
          drawer(){
              // return this.$store.commit('SET_DRAWER_ADMIN')
          },
          checkColor(count){
              return count ? 'red' : 'green'
          },
          close(){
              this.dialog = false
          },
          async utem(){
              this.dialog = true
          },
          logout(){
              this.loading = true
  
              this.$store.dispatch("logoutUser").then(() => {
                  this.snackbar = {
                      color: "success",
                      icon: "mdi-checkbox-marked-circle",
                      mode: "multi-line",
                      position: "top",
                      timeout: 7500,
                      title: "Success",
                      text: "Successfully Logout Sistem",
                      visible: true
                  };
                  this.loading = false
                  this.$router.push('/')
              });
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
    
    .entity{
        background-color: #A27842;
        color: #A27842;
    }
    
    .application_sec{
        background-color: #f56b3b;
        color: #f56b3b;
    }
    
    .group_master{
        background-color: #e95044;
        color: #e95044;
    }
    
    .cyan_unit{
        background-color: #c3d046;
        color: #c3d046;
    }
    
    .warehouse_coklat{
        background-color: #a27842;
        color: #a27842;
    }
    
    .group_right{
        background-color: #f5aa3b;
        color: #f5aa3b;
    }
    
    .menu_header{
        background-color: #54b857;
        color: #54b857;
    }
    
    .currency{
        background-color: #5581ad;
        color: #5581ad; 
    }
    
    .tax{
        background-color: #d351e9;
        color: #d351e9;  
    }
    
    .env_var{
        background-color: #4bb4c6;
        color: #4bb4c6;  
    }
    
    .menu_item{
        background-color: #ee69a7;
        color: #ee69a7; 
    }
    
    .env_conf{
        background-color: #0078d4;
        color: #0078d4; 
    }
  
    .users{
        background-color: #2eb3ec;
        color: #2eb3ec;
    }

    .user_groups{
        background-color: #0f5f81;
        color: #0f5f81;
    }

    .branch_office{
        background-color: #ea5044;
        color: #ea5044;
    }
</style>