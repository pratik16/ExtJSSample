Ext.define('Regardz.model.company.CompanySearchList', {
    extend: 'Ext.data.Model',
    fields: ['CompanyId',
             'CompanyName',
             'CompanyDomain',
             'QualityRating',
             'Address1',
             'Pincode',
             'City',
             'ParentCompanyId',
             'Checked',
             'Address',
             'PinCode'
             ]
});