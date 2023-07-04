<template>
    <v-container fluid class="mt-8 mb-8">
        <v-row v-if="loading"
        :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`">
            <v-col
                class="col-6"
                xs="12" 
                sm="5" 
                md="3"
                v-for="item in items" :key="item.name"
            >
                <v-skeleton-loader
                class="mx-auto"
                type="card, card-text"
                ></v-skeleton-loader>
            </v-col>
        </v-row>
        <v-row v-else>
            <!-- <v-col class="col-12" sm="4" md="4" lg="3">
                <v-hover v-slot="{ hover }">
                    <v-card
                        class="mx-auto"
                        color="#2eb3ec"
                        max-width="450"
                        :height="cardHeight"
                        tile
                    >
                        <v-expand-transition mode="in-out">
                            <v-container fluid class="fill-height" v-if="!hover">
                                <v-row align="center" justify="center">
                                    <v-col class="col-12" sm="4" md="4">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" class="bi bi-person-lines-fill my-auto" viewBox="0 0 16 16">
                                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
                                        </svg>
                                        <h6 class="text-center text-white">Contact Data</h6>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expand-transition>
                        <v-expand-transition mode="in-out">
                            <div
                                v-if="hover"
                                class="blue_contact v-card--reveal white--text"
                                style="height: 100%; opacity: 1;"
                            >
                                <v-container fluid class="p-5">
                                    <v-row>
                                        <v-col cols="12">
                                            <h6>Contact Data</h6>
                                            <p class="mt-4">
                                                Create and Edit Customers Data, Suppliers Data and Employees Data
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-hover>
            </v-col> -->
            <!-- <v-col class="col-12" sm="4" md="4" lg="3">
                <v-hover v-slot="{ hover }">
                    <v-card
                        class="mx-auto"
                        color="#e95044"
                        max-width="450"
                        :height="cardHeight"
                        tile
                    >
                        <v-expand-transition mode="in-out">
                            <v-container fluid class="fill-height" v-if="!hover">
                                <v-row align="center" justify="center">
                                    <v-col class="col-12" sm="4" md="4">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" class="bi bi-box-seam" viewBox="0 0 16 16">
                                        <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
                                        </svg>
                                        <h6 class="text-center text-white mt-2">Product Data</h6>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expand-transition>
                        <v-expand-transition mode="in-out">
                            <div
                                v-if="hover"
                                class="red_product v-card--reveal white--text"
                                style="height: 100%; opacity: 1;"
                            >
                                <v-container fluid class="p-5">
                                    <v-row>
                                        <v-col cols="12">
                                            <h6>Product Data</h6>
                                            <p class="mt-4">
                                                Manage Product Data
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col class="col-12" sm="4" md="4" lg="3">
                <v-hover v-slot="{ hover }">
                    <v-card
                        class="mx-auto"
                        color="#c3d046"
                        max-width="450"
                        :height="cardHeight"
                        tile
                    >
                        <v-expand-transition mode="in-out">
                            <v-container fluid class="fill-height" v-if="!hover">
                                <v-row align="center" justify="center">
                                    <v-col class="col-12" sm="4" md="4">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffff" class="bi bi-thermometer-sun text-center" viewBox="0 0 16 16">
                                        <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585A1.5 1.5 0 0 1 5 12.5z"/>
                                        <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1zm5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5zm4.243 1.757a.5.5 0 0 1 0 .707l-.707.708a.5.5 0 1 1-.708-.708l.708-.707a.5.5 0 0 1 .707 0zM8 5.5a.5.5 0 0 1 .5-.5 3 3 0 1 1 0 6 .5.5 0 0 1 0-1 2 2 0 0 0 0-4 .5.5 0 0 1-.5-.5zM12.5 8a.5.5 0 0 1 .5-.5h1a.5.5 0 1 1 0 1h-1a.5.5 0 0 1-.5-.5zm-1.172 2.828a.5.5 0 0 1 .708 0l.707.708a.5.5 0 0 1-.707.707l-.708-.707a.5.5 0 0 1 0-.708zM8.5 12a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5z"/>
                                        </svg>
                                        <h6 class="text-center text-white mt-2" >Unit Of Measurement</h6>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expand-transition>
                        <v-expand-transition mode="in-out">
                            <div
                                v-if="hover"
                                class="cyan_unit v-card--reveal white--text"
                                style="height: 100%; opacity: 1;"
                            >
                                <v-container fluid class="p-5">
                                    <v-row>
                                        <v-col cols="12">
                                            <h6>Unit Of Measurement</h6>
                                            <p class="mt-4">
                                                Create Unit of Measurement And Convertion Unit
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col class="col-12" sm="4" md="4" lg="3">
                <v-hover v-slot="{ hover }">
                    <v-card
                        class="mx-auto"
                        color="#a27842"
                        max-width="450"
                        :height="cardHeight"
                        tile
                    >
                        <v-expand-transition mode="in-out">
                            <v-container fluid class="fill-height" v-if="!hover">
                                <v-row align="center" justify="center">
                                    <v-col class="col-12" sm="4" md="4">
                                        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 120 120" aria-hidden="true"><g id="Data-Store" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="2000-Data-Store" transform="translate(-165.000000, -882.000000)"><g id="menus" transform="translate(70.000000, 154.000000)"><g id="2" transform="translate(0.000000, 660.000000)"><g id="warehouse"><g id="Group-2"><g id="Stacked-Group" transform="translate(95.000000, 68.000000)"><g id="warehouse_icon"><rect id="Rectangle-4" x="0" y="0" width="120" height="120"></rect><g id="301-building" fill-rule="nonzero"><g id="Group" transform="translate(1.818182, 31.818182)" fill="#A27842"><polygon id="Shape" points="33.7766667 86.1909091 0.0624242424 86.1909091 0.0624242424 22.5045455 33.7766667 0.0348484848"></polygon><polygon id="Shape" points="116.190909 86.1909091 82.4769697 86.1909091 82.4769697 0.0348484848 116.190909 22.5045455"></polygon></g><rect id="Rectangle-path" fill="#A27842" x="35.5948485" y="1.88060606" width="48.5239394" height="116.148182"></rect><g id="Group" transform="translate(43.030303, 11.212121)" fill="#FFFFFF"><rect id="Rectangle-path" x="0.0478787879" y="56.98" width="6.19030303" height="6.19030303"></rect><rect id="Rectangle-path" x="13.9172727" y="56.98" width="6.19030303" height="6.19030303"></rect><rect id="Rectangle-path" x="27.3951515" y="56.98" width="6.19030303" height="6.19030303"></rect><rect id="Rectangle-path" x="0.0478787879" y="38.0563636" width="6.19030303" height="6.19030303"></rect><rect id="Rectangle-path" x="13.9172727" y="38.0563636" width="6.19030303" height="6.19030303"></rect><rect id="Rectangle-path" x="27.3951515" y="38.0563636" width="6.19030303" height="6.19030303"></rect><rect id="Rectangle-path" x="0.0478787879" y="19.1324242" width="6.19030303" height="6.19030303"></rect><rect id="Rectangle-path" x="13.9172727" y="19.1324242" width="6.19030303" height="6.19030303"></rect><rect id="Rectangle-path" x="27.3951515" y="19.1324242" width="6.19030303" height="6.19030303"></rect><rect id="Rectangle-path" x="0.0478787879" y="0.208787879" width="6.19030303" height="6.19030303"></rect><rect id="Rectangle-path" x="13.9172727" y="0.208787879" width="6.19030303" height="6.19030303"></rect><rect id="Rectangle-path" x="27.3951515" y="0.208787879" width="6.19030303" height="6.19030303"></rect></g><g id="Group" transform="translate(8.787879, 63.636364)" fill="#FFFFFF"><rect id="Rectangle-path" x="82.4421212" y="38.0739394" width="6.19030303" height="6.19030303"></rect><rect id="Rectangle-path" x="96.1157576" y="38.0739394" width="6.19030303" height="6.19030303"></rect><rect id="Rectangle-path" x="82.4421212" y="19.5421212" width="6.19030303" height="5.62242424"></rect><rect id="Rectangle-path" x="96.1157576" y="19.5421212" width="6.19030303" height="5.62242424"></rect><rect id="Rectangle-path" x="82.4421212" y="0.246060606" width="6.19030303" height="6.19030303"></rect><rect id="Rectangle-path" x="96.1157576" y="0.246060606" width="6.19030303" height="6.19030303"></rect><rect id="Rectangle-path" x="0.00787878788" y="38.0739394" width="6.19030303" height="6.19030303"></rect><rect id="Rectangle-path" x="13.7012121" y="38.0739394" width="6.19030303" height="6.19030303"></rect><rect id="Rectangle-path" x="0.00787878788" y="19.5421212" width="6.19030303" height="5.62242424"></rect><rect id="Rectangle-path" x="13.7012121" y="19.5421212" width="6.19030303" height="5.62242424"></rect><rect id="Rectangle-path" x="0.00787878788" y="0.246060606" width="6.19030303" height="6.19030303"></rect><rect id="Rectangle-path" x="13.7012121" y="0.246060606" width="6.19030303" height="6.19030303"></rect></g><rect id="Rectangle-path" fill="#FFFFFF" x="47.3878788" y="86.7242424" width="25.2906061" height="31.2848485"></rect><g id="Group" fill="#FFFFFF"><rect id="Rectangle-path" x="43.8421212" y="84.8630303" width="32.2251515" height="3.74151515"></rect><path d="M86.1757576,30.9127273 L86.1757576,0 L33.7142424,0 L33.7142424,30.9127273 L0,53.3824242 L0,119.89 L119.889697,119.89 L119.889697,53.3824242 L86.1757576,30.9127273 Z M33.7142424,116.148182 L3.74151515,116.148182 L3.74151515,55.4587879 L33.7139394,35.4184848 L33.7139394,116.148182 L33.7142424,116.148182 Z M82.4339394,116.148182 L37.4754545,116.148182 L37.4754545,3.74151515 L82.4342424,3.74151515 L82.4342424,116.148182 L82.4339394,116.148182 Z M116.148182,116.148182 L86.1757576,116.148182 L86.1757576,35.3987879 L116.148182,55.4390909 L116.148182,116.148182 Z" id="Shape"></path></g></g></g></g></g></g></g></g></g></g></svg>
                                        <h6 class="text-center text-white mt-2" >Data Warehouse</h6>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expand-transition>
                        <v-expand-transition mode="in-out">
                            <div
                                v-if="hover"
                                class="warehouse_coklat v-card--reveal white--text"
                                style="height: 100%; opacity: 1;"
                            >
                                <v-container fluid class="p-5">
                                    <v-row>
                                        <v-col cols="12">
                                            <h6>Data Warehouse</h6>
                                            <p class="mt-4">
                                                Manage Warehouse Data and Create New Warehouse Data
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col class="col-12" sm="4" md="4" lg="3">
                <v-hover v-slot="{ hover }">
                    <v-card
                        class="mx-auto"
                        color="#f5aa3b"
                        max-width="450"
                        :height="cardHeight"
                        tile
                    >
                        <v-expand-transition mode="in-out">
                            <v-container fluid class="fill-height" v-if="!hover">
                                <v-row align="center" justify="center">
                                    <v-col class="col-12" sm="4" md="4">
                                        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 124 123" aria-hidden="true"><g id="Data-Store" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="2000-Data-Store" transform="translate(-1152.000000, -219.000000)" fill-rule="nonzero"><g id="menus" transform="translate(70.000000, 154.000000)"><g id="1"><g id="account_data" transform="translate(990.000000, 0.000000)"><g id="Stacked-Group" transform="translate(76.000000, 65.000000)"><g id="department_data_icon" transform="translate(18.000000, 0.000000)"><g id="Layer_1"><g><path d="M59.9448485,43.9219493 C47.3878788,43.9219493 37.0836364,34.0192708 37.0836364,21.9516556 C37.0836364,9.8840403 47.3878788,0 59.9448485,0 C72.5018182,0 82.8060606,9.90267844 82.8060606,21.9702937 C82.8060606,34.037909 72.5021212,43.9219493 59.9448485,43.9219493 Z" id="Shape" fill="#FFFFFF"></path><g id="Group" transform="translate(41.515152, 12.819884)" fill="#F5AA3B"><ellipse id="Oval" cx="18.429697" cy="9.35780397" rx="9.73606061" ry="9.35663909"></ellipse><path d="M29.6742424,18.902863 L7.18515152,18.902863 C3.24757576,18.902863 0.0739393939,21.9714586 0.0739393939,25.7369459 L0.0739393939,35.6396244 C5.12818182,39.4237499 11.4948485,41.5886867 18.429697,41.5886867 C25.3645455,41.5886867 31.7312121,39.4237499 36.7854545,35.6396244 L36.7854545,25.7369459 C36.7854545,21.9714586 33.6118182,18.902863 29.6742424,18.902863 Z" id="Shape"></path></g><path d="M91.5387515,100.417934 C91.0797206,100.712486 90.6694817,101.206107 90.4648763,101.702566 L89.3447134,104.420555 L59.9438997,76.0869238 L31.8512802,103.122839 L26.3393248,97.8256889 L56.0836364,69.2207876 L56.0836364,57.8675151 C50.0533242,57.201448 44.3533321,54.9834685 39.2896415,51.3335563 L37.7278788,50.1881811 L37.7278788,38.5565392 C37.7278788,33.0389658 42.2605387,28.4047593 47.8251297,27.9514858 C46.9727744,26.2385232 46.5239394,24.330933 46.5239394,22.3468879 C46.5239394,15.1055875 52.6867655,9.18293132 60.1406061,9.18293132 C67.5944466,9.18293132 73.7572727,15.1055875 73.7572727,22.3468879 C73.7572727,24.2929526 73.2603551,26.2171655 72.3678371,27.973126 C77.9399603,28.5257376 82.1812121,32.964619 82.1812121,38.5565392 L82.1812121,50.1881811 L81.3639949,50.787517 L80.6061156,51.3432509 C75.5542758,54.9845453 69.8553877,57.2017988 63.8254545,57.8675891 L63.8254545,69.2219776 L96.198675,100.417934 L91.5387515,100.417934 Z M59.9448485,16.6283668 C56.7677659,16.6283668 54.069697,19.3012328 54.069697,22.3661084 C54.069697,25.3851059 56.7223254,27.9343595 59.9448485,27.9343595 C63.1219311,27.9343595 65.82,25.2614934 65.82,22.1966178 C65.82,19.1776203 63.1673716,16.6283668 59.9448485,16.6283668 Z M45.47,46.2931167 C49.8719503,49.004262 54.8024907,50.4317631 59.9448485,50.4317631 C65.0846627,50.4317631 70.0176766,49.0057339 74.4590909,46.2887298 L74.4590909,38.5568304 C74.4590909,36.9762527 72.9309551,35.5114268 71.2090909,35.5114268 L48.72,35.5114268 C46.994077,35.5114268 45.47,36.9798664 45.47,38.5568304 L45.47,46.2931167 Z" id="Shape" stroke="#F5AA3B" stroke-width="4" fill="#FFFFFF"></path><path d="M97.0284848,113.786738 C84.4715152,113.786738 74.1672727,103.884059 74.1672727,91.816444 C74.1672727,79.7488287 84.4912121,69.8461503 97.0284848,69.8461503 C109.565758,69.8461503 119.889697,79.5793381 119.889697,91.816444 C119.889697,103.884059 109.585455,113.786738 97.0284848,113.786738 Z" id="Shape" fill="#FFFFFF"></path><g id="Group" transform="translate(78.484848, 82.421700)" fill="#F5AA3B"><ellipse id="Oval" cx="18.5436364" cy="9.60213838" rx="9.73606061" ry="9.35663909"></ellipse><path d="M29.7881818,18.9777068 L18.5436364,18.9777068 L7.31878788,18.9777068 C3.38121212,18.9777068 0.207575758,22.0463024 0.207575758,25.8117897 L0.207575758,35.7144682 L36.8993939,35.7144682 L36.8993939,25.8117897 C36.8993939,22.027373 33.7257576,18.9777068 29.7881818,18.9777068 Z" id="Shape"></path></g><g id="Group" transform="translate(48.787879, 41.068320)" fill="#FFFFFF"><path d="M60.6623882,56.5841297 C66.1063522,57.1454936 70.4102696,61.5556732 70.8419413,67.0072996 L70.8481818,67.1651699 L70.8481818,79.0678483 L63.1066667,79.0678483 L63.1066667,67.1651699 C63.1066667,65.5845922 61.5785309,64.1197663 59.8566667,64.1197663 L37.3872727,64.1197663 C35.6613497,64.1197663 34.1372727,65.5882058 34.1372727,67.1651699 L34.1372727,79.0678483 L26.3957576,79.0678483 L26.3957576,67.1651699 C26.3957576,61.765337 30.7370349,57.2115726 36.1382207,56.5948134 C35.2746181,54.8729297 34.819697,52.9529699 34.819697,50.9555185 C34.819697,43.7142182 40.9825231,37.791562 48.4363636,37.791562 C55.8902042,37.791562 62.0530303,43.7142182 62.0530303,50.9555185 C62.0530303,52.90246 61.5556648,54.8275298 60.6623882,56.5841297 Z M42.3851515,50.9555185 C42.3851515,53.974516 45.0377799,56.5237695 48.260303,56.5237695 C51.4828261,56.5237695 54.1354545,53.974516 54.1354545,50.9555185 C54.1354545,47.936521 51.4828261,45.3872675 48.260303,45.3872675 C45.0377799,45.3872675 42.3851515,47.936521 42.3851515,50.9555185 Z" id="Shape" stroke="#F5AA3B" stroke-width="4"></path><rect id="Rectangle-path" x="37.5642424" y="69.8758548" width="3.74151515" height="3.7841255"></rect><rect id="Rectangle-path" x="46.379697" y="69.8758548" width="3.74151515" height="3.7841255"></rect><rect id="Rectangle-path" x="55.3712121" y="69.8758548" width="3.74151515" height="3.7841255"></rect><rect id="Rectangle-path" x="0.284545455" y="0.0110663975" width="3.74151515" height="3.7841255"></rect><rect id="Rectangle-path" x="9.27636364" y="0.0110663975" width="3.74151515" height="3.7841255"></rect><rect id="Rectangle-path" x="18.2681818" y="0.0110663975" width="3.74151515" height="3.7841255"></rect></g><path d="M22.8612121,113.786738 C10.3042424,113.786738 0,103.884059 0,91.816444 C0,79.7488287 10.3042424,69.8461503 22.8612121,69.8461503 C35.4181818,69.8461503 45.7224242,79.7488287 45.7224242,91.816444 C45.7224242,103.884059 35.3987879,113.786738 22.8612121,113.786738 Z" id="Shape" fill="#FFFFFF"></path><ellipse id="Oval" fill="#F5AA3B" cx="22.8612121" cy="92.0238388" rx="9.73606061" ry="9.35663909"></ellipse><path d="M34.0863636,101.399407 L22.8418182,101.399407 L11.6166667,101.399407 C7.67909091,101.399407 4.50545455,104.468003 4.50545455,108.23349 L4.50545455,118.136169 L41.2166667,118.136169 L41.2166667,108.23349 C41.2169697,104.449073 38.0239394,101.399407 34.0863636,101.399407 Z" id="SVGCleanerId_0" fill="#F5AA3B"></path><g id="Group" transform="translate(2.424242, 80.674374)" fill="#FFFFFF"><path d="M32.8380631,16.9806211 C38.2734819,17.5642841 42.6540346,22.134831 42.6533333,27.5591157 L42.6533333,39.4617941 L34.9118182,39.4617941 L34.9118182,27.5591157 C34.9118182,25.978538 33.3836824,24.5137121 31.6618182,24.5137121 L9.19242424,24.5137121 C7.46650126,24.5137121 5.94242424,25.9821516 5.94242424,27.5591157 L5.94242424,39.4617941 L-1.79939394,39.4617941 L-1.79939394,27.5591157 C-1.79939394,22.0415422 2.73326596,17.4073358 8.29785698,16.9540623 C7.44550169,15.2410996 6.99666667,13.3335094 6.99666667,11.3494643 C6.99666667,4.10816399 13.1594928,-1.81449223 20.6133333,-1.81449223 C28.0671739,-1.81449223 34.23,4.10816399 34.23,11.3494643 C34.23,13.2973463 33.7321539,15.2233355 32.8380631,16.9806211 Z M14.5621212,11.3494643 C14.5621212,14.368654 17.2143389,16.9177153 20.4369697,16.9177153 C23.6597599,16.9177153 26.3124242,14.3684948 26.3124242,11.3494643 C26.3124242,8.33046681 23.6597958,5.78121329 20.4372727,5.78121329 C17.2147496,5.78121329 14.5621212,8.33046681 14.5621212,11.3494643 Z" id="Shape" stroke="#F5AA3B" stroke-width="4"></path><rect id="Rectangle-path" x="9.56484848" y="30.2698006" width="3.74151515" height="3.7841255"></rect><rect id="Rectangle-path" x="18.5563636" y="30.2698006" width="3.74151515" height="3.7841255"></rect><rect id="Rectangle-path" x="27.3524242" y="30.2698006" width="3.74151515" height="3.7841255"></rect></g></g></g></g></g></g></g></g></g></g></svg>
                                        <h6 class="text-center text-white mt-2" >Data Department</h6>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expand-transition>
                        <v-expand-transition mode="in-out">
                            <div
                                v-if="hover"
                                class="department_coklat v-card--reveal white--text"
                                style="height: 100%; opacity: 1;"
                            >
                                <v-container fluid class="p-5">
                                    <v-row>
                                        <v-col cols="12">
                                            <h6>Data Department</h6>
                                            <p class="mt-4">
                                                Manage your department information
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col class="col-12" sm="4" md="4" lg="3">
                <v-hover v-slot="{ hover }">
                    <v-card
                        class="mx-auto"
                        color="#54b857"
                        max-width="450"
                        :height="cardHeight"
                        tile
                    >
                        <v-expand-transition mode="in-out">
                            <v-container fluid class="fill-height" v-if="!hover">
                                <v-row align="center" justify="center">
                                    <v-col class="col-12" sm="4" md="4">
                                        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 98 120" aria-hidden="true"><g id="Data-Store" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="2000-Data-Store" transform="translate(-177.000000, -552.000000)"><g id="menus" transform="translate(70.000000, 154.000000)"><g id="3" transform="translate(0.000000, 330.000000)"><g id="project_data"><g id="Group-2"><g id="Stacked-Group" transform="translate(95.000000, 68.000000)"><g id="project_data_icon"><rect id="Rectangle-4" x="0" y="0" width="120" height="120"></rect><g id="notepad-copy-4" transform="translate(12.000000, 0.000000)" fill-rule="nonzero"><polyline id="Shape" points="73.8272727 8.24727273 95.5721212 8.24727273 95.5721212 118.009091 1.89333333 118.009091 1.89333333 8.24727273 23.6381818 8.24727273"></polyline><rect id="SVGCleanerId_0" fill="#2EA2DB" x="9.39636364" y="21.9209091" width="78.6727273" height="88.6048485"></rect><path d="M66.3439394,16.4945455 L31.1215152,16.4945455 L31.1215152,0 L66.3439394,0 L66.3439394,16.4945455 Z M34.8630303,12.7333333 L62.5827273,12.7333333 L62.5827273,3.74151515 L34.8630303,3.74151515 L34.8630303,12.7333333 Z" id="Shape" fill="#193651"></path><rect id="SVGCleanerId_1" fill="#FFFFFF" x="17.6436364" y="30.3445455" width="15.1821212" height="15.1821212"></rect><rect id="SVGCleanerId_2" fill="#FFFFFF" x="17.6436364" y="58.6324242" width="15.1821212" height="15.1821212"></rect><rect id="SVGCleanerId_3" fill="#FFFFFF" x="17.6436364" y="86.7242424" width="15.1821212" height="15.1821212"></rect><polygon id="Shape" points="66.3439394 8.24727273 66.3439394 16.4945455 31.1215152 16.4945455 31.1215152 8.24727273 1.89333333 8.24727273 1.89333333 118.009091 95.5721212 118.009091 95.5721212 8.24727273"></polygon><rect id="SVGCleanerId_0_1_" fill="#FFFFFF" x="9.39393939" y="21.8181818" width="78.6727273" height="88.6048485"></rect><g id="Group-6" transform="translate(22.424242, 45.454545)" fill="#53B857"><rect id="Rectangle-path" x="0.195184487" y="0.159179582" width="52.047121" height="3.3425005"></rect><rect id="Rectangle-path" x="0.195184487" y="12.7070245" width="52.047121" height="3.3425005"></rect><rect id="Rectangle-path" x="0.195184487" y="25.430021" width="52.047121" height="3.3425005"></rect><rect id="Rectangle-path" x="0.195184487" y="37.9781366" width="27.2835969" height="3.3425005"></rect></g><path d="M31.1215152,0 L31.1215152,16.4945455 L66.3439394,16.4945455 L66.3439394,0 L31.1215152,0 Z M62.6024242,12.7333333 L34.8633333,12.7333333 L34.8633333,3.74151515 L62.5830303,3.74151515 L62.5830303,12.7333333 L62.6024242,12.7333333 Z" id="Shape" fill="#FFFFFF"></path><g id="Group" transform="translate(0.000000, 6.363636)" fill="#FFFFFF"><polygon id="Shape" points="73.8272727 0.00303030303 73.8272727 3.74484848 93.6915152 3.74484848 93.6915152 109.784545 3.77424242 109.784545 3.77424242 3.74484848 23.6381818 3.74484848 23.6381818 0.00303030303 0.0324242424 0.00303030303 0.0324242424 113.526061 97.4330303 113.526061 97.4330303 0.00303030303"></polygon></g></g></g></g></g></g></g></g></g></g></svg>
                                        <h6 class="text-center text-white mt-2" >Data Project</h6>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expand-transition>
                        <v-expand-transition mode="in-out">
                            <div
                                v-if="hover"
                                class="project v-card--reveal white--text"
                                style="height: 100%; opacity: 1;"
                            >
                                <v-container fluid class="p-5">
                                    <v-row>
                                        <v-col cols="12">
                                            <h6>Data Project</h6>
                                            <p class="mt-4">
                                                Manage Project Data
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col class="col-12" sm="4" md="4" lg="3">
                <v-hover v-slot="{ hover }">
                    <v-card
                        class="mx-auto"
                        color="#5581ad"
                        max-width="450"
                        :height="cardHeight"
                        tile
                    >
                        <v-expand-transition mode="in-out">
                            <v-container fluid class="fill-height" v-if="!hover">
                                <v-row align="center" justify="center">
                                    <v-col class="col-12" sm="4" md="4">
                                        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 120 120" aria-hidden="true"><g id="Data-Store" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="2000-Data-Store" transform="translate(-824.000000, -222.000000)"><g id="menus" transform="translate(70.000000, 154.000000)"><g id="1"><g id="currency_data" transform="translate(660.000000, 0.000000)"><g id="Stacked-Group" transform="translate(89.000000, 68.000000)"><g id="currency_data_icon" transform="translate(5.000000, 0.000000)"><g id="Layer_1"><g><ellipse id="Oval" fill-rule="nonzero" cx="90.8575758" cy="28.9692422" rx="27.1712121" ry="27.1123636"></ellipse><path d="M90.8575758,57.9384845 C74.7548485,57.9384845 61.8254545,44.8614143 61.8254545,28.9692422 C61.8254545,13.0770702 74.7351515,0 90.8575758,0 C106.784242,0 119.889697,13.0770702 119.889697,28.9692422 C119.889697,44.8614143 106.784242,57.9384845 90.8575758,57.9384845 Z M90.8575758,3.73341162 C76.8115152,3.73341162 65.5669697,15.1295848 65.5669697,28.9692422 C65.5669697,42.9848813 76.8115152,54.2050729 90.8575758,54.2050729 C104.727273,54.2050729 116.148182,42.9848813 116.148182,28.9692422 C116.148182,15.1492391 104.707576,3.73341162 90.8575758,3.73341162 Z" id="Shape" fill="#FFFFFF" fill-rule="nonzero"></path><path d="M90.8575758,48.5948259 C79.9851515,48.5948259 71.1893939,39.8181185 71.1893939,28.9692422 C71.1893939,18.1203659 79.9851515,9.34365858 90.8575758,9.34365858 C101.73,9.34365858 110.525758,18.1203659 110.525758,28.9692422 C110.525758,39.8181185 101.710303,48.5948259 90.8575758,48.5948259 Z M95.539697,35.1461381 C93.2869697,38.1369192 89.3493939,38.1369192 87.1160606,35.1461381 C86.8418182,34.7941747 86.6066667,34.4228595 86.3715152,34.0318899 L92.3463636,34.0318899 L92.3463636,30.2984783 L85.2157576,30.2984783 C85.1178788,29.4385267 85.1372727,28.5392664 85.2354545,27.6790124 L92.3466667,27.6790124 L92.3466667,23.9456008 L86.469697,23.9456008 C86.6654545,23.6132918 86.8615152,23.3006371 87.0966667,23.0073343 C89.3493939,20.0165532 93.2869697,20.0165532 95.520303,23.0073343 L98.3215152,20.5835044 C96.4409091,18.1596746 94.0118182,16.8500928 91.210303,16.8500928 C88.5851515,16.8500928 85.960303,18.1596746 84.0990909,20.5835044 C83.2957576,21.6000858 82.6493939,22.7336859 82.1987879,23.9456008 L79.9851515,23.9456008 L79.9851515,27.6790124 L81.3563636,27.6790124 C81.2778788,28.5389641 81.2778788,29.4188724 81.3563636,30.2984783 L79.9851515,30.2984783 L79.9851515,34.012538 L82.1987879,34.012538 C82.6493939,35.2244529 83.2957576,36.3583554 84.0990909,37.3746343 C85.979697,39.7984642 88.4087879,41.108046 91.210303,41.108046 C94.0115152,41.108046 96.460303,39.7984642 98.5172727,37.3746343 L95.539697,35.1461381 Z" id="Combined-Shape" fill="#FFFFFF" fill-rule="nonzero"></path><ellipse id="Oval" fill-rule="nonzero" cx="27.5433333" cy="27.4836788" rx="25.6627273" ry="25.6071459"></ellipse><path d="M27.5433333,54.9477034 C12.3612121,54.9477034 0,42.6132637 0,27.4836788 C0,12.354094 12.3612121,0 27.5433333,0 C42.7254545,0 55.0866667,12.3344397 55.0866667,27.4836788 C55.0866667,42.632918 42.7057576,54.9477034 27.5433333,54.9477034 Z M27.5433333,3.73341162 C14.4378788,3.73341162 3.76121212,14.3866519 3.76121212,27.4640245 C3.76121212,40.5413971 14.4181818,51.2139894 27.5433333,51.2139894 C40.6684848,51.2139894 51.3254545,40.560749 51.3254545,27.4833765 C51.3254545,14.4060039 40.6487879,3.73341162 27.5433333,3.73341162 Z" id="Shape" fill="#FFFFFF" fill-rule="nonzero"></path><path d="M27.5433333,45.6040448 C17.4348485,45.6040448 9.36393939,37.3746343 9.36393939,27.4640245 C9.36393939,17.5534147 17.4154545,9.32400428 27.5433333,9.32400428 C37.6712121,9.32400428 45.7227273,17.3580811 45.7227273,27.4640245 C45.7227273,37.5699679 37.4754545,45.6040448 27.5433333,45.6040448 Z M31.6572727,31.3930721 L31.6572727,34.5791868 L26.4069697,34.5791868 L26.4069697,29.3405575 L30.5209091,29.3405575 L30.5209091,25.6071459 L26.4069697,25.6071459 L26.4069697,22.4210312 C26.4069697,21.1114494 27.5236364,19.9972013 28.8360606,19.9972013 C29.5806061,19.9972013 30.3248485,20.5641525 30.7166667,21.1114494 L33.909697,19.0589348 C32.7930303,17.3777354 30.9124242,16.4394689 28.8554545,16.4394689 C25.4860606,16.4394689 22.6651515,19.2346141 22.6651515,22.6163648 L22.6651515,25.6071459 L21.3527273,25.6071459 L21.3527273,29.3405575 L22.6651515,29.3405575 L22.6651515,34.5791868 L21.3527273,34.5791868 L21.3527273,38.3125984 L35.3987879,38.3125984 L35.3987879,31.3927697 L31.6572727,31.3927697 L31.6572727,31.3930721 Z" id="Combined-Shape" fill="#FFFFFF" fill-rule="nonzero"></path><ellipse id="Oval" fill-rule="nonzero" cx="60.6893939" cy="86.927381" rx="30.7169697" ry="30.8457752"></ellipse><path d="M60.6893939,119.630035 C42.7060606,119.630035 28.0918182,105.047747 28.0918182,86.9270786 C28.0918182,68.9826944 42.7057576,54.2241224 60.6893939,54.2241224 C78.6730303,54.2241224 93.2869697,68.8064103 93.2869697,86.9270786 C93.4827273,105.047747 78.8687879,119.630035 60.6893939,119.630035 Z M60.6893939,57.9384845 C44.7627273,57.9384845 31.8336364,71.0155547 31.8336364,86.9077267 C31.8336364,102.975578 44.7630303,115.876969 60.6893939,115.876969 C76.6157576,115.876969 89.5451515,102.975578 89.5451515,86.9077267 C89.7215152,71.035209 76.8118182,57.9384845 60.6893939,57.9384845 Z" id="Shape" fill="#FFFFFF" fill-rule="nonzero"></path><path d="M60.6893939,110.286376 C47.9560606,110.286376 37.4557576,99.8284696 37.4557576,86.9270786 C37.4557576,74.0256877 47.9560606,63.567781 60.6893939,63.567781 C73.6187879,63.567781 83.9230303,74.0256877 83.9230303,86.9270786 C84.1187879,99.8091176 73.6184848,110.286376 60.6893939,110.286376 Z M60.6893939,85.2268297 C58.6324242,85.2268297 56.9478788,83.5456303 56.9478788,81.4934181 C56.9478788,79.4412058 58.6327273,77.7600065 60.6893939,77.7600065 C62.7463636,77.7600065 64.4309091,79.4412058 64.4309091,81.4934181 L68.1724242,81.4934181 C68.1724242,78.0336549 65.7824242,75.0818801 62.55,74.2609347 L62.55,71.7784443 L58.8084848,71.7784443 L58.8084848,74.2609347 C55.5957576,75.1015344 53.1860606,78.0336549 53.1860606,81.4934181 C53.1860606,85.5984473 56.5554545,88.980198 60.6890909,88.980198 C62.7460606,88.980198 64.4306061,90.6613974 64.4306061,92.7136096 C64.4306061,94.7661243 62.7457576,96.4470213 60.6890909,96.4470213 C58.6324242,96.4470213 56.9475758,94.7658219 56.9475758,92.7136096 L53.2060606,92.7136096 C53.2060606,96.1733728 55.5960606,99.1251477 58.8284848,99.946093 L58.8284848,102.057268 L62.57,102.057268 L62.57,99.946093 C65.7827273,99.1054934 68.1924242,96.1733728 68.1924242,92.7136096 C68.1921212,88.608278 64.8227273,85.2268297 60.6893939,85.2268297 Z M74.3630303,85.0508481 L74.3630303,88.7842597 L78.1045455,88.7842597 L78.1045455,85.0508481 L74.3630303,85.0508481 Z M43.2739394,85.0508481 L43.2739394,88.7842597 L47.0154545,88.7842597 L47.0154545,85.0508481 L43.2739394,85.0508481 Z" id="Combined-Shape" fill="#FFFFFF" fill-rule="nonzero"></path><g id="Group" transform="translate(43.212121, 71.328195)"></g></g></g></g></g></g></g></g></g></g></svg>
                                        <h6 class="text-center text-white mt-2" >Currency</h6>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expand-transition>
                        <v-expand-transition mode="in-out">
                            <div
                                v-if="hover"
                                class="currency v-card--reveal white--text"
                                style="height: 100%; opacity: 1;"
                            >
                                <v-container fluid class="p-5">
                                    <v-row>
                                        <v-col cols="12">
                                            <h6>Currency</h6>
                                            <p class="mt-4">
                                                Manage Currencies
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col class="col-12" sm="4" md="4" lg="3">
                <v-hover v-slot="{ hover }">
                    <v-card
                        class="mx-auto"
                        color="#d351e9"
                        max-width="450"
                        :height="cardHeight"
                        tile
                    >
                        <v-expand-transition mode="in-out">
                            <v-container fluid class="fill-height" v-if="!hover">
                                <v-row align="center" justify="center">
                                    <v-col class="col-12" sm="4" md="4">
                                        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 98 120" aria-hidden="true"><g id="Data-Store" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="2000-Data-Store" transform="translate(-836.000000, -551.000000)"><g id="menus" transform="translate(70.000000, 154.000000)"><g id="3" transform="translate(0.000000, 330.000000)"><g id="tax_data" transform="translate(660.000000, 0.000000)"><g id="Group-2"><g id="Stacked-Group" transform="translate(95.000000, 67.000000)"><g id="tax_data_icon"><rect id="Rectangle-4" x="0" y="1" width="120" height="120"></rect><g id="notepad" transform="translate(11.000000, 0.000000)" fill-rule="nonzero"><polyline id="Shape" points="73.8272727 8.24727273 95.5721212 8.24727273 95.5721212 118.009091 1.89333333 118.009091 1.89333333 8.24727273 23.6381818 8.24727273"></polyline><rect id="SVGCleanerId_0" fill="#2EA2DB" x="9.39636364" y="21.9209091" width="78.6727273" height="88.6048485"></rect><path d="M66.3439394,16.4945455 L31.1215152,16.4945455 L31.1215152,0 L66.3439394,0 L66.3439394,16.4945455 Z M34.8630303,12.7333333 L62.5827273,12.7333333 L62.5827273,3.74151515 L34.8630303,3.74151515 L34.8630303,12.7333333 Z" id="Shape" fill="#193651"></path><rect id="SVGCleanerId_1" fill="#FFFFFF" x="17.6436364" y="30.3445455" width="15.1821212" height="15.1821212"></rect><rect id="SVGCleanerId_2" fill="#FFFFFF" x="17.6436364" y="58.6324242" width="15.1821212" height="15.1821212"></rect><rect id="SVGCleanerId_3" fill="#FFFFFF" x="17.6436364" y="86.7242424" width="15.1821212" height="15.1821212"></rect><rect id="SVGCleanerId_0_1_" fill="#FFFFFF" x="9.39393939" y="21.8181818" width="78.6727273" height="88.6048485"></rect><g id="Group" transform="translate(24.683126, 39.690963)" fill="#D344E9"><path d="M5.5830273,39.64382 C4.15561274,39.64382 3.00489354,38.4784549 3.00489354,37.0656862 C3.00489354,35.6382717 4.17025867,34.4875525 5.5830273,34.4875525 C7.01044186,34.4875525 8.16116106,35.6529176 8.16116106,37.0656862 L11.0743486,37.0656862 C11.0743486,34.5456855 9.35559272,32.404451 7.03950839,31.7636354 L7.03950839,29.2580553 L4.12632089,29.2580553 L4.12632089,31.7634101 C1.79581595,32.4042257 0.0914807121,34.5310396 0.0914807121,37.0654609 C0.0914807121,40.0951399 2.55312303,42.5570075 5.5830273,42.5570075 C7.01044186,42.5570075 8.16116106,43.7223726 8.16116106,45.1351413 C8.16116106,46.5481352 6.99579593,47.713275 5.5830273,47.713275 C4.15561274,47.713275 3.00489354,46.5479099 3.00489354,45.1351413 L0.0914807121,45.1351413 C0.0914807121,47.655142 1.81023655,49.7963765 4.12632089,50.4371921 L4.12632089,52.5200682 L7.03950839,52.5200682 L7.03950839,50.4371921 C9.37001333,49.7963765 11.0743486,47.6695626 11.0743486,45.1351413 C11.0743486,42.1201082 8.61270625,39.64382 5.5830273,39.64382 Z" id="Shape"></path><rect id="Rectangle-path" x="12.5457009" y="0.096437795" width="23.9614122" height="2.9131875"></rect><rect id="Rectangle-path" x="1.5335412" y="9.41890819" width="45.9710857" height="2.9131875"></rect><rect id="Rectangle-path" x="1.5335412" y="18.7557992" width="45.9710857" height="2.9131875"></rect><polygon id="Shape" points="48.0582429 45.2081456 48.0582429 42.2949581 33.870621 42.2949581 33.7104171 42.2949581 33.7104171 45.2081456 33.870621 45.2081456"></polygon><polygon id="Shape" points="33.870621 48.849799 33.7104171 48.849799 33.7104171 51.7629865 33.870621 51.7629865 36.3469092 51.7629865 36.4926925 51.7629865 36.4926925 48.849799 36.3469092 48.849799"></polygon><polygon id="Shape" points="39.5660839 48.849799 39.4933049 48.849799 39.4933049 51.7629865 39.5660839 51.7629865 42.3481341 51.7629865 42.4064924 51.7629865 42.4064924 48.849799 42.3481341 48.849799"></polygon><polygon id="Shape" points="48.0582429 48.849799 45.2759675 48.849799 45.2031885 48.849799 45.2031885 51.7629865 45.2759675 51.7629865 48.0582429 51.7629865 48.116376 51.7629865 48.116376 48.849799"></polygon></g><path d="M31.1215152,0 L31.1215152,16.4945455 L66.3439394,16.4945455 L66.3439394,0 L31.1215152,0 Z M62.6024242,12.7333333 L34.8633333,12.7333333 L34.8633333,3.74151515 L62.5830303,3.74151515 L62.5830303,12.7333333 L62.6024242,12.7333333 Z" id="Shape" fill="#FFFFFF"></path><g id="Group" transform="translate(0.000000, 6.363636)" fill="#FFFFFF"><polygon id="Shape" points="73.8272727 0.00303030303 73.8272727 3.74484848 93.6915152 3.74484848 93.6915152 109.784545 3.77424242 109.784545 3.77424242 3.74484848 23.6381818 3.74484848 23.6381818 0.00303030303 0.0324242424 0.00303030303 0.0324242424 113.526061 97.4330303 113.526061 97.4330303 0.00303030303"></polygon></g></g></g></g></g></g></g></g></g></g></svg>
                                        <h6 class="text-center text-white mt-2" >Tax</h6>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expand-transition>
                        <v-expand-transition mode="in-out">
                            <div
                                v-if="hover"
                                class="tax v-card--reveal white--text"
                                style="height: 100%; opacity: 1;"
                            >
                                <v-container fluid class="p-5">
                                    <v-row>
                                        <v-col cols="12">
                                            <h6>Tax</h6>
                                            <p class="mt-4">
                                                Manage Tax Data
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col class="col-12" sm="4" md="4" lg="3">
                <v-hover v-slot="{ hover }">
                    <v-card
                        class="mx-auto"
                        color="#4bb4c6"
                        max-width="450"
                        :height="cardHeight"
                        tile
                    >
                        <v-expand-transition mode="in-out">
                            <v-container fluid class="fill-height" v-if="!hover">
                                <v-row align="center" justify="center">
                                    <v-col class="col-12" sm="4" md="4">
                                        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 120 119" aria-hidden="true"><g id="Data-Store" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="2000-Data-Store" transform="translate(-495.000000, -883.000000)"><g id="menus" transform="translate(70.000000, 154.000000)"><g id="2" transform="translate(0.000000, 660.000000)"><g id="fixed_asset" transform="translate(330.000000, 0.000000)"><g id="Group-2"><g id="Stacked-Group" transform="translate(95.000000, 68.000000)"><g id="fixed_asset_icon"><rect id="Rectangle-4" x="0" y="0" width="120" height="120"></rect><g id="office-block" transform="translate(0.000000, 1.000000)" fill-rule="nonzero"><rect id="Rectangle-path" fill="#FFFFFF" x="68.9366667" y="0.0312121212" width="35.2224242" height="15.3584848"></rect><g id="Group" transform="translate(7.575758, 15.151515)" fill="#2BB4C6"><polygon id="Shape" points="44.3175758 93.7209091 0.103333333 93.7209091 0.103333333 26.4687879 44.3175758 11.6590909"></polygon><rect id="Rectangle-path" x="53.1136364" y="0.238181818" width="51.6975758" height="93.4827273"></rect></g><g id="Group" transform="translate(20.000000, 85.151515)" fill="#FFFFFF"><rect id="Rectangle-path" x="56.8118182" y="0.291515152" width="19.1" height="23.41"></rect><rect id="Rectangle-path" x="0.236363636" y="0.291515152" width="19.1" height="23.41"></rect></g><rect id="Rectangle-path" fill="#2BB4C6" x="1.88060606" y="108.872424" width="116.148182" height="7.3069697"></rect><path d="M114.091212,106.991818 L114.091212,13.5090909 L58.8281818,13.5090909 L58.8281818,106.991818 L53.950303,106.991818 L53.950303,24.3815152 L5.79848485,40.1121212 L5.79848485,106.991818 L0,106.991818 L0,118.040606 L119.889697,118.040606 L119.889697,106.991818 L114.091212,106.991818 Z M62.57,17.270303 L110.526061,17.270303 L110.526061,106.991818 L62.57,106.991818 L62.57,17.270303 Z M9.55969697,42.9330303 L50.2084848,29.4551515 L50.2084848,107.011212 L9.55969697,107.011212 L9.55969697,42.9330303 Z M116.148182,114.298788 L3.74151515,114.298788 L3.74151515,110.733333 L116.148182,110.733333 L116.148182,114.298788 Z" id="Shape" fill="#FFFFFF"></path><g id="Group" transform="translate(13.939394, 28.181818)" fill="#FFFFFF"><rect id="Rectangle-path" x="56.8778788" y="0.137272727" width="11.4209091" height="11.4209091"></rect><rect id="Rectangle-path" x="76.7224242" y="0.137272727" width="11.4209091" height="11.4209091"></rect><rect id="Rectangle-path" x="56.8778788" y="18.6690909" width="11.4209091" height="11.4209091"></rect><rect id="Rectangle-path" x="76.7224242" y="18.6690909" width="11.4209091" height="11.4209091"></rect><rect id="Rectangle-path" x="56.8778788" y="37.4166667" width="11.4209091" height="11.4209091"></rect><rect id="Rectangle-path" x="76.7224242" y="37.4166667" width="11.4209091" height="11.4209091"></rect><rect id="Rectangle-path" x="0.106666667" y="19.4330303" width="11.4209091" height="11.4209091"></rect><rect id="Rectangle-path" x="20.1469697" y="19.4330303" width="11.4209091" height="11.4209091"></rect><rect id="Rectangle-path" x="0.106666667" y="38.1609091" width="11.4209091" height="11.4209091"></rect><rect id="Rectangle-path" x="20.1469697" y="38.1609091" width="11.4209091" height="11.4209091"></rect></g><g id="Group" transform="translate(74.545455, 5.757576)" fill="#2BB4C6"><rect id="Rectangle-path" x="0.18969697" y="0.0721212121" width="3.74151515" height="3.56545455"></rect><rect id="Rectangle-path" x="10.1218182" y="0.0721212121" width="3.74151515" height="3.56545455"></rect><rect id="Rectangle-path" x="19.8775758" y="0.0721212121" width="3.74151515" height="3.56545455"></rect></g></g></g></g></g></g></g></g></g></g></svg>
                                        <h6 class="text-center text-white mt-2" >Fixed Asset Data</h6>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expand-transition>
                        <v-expand-transition mode="in-out">
                            <div
                                v-if="hover"
                                class="price_fixed v-card--reveal white--text"
                                style="height: 100%; opacity: 1;"
                            >
                                <v-container fluid class="p-5">
                                    <v-row>
                                        <v-col cols="12">
                                            <h6>Fixed Asset Data</h6>
                                            <p class="mt-4">
                                                Manage and Create New Fixed Asset Data
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col class="col-12" sm="4" md="4" lg="3">
                <v-hover v-slot="{ hover }">
                    <v-card
                        class="mx-auto"
                        color="#ee69a7"
                        max-width="450"
                        :height="cardHeight"
                        tile
                    >
                        <v-expand-transition mode="in-out">
                            <v-container fluid class="fill-height" v-if="!hover">
                                <v-row align="center" justify="center">
                                    <v-col class="col-12" sm="4" md="4">
                                        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 111 120" aria-hidden="true"><g id="Data-Store" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="2000-Data-Store" transform="translate(-830.000000, -882.000000)"><g id="menus" transform="translate(70.000000, 154.000000)"><g id="2" transform="translate(0.000000, 660.000000)"><g id="measurement_unit" transform="translate(660.000000, 0.000000)"><g id="Group-2"><g id="Stacked-Group" transform="translate(95.000000, 68.000000)"><g id="other_data_icon"><g id="Rectangle-4"></g><g id="copy" mask="url(#mask-2)"><g transform="translate(5.000000, 0.000000)"><polygon id="Shape" fill="#F369A7" fill-rule="nonzero" points="108.302424 16.2987879 108.302424 118.009091 16.3281818 118.009091 16.3281818 103.590909 1.89030303 103.590909 1.89030303 1.88060606 93.8648485 1.88060606 93.8648485 16.2987879"></polygon><path d="M95.7454545,14.4181818 L95.7454545,0 L0.0293939394,0 L0.0293939394,105.471818 L14.4475758,105.471818 L14.4475758,119.89 L110.163636,119.89 L110.163636,14.4181818 L95.7454545,14.4181818 Z M3.77090909,3.74151515 L92.0036364,3.74151515 L92.0036364,101.710303 L3.77090909,101.710303 L3.77090909,3.74151515 Z M106.421818,116.148182 L18.1890909,116.148182 L18.1890909,105.471818 L95.7454545,105.471818 L95.7454545,18.1793939 L106.421818,18.1793939 L106.421818,116.148182 Z" id="Shape" fill="#FFFFFF" fill-rule="nonzero"></path><rect id="Rectangle-path" fill="#FFFFFF" fill-rule="nonzero" x="9.39333333" y="9.36393939" width="76.9881818" height="86.7242424"></rect><g id="Group" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(20.909091, 30.000000)"><rect id="Rectangle-path" fill="#F369A7" fill-rule="nonzero" x="0.277272727" y="23.5781818" width="53.3824242" height="3.74151515"></rect><rect id="Rectangle-path" fill="#F369A7" fill-rule="nonzero" x="0.277272727" y="14.2142424" width="53.3824242" height="3.74151515"></rect><rect id="Rectangle-path" fill="#F369A7" fill-rule="nonzero" x="0.277272727" y="32.9421212" width="53.3824242" height="3.74151515"></rect><rect id="Rectangle-path" fill="#F369A7" fill-rule="nonzero" x="0.277272727" y="42.129697" width="32.0293939" height="3.74151515"></rect><rect id="Rectangle-path" fill="#F369A7" fill-rule="nonzero" x="0.277272727" y="0.168484848" width="3.74151515" height="3.74151515"></rect><rect id="Rectangle-path" fill="#F369A7" fill-rule="nonzero" x="8.8969697" y="0.168484848" width="3.74151515" height="3.74151515"></rect><rect id="Rectangle-path" fill="#F369A7" fill-rule="nonzero" x="17.5163636" y="0.168484848" width="3.74151515" height="3.74151515"></rect></g></g></g></g></g></g></g></g></g></g></g></svg>
                                        <h6 class="text-center text-white mt-2" >Other Data</h6>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expand-transition>
                        <v-expand-transition mode="in-out">
                            <div
                                v-if="hover"
                                class="other_data v-card--reveal white--text"
                                style="height: 100%; opacity: 1;"
                            >
                                <v-container fluid class="p-5">
                                    <v-row>
                                        <v-col cols="12">
                                            <h6>Other Data</h6>
                                            <p class="mt-4">
                                                Manage Other Data
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-hover>
            </v-col> -->
            <v-col class="col-6" sm="4" md="4" lg="3" v-for="(menu_item, i) in menus" :key="i">
                <v-hover v-slot="{ hover }" v-if="menu_item.menu_id === 'mnuUserManagement'">
                    <v-card
                        class="mx-auto"
                        color="#53b957"
                        max-width="450"
                        :height="cardHeight"
                        tile
                        :to="menu_item.route_path"
                    >
                        <v-expand-transition mode="in-out">
                            <v-container fluid class="fill-height" v-if="!hover">
                                <v-row align="center" justify="center">
                                    <v-col class="col-6" sm="4" md="4" >
                                        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 102 120" aria-hidden="true"><g fill="none"><g transform="translate(1.897 1.818)"><polygon points="18.829 .062 97.774 .062 97.774 116.211 18.829 116.211"></polygon><polygon points=".068 .062 18.829 .062 18.829 116.211 .068 116.211"></polygon></g><path fill="#FFF" d="M0.0237092699,0 L0.0237092699,119.889697 L101.653337,119.889697 L101.653337,0 L0.0237092699,0 Z M18.7840643,116.148182 L3.92688735,116.148182 L3.92688735,109.213333 L9.19951286,109.213333 L9.19951286,105.471818 L3.92688735,105.471818 L3.92688735,95.539697 L9.19951286,95.539697 L9.19951286,91.7981818 L3.92688735,91.7981818 L3.92688735,82.0621212 L9.19951286,82.0621212 L9.19951286,78.3206061 L3.92688735,78.3206061 L3.92688735,68.5648485 L9.19951286,68.5648485 L9.19951286,64.8233333 L3.92688735,64.8233333 L3.92688735,55.0872727 L9.19951286,55.0872727 L9.19951286,51.3260606 L3.92688735,51.3260606 L3.92688735,41.59 L9.19951286,41.59 L9.19951286,37.8484848 L3.92688735,37.8484848 L3.92688735,28.1115152 L9.19951286,28.1115152 L9.19951286,24.369697 L3.92688735,24.369697 L3.92688735,14.4375758 L9.19951286,14.4375758 L9.19951286,10.6960606 L3.92688735,10.6960606 L3.92688735,3.76121212 L18.7840643,3.76121212 L18.7840643,116.148182 Z M97.7292946,116.148182 L22.6875585,116.148182 L22.6875585,3.74151515 L97.7296107,3.74151515 L97.7296107,116.148182 L97.7292946,116.148182 Z"></path><polygon fill="#FFF" points="74.289 9.364 28.553 9.364 28.553 110.526 91.864 110.526 91.864 26.231"></polygon><polygon fill="#53b957" points="74.289 26.231 91.864 26.231 74.289 9.364"></polygon><g fill="#53b957" transform="translate(35.722 41.212)"><polygon points=".065 59.95 3.968 59.95 3.968 63.691 .065 63.691"></polygon><polygon points="9.057 59.95 12.96 59.95 12.96 63.691 9.057 63.691"></polygon><polygon points="18.029 59.95 21.932 59.95 21.932 63.691 18.029 63.691"></polygon><polygon points="27.021 59.95 30.924 59.95 30.924 63.691 27.021 63.691"></polygon><rect width="3.903" height="3.742" x="36.012" y="59.95"></rect><polygon points="45.005 59.95 48.908 59.95 48.908 63.691 45.005 63.691"></polygon><polygon points=".065 44.964 3.968 44.964 3.968 48.705 .065 48.705"></polygon><polygon points="9.057 44.964 12.96 44.964 12.96 48.705 9.057 48.705"></polygon><polygon points="18.029 44.964 21.932 44.964 21.932 48.705 18.029 48.705"></polygon><polygon points="27.021 44.964 30.924 44.964 30.924 48.705 27.021 48.705"></polygon><polygon points="36.012 44.964 39.916 44.964 39.916 48.705 36.012 48.705"></polygon><polygon points="45.005 44.964 48.908 44.964 48.908 48.705 45.005 48.705"></polygon><polygon points=".065 29.977 3.968 29.977 3.968 33.719 .065 33.719"></polygon><polygon points="9.057 29.977 12.96 29.977 12.96 33.719 9.057 33.719"></polygon><polygon points="18.029 29.977 21.932 29.977 21.932 33.719 18.029 33.719"></polygon><polygon points="27.021 29.977 30.924 29.977 30.924 33.719 27.021 33.719"></polygon><rect width="3.903" height="3.742" x="36.012" y="29.977"></rect><rect width="3.903" height="3.742" x="45.005" y="29.977"></rect><polygon points=".065 14.991 3.968 14.991 3.968 18.733 .065 18.733"></polygon><polygon points="9.057 14.991 12.96 14.991 12.96 18.733 9.057 18.733"></polygon><polygon points="18.029 14.991 21.932 14.991 21.932 18.733 18.029 18.733"></polygon><polygon points="27.021 14.991 30.924 14.991 30.924 18.733 27.021 18.733"></polygon><polygon points="36.012 14.991 39.916 14.991 39.916 18.733 36.012 18.733"></polygon><rect width="3.903" height="3.742" x="45.005" y="14.991"></rect><polygon points=".065 .181 3.968 .181 3.968 3.923 .065 3.923"></polygon><polygon points="9.057 .181 12.96 .181 12.96 3.923 9.057 3.923"></polygon><polygon points="18.029 .181 21.932 .181 21.932 3.923 18.029 3.923"></polygon><polygon points="27.021 .181 30.924 .181 30.924 3.923 27.021 3.923"></polygon><rect width="3.903" height="3.742" x="36.012" y=".181"></rect><rect width="3.903" height="3.742" x="45.005" y=".181"></rect></g></g></svg>
                                    </v-col>
                                    <v-col cols="12" class="text-center">
                                        <h6 class="text-center text-white mt-2" >{{ menu_item.menu_caption }}</h6>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expand-transition>
                        <v-expand-transition mode="in-out">
                            <div
                                v-if="hover"
                                class="user_management v-card--reveal white--text"
                                style="height: 100%; opacity: 1;"
                            >
                                <v-container fluid class="p-5">
                                    <v-row>
                                        <v-col cols="12">
                                            <h6>{{ menu_item.menu_caption }}</h6>
                                            <p class="mt-4">
                                                {{menu_item.description}}
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
import {menu} from "../../backend-api/menu/index" 
  
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
            menus: [],
            items: [{name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'd'}],
            theme: {
                isDark: false
            },
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
    async mounted(){
        this.loading = true
        await this.getPullData()
        this.loading = false
    },
    methods: {
        async getPullData(){
            var reqBody = {
                'entity_id': 'GKI',
                'appl_id': 'WEBGK',
                'menu_header_caption': 'Data Store'
            }

            const respData = await menu.menu_item('', reqBody, false, false, false)

            if (respData.status === 200) {
                this.menus = respData.data
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
  
  .blue_contact{
      background-color: #2eb3ec;
      color: #2eb3ec;
  }
  
  .orange_chart{
      background-color: #f56b3b;
      color: #f56b3b;
  }
  
  .red_product{
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
  
  .department_coklat{
      background-color: #f5aa3b;
      color: #f5aa3b;
  }
  
  .project{
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
  
  .price_fixed{
      background-color: #4bb4c6;
      color: #4bb4c6;  
  }
  
  .other_data{
      background-color: #ee69a7;
      color: #ee69a7; 
  }
  .user_management{
    background-color: #53b957;
    color: #53b957; 
  }
  </style>
