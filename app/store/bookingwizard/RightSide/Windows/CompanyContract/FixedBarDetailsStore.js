Ext.define('Regardz.store.bookingwizard.RightSide.Windows.CompanyContract.FixedBarDetailsStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.RightSide.Windows.CompanyContract.FixedBarDetails',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/WizardRightPanel/GetContractFixedPriceBARList',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: user_language
        }
    }
});