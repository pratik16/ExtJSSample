Ext.define('Regardz.store.bookingwizard.BookingSearchListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.BookingSearch',
    groupField: 'PropertyName',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Booking/GetBookingSearchDetails',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            userId: CurrentSessionUserId,
            languageId: user_language,
            companyName: '',
            contactName: '',
            bookingName: '',
            bookingNumber: '',
            BookDate1: null,
            BookDate2: null,
            ArrDate1: null,
            ArrDate2: null,
            propertyId: null,
            marketSourceId: null,
            cancellationReasonId: null,
            meetingTypeId: null,
            statusIds: null,
            BookedbyPerson: null
        }
    },
    baseParams: {
        limit: 100, start: 0
    },
    pageSize: 100
});	