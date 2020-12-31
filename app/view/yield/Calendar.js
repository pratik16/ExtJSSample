///*Minified by P*/
Ext.define('Regardz.view.yield.Calendar', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.calendar',
    border: false,
    title: 'Calendar_Title'.l('SC74000'),
    initComponent: function () {
        var me = this;
        if (Ext.getCmp('PropertyId')) {
            Ext.getCmp('PropertyId').destroy()
        }
        me.closeAction = 'hide';
        me.autoDestroy = false;
        
        me.eventStore = Ext.create('Ext.calendar.data.MemoryEventStore', {});
        me.items = [{
            xtype: 'combo',
            layout: 'form',
            name: 'PropertyId',
            action: 'propertyToCalendar',
            fieldLabel: 'Property'.l('SC74000'),
            displayField: 'PropertyName',
            id: 'PropertyId',
            valueField: 'PropertyId',
            emptyText: "Select Property".l('SC74000'),
            anchor: '100%',
            style: 'margin:10px',
            flex: 1,
            store: Ext.getStore('common.PropertyForNamesStore')
        }, {
            xtype: 'panel',
            margin: 7,
            items: [{
                xtype: 'calendarpanel',
                flex: 1,
                action: 'eventClicked',
                height: parseInt(Ext.getBody().getViewSize().height * (0.79)),
                eventStore: me.eventStore,
                border: false
            }
				]
        }
		];
        me.callParent()
    },
    checkScrollOffset: function () {
        var scrollbarWidth = Ext.getScrollbarSize ? Ext.getScrollbarSize().width : Ext.getScrollBarWidth();
        if (scrollbarWidth < 3) {
            Ext.getBody().addCls('x-no-scrollbar');
        }
        if (Ext.isWindows) {
            Ext.getBody().addCls('x-win');
        }
    },
    showEditWindow: function (rec, animateTarget) {
        if (!this.editWin) {
            this.editWin = Ext.create('widget.addexception').show();
        }
        Ext.data.MemoryProxy.override({
            updateOperation: function (operation, callback, scope) {
                operation.setCompleted();
                operation.setSuccessful();
                Ext.callback(callback, scope || me, [operation]);
            },
            create: function () {
                this.updateOperation.apply(this, arguments);
            },
            update: function () {
                this.updateOperation.apply(this, arguments);
            },
            destroy: function () {
                this.updateOperation.apply(this, arguments);
            }
        });
        this.editWin.show();
    }
});