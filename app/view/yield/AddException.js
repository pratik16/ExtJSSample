Ext.define('Regardz.view.yield.AddException', {
	extend : 'Ext.window.Window',
	// extend: 'Ext.panel.Panel',
	alias : 'widget.addexception',
	border : false,
	autoShow : true,
	modal : true,
	title: 'Room Exemption Management_Title'.l('SC74310'),
	initComponent : function () {

		var me = this;

		 me.width = parseInt(Ext.getBody().getViewSize().width / 2.5);
		//me.height = parseInt(Ext.getBody().getViewSize().height / 1.5);
		//me.flex = 1;

		if (Ext.getCmp('addExeptiondataform'))
			Ext.getCmp('addExeptiondataform').destroy();

		me.slotListCombo = new Ext.data.SimpleStore({
				fields : ['name', 'value'],
				data: [['Slot 1'.l('SC74310'), '1'], ['Slot 2'.l('SC74310'), '2'], ['Slot 3'.l('SC74310'), '3']]
			});

		me.barListCombo = new Ext.data.SimpleStore({
				fields : ['name', 'value'],
				data : [['A', '1'], ['B', '2'], ['C', '3'], ['D', '4']]
			});

		me.frame = true;

		me.dateMenu = Ext.create('Ext.menu.DatePicker', {
				handler : function (dp, date) {
				    Ext.Msg.alert('Date Selected'.l('SC74310'), 'You choose'.l('SC74310') +' {0}.', Ext.Date.format(date, 'M j, Y'));

				}
			});

		me.items = [{
				xtype : 'form',
				cls : 'propertyEdit',
				id : 'addExeptiondataform',
				border : false,
				bodyStyle : 'background: none',
				style: "padding:10px;",				
				defaultType : 'textfield',
				//layout: 'form',
				//height: parseInt(Ext.getBody().getViewSize().height/2),
				buttonAlign: 'end',
				defaults: {
                    anchor: '100%',
                    flex: '1'
                },
				items : [
					{
						xtype : 'combo',
						name : 'PropertyId',
						fieldLabel : 'Property Name'.l('SC74310'),
						displayField : 'PropertyName',
						valueField : 'PropertyId',
						emptyText: "Select Property".l('SC74310'),
						//anchor: '100%',
						store: Ext.getStore('common.PropertyForNamesStore'),
						allowBlank : false
					}, {
						xtype : 'combo',
						fieldLabel : 'Time Slot'.l('SC74310'),
						hiddenName : 'TimeSlotId',
						name : 'TimeSlotId',
						store : me.slotListCombo,
						valueField : 'value',
						displayField : 'name',
						minChars : 0,
						allowBlank : false

					}, {
						xtype : 'combo',
						fieldLabel : 'Room Type'.l('SC74310'),
						hiddenName : 'RoomTypeId',
						name : 'RoomTypeId',
						action : 'roomtype',
						store : Ext.getStore('yield.RoomTypeStore'),
						valueField : 'RoomTypeId',
						displayField : 'RoomTypeName',
						minChars : 0,
						allowBlank : false

					}, {
						xtype : 'combo',
						fieldLabel : 'Room'.l('SC74310'),
						hiddenName : 'RoomId',
						name : 'RoomId',
						store : Ext.getStore('yield.RoomStore'),
						valueField : 'RoomId',
						displayField : 'RoomName',
						minChars : 0,
						allowBlank : true

					}, {
						xtype : 'combo',
						fieldLabel : 'Bar'.l('SC74310'),
						hiddenName : 'BarId',
						name : 'BarId',
						store : me.barListCombo,
						valueField : 'value',
						displayField : 'name',
						minChars : 0,
						allowBlank : false

					}, {
						xtype : 'datefield',
						name : 'FromDate',
						fieldLabel : 'From Date'.l('SC74310'),
						// format: 'Y-m-d',
						format : usr_dateformat,
						id : "from_date",
						endDateField : 'to_date',
						submitFormat : 'Y-m-d',
						editable : false,
						vtype : 'daterange',
						allowBlank : false

					}, {
						xtype : 'datefield',
						name : 'ToDate',
						id : 'masterEnd',
						fieldLabel : 'To Date'.l('SC74310'),
						//format: 'Y-m-d',
						format : usr_dateformat,
						submitFormat : 'Y-m-d',
						id : "to_date",
						startDateField : 'from_date',
						editable : false,
						vtype : 'daterange',
						allowBlank : false

					}, {
						xtype : 'textarea',
						name : 'Description',
						height : 55, //ie
						fieldLabel : 'Description'.l('SC74310'),
						allowBlank : false,
						maxLength: 500
					}, {
						xtype : 'hidden',
						name : 'ExemptionId'
					}, {
						xtype : 'hidden',
						name : 'CreatedDate',
						value : Ext.Date.format(new Date(), 'Y-m-d H:i:s')
					}, {
						xtype : 'hidden',
						name : 'CreatedBy',
						value : CurrentSessionUserId
					}, {
						xtype : 'hidden',
						name : 'UpdatedDate'
					}, {
						xtype : 'hidden',
						name : 'UpdatedBy',
						value : CurrentSessionUserId
					}

				],
				buttons : [{
						text : 'Cancel'.l('w'),
						action : 'cancel',
						handler : function () {
							me.destroy();
						}
					}, {
						text : 'Save'.l('w'),
						action : 'exception_save'
					}
				]
			}
		];
		//console.log('end form');
		me.callParent(arguments);
	}
});