Ext.define('Regardz.store.bookingwizard.PlanboardBookinglistBWStore', {
    extend: 'Sch.data.EventStore',
    model: 'Sch.model.Event',
    // model: 'Regardz.model.bookingwizard.PlanboardBookinglistBW',
    clsField: 'Cls',
    nameField: 'Title',
    startDateField: 'StartDate',
    fields: ['Title', "RoomName", "ResourceId", "PropertyName", 'BookingId', "Color", "PropertyId", "ResourceId", "Id", "RoomName",
                "RoomTypeId", "RoomTypeName", "Capacity", "BookingId", "CompanyName", "BookingName", "Description", "StartDate", "EndDate",
                "RoomClassificationId", "Classification", "Flag", 'IsSharable', 'IsVirtual', 'yBarId', 'BookingStatusCode', 'BookingEventTrackingId',
                'EventName', 'BookingTrackingIdState', 'State', 'TurnTimeBuffer', 'DoNotMove', 'IsLoud', 'Cls', 'DateStart', 'ISBlockRoom',
                , 'DateEnd', 'Summary', 'Name', { name: 'CustomTitle', mapping: 'BookingName' }, 'ForEvent', 'IsFirstDay', 'IsMultipleDayBooking','IsMainEvent','CompanyId','IndividualId','StepNumber','ReservationId', 'ResponsibleUser', 'Comment',
                'IsLinkedEvent', 'NonEditable', 'IsCore'
                ],
    proxy: {
        type: 'jsonp',
        autoLoad: false,
        url: webAPI_path + 'api/Planboard/GetBookingEachRoomBW',
        //  url: PHPPATHTEMP + 'planboardbookinglist.php',
        method: 'GET',
        extraParams: {
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    
});
