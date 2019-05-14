function CrearTabla(divName)
{
    var table = document.createElement("table");
    var tableDiv = document.getElementById(divName);
    
    var thead = CreateThead();
    table.appendChild(thead);

    var tbody = CreateTbody();
    table.appendChild(tbody);

    tableDiv.appendChild(table);

}

function CreateThead()
{
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    for(var i=0;i<fields.length;i++)
    {
        var td = document.createElement("td");
        td.innerText = PrettyHeaders(fields[i]);
        tr.appendChild(td);
    }
    thead.appendChild(tr);
    return thead;
}

function PrettyHeaders(text)
{
    text = text.replace("_", " ");
    text = text.replace("-", " ");
    text = text.trim();
    return text;
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
            
            td.onclick = TdClick;
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    return tbody;
}

function TdClick()
{
    var tr = this.parentElement;
    var id = tr.firstChild.innerText;
    var index = id-1;
    console.log(personas[index]);
}