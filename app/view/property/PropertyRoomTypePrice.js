Ext.define('Regardz.view.property.PropertyRoomTypePrice', {
	extend : 'Ext.window.Window',
	alias : 'widget.propertyroomtypeprice',
	modal : true,
	width : 525,
	border : false,
	title: 'Room Type Price Manage_Title'.l('SC31810'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('addRoomTypePrice'))
			Ext.getCmp('addRoomTypePrice').destroy();

		var me = this;

		me.items = [{
				xtype : 'panel',
				layout : 'anchor',
				frame : true,
				defaults : {
					anchor : '100%'
				},
				items : [{
						xtype : 'form',
						id : 'addRoomTypePrice',
						border : false,
						bodyStyle : 'background: none',
						style : "padding:10px;",
						items : [{
								xtype : 'hidden',
								name : 'RoomTypeId',
								value : me.RoomTypeId
							}, {
								xtype : 'hidden',
								name : 'PropertyId',
								value : me.PropertyId
							}, {
								xtype : 'hidden',
								name : 'RoomTypePropertyAssociationId',
								value : 0
							}, {
								xtype : 'label',
								text: 'Room Type Price'.l('SC31810')
							}, {
								xtype : 'fieldset',
								border : false,
								//padding: '0 0 0 105',
								fieldLabel: 'Room Type Price'.l('SC31810'),
								layout : 'hbox',
								defaults : {
									xtype : 'textfield'
								},
								items : [{
										layout : 'vbox',
										xtype : 'fieldcontainer',
										items : [{
												xtype : 'label',
												text: 'BAR'.l('SC31810')
											}, {
												padding : 7,
												xtype : 'label',
												text: 'A'.l('SC31810')
											}, {
												padding : 10,
												xtype : 'label',
												text: 'B'.l('SC31810')
											}, {
												padding : 10,
												xtype : 'label',
												text: 'C'.l('SC31810')
											}, {
												padding : 10,
												xtype : 'label',
												text: 'D'.l('SC31810')
											}
										]
									}, {
										xtype : 'fieldcontainer',
										padding : 5,
										items : [{
												padding : 5,
												xtype : 'label',
												text: '1 Slot'.l('SC31810')
											}, {
												padding : 5,
												xtype : 'textfield',
												allowBlank : false,
												name : 'BarASlot1',
												vtype : 'decimalValue'
											}, {
												padding : 5,
												xtype : 'textfield',
												allowBlank : false,
												name : 'BarBSlot1',
												vtype : 'decimalValue'
											}, {
												padding : 5,
												xtype : 'textfield',
												allowBlank : false,
												name : 'BarCSlot1',
												vtype : 'decimalValue'
											}, {
												padding : 5,
												xtype : 'textfield',
												allowBlank : false,
												name : 'BarDSlot1',
												vtype : 'decimalValue'
											}
										]
									}, {
										xtype : 'fieldcontainer',
										padding : 5,
										items : [{
												padding : 5,
												xtype : 'label',
												text: '2 Slot'.l('SC31810')
											}, {
												padding : 5,
												xtype : 'textfield',
												allowBlank : false,
												name : 'BarASlot2',
												vtype : 'decimalValue'
											}, {
												padding : 5,
												xtype : 'textfield',
												allowBlank : false,
												name : 'BarBSlot2',
												vtype : 'decimalValue'
											}, {
												padding : 5,
												xtype : 'textfield',
												allowBlank : false,
												name : 'BarCSlot2',
												vtype : 'decimalValue'
											}, {
												padding : 5,
												xtype : 'textfield',
												allowBlank : false,
												name : 'BarDSlot2',
												vtype : 'decimalValue'
											}
										]
									}, {
										xtype : 'fieldcontainer',
										padding : 5,
										items : [{
												padding : 5,
												xtype : 'label',
												text: '3 Slot'.l('SC31810'),
												vtype : 'decimalValue'
											}, {
												padding : 5,
												xtype : 'textfield',
												allowBlank : false,
												name : 'BarASlot3',
												vtype : 'decimalValue'
											}, {
												padding : 5,
												xtype : 'textfield',
												allowBlank : false,
												name : 'BarBSlot3',
												vtype : 'decimalValue'
											}, {
												padding : 5,
												xtype : 'textfield',
												allowBlank : false,
												name : 'BarCSlot3',
												vtype : 'decimalValue'
											}, {
												padding : 5,
												xtype : 'textfield',
												allowBlank : false,
												name : 'BarDSlot3',
												vtype : 'decimalValue'
											}
										]
									}
								]
							}, {
								xtype : 'label',
								text: 'Minimum revenue'.l('SC31810') + ':'
							}, {
								xtype : 'fieldset',
								border : false,
								//padding: '0 0 0 105',
								fieldLabel: 'Minimum revenue'.l('SC31810'),
								layout : 'hbox',
								defaults : {
									xtype : 'textfield'
								},
								items : [{
										layout : 'vbox',
										padding : 5,
										xtype : 'fieldcontainer',
										items : [{
												xtype : 'label',
												labelWidth : 125,
												text: 'BAR'.l('SC31810')
											}, {
												padding : 10,
												xtype : 'label',
												text: 'A'.l('SC31810')
											}, {
												padding : 10,
												xtype : 'label',
												text: 'B'.l('SC31810')
											}, {
												padding : 10,
												xtype : 'label',
												text: 'C'.l('SC31810')
											}, {
												padding : 10,
												xtype : 'label',
												text: 'D'.l('SC31810')
											}
										]
									}, {
										xtype : 'fieldcontainer',
										padding : 5,
										items : [{
												xtype : 'label',
												padding : 10,
												labelWidth : 125,
												text : ''
											}, {
												padding : 10,
												xtype : 'textfield',
												allowBlank : false,
												vtype : 'decimalValue',
												name : 'BarAMR'
											}, {
												padding : 10,
												xtype : 'textfield',
												allowBlank : false,
												vtype : 'decimalValue',
												name : 'BarBMR'
											}, {
												padding : 10,
												xtype : 'textfield',
												allowBlank : false,
												vtype : 'decimalValue',
												name : 'BarCMR'
											}, {
												padding : 10,
												xtype : 'textfield',
												allowBlank : false,
												vtype : 'decimalValue',
												name : 'BarDMR'
											}
										]
									}
								]
							}
						]
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
						action : 'saveRoomTypePrice'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});