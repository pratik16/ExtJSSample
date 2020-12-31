Ext.define('Regardz.model.customer.ContractManage', {
    extend: 'Ext.data.Model',
    fields: [
     'ContractId',
      'ContractName',
      'ContractStatusId',
      'Status',
      'CompanyId',
      'CompanyName',
      'StartDate',
      'EndDate',
      'IsApplicableToChild'
      ]
});