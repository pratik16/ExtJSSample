Ext.define('Regardz.controller.bookingwizard.ReservationLock', {
    extend: 'Ext.app.Controller',
    //views: ['bookingwizard.BWContactList', 'bookingwizard.BookingContactListWindow'],    
    //stores: ['bookingwizard.CompanyContactListStore'],
    refs: [{
        ref: 'lockedreservationwindow',
        selector: 'lockedreservationwindow'
    }],

    thisController: false,
    init: function () {
        var me = this;
        this.control({
            'lockedreservationwindow button[action="overrideReservation"]': {
                click: function () {
                    var form = Ext.ComponentQuery.query('lockedreservationwindow [itemid="lockedReservationWindow"]')[0];
                    form.getForm().findField('OverrideBy').setValue(CurrentSessionUserId);
                    var ReservationId = form.getForm().findField('ReservationId').getValue();
                    var BookingTrackingId = Number(Ext.ComponentQuery.query('lockedreservationwindow [itemid="LRBookingTrackingId"]')[0].getValue());
                    var BookingId = Number(Ext.ComponentQuery.query('lockedreservationwindow [itemid="LRBookingId"]')[0].getValue());
                    var StepNumber = Number(Ext.ComponentQuery.query('lockedreservationwindow [itemid="LRStepNumber"]')[0].getValue());
                    var Status = Number(Ext.ComponentQuery.query('lockedreservationwindow [itemid="LRStatus"]')[0].getValue());


                    if (form.getForm().isValid()) {

                        form.getForm().submit({
                            url: webAPI_path + "api/reservation/OverRideLockedReservation",
                            method: 'POST',
                            success: function (form, response) {
                                var r = response.response.responseText;
                                var r = Ext.decode(r);

                                me.getLockedreservationwindow().close();                                
                                if (r.success == true) {

                                    var stepObject = { Number: StepNumber, BookingId: BookingId, BookingTrackingId: BookingTrackingId, Status: Status, ReservationId: ReservationId };
                                    Utils.loadWizardStepsFromOutSideAfterLockCheck(me, stepObject, "step" + StepNumber);

                                }
                                else {
                                }
                            },
                            failure: function (form, response) {
                                Ext.Msg.alert('Error'.l('g'), 'Not override.'.l('g'))
                            }
                        })
                    }


                }
            }
        });
    }
});