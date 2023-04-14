class Book {
  constructor(
    title = "Unknown",
    author = "Unknown",
    topic = "Unknown",
    isRead = false
  ) {
    this.title = title
    this.author = author
    this.topic = topic
    this.isRead = isRead
  }
}

class Library {
  constructor() {
    this.books = []
  }

  addBook(newBook) {
    if (!this.isInLibrary(newBook)) {
      this.books.push(newBook)
    }
  }

  removeBook(title) {
    this.books = this.books.filter(book => book.title !== title)
  }

  getBook(title) {
    return this.books.find(book => book.title === title)
  }

  isInLibrary(newBook) {
    return this.books.some(book => book.title === newBook.title)
  }
}

const library = new Library()

// User interface

const addBookBtn = document.getElementById("addBookBtn")
const addBookModal = document.getElementById("addBookModal")
const errorMsg = document.getElementById("errosMsg")
const overlay = document.getElementById("overlay")
const addBookForm = document.getElementById('addBookForm')
const booksGrid = document.getElementById('booksGrid')

const openAddBookModel = () => {
  addBookForm.reset()
  addBookModal.classList.add("active")
  overlay.classList.add("active")
}

const closeAddBookModel = () => {
  addBookModal.classList.remove("active")
  overlay.classList.remove("active")
  // errorMsg.classList.remove("active")
  // errorMsg.textContent = ""
}

const closeAllModels = () => {
  closeAddBookModel()
}

const handleKeyboardInput = (e) => {
  if (e.key ===  "Escape") closeAllModels()
}

const updateBooksGrid = () => {
  resetBooksGrid()
  for (let book of library.books) {
    createBookCard(book)
  }
}

const resetBooksGrid = () => {
  booksGrid.innerHTML = ""
}

const createBookCard = (book) => {
  const bookCard = document.createElement('div')
  const title = document.createElement('p')
  const author = document.createElement('p')
  const topic = document.createElement('p')
  const buttonGroup = document.createElement('div')
  const readBtn = document.createElement('button')
  const removeBtn = document.createElement('button')

  bookCard.classList.add('book-card')
  buttonGroup.classList.add('button-group')
  readBtn.classList.add('btn')
  removeBtn.classList.add('btn')
  readBtn.onclick = toggleRead
  removeBtn.onclick = removeBook

  title.textContent = `${book.title}`
  author.textContent = book.author
  topic.textContent = `${book.topic}`
  removeBtn.textContent = 'Remove'

  if (book.isRead) {
    readBtn.textContent = "Read"
    readBtn.classList.add("btn-light-green")
  } else {
    readBtn.textContent = "Not read"
    readBtn.classList.add("btn-light-red")
  }

  bookCard.appendChild(title)
  bookCard.appendChild(author)
  bookCard.appendChild(topic)
  buttonGroup.appendChild(readBtn)
  buttonGroup.appendChild(removeBtn)
  bookCard.appendChild(buttonGroup)
  booksGrid.appendChild(bookCard)
}

const getBookFromInput = () => {
  const title = document.getElementById('title').value
  const author = document.getElementById('author').value
  const topic = document.getElementById('topic').value
  const isRead = document.getElementById('isRead').checked
  return new Book(title, author, topic, isRead)
}

const addBook = (e) => {
  e.preventDefault()
  const newBook = getBookFromInput()

  if (library.isInLibrary(newBook)) {
    errorMsg.textContent = "This book already exists in your library"
    errorMsg.classList.add("active")
    return
  }

  library.addBook(newBook)
  updateBooksGrid()

  closeAddBookModel()
}

const removeBook = (e) => {
  const buttonGroup = e.target.parentNode
  const title = buttonGroup.parentNode.firstChild.innerHTML
  library.removeBook(title)
  updateBooksGrid()
}

const toggleRead = (e) => {
  const buttonGroup = e.target.parentNode
  const title = buttonGroup.parentNode.firstChild.innerHTML
  const book = library.getBook(title)
  book.isRead = !book.isRead
  updateBooksGrid()
}

addBookBtn.onclick = openAddBookModel
overlay.onclick = closeAllModels
addBookForm.onsubmit = addBook
window.onkeydown = handleKeyboardInput

