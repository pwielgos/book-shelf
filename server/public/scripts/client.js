$(function() {
    $("#myTable").tablesorter({ sortList: [[0,0], [1,0]] });
  });

  $(document).ready(function(){
    $("#myTable").tablesorter({ sortList: [[0,0], [1,0]] });
    handleClickListeners();
    getBooks();
})

function handleClickListeners() {
    // $('#submitBtn').on('click', handleSubmit);
    $('#bookshelf').on('click', '.readBtn', markRead)
    //$('#taskList').on('click', '.deleteBtn', deleteTask)
}

function getBooks() {
    $.ajax({
      type: 'GET',
      url: '/books'
      }).then(function(response) {
        console.log(response);
        renderBooks(response);
      }).catch(function(error){
        console.log('error in GET', error);
      })
}

function markRead(){
    let book = $(this).closest('tr').data('book');
    console.log('markRead book', book);
    let id = book.id;
    console.log('markRead id', id);
    let status = 'Read';
    $.ajax({
      type: 'PUT',
      url: `/books/${id}`, //params
      data: {status: status} //req.body
      }).then(function(response){
        console.log('markRead', response);
        getBooks();
      })
}

function renderBooks(books) {
    $('#bookshelf').empty();
    for(let i=0; i<books.length; i++){
      let row = $('<tr></tr>');
      row.append(`<td>${books[i].title}</td>`);
      row.append(`<td>${books[i].author}</td>`);
      row.append(`<td>${books[i].read}</td>`);
      row.append(`<td>${books[i].owned}</td>`);
      row.append(`<button class="deleteBtn">DELETE</button>`);
      row.data('book', books[i]);
      if(books[i].read === 'To Read' || books[i].read === 'Reading'){
        row.append(`<button class="readBtn">Read</button>`);
      }
      $('#bookshelf').append(row);
    }
}