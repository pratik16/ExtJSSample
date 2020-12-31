Ext.define('Regardz.view.usermanage.SalesTargetManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.salestargetmanage',
    modal: true,
    width: parseInt(Ext.getBody().getViewSize().width * (0.50)),
    height: parseInt(Ext.getBody().getViewSize().width * (0.35)),
    border: false,
    title: 'User Sales Target Edit_Title'.l('SC32310'),
    autoShow: true,

    initComponent: function () {

        if (Ext.getCmp('salestargetmanage'))
            Ext.getCmp('salestargetmanage').destroy();

        var me = this;

        var year = Ext.util.Format.date(new Date(), 'Y');

        var arrYear = new Array();        
        for (i = -5; i <= 5; i++) {
            arrYear.push([parseInt(year) + i, parseInt(year) + i]);

        }
        
        me.yearCombo = new Ext.data.SimpleStore({
            fields: ['Year', 'Year'],
            data: arrYear
        });

        me.layout = "fit";
        me.items = [{
            xtype: 'form',
            id: 'salestargetmanage',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:10px;",
            items: [{
                // hidden: true,
                xtype: 'hiddenfield',
                name: 'userid',
                value: me.UserId
            }, {
                xtype: 'grid',
                height: me.height - 100,
                title: "Sales Targets".l('SC32310'),
                itemid: 'salestargetmanagelist',
                //noResize: true,
                remoteSort: true,
                store: Ext.getStore('usermanage.SalesTargetManageStore'),

                viewConfig: {
                    forceFit: true
                },
                plugins: [Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2
                })],
                frame: true,
                autoScroll: true,
                columns: [{
                    hidden: true,
                    dataIndex: 'SalesTargetId'
                }, {
                    hidden: true,
                    dataIndex: 'UserId'
                }, {
                    header: 'Year'.l('SC32310'),
                    dataIndex: 'Year',
                    align: 'center',
                    flex: 1,
                    name: 'Year',
                    editor: {
                        xtype: 'combo',
                        name: 'Year',
                        store: me.yearCombo,
                        valueField: 'Year',
                        displayField: 'Year',
                        allowBlank: false,
                        editable: true
                    }
                }, {
                    header: 'New Business'.l('SC32310'),
                    dataIndex: 'NewBusiness',
                    width: 150,
                    align: 'right',
                    name: 'NewBusiness',
                    renderer: this.decimalComma,
                    // renderer: Ext.util.Format.numberRenderer('0,000/i'),
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0
                    }
                }, {
                    header: 'Deepening'.l('SC32310'),
                    dataIndex: 'Deepening',
                    align: 'right',
                    width: 150,
                    name: 'Deepening',
                    renderer: this.decimalComma,
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0
                    }
                }, {
                    dataIndex: 'SalesTargetId',
                    align: 'center',
                    width: 25,
                    renderer: this.SalesTargetDelete,
                    name: 'SalesTargetDelete',
                    hideable: false
                }, {
                    hidden: true,
                    dataIndex: 'CreatedDate'
                }, {
                    hidden: true,
                    dataIndex: 'CreatedBy'
                }, {
                    hidden: true,
                    dataIndex: 'UpdatedDate'
                }, {
                    hidden: true,
                    dataIndex: 'UpdatedBy'
                }],
                tbar: [{
                    xtype: 'button',
                    action: 'addSalesTarget',
                    iconCls: 'new',
                    text: 'Add New'.l('SC32310'),
                    tooltip: 'Add Sales Target'.l('SC32310')
                }],
                bbar: [{
                    xtype: 'pagingtoolbar',
                    store: Ext.getStore('usermanage.SalesTargetManageStore'),
                    displayInfo: true,
                    //displayMsg: 'Displaying topics {0} - {1} of {2}',
                    emptyMsg: "No topics to display".l('g')
                }]
                
            }],
            buttons: [{
                        text: 'Close'.l('w'),
                        action: 'cancel',
                        handler: function () {
                            me.destroy();
                        }
                    }
		        ]
        }];
        me.callParent();
    },
    SalesTargetDelete: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Delete Sales Target".l('SC32310');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-delete';
    },
    decimalComma: function (value, metadata, record, rowIndex, colIndex, store) {

        return String(value).replace('.', Ext.util.Format.decimalSeparator);
        //    return 1;
    }

});