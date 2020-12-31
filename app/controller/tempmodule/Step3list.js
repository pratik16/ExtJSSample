///*Minified by P*/
Ext.define('Regardz.controller.tempmodule.Step3list', {
    extend: 'Ext.app.Controller',
    stores: ['tempmodule.BookingTrackingListStore'],
    views: ['tempmodule.Step3list'],
    planboardController: false,
    bookingwizardController: false,
    init: function () {
        var me = this;
        this.control({
            'step3list': {
                afterrender: function () {

                },
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var zRec = iView.getRecord(iRowEl);
                    var data = zRec.data;
                    log("data", data);
                    data.Number = 2;
                   // var stepObject = { Number: 2, BookingTrackingId: data.BookingTrackingId, Status: data.Status };
                    Utils.loadWizardStepsFromOutSide(me, data, "step3");
                }
            }
        })
    },

});