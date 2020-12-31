Ext.define('Regardz.model.company.AddChildCompany', {
    extend: 'Ext.data.Model',
    fields: ['CompanyId',
      'ParentCompanyId',
      'SalesManagerId',
      'StatusId',
      'CompanyName',
      'QualityRating',
      'CreditStatusId',
      'IndividualId',
      'ContactName',
      'Prefix',
      'IndividualName',
      'City',
      'Address',
      'EmployeeName',
      'Rating',
      'HasParent',
      'HasChild',
      'HasContract',
      'IsVerified',
      'SicCodeName']
});

 