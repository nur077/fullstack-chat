import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import io from 'socket.io-client'
//import VueSocketIO from 'vue-socket.io-extended'
import SocketIO from 'socket.io-client'

// export default ({ store }) => {
//   Vue.use(VueSocketIO, io('http://localhost:3000'),
//     {
//       store,
//       debug: false,
//       actionPrefix: 'SOCKET_',
//       mutationPrefix: 'SOCKET_'
//     })
// }

export default ({ store }) => {
  Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketIO('http://localhost:3000'), //options object is Optional
    vuex: {
      store,
      debug: false,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);

}

// new Vue({
//   data() {
//     return {
//       image: null
//     }
//   },
//   computed: {
//     url() {
//       if (!this.image) return;
//         return URL.createObjectURL(this.image);
//       }
//     }
// })

// export default function({ store }) {
//   Vue.use(new VueSocketIO(
//     {
//     debug: false,
//     connection: 'http://localhost:3000',
//     vuex: {
//         store,
//         actionPrefix: 'SOCKET_',
//         mutationPrefix: 'SOCKET_'
//     },
//     })
//   )
// }
