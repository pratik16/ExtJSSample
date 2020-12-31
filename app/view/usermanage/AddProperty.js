Ext.define('Regardz.view.usermanage.AddProperty', {
	extend : 'Ext.window.Window',
	alias : 'widget.addproperty',
	stores : ['usermanage.AvailableUserPropertyStore'],

	initComponent : function () {
		var me = this;

		if (Ext.getCmp('AssignProperty'))
			Ext.getCmp('AssignProperty').destroy();

		if (Ext.getCmp('userPropertyAddForm'))
			Ext.getCmp('userPropertyAddForm').destroy();

		me.border = false;

		me.windowWidth = 750;

		Ext.apply(me, {
			title : 'Assign Property_Title'.l('SC32100'),
			autoShow : true,
			y : 0,
			closable : true,
			resizable : true,
			autoScroll : true,
			width : me.windowWidth,
			height : parseInt(Ext.getBody().getViewSize().height / 2),
			border : false,
			items : {
				xtype : 'form',
				activeTab : 0,
				layout : 'form',
				border : false,
				id : 'userPropertyAddForm',
				padding : 5,
				frame : true,
				plain : true,
				style : 'background:none; border:0px;',
				border : '0px',
				//bodyPadding :'5px',
				defaultType : 'textfield',
				buttonAlign : 'center',
				items : [{
						xtype : 'hidden',
						name : 'userId'
					}, {
						xtype : 'hidden',
						name : 'designationId'
					}, {
						xtype : 'hidden',
						name : 'createdBy',
						value : CurrentSessionUserId
					}, {
						xtype : 'form',
						id : 'AssignProperty'
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
						action : 'assignPropertyToUserAction',
						formBind : true //, //only enabled once the form is valid
						//disabled : true
					}
				]
			}
		];

		me.callParent();
	}
});