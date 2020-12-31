Ext.define('Regardz.model.bookingwizard.PlanboardRoomlistBW', {
    extend: 'Sch.model.Resource',
    fields: ["RoomName", "ResourceId", "PropertyName", 'BookingId', "Color", "PropertyId", "ResourceId", "Id", "RoomName",
                "RoomTypeId", "RoomTypeName", "Capacity", "BookingId", "CompanyName", "BookingName", "Description", "StartDate", "EndDate", 'DateStart'
                , 'DateEnd', 'RoomArea',
                "RoomClassificationId", "Classification", "Flag", 'IsSharable', 'IsVirtual', 'yBarId', 'BookingStatusCode', 'BookingEventTrackingId',
                'EventName', 'BookingTrackingIdState', 'State', 'TurnTimeBuffer', 'DoNotMove', 'IsLoud', 'Cls', 'Summary', 'Name', 'ForEvent', 'CompanyId', 'IndividualId', 'StepNumber', 'ReservationId',
                'RoomArrangement', 'NoOfPeople', 'ResponsibleUser', 'ISBlockRoom','Comment', 'IsLinkedEvent', 'NonEditable', 'IsCore',
                 {
                     name: 'FormattedRoomName',
                     mapping: 'RoomName',
                     convert: function (v, record) {
                         var finalstring = v + ' ';
                         if (Utils.isValid(record) && Utils.isValid(record.data) & Utils.isValid(record.data.Capacity)) {
                             finalstring += record.data.Capacity;// +' U';
                             //return v + ' ' + record.data.Capacity + ' U (' + record.data.RoomArea + 'm2)'; // Need to put area here
                         }
                         if (Utils.isValid(record) && Utils.isValid(record.data) & Utils.isValid(record.data.RoomArea)) {
                             finalstring += ' (' + record.data.RoomArea + 'm2)';
                         }
                         return finalstring;
                     }
                 }
    ]

});