Ext.define('Regardz.store.bookingwizard.RightSide.Windows.CompanyContract.CommissionDetailsStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.RightSide.Windows.CompanyContract.CommissionDetails',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/WizardRightPanel/GetContractCommisionList',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: user_language
        }
    }
});