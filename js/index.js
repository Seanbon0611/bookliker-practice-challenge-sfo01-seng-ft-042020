//1. GET books from API
//2.render list of books onto page in an ul
//3.click on a book and be able to see thumbnail, and desc and list of users who liked book
//4.like a book (PATCH request) and update array of users who liked in API
const listOfBooks = document.querySelector('#list')
const bookContent = document.querySelector('#show-panel')
const user = {"id":1, "username":"pouros"}
renderBooks()

//1. GET books from API
function fetchBooks() {
  return fetch('http://localhost:3000/books')
  .then(resp => resp.json())
}
//2.render list of books onto page in an ul
function renderBooks() {
  fetchBooks()
  .then(books => books.forEach(bookList))
}

//3.click on a book and be able to see thumbnail, and desc and list of users who liked book
function bookList(book) {
  const liEl = document.createElement('li');
  liEl.setAttribute("id", book.id)
  liEl.innerText = book.title
  listOfBooks.appendChild(liEl)

  liEl.addEventListener('click', (event) => {
    bookInfo(book)
  });
}

function bookInfo(book) {
  bookContent.innerHTML = `
    <h1>${book.title}</h1>
    <img src='${book.img_url}' />
    <p>${book.description}</p>
    ${book.users.map(user => `<strong class='users' id='${user.id}'>${user.username}</strong><br>`).join("")}
    <br>
    <button>Read Book</button>
  `
  let readButton = document.querySelector('button')
  readButton.addEventListener('click', () => {
    book.users.push(user)
    addLike(book)
  })
}
//4.like a book (PATCH request) and update array of users who liked in API
function addLike(book) {
  fetch(`http://localhost:3000/books/${book.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(book)
  })
  .then(res => res.json())
}







// //1. GET books from API
// fetch('http://localhost:3000/books')
// .then(resp => resp.json())
// .then(books => renderBooks(books))

// //2.render list of books onto page in an ul
// function renderBooks(books) {
//   books.forEach(book => {
//     let liEl = document.createElement('li')
//     liEl.setAttribute('id', `${book.id}`)
//     liEl.innerText = book.title
//     listOfBooks.append(liEl)

//     //3.click on a book and be able to see thumbnail, and desc and list of users who liked book
//     liEl.addEventListener('click', () => {
//       const users = book.users.map(user => `<strong class='users' id='${user.id}'>${user.username}</strong><br>`)
//       const bookContent = document.querySelector('#show-panel')
//       bookContent.innerHTML = `
//         <h1>${book.title}</h1>
//         <img src='${book.img_url}' />
//         <p>${book.description}</p>
//         ${users.join('')}
//         <button>Read Book</button>
//       `

//       //4.like a book (PATCH request) and update array of users who liked in API
//       let readButton = document.querySelector('button')
//       readButton.addEventListener('click', (event) => {
//           book.users.push(user)
//           fetch(`http://localhost:3000/books/${book.id}`, {
//             method: "PATCH",
//             headers: {
//               "Content-Type": "application/json"
//             },
//             body: JSON.stringify(book)
//         })
//         .then(res => res.json())
//       });
//     });
//   });
// }
