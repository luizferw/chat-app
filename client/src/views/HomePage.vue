<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height text-center d-flex align-center">
      <v-form
        color="secondary px-2"
        ref="form"
      >
        <div class="white--text text-h4 pb-4">Enter a room</div>
        <v-row>
          <v-col>
            <v-text-field
              required
              label="Room"
              :rules="rules.required"
              v-model="model.room"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              required
              label="Username"
              :rules="rules.required"
              v-model="model.username"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn
          size="large"
          @click="joinRoom"
          class="btn"
        >Join</v-btn>
      </v-form>
    </v-responsive>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
      model: {},
      rules: {
        required: [
          v => !!v || 'Field is required',
          v => v.length > 3 || 'Minimum 3 characters are required'
        ]
      }
    }
  },
  methods: {
    async joinRoom () {
      const { valid } = await this.$refs.form.validate()
      if (valid) {
        this.$router.push('/room/' + this.model.room)
        localStorage.setItem('user', JSON.stringify({
          name: this.model.username,
          id: this.$helpers.generateGuid()
        }))
      }
    }
  },
}
</script>

<style scoped>
.btn {
  background-image: linear-gradient(
    to right,
    #02aab0 0%,
    #00cdac 51%,
    #02aab0 100%
  );
}
</style>
