
let elUser = document.querySelector("#user")
let elUserPost = document.querySelector("#userPost")
let elUserComment = document.querySelector("#userComments")

async function renderFunc (element){
  let dataUser = await fetch("https://jsonplaceholder.typicode.com/users")
  .then( res => res.json())
  .then( data => data)
  .catch(error => console.log(error))
  if(dataUser){ 
    dataUser.forEach(user => {
      let newLi = document.createElement("li")
      let h2 = document.createElement("h2")
      let p = document.createElement("p")
      
      newLi.dataset.id = user.id
      h2.textContent = user.name
      p.textContent = user.email
      p.setAttribute("style","pointer-events:none;")
      h2.setAttribute("style","pointer-events:none;")
      newLi.setAttribute("class","text-5xl border rounded-md list-none px-4 py-3 text-black")
      // console.log(newLi.dataset.id);
      newLi.dataset.id = user.id
      newLi.addEventListener("click", evt => {
        let id = evt.target.dataset.id
        postRenderFunc(id,elUserPost)
      })
      newLi.append(h2,p)
      element.appendChild(newLi)
    });
  } 
}
renderFunc(elUser)

async function postRenderFunc (id,element){
  let data = await fetch("https://jsonplaceholder.typicode.com/posts")
  .then( res => res.json())
  .then( data => data)
  .catch(error => console.log(error))
  // console.log(userPost);
  let userPost = data.filter(post => post.userId == id )
  // console.log(data);
  if(userPost){ 
    userPost.forEach(post => {
      let newLi = document.createElement("li")
      let h2 = document.createElement("h2")
      let p = document.createElement("p")
      
      h2.textContent = post.title;
      p.textContent = post.body;
      p.setAttribute("style","pointer-events:none;")
      h2.setAttribute("style","pointer-events:none;")
      newLi.setAttribute("class","text-2xl border rounded-md list-none px-4 py-3 text-black")
      newLi.dataset.id = post.id;
      // console.log(newLi.dataset.id);
      newLi.append(h2,p);
      newLi.addEventListener("click", evt => {
        let id = evt.target.dataset.id
        commentRenderFunc (id,elUserComment);
      });
      console.log(newLi);
      element.appendChild(newLi);
    });
  }
}

async function commentRenderFunc(id, element) {
  let data = await fetch("https://jsonplaceholder.typicode.com/comments")
  .then((res) => res.json())
  .then((data) => data)
  .catch((error) => console.log(error));
  
  let postComments = data.filter((comment) => comment.postId == id);
  console.log(postComments);
  
  if (postComments) {
    postComments.forEach((comment) => {
      let newLi = document.createElement("li");
      let h2 = document.createElement("h2");
      let p = document.createElement("p");
      let h3 = document.createElement("h3");
      
      h2.textContent = comment.name;
      p.textContent = comment.body;
      h3.textContent = comment.email;
      p.setAttribute("style","pointer-events:none;")
      h2.setAttribute("style","pointer-events:none;")
      newLi.setAttribute("class", "text-xl border rounded-md list-none px-4 py-3 text-black");
      newLi.dataset.id = comment.id;
      newLi.append(h2, p, h3);
      
      element.appendChild(newLi);
    });
  }
}
