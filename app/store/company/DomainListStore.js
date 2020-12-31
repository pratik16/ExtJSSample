Ext.define('Regardz.store.company.DomainListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.company.CompanyDomain',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Company/GetDomainForCompany',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: 0
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});	