//i.e Individuals

Ext.define('Regardz.model.company.CompanyContactList', {
    extend: 'Ext.data.Model',
    fields: ['IndividualId',
      'IndividualName',
      'SalesManagerName',
      'IsVerified',
      'SalesManagerId',
      'ContractId',
      'Action',
      'ActionName',
      'ActionFullName',
      'MergeIndividualId',
      'IndividualId',
      'Title', 
      'MergeIndividualName']
});