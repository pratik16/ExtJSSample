var startingSlotStore = Ext.create('Ext.data.Store', {
		fields : ['TimeSlotId', 'TimeSlotCode'],
		id : 'startingSlotId',
		autoLoad : false,
		proxy : {
			type : 'jsonp',
			url : webAPI_path + 'api/ConfigProgramDefinition/GetStartSlotsByDuration',
			reader : {
				type : 'json',
				root : 'data'
			},
			extraParams : {
				// languageId: user_language
			}
		}
	});
var propertyStore = Ext.create('Ext.data.Store', {
		fields : ['PropertyId', 'PropertyName'],
		autoLoad : false, //load from controller
		proxy : {
			type : 'jsonp',
			url : webAPI_path + 'api/property/PropertyPaging',
			reader : {
				type : 'json',
				root : 'data'
			},
			extraParams : {
				languageId : user_language,
				limit : 0
			},
			baseParams : {
				start : 0
			}

		}
	});

Ext.require([
		'Ext.form.field.ComboBox',
		'Ext.form.FieldSet',
		'Ext.tip.QuickTipManager',
		'Ext.data.*'
	]);
Ext.define('Type', {
	extend : 'Ext.data.Model',
	fields : [{
			type : 'int',
			name : 'TypeId'
		}, {
			type : 'string',
			name : 'TypeName'
		}
	]
});

var typeData = [{
		"TypeId" : "0",
		"TypeName" : "Meeting Package"
	}, {
		"TypeId" : "1",
		"TypeName" : "Catering Package"
	}
];
var typeStore = Ext.create('Ext.data.Store', {
		model : 'Type',
		data : typeData
	});

Ext.define('Duration', {
	extend : 'Ext.data.Model',
	fields : [{
			type : 'int',
			name : 'DurationId'
		}, {
			type : 'int',
			name : 'Duration'
		}
	]
});

var durationData = [{
		"DurationId" : "0",
		"Duration" : "2"
	}, {
		"DurationId" : "1",
		"Duration" : "4"
	}, {
		"DurationId" : "2",
		"Duration" : "8"
	}, {
		"DurationId" : "3",
		"Duration" : "12"
	}
];
var durationStore = Ext.create('Ext.data.Store', {
		model : 'Duration',
		data : durationData
	});

Ext.define('Regardz.view.configuration.FixedPriceManage', {
	extend : 'Ext.window.Window',
	alias : 'widget.fixedpricemanage',
	modal : true,
	width : 400,
	border : false,
	//title: 'Add Fixed Price'.l('RAP-A05-06'),
	title : 'Add Fixed Price_Title'.l('SC22100'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('addFixedPrice'))
			Ext.getCmp('addFixedPrice').destroy();

		var me = this;

		me.disableitems = true;
		if (me.FixedPriceId > 0) {
			me.disableitems = false;
		}

		me.items = [{
				xtype : 'form',
				id : 'addFixedPrice',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				fileUpload : true,
				tbar : ['->', {
						xtype : 'button',
						text: 'Language'.l('g'),
						action : 'LanguageContent',
						disabled : me.disableitems
					}
				],
				items : [{
						xtype : 'hidden',
						name : 'LangFixedPriceId',
						value : me.LangFixedPriceId
					}, {
						xtype : 'hidden',
						name : 'FixedPriceId',
						value : me.FixedPriceId
					}, {
						xtype : 'hidden',
						name : 'LanguageId',
						value : user_language //default lang Id
					}, {
						xtype : 'hidden',
						name : 'IsActive',
						value : false
					}, {
						xtype : 'hidden',
						name : 'TimeSlotcode'
					}, {
						xtype : 'combo',
						fieldLabel : 'Property'.l('SC22000'),
						emptyText : 'Select Property'.l('SC22000'),
						name : 'PropertyId',
						store : propertyStore,
						allowBlank : false,
						// queryMode: 'local',
						displayField : 'PropertyName',
						valueField : 'PropertyId',
						anchor : '100%'
					}, {
						xtype : 'textfield',
						//fieldLabel: 'Fixed Price Package Name'.l('RAP-A05-06'),
						fieldLabel : 'Package Name'.l('SC22000'),
						name : 'Name',
						maxLength : 200,
						allowBlank : false,
						selectOnFocus : true,
						anchor : '100%'
					}, {
						xtype : 'textfield',
						//fieldLabel: 'Description'.l('RAP-A05-06'),
						fieldLabel : 'Description'.l('SC22000'),
						name : 'Description',
						maxLength : 400,
						selectOnFocus : true,
						anchor : '100%'
					}, {
						xtype : 'combo',
						//fieldLabel: 'Duration'.l('RAP-A05-06'),
						fieldLabel : 'Duration'.l('SC22000'),
						name : 'Duration',
						store : durationStore,
						emptyText : 'Select Duration'.l('SC22000'),
						allowBlank : false,
						selectOnFocus : true,
						queryMode : 'local',
						displayField : 'Duration',
						valueField : 'Duration',
						anchor : '100%',
						listeners : {
							scope : this,
							'change' : function (t, newValue, oldValue, eOpts) {
								var param = Ext.getCmp('addFixedPrice').getForm().findField('Duration').getValue();
								startingSlotStore.proxy.setExtraParam('id', param);
								startingSlotStore.load();
							}
						}
					}, {
						xtype : 'combo',
						store : startingSlotStore, // slotStore,
						fieldLabel : 'Starting Slot'.l('SC22000'),
						name : 'StartingSlotId',
						allowBlank : false,
						emptyText : 'Select Slot'.l('SC22000'),
						displayField : 'TimeSlotCode',
						queryMode : 'local',
						valueField : 'TimeSlotId',
						anchor : '100%',
						listeners : {
							scope : this,
							'select' : function () {
								var temp = Ext.getCmp('addFixedPrice').getForm().findField('StartingSlotId').getValue();
								if (temp == 1) {
									Ext.getCmp('addFixedPrice').getForm().findField('TimeSlotcode').setValue('Slot1');
								} else if (temp == 2) {
									Ext.getCmp('addFixedPrice').getForm().findField('TimeSlotcode').setValue('Slot2');
								} else {
									Ext.getCmp('addFixedPrice').getForm().findField('TimeSlotcode').setValue('Slot3');
								}
							}
						}

					}, {
						xtype : 'combo',
						fieldLabel : 'Type'.l('SC22000'),
						emptyText : 'Select Type'.l('SC22000'),
						name : 'TypeId',
						store : typeStore,
						allowBlank : false,
						queryMode : 'local',
						displayField : 'TypeName',
						valueField : 'TypeId',
						anchor : '100%'
					}, {
						xtype : 'hidden',
						name : 'PropertyFeatureIds',
						value : 0
					}, {
						xtype : 'label',
						text : 'Property Features:'.l('SC22000')
					}, {
						xtype : 'form',
						padding : '0 0 0 100',
						frame : true,
						border : false,
						style : 'background:none; border:0px;',
						id : 'proprertyFeature'
					}, {
						xtype : 'hidden',
						name : 'CreatedDate'
					}, {
						xtype : 'hidden',
						name : 'CreatedBy'
					}, {
						xtype : 'hidden',
						name : 'UpdatedDate'
					}, {
						xtype : 'hidden',
						name : 'UpdatedBy'
					}
				],
				buttons : [{
						text : 'Cancel'.l('w'),
						scope : me,
						handler : function () {
							this.close();
						}
					}, {
						text : 'Save'.l('w'),
						action : 'saveFixedPrice'
					}
					//            , {
					//                text: 'Next', //.l('w'),
					//                action: 'next'
					//            }
				]
			}
		];
		me.callParent(arguments);
	}
});
