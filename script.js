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
//add book to array
function addBooks(item) {
  myLibrary.push(item);
  displayLibrary(myLibrary.at(-1))
}
//ADD button press -> get info, if not in array, add book
function addBookToLibrary() {
  const addTitle = document.getElementById('title').value 
  const addAuthor = document.getElementById('author').value
  const getProgress = document.getElementById('progress').value
  const book = new Book(addTitle, addAuthor, getProgress);
  
  //check title and author are not empty
  if (addTitle === "") {
    alert('please add a title')
    return
  } else if (addAuthor === "") {
    alert('please add an author')
    return
  }
  //if the exact some book is not in library add it
  for (const item in myLibrary) {
    if (myLibrary[item].title == book.title && myLibrary[item].author == book.author) {
      myLibrary[item].progress = book.progress

      //find the element 
      for (const pEl of document.querySelectorAll('p')) {
        if (pEl.textContent.includes(book.title)) {
          const progBut = pEl.parentNode.childNodes[2]
          progBut.setAttribute('class', book.progress)
          progBut.innerHTML = book.progress
        }
      }

      alert('The book already exists. The progress has been updated.')
      return

    }
  }
  addBooks(book)

  document.getElementById('title').value = ""
  document.getElementById('author').value = ""
}
//display book on HTML
function displayLibrary(x) {

  const newDiv = document.createElement("div")
  newDiv.classList.add('book')

  const titleP = document.createElement("p")
  titleP.textContent = x.title;
  newDiv.append(titleP)

  const authorP = document.createElement("p")
  authorP.textContent = x.author;
  newDiv.append(authorP)

  const progressP = document.createElement("button")
  progressP.classList.add(x.progress)
  progressP.textContent = x.progress;
  progressP.addEventListener("click", function(e){
    changeProgress(this)
    const ind = getIndexNum(getTitle(this), getAuthor(this))
    myLibrary[ind].changeProg(getTitle(this), getAuthor(this))
  })
  newDiv.append(progressP)

  const removeBut = document.createElement("button")
  removeBut.classList.add("remove-but")
  removeBut.textContent = '-'
  removeBut.addEventListener("click", function(e){    
    removeBookFromLibrary(getTitle(this), getAuthor(this))
    this.parentNode.remove()
  })
  newDiv.append(removeBut)

  const bookshelf = document.getElementById("bookshelf")
  bookshelf.appendChild(newDiv)
}
//remove book from []
function removeBookFromLibrary(bkTitle, auTitle) {
  const index = getIndexNum(bkTitle, auTitle)
  myLibrary.splice(index, 1)
}
//change progress button
function changeProgress(aDiv) {
  const bookDiv = aDiv.className

  //add new class
  switch (bookDiv) {
    case "ipr":
      aDiv.setAttribute('class', 'read')
      aDiv.innerHTML = 'read'
      break;
    case "read":
      aDiv.setAttribute('class', 'not-read')
      aDiv.innerHTML = 'not-read'
      break;
    case "not-read":
      aDiv.setAttribute('class', 'ipr')
      aDiv.innerHTML = 'ipr'
      break;    
  }
}
Book.prototype.changeProg = function(bookTitle, authorTitle) {
  
  const indexNum = getIndexNum(bookTitle, authorTitle)

  //change progress
  switch (myLibrary[indexNum].progress) {
    case "ipr":
      myLibrary[indexNum].progress = 'read'
      break;
    case "read":
      myLibrary[indexNum].progress = 'not-read'
      break;
    case "not-read":
      myLibrary[indexNum].progress = 'ipr'
      break;    
  }
}
function getIndexNum(book, author) {
  let bPosition = myLibrary.map(object => object.title).indexOf(book)
  let aPosition = myLibrary.map(item => item.author).indexOf(author)

  if (bPosition == aPosition) {
    return bPosition
  } else {
    console.log('borken')
  }
}
function getTitle(el){
  return el.parentNode.childNodes[0].innerHTML
}
function getAuthor(el){
  return el.parentNode.childNodes[1].innerHTML
}