const btnPost = document.getElementById('btnPost');



btnPost.addEventListener('click', () => {
  sessionStorage.setItem('imgNewPost', null)
  const post = new Post();
  const user = firebase.auth().currentUser;

  if(user == null){
    return console.log('Autenticar Usuario')
  }

  const autor = document.getElementById('autor').value;
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const videoLink = document.getElementById('videoLink').value;
  const imageLink = sessionStorage.getItem('imgNewPost') == 'null'
    ? null
    : sessionStorage.getItem('imgNewPost')

  // crearPost (uid, emailUser, title, description, imageLink, videoLink)
  post.crearPost(
    user.uid,
    user.email,
    title,
    description,
    imageLink,
    videoLink
  ).then(resp => {
    console.log('Post creado Correctamente')
  }).catch(err => console.log(err))
})