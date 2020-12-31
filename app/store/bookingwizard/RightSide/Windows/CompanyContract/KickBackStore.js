Ext.define('Regardz.store.bookingwizard.RightSide.Windows.CompanyContract.KickBackStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.RightSide.Windows.CompanyContract.KickBack',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/WizardRightPanel/GetContractKickbackList',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: user_language
        }
    }
});