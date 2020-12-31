Ext.define('Regardz.store.operations.PlanboardBookinglistStore', {
    extend: 'Sch.data.EventStore',
    //model: 'Event',
   // model: 'Regardz.model.operations.PlanboardBookinglist',
    
    clsField: 'CssClass',
    proxy: {
        type: 'jsonp',
        autoLoad: false,
        url: webAPI_path + 'api/Planboard/GetBookingEachRoom',
      //  url: PHPPATHTEMP + 'planboardbookinglist.php',
        method: 'GET',        
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            searchParam: ''
        }
    }
});