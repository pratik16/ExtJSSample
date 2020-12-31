Ext.define('Regardz.view.common.PropertyControl', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.propertycontrol',
    // requires: ['Regardz.store.common.PropertyForNamesStore'],
    //store: 'common.PropertyForNamesStore',

    initComponent: function () {
        var cssPrefix = Ext.baseCSSPrefix,
            cls = [cssPrefix + 'grid-checkheader'];

        var me = this;
        var store = Ext.create('Regardz.store.common.PropertyForNamesStore');
        me.store = store;
        me.fieldLabel = "Property";
        me.displayField = 'PropertyName';
        me.valueField = 'PropertyId';
        me.forceSelection = true;
        me.editable = true;
        me.multiSelect = true;
        me.mode = 'local';
        me.delimiter = '| ';
        me.typeAhead = false;
        me.itemId = 'property';
        me.triggerAction = 'all';
        //        me.listConfig = {
        //            getInnerTpl: function () {
        //                //                return '<div class="x-combo-list-item"><img src="' + Ext.BLANK_IMAGE_URL + '" class="chkCombo" /> {PropertyName} </div>';
        //                //   return '<div class="x-combo-list-item"><img class="chkCombo" /> {PropertyName} </div>';
        //                return '&nbsp;&nbsp;<span class="' + cls.join(' ') + '">&#160;&#160;&#160; </span> &nbsp;&nbsp;{PropertyName}';

        //            }
        //        }
        me.callParent(arguments);
    }
});