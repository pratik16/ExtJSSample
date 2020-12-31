Ext.define('Regardz.store.bookingwizard.RightSide.SalesInfoBuyingReasonStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.RightSide.BuyingReason',
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/WizardRightPanel/ReservationBuyingReasonsPaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: user_language, id1: 0
        }
    },
    pageSize: page_size
});