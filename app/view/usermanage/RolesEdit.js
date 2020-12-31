Ext.define('Regardz.view.usermanage.RolesEdit', {
	extend : 'Ext.window.Window',
	alias : 'widget.rolesedit',
	modal : true,
	width : parseInt(Ext.getBody().getViewSize().width / 2),
	border : false,
	//title: 'Role Manage',
	alwaysOnTop : true,
	initComponent : function () {

		var me = this;

		if (me.roleId) {
			if (me.clone) {
				me.title = "Clone Role_Title".l('SC34200');
			} else
				me.title = "Update Role_Title".l('SC34100');
		} else {
			me.title = "Add Role_Title".l('SC34100');
		}
		if (Ext.getCmp('activitesOnRole'))
			Ext.getCmp('activitesOnRole').destroy();

		if (Ext.getCmp('roleManageForm'))
			Ext.getCmp('roleManageForm').destroy();

		me.items = [{
				xtype : 'form',
				//layout: 'form',
				border : false,
				padding : 5,
				frame : false,
				plain : true,
				border : '1',
				cls : 'propertyEdit',
				id : 'roleManageForm',
				bodyStyle : 'background: none',
				defaultType : 'textfield',
				buttonAlign : 'end',
				items : [{
						fieldLabel : 'Role Name'.l('SC34100'),
						name : 'RoleName',
						allowBlank : false,
						maxLength : 80,
						width : 700
					}, {
						xtype : 'textfield',
						flex : 1,
						fieldLabel : 'Display Name'.l('SC34100'),
						name : 'DisplayName',
						allowBlank : false,
						maxLength : 80,
						width : 700
					}, {
						xtype : 'textareafield',
						flex : 1,
						fieldLabel : 'Description'.l('SC34100'),
						name : 'Description',
						maxLength : 256,
						width : 700
					},
					{
						xtype : 'displayfield',
						height : 10
					}, {
						xtype : 'form',
						frame : true,
						fieldLabel : 'Description'.l('SC34100'),
						border : '0px',
						id : 'activitesOnRole'

					}, {
						xtype : 'hidden',
						name : 'clone'
					}, {
						xtype : 'hidden',
						name : 'RoleId',
						value : 0
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
						name : 'IsActive',
						value : 'true'
					}, {
						xtype : 'hidden',
						name : 'ActivitiyIds'
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
						action : 'role_save'
					}
				]
			}
		];
		//console.log('end form');
		me.callParent(arguments);
	}
});