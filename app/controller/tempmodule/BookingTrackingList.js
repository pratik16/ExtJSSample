///*Minified by P*/
Ext.define('Regardz.controller.tempmodule.BookingTrackingList', {
    extend: 'Ext.app.Controller',
    stores: ['tempmodule.BookingWizardListStore'],
    views: ['tempmodule.BookingtrackingList'],
    planboardController: false,
    bookingwizardController: false,
    init: function () {
        var me = this;
        this.control({
            'bookingtrackinglist': {
                afterrender: function () {

                },
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    var myWindow = _myDesktopApp.getModule('bookingWiz-win');
                    var createdWindow = myWindow.createWindow();
                    createdWindow.stepObject = { Number: 1, ReservationId: zRec.data.ReservationId };
                    createdWindow.show();

                    //alert("dupa show");
                }
            }
        })
    },

});