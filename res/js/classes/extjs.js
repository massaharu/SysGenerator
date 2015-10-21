
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

            var dateFormat = (v.dataType == 3)? "': dateFormat: 'timestamp'" : "'";    

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
        "\t},\n";
        
        grid +=
        "\tlisteners:{\n\n"+
        "\t}\n"+
        "})";

        return grid;

    });

    this.genSystem = (function(obj){

        var eXTJsType = obj._this.attr('class').split(' ')[0].toLowerCase();
        var dbType = eXTJsType.split('-')[ eXTJsType.split('-').length - 1 ];
        var systemContent = "";

         switch(eXTJsType){

            case "btn-sysgenerator-window":

                systemContent += "";

            break;

            case "btn-sysgenerator-storegrid":

                systemContent +=
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