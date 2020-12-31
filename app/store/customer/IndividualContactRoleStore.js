Ext.define('Regardz.store.customer.IndividualContactRoleStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.customer.IndividualContactRole',
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Individual/GetIndividualcontactRole',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: user_language, id1: 0, lang: 0
        }
    },
    pageSize: page_size
});