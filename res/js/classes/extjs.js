
var ExtJs = (function(){

	/**
    * Methods for EXTJs Class
    */ 

    var getJsonStore = (function(obj){

        var classNames = obj.className + "s";

        var jsonStore =
        "var store" + classNames + " = new Ext.data.JsonStore({\n"+
        "\turl: 'json/list" + classNames + ".php',\n"+
        "\troot: 'myData',\n"+
        "\tfields: [\n";

        $.each(obj.tableContent, function(i, v){

            var dateFormat = (v.dataType == 3)? "', dateFormat: 'timestamp'" : "'";    

            if(i == 0){

                jsonStore +=
                "\t\t{name : '" + v.attribute + "', type: '" + v.desExtJsDataType.desextjstype + dateFormat + "}\n"

            }else{

                jsonStore +=
                "\t\t,{name : '" + v.attribute + "', type: '" + v.desExtJsDataType.desextjstype + dateFormat + "}\n"    
            }

                
        });

        jsonStore +=
        "\t],\n"+
        "\tautoLoad:true\n"+
        "});\n\n";

        return jsonStore;
    });

    var getGrid = (function(obj){

        var classNames = obj.className + "s";

        var grid = 
        "var grid" + classNames + " = new Ext.grid.GridPanel({\n"+
		"\tid: 'idgrid" + obj.className.toLowerCase() + "',\n"+
        "\tstore: store" + classNames + ",\n"+
        "\tautoScroll:true,\n"+
        "\tstripeRows: true,\n"+
        "\tloadMask:true,\n"+
        "\theight:170,\n"+
        "\tlayout:'fit',\n"+
        "\tviewConfig: {\n"+
        "\t\tforceFit: true,\n"+
        "\t\tgetRowClass: function(record, index) {\n\n"+
        "\t\t},\n"+
        "\t},\n"+
		"\tsm: new Ext.grid.RowSelectionModel({\n"+
		"\t\tsingleSelect: true\n"+
		"\t}),\n"+
		"\tcm:new Ext.grid.ColumnModel({\n"+
		"\t\tdefaults: {\n"+
		"\t\t\tsortable: true, \n"+
		"\t\t\tcollapsible: true\n"+
		"\t\t},\n"+
		"\t\tcolumns: [new Ext.grid.RowNumberer({\n"+
		"\t\t\twidth:30,\n"+
		"\t\t\theader:'nº',\n"+
		"\t\t})";
		
		$.each(obj.tableContent, function(i, v){
			
			var dateTimeAttrs = "";
			
			if(v.dataType == 3 /* Datetime */){
				dateTimeAttrs +=
				"\t\t\txtype:'datecolumn',\n"+
				"\t\t\tformat:'d/m/Y h:i',\n";
				
			}
			
			grid +=
			",{\n"+
				dateTimeAttrs+
				"\t\t\theader:'"+ v.attribute +"',\n"+
				"\t\t\twidth:40,\n"+
				"\t\t\ttooltip:'"+ capitalize(v.attribute) + "',\n"+
				"\t\t\tdataIndex:'"+ v.attribute +"'\n"+
			"\t\t}";
		});
        
        grid +=
			"]\n"+
		"\t}),\n"+
        "\tlisteners:{\n"+
		"\t\t'rowdblclick':function( $this, rowIndex, e ){\n"+
			"\t\t\tvar rec = $this.getStore().getAt(rowIndex);\n"+
		"\t\t}\n"+
        "\t}\n"+
        "});";

        return grid;

    });

    var getWindow = (function(obj){

        var classNames = obj.className + "s";

        var win = 
        "new Ext.Window({"+
        "id: 'idwinadmdisciplinas',"+
        "title:'Administrativo de Disciplinas',"+
        "height: 570,"+
        "width: 550"+
        "}).show();";

        return win;

    })

    this.genSystem = (function(obj){

        var eXTJsType = obj._this.attr('class').split(' ')[0].toLowerCase();
        var dbType = eXTJsType.split('-')[ eXTJsType.split('-').length - 1 ];
        var systemContent = "";

         switch(eXTJsType){

            case "btn-sysgenerator-window":

                systemContent += 
                "/* JSON Store */\n"+
                getJsonStore(obj)+
                "/* Simple Grid */\n"+
                getGrid(obj)+
                getWindow(obj);
                


                $('#btn-abrir-window').css({display: 'inline'});

            break;

            case "btn-sysgenerator-storegrid":

                systemContent +=
                    "/* JSON Store */\n"+
                    getJsonStore(obj)+
                    "/* Simple Grid */\n"+
                    getGrid(obj);


            break;

            default:
                alert("EXTJs Type not found!");
        }       

        return systemContent; 
    });

});