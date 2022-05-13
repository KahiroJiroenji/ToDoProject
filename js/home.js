var count=0;
var div = document.getElementById('users')
var user = 0

getUsers()

function getUsers(){
    fetch('https://jsonplaceholder.typicode.com/todos').then((retorno)=>{

        return retorno.json();

    }).then((send)=>{
        for(let index=0; index < send.length ; index++){
            if(send[count].userId != user){
                user = send[count].userId
                div.insertAdjacentHTML("beforeend", ''
                    +'<div class="card col-4 m-1 mx-auto">'
                    +   '<div class="card-body usuario text-center ">'
                    +   '<b>Usuário ' + send[count].userId +'</b>'
                    +   '<br><hr>'
                    +   '<a class="col-md-12" href=list.html><button class="btn btn-success col-md-12">To-Do\'s Usuário '+ send[count].userId +'</button></a>'
                    +   '</div>'
                    +'</div>'
                )
            }
            count = count+1
        }
    })
    


}