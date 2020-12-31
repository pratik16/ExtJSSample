Ext.define('Regardz.store.company.AddChildCompanyStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.company.AddChildCompany',
    remoteSort: true,
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Company/GetChildCompanyForAssociation',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: 0, id1: 0, languageId: user_language, searchString: ''
        }
    },
    baseParams: {
        limit: 10, start: 0
    },
    sorters: { property: 'CompanyName', direction: 'ASC' },
    pageSize: 10
});	