function CrearTabla(objects)
{
  var table = document.createElement("table");
  var tableDiv = document.getElementById("divTabla");

  var fields = GetFields(objects);

  var thead = CreateHeader(fields);
  
  var tbody = CreateBody(objects, fields);

  table.appendChild(thead);
  tableDiv.appendChild(table);
  return table;
}

function CreateBody(objects, fields)
{

}

function CreateHeader(fields)
{
  var thead = document.createElement("thead");
  var tr = document.createElement("tr");

  for(var i=0;i<fields.length;i++)
  {
    var td = document.createElement("td");
    td.innerText = fields[i];
    tr.appendChild(td);
  }

  thead.appendChild(tr);
  return thead;
}

function GetFields(objects)
{
  var fields = [];
  for(var i=0;i<objects.length;i++)
  {
    var objectKeys = Object.keys(objects[i]);

    for(var j = 0;j<objectKeys.length;j++)
    {
      var found = false;
      for(var h=0;h<fields.length;h++)
      {
        if(fields[h] == objectKeys[j])
        {
          found = true;
        }
      }

      if(i == 0 || !found)
      {
        fields.push(objectKeys[j]);
      }
      else
      {
        continue;
      }
    }
  }
  return fields;
}
