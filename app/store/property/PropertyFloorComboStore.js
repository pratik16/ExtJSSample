Ext.define('Regardz.store.property.PropertyFloorComboStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.PropertyFloorCombo',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ConfigFloor/GetFloorPerPropertyforCombo',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});	