Ext.define('Regardz.store.property.YieldCalendarExemptionStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.YieldCalendar',
    autoLoad: false,
    //mode: 'local',
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/yield/GetYieldExemptionDetailByPropertyId',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});

 