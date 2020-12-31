Ext.define('Regardz.view.property.Popupwin', {
	extend : 'Ext.window.Window',
	alias : 'widget.popupwin',
	layout : 'fit',
	width : 200,
	height : 200,
	autoShow : true,
	initComponent : function () {
		this.store = '';
		this.items = [{
				xtype : 'form',
				items : []
			}
		];
		this.callParent(arguments);
	}
});