Ext.define('Regardz.view.layout.Configuration', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.configuration',
    id: 'configurationwindow',

    config: {
        configurationManagementChildren:
		Ext.create('Ext.data.TreeStore', {
		    root: {
		        expanded: true,
		        text: "",
		        user: "",
		        status: "",
		        children: [{
		            text: "Manage Roles & Rights".l('SC20000'),
		            itemId: "manageroles&rights",
		            iconCls: "icon-roles",
		            leaf: true
		        }, {
		            text: "Manage Designation".l('SC20000'),
		            itemId: "designationManagement",
		            iconCls: "icon-designation",
		            leaf: true
		        },/* {
		            text: "Manage Print Templates".l('SC20000'),
		            itemId: "managePrintTemplates",
		            iconCls: "icon-print_template",
		            leaf: true
		        },*/ {
		            text: "Manage Advance Payments".l('SC20000'),
		            itemId: "manageAdvancePayments", //advancePaymentManagement
		            iconCls: "icon-advance_payment_icon",
		            leaf: true
		        }, {
		            text: "Automated Traces".l('SC20000'),
		            itemId: "automatedTraces",
		            iconCls: "icon-info-bubble",
		            leaf: true
		        }, {
		            text: "Business Alerts".l('SC20000'),
		            itemId: "businessAlert",
		            iconCls: "icon-info-bubble",
		            leaf: true
		        }, {
		            text: "Room Type Management".l('SC20000'),
		            itemId: "roomType",
		            iconCls: "",
		            leaf: true
		        }
		        //                , 
		        //                {
		        //		            text: "Reports".l('SC20000'),
		        //		            expanded: true,
		        //		            itemId: "reportsMain",
		        //		            iconCls: "icon-document",
		        //		            children: [{
		        //		                text: "Main Categories".l('SC20000'),
		        //		                itemId: "reportMainCategories",
		        //		                iconCls: "icon-document",
		        //		                leaf: true
		        //		            }, {
		        //		                text: "Category Structure".l('SC20000'),
		        //		                itemId: "reportCategoryStructure",
		        //		                iconCls: "icon-document",
		        //		                leaf: true
		        //		            }, {
		        //		                text: "Maintenance".l('SC20000'),
		        //		                itemId: "reportMaintenance",
		        //		                iconCls: "icon-document",
		        //		                leaf: true
		        //		            }]
		        //		        }

                ]
		    }
		})

    },

    initComponent: function () {

        var me = this;

        if (Ext.getCmp('west-regionConfiguration'))
            Ext.getCmp('west-regionConfiguration').destroy();

        if (Ext.getCmp('right_regionConfiguration'))
            Ext.getCmp('right_regionConfiguration').destroy();

        if (Ext.getCmp('configurationwindow'))
            Ext.getCmp('configurationwindow').destroy();

        me.configurationManagement = {
            xtype: 'panel',
            autoScroll: true,
            cls: 'empty',
            title: 'Configuration Management'.l('SC20000'),
            items: [{
                xtype: 'treepanel',
                //title: 'Simple Tree',
                border: false,
                name: 'configurationManagement',
                //width: 200,
                //height: 150,
                store: me.configurationManagementChildren,
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
            id: 'main-regionConfiguration',
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
                    id: 'west-regionConfiguration',
                    frame: false,
                    //height: 500,
                    //autoHeight: true,
                    layout: 'accordion',
                    items: [me.configurationManagement]
                }
					]
            }, {
                region: 'center',
                layout: 'fit',
                id: 'right_regionConfiguration'
            }
			]
        };

        me.callParent();
    }

});