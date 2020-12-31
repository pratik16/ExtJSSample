Ext.define('Regardz.view.configuration.FixedPriceEventItemAddWin', {
	extend : 'Ext.window.Window',
	modal : true,
	alias : 'widget.fixedpriceeventitemaddwin',

	//store: 'configuration.FixedPriceEventItemAddStore',

	requires : ['Regardz.view.configuration.FixedPriceEventItem', 'Regardz.view.configuration.FixedPriceEventItemGroup'],
	initComponent : function () {
		var me = this;
		me.title = "Add FixedPrice EventItem_Title".l('SC22221');
		me.width = 500;
		me.height = 400;
		me.autoScroll = true;
		//alert(me.FixedPriceEventId);
		//me.layout = 'fit';
		Ext.apply(me, {
			items : [{
					xtype : 'form',
					id : 'addFixedPriceItem',
					items : [{
							xtype : 'hidden',
							name : 'FixedPriceEventId',
							value : me.FixedPriceEventId
						}, {
							xtype : 'fixedpriceeventitem'
						}, {
							xtype : 'fixedpriceeventitemgroup'
						}
					]
				}
			],
			buttons : [
				{
					text : 'Cancel'.l('w'),
					scope : me,
					handler : function () {
						this.close();
					}
				}, {
					text : 'Save'.l('w'),
					scope : me,
					handler : function () {
						this.close();
					}
				}
			]
		});
		me.tbar = [{
				xtype : 'button',
				hidden : true,
				name : 'FixedPriceEventId',
				value : me.FixedPriceEventId,
				visible : false //,
				//action: 'addFixpriceEventItem',
				//iconCls: 'new',
				//text: 'Add New', //.l('RAP-A05-06'),
				// tooltip: 'Add Item'//.l('RAP-A05-06')
			}
		];
		me.callParent();
	}
});