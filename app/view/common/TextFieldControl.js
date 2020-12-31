Ext.define('Regardz.view.common.TextFieldControl', {
    extend: 'Ext.form.TextField',
    alias: 'widget.textfieldcontrol',

    initComponent: function () {
        var me = this;
		
        me.callParent(arguments);
    }
});