Ext.define('Regardz.view.layout.AfasLog', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.afaslog',
    id: 'afaslogwindow',
    config: {
        afasLogChildren: Ext.create('Ext.data.TreeStore', {
            root: {
                expanded: true,
                text: "",
                user: "",
                status: "",
                children: [{
                    text: "AFAS",
                    iconCls: "Add_Company",
                    itemId: "afaslog",
                    expanded: false
                }]
            }    
        })
},
initComponent: function () {
    var me = this;
   
    me.afasLogManagement = {
        xtype: 'panel',
        autoScroll: true,
        cls: 'empty',
        title: 'AFAS LOG',
        items: [{
            xtype: 'treepanel',
            border: false,
            name: 'afaslog',
            //height: 150,
            store: me.afasLogChildren,
            rootVisible: false,
            listeners: {
                itemclick: function (tree, rec, item, index, e) { }
            }
        }]
    };
    me.layout = 'fit';
    me.items = {
        plain: true,
        border: false,
        layout: 'border',
        items: [{
            region: 'west',
            collapsible: true,
            layout: 'fit',
            width: 250,
            items: [{
                xtype: 'panel',
                frame: false,
                layout: 'accordion',
                items: [me.afasLogManagement]
            }]
        }, {
            region: 'center',
            layout: 'fit',
            id: 'right_regionAdministration'
        }]
    };
    me.callParent();
}
});