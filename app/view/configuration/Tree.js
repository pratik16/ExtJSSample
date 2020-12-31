Ext.define('Regardz.view.configuration.Tree', {
	extend : 'Ext.window.Window',
	alias : 'widget.tree',

	config : {
		configurationManagementChildren :
		Ext.create('Ext.data.TreeStore', {
			root : {
				expanded : true,
				text : "",
				user : "",
				status : "",
				children : [{
						text : "Configuration",
						expanded : true,
						children : [{
								text : "Fixed Price Packages".l('ConfigTree'),
								itemId : "FixedPricePackages",
								leaf : true
							}, {
								text : "Fixed Price Management".l('ConfigTree'),
								itemId : "fixedPriceManagement",
								leaf : true
							}, {
								text : "Item Category Management".l('ConfigTree'),
								itemId : "itemCategory",
								leaf : true
							}, {
								text : "Item Type Management".l('ConfigTree'),
								itemId : "itemType",
								leaf : true
							}, {
								text : "Item Management".l('ConfigTree'),
								itemId : "itemManagement",
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

		me.configurationManagement = {
			xtype : 'panel',
			autoScroll : true,
			cls : 'empty',
			title : 'Configuration Management',
			items : [{
					xtype : 'treepanel',
					//title: 'Simple Tree',
					border : false,
					name : 'configurationManagement',
					//width: 200,
					//height: 150,
					store : me.configurationManagementChildren,
					rootVisible : false,
					listeners : {
						itemclick : function (tree, rec, item, index, e) {}
					}
				}
			]
		};
		me.layout = 'fit';

		me.callParent();
	}

});