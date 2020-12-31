///*Minified by P*/
Ext.define('Regardz.controller.tempmodule.Step5list', {
    extend: 'Ext.app.Controller',
    stores: ['tempmodule.BookingTrackingListStore'],
    views: ['tempmodule.Step5list'],
    planboardController: false,
    bookingwizardController: false,
    init: function () {
        var me = this;
        this.control({
            'step5list': {
                afterrender: function () {

                },
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var zRec = iView.getRecord(iRowEl);
                    var data = zRec.data;
                    //log("data", data);
                   // var stepObject = { Number: 5, BookingTrackingId: data.BookingTrackingId, Status: data.Status };
                   data.Number = 5;
                    Utils.loadWizardStepsFromOutSide(me, data, "step5");
                }
            }
        })
    },

});