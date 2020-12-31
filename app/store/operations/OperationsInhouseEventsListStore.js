Ext.define("Regardz.store.operations.OperationsInhouseEventsListStore", {
    extend: 'Ext.data.Store',
    autoLoad: false,
    fields: ["BookingEventId", "BookingId", "ReservationId", "BookingNumber", "StepNumber", "FromTime", "ToTime", "Sts", "Persons", "BookingId", "BookingName", "CompanyName", "Contact", "RoomName", "By", "PreviousEnd", "BarId", "ExtraOptionsOnLocation", "CustomerRemark", "IsInvoicedetailsIssue", "IsDiscussion", "HasSubRoom","IsDisable"],
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/InHouse/GetInHouseDetail',
        extraParams: {
            id: user_language
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});