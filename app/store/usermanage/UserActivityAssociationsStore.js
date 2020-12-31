Ext.define('Regardz.store.usermanage.UserActivityAssociationsStore', {
    extend: 'Ext.data.TreeStore',
    fields: ['PropertyId', 'RoleId', 'ActivityId', 'RoleName', 'PropertyName', 'ActivityName', 'UserId', 'IsGlobal', 'text', 'itemid', 'UserId', 'UserActivityAssociationId'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/user/GetUserActivityAssociations',
        reader: { type: 'json' },
        defaultRootId: 'data',
        extraParams: {
            userId: 0, desgId: 0, propertyIds: '', languageId: user_language, searchString: '', isAllproperty: 0, createdBy: CurrentSessionUserId
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});	