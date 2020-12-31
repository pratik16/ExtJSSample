Ext.define('Regardz.model.dashboard.Alert', {
    extend: 'Ext.data.Model',
    fields: ['AlertId', 'ActionId', 'AlertMessage', 'UserName', 'ActionCode', 'BookingNumber', 'BookingId',
    'BookingDate', 'BookingName', 'BookingTrackingId', 'StepNumber', 'ReservationId']
});