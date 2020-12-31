Ext.define('Regardz.store.property.YieldCalendarStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.YieldCalendar',
    autoLoad: false,
    //mode: 'local',
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/yield/GetYieldDetailByPropertyId',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});

 