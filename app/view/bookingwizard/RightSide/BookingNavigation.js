Ext.define('Regardz.view.bookingwizard.RightSide.BookingNavigation', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.rightbookingnavigation',
    initComponent: function () {
        var me = this;
        me.layout = 'fit';
        me.width = '95%';
        var buttonAddBooking = Ext.create('Ext.Button', {
            iconCls: 'new',
            width: 25,
            action: 'bnAddBooking',
            tooltip: 'Add booking'.l('RS')
            //iconAlign: 'left'
        });
        var buttonCopyreservation = Ext.create('Ext.Button', {
            iconCls: 'icon-copy',
            width: 25,
            action: 'bnCopyReservationBooking',
            tooltip: 'Copy reservation'.l('RS')
            //iconAlign: 'left'
        });
        var buttonCancelReservation = Ext.create('Ext.Button', {
            iconCls: 'icon-stop',
            width: 25,
            action: 'bnCancelWindow',
            tooltip: 'Cancel reservation'.l('RS')
            //iconAlign: 'left'
        });
        var buttonChangeStatus = Ext.create('Ext.Button', {
            iconCls: 'icon-signal',
            width: 20,
            action: 'bnChangeStatus',
            tooltip: 'Change status'.l('RS')
            //iconAlign: 'left'
        });

        var buttonStatusOpt = Ext.create('Ext.Button', {
            width: 30,
            text: 'OPT',
            margin: 5,
            //disabled: true,
            tooltip: 'OPT',
            cls: ' event-status-opt'
            //iconAlign: 'left'
        });
        var buttonStatusOp2 = Ext.create('Ext.Button', {
            width: 30,
            margin: 5,
            text: 'OP2',
            tooltip: 'OP2',
            //disabled: true,
            cls: ' event-status-op2'
            //iconAlign: 'left'
        });
        var buttonStatusTen = Ext.create('Ext.Button', {
            width: 30,
            text: 'TEN',
            tooltip: 'TEN',
            //disabled: true,
            margin: 5,
            cls: ' event-status-ten'
            //iconAlign: 'left'
        });
        var buttonStatusDef = Ext.create('Ext.Button', {
            width: 30,
            text: 'DEF',
            tooltip: 'DEF',
            //disabled: true,
            margin: 5,
            cls: ' event-status-def'
            //iconAlign: 'left'
        });
        var buttonStatusCancel = Ext.create('Ext.Button', {
            width: 30,
            text: 'CAN',
            tooltip: 'CAN',
            //disabled: true,
            margin: 5,
            cls: ' event-status-cancel'
            //iconAlign: 'left'
        });

        var buttonStatusOff = Ext.create('Ext.Button', {
            width: 30,
            text: 'OFF',
            margin: 5,
            cls: ' event-status-off'
            //iconAlign: 'left'
        });
        var buttonStatusOnf = Ext.create('Ext.Button', {
            width: 30,
            text: 'ONF',
            margin: 5,
            cls: ' event-status-onf'
            //iconAlign: 'left'
        });


        var bbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [{ xtype: 'tbfill' }, buttonStatusOpt, buttonStatusOp2, buttonStatusTen, buttonStatusDef,
                buttonStatusCancel,
            buttonStatusOff, buttonStatusOnf, { xtype: 'tbfill'}]
        });

        var panel = Ext.create('Ext.grid.Panel', {
            border: false,
            noResize: true,
            frame: false,
            disableSelection: true,
            //width: '92%',
            //layout: 'fit',
            height: '95%',
            store: 'bookingwizard.RightSide.WizardNavigationListStore',
            itemid: 'gridBookingNavigation',
            viewConfig: {
                getRowClass: function (record, rowIndex, rowParams, store) {
                    return " no-border ";
                }
            },
            columns: [{
                text: 'Date',
                width: 70,
                dataIndex: 'BookingDate',
                renderer: this.columnRenderer
            }, {
                text: 'Name',
                dataIndex: 'BookingName',
                width: '28%',
                renderer: this.columnRenderer
            }, {
                text: '2',
                width: 20,
                dataIndex: 'Step2',
                renderer: this.statusRenderer
            }, {
                text: '3',
                width: 20,
                dataIndex: 'Step3',
                renderer: this.statusRenderer
            }, {
                text: '4',
                width: 20,
                dataIndex: 'Step4',
                renderer: this.statusRenderer
            }, {
                text: '5',
                width: 20,
                dataIndex: 'Step5',
                renderer: this.statusRenderer
            }, {
                width: 20,
                renderer: this.iconRenderer
            }, {
                width: 20,
                renderer: this.iconRenderer

            }, {
                width: 20,
                renderer: this.cancelBookingRenderer
            }, {
                width: 20,
                action: 'editBookingFromNav',
                renderer: this.iconRenderer
            },
            {
                width: 20,
                action: 'openwindowcancelationevent',
                renderer: this.iconRenderer
            }

            , {
                dataIndex: 'Status',
                hidden: true
            }],
            tbar: [buttonAddBooking, buttonCancelReservation, buttonChangeStatus],
            bbar: bbar
        });


        me.items = [panel];
        me.callParent();
    },
    columnRenderer: function (value, metadata, record, rowIndex, colIndex, store) {

        var status = record.get('StatusId');

        switch (status) {
            case 1: //OFF
                metadata.css = " event-status-off ";
                break;
            case 3: //OPT
                metadata.css = " event-status-opt ";
                break;
            case 4: //OP2
                metadata.css = " event-status-op2 ";
                break;
            case 5: //TEN
                metadata.css = " event-status-ten ";
                break;
            case 6: //DEF
                metadata.css = " event-status-def ";
                break;
            case 7: //CAN
                metadata.css = " event-status-cancel ";
                break;
            case 9: //UNC
                metadata.css = " event-status-unc ";
                break;
            default:
                break;
        }
        if (colIndex == 0) {
            //            var date = new Date(value);
            //            return Ext.Date.format(date, 'Y-m-d');

            var d = Ext.Date.parse(value, 'c');
            return Ext.util.Format.date(d, usr_dateformat);
        }
        return value;
    },
    statusRenderer: function (value, metadata, record, rowIndex, colIndex, store) {
        // set the icon for the cells metadata tags        
        if (value == true && ((record.data.StatusId != 7 && record.data.StatusId != 8 && record.data.StatusId != 9) || colIndex == 5)) {
            metadata.style = " cursor:pointer ";
            metadata.css = metadata.css + ' icon-checked';
        }
        else if (value == true && (record.data.StatusId == 7 || record.data.StatusId == 8 || record.data.StatusId == 9)  && colIndex != 5) {
            metadata.css = metadata.css + ' icon-checked-disable';
        }
        else if (value == false && ((record.data.StatusId != 7 && record.data.StatusId != 8 && record.data.StatusId != 9) || colIndex == 5)) {
            metadata.style = " cursor:pointer ";
            metadata.css = metadata.css + ' icon-rightArrow';
        }
        else if (value == false && (record.data.StatusId == 7 || record.data.StatusId == 8 || record.data.StatusId == 9) && colIndex != 5) {
            metadata.css = metadata.css + ' icon-rightArrow-disable';
        }

        // add an individual qtip/tooltip over the icon with the real value
        metadata.attr = 'ext:qtip="' + (value) + '"';
        var tooltipText = 'Go to'.l('RS')
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        return '&nbsp;';
    },
    iconRenderer: function (value, metadata, record, rowIndex, colIndex, store) {            
        switch (colIndex) {
            case 6: //Booking history
                metadata.css = " icon-document ";
                metadata.style = " cursor:pointer ";
                var tooltipText = 'Booking history'.l('RS');
                metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
                break;
            case 7: //Copy booking
                if (record.data.Step5 == true //&& (record.data.OriginalStatusId != 7 && record.data.OriginalStatusId != 8 && record.data.OriginalStatusId != 9)
                        ) {
                    metadata.css = " icon-copy ";
                    metadata.style = " cursor:pointer ";
                    var tooltipText = 'Copy booking'.l('RS');
                    metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
                }
                else {
                    metadata.css = " icon-copy-disable ";
                }

                break;
            case 9: //Edit
                if (record.data.OriginalStatusId != 7 && record.data.OriginalStatusId != 8 && record.data.OriginalStatusId != 9) {
                    metadata.css = " icon-edit ";
                    metadata.style = " cursor:pointer ";
                    var tooltipText = 'Edit booking'.l('RS');
                    metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
                }
                else {
                    metadata.css = " icon-edit-disable ";
                }
                break;
            case 10: //Edit
                if (record.data.OriginalStatusId == 7 || record.data.StatusId == 7) {
                    metadata.css = " icon-cancelationevent ";
                    metadata.style = " cursor:pointer ";
                    var tooltipText = 'cancel booking event';
                    metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
                }
                else {
                    metadata.css = " icon-cancelationevent-disable ";
                }
                break;
            default:
                break;
        }
        return "";
    },
    cancelBookingRenderer: function (value, metadata, record, rowIndex, colIndex, store) {
        if (record.data.BookingId > 0 && (record.data.OriginalStatusId == 3 || record.data.OriginalStatusId == 4
                        || record.data.OriginalStatusId == 5 || record.data.OriginalStatusId == 6)) {
            metadata.css = " icon-stop ";
            metadata.style = " cursor:pointer ";
            var tooltipText = 'Cancel booking'.l('RS');
            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        }
        else {
            metadata.css = " icon-stop-disable ";
        }

    },
    dateRenderer: function (value, metadata, record, rowIndex, colIndex, store) {
        var d = Ext.Date.parse(value, 'c');
        return Ext.util.Format.date(d, usr_dateformat);
    }
});