class Post {
  constructor () {
    this.db = firebase.firestore();
    // this.db.settings({
    //   timestampsInSnapshots: true
    // });
    // console.log(this.db)
  }

  crearPost (uid, emailUser, title, description, imageLink, videoLink) {
    return this.db.collection('posts').add({
      uid: uid,
      autor: emailUser,
      title: title,
      description: description,
      imageLink: imageLink,
      videoLink: videoLink,
      date: firebase.firestore.FieldValue.serverTimestamp()
    }).then(refDoc => {
    }).catch(error => console.log('Error', error))
  }

  consultarTodosPost () {
    const posts = document.getElementById('posts');
    this.db.collection('posts').onSnapshot(querySnapshot => {
      while(posts.firstChild) posts.removeChild(posts.firstChild);
      if(querySnapshot.empty) {
        console.log('vacio');
      } else {
        querySnapshot.forEach(post => {
          let date = new Date(post.data().date.seconds).toLocaleDateString("es-ES");
          let postHtml = this.obtenerPostTemplate(
            post.data().autor,
            post.data().title,
            post.data().description,
            post.data().imageLink,
            post.data().videoLink,
            Utilidad.obtenerFecha(post.data().date.toDate())
          )
          posts.appendChild(postHtml);
        })
      }
    })
  }

  // consultPostUsuario(emailUser) {
  //   const posts = document.getElementById('posts');
  //   this.db.collection('posts').where('autor', "==", emailUser)
  //   .onSnapshot(querySnapshot => {
  //     while(posts.firstChild) posts.removeChild(posts.firstChild);
  //     if(querySnapshot.empty) {
  //       console.log('vacio');
  //     } else {
  //       querySnapshot.forEach(post => {
  //         let postHtml = this.obtenerPostTemplate(
  //           post.data().autor,
  //           post.data().title,
  //           post.data().description,
  //           post.data().imageLink,
  //           post.data().videoLink,
  //           Utilidad.obtenerFecha(post.data().date.toDate())
  //         )
  //         posts.appendChild(postHtml);
  //       })
  //     }
  //   })
  // }

  obtenerPostTemplate (
    autor,
    title,
    description,
    imageLink,
    videoLink,
    date
  ) {
    let div = document.createElement('div');
    if (imageLink) {
      div.innerHTML =`<article class="post">
            <div class="post-title">
                <h5>${title}</h5>
            </div>
            <div class="post-calificacion">
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-vacia" href="*"></a>
            </div>
            <div class="post-video">
                <img id="imgVideo" src='${imageLink}' class="post-image-video"
                    alt="Imagen Video">
            </div>
            <div class="post-videolink">
              <a href="${videoLink}" target="blank">Ver Video</a>
            </div>
            <div class="post-description">
                <p>${description}</p>
            </div>
            <div class="post-footer container">
                <div>
                    <div">
                        Fecha: ${date}
                    </div>
                    <div">
                        Autor: ${autor}
                    </div>
                </div>
            </div>
        </article>`
      return div;
    }
    div.innerHTML = `<article class="post">
                <div class="post-title">
                    <h5>${title}</h5>
                </div>
                <div class="post-calificacion">
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-vacia" href="*"></a>
                </div>
                <div class="post-video">
                  <iframe type="text/html" width="500" height="385" src='https://www.youtube.com/embed/${videoLink}'
                      frameborder="0">
                  </iframe>
                </div>
                <div class="post-videolink">
                    Video
                </div>
                <div class="post-description">
                    <p>${description}</p>
                </div>
                <div class="post-footer container">
                    <div>
                        <div">
                            date: ${date}
                        </div>
                        <div">
                            Autor: ${autor}
                        </div>
                    </div>
                </div>
            </article>`
    return div;
  }
}
