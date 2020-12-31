Ext.define('Regardz.model.configuration.RoomType', {
    extend: 'Ext.data.Model',
    fields: ['RoomTypeId',
             'RoomTypeName',
             'Description',
             'IsBookablefromROP',
             'MinSize',
             'MaxSize',
             'MaxPax',
             'IsActive']
});