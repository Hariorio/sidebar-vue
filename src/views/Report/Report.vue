<template>
   <v-container class="mt-12 mb-12">
    <v-row>
        <v-col class="col-12" sm="4" md="4" lg="3">
            <v-hover v-slot="{ hover }">
                <v-card
                    class="mx-auto"
                    color="#ee69a7"
                    max-width="400"
                    height="350"
                    tile
                >
                    <v-container class="fill-height">
                        <v-row align="center" justify="center">
                            <v-col class="col-12" sm="4" md="4">
                                    <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 98 120" aria-hidden="true"><g fill="none"><polyline points="73.827 8.247 95.572 8.247 95.572 118.009 1.893 118.009 1.893 8.247 23.638 8.247"></polyline><rect width="78.673" height="88.605" x="9.396" y="21.921" fill="#2EA2DB"></rect><path fill="#193651" d="M66.3439394,16.4945455 L31.1215152,16.4945455 L31.1215152,0 L66.3439394,0 L66.3439394,16.4945455 Z M34.8630303,12.7333333 L62.5827273,12.7333333 L62.5827273,3.74151515 L34.8630303,3.74151515 L34.8630303,12.7333333 Z"></path><rect width="15.182" height="15.182" x="17.644" y="30.345" fill="#FFF"></rect><rect width="15.182" height="15.182" x="17.644" y="58.632" fill="#FFF"></rect><rect width="15.182" height="15.182" x="17.644" y="86.724" fill="#FFF"></rect><rect width="78.673" height="88.605" x="9.394" y="21.818" fill="#FFF"></rect><g fill="#EE69A7" transform="translate(24.683 39.691)"><path d="M5.5830273,39.64382 C4.15561274,39.64382 3.00489354,38.4784549 3.00489354,37.0656862 C3.00489354,35.6382717 4.17025867,34.4875525 5.5830273,34.4875525 C7.01044186,34.4875525 8.16116106,35.6529176 8.16116106,37.0656862 L11.0743486,37.0656862 C11.0743486,34.5456855 9.35559272,32.404451 7.03950839,31.7636354 L7.03950839,29.2580553 L4.12632089,29.2580553 L4.12632089,31.7634101 C1.79581595,32.4042257 0.0914807121,34.5310396 0.0914807121,37.0654609 C0.0914807121,40.0951399 2.55312303,42.5570075 5.5830273,42.5570075 C7.01044186,42.5570075 8.16116106,43.7223726 8.16116106,45.1351413 C8.16116106,46.5481352 6.99579593,47.713275 5.5830273,47.713275 C4.15561274,47.713275 3.00489354,46.5479099 3.00489354,45.1351413 L0.0914807121,45.1351413 C0.0914807121,47.655142 1.81023655,49.7963765 4.12632089,50.4371921 L4.12632089,52.5200682 L7.03950839,52.5200682 L7.03950839,50.4371921 C9.37001333,49.7963765 11.0743486,47.6695626 11.0743486,45.1351413 C11.0743486,42.1201082 8.61270625,39.64382 5.5830273,39.64382 Z"></path><polygon points="12.546 .096 36.507 .096 36.507 3.01 12.546 3.01"></polygon><polygon points="1.534 9.419 47.505 9.419 47.505 12.332 1.534 12.332"></polygon><polygon points="1.534 18.756 47.505 18.756 47.505 21.669 1.534 21.669"></polygon><polygon points="48.058 45.208 48.058 42.295 33.871 42.295 33.71 42.295 33.71 45.208 33.871 45.208"></polygon><polygon points="33.871 48.85 33.71 48.85 33.71 51.763 33.871 51.763 36.347 51.763 36.493 51.763 36.493 48.85 36.347 48.85"></polygon><polygon points="39.566 48.85 39.493 48.85 39.493 51.763 39.566 51.763 42.348 51.763 42.406 51.763 42.406 48.85 42.348 48.85"></polygon><polygon points="48.058 48.85 45.276 48.85 45.203 48.85 45.203 51.763 45.276 51.763 48.058 51.763 48.116 51.763 48.116 48.85"></polygon></g><path fill="#FFF" d="M31.1215152,0 L31.1215152,16.4945455 L66.3439394,16.4945455 L66.3439394,0 L31.1215152,0 Z M62.6024242,12.7333333 L34.8633333,12.7333333 L34.8633333,3.74151515 L62.5830303,3.74151515 L62.5830303,12.7333333 L62.6024242,12.7333333 Z"></path><polygon fill="#FFF" points="73.827 .003 73.827 3.745 93.692 3.745 93.692 109.785 3.774 109.785 3.774 3.745 23.638 3.745 23.638 .003 .032 .003 .032 113.526 97.433 113.526 97.433 .003" transform="translate(0 6.364)"></polygon></g></svg>
                                <h6 class="text-center text-white">Financial Statement</h6>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-expand-transition>
                        <div
                            v-if="hover"
                            class="transition-fast-in-fast-out kelassatu v-card--reveal white--text"
                            style="height: 100%; opacity: 1;"
                        >
                            <v-container class="p-5">
                                <v-row>
                                    <v-col cols="12">
                                        <h6>Financial Statement</h6>
                                        <p class="mt-4">
                                          Report List
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
                    color="#2eb3ec"
                    max-width="400"
                    height="350"
                    tile
                >
                    <v-container class="fill-height">
                        <v-row align="center" justify="center">
                            <v-col class="col-12" sm="4" md="4">
                            <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 98 120" aria-hidden="true"><g fill="none"><polyline points="73.827 8.247 95.572 8.247 95.572 118.009 1.893 118.009 1.893 8.247 23.638 8.247"></polyline><rect width="78.673" height="88.605" x="9.396" y="21.921" fill="#2EA2DB"></rect><path fill="#193651" d="M66.3439394,16.4945455 L31.1215152,16.4945455 L31.1215152,0 L66.3439394,0 L66.3439394,16.4945455 Z M34.8630303,12.7333333 L62.5827273,12.7333333 L62.5827273,3.74151515 L34.8630303,3.74151515 L34.8630303,12.7333333 Z"></path><rect width="15.182" height="15.182" x="17.644" y="30.345" fill="#FFF"></rect><rect width="15.182" height="15.182" x="17.644" y="58.632" fill="#FFF"></rect><rect width="15.182" height="15.182" x="17.644" y="86.724" fill="#FFF"></rect><polygon points="66.344 8.247 66.344 16.495 31.122 16.495 31.122 8.247 1.893 8.247 1.893 118.009 95.572 118.009 95.572 8.247"></polygon><rect width="78.673" height="88.605" x="9.394" y="21.818" fill="#FFF"></rect><g fill="#46B7FF" transform="translate(16.06 28.485)"><polygon points="2.351 31.595 6.092 31.595 6.092 35.337 2.351 35.337"></polygon><polygon points="11.911 31.595 15.652 31.595 15.652 35.337 11.911 35.337"></polygon><polygon points="21.451 31.595 25.192 31.595 25.192 35.337 21.451 35.337"></polygon><g transform="translate(0 .284)"><path d="M24.066125,2.9876253 L15.7707026,12.0546976 L25.9148021,19.1281131 C27.2974554,17.134705 28.0691053,14.6750245 28.0691053,12.0546976 C28.0529411,8.5179898 26.5258056,5.30257485 24.066125,2.9876253 Z"></path><path d="M12.3787258,12.3600749 L20.6741482,3.29300268 C18.5198451,1.29959462 15.5941408,0.0616723052 12.3787258,0.0616723052 C5.6106877,0.0616723052 0.0803232039,5.59178812 0.0803232039,12.3600749 C0.0803232039,19.1283618 5.61043902,24.6584776 12.3787258,24.6584776 C16.526437,24.6584776 20.2237912,22.5041744 22.5228253,19.4337391 L12.3787258,12.3600749 Z"></path></g></g><polygon fill="#46B7FF" points="75.325 98.118 75.325 71.515 71.584 71.515 71.584 98.118 65.393 98.118 65.393 83.876 61.652 83.876 61.652 98.118 55.461 98.118 55.461 78.626 51.72 78.626 51.72 98.118 45.725 98.118 45.725 85.757 41.984 85.757 41.984 98.118 35.793 98.118 35.793 83.876 32.052 83.876 32.052 98.118 25.861 98.118 25.861 89.303 22.119 89.303 22.119 98.118 18.182 98.118 18.182 101.86 79.263 101.86 79.263 98.118"></polygon><path fill="#FFF" d="M31.1215152,0 L31.1215152,16.4945455 L66.3439394,16.4945455 L66.3439394,0 L31.1215152,0 Z M62.6024242,12.7333333 L34.8633333,12.7333333 L34.8633333,3.74151515 L62.5830303,3.74151515 L62.5830303,12.7333333 L62.6024242,12.7333333 Z"></path><polygon fill="#FFF" points="73.827 .003 73.827 3.745 93.692 3.745 93.692 109.785 3.774 109.785 3.774 3.745 23.638 3.745 23.638 .003 .032 .003 .032 113.526 97.433 113.526 97.433 .003" transform="translate(0 6.364)"></polygon></g></svg>
                                <h6 class="text-center text-white mt-2" style="font-size:0.8rem">Sales And Receivable Report</h6>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-expand-transition>
                        <div
                            v-if="hover"
                            class="transition-fast-in-fast-out kelasdua v-card--reveal white--text"
                            style="height: 100%; opacity: 1;"
                        >
                            <v-container class="p-5">
                                <v-row>
                                    <v-col cols="12">
                                        <h6>Sales And Receivable Report</h6>
                                        <p class="mt-4">
                                            Report List
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
                    color="#f56b3b"
                    max-width="400"
                    height="350"
                    tile
                >
                    <v-container class="fill-height">
                        <v-row align="center" justify="center">
                            <v-col class="col-12" sm="4" md="4">
                              <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 98 120" aria-hidden="true"><g fill="none"><polyline points="73.827 8.247 95.572 8.247 95.572 118.009 1.893 118.009 1.893 8.247 23.638 8.247"></polyline><rect width="78.673" height="88.605" x="9.396" y="21.921" fill="#2EA2DB"></rect><path fill="#193651" d="M66.3439394,16.4945455 L31.1215152,16.4945455 L31.1215152,0 L66.3439394,0 L66.3439394,16.4945455 Z M34.8630303,12.7333333 L62.5827273,12.7333333 L62.5827273,3.74151515 L34.8630303,3.74151515 L34.8630303,12.7333333 Z"></path><rect width="15.182" height="15.182" x="17.644" y="30.345" fill="#FFF"></rect><rect width="15.182" height="15.182" x="17.644" y="58.632" fill="#FFF"></rect><rect width="15.182" height="15.182" x="17.644" y="86.724" fill="#FFF"></rect><polygon points="66.344 8.247 66.344 16.495 31.122 16.495 31.122 8.247 1.893 8.247 1.893 118.009 95.572 118.009 95.572 8.247"></polygon><rect width="78.673" height="88.605" x="9.394" y="21.818" fill="#FFF"></rect><g fill="#F56B3B" transform="translate(21.818 30.91)"><path d="M6.80141736 25.8033153C8.88096086 27.1401647 11.4061208 27.8828588 14.0798196 27.8828588 20.6155278 27.8828588 26.1114642 23.2781554 27.4483136 17.0395249L14.6739749 15.4055978 6.80141736 25.8033153zM27.8939301 14.3658261C27.8939301 14.0687484 27.8939301 13.9202096 27.8939301 13.6231319 27.8939301 6.4932685 22.3979937.551715624 15.2681302.106099158L15.2681302 12.731899 27.8939301 14.3658261zM12.7429702.106099158C5.76164561.700254446.117170375 6.4932685.117170375 13.6231319.117170375 17.782219 1.89963624 21.3471507 4.72187385 23.8723107L12.5944314 13.3260543 12.5944314.106099158 12.7429702.106099158z"></path><polygon points="1 65 7.981 65 7.981 71.981 1 71.981"></polygon><polygon points="1 51 7.981 51 7.981 57.981 1 57.981"></polygon><polygon points="18 67 55.027 67 55.027 70.703 18 70.703"></polygon><polygon points="18 53 55.027 53 55.027 56.703 18 56.703"></polygon><polygon points="18 40 55.027 40 55.027 43.703 18 43.703"></polygon><polygon points="1 38 7.981 38 7.981 44.981 1 44.981"></polygon></g><path fill="#FFF" d="M31.1215152,0 L31.1215152,16.4945455 L66.3439394,16.4945455 L66.3439394,0 L31.1215152,0 Z M62.6024242,12.7333333 L34.8633333,12.7333333 L34.8633333,3.74151515 L62.5830303,3.74151515 L62.5830303,12.7333333 L62.6024242,12.7333333 Z"></path><polygon fill="#FFF" points="73.827 .003 73.827 3.745 93.692 3.745 93.692 109.785 3.774 109.785 3.774 3.745 23.638 3.745 23.638 .003 .032 .003 .032 113.526 97.433 113.526 97.433 .003" transform="translate(0 6.364)"></polygon></g></svg>
                                <h6 class="text-center text-white mt-2">Purchase And Payble Report</h6>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-expand-transition>
                        <div
                            v-if="hover"
                            class="transition-fast-in-fast-out kelastiga v-card--reveal white--text"
                            style="height: 100%; opacity: 1;"
                        >
                            <v-container class="p-5">
                                <v-row>
                                    <v-col cols="12">
                                        <h6>Purchase And Payble Report</h6>
                                        <p class="mt-4">
                                            Report List
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
                    color="#e95044"
                    max-width="400"
                    height="350"
                    tile
                >
                    <v-container class="fill-height">
                        <v-row align="center" justify="center">
                            <v-col class="col-12" sm="4" md="4">
                          <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 98 120" aria-hidden="true"><g fill="none"><polyline points="73.827 8.247 95.572 8.247 95.572 118.009 1.893 118.009 1.893 8.247 23.638 8.247"></polyline><rect width="78.673" height="88.605" x="9.396" y="21.921" fill="#2EA2DB"></rect><path fill="#193651" d="M66.3439394,16.4945455 L31.1215152,16.4945455 L31.1215152,0 L66.3439394,0 L66.3439394,16.4945455 Z M34.8630303,12.7333333 L62.5827273,12.7333333 L62.5827273,3.74151515 L34.8630303,3.74151515 L34.8630303,12.7333333 Z"></path><rect width="15.182" height="15.182" x="17.644" y="30.345" fill="#FFF"></rect><rect width="15.182" height="15.182" x="17.644" y="58.632" fill="#FFF"></rect><rect width="15.182" height="15.182" x="17.644" y="86.724" fill="#FFF"></rect><polygon points="66.344 8.247 66.344 16.495 31.122 16.495 31.122 8.247 1.893 8.247 1.893 118.009 95.572 118.009 95.572 8.247"></polygon><rect width="78.673" height="88.605" x="9.394" y="21.818" fill="#FFF"></rect><g transform="translate(16.669 32.112)"><polygon fill="#FFF" points="62.652 16.27 62.652 51.793 32.104 66.4 1.556 51.793 1.556 16.27 32.104 1.663"></polygon><path fill="#E95044" d="M63.3597271,15.0323546 C63.3597271,15.0323546 63.3597271,14.8681643 63.3597271,15.0323546 L32.8118144,0.261072399 C32.3265983,0.0968820875 31.858203,0.0968820875 31.3729869,0.261072399 L0.825333075,14.8681643 C0.65815995,14.703974 -0.128278328,15.8047608 0.0223327542,16.2813193 L0.0223327542,51.64044 C0.0223327542,52.2649223 0.340116961,52.7412267 0.975944157,53.053595 C0.975944157,53.053595 32.0088141,67.8248772 32.176246,67.8248772 C32.3436779,67.8248772 63.3765479,53.053595 63.3765479,53.053595 C63.861764,52.7414809 64.3301593,52.2649223 64.3301593,51.64044 L64.3301593,16.2810652 C64.3133385,15.9689511 63.5103381,15.0323546 63.3597271,15.0323546 Z M30.5534246,63.8977805 L3.20095117,50.7038435 L3.20095117,18.7950069 L30.5534246,31.9889439 L30.5534246,63.8977805 Z M32.1594252,29.3273325 L5.29216792,16.4455096 L32.1594252,3.39949649 L59.0266825,16.2813193 L32.1594252,29.3273325 Z M61.1178992,50.7038435 L33.7654258,63.8977805 L33.7654258,32.0054646 L61.1178992,18.8115276 L61.1178992,50.7038435 Z"></path><polygon fill="#E95044" points="16.048 16.321 32.041 8.78 48.034 16.321 32.041 24.027"></polygon></g><path fill="#FFF" d="M31.1215152,0 L31.1215152,16.4945455 L66.3439394,16.4945455 L66.3439394,0 L31.1215152,0 Z M62.6024242,12.7333333 L34.8633333,12.7333333 L34.8633333,3.74151515 L62.5830303,3.74151515 L62.5830303,12.7333333 L62.6024242,12.7333333 Z"></path><polygon fill="#FFF" points="73.827 .003 73.827 3.745 93.692 3.745 93.692 109.785 3.774 109.785 3.774 3.745 23.638 3.745 23.638 .003 .032 .003 .032 113.526 97.433 113.526 97.433 .003" transform="translate(0 6.364)"></polygon></g></svg>
                                <h6 class="text-center text-white mt-2" >Product Report</h6>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-expand-transition>
                        <div
                            v-if="hover"
                            class="transition-fast-in-fast-out kelasempat v-card--reveal white--text"
                            style="height: 100%; opacity: 1;"
                        >
                            <v-container class="p-5">
                                <v-row>
                                    <v-col cols="12">
                                        <h6>Product Report</h6>
                                        <p class="mt-4">
                                            Report List
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
                    max-width="400"
                    height="350"
                    tile
                >
                    <v-container class="fill-height">
                        <v-row align="center" justify="center">
                            <v-col class="col-12" sm="4" md="4">
                             <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 98 120" aria-hidden="true"><g fill="none"><polyline points="73.827 8.247 95.572 8.247 95.572 118.009 1.893 118.009 1.893 8.247 23.638 8.247"></polyline><rect width="78.673" height="88.605" x="9.396" y="21.921" fill="#2EA2DB"></rect><path fill="#193651" d="M66.3439394,16.4945455 L31.1215152,16.4945455 L31.1215152,0 L66.3439394,0 L66.3439394,16.4945455 Z M34.8630303,12.7333333 L62.5827273,12.7333333 L62.5827273,3.74151515 L34.8630303,3.74151515 L34.8630303,12.7333333 Z"></path><polygon points="66.344 8.247 66.344 16.495 31.122 16.495 31.122 8.247 1.893 8.247 1.893 118.009 95.572 118.009 95.572 8.247"></polygon><rect width="78.673" height="88.605" x="9.394" y="21.818" fill="#FFF"></rect><g fill="#5581AD" transform="translate(22.424 45.455)"><polygon points=".195 .159 52.242 .159 52.242 3.502 .195 3.502"></polygon><polygon points=".195 12.707 52.242 12.707 52.242 16.05 .195 16.05"></polygon><polygon points=".195 25.43 52.242 25.43 52.242 28.773 .195 28.773"></polygon><polygon points=".195 37.978 27.479 37.978 27.479 41.321 .195 41.321"></polygon></g><path fill="#FFF" d="M31.1215152,0 L31.1215152,16.4945455 L66.3439394,16.4945455 L66.3439394,0 L31.1215152,0 Z M62.6024242,12.7333333 L34.8633333,12.7333333 L34.8633333,3.74151515 L62.5830303,3.74151515 L62.5830303,12.7333333 L62.6024242,12.7333333 Z"></path><polygon fill="#FFF" points="73.827 .003 73.827 3.745 93.692 3.745 93.692 109.785 3.774 109.785 3.774 3.745 23.638 3.745 23.638 .003 .032 .003 .032 113.526 97.433 113.526 97.433 .003" transform="translate(0 6.364)"></polygon></g></svg>
                                <h6 class="text-center text-white mt-2" >Other Report</h6>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-expand-transition>
                        <div
                            v-if="hover"
                            class="transition-fast-in-fast-out kelaslima v-card--reveal white--text"
                            style="height: 100%; opacity: 1;"
                        >
                            <v-container class="p-5">
                                <v-row>
                                    <v-col cols="12">
                                        <h6>Other Report</h6>
                                        <p class="mt-4">
                                          Report List
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
export default {

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
.kelassatu{
    background-color: #ee69a7;
    color: #ee69a7;
}
.kelasdua{
    background-color: #2eb3ec;
    color: #2eb3ec;
}
.kelastiga{
    background-color: #f56b3b;
    color: #f56b3b;
}
.kelasempat{
    background-color: #e95044;
    color: #e95044;
}
.kelaslima{
    background-color: #5581ad;
    color: #5581ad;
}
</style>