// an array of Book objects
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; // true or false
}

Book.prototype.info = function () {
    return (
        `${this.title} by ${this.author}, ${this.pages} pages, ` +
        (this.read ? "read" : "not read yet")
    );
};

Book.prototype.titleEquals = function (other) {
    return this.title === other.title;
};

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

function addBookToLibrary(book) {
    myLibrary.push(book);
}

// ----- Start of dummy data -----
const book1 = new Book("The Silent Patient", "Alex Michaelides", 336, true);
myLibrary.push(book1);
// ----- End of dummy data -----

// ----- Display books -----
function createNewCardForBook(book) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("card");
    const title = book.title;
    const author = book.author;
    const pages = book.pages;
    const read = book.read;

    const titleElem = document.createElement("h3");
    const authorElem = document.createElement("h4");
    const pagesElem = document.createElement("p");
    const readElem = document.createElement("p");
    const readElemSpan = document.createElement("span");
    const readElemToggleBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    titleElem.classList.add("title");
    authorElem.classList.add("author");
    readElem.classList.add("read");
    readElemToggleBtn.classList.add("toggle-read-btn");
    removeBtn.classList.add("remove");

    titleElem.textContent = title;
    authorElem.textContent = author;
    pagesElem.innerHTML = `<span class="pages">${pages}</span> pages`;
    readElemSpan.textContent = read ? "Read" : "Not read";
    readElemToggleBtn.textContent = "Toggle";
    removeBtn.textContent = "Remove";

    readElem.appendChild(readElemSpan);
    readElem.appendChild(readElemToggleBtn);

    readElemToggleBtn.addEventListener("click", (e) => {
        let bookCard = e.target.parentElement.parentElement;
        let title = bookCard.querySelector(".title").textContent;

        let book = new Book(title, null, null, null);
        let index = myLibrary.findIndex((b) => b.titleEquals(book));
        myLibrary[index].toggleRead();

        displayBooks();
    });

    removeBtn.addEventListener("click", (e) => {
        let bookCard = e.target.parentElement;
        let title = bookCard.querySelector(".title").textContent;

        let book = new Book(title, null, null, null);
        let index = myLibrary.findIndex((b) => b.titleEquals(book));
        myLibrary.splice(index, 1);

        displayBooks();
    });

    bookCard.appendChild(titleElem);
    bookCard.appendChild(authorElem);
    bookCard.appendChild(pagesElem);
    bookCard.appendChild(readElem);
    bookCard.appendChild(removeBtn);

    return bookCard;
}

function displayBooks() {
    const bookShelfElem = document.getElementById("bookshelf");
    bookShelfElem.innerHTML = "";

    for (let book of myLibrary) {
        const bookCard = createNewCardForBook(book);
        bookShelfElem.appendChild(bookCard);
    }
}

displayBooks();

// ----- Add book feature -----
function clearFormAndFocusTitle() {
    const form = document.getElementById("addbook-form");
    form.querySelectorAll("input").forEach((input) => {
        input.value = input.type === "submit" ? input.value : "";
    });
    form.querySelector("form input#read").checked = false;
    form.querySelector("form input#title").focus();
}

const addBookBtn = document.getElementById("addbook-btn");
addBookBtn.addEventListener("click", () => {
    const form = document.getElementById("addbook-form");
    form.classList.toggle("hidden");
    if (!form.classList.contains("hidden")) {
        clearFormAndFocusTitle();
    }
});

const form = document.getElementById("addbook-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = e.target.querySelector("input#title").value;
    const author = e.target.querySelector("input#author").value;
    const pages = e.target.querySelector("input#pages").value;
    const read = e.target.querySelector("input#read").checked;

    clearFormAndFocusTitle();

    const book = new Book(title, author, pages, read);
    addBookToLibrary(book);

    displayBooks();
});
