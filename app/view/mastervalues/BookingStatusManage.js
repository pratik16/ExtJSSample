Ext.define('Regardz.view.mastervalues.BookingStatusManage', {
	extend : 'Ext.window.Window',
	alias : 'widget.bookingstatusmanage',
	modal : true,
	width : 400,
	border : false,
	title: 'Add Booking Status_Title'.l('SC21310'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('addBookingStatus'))
			Ext.getCmp('addBookingStatus').destroy();

		var me = this;

		me.disableitems = true;
		if (me.bookingStatusId > 0) {
			me.disableitems = false;
		}

		me.items = [{
				xtype : 'form',
				id : 'addBookingStatus',
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
						name : 'BookingStatusId',
						value : me.bookingStatusId
					}, {
						xtype : 'textfield',
						fieldLabel: 'Booking Status'.l('SC21310'),
						name : 'Status',
						allowBlank : false,
						selectOnFocus : true,
						anchor : '100%',
						maxLength: 50
					}, {
						xtype : 'textareafield',
						fieldLabel: 'Description'.l('SC21310'),
						name : 'Description',
						selectOnFocus : true,
						anchor : '100%',
						maxLength: 500
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
						action : 'saveBookingStatus'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});