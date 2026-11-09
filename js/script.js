
//book constructor

function myBook(title,author,pages, read=false){
    this.title = title;
    this.author = author;
    this.pages = pages;
    const id = crypto.randomUUID();
    

    //methods

    this.read = read;
    this.info = function(){
       return `${this.title}, by ${this.author},  ${this.pages} pages.`;
    }
}


myBook.prototype.toggleRead = function(){
    this.read = !this.read;

};
//add to LIbrary function



function addBookToLibrary(title,author,pages,read){

    const newBook = new myBook(title,author,pages,read);

    myLibrary.push(newBook); //Push ID and Object together.
    
    console.log(`${newBook.info()} added to the library`);
}


//Library Array instance

const myLibrary = [];



//new book creation. 


addBookToLibrary('The Hobbit', 'J.R. TOLKIEN', '360');
addBookToLibrary('The bbit', 'J.R. TOLIEN', '360');


//Render to the HTML

function displayBooks(){
    const container = document.querySelector('.card-container');

    container.innerHTML = '';
    myLibrary.forEach((book) => {
        const card = document.createElement('article');
        card.classList.add('card');

        const title = document.createElement('h3');
        title.textContent = book.title;

        const info = document.createElement('p');
        info.textContent = book.info();



        const btnContainer = document.createElement('div');
        btnContainer.classList.add('btn-container');

        const dlt = document.createElement('button');
        dlt.classList.add('delete-button');
        dlt.textContent = 'Delete';
        dlt.addEventListener('click', () => {
            card.remove();
        });

        const toggleRead = document.createElement('button');
        toggleRead.classList.add('toggle-read')


        if (book.read) {
        toggleRead.textContent = 'Mark as unread';
        } else {
        toggleRead.textContent = 'Mark as read';
        
    
    }
        toggleRead.addEventListener('click', ()=>{
        book.toggleRead();    
        if (book.read) {
            toggleRead.textContent = 'Mark as unread';
            } else {
            toggleRead.textContent = 'Mark as read';
            }
        });

        btnContainer.append(dlt, toggleRead);

        card.append(title , info, btnContainer);
        
        container.appendChild(card);


    })
}


const btn = document.querySelector('#new');
const dialog = document.querySelector('#book-dialog');
const form = document.querySelector('#book-form');
const cancelBtn = document.querySelector('#cancel');





btn.addEventListener('click', () =>{
    dialog.showModal();
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);

    addBookToLibrary(
        data.get('title'),
        data.get('author'),
        Number(data.get('pages')),
        data.get('read') === 'on'
    );

    displayBooks();
    form.reset();
    dialog.close();


});




console.log(myLibrary);
console.log(myLibrary[1]);


displayBooks();






