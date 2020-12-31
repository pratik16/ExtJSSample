Ext.define('Regardz.store.customer.CustomerListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.customer.CustomerManage',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/company/CustomerPaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            languageId: user_language,
            companyName: '',
            abbr: '', 
            contactName: '', 
            city: '', 
            countryId: -1, 
            qualityRatingId: -1, 
            salesManagerId: -1, 
            marketSegmentId: -1,
            industryId: -1,
            creditStatusId: -1, 
            includeInActive: false, 
            hasParent : false, 
            hasChild: false,
            hasContract: false,
            includeMerged: false,
            exportExcel: false,
            companyStatusId: -1
        }
    },
    baseParams: {
        limit: 100, start: 0
    },
    pageSize: 100
});	