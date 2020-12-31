Ext.define('Regardz.store.extraz.ExtrazIndividualListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.extraz.ExtrazIndividual',
    autoLoad: false,
    remoteSort: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ExtrazPoints/ExtraazIndividualsPaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            languageId: user_language, searchString: ''
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    sorters: { property: 'IndividualName', direction: 'ASC' },
    pageSize: page_size
});