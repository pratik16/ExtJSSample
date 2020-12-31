Ext.define('Regardz.store.operations.OperationDirectSalesItemsStore', {
    extend: 'Ext.data.Store',
    fields: ['ItemId', 'ItemName', 'NetPrice', 'Vat', 'VatRateBreakDownId', 'VatRateValue', 'PriceWOVat', 'TotalWOVat', 'ItemGroupId', 'IsItemGroup', 'ExternalRented', 'BarId'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/OperationDirectSales/GetItemListForDirectSales',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            itemCategoryId: 0, propertyId: 0, filterText: '', languageId: user_language
        }
    }
});