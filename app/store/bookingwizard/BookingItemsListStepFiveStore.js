Ext.define('Regardz.store.bookingwizard.BookingItemsListStepFiveStore', {
    extend: 'Ext.data.Store',
    fields: ['groupName', 'EventId', 'EventName', 'StartTime', 'EndTime', 'Price', 'Quantity', 'Total', 'DisplyItemName', 'DayNumber', 'invoicename', 'DataType', 'DisplayEventName', 'IsRoomRent','IsCanceled'],
    groupField: 'DisplayEventName',
    remoteGroup: true,
    remoteSort: true,
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Booking/GetBookingItemListForStep5',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});