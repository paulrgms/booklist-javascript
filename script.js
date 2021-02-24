//Get the UI elements
let form=document.querySelector('#book-form');
let booklist=document.querySelector('#book-list');

//Book Class
class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;

    }
}

//UI Class
class UI{
    constructor(){

    }
    addToBookList(book){
        let list=document.querySelector('#book-list');
        let row=document.createElement('tr');
        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class="delete">x</a></td>`
        //console.log(row);
        list.appendChild(row);
        
    }

    clearFields(){
    document.querySelector("#title").value="";
    document.querySelector("#author").value="";
    document.querySelector("#isbn").value="";

    }

    showAlert(message,className){
        let div=document.createElement('div');

        div.className=`alert ${className}`;
        div.appendChild(document.createTextNode(message));

        let container=document.querySelector('.container');
        let form=document.querySelector('#book-form');
        container.insertBefore(div,form);

        setTimeout(function () {
            document.querySelector('.alert').remove();
        },3000);

    }

    deleteFromBook(target){
        let ui=new UI();
        if(target.hasAttribute('href')){
            target.parentElement.parentElement.remove();
            Store.remove(target.parentElement.previousElementSibling.textContent.trim());
            ui.showAlert("Book Removed","success");
        }
    }
}

//Local Storage Class
class Store{
    
    static getBooks(){
        
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }
        else{
            books=JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
        let books=Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }



    static displayBooks(){
        let books=Store.getBooks();
        let ui=new UI();

        books.forEach(book => {
            ui.addToBookList(book);
            
        });
    }

    static removeBook(isbn){
        let books=Store.getBooks();
        books.forEach((book,index)=>{
            if(book.isbn===isbn){
                books.splice(index,1);
            }

        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}

//Eventlistener
form.addEventListener('submit',newBook);
booklist.addEventListener('click',removeBook);
document.addEventListener('DOMContentLoaded',Store.displayBooks());


//Define Functions
function newBook(e){
    let title=document.querySelector("#title").value,
    author=document.querySelector("#author").value,
    isbn=document.querySelector("#isbn").value;
    let ui=new UI();

    if(title===''||author===''||isbn===''){

        ui.showAlert("Please fill all the fields","error");
    }
    else {

        let book = new Book(title,author,isbn);

        let ui= new UI();
 
        ui.addToBookList(book);

        ui.clearFields();

        ui.showAlert("Book Added","success");

        Store.addBook(book);
    }

    
    

    e.preventDefault();
}

function removeBook(e){
    let ui=new UI();
    ui.deleteFromBook(e.target);
    ui.showAlert("Book Removed","success");
    e.preventDefault();
    
}