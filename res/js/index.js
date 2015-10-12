$(function(){

    var DATATYPE = [{
        iddatatype : 1,
        desdatatype : "Varchar",
        despatternname: "des"
    },{
        iddatatype: 2,
        desdatatype: "Int",
        despatternname: "nr"
    },{
        iddatatype: 3,
        desdatatype: "Datetime",
        despatternname: "dt"
    },{
        iddatatype: 4,
        desdatatype: "Bit",
        despatternname: "in"
    },{
        iddatatype: 5,
        desdatatype: "Numeric",
        despatternname: "nr"
    }];

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

    function getAttr(obj){


        var attrs = "";

        $.each(obj, function(i, v){

            attrs += 
            "\t" + ((v.isPrivate)? "private $" : "public $") + v.attribute + ";\n";                        
        });

        return attrs;
    }

    function getGetterSetter(obj){

        var getterSetters = "";

        $.each(obj, function(i, v){

            getterSetters += 
            "\tpublic function get" + capitalize(v.attribute) + "(){\n"+
                "\t\treturn $this->" + v.attribute + ";\n"+
            "\t}\n\n"+
            "\tpublic function set" + capitalize(v.attribute) + "($"+v.attribute+"){\n"+
                "\t\t$this->" + v.attribute + " = $" + v.attribute + ";\n"+
            "\t}\n\n";
        });

        return getterSetters;

    }

    function getConstruct(obj){

        var __construct = 
        "\tpublic function __construct($data = array()){\n\n"+
            "\t\tif(gettype($data) == \"numeric\" || gettype($data) == \"integer\" || gettype($data) == \"string\"){\n\n" +
                "\t\t\treturn $this->load($data);\n\n" +                        
            "\t\t}else if(gettype($data) == \"array\") {\n\n";

        $.each(obj, function(i, v){

            __construct +=
            "\t\t\t$this->set" +capitalize(v.attribute)+ "($data['" +v.attribute+ "']);\n";
        });

        __construct += 
        "\n\t\t}else{\n\n" +
            "\t\t\treturn false;\n"+
        "\t\t}\n"+
        "\t}";

        return __construct;

    }

    function getLoad(obj, tableName){

        var load1 = 
        "\tpublic function load($" +getPK(obj).attribute+"){\n\n";

        var select =
        "\t\t$select =\n\t\t\"SELECT \n";

        $.each(obj, function(i, v){

            if(i == 0){    
                select +=
                "\t\t\t" + v.attribute+ "\n"; 
            }else{

                select +=
                "\t\t\t," +v.attribute+ "\n";    
            }                          
        })

        select +=
        "\t\tFROM " + tableName + "\n" +
        "\t\tWHERE " + getPK(obj).attribute + " = $" + getPK(obj).attribute + ";\";\n\n";

        var load2 = 
        "\t\t$result = SQL::arrays($select, false);\n\n";

        $.each(obj, function(i, v){

            load2 +=
            "\t\t$this->set" +capitalize(v.attribute)+ "($result['" +v.attribute+ "']);\n";
        });

        load2 += "\n\t\treturn $result;\n\t}";

        return load1 + select + load2;
    }

    function getGet(obj, tableName){

        var load1 = 
        "\tpublic function get($" +getPK(obj).attribute+"){\n\n";

        var select =
        "\t\t$select =\n\t\t\"SELECT \n";

        $.each(obj, function(i, v){

            if(i == 0){    
                select +=
                "\t\t\t" + v.attribute+ "\n"; 
            }else{

                select +=
                "\t\t\t," +v.attribute+ "\n";    
            }                          
        })

        select +=
        "\t\tFROM " + tableName + "\n" +
        "\t\tWHERE " + getPK(obj).attribute + " = $" + getPK(obj).attribute + ";\";\n\n";

        var load2 = 
        "\t\t$result = SQL::arrays($select, false);\n\n"+
        "\t\treturn $result;\n\t}"; 

        return load1 + select + load2;
    }

    function getListAll(obj, tableName){

        var load1 = 
        "\tpublic function listAll(){\n\n";

        var select =
        "\t\t$select =\n\t\t\"SELECT \n";

        $.each(obj, function(i, v){

            if(i == 0){    
                select +=
                "\t\t\t" + v.attribute+ "\n"; 
            }else{

                select +=
                "\t\t\t," +v.attribute+ "\n";    
            }                          
        })

        select +=
        "\t\tFROM " + tableName + "\n"+
        "\t\tORDER BY dtcadastro;\";\n\n";

        var load2 = 
        "\t\t$result = SQL::arrays($select);\n\n"+
        "\t\treturn $result;\n\t}"; 

        return load1 + select + load2;
    }

    function getListAllActives(obj, tableName){

        var load1 = 
        "\tpublic function listAllActives(){\n\n";

        var select =
        "\t\t$select =\n\t\t\"SELECT \n";

        $.each(obj, function(i, v){

            if(i == 0){    
                select +=
                "\t\t\t" + v.attribute+ "\n"; 
            }else{

                select +=
                "\t\t\t," +v.attribute+ "\n";    
            }                          
        })

        select +=
        "\t\tFROM " + tableName + "\n" +
        "\t\tWHERE instatus = 1\n" +
        "\t\tORDER BY dtcadastro;\";\n\n";

        var load2 = 
        "\t\t$result = SQL::arrays($select, false);\n\n"+
        "\t\treturn $result;\n\t}"; 

        return load1 + select + load2;
    }

    function getSave(obj, tableName){

    	var save = 
        "\tpublic function save(){\n\n"+
        "\t\t$save = \"\";\n\n"+
        "\t\tif(count($this->get($this->get" +capitalize(getPK(obj).attribute)+"())) > 0){\n\n"+
        "\t\t\t$save = \n"+
        "\t\t\t\"UPDATE " + tableName + "\n"+
        "\t\t\tSET\n";        

        var count = 0;

        $.each(obj, function(i, v){

        	if(v.attribute != getPK(obj).attribute && v.attribute != "dtcadastro"){

	            if(count == 0){    
	                save +=
	                "\t\t\t\t" +v.attribute+ " = '\".$this->get" +capitalize(v.attribute)+ "().\"'\n"; 
	            }else{

	                save +=
	                "\t\t\t\t," +v.attribute+ " = '\".$this->get" +capitalize(v.attribute)+ "().\"'\n"; 
	            }      

	            count++;  
	        }                  
        });

        save +=
        "\t\t\tWHERE\n"+
        "\t\t\t\t" + getPK(obj).attribute + " = $this->get"+ capitalize(getPK(obj).attribute) + "();\n\n"+
        "\t\t\tSELECT "+getPK(obj).attribute+" FROM " +tableName+ " WHERE " +getPK(obj).attribute+ " = $this->get" +capitalize(getPK(obj).attribute)+ "();\";\n\n"+
        "\t\t} else {\n\n"+
        "\t\t\t$save = \n"+
        "\t\t\t\"INSERT INTO "+ tableName +"(\n";

        count = 0;

        $.each(obj, function(i, v){

        	if(v.attribute != getPK(obj).attribute){

	            if(count == 0){    
	                save +=
	                "\t\t\t\t" +v.attribute+ "\n"; 
	            }else{

	                save +=
	                "\t\t\t\t," +v.attribute+ "\n"; 
	            }

	            count++;
	        }                          
        });

        save +=
        "\t\t\t) VALUES (\n";

        count = 0;

        $.each(obj, function(i, v){

        	if(v.attribute != getPK(obj).attribute){

	            if(count == 0){    

	            	save += ((v.attribute == "dtcadastro")? 
	            		"\t\t\t\t'\".date('Y-m-d').\"'\n" : 
	            		"\t\t\t\t'\".$this->get" +capitalize(v.attribute)+ "().\"'\n");
	            }else{

	                save += ((v.attribute == "dtcadastro")? 
	            		"\t\t\t\t,'\".date('Y-m-d').\"'\n" : 
	            		"\t\t\t\t,'\".$this->get" +capitalize(v.attribute)+ "().\"'\n");
	            }

	            count++;   
	        }                       
        });

        save +=
        "\t\t\t);\n\n"+
		"\t\t\tSELECT LAST_INSERT_ID() as " + getPK(obj).attribute + ";\";\n\n"+
		"\t\t}\n\n"+
		"\t\t$result = SQL::arrays($save, false);\n\n"+
		"\t\treturn $result;\n\t}"; 

		return save;
    }

    function getRemove(obj, tableName){

    	var remove = 
    	"\tpublic function remove(){\n\n"+
    	"\t\t$remove =\n"+
    	"\t\t\"UPDATE " + tableName +"\n"+
    	"\t\t\tinstatus = 0\n"+
    	"\t\tWHERE " + getPK(obj).attribute + " = $this->get" + capitalize(getPK(obj).attribute) + "();\";\n\n"+
    	"\t\tSQL::query($remove);\n\t}"; 

    	return remove;
    }

    function getDel(obj, tableName){

    	var del = 
    	"\tpublic function del(){\n\n"+
    	"\t\t$del =\n"+
    	"\t\t\"DELETE FROM " + tableName +"\n"+
    	"\t\tWHERE " + getPK(obj).attribute + " = $this->get" + capitalize(getPK(obj).attribute) + "();\";\n\n"+
    	"\t\tSQL::query($del);\n\t}"; 

    	return del;
    }


    function generateSystem(){

        var table = $(this).closest('.tb-sysgenerator');
        var lines = table.find('tbody tr');
        var thead = table.find('thead tr');
        var tableName = thead.find('h3').text();
        var className = capitalize(tableName.replace("tb_", "")).slice(0, -1);

        var obj = [];

        $.each(lines, function(){

            obj.push({
                attribute: $(this).find('input[name=name]').val(),
                dataType: $(this).find('select[name=datatype]').val(),
                isPk: $(this).find('input[name=pk]').is(':checked'),
                isFK: $(this).find('input[name=fk]').is(':checked'),
                fkTable: $(this).find('input[name=fk]').closest('td').find('.fk-table').text(),
                fkId: $(this).find('input[name=fk]').closest('td').find('.fk-id').text(),
                isPrivate: $(this).find('input[name="private"]').is(':checked')
            })
        });

        console.log(obj);              

        $('#modal-system .modal-body textarea').css('height', ($(window).height() - 250)).val("").val(
            "<?php\n"+
                "class "+className+" {\n\n"+
                    getAttr(obj) +"\n"+
                    getGetterSetter(obj)+
                    getConstruct(obj)+ "\n\n" +
                    getLoad(obj, tableName)+ "\n\n" +
                    getGet(obj, tableName)+ "\n\n" +
                    getListAll(obj, tableName)+ "\n\n" +
                    getListAllActives(obj, tableName)+ "\n\n" +
                    getSave(obj, tableName)+ "\n\n" +
                    getRemove(obj, tableName)+ "\n\n" +
                    getDel(obj, tableName)+ "\n\n" +
                "}\n"+
            "?>"
        );

        $('#modal-system').modal('show');

    }

    function addTable(){

        var entityName = prompt("Enter a name for the Entity");

        if(!entityName){ return }

        $(this).closest('div.col-md-12').append(

            '<table class="table tb-sysgenerator">'+
                '<thead>'+
                    '<tr>'+
                        '<th>'+
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
                            '<div class="btn-group">'+
                                '<button type="button" class="btn btn-success dropdown-toggle btn-sysgenerator" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                                    '<span>Gerar PHP Class </span><span class="caret"></span>'+
                                '</button>'+
                                '<ul class="dropdown-menu">'+
                                    '<li><a href="javascript:void(0);" class="btn-sysgenerator-sqlserver">SQL Server</a></li>'+
                                    '<li><a href="javascript:void(0);" class="btn-sysgenerator-mysql">MySQL</a></li>'+
                                '</ul>'+
                            '</div>'+
                        '</td>'+
                    '</tr>'+
                '</tfoot>'+
            '</table><br /><hr />'

        )

        $('.tb-sysgenerator select[name=datatype]').on('change', setDataTypeSize);


        $('a.add-line').on('click', addLine);
        $('a.remove-line').on('click', removeLine);
        $('input[name=fk]').on('click', setFkAttr);
        $('button.btn-sysgenerator').closest('div').find('ul li a').on('click', generateSystem)

       
    }

   
     $('#add-table').on('click', addTable);

});
