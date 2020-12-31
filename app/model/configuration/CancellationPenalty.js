Ext.define('Regardz.model.configuration.CancellationPenalty', {
    extend: 'Ext.data.Model',
    fields: ['CancellationRuleId',
             'MinDays',
             'MaxDays',
             'Penalty',
             'Rules',             
             'CreatedDate',
             'CreatedBy',
             'UpdatedDate',
             'UpdatedBy']
});
