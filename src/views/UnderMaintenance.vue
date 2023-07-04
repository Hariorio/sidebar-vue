<template>
        <v-row  style="text-align: center;" justify="center">
                    <div class="grey--text lighten-5 mt-4">Please Wait...</div>
                     <!-- <v-img max-width="1000" max-height="1000" src="../../assets/banner/Under-Maintenance.jpg"></v-img>      -->
        </v-row>
</template>

<script>
import ContentFooter from '../layouts/Footer.vue'
export default {
  components:{
    ContentFooter
  },
  name: "Footer",
  data() {
        return {
          value: 1,
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
          q: ''
        }
  },
  mounted(){
  },
  methods: {
    
  }
};
</script>