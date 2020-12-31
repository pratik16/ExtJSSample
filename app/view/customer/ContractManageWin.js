Ext.define('Regardz.view.customer.ContractManageWin', {
	extend : 'Ext.window.Window',
	alias : 'widget.contractManageWin',
	modal : true,
	id : 'contractManageWin',
	//stores: ['customer.ContractManageStore', 'customer.ContractFixedPriceStore', 'customer.ContractKickBackStore'],

	initComponent : function () {
		var me = this;

		me.autoScroll = true;
		me.height = 550;
		me.width = 700;

		me.ContractDiscountList = Ext.create('widget.contractdiscountlist', {
				contractId : me.contractId
			});
		me.ContractDiscountList.height = me.height - 100;

		me.ContractFixedPriceList = Ext.create('widget.contractfixedpricelist', {
				contractId : me.contractId
			});
		me.ContractFixedPriceList.height = me.height - 100;
		me.ContractCommisionList = Ext.create('widget.contractcommisionlist', {
				contractId : me.contractId
			});
		me.ContractCommisionList.height = me.height - 100;
		me.ConractKickBackList = Ext.create('widget.conractkickbacklist', {
				contractId : me.contractId
			});
		me.ConractKickBackList.height = me.height - 100;
		me.ContractFixedPriceBarList = Ext.create('widget.contractfixedpricebarlist', {
				contractId : me.contractId
			});
		me.ContractFixedPriceBarList.height = me.height - 100;
		me.ContractBedroomList = Ext.create('widget.contractbedroomlist', {
				contractId : me.contractId
			});
		me.ContractBedroomList.height = me.height - 100;
		// me.ContractManageListWin = Ext.create('widget.contractmanagelistwin'); me.ContractManageListWin.height = me.height - 100;

		if (Ext.getCmp('contractManageWin'))
			Ext.getCmp('contractManageWin').destroy();

		//me.border = false;
		me.checkboxconfigs = [];
		me.windowWidth = 900;

		Ext.apply(me, {
			title : 'Manage Contract Criteria_Title'.l('SC61200'), //.l('PropertyEdit'),
			autoShow : true,
			y : 0,
			// modal : true,
			closable : true,
			resizable : true,
			buttonAlign : 'right',
			width : me.windowWidth,
			border : false,
			items : {
				xtype : 'tabpanel',
				activeTab : 0,
				width : me.windowWidth - 20,
				plain : false,
				border : false,
				//frame: true,
				bodyPadding : 1,
				padding : 5,
				cls : 'propertyEdit',
				layout : 'form',
				style : 'background:none; border:0px;',
				items : [{
						title : 'Discount',
						name : 'Discount',
						items : me.ContractDiscountList
					}, {
						title : 'Commission',
						name : 'Commission',
						items : me.ContractCommisionList
					}, {
						title : 'Kick Back',
						name : 'KickBacks',
						items : me.ConractKickBackList
					}, {
						title : 'Fixed Price Bar',
						name : 'ContractId',
						items : me.ContractFixedPriceBarList
					}, {
						title : 'Fixed Price',
						name : 'FixedPrice',
						items : me.ContractFixedPriceList
					}, {
						title : 'Bedroom',
						name : 'Bedrooms',
						items : me.ContractBedroomList
					}
				]
			}
		});
		me.dockedItems = [{
				dock : 'bottom',
				align : 'center',
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