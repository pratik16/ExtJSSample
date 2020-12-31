Ext.define('Regardz.view.customer.AddChildCompanyWin', {
	extend : 'Ext.window.Window',
	alias : 'widget.addchildcompanywin',
	modal : true,
	//store: 'customer.ContractManageStore',
	//alert(me.ContractId);

	requires : ['Regardz.view.customer.ContractManageListWin'],
	initComponent : function () {
		var me = this;
		me.title = "Select Company", //.l('SC61250');
		me.width = 650;
		me.height = 400;
		Ext.apply(me, {
			items : [{
					xtype : 'ContractManageListWin'
				}
			]
		});
		me.dockedItems = [{
				dock : 'bottom',
				align : 'right',
				buttonAlign : 'center',
				buttons : [{
						text : 'Cancel'.l('w'),
						action : 'cancel',
						handler : function () {
							me.destroy();
						}
					}, {
						text : 'Save'.l('w'),
						handler : function () {
							Ext.Msg.alert('Success'.l('g'), 'Information saved successfully');
							me.destroy();
						}
					}
				]
			}
		];

		me.callParent();
	}
});