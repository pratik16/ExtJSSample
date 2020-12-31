Ext.define('Regardz.view.configuration.EventsList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.eventslist',

	store : 'configuration.EventsStore',

	loadMask : true,

	initComponent : function () {

		var me = this;
		me.autoHeight = true;
		me.title = 'Events List_Title'.l('SC20700');
		me.columns = [{
				header : 'Events Name'.l('SC20700'),
				dataIndex : 'EventName',
				flex : 1
			}, {
				dataIndex : 'EventId',
				align : 'center',
				width : 25,
				renderer : this.editEvents,
				name : 'EventsEdit',
				hideable : false
			}, {
				dataIndex : 'EventId',
				align : 'center',
				width : 25,
				renderer : this.deteleEvents,
				name : 'EventsDelete',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'EventId',
				align : 'center'
			}
		];

		me.tbar = [{
				xtype : 'button',
				action : 'addEvents',
				iconCls : 'new',
				text : 'Add New'.l('SC20700'),
				tooltip : 'Add Event'.l('SC20700')
			}
		];

		me.bbar = {
			xtype : 'pagingtoolbar',
			store : this.store,
			displayInfo : true,
			emptyMsg : "No data to display".l('g')
		};

		me.callParent();
	},

	editEvents : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update Event".l('SC20700');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';
	},

	deteleEvents : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete Event".l('SC20700');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-delete';
	}

});