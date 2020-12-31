Ext.define('Regardz.AfasLogWindow', {
	extend : 'Ext.ux.desktop.Module',
	id : 'afaslog-win',
	requires : ['Regardz.view.layout.AfasLog'],
	init : function () {
		var me = this;
		if (Ext.getCmp('afaslog-win'))
			Ext.getCmp('afaslog-win').destroy();
		this.launcher = {
			text : 'AFAS Log',
			iconCls : 'icon-administration'
		};

		this.callParent(arguments);
	},
	createWindow : function () {
		var desktop = this.app.getDesktop();
		if (Ext.getCmp('afaslog-win'))
			Ext.getCmp('afaslog-win').destroy();
		win = desktop.createWindow({
				id : 'afaslog-win',
				title : 'AFAS Log',
				maximized : true,
				width : 740,
				height : 480,
				border : false,
				y : 0,
				autoHeight : true,
				resizable : true,
				iconCls : 'icon-administration',
				layout : 'fit',
				items : [{
						layout : 'fit'
					}],
				listeners : {
					beforerender : function (t) {					
						Ext.getCmp('afaslog-win').maximize();
					},
					afterrender : function () {
						var task = new Ext.util.DelayedTask(function () {
								var ws = Ext.getCmp('afaslog-win');
								ws.removeAll();
								ws.add({
									xtype : 'afaslog'
								});
								ws.doLayout();
							});
						task.delay(500);
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
		} catch (e) {}
	}
});