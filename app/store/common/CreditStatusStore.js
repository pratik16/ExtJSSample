Ext.define('Regardz.store.common.CreditStatusStore', {
    extend: 'Ext.data.Store',
    fields: [{ name: 'LeadSourceId', type: 'int' }, 'Name'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/MasterValue/GetCreditStatus',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: user_language
        }
    }
});