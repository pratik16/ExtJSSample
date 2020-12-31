Ext.define('Regardz.model.configuration.AdvancePaymentManage', {
    extend: 'Ext.data.Model',
    fields: [
      'AdvancePaymentRuleId',
        'MinHours',
        'MaxHours',
        'IsOptionalAllowed',
        'IsdefiniteAllowed',      
        'Description',
        'CreatedDate',
        'CreatedBy',
        'DateTime UpdatedDate',
        'UpdatedBy'
      ]
});