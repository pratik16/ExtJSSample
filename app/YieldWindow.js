/*PV: removed seperate module*/
///*Minified by P*/
Ext.define('Regardz.YieldWindow', {
	extend : 'Ext.ux.desktop.Module',
	id : 'yield-win',
	requires : ['Regardz.view.layout.Yield'],
	init : function () {
		if (Ext.getCmp('yield-win'))
			Ext.getCmp('yield-win').destroy();
		this.launcher = {
			text : 'Yield Management',
			iconCls : 'icon-yield'
		};
		this.callParent(arguments);
	},
	createWindow : function () {
		var desktop = this.app.getDesktop();
		if (Ext.getCmp('Yield'))
			Ext.getCmp('Yield').destroy();
		ywin = desktop.createWindow({
				id : 'yield-win',
				title : 'Yield Management',
				maximized : true,
				width : 740,
				height : 480,
				border : false,
				y : 0,
				autoHeight : true,
				resizable : true,
				iconCls : 'icon-yield',
				layout : 'fit',
				items : [{
						layout : 'fit'
					}
				],
				listeners : {
					resize : function (t, w, h, ow, oh) {},
					beforerender : function (t) {
						Ext.getCmp('yield-win').maximize();
					},
					afterrender : function () {
						var task = new Ext.util.DelayedTask(function () {
								var ws = Ext.getCmp('yield-win');
								ws.removeAll();
								ws.add({
									xtype : 'yield'
								});
								ws.doLayout();
							});
						task.delay(100);
					}
				}
			});
		return ywin;
	},
	setController : function () {
		var me = this;
		try {}
		catch (e) {}

	}
});