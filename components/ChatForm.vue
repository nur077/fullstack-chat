<template>
  <v-flex xs12>
    <v-text-field label="Введите сообщение" outline v-model="text" @click:append="send" @keydown.enter="send" append-icon="send"/>
  </v-flex>
</template>

<script>
export default {
  data: () => ({
    text: '',
  }),
  methods: {
    send() {
      this.$socket.emit(
        'createMessage',
        {
          text: this.text,
          id: this.$store.state.user.id
        },
         data => {
          if (typeof data === 'string') {
            console.error(data);
          } else {
            this.text = "";
          }
        })
    },
  }
}
</script>
