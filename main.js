// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

document.addEventListener("DOMContentLoaded", () => {

  function catchErrors(error){
    let errorModal = document.getElementById("modal")
    let messageModal = document.getElementById("modal-message")
    messageModal.innerText = `${error.message}`
    errorModal.classList.remove("hidden") 
    setTimeout(function(){errorModal.classList.add("hidden")}, 5000)
  }

  // fake server call with error handling
  mimicServerCall()
  .then(json => console.log(json))
  .catch(error => {
    catchErrors(error)
  })

  function updateHeart(postId){
    mimicServerCall()
      .then(json => {
        let post = document.getElementById(postId)
        let like = post.getElementsByClassName("like-glyph")[0]
        if (like.innerText == EMPTY_HEART) {
          like.innerText = FULL_HEART;
          like.classList.add("activated-heart")
        } else {
          like.innerText = EMPTY_HEART; 
          like.classList.remove("activated-heart")
        }
      })
      .catch( error => {
        catchErrors(error);
      })
  }

  let posts = document.getElementsByClassName("media-post")
  for(i = 0; i < posts.length; i++) {
    let like = posts[i].getElementsByClassName("like")[0]
    let postId = posts[i].id
    like.addEventListener("click", () => {
      updateHeart(postId)
    })
  }

})


//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
