Ext.define('Regardz.view.property.ManageBlockedLinkedRooms', {
	extend : 'Ext.window.Window',
	alias : 'widget.blocklinkedroom',
	modal : false,
	width : parseInt(Ext.getBody().getViewSize().width / 2),
	border : false,
	title : 'Manage Blocked Linked Room_Title'.l('SC33300'),

	initComponent : function () {

		var me = this;

		if (Ext.getCmp('manageBlockedRoomLink')) {
			Ext.getCmp('manageBlockedRoomLink').destroy();
		}

		if (Ext.getCmp('linkedRoomListp')) {
			Ext.getCmp('linkedRoomListp').destroy();
		}

		me.items = [{
				xtype : 'form',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				defaultType : 'textfield',
				cls : 'propertyEdit',
				layout : 'form',
				id : 'manageBlockedRoomLink',
				//me.autoHeight: true,
				autoScroll : true,
				height : 300,
				//height: parseInt(Ext.getBody().getViewSize().height/2),
				buttonAlign : 'center',
				items : [{
						xtype : 'hidden',
						name : 'roomId'
					},
					/*{
					xtype: 'checkbox',
					name: 'isAllowedAnyRoomType',
					fieldLabel: 'Allowed any room type?'.l('SC33300'),
					allowBlank: true,
					action: 'isAllowedRoomType'
					},*/
					{
						xtype : 'form',
						id : 'linkedRoomListp'
					}

				],
				buttons : [{
						text : 'Save'.l('w'),
						action : 'saveBlockedLinkedRoom'
					}, {
						text : 'Cancel'.l('w'),
						action : 'cancel',
						handler : function () {
							me.destroy();
						}
					}
				]
			}
		];
		//console.log('end form');
		me.callParent(arguments);
	}
});