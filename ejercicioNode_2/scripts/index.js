
window.onload = Run();

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
            GetFields();
            CrearTabla("tabla");
        }
    }
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

