﻿Ext.define('Regardz.store.configuration.AutomatedTraceListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.AutomatedTraceList',    
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/AutomatedTrace/AutomatedTracePaging',
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