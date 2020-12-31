///*Minified by P*/
Ext.define('Regardz.controller.tempmodule.Step6list', {
    extend: 'Ext.app.Controller',
    stores: ['tempmodule.BookingTrackingListStore'],
    views: ['tempmodule.Step6list'],
    planboardController: false,
    bookingwizardController: false,
    init: function () {
        var me = this;
        this.control({
            'step6list': {
                afterrender: function () {

                },
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var zRec = iView.getRecord(iRowEl);
                    var data = zRec.data;
                    log("data", data);
                    var stepObject = { Number: 6, ReservationId: data.ReservationId, Status: data.Status };
                    Utils.loadWizardStepsFromOutSide(me, stepObject, "step6");
                }
            }
        })
    },

});