Ext.define('Regardz.view.common.TimeFieldControl', {
    extend: 'Ext.form.TimeField',
    alias: 'widget.timefieldcontrol',

    initComponent: function () {
        var me = this;
        me.fieldLabel = "Time Field".l('g');
        me.minValue = '08:30';
        me.maxValue = '22:00';
        me.format = "H:i";
        me.selectOnFocus = true;
        me.callParent(arguments);
    }
});