
const message = document.getElementById('message');
const profile = document.getElementById('profile');


window.autentica = {
  creaCuentaEmailPass: (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(result => {


      const configuracion = {
        url: 'http://localhost:3000/'
      }
      result.user.sendEmailVerification(configuracion).catch(function(error) {
        console.log('No se pudo enviar email')
      });

      firebase.auth().signOut()

    }).catch(function(error) {
      console.log(error.message)
    });
  },


  iniciaSesion: (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(result => {
      if(result.user.emailVerified) {
        usuario.innerHTML = "Bienvenida a Geek";
        profile.classList.remove("hidden");
        profile.classList.add("show");
        bienvenida.classList.remove("show");
        bienvenida.classList.add("hidden");
      } else {
        firebase.auth().signOut();
        profile.classList.remove("show");
        profile.classList.add("hidden");
        bienvenida.classList.remove("hidden");
        bienvenida.classList.add("show");
        usuario.innerHTML = "Por favor realiza la verificacion por email";
      }
    })
    .catch(error => {
      message.innerHTML = "Email o password incorrecto";
      console.log(error.message)
    });
  },

  autenticaGoogle: () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(result => {
      const user = result.user.displayName;
      profile.classList.remove("hidden");
      profile.classList.add("show");
      message.innerHTML = "Bienvenido " + user ;
    }).catch(error => {
      console.log(error);
    });
  },

  autenticaFb: () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(result => {
      const user = result.user.displayName;
      profile.classList.remove("hidden");
      profile.classList.add("show");
      message.innerHTML = "Bienvenido " + user ;
    }).catch(error => {
      console.log(error);
    });

  },

  cierraSesion:() => {
    firebase.auth().signOut().then(() => {
      profile.classList.add("hidden");
      profile.classList.remove("show");
    })
    .catch(err => console.log('Error logout', err))
  }
}