
const message = document.getElementById('message');
const profile = document.getElementById('profile');

class Autentication {

  CreateAccountEmailPass (email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(result => {
      // result.user.updateProfile({
      //   displayName: name
      // })

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
  }

  AuthEmailPass (email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(result => {
      if(result.user.emailVerified) {
        message.innerHTML = "Bienvenida a Geek";
        profile.classList.remove("hidden");
        profile.classList.add("show");
      } else {
        firebase.auth().signOut();
        profile.classList.remove("hidden");
        profile.classList.add("show");
        message.innerHTML = "Por favor realiza la verificacion por email";
      }
    })
    .catch(error => {
      message.innerHTML = "Email o password incorrecto";
      console.log(error.message)
    });
  }

  AuthGoogle () {
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
  }

  AuthFb() {
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

  }
  LogOut() {
    firebase.auth().signOut().then(() => {
      profile.classList.add("hidden");
      profile.classList.remove("show");
    })
    .catch(err => console.log('Error logout', err))
  }
}