Ext.define('Regardz.model.property.PropertyRoomTypeList', {
    extend: 'Ext.data.Model',
    fields: ['RoomTypeId',
             'RoomTypeName',
             'Description',
             'LanguageId',
			 'IsRoomTypePrice',
             'Checked',
             'BreakDown']
});