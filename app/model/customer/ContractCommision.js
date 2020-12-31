Ext.define('Regardz.model.customer.ContractCommision', {
    extend: 'Ext.data.Model',
    fields: [
     'ContractCommissionId',
      'ContractId',
      'RevenueFrom',
      'RevenueTo',
      'Commission',
      'IsKickback',
      'PropertyId',
      'PropertyName',
      'CompanyId',
      'CompanyName',
      'LanguageId'
      ]
});