Ext.define('Regardz.view.dashboard.DraftQuatationView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.draftquatationview',
    modal: true,
    width: 1120,
    border: false,
    autoShow: true,

    initComponent: function () {
        var me = this;
        me.rightGrid = {
            xtype: 'gridpanel',
            border: false,
            width: '100%',
            padding: 10,
            hideHeaders: true,
            itemid: 'dashboardBookingStatusGrid',
            store: Ext.getStore('operations.OperationsInhouseBookingChanges'),
            viewConfig: {
                forceFit: true,
                //emptyText: 'No records'.l('SC70000'),
                getRowClass: function (record, index, rowParams, store) {
                    if (record.get('isCurrentbooking')) {
                        log('record is', record);
                        return ' bold-row ';
                    }
                }
            },
            columns:
            [{ text: 'Index'.l('SC80000'), dataIndex: 'No', flex: 1 },
            { text: 'Date'.l('SC80000'), dataIndex: 'Date', flex: 2, renderer: this.dateRenderer },
            { text: 'Cevatext'.l('SC80000'), dataIndex: 'Abbrivation', flex: 2 },
            { text: 'Status'.l('SC80000'), dataIndex: 'StatusName', flex: 2 },
            { text: 'Contact'.l('SC80000'), dataIndex: 'UserName', flex: 2}]
        };

        me.ContactInformation = {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: none',
            itemid: 'draftview',
            layout: 'vbox',
            width: '100%',
            //margin: '10',
            items: 
            [{
                xtype: 'fieldcontainer',
                fieldLabel: 'Company name'.l('SC80000'),
                items: [{ xtype: 'displayfield', name: 'CompanyName' }]
            }, {
                xtype: 'fieldcontainer',
                fieldLabel: 'Contact'.l('SC80000'),
                items: [{ xtype: 'displayfield', name: 'Contact' }]
            }, {
                xtype: 'fieldcontainer',
                fieldLabel: 'Email'.l('SC80000'),
                items: [{ xtype: 'displayfield', name: 'Email' }]
            }, {
                xtype: 'fieldcontainer',
                fieldLabel: 'Phone'.l('SC80000'),
                items: [{ xtype: 'displayfield', name: 'Phone' }]
            }]
        };
        
        me.bigPanel = {
            border: false,
            frame: false,
            layout: 'column',
            margin: 10,
            items: [{
                border: true,
                columnWidth: .50,
                margin: '0 10 0 0',
                items: [me.ContactInformation]
            }]
        };
        
        me.items = [me.bigPanel];
        me.buttons = [{
            text: 'Close'.l('g'),
            handler: function () {
                me.close();
            }
        }];
        me.callParent();
    },
    dateRenderer: function (value, metadata, record, rowIndex, colIndex, store) {
        var d = Ext.Date.parse(value, 'c');
        return Ext.util.Format.date(d, usr_dateformat);
    }
});