Ext.define('Regardz.store.common.PropertyForNamesStore', {
    extend: 'Ext.data.Store',
    fields: ['PropertyId', 'PropertyName'],
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/property/GetPropertiesByUserId',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: { languageId: user_language, userId: CurrentSessionUserId }
    }
});