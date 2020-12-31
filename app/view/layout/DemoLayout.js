/*PV: below file is not used*/
Ext.define('Regardz.view.layout.DemoLayout', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.demolayout',

    config: {
        demoModuleChildren:
		Ext.create('Ext.data.TreeStore', {
		    root: {
		        expanded: true,
		        text: "",
		        user: "",
		        status: "",
		        children: [{
		            text: "Dummy",
		            expanded: true,
		            children: [{
		                text: "Property list",
		                itemId: "propertyList",
		                leaf: true
		            }, {
		                text: "Events list",
		                itemId: "eventsList",
		                leaf: true
		            },{
		                text: "Custom list data",
		                itemId: "customList",
		                leaf: true
		            }
		            ]
		        }
		        ]
		    }
		})
    },
    initComponent: function () {

        var me = this;


        me.demoManagement = {
            xtype: 'panel',
            autoScroll: true,
            cls: 'empty',
            title: 'Dummy data ',
            items: [{
                xtype: 'treepanel',
                border: false,
                name: 'DummyModule',
                store: me.demoModuleChildren,
                rootVisible: false,
                listeners: {
                    itemclick: function (tree, rec, item, index, e) { }
                }
            }
            ]
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
                    items: [me.demoManagement]
                }
                ]
            }, {
                region: 'center',
                layout: 'fit',
                id: 'right_regionDemoModule'
            }
            ]
        };

        me.callParent();
    }

});