//Enviar peticion GET a http://localhost:3000/traer
//pasar parametro "collection"  con valor "personas"  
//La respuesta sera un array con las personas


function Get(collection)
{
    var url = "http://localhost:3000/traer?collection="+collection;
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = ProcesarPersonas;
    xhr.open('GET', url, true);
    xhr.send();
}

