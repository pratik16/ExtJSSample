Ext.define('Regardz.view.bookingwizard.BookingWizardStep2', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.bookingwizardstep2',
    border: false,
    autoShow: true,
    modal: true,
    frame: false,
    stepOneObj: null,
    stepTwoObj: null,
    itemid: 'itembookingwizardstep2',
    LinePlugin: null,

    initComponent: function () {
        var me = this;

        me.layout = 'fit';

        if (Ext.getCmp('sch-grid'))
            Ext.getCmp('sch-grid').destroy();

        if (Ext.getCmp('configurationPanel'))
            Ext.getCmp('configurationPanel').destroy();

        if (Ext.getCmp('propertyEditItemsForm'))
            Ext.getCmp('propertyEditItemsForm').destroy();

        if (Ext.getCmp('group'))
            Ext.getCmp('group').destroy();

        var mainComponentHolder = Ext.getCmp('main-regionWizard');
        //var schGridHeight = '100%';
        var schGridHeight = parseInt(mainComponentHolder.getHeight() * 0.5);
        var schGridWidth = parseInt(mainComponentHolder.getWidth() * 0.83);

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
            data: [['Default'.l('SC52000'), 0], ['Room Name'.l('SC52000'), 'R'], ['Minimum Capacity'.l('SC52000'), 'N'], ['Maximum Capacity'.l('SC52000'), 'X']]  //removed as not added in planboard, ['Divisable', 3]]
        });

        //To map this in API to an ENUM!!!!!!!!!!!!!!!!!!!!!!!!!!!
        me.descriptionField = new Ext.data.SimpleStore({
            fields: ['Name', 'value'],
            data: [['Company Name'.l('SC52000'), 'C'], ['Booking Name'.l('SC52000'), 'B'], ['Information board'.l('SC52000'), 'I']]
        });

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

        var propertyList = Ext.create('Ext.grid.Panel', {
            store: Ext.getStore('common.PropertyForPropertyIdAndDistanceStore'),
            itemid: "PropertyList",
            //width: '90%',
            layout: 'fit',
            //'Properties'.l('SC52000'), 
            noResize: true,
            columns: [
                {
                    header: '',
                    name: 'deleteProperty',
                    tooltip: "Delete property".l('SC52000'),
                    width: 20,
                    renderer: this.rowClassChangeRenderDelete

                },
                    {
                        baseCls: '',
                        header: 'Properties'.l('SC52000'),
                        dataIndex: 'PropertyName',
                        flex: 0.7,
                        renderer: this.rowClassChangeRender
                    },

                     { hidden: true, dataIndex: 'PropertyId', hideable: false }

            ],
            width: 200,
            height: 100
        });



        //var companyList = Ext.create('Ext.grid.Panel', {
        //    id: 'button_2',
        //    scale: 'small',
        //    action: 'searchIndividualButtonAction',
        //    iconCls: 'search-icon',
        //    width: 20,
        //    iconAlign: 'left',
        //    initComponent: function () {

        //        var mePanel = this;
        //        mePanel.noResize = true;

        //        mePanel.columns = [
        //            { header: 'Properties'.l('SC51100'), dataIndex: 'PropertyName' },
        //            //{ header: 'Email address'.l('SC51100'), dataIndex: 'Email', flex: 1 },
        //            //{ header: 'Phone'.l('SC51100'), dataIndex: 'Phone', flex: 1 },
        //            { hidden: true, dataIndex: 'PropertyId', hideable: false }
        //        ];
        //    }

        //});

        var start = new Date(2013, 3, 30, 8, 0, 0, 0);


        //Ext.Date.clearTime(start);
        //var end = new Date(2013, 4, 23, 15, 0, 0, 0);


        //var eventStore = new Sch.data.EventStore({
        //    model: 'Regardz.model.bookingwizard.PlanboardBookinglist',
        //    proxy: {
        //        type: 'jsonp',
        //        autoLoad: false,
        //        url: webAPI_path + 'api/Planboard/GetBookingEachRoomStep2',
        //        method: 'POST',
        //        extraParams: {

        //        },
        //        reader: {
        //            type: 'json',
        //            root: 'data'
        //        },
        //    }
        //});
        //var resourceStore = new Sch.data.ResourceStore({
        //    model: 'Regardz.model.bookingwizard.PlanboardRoomlist',
        //    proxy: {
        //        type: 'jsonp',
        //        autoLoad: false,
        //        //url: webAPI_path + 'api/Planboard/GetBookingEachRoom',
        //        //url: PHPPATHTEMP + 'planboardbookinglist.php',
        //        url: webAPI_path + 'api/Planboard/GetBookingEachRoomStep2',
        //        method: 'POST',
        //        reader: {
        //            type: 'json',
        //            root: 'data'
        //        },
        //    }
        //});
        me.propertyEditItemsForm =
         {
             xtype: 'form',
             cls: 'propertyEdit',
             itemid: 'propertyEditItemsForm',
             id: 'propertyEditItemsForm',
             anchor: '100%',
             frame: true,
             layout: 'hbox',
             collapsible: true,
             items: [{
                 layout: 'hbox',
                 xtype: 'label',
                 text: 'Zoom out'.l('SC52000'),
                 padding: '0 10 0 0'
             },

            {
                layout: 'hbox',
                xtype: 'slider',
                width: 120,
                value: Sch.preset.Manager.getPreset('hourAndDay').timeColumnWidth,
                itemid: 'step2ZoomSlider',
                minValue: 40,
                maxValue: 200,
                increment: 10,
                listeners: {
                    change: function (s, v) {
                        sched.setTimeColumnWidth(v);
                    },
                    afterrender: function () {

                    }
                }
            }, {
                layout: 'hbox',
                xtype: 'label',
                text: 'Zoom in'.l('SC52000'),
                padding: '0 0 0 10'
            },
            {
                xtype: 'tbspacer',
                padding: '0 0 0 10'
            },
            {
                layout: 'hbox',
                xtype: 'checkbox',
                checked: true,
                itemid: 'multislidecheckbox'
            },
             //Second slider
            {
            layout: 'hbox',
            xtype: 'label',
            itemid: 'itemHourStart',
            text: '08:00',
            padding: '0 10 0 10'
        },
            {
                layout: 'hbox',
                xtype: 'multislider',
                itemid: 'itemHoursSlider',
                width: '40%',
                values: [105, 118],
                minValue: 0,
                maxValue: 287,
                increment: 1,
                disabled: false

            }, {
                layout: 'hbox',
                xtype: 'label',
                itemid: 'itemHourEnd',
                text: '15:00',
                padding: '0 0 0 10'
            },
            { xtype: 'tbfill' }, buttonStatusOpt, buttonStatusOp2, buttonStatusTen, buttonStatusDef, buttonStatusOnf, buttonStatusAllocationROP,
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
                name: 'bookingEventId',
                value: 0,
                allowBlank: true
            }
         ],
             listeners: {
                 resize: function (el, adjWidth, adjHeight, eOpts) {

                     var itemBigPanelStep2 = Ext.ComponentQuery.query('[itemid="itemBigPanelStep2"]')[0].getHeight();
                     var planboardPanel = Ext.ComponentQuery.query('[itemid="planboardPanel"]')[0].getHeight();
                     var propertyEditItemsForm = Ext.ComponentQuery.query('[itemid="propertyEditItemsForm"]')[0].getHeight();
                     var h = itemBigPanelStep2 - planboardPanel - propertyEditItemsForm;
                     var sch = Ext.getCmp('sch-grid');
                     sch.setHeight(h - 50);
                 }
             }
         };
        /******************************** Hardcoded stores *******************************************************/


        Ext.define('Line', {
            extend: 'Ext.data.Model',
            fields: [
                'Date',
                'Text',
                'Cls'
            ]
        });

        var lineStore = Ext.create('Ext.data.Store', {
            model: 'Line',
            data: [
                {
                    Date: new Date(2100, 5, 28, 12),
                    Text: 'Start time'.l('SC52000'),
                    Cls: ' orange-line'
                }
            ]
        });

        if (!Utils.isEmpty(Utils.StepTwoObj.StartDate) && !Utils.isEmpty(Utils.StepTwoObj.EndDate)) {
            var StartDate = Utils.StepTwoObj.StartDate;
            var EndDate = Utils.StepTwoObj.EndDate;
        }
        else if (!Utils.isEmpty(Utils.StepTwoObj.DateStart) && !Utils.isEmpty(Utils.StepTwoObj.DateEnd)) {
            var StartDate = Utils.StepTwoObj.DateStart;
            var EndDate = Utils.StepTwoObj.DateEnd;
        }
        else {
            var StartDate = new Date();
            var EndDate = new Date();
        }

        var startDate = new Date(StartDate);
        var endDate = new Date(StartDate);

        endDate.setDate(startDate.getDate() + 1);

        startDate.setHours(8, 30);
        endDate.setHours(22, 00);

        // var sched = Ext.create('Sch.panel.SchedulerTree', {


        var sched = Ext.create('Sch.panel.SchedulerGrid', {
            /*Get Store was commented as it was conflicted with operation planboard*/
            //            resourceStore: Ext.getStore('bookingwizard.PlanboardRoomlistBWStore'),
            //            eventStore: Ext.getStore('bookingwizard.PlanboardBookinglistBWStore'),
            //            resourceZones: Ext.getStore('operations.AvailabilityStore'),
            resourceStore: Ext.create('Regardz.store.bookingwizard.PlanboardRoomlistBWStore'),
            eventStore: Ext.create('Regardz.store.bookingwizard.PlanboardBookinglistBWStore'),
            resourceZones: Ext.create('Regardz.store.operations.AvailabilityStore'),
            autoScroll: true,
            itemid: 'itemScheduler',
            // resourceStore: resourceStore,
            useArrows: true,
            noResize: true,
            viewPreset: 'hourAndDay',
            startDate: startDate,
            endDate: endDate,
            multiSelect: true,
            id: 'sch-grid',
            rowHeight: 20,
            barMargin: 0,
            onEventCreated: function (newEventRecord) {

                var rs = this.resourceStore;
                var index = rs.find('Id', newEventRecord.getResourceId());

                var resourceRecord = rs.getAt(index);
                if (resourceRecord) {
                    resourceRecord.data.IsLoud = false;
                    resourceRecord.data.Description = '';
                    resourceRecord.data.EventName = '';
                    resourceRecord.data.BookingName = '';
                    rs.commitChanges();
                }
            },
            eventRenderer: function (item, resourceRec, tplData, row, col, ds) {

                //  log('resourceRec=', resourceRec);
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
                var css = ' ';
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
                    css += "background-color:#00FF00;";
                }
                else if (item.raw.BookingStatusCode == 'OP2') {
                    css += "background-color:#0000E0;color: white;";
                }
                else if (item.raw.BookingStatusCode == 'TEN') {
                    css += "background-color:#FFFC00;"; //yellow
                }
                else if (item.raw.BookingStatusCode == 'DEF') {
                    css += "background-color:#ff69b4;";
                }

                else if (item.raw.BookingStatusCode == 'ONF') {
                    css += "background-color:#9999ff;";
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
                if (item.raw.IsCore == true || item.raw.NonEditable == true) {
                    item.setResizable(false);
                    item.setDraggable(false);
                }
                else if (item.raw.ISBlockRoom == true || resourceRec.data.DoNotMove == true || item.raw.IsLinkedEvent == true) {
                    //  item.setResizable(false);
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
                //    bookingtitle = bookingtitle + 'BookingId=' + item.raw.BookingId;
                if (!Utils.isEmpty(item.raw.BookingName)) {
                    return item.raw.BookingName + bookingtitle;
                }
                else if (Utils.isValid(item.raw.Description)) {
                    return item.raw.Description + bookingtitle;
                }

                //                else if (typeof stepTwoObj != 'undefined' && typeof stepTwoObj.BookingName != 'undefined' && !Utils.isEmpty(stepTwoObj.BookingName)) {
                //                    return stepTwoObj.BookingName + bookingtitle;
                //                }
                //                else if (typeof stepOneObj != 'undefined' && typeof stepOneObj.BookingName != 'undefined' && !Utils.isEmpty(stepOneObj.BookingName)) {
                //                    return stepOneObj.BookingName + bookingtitle;
                //                }
                else {
                    return "Event".l('SC52000');
                }
                //return resourceRec.raw.CompanyName;
            },
            columnLines: false,
            rowLines: true,

            columns: [

                 { header: 'Name', sortable: false, width: 200, dataIndex: 'FormattedRoomName', renderer: this.roomRenderer }

            ],
            plugins:
                Ext.create("Sch.plugin.Lines", {
                    //innerTpl: '<span class="line-text">{Text}</span>',
                    width: 1,
                    clsField: 'orangeline',
                    showTip: false,
                    store: lineStore
                }),
            features: [{
                id: 'group',
                ftype: 'grouping',
                showSummaryRow: true,
                groupHeaderTpl: '<span class="propertyNameLoadPropertyWindow" oncontextmenu="Utils.LoadPropertyWindow(this,{[values.rows[0].data.PropertyId]}); return false;"> {name}<span>',
                hideGroupedHeader: false,
                enableGroupingMenu: false

            }],

            viewConfig: {
                loadMask: true,
                getRowClass: function (r) {
                    if (r.get('Id') === -1) {
                        return "special-event".l('SC52000');
                    }

                }
            }

        });

        me.items = {
            xtype: 'form',
            itemid: 'itemBigPanelStep2',
            //id: 'itemBigPanelStep2',            
            width: '100%',
            //collapsible: true,
            items: [
                {
                    xtype: 'form',
                    //height: parseInt(schGridHeight * 0.63),
                    //title: "Planboard_Title".l('SC52000'),
                    itemid: 'planboardPanel',
                    cls: 'propertyEdit',
                    width: '100%',
                    frame: true,
                    layout: 'hbox',

                    //  collapsible: true,
                    items: [
                        { // Column 1 - Date picker
                            frame: true,
                            itemid: 'datepickerfieldparent',
                            items: [
                                {
                                    xtype: 'datepicker',
                                    itemid: "datepickerfield",
                                    name: 'date',
                                    cls: 'ext-cal-nav-picker',
                                    showToday: false
                                },
                            ]
                        }, // End Column 1

                        { // Column 2
                        layout: 'vbox',
                        xtype: 'panel',
                        margin: 10,
                        width: '20%',
                        items: [
                                { //Column 2 top items
                                    layout: 'hbox',
                                    width: '100%',
                                    margin: '0 0 5 0',
                                    items: [
                                        {
                                            xtype: 'combo',
                                            name: 'viewtype',
                                            itemid: 'comboShowType',
                                            fieldLabel: 'Show'.l('SC52000'),
                                            displayField: 'Name',
                                            valueField: 'value',
                                            labelWidth: 40,
                                            width: '55%',
                                            value: 'd',
                                            margin: '0 5 0 0',
                                            store: me.viewDateTypeStore
                                        },
                                        {
                                            xtype: 'combo',
                                            name: 'starttime',
                                            displayField: 'Name',
                                            valueField: 'value',
                                            itemid: 'itemDisplayStartTime',
                                            emptyText: "Start Time".l('SC52000'),
                                            //width: 70,
                                            width: '35%',
                                            value: 8,
                                            store: me.startTimeStore
                                        }
                                    ]
                                },
                                { //Column 2 property panel
                                    layout: 'vbox',
                                    width: '100%',
                                    items: [
                                            {
                                                xtype: 'container',
                                                width: '90%',
                                                items: propertyList
                                            },
                                          {
                                              xtype: 'combo',
                                              name: 'PropertyId',
                                              displayField: 'PropertyName',
                                              valueField: 'PropertyId',
                                              width: '90%',                                              
                                              action: 'select_property',
                                              store: 'common.PropertyForNamesStore',
                                              emptyText: "Enter Location".l('SC52000')
                                          }
                                    ]
                                },
                            ]
                    }, //End Column 2
                        {//Column 3 - Row 1 Meeting type
                        layout: 'vbox',
                        xtype: 'form',
                        //id: "configurationPanel",
                        margin: 10,
                        width: '15%',
                        defaults: {
                            width: '95%'
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                name: 'NumberOfPeople',
                                itemId: 'itemTextNumberOfPeople',
                                selectOnFocus: true,
                                allowBlank: false,
                                vtype: 'onlyNumber',
                                emptyText: 'No of People'.l('SC51000') + '*',
                                enableKeyEvents: true
                            },
                            { //Column 3- Row 1  Room Setup                            
                                xtype: 'combo',
                                name: 'RoomSetupId',
                                //fieldLabel: 'Setup'.l('SC51000') + '*',
                                forceSelection: true,
                                displayField: 'Arrangement',
                                itemid: 'itemRoomSetupCombo',
                                allowBlank: false,
                                valueField: 'RoomSetupId',
                                queryMode: 'remote',
                                typeAhead: true,
                                hideTrigger: false,
                                triggerAction: 'all',
                                store: 'common.RoomSetupStore',
                                emptyText: 'Setup'.l('SC51000') + '*'
                            }, // Column 3 Row2
                        //Column 3 Row3
                             {
                             xtype: 'combo',
                             name: 'RoomTypeName',
                             displayField: 'RoomTypeName',
                             itemid: 'itemRoomTypeCombo',
                             allowBlank: true,
                             valueField: 'RoomTypeId',
                             queryMode: 'remote',
                             typeAhead: true,
                             hideTrigger: false,
                             triggerAction: 'all',
                             store: 'yield.RoomTypeStore',
                             emptyText: 'RoomType'.l('SC51000')
                         }, //Column 3 Row 4
                              {
                              xtype: 'textfield',
                              name: 'min_area',
                              emptyText: "Min area".l('SC52000')
                          }, //Column 3 Row 5
                              {
                              xtype: 'combo',
                              name: 'FloorId',
                              displayField: 'FloorName',
                              valueField: 'FloorId',
                              emptyText: "All Floors".l('SC33000'),
                              padding: 0,
                              anchor: '100%',
                              itemid: 'flooridCombo',
                              //value: 0,
                              store: 'operations.PlanboardFloorsStore'
                          }
                            ]

                    },
                          {//Column 4 - Row 1 Checkbox
                              layout: 'vbox',
                              xtype: 'panel',
                              margin: 10,
                              width: '12%',
                              defaults: {
                                  width: '95%'
                              },
                              items: [{
                                  xtype: 'checkbox',
                                  name: 'IndividualCheckboxId',
                                  displayField: 'Individual',
                                  itemid: 'itemIndividualCheck',
                                  valueField: 'IndividualId',
                                  boxLabel: 'Individual'.l('SC52000'),
                                  boxLabelCls: 'individual_room',
                                  checked: true
                              },
                              {
                                  xtype: 'checkbox',
                                  name: 'CombinedCheckboxId',
                                  displayField: 'Combined',
                                  itemid: 'itemCombinedCheck',
                                  valueField: 'CombinedId',
                                  boxLabel: 'Combined'.l('SC52000'),
                                  checked: true,
                                  boxLabelCls: 'combined_room'

                              },
                               {
                                   xtype: 'checkbox',
                                   name: 'SharableCheckboxId',
                                   displayField: 'Sharable',
                                   valueField: 'SharableId',
                                   itemid: 'itemSharableCheck',
                                   boxLabel: 'Sharable'.l('SC52000'),
                                   checked: true,
                                   boxLabelCls: 'sharable_room'

                               },
                               {
                                   xtype: 'fieldcontainer',
                                   defaultType: 'radiofield',
                                   allowBlank: false,
                                   itemid: "itemRadioGroupPositions",
                                   // defaults: { flex: 1 },
                                   layout: 'vbox',
                                   items: [{
                                       boxLabel: 'Available'.l('SC52000'),
                                       name: 'Positions',
                                       inputValue: 1,
                                       id: 'rdAvailable',
                                       itemid: 'rdAvailable',
                                       checked: true
                                   }, {
                                       boxLabel: 'All'.l('SC52000'),
                                       name: 'Positions',
                                       inputValue: 2,
                                       id: 'rdAll',
                                       checked: false,
                                       itemid: 'rdAll'
                                   }]
                               }
                              ]

                          },
                          {//Column 5
                              frame: true,
                              width: '35%',
                              defaults: {
                                  width: '95%',
                                  labelWidth: '25%'
                              },
                              items: [
                                  {
                                      xtype: 'combo',
                                      name: 'SORT_BY',
                                      itemid: 'itemSortByCombo',
                                      fieldLabel: 'Sort By'.l('SC52000'),
                                      displayField: 'Name',
                                      // labelWidth: '20%',
                                      valueField: 'value',
                                      //emptyText: "Default".l('SC72000'),
                                      value: 0,
                                      store: me.sortyByField
                                  },
                                  {
                                      xtype: 'combo',
                                      name: 'description',
                                      itemid: 'itemDescriptionCombo',
                                      fieldLabel: 'Description'.l('SC52000'),
                                      displayField: 'Name',
                                      //labelWidth: 100,
                                      valueField: 'value',
                                      value: 'B',
                                      anchor: '100%',
                                      store: me.descriptionField
                                  },
                                  {
                                      defaultType: 'radiofield',
                                      xtype: 'fieldcontainer',
                                      //  labelWidth: 100,
                                      layout: 'vbox',
                                      itemid: 'itemFieldsBar',
                                      fieldLabel: 'Bar'.l('SC52000'),
                                      items: [
                                          {
                                              boxLabel: 'Show'.l('SC52000'),
                                              name: 'bar',
                                              itemid: 'BarShow',
                                              inputValue: '1',
                                              padding: '0 10 0 0'
                                          },
                                          {
                                              boxLabel: "Don't Show".l('SC52000'),
                                              name: 'bar',
                                              itemid: 'BarHide',
                                              inputValue: '2',
                                              checked: true
                                          }
                                      ]

                                  }
                                  ,
                                  {
                                      defaultType: 'radiofield',
                                      xtype: 'fieldcontainer',
                                      //labelWidth: 100,
                                      layout: 'vbox',
                                      itemid: 'itemFieldsStatus',
                                      fieldLabel: 'Status'.l('SC52000'),
                                      items: [
                                          {
                                              boxLabel: 'Booking'.l('SC52000'),
                                              name: 'status',
                                              itemid: 'bookingitemid',
                                              inputValue: '1',
                                              padding: '0 10 0 0',
                                              checked: true
                                          },
                                          {
                                              boxLabel: "Quotation".l('SC52000'),
                                              name: 'status',
                                              itemid: 'quatationitemid',
                                              inputValue: '2'
                                          }
                                      ]

                                  }
                              ]
                          }
                    ],
                    listeners: {
                        resize: function (el, adjWidth, adjHeight, eOpts) {
                            var itemBigPanelStep2 = Ext.ComponentQuery.query('[itemid="itemBigPanelStep2"]')[0].getHeight();
                            var planboardPanel = Ext.ComponentQuery.query('[itemid="planboardPanel"]')[0].getHeight();
                            var propertyEditItemsForm = Ext.ComponentQuery.query('[itemid="propertyEditItemsForm"]')[0].getHeight();
                            var h = itemBigPanelStep2 - planboardPanel - propertyEditItemsForm;
                            var sch = Ext.getCmp('sch-grid');
                            sch.setHeight(h - 50);

                        }
                    }
                }
                , me.propertyEditItemsForm

                           , {
                               xtype: 'panel',
                               itemid: 'schedulerHolder',
                               listeners: {
                                   resize: function (el, adjWidth, adjHeight, eOpts) {
                                       var itemBigPanelStep2 = Ext.ComponentQuery.query('[itemid="itemBigPanelStep2"]')[0].getHeight();
                                       var planboardPanel = Ext.ComponentQuery.query('[itemid="planboardPanel"]')[0].getHeight();
                                       var propertyEditItemsForm = Ext.ComponentQuery.query('[itemid="propertyEditItemsForm"]')[0].getHeight();
                                       var h = itemBigPanelStep2 - planboardPanel - propertyEditItemsForm;
                                       var sch = Ext.getCmp('sch-grid');
                                       sch.setHeight(h - 50);

                                   }
                               }, items: sched
                           }]
        },
        me.callParent();
    },
    rowClassChangeRender: function (val, metadata, record, rowIndex, colIndex, store) {

        if ((Utils.StepTwoObj.PropertyId != null && record.get('PropertyId') != Utils.StepTwoObj.PropertyId) || (Utils.StepTwoObj.PropertyIds != null && Utils.StepTwoObj.PropertyIds.split('-').indexOf(record.get('PropertyId').toString()) == -1)) {
            metadata.style = 'background-color: rgba(254,0,0,0.2) !important;cursor: pointer;';
        }
        return val;

    },
    rowClassChangeRenderDelete: function (val, metadata, record, rowIndex, colIndex, store) {

        if ((Utils.StepTwoObj.PropertyId != null && record.get('PropertyId') != Utils.StepTwoObj.PropertyId) || (Utils.StepTwoObj.PropertyIds != null && Utils.StepTwoObj.PropertyIds.split('-').indexOf(record.get('PropertyId').toString()) == -1)) {
            metadata.style = 'background-color: rgba(254,0,0,0.2) !important;cursor: pointer;'
        }
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
    }
    //deleteRender2: function (v, meta, record, rowIdx, col_idx, store) {

    //}
});

PerformanceBarTemplate = function () {
    return new Ext.XTemplate(
        '<div>',
        '<tpl if="turnTime &gt; 0"><div class="turnTime" style="{turnTimeStyle}"></div></tpl>',
        '<span style="position:absolute;top:10%;">{customTitle}</span>',
        '</div>'
    );
};

