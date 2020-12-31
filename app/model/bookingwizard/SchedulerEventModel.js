Ext.define('Regardz.model.bookingwizard.SchedulerEventModel', {
    extend: 'Sch.model.Event',
    clsField: 'CssClass',

    startDateField: 'DateStart',
    endDateField: 'DateEnd',

    // just rename the fields
    resourceIdField: 'ResourceId',
    nameField: 'Title',
    fields: [{ name: 'Title', mapping: 'CustomTitle' }, { name: 'StartDate', mapping: 'DateStart' }, { name: 'EndDate', mapping: 'DateEnd' }, { name: 'PropertyId', type: 'number' }, 'RoomName', 'CustomTitle', 'TurnTimeBuffer', 'isSetupTime', 'AllowCreate', 'ForEvent', 'Id', 'BookingEventTrackingId'],

    getResourceId: function () {
        return this.get('ResourceId');
    },
    getRoomName: function () {
        return this.get('RoomName');
    }
});
