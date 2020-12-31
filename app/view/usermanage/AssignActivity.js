Ext.define('Regardz.view.usermanage.AssignActivity', {
	extend : 'Ext.window.Window',
	alias : 'widget.assignactivity',
	stores: ['usermanage.PropertyListComboStore', 'usermanage.UserPropertyActivityListStore', 'common.PropertyForNamesStore'],

	initComponent : function () {
		var me = this;
		me.border = false;

		me.windowWidth = 650;

		if (Ext.getCmp('ActivitiesIds')) {
			Ext.getCmp('ActivitiesIds').destroy();
		}

		if (Ext.getCmp('assignactivitiesform'))
			Ext.getCmp('assignactivitiesform').destroy();

		Ext.apply(me, {
			title : 'Assign Activities_Title'.l('SC32400'),
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
				id : 'assignactivitiesform',
				style : 'background:none; border:0px;',
				border : '0px',
				height : parseInt(Ext.getBody().getViewSize().height * 0.6),
				autoscroll : true,
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
						name : 'CreatedDate',
						value : Ext.Date.format(new Date(), 'Y-m-d H:i:s')
					}, {
						xtype : 'hidden',
						name : 'isRole',
						value : 'false'
					}, {
						xtype : 'combo',
						name : 'propertyId',
						fieldLabel : 'Property'.l('SC32400'),
						action : 'properties',
						displayField : 'PropertyName',
						valueField : 'PropertyId',
						emptyText: "Select Property".l('SC32400'),
						anchor : '100%',
						store: Ext.getStore('common.PropertyForNamesStore')
					}, {
						xtype : 'form',
						id : 'ActivitiesIds',
						height : parseInt(Ext.getBody().getViewSize().height * 0.5),
						autoScroll : true,
						items : [{
								xtype : 'hidden',
								name : 'activityIds'
							}
						]
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
							me.close();
						}
					}, {
						text : 'Save'.l('w'),
						action : 'assign_activities_save',
						formBind : true //, //only enabled once the form is valid
						//disabled : true
					}
				]
			}
		];

		me.callParent();
	}
});