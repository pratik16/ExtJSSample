//This view is not used
Ext.define('Regardz.view.configuration.DepartmentManage', {
	extend : 'Ext.window.Window',
	alias : 'widget.departmentmanage',
	modal : true,
	width : 400,
	border : false,
	//title: 'Add Fixed Price'.l('RAP-A05-06'),
	title : 'Add Department_Title'.l('SC23100'),
	autoShow : true,

	initComponent : function () {
	    
		if (Ext.getCmp('addDepartment'))
			Ext.getCmp('addDepartment').destroy();

		var me = this;

		me.disableitems = true;
		if (me.itemCategoryId > 0) {
			me.disableitems = false;
		}

		me.items = [{
				xtype : 'form',
				id : 'addDepartment',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				fileUpload : true,
				items : [{
						xtype : 'hidden',
						name : 'DepartmentId',
						value : me.DepartmentId
					}, {
						xtype : 'textfield',
						//fieldLabel: 'Fixed Price Package Name'.l('RAP-A05-06'),
						fieldLabel : 'Department'.l('SC23100'),
						name : 'DepartmentName',
						allowBlank : false,
						maxLength : 80,
						selectOnFocus : true,
						anchor : '100%'
					}, {
						xtype : 'textfield',
						fieldLabel : 'Code'.l('SC23100'),
						name : 'DeptCode',
						allowBlank : false,
						maxLength : 16,
						selectOnFocus : true,
						anchor : '100%'
					}, {
						xtype : 'textarea',
						//fieldLabel: 'Fixed Price Package Name'.l('RAP-A05-06'),
						fieldLabel : 'Description'.l('SC23100'),
						name : 'Description',
						maxLength : 256,
						allowBlank : false,
						selectOnFocus : true,
						anchor : '100%'
					}, {
						xtype : 'checkboxfield',
						fieldLabel : 'Status'.l('SC23100'),
						name : 'IsActive',
						inputValue : 'true',
						uncheckedValue : 'false'
					}, {
						xtype : 'checkboxfield',
						fieldLabel : 'CRO'.l('SC23100'),
						name : 'IsCRO',
						inputValue : 'true',
						uncheckedValue : 'false'
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
						text : 'Cancel'.l('g'),
						scope : me,
						handler : function () {
							this.close();
						}
					}, {
						text : 'Save'.l('g'),
						action : 'saveDepartments'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});