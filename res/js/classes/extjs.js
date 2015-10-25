
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
        "});\n\n";

        return grid;

    });

    var getPanelWest = (function(obj){

        var classNames = obj.className + "s";

        var panelWest =         
            "\t\txtype:'panel',\n"+
            "\t\tregion: 'west',\n"+
            "\t\tmargins:'5 0 5 5',\n"+
            "\t\twidth:'60%',\n"+
            "\t\tcollapseMode:'mini',\n"+
            "\t\tcollapsed:true,\n"+
            "\t\tsplit:true,\n"+
            "\t\tlayout:'fit',\n"+
            "\t\titems:[ ]\n";
        
        return panelWest;
    });

    var getPanelCenter = (function(obj){

        var classNames = obj.className + "s";

        var panelCenter =         
            "\t\txtype:'panel',\n"+
            "\t\tregion: 'center',\n"+
            "\t\tmargins:'5 5 5 0',\n"+
            "\t\tborder:false,\n"+
            "\t\tlayout:'fit',\n"+
            "\t\titems:[ grid"+ classNames +"]\n";
        
        return panelCenter;
    });

    var getPanel = (function(obj){

        var panelHeight = $(window).height() - 90;
        var classNames = obj.className + "s";

        var panel =
        "var panel"+classNames+" = new Ext.Panel({\n"+
            "\ttitle: '"+classNames+"',\n"+
            "\tborder: false,\n"+       
            "\theight: "+ panelHeight +",\n"+
            "\tlayout: 'border',\n"+
            "\ttbar:[{\n"+
                "\t\txtype: 'button',\n"+
                "\t\ttext: 'Adicionar',\n"+
                "\t\ticon: 'res/img/ico-24-add.png',\n"+
                "\t\tscale: 'medium',\n"+
                "\t\ticonAlign: 'top',\n"+
                "\t\tcls: 'padding: 5px;',\n"+
                "\t\twidth: 60,\n"+
                "\t\thandler:function(){\n"+                   
                "\t\t}\n"+
            "\t},'-',{\n"+
                "\t\txtype: 'button',\n"+
                "\t\ttext: 'Excluir',\n"+
                "\t\tid:'btnexcluirturmapai',\n"+
                "\t\ticon: 'res/img/ico-24-remove.png',\n"+
                "\t\tdisabled: true,\n"+
                "\t\tscale: 'medium',\n"+
                "\t\ticonAlign: 'top',\n"+
                "\t\tcls: 'padding: 5px;',\n"+
                "\t\twidth: 60,\n"+
                "\t\thandler:function(){\n"+
                "\t\t}\n"+
            "\t}],\n"+
            "\titems:[{\n"+
                getPanelCenter(obj)+
            "\t},{\n"+
                getPanelWest(obj)+
            "\t}]\n"+            
        "});\n\n";

        return panel;
    })

    var getWindow = (function(obj){

        var winHeight = $(window).height() - 30;
        var classNames = obj.className + "s";

        var win = 
        "if(Ext.getCmp('idwin"+obj.className.toLowerCase()+"')){\n"+
        "\tExt.getCmp('idwin"+obj.className.toLowerCase()+"').show();\n"+
        "}else{\n"+
        "\tnew Ext.Window({\n"+
        "\t\tid: 'idwin"+obj.className.toLowerCase()+"',\n"+
        "\t\ttitle:'"+classNames+"',\n"+
        "\t\theight: " + winHeight + ",\n"+
        "\t\twidth: '90%',\n"+
        "\t\titems:[{\n"+
            "\t\t\txtype:'tabpanel',\n"+
            "\t\t\tactiveTab: 0,\n"+
            "\t\t\tborder: false,\n"+
            "\t\t\ttabPosition:'bottom',\n"+
            "\t\t\titems:[ panel"+ classNames +"]\n"+
        "\t\t}],\n"+
        "\t}).show();\n"+
        "}";

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
                "/* Panel */\n"+
                getPanel(obj)+
                "/* Window */\n"+
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