Ext.define('Regardz.view.configuration.FixedPriceManageEventsListWin', {
	extend : 'Ext.window.Window',
	alias : 'widget.fixedpricemanageeventslistwin',
	modal : true,
	id : 'fixedPriceManageEventsListWin',
	//store: 'configuration.FixedPriceManageEventsStore',

	requires : ['Regardz.view.configuration.FixedPriceManageEventsList'],
	initComponent : function () {
		var me = this;
		//me.title = "Manage Events List", //.l('SC32200');
		me.title = "FixedPrice Events List_Title".l('SC22200');
		me.width = 650;
		//me.height = 400;
		me.forceFit = true;
		//me.layout = 'fit';
		Ext.apply(me, {
			items : [{
					xtype : 'form',
					id : 'fixedPriceEventListForm',
					items : [{
							xtype : 'hidden',
							name : 'FixedPriceId',
							value : me.FixedPriceId
						}, {
							//layout: 'fit',
							width : me.windowWidth,
							xtype : 'fixedpricemanageeventslist'
						}
					]
				}
			]
		});
		me.tbar = [{
				xtype : 'button',
				name : 'FixedPriceId',
				//value: me.FixedPriceId,
				//action: 'addFixpriceEventItem',
				iconCls : 'new',
				text : 'Add New'.l('SC22200'),
				tooltip : 'Add Event'.l('SC22200'),
				handler : function () {
					//alert('a');
					//alert(me.FixedPriceId);
					var fixedpricemanageevents = Ext.create('widget.fixedpricemanageevents', {
							FixedPriceEventId : 0,
							FixedPriceId : me.FixedPriceId,
							EventId : 0
						});

				}
			}
		];
		me.callParent();
	}
});