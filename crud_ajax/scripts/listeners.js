function actualizarTabla()
{
  var spinner = document.getElementById("spinner");
  spinner.style.display = "block";
  if(xhr.readyState == 4)
  {
    if(xhr.status == 200)
    {
      spinner.style.display = "none";
      personas = JSON.parse(xhr.responseText); 
      console.log(personas);
      var tablaDiv = document.getElementById("divTabla");
      tablaDiv.innerHtml = "";

      var tabla = CrearTabla(personas);
      tablaDiv.appendChild(tabla);
    }
  }
}
