Ext.define('Regardz.store.bookingwizard.infopanel.ConfirmationsStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.infopanel.Confirmations',
    autoLoad: true,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Company/GetGDSDetailbyId',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: 0//, languageId: user_language
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});	