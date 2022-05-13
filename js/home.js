var div = document.getElementById('users')
var user = 0
var charge = 0
var count = 0
itensDB = []

if (JSON.parse(localStorage.getItem('todolist'))){
    charge += 1
}

getUsers()

function getUsers(){

    console.log(charge)
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
                    +   '<a class="col-md-12" href=list.html><button class="btn btn-success col-md-12" onclick="saveid('+send[count].userId+')">To-Do\'s Usuário '+ send[count].userId +'</button></a>'
                    +   '</div>'
                    +'</div>'
                )
            }
            if (charge == 0) {
                if (itensDB.length >= 210) {
                    alert('Limite máximo de 210 itens atingido!')
                }
                itensDB.push({'userId': send[count].userId , 'item': send[count].title, 'status': send[count].completed })
                localStorage.setItem('todolist', JSON.stringify(itensDB))
            }

            count = count+1
        }
        charge = charge+1
        console.log(charge)
    })
}

function saveid(id){
   localStorage.setItem("usuarioId", id);
}
