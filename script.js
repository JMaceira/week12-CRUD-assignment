//// Creating URL EndPOINT ////
const URL_ENDPOINT = 'http://localhost:3000/books'

//// Getting Information from API ////
function createNewFunction () {
    $.get(URL_ENDPOINT).then(books => {
        $('tbody').empty()
        books.map(book => {
            $('tbody').append( 
                $(`
                <tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>
                <button onclick="deleteBook(${book.id})" class="btn btn-outline-danger">Delete Book</button>
                </td>
                </tr>`)
            )
        })
    }) 

}

createNewFunction()


//// using JQuery to submit the node element
$(`#submitBook`).click(function (e) {
    
 /// preventing page from refreshing when clicking submit button ////
    e.preventDefault()

    $.post(URL_ENDPOINT, {
        title: $('#newTitle').val(),
        author: $('#newAuthor').val(),
    }).then(createNewFunction)
})

/// function in order to delete each book ///
function deleteBook (id) {

    $.ajax(`${URL_ENDPOINT}/${id}`, {
        type: 'DELETE'
    }).then(createNewFunction)
}

/// function for updating book/author ///

function updateBook(e) {
    e.preventDefault()
    let id = $('#updateBook').val()
    $.ajax(`${URL_ENDPOINT}/${id}`, {
        method: 'PUT' ,
        data: {
            title: $('#updateTitle').val(),
            author: $('#updateAuthor').val() ,
        }
    }).then(createNewFunction)


}

$('#updateBookButton').click(updateBook)