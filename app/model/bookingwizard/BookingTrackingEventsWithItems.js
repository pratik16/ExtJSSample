Ext.define('Regardz.model.bookingwizard.BookingTrackingEventsWithItems', {
    extend: 'Ext.data.Model',
    fields: [
        {
            'name': 'Event',
            'type': 'auto'
        },
        {
            'name': 'Items',
            'type': 'auto'
        }]
});