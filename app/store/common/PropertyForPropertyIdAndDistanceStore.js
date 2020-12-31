Ext.define('Regardz.store.common.PropertyForPropertyIdAndDistanceStore', {
    extend: 'Ext.data.Store',
    fields: ['PropertyId', 'PropertyName'],
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/property/GetPropertyForPropertyIdAndDistance',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: '',
            languageId: user_language, //languageId            
            distance: 0
        }
    }
});