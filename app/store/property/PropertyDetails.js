Ext.define('Regardz.store.property.PropertyDetails', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.Property',
    autoLoad: false,
    buffered: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/property/GetBWProperty',

        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: { 'id': 0, 'languageId': 0 }
    },
    pageSize: page_size
});