Ext.define('Regardz.view.property.RoomEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.roomedit',
    modal: true,
    width: parseInt(Ext.getBody().getViewSize().width * (0.90)),
    height: parseInt(Ext.getBody().getViewSize().height * (0.90)),
    //border: false,
    initComponent: function () {
        var me = this;
        me.generalinfo = Ext.create('widget.roomgeneralinfo', { height: '90%', width: '90%', isClone: me.isClone });
        me.classification = Ext.create('widget.roomclassification', { height: me.height - 100, width: parseInt(me.width * 0.5) });
        me.photos = Ext.create('widget.roomphotos', { height: me.height - 100, width: me.width - 100 });

        me.layout = 'fit';

        if (me.isClone) {
            me.isClone = true;
        }
        else {
            me.isClone = false;
        }

        me.tabDisabled = true;
        me.disableitems = true;
        me.langClass = 'languagebutton-disable';

        if (me.roomId > 0) {
            me.tabDisabled = false;
            me.disableitems = false;
            me.langClass = 'languagebutton';
        }


        me.tbar = ['->', {
            xtype: 'button',
            itemid: 'roomEditLanguage',
            action: 'roomEditLanguage',
            tooltip: 'Update multilingual contents'.l('g'),
            disabled: me.disableitems,
            iconCls: me.langClass
        }];



        Ext.apply(me, {
            title: 'Room Manage_Title'.l('SC33150'),
            autoShow: true,
            y: 50,
            bodyStyle: 'background: none',
            closable: true,
            resizable: true,
            buttonAlign: 'right',
            border: false,
            resizable: false,
            items: [{
                xtype: 'hidden',
                name: 'isClone',
                value: me.isClone
            }, {
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
                    title: 'General Info'.l('SC33150'),
                    name: 'generalinfo',
                    items: me.generalinfo
                }, {
                    title: 'Classification'.l('SC33150'),
                    name: 'classification',
                    items: me.classification
                }, {
                    title: 'Photos'.l('SC33150'),
                    name: 'photos',
                    itemid: 'roomphotos',
                    items: me.photos
                }]
            }]
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
                text: 'Save and Close'.l('w'),
                action: 'room_save_close',
                itemid: 'saveandclose',
                formBind: true//, //only enabled once the form is valid
                //disabled : true
            }, {
                text: 'Save'.l('w'),
                action: 'room_save'
            }]
        }];

        me.callParent();
    }
});