Ext.define('Regardz.store.operations.PlanboardRoomlistStore', {
    extend: 'Sch.data.ResourceStore',
    //extend: 'Sch.data.ResourceTreeStore',
    model: 'Regardz.model.operations.PlanboardRoomlist',
    // model: 'Sch.model.Resource',
    groupField: 'PropertyName',
    clsField: 'CssClass',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        autoLoad: false,
        url: webAPI_path + 'api/Planboard/GetBookingEachRoom',
        //url: PHPPATHTEMP + 'planboardroomlist.php',
        method: 'GET',
        reader: {
            type: 'json' ,
             root: 'data'
         },
         extraParams: {
             searchParam: ''
         }
    },
    listeners: {
        load: function () {
        
        }
    }
});