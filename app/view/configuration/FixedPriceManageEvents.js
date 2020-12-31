var FixedPriceEventsStore = Ext.create('Ext.data.Store', {
		fields : ['EventId', 'EventName'],
		autoLoad : false, //module is hide as autoload is temp stop
		proxy : {
			type : 'jsonp',
			url : webAPI_path + 'api/FixedPrice/GetEvents',
			reader : {
				type : 'json',
				root : 'data'
			},
			extraParams : {
				id : user_language
			}
		}
	});

Ext.define('Regardz.view.configuration.FixedPriceManageEvents', {
	extend : 'Ext.window.Window',
	alias : 'widget.fixedpricemanageevents',
	modal : true,
	width : 400,
	border : false,
	//title: 'Add Fixed Price'.l('RAP-A05-06'),
	title : 'Add Event_Title'.l('SC22210'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('addFixpriceEvent'))
			Ext.getCmp('addFixpriceEvent').destroy();

		var me = this;
		me.disableitems = true;
		if (me.itemCategoryId > 0) {
			me.disableitems = false;
		}
		me.items = [{
				xtype : 'form',
				id : 'addFixedPriceEvent',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				fileUpload : true,
				//tbar: ['->', { xtype: 'button', text: 'Language', action: 'LanguageContent', disabled: me.disableitems}],
				items : [{
						xtype : 'hidden',
						name : 'FixedPriceEventId',
						value : me.FixedPriceEventId
					}, {
						xtype : 'hidden',
						name : 'EventName'
					}, {
						xtype : 'hidden',
						name : 'FixedPriceId',
						value : me.FixedPriceId
					}, {
						xtype : 'combo',
						store : FixedPriceEventsStore,
						fieldLabel : 'Event Name'.l('SC22200'),
						name : 'EventId',
						emptyText : 'Select Slot'.l('SC22200'),
						displayField : 'EventName',
						allowBlank : false,
						labelWidth : 130,
						queryMode : 'local',
						valueField : 'EventId',
						listeners : {
							scope : this,
							'select' : function () {
								var temp = Ext.getCmp('addFixedPriceEvent').getForm().findField('EventId').getRawValue();
								Ext.getCmp('addFixedPriceEvent').getForm().findField('EventName').setValue(temp);
								//alert(temp);
							}
						}
					}, {
						xtype : 'timefield',
						fieldLabel : 'Start Time'.l('SC22200'), //.l('SC20411'),
						labelWidth : 130,
						name : 'StartTime',
						emptyText : 'Start Time'.l('SC22200'),
						forceSelection : false,
						selectOnFocus : true,
						format : 'H:i:s',
						increment : 30,
						listeners : {
							'change' : function () {
								//alert('l');
								var s = Ext.getCmp('addFixedPriceEvent').getForm().findField('StartTime').getValue();
								Ext.getCmp('addFixedPriceEvent').getForm().findField('EndTime').setMinValue(s);
							}
						}
					}, {
						xtype : 'timefield',
						fieldLabel : 'End Time'.l('SC22200'), //.l('SC20411'),
						labelWidth : 130,
						name : 'EndTime',
						emptyText : 'End Time'.l('SC22200'),
						format : 'H:i:s',
						forceSelection : false,
						selectOnFocus : true,
						increment : 30,
						listeners : {
							'change' : function () {
								var e = Ext.getCmp('addFixedPriceEvent').getForm().findField('EndTime').getValue();
								Ext.getCmp('addFixedPriceEvent').getForm().findField('StartTime').setMaxValue(e);
								//alert('l');
								//                             var s = Ext.getCmp('addFixedPriceEvent').getForm().findField('StartTime').getValue(); //alert(s);
								//                             if (s != '' || s != null || s != 'undefined') {
								//                                 var e = Ext.getCmp('addFixedPriceEvent').getForm().findField('EndTime').getValue();
								//                                 if (s > e) {
								//                                     Ext.Msg.alert('Warning!', 'End Time Shoud be greater than Start Time');
								//                                     Ext.getCmp('addFixedPriceEvent').getForm().findField('EndTime').reset();
								//                                 }
								//}
							}
						}
					}, {
						xtype : 'checkboxfield',
						//fieldLabel: 'Event Time is same as Booking Time',
						boxLabel : 'Event Time is same as Booking Time'.l('SC22000'),
						name : 'IsAntSlot',
						inputValue : 'true',
						labelWidth : 130,
						uncheckedValue : 'false',
						listeners : {
							scope : this,
							'change' : function () {
								//alert('checked');
								if (Ext.getCmp('addFixedPriceEvent').getForm().findField('IsAntSlot').getValue() == true) {
									//alert('checked');
									Ext.getCmp('addFixedPriceEvent').getForm().findField('StartTime').setValue('');
									Ext.getCmp('addFixedPriceEvent').getForm().findField('EndTime').setValue('');
								}
							}
						}
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
						action : 'saveFixedPriceEvent'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});