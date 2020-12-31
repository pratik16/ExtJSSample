Ext.define('Regardz.view.configuration.DepartmentManageList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.departmentmanagelist',
	store : 'configuration.DepartmentManageStore',
	loadMask : true,

	initComponent : function () {

		var me = this;
		me.autoHeight = true;
		me.title = 'Department List_Title'.l('SC23000');
		me.columns = [{
				header : 'Department Name'.l('SC23000'),
				dataIndex : 'DepartmentName',
				flex : 1
			}, {
				header : 'Code'.l('SC23000'),
				dataIndex : 'DeptCode',
				flex : 1
			}, {
				header : 'Description'.l('SC23000'),
				dataIndex : 'Description',
				flex : 1
			},
			//{ header: 'Active', dataIndex: 'IsActive', renderer: this.EncryptDepartment, align: 'center', flex: 1 },
			{
				header : 'CRO'.l('SC23000'),
				dataIndex : 'IsCRO',
				renderer : this.EncryptDepartment,
				align : 'center',
				flex : 1
			}, {
				dataIndex : 'DepartmentId',
				align : 'center',
				width : 25,
				renderer : this.DepartmentEdit,
				name : 'DepartmentEdit',
				hideable : false
			}, {
				dataIndex : 'DepartmentId',
				align : 'center',
				width : 25,
				renderer : this.DepartmentDelete,
				name : 'DepartmentDelete',
				hideable : false
			}, {
				dataIndex : 'IsActive',
				renderer : this.DepartmentStatus,
				align : 'center',
				width : 25,
				name : 'DepartmentStatus',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'DepartmentId',
				align : 'center',
				hideable : false
			}
		];

		me.tbar = [{
				xtype : 'button',
				action : 'addDepartment',
				iconCls : 'new',
				text : 'Add New'.l('SC23000'),
				tooltip : 'Add Department'.l('SC23000')
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
	EncryptDepartment : function (value, metadata, record, rowIndex, colIndex, store) {
		if (value == true)
			return "Yes".l('g');
		else
			return "No".l('g');
	},
	DepartmentEdit : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update Department".l('SC23000');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';

	},

	DepartmentDelete : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete Department".l('SC23000');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-delete';
	},
	DepartmentStatus : function (value, metadata, r, rowIndex, colIndex, store) {
		if (value == true) {
			var tooltipText = 'De Activate'.l('SC23000');
			metadata.tdCls = 'icon-active';
		} else {
			var tooltipText = 'Activate'.l('SC23000');
			metadata.tdCls = 'icon-deactive';
		}

		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
	}
});