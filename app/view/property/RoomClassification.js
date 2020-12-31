Ext.require([
    'Ext.ux.CheckColumn'
]);
Ext.define('Regardz.view.property.RoomClassification', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.roomclassification',
    modal: true,
    autoScroll: true,
    border: false,
    autoShow: true,
    initComponent: function () {
        var me = this;

        if (Ext.getCmp('searchString'))
            Ext.getCmp('searchString').destroy();

        me.items = [
            {
                xtype: 'displayfield',
                height: 5
            },
            {
                xtype: 'grid',
                title: 'Classifications'.l('SC33150'),
                noResize: true,
                layout: 'fit',
                height: me.height - 50,
                store: Ext.getStore('property.RoomClasificationStore'),
                itemid: 'roomclassification',
                cls: 'gridwhitebackground',
                frame: false,
                autoScroll: true,
                columns: [{ hidden: true, dataIndex: 'RoomClassificationId', hideable: true },
                        { header: 'Name'.l('SC33150'), flex: 1, dataIndex: 'Classification' },
                        { width: 30, dataIndex: 'Checked', xtype: 'checkboxrow'}],

                tbar: ['->', {
                    xtype: 'button',
                    iconCls: 'filter',
                    disabled: true
                },
                {
                    xtype: 'textfield',
                    id: 'searchString',
                    itemid: 'searchString',
                    name: 'searchString',
                    enableKeyEvents: false
                },
                {
                    xtype: 'button',
                    iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
                    action: 'clearRoomClassification',
                    hidden: true
                },
                 {
                     xtype: 'button',
                     action: 'searchRoomsClassification',
                     iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
                 }
                ]
            }]
        me.callParent(arguments);
    }
})