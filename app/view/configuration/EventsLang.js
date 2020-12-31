Ext.define('Regardz.view.configuration.EventsLang', {
    extend: 'Ext.window.Window',
    alias: 'widget.eventslang',
    modal: false,
    width: 400,
    border: false,
    title: 'Lang Events_Title'.l('SC20720'),
    autoShow: true,

    initComponent: function () {

        if (Ext.getCmp('eventsLang'))
            Ext.getCmp('eventsLang').destroy();

        var me = this;
        me.items = [{
            xtype: 'form',
            id: 'eventsLang',
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
                store: Ext.getStore('common.LanguageListStore')
            }, {
                xtype: 'hidden',
                name: 'EventId',
                value: me.eventId
            }, {
                xtype: 'hidden',
                name: 'LangEventId',
                value: me.langEventId
            }, {
                xtype: 'textfield',
                fieldLabel: 'Event Name'.l('SC20700'),
                name: 'EventName',
                allowBlank: false,
                selectOnFocus: true,
                anchor: '100%',
                maxLength: 50
            }],
            buttons: [{
                text: 'Cancel'.l('g'),
                scope: me,
                handler: function () {
                    this.close();
                }
            }, {
                text: 'Save'.l('g'),
                action: 'saveEventsLang'
            }]
        }];
        me.callParent(arguments);
    }
});