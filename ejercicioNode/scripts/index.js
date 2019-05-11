window.addEventListener('load', function()
{
   var hxr;   
   Traer("personas");
  
});

function Traer(collection)
{
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = ProcessData;
    xhr.open('GET', "http://localhost:3000/traer?collection="+collection, true);
    xhr.send();
}

var objects;
var numberOfRows;
var maxNumberOfFields;
var indexWithMoreFields;

function ProcessData()
{
    if(xhr.readyState == 4)
    {
        document.getElementById('spinner').style.display = "none";
        if(xhr.status == 200)
        {
            objects = JSON.parse(xhr.responseText);
            if(objects.length >= 0)
            {
             
                var table = CreateTable();
                table.style.border = "1px solid black";
                document.getElementById("tabla").appendChild(table);
            }
            console.log(xhr.responsetext);
        }
    }
    else
    {
        document.getElementById('spinner').style.display = "block";
    }
       
    
}

function CreateTable()
{
    var table = document.createElement("table");
    var thead = CreateThead();
    table.appendChild(thead);
   
    var tbody = CreateTbody();
    table.appendChild(tbody);
  
    var rows;

    return table;
}

function CreateThead()
{
    var thead = document.createElement("thead");
    var row = CreateRow();
    for(var i = 0;i<Object.keys(objects[0]).length;i++)
    {
        var content = document.createTextNode(Object.keys(objects[0])[i].toUpperCase().replace("_", " "));
        var cell = CreateCell();
        cell.appendChild(content);
        row.appendChild(cell);
    }
    thead.appendChild(row);
    return thead;
}

function CreateTbody()
{
    var tbody = document.createElement("tbody");
    for(var i=0;i<objects.length;i++)
    {
        var row = CreateRow();
        var cells = CreateCells(i);
        for(var j =0;j<cells.length;j++)
        {
            row.setAttribute("id", "persona_"+cells[0].innerText)
            row.appendChild(cells[j]);
        }
        tbody.appendChild(row);
    }
    return tbody;
}

function CreateCells(index)
{
    var cells = [];
    for(var i=0;i<Object.keys(objects[0]).length;i++)
    {
        var cell = document.createElement("td");
        var content = document.createTextNode(objects[index][Object.keys(objects[index])[i]]);
        cell.appendChild(content);
        cells.push(cell);
    }
    return cells;
}

function CreateRow()
{
    return document.createElement("tr");
}

function CreateCell()
{
    return document.createElement("td");
}