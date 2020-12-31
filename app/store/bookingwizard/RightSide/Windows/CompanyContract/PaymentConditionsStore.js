Ext.define('Regardz.store.bookingwizard.RightSide.Windows.CompanyContract.PaymentConditionsStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.RightSide.Windows.CompanyContract.PaymentConditions',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/WizardRightPanel/GetCompanyContractPaymentDetails',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: 0, languageId: user_language
        }
    }
});