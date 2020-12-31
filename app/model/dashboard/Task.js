Ext.define('Regardz.model.dashboard.Task', {
    extend: 'Ext.data.Model',
    fields: ['TaskId', { name: 'Subject', type: 'string' }, 'TaskTime', 'DueDate', 
    { name: 'CompanyName', type: 'string' }, 'userShortName', 'ActionType', 'StatusId', 'DayDiff', 'TimeDiff']
});