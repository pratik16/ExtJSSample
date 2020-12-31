Ext.define('Regardz.AdministrationWindow', {
	extend : 'Ext.ux.desktop.Module',
	id : 'admin-win',
	requires : ['Regardz.view.layout.Administration'],
	init : function () {
		var me = this;
		if (Ext.getCmp('admin-win'))
			Ext.getCmp('admin-win').destroy();
		this.launcher = {
			text : 'Administration'.l('SC30000'),
			iconCls : 'icon-administration'
		};

		this.callParent(arguments);
	},
	createWindow : function () {

		var desktop = this.app.getDesktop();
		//var win = desktop.getWindow('admin-grid');

		if (Ext.getCmp('Administration'))
			Ext.getCmp('Administration').destroy();

		if (Ext.getCmp('admin-win'))
			Ext.getCmp('admin-win').destroy();

		win = desktop.createWindow({
				id : 'admin-win',
				title : 'Administration'.l('SC30000'),
				maximized : true,
				//modal: true,
				width : 740,
				height : 480,
				border : false,
				y : 0,
				autoHeight : true,
				resizable : true,
				iconCls : 'icon-administration',

				//animCollapse: false,
				//constrainHeader: true,
				layout : 'fit',
				items : [{
						layout : 'fit' //,
						//  xtype: 'administration'
					}
				],

				listeners : {
					beforerender : function (t) {
						//  debugger;
						Ext.getCmp('admin-win').maximize();

					},
					afterrender : function () {
						var task = new Ext.util.DelayedTask(function () {
								var ws = Ext.getCmp('admin-win');
								ws.removeAll();

								ws.add({
									xtype : 'administration'
								});
								ws.doLayout();

							});

						task.delay(500);
						//  debugger;
						/**/
					},
					resize : function (t, w, h, ow, oh) {},

					maximize : function () {}
				}
			});

		return win;
	},
	setController : function () {

		var me = this;
		try {
			//var c = me.getController('moduleone.samplegrid');

		} catch (e) {}
	}
});