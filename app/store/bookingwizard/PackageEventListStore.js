Ext.define('Regardz.store.bookingwizard.PackageEventListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.PackageList',
    autoLoad: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Booking/GetPackagesEventList',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: 93, languageId: user_language, searchParam: ''
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});	