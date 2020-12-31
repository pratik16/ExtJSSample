Ext.define('Regardz.store.property.BWPropertyFacilityIcons', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.PropertyFacilityIcons',
    id: 'BWPropertyFacilityIcons',
    autoLoad: false,
    // Load data from server

    proxy: {
        type: 'jsonp',
           

        url: webAPI_path + 'api/property/GetBWPropertyFacilityIcon',
        filterParam: 'filter',
        remoteFilter: false,
        remoteSort: false,
      
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});