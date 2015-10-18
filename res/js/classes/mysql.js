var MySql = (function(){

    /**
    * Methods for PHP Class
    */ 

    this.getPHPLoad = (function(obj, tableName, dbType){

        var retorno = "";

        switch(dbType){

            case "query":

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

                retorno = load1 + select + load2;

            break;

            case "procedure":

            break;


        }

        return retorno;
    });

    this.getPHPGet = (function(obj, tableName, dbType){

        var retorno = "";

        switch(dbType){

            case "query":
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

                retorno = load1 + select + load2;

            break;

            case "procedure":

            break;
        }

        return retorno;
    });

    this.getPHPListAll = (function(obj, tableName, dbType){

        var retorno = "";

        switch(dbType){

            case "query":

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

                retorno = load1 + select + load2;

            break;

            case "procedure":

            break;
        }

        return retorno;
    });

    this.getPHPListAllActives = (function(obj, tableName, dbType){

        var retorno = "";

        switch(dbType){

            case "query":

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

                retorno = load1 + select + load2;


            break;

            case "procedure":

            break;
        }

        return retorno;
    });

    this.getPHPSave = (function(obj, tableName, dbType){

        var retorno = "";

        switch(dbType){

            case "query":

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

                retorno = save;

            break;

            case "procedure":

            break;
        }

        return retorno;
    });

    this.getPHPRemove = (function(obj, tableName, dbType){

        var retorno = "";

        switch(dbType){

            case "query":

                var remove = 
                "\tpublic function remove(){\n\n"+
                "\t\t$remove =\n"+
                "\t\t\"UPDATE " + tableName +"\n"+
                "\t\t\tinstatus = 0\n"+
                "\t\tWHERE " + getPK(obj).attribute + " = $this->get" + capitalize(getPK(obj).attribute) + "();\";\n\n"+
                "\t\tSQL::query($remove);\n\t}";

                retorno = remove; 

            break;

            case "procedure":

            break;
        }

        return retorno;
    });

    this.getPHPDel = (function(obj, tableName, dbType){

        var retorno = "";

        switch(dbType){

            case "query":

                var del = 
                "\tpublic function del(){\n\n"+
                "\t\t$del =\n"+
                "\t\t\"DELETE FROM " + tableName +"\n"+
                "\t\tWHERE " + getPK(obj).attribute + " = $this->get" + capitalize(getPK(obj).attribute) + "();\";\n\n"+
                "\t\tSQL::query($del);\n\t}"; 

                retorno = del;

            break;

            case "procedure":

            break;
        }

        return retorno;
    });

    /**
    * Methods for PROCEDURES
    */ 
});