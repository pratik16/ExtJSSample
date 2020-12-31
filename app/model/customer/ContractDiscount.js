Ext.define('Regardz.model.customer.ContractDiscount', {
    extend: 'Ext.data.Model',
    fields: [
    'ContractDiscountId',
      'DiscountTypeId',
      'PropertyId',
      'PropertyName',
      'ContractId',
      'CompanyId',
      'CompanyName',
      'Value',
      'Revenue',
      'LanguageId',
      'DiscountTypeName'
      ]
});