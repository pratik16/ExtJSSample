Ext.define('Regardz.model.bookingwizard.EventWithItemsList', {
    extend: 'Ext.data.Model',
    fields: [
        'EventName',
        'EventId',
        'EndTime',
        'StartTime',
        'FixedPriceEventId',
        'FixedPriceId',
        {
            'name': 'Items',
            'type': 'auto'
        }]
});