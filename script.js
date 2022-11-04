function addTodo(e) {
    e.preventDefault();
    let A =  $('#todo').val();
    let B = $('#desc').val();
    
    // const exclude = ['sex', 'guns', 'fuck'];
    
    // if (exclude.includes(myTodo)) {
    //     strLength = myTodo.length;
    //     let sensored = '';

    //     for (let i = 0; i < strLength - 2; i++) {
    //         sensored += "*";
    //     }

    //     myTodo = myTodo.slice(0,2) + sensored;
    // }
    const el = getTodoElement(A,B);

    $('#todoList').append(el);

    // document.getElementsByClassName('todo-counter')[0].innerHTML = todoCounter; // equivalent of line 23
    // $('#todo, #desc').val('');
    // document.getElementById('todo').value = ''; // eq of line 25
    // document.getElementById('desc').value = ''; // eq of line 25
    $('#formTodo')[0].reset();
    $('.no-todo-found').remove();
    handleCounter();
    toastr['success']("Sucess");
};


const getTodoElement = (C,D) => {
    return `<li class="todo-item">
                <h3>
                    ${C}
                </h3>
                <p>
                    ${D}
                </p>
                <button class="btn-delete-todo">delete</button>
                <button class="btn-done-todo">done</button>
            </li>`;
};

const countTodo = () => {
    const count = $('#todoList li:not(.no-todo-found)').length;
    return count;
};
const countPending = () => {
    const count = $('#todoList li').not('.no-todo-found,.todo-done').length;
    return count;
};

const renderNoTodoFound = () => {
    return `<li class="no-todo-found">
                <p>
                    No todo
                </p>
            </li>`;
};

const countDone = () => {
    return  $('.todo-done').length;
};

const handleCounter = () => {
    const count = countTodo();
    let doneCounter = countDone();
    let pendingCount = countPending();

    $('.done-counter').html(doneCounter);
    $('.pending-counter').html(pendingCount);
    $('.todo-counter').html(count);
}
 
// function countDone(){
//     return document.getElementsByClassName('todo-done').length;
// } 
function myToastr() {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear", 
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };
};

$(document).ready(() => {
    myToastr();

    // $(document).on( 'click', '#btn_add', () => addTodo() );
    
    $(document).on('submit', '#formTodo', (e) => addTodo(e) );

    $(document).on('click', '.btn-delete-todo', function(){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                $(this).closest('li').remove();
                const count = countTodo();
            
                if (count === 0) {
                    $('#todoList').append(renderNoTodoFound());
                }
            
                handleCounter();
                toastr['success']("Deleted");
            }
        })
    });

    $(document).on('click', '.btn-done-todo', function(){
        $(this).closest('li').addClass('todo-done');
        handleCounter();
    });

});