Ext.define('Regardz.store.company.BookingStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.company.Booking',
    autoLoad: false,
    remoteSort: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Booking/GetBookingforCompanyPaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: 0, id1: 0, languageId: user_language, searchString: '',   userId: CurrentSessionUserId
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    sorters: { property: 'BookingName', direction: 'ASC' },
    pageSize: page_size
});	