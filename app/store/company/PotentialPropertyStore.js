Ext.define('Regardz.store.company.PotentialPropertyStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.company.PotentialProperty',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/company/CompanyPotentialPropertyPaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: 0, languageId: user_language, searchString: ''
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },    
    pageSize: page_size
});