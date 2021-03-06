﻿Ext.define('Regardz.store.customer.ContractKickBackStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.customer.ContractKickBack',
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Contract/ContractCommissionPaging',
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
 