Ext.define('Regardz.store.bookingwizard.RightSide.WizardNavigationListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.RightSide.WizardNavigation',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/WizardRightPanel/GetBookingListForBookingNav',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    extraParams: {
        id: 0
    }
});