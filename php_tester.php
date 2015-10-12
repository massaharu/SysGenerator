<?php
class Aluno {

    private $idaluno;
    private $desaluno;
    private $instatus;
    private $dtcadastro;

    public function getIdaluno(){
        return $this->idaluno;
    }

    public function setIdaluno($idaluno){
        $this->idaluno = $idaluno;
    }

    public function getDesaluno(){
        return $this->desaluno;
    }

    public function setDesaluno($desaluno){
        $this->desaluno = $desaluno;
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

            $this->setIdaluno($data['idaluno']);
            $this->setDesaluno($data['desaluno']);
            $this->setInstatus($data['instatus']);
            $this->setDtcadastro($data['dtcadastro']);

        }else{

            return false;
        }
    }

    public function load($idaluno){

        $select =
        "SELECT 
            idaluno
            ,desaluno
            ,instatus
            ,dtcadastro
        FROM tb_alunos
        WHERE idaluno = $idaluno;";

        $result = SQL::arrays($select, false);

        $this->setIdaluno($result['idaluno']);
        $this->setDesaluno($result['desaluno']);
        $this->setInstatus($result['instatus']);
        $this->setDtcadastro($result['dtcadastro']);

        return $result;
    }

    public function get($idaluno){

        $select =
        "SELECT 
            idaluno
            ,desaluno
            ,instatus
            ,dtcadastro
        FROM tb_alunos
        WHERE idaluno = $idaluno;";

        $result = SQL::arrays($select, false);

        return $result;
    }

    public function listAll(){

        $select =
        "SELECT 
            idaluno
            ,desaluno
            ,instatus
            ,dtcadastro
        FROM tb_alunos
        ORDER BY dtcadastro;";

        $result = SQL::arrays($select);

        return $result;
    }

    public function listAllActives(){

        $select =
        "SELECT 
            idaluno
            ,desaluno
            ,instatus
            ,dtcadastro
        FROM tb_alunos
        WHERE instatus = 1
        ORDER BY dtcadastro;";

        $result = SQL::arrays($select, false);

        return $result;
    }

    public function save(){

        $save = "";

        if(count($this->get($this->getIdaluno())) > 0){

            $save = 
            "UPDATE tb_alunos
            SET
                desaluno = '".$this->getDesaluno()."'
                ,instatus = '".$this->getInstatus()."'
            WHERE
                idaluno = $this->getIdaluno();

            SELECT idaluno FROM tb_alunos WHERE idaluno = $this->getIdaluno();";

        } else {

            $save = 
            "INSERT INTO tb_alunos(
                desaluno
                ,instatus
                ,dtcadastro
            ) VALUES (
                '".$this->getDesaluno()."'
                ,'".$this->getInstatus()."'
                ,'".date('Y-m-d')."'
            );

            SELECT LAST_INSERT_ID() as idaluno;";

        }

        $result = SQL::arrays($save, false);

        return $result;
    }

    public function remove(){

        $remove =
        "UPDATE tb_alunos
            instatus = 0
        WHERE idaluno = $this->getIdaluno();";

        SQL::query($remove);
    }

    public function del(){

        $del =
        "DELETE FROM tb_alunos
        WHERE idaluno = $this->getIdaluno();";

        SQL::query($del);
    }

}

$Aluno = new Aluno(array(
    'idaluno' => 0,
    'desaluno' => "Alunpo1",
    'instatus' => '1'
));

print_r($Aluno->save());
?>