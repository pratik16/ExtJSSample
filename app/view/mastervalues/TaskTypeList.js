Ext.define('Regardz.view.mastervalues.TaskTypeList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.tasktypelist',

	store : 'mastervalues.TaskTypeStore',

	loadMask : true,

	initComponent : function () {

		var me = this;
		me.autoHeight = true;
		me.title = "TaskType List_Title".l('SC21400');
		me.columns = [{
				header : 'TaskType Name'.l('SC21400'),
				dataIndex : 'Name',
				flex : 1
			}, {
				dataIndex : 'TaskTypeId',
				renderer : this.editTaskType,
				align : 'center',
				width : 25,
				name : 'TaskTypeEdit',
				hideable : false
			}, {
				dataIndex : 'TaskTypeId',
				renderer : this.deteleTaskType,
				align : 'center',
				width : 25,
				name : 'TaskTypeDelete',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'TaskTypeId',
				align : 'center',
				hideable : false
			}
		];

		me.tbar = [{
				xtype : 'button',
				action : 'addTaskType',
				iconCls : 'new',
				text : 'Add New'.l('SC21400'),
				tooltip : 'Add TaskType'.l('SC21400'),
				height : 21
			}
		];

		me.bbar = {
			xtype : 'pagingtoolbar',
			store : this.store,
			displayInfo : true,
			emptyMsg: "No data to display".l("g")
		};

		me.callParent();
	},

	editTaskType : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update TaskType".l('SC21400');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';
	},

	deteleTaskType : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete TaskType".l('SC21400');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-delete';
	}

});