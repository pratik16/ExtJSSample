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
				languageId : user_language,userId: CurrentSessionUserId,searchParam:'',
				limit : 0
			},
			baseParams : {
				start : 0
			}

		}
	});

Ext.define('Regardz.view.tempmodule.RoomAvailabilityBlock', {
	extend : 'Ext.window.Window',
	alias : 'widget.roomavailabilityblock',
	modal : true,
	width : 400,
	border : false,
	title : 'Room Availability Block',
	autoShow : true,

	initComponent : function () {

		var me = this;

		me.items = [{
				xtype : 'form',
				border : false,
				id : 'roomAvailabilityBlock',
				bodyStyle : 'background: none',
				style : "padding:10px;",
				fileUpload : true,
				items : [{
						xtype : 'hidden',
						name : 'RoomAvailabilityBlockId',
						value : me.RoomAvailabilityBlockId
					}, , {
						xtype : 'hidden',
						name : 'SlotIds',
						value : 0
					}, {
						xtype : 'combo',
						fieldLabel : 'Property',
						emptyText : 'Select Property',
						name : 'PropertyId',
						itemId : 'RoomAvailabilityBlockProperty',
						store : propertyStore,
						allowBlank : false,
						displayField : 'PropertyName',
						valueField : 'PropertyId',
						anchor : '100%'
					}, {
						xtype : 'combo',
						fieldLabel : 'Roomtype',
						name : 'RoomTypeId',
						store : Ext.getStore('configuration.RoomTypesByPropertyStore'),
						emptyText : 'Select RoomType',
						allowBlank : false,
						selectOnFocus : true,
						queryMode : 'local',
						displayField : 'RoomTypeName',
						valueField : 'RoomTypeId',
						anchor : '100%'
					}, {
						xtype : 'combo',
						store : Ext.getStore('configuration.RoomsByPropertyAndTypeStore'),
						fieldLabel : 'Room',
						name : 'RoomId',
						allowBlank : false,
						emptyText : 'Select Room',
						displayField : 'RoomName',
						valueField : 'RoomId',
						anchor : '100%'

					}, {
						xtype : 'datefield',
						fieldLabel : 'Start Date',
						name : 'StartDate',
						allowBlank : false,
						format : usr_dateformat,
						submitFormat : 'Y-m-d',
						anchor : '100%',
						listeners : {
							'change' : function () {
								var s = Ext.getCmp('roomAvailabilityBlock').getForm().findField('StartDate').getValue();
								Ext.getCmp('roomAvailabilityBlock').getForm().findField('EndDate').setMinValue(s);
							}
						}
					}, {
						xtype : 'datefield',
						fieldLabel : 'End Date',
						name : 'EndDate',
						allowBlank : false,
						format : usr_dateformat,
						submitFormat : 'Y-m-d',
						anchor : '100%',
						listeners : {
							'change' : function () {
								var e = Ext.getCmp('roomAvailabilityBlock').getForm().findField('EndDate').getValue();
								Ext.getCmp('roomAvailabilityBlock').getForm().findField('StartDate').setMaxValue(e);
							}
						}
					},
					{
						xtype : 'panel',
						layout : 'hbox',
						bodyStyle : 'background: none',
						border : false,
						items : [{
								xtype : 'label',
								width : 100,
								text : 'Slots:'
							},
							{
								xtype : 'form',
								padding : '0 0 0 0',
								frame : true,
								border : false,
								style : 'background:none; border:0px;',
								id : 'slot'
							}
						]
					}, {
						xtype : 'textarea',
						fieldLabel : 'Comments',
						name : 'Comment',
						allowBlank : false,
						anchor : '100%',
						maxLength: 500
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
						action : 'saveRoomAvailabilityBlock'
					} //, {text:'test',action:'test'}

				]
			}
		];
		me.callParent(arguments);
	}
});