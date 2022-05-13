var count=0;
var div = document.getElementById('users')

getUsers()

function getUsers(){
    fetch('https://jsonplaceholder.typicode.com/todos').then((retorno)=>{

        return retorno.json();

    }).then((send)=>{
        for(let index=0; index < 1; index++){

            div.insertAdjacentHTML("beforeend", ''
                +'<div class="card col-4 m-1 mx-auto">'
                + send[count].userId 
                +   '<div class="card-body">'
                +   '</div>'
                +'</div>'
            )
            count = count+1
        }
    })
    


}