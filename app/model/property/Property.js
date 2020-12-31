Ext.define('Regardz.model.property.Property', {
    extend: 'Ext.data.Model',
    //fields: ['PropertyId', 'PropertyName', 'Postalcode', 'IsPartner', 'Address', 'IsActive']
    fields: ['PropertyId', 'PropertyName', 'Postalcode', 'IsPartner', 'Address', 'IsActive',
                'Description', 'Email', 'Fax', 'Phone', 'PropertyContent', 'PropertyType', 'Abbreviation', 'City', 'ReviewScore',                 
                'Website','RoomsCount','FloorsCount', 'checked']
});