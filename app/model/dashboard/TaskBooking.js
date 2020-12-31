Ext.define('Regardz.model.dashboard.TaskBooking', {
    extend: 'Ext.data.Model',
    fields: ['BookingId', 'BookingName', 'BookingNumber', 'BookingDate', 'BookingLocation', 'BookingMeetingType', 'ReservationId',
    'CompanyId', 'CompanyName', 'IndividualId', 'IndividualName', 'Email', 'Phone', 'StatusId', 'Status']
});