<?php
class Alun {

    private $idalun;
    private $desalun;
    private $instatus;
    private $dtcadastro;

    public function getIdalun(){
        return $this->idalun;
    }

    public function setIdalun($idalun){
        $this->idalun = $idalun;
    }

    public function getDesalun(){
        return $this->desalun;
    }

    public function setDesalun($desalun){
        $this->desalun = $desalun;
    }

    public function getInstatus(){
        return $this->instatus;
    }

    public function setInstatus($instatus){
        $this->instatus = $instatus;
    }

    public function getDtcadastro(){
        return $this->dtcadastro;
    }

    public function setDtcadastro($dtcadastro){
        $this->dtcadastro = $dtcadastro;
    }

    public function __construct($data = array()){

        if(gettype($data) == "numeric" || gettype($data) == "integer" || gettype($data) == "string"){

            return $this->load($data);

        }else if(gettype($data) == "array") {

            $this->setIdalun($data['idalun']);
            $this->setDesalun($data['desalun']);
            $this->setInstatus($data['instatus']);
            $this->setDtcadastro($data['dtcadastro']);

        }else{

            return false;
        }
    }

    public function load($idalun){

        $select =
        "SELECT 
            idalun
            ,desalun
            ,instatus
            ,dtcadastro
        FROM tb_aluns
        WHERE idalun = $idalun;";

        $result = SQL::arrays($select, false);

        $this->setIdalun($result['idalun']);
        $this->setDesalun($result['desalun']);
        $this->setInstatus($result['instatus']);
        $this->setDtcadastro($result['dtcadastro']);

        return $result;
    }

    public function get($idalun){

        $select =
        "SELECT 
            idalun
            ,desalun
            ,instatus
            ,dtcadastro
        FROM tb_aluns
        WHERE idalun = $idalun;";

        $result = SQL::arrays($select, false);

        return $result;
    }

    public function listAll(){

        $select =
        "SELECT 
            idalun
            ,desalun
            ,instatus
            ,dtcadastro
        FROM tb_aluns
        ORDER BY dtcadastro;";

        $result = SQL::arrays($select);

        return $result;
    }

    public function listAllActives(){

        $select =
        "SELECT 
            idalun
            ,desalun
            ,instatus
            ,dtcadastro
        FROM tb_aluns
        WHERE instatus = 1
        ORDER BY dtcadastro;";

        $result = SQL::arrays($select, false);

        return $result;
    }

    public function save(){

        $save = "";

        if(count($this->get($this->getIdalun())) > 0){

            $save = 
            "UPDATE tb_aluns
            SET
                desalun = '".$this->getDesalun()."'
                ,instatus = '".$this->getInstatus()."'
            WHERE
                idalun = $this->getIdalun();

            SELECT idalun FROM tb_aluns WHERE idalun = $this->getIdalun();";

        } else {

            $save = 
            "INSERT INTO tb_aluns(
                desalun
                ,instatus
                ,dtcadastro
            ) VALUES (
                '".$this->getDesalun()."'
                ,'".$this->getInstatus()."'
                ,'".date('Y-m-d')."'
            );

            SELECT LAST_INSERT_ID() as idalun;";

        }

        $result = SQL::arrays($save, false);

        return $result;
    }

    public function remove(){

        $remove =
        "UPDATE tb_aluns
            instatus = 0
        WHERE idalun = $this->getIdalun();";

        SQL::query($remove);
    }

    public function del(){

        $del =
        "DELETE FROM tb_aluns
        WHERE idalun = $this->getIdalun();";

        SQL::query($del);
    }

}
?>