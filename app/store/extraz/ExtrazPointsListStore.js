Ext.define('Regardz.store.extraz.ExtrazPointsListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.extraz.ExtrazPoints',
    autoLoad: false,
    remoteSort: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ExtrazPoints/ExtraazPointsPagings',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            languageId: 0, searchString: ''
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    sorters: { property: 'ExtrazDate', direction: 'DESC' },
    pageSize: page_size
});