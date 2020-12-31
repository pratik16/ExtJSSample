Ext.define('Regardz.store.yield.YieldExceptionStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.yield.YieldException',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Yield/GetYieldExceptionData',
        //parameter:id =  propretyID, start = 0, limit = 5,languageId = 1033
        reader: {
            type: 'json',
            root: 'data'
        },
        baseParams: {
            limit: page_size
        }
    },
    pageSize: page_size



});	