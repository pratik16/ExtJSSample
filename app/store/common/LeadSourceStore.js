Ext.define('Regardz.store.common.LeadSourceStore', {
    extend: 'Ext.data.Store',
    fields: [{ name: 'LeadSourceId', type: 'int' }, 'Name'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/MasterValue/GetLeadSource',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: user_language
        }
    }
});