Ext.namespace("Ext.ux");
Ext.require([
    'Ext.ux.RowExpander',
    'Ext.selection.CheckboxModel'
]);
Ext.define('Regardz.view.operations.windows.inhouse.BookingViewWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.inhousebookingview',
    modal: true,
    border: false,
    title: 'Booking View_Title'.l('SC71110'),
    width: 1000,
    height: parseInt(Ext.getBody().getViewSize().height * (0.95)),
    y: 0,
    padding: 10,
    localObject: {},
    ReservationId: 0,
    BookingId: 0,
    initComponent: function () {
        var me = this;
        me.autoScroll = true;
        me.rightGrid = {
            xtype: 'gridpanel',
            border: false,
            width: '100%',
            noResize: true,
            hideHeaders: true,
            itemid: 'inhouseBookingStatusGrid',
            store: Ext.getStore('operations.OperationsInhouseBookingChanges'),
            viewConfig: {
                forceFit: true,
                emptyText: 'No records'.l('SC71110'),
                getRowClass: function (record, index, rowParams, store) {
                    if (record.get('IsCurrentbooking')) {
                        //log('record is', record);
                        return ' bold-row ';
                    }
                }
            },
            columns: [
            { text: 'Index'.l('SC71110'), dataIndex: 'RN', width: 25 },
            { text: 'Date'.l('SC71110'), dataIndex: 'BookingDate', width: 80, renderer: this.dateRenderer },
            { text: 'Cevatext'.l('SC71110'), dataIndex: 'Prefix', width: 50 },
            { text: 'Status'.l('SC71110'), dataIndex: 'Status', width: 150 },
            { text: 'Contact'.l('SC71110'), dataIndex: 'UserName', flex: 1 },
            ]
        };
        me.rightGridEvent = {
            xtype: 'treepanel',
            border: false,
            width: '100%',
            noResize: true,
            rootVisible: false,
            cls: 'gridwhitebackground',
            hideHeaders: true,
            itemid: 'inhouseBookingEventItemGrid',
            store: Ext.getStore('operations.OperationsBookingEventItemStore'),
            viewConfig: {
                forceFit: true,
                getRowClass: function (record) {
                    if (record.data.IsItemGroupChild == 'true' || (record.data.ItemExternRemark == null && record.data.ItemInternRemark == null)) {
                        return ' custome-Expander ';
                    }
                }
            },
            autoHeight: true,
            plugins: {
                ptype: 'rowexpander',
                pluginId: 'expander',
                rowBodyTpl: [
                            '<tpl if="ItemExternRemark"><p style="margin: 5px 5px 10px 36px;"><b>Extern:</b><br /> {ItemExternRemark}</p></tpl>',
                            '<tpl if="ItemInternRemark"><p style="margin: 5px 5px 10px 36px;"><b>Intern:</b><br /> {ItemInternRemark}</p></tpl>'
                            ]

            },
            columns: [{
                xtype: 'treecolumn',
                dataIndex: 'Time',
                width: 150
                //renderer: this.expanderRenderer
            }, {
                flex: 1,
                dataIndex: 'ItemName'
            }]
        };
        /* EOF right side */

        /* Big panel splited in 2 */
        me.bigPanel = {
            border: false,
            frame: false,
            layout: 'column',
            margin: 10,
            itemid: 'viewBookingInfo',
            items: [{
                border: true,
                columnWidth: .50,
                margin: '0 10 0 0',
                items: [{
                    xtype: 'rightbookingninformation'
                }]
            }, {
                border: false,
                style: 'background:none; border:0px;',
                columnWidth: .49,
                items: [{
                    xtype: 'displayfield',
                    itemid: 'EventNameLabelId',
                    padding: '0 0 10 0',
                    fieldLabel: '',
                    hidden: true,
                    margin: '0'
                }, {

                    border: false,
                    style: 'background:none; border:0px;',
                    itemid: 'bookingEventItems',
                    hidden: true,
                    items: [me.rightGridEvent]

                }, {
                    border: false,
                    style: 'background:none; border:0px;',
                    itemid: 'bookingStatusHistory',
                    hidden: false,
                    items: [me.rightGrid]
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Remark'.l('SC50000'),
                    margin: '0',
                    padding: '10  0 0 0',
                    hidden: true,
                    itemid: 'EventItemRemark'
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'External Event Remark'.l('SC50000'),
                    margin: '0',
                    padding: '10  0 0 0',
                    hidden: true,
                    itemid: 'EventExternRemark'
                }
                ]
            }]
        };
        /* EOF Big panel */
        me.items = [me.bigPanel, { xtype: 'textfield', hidden: true, itemid: 'inhouseBookingViewBookingId', value: me.BookingId }, { xtype: 'textfield', hidden: true, itemid: 'inhouseBookingViewReservationId', value: me.ReservationId}];
        me.buttons = [{
            text: 'Close'.l('w'),
            handler: function () {
                me.close();
            }
        }];
        me.callParent();

    },
    dateRenderer: function (value, metadata, record, rowIndex, colIndex, store) {
        var d = Ext.Date.parse(value, 'c');
        return Ext.util.Format.date(d, usr_dateformat);
    },
    timeRenderer: function (value, metadata, record, rowIndex, colIndex, store) {
        return Ext.Date.parse(value, 'H:i:s');
    },
    expanderRenderer: function (value, metadata, record, rowIndex, colIndex, store) {
        //            debugger;
        //            if (record.get('ItemExternRemark') != "") {
        //                metadata.cellAttr = 'rowspan="2"';
        //                return '<div class="x-grid3-row-expander"></div>';
        //            } else {
        //                metadata.id = '';
        //                return '&#160;';
        //            }

        if (record.data.IsItemGroupChild == 'true') {
            //debugger;
            var grid = Ext.ComponentQuery.query('treepanel[itemid="inhouseBookingEventItemGrid"]')[0];
            var columnId = grid.getPlugin('expander').getHeaderId();
            //metadata.tdCls = ' custome-Expander ';
            //metadata.trCls = ' custome-Expander ';
            //Ext.getCmp(columnId).hide();
        }
        return value;
    }
});