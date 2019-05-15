var host = "http://localhost:3000/";

function getPersonas()
{
  var collection = "personas";
  var url = host+"traer?collection="+collection;
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = actualizarTabla;
  xhr.open("GET", url, true);
  xhr.send();
}

function agregarPersona(persona)
{
  var url = host+"agregar";
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = actualizarTabla;
  xhr.open("post", url, true);
  xhr.setRequestheader('Content-Type', 'application/json');
  var requestBody = {
    "collection": "personas",
    "objeto": persona
  }
  xhr.send(JSON.stringify(requestBody));
}

function modificarPersona(persona)
{
  var url = host+"modificar";
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = actualizarTabla;
  xhr.open("post", url, true);
  xhr.setRequestheader('Content-Type', 'application/json');
  var requestBody = {
    "collection": "personas",
    "objeto": persona
  }
  xhr.send(JSON.stringify(requestBody));
}

function eliminarPersona(id)
{
  var url = host+"eliminar";
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = actualizarTabla;
  xhr.open("post", url, true);
  xhr.setRequestheader('Content-Type', 'application/json');
  var requestBody = {
    "collection": "personas",
    "id": id
  }
  xhr.send(JSON.stringify(requestBody));
}


