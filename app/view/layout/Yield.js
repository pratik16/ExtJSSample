///*Minified by P*/
Ext.define('Regardz.view.layout.Yield', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.yield',
	id : 'yieldwindow',
	config : {
		yieldManagementChildren : Ext.create('Ext.data.TreeStore', {
			root : {
				expanded : true,
				text : "",
				user : "",
				status : "",
				children : [{
						text : "Yield".l('SC70000'),
						expanded : true,
						children : [{
								text : "Yield Calendar".l('SC70000'),
								itemId : "yieldCalender",
								leaf : true
							}, {
								text : "Import Yield Template Data".l('SC70000'),
								//itemId : "importdataTemp",
								itemId : "importdata",
								leaf : true,
								//cls : 'disabledItem'
							}, {
								text : "List Exception".l('SC70000'),
								//itemId : "listexceptionTemp",
								itemId : "listexception",
								leaf : true,
								//cls : 'disabledItem'
							}
						]
					}
				]
			}
		})
	},
	initComponent : function () {
		var me = this;
		if (Ext.getCmp('west-regionYield'))
			Ext.getCmp('west-regionYield').destroy();
		if (Ext.getCmp('right_regionYield'))
			Ext.getCmp('right_regionYield').destroy();
		if (Ext.getCmp('yieldwindow'))
			Ext.getCmp('yieldwindow').destroy();
		me.yieldManagement = {
			xtype : 'panel',
			autoScroll : true,
			cls : 'empty',
			title : 'Yield Management'.l('SC70000'),
			items : [{
					xtype : 'treepanel',
					border : false,
					name : 'yieldManagement',
					height : 150,
					store : me.yieldManagementChildren,
					rootVisible : false,
					listeners : {
						itemclick : function (tree, rec, item, index, e) {}

					}
				}
			]
		};
		me.layout = 'fit';
		me.items = {
			id : 'main-regionYield',
			plain : true,
			border : false,
			layout : 'border',
			items : [{
					region : 'west',
					collapsible : true,
					layout : 'fit',
					width : 250,
					items : [{
							xtype : 'panel',
							id : 'west-regionYield',
							frame : false,
							layout : 'accordion',
							items : [me.yieldManagement]
						}
					]
				}, {
					region : 'center',
					layout : 'fit',
					id : 'right_regionYield'
				}
			]
		};
		me.callParent();
	}
});