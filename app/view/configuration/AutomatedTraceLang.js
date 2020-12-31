Ext.define('Regardz.view.configuration.AutomatedTraceLang', {
    extend: 'Ext.window.Window',
    alias: 'widget.automatedtracelang',
    modal: false,
    width: 400,
    border: false,
    title: 'Lang Automated Traces_Title'.l('SC20920'),
    autoShow: true,

    initComponent: function () {

        var me = this;
        me.items = [{
            xtype: 'form',
            itemid: 'automatedTraceLangForm',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:10px;",
            fileUpload: true,
            items: [{
                xtype: 'combo',
                name: 'LanguageId',
                fieldLabel: 'Lang. for content'.l('SC20720'),
                //queryMode: 'local',
                displayField: 'Name',
                valueField: 'LanguageId',
                emptyText: "Select language for content".l('SC20720'),
                anchor: '100%',
                allowBlank: false,
                store: Ext.getStore('common.LanguageListStore'),
                value: user_language
            }, {
                xtype: 'hidden',
                name: 'AutomatedTraceId',
                itemid: 'AutomatedTraceId',
                value: me.AutomatedTraceId
            }, {
                xtype: 'hidden',
                name: 'LangAutomatedTraceId',
                value: me.LangAutomatedTraceId
            }, {
                xtype: 'textfield',
                fieldLabel: 'Message'.l('SC20900'),
                name: 'Message',
                allowBlank: false,
                selectOnFocus: true,
                anchor: '100%',
                maxLength: 50
            }],
            buttons: [{
                text: 'Cancel'.l('w'),
                scope: me,
                handler: function () {
                    this.close();
                }
            }, {
                text: 'Save'.l('w'),
                action: 'saveAutomatedTraceLang'
            }]
        }];
        me.callParent(arguments);
    }
});