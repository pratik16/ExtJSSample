Ext.define('Regardz.model.dashboard.IncomingTraces', {
    extend: 'Ext.data.Model',
    fields: ['TraceNotificationId', 'TraceDate', 'TraceMessage', 'FinishedDate', 'FinishedByUser', 'AssignedTouser', 'IsTraceDone',
				'CreatedDate', 'CreatedByUser', 'HandledBy', 'FinishedByuserShortName', 'AssignedTouserShortName', 'CreatedByUserShortName', 'DayDiff', 'TimeDiff']
});