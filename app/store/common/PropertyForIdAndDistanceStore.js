Ext.define('Regardz.store.common.PropertyForIdAndDistanceStore', {
    extend: 'Ext.data.Store',
    fields: ['PropertyId', 'PropertyName'],
    autoLoad: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/property/GetPropertyForIdAndDistance',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: 0,
            languageId: user_language, //languageId            
            distance: 0
        }
    }
});