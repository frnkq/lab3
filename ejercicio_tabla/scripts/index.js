var objects = data;
var numberOfRows = objects.length;
var maxNumberOfFields = GetMaxFields().maxfields;
var indexWithMoreFields = GetMaxFields().index;
window.addEventListener('load', function (){
    CreateTable();
});


/**Gets the max number of propertys for object in object array
**returns max number of fields
**/
function GetMaxFields()
{
    //just in case setting id, this is necessary for rows elements id
    InitializePrimaryKey(objects);
	var max = 0;
	var index = 0;
    for(var i = 0; i<numberOfRows;i++)
    {
		if(Object.keys(objects[i]).length > max)
		{
			max = Object.keys(objects[i]).length;
			index = i;
		}
            
    }
    return {"maxfields": max, "index": index};
}

/**Give objects primary key
**  Primary key is present in tableheaders, dataParameters and GiveRowsAnIdBasedOnCellsData
**/
function InitializePrimaryKey(objects) {
    for (var i=0;i<objects.length;i++)
    {
        if (objects[i]["id"] == null)
        {
            objects[i]["id"] = i + 1;
        }
        
    }
}

/**Appends table to div, creates the header values array and object array keys
**  if data were to change, only things to change are headerValues, dataParameters
**  if keys come in form of numeric indices, removeDataParameters and use only [j] in ConstructCells();
**/
function CreateTable()
{
	var tableDiv = document.getElementById("tabla");
	var headerValues =  PrettifyValues(Object.keys(objects[indexWithMoreFields]));
	var dataParameters = Object.keys(objects[indexWithMoreFields]);
	var table = ConstructTable(headerValues, objects.length, maxNumberOfFields, objects, dataParameters);
	tableDiv.appendChild(table);
}

function PrettifyValues(values)
{
	for(var i=0;i<values.length;i++)
	{
		values[i] = values[i].replace("_", " ");
		//next line does pascal case
		values[i] = values[i].replace(/(\w)(\w*)/g, function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();});
	}
	return values;
}

/**Creates table element, thead, rows, cells 
**  Merges all data together
**  Number of rows = objects.length
**  Number of columns = objectKeys.length
**  Number of cells = objects.length*objectKeys.length*
**  returns Element table
**/
function ConstructTable(headerValues, numberOfRows, numberOfFields, objects, objectKeys)
{
	var table = document.createElement('table');
	var header = CreateTableHeader(headerValues);
	table.appendChild(header);
	var rows = ConstructRows(numberOfRows);
	var cells = ConstructCells(rows.length, objects, objectKeys);
	AppendData(table, rows, cells, numberOfFields);
	
	return table;
}

/**Creates table header
**  Creates one thead element, one tr element, numberOfFields cells
**  Appends headerValues to columns index based
**  returns Element thead
**/
function CreateTableHeader(headerValues)
{
	var tr = document.createElement('tr');
	var headCells = [];
	for(var i in headerValues)
	{
		headCells.push(document.createElement('td'));
	}
	for(var i in headCells)
	{
		var value = document.createTextNode(headerValues[i]);
		headCells[i].appendChild(value);
		tr.appendChild(headCells[i]);
	}
	var thead = document.createElement('thead');
	thead.appendChild(tr);
	return thead;
}

/**Creates rows 
**  Creates array of Element('tr')
**returns tr element array
**/
function ConstructRows(numberOfRows)
{
	var rows = [];
	for(var i = 0; i<numberOfRows;i++)
	{
	  rows.push(document.createElement('tr'));   
	}
	return rows;
}

/**Creates cells 
**  Creates array of Element('td')
**  Set classes for cell:
**      prefix_+cell
**      objectKey
**returns td element array
**/
function ConstructCells(numberOfRows, objects, objectKeys)
{
    var prefix = "person_";
	var cells = [];
	for(var i=0;i<numberOfRows;i++)
	{
		for(var j=0;j<objectKeys.length;j++)
		{
			var cell = document.createElement('td');

			var classes = prefix + "cell ";
			classes += prefix+objectKeys[j].replace("_","");
			cell.setAttribute("class", classes);

			var cellvalue = document.createTextNode(objects[i][objectKeys[j]]);
			if (typeof objects[i][objectKeys[j]] == "undefined")
			    cellvalue = document.createTextNode("");

			cell.appendChild(cellvalue);
			var eventListener = ShowPerson.bind({"cell":cell, "object":objects[i]})
			cell.addEventListener('click', eventListener);
			cells.push(cell);
		}
	}
	return cells;
}

/**Appends cells to rows, rows to tbody, tbody to table
**/
function AppendData(table, rows, cells, numberOfFields)
{
   var tbody = document.createElement('tbody');
   AppendCellsToRows(rows, cells, numberOfFields);
   AppendRowsToTable(table, tbody, rows);
   GiveRowsAnIdBasedOnCellsData(rows);
}


/**Assigns id to rows based on property "id" of objects
**  Assuming all objects have a property "id", if function InitializePrimaryKey() was called, no need to worry
**/
function GiveRowsAnIdBasedOnCellsData(rows)
{
    var id = "-1";
    var prefix = "person_";
	for(var i=0;i<rows.length;i++)
	{
		var tds = rows[i].getElementsByTagName('td');
			
		for(var j = 0;j<tds.length;j++)
		{
			//selecting column "id"
			if(tds[j].className.match(/_id$/))
			{
                //getting value of column "id"
				id=tds[j].firstChild.textContent;
			}
		}
		rows[i].setAttribute("id", id);
		rows[i].setAttribute("class", prefix+"row");
	}
}


/**Appends cells to rows
**/
function AppendCellsToRows(rows, cells, numberOfFields)
{
	for(var i=0;i<rows.length;i++)
	{
		for(var j=i*numberOfFields;j<rows.length*numberOfFields;j++)
		{
			rows[i].appendChild(cells[j]);
		}
	}
}

/**Appends rows to tbody, tbody to table
**/
function AppendRowsToTable(table, tbody, rows)
{
	for(var i=0;i<rows.length;i++)
	{
		tbody.appendChild(rows[i]);
	}
	table.appendChild(tbody);
}


function ShowPerson()
{
    var cell = this["cell"];
    var object = this["object"];
	
	var showPersondiv = document.getElementById("showPerson");
    showPersondiv.style.display = "block";
	
	var person = document.getElementById("person");
	person.style.display = "block";
	
	var allText;
	function readTextFile(file, str)
	{
		var rawFile = new XMLHttpRequest();
		rawFile.open("GET", file, false);
		rawFile.onreadystatechange = function ()
		{
			if(rawFile.readyState === 4)
			{
				if(rawFile.status === 200 || rawFile.status == 0)
				{
					 allText = rawFile.responseText;
				}
			}
		}
		rawFile.send(null)
	}

	readTextFile("person.html", allText);
	allText = allText.replace("{{personId}}", object["id"]);
	allText = allText.replace("{{personName}}", object["first_name"]);
	allText = allText.replace("{{personSurname}}", object["last_name"]);
	
	//two ocurrencies on person.html, to lazy to do something different about this
	allText = allText.replace("{{personName}}", object["first_name"]);
	allText = allText.replace("{{personSurname}}", object["last_name"]);

	allText = allText.replace("{{personEmail}}", object["email"]);
	allText = allText.replace("{{personIp}}", object["ip_address"]);
	person.innerHTML = allText;
	
}
