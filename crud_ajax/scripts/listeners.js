function notifyModificacion()
{
  if(xhr.readyState == 4)
  {
    if(xhr.status == 200)
    {
      response = xhr.responseText;
      alert(response);
      SetSpinner();
      getPersonas();
    }
  }
}

function notifyDeletion()
{
  if(xhr.readyState == 4)
  {
    if(xhr.status == 200)
    {
      response = JSON.parse(xhr.responseText);
      console.log(response);
      alert(response.message);
      SetSpinner();
      getPersonas();
    }
  }
}
