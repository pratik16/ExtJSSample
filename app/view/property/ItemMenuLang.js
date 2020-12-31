Ext.define('Regardz.view.property.ItemMenuLang', {
    extend: 'Ext.window.Window',
    alias: 'widget.itemmenulang',
    modal: false,
    width: 400,
    border: false,
    title: 'Manage Lang Menu Item'.l('SC31149'),
    autoShow: true,

    initComponent: function () {

        var me = this;
        me.items = [{
            xtype: 'form',
            itemid: 'menuItemLang',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:10px;",            
            items: [{
                xtype: 'combo',
                name: 'LanguageId',
                fieldLabel: 'Lang. for content'.l('SC31520'),
                //queryMode: 'local',
                displayField: 'Name',
                valueField: 'LanguageId',
                emptyText: "Select language for content".l('SC31520'),
                anchor: '100%',
                allowBlank: false,
                store: Ext.getStore('common.LanguageListStore')
            }, {
                xtype: 'hidden',
                name: 'MenuItemId',
                value: me.menuItemId
            }, {
                xtype: 'hidden',
                name: 'LangMenuItemId',                
                value: 0
            }, {
                xtype: 'textfield',
                fieldLabel: 'Menu Title*'.l('SC31149'),
                name: 'MenuItemName',
                allowBlank: false,
                selectOnFocus: true,
                anchor: '100%',
                maxLength: 500
            }, {
                xtype: 'textareafield',
                //grow: true,
                fieldLabel: 'Description*'.l('SC31149'),
                name: 'Description',
                selectOnFocus: true,
                allowBlank: false,
                anchor: '100%',
                maxLength: 2000
            }
				],
            buttons: [{
                text: 'Cancel'.l('w'),
                scope: me,
                handler: function () {
                    this.close();
                }
            }, {
                text: 'Save'.l('w'),
                //action : 'savePhotoGalleryLang'
                action: 'saveMenuItemLang'
            }
				]
        }
		];
        //console.log('end form');
        me.callParent(arguments);
    }
});