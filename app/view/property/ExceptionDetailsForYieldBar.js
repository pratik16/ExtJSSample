Ext.define('Regardz.view.property.ExceptionDetailsForYieldBar', {
    extend: 'Ext.window.Window',
    alias: 'widget.exceptiondetailsforyieldbar',
    modal: true,
    layout: 'fit',
    width: 190,
    autoScroll: true,
    autoHeight: true,
    autoHeight: true,
    border: false,
    title: 'Exception details_Title_SCCODE'.l('SC31166'),
    autoShow: true,
    initComponent: function () {

        var me = this;

        me.items = [{
            xtype: 'form',
            itemId: 'exceptionDetailsForYieldBar',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:15px;",
            items: [{
                xtype: 'displayfield',
                //fieldLabel: 'Standaard rate'.l('SC31166'),
                fieldLabel: '',
                name: 'StandaardRate',
                width: 125,           
                flex: 1
            }, {
                xtype: 'displayfield',
                //fieldLabel: 'Room Types'.l('SC31166'),
                fieldLabel: '',
                width: 125,
                name: 'RoomTypes',
                flex: 1
            }, {
                xtype: 'displayfield',
                width: 125,
                fieldLabel: '',
                name: 'Room',
                flex: 1
            }]
        }
		];
        me.callParent(arguments);
    }
});