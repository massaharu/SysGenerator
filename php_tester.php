<?php

class DefaultObject {
    protected $fields = NULL;
    protected $changed = false;

    public function __construct($var){
        $this->fields = (object)array();
        switch(gettype($var)){
            case 'array':
                return $this->setArrayInAttr($var);
                break;
            case 'integer':
                return $this->get($var);
                break;

            case 'object':
                if(method_exists($this, "getBy".get_class($var))){
                    return $this->{"getBy".get_class($var)}($val);
                }else{
                    return true;
                }
                break;
            default:
                return true;
                break;
        }
    }

    final public function setArrayInAttr($arr){
        foreach($arr as $key=>$val){
            $arr[strtolower($key)] = $val;
        }
        $arr = array_merge((array)$this->fields, $arr);
        $this->fields = (object)$arr;
        foreach($arr as $key=>$val){
            if($key) $this->{strtolower($key)} = $val;
        }

        $this->setChanged();
        return $this;
    }
    /** Retorna apenas os carecteres alfanúmericos de uma string : String */
    final public function getNumbers($string, $exceptions = array()){
        $result = '';
        for($i=0; $i<strlen($string); $i++){
            $l = substr($string, $i, 1);
            if(is_numeric($l) || in_array($l, $exceptions)) $result .= $l;
        }
        return $result;
    }
    public function __call($name, $args){
//Crindo Getters e Setters automaticamento
        if(!method_exists($this, $name) && strlen($name)>3 && in_array(substr($name,0,3), array('get', 'set'))){
            if(substr($name,0,3)=='get'){
//Getters
                $value = (isset($this->fields->{substr(strtolower($name),3,strlen($name)-3)}))?$this->fields->{substr(strtolower($name),3,strlen($name)-3)}:NULL;
                $value2 = (isset($this->{substr(strtolower($name),3,strlen($name)-3)}))?$this->{substr(strtolower($name),3,strlen($name)-3)}:NULL;
                if($value2!==NULL){
                    return $value2;
                }else{
                    if($value===NULL){
                        return $value2;
                    }elseif($value==0){
                        if($value2===NULL){
                            return $value;
                        }else{
                            return $value2;
                        }
                    }else{
                        return $value;
                    }
                }
            }else{
//Setters
                $this->setChanged();
                $this->fields->{substr(strtolower($name),3,strlen($name)-3)} = $args[0];
                $this->{substr(strtolower($name),3,strlen($name)-3)} = $args[0];
                return $args[0];
            }
        }else{
            if($this) return call_user_func_array(array($this,$name),$args);
        }
    }
    public function toSqlDate($arg, $format = 'Y-m-d H:i:s'){
        if($arg===NULL) return NULL;

        switch(gettype($arg)){
            case 'object':

                if(get_class($arg) === 'DateTime'){

                    return $arg->format($format);

                }else{

                    throw new Exception("O método toSqlDate não entende este objeto.", 1);

                }

                break;
            case 'integer':
                return date($format, $arg);
                break;
            case 'string':
                if(strlen($arg)==0){
                    return '';
                }
                if(strpos($arg,'-')===false){

                    if(strpos($arg,'/')!==false){

                        $args = explode(" ", $arg);

                        $dt = $args[0];
                        $hr = $args[1];
                        $dts = explode("/", $dt);

                        return date($format, strtotime($dts[2]."-".$dts[1]."-".$dts[0]." ".$hr));

                    }else{

                        return date($format, $arg);

                    }

                }else{
                    return date($format, strtotime($arg));
                }
                break;
        }
    }
    public function name_format($name){
        $isUTF8 = false;
        if(mb_detect_encoding($name, "UTF-8, ISO-8859-1")=='UTF-8'){
            $name = utf8_decode($name);
            $isUTF8 = true;
        }
        $name = trim(mb_strtolower($name));
        $nomeCompleto = array();
        foreach(explode(' ', $name) as $palavra){
            if(!in_array($palavra, array('da','do','de','das','dos', 'e'))){
                $palavra = ucwords($palavra);
            }
            $nomeCompleto[] = $palavra;
        }
        if($isUTF8){
            return utf8_encode(implode(' ', $nomeCompleto))
                ;
        }else{
            return implode(' ', $nomeCompleto);
        }
    }

    /** Controle de alterações do Modelo */
    private function getChanged(){
        return $this->changed;
    }
    private function setChanged(){
        $this->changed = true;
    }
    private function setSaved(){
        $this->changed = false;
    }
    /* ************************************** */

    public function getFields($array = true){

        if($array){
            return (array)$this->fields;
        }else{
            return $this->fields;
        }

    }

    public function getSimpleData(){

        $simple = array();
        foreach ($this->getFields(true) as $key => $value) {
            if(
                gettype($value)!='object' &&
                gettype($value)!='array' &&
                !in_array($key, array("syncNotAtendimentoContato", "loadedfrom")) &&
                $value
            ){
                $simple[$key] = $value;
            }

        }
        return $simple;

    }

    public function setError($msg){
        throw new ErrorException($msg);
    }
}

class Alunos extends DefaultObject {

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

		if(gettype($data) == "integer" || gettype($data) == "string"){

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
		WHERE idaluno = $idaluno";

		$result = SQL::arrays($select, false);

		$this->setIdaluno($result['idaluno']);
		$this->setDesaluno($result['desaluno']);
		$this->setInstatus($result['instatus']);
		$this->setDtcadastro($result['dtcadastro']);

		return $result;
	}
}


$Aluno = new Alunos(array(
	"idaluno" => 1,
	"desaluno" => "Aluno1",
	"instatus" => 1,
	"dtcadastro" => "2015-05-23"
));

print_r($Aluno->getDesaluno());
?>