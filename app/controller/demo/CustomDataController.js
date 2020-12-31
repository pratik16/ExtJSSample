Ext.define('Regardz.controller.demo.CustomDataController', {
    extend: 'Ext.app.Controller',
    views: ['demo.CustomDataList'],
    //store: 'demo.CustomDataStore',
    stores: ['demo.CustomDataStore'],
    init: function () {
        this.control({
            'customList': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    alert('clicked');
                }
            }

        });

        var c = me.getController('bookingwizard.BookingWizardStep1');
        if (c.thisController == false) {
            c.init();
            c.thisController = true;
         }

    }


});