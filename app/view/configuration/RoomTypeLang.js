Ext.define('Regardz.view.configuration.RoomTypeLang', {
    extend: 'Ext.window.Window',
    alias: 'widget.roomtypelang',
    modal: false,
    width: 400,
    border: false,
    title: 'Lang Room Type',
    autoShow: true,

    initComponent: function () {

        if (Ext.getCmp('roomtypeLang'))
            Ext.getCmp('roomtypeLang').destroy();

        var me = this;
        me.items = [{
            xtype: 'form',
            itemid: 'RoomTypeEditLang',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:10px;",
            items: [{
                xtype: 'combo',
                name: 'LanguageId',
                fieldLabel: 'Lang. for content'.l('SC20720') + '*',
                //queryMode: 'local',
                displayField: 'Name',
                valueField: 'LanguageId',
                emptyText: "Select language for content".l('SC20720'),
                anchor: '100%',
                allowBlank: false,
                store: Ext.getStore('common.LanguageListStore')
            }, {
                xtype: 'hidden',
                name: 'RoomTypeId'
                
            }, {
                xtype: 'hidden',
                name: 'LangRoomTypeId'
                
            }, {
                xtype: 'textfield',
                fieldLabel: 'Room Type Name'.l('SC20100') + '*',
                name: 'RoomTypeName',
                allowBlank: false,
                selectOnFocus: true,
                anchor: '100%',
                maxLength: 200
            }, {
                xtype: 'textarea',
                fieldLabel: 'Description'.l('SC20100'),
                name: 'Description',
                allowBlank: true,
                selectOnFocus: true,
                anchor: '100%',
                maxLength: 500
            }],
            buttons: [{
                text: 'Cancel'.l('w'),
                scope: me,
                handler: function () {
                    this.close();
                }
            }, {
                text: 'Save'.l('w'),
                action: 'saveRoomTypeLang'
            }]
        }];
        me.callParent(arguments);
    }
});