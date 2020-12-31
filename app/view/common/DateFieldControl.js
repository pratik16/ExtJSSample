Ext.define('Regardz.view.common.DateFieldControl', {
    extend: 'Ext.form.DateField',
    alias: 'widget.datefieldcontrol',

    initComponent: function () {
        var me = this;
       // me.fieldLabel = "Date Field";
        me.format = usr_dateformat;
        me.submitFormat = 'Y-m-d';

        me.callParent(arguments);
    }
});