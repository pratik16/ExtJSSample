Ext.define('Regardz.store.yield.YieldTemplateStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.yield.YieldTemplate',
    autoLoad: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ConfigYieldTemplate/GetYieldTemplateListByPropertyId',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: 1, languageId: user_language, searchParam: 0
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});	
