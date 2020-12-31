Ext.define('Regardz.view.bookingwizard.RightSide.RequitredActionsTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.requitredactionstree',
    //itemid: 'roleTreeId',
    store: 'bookingwizard.RightSide.RequiredActionsListStore',
    //    requires: [
    //		'Ext.ux.form.SearchField'
    //	],
    rootVisible: true,
    initComponent: function () {
        var me = this;
        me.viewConfig = {
            markDirty: false
        };

        me.layout = 'fit';

        me.callParent(arguments);
    }
});