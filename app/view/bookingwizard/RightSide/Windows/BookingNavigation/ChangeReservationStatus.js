Ext.define('Regardz.view.bookingwizard.RightSide.Windows.BookingNavigation.ChangeReservationStatus', {
    extend: 'Ext.window.Window',
    alias: 'widget.bookingnavigationchangereservationstatus',
    modal: true,
    border: false,
    title: "Change Reservation Status".l('SC50500'),
    width: "80%",

    initComponent: function () {
        var me = this;
        me.height = parseInt(Ext.getBody().getViewSize().height * (0.5));
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
            itemid: 'reservationStatusGrid',
            title: 'Bookings'.l('SC50500'),
            border: true,
            padding: 10,
            height: parseInt(me.height * (0.9)),
            width: "100%",
            store: 'bookingwizard.ReservationStatusChangeStore',
            viewConfig: {
                markDirty: false
            },
            columns: [{
                text: 'Date'.l('SC50500'),
                dataIndex: 'BookingDate',
                flex: 2,
                renderer: this.dateRenderer
            },
            {
                text: 'Booking ID'.l('SC50500'),
                dataIndex: 'BookingNumber',
                flex: 2
            },
            {
                text: 'Name'.l('SC50500'),
                dataIndex: 'BookingName',
                flex: 2
            }, {
                text: 'Quatation'.l('SC50500'),
                dataIndex: 'IsQuotOnOff',
                name: 'QuotOnOff',
                renderer: this.renderRadio,
                width: 100
            }, {
                text: 'Opt. w/o forecast'.l('SC50500'),
                dataIndex: 'IsQuotWODateOnOff',
                name: 'QuotWODateOnOff',
                renderer: this.renderRadio,
                width: 100
            }, {
                text: 'Optional2'.l('SC50500'),
                dataIndex: 'IsOptional2',
                name: 'Optional2',
                renderer: this.renderRadio,
                width: 100
            }, {
                text: 'Optional'.l('SC50500'),
                dataIndex: 'IsOptional',
                name: 'Optional',
                renderer: this.renderRadio,
                width: 100
            },
            {
                text: 'Tentative'.l('SC50500'),
                dataIndex: 'IsTentative',
                name: 'Tentative',
                renderer: this.renderRadio,
                width: 100
            },
            {
                text: 'Definite'.l('SC50500'),
                dataIndex: 'IsDefinite',
                name: 'Definite',
                renderer: this.renderRadio,
                width: 100
            }
            ], buttons: [{
                text: 'Close'.l('w'),
                handler: function () {
                    me.close();
                }
            },
            {
                text: 'Save'.l('w'),
                action: 'saveReservationStatus',
                handler: function () {
                    me.close();
                }
            }],
            tbar: [{ xtype: 'tbfill' }, buttonArrow1, buttonArrow2, buttonArrow7, buttonArrow3, buttonArrow4, buttonArrow5]
        };

        me.items = [me.gridPanel];
        me.callParent();
    },
    renderRadio: function (value, metadata, record, rowIdx, colIndex, store) {
        if (colIndex > 1) {            
            //Set Booking/Tracking Id
            var bookingId = record.data.BookingId;
            if (!Utils.isValid(bookingId)) {
                bookingId = 0;
            }
            var bookingTrackingId = record.data.BookingTrackingId;
            if (!Utils.isValid(bookingTrackingId)) {
                bookingTrackingId = 0;
            }

            var statusIndex = colIndex - 2;
            //var name = "name_" + bookingTrackingId;
            var name = "name_" + (bookingId != undefined && bookingId != null && bookingId != 0 ? bookingId : bookingTrackingId);

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
            if (bookingId != undefined && bookingId != null && bookingId != 0) {
                if (statusIndex < status)
                    btn.setDisabled(true);
            } else {
                //If not confirmed booking, on OFF status, disable others
                if (status == 1 && statusIndex != 1)
                    btn.setDisabled(true);
            }

            //Set selected item
            if (status == statusIndex) {
                return "<div style='text-align:center !important;'><input type='radio' onclick='Utils.SaveNewStatusRSStore(" + bookingTrackingId + "," + bookingId + "," + statusIndex + ");' checked='checked'   name='" + name + "'/></div>";
            }
            //If confirmed booking, disable low status bookings
            else if (bookingId != undefined && bookingId != null && bookingId != 0) {
                if (statusIndex < status)
                    return "<div style='text-align:center !important;'><input type='radio' disabled='disabled'  name='" + name + "'/></div>";
                else
                    return "<div style='text-align:center !important;'><input type='radio' onclick='Utils.SaveNewStatusRSStore(" + bookingTrackingId + "," + bookingId + "," + statusIndex + ");' name='" + name + "'/></div>";
            } else {
                if (status == 1 && statusIndex != 1)
                    return "<div style='text-align:center !important;'><input type='radio' disabled='disabled'  name='" + name + "'/></div>";
                else
                    return "<div style='text-align:center !important;'><input type='radio' onclick='Utils.SaveNewStatusRSStore(" + bookingTrackingId + "," + bookingId + "," + statusIndex + ");' name='" + name + "'/></div>";
            }
        }
    },
    dateRenderer: function (value, metadata, record, rowIndex, colIndex, store) {

        var d = Ext.Date.parse(value, 'c');

        return Ext.util.Format.date(d, usr_dateformat);
    }
});