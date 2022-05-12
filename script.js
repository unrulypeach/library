let myLibrary = [];
const exists = document.getElementsByClassName('book')
//add book button
const addBook = document.getElementById('add-book')
addBook.addEventListener("click", addBookToLibrary);


// object - book template
function Book(title, author, progress) {
  this.title = title
  this.author = author 
  this.progress = progress
}

//load two example books
const bookOne = new Book('The Art of War', 'Sun Tzu', 'read')
const bookTwo = new Book('Demons', 'Fydor Dostoevsky', 'ipr')
addBooks(bookOne)
addBooks(bookTwo)

function addBooks(item) {
  myLibrary.push(item);
  displayLibrary(myLibrary.at(-1))
}

//when ADD button is pressed
function addBookToLibrary() {
  const addTitle = document.getElementById('title').value 
  const addAuthor = document.getElementById('author').value
  const getProgress = document.getElementById('progress').value
  const book = new Book(addTitle, addAuthor, getProgress);
  
  //if the exact some book is not in library add it
  for (const item in myLibrary) {
    if (myLibrary[item].title == book.title && myLibrary[item].author == book.author) {
      myLibrary[item].progress = book.progress
      alert('The book already exists. The progress has been updated.')
      return
    }
  }

  addBooks(book)
}
//display a book: x = book object
function displayLibrary(x) {
    const newDiv = document.createElement("div")
    const jsTitle = x.title.replace(/\s+/g, '')
    const result = jsTitle.toLowerCase() + x.author.replace(/\s+/g, '')
    newDiv.classList.add('book')
    newDiv.setAttribute('id', result)

    const titleP = document.createElement("p")
    titleP.textContent = x.title;
    newDiv.append(titleP)

    const authorP = document.createElement("p")
    authorP.textContent = x.author;
    newDiv.append(authorP)

    const progressP = document.createElement("button")
    progressP.classList.add("progress")
    progressP.textContent = x.progress;
    newDiv.append(progressP)

    const removeBut = document.createElement("button")
    removeBut.classList.add("remove-but")
    removeBut.textContent = '-'
    removeBut.addEventListener("click", function(e){
      const getTitle = this.parentNode.childNodes[0].innerHTML
      const getAuthor = this.parentNode.childNodes[1].innerHTML

      removeBookFromLibrary(getTitle)
    })
    newDiv.append(removeBut)

    const bookshelf = document.getElementById("bookshelf")
    bookshelf.appendChild(newDiv)
}

//remove a book from [] and screen
function removeBookFromLibrary(bkTitle) {
  //find index number
  let position = myLibrary.map(object => object.title).indexOf(bkTitle)
  //rm from screen
    
  //from array


}

//change
