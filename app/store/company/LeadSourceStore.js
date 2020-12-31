Ext.define('Regardz.store.company.LeadSourceStore', {
    extend: 'Ext.data.Store',
    //fields: ['LeadSourceId', 'Name'],
    model: 'Regardz.model.company.LeadSource',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Company/GetAllLeadSource',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});	