Ext.define('Regardz.view.property.RoomPriceManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.roompricemanage',
    modal: true,
    width: parseInt(Ext.getBody().getViewSize().width * (0.70)),
    height: parseInt(Ext.getBody().getViewSize().height * (0.60)),
    //border: false,
    initComponent: function () {
        var me = this;
        me.roompricemanagebarA = Ext.create('widget.roompricemanagebarA', { height: me.height - 100, width: me.width - 100 });
        me.roompricemanagebarB = Ext.create('widget.roompricemanagebarB', { height: me.height - 100, width: me.width - 100 });
        me.roompricemanagebarC = Ext.create('widget.roompricemanagebarC', { height: me.height - 100, width: me.width - 100 });
		me.roompricemanagebarD = Ext.create('widget.roompricemanagebarD', { height: me.height - 100, width: me.width - 100 });

        if (me.record == null) {
            me.recordType = 'Add';
            var startDate = new Date();
            startDate = Ext.util.Format.date(startDate, 'Y-m-d');
        }
        else {
            me.recordType = 'Edit';
            var startDate = me.record;
            startDate = Ext.util.Format.date(startDate, 'Y-m-d');
        }
        me.title = 'Room Price Detail_Title'.l('SC31071');
        //me.layout = 'fit';
        Ext.apply(me, {
            
            autoShow: true,
            y: 50,
            bodyStyle: 'background: none',
            closable: true,
            resizable: true,
            buttonAlign: 'right',
            border: false,
            resizable: false,
            items: [
                {
                    xtype: 'hidden',
                    name: 'saveTypePrice',
                    itemid: 'saveTypePrice',
                    value: me.recordType
                },
                {
			        xtype: 'datefield',
			        anchor: '100%',
			        fieldLabel: 'Start Date'.l('SC31071'),
			        itemid: 'StartDate',
			        name: 'StartDate',
                    itemid: 'StartDate',
			        format: usr_dateformat,
			        submitFormat: 'Y-m-d',
			        value: startDate,
                    padding: '10 0 0 10'                
			    },
               
                {
                    xtype: 'tabpanel',
                    id: 'tbp_re',
                    name: 'tbp_re',
                    plain: false,
                    border: false,
                    bodyPadding: 1,
                    cls: 'propertyEdit',
                    style: 'background:none; border:0px;',
                    defaults: {
                        layout: 'fit'
                    },
                    items: [{
                        title: 'BAR A'.l('SC31071'),
                        name: 'roompricemanagebarA',
					    itemid: 'roompricemanagebarA',
                        items: me.roompricemanagebarA
                    }, {
                        title: 'BAR B'.l('SC31071'),
                        name: 'roompricemanagebarB',
					    itemid: 'roompricemanagebarB',
                        items: me.roompricemanagebarB
                    }, {
                        title: 'BAR C'.l('SC31071'),
                        name: 'roompricemanagebarC',
                        itemid: 'roompricemanagebarC',
                        items: me.roompricemanagebarC
                    },
				    {
                        title: 'BAR D'.l('SC31071'),
                        name: 'roompricemanagebarD',
                        itemid: 'roompricemanagebarD',
                        items: me.roompricemanagebarD
                     }]
                 }
            ]
        });
        me.dockedItems = [{
            dock: 'bottom',
            align: 'right',
            buttonAlign: 'right',
            buttons: [{
                text: 'Cancel'.l('w'),
                action: 'cancel',
                handler: function () {
                    me.destroy();
                }
            }, {
                text: 'Save'.l('w'),
                action: 'room_price_save'
            }]
        }];

        me.callParent();
    }
});