///*Minified by P*/
Ext.define('Regardz.view.yield.ExceptionList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.exceptionlist',
	store : 'yield.YieldExceptionStore',
	requires : ['Ext.ux.form.SearchField'],
	initComponent : function () {
		var me = this;
		me.title = "Exception List_Title".l('SC74300');
		me.columns = [{
				header : 'Property Name'.l('SC74300'),
				dataIndex : 'PropertyName',
				flex : 1,
				name : 'PropertyName'
			}, {
				header : 'From Date'.l('SC74300'),
				dataIndex : 'FromDate',
				flex : 1,
				name : 'FromDate',
				renderer : this.dateRenderer
			}, {
				header : 'To Date'.l('SC74300'),
				dataIndex : 'ToDate',
				flex : 1,
				name : 'ToDate',
				renderer : this.dateRenderer
			}, {
				header : 'Room Type'.l('SC74300'),
				dataIndex : 'RoomTypeName',
				flex : 1,
				name : 'RoomTypeName'
			}, {
				header : 'Time Slot'.l('SC74300'),
				dataIndex : 'TimeSlotCode',
				name : 'TimeSlotCode',
				width : 150
			}, {
				header : 'Bar'.l('SC74300'),
				dataIndex : 'BarName',
				name : 'BarName',
				width : 150
			}, {
				hidden : true,
				dataIndex : 'PropertyId'
			}, {
				dataIndex : 'ExemptionId',
				align : 'center',
				width : 25,
				name : 'deleteException',
				renderer : this.deleteExceptionIcon
			}
		];
		me.tbar = [{
				xtype : 'button',
				iconCls : 'new',
				text: 'Add new'.l('SC74300'),
				tooltip : 'Add new_tooltip'.l('SC74300'),
				action : 'addNewException'
			}, {
				xtype : 'combo',
				name : 'PropertyId',
				fieldLabel : 'Property Name'.l('SC74300'),
				displayField : 'PropertyName',
				valueField : 'PropertyId',
				action : 'getNewExceptionList',
				emptyText: "Select Property".l('SC74300'),
				triggerAction : 'all',
				queryMode : 'local',
				forceSelection : true,
				typeAhead : true,
				mode : 'local',
				store : Ext.getStore('common.PropertyForNamesStore')
			}
		];
		me.layout = 'fit';
		me.autoScroll = true;
		me.height = 250;
		me.viewConfig = {
			forceFit : true
		};
		me.bbar = {
			xtype : 'pagingtoolbar',
			store : Ext.getStore('yield.YieldExceptionStore'),
			displayInfo : true//,
			//displayMsg : 'Displaying topics {0} - {1} of {2}'
		};
		me.callParent()
	},
	deleteExceptionIcon : function (value, metadata, record, rowIndex, colIndex, store) {
	    var tooltipText = "Delete Exception".l('SC74300');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-delete';
	},
	dateRenderer : function (value, metadata, record, rowIndex, colIndex, store) {
		var d = Ext.Date.parse(value, 'c');
		return Ext.util.Format.date(d, usr_dateformat);
	}
});