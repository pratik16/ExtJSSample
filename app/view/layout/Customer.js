/*PV: below file is not used*/
Ext.define('Regardz.view.layout.Customer', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.customer',
	id : 'customerwindow',

	config : {
		customerManagementChildren :
		Ext.create('Ext.data.TreeStore', {
			root : {
				expanded : true,
				text : "",
				user : "",
				status : "",
				children : [{
						text : "Customer Management",
						expanded : true,
						children : [{
								text : "Contract Management",
								itemId : "contractManagement",
								leaf : true
							}, {
								text : "Customer Management",
								itemId : "customersManagement",
								leaf : true
							}
						]
					}
				]
			}
		})
	},
	initComponent : function () {

		var me = this;

		if (Ext.getCmp('west-regionCustomer'))
			Ext.getCmp('west-regionCustomer').destroy();

		if (Ext.getCmp('right_regionCustomer'))
			Ext.getCmp('right_regionCustomer').destroy();

		if (Ext.getCmp('yieldwindow'))
			Ext.getCmp('yieldwindow').destroy();

		me.customerManagement = {
			xtype : 'panel',
			autoScroll : true,
			cls : 'empty',
			title : 'Customer Management',
			items : [{
					xtype : 'treepanel',
					//title: 'Simple Tree',
					border : false,
					name : 'customerManagement',
					//width: 200,
					//height: 150,
					store : me.customerManagementChildren,
					rootVisible : false,
					listeners : {
						itemclick : function (tree, rec, item, index, e) {}
					}
				}
			]
		};

		me.layout = 'fit';
		me.items = {

			// width: parseInt(Ext.getBody().getViewSize().width * (0.99)),
			id : 'main-regionCustomer',
			// height: parseInt(Ext.getBody().getViewSize().height * (0.96)),
			plain : true,
			border : false,
			layout : 'border',
			items : [{
					region : 'west',
					collapsible : true,
					layout : 'fit',
					//split: true,
					width : 250,
					items : [{
							xtype : 'panel',
							id : 'west-regionCustomer',
							frame : false,
							//height: 500,
							//autoHeight: true,
							layout : 'accordion',
							items : [me.customerManagement]
						}
					]
				}, {
					region : 'center',
					layout : 'fit',
					id : 'right_regionCustomer'
				}
			]
		};

		me.callParent();
	}

});