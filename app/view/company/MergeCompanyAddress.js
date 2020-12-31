var storeForTreeA = Ext.create('Ext.data.TreeStore', {
    root: {
        expanded: true,
        children: [{
            text: "Item 1".l('SC61140'),
            leaf: true
        }, {
            text: "Item 2".l('SC61140'),
            leaf: true
        }, {
            text: "Item 3".l('SC61140'),
            //leaf: true
            children: [{
                text: "Item 31".l('SC61140'),
                leaf: true
            }, {
                text: "Item 32".l('SC61140'),
                leaf: true
            }]
        }]
    }
});
Ext.define('Regardz.view.company.MergeCompanyAddress', {
    extend: 'Ext.window.Window',
    alias: 'widget.mergecompanyaddress',
    config: {
        configurationManagementChildren:
        Ext.create('Ext.data.TreeStore', {
            root: {
                expanded: true,
                text: "",
                user: "",
                status: "",
                children: [
						{ text: "Configuration".l('SC61140'), expanded: true,
						    children: [{
						        text: "Fixed Price Packages".l('SC61140'),
						        itemId: "FixedPricePackages",
						        leaf: true
						    }, {
						        text: "Fixed Price Management".l('SC61140'),
						        itemId: "fixedPriceManagement",
						        leaf: true
						    },
                               {
                                   text: "Item Category Management".l('SC61140'),
                                   itemId: "itemCategory",
                                   leaf: true
                               }, {
                                   text: "Item Type Management".l('SC61140'),
                                   itemId: "itemType",
                                   leaf: true
                               }, {
                                   text: "Item Management".l('SC61140'),
                                   itemId: "itemManagement",
                                   leaf: true
                               }

							]
						}
					]
            }
        })

    },
    modal: true,
    width: 930,

    border: false,
    title: 'Tree'.l('SC61140'), //.l('SC61100'),
    autoShow: true,
    initComponent: function () {



        var me = this;


        me.configurationManagement = {
            xtype: 'panel',
            autoScroll: true,
            cls: 'empty',
            title: 'Configuration Management'.l('SC61140'),
            items: [{
            xtype: 'treepanel',
            title: 'Simple Tree'.l('SC61140'),
            border: false,
            name: 'configurationManagement',
            //width: 200,
            //height: 150,
            store: storeForTreeA,
            rootVisible: false,
            listeners: {
                itemclick: function (tree, rec, item, index, e) {}
            }
        }
        ]};
        me.layout = 'fit';
        me.callParent();
    }
});