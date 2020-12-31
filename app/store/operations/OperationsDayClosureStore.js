Ext.define('Regardz.store.operations.OperationsDayClosureStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.operations.OperationsDayClosure',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/InHouse/GetDayClosureBookingsDetail',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: 0, id1: 0, id2: 0, id3: 0
        }
    }
});

