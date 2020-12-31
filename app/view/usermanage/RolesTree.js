Ext.define('Regardz.view.usermanage.RolesTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.rolestree',
    itemid: 'roleTreeId',
    store: 'usermanage.UserRoleListStore',
    requires: [
		'Ext.ux.form.SearchField'
	],
    rootVisible: false,
    initComponent: function () {
        var me = this;

        me.title = 'Roles'.l('SC22100');
        me.layout = 'fit';
        me.viewConfig = {
            plugins: {
                ptype: 'treeviewdragdrop',
                ddGroup: 'R&R',
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
            itemid: 'searchStringRoles',
            name: 'searchStringRoles',
            enableKeyEvents: false
        }, {
            xtype: 'button',
            iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
            action: 'clearRoles',
            hidden: true
        }, {
            xtype: 'button',
            action: 'searchRoles',
            iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
        }];

        //me.store = Ext.data.StoreManager.lookup(this.store);
        me.callParent(arguments);
    }
});