Ext.define('Regardz.model.configuration.ItemGroup', {
    extend: 'Ext.data.Model',
    fields: ['ItemGroupId',
             'ItemGroupName',
             'Description',             
             'ItemCategoryId',             
             'CreatedDate',
             'CreatedBy',
             'UpdatedDate',
             'UpdatedBy',
             'IsSoldPerPersonOrQuantity']
});