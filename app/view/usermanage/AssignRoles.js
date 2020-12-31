Ext.define('Regardz.view.usermanage.AssignRoles', {
	extend : 'Ext.window.Window',
	alias : 'widget.assignroles',

	// stores: ['usermanage.PropertyListComboStore', 'usermanage.UserPropertyRoleListStore'],
	//store: 'usermanage.PropertyListComboStore',
	initComponent : function () {
		var me = this;

		if (Ext.getCmp('assignroleform'))
			Ext.getCmp('assignroleform').destroy();

		me.border = false;

		me.windowWidth = 650;

		Ext.apply(me, {
			title : 'Assign Role_Title'.l('SC32300'),
			autoShow : true,
			y : 0,
			closable : true,
			resizable : true,
			width : me.windowWidth,
			border : false,
			items : {
				xtype : 'form',
				activeTab : 0,
				layout : 'form',
				border : false,
				padding : 5,
				frame : true,
				plain : true,
				style : 'background:none; border:0px;',
				id : 'assignroleform',
				border : '0px',
				//bodyPadding :'5px',
				defaultType : 'textfield',
				buttonAlign : 'center',
				items : [{
						xtype : 'hidden',
						name : 'userId',
						value : me.data.UserId
					}, {
						xtype : 'hidden',
						name : 'createdBy',
						value : CurrentSessionUserId
					}, {
						xtype : 'hidden',
						name : 'isRole',
						value : 'true'
					}, {
						xtype : 'hidden',
						name : 'activityIds'
					}, {
						name : 'CreatedDate',
						xtype : 'hidden',
						value : Ext.Date.format(new Date(), 'Y-m-d H:i:s')
					}, {
						xtype : 'combo',
						name : 'propertyId',
						action : 'properties',
						fieldLabel : 'Property'.l('SC32300'),
						displayField : 'PropertyName',
						valueField : 'PropertyId',
						emptyText: "Select Property".l('SC32300'),
						anchor : '100%',
						store: Ext.getStore('common.PropertyForNamesStore')
						// store: this.store
					}, {
						xtype : 'treepanel',
						id : 'treepanelcheckbox',
						height : parseInt(Ext.getBody().getViewSize().height / (1.60)),
						store : Ext.getStore('usermanage.UserPropertyRoleListStore'),
						rootVisible : false
					}
				]
			}
		});

		me.dockedItems = [{
				dock : 'bottom',
				align : 'right',
				buttonAlign : 'right',
				buttons : [{
						text : 'Cancel'.l('w'),
						action : 'cancel',
						handler : function () {

							me.destroy();
						}
					}, {
						text : 'Save'.l('w'),
						action : 'assign_role_save',
						formBind : true //, //only enabled once the form is valid
						//disabled : true
					}

				]
			}
		];

		me.callParent();
	}
});