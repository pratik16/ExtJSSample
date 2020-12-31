Ext.define('Regardz.model.usermanage.ActivitiesList', {
    extend: 'Ext.data.Model',
    fields: ['UserActivityAssociationId', 'UserId', 'PropertyId', 'ActivityId', 'DesignationId', 'RoleId', 'PropertyName', 'DesignationName', 'RoleName', 'ActivityName', 'IsDeleted']
});