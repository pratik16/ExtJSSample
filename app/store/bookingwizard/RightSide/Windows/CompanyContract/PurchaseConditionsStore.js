Ext.define('Regardz.store.bookingwizard.RightSide.Windows.CompanyContract.PurchaseConditionsStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.RightSide.Windows.CompanyContract.PurchaseConditions',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/WizardRightPanel/GetCompanyContractPurchaseDetails',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: 0, id1: 0, languageId: user_language, id2: 0
        }
    },
    pageSize: page_size
});