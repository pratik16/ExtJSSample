Ext.define('Regardz.model.bookingwizard.PlanboardBookinglistBW', {
    extend: 'Sch.model.Event',
    nameField: 'Title',
    fields: ['Title', "RoomName", "ResourceId", "PropertyName", 'BookingId', "Color", "PropertyId", "ResourceId", "Id", "RoomName",
                "RoomTypeId", "RoomTypeName", "Capacity", "BookingId", "CompanyName", "BookingName", "Description", "StartDate", "EndDate",
                "RoomClassificationId", "Classification", "Flag", 'IsSharable', 'IsVirtual', 'yBarId', 'BookingStatusCode', 'BookingEventTrackingId',
                'EventName', 'BookingTrackingIdState', 'State', 'TurnTimeBuffer', 'DoNotMove', 'IsLoud', 'Cls', 'DateStart',
                , 'DateEnd', 'Summary', 'Name', { name: 'CustomTitle', mapping: 'BookingName'}]
});