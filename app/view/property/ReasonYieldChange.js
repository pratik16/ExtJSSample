Ext.define('Regardz.view.property.ReasonYieldChange', {
    extend: 'Ext.window.Window',
    alias: 'widget.reasonyieldchange',
    modal: true,
    layout: 'fit',
    width: 400,
    border: false,
    title: 'Reason Yield Change_Title_SCCODE'.l('SC31165'),
    autoShow: true,
    initComponent: function () {

        if (Ext.getCmp('reasonYieldChange'))
            Ext.getCmp('reasonYieldChange').destroy();

        var me = this;

        me.items = [{
            xtype: 'form',
            id: 'reasonYieldChange',
            itemId: 'reasonYieldChange',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:15px;",
            items: [{
                xtype: 'textareafield',
                name: 'Reason',
                height: 75,
                allowBlank: false,
                grow: true,
                fieldLabel: '',
                maxLength: 2000,
                anchor: '100%'
            }, {
                xtype: 'hidden',
                name: 'PropertyId',
                value: me.PropertyId
            }, {
                xtype: 'hidden',
                name: 'TimeSlotId'
            }, {
                xtype: 'hidden',
                name: 'WeekNo'
            }, {
                xtype: 'hidden',
                name: 'Day'
            }, {
                xtype: 'hidden',
                name: 'Date'
            }, {
                xtype: 'hidden',
                name: 'RoomId'
            }, {
                xtype: 'hidden',
                name: 'RoomTypeId'
            }, {
                xtype: 'hidden',
                name: 'ChangeBarId',
                value: me.changeBarId
            }, {
                xtype: 'hidden',
                name: 'UserId',
                value: me.userId
            }],
            buttons: [{
                text: 'Cancel'.l('w'),
                action: 'cancelYieldBarChange'
//                ,
//                scope: me,
//                handler: function () {
//                    this.close()
//                }
            }, {
                text: 'Save'.l('w'),
                action: 'saveYieldBarChange'
            }]
        }
		];
        me.callParent(arguments);
    }
});