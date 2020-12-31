Ext.define('Regardz.view.configuration.ItemLang', {
    extend: 'Ext.window.Window',
    alias: 'widget.itemlang',
    //layout: 'absolute',
    modal: false,
    width: 400,
    border: false,
    title: 'Lang Item_Title'.l('SC21930'),
    autoShow: true,   

    initComponent: function () {

        var me = this;
        me.items = [{
            xtype: 'form',
            id: 'itemLang',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:10px;",
            fileUpload: true,
            items: [{
                xtype: 'combo',
                name: 'LanguageId',
                fieldLabel: 'Lang. for content'.l('SC21930'),
                //queryMode: 'local',
                displayField: 'Name',
                valueField: 'LanguageId',
                emptyText: "Select language for content".l('SC21930'),
                anchor: '100%',
                allowBlank: false,
                store: Ext.getStore('common.LanguageListStore')
            }, {
                xtype: 'hidden',
                name: 'ItemId',
                value: me.itemId
            }, {
                xtype: 'hidden',
                name: 'LangItemId',
                value: me.langItemId
            }, {
                xtype: 'textfield',
                fieldLabel: 'Item Name'.l('SC21930'),
                name: 'ItemName',
                allowBlank: false,
                selectOnFocus: true,
                anchor: '100%',
                maxLength: 120
            }, {
                xtype: 'textareafield',
                fieldLabel: 'Description'.l('SC21930'),
                name: 'Description',
                selectOnFocus: true,
                anchor: '100%',
                maxLength: 256
            }],
            buttons: [{
                text: 'Cancel'.l('w'),
                scope: me,
                handler: function () {
                    this.close();
                }
            }, {
                text: 'Save'.l('w'),
                action: 'saveItemLang'
            }]
        }];
        me.callParent(arguments);
    }
});