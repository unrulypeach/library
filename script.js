class Library {

  constructor(library = []){
    this.library = library;
  }
  addBooks(item) {
    this.library.push(item);
    this.displayLibrary(this.library.at(-1))
  }
  addBookToLibrary() {
    const addTitle = document.getElementById('title').value; 
    const addAuthor = document.getElementById('author').value;
    const getProgress = document.getElementById('progress').value;
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
    for (const item in this.library) {
      if (this.library[item].title == book.title && this.library[item].author == book.author) {
        this.library[item].progress = book.progress
  
        //find the element 
        for (const pEl of document.querySelectorAll('p')) {
          if (pEl.textContent.includes(book.title)) {
            const progBut = pEl.parentNode.childNodes[2]
            progBut.setAttribute('class', book.progress)
            progBut.innerHTML = book.progress
          }
        }
  
        alert('The book already exists. The progress has been updated.')
        return;
      }
    }
    this.addBooks(book)
  
    document.getElementById('title').value = ""
    document.getElementById('author').value = ""
  }
  //x = book object
  displayLibrary(x) {

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
    const self = this;
    progressP.addEventListener("click", function(e){
      let className = this.className
      let theTitle = this.parentNode.childNodes[0].innerHTML;
      let theAuthor = this.parentNode.childNodes[1].innerHTML;
      const ind = self.getIndexNum(theTitle, theAuthor)
      self.library[ind].changeProgress(this)
    })
    newDiv.append(progressP)
  
    const removeBut = document.createElement("button")
    removeBut.classList.add("remove-but")
    removeBut.textContent = '-'
    removeBut.addEventListener("click", function(e){
      let theTitle = this.parentNode.childNodes[0].innerHTML;
      let theAuthor = this.parentNode.childNodes[1].innerHTML;    
      self.removeBookFromLibrary(theTitle, theAuthor)
      this.parentNode.remove()
    })
    newDiv.append(removeBut)
  
    const bookshelf = document.getElementById("bookshelf")
    bookshelf.appendChild(newDiv)
  }
  //remove book from []
  removeBookFromLibrary(bkTitle, auTitle) {
    const index = this.getIndexNum(bkTitle, auTitle)
    this.library.splice(index, 1)
  }
  getIndexNum(book, author) {
    let bPosition = this.library.map(object => object.title).indexOf(book)
    let aPosition = this.library.map(item => item.author).indexOf(author)
  
    if (bPosition == aPosition) {
      return bPosition
    } else {
      console.log('borken')
    }
  }
}
class Book {
  constructor(title, author, progress){
    this.title = title;
    this.author = author; 
    this.progress = progress;
  }

  /**
   * @param {string} value
   */
   changeProgress(aDiv) { 
    //change progress
    const bookDiv = aDiv.className
    switch (bookDiv) {
      case "ipr":
        this.progress ='read'
        aDiv.setAttribute('class', 'read')
        aDiv.innerHTML = 'read'
        break;
      case "read":
        this.progress = 'not-read'
        aDiv.setAttribute('class', 'not-read')
        aDiv.innerHTML = 'not-read'
        break;
      case "not-read":
        this.progress = 'ipr'
        aDiv.setAttribute('class', 'ipr')
        aDiv.innerHTML = 'ipr'
        break;    
    }
  }
}

let myLibrary = new Library();

//add book button
const addBook = document.getElementById('add-book')
addBook.addEventListener("click", myLibrary.addBookToLibrary.bind(myLibrary));

const bookOne = new Book('The Art of War', 'Sun Tzu', 'read')
const bookTwo = new Book('Demons', 'Fydor Dostoevsky', 'ipr')
myLibrary.addBooks(bookOne);
myLibrary.addBooks(bookTwo);
