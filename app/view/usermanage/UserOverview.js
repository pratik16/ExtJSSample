Ext.define('Regardz.view.usermanage.UserOverview', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.useroverview',
    itemid: 'useroverview',
    autoShow: true,
    initComponent: function () {
        var me = this;
        me.windowHeight = parseInt(Ext.getBody().getViewSize().height * (0.95));
        me.title = "Users > Overview_Title".l('SC32200');
        me.items = [
        {
            xtype: 'panel',
            buttonAlign: 'left',
            itemid: 'roleslistform',
            width: me.width,
            border: 0,
            defaults: { anchor: '100%' },
            items: [
            {
                xtype: 'roleslist',
                itemid: 'roleslist',
                height: parseInt(me.windowHeight),
                padding: '5 5 5 5',
                iconCls: "user_view",
                autoScroll: true
            }]
        }]; 
        
        me.callParent(arguments);
    }
});