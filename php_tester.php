<?php
Datefield
{
	xtype: 'datefield',
	format:'d/m/Y',
	fieldLabel: 'Data de Nascimento',
	id:'idsolicitacaosecretariadtnascaluno',
}
Textfield
{
	xtype:"textfield",
	width:127,
	id:"idsolicitacaosecretariacelularaluno"
}
Numberfield
{
	xtype:'numberfield',
	id:'idnbadmdescontomaior',
	fieldLabel:'% Maior',
	enableKeyEvents: true,
	maxValue: 100,
	listeners:{
		'blur': function($this){
			fn_enableDia({
				nmfield: $this,
				descontoitemtipo: 'mensalidade'
			});
		},
		'keydown': function($this, e){
			
			if(e.getKey() == e.ENTER){
				
				fn_enableDia({
					nmfield: $this,
					descontoitemtipo: 'mensalidade'
				});
			}
		}
	}
}

Checkbox
,{
	xtype:'compositefield',
	hideLabel: true,
	items:[{
		xtype:'displayfield',
		value:'Apresentar carta de desconto: '
	},{
		xtype:'checkbox',
		id:'ckcartadesconto'
	}]
}

{
	xtype: 'combo',
	fieldLabel:'Tipo de Desconto',
	width:200,
	valueField: 'iddescontotipo',
	displayField: 'desdescontotipo',
	typeAhead: true,
	mode: 'local',
	triggerAction: 'all',
	emptyText: 'Selecione o tipo de desconto.',
	selectOnFocus: true,
	id: 'cmbadmdescontotipodesc',
	allowBlank: false,
	store:storelist_descontoTipoList,
	listeners:{
		'select':function(combo, record, index){
		}
	}
}
?>