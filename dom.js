//DATOS

var results = $.ajax({
  url: 'https://backendappapi.us-south.cf.appdomain.cloud/listaempleadosgts',
  type: 'GET',
  async: false,
  dataType: 'json',
}).responseJSON; console.log("result :", results);

var dbturnos = $.ajax({
  url: 'https://backendappapi.us-south.cf.appdomain.cloud/turnos',
  type: 'GET',
  async: false,
  dataType: 'json',
}).responseJSON; console.log("turnos td inicial:", dbturnos);
//name empleado + insersion tabla for

var dbjoin = $.ajax({
  url: 'https://backendappapi.us-south.cf.appdomain.cloud/turnosbyempleado',
  type: 'GET',
  async: false,
  dataType: 'json',
}).responseJSON; console.log("turnos td inicial:", dbjoin);

function showInfo(e, row) {
  $('#mtitle').html('<b>Detalles empleado: <i>' + row.getData().T_NOM_EMPL + '</i></b>');

  var keys = Object.keys(row.getData());
  var values = Object.values(row.getData());

  var text = "";
  for (var i = 0; i < keys.length; i++) {
    if (keys[i] == "_children" || keys[i] == "id") {
      continue;
    }

    text += '<tr><th>' + keys[i] + ':</th>' +
      '<td>' + values[i] + '</td></tr>';
  }

  $('#mbody').html('<div class="table-responsive table-bordered"><table class="table table-striped"><tbody>' + text + '</tbody></table></div>');
  $('#masInformacion').modal('show');
}

// funcion cuando se desplega tabla turnos 
const setTimes = (e, cell) => {

  let objData = cell.getData();
  console.log("click :",objData)
  let nameprob = objData.T_NOM_EMPL; console.log(nameprob);

  //Modal
  const modalCDataTimes = () => {
    $('#masInformacion').modal('hide');
    $('#ttitle').html('<b>Configuración turno empleado: <i>' + objData.T_NOM_EMPL + '</i></b>');
    //$('#tfooter').html('<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>'
    //   +'<input type="submit"  class="btn btn-primary" value="Submit" id="submit"');    

    $('#turnos').modal('show');
  };
  // evento click en enviar data
  const evClick = () => {
    let getDate = document.getElementById("submit");

    getDate.addEventListener('click', (evt) => {
      evt.preventDefault();
      console.log("dentro de evento click")

      let takeDateStart = document.getElementById("finicio").value;
      let takeDateEnd = document.getElementById("ffin").value;
      let takeTimeStart = document.getElementById("hinicio").value;
      let takeTimeEnd = document.getElementById("hfin").value;

      let info_form = {
        "T_NOM_EMPL": nameprob,
        "T_INICIO": takeDateStart,
        "T_FIN": takeDateEnd,
        "H_INICIO": takeTimeStart,
        "H_FIN": takeTimeEnd
      };
      console.log(info_form.T_INICIO)


      $.ajax({
        type: "POST",
        url: 'https://backendappapi.us-south.cf.appdomain.cloud/save',
        data: info_form,
        // dataType: dataType,
        success: function (response) {
          alert(response);
        }
      });

      console.log(takeDateStart, takeDateEnd, takeTimeStart, takeTimeEnd)





      var t = $.ajax({
        url: 'https://backendappapi.us-south.cf.appdomain.cloud/turnos',
        type: 'GET',
        async: false,
        dataType: 'json',
      }).responseJSON; 
      
      console.log("turnos:", t);

    });

  }
  evClick();
  modalCDataTimes();
}















//Crea la tabla
// crea icono de edicion  en turno
let printIcon = function (cell, formatterParams) {
  return "<span style='color:red'>Ingresa turno  &nbsp; <i class='fa fa-edit'></i></span>"
};

var table = new Tabulator("#example-table", {
  height: "250px",
  layout: "fitColumns",
  responsiveLayout: "hide",
  data: results,
  dataTree: true,
  dataTreeStartExpanded: true,

  groupBy: "T_TOR_EMPL",
  groupStartOpen: false,

  columns: [
    { title: "Nombre", field: "T_NOM_EMPL", responsive: 0, cellClick: function (e, cell) { showInfo(e, cell) } }, //never hide this column
    { title: "Teléfono", field: "T_TEL_EMPL", align: "center", cellClick: function (e, cell) { showInfo(e, cell) } },
    { title: "Correo", field: "T_CORREO_EMPL", align: "center", width: 300, cellClick: function (e, cell) { showInfo(e, cell) } },
    {
      title: "Turno", field: "TURNO", formatter: printIcon, width: 250, align: "center", color: "red", cellClick: function (e, cell) { setTimes(e, cell) },
    }
    // { title: "Turno", field: "TURNO", align: "center", formatter: , responsive: 1, 
    // cellClick: function (e, cell) {
    //     setTimes(e, cell)
    //   }
    // },
  ],

});

//?
// Evento para lanzar copia a traves del modal
$(function () {

  $(document).on("click", "#copiar", function (event) {
    copyToClipboard();
  });
});

//     Luego..
// Copia el body del modal de los detalles del empleado
function copyToClipboard() {

  var $temp = $("<input>");
  $("body").append($temp);
  var tabla = $("#mbody")[0];

  var leftColumn = tabla.getElementsByTagName("TH");
  var rightColumn = tabla.getElementsByTagName("TD");
  var text = "";

  for (var i = 0; i < leftColumn.length; i++) {
    text = text + leftColumn[i].innerHTML + " " + rightColumn[i].innerHTML + ".   ";
  }

  $temp.val(text).select();
  document.execCommand("copy");
  $temp.remove();
}
// Permite third-party libraries para bootstrap4
$.fn.modal.Constructor.prototype._enforceFocus = function () { };























// codigo caro para show info
    //Date
  //INICIO: Esto no se usa, pero lo deje porque podria servir para despues
  //var curr = new Date; // get current date
  //var first = curr.getDate() - curr.getDay() +1; // First day is the day of the month - the day of the week
  //var last = first + 6; // last day is the first day + 6

  //var firstday = new Date(curr.setDate(first)).toString();
  //var lastday = new Date(curr.setDate(last)).toString();

  //console.log(firstday); console.log(lastday);
  //console.log("cell",cell.getValue() );
  //cell.setValue(!cell.getValue());
  //FIN




/*
accion usuario

1 . el usuario hace click en una celda = c1 - c2 - c3
        | se desplega modal con informacion del empleado
                | nombre ok
                | correo ok
                | telefono ok
2. el usuario hace click en la celda de la c4
        | se desplega modal con formulario para ingresar fecha y horario del empleado
                | fecha i  ok
                | fecha f  ok
                | horario i ok
                | horario f ok
3. el usuario hace click en btn submit se envia a la base de datos
                | fechas  ok
                | horarios  ok
                | coincidientes con el nombre del empleado

4. reorganizar :

// AXIONES
- buscar si el empleado de showInfo  identico a SETtIMES
- RECARGAR la tabla , es decir tengo de hacer mi peticion ajax
- antes y despues de del btn subnit
-tabla recargar tabla --(lograr recargar nombre y turno)

_ obtner un mensaje de que si hay cambios en la base de datos
  que existen cambios en la tabla

  una vez valide esto si hay menjsae nuevo se muetra la fecha y hora
  sino me mantiene el mensaje con btn modificar -editar

  //
- ANTES DE evento clic se muestra mensaje "ingresa,modifia datos - sin informacion o podria agregar un mensaje secundario como span
+ placeholder mayor info

luego de volver a recargar lo datos }
validar
el valor del input
 si el input tiene mensaje de : ingresa datos
 se mantiene el mensaje
y


 */











































