﻿Ext.define("Regardz.store.operations.InhouseItemsList", {
    extend: 'Ext.data.Store',
    autoLoad: false,
//    fields: [
//        'ItemId',
//        'ItemGroupId',
//        'ItemName',
//        'BookingEventId',
//        'IsSoldPerPerson',
//        'Quantity',
//        'Price',
//        'NetPrice',
//        'Vat',
//        'ReductionPercentage',
//        'TotalPrice',
//        'BarId',
//        'IsexternalRented',
//        'IsTallyItem'
//    ],
    fields: [
        'BookingEventItemDetailId',
        'BookingEventId',
        'BookingEventTrackingId',
        'EventId',
        'GroupName',
        'ItemName',
        'StartTime',
        'EndTime',
        'StartTimeHHMM',
        'EndTimeHHMM',
        'ServedQuantity',
        'Quantity',
        'Price',
        'NetPrice',
        'Discount',
        'DiscountPercentage',
        'Reduction',
        'ReductionPercentage',
        'TotalPrice',
        'ItemId',
        'PartOfPackage',
        'ItemGroupId',
        'BarId',
        'OutletId',
        'OutletName',
        'BookingEventItemDetailTrackingId',
        'BookingTrackingId',
        'IsEndtimeRequire',
        'ItemGroupDescription',
        'IsRoomRent',
        'ExternalRented',
        'Text',
        'Leaf',
        'IsSoldPerPerson',
        'IsSold',
        'IsCanceled',
        'TrackingIds',
        'DetailIds',
        'IsTallyItem',
        'Vat',
        'IsexternalRented',
        'IsItemGroup',
        'ItemTypeId',
        'VatPercentage',
        'EventStartTime',
        'EventEndTime',
        'IsBedRoomItem'
    ],
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/InHouse/GetItemListWithPrice',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});
