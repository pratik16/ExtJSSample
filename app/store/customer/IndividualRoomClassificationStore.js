Ext.define('Regardz.store.customer.IndividualRoomClassificationStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.customer.IndividualRoomClassification',
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Individual/GetIndividualRoomClassification',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: user_language, id1: 0, lang: 0
        }
    },
    pageSize: page_size
});