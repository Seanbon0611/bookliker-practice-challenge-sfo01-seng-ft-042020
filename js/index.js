//1. GET books from API
//2.render list of books onto page in an ul
//3.click on a book and be able to see thumbnail, and desc and list of users who liked book
//4.like a book (PATCH request) and update array of users who liked in API
const listOfBooks = document.querySelector('#list')
const bookContent = document.querySelector('#show-panel')
const user = {"id":1, "username":"pouros"}

//1. GET books from API
fetch('http://localhost:3000/books')
.then(resp => resp.json())
.then(books => renderBooks(books))

//2.render list of books onto page in an ul
function renderBooks(books) {
  books.forEach(book => {
    let liEl = document.createElement('li')
    liEl.setAttribute('id', `${book.id}`)
    liEl.innerText = book.title
    listOfBooks.append(liEl)

    //3.click on a book and be able to see thumbnail, and desc and list of users who liked book
    liEl.addEventListener('click', () => {
      const users = book.users.map(user => `<strong class='users' id='${user.id}'>${user.username}</strong><br>`)
      const bookContent = document.querySelector('#show-panel')
      bookContent.innerHTML = `
        <h1>${book.title}</h1>
        <img src='${book.img_url}' />
        <p>${book.description}</p>
        ${users.join('')}
        <button>Read Book</button>
      `

      //4.like a book (PATCH request) and update array of users who liked in API
      let readButton = document.querySelector('button')
      readButton.addEventListener('click', (event) => {
        if (event.target.tagName === "BUTTON") {
          book.users.push(user)
          likeBook(book)
        }
      })
    })
  })
}

function likeBook(book) {
  fetch(`http://localhost:3000/books/${book.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(book)
  })
  .then(res => res.json())
}
