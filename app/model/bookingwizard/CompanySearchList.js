Ext.define('Regardz.model.bookingwizard.CompanySearchList', {
    extend: 'Ext.data.Model',
    fields: ['CompanyId',
             'CompanyName',
             'CompanyDomain',
             'QualityRating',
             'Address',
             'PinCode',
             'City',
             'ParentCompanyId',
             'Checked',
             'IsAgency',
             'HasContract',
             'HasChild',
             'HasParent']
});