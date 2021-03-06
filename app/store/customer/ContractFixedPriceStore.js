﻿Ext.define('Regardz.store.customer.ContractFixedPriceStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.customer.ContractFixedPrice',
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Contract/ContractFixedPricePaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            //languageId: user_language
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});
 