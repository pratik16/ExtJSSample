Ext.define('Regardz.store.property.FloorPropertyStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.FloorProperty',
    autoLoad: false,
    // Load data from server

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ConfigFloor/GetFloorGlobalList',
        reader: {
            type: 'json',
            root: 'data'
        }//,
       // single: true
    },
    extraParams: {
    }
});	