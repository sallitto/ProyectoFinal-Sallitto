let datosJson = []
const dataJson = async ()=>{
  const response = await fetch('../data/bookData.json');
  const data = await response.json();
  datosJson = data
  localStorage.setItem("book", JSON.stringify(datosJson));
}
dataJson()
var form = `<div>
  <div class="form-group">
    <label for="name">Nombre</label>
    <input type="text" class="form-control" id="name" placeholder="Introduce nombre del libro">
  </div>
  <div class="form-group mt-3">
    <label for="author">Autor</label>
    <input type="text" class="form-control" id="author" placeholder="Introduce autor del libro">
  </div>
  <div class="form-group mt-3">
  <label for="gender">Genero</label>
    <input type="text" class="form-control" id="gender" placeholder="Introduce genero del libro">
</div>
  <button type="submit" class="btn btn-primary mt-3" onclick="save()">Guardar</button>
</div>`;
function table() {
    let table = `<table class="table">
  <thead>
    <tr>
      <th clsaa="col-1">NO</th>
      <th clsaa="col-3">Nombre</th>
      <th clsaa="col-4">Autor</th>
      <th clsaa="col-4">Genero</th>
      <th clsaa="col-2">Editar</th>
      <th clsaa="col-2">Eliminar</th>
    </tr>
  </thead>
  <tbody id="tbody">`;
    for (let i = 0; i < book.length; i++){
        table = table + `<tr>
      <td>${i + 1}</td>
      <td>${book[i].name}</td>
      <td>${book[i].author}</td>
      <td>${book[i].gender}</td>
      <td><button type="button" class="btn btn-warning" onclick="edit(${i})">Editar</button></td>
      <td><button type="button" class="btn btn-danger" onclick="deleteData(${i})">Eliminar</button></td>
    </tr> `;
    };
    table = table+`</tbody>
    </table>
  `;
    document.getElementById("table").innerHTML = table;
};
document.getElementById("form").innerHTML = form;
book = [];
const cargando = document.getElementById('cargando');
cargando.hidden = false;
setTimeout(() => {
cargando.hidden = true;
  getData();
  table();
}, 2000);
function getData(){
    let Data = localStorage.getItem("book");
    if (Data) {
        book = JSON.parse(Data);
    } else {
        setData();
    };
};
function setData() {
  localStorage.setItem("book", JSON.stringify(book));
};
function save() {
    let name = document.getElementById("name");
    let author = document.getElementById("author");
    let gender = document.getElementById("gender");
    if (name.value === "" ) {
      Toastify({
        text: "Campo Nombre Vacío",
        className: "info",
        close: true,
        style: {
          background: "red",
        }
      }).showToast();
        return
    }
    if (author.value == "") {
      Toastify({
        text: "Campo Autor Vacío",
        className: "info",
        close: true,
        style: {
          background: "red",
        }
      }).showToast();
      return
    }
    if (gender.value == "") {
      Toastify({
        text: "Campo Genero Vacío",
        className: "info",
        close: true,
        style: {
          background: "red",
        }
      }).showToast();
      return
    }

    let data = {
        name: name.value,
        author: author.value,
        gender: gender.value
    };
    
      
    book.push(data);
      setData();
      table();
      Swal.fire({
        icon: 'success',
        title: 'Almacenado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
      name.value = "";
      author.value = "";
      gender.value = "";

      
};
function deleteData(index) {
  Swal.fire({
    title: 'Esta seguro que desea eliminar?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Eliminalo!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Eliminado!',
      )
      book.splice(index, 1);
      setData();
      table();
    }
  })
};
function edit(index) {
    let editForm = `<div>
  <div class="form-group">
    <label for="name">Editar nombre del libro</label>
    <input type="text" value="${book[index].name}" class="form-control" id="newName" aria-describedby="emailHelp" placeholder="Editar nombre del libro">
  </div>
  <div class="form-group mt-3">
    <label for="email">Editar nombre de autor</label>
    <input type="email" value="${book[index].author}" class="form-control" id="newAuthor" placeholder="Editar nombre de autor">
  </div>
  <div class="form-group mt-3">
  <label for="email">Editar genero del libro</label>
  <input type="email" value="${book[index].gender}" class="form-control" id="newGender" placeholder="Editar genero del libro">
</div>
  <button type="submit" class="btn btn-primary mt-3" onclick="update(${index})">Actualizar</button>
</div>`;
    document.getElementById("form").innerHTML = editForm;
};
function update(index) {
    let newName = document.getElementById('newName');
    let newAuthor = document.getElementById('newAuthor');
    let newGender = document.getElementById('newGender');

    book[index] = {
        name: newName.value,
        author: newAuthor.value,
        gender: newGender.value,
    };

    
      Swal.fire({
        icon: 'success',
        title: 'Editado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
      setData();
      table();
      document.getElementById("form").innerHTML = form;
}
