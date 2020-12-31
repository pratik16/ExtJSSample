Ext.define('Regardz.view.configuration.ManageRolesRights', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.managerolesrights',
    loadMask: true,
    layout: 'hbox',
    border: false,
    style: 'background:none; border:0px;',
    padding: 0,
    margin: 0,
    frame: true,
    initComponent: function () {

        var me = this;        
        me.title = 'Roles and Rights_Title_SCCODE'.l('SC22100');
        me.items = [{
            layout: 'vbox',
            border: false,
            style: 'background:none; border:0px;',
            padding: 0,
            margin: 0,
            frame: true,
            width: '50%',
            items: [{
                xtype: 'configroleslist',
                iconCls: 'icon-roles',
                padding: '5px',
                width: '100%'
            }, {
                xtype: 'rightstree',
                iconCls: 'icon-rights',
                padding: '5px',
                width: '100%'
            }]
        }, {
            xtype: 'rightsperrole',
            padding: '5px',
            width: '50%'
        }];
        me.callParent();
    }
});