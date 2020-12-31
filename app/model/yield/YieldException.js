Ext.define('Regardz.model.yield.YieldException', {
    extend: 'Ext.data.Model',
    fields: [
      'PropertyName',
      'RoomTypeName',
       { name: 'FromDate', type: 'date',dateFormat : 'c'},
       { name: 'ToDate', type: 'date', dateFormat: 'c' },
      'TimeSlotCode',
      'BarName', 
      'ExemptionId',
      'Description',
      'PropertyId',
      'TimeSlotId',
      'RoomTypeId',
      'RoomId',
      'BarId',
      'FromDate',
      'ToDate',
      'CreatedDate',
      'CreatedBy',
      'UpdatedDate',
      'UpdatedBy']
});

