
Ext.define('Regardz.store.configuration.AdvancePaymentManageStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.AdvancePaymentManage',
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/AdvancePaymentRule/AdvancePaymentRulePaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            start: 0, limit: page_size, languageId: user_language
        }
    },
    pageSize: page_size
});
 