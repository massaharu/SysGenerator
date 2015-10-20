
var ExtJs = (function(){

	/**
    * Methods for EXTJs Class
    */ 

    var getJsonStore = (function(obj){

        var classNames = obj.className + "s";

        var jsonStore =
        "var store" + classNames + "s = new Ext.data.JsonStore({\n"+
        "\turl: 'json/list" + classNames + ".php',\n"+
        "\troot: 'myData',\n"+
        "\tfields: [\n";

        $.each(obj, function(i, v){


        });

        jsonStore +=
        "\t],\n"+
        "\tautoLoad:true\n"+
        "});";

        return jsonStore;
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
                    getJsonStore(obj);


            break;

            default:
                alert("EXTJs Type not found!");
        }       

        return systemContent; 
    });

});