Ext.define('Regardz.view.bookingwizard.RightSide.Windows.SentConfirmation.AddConfirmation', {
    extend: 'Ext.window.Window',
    alias: 'widget.sentconfirmationaddconfirmation',
    modal: true,
    border: false,
    title: 'Upload Confirmation_Title',
    width: parseInt(Ext.getBody().getViewSize().width * (0.45)),
    initComponent: function () {
        var me = this;

        if (Ext.getCmp('addConfirmationForm'))
            Ext.getCmp('addConfirmationForm').destroy();

        me.items = [
            {
                xtype: 'form',
                fileUpload: true,
                itemid: 'addConfirmationForm',
                id: 'addConfirmationForm',
                border: false,
                bodyStyle: 'background: none',
                style: 'padding:10px',
                buttonAlign: 'end',
                items:
                [
                    {
                        xtype: 'textfield',
                        name: 'DocumentDescription',
                        itemid: 'DocumentDescription',
                        anchor: '100%',
                        fieldLabel: 'Description'.l('SC31410') + '*',
                        allowBlank: false
                    },
                    {
                        xtype: 'filefield',
                        name: 'DocumentPath',
                        itemid: 'DocumentPath',
                        fieldLabel: 'Document' + '*',
                        vtype: 'pdffile',
                        allowBlank: false,
                        blankText: 'Select the file for upload'.l('SC31410'),
                        typeAhead: true,
                        selectOnFocus: true,
                        anchor: '100%'
                    },
                    {
                        xtype: 'displayfield',
                        name: 'DocumentPathFileName',
                        //fieldLabel: ' ',
                        margin: '0 0 0 110',
                        anchor: '100%'
                    },
                    { xtype: 'hidden', name: 'BookingConfirmationId', value: me.BookingConfirmationId },
                    { xtype: 'hidden', name: 'ReservationId', value: me.ReservationId },
                    { xtype: 'hidden', name: 'CreatedDate' }, { xtype: 'hidden', name: 'CreatedBy' }
                ],
                buttons: [{
                    text: 'Cancel'.l('w'),
                    scope: me,
                    handler: function () {
                        this.close();
                    }
                }, {
                    text: 'Save'.l('w'),
                    action: 'saveBookingConfirmation'
                }]
            }];
        me.callParent();
    }
});