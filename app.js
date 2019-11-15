
//Trae los empleados
var results = $.ajax({
    url: 'https://backendappapi.us-south.cf.appdomain.cloud/listaempleadosgts',
    type: 'GET',
    async: false,
    dataType: 'json',
}).responseJSON;
        

//Muestra el detalle de los empleados en un modal
function showInfo(e, row){
        $('#mtitle').html('<b>Detalles empleado: <i>' + row.getData().T_NOM_EMPL +'</i></b>');
        
        var keys = Object.keys(row.getData());
        var values = Object.values(row.getData());
        
        var text="";
        for (var i=0; i< keys.length; i++){
            if (keys[i]=="_children" || keys[i]=="id"){
                continue;
            }
            
            text += '<tr><th>'+keys[i]+':</th>'+
                    '<td>'+values[i]+'</td></tr>';
        }
        
        $('#mbody').html('<div class="table-responsive table-bordered"><table class="table table-striped"><tbody>'+text+'</tbody></table></div>');
        $('#masInformacion').modal('show'); 
}

//Modifica modal de turnos
function setTimes(e, cell){
    var objData = cell.getData(); //Obtiene los datos de la celda
    //console.log(objData.name);
    
    //Date
    //INICIO: Esto no se usa, pero lo deje porque podria servir para despues
    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay() +1; // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    
    var firstday = new Date(curr.setDate(first)).toString();
    var lastday = new Date(curr.setDate(last)).toString();
    
    console.log(firstday);
    console.log(lastday);
    //console.log("cell",cell.getValue() );
    //cell.setValue(!cell.getValue());
    //FIN
    
    //Modal
    $('#masInformacion').modal('hide'); 
    $('#ttitle').html('<b>Configuración turno empleado: <i>' + objData.T_NOM_EMPL +'</i></b>');
    // $('#tfooter').html('<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>'
	// 			    +'<input type="submit"  class="btn btn-primary" value="Submit" >');    

    $('#turnos').modal('show'); 
}

//Crea la tabla
var table = new Tabulator("#example-table", {
    height:"10%",

    layout:"fitColumns",
    responsiveLayout:"hide",
    data:results,
    dataTree:true,
    dataTreeStartExpanded:true,
    
    groupBy:"T_TOR_EMPL",
    groupStartOpen:false,

    columns:[
        {title:"Nombre", field:"T_NOM_EMPL", responsive:0, cellClick:function(e,cell){showInfo(e,cell)}}, //never hide this column
        {title:"Teléfono", field:"T_TEL_EMPL", cellClick:function(e,cell){showInfo(e,cell)}},
        {title:"Correo", field:"T_CORREO_EMPL", width:300, cellClick:function(e,cell){showInfo(e,cell)}},
        {title:"Turno", field:"TURNO", align: "center", formatter: "tickCross", responsive: 1, cellClick:function(e, cell){
            setTimes(e,cell)
        }},
    ],
    
});



// Copia el body del modal de los detalles del empleado
  function copyToClipboard() {
      
    var $temp = $("<input>");
    $("body").append($temp);
    var tabla=$("#mbody")[0];

    var leftColumn = tabla.getElementsByTagName("TH");
    var rightColumn = tabla.getElementsByTagName("TD");
    var text = "";

    for (var i = 0; i < leftColumn.length; i++) {
      text = text + leftColumn[i].innerHTML + " " + rightColumn[i].innerHTML +".   ";
    }

    $temp.val(text).select();
    document.execCommand("copy");
    $temp.remove();
  }
  

  // Evento para lanzar copia a traves del modal
  $(function(){
      
    $(document).on("click", "#copiar", function(event){
      copyToClipboard();
    });
  });

  // Permite third-party libraries para bootstrap4
  $.fn.modal.Constructor.prototype._enforceFocus = function() {};


  var info_form = {
      a:"hola"
  }

  $.ajax({
    type: "POST",
    url: 'https://backendappapi.us-south.cf.appdomain.cloud/save' ,
    data: info_form,
    // dataType: dataType,
    success: function (response) {
        console.log (response);
   }
   
  });
   
  
   let getDate = document.getElementById("submit")

   getDate.addEventListener('click', (evt) => {
    let takeDateStart= document.getElementById("finicio").value
    let takeDateEnd = document.getElementById("ffin").value
    evt.preventDefault();
    console.log(takeDateStart , takeDateEnd)
   });
  



  /*
  form 
  parametros :
  1 nombre  = ducument.getById("ID DEL INPUT ").VALUE;
  2 fecha i
  3 fecha f
  4 horario i
  5  horario f


   VAR OBJECT_FOMR = {};
   OBJECT_FOMR = {

      nombre: NOMBRE_.....
   }
   console.log
  */ 
