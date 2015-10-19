
var ExtJs = (function(){

	/**
    * Methods for EXTJs Class
    */ 

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
                "<script type=\"javascript/text\">\n\n"+
                "/** commet 2 */\n\n"+
                "alert('oi');\n\n"+
                "alert('oi');\n\n"+
                "alert('oi');\n\n"+
                "alert('oi');\n\n"+
                "alert('oi');\n\n"+
                "alert('oi');\n\n"+
                "alert('oi');\n\n"+
                "alert('oi');\n\n"+
                "alert('oi');\n\n"+
                "alert('oi');\n\n"+
                "alert('oi');\n\n"+
                "alert('oi');\n\n"+
                "alert('oi');\n\n"+
                "alert('oi');\n\n"+
                "alert('oi');\n\n"+
                "alert('oi');\n\n"+
                "alert('oi');\n\n"+
                "alert('oi');\n\n"+
                "alert('oi');\n\n"+
                "alert('oi');\n\n"+
                "alert('oi');\n\n"+
                "alert('oi');\n\n"+
                "alert('oi');\n\n"+
                "alert('oi');\n\n"+
                "alert('oi');\n\n"+
                "alert('oi');\n\n"+
                "alert('oi');\n\n"+
                
                "function removeLine(){\n\n"+

                    "\t$(this).closest('tr').remove();\n\n"+
                "}\n\n"+

                 "</script>\n\n";

            break;

            default:
                alert("EXTJs Type not found!");
        }       

        return systemContent; 
    });

});