<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref, onMounted } from "vue";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
/* import { useRouter } from "vue-router"; */
/* const router = useRouter(); */
const auth = getAuth();
const logout = ref(false);
onMounted(() => {
  //const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      logout.value = true;
      // ...
    } else {
      logout.value = false;
      // ...
    }
  });
});
function Logout() {
  // const auth = getAuth();
  signOut(auth)
    .then(() => {
      //
      alert("Sign-out successful.");
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}
</script>

<template>
  <v-toolbar :elevation="8" title="">

    <header>
      <img alt="Vue logo" class="logo" src="../src/assets/image/CA.png" width="125" height="125" />

      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
    </header>
    <v-spacer></v-spacer>
    <v-btn>
      <RouterLink to="/login">login</RouterLink>
    </v-btn>
    <div><v-tab prepend-icon="mdi-logout" value="" @click="Logout()" v-if="logout">LOGOUT</v-tab></div>
  </v-toolbar>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
