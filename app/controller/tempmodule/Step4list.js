///*Minified by P*/
Ext.define('Regardz.controller.tempmodule.Step4list', {
    extend: 'Ext.app.Controller',
    stores: ['tempmodule.BookingTrackingListStore'],
    views: ['tempmodule.Step4list'],
    planboardController: false,
    bookingwizardController: false,
    init: function () {
        var me = this;
        this.control({
            'step4list': {
                afterrender: function () {

                },
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {                    
                    var zRec = iView.getRecord(iRowEl);
                    var data = zRec.data;
                    //log("data", data);
                    data.Number = 4;
                   // var stepObject = { Number: 4, BookingTrackingId: data.BookingTrackingId, Status: data.Status };
                    Utils.loadWizardStepsFromOutSide(me, data, "step4");
                }
            }
        })
    },

});