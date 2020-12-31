
Ext.define('Regardz.model.operations.PlanboardBookinglist', {
    extend: 'Sch.model.Event',
  //  clsField: 'BookingStatusCode',
    // Reuse the resource id for CSS styling
    clsField: 'CssClass',

    startDateField: 'DateStart',
    endDateField: 'DateEnd',

    // just rename the fields
    resourceIdField: 'ResourceId',
    nameField: 'Title',

   fields: ['Title', "RoomName", "ResourceId", "PropertyName", 'BookingId', "Color", "PropertyId", "ResourceId", "Id", "RoomName",
                "RoomTypeId", "RoomTypeName", "Capacity", "BookingId", "CompanyName", "BookingName", "Description", "StartDate", "EndDate",
                "RoomClassificationId", "Classification", "Flag", 'IsSharable', 'IsVirtual', 'yBarId', 'BookingStatusCode', 'BookingEventTrackingId',
                'EventName', 'BookingTrackingIdState', 'State', 'TurnTimeBuffer', 'DoNotMove', 'IsLoud', 'Cls', 'DateStart',
                , 'DateEnd', 'Summary', 'Name', { name: 'CustomTitle', mapping: 'BookingName' }, 'ForEvent']
});