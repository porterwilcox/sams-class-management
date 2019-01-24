<template>
  <div class="row h85 align-items-center">
    <div class="col-6 offset-3 h50">
      <transition name="fade">
        <div class="inherent-h card shadow-lg" v-if="!newUser">
          <div class="card-header shadow d-flex justify-content-between align-items-center">
            <h4 class="m-0 text-white ml-4 login-btn">Login</h4>
            <button class="btn btn-secondary shadow mr-4 my-4 register-btn" @click="newUser = !newUser">Register</button>
          </div>
          <form @submit.prevent="$store.dispatch('login', log)" class="inherent-h d-flex flex-column justify-content-around align-items-center mt-5">
            <div class="input-group d-flex justify-content-center">
              <div class="input-group-prepend">
                <span class="input-group-prepend">
                  <i class="fas fa-2x fa-envelope-square mr-4 pr-1 text-danger"></i>
                </span>
              </div>
              <input type="email" placeholder="  enter email address" required v-model="log.email" class="shadow-sm">
            </div>
            <div class="input-group d-flex justify-content-center">
              <div class="input-group-prepend">
                <span class="input-group-prepend">
                  <i class="fas fa-2x fa-key mr-4 text-warning"></i>
                </span>
              </div>
              <input type="password" placeholder="  enter password" required v-model="log.password" class="shadow-sm">
            </div>
            <button type="submit" class="btn btn-success shadow w-fc my-4">Submit</button>
          </form>
        </div>
      </transition>
      <transition name="fade">
        <div class="inherent-h card shadow-lg" v-if="newUser">
          <div class="card-header d-flex justify-content-between align-items-center shadow mb-4">
            <h4 class="m-0 text-white ml-4">Register</h4>
            <button class="btn btn-secondary text-white mr-4 my-4 shadow" @click="newUser = !newUser">Login</button>
          </div>
          <form @submit.prevent="register()" class="inherent-h d-flex flex-column justify-content-between align-items-center form">
            <div class="input-group d-flex justify-content-center mt-3">
              <div class="input-group-prepend">
                <span class="input-group-prepend">
                  <i class="fas fa-2x fa-envelope-square pr-1 mr-4 text-danger"></i>
                </span>
              </div>
              <input type="email" placeholder="  enter email address" required v-model="reg.email" class="w-75 shadow-sm">
            </div>
            <br />
            <div class="input-group d-flex justify-content-center mb-4">
              <div class="input-group-prepend">
                <span class="input-group-prepend">
                  <i class="fas fa-2x mr-1 fa-key mr-4 text-warning"></i>
                </span>
              </div>
              <input type="password" placeholder="  enter password" required v-model="reg.password" class="w-75 shadow-sm">
            </div>
            <div class="input-group d-flex justify-content-center">
              <div class="input-group-prepend">
                <span class="input-group-prepend">
                  <i class="fas fa-2x mr-1 fa-check mr-4 text-success"></i>
                </span>
              </div>
              <input type="password" placeholder="  confirm password" required v-model="reg.confirmPass" class="w-75 shadow-sm">
            </div>
            <button class="btn btn-success w-fc shadow my-4">Create Account</button>
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


  @media (max-width: 767px) {

    .card {
      width: 90vw;
    }

    .nav {
      font-size: 0.8rem;
    }

    .login-btn {
      margin-left: -50px;
    }

    .register-btn {
      margin-left: 5vw;
    }

    input {
      width: 60vw;
    }

  }
</style>