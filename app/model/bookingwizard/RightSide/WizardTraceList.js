Ext.define('Regardz.model.bookingwizard.RightSide.WizardTraceList', {
    extend: 'Ext.data.Model',
    fields: ['TraceNotificationId', 'BookingId', 'TraceDate', 'TraceMessage', 'FinishedDate', 'FinishedByUser', 'AssignedTouser', 'IsTraceDone',
				'CreatedDate', 'CreatedByUser', 'HandledBy', 'FinishedByuserShortName', 'AssignedTouserShortName', 'CreatedByUserShortName']
});