Ext.define('Regardz.store.common.BusinessTypeStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.common.BusinessType',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/MasterValue/GetBusinessTypes',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: user_language
        }
    }
});