/*PV: temp module*/
Ext.define('Regardz.view.layout.TempModule', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.tempmodule',

    config: {
        tempmoduleManagementChildren:
		Ext.create('Ext.data.TreeStore', {
		    root: {
		        expanded: true,
		        text: "",
		        user: "",
		        status: "",
		        children: [{
		            text: "Tempmodule Management",
		            expanded: true,
		            children: [{
		                text: "Room Availability Block",
		                itemId: "roomAvailabilityBlock",
		                leaf: true
		            }, {
		                text: "Booking List",
		                itemId: "boolinglist",
		                leaf: true
		            }
                        , {
                            text: "Booking Tracking list",
                            itemId: "bookingtrackinglist",
                            leaf: true
                        },
                        {
                            text: "Step 2 list",
                            itemId: "step2list",
                            leaf: true
                        },
                        {
                            text: "Step 3 list",
                            itemId: "step3list",
                            leaf: true
                        },
                        {
                            text: "Step 4 list",
                            itemId: "step4list",
                            leaf: true
                        },
                        {
                            text: "Step 5 list",
                            itemId: "step5list",
                            leaf: true
                        },
                        {
                            text: "Step 6 list",
                            itemId: "step6list",
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

        if (Ext.getCmp('west-regionTempmodule'))
            Ext.getCmp('west-regionTempmodule').destroy();

        if (Ext.getCmp('right_regionTempmodule'))
            Ext.getCmp('right_regionTempmodule').destroy();

        if (Ext.getCmp('tempmodulewindow'))
            Ext.getCmp('tempmodulewindow').destroy();

        me.customerManagement = {
            xtype: 'panel',
            autoScroll: true,
            cls: 'empty',
            title: 'Tempmodule Management',
            items: [{
                xtype: 'treepanel',
                //title: 'Simple Tree',
                border: false,
                name: 'TempModule',
                //width: 200,
                //height: 150,
                store: me.tempmoduleManagementChildren,
                rootVisible: false,
                listeners: {
                    itemclick: function (tree, rec, item, index, e) { }
                }
            }
            ]
        };

        me.layout = 'fit';
        me.items = {

            // width: parseInt(Ext.getBody().getViewSize().width * (0.99)),
            id: 'main-regionTempmodule',
            // height: parseInt(Ext.getBody().getViewSize().height * (0.96)),
            plain: true,
            border: false,
            layout: 'border',
            items: [{
                region: 'west',
                collapsible: true,
                layout: 'fit',
                //split: true,
                width: 250,
                items: [{
                    xtype: 'panel',
                    id: 'west-regionTempmodule',
                    frame: false,
                    //height: 500,
                    //autoHeight: true,
                    layout: 'accordion',
                    items: [me.customerManagement]
                }
                ]
            }, {
                region: 'center',
                layout: 'fit',
                id: 'right_regionTempmodule'
            }
            ]
        };

        me.callParent();
    }

});