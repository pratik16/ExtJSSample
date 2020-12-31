Ext.define('Regardz.controller.bookingwizard.BookingConfirmations', {
    extend: 'Ext.app.Controller',
    views: ['bookingwizard.RightSide.Windows.SentConfirmation.AddConfirmation'],
    stores: ['bookingwizard.RightSide.BookingConfirmationStore'],
    thisController: false,
    refs: [{ ref: 'addConfirmation', selector: 'sentconfirmationaddconfirmation'}],
    init: function () {
        var me = this;
        this.control(
        {
            'sentconfirmations': {
                afterrender: function () {
                    ///
                }
            },
            'sentconfirmationaddconfirmation': {
                afterrender: function () {
                    var urlItem = webAPI_path + 'api/BookingConfirmation/GetBookingConfirmationById';
                    var form = Ext.ComponentQuery.query('[itemid="addConfirmationForm"]')[0].getForm();

                    var bookingConfirmationId = 0;
                    if (Utils.isValid(form))
                        bookingConfirmationId = form.findField('BookingConfirmationId').value;

                    Ext.data.JsonP.request({
                        url: urlItem,
                        type: 'GET',
                        params: { id: bookingConfirmationId },
                        success: function (response) {
                            var r = response;
                            if (r.success) {
                                form.findField('DocumentDescription').setValue(r.data.DocumentDescription);
                                form.findField('DocumentPathFileName').setValue(r.data.DocumentPathFileName);
                            }
                        }
                    });
                }
            },
            'sentconfirmations [itemid="sendconfirmationgrid"]': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var obj = iView.getRecord(iRowEl);
                    if (iColIdx == 4) {
                        Ext.create('widget.sentconfirmationaddconfirmation', { BookingConfirmationId: obj.data.BookingConfirmationId, ReservationId: obj.data.ReservationId }).show();
                    } else if (iColIdx == 5) {
                        var URL = "PDFViewer.aspx?type=bc&file=" + obj.data.DocumentPath;
                        window.open(URL, '_blank');
                    }
                }
            },
            'button[action="saveBookingConfirmation"]': {
                click: function () {
                    var addConfirmationForm = Ext.ComponentQuery.query('[itemid="addConfirmationForm"]')[0];

                    if (addConfirmationForm.getForm().isValid()) {
                        addConfirmationForm.getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                        addConfirmationForm.getForm().findField('CreatedBy').setValue(CurrentSessionUserId)

                        addConfirmationForm.getForm().submit({
                            url: webAPI_path + 'api/BookingConfirmation/AddBookingConfirmation',
                            method: 'POST',
                            data: addConfirmationForm,
                            waitMsg: 'Uploading file please wait.'.l('g'),
                            success: function (form, response) {
                                me.getAddConfirmation().close();
                                Ext.getStore('bookingwizard.RightSide.BookingConfirmationStore').reload();
                            },
                            failure: function (form, response) {
                                var win = Ext.WindowManager.getActive();
                                if (win) {
                                    win.close();
                                }
                                Ext.Msg.alert('Error'.l('g'), 'File not saved.'.l('SC31510'));
                            }
                        });
                    }
                }
            }
            //////////////////
        })
    }
});