Ext.define('Regardz.store.configuration.BusinessAlertActionStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.BusinessAlertAction',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Alert/GetAlertActionList',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});
 