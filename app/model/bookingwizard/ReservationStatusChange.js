Ext.define('Regardz.model.bookingwizard.ReservationStatusChange', {
    extend: 'Sch.model.Resource',
    fields: ['ReservationId', 'BookingId', 'BookingTrackingId', 'BookingDate', 'BookingNumber', 'BookingName', 'StatusId', 'BookingStatusCode',
    'IsDraft', 'IsQuotOnOff', 'IsQuotWODateOnOff', 'IsOptional', 'IsTentative', 'IsDefinite', 'IsOptional2', 'IsOffStatus']
});