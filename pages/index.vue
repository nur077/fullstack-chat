<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8>
      <v-card min-width="400">
        <v-snackbar v-model="snackbar" :timeout="3000" top>
          {{ message }}
          <v-btn color="pink" flat @click="snackbar = false">Закрыть</v-btn>
        </v-snackbar>

        <v-card-title>
          <h1>
            Войти в чат
          </h1>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="name" :counter="20" :rules="nameRules" label="Ваше имя" required></v-text-field>
            <v-text-field v-model="room" :rules="roomRules" label="Введите комнату" required></v-text-field>
            <v-btn raised class="normal" @click="onPickFile">Выбор файла</v-btn>
            <input
              type="file"
              style="display: none"
              ref="fileInput"
              accept="image/*"
              @change="onFilePicked">
            <v-btn :disabled="!valid" color="primary" class="mr-4" @click="submit" left>
              Войти
            </v-btn>
            <v-layout justify-content>
              <v-flex xs12 sm6 offset-sm3>
                <img :src="imageUrl" height="150">
              </v-flex>
            </v-layout>
            <!-- <v-text-field v-model="chosenFile" :rules="fileRules" label="Click here to select a .txt file" outlined></v-text-field> -->
            <!-- <v-btn right @click="importTxt">Выбор файла</v-btn> -->
            <!-- ffff -->
            <!-- ffff -->
            <!-- <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree?" required></v-checkbox> -->

          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapMutations} from 'vuex'
  export default {
    layout: "empty",
    head: {
      title: 'Добро пожаловать в веб-чат Здравсити'
    },
    sockets: {
    connect: function () {
      console.log('socket connected')
    }
    },
    data: () => ({
      valid: true,
      snackbar: false,
      message: "",
      name: '',
      imageUrl: '',
      image: null,
      nameRules: [
        v => !!v || 'Введите имя',
        v => (v && v.length <= 20) || 'Имя не должно превышать 20 символов',
      ],
      room: '',
      roomRules: [
        v => !!v || 'Введите комнату'
      ],
      select: null,
      checkbox: false,
      //////
      chosenFile: null, // <- initialize the v-model prop
      data: null,
      fileRules: [
        v => /.txt/.test(v) || "Select a .txt file"
      ]
    }),

    mounted() {
      const { message } = this.$route.query;
      if (message === "noUser") {
        this.message = "Введите данные"
      } else if (message === "leftChat") {
        this.message = "Вы вышли из чата"
      }

      this.snackbar = !!this.message
    },

    methods: {
      ...mapMutations(["setUser"]),
      submit() {
        if(this.$refs.form.validate()) {
          const user = {
            name: this.name,
            room: this.room
          };
          this.$socket.emit('userJoined', user, data => {
            // user.id = data.userId;
            // this.setUser(user);
            // this.$router.push('/chat');
            if (typeof data === "string") {
              console.error(data);
            } else {
              user.id = data.userId;
              this.setUser(user);
              this.$router.push('/chat');
            }
          });
        }
      },
      onPickFile() {
        this.$refs.fileInput.click()
      },
      onFilePicked(event) {
        const files = event.target.files;
        let filename = files[0].name;
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Пожалуйста, добавьте правильный файл!!')
        }
        const fileReader = new FileReader();
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0]);
        this.image = files[0];
      },
      importTxt() {
        if (!this.chosenFile) {this.data = "No File Chosen"}
        var reader = new FileReader();
        reader.readAsText(this.chosenFile);
        reader.onload = () => {
          this.data = reader.result;
        }
      }
    },
  }

</script>

