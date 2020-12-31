Ext.define('Regardz.store.bookingwizard.RightSide.Windows.CompanyContract.CancelationConditionsStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.RightSide.Windows.CompanyContract.CancelationConditions',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/WizardRightPanel/GetCompanyContractCancellaionDetails',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: user_language, id2: 0
        }
    }
});