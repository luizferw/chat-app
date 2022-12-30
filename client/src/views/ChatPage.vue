<template>
  <v-container
    class="fill-height"
    style="position: relative"
  >
    <div class="white--text text-h4 pb-4">#{{ $route.params.room }}</div>
    <div class="d-flex flex-column align-center">
      <div
        id="messages"
        class="d-flex flex-column w-100 overflow-y-auto fill-height"
        style="max-height: 336px"
      >
        <div
          v-for="(message, i) in messages"
          :key="i"
          class="rounded bg-purple-darken-2 pa-3 my-1 w-100"
        >
          <div
            v-if="message.userId === user.id"
            class="text-caption"
          >
            You
          </div>
          <div
            class="text-caption"
            v-else
          >
            {{message.author}}
          </div>
          <span>
            {{ message.text }}
          </span>
        </div>
      </div>
      <v-text-field
        append-inner-icon="mdi-send"
        style="position: absolute; bottom: 0; width: 100%"
        v-model="inputMessage"
        @click:append-inner="sendMessage"
        @keyup.enter="sendMessage"
      ></v-text-field>
    </div>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      inputMessage: '',
      messages: [],
      user: JSON.parse(localStorage.getItem('user')) ?? {
        name: 'Anonymous',
        id: this.$helpers.generateGuid()
      }
    }
  },
  watch: {
    'messages.length' () {
      this.scrollToBottom()
    }
  },
  methods: {
    scrollToBottom () {
      this.$nextTick(() => {
        const el = this.$el.querySelector('#messages')
        el.scrollTop = el.scrollHeight
      })
    },
    sendMessage () {
      if (!this.inputMessage.trim().length) return
      const dto = {
        room: this.$route.params.room,
        author: this.user.name,
        text: this.inputMessage,
        userId: this.user.id
      }
      this.$socket.emit('send-message', dto)
      this.inputMessage = ''
    }
  },
  created () {
    this.$socket.emit('join-room', this.$route.params.room)
    this.scrollToBottom()
    this.$socket.on('receive-message', messages => {
      messages.forEach(message => {
        this.messages.push(message)
      })
    })
  }
}
</script>
