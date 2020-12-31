Ext.define('Regardz.model.configuration.ProgramDefinition', {
    extend: 'Ext.data.Model',
    fields: ['ProgramDefinitionId',
             'Name',
             'Duration',
             'StartingSlotId',
             'TimeSlotId',
             'TimeSlotcode',
             'IsActive']
});