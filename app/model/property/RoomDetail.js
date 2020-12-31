Ext.define('Regardz.model.property.RoomDetail', {
    extend: 'Ext.data.Model',
    fields: ['ExternalName', 'InternalName', 'Area', 'Length', 'Width', 'Height','Phone','Description'],

    getExternalName: function () {
        return this.get('ExternalName');
    },
    getInternalName: function () {
        return this.get('InternalName');
    },
    getArea: function () {
        return this.get('Area');
    },
    getLenght: function () {
        return this.get('Length');
    },
    getWidth: function () {
        return this.get('Width');
    },
    getHeight: function () {
        return this.get('Height');
    },

    getPhone: function () {
        return this.get('Phone');
    },
    getDescription: function () {
        return this.get('Description');
    }
});