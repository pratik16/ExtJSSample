Ext.define('Regardz.store.bookingwizard.PlanboardRoomlistBWStore', {
    extend: 'Sch.data.ResourceStore',
    //extend: 'Sch.data.ResourceTreeStore',
    model: 'Regardz.model.bookingwizard.PlanboardRoomlistBW',
    // model: 'Sch.model.Resource',
    
    /*fields: ["RoomName", "ResourceId", "PropertyName", 'BookingId', "Color", "PropertyId", "ResourceId", "Id", "RoomName",
                "RoomTypeId", "RoomTypeName", "Capacity", "BookingId", "CompanyName", "BookingName", "Description", "StartDate", "EndDate",
                "RoomClassificationId", "Classification", "Flag", 'IsSharable', 'IsVirtual', 'yBarId', 'BookingStatusCode', 'BookingEventTrackingId',
                'EventName', 'BookingTrackingIdState', 'State', 'TurnTimeBuffer', 'DoNotMove', 'IsLoud', 'Cls', 'Summary', 'Name'],*/
    groupField: 'PropertyName',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        autoLoad: false,
        url: webAPI_path + 'api/Planboard/GetBookingEachRoomBW',
        //url: PHPPATHTEMP + 'planboardroomlist.php',
        method: 'GET',
        reader: {
            type: 'json' ,
             root: 'data'
        }
    }
});