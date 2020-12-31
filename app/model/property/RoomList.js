Ext.define('Regardz.model.property.RoomList', {
    extend: 'Ext.data.Model',
    fields: ['RoomId', 'RoomName', 'Description', 'RoomTypeId', 'PropertyId', 'RoomClassificationId', 'IsSharable', 'IsBlocked',
    'IsDeleted', 'IsActive', 'PropertyName', 'RoomTypeName', 'Classification', 'LanguageId', 'IsVirtual', 'IsOverBookedRoom', 'RN', 'Width', 'Length', 'Height',
    'Surface', 'OutletId', 'OutletName', 'FloorId', 'FloorName', 'Sequence']
});