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
Ext.define('Regardz.ConfigurationWindow', {
	extend : 'Ext.ux.desktop.Module',
	id : 'config-win',
	requires : ['Regardz.view.layout.Configuration'],
	init : function () {
		if (Ext.getCmp('config-win'))
			Ext.getCmp('config-win').destroy();
		this.launcher = {
			text : 'Configuration'.l('SC20000'),
			iconCls : 'icon-configuration'
		};
		this.callParent(arguments);
	},
	createWindow : function () {

		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('config-grid');

		if (Ext.getCmp('Configuration'))
			Ext.getCmp('Configuration').destroy();

		if (Ext.getCmp('config-win'))
			Ext.getCmp('config-win').destroy();

		cwin = desktop.createWindow({
				id : 'config-win',
				//title : 'Configuration Management'.l('SC20000'),
				title: 'Configuration'.l('SC20000'),
				maximized : true,
				//modal: true,
				width : 740,
				height : 480,
				border : false,
				y : 0,
				autoHeight : true,
				resizable : true,
				iconCls : 'icon-configuration',
				//animCollapse: false,
				//constrainHeader: true,
				layout : 'fit',
				items : [{
						layout : 'fit' //,
						//xtype: 'configuration'
					}
				],

				listeners : {
					resize : function (t, w, h, ow, oh) {},
					beforerender : function (t) {
						//  debugger;
						Ext.getCmp('config-win').maximize();

					},

					afterrender : function () {
						var task = new Ext.util.DelayedTask(function () {
								var ws = Ext.getCmp('config-win');
								ws.removeAll();

								ws.add({
									xtype : 'configuration'
								});
								ws.doLayout();

							});

						task.delay(500);
						//  debugger;
						/**/
					}
				}
			});

		return cwin;
	},
	setController : function () {

		var me = this;
		try {
			//var c = me.getController('moduleone.samplegrid');

		} catch (e) {}
	}
});