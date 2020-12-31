Ext.define('Regardz.view.configuration.RoomClassificationManage', {
	extend : 'Ext.window.Window',
	alias : 'widget.roomclassificationmanage',
	modal : true,
	width : 500,
	border : false,
	title : 'Add Room Classification_Title'.l('SC20310'),
	autoShow : true,

	initComponent : function () {

		var me = this;

		me.items = [{
				xtype : 'form',
				id : 'manageRoomClass',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				fileUpload : true,
				items : [{
						xtype : 'hidden',
						name : 'RoomClassificationId',
						value : me.roomClassificationId
					}, {
						xtype : 'hidden',
						name : 'IsActive',
						value : true
					}, {
						xtype : 'textfield',
						fieldLabel : 'Room Classification'.l('SC20300'),
						name : 'Classification',
						allowBlank : false,
						selectOnFocus : true,
						anchor : '100%',
						maxLength: 80
					}, {
						xtype : 'textareafield',
						fieldLabel : 'Description'.l('SC20300'),
						name : 'Description',
						selectOnFocus : true,
						anchor : '100%',
						maxLength: 256
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
						action : 'saveRoomClass'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});