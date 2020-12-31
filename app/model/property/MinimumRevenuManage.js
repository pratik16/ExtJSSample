Ext.define('Regardz.model.property.MinimumRevenuManage', {
    extend: 'Ext.data.Model',

    fields: ['RoomTypeRevenueBreakdownId', 'RoomTypePropertyAssociationID', 'StartDate', 'RoomTypeId', 'RoomTypeName',
                { name: "A", type: "string" },
                { name: "B", type: "string" },
                { name: "C", type: "string" },
                { name: "D", type: "string" }]
});