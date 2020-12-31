Ext.define('Regardz.view.operations.Planboard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.planboard',
    border: false,
    autoShow: true,
    modal: true,
    frame: false,
    itemid: 'planboard',
    LinePlugin: null,
    initComponent: function () {
        var me = this;

        me.layout = 'fit';

        if (Ext.getCmp('sch-grid-planboard')) {
            Ext.getCmp('sch-grid-planboard').destroy();
        }

        var schGridHeight = parseInt(Ext.getCmp('main-regionOperations').getHeight() * 0.60);
        var schGridWidth = parseInt(Ext.getCmp('main-regionOperations').getWidth() * 0.83);

        /*Event type color*/
        var buttonStatusOpt = Ext.create('Ext.Button', {
            width: 30,
            text: 'OPT',
            margin: 5,
            cls: ' event-status-opt'
            //iconAlign: 'left'
        });
        var buttonStatusOp2 = Ext.create('Ext.Button', {
            width: 30,
            margin: 5,
            text: 'OP2',
            cls: ' event-status-op2'
            //iconAlign: 'left'
        });
        var buttonStatusTen = Ext.create('Ext.Button', {
            width: 30,
            text: 'TEN',
            margin: 5,
            cls: ' event-status-ten'
            //iconAlign: 'left'
        });
        var buttonStatusDef = Ext.create('Ext.Button', {
            width: 30,
            text: 'DEF',
            margin: 5,
            cls: ' event-status-def'
            //iconAlign: 'left'
        });

        var buttonStatusCan = Ext.create('Ext.Button', {
            width: 30,
            text: 'CAN',
            margin: 5,
            cls: ' event-status-cancel'
            //iconAlign: 'left'
        });

        var buttonStatusAllocationROP = Ext.create('Ext.Button', {
            width: 30,
            text: 'ROP',
            margin: 5,
            cls: ' event-status-allocation-rop'
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
        var buttonStatusBlock = Ext.create('Ext.Button', {
            width: 35,
            text: 'Block',
            margin: 5,
            cls: ' event-status-block'
            //iconAlign: 'left'
        });
        var buttonStatusLink = Ext.create('Ext.Button', {
            width: 30,
            text: 'Link',
            margin: 5,
            cls: ' event-status-link'
            //iconAlign: 'left'
        });
        /*End event type color*/


        /* Simple stores */
        me.viewDateTypeStore = new Ext.data.SimpleStore({
            fields: ['Name', 'value'],
            data: [['Day', 'd'], ['Week', 'w'], ['Month', 'm']]
        });

        me.startTimeStore = new Ext.data.SimpleStore({
            fields: ['Name', 'value'],
            data: [['00:00', 0], ['01:00', 1], ['02:00', 2], ['03:00', 3], ['04:00', 4], ['05:00', 5], ['06:00', 6], ['07:00', 7],
                     ['08:00', 8], ['09:00', 9], ['10:00', 10], ['11:00', 11], ['12:00', 12], ['13:00', 13], ['14:00', 14]
            , ['15:00', 15], ['16:00', 16], ['17:00', 17], ['18:00', 18], ['19:00', 19], ['20:00', 20], ['21:00', 21], ['22:00', 22], ['23:00', 23]
            ]
        });
        me.orderbyfield = new Ext.data.SimpleStore({
            fields: ['Name', 'value'],
            data: [['Name', 'name']]
        });

        me.viewTypeField = new Ext.data.SimpleStore({
            fields: ['Name', 'value'],
            data: [['Day', 'd'], ['Week', 'w'], ['Month', 'm']]
        });

        //To map this in API to an ENUM!!!!!!!!!!!!!!!!!!!!!!!!!!!
        me.sortyByField = new Ext.data.SimpleStore({
            fields: ['Name', 'value'],
            data: [['Default'.l('SC73000'), 0], ['Room Name'.l('SC73000'), 'R'], ['Minimum Capacity'.l('SC73000'), 'N'], ['Maximum Capacity'.l('SC73000'), 'X']]  //removed as not added in planboard, ['Divisable', 3]]
        });

        //To map this in API to an ENUM!!!!!!!!!!!!!!!!!!!!!!!!!!!
        me.descriptionField = new Ext.data.SimpleStore({
            fields: ['Name', 'value'],
            data: [['Company Name'.l('SC73000'), 'C'], ['Booking Name'.l('SC73000'), 'B'], ['Information Board'.l('SC73000'), 'I']]
        });

        var propertyList = Ext.create('Ext.grid.Panel', {
            store: Ext.getStore('common.PropertyForIdAndDistanceStore'),
            width: '90%',
            itemid: "PlanboardPropertyList",
            noResize: true,
            height: parseInt(parseInt(schGridHeight * 0.63) * 0.45),
            viewConfig: {
                forceFit: true
            },
            layout: 'fit',
            columns: [{
                baseCls: '',
                header: 'Properties',
                dataIndex: 'PropertyName',
                flex: 1,
                renderer: this.rowClassChangeRender
            }, {
                header: '',
                name: 'deleteProperty',
                tdCls: 'icon-delete-item',
                width: 20,
                renderer: this.rowClassChangeRenderDelete
            }, {
                hidden: true,
                dataIndex: 'PropertyId',
                sort: false
            }]
        });

        /*Search panel start*/
        me.searchPanel =
            {
                xtype: 'form',
                height: parseInt(schGridHeight * 0.50),
                title: "Planboard_Title".l('SC73000'),
                itemid: 'planboardPanel',
                id: 'north-panel-planboard',
                cls: 'propertyEdit',
                width: '100%',
                frame: true,
                collapsible: true,
                autoScroll: true,
                //                defaults: {
                //                    flex: 0.15
                //                },
                items: [{
                    layout: 'hbox',
                    items: [{ // Column 1 - Date picker
                        frame: true,
                        anchor: '100%',
                        items: [{
                            xtype: 'hidden',
                            name: 'eventDate',
                            value: new Date()
                        }, {
                            xtype: 'datepicker',
                            itemid: "datepickerfield",
                            name: 'date',
                            flex: 1,
                            cls: 'ext-cal-nav-picker',
                            showToday: false,
                            handler: function (picker, date) {
                                var start = this.up("form").getForm().findField('eventDate').setValue(date);
                                var end = Sch.util.Date.add(date, Sch.util.Date.DAY, 1);
                                //me.changeViewTime(date);
                                // sched.setTimeSpan(date, end);
                            }
                        }]
                        // End Column 1
                    }, { // Column 2
                        layout: 'vbox',
                        xtype: 'panel',
                        width: '17%',
                        items: [{ //Column 2 top items
                            layout: 'hbox',
                            width: '90%',
                            margin: '0 0 5 0',
                            items: [{
                                xtype: 'combo',
                                name: 'viewtype',
                                itemid: 'comboShowType',
                                fieldLabel: 'Show'.l('SC73000'),
                                displayField: 'Name',
                                valueField: 'value',
                                labelWidth: 40,
                                width: '55%',
                                margin: '0 5 0 0',
                                value: 'd',
                                store: me.viewDateTypeStore
                            }, {
                                xtype: 'combo',
                                layout: 'form',
                                name: 'starttime',
                                itemid: 'planboardstarttime',
                                displayField: 'Name',
                                valueField: 'value',
                                emptyText: "Start Time".l('SC73000'),
                                width: '35%',
                                value: 8,
                                store: me.startTimeStore
                            }]
                        }, { //Column 2 property panel
                            width: '90%',
                            items: [
                            propertyList, {
                                xtype: 'combo',
                                width: '90%',
                                name: 'PropertyId',
                                itemid: 'planboardPropertyCombo',
                                displayField: 'PropertyName',
                                valueField: 'PropertyId',
                                layout: 'form',
                                action: 'select_property',
                                store: 'common.PropertyForNamesStore',
                                emptyText: "Enter Location".l('SC73000')
                            }]
                        }]
                        //End Column 2
                    }, { //Column 3 - Row 1 Meeting type				            
                        xtype: 'panel',
                        width: '15%',
                        defaults: {
                            width: '95%'
                        },
                        items: [
                         {
                             // Column 3 Row2
                             xtype: 'textfield',
                             name: 'CAPACITY',
                             itemId: 'itemTextNumberOfPeople',
                             selectOnFocus: true,
                             allowBlank: false,
                             vtype: 'numeric',
                             emptyText: 'No of People'.l('SC73000') + '*',
                             enableKeyEvents: true//,
                             //width: 75
                         },

                        { //Column 3- Row 1  Room Setup
                            xtype: 'combo',
                            name: 'ROOM_SETUP',
                            displayField: 'Arrangement',
                            itemid: 'itemRoomSetupCombo',
                            allowBlank: false,
                            valueField: 'RoomSetupId',
                            store: Ext.getStore('operations.RoomSetupStore'),
                            emptyText: 'Setup'.l('SC73000') + '*'
                            //width: 75,
                            //value: -1
                        }, {
                            //Column 3 Row3
                            xtype: 'combo',
                            name: 'CATEGORY_TYPE',
                            displayField: 'RoomTypeName',
                            itemid: 'itemRoomTypeCombo',
                            allowBlank: false,
                            valueField: 'RoomTypeId',
                            store: Ext.getStore('operations.RoomTypeStore'),
                            emptyText: 'RoomType'.l('SC73000')//,
                            // width: 75,
                            // value: -1
                        }, {
                            //Column 3 Row 4
                            xtype: 'textfield',
                            name: 'MIN_AREA',
                            emptyText: "Min area".l('SC73000')//,
                            //width: 75
                        }, {
                            //Column 3 Row 5
                            xtype: 'combo',
                            name: 'FloorId',
                            displayField: 'FloorName',
                            valueField: 'FloorId',
                            emptyText: "All Floors".l('SC73000'),
                            //padding: 0,
                            //width: 75,
                            itemid: 'flooridCombo',
                            //value: 0,
                            store: 'operations.PlanboardFloorsStore'
                        }]
                    }, { //Column 4 - Row 1 Checkbox
                        layout: 'vbox',
                        xtype: 'panel',
                        width: '8%',
                        defaults: {
                            width: '95%'
                        },
                        // height: '75%',
                        items: [new Ext.form.CheckboxGroup(
                        {
                            name: 'roomTypeCheckbox',
                            //padding: 5,
                            border: false,
                            columns: 1,
                            items: [{
                                name: 'IndividualCheckboxId',
                                inputValue: 'I',
                                checked: true,
                                boxLabel: 'Individual'.l('SC52000'),
                                boxLabelCls: 'individual_room',
                                itemid: 'itemIndividualCheck'
                            }, {
                                name: 'CombinedCheckboxId',
                                inputValue: 'C',
                                checked: true,
                                boxLabel: 'Combined'.l('SC52000'),
                                itemid: 'itemCombinedCheck',
                                boxLabelCls: 'combined_room'
                            }, {
                                name: 'SharableCheckboxId',
                                inputValue: 'S',
                                checked: true,
                                boxLabel: 'Sharable'.l('SC52000'),
                                itemid: 'itemSharableCheck',
                                boxLabelCls: 'sharable_room'
                            }]
                        }), {
                            xtype: 'fieldcontainer',
                            defaultType: 'radiofield',
                            allowBlank: false,
                            itemid: "itemRadioGroupPositions",
                            // defaults: { flex: 1 },
                            layout: 'vbox',
                            items: [{
                                boxLabel: 'Available'.l('SC73000'),
                                name: 'Positions',
                                inputValue: 1
                            }, {
                                boxLabel: 'All'.l('SC73000'),
                                name: 'Positions',
                                checked: true,
                                inputValue: 2
                            }]
                        }]
                    }, { //Column 5
                        width: '23%',
                        defaults: {
                            width: '95%',
                            labelWidth: '25%'
                        },
                        frame: true,
                        items: [{
                            xtype: 'combo',
                            name: 'SORT_BY',
                            itemid: 'itemSortByCombo',
                            fieldLabel: 'Sort By'.l('SC73000'),
                            displayField: 'Name',
                            //    labelWidth: 100,
                            valueField: 'value',
                            //emptyText: "Default".l('SC73000'),
                            value: 0,
                            //anchor: '100%',
                            store: me.sortyByField
                        }, {
                            xtype: 'combo',
                            name: 'description',
                            itemid: 'itemDescriptionCombo',
                            fieldLabel: 'Description'.l('SC73000'),
                            displayField: 'Name',
                            //   labelWidth: 100,
                            valueField: 'value',
                            value: 'B',
                            // anchor: '100%',
                            store: me.descriptionField
                        }, {
                            defaultType: 'radiofield',
                            xtype: 'fieldcontainer',
                            //     labelWidth: 100,
                            layout: 'vbox',
                            itemid: 'itemFieldsBar',
                            fieldLabel: 'Bar'.l('SC73000'),
                            items: [{
                                boxLabel: 'Show'.l('SC73000'),
                                name: 'bar',
                                itemid: 'BarShow',
                                inputValue: '1',
                                padding: '0 10 0 0'
                            }, {
                                boxLabel: "Don't Show".l('SC73000'),
                                name: 'bar',
                                itemid: 'BarHide',
                                inputValue: '2',
                                checked: true
                            }]
                        }/*, {
                            defaultType: 'radiofield',
                            xtype: 'fieldcontainer',
                            //   labelWidth: 100,
                            layout: 'vbox',
                            itemid: 'itemFieldsStatus',
                            fieldLabel: 'Status'.l('SC73000'),
                            items: [{
                                boxLabel: 'Booking'.l('SC73000'),
                                name: 'status',
                                inputValue: '1',
                                padding: '0 10 0 0',
                                checked: true
                            }, {
                                boxLabel: "Quotation".l('SC73000'),
                                name: 'status',
                                inputValue: '2'
                            }]
                        }*/]
                    }, {
                        layout: 'vbox',
                        items: [{
                            // iconCls: 'icon-print',
                            xtype: 'button',
                            //    scale: 'large',
                            text: 'Search'.l('SC73000'),
                            action: 'search_event',
                            //   width: 50,
                            width: 70
                        }, {
                            xtype: 'displayfield',
                            width: 10
                        }, {
                            // iconCls: 'icon-print',
                            xtype: 'button',
                            // scale: 'large',
                            text: 'Print'.l('SC73000'),
                            width: 70,
                            handler: function () {
                                // var s = Ext.ComponentQuery.query('[itemid=itemScheduler]')[0];
                                var s = Ext.getCmp('sch-grid-planboard');
                                s.print();
                            }
                        }]
                    }]
                }],
                listeners: {
                    resize: function (el, adjWidth, adjHeight, eOpts) {

                        var itemBigPanelStep2 = Ext.ComponentQuery.query('[itemid="plabboard_form_all"]')[0].getHeight();
                        var planboardPanel = Ext.ComponentQuery.query('[itemid="planboardPanel"]')[0].getHeight();
                        var propertyEditItemsForm = Ext.ComponentQuery.query('[itemid="propertyEditItemsForm"]')[0].getHeight();
                        var h = itemBigPanelStep2 - planboardPanel - propertyEditItemsForm;
                        var sch = Ext.getCmp('sch-grid-planboard');
                        sch.setHeight(h - 30);
                    }
                }
            }
        /*End Search Panel*/

        /* End simple stores */
        Sch.preset.Manager.registerPreset("hourAndDay", {
            timeColumnWidth: 60,
            rowHeight: 20,
            resourceColumnWidth: 100,
            displayDateFormat: "G:i",
            shiftIncrement: 1,
            shiftUnit: "DAY",
            //shiftUnit: "HOUR",
            defaultSpan: 24,
            timeResolution: {
                unit: "MINUTE",
                increment: 5
            },
            headerConfig: {
                middle: {
                    unit: "HOUR",
                    dateFormat: "G:i"
                },
                top: {
                    unit: "DAY",
                    dateFormat: "D d/m"
                }
            }
        });

        //        var start = new Date();
        //        start = Sch.util.Date.add(start, Sch.util.Date.DAY, 0);
        //        Ext.Date.clearTime(start);
        //        var end = Sch.util.Date.add(start, Sch.util.Date.DAY, 1);
        //        end.setHours(06, 00);

        var start = new Date();
        var end = new Date();

        end.setDate(start.getDate() + 1);

        start.setHours(2, 30);
        end.setHours(22, 00);

        me.propertyEditItemsForm = {
            xtype: 'form',
            cls: 'propertyEdit',
            itemid: 'propertyEditItemsForm',
            // id: 'propertyEditItemsForm',
            anchor: '100%',
            frame: true,
            layout: 'hbox',
            collapsible: true,
            items: [

            {
                layout: 'hbox',
                xtype: 'label',
                text: 'Zoom in'.l('SC73000'),
                padding: '0 10 0 0'
            }, {
                layout: 'hbox',
                xtype: 'slider',
                itemid: 'planboardZoomSlider',
                width: 120,
                value: Sch.preset.Manager.getPreset('hourAndDay').timeColumnWidth,
                minValue: 40,
                maxValue: 200,
                increment: 10,
                listeners: {
                    change: function (s, v) {
                        sched.setTimeColumnWidth(v);
                    },
                    afterrender: function (s, v) {
                        sched.setTimeColumnWidth(v);
                    }
                }
            },
            {
                layout: 'hbox',
                xtype: 'label',
                text: 'Zoom out'.l('SC73000'),
                padding: '0 0 0 10'
            },

            {
                xtype: 'tbspacer',
                padding: '0 0 0 30'
            },

            {
                layout: 'hbox',
                xtype: 'checkbox',
                checked: true,
                itemid: 'multislidecheckbox'
            },

            {
                //Second slider
                layout: 'hbox',
                xtype: 'label',
                itemid: 'itemHourStart',
                text: '08:00',
                padding: '0 10 0 10'
            }, {
                layout: 'hbox',
                xtype: 'multislider',
                useTips: false,
                itemid: 'itemHoursSlider',
                width: 500,
                constrainThumbs: true, //default is set to true but added anyway to learn it
                // values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                values: [96, 180],
                minValue: 0,
                maxValue: 287,
                increment: 1,
                disabled: false
                //listeners: {
                //    change: function (s, v) {

                //    },
                //    afterrender: function () {

                //    }
                //}
            }, {
                layout: 'hbox',
                xtype: 'label',
                itemid: 'itemHourEnd',
                text: '15:00',
                padding: '0 0 0 10'
            }, { xtype: 'tbfill' }, buttonStatusOpt, buttonStatusOp2, buttonStatusTen, buttonStatusDef, buttonStatusOnf, buttonStatusAllocationROP,
            //buttonStatusCan, buttonStatusOff,  
                          buttonStatusBlock, buttonStatusLink,
            {
                xtype: 'hidden',
                name: 'StartDate',
                allowBlank: false
            },
            {
                xtype: 'hidden',
                name: 'EndDate',
                allowBlank: false
            },
            {
                xtype: 'hidden',
                name: 'bookingTrackingId',
                value: 0,
                allowBlank: true
            },
            {
                xtype: 'hidden',
                name: 'propertyId',
                value: 0,
                allowBlank: true
            },
            {
                xtype: 'hidden',
                name: 'selectedRoomId',
                value: 0,
                allowBlank: true
            },
            {
                xtype: 'hidden',
                name: 'setupTimeField',
                value: 0,
                allowBlank: true
            },
            {
                xtype: 'hidden',
                name: 'bookingEventTrackingId',
                value: 0,
                allowBlank: true
            },
            {
                xtype: 'hidden',
                name: 'RoomTypeId',
                value: 0,
                allowBlank: true
            },
            {
                xtype: 'hidden',
                name: 'BookingObject'
            },
              {
                  xtype: 'hidden',
                  name: 'IsQueueBased'
              }
            ],
            listeners: {
                resize: function (el, adjWidth, adjHeight, eOpts) {

                    var itemBigPanelStep2 = Ext.ComponentQuery.query('[itemid="plabboard_form_all"]')[0].getHeight();
                    var planboardPanel = Ext.ComponentQuery.query('[itemid="planboardPanel"]')[0].getHeight();
                    var propertyEditItemsForm = Ext.ComponentQuery.query('[itemid="propertyEditItemsForm"]')[0].getHeight();
                    var h = itemBigPanelStep2 - planboardPanel - propertyEditItemsForm;
                    var sch = Ext.getCmp('sch-grid-planboard');
                    sch.setHeight(h - 30);
                }
            }
        };

        Ext.define('Line', {
            extend: 'Ext.data.Model',
            fields: ['Date', 'Text', 'Cls']
        });

        var lineStore = Ext.create('Ext.data.Store', {
            model: 'Line',
            data: [{
                Date: new Date(2100, 5, 28, 12),
                Text: 'Start time',
                Cls: ' orange-line'
            }]
        });


        var resourceStore = Ext.create('Regardz.store.bookingwizard.PlanboardRoomlistBWStore');
        var availabilityStore = Ext.create('Regardz.store.bookingwizard.PlanboardBookinglistBWStore');

        var lineStore = Ext.create('Ext.data.Store', {
            model: 'Line',

            data: [
                {
                    Date: new Date(2100, 5, 28, 12),
                    Text: 'Start time',
                    Cls: ' orange-line'
                }
            ]
        });
        resourceStore.availabilityStore = availabilityStore;

        var sched = Ext.create('Sch.panel.SchedulerGrid', {
            //height: schGridHeight,
            //width: schGridWidth,
            id: 'sch-grid-planboard',
            itemid: 'itemScheduler',
            eventBarTextField: 'Title',
            eventBarIconClsField: 'new',
            viewPreset: 'hourAndDay',
            startDate: start,
            endDate: end,
            rowHeight: 20,
            dynamicRowHeight: false,
            viewConfig: { dynamicRowHeight: false },
            plugins: [

            Ext.create("Sch.plugin.Lines", {
                innerTpl: '<span class="line-text">{Text}</span>',
                store: lineStore
            })
            ,Ext.create('Sch.plugin.Printable', {
            //plugins: new Sch.plugin.Printable({
                printRenderer: function (ev, res, tplData, row) {
                    if (row % 2 === 0) {
                        tplData.cls += ' specialEventType';
                    } else {
                        tplData.cls += ' normalEvent';
                    }
                    tplData.style = Ext.String.format('border-right-width:{0}px;', tplData.width);

                    return Ext.Date.format(ev.getStartDate(), 'M d');
                },
                beforePrint: function (sched) {
                    var v = sched.getSchedulingView();
                    this.oldRenderer = v.eventRenderer;

                    v.eventRenderer = this.printRenderer;
                },
                afterPrint: function (sched) {
                    sched.getSchedulingView().eventRenderer = this.oldRenderer;
                }
            })],
            // to show events on the grid
            timeCellRenderer: function (item, resourceRec, meta) {
                // this.callParent(arguments);
                if (resourceRec.data.Id == null) {
                    item.style = "background-color: #008FFF;";
                }
            },

            // Setup static columns
            columns: [
                { header: 'Name', sortable: false, width: 200, dataIndex: 'FormattedRoomName', renderer: this.roomRenderer }
            ],
            
            features: [{
                id: 'group',
                ftype: 'grouping',
                showSummaryRow: true,
                groupHeaderTpl: '<span class="propertyNameLoadPropertyWindow" oncontextmenu="Utils.LoadPropertyWindow(this,{[values.rows[0].data.PropertyId]}); return false;"> {name}<span>',
                hideGroupedHeader: false,
                enableGroupingMenu: false

            }],
            viewConfig: {
                getRowClass: function (record, rowIndex, rowParams, store) {
                    return record.get('Cls');
                }
            },

            //         plugins: Ext.create("Sch.plugin.Lines", {
            //            innerTpl: '<span class="line-text">{Text}</span>',
            //            store: lineStore
            //        }),

            resourceStore: resourceStore,
            // Store holding all the events

            eventStore: Ext.create('Regardz.store.bookingwizard.PlanboardBookinglistBWStore'),
            resourceZones: Ext.create('Regardz.store.operations.AvailabilityStore'),

            //            eventStore: Ext.getStore('bookingwizard.PlanboardBookinglistBWStore'),
            //            resourceZones: Ext.getStore('operations.AvailabilityStore'),

            onEventCreated: function (newEventRecord) {
                // Overridden to provide some defaults before adding it to the store
                newEventRecord.set('Title', 'New Event...');
                // newEventRecord.setResizable('end');

                // me.setBufferTime(null);
                newEventRecord.IsQueueBased = Utils.IsQueueBased(newEventRecord, 'sch-grid-planboard');
                newEventRecord.IsCreated = true;
            },
            eventRenderer: function (item, resourceRec, tplData, row, col, ds) {
                var rs = this.resourceStore;
                var index = rs.find('Id', resourceRec.data.Id);
                //console.log(resourceRec.data);
                if (resourceRec.data.Id == -1) {

                    var StartDate = Ext.Date.parse(resourceRec.data.StartDate, 'c');

                    var startDate = StartDate;
                    startDate.setHours(8, 30);
                    resourceRec.data.StartDate = startDate;
                    var endDate = StartDate;
                    endDate.setDate(StartDate.getDate() + 1);
                    endDate.setHours(23, 30);
                    resourceRec.data.EndDate = endDate;
                }

                var css = '';
                if (resourceRec.data.Classification == "Floor") {
                    css += ' color: #FFFFFF; background-color:' + (resourceRec.get('Color') || 'Coral');
                }

                if (item.data.Cls != "turnTime") {
                    if (resourceRec.data.IsLoud == true && resourceRec.data.DoNotMove == true) {
                        css += " background: url('public/icons/lock_icon.png'), url('public/icons/loud.png');";
                        css += " background-position: left center, 20px center;";
                        css += " background-repeat: no-repeat, no-repeat;";
                        css += " text-indent:35px;;";
                    }
                    else if (resourceRec.data.IsLoud == true) {
                        css += " background: url('public/icons/loud.png');";
                        css += " background-position: left center, 20px center;";
                        css += " background-repeat: no-repeat, no-repeat;";
                        css += " text-indent:35px;;";
                    }
                    else if (resourceRec.data.DoNotMove == true) {
                        css += " background: url('public/icons/lock_icon.png');";
                        css += " background-position: left center, 20px center;";
                        css += " background-repeat: no-repeat, no-repeat;";
                        css += " text-indent:35px;;";
                    }
                }

                // item.raw.BookingStatusCode = Ext.util.Format.trim(item.raw.BookingStatusCode);
                if (item.raw.BookingStatusCode == 'OPT') {
                    css += "background-color:#00ff01;";
                }
                else if (item.raw.BookingStatusCode == 'OP2') {
                    css += "background-color:#0033cc; color: white;";
                }
                else if (item.raw.BookingStatusCode == 'TEN') {
                    css += "background-color:#FFFF00;"; //yellow
                }
                else if (item.raw.BookingStatusCode == 'DEF') {
                    css += "background-color:#ff0066;color: white;";
                }

                else if (item.raw.BookingStatusCode == 'ONF') {
                    css += "background-color:#01b0f1;";
                }

                else if (item.raw.BookingStatusCode == 'LINK') {
                    css += "background-color:#808080;color: white;";
                }

                if (item.raw.ISBlockRoom == true) {
                    css = "background-color:#FFFFFF;";
                    if (item.raw.IsROP == true) {
                        css = "background-color:#7030a0; color: white;";
                    }
                }
                if (item.raw.IsLinkedEvent == true || item.raw.IsCore == true) {
                    css = "background-color:#808080;color: white;";
                }
                css += 'height:10';

                tplData.style = css;

                /*if room is linked room then even blok room or event it should be different colored*/
                //  if (sched.viewPreset == 'hourAndDay') {

                try {

                    /*if room is linked room then even blok room or event it should be different colored*/
                    if (item.raw.IsCore == true || item.raw.NonEditable == true) {                    
                        item.setResizable(false);
                        item.setDraggable(false);
                    }
                    else if (item.raw.ISBlockRoom == true || resourceRec.data.DoNotMove == true || item.raw.IsLinkedEvent == true) {
                   
                        if (sched.viewPreset == 'hourAndDay') {
                            item.setResizable(false);
                        }
                        item.setDraggable(false);
                   
                    }
                    else if (item.data.Cls == "turnTime") {                    
                        item.setResizable('start');
                    }
                    else {                    
                          item.setResizable(true);                  
                    }
               }
               catch (e) {
               }

                if (item.data.Cls == "turnTime") {
                    return '';
                }

                var bookingtitle = '';
                if (!Utils.isEmpty(item.raw.RoomArrangement)) {
                    bookingtitle = bookingtitle + ' -' + item.raw.RoomArrangement;
                }

                if (item.raw.NoOfPeople > 0) {
                    bookingtitle = bookingtitle + ' -' + item.raw.NoOfPeople;
                }

                if (!Utils.isEmpty(item.raw.ResponsibleUser)) {
                    bookingtitle = bookingtitle + ' -' + item.raw.ResponsibleUser;
                }

                if (item.raw.ISBlockRoom == true) {
                    bookingtitle = '';
                }

                if (!Utils.isEmpty(item.raw.BookingName)) {
                    return item.raw.BookingName + bookingtitle;
                }
                else if (Utils.isValid(item.raw.Description)) {
                    return item.raw.Description + bookingtitle;
                }

                else {
                    return "Event".l('SC73000');
                }
            }
        });

        me.items = {
            xtype: 'form',
            resizable: false,
            itemid: 'plabboard_form_all',
            anchor: '100%',
            autoScroll: true,
            items: [
            me.searchPanel,
            me.propertyEditItemsForm, {
                xtype: 'panel',
                listeners: {
                    resize: function (el, adjWidth, adjHeight, eOpts) {

                        var itemBigPanelStep2 = Ext.ComponentQuery.query('[itemid="plabboard_form_all"]')[0].getHeight();
                        var planboardPanel = Ext.ComponentQuery.query('[itemid="planboardPanel"]')[0].getHeight();
                        var propertyEditItemsForm = Ext.ComponentQuery.query('[itemid="propertyEditItemsForm"]')[0].getHeight();
                        var h = itemBigPanelStep2 - planboardPanel - propertyEditItemsForm;
                        var sch = Ext.getCmp('sch-grid-planboard');
                        sch.setHeight(h - 30);
                    }
                },
                //anchor: '100%',
                items: sched
            }]
        },
		me.callParent();
    },
    changeViewTime: function (startDate) {
        var d = new Date(startDate);
        d = new Date(d.getTime() + (60000 * 7 * 60));
        var n = Ext.getCmp('north-panel-planboard').getForm().findField('viewtype').getValue();

        if (n == 'd') {
            var start = Sch.util.Date.add(d, Sch.util.Date.DAY, 0);
            Ext.Date.clearTime(start);
            var end = Sch.util.Date.add(start, Sch.util.Date.DAY, 1);
            Ext.getCmp('sch-grid-planboard').setTimeSpan(start, end);
            Ext.getCmp('sch-grid-planboard').switchViewPreset('hourAndDay');
        } else if (n == 'w') {
            var start = Sch.util.Date.add(d, Sch.util.Date.DAY, 0);
            Ext.Date.clearTime(start);
            var end = Sch.util.Date.add(start, Sch.util.Date.DAY, 7);

            Ext.getCmp('sch-grid-planboard').setTimeSpan(start, end);
            Ext.getCmp('sch-grid-planboard').switchViewPreset('dayAndWeek');
        } else {
            var start = Sch.util.Date.add(d, Sch.util.Date.DAY, 0);
            Ext.Date.clearTime(start);
            var end = Sch.util.Date.add(start, Sch.util.Date.DAY, 30);

            Ext.getCmp('sch-grid-planboard').setTimeSpan(start, end);
            Ext.getCmp('sch-grid-planboard').switchViewPreset('weekAndMonth');
        }
    },
    rowClassChangeRender: function (val, metadata, record) {
        if (record.raw.Fax == undefined) {
            //  metadata.style = 'background-color: rgba(254,0,0,0.2) !important;cursor: pointer;'
        }
        if (record.get('PropertyId') != 65) { }
        return val;
    },

    rowClassChangeRenderDelete: function (val, metadata, record, rowIndex, colIndex, store) {
        // metadata.style = 'background-color: rgba(254,0,0,0.2) !important;cursor: pointer;'
        if (store.data.length == 1) {
            metadata.tdCls = ' icon-delete-item-disable ';
        }
        else {
            metadata.tdCls = ' icon-delete-item ';
        }
        return val;
    },

    roomRenderer: function (value, metadata, record, rowIndex, colIndex, store) {
        if (record.data.Id == null) {
            metadata.style = "color:red; background-color: #008FFF;";
            value = record.data.PropertyName;
        }

        //I -> #0000FF, C -> #CC3300 -> S -> #669900 ,IsSharable, IsVirtual  sharable, combined, individual
        else if (record.data.IsSharable == true) { //sharable room is on high priority
            metadata.style = "color:#669900";
        }
        else if (record.data.IsSharable == false && record.data.IsVirtual == true) { // individual and combined room then use combined room color
            metadata.style = "color:#CC3300";
        }
        else if (record.data.IsSharable == false) { //individual room, not sharable or combined
            metadata.style = "color:#0000FF";
        }
        return value;
    },

    setBufferTime: function (rec) {
        var sched = Ext.ComponentQuery.query('[itemid="itemScheduler"]')[0];
        var events = sched.eventStore;
        var TurnTimeBuffer = 30;
        var selectedEventIndex = 0;
        if (typeof rec.data.Id != 'undefined')
            selectedEventIndex = events.findExact('Id', rec.data.Id);

        var selectedEvent = events.getAt(selectedEventIndex);

        //Get event start date
        var initialStart = rec.data.DateStart;
        //Get event end date
        var initialEnd = rec.data.DateEnd;
        //Constant
        var MS_PER_MINUTE = 60000;

        //Calculate new date
        // var newDateStart = new Date(initialStart - rec.data.TurnTimeBuffer * MS_PER_MINUTE);
        var newDateStart = new Date(initialStart - TurnTimeBuffer * MS_PER_MINUTE);

        //Insert turttime event to index 0
        sched.eventStore.insert(0, { ResourceId: rec.data.ResourceId, DateStart: newDateStart, DateEnd: rec.data.DateStart, CssClass: "turnTime", EventId: rec.data.Id, isSetupTime: true, TurnTimeBuffer: TurnTimeBuffer });
        sched.eventStore.getAt(0).setResizable('start');
        sched.eventStore.getAt(0).setDraggable(false);
    }
});

PerformanceBarPanboardTemplate = function () {
    return new Ext.XTemplate(
        '<div>',
        '<tpl if="turnTime &gt; 0"><div class="turnTime" style="{turnTimeStyle}"></div></tpl>',
        '<span style="position:absolute;top:10%;">{customTitle}</span>',
        '</div>'
    );
};
