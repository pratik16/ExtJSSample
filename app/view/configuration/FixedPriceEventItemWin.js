Ext.define('Regardz.view.configuration.FixedPriceEventItemWin', {
	extend : 'Ext.window.Window',
	alias : 'widget.fixedpriceeventitemwin',
	modal : true,
	store : 'configuration.FixedPriceEventItemStore',

	requires : ['Regardz.view.configuration.FixedPriceEventItemList'],
	initComponent : function () {
		var me = this;
		me.title = "FixedPrice Items List_Title".l('SC22220');
		me.width = 650;
		me.forceFit = true;
		//me.height = 400;
		//alert(me.FixedPriceEventId);
		//me.layout = 'fit';
		Ext.apply(me, {
			items : [{
					xtype : 'form',
					id : 'fixedPriceEventItemListForm',
					items : [{
							xtype : 'hidden',
							name : 'EventId',
							value : me.EventId
						}, {
							//layout: 'fit',
							width : me.windowWidth,
							xtype : 'fixedpriceeventitemlist'
						}
					]
				}
			]
		});
		me.tbar = [{
				xtype : 'button',
				name : 'FixedPriceEventId',
				//action: 'addFixpriceEventItem',
				iconCls : 'new',
				text : 'Add New'.l('SC22220'),
				tooltip : 'Add Item'.l('SC22220'),
				handler : function () {
					//alert(me.FixedPriceEventId);
					var fixedpricemanage = Ext.create('widget.fixedpriceeventitemaddwin', {
							FixedPriceEventId : me.FixedPriceEventId
						}).show(); //, { FixedPriceId: 0, PropertyId: rec.data.PropertyId });
					// fixedpricemanage.show();
				}
			}
		];
		me.callParent();
	}
});