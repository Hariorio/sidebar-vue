<template>
    <v-container class="mt-12 mb-12">
      <v-row>
          <v-col class="col-12" sm="4" md="4" lg="3">
              <v-hover v-slot="{ hover }">
                  <v-card
                      class="mx-auto"
                      color="#2eb3ec"
                      max-width="400"
                      height="350"
                      tile
                  >
                        <v-expand-transition mode="in-out">
                            <v-container class="fill-height" v-if="!hover">
                                <v-row align="center" justify="center">
                                    <v-col class="col-12" sm="4" md="4">
                                        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 121 120" aria-hidden="true"><g id="Sales" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="4000-Sales" transform="translate(-165.000000, -228.000000)" fill="#FFFFFF"><g id="contact_data" transform="translate(70.000000, 160.000000)"><g id="mail" transform="translate(95.000000, 68.000000)"><g id="Group"><path d="M31.8823363,32.7575783 L31.8823363,63.5685742 L91.5098727,63.5685742 L91.5098727,116.627211 C105.568856,116.450686 116.255043,116.254749 116.255043,116.254749 L116.255043,3.76466306 L69.4243285,3.76466306 L69.4243285,0 L120,0 L120,120 L0,120 L0,63.5685742 L28.1176637,63.5685742 L28.1176637,32.7575783 L31.8823363,32.7575783 Z M82.8825486,67.3135222 L8.62732411,67.3135222 L45.7453821,89.6273099 L82.8825486,67.3135222 Z M87.7452001,116.254749 L87.7452001,68.627454 L46.686247,93.3725612 C46.4903093,93.5684984 46.1175424,93.5684984 45.7450788,93.5684984 C45.3726152,93.5684984 45.1763742,93.5684984 44.8039107,93.3725612 L3.74495749,68.627454 L3.74495749,116.254749 L87.7452001,116.254749 Z" id="Combined-Shape"></path><g id="Group-3" transform="translate(42.121212, 15.757576)" fill-rule="nonzero"><rect id="Rectangle-path" x="0.280148654" y="23.6363636" width="63.4725786" height="3.74151515"></rect><rect id="Rectangle-path-Copy" x="0.280148654" y="35.4545455" width="63.4725786" height="3.74151515"></rect><rect id="Rectangle-path-Copy-3" x="27.2296792" y="0.197878788" width="36.5459297" height="3.74151515"></rect><rect id="Rectangle-path-Copy-2" x="27.2296792" y="12.0160606" width="36.5459297" height="3.74151515"></rect></g><g id="Group-3" transform="translate(41.454545, 13.500000) scale(-1, 1) translate(-41.454545, -13.500000) translate(27.454545, 0.000000)" fill-rule="nonzero"><polygon id="Shape" points="14.8012121 0 14.8012121 3.74151515 21.9124242 3.74151515 23.4209091 5.25 23.4209091 12.3612121 27.1624242 12.3612121 27.1624242 0"></polygon><rect id="Rectangle-path" transform="translate(8.051344, 19.107666) rotate(-135.000000) translate(-8.051344, -19.107666) " x="6.20015" y="17.2564717" width="3.70238874" height="3.70238874"></rect><rect id="Rectangle-path" transform="translate(2.813067, 24.337750) rotate(-135.000000) translate(-2.813067, -24.337750) " x="0.961872329" y="22.4865558" width="3.70238874" height="3.70238874"></rect><rect id="Rectangle-path" transform="translate(18.726978, 8.429172) rotate(-135.000000) translate(-18.726978, -8.429172) " x="16.8757838" y="6.57797806" width="3.70238874" height="3.70238874"></rect><rect id="Rectangle-path" transform="translate(13.303625, 13.861441) rotate(-135.000000) translate(-13.303625, -13.861441) " x="11.4524311" y="12.0102468" width="3.70238874" height="3.70238874"></rect></g><rect id="Rectangle-path" fill-rule="nonzero" x="31.4612121" y="100.966061" width="3.74151515" height="3.74151515"></rect><rect id="Rectangle-path" fill-rule="nonzero" x="43.8421212" y="100.966061" width="3.74151515" height="3.74151515"></rect><rect id="Rectangle-path" fill-rule="nonzero" x="56.2033333" y="100.966061" width="3.74151515" height="3.74151515"></rect></g></g></g></g></g></svg>
                                        <h6 class="text-center text-white mt-3">Sales Quotation</h6>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expand-transition>
                        <v-expand-transition mode="in-out">
                            <div
                                v-if="hover"
                                class="blue_contact_sales v-card--reveal white--text"
                                style="height: 100%; opacity: 1;"
                            >
                                <v-container class="p-5">
                                    <v-row>
                                        <v-col cols="12">
                                            <h6>Sales Quotation</h6>
                                            <p class="mt-4">
                                                Create Sales Quotation To Customer
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
                        <v-expand-transition mode="in-out">
                            <v-container class="fill-height" v-if="!hover">
                                <v-row align="center" justify="center">
                                    <v-col class="col-12" sm="4" md="4">
                                        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 121 120" aria-hidden="true"><g id="Sales" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="4000-Sales" transform="translate(-495.000000, -228.000000)" fill="#FFFFFF"><g id="currency_data" transform="translate(400.000000, 160.000000)"><g id="mail" transform="translate(95.000000, 68.000000)"><g id="Group"><path d="M31.8823363,32.7575783 L31.8823363,63.5685742 L91.5098727,63.5685742 L91.5098727,116.627211 C105.568856,116.450686 116.255043,116.254749 116.255043,116.254749 L116.255043,3.76466306 L69.4243285,3.76466306 L69.4243285,0 L120,0 L120,120 L0,120 L0,63.5685742 L28.1176637,63.5685742 L28.1176637,32.7575783 L31.8823363,32.7575783 Z M82.8825486,67.3135222 L8.62732411,67.3135222 L45.7453821,89.6273099 L82.8825486,67.3135222 Z M87.7452001,116.254749 L87.7452001,68.627454 L46.686247,93.3725612 C46.4903093,93.5684984 46.1175424,93.5684984 45.7450788,93.5684984 C45.3726152,93.5684984 45.1763742,93.5684984 44.8039107,93.3725612 L3.74495749,68.627454 L3.74495749,116.254749 L87.7452001,116.254749 Z" id="Combined-Shape"></path><g id="Group-3" transform="translate(42.121212, 15.757576)" fill-rule="nonzero"><rect id="Rectangle-path" x="0.280148654" y="23.6363636" width="63.4725786" height="3.74151515"></rect><rect id="Rectangle-path-Copy" x="0.280148654" y="35.4545455" width="63.4725786" height="3.74151515"></rect><rect id="Rectangle-path-Copy-3" x="27.2296792" y="0.197878788" width="36.5459297" height="3.74151515"></rect><rect id="Rectangle-path-Copy-2" x="27.2296792" y="12.0160606" width="36.5459297" height="3.74151515"></rect></g><g id="Group-3" transform="translate(41.454545, 13.500000) scale(1, -1) translate(-41.454545, -13.500000) translate(27.454545, 0.000000)" fill-rule="nonzero"><polygon id="Shape" points="14.8012121 0 14.8012121 3.74151515 21.9124242 3.74151515 23.4209091 5.25 23.4209091 12.3612121 27.1624242 12.3612121 27.1624242 0"></polygon><rect id="Rectangle-path" transform="translate(8.051344, 19.107666) rotate(-135.000000) translate(-8.051344, -19.107666) " x="6.20015" y="17.2564717" width="3.70238874" height="3.70238874"></rect><rect id="Rectangle-path" transform="translate(2.813067, 24.337750) rotate(-135.000000) translate(-2.813067, -24.337750) " x="0.961872329" y="22.4865558" width="3.70238874" height="3.70238874"></rect><rect id="Rectangle-path" transform="translate(18.726978, 8.429172) rotate(-135.000000) translate(-18.726978, -8.429172) " x="16.8757838" y="6.57797806" width="3.70238874" height="3.70238874"></rect><rect id="Rectangle-path" transform="translate(13.303625, 13.861441) rotate(-135.000000) translate(-13.303625, -13.861441) " x="11.4524311" y="12.0102468" width="3.70238874" height="3.70238874"></rect></g><rect id="Rectangle-path" fill-rule="nonzero" x="31.4612121" y="100.966061" width="3.74151515" height="3.74151515"></rect><rect id="Rectangle-path" fill-rule="nonzero" x="43.8421212" y="100.966061" width="3.74151515" height="3.74151515"></rect><rect id="Rectangle-path" fill-rule="nonzero" x="56.2033333" y="100.966061" width="3.74151515" height="3.74151515"></rect></g></g></g></g></g></svg>
                                        <h6 class="text-center text-white mt-2" >Sales Order</h6>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expand-transition>
                        <v-expand-transition mode="in-out">
                            <div
                                v-if="hover"
                                class="sales_order v-card--reveal white--text"
                                style="height: 100%; opacity: 1;"
                            >
                                <v-container class="p-5">
                                    <v-row>
                                        <v-col cols="12">
                                            <h6>Sales Order</h6>
                                            <p class="mt-4">
                                                Create Sales Order to Customer
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
                      max-width="400"
                      height="350"
                      tile
                  >
                        <v-expand-transition mode="in-out">
                            <v-container class="fill-height" v-if="!hover">
                                <v-row align="center" justify="center">
                                    <v-col class="col-12" sm="4" md="4">
                                        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 111 120" aria-hidden="true"><g id="Data-Store" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="2000-Data-Store" transform="translate(-830.000000, -882.000000)"><g id="menus" transform="translate(70.000000, 154.000000)"><g id="2" transform="translate(0.000000, 660.000000)"><g id="measurement_unit" transform="translate(660.000000, 0.000000)"><g id="Group-2"><g id="Stacked-Group" transform="translate(95.000000, 68.000000)"><g id="other_data_icon"><g id="Rectangle-4"></g><g id="copy" mask="url(#mask-2)"><g transform="translate(5.000000, 0.000000)"><polygon id="Shape" fill="#F369A7" fill-rule="nonzero" points="108.302424 16.2987879 108.302424 118.009091 16.3281818 118.009091 16.3281818 103.590909 1.89030303 103.590909 1.89030303 1.88060606 93.8648485 1.88060606 93.8648485 16.2987879"></polygon><path d="M95.7454545,14.4181818 L95.7454545,0 L0.0293939394,0 L0.0293939394,105.471818 L14.4475758,105.471818 L14.4475758,119.89 L110.163636,119.89 L110.163636,14.4181818 L95.7454545,14.4181818 Z M3.77090909,3.74151515 L92.0036364,3.74151515 L92.0036364,101.710303 L3.77090909,101.710303 L3.77090909,3.74151515 Z M106.421818,116.148182 L18.1890909,116.148182 L18.1890909,105.471818 L95.7454545,105.471818 L95.7454545,18.1793939 L106.421818,18.1793939 L106.421818,116.148182 Z" id="Shape" fill="#FFFFFF" fill-rule="nonzero"></path><rect id="Rectangle-path" fill="#FFFFFF" fill-rule="nonzero" x="9.39333333" y="9.36393939" width="76.9881818" height="86.7242424"></rect><g id="Group" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(20.909091, 30.000000)"><rect id="Rectangle-path" fill="#F369A7" fill-rule="nonzero" x="0.277272727" y="23.5781818" width="53.3824242" height="3.74151515"></rect><rect id="Rectangle-path" fill="#F369A7" fill-rule="nonzero" x="0.277272727" y="14.2142424" width="53.3824242" height="3.74151515"></rect><rect id="Rectangle-path" fill="#F369A7" fill-rule="nonzero" x="0.277272727" y="32.9421212" width="53.3824242" height="3.74151515"></rect><rect id="Rectangle-path" fill="#F369A7" fill-rule="nonzero" x="0.277272727" y="42.129697" width="32.0293939" height="3.74151515"></rect><rect id="Rectangle-path" fill="#F369A7" fill-rule="nonzero" x="0.277272727" y="0.168484848" width="3.74151515" height="3.74151515"></rect><rect id="Rectangle-path" fill="#F369A7" fill-rule="nonzero" x="8.8969697" y="0.168484848" width="3.74151515" height="3.74151515"></rect><rect id="Rectangle-path" fill="#F369A7" fill-rule="nonzero" x="17.5163636" y="0.168484848" width="3.74151515" height="3.74151515"></rect></g></g></g></g></g></g></g></g></g></g></g></svg>
                                        <h6 class="text-center text-white mt-2" >Sales Delivery</h6>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expand-transition>
                        <v-expand-transition mode="in-out">
                            <div
                                v-if="hover"
                                class="sales_delivery v-card--reveal white--text"
                                style="height: 100%; opacity: 1;"
                            >
                                <v-container class="p-5">
                                    <v-row>
                                        <v-col cols="12">
                                            <h6>Sales Delivery</h6>
                                            <p class="mt-4">
                                                Create Delivery Order to Customer
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
                        <v-expand-transition mode="in-out">
                            <v-container class="fill-height" v-if="!hover">
                                <v-row align="center" justify="center">
                                    <v-col class="col-12" sm="4" md="4">
                                        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 100 120" aria-hidden="true"><g fill="none" transform="translate(-1)"><polygon fill="#FFF" points="100.724 119.89 1 119.89 1 31.461 4.73 31.461 4.73 116.148 96.993 116.148 96.993 3.742 32.366 3.742 32.366 0 100.724 0"></polygon><g fill="#FFF" transform="matrix(-1 0 0 1 28.795 0)"><polygon points="14.756 0 14.756 3.742 21.846 3.742 23.35 5.25 23.35 12.361 27.08 12.361 27.08 0"></polygon><polygon points="6.181 17.256 9.873 17.256 9.873 20.959 6.181 20.959" transform="rotate(-135 8.027 19.108)"></polygon><polygon points=".959 22.487 4.65 22.487 4.65 26.189 .959 26.189" transform="rotate(-135 2.805 24.338)"></polygon><polygon points="11.418 12.01 15.109 12.01 15.109 15.713 11.418 15.713" transform="rotate(-135 13.263 13.861)"></polygon></g><g fill="#FFF" transform="translate(16.106 46.364)"><polygon points=".245 13.581 69.716 13.581 69.716 17.323 .245 17.323"></polygon><polygon points=".245 .084 69.716 .084 69.716 3.825 .245 3.825"></polygon><polygon points=".245 27.079 69.716 27.079 69.716 30.82 .245 30.82"></polygon><polygon points=".245 40.752 69.716 40.752 69.716 44.494 .245 44.494"></polygon><polygon points=".245 54.23 39.092 54.23 39.092 57.972 .245 57.972"></polygon></g><polygon fill="#FFF" points="43.245 13.87 85.821 13.87 85.821 34.478 43.245 34.478"></polygon><g fill="#C3D046" transform="translate(52.662 22.121)"><polygon points=".114 .172 3.844 .172 3.844 3.914 .114 3.914"></polygon><polygon points="10.016 .172 13.747 .172 13.747 3.914 10.016 3.914"></polygon><polygon points="19.918 .172 23.648 .172 23.648 3.914 19.918 3.914"></polygon></g></g></svg>
                                        <h6 class="text-center text-white mt-2" >Sales Invoice</h6>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expand-transition>
                        <v-expand-transition mode="in-out">
                            <div
                                v-if="hover"
                                class="sales_invoice v-card--reveal white--text"
                                style="height: 100%; opacity: 1;"
                            >
                                <v-container class="p-5">
                                    <v-row>
                                        <v-col cols="12">
                                            <h6>Sales Invoice</h6>
                                            <p class="mt-4">
                                                Create Sales Invoice Transaction To Customer
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
                      max-width="400"
                      height="350"
                      tile
                  >
                    <v-expand-transition mode="in-out">
                        <v-container class="fill-height" v-if="!hover">
                            <v-row align="center" justify="center">
                                <v-col class="col-12" sm="4" md="4">
                                    <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 98 120" aria-hidden="true"><g id="Data-Store" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="2000-Data-Store" transform="translate(-177.000000, -552.000000)"><g id="menus" transform="translate(70.000000, 154.000000)"><g id="3" transform="translate(0.000000, 330.000000)"><g id="project_data"><g id="Group-2"><g id="Stacked-Group" transform="translate(95.000000, 68.000000)"><g id="project_data_icon"><rect id="Rectangle-4" x="0" y="0" width="120" height="120"></rect><g id="notepad-copy-4" transform="translate(12.000000, 0.000000)" fill-rule="nonzero"><polyline id="Shape" points="73.8272727 8.24727273 95.5721212 8.24727273 95.5721212 118.009091 1.89333333 118.009091 1.89333333 8.24727273 23.6381818 8.24727273"></polyline><rect id="SVGCleanerId_0" fill="#2EA2DB" x="9.39636364" y="21.9209091" width="78.6727273" height="88.6048485"></rect><path d="M66.3439394,16.4945455 L31.1215152,16.4945455 L31.1215152,0 L66.3439394,0 L66.3439394,16.4945455 Z M34.8630303,12.7333333 L62.5827273,12.7333333 L62.5827273,3.74151515 L34.8630303,3.74151515 L34.8630303,12.7333333 Z" id="Shape" fill="#193651"></path><rect id="SVGCleanerId_1" fill="#FFFFFF" x="17.6436364" y="30.3445455" width="15.1821212" height="15.1821212"></rect><rect id="SVGCleanerId_2" fill="#FFFFFF" x="17.6436364" y="58.6324242" width="15.1821212" height="15.1821212"></rect><rect id="SVGCleanerId_3" fill="#FFFFFF" x="17.6436364" y="86.7242424" width="15.1821212" height="15.1821212"></rect><polygon id="Shape" points="66.3439394 8.24727273 66.3439394 16.4945455 31.1215152 16.4945455 31.1215152 8.24727273 1.89333333 8.24727273 1.89333333 118.009091 95.5721212 118.009091 95.5721212 8.24727273"></polygon><rect id="SVGCleanerId_0_1_" fill="#FFFFFF" x="9.39393939" y="21.8181818" width="78.6727273" height="88.6048485"></rect><g id="Group-6" transform="translate(22.424242, 45.454545)" fill="#53B857"><rect id="Rectangle-path" x="0.195184487" y="0.159179582" width="52.047121" height="3.3425005"></rect><rect id="Rectangle-path" x="0.195184487" y="12.7070245" width="52.047121" height="3.3425005"></rect><rect id="Rectangle-path" x="0.195184487" y="25.430021" width="52.047121" height="3.3425005"></rect><rect id="Rectangle-path" x="0.195184487" y="37.9781366" width="27.2835969" height="3.3425005"></rect></g><path d="M31.1215152,0 L31.1215152,16.4945455 L66.3439394,16.4945455 L66.3439394,0 L31.1215152,0 Z M62.6024242,12.7333333 L34.8633333,12.7333333 L34.8633333,3.74151515 L62.5830303,3.74151515 L62.5830303,12.7333333 L62.6024242,12.7333333 Z" id="Shape" fill="#FFFFFF"></path><g id="Group" transform="translate(0.000000, 6.363636)" fill="#FFFFFF"><polygon id="Shape" points="73.8272727 0.00303030303 73.8272727 3.74484848 93.6915152 3.74484848 93.6915152 109.784545 3.77424242 109.784545 3.77424242 3.74484848 23.6381818 3.74484848 23.6381818 0.00303030303 0.0324242424 0.00303030303 0.0324242424 113.526061 97.4330303 113.526061 97.4330303 0.00303030303"></polygon></g></g></g></g></g></g></g></g></g></g></svg>
                                    <h6 class="text-center text-white mt-2" >Sales Return</h6>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-expand-transition>
                    <v-expand-transition mode="in-out">
                        <div
                            v-if="hover"
                            class="sales_return v-card--reveal white--text"
                            style="height: 100%; opacity: 1;"
                        >
                            <v-container class="p-5">
                                <v-row>
                                    <v-col cols="12">
                                        <h6>Sales Return</h6>
                                        <p class="mt-4">
                                            Create Sales Return Transaction
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
                        <v-expand-transition mode="in-out">
                            <v-container class="fill-height" v-if="!hover">
                                <v-row align="center" justify="center">
                                    <v-col class="col-12" sm="4" md="4">
                                            <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 121 120" aria-hidden="true"><g id="4000-Sales" transform="translate(-1152.000000, -228.000000)" fill="#FFFFFF" fill-rule="nonzero"><g id="product_data" transform="translate(1060.000000, 160.000000)"><g id="Group-2"><g id="profits" transform="translate(92.000000, 68.000000)"><g id="Group" transform="translate(60.303030, 30.987342)"><path d="M59.5866667,89.0096203 L43.8560606,89.0096203 L43.8560606,0.180455696 L59.5866667,0.180455696 L59.5866667,89.0096203 Z M47.5978788,85.2583291 L55.8451515,85.2583291 L55.8451515,3.95118987 L47.5978788,3.95118987 L47.5978788,85.2583291 Z" id="Shape"></path><path d="M37.8615152,89.0096203 L22.1309091,89.0096203 L22.1309091,24.9849114 L37.8615152,24.9849114 L37.8615152,89.0096203 Z M25.8727273,85.2583291 L34.12,85.2583291 L34.12,28.7362025 L25.8727273,28.7362025 L25.8727273,85.2583291 Z" id="Shape"></path><path d="M15.9406061,89.0096203 L0.21,89.0096203 L0.21,42.4444557 L15.9406061,42.4444557 L15.9406061,89.0096203 Z M3.95151515,85.2583291 L12.1987879,85.2583291 L12.1987879,46.1957468 L3.95151515,46.1957468 L3.95151515,85.2583291 Z" id="Shape"></path></g><rect id="Rectangle-path" x="29.2281818" y="88.4561013" width="3.74151515" height="29.6752405"></rect><g id="Group"><path d="M31.0890909,27.6130633 C23.5860606,27.6130633 17.4154545,21.4070886 17.4154545,13.9048101 C17.4154545,6.40253165 23.6057576,0.196253165 31.0890909,0.196253165 C38.5724242,0.196253165 44.7627273,6.40222785 44.7627273,13.9045063 C44.7627273,21.4067848 38.7681818,27.6130633 31.0890909,27.6130633 Z M31.0890909,3.9475443 C25.6627273,3.9475443 21.1569697,8.46470886 21.1569697,13.9048101 C21.1569697,19.3449114 25.6627273,23.8620759 31.0890909,23.8620759 C36.5154545,23.8620759 41.0212121,19.3643544 41.0212121,13.9048101 C41.0212121,8.2681519 36.7112121,3.9475443 31.0890909,3.9475443 Z" id="Shape"></path><rect id="Rectangle-path" x="29.0321212" y="43.9531139" width="4.30969697" height="3.75098734"></rect><rect id="Rectangle-path" x="29.0321212" y="55.9722532" width="4.30969697" height="3.75098734"></rect><rect id="Rectangle-path" x="29.0321212" y="67.9916962" width="4.30969697" height="3.75098734"></rect><path d="M49.2684848,119.996962 L13.1054545,119.996962 L13.1054545,82.819443 L6.73878788,82.819443 C2.99727273,82.819443 0,79.8145823 0,76.0635949 L0,44.8760506 C0,36.4310886 6.93484848,29.4786835 15.3584848,29.4786835 L22.469697,29.4786835 L22.8418182,29.6749367 C28.0918182,32.3067342 34.0863636,32.3067342 39.3363636,29.6749367 L39.7084848,29.4786835 L82.4142424,29.4786835 C85.4115152,29.4786835 88.2127273,31.5408608 88.9769697,34.3689114 C89.5451515,36.4310886 88.9769697,38.3164557 87.860303,40.0055696 C86.5478788,41.4981266 84.8630303,42.4408101 82.8060606,42.4408101 L54.8906061,42.4408101 L54.8906061,82.9962532 L49.2681818,82.9962532 C49.2684848,82.9962532 49.2684848,119.996962 49.2684848,119.996962 Z M16.8669697,116.245671 L45.5269697,116.245671 L45.5269697,79.0684557 L51.1493939,79.0684557 L51.1493939,38.4932658 L82.6106061,38.4932658 C83.3551515,38.4932658 84.2954545,38.1202025 84.6675758,37.5505823 C85.2357576,36.8041519 85.4121212,36.0580253 85.2357576,35.1153418 C85.04,33.9958481 83.7469697,33.0531646 82.4345455,33.0531646 L40.6487879,33.0531646 C34.6542424,35.8614684 27.7193939,35.8614684 21.5487879,33.0531646 L15.3584848,33.0531646 C8.99181818,33.0531646 3.74181818,38.3164557 3.74181818,44.6992405 L3.74181818,75.867038 C3.74181818,77.5561519 5.05424242,78.8718987 6.73909091,78.8718987 L16.8475758,78.8718987 L16.8475758,116.245671 L16.8669697,116.245671 Z" id="Shape"></path></g></g></g></g></g></svg>
                                            <h6 class="text-center text-white mt-2">Account Receivable</h6>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expand-transition>
                        <v-expand-transition mode="in-out">
                            <div
                                v-if="hover"
                                class="account_receive v-card--reveal white--text"
                                style="height: 100%; opacity: 1;"
                            >
                                <v-container class="p-5">
                                    <v-row>
                                        <v-col cols="12">
                                            <h6>Account Receivable</h6>
                                            <p class="mt-4">
                                                Details Of Account Receivable Information
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
                      max-width="400"
                      height="350"
                      tile
                  >
                    <v-expand-transition mode="in-out">
                        <v-container class="fill-height" v-if="!hover">
                            <v-row align="center" justify="center">
                                <v-col class="col-12" sm="4" md="4">
                                    <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 121 120" aria-hidden="true"><g id="Sales" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="4000-Sales" transform="translate(-164.000000, -558.000000)" fill-rule="nonzero"><g id="tax_data" transform="translate(70.000000, 490.000000)"><g id="Group-2"><g id="calculator" transform="translate(94.000000, 68.000000)"><path d="M83.0412121,44.0184848 L67.2518182,44.0184848 L67.2518182,77.0666667 C61.5315152,80.9257576 54.6360606,83.1787879 47.2115152,83.1787879 C27.3472727,83.1787879 11.2445455,67.0760606 11.2445455,47.2118182 C11.2445455,27.3475758 27.3472727,11.2445455 47.2115152,11.2445455 C65.9981818,11.2445455 81.4154545,25.6627273 83.0412121,44.0184848 Z" id="Shape" fill="#FFFFFF"></path><path d="M47.2115152,45.7030303 C43.2739394,45.7030303 40.100303,42.51 40.100303,38.5918182 C40.100303,34.6739394 43.2933333,31.4806061 47.2115152,31.4806061 C51.1490909,31.4806061 54.3227273,34.6736364 54.3227273,38.5918182 L58.0642424,38.5918182 C58.0642424,33.2439394 54.1854545,28.7772727 49.0724242,27.8957576 L49.0724242,25.290303 L45.3309091,25.290303 L45.3309091,27.8957576 C40.2178788,28.7772727 36.3390909,33.2436364 36.3390909,38.5918182 C36.3390909,44.5863636 41.2169697,49.4642424 47.2115152,49.4642424 C51.1490909,49.4642424 54.3227273,52.6572727 54.3227273,56.5754545 C54.3227273,60.5130303 51.129697,63.6866667 47.2115152,63.6866667 C43.2739394,63.6866667 40.100303,60.4936364 40.100303,56.5754545 L36.3587879,56.5754545 C36.3587879,61.9233333 40.2375758,66.39 45.3506061,67.2715152 L45.3506061,69.1130303 L49.0921212,69.1130303 L49.0921212,67.2715152 C54.2051515,66.39 58.0839394,61.9236364 58.0839394,56.5754545 C58.0642424,50.5809091 53.2060606,45.7030303 47.2115152,45.7030303 Z" id="Shape" fill="#D344E9"></path><path d="M94.2269697,42.1572727 C91.6021212,18.5515152 71.5618182,0 47.2115152,0 C21.1766667,0 0,21.1766667 0,47.2115152 C0,73.2463636 21.1766667,94.4230303 47.2115152,94.4230303 C53.5781818,94.4230303 59.7684848,93.1106061 65.3909091,90.8575758 L65.3909091,119.889697 L119.889697,119.889697 L119.889697,42.1572727 L94.2269697,42.1572727 Z M47.2115152,90.6618182 C23.2336364,90.6618182 3.74151515,71.17 3.74151515,47.1918182 C3.74151515,23.2136364 23.2336364,3.74151515 47.2115152,3.74151515 C69.5048485,3.74151515 87.860303,20.6084848 90.289697,42.1375758 L65.3715152,42.1375758 L65.3715152,86.7242424 C59.9448485,89.3493939 53.7545455,90.6618182 47.2115152,90.6618182 Z M116.148182,116.148182 L69.1324242,116.148182 L69.1324242,45.8990909 L116.148182,45.8990909 L116.148182,116.148182 Z" id="Shape" fill="#FFFFFF"></path><g id="Group" transform="translate(74.545455, 75.454545)" fill="#FFFFFF"><rect id="Rectangle-path" x="0.18969697" y="20.2615152" width="14.0460606" height="14.0460606"></rect><rect id="Rectangle-path" x="21.9345455" y="20.2615152" width="14.0460606" height="14.0460606"></rect><rect id="Rectangle-path" x="0.18969697" y="0.0445454545" width="14.0460606" height="14.0460606"></rect><rect id="Rectangle-path" x="21.9345455" y="0.789090909" width="14.0460606" height="14.0460606"></rect></g><rect id="Rectangle-path" fill="#FFFFFF" x="73.8145455" y="51.1490909" width="37.8475758" height="19.1"></rect><g id="Group" transform="translate(80.909091, 58.484848)" fill="#D344E9"><rect id="Rectangle-path" x="0.0166666667" y="0.147575758" width="3.74151515" height="3.91787879"></rect><rect id="Rectangle-path" x="9.94848485" y="0.147575758" width="3.74151515" height="3.91787879"></rect><rect id="Rectangle-path" x="19.6848485" y="0.147575758" width="3.74151515" height="3.91787879"></rect></g></g></g></g></g></g></svg>
                                    <h6 class="text-center text-white mt-2" >Account Receivable Payment</h6>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-expand-transition>
                    <v-expand-transition mode="in-out">
                        <div
                            v-if="hover"
                            class="account_pay v-card--reveal white--text"
                            style="height: 100%; opacity: 1;"
                        >
                            <v-container class="p-5">
                                <v-row>
                                    <v-col cols="12">
                                        <h6>Account Receivable Payment</h6>
                                        <p class="mt-4">
                                            Details Of Account Receivable Payment Information
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
                      max-width="400"
                      height="350"
                      tile
                  >
                        <v-expand-transition mode="in-out">
                            <v-container class="fill-height" v-if="!hover">
                                <v-row align="center" justify="center">
                                    <v-col class="col-12" sm="4" md="4">
                                        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 121 120" aria-hidden="true"><g id="Sales" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="4000-Sales" transform="translate(-494.000000, -558.000000)" fill="#FFFFFF" fill-rule="nonzero"><g id="fixed_asset" transform="translate(400.000000, 490.000000)"><g id="Group-2"><g id="coin" transform="translate(94.000000, 68.000000)"><path d="M60.4815556,70.6037468 C40.8883721,70.6037468 25.0406977,54.8333165 25.0406977,35.2921519 C25.0406977,15.7509873 40.8883721,0 60.4815556,0 C80.074739,0 95.9224134,15.7704304 95.9224134,35.3115949 C95.9224134,54.8527595 80.0942532,70.6037468 60.4815556,70.6037468 Z M60.4815556,3.75098734 C42.9580982,3.75098734 28.8252351,17.8326076 28.8252351,35.2918481 C28.8252351,52.7510886 42.9584031,66.8327089 60.4815556,66.8327089 C78.004708,66.8327089 92.137876,52.7513924 92.137876,35.2921519 C92.137876,17.8329114 78.0245271,3.75098734 60.4815556,3.75098734 Z" id="Shape"></path><g id="Group" transform="translate(0.000000, 17.924051)"><path d="M60.4815556,15.6987342 C58.0374005,15.6987342 55.9478553,13.636557 55.9478553,11.2013165 C55.9478553,8.76607595 58.0175814,6.70389873 60.4815556,6.70389873 C62.9455297,6.70389873 65.0152558,8.76607595 65.0152558,11.2013165 L68.7799742,11.2013165 C68.7799742,7.25377215 65.9613902,4.07210127 62.3738243,3.12941772 L62.3738243,0.124556962 L58.6091059,0.124556962 L58.6091059,3.12941772 C54.8443876,4.07210127 52.2029561,7.25377215 52.2029561,11.2013165 C52.2029561,15.6987342 55.9676744,19.4694684 60.5013747,19.4694684 C62.9455297,19.4694684 65.0350749,21.5316456 65.0350749,23.9866329 C65.0350749,26.4416203 62.9653488,28.4840506 60.5013747,28.4840506 C58.0572196,28.4840506 55.9676744,26.4218734 55.9676744,23.9866329 L52.2029561,23.9866329 C52.2029561,27.9341772 55.0215401,31.1158481 58.6091059,32.0585316 L58.6091059,34.6903291 L62.3738243,34.6903291 L62.3738243,32.0585316 C66.1385426,31.1158481 68.7799742,27.9341772 68.7799742,23.9866329 C68.7799742,19.4497215 65.0152558,15.6987342 60.4815556,15.6987342 Z" id="Shape"></path><rect id="Rectangle-path" x="9.0350801" y="59.0822278" width="3.76471835" height="3.75098734"></rect><rect id="Rectangle-path" x="9.0350801" y="69.5893671" width="3.76471835" height="3.75098734"></rect><rect id="Rectangle-path" x="9.0350801" y="80.1159494" width="3.76471835" height="3.75098734"></rect><rect id="Rectangle-path" x="76.1322584" y="15.3253671" width="3.76471835" height="4.12435443"></rect><rect id="Rectangle-path" x="41.0856486" y="15.3253671" width="3.76471835" height="4.12435443"></rect><path d="M117.033437,67.9002532 C115.141168,63.9527089 110.627287,62.0870886 106.665292,63.5796456 L81.0406925,72.2208608 C81.2376641,71.6512405 81.2376641,70.9051139 81.2376641,70.1586835 C81.2376641,65.2684557 77.2756693,61.3406582 72.3873592,61.3406582 L53.3463669,61.3406582 C52.7746615,61.3406582 52.0258036,61.1444051 51.4540982,60.9675949 L39.1936848,54.5848101 L38.9967132,54.388557 C37.8731214,54.0154937 36.7300155,53.8189367 35.6064238,53.8189367 L21.8473798,53.8189367 L21.8473798,48.7518987 L0.184470284,48.7518987 L0.184470284,93.6279494 L21.8668941,93.6279494 L21.8668941,89.6804051 L26.5780517,89.6804051 L61.6444806,101.326481 C62.9650439,101.699544 64.2859121,102.072911 65.7839328,102.072911 C67.8536589,102.072911 69.923385,101.503291 71.8156537,100.560608 L113.46569,78.5842025 C117.230408,76.7380253 118.925705,72.0246076 117.033437,67.9002532 Z M18.0823566,90.0534684 L18.0823566,90.2497215 L3.94949354,90.2497215 L3.94949354,52.6796962 L18.0826615,52.6796962 L18.0826615,90.0534684 L18.0823566,90.0534684 Z M111.573116,75.5987848 L69.9230801,97.3789367 C67.6563824,98.4984304 65.0149509,98.6946835 62.5707959,97.948557 L26.9524806,86.1256709 L21.6699225,86.1256709 L21.6699225,57.766481 L35.4283566,57.766481 C36.1775194,57.766481 36.7489199,57.9627342 37.4980827,58.1395443 L49.7584961,64.5223291 L49.9554677,64.7185823 C50.9016021,65.0916456 52.0251938,65.2882025 53.1682997,65.2882025 L72.209292,65.2882025 C75.027876,65.2882025 77.2948786,67.5466329 77.2948786,70.3552405 C77.2948786,71.8477975 76.5457158,73.1635443 75.5995814,74.1062278 L72.0120155,75.4219747 L56.5582842,75.4219747 C52.5962894,75.4219747 49.4029716,78.6230886 49.4029716,82.5511899 L53.1676899,82.5511899 C53.1676899,80.6658228 54.6657106,79.1732658 56.5579793,79.1732658 L72.2086822,79.1732658 C74.1009509,79.1732658 75.7962481,78.6036456 77.2942687,77.4841519 L107.649845,67.1538228 C109.916543,66.4073924 112.361003,67.3500759 113.307137,69.5890633 C114.588977,71.6515443 113.840119,74.4795949 111.573116,75.5987848 Z" id="Shape"></path></g></g></g></g></g></g></svg>
                                        <h6 class="text-center text-white mt-2" >Customer Credit/ Refund</h6>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expand-transition>
                        <v-expand-transition mode="in-out">
                            <div
                                v-if="hover"
                                class="credit v-card--reveal white--text"
                                style="height: 100%; opacity: 1;"
                            >
                                <v-container class="p-5">
                                    <v-row>
                                        <v-col cols="12">
                                            <h6>Customer Credit/ Refund</h6>
                                            <p class="mt-4">
                                                Create Credit Payment From Customer
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
              dialog: false
  
          }
      },
      computed: mapState([
          'avatar'
      ]),
      mounted(){
          this.$store.dispatch('getHeaderAvatar')
          console.log(this.$router.history.base + this.$router.history.current.fullPath , window.location.pathname);
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
  
  .blue_contact_sales{
      background-color: #2eb3ec;
      color: #2eb3ec;
  }
  
  .sales_invoice{
      background-color: #f56b3b;
      color: #f56b3b;
  }
  
  .account_receive{
      background-color: #e95044;
      color: #e95044;
  }
  
  .sales_return{
      background-color: #54b857;
      color: #54b857;
  }
  
  .sales_order{
      background-color: #5581ad;
      color: #5581ad; 
  }
  
  .account_pay{
      background-color: #d351e9;
      color: #d351e9;  
  }
  
  .credit{
      background-color: #4bb4c6;
      color: #4bb4c6;  
  }
  
  .sales_delivery{
      background-color: #ee69a7;
      color: #ee69a7; 
  }
  
  </style>