Ext.define('Regardz.model.bookingwizard.SchedulerResourceModel', {
    extend: 'Sch.model.Resource',

    //fields: ['RoomName', 'CssClass', 'BookingTrackingId', 'Id', 'ResourceId', 'RoomId', 'RoomTypeId', 'RoomTypeName', 'PropertyId', 'PropertyName', 'RoomClassificationId', 'Classification', 'IsDeleted', 'IsActive', 'isHeader', 'BookingId', 'FormattedResource', 'Capacity', 'IsSharable', 'TurnTimeBuffer'],
    fields: ['Title', 'Id','RoomId','PropertyId','PropertyName'],

    ///* Methods */
    //getPropertyId: function () {
    //    return this.get('PropertyId');
    //},
    //getId: function () {
    //    return this.get('Id');
    //},
    //getRoomName: function () {
    //    return this.get('RoomName');
    //},
    //getCapacity: function () {
    //    return this.get('Capacity');
    //}
});