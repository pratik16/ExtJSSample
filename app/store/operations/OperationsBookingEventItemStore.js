Ext.define("Regardz.store.operations.OperationsBookingEventItemStore", {
    extend: 'Ext.data.TreeStore',
    autoLoad: false,
    fields: ["Time", "ItemName", "Remark", "ExternalRemark", "ItemInternRemark", "ItemExternRemark", "IsItemGroup", "IsItemGroupChild"],
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/InHouse/GetBookingEventItemsForView',
        extraParams: {
            id: 0, id1: 0, LanguageId: user_language
        },
        reader: {
            type: 'json'
        }
    }
});
