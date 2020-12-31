Ext.define('Regardz.view.configuration.CancellationPenaltyList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.cancellationpenaltylist',
	store : 'configuration.CancellationPenaltyStore',
	loadMask : true,

	initComponent : function () {

		var me = this;

		me.autoHeight = true;
		me.title = 'Cancellation Penalty List_Title'.l('SC20600');
		me.columns = [{
				header : 'From Day'.l('SC20600'),
				dataIndex : 'MinDays',
				flex : 1
			}, {
				header : 'To Day'.l('SC20600'),
				dataIndex : 'MaxDays',
				flex : 1
			}, {
				header : 'Penalty'.l('SC20600'),
				dataIndex : 'Penalty',
				flex : 1
			}, {
				header : 'Rules'.l('SC20600'),
				dataIndex : 'Rules',
				flex : 1
			}, {
				dataIndex : 'CancellationRuleId',
				renderer : this.editCancellationPenalty,
				align : 'center',
				width : 25,
				name : 'CancellationPenaltyEdit',
				hideable : false
			}, {
				dataIndex : 'CancellationRuleId',
				renderer : this.deteleCancellationPenalty,
				align : 'center',
				width : 25,
				name : 'CancellationPenaltyDelete',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'CancellationRuleId',
				hideable : false
			}
		];

		me.tbar = [{
				xtype : 'button',
				action : 'addCancellationPenalty',
				icon : 'public/icons/add_16.png',
				text : 'Add New'.l('SC20600'),
				tooltip : 'Add Cancellation Penalty'.l('SC20600'),
				height : 21
			}
		];

		me.bbar = {
			xtype : 'pagingtoolbar',
			store : this.store,
			displayInfo : true,
			emptyMsg : "No data to display".l("g")
		};

		me.callParent();
	},

	editCancellationPenalty : function (value, metadata, record, rowIndex, colIndex, store) {
		metadata.tdCls = 'icon-edit';
		var tooltipText = "Update Cancellation Penalty".l('SC20600');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';
	},

	deteleCancellationPenalty : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete Cancellation Penalty".l('SC20600');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-delete';
	}

});