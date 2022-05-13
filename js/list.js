const texto = document.querySelector('input')
const btnNew = document.querySelector('.divNew button')
const btnDeleteAll = document.querySelector('.header button')
const ul = document.querySelector('ul')
const usuarioId = localStorage.getItem("usuarioId")

var itensDB = []


// Este Delete All deleta TUDO, de todos os usuários

// btnDeleteAll.onclick = () => {
//   itensDB = []
//   updateDB()
// }


// Já este, deleta apenas as entradas que possuirem o userId referido

btnDeleteAll.onclick = () => {
  var items = JSON.parse(localStorage.getItem('todolist'));
  var filtered = items.filter(item => item.userId != usuarioId)
  localStorage.setItem('todolist', JSON.stringify(filtered));
  loadItens()
}

texto.addEventListener('keypress', e => {
  if (e.key == 'Enter' && texto.value != '') {
    setItemDB()
  }
})

btnNew.onclick = () => {
  if (texto.value != '') {
    setItemDB()
  }
}

function setItemDB() {
  if (itensDB.length >= 210) {
    alert('Limite máximo de 210 itens atingido!')
    return
  }

  itensDB.push({ 'item': texto.value, 'status': '' , 'userId': usuarioId })
  updateDB()
}

function updateDB() {
  localStorage.setItem('todolist', JSON.stringify(itensDB))
  loadItens()
}

function loadItens() {
  ul.innerHTML = "";
  itensDB = JSON.parse(localStorage.getItem('todolist')) ?? []
  itensDB.forEach((item, i) => {
    if(item.userId == usuarioId){
      insertItemTela(item.item, item.status, i)
    }
  })
}

function insertItemTela(text, status, i) {
  const li = document.createElement('li')

  if (status==true){
    var checked = 'checked'
  }else{
    var checked = ''
  }

  li.innerHTML = `
    <div class="divLi">
      <input type="checkbox" ${status} ` + checked +` data-i=${i} onchange="done(this, ${i});" />
      <span data-si=${i}>${text}</span>
      <button onclick="removeItem(${i})" data-i=${i}><i class='bx bx-trash'></i></button>
    </div>
    `
  ul.appendChild(li)

  if (status) {
    document.querySelector(`[data-si="${i}"]`).classList.add('line-through')
  } else {
    document.querySelector(`[data-si="${i}"]`).classList.remove('line-through')
  }

  texto.value = ''
}

function done(chk, i) {

  if (chk.checked) {
    itensDB[i].status = 'checked' 
  } else {
    itensDB[i].status = '' 
  }

  updateDB()
}

function removeItem(i) {
  itensDB.splice(i, 1)
  updateDB()
}

loadItens()