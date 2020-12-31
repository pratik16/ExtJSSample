Ext.define('Regardz.store.common.BarStore', {
    extend: 'Ext.data.Store',
    fields: ['BarId', 'BarName'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Bar/GetBARList',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});