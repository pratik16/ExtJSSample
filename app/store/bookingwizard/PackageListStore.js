Ext.define('Regardz.store.bookingwizard.PackageListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.PackageList',
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Booking/GetPackagesForWizardStepThree',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: 1, id1: user_language, id2: "DURATION:" + 0 + ";MEETING_TYPE:" + 0 + ";PACKAGE_ADVICE_FLAG:" + 1 + ";PRICE_FLAG:" + 1, id3: ""
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});