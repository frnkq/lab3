var host = "http://localhost:3000/";

function getPersonas()
{
  var url = host+"traer?collection=personas";
  xhr = new XMLHttpRequest();
  xhr.open("get", url, true);
  xhr.onreadystatechange = actualizarTabla;
  xhr.send();
}

function modificarPersona(persona)
{
  var url = host+"modificar";
  xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = notifyModificacion;

  var requestBody = {
    collection: "personas",
    objeto: persona
  };

  xhr.send(JSON.stringify(requestBody));
}

function eliminarPersona(id)
{
  var url = host+"eliminar";
  xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = notifyDeletion;

  var requestBody = {
    collection: "personas",
    id: id
  };

  xhr.send(JSON.stringify(requestBody));
}

function agregarPersona(persona)
{
  var url = host+"agregar";
  xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = notifyDeletion;

  var requestBody = {
    collection: "personas",
    objeto: persona
  };

  xhr.send(JSON.stringify(requestBody));
}
