/***
 * Consumed by both SchedulerPanel instances. This class holds all the availability intervals and adds an extra method to
 * decide if a resource is available or not by looking at the availability defined for that resource.
 */
Ext.define("Regardz.store.operations.AvailabilityStore", {
    extend      : 'Sch.data.EventStore',
    autoLoad    : false,
    fields: ["RoomName", "ResourceId", "PropertyName", "Name", "StartDate", "EndDate"],
    autoLoad: false,    
    proxy: {
        type: 'jsonp',
        autoLoad: false,
        //url: webAPI_path + 'api/Planboard/GetBookingEachRoom',
      // url: PHPPATHTEMP + 'AvailabilityStore.php',
        method: 'GET',
        reader: {
            type: 'json'//  ,
           // root: 'data'
        }
    }
   
});