<template>
    <v-container class="mt-12 mb-12" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-card class="elevation-5 rounded-l">
                    <v-card-title class="blue-lcd" style="border-bottom: 1px solid #1e4393">
                        User Profile
                    </v-card-title>
                    <v-card-text>
                        <v-container class="pl-5 pr-5 pt-5 pb-4">
                            <v-row>
                                <v-col class="col-12" sm="4" md="4">
                                    <v-card class="elevation-1 rounded-l">
                                        <v-card-text>
                                            <v-row justify="center" align="center" class="mt-12" v-if="userModel === null">
                                                <v-col cols="3">
                                                    <v-progress-circular
                                                    indeterminate
                                                    color="primary"
                                                    class="text-center mx-auto"
                                                    :size="70"
                                                    v-if="userModel === null"
                                                    ></v-progress-circular>
                                                </v-col>
                                            </v-row>
                                            <v-img :src="userModel ? userModel.avatar() : ''"></v-img>
                                            <v-btn
                                                block
                                                color="accent"
                                                elevation="2"
                                                outlined
                                                class="mt-5"
                                                @click="changeAvatar()"
                                            >
                                                Pilih Foto
                                            </v-btn>
                                            <p class="css-bqy72x mt-5">Besar file: maksimum (2 Megabytes). Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG</p>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col class="col-12" sm="8" md="8">
                                    <v-container class="p-4">
                                        <v-row v-if="userModel === null">
                                            <v-skeleton-loader
                                            v-bind="attrs"
                                            type="article, actions"
                                            ></v-skeleton-loader>
                                        </v-row>
                                        <v-row v-else>
                                            <v-col cols="12">
                                                <h6 style="font-weight:600">Ubah Biodata Diri</h6>
                                            </v-col>
                                            <v-col class="col-12" sm="3" md="3">
                                                Username
                                            </v-col>
                                            <v-col class="col-12" sm="9" md="9">
                                                {{this.userModel ? this.userModel.data.username : ''}}
                                            </v-col>
                                            <v-col class="col-12" sm="3" md="3">
                                                Group
                                            </v-col>
                                            <v-col class="col-12" sm="9" md="9">
                                                {{this.userModel ? this.userModel.data.group : ''}}
                                            </v-col>
                                            <v-col class="col-12" sm="3" md="3">
                                                Email
                                            </v-col>
                                            <v-col class="col-12" sm="9" md="9">
                                                {{this.userModel ? this.userModel.data.email : ''}}

                                                <a data-unify="Link" data-testid="change-name-btn" font-size="12" class="css-1qo5uf8-unf-link e1u528jj0 ml-5" @click="ubahEmail()">Ubah</a>
                                            </v-col>
                                            <v-col class="col-12" sm="3" md="3">
                                                Name
                                            </v-col>
                                            <v-col class="col-12" sm="9" md="9">
                                                {{this.userModel ? this.userModel.data.name1 : ''}}

                                                <a data-unify="Link" data-testid="change-name-btn" font-size="12" class="css-1qo5uf8-unf-link e1u528jj0 ml-5" @click="ubahNama()">Ubah</a>
                                            </v-col>
                                            <v-col class="col-12" sm="3" md="3">
                                                Phone
                                            </v-col>
                                            <v-col class="col-12" sm="9" md="9">
                                                {{this.userModel ? this.userModel.data.phone : ''}}

                                                <a data-unify="Link" data-testid="change-name-btn" font-size="12" class="css-1qo5uf8-unf-link e1u528jj0 ml-5" @click="ubahPhone()">Ubah</a>
                                            </v-col>
                                        </v-row>
                                        <v-row class="mt-8">
                                            <v-col cols="12">
                                                <v-btn
                                                    block
                                                    color="secondary"
                                                    elevation="2"
                                                    outlined
                                                    class="mt-5"
                                                    @click="ubahPassword()"
                                                >
                                                    Ubah Kata Sandi
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                        <!-- <v-row class="mt-12">
                                            <v-col cols="12" class="p-3">
                                                <v-alert
                                                icon="mdi-shield-lock-outline"
                                                prominent
                                                text
                                                type="info"
                                                class="p-5"
                                                >
                                                Jika anda ingin memanfaatkan fitur lupa password diharapkan anda mengisikan no Whatsapp anda di ubah nomor telepon.
                                                </v-alert>
                                            </v-col>
                                        </v-row> -->
                                    </v-container>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                </v-card>
                <v-dialog
                    v-model="dialog"
                    max-width="500px"
                >
                    <v-card class="p-3 rounded-xl">
                        <v-card-title class="text-center">
                            <v-row align="center" justify="center">
                                <v-col cols="10">
                                <h5 style="font-weight:700; color: #1e4393;">
                                Ubah Email
                                </h5>
                                </v-col>
                            </v-row>  
                        </v-card-title>
                        <v-card-text>
                            <v-container class="fill-height">
                                <v-row>
                                    <v-col cols="12" xs="12" sm="12" md="12">
                                        <h6>
                                            Email
                                        </h6>
                                        <v-text-field
                                        solo
                                        v-model="emails"
                                        :error-messages="errors"
                                        label="Email"
                                        append-icon="mdi-email"
                                        hint="Please input your Email"
                                        
                                        ></v-text-field>
                                    </v-col>
                                </v-row> 
                            </v-container>
                        </v-card-text>
                        <v-card-actions class="text-center">
                            <v-row justify="center">
                                <v-col cols="12" xs="12" sm="3" md="4">
                                    <v-btn block class="rounded-l text-white p-4" color="#003871" @click="submit()">Simpan</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog
                    v-model="dialog_nama"
                    max-width="500px"
                >
                    <v-card class="p-3 rounded-xl">
                        <v-card-title class="text-center">
                            <v-row align="center" justify="center">
                                <v-col cols="10">
                                <h5 style="font-weight:700; color: #1e4393;">
                                Ubah Nama
                                </h5>
                                </v-col>
                            </v-row>  
                        </v-card-title>
                        <v-card-text>
                            <v-container class="fill-height">
                                <v-row>
                                    <v-col cols="12" xs="12" sm="12" md="12">
                                        <h6>
                                            Nama
                                        </h6>
                                        <v-text-field
                                        solo
                                        v-model="name"
                                        :error-messages="errors"
                                        label="Name"
                                        append-icon="mdi-account-settings"
                                        hint="Please input your Name"
                                        
                                        ></v-text-field>
                                    </v-col>
                                </v-row> 
                            </v-container>
                        </v-card-text>
                        <v-card-actions class="text-center">
                            <v-row justify="center">
                                <v-col cols="12" xs="12" sm="3" md="4">
                                    <v-btn block class="rounded-l text-white p-4" color="#003871" @click="submit()">Simpan</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog
                    v-model="dialog_phone"
                    max-width="500px"
                >
                    <v-card class="p-3 rounded-xl">
                        <v-card-title class="text-center">
                            <v-row align="center" justify="center">
                                <v-col cols="10">
                                <h5 style="font-weight:700; color: #1e4393;">
                                Ubah No HP
                                </h5>
                                </v-col>
                            </v-row>  
                        </v-card-title>
                        <v-card-text>
                            <v-container class="fill-height">
                                <v-row>
                                    <v-col cols="12" xs="12" sm="12" md="12">
                                        <h6>
                                            No HP
                                        </h6>
                                        <v-text-field
                                        solo
                                        v-model="phone"
                                        :error-messages="errors"
                                        label="Phone"
                                        append-icon="mdi-phone"
                                        hint="Please input your phone"
                                        
                                        ></v-text-field>
                                    </v-col>
                                </v-row> 
                            </v-container>
                        </v-card-text>
                        <v-card-actions class="text-center">
                            <v-row justify="center">
                                <v-col cols="12" xs="12" sm="3" md="4">
                                    <v-btn block class="rounded-l text-white p-4" color="#003871" @click="submit()">Simpan</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog
                    v-model="dialog_password"
                    max-width="500px"
                >
                    <v-card class="p-3 rounded-xl">
                        <v-card-title class="text-center">
                            <v-row align="center" justify="center">
                                <v-col cols="10">
                                <h5 style="font-weight:700; color: #1e4393;">
                                Ubah Kata Sandi
                                </h5>
                                </v-col>
                            </v-row>  
                        </v-card-title>
                        <v-card-text>
                            <v-container class="fill-height">
                                <v-row>
                                    <v-col cols="12" xs="12" sm="12" md="12">
                                        <h6>
                                            Kata Sandi Baru
                                        </h6>
                                        <v-text-field
                                            solo
                                            v-model="password"
                                            :error-messages="errors"
                                            label="Password"
                                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                            :type="show ? 'text' : 'password'"
                                            @click:append="show = !show"
                                            hint="Please input your password"
                                            counter
                                            >
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" xs="12" sm="12" md="12">
                                        <h6>
                                            Konfirmasi Kata Sandi Baru
                                        </h6>
                                        <v-text-field
                                            solo
                                            v-model="password_confirm"
                                            :error-messages="errors"
                                            label="Confirm Password"
                                            :append-icon="show_confirm ? 'mdi-eye' : 'mdi-eye-off'"
                                            :type="show_confirm ? 'text' : 'password'"
                                            @click:append="show_confirm = !show_confirm"
                                            hint="Please input your password"
                                            counter
                                            >
                                        </v-text-field>
                                    </v-col>
                                </v-row> 
                            </v-container>
                        </v-card-text>
                        <v-card-actions class="text-center">
                            <v-row justify="center">
                                <v-col cols="12" xs="12" sm="3" md="4">
                                    <v-btn block class="rounded-l text-white p-4" color="#003871" @click="submitPassword()">Simpan</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog
                    v-model="dialog_avatar"
                    max-width="500px"
                >
                    <v-card class="p-3 rounded-xl">
                        <v-card-title class="text-center">
                            <v-row align="center" justify="center">
                                <v-col cols="10">
                                <h5 style="font-weight:700; color: #1e4393;">
                                Ubah Foto Profil
                                </h5>
                                </v-col>
                            </v-row>  
                        </v-card-title>
                        <v-card-text>
                            <v-container class="fill-height">
                                <v-row>
                                    <v-col cols="12" xs="12" sm="12" md="12">
                                        <h6>
                                            Foto Profil
                                        </h6>

                                        <div v-if="imgSrc" style="width: auto; height:500px; border: 1px solid gray; display: inline-block;">
                                            <vue-cropper
                                                ref='cropper'
                                                :guides="true"
                                                :view-mode="2"
                                                drag-mode="crop"
                                                :auto-crop-area="0.5"
                                                :min-container-width="250"
                                                :min-container-height="180"
                                                :background="true"
                                                :rotatable="true"
                                                :src="imgSrc"
                                                :aspectRatio= "1/1"
                                                :img-style="{ 'width': 'auto', 'height': '500px' }">
                                            </vue-cropper>
                                        </div>

                                        <div v-else>
                                            <input type="file" name="image" id="image" @change="setImage" class="form-control" accept="image/*">
                                        </div>
                                    </v-col>
                                </v-row> 
                            </v-container>
                        </v-card-text>
                        <v-card-actions class="text-center">
                            <v-row justify="center">
                                <v-col cols="12" xs="12" sm="3" md="4">
                                    <v-btn block class="rounded-l text-white p-4" color="#003871" @click="saveAvatar()">Simpan</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
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
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import VueCropper from 'vue-cropperjs'
import {backendApi} from "../backend-api/backend-api-sr"
import 'cropperjs/dist/cropper.css'
import {User} from "../model/user"

export default {
    components:{
        VueCropper
    },
    data() {
        return {
            attrs: {
                class: 'mb-6',
                boilerplate: true,
                elevation: 2,
            },
            email: '',
            password: '',
            password_confirm: '',
            avatar: '',
            error: true,
            show: false,
            show_confirm: false,
            errors: [],
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
            phone: '',
            name: '',
            emails: '',
            group: '',
            dialog: false,
            dialog_nama: false,
            dialog_phone: false,
            dialog_password: false,
            dialog_avatar: false,
            imgSrc: '',
            imgAvatar: '',
            cropImg: '',
            userModel: null
        }
    },
    mounted(){
        this.getPullData()
    },
    methods:{
        reset() {
            this.imgSrc = ''
            this.cropImg = ''
		},
        setImage(e) {
			this.reset()
			const file = e.target.files[0]
			if (!file.type.includes('image/')) {
				alert('Please select an image file');
				return;
			}
			if (typeof FileReader === 'function') {
				const reader = new FileReader()
				reader.onload = (event) => {
					this.imgSrc = event.target.result
				};
				reader.readAsDataURL(file)
			} else {
				alert('Sorry, FileReader API not supported')
			}
		},
        async submitPassword(){
            if (this.password === '' || this.password_confirm === '') {
                this.snackbar = {
                    color: "error",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Error",
                    text: 'Isikan kata sandi baru anda',
                    visible: true
                }; 
            } else {
                if (this.password === this.password_confirm) {
                    this.submit()
                } else {
                    this.snackbar = {
                        color: "error",
                        icon: "mdi-alert-circle",
                        mode: "multi-line",
                        position: "top",
                        timeout: 7500,
                        title: "Error",
                        text: 'Konfirmasi Password Baru Salah',
                        visible: true
                    };
                }
            }
             
        },
        async saveAvatar(){

            this.cropImg = this.imgSrc ? this.$refs.cropper.getCroppedCanvas().toDataURL() : ''

            var reqBody = {
                'origin': this.imgSrc,
                'thumbnail': this.cropImg
            }

            const respData = await backendApi.fetchCore('/api/avatar', reqBody, false, false, false)
            
            if (respData.status === 200) {
                this.loading = false
                this.dialog_avatar = false
                this.imgSrc = ''
                this.cropImg = ''
                this.$store.dispatch('getHeaderAvatar')
                this.getPullData()
                this.snackbar = {
                    color: "success",
                    icon: "mdi-checkbox-marked-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: "Successfully Update Photo Profile",
                    visible: true
                };
            } else {
                this.snackbar = {
                    color: "error",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Error",
                    text: 'Internal Server Error' + respData.status,
                    visible: true
                };
            }
        },
        async submit(){

            this.loading = true

            var reqBody = {
                'password': this.password,
                'name1': this.name,
                'phone': this.phone,
                'email': this.emails
            }

            const respData = await backendApi.fetchCore('/api/profile', reqBody, false, false, false)

            if (respData.status === 200) {
                this.loading = false
                this.dialog = false
                this.dialog_nama = false
                this.dialog_phone = false
                this.dialog_password = false
                this.getPullData()
                this.snackbar = {
                    color: "success",
                    icon: "mdi-checkbox-marked-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Success",
                    text: "Successfully Update Profile",
                    visible: true
                };
            } else {
                this.snackbar = {
                    color: "error",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Error",
                    text: 'Internal Server Error' + respData.status,
                    visible: true
                };
            }
        }, 
        async getPullData(){
            const respData = await backendApi.fetchCore('/api/profile', null, false, false, false)

            if (respData.status === 200) {
                this.email = respData.data.data.username
                this.phone = respData.data.data.phone
                this.name = respData.data.data.name1
                this.emails = respData.data.data.email
                this.group = respData.data.data.group
                this.avatar = respData.data.data.avatar

                this.userModel = new User(respData.data.data)

            } else {
                this.snackbar = {
                    color: "error",
                    icon: "mdi-alert-circle",
                    mode: "multi-line",
                    position: "top",
                    timeout: 7500,
                    title: "Error",
                    text: 'Internal Server Error' + respData.status,
                    visible: true
                };
            }                
        },
        ubahEmail(){
            this.dialog = true
        },
        ubahNama(){
            this.dialog_nama = true
        },
        ubahPhone(){
            this.dialog_phone = true
        },
        ubahPassword(){
            this.dialog_password = true
        },
        changeAvatar(){
            this.dialog_avatar = true
        }
    },
    watch: {
    }
}
</script>