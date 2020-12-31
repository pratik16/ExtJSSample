//var outletGloblePara;
//outletGloblePara.languageId = 1033;
//outletGloblePara.limit = page_size;
//outletGloblePara.start = 0;
//outletGloblePara.propertyId = 16;
//extraParams: {            outletGloblePara: { languageId: 1033, limit: page_size, start: 0, propertyId: 1 }        }

Ext.define('Regardz.store.property.OutletGlobalListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.Outlet',
    autoLoad: false,
    // Load data from server

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ConfigOutlet/OutletGlobalPaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
         limit: page_size, languageId: user_language
        },
         baseParams: {
            start: 0
        }
    },
    pageSize: page_size
});