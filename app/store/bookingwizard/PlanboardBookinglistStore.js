Ext.define('Regardz.store.bookingwizard.PlanboardBookinglistStore', {
    extend: 'Sch.data.EventStore',
    //model: 'Event',
    model: 'Regardz.model.bookingwizard.PlanboardBookinglist',
    proxy: {
        type: 'jsonp',
        autoLoad: false,
        url: webAPI_path + 'api/Planboard/GetBookingEachRoom',
       // url: PHPPATHTEMP + 'planboardbookinglist.php',
        method: 'POST',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            searchParam: ''
            //searchParam: "PROPERTY_ID:1,2;DATE:2013-01-04;VIEW_TYPE:w;LANGUAGE_ID:1033"
        }
    }
});

