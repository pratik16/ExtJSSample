Ext.define('Regardz.store.company.MergeCompaniesStore', {
    extend: 'Ext.data.Store',
    fields: ['CompanyId', 'CompanyName', 'Phone', 'Fax', 'Website', 'Twitter', 'Facebook', 'LinkedIn', 'SicId', 'SicName', 'MarketSourceId', 'MarketSourceName', 'SalesManagerId', 'SalesManagerName',
            'SalesManagerAssistantId', 'SalesManagerAssistantName', 'LeadSourceId', 'LeadSourceName', 'QualityRating', 'CreditStatusId', 'NoOfEmployees', 'NoOfBookingAYear', 'NoOfRoomNightsAYear',
            'LeadStatusId', 'LeadStatusName', 'Logo', 'BusinessTypeId', 'BusinessTypeName', 'InvoiceAddressId', 'InvoiceAddress', 'InvoicePostalCode', 'InvoiceCountry', 'InvoiceCity', 'VisitingAddressId',
            'VisitingAddress', 'VisitingPostalCode', 'VisitingCountry', 'VisitingCity', 'PostalAddressId', 'PostalAddress', 'PostalPostalCode', 'PostalCountry', 'GroupSize', 'ParentCompanyId',
            'ParentCompanyName', 'ExistingBookingCount', 'GroupSizeDiff', 'PhoneDiff', 'FaxDiff', 'WebsiteDiff', 'TwitterDiff', 'FacebookDiff', 'LinkedInDiff', 'SicIdDiff', 'MarketSourceIdDiff',
            'SalesManagerIdDiff', 'SalesManagerAssistantIdDiff', 'LeadSourceIdDiff', 'QualityRatingDiff', 'CreditStatusIdDiff', 'NoOfEmployeesDiff', 'NoOfBookingAYearDiff', 'NoOfRoomNightsAYearDiff',
            'LeadStatusIdDiff', 'LogoDiff', 'BusinessTypeIdDiff', 'InvoiceAddressIdDiff', 'PostalAddressIdDiff', 'VisitingAddressIdDiff', 'ParentCompanyIdDiff'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/company/GetCompanyDetailForMerging',
        reader: {
            type: 'json',
            root: 'data'
        }, 
        extraParams: {
            id: 0, id2: 0, languageId: user_language
        }
    }
});