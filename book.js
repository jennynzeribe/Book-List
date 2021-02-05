//Book constructor
// the book constructor is used to handle the creation of the actual book
function Book(title, author, isbn){
         this.title = title;
         this.author = author;
         this.isbn = isbn;
}
//UI constructor
//the ui is used for adding the book and deleting more of prototype method
function UI(){}
//add book to the list
UI.prototype.addBookToList = function(book){
   const list = document.getElementById('book-list');
   //create tr element
   const row = document.createElement('tr');
   //insert cols
   row.innerHTML =
   `
   <td>${book.title}</td>
   <td>${book.author}</td>
   <td>${book.isbn}</td>
   <td><a href = "#" class= "delete">X</a></td> 
   `
   list.appendChild(row);
}
// Show Alert
UI.prototype.showAlert = function(message, className) {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#book-form');
    // Insert alert
    container.insertBefore(div, form);
  
    // Timeout after 3 sec
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000);
  }
  
//clear fields
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
  //
  UI.prototype.deleteBook= function(target) {
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }

//eventlistener for adding books
// the event listens to the submit button and returns the declared words

document.getElementById('book-form').addEventListener('submit', function(e){
//to make the items responsive, so that when you click on the submit button it reflect on the console
//.value returns  the words in the input box
const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value
   //instantiate book
    const book = new Book(title, author, isbn);
    // instantiate UI
    const ui = new UI();
   
   // Validate
  if(title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Show success
    ui.showAlert('Book Added!', 'success');
  
    // Clear fields
    ui.clearFields();
  }
    e.preventDefault();
});

//event for delete books
document.getElementById('book-list').addEventListener('click', function(e){
  //instatiate the UI
  const ui = new UI();
  //Delete the book
  ui.deleteBook(e.target);
  //show message
  ui.showAlert('Book removed!', 'success');

  e.preventDefault();
});
