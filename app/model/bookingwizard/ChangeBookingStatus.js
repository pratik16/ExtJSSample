Ext.define('Regardz.model.bookingwizard.ChangeBookingStatus', {
    extend: 'Ext.data.Model',
    //    fields: ['item', 'start', 'end', 'price', 'quantity', 'groupname', 'total']    
    fields: ['BookingEventId', 'BookingEventTrackingId', 'EventName', 'StatusId', 'BookingStatusCode', 'IsDraft', 'IsQuotOnOff', 
        'IsQuotWODateOnOff', 'IsOptional', 'IsTentative', 'IsDefinite', 'Rank', 'IsOptional2', 'IsOffStatus']
});