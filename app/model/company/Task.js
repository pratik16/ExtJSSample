Ext.define('Regardz.model.company.Task', {
    extend: 'Ext.data.Model',
    fields: ['TaskId',
             'Subject',
            'DueDate',
            'StartTime',
            'EndTime',
            'CompanyId',
            'IndividualId',
            'CreatedBy',
            'Description',
            'AssignedTo',
            'IndividualName',
            'FirstName',
            'LastName',
            'Initial',
            'DayDiff',
            'TimeDiff'
            ]
});

 