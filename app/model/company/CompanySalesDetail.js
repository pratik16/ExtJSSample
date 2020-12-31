Ext.define('Regardz.model.company.CompanySalesDetail', {
    extend: 'Ext.data.Model',
    fields: ['CompanySalesDetailId', 'CompanyId', 'Year',
            'ClientTargetQ1', 'ClientTargetQ2', 'ClientTargetQ3', 'ClientTargetQ4',
            'NewBusinessRevenueQ1', 'NewBusinessRevenueQ2', 'NewBusinessRevenueQ3', 'NewBusinessRevenueQ4',
            'DeepeningRevenueQ1', 'DeepeningRevenueQ2', 'DeepeningRevenueQ3', 'DeepeningRevenueQ4',
            'Reached', 'Target', 'WTarget', 'WTargetPlus']
});