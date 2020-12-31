Ext.define('Regardz.view.usermanage.UserRegistration', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.userregistration',
    itemid: 'userregistration',
    autoShow: true,
    initComponent: function () {
        var me = this;
        me.windowHeight = parseInt(Ext.getBody().getViewSize().height * (0.95));
        me.title = "User List_Title".l('SC32000');
        me.items = [
        {
            xtype: 'panel',
            buttonAlign: 'left',
            itemid: 'userlistform',
            width: me.width,
            border: 0,
            defaults: { anchor: '100%' },
            items: [{
                xtype: 'combo',
                itemid: 'comboPropertyList',
                name: 'comboPropertyList',
                action: 'comboPropertyList',
                padding: 5,
                width: 250,
                //emptyText: '- All properties -'.l('SC32100'),
                allowBlank: true,
                store: 'usermanage.PropertyStore',
                queryMode: 'local',
                displayField: 'PropertyName',
                valueField: 'PropertyId'
            }, {
                xtype: 'userlist',
                itemid: 'userlist',
                height: parseInt(me.windowHeight),
                padding: '0 5 5 5',
                iconCls: "user_view",
                autoScroll: true
            }]
        }]; 
        
        me.callParent(arguments);
    }
});