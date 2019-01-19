<template>
  <div class="row h90 align-items-center">
    <div class="col-8 offset-2 h50">
      <transition name="fade">
        <div class="inherent-h card shadow" v-if="!newUser">
          <div class="card-header shadow d-flex justify-content-between align-items-center">
            <h4 class="m-0 text-white ml-4">Login</h4>
            <button class="btn btn-secondary shadow mr-4 my-4" @click="newUser = !newUser">Register</button>
          </div>
          <form @submit.prevent="$store.dispatch('login', log)" class="inherent-h d-flex flex-column justify-content-around align-items-center mt-4">
            <div class="input-group d-flex justify-content-center">
              <div class="input-group-prepend">
                <span class="input-group-prepend">
                  <i class="fas fa-2x fa-envelope-square mr-5 pr-1"></i>
                </span>
              </div>
              <input type="email" placeholder="  enter email address" required v-model="log.email" class="w-75 shadow-sm">
            </div>
            <div class="input-group d-flex justify-content-center">
              <div class="input-group-prepend">
                <span class="input-group-prepend">
                  <i class="fas fa-2x fa-key mr-5"></i>
                </span>
              </div>
              <input type="password" placeholder="  enter password" required v-model="log.password" class="w-75 shadow-sm">
            </div>
            <button type="submit" class="btn btn-success shadow w-fc mb-2">Submit</button>
          </form>
        </div>
      </transition>
      <transition name="fade">
        <div class="inherent-h card" v-if="newUser">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="m-0">Register</h5>
            <button class="btn btn-light" @click="newUser = !newUser">or Login</button>
          </div>
          <form @submit.prevent="register()" class="inherent-h d-flex flex-column justify-content-around align-items-center form">
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
      </transition>
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

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter,
  .fade-leave-to

  /* .fade-leave-active below version 2.1.8 */
    {
    opacity: 0;
  }

  .card {
    border: 1px solid var(--blue);
  }

  .card-header {
    background-color: var(--blue);
    border: 1px solid var(--blue);
  }

  input {
    border: 1px solid var(--blue);
  }
</style>