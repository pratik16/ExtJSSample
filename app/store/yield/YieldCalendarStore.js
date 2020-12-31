Ext.define('Regardz.store.yield.YieldCalendarStore', {

    // extend: 'Ext.data.Store',
    extend: 'Ext.calendar.data.MemoryEventStore',
   
    model: 'Regardz.model.yield.YieldCalendar',
    autoLoad: false,
    // storeId: 'YieldCalendar',
    
   
    listeners: {
        'beforeload': function (e, t) {
            
            var a2 = Ext.getBody();
            a2.mask('Loading...', 'x-loading-spinner', true);
            
        },
        'load': function (e, t) {
            var a2 = Ext.getBody();
            a2.unmask('Loading...', 'x-loading-spinner', true);
        }
    }


});