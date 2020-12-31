///*Minified by P*/
Ext.define('Regardz.view.layout.Administration', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.administration',
    id: 'administrationwindow',
    config: {
        administrationManagementChildren: Ext.create('Ext.data.TreeStore', {
            root: {
                expanded: true,
                text: "",
                user: "",
                status: "",
                children: [{
                    text: "Properties".l('SC30000'),
                    iconCls: "Add_Company",
                    itemId: "propertylist",
                    expanded: false
                    //children: [{
                    //    text: "Property List".l('SC30000'),                    
                    //    leaf: true,
                    //    iconCls: "Add_Company"
                    //}]
                }, {
                    text: "User Management".l('SC30000'),
                    itemId: "userhead",
                    expanded: true,
                    iconCls: "user_view",
                    children: [{
                        text: "User List".l('SC30000'),
                        itemId: "userlist",
                        iconCls: "user_view",
                        leaf: true
                    }, {
                        text: "Roles Management".l('SC30000'),
                        itemId: "rolesmanagement",
                        iconCls: "user_view",
                        leaf: true
                    }, {
                        text: "Sales Target".l('SC30000'),
                        itemId: "salestarget",
                        iconCls: "user_view",
                        leaf: true
                    }]
                },
                /*{
                text: "Rights".l('SC30000'),
                expanded: true,
                itemId: "rightshead",
                children: [{
                text: "Rights List".l('SC30000'),
                itemId: "rightslist",
                leaf: true
                }]
                },*/{
                text: "Item".l('SC30000'),
                expanded: true,
                itemId: "propertyItem",
                iconCls: "admin_item",
                children: [{
                    text: "Single Items".l('SC30000'),
                    itemId: "singleItem",
                    iconCls: "admin_item",
                    leaf: true
                }, {
                    text: "Group Items".l('SC30000'),
                    itemId: "groupItem",
                    iconCls: "tree-icon-itemgroup",
                    leaf: true
                }, {
                    text: "General pricing".l('SC30000'),
                    itemId: "generalPricing",
                    iconCls: "icon-euro",
                    leaf: true
                }, {
                    text: "Contract Pricing".l('SC30000'),
                    itemId: "contractPricing",
                    iconCls: "icon-euro",
                    leaf: true
                }]
            }, {
                text: "Package".l('SC30000'),
                expanded: true,
                itemId: "packagAdmin",
                iconCls: "admin_Package",
                children: [{
                    text: "Fixed Packages".l('SC30000'),
                    itemId: "fixedPackages",
                    iconCls: "admin_Package",
                    leaf: true
                }, {
                    text: "Package Breakdown Management".l('SC30000'),
                    itemId: "packageBreakdownManagement",
                    iconCls: "admin_Package",
                    leaf: true
                }, {
                    text: "DIY Programs".l('SC30000'),
                    itemId: "diyPrograms",
                    iconCls: "admin_Package",
                    leaf: true
                }]
            }, {
                text: "Public Holidays".l('SC30000'),
                expanded: true,
                iconCls: "admin_Holiday",
                itemId: "publicHolidays"
            }, {
                text: "Compeditors".l('SC30000'),
                expanded: true,
                iconCls: "admin_Competitors",
                itemId: "compeditors"
            }, {
                text: "Extraaz".l('SC30000'),
                itemId: "extraazhead",
                expanded: true,
                iconCls: "extraz_view", //admin_Webshop
                children: [{
                    text: "Webshop".l('SC30000'),
                    iconCls: "extraz_view",
                    itemId: "extraazwebshop",
                    leaf: true
                }, {
                    text: "Points".l('SC30000'),
                    iconCls: "extraz_view",
                    itemId: "extraazpoint",
                    leaf: true
                }]
            }]
        }
    })
},
initComponent: function () {
    var me = this;
    if (Ext.getCmp('west-regionAdministration'))
        Ext.getCmp('west-regionAdministration').destroy();
    if (Ext.getCmp('right_regionAdministration'))
        Ext.getCmp('right_regionAdministration').destroy();
    if (Ext.getCmp('administrationwindow'))
        Ext.getCmp('administrationwindow').destroy();
    me.administrationManagement = {
        xtype: 'panel',
        autoScroll: true,
        cls: 'empty',
        title: 'Administration Management'.l('SC30000'),
        items: [{
            xtype: 'treepanel',
            border: false,
            name: 'administrationManagement',
            //height: 150,
            store: me.administrationManagementChildren,
            rootVisible: false,
            listeners: {
                itemclick: function (tree, rec, item, index, e) { }
            }
        }]
    };
    me.layout = 'fit';
    me.items = {
        id: 'main-regionAdministration',
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
                id: 'west-regionAdministration',
                frame: false,
                itemid: 'accordinAdministration',
                layout: 'accordion',
                items: [me.administrationManagement]
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