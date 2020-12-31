Ext.define('Regardz.store.bookingwizard.RightSide.BookingEventItemListStore', {
    extend: 'Ext.data.TreeStore', 
	//model: 'Regardz.model.bookingwizard.BookingTrackingEventItems',
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
        'DetailIds' ,
        'VatPercentage'
    ],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/BookingCancellation/GetBookingEventCanceledItemListForReduction',
        reader: {
            type: 'json',
            root: 'children'
        },		
        extraParams: {
            id: 0, id1: 0, languageId: user_language
        }
    }
});

