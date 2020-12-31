Ext.define('Regardz.view.bookingwizard.ChangeBookingStatus', {
    extend: 'Ext.window.Window',
    alias: 'widget.changebookingstatus',
    modal: true,
    border: false,
    title: 'Change Booking Status_Title'.l('SC55100'),
    uses: ['Regardz.view.common.RadioRow'],
    width: "60%",
    autoShow: false,
    initComponent: function () {
        var me = this;

        //        var buttonArrow = Ext.create('Ext.Button', {
        //            disabled: true,
        //            iconCls: 'arrow_down',
        //            width: 90,
        //            iconAlign: 'top',
        //            iconMask: true,
        //            text: 'DFT',
        //            action: 'draft',
        //            itemid: 'btnid_0'
        //        });
        var buttonArrow1 = Ext.create('Ext.Button', {
            iconCls: 'arrow_down',
            width: 100,
            iconAlign: 'top',
            iconMask: true,
            //disabled: true,
            text: 'OFF',
            action: 'off',
            itemid: 'btnid_1'
        });
        var buttonArrow2 = Ext.create('Ext.Button', {
            iconCls: 'arrow_down',
            width: 100,
            iconAlign: 'top',
            iconMask: true,
            text: 'ONF',
            action: 'onf',
            itemid: 'btnid_2'
        });
        var buttonArrow7 = Ext.create('Ext.Button', {
            iconCls: 'arrow_down',
            width: 100,
            iconAlign: 'top',
            iconMask: true,
            text: 'OP2',
            action: 'optional2',
            itemid: 'btnid_3'
        });
        var buttonArrow3 = Ext.create('Ext.Button', {
            iconCls: 'arrow_down',
            width: 100,
            iconAlign: 'top',
            iconMask: true,
            text: 'OPT',
            action: 'optional',
            itemid: 'btnid_4'
        });
        var buttonArrow4 = Ext.create('Ext.Button', {
            iconCls: 'arrow_down',
            width: 100,
            iconAlign: 'top',
            iconMask: true,
            text: 'TEN',
            action: 'tentitive',
            itemid: 'btnid_5'
        });
        var buttonArrow5 = Ext.create('Ext.Button', {
            iconCls: 'arrow_down',
            width: 100,
            iconAlign: 'top',
            iconMask: true,
            text: 'DEF',
            action: 'definete',
            itemid: 'btnid_6'
            //iconAlign: 'left'
        });
        me.gridPanel = {
            xtype: 'gridpanel',
            itemid: 'changebookingstatus',
            title: 'Apply To'.l('SC55100'),
            border: true,
            padding: 10,
            width: "100%",
            height: 245,
            store: 'bookingwizard.ChangeBookingStatusStore',
            viewConfig: {
                markDirty: false
            },
            columns: [{
                hidden: true,
                dataIndex: 'BookingEventId',
                hideable: false
            }, {
                hidden: true,
                dataIndex: 'BookingEventTrackingId',
                hideable: false
            }, {
                header: "Event".l('SC55100'),
                sortable: true,
                dataIndex: 'EventName',
                name: 'item',
                width: 100,
                flex: 1
                //            }, {
                //                header: 'Draft'.l('SC50500'),
                //                dataIndex: 'IsDraft',
                //                name: 'Draft',
                //                //xtype: 'radiorow',                
                //                renderer: this.renderRadio,
                //                width: 100
            }, {
                header: 'Quatation'.l('SC50500'),
                dataIndex: 'IsQuotOnOff',
                name: 'QuotOnOff',
                //xtype: 'radiorow',                
                renderer: this.renderRadio,
                width: 100
            }, {
                //header: 'Qua. w/a date'.l('SC50500'),
                header: 'Opt. w/o forecast'.l('SC50500'),
                dataIndex: 'IsQuotWODateOnOff',
                name: 'QuotWODateOnOff',
                //xtype: 'radiorow',
                renderer: this.renderRadio,
                width: 100
            }, {
                header: 'Optional2'.l('SC50500'),
                dataIndex: 'IsOptional2',
                name: 'Optional2',
                //xtype: 'radiorow',
                renderer: this.renderRadio,
                width: 100
            }, {
                header: 'Optional'.l('SC50500'),
                dataIndex: 'IsOptional',
                name: 'Optional',
                //xtype: 'radiorow',
                renderer: this.renderRadio,
                width: 100
            }, {
                header: 'Tentative'.l('SC50500'),
                dataIndex: 'IsTentative',
                name: 'Tentative',
                //xtype: 'radiorow',
                renderer: this.renderRadio,
                width: 100
            }, {
                header: 'Definite'.l('SC50500'),
                dataIndex: 'IsDefinite',
                name: 'Definite',
                //xtype: 'radiorow',
                renderer: this.renderRadio,
                width: 100
            }],
            buttons: [{
                text: 'Close'.l('g'),
                handler: function () {
                    me.close();
                }
            }, {
                text: 'Save'.l('g'),
                action: 'saveBookingStatus',
                handler: function () {
                    me.close();
                }
            }],
            tbar: [{
                xtype: 'tbfill'
            }, buttonArrow1, buttonArrow2, buttonArrow7, buttonArrow3, buttonArrow4, buttonArrow5
            ]
        };
        me.items = [{
            xtype: 'hidden',
            name: 'BookingId',
            itemid: 'bookingId',
            value: me.BookingId
        }, {
            xtype: 'hidden',
            name: 'BookingTrackingId',
            itemid: 'bookingTrackingId',
            value: me.BookingTrackingId
        }, me.gridPanel];

        me.callParent(arguments);
    },
    renderRadio: function (value, metadata, record, rowIdx, colIndex, store) {
        if (colIndex > 1) {
            //Set BookingEvent/Tracking Id
            var bookingEventId = record.data.BookingEventId;
            if (!Utils.isValid(bookingEventId)) {
                bookingEventId = 0;
            }
            var bookingEventTrackingId = record.data.BookingEventTrackingId;
            if (!Utils.isValid(bookingEventTrackingId)) {
                bookingEventTrackingId = 0;
            }

            //Set OPT/OP2 correct index
            //if (colIndex == 5) colIndex = colIndex + 1;
            //else if (colIndex == 6) colIndex = colIndex - 1;

            var statusIndex = colIndex - 2;
            var name = "name_" + (bookingEventId != undefined && bookingEventId != null && bookingEventId != 0 ? bookingEventId : bookingEventTrackingId);

            //Set StatusId
            var status = record.data.StatusId;
            if (status == 10) status = 0;

            if (status == 3) status = 4;
            else if (status == 4) status = 3;

            //if (statusIndex == 1) debugger;
            var btnId = "btnid_" + statusIndex;
            var btn = Ext.ComponentQuery.query('[itemid="' + btnId + '"]')[0];
            btn.setDisabled(false);
            //If confirmed booking, disable low status bookings
            if (bookingEventId != undefined && bookingEventId != null && bookingEventId != 0) {
                if (statusIndex < status)
                    btn.setDisabled(true);
            } else {
                //If not confirmed booking, on OFF status, disable others
                if (status == 1 && statusIndex != 1)
                    btn.setDisabled(true);
            }

            //Set selected item
            if (status == statusIndex) {
                return "<div style='text-align:center !important;'><input type='radio' onclick='Utils.SaveNewStatusBSStore(" + bookingEventTrackingId + "," + bookingEventId + "," + statusIndex + ");' checked='checked'   name='" + name + "'/></div>";
            }
            //If confirmed booking, disable low status bookings
            else if (bookingEventId != undefined && bookingEventId != null && bookingEventId != 0) {
                if (statusIndex < status)
                    return "<div style='text-align:center !important;'><input type='radio' disabled='disabled'  name='" + name + "'/></div>";
                else
                    return "<div style='text-align:center !important;'><input type='radio' onclick='Utils.SaveNewStatusBSStore(" + bookingEventTrackingId + "," + bookingEventId + "," + statusIndex + ");' name='" + name + "'/></div>";
            } else {
                if (status == 1 && statusIndex != 1)
                    return "<div style='text-align:center !important;'><input type='radio' disabled='disabled'  name='" + name + "'/></div>";
                else
                    return "<div style='text-align:center !important;'><input type='radio' onclick='Utils.SaveNewStatusBSStore(" + bookingEventTrackingId + "," + bookingEventId + "," + statusIndex + ");' name='" + name + "'/></div>";
            }
        }
    }
});