Ext.define('Regardz.store.bookingwizard.GroupStore', {
    extend: 'Ext.data.Store',
    fields: ["GroupName"],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Booking/GetGroupNameListForBooking',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {

        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});