Ext.define('Regardz.store.property.YieldTemplateStore2', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.PropertyYieldTemplate',
    autoLoad: false,
    //mode: 'local',
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ConfigYieldTemplate/GetYieldTemplateListByPropertyId',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});

 