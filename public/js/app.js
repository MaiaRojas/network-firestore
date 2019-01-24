
const email = document.getElementById('emailSesion').value;
const password = document.getElementById('passwordSesion').value;
const btnLoginEmail = document.getElementById('btnLoginEmail');
const authFB = document.getElementById('authFB');
const authGoogle = document.getElementById('authGoogle');
const btnSignIn = document.getElementById('btnSignIn');
const btnLogout = document.getElementById('btnLogout');
const userOneline = document.getElementById('userOneline');
const login = document.getElementById('login');
const btnMyPost =document.getElementById('btnMyPost');

window.onload = () => {

  firebase.initializeApp(config);

  const poster = new Post();
  poster.consultarTodosPost();


  firebase.auth().onAuthStateChanged(user => {
    const message = document.getElementById('message');

    if (user) {
      login.classList.add("hidden");
      message.innerHTML = "Bienvenida " + user.displayName;
      userOneline.classList.add("show");
      userOneline.classList.remove("hidden");
    } else {
      login.classList.remove("hidden");
      message.innerHTML = "Aun no has iniciado sesion";
      userOneline.classList.remove("show");
      userOneline.classList.add("hidden");
    }
  });

  btnLoginEmail.addEventListener('click', () => {
    const email = document.getElementById('emailSesion').value;
    const password = document.getElementById('passwordSesion').value;
    const auth =  new Autentication();
    auth.AuthEmailPass(email, password);
  });

  authFB.addEventListener('click', () => {
    const auth =  new Autentication();
    auth.AuthFb();
  });

  authGoogle.addEventListener('click', () => {
    const auth =  new Autentication();
    auth.AuthGoogle();
  });

  btnSignIn.addEventListener('click', () => {
    const email = document.getElementById('emailSesion').value;
    const password = document.getElementById('passwordSesion').value;
    const auth =  new Autentication();
    auth.CreateAccountEmailPass(email, password);
  });

  btnLogout.addEventListener('click', () => {
    const auth =  new Autentication();
    auth.LogOut();
  })

  btnMyPost.addEventListener('click', () => {
    const user = firebase.auth().currentUser;
    console.log(user);
    if(user) {
      poster.consultPostUsuario(user.email)
    } else {
      console.log('Autenticate')
    }
  })

}
