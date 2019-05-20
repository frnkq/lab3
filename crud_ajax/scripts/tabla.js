function actualizarTabla(e)
{
  SetSpinner();
  if(xhr.readyState == 4)
  {
    if(xhr.status == 200)
    {
      personas = JSON.parse(xhr.responseText);
      SetSpinner();
      ConstruirTabla();
    }
  }
}

function SetSpinner()
{
  var spinner = document.getElementById("spinner");
  if(spinner.style.display == "block")
  {
    spinner.style.display = "none";
  }
  else
  {
    spinner.style.display = "block";
  }
}

function ConstruirTabla()
{
  var tableDiv = document.getElementById("divTabla");
  tableDiv.innerText = "";
  tableDiv.innerHtml = "";

  var table = document.createElement("table");

  var thead = CreateThead();
  var tbody = CreateTbody();

  table.appendChild(thead);
  table.appendChild(tbody);

  tableDiv.appendChild(table);
}

function CreateThead()
{
  GetFields();

  var thead = document.createElement("thead");

  var tr = document.createElement("tr");

  for(var i=0;i<fields.length;i++)
  {
    var td = document.createElement("td");
    td.innerText = PrettyHeader(fields[i]);

    tr.appendChild(td);
  }

  thead.appendChild(tr);
  return thead;
}

function PrettyHeader(text)
{
  return text.toUpperCase().trim().replace("_", " ");
}

function CreateTbody()
{
  var tbody = document.createElement("tbody");
  
  for(var i=0;i<personas.length;i++)
  {
    var tr = document.createElement("tr");

    for(var j=0;j<fields.length;j++)
    {
      var td = document.createElement("td");
      td.innerText = personas[i][fields[j]];
      if(td.innerText == "undefined")
        td.innerText = "";

      td.onclick = PopUpMenu.bind(td, personas[i]);

      tr.setAttribute("id",  "persona_"+personas[i]["id"]);
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }

  return tbody;
}

function GetFields()
{
  fields = [];
  for(var i=0;i<personas.length;i++)
  {
    var objectKeys = Object.keys(personas[i]);

    for(var j=0;j<objectKeys.length;j++)
    {
      var found = false;

      for(var h=0;h<fields.length;h++)
      {
        if(objectKeys[j]==fields[h])
          found = true;
      }

      if(!found || i==0)
      {
        fields.push(objectKeys[j]);
      }
    }
  }
}

function PopUpMenu(persona)
{
  var menuId = document.getElementById("crudMenu");
  menuId.innerText = "";
  menuId.innerHtml = "";

  var form = CrudForm(persona);
  
  var cerrarBtn = document.createElement("button");
  cerrarBtn.addEventListener("click", function()
    {
      menuId.style.display = "none";
    }
  );

  menuId.appendChild(cerrarBtn);
  menuId.appendChild(form);
  cerrarBtn.appendChild(document.createTextNode("Cerrar"));
  menuId.style.display = "block";

}

function CrudForm(persona)
{
  var form = document.createElement("form");
  var buttons = CrudButtons();

  var inputFirstName = document.createElement("input");
  inputFirstName.setAttribute("type", "text");
  inputFirstName.setAttribute("placeholder", "Nombre");
  inputFirstName.setAttribute("name", "first_name");


  var inputLastName = document.createElement("input");
  inputLastName.setAttribute("type", "text");
  inputLastName.setAttribute("placeholder", "Apellido");
  inputLastName.setAttribute("name", "last_name");


  var inputEmail = document.createElement("input");
  inputEmail.setAttribute("type", "text");
  inputEmail.setAttribute("placeholder", "email");
  inputEmail.setAttribute("name", "email");

  var inputGender = document.createElement("input");
  inputGender.setAttribute("type", "text");
  inputGender.setAttribute("placeholder", "Genero");
  inputGender.setAttribute("name", "gender");

  var nombreLabel = document.createElement("p").appendChild(document.createTextNode("Nombre: "));
  var apellidoLabel = document.createElement("p").appendChild(document.createTextNode("Apellido: "));
  var emailLabel = document.createElement("p").appendChild(document.createTextNode("Email: "));
  var genderLabel = document.createElement("p").appendChild(document.createTextNode("Genero: "));

  if(persona)
  {
    form.setAttribute("id", "formPersona_"+persona.id);
    inputFirstName.setAttribute("value", persona.first_name);
    inputLastName.setAttribute("value", persona.last_name);
    inputEmail.setAttribute("value", persona.email);
    inputGender.setAttribute("value", persona.gender);
  }

  form.appendChild(nombreLabel);
  form.appendChild(inputFirstName);

  form.appendChild(apellidoLabel);
  form.appendChild(inputLastName);

  form.appendChild(emailLabel);
  form.appendChild(inputEmail);


  form.appendChild(genderLabel);
  form.appendChild(inputGender);


  if(persona)
  {
    form.appendChild(buttons["modificar"]);
    form.appendChild(buttons["eliminar"]);
  }
  else
  {
    form.appendChild(buttons["agregar"]);
  }
  return form;
}

function CrudButtons()
{
  var modificarButton = document.createElement("input");
  modificarButton.setAttribute("type", "submit");
  modificarButton.setAttribute("value", "Modificar");

  var eliminarButton = document.createElement("input");
  eliminarButton.setAttribute("type", "submit");
  eliminarButton.setAttribute("value", "Eliminar");

  var agregarButton = document.createElement("input");
  agregarButton.setAttribute("type", "submit");
  agregarButton.setAttribute("value", "Agregar");


  modificarButton.addEventListener("click", ModificarListener);
  eliminarButton.addEventListener("click", EliminarListener);
  agregarButton.addEventListener("click", AgregarListener);

  var actionButtons = [];
  actionButtons["agregar"] = agregarButton;
  actionButtons["eliminar"] = eliminarButton;
  actionButtons["modificar"] = modificarButton;

  return actionButtons;
}

function ModificarListener(e)
{
  e.preventDefault();
  var form = e.target.parentNode;
  var id = form.getAttribute("id").split("_")[1];
  var persona = GetPersonaById(id);

  console.log(persona);

  persona.first_name = form[0].value;
  persona.last_name = form[1].value;
  persona.email = form[2].value;
  persona.gender = form[3].value;
  
  modificarPersona(persona);

  var menuId = document.getElementById("crudMenu");
  menuId.style.display = "none";

}

function EliminarListener(e)
{
  SetSpinner();
  e.preventDefault();
  var form = e.target.parentNode;
  var id = form.getAttribute("id").split("_")[1];

  eliminarPersona(id);

  var menuId = document.getElementById("crudMenu");
  menuId.style.display = "none";
}

function AgregarListener(e)
{
  SetSpinner();
  e.preventDefault();
  var form = e.target.parentNode;

  var persona = new Persona(form[0].value, form[1].value, form[2].value, form[3].value);

  agregarPersona(persona);

  var menuId = document.getElementById("crudMenu");
  menuId.style.display = "none";
}

function GetPersonaById(id)
{
  for(var i=0;i<personas.length;i++)
    if(personas[i].id == id)
      return personas[i];
  return null;
}

function Persona(nombre, apellido, email, genero)
{
  this.first_name = nombre;
  this.last_name = apellido;
  this.email = email;
  this.gender = genero;

  return this;
}
