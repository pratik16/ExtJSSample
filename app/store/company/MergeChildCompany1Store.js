Ext.define('Regardz.store.company.MergeChildCompany1Store', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.company.ChildCompany',
    remoteSort: true,
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Company/GetChildCompanyForParent',
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