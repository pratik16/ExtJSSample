Ext.define('Regardz.model.configuration.Item', {
    extend: 'Ext.data.Model',
    fields: ['ItemId',
             'ItemName',
             'Description',
             'ItemTypeName',
             'VatRateId',
             'IsMenuItem',
             'ItemCategoryId',
             'IsSoldPerPerson',
             'Quantity',
             'CreatedDate',
             'CreatedBy',
             'UpdatedDate',
             'UpdatedBy',
             'Checked',
             'IsItemExemption',
             'ItemCategoryName']
});