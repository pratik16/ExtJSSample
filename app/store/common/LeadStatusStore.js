Ext.define('Regardz.store.common.LeadStatusStore', {
    extend: 'Ext.data.Store',
    fields: [{ name: 'LeadStatusId', type: 'int' }, 'Name'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/MasterValue/GetLeadStatus',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: user_language
        }
    }
});