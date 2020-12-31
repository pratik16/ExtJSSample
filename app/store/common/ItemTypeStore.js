Ext.define('Regardz.store.common.ItemTypeStore', {
    extend: 'Ext.data.Store',
    fields: ['ItemTypeId', 'ItemTypeName'],

    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ConfigItem/GetItemTypeForName',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: user_language //languageId
        }
    }
});