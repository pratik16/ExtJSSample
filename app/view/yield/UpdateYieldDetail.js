Ext.define('Regardz.view.yield.UpdateYieldDetail', {
	extend : 'Ext.window.Window',
	alias : 'widget.updateyielddetail',
	border : false,
	title: 'Update Yield Detail_Title'.l('SC74200'),
	store : 'usermanage.PropertyListComboStore',
	initComponent : function () {

		var me = this;

		me.modal = true;
		me.slotListCombo = new Ext.data.SimpleStore({
				fields : ['name', 'value'],
				data: [['Slot 1'.l('SC74200'), 1], ['Slot 2'.l('SC74200'), 2], ['Slot 3'.l('SC74200'), 3]]
			});

		me.barListCombo = new Ext.data.SimpleStore({
				fields : ['name', 'BarId'],
				data : [['A', 1], ['B', 2], ['C', 3], ['D', 4],['X',5]]
			});

		if (Ext.getCmp('updateyielddataform')) {
			Ext.getCmp('updateyielddataform').destory();
		}

		me.frame = true;

		me.items = [{
				xtype : 'form',
				cls : 'propertyEdit',
				id : 'updateyielddataform',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				defaultType : 'textfield',
				//layout: 'form',
				//height: parseInt(Ext.getBody().getViewSize().height/2),
				buttonAlign : 'end',
				items : [

					{
						xtype : 'combo',
						fieldLabel: 'Bar'.l('SC74200'),
						hiddenName : 'BarId',
						name : 'BarId',
						store : me.barListCombo,
						valueField : 'BarId',
						displayField : 'name',
						minChars : 0,
						allowBlank : true
					}, {
						xtype : 'hidden',
						name : 'CreatedDate'
					}, {
						xtype : 'hidden',
						name : 'CreatedBy',
						value : 0
					}, {
						xtype : 'hidden',
						name : 'UpdatedDate'
					}, {
						xtype : 'hidden',
						name : 'UpdatedBy',
						value : 0
					}, {
						xtype : 'hidden',
						name : 'YieldId'
					}, {
						xtype : 'hidden',
						name : 'PropertyId',
						value : 0
					}, {
						xtype : 'hidden',
						name : 'TimeSlotId',
						value : 0
					}, {
						xtype : 'hidden',
						name : 'Date',
						value : 0
					}, {
						xtype : 'hidden',
						name : 'WeekNo',
						value : 0
					}, {
						xtype : 'hidden',
						name : 'Day',
						value : 0
					}

				],
				buttons : [{
						text : 'Cancel'.l('w'),
						action : 'cancel',
						handler : function () {
							me.destroy();
						}
					}, {
					    text: 'Save'.l('w'),
						action : 'yieldupdate_save'
					}
				]
			}
		];
		//console.log('end form');
		me.callParent(arguments);
	}
});