Ext.define('Regardz.view.bookingwizard.NoConfirmationWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.noconfirmationwindow',
    modal: true,
    border: false,
    width: 400,
    title: 'Unable To Confirm [SC50610]'.l('SC50610'),
    initComponent: function () {

        var me = this;

        me.items = [
        //{ xtype: 'hidden', itemid: 'totalBookingAmt', value: 0 },
         {
             xtype: 'combo',
             margin: 10,
             itemid: 'unccancellationStore',
             fieldLabel: 'Reason'.l('SC50610')+'*',
             displayField: 'Reason',
             valueField: 'CancellationReasonId',
             action: 'cancellationreasonChange',
             allowBlank: false,
             width: 300,
             labelWidth: 100,
             store: 'common.CancellationReasonStore',
             emptyText: 'Select Reason'.l('SC72000')
         },
         {
             margin: 10,
             xtype: 'displayfield',
             fieldLabel: 'Remark'.l('SC50610')
         },
         {
             margin: '0 10 10 10',
             height: 150,
             xtype: 'textareafield',
             itemid: 'reasonTextArea',
             disabled: false,
             width: 370
         }
        ];

        me.bbar = ['->',
            {
                xtype: 'button',
                text: 'Close'.l('g'),
                width: 100,
                handler: function () {
                    me.close();
                }
            }, {
                xtype: 'button',
                action: 'saveBookingUNC',
                width: 100,
                text: 'Ok'.l('SC50610')
            }];

        me.callParent(arguments);
    }
});