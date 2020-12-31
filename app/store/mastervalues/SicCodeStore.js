Ext.define('Regardz.store.mastervalues.SicCodeStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.mastervalues.SicCode',
    autoLoad: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/MasterValue/GetSICCodes',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});	