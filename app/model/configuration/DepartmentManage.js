Ext.define('Regardz.model.configuration.DepartmentManage', {
    extend: 'Ext.data.Model',
    fields: [
    'DepartmentId',
             'DepartmentName',
             'DeptCode',
             'Description',
             'IsActive',
             'IsCRO',
             'CreatedDate',
        'CreatedBy',
        'UpdatedDate',
        'UpdatedBy'
      ]
});