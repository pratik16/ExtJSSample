Ext.define('Regardz.view.layout.Operations', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.operations',
    id: 'Operationswindow',

    config: {
        OperationsChildren:
		Ext.create('Ext.data.TreeStore', {
		    root: {
		        expanded: true,
		        text: "",
		        user: "",
		        status: "",
		        children: [{
		            text: "Operations".l("SC70000"),
		            expanded: true,
		            children: [{
		                text: "Plan Board".l("SC70000"),
		                itemId: "planboard",
		                leaf: true
		            },
                    {
		                text: "Inhouse".l("SC70000"),
		                itemId: "operationInhouse",
		                leaf: true
		            }, 
                    {
                        text: "Search Booking".l("SC70000"),
		                itemId: "searchbooking",
		                leaf: true
		            }, {
		                text: "Direct Sales".l("SC70000"),
		                itemId: "directsales",
		                leaf: true
		            }, {
		                text: "Cash Register".l("SC70000"),
		                itemId: "cashregister",
		                leaf: true
		            }
                    ,{
                        text: "Day Closure".l("SC70000"),
                        itemId: "dayclosure",
                        leaf: true
                    }
                    ]
		        }]
		    }
		})
    },

    initComponent: function () {
        var me = this;

        if (Ext.getCmp('west-regionOperations'))
            Ext.getCmp('west-regionOperations').destroy();

        if (Ext.getCmp('right_regionOperations'))
            Ext.getCmp('right_regionOperations').destroy();

        if (Ext.getCmp('Operationswindow'))
            Ext.getCmp('Operationswindow').destroy();

        me.Operations = {
            xtype: 'panel',
            cls: 'empty',
            title: 'Operations_Title'.l("SC70000"),
            items: [{
                xtype: 'treepanel',
                border: false,
                name: 'Operations',
                //width: 200,
                height: 150,
                store: me.OperationsChildren,
                rootVisible: false,
                listeners: {
                    itemclick: function (tree, rec, item, index, e) { }
                }
            }]
        };

        me.layout = 'fit';
        me.items = {
            // width:parseInt(Ext.getBody().getViewSize().width*(0.99)),
            id: 'main-regionOperations',
            //  height: parseInt(Ext.getBody().getViewSize().height*(0.96)),
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
                    id: 'west-regionOperations',
                    frame: false,
                    layout: 'accordion',
                    items: [me.Operations]
                }]
            }, {
                region: 'center',
                layout: 'fit',
                id: 'right_regionOperations'
            }]
        };
        me.callParent();
    }
});
