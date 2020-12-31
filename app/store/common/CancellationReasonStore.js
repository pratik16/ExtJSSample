Ext.define('Regardz.store.common.CancellationReasonStore', {
    extend: 'Ext.data.Store',
    fields: [{ name: 'CancellationReasonId', type: 'int' }, 'Reason'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/MasterValue/GetCancellationReason',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: user_language
        }
    }
});