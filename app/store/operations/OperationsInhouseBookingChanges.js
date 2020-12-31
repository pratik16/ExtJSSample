Ext.define("Regardz.store.operations.OperationsInhouseBookingChanges", {
    extend: 'Ext.data.Store',
    autoLoad: false,
    fields: ["RN", "BookingDate", "Prefix", "Status", "UserName", "IsCurrentbooking"],
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/InHouse/GetBookingWithStatusChanges',
        extraParams: {
            id: 0, id1: 0, LanguageId: user_language
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});
