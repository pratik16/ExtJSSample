Ext.define('Regardz.store.bookingwizard.PlanboardRoomlistStore', {
    extend: 'Sch.data.ResourceStore',
    model: 'Regardz.model.bookingwizard.PlanboardRoomlist',
   // model: 'Sch.model.Resource',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        autoLoad: false,
        url: webAPI_path + 'api/Planboard/GetBookingEachRoomStep2',
        //url: PHPPATHTEMP + 'planboardbookinglist.php',
        method: 'GET',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});