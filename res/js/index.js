

/**
* GENERAL FUNCTIONS
*/
function loadDatatype(obj){

    if(typeof(obj.onlyOption) != "undefined" && obj.onlyOption){

        var options = "";

        if(typeof(obj.selectedVal) != "undefined" && !isNaN(obj.selectedVal)){                        

            $.each(DATATYPE, function(i, v){

                if(v.iddatatype == obj.selectedVal){

                    options +=
                    "<option value=" + v.iddatatype + " data-datatypesize='"+((typeof(obj.dataTypeSize) != "undefined" && obj.dataTypeSize)? obj.dataTypeSize : "")+"' data-obj='"+JSON.stringify(v)+"'>" + 
                        v.desdatatype + ((typeof(obj.dataTypeSize) != "undefined" && obj.dataTypeSize)? "(" + obj.dataTypeSize + ")" : "" ) +
                    "</option>";
                }
            });

            $.each(DATATYPE, function(i, v){

                if(v.iddatatype != obj.selectedVal){

                    options +=
                    "<option value=" + v.iddatatype + " data-datatypesize='' data-obj='"+JSON.stringify(v)+"'>" + v.desdatatype + "</option>";
                }
            })

            return options;

        }else{

            $.each(DATATYPE, function(i, v){

                options +=
                    "<option value=" + v.iddatatype + " data-datatypesize='' data-obj='"+JSON.stringify(v)+"'>" + v.desdatatype + "</option>";

            });   

            return options;
        }
    }

    $.each(DATATYPE, function(i, v){

        $('table select[name=datatype]').append(
            "<option value=" + v.iddatatype + " data-datatypesize='' data-obj='"+JSON.stringify(v)+"'>" + v.desdatatype + "</option>"
        );

    });
}

function addLine(){

    $(this).find("i.fa.fa-plus").removeClass('fa-plus').removeClass('green').addClass('fa-times').addClass('red');
    $(this).removeClass("add-line").addClass("remove-line").off('click').on('click', removeLine);

    console.log( $(this).closest('.tb-sysgenerator').find('tbody'))

    $(this).closest('.tb-sysgenerator').find('tbody').append(
        '<tr>'+
            '<td><input type="text" name="name"></td>'+
            '<td>'+
                '<select name="datatype">'+
                    '<option value="" data-datatypesize="">Select a DataType...</option>'+
                    loadDatatype({onlyOption: true})+
                '</select>'+
            '</td>'+
            '<td><input type="checkbox" name="pk"></td>'+
            '<td><input type="checkbox" name="fk"> FK Table: <span class="fk-table"></span> | FK ID: <span class="fk-id"></span></td>'+
            '<td><input type="checkbox" name="private" checked="checked"></td>'+
            '<td><a href="javascript:void(0);" class="add-line"><i class="fa fa-plus green"></i></a></td>'+
        '</tr>'
    );

    $('a.add-line').off('click').on('click', addLine);
    $('.tb-sysgenerator select[name=datatype]').off('change').on('change', setDataTypeSize);
    $('input[name=fk]').off('click').on('click', setFkAttr);
}

function removeLine(){

    $(this).closest('tr').remove();
}

function setFkAttr(){

    var checkboxVal = $(this).is(':checked');

    if(checkboxVal){

        var fk_table = $.trim(prompt("Enter the FK Table", "tb_"));

        if(!fk_table){ $(this).removeAttr('checked'); return; }

        var fk_id = $.trim(prompt("Enter the FK ID", "id"));

        if(!fk_id){ $(this).removeAttr('checked'); return; }

        $(this).closest('tr').find('.fk-table').text(fk_table);
        $(this).closest('tr').find('.fk-id').text(fk_id);


    }else{

        $(this).closest('tr').find('.fk-table').text("");
        $(this).closest('tr').find('.fk-id').text("");

    }
}

function setDataTypeSize(){

    var val = parseInt($(this).val());
    var optionSelected = $(this).find("option:selected");
    var optionObj = JSON.parse(optionSelected.attr('data-obj'));

    switch(val){

        case 1: //varchar

            var size = prompt("Specify a size to Varchar()", 50);

            if(!size){ $(this).val(""); return; }

            var optionText = optionObj.desdatatype;

            optionSelected.text( optionText + "(" + size + ")");

            optionSelected.attr('data-datatypesize', size);
        break;
        case 5: //float

            var size = prompt("Specify a size to Varchar()", "10,2");

            if(!size){ $(this).val(""); return; }

            var optionText = optionObj.desdatatype;

            optionSelected.text( optionText + "(" + size + ")");

            optionSelected.attr('data-datatypesize', size)
        break;
    }
}

function getLine(obj){

    var lines = "";

    if(typeof(obj.defaultLines) != "undefined" && obj.defaultLines){

        lines +=
        '<tr>'+
            '<td><input type="text" name="name" value=id'+obj.entityName+'></td>'+
            '<td><select name="datatype">'+ loadDatatype({onlyOption: true, selectedVal: 2}) +'</select></td>'+
            '<td><input type="checkbox" name="pk" checked="checked"></td>'+
            '<td><input type="checkbox" name="fk"> FK Table: <span class="fk-table"></span> | FK ID: <span class="fk-id"></span></td>'+
            '<td><input type="checkbox" name="private" checked="checked"></td>'+
            '<td><a href="javascript:void(0);" class="remove-line"><i class="fa fa-times red"></i></a></td>'+
        '</tr>'+
        '<tr>'+
            '<td><input type="text" name="name" value=des'+obj.entityName+'></td>'+
            '<td><select name="datatype">'+ loadDatatype({onlyOption: true, selectedVal: 1, dataTypeSize: 150 }) +'</select></td>'+
            '<td><input type="checkbox" name="pk"></td>'+
            '<td><input type="checkbox" name="fk"> FK Table: <span class="fk-table"></span> | FK ID: <span class="fk-id"></span></td>'+
            '<td><input type="checkbox" name="private" checked="checked"></td>'+
            '<td><a href="javascript:void(0);" class="remove-line"><i class="fa fa-times red"></i></a></td>'+
        '</tr>'+
        '<tr>'+
            '<td><input type="text" name="name" value="instatus"></td>'+
            '<td><select name="datatype">'+ loadDatatype({onlyOption: true, selectedVal: 4 }) +'</select></td>'+
            '<td><input type="checkbox" name="pk"></td>'+
            '<td><input type="checkbox" name="fk"> FK Table: <span class="fk-table"></span> | FK ID: <span class="fk-id"></span></td>'+
            '<td><input type="checkbox" name="private" checked="checked"></td>'+
            '<td><a href="javascript:void(0);" class="remove-line"><i class="fa fa-times red"></i></a></td>'+
        '</tr>'+
        '<tr>'+
            '<td><input type="text" name="name" value="dtcadastro"></td>'+
            '<td><select name="datatype">'+ loadDatatype({onlyOption: true, selectedVal: 3 }) +'</select></td>'+
            '<td><input type="checkbox" name="pk"></td>'+
            '<td><input type="checkbox" name="fk"> FK Table: <span class="fk-table"></span> | FK ID: <span class="fk-id"></span></td>'+
            '<td><input type="checkbox" name="private" checked="checked"></td>'+
            '<td><a href="javascript:void(0);" class="add-line"><i class="fa fa-plus green"></i></a></td>'+
        '</tr>';

        return lines;
    }

}

function getDataTypeObj(dataType){

    for(i in DATATYPE){

        if(DATATYPE[i] == dataType ){
            return DATATYPE[i];
        }
    }
}

function capitalize(str){

    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getPK(obj){

    var pk = {};

    $.each(obj, function(i, v){

        if(v.isPk){

            pk = v;
            
            return;
        }
    });

    return pk;
}



function generateSystem(){

    var systemType = $(this).closest('div.btn-group').attr('data-systemtype').toLowerCase();        
    var table = $(this).closest('.tb-sysgenerator');
    var lines = table.find('tbody tr');
    var thead = table.find('thead tr');
    var tableName = thead.find('h3').text();
    var className = capitalize(tableName.replace("tb_", "")).slice(0, -1);
    var systemContent = "";
    var winHeight = $(window).height();

    var tableContent = [];

    $.each(lines, function(){

        if($.trim($(this).find('input[name=name]').val())){

            tableContent.push({
                attribute: $(this).find('input[name=name]').val(),
                dataType: $(this).find('select[name=datatype]').val(),
                desExtJsDataType: JSON.parse($(this).find('select[name=datatype]').find('option:selected').attr('data-obj')),
                isPk: $(this).find('input[name=pk]').is(':checked'),
                isFK: $(this).find('input[name=fk]').is(':checked'),
                fkTable: $(this).find('input[name=fk]').closest('td').find('.fk-table').text(),
                fkId: $(this).find('input[name=fk]').closest('td').find('.fk-id').text(),
                isPrivate: $(this).find('input[name="private"]').is(':checked')
            })
        }
    });

    console.log(tableContent);    

    $('.loader').css('display', 'block');
    $('#modal-system .CodeMirror').remove();
    $('#modal-system .modal-body textarea').val("");
    $('#btn-abrir-window').css({display: 'none'});


    switch(systemType){

        case "phpclass":

            systemContent = PHP.genSystem({
                _this: $(this),
                tableName: tableName,
                className: className,
                tableContent: tableContent
            });

            $('#modal-system .modal-body textarea').val(systemContent);

            $('#modal-system').off().on('show.bs.modal', function (e) {

                setTimeout(function(){

                    if( !$('#modal-system .CodeMirror').length ){

                        var editor = CodeMirror.fromTextArea(document.getElementById("show-code"), {
                            lineNumbers: true,
                            matchBrackets: true,
                            mode: "application/x-httpd-php",
                            indentUnit: 4,
                            indentWithTabs: true
                        });

                        $('.CodeMirror').css('height', winHeight - 220);

                        $('.loader').css('display', 'none');
                    }

                }, 1000);
            });

        break;

        case "extjs":

            systemContent = ExtJs.genSystem({
                _this: $(this),
                tableName: tableName,
                className: className,
                tableContent: tableContent
            });

            $('#modal-system .modal-body textarea').val(systemContent);

            $('#modal-system').off().on('show.bs.modal', function (e) {

                setTimeout(function(){

                    if( !$('#modal-system .CodeMirror').length ){

                        var editor = CodeMirror.fromTextArea(document.getElementById("show-code"), {
                            mode: "javascript",
                            indentUnit: 4,
                            indentWithTabs: true,
                            lineNumbers: true,
                            matchBrackets: true,
                            continueComments: "Enter"
                        });

                        $('.CodeMirror').css('height', winHeight - 220);

                        $('.loader').css('display', 'none');
                    }

                }, 1000);
            });


        break;

        default:
            alert("System Type not found!"); return;
    }       

    

    $('#modal-system').modal('show');

}

function addTable(){

    var entityName = prompt("Enter a name for the Entity");

    if(!entityName){ return }

    $(this).closest('div.col-md-12').append(

        '<table class="table tb-sysgenerator">'+
            '<thead>'+
                '<tr>'+
                    '<th colspan="6" >'+
                        '<h3>tb_'+entityName.toLowerCase()+'s</h3>'+
                    '</th>'+
                '</tr>'+
                '<tr>'+
                    '<th>Name</th>'+
                    '<th width=180 >DataType</th>'+
                    '<th width=40>PK</th>'+
                    '<th width=400>FK</th>'+
                    '<th width=60>Private</th>'+
                    '<th width=40></th>'+
                '</tr>'+
            '</thead>'+
            '<tbody>'+
                getLine({defaultLines: true, entityName: entityName.toLowerCase()})+
            '</tbody>'+
            '<tfoot>'+
                '<tr>'+
                    '<td colspan="6" style="text-align: right;">'+

                        '<div class="btn-group" data-systemtype="sqlserverdb">'+
                            '<button type="button" class="btn btn-danger dropdown-toggle btn-sysgenerator" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                                '<span>Gerar SQL Server DB </span><span class="caret"></span>'+
                            '</button>'+
                            '<ul class="dropdown-menu">'+
                                '<li><a href="javascript:void(0);" class="btn-sysgenerator-table">Table</a></li>'+
                                '<li><a href="javascript:void(0);" class="btn-sysgenerator-procedure">Procedures</a></li>'+
                            '</ul>'+
                        '</div>'+

                        '<div class="btn-group" data-systemtype="mysqldb">'+
                            '<button type="button" class="btn btn-primary dropdown-toggle btn-sysgenerator" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                                '<span>Gerar MySql DB </span><span class="caret"></span>'+
                            '</button>'+
                            '<ul class="dropdown-menu">'+
                                '<li><a href="javascript:void(0);" class="btn-sysgenerator-table">Table</a></li>'+
                                '<li><a href="javascript:void(0);" class="btn-sysgenerator-procedure">Procedures</a></li>'+
                            '</ul>'+
                        '</div>'+

                        '<div class="btn-group" data-systemtype="extjs">'+
                            '<button type="button" class="btn btn-info dropdown-toggle btn-sysgenerator" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                                '<span>Gerar ExtJs </span><span class="caret"></span>'+
                            '</button>'+
                            '<ul class="dropdown-menu">'+
                                '<li><a href="javascript:void(0);" class="btn-sysgenerator-window">Window</a></li>'+
                                '<li><a href="javascript:void(0);" class="btn-sysgenerator-storegrid">Store & Grid</a></li>'+
                            '</ul>'+
                        '</div>'+

                        '<div class="btn-group" data-systemtype="phpclass">'+
                            '<button type="button" class="btn btn-success dropdown-toggle btn-sysgenerator" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                                '<span>Gerar PHP Class </span><span class="caret"></span>'+
                            '</button>'+
                            '<ul class="dropdown-menu">'+
                                '<li><a href="javascript:void(0);" class="btn-sysgenerator-sqlserver-query">using SQL Server query</a></li>'+
                                '<li><a href="javascript:void(0);" class="btn-sysgenerator-sqlserver-procedure">using SQL Server procedure</a></li>'+
                                '<li><a href="javascript:void(0);" class="btn-sysgenerator-mysql-query">using MySQL query</a></li>'+
                                '<li><a href="javascript:void(0);" class="btn-sysgenerator-mysql-procedure">using MySQL procedure</a></li>'+
                            '</ul>'+
                        '</div>'+

                    '</td>'+
                '</tr>'+
            '</tfoot>'+
        '</table>'

    )

    /**
    * TABLE SYSTEM EVENTS  
    */        
    $('.tb-sysgenerator select[name=datatype]').on('change', setDataTypeSize);
    $('a.add-line').on('click', addLine);
    $('a.remove-line').on('click', removeLine);
    $('input[name=fk]').on('click', setFkAttr);
    $('button.btn-sysgenerator').closest('div').find('ul li a').on('click', generateSystem);       
}

function openExtJsWin(){

    var vendors = 
    '<meta charset="UTF-8">'+
    '<link rel="stylesheet" type="text/css" href="vendors/ext-3.4.0/resources/css/ext-all.css" />'+
    '<script type="text/javascript" src="vendors/ext-3.4.0/docs/resources/ext-base.js"></script>'+
    '<script type="text/javascript" src="vendors/ext-3.4.0/ext-all.js"></script>'+
    '<script src="vendors/jquery-2.1.4.js"></script>';

    var winExtJs = window.open();
    var html = $('#show-code').val();

        winExtJs.document.write(
            vendors+
            "<div id='loading-win-extjs'>Carregando...</div>"+
            "<script type='text/javascript'>"+
            "setTimeout(function(){"+
            html+
            "$('#loading-win-extjs').hide()"+
            "}, 1000)"+
            "</script></body></html>"
        );
    
   
}

/**
* INIT OBJECTS
*/
var MySql = new MySql();
var SQLServer = new SQLServer();
var PHP = new PHP();
var ExtJs = new ExtJs();

$(function(){

   /**
    * GENERAL EVENTS
    */

    /** Criar entidades */
    $('#add-table').on('click', addTable);

    /** Fechar modal do código gerado */ 
    $('#btn-modal-close').on('click', function(){ $('#modal-system').modal('hide'); });

    $('#btn-abrir-window').on('click', openExtJsWin);

});
