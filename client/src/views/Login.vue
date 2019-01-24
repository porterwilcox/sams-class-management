<template>
  <div class="row h90 align-items-center">
    <div class="col-10 offset-1 h50">
      <div class="inherent-h card" v-if="!newUser">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="m-0">Login</h5>
          <button class="btn btn-light" @click="newUser = !newUser">or Register</button>
        </div>
        <form @submit.prevent="$store.dispatch('login', log)" class="inherent-h d-flex flex-column justify-content-around align-items-center">
          <div class="input-group d-flex justify-content-center">
            <div class="input-group-prepend">
              <span class="input-group-prepend">
                <i class="fas fa-2x mr-1 fa-envelope-square"></i>
              </span>
            </div>
            <input type="email" required v-model="log.email" class="w-75">
          </div>
          <div class="input-group d-flex justify-content-center">
            <div class="input-group-prepend">
              <span class="input-group-prepend">
                <i class="fas fa-2x mr-1 fa-key"></i>
              </span>
            </div>
            <input type="password" required v-model="log.password" class="w-75">
          </div>
          <button type="submit" class="btn btn-outline-secondary w-fc">Submit</button>
        </form>
      </div>
      <div class="inherent-h card" v-if="newUser">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="m-0">Register</h5>
          <button class="btn btn-light" @click="newUser = !newUser">or Login</button>
        </div>
        <form @submit.prevent="register()" class="inherent-h d-flex flex-column justify-content-around align-items-center">
          <div class="input-group d-flex justify-content-center">
            <div class="input-group-prepend">
              <span class="input-group-prepend">
                <i class="fas fa-2x mr-1 fa-envelope-square"></i>
              </span>
            </div>
            <input type="email" required v-model="reg.email" class="w-75">
          </div>
          <div class="input-group d-flex justify-content-center">
            <div class="input-group-prepend">
              <span class="input-group-prepend">
                <i class="fas fa-2x mr-1 fa-key"></i>
              </span>
            </div>
            <input type="password" required v-model="reg.password" class="w-75">
          </div>
            <div class="input-group d-flex justify-content-center">
            <div class="input-group-prepend">
              <span class="input-group-prepend">
                <i class="fas fa-2x mr-1 fa-check"></i>
              </span>
            </div>
            <input type="password" placeholder="confirm password" required v-model="reg.confirmPass" class="w-75">
          </div>
          <button class="btn btn-outline-secondary w-fc">Create Account</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      newUser: false,
      log: {
        email: "",
        password: ""
      },
      reg: {
        email: "",
        password: "",
        confirmPass: ""
      }
    }
  },
methods: {
    register() {
        if (this.reg.password != this.reg.confirmPass) {
            alert("Password confirmation doesn't match.")
            return
        }
        this.$store.dispatch('register', this.reg)
    }
}
};
</script>
