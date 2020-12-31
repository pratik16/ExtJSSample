Ext.define('Regardz.store.company.MergeChildCompanyStore', {
    extend: 'Ext.data.Store',
    //model: 'Regardz.model.company.ChildCompany',
    remoteSort: true,
    fields: ['CompanyId', 'CompanyName', 'City', 'PinCode', 'Checked'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Company/GetChildCompanyMerge',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            //id: 0, languageId: user_language
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    sorters: { property: 'CompanyName', direction: 'ASC' },
    pageSize: page_size
});	