Ext.define('Regardz.view.configuration.RightsTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.rightstree',
    itemid: 'rightTreeId',
    store: 'usermanage.UserPropertyRoleListStore',
    requires: [
		'Ext.ux.form.SearchField'
	],
    rootVisible: false,
    initComponent: function () {
        var me = this;

        me.title = 'Rights'.l('SC22100');
        me.layout = 'fit';
        me.viewConfig = {
            plugins: {
                ptype: 'treeviewdragdrop',
                ddGroup: 'R&R',
                //dragGroup: 'RT',
                enableDrag: true,
                enableDrop: false,
                appendOnly: true
            }
        };

        me.tbar = ['->', {
            xtype: 'button',
            iconCls: 'filter',
            disabled: true
        }, {
            xtype: 'textfield',
            itemid: 'searchStringRights',
            name: 'searchStringRights',
            enableKeyEvents: false
        }, {
            xtype: 'button',
            iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
            action: 'clearRights',
            hidden: true
        }, {
            xtype: 'button',
            action: 'searchRights',
            iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
        }];

        //me.store = Ext.data.StoreManager.lookup(this.store);
        me.callParent(arguments);
    }
});