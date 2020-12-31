
Ext.define('Regardz.store.configuration.DiscountManageStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.DiscountManage',
    autoLoad: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Discount/GetDiscountPaging',
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
 