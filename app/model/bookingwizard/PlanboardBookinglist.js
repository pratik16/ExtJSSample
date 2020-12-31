Ext.define('Regardz.model.bookingwizard.PlanboardBookinglist', {
    extend: 'Sch.model.Event',
    clsField: 'ResourceId',

    startDateField: 'DateStart',
    endDateField: 'DateEnd',

    // just rename the fields
    resourceIdField: 'ResourceId',
    nameField: 'Title',

    fields: ['ResourceId', { name: 'Title', mapping: 'BookingName' }, { name: 'StartDate', mapping: 'DateStart' }, { name: 'EndDate', mapping: 'DateEnd' }]
});
