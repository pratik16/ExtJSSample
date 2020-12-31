Ext.define('Regardz.model.yield.YieldCalendar', {
    extend: 'Ext.data.Model',
    //fields: ['YieldId', 'BarId', 'PropertyId', 'TimeSlotId', 'CreatedDate', 'CreatedBy', 'UpdatedDate', 'UpdatedBy', 'Date', 'WeekNo', 'Day']
    fields: [{ name: 'StartDate', mapping: 'FromTime', type: 'date', dateFormat: 'c' },
                { name: 'EndDate', mapping: 'ToTime', type: 'date', dateFormat: 'c' }, //H:i:s
                {name: 'Title', mapping: 'BarName', type: 'string' },
                { name: 'Notes', mapping: 'PropertyId', type: 'string' },
                { name: 'CalendarId',
                    mapping: 'BarId', 
                    type: 'string' },//barId was earlier value
                { name: 'EventId', mapping: 'YieldId', type: 'int' },
                { name: 'IsAllDay', type: 'boolean', defaultValue: true },
                 { name: 'Reminder', mapping: 'IsException', type: 'string'}
            ]
});