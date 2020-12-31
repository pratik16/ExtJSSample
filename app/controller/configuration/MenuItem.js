////Not in used ad Menu list convert into popup
Ext.define('Regardz.controller.configuration.MenuItem', {
	extend : 'Ext.app.Controller',
	views : ['configuration.MenuItemList', 'configuration.MenuItemManage', 'configuration.MenuItemLang'],
	stores : ['configuration.MenuItemStore', 'common.LanguageListStore'],

	refs : [{
			ref : 'MenuItemManage',
			selector : 'MenuItemManage'
		}, {
			ref : 'MenuItemLang',
			selector : 'MenuItemLang'
		}
	],

	init : function (rec) {
		var me = this;
		me.data = rec.data;

			this.control({
				'menuitemlist' : {
					cellclick : function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

						var fieldName = iView.getGridColumns()[iColIdx].name;

						var zRec = iView.getRecord(iRowEl);

						if (fieldName == 'MenuItemEdit')
							this.MenuItemEdit(zRec);
						else if (fieldName == 'MenuItemDelete')
							this.MenuItemDelete(zRec);
					}
				},
				'menuitemmanage button[action="LanguageContent"]' : {
					click : function (t, e, eo) { //t => this, e => event, eo => Eoptional
						var me = this;
						var menuItemId = Ext.getCmp('addmenuitem').getForm().findField('MenuItemId').getValue();
						Ext.create('widget.menuitemlang');
						Ext.getCmp('menuItemLang').getForm().load({
							method : 'GET',
							url : webAPI_path + 'api/ConfigItem/GetMenuItemForMultiLingUpdate',
							params : {
								id : menuItemId,
								languageId : user_language
							}
						});
					}
				},
				'button[action="addMenuItem"]' : {
					click : function () {
						Ext.create('widget.menuitemmanage', {
							menuItemId : 0,
							itemId : me.data.ItemId,
							itemName : me.data.ItemName
						});
					}
				},
				'button[action="saveMenuItem"]' : {
					click : function () {
						if (Ext.getCmp('addmenuitem').getForm().isValid()) {
							var menuItemId = Ext.getCmp('addmenuitem').getForm().findField('MenuItemId').getValue();

							var urlMenuItem = "";
							if (menuItemId == 0) {
								urlMenuItem = webAPI_path + 'api/ConfigItem/AddMenuItem';
								Ext.getCmp('addmenuitem').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
								Ext.getCmp('addmenuitem').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
							} else {
								urlMenuItem = webAPI_path + 'api/ConfigItem/UpdateMenuItem';
								Ext.getCmp('addmenuitem').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
								Ext.getCmp('addmenuitem').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId);
							}

							$.ajax({
								url : urlMenuItem,
								type : 'POST',
								data : Ext.getCmp('addmenuitem').getForm().getValues(),
								success : function (response) {
									var win = Ext.WindowManager.getActive();
									if (win) {
										//close the add window popup
										win.close();
										Ext.getStore('configuration.MenuItemStore').reload();
									}
									display_alert('MG00000'); // Ext.Msg.alert('success', 'Added successfully.');
								},
								complete : function (response) {
									var res = Ext.decode(response.responseText);
									var win = Ext.WindowManager.getActive();
									if (win) {
										win.close();
										Ext.getStore('configuration.MenuItemStore').reload();
									}
									if (res.data == "update") {
										Ext.Msg.alert('success', 'Updated successfully.');
									}
									if (res.data == "add") {
										Ext.Msg.alert('success', 'Added successfully.');
									}
									if (res.data == "duplicate") {
										Ext.Msg.alert('Duplicate', 'Menu Item already available.');
									}
									if (res.data == "false") {
										var win = Ext.WindowManager.getActive();
										Ext.Msg.alert('Error', 'Try again!!!');
									}
								}
							});
						}
					}
				},
				'menuitemlang combobox[name=LanguageId]' : {
					select : function (combo, records, eOpt) {
						var menuItemId = Ext.getCmp('addmenuitem').getForm().findField('MenuItemId').getValue();
						Ext.getCmp('menuItemLang').getForm().load({
							method : 'GET',
							url : webAPI_path + 'api/ConfigItem/GetMenuItemForMultiLingUpdate',
							params : {
								id : menuItemId,
								languageId : records[0].data.LanguageId
							}
						});
					}
				},
				'menuitemlang button[action="saveMenuItemLang"]' : {
					click : function () {
						if (Ext.getCmp('menuItemLang').getForm().isValid()) {
							$.ajax({
								url : webAPI_path + 'api/ConfigItem/UpdateMenuItemMultiLangDetail',
								type : 'POST',
								data : Ext.getCmp('menuItemLang').getForm().getValues(),
								success : function (response) {
									var win = Ext.WindowManager.getActive();
									if (win) {
										//close the add window popup
										win.close();
									}
								}
							});
						}
					}
				}
			})

	},
	MenuItemEdit : function (rec) {
		var editMenuItem = Ext.create('widget.menuitemmanage', {
				menuItemId : rec.data.MenuItemId,
				itemName : rec.data.ItemName
			});
		editMenuItem.setTitle('Update Menu Item'.l('RAP-A05-09'));
		Ext.getCmp('addmenuitem').getForm().load({
			method : 'GET',
			url : webAPI_path + 'api/ConfigItem/GetMenuItemForUpdate',
			params : {
				id : rec.data.MenuItemId,
				languageId : user_language
			}
		});
	},
	MenuItemDelete : function (rec) {
		display_alert("MG00020", '', 'C', function (btn) {

			if (btn === 'yes') {

				$.ajax({
					url : webAPI_path + 'api/ConfigItem/RemoveMenuItem',
					type : "GET",
					data : {
						id : rec.data.MenuItemId
					},
					success : function (response) {
						display_alert('MG00040');
						Ext.getStore('configuration.MenuItemStore').load();
					}
				});
			}
		});
	}
});