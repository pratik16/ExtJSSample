Ext.define('Regardz.model.customer.CustomerManage', {
    extend: 'Ext.data.Model',
    fields: [
      'CompanyId',
      'ParentCompanyId',
      'SalesManagerId',
      'StatusId',
      'CompanyName',
      'Abbreviation',
      'QualityRating',
      'CreditStatusId',
      'IndividualId',
      'ContactName',
      'Prefix',
      'IndividualName',
      'Address',
      'City',
      'EmployeeName',
      'Rating',
      'HasParent',
      'HasChild',
      'HasContract',
      'SicCodeName','IsMergedCompany'
      ]
});