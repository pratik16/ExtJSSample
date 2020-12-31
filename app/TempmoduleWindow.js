/*PV: temp module*/
/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

/**
 * Module for desktop application. It will open in new window,
 * For the content in this module create MVC style structure for getting the data.
 **/
Ext.define('Regardz.TempmoduleWindow', {
	extend : 'Ext.ux.desktop.Module',
	id : 'tempmodule-win',
	requires : ['Regardz.view.layout.TempModule'],
	init : function () {
		if (Ext.getCmp('tempmodule-win'))
			Ext.getCmp('tempmodule-win').destroy();
		this.launcher = {
		    text: 'Tempmodule Management',
			iconCls : 'icon-tick'
		};
		this.callParent(arguments);
	},
	createWindow : function () {
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('tempmodule-grid');

		if (Ext.getCmp('Tempmodule'))
			Ext.getCmp('Tempmodule').destroy();

		if (Ext.getCmp('tempmodule-win'))
			Ext.getCmp('tempmodule-win').destroy();
		tempwin = desktop.createWindow({
				id : 'tempmodule-win',
				title : 'Tempmodule Management',
				maximized : true,
				//modal: true,
				width : 740,
				height : 480,
				border : false,
				y : 0,
				autoHeight : true,
				resizable : true,
				iconCls : 'icon-tick',
				//animCollapse: false,
				//constrainHeader: true,
				layout : 'fit',
				items : [{
						layout : 'fit' //,
						// xtype: 'customer'
					}
				],

				listeners : {
					resize : function (t, w, h, ow, oh) {},
					beforerender : function (t) {
						//  debugger;
						Ext.getCmp('tempmodule-win').maximize();

					},

					afterrender : function () {
						var task = new Ext.util.DelayedTask(function () {
								var ws = Ext.getCmp('tempmodule-win');
								ws.removeAll();

								ws.add({
									xtype : 'tempmodule'
								});
								ws.doLayout();

							});

						task.delay(500);
						//  debugger;
						/**/
					}
				}
			});

		return tempwin;
	},
	setController : function () {

		var me = this;
		try {
			//var c = me.getController('moduleone.samplegrid');

		} catch (e) {}
	}
});