Ext.namespace("Ext.ux");
Ext.require(['Ext.ux.CheckColumn']);

Ext.define('Regardz.view.property.CashRegisterList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.cashregisterlist',
    id: 'cashregisterlist',
    store: 'property.CashRegisterStore',
    loadMask: true,
    columnLines: false,
    selType: 'rowmodel',
    viewConfig: { forceFit: true },
    requires: ['Ext.ux.form.SearchField'],
//    plugins: [Ext.create('Ext.grid.plugin.RowEditing', {
//                  clicksToEdit: 1,
//                  listeners: {
//                      beforeedit: function (e, editor) {
//                          if (e.rowIdx == 1)
//                              return false;
//                      }
//                  }
//              })],
    //Ext.create('Ext.grid.plugin.RowEditing', { clicksToEdit: 1 }),
    plugins: [Ext.create('Ext.grid.plugin.RowEditing', {
                        clicksToMoveEditor: 1,
                        autoCancel: false
                    })],
    title: 'Cash Registers_Title'.l('SC31900'),
    width: '99%',
    height: '90%',
    initComponent: function () {
        var me = this;
        me.noResize = true;
        me.height = 300;
        me.columns =
            [{
                header: 'Name'.l('SC31900'),
                dataIndex: 'CashRegisterName',
                sortable: true,
                width: 90,
                flex: 1,
                editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }
            }, {
                dataIndex: 'CashRegisterId',
                width: 40,
                renderer: this.deleteCashRegister,
                name: 'deleteCashRegister',
                hideable: false
            }, {
                hidden: true,
                dataIndex: 'CashRegisterId',
                hideable: false
            }, {
                hidden: true,
                dataIndex: 'PropertyId',
                hideable: false
            }, {
                hidden: true,
                dataIndex: 'CreatedBy',
                hideable: false
            }, {
                hidden: true,
                dataIndex: 'UpdatedBy',
                hideable: false
            }];

        me.tbar = [{
            xtype: 'button',
            action: 'addCashRegister',
            iconCls: 'new',
            text: 'Add New'.l('SC31900'),
            tooltip: 'Add CashRegister'.l('SC31900')
        },
			'->', {
			    xtype: 'button',
			    iconCls: 'filter',
			    disabled: true
			}, {
			    xtype: 'searchfield',
			    store: Ext.getStore('property.CashRegisterStore'),
			    iconCls: 'filter',
			    paramName: 'searchString'
			}
		];

        me.bbar = {
            xtype: 'pagingtoolbar',
            store: me.store,
            displayInfo: true,
            emptyMsg: "No data to display".l("g")
        };

        me.callParent();
    },
    deleteCashRegister: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Delete Cash Register".l('SC31900');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-dele';
    }
});