<template>
 <div class="login-section">
   <div class="container">
     <div class="row">
       <div class="col">
        <app-alert v-if="erro" :text="erro.message"></app-alert>
        <div class="card">
          <form @submit.prevent="onSubmit">
            <div class="form-group">
              <label for="loginInput">Login</label>
              <input type="email" class="form-control" id="loginInput" placeholder="Login" v-model="login">
            </div>
            <div class="form-group">
              <label for="passwordInput">Senha</label>
              <input type="password" class="form-control" id="passwordInput" placeholder="Senha" v-model="senha">
            </div>
            <button class="btn btn-secondary d-flex">
              Enter
              <div class="loader ml-2" v-if="loading"></div>
            </button>
          </form>
        </div>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
export default {
  data () {
    return {
      login: '',
      senha: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    loading () {
      return this.$store.getters.loading
    },
    erro () {
      return this.$store.getters.erro
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/upload')
      }
    }
  },
  methods: {
    onSubmit () {
      let user = {
        login: this.login,
        senha: this.senha
      }
      this.$store.dispatch('signInUser', user)
    }
  }
}
</script>

<style scoped>
  .login-section {
    margin: 0 auto;
    padding: 1.4rem;
    transform: translate(0, 50%)
  }
  .card {
    padding: 20px;
  }

  @media (min-width: 576px) {
    .login-section {
    width: 40vw;
    min-width: 320px;
  }
  }
</style>
