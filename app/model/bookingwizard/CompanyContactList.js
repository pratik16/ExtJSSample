//i.e Individuals

Ext.define('Regardz.model.bookingwizard.CompanyContactList', {
    extend: 'Ext.data.Model',
    fields: ['IndividualId',
             'CompanyId',
             'CompanyName',
             'AgencyId',
             'SalesManagerId',
             'FirstName',
             'LastName',
             'IndividualName',
             'Prefix',
             'Email',
             'Gender',
             'Checked',
             'Phone',
             'Direct',
             'Mobile']
});