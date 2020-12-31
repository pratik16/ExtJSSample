Ext.define('Regardz.model.usermanage.Userlist', {
    extend: 'Ext.data.Model',
    fields: ['UserId', 'Username', 'FirstName', 'LastName', 'Email', 'IsActive', 'IsVerified', 'DepartmentId', 'DesignationId', 'DepartmentName', 'DesignationName', 'LanguageId', 'CreatedDate','Initial']
});