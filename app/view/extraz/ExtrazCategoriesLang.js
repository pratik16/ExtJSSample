Ext.define('Regardz.view.extraz.ExtrazCategoriesLang', {
    extend: 'Ext.window.Window',
    alias: 'widget.extrazcategorieslang',
    modal: false,
    width: 400,
    border: false,
    title: 'Lang Extraz category_Title'.l('SC37111'),
    autoShow: true,

    initComponent: function () {

        var me = this;
        me.items = [{
            xtype: 'form',
            id: 'webshopCategroyLang',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:10px;",
            items: [{
                xtype: 'combo',
                name: 'LanguageId',
                fieldLabel: 'Lang. for content'.l('SC20520') + '*',
                allowBlank: false,
                //queryMode: 'local',
                displayField: 'Name',
                valueField: 'LanguageId',
                emptyText: "Select language for content".l('SC20520'),
                anchor: '100%',
                store: Ext.getStore('common.LanguageListStore')
            }, {
                xtype: 'hidden',
                name: 'WebShopCategoryId',
                value: me.webShopCategoryId
            }, {
                xtype: 'hidden',
                name: 'LangWebShopCategoryId',
                value: 0
            }, {
                xtype: 'textfield',
                fieldLabel: 'Category'.l('SC37111') + '*',
                name: 'Name',
                allowBlank: false,
                selectOnFocus: true,
                anchor: '100%',
                maxLength: 400
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
                action: 'saveWebshopCategoryLang'
            }
				]
        }
		];
        me.callParent(arguments);
    }
});