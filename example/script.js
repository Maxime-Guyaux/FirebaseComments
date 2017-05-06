const refProd = new Firebase("https://blop-98baa.firebaseio.com/");
const refValid = new Firebase("https://blap-7c5ac.firebaseio.com/");

const form = document.querySelector("form");

form.addEventListener("submit", postComment);

const timeStamp = () => {
  let options = {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute:'2-digit'
  };
  let now = new Date().toLocaleString('en-US', options);
  return now;
};

function postComment(e) {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let comment = document.getElementById("comment").value;

  if (name && comment) {
    refValid.push({
      name: escape(name),
      comment: escape(comment),
      time: timeStamp(),
      page: escape(window.location.href) 
    });
  }

  document.getElementById("name").value = '';
  document.getElementById("comment").value = ''; 
};

refProd.on("child_added", function(snapshot) {
  let comment = snapshot.val();
  if(window.location.href === unescape(comment.page))
  addComment(comment.name, comment.comment, comment.time);
});
const addComment = (name, comment, timeStamp) => {
  let unName = unescape(name);
  let unComment = unescape(comment);
  let comments = document.getElementById("comments");
  comments.innerHTML = `<hr><h4>${unName} says<span>${timeStamp}</span></h4><p>${unComment}</p>${comments.innerHTML}`;
}