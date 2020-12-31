Ext.define('Regardz.view.configuration.EventsManage', {
	extend : 'Ext.window.Window',
	alias : 'widget.eventsmanage',
	modal : true,
	width : 400,
	border : false,
	title : 'Add Event_Title'.l('SC20710'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('addEvents'))
			Ext.getCmp('addEvents').destroy();

		var me = this;

		me.disableitems = true;
		if (me.eventId > 0) {
			me.disableitems = false;
		}

		me.items = [{
				xtype : 'form',
				id : 'addEvents',
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
						name : 'LanguageId',
						value : user_language
					}, {
						xtype : 'hidden',
						name : 'EventId',
						value : me.eventId
					}, {
						xtype : 'textfield',
						fieldLabel : 'Event Name'.l('SC20700'),
						name : 'EventName',
						allowBlank : false,
						selectOnFocus : true,
						anchor : '100%',
						maxLength: 50
					}, {
						xtype : 'checkboxfield',
						name : 'IsOnline',
						padding : '0 0 0 105px',
						boxLabel : 'Is Online'.l('SC20700'),
						inputValue : 'true',
						uncheckedValue : 'false',
						value : me.isOnline
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
						text : 'Cancel'.l('g'),
						scope : me,
						handler : function () {
							this.close();
						}
					}, {
						text : 'Save'.l('g'),
						action : 'saveEvents'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});