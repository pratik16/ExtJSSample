Ext.define('Regardz.view.bookingwizard.RightSide.Windows.BookingNavigation.CancelWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.bookingnavigationcancelwindow',
    modal: true,
    border: false,
    title: "Cancel Reservation/Booking/Event_Title_SCCODE".l('SC50600'),
    width: parseInt(Ext.getBody().getViewSize().width * (0.75)),
    height: parseInt(Ext.getBody().getViewSize().height * (0.85)),
    resizable: false,
    reservationId: 0,
    BookingEventId: 0,
    BookingId: 0,
    ReservationId: 0,
    BookingTrackingId: 0,
    BookingEventTrackingId: 0,
    typeCancellation: '',
    y: 0,
    autoScroll: true,
    initComponent: function () {

        if (Ext.getCmp('searchStringCmp'))
            Ext.getCmp('searchStringCmp').destroy();

        var me = this;        

        me.leftBottom = {
            xtype: 'fieldcontainer',
            fieldLabel: 'Percentage'.l('SC50600') + '(%) *',
            labelWidth: 150,
            defaultType: 'textfield',
            margin: '10 0 10 0',
            layout: 'vbox',
            items: [{
                xtype: 'numberfield',
                name: 'price',
                itemid: 'cancelPercentage',
                vtype: 'decimalValue',
                enableKeyEvents: true,
                maxValue: 100,
                minValue: 0
            }
            ]
        };
        me.leftBottom2 = {
            xtype: 'displayfield',
            labelWidth: 150,
            fieldLabel: 'Total cost of cancelation'.l('SC50600') + "*",
            itemid: 'cancelValue'
        };

        /* Right side */
        me.rightTop = {
            xtype: 'fieldcontainer',
            fieldLabel: 'Reason'.l('SC50600') + "*",
            layout: 'vbox',
            items: [{
                xtype: 'combo',
                displayField: 'Reason',
                //value: 'Reason 2',
                itemid: 'CancellationReason',
                valueField: 'CancellationReasonId',
                store: Ext.getStore('common.CancellationReasonStore')
            }]
        };
        var buttonSearch = Ext.create('Ext.Button', {
            scale: 'small',
            iconCls: 'search-icon',
            width: 20,
            iconAlign: 'left'
        });
        var filterField = Ext.create('Ext.form.TextField', {
            xtype: 'textfield',
            name: 'filterContact',
            itemid: 'fieldFilterCompanies',
            selectOnFocus: true,
            emptyText: 'filter'
        });


        me.rightCompeditor = {
            xtype: 'grid',
            title: 'Competitors'.l('SC61100'),
            store: Ext.getStore('bookingwizard.RightSide.SalesInfoCompetitorStore'),
            itemid: 'CompetitorsList',
            //cls: 'gridwhitebackground',
            height: parseInt(me.height * (0.6)),
            width: '100%',
            layout: 'fit',
            frame: false,
            autoScroll: true,
            columns: [{
                flex: 1,
                header: 'Name'.l('SC61100'),
                dataIndex: 'Name'
            },

            {
                hidden: true, dataIndex: 'CompetitorId'
            },
            {
                dataIndex: 'checked', xtype: 'radiorow', width: 25
            }],
            tbar: ['->', {
                xtype: 'button',
                iconCls: 'filter',
                disabled: true
            }, {
                xtype: 'textfield',
                id: 'searchStringCmp',
                itemid: 'searchStringCmp',
                name: 'searchStringCmp',
                enableKeyEvents: false
            }, {
                xtype: 'button',
                iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
                action: 'clearCompetitors',
                hidden: true
            },
					 {
					     xtype: 'button',
					     action: 'searchCompetitors',
					     iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
					 }
				]

        };

        me.panel = {
            xtype: 'panel',
            bodyStyle: 'background:none;',
            frame: false,
            border: false,
            layout: 'column',            
            items: [{
                columnWidth: .60,
                margin: 10,
                border: false,
                bodyStyle: 'background:none;',

                items: [{
                    height: parseInt(me.height * (0.7)),
                    xtype: 'costofcancelation'
                },
           { xtype: 'hidden', itemid: 'hcCanPercentage' },
             { xtype: 'hidden', itemid: 'hcTotalCancellation' },
                { xtype: 'hidden', itemid: 'CanLevel' },
                me.leftBottom,
                me.leftBottom2
                ]

            },
            {
                columnWidth: .40,
                margin: 10,
                border: false,
                bodyStyle: 'background:none;',
                items: [me.rightTop, me.rightCompeditor, { xtype: 'label', text: 'Remarks'.l('SC50600') },
                { xtype: 'textarea', name: 'OtherReason', width: '100%', margin: '10 0 0 0'}]
            }
            ],
            buttons: [{
                text: 'Close'.l('w'),
                handler: function () {
                    me.close();
                }
            },
          {
              text: 'Save'.l('w'),
              action: 'saveCancellation'
          }]
        };

        me.items = [me.panel];
        me.callParent();
    },
    renderCheckbox: function (value, metadata, record, rowIndex, colIndex, store) {

        return "<input type='checkbox' checked='checked'/>";
    }

});
