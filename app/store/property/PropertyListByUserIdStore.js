Ext.define('Regardz.store.property.PropertyListByUserIdStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.Property',
    autoLoad: false,
    //remoteSort: true,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/property/GetPropertiesByUserId',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: { languageId: user_language, userId: CurrentSessionUserId }
    },
    pageSize: page_size
});