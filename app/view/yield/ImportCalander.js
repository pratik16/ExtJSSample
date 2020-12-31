///*Minified by P*/
Ext.define('Regardz.view.yield.ImportCalander', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.importcalander',
	border : false,
	title: 'Import Yield Template Data_Title'.l('SC74100'),
	initComponent : function () {
		var me = this;
		if (Ext.getCmp('importyielddataform')) {
			Ext.getCmp('importyielddataform').destroy();
		}
		me.monthListCombo = new Ext.data.SimpleStore({
				fields : ['monthName', 'monthId'],
				data: [['January'.l('g'), 1], ['February'.l('g'), 2], ['March'.l('g'), 3], ['April'.l('g'), 4], ['May'.l('g'), 5], ['June'.l('g'), 6], ['July'.l('g'), 7], ['August'.l('g'), 8], ['September'.l('g'), 9], ['October'.l('g'), 10], ['November'.l('g'), 11], ['December'.l('g'), 12]]
			});
		var curr_year = new Date().getFullYear();
		me.yearListCombo = new Ext.data.SimpleStore({
				fields : ['yearId', 'yearName'],
				data : [[curr_year, curr_year], [curr_year + 1, curr_year + 1]]
			});
		me.frame = true;
		me.items = [{
				xtype : 'form',
				cls : 'propertyEdit',
				id : 'importyielddataform',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				defaultType : 'textfield',
				buttonAlign : 'left',
				items : [{
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
						xtype : 'combo',
						layout : 'form',
						name : 'PropertyId',
						action : 'propertyToCalendar',
						fieldLabel: 'Property'.l('SC74100'),
						displayField : 'PropertyName',
						valueField : 'PropertyId',
						emptyText: "Select Property".l('SC74100'),
						store : Ext.getStore('common.PropertyForNamesStore')
					}, {
						xtype : 'combo',
						fieldLabel : 'From Month'.l('SC74100'),
						hiddenName : 'fromMonth',
						name : 'fromMonth',
						store : me.monthListCombo,
						forceSelection : true,
						typeAhead : false,
						triggerAction : 'all',
						valueField : 'monthId',
						displayField : 'monthName',
						mode : 'local',
						minChars : 0,
						allowBlank : true,
						editable : false
					}, {
						xtype : 'combo',
						fieldLabel : 'From Year'.l('SC74100'),
						hiddenName : 'year',
						name : 'year',
						store : me.yearListCombo,
						forceSelection : true,
						typeAhead : false,
						triggerAction : 'all',
						valueField : 'yearId',
						displayField : 'yearName',
						mode : 'local',
						minChars : 0,
						allowBlank : true,
						editable : false
					}, {
						xtype : 'displayfield',
						height : 25
					}
				],
				buttons : [{
						text : 'Cancel'.l('w'),
						action : 'cancel',
						handler : function () {
							me.destroy()
						}
					}, {
						text : 'Import Yield Template Data'.l('SC74100'),
						action : 'import_yield_data'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});