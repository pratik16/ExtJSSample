﻿Ext.define('Regardz.store.configuration.FixedPriceManageStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.FixedPricePackgae',
    autoLoad: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/FixedPrice/FixedPricePaging',
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