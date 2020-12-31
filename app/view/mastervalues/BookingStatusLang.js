Ext.define('Regardz.view.mastervalues.BookingStatusLang', {
	extend : 'Ext.window.Window',
	alias : 'widget.bookingstatuslang',
	modal : false,
	width : 400,
	border : false,
	title: 'Lang Booking Status_Title'.l('SC21320'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('bookingStatusLang'))
			Ext.getCmp('bookingStatusLang').destroy();

		var me = this;
		me.items = [{
				xtype : 'form',
				id : 'bookingStatusLang',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				fileUpload : true,
				items : [{
						xtype : 'combo',
						name : 'LanguageId',
						fieldLabel: 'Lang. for content'.l('SC21320'),
						//queryMode: 'local',
						displayField : 'Name',
						valueField : 'LanguageId',
						emptyText: "Select language for content".l('SC21320'),
						anchor : '100%',
						allowBlank : false,
						store : Ext.getStore('common.LanguageListStore')
					}, {
						xtype : 'hidden',
						name : 'BookingStatusId',
						value : me.bookingStatusId
					}, {
						xtype : 'hidden',
						name : 'LangBookingStatusId',
						value : me.langBookingStatusId
					}, {
						xtype : 'textfield',
						fieldLabel: 'Booking Status'.l('SC21320'),
						name : 'Status',
						allowBlank : false,
						selectOnFocus : true,
						anchor : '100%',
						maxLength: 50
					}, {
						xtype : 'textareafield',
						fieldLabel: 'Description'.l('SC21320'),
						name : 'Description',
						selectOnFocus : true,
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
						action : 'saveBookingStatusLang'
					}
				]
			}
		];

		me.callParent(arguments);
	}
});