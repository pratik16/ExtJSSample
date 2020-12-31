Ext.define('Regardz.controller.layout.BookingWizard', {
    extend: 'Ext.app.Controller',

    views: ['layout.BookingWizard', 'bookingwizard.BookingWizardPanel'],

    BWPanelController: false,
    thisController: false,
    init: function () {
        
        var me = this;

        var bwpc = me.getController('bookingwizard.BookingWizardPanel');

        if (bwpc.thisController == false) {
            bwpc.init();
            bwpc.thisController = true;
        }

        var c1 = me.getController('bookingwizard.BookingWizardStep1');

        if (c1.thisController == false) {
            c1.init();
            c1.thisController = true;
        }

        this.control({

        });
    }

});