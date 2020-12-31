Ext.define('Regardz.store.customer.ContractManageStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.customer.ContractManage',
    autoLoad: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Contract/ContractPaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            languageId: user_language
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});
 