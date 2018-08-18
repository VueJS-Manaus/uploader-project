<template>
  <div>
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <a class="navbar-brand" href="">UpLoader App</a>
        <button class="navbar-toggler" type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav d-flex justify-content-end">
            <li class="nav-item" v-if="user">
              <span class="nav-link active">{{user.email}}</span>
            </li>
            <li class="nav-item">
              <button class="nav-link btn btn-outline-info" @click="logout">Logout</button>
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <main>
      <router-view/>
    </main>

    <footer>
      <div class="footer bg-dark">
        <ul class="footer__items">
          <li class="footer__item">Home</li>
          <li class="footer__item">About</li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    logout () {
      this.$router.push('/')
      return this.$store.dispatch('logout')
    }
  }
}
</script>

<style>
  main {
    min-height: calc(100vh - 1.4rem - 58px)
  }

  .navbar-nav {
    width: 100%;
  }

  .footer {
    padding: 1.4rem;
  }

  .footer__items {
    list-style: none;
    display: flex;
    justify-content: center;
    padding-left: 0;
  }

  .footer__item {
    margin: 0 10px;
    color: white;
  }

  /* Loader */

  .loader {
    border: 2px solid #f3f3f3;
    /* border-top: 2px solid rgba(0,0,0,0.5); */
    border-top: 2px solid #6c757d;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
  }
</style>
