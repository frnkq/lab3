
window.onload = Run;

var xhr;
var personas = [];
var fields = [];

function Run()
{   
    Get("personas");
}

function ProcesarPersonas()
{
    document.getElementById("spinner").style.display = "block";
    if(xhr.readyState == 4 )
    {
        if(xhr.status == 200)
        {
            personas = JSON.parse(xhr.responseText);
            document.getElementById("spinner").style.display="none";
            document.getElementById("search").appendChild(CreateSearch());
            GetFields();
            CrearTabla("tabla");
        }
    }
}

function CreateSearch()
{
  var searchDiv = document.createElement("div");
  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "ID");

  var button = document.createElement("button");
  button.setAttribute("type", "button");
  button.appendChild(document.createTextNode("Buscar"));

  button.onclick = SearchPersona.bind(button);

  searchDiv.appendChild(input);
  searchDiv.appendChild(button);

  return searchDiv;
}


function SearchPersona()
{
  var id = this.parentNode.childNodes;
  for(var i=0;i<id.length;i++)
  {
    if(id[i].nodeName=="INPUT")
    {
      id = id[i];
    }
  }
  console.log(id);
}

function GetFields()
{
    for(var i =0;i<personas.length;i++)
    {
        var objectKeys = Object.keys(personas[i]);
        for(var j=0;j<objectKeys.length;j++)
        {
            var found = false;
            for(var h =0;h<fields.length;h++)
            {
                if(fields[h] == objectKeys[j])
                {
                    found = true;
                    break;
                }
            }
            if(i == 0 || !found)
                fields.push(objectKeys[j]);
            else
                continue;
        }
    }
}

