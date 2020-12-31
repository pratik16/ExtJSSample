Ext.define('Regardz.store.Operations.OperationsPropertyFloorPlanStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.FloorPlan',
    autoLoad: false,
    // Load data from server

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/PropertyFloorPlan/OperationsPropertyFloorPlanPagging',
        reader: {
            type: 'json',
            root: 'data'
        }//,
        // single: true
    },
    extraParams: {
        id: 0, limit: page_size, start: 0, languageId: user_language
    },
    pageSize: page_size
});	