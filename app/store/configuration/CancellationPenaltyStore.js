Ext.define('Regardz.store.configuration.CancellationPenaltyStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.CancellationPenalty',
    autoLoad: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/CancellationPenalty/GetCancellationPenaltyPaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            languageId: CurrentSessionUserId ///LanguageID is CurrentSession user will change in future
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});	