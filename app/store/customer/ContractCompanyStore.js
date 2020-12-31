var companyStore = Ext.create('Ext.data.Store', {
    fields: ['CompanyId', 'CompanyName'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/customer/GetAllCompanies',
        reader: {
            type: 'json',
            root: 'data'
        }

    }
});