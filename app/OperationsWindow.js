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
Ext.define('Regardz.OperationsWindow', {
	extend : 'Ext.ux.desktop.Module',
	id : 'Operations-win',
	requires : ['Regardz.view.layout.Operations'],
	init : function () {
		if (Ext.getCmp('Operations-win'))
			Ext.getCmp('Operations-win').destroy();
		this.launcher = {
			text : 'Operations'.l('SC70000'),
			iconCls : 'icon-planboard'
		};
		this.callParent(arguments);
	},
	createWindow : function () {

		var desktop = this.app.getDesktop();
		// var win = desktop.getWindow('Operations-grid');

		if (Ext.getCmp('Operations'))
			Ext.getCmp('Operations').destroy();

		if (Ext.getCmp('Operations-win'))
			Ext.getCmp('Operations-win').destroy();
		opwin = desktop.createWindow({
				id : 'Operations-win',
				title: 'Operations'.l('SC70000'),
				maximized : true,
				//modal: true,
				width : 740,
				height : 480,
				border : false,
				y : 0,
				autoHeight : true,
				resizable : false,
				iconCls : 'icon-planboard',
				//animCollapse: false,
				//constrainHeader: true,
				layout : 'fit',
				items : [{
						layout : 'fit' //,
						//xtype: 'operations'
					}
				],

				listeners : {
					resize : function (t, w, h, ow, oh) {},

					beforerender : function (t) {
						//  debugger;
						Ext.getCmp('Operations-win').maximize();

					},

					afterrender : function () {
						var task = new Ext.util.DelayedTask(function () {
								var ws = Ext.getCmp('Operations-win');
								ws.removeAll();

								ws.add({
									xtype : 'operations'
								});
								ws.doLayout();

							});

						task.delay(500);
						//  debugger;
						/**/
					}
				}
			});

		return opwin;
	},
	setController : function () {

		var me = this;
		try {}
		catch (e) {}
	}
});