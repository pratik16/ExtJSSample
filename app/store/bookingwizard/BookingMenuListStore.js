Ext.define('Regardz.store.bookingwizard.BookingMenuListStore', {
    extend: 'Ext.data.Store',
    fields: ['MenuItemId', 'ItemGroupId', 'PropertyId', 'IsActive', 'LanguageId', 'MenuItemName', 'Description', 'MenuType'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ItemMenu/GetBookingMenuList',
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