Ext.define('Regardz.view.configuration.RoomAvailabilityStatusEdit', {
	extend : 'Ext.window.Window',
	alias : 'widget.roomavailstedit',
	modal : true,
	width : 500,
	border : false,
	title : 'Update Room Availability Status_Title'.l('SC20210'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('editRoomAvailabilityStatus'))
			Ext.getCmp('editRoomAvailabilityStatus').destroy();

		var me = this;
		me.items = [{
				xtype : 'form',
				id : 'editRoomAvailabilityStatus',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				fileUpload : true,
				items : [{
						xtype : 'hidden',
						name : 'RoomAvailabilityId',
						value : me.roomAvailabilityId
					}, {
						xtype : 'hidden',
						name : 'AvailabilityStatus',
						value : me.availabilityStatus
					}, {
						xtype : 'textfield',
						fieldLabel : 'Display Name'.l('SC20200'),
						name : 'DisplayName',
						allowBlank : false,
						selectOnFocus : true,
						anchor : '100%',
						maxLength: 150
					}, {
						xtype : 'displayfield',
						fieldLabel : 'Status'.l('SC20200'),
						value : me.availabilityStatus
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
						action : 'saveRoomAvail'
					}
				]
			}
		];
		//console.log('end form');
		me.callParent(arguments);
	}
});