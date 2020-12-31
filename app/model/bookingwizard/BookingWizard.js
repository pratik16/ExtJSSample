Ext.define('Regardz.model.bookingwizard.BookingWizard', {
    extend: 'Ext.data.Model',
    fields: ['BookingWizardId',
        'ReservationId',
        'BookingName',
        'LocationName',
        'StatusId',
        'PropertyId',
        'CompanyId',
        'IndividualId',
        'IndividualName',
        'StartDate',
        'EndDate',
        'FromTime',
        'ToTime',
        'NoOfPeople',
        'BusinessTypeId',
        'PropertyFeatureId',
        'IsOptionalBooking',
        'ContactOnLocation',
        'Distance',
        'ContactPhone',
        'Note',
        'CreatedDate',
        'CreatedBy',
        'UpdatedDate',
        'UpdatedBy',
        'MeetingTypeId',
        'BookingTrackingId',
        'MultipleDays'
    ],
    getStartDate: function () {
        return this.get('StartDate');
    },
    getEndDate: function () {
        return this.get('EndDate');
    },
    getMultipleDays:function(){
        return this.get('MultipleDays');
    },
    getBookingTrackingId: function () {
        return this.get('BookingTrackingId');
    }
});