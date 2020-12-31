Ext.define('Regardz.view.operations.windows.inhouse.InternalRemarkWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.inhouseinternalremark',
    modal: true,
    border: false,
    title: 'Internal Remark_Title'.l('SC71600'),
    width: 400,
    padding: 10,
    BookingId: 0,
    CustomerRemark: '',
    InvoiceDetails: false,
    Discussion: false,
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'textareafield',
            anchor: '100%',
            width: '100%',
            height: 200,
            itemid: 'inhouseRemarkText',
            value: me.CustomerRemark
        },
        {
            xtype: 'fieldcontainer',
            defaultType: 'checkboxfield',
            itemid: 'inhouseRemarkCheckbox',
            items: [
                {
                    boxLabel: 'Invoice details issue'.l('SC71600'),
                    id: 'ckInhouseInvoiceDetails',
                    checked: me.InvoiceDetails
                }, {
                    boxLabel: 'Discussion'.l('SC71600'),
                    id: 'ckInhouseInvoiceDiscussion',
                    checked: me.Discussion
                }
            ]
        }, {
            xtype: 'textfield',
            hidden: true,
            itemid: 'remarkBookingId',
            value: me.BookingId
        }];
        me.buttons = [{
            text: 'Close'.l('g'),
            handler: function () {
                me.close();
            }
        },
          {
              text: 'Save'.l('g'),
              action: 'inhouseSaveInternalRemark'
          }];
        me.callParent();

    }
});