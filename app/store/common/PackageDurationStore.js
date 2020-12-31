Ext.define('Regardz.store.common.PackageDurationStore', {
    extend: 'Ext.data.Store',
    fields: ['Package', 'Duration'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/FixedPrice/GetPackageDurations',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            languageId: user_language
        }
    }
});