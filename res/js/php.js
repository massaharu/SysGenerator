/**
* PHP CLASS FUNCTIONS
*/

var PHP = (function(){

     this.getAttr = (function(obj){


        var attrs = "";

        $.each(obj, function(i, v){

            attrs += 
            "\t" + ((v.isPrivate)? "private $" : "public $") + v.attribute + ";\n";                        
        });

        return attrs;
    });

    this.getGetterSetter = (function(obj){

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

    });

    this.getConstruct = (function(obj){

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

    });

    this.genSystem = (function(obj){

        var phpClassType = obj._this.attr('class').split(' ')[0].toLowerCase();
        var dbType = phpClassType.split('-')[ phpClassType.split('-').length - 1 ];
        var systemContent = "";

         switch(phpClassType){

            case "btn-sysgenerator-sqlserver-query":
            case "btn-sysgenerator-sqlserver-procedure":   

                systemContent +=
                "<?php\n"+
                    "class "+obj.className+" {\n\n"+
                        this.getAttr(obj.tableContent) +"\n"+
                        this.getGetterSetter(obj.tableContent)+
                        this.getConstruct(obj.tableContent)+ "\n\n" +
                    "}\n"+
                "?>";     

            break;

            case "btn-sysgenerator-mysql-query":
            case "btn-sysgenerator-mysql-procedure":

                systemContent +=
                "<?php\n"+
                    "class "+obj.className+" {\n\n"+
                        this.getAttr(obj.tableContent) +"\n"+
                        this.getGetterSetter(obj.tableContent)+
                        this.getConstruct(obj.tableContent)+ "\n\n" +
                        MySql.getPHPLoad(obj.tableContent, obj.tableName, dbType)+ "\n\n" +
                        MySql.getPHPGet(obj.tableContent, obj.tableName, dbType)+ "\n\n" +
                        MySql.getPHPListAll(obj.tableContent, obj.tableName, dbType)+ "\n\n" +
                        MySql.getPHPListAllActives(obj.tableContent, obj.tableName, dbType)+ "\n\n" +
                        MySql.getPHPSave(obj.tableContent, obj.tableName, dbType)+ "\n\n" +
                        MySql.getPHPRemove(obj.tableContent, obj.tableName, dbType)+ "\n\n" +
                        MySql.getPHPDel(obj.tableContent, obj.tableName, dbType)+ "\n\n" +
                    "}\n"+
                "?>"; 

            break;

            default:
                alert("PHP Class Type not found!");
        }       

        return systemContent; 
    });
})