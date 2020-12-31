Ext.define('Regardz.model.bookingwizard.PlanboardRoomlist', {
    extend: 'Sch.model.Resource',
    fields: ['Id', 'ResourceId', 'RoomId', 'RoomName', 'RoomTypeId', 'RoomTypeName', 'Capacity', 'PropertyId', 'PropertyName', 'RoomClassificationId', 'Classification', 'IsDeleted', 'IsActive', 'isHeader', 'BookingId',
         {
             name: 'FormattedRoomName',
             mapping: 'RoomName',
             convert: function (v, record) {
                 return v + ' ' + record.data.Capacity + ' U (0m2)'; // Need to put area here
             }
         }
    ]
});