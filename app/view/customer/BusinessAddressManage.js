Ext.define('Regardz.view.customer.BusinessAddressManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.businessaddressmanage',
    modal: true,
    width: 400,
    y: 0,
    //height: 200,
    border: false,
    title: 'Business Type Edit [SC61170]'.l('SC61170'),
    autoShow: true,

    initComponent: function () {

        if (Ext.getCmp('manageBusinessType'))
            Ext.getCmp('manageBusinessType').destroy();

        var me = this;
        me.items = [{
            xtype: 'form',
            id: 'manageBusinessType',
            border: false,
            bodyStyle: 'padding:5px 5px 0',
            //width: 350,
            fieldDefaults: {
                msgTarget: 'side',
                labelWidth: 100
            },
            defaults: {
                anchor: '100%'
            },

            items: [{
                xtype: 'panel',
                border: false,
                style: 'background:none; border:0px;',
                layout: 'hbox',
                padding: '0 0 5 0',
                items: [
                //{ xtype: 'hidden', name: 'LanguageId' }, 
                {
                    xtype: 'combo',
                    fieldLabel: 'Business type'.l('SC61170'),
                    name: 'BusinessTypeId',
                    emptyText: 'Select Business type'.l('SC61170'),
                    allowBlank: true,
                    store: 'common.BusinessTypeStore',
                    queryMode: 'local',
                    displayField: 'BusinessTypeName',
                    valueField: 'BusinessTypeId'
                },{
                    xtype: 'hidden',
                    name: 'BookingId',
                    value: me.BookingId
                },
                {
                    xtype: 'hidden',
                    name: 'BookingTrackingId',
                    value: me.BookingTrackingId
                }
                ]
            }],
            buttons: [{
                text: 'Cancel'.l('w'),
                handler: function () {
                    me.close();
                }
            }, {
                text: 'Save'.l('w'),
                action: 'saveBusinessAddress'
            }]
        }];
        me.callParent(arguments);
    }
});