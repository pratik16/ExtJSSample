Ext.define('Regardz.view.bookingwizard.AddNewEventScheduler', {
    //extend: 'Ext.panel.Panel',
    alias: 'widget.addneweventscheduler',
    extend: 'Ext.window.Window',
    border: false,
    autoShow: true,
    modal: true,
    frame: false,
    stepOneObj: null,
    stepTwoObj: null,
    itemid: 'addneweventschedulerid',
    LinePlugin: null,
    eventName: null,
    startDate: null,
    startTime: null,
    endTime: null,
    noOfPersons: null,
    roomSetupId: null,
    bookingTrackingId: null,
    resizable: false,
    height: parseInt(Ext.getBody().getViewSize().height * (0.95)),
    width: parseInt(Ext.getBody().getViewSize().width * (0.8)),
    title: "Select Room_Title".l('SC50400'),
    initComponent: function () {

        var me = this;

        if (Ext.getCmp('propertyEditItemsForm2'))
            Ext.getCmp('propertyEditItemsForm2').destroy();

        if (Ext.getCmp('sch-gridRoomSelect'))
            Ext.getCmp('sch-gridRoomSelect').destroy();

        if (Ext.getCmp('configurationPanel'))
            Ext.getCmp('configurationPanel').destroy();

        if (Ext.getCmp('itemschedulerroomselect'))
            Ext.getCmp('itemschedulerroomselect').destroy();
        if (Ext.getCmp('rdAvailable2'))
            Ext.getCmp('rdAvailable2').destroy();
        if (Ext.getCmp('rdAll2id'))
            Ext.getCmp('rdAll2id').destroy();

        var mainComponentHolder = Ext.getCmp('main-regionWizard');
        var schGridHeight = parseInt(me.height * 0.555);
        var schGridWidth = parseInt(me.width * 0.97);
        var forms = Ext.ComponentQuery.query('[itemid="propertyEditItemsForm2"]');
        if (forms.length > 0) {
            for (var i = 0; i < forms.length - 1; i++) {
                forms[i].destroy();
            }

        }

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
            data: [['Default'.l('SC50400'), 0], ['Room Name'.l('SC50400'), 'R'], ['Minimum Capacity'.l('SC50400'), 'N'], ['Maximum Capacity'.l('SC50400'), 'X']]
        });

        //To map this in API to an ENUM!!!!!!!!!!!!!!!!!!!!!!!!!!!
        me.descriptionField = new Ext.data.SimpleStore({
            fields: ['Name', 'value'],
            data: [['Company Name'.l('SC50400'), 1], ['Booking Name'.l('SC50400'), 2], ['Information board'.l('SC50400'), 3]]
        });

        /* End simple stores */
        Sch.preset.Manager.registerPreset("hour", {
            displayDateFormat: 'G:i',
            shiftIncrement: 1,
            shiftUnit: "DAY",
            timeColumnWidth: 150,
            timeResolution: {
                unit: "MINUTE",
                increment: 5
            },
            headerConfig: {
                middle: {
                    unit: "HOUR",
                    dateFormat: 'G:i'
                },
                top: {
                    unit: "DAY",
                    dateFormat: 'D d/m'
                }
            }
        });

        var start = new Date(2013, 3, 30, 8, 0, 0, 0);

        me.propertyEditItemsForm =
     {
         xtype: 'form',
         cls: 'propertyEdit',
         itemid: 'propertyEditItemsForm',
         id: 'propertyEditItemsForm2',
         anchor: '100%',
         frame: false,
         layout: 'hbox',
         width: schGridWidth,
         padding: 10,
         collapsible: false,
         items: [
        {
            layout: 'hbox',
            xtype: 'label',
            text: 'Zoom out'.l('SC50400'),
            padding: '0 0 0 10'
        },
         {
             layout: 'hbox',
             xtype: 'slider',
             width: 120,
             value: Sch.preset.Manager.getPreset('hourAndDay').timeColumnWidth,
             itemid: 'step4roomZoomSlider',
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
         },
         {
             layout: 'hbox',
             xtype: 'label',
             text: 'Zoom in'.l('SC50400'),
             padding: '0 10 0 0'
         },

          {
              xtype: 'hidden',
              name: 'selectedRoomId',
              value: 0,
              allowBlank: true
          }

         ]
     };
        /******************************** Hardcoded stores *******************************************************/
        var form = Utils.getFirstComp(Ext.ComponentQuery.query('addnewevent form[itemid="formAddEvent"]'));
        var formObject = form.getForm().getValues();

        var startDate = new Date(formObject.EventDay);
        var endDate = new Date(formObject.EventDay); ;

        endDate.setDate(startDate.getDate() + 1);
        startDate.setHours(8, 30);
        endDate.setHours(22, 00);

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
                    Text: 'Start time',
                    Cls: ' orange-line'
                }
            ]
        });
        var sched = Ext.create('Sch.panel.SchedulerGrid', {
            //
            resourceStore: Ext.create('Regardz.store.bookingwizard.PlanboardRoomlistBWStore'),
            eventStore: Ext.create('Regardz.store.bookingwizard.PlanboardBookinglistBWStore'),
            resourceZones: Ext.create('Regardz.store.operations.AvailabilityStore'),
            autoScroll: true,
            itemid: 'itemschedulerroomselect',
            // resourceStore: resourceStore,
            useArrows: true,
            // readOnly: true,
            noResize: true,
            //eventResizeHandles: 'none',
            enableEventDragDrop: false,
            viewPreset: 'hourAndDay',
            startDate: startDate,
            endDate: endDate,
            multiSelect: false,
            id: 'sch-gridRoomSelect',
            height: parseInt(me.height * (0.55)),
            width: parseInt(me.width * (0.97)),
            autoScroll: true,
            columns: [
                { header: 'Name', sortable: false, width: 200, dataIndex: 'FormattedRoomName', renderer: this.roomRenderer }

            ],
            onEventCreated: function (newEventRecord) {

                var rs = this.resourceStore;
                var index = rs.find('Id', newEventRecord.getResourceId());
                var resourceRecord = rs.getAt(index);
                if (resourceRecord) {
                    resourceRecord.data.EventName = 'New';
                    resourceRecord.data.EndDate = newEventRecord.data.EndDate;
                    resourceRecord.data.StartDate = newEventRecord.data.StartDate;
                    var startDate = newEventRecord.data.StartDate;
                    var endDate = newEventRecord.data.EndDate;
                    log("PV1=", resourceRecord.data);
                    var panel = Ext.ComponentQuery.query('addneweventscheduler form[itemid="addeventplanboardPanel"]')[0];
                    var form = panel.getForm();
                    if (form) {

                        form.findField('startTimeHour').setValue(startDate.getHours());
                        form.findField('startTimeMin').setValue(startDate.getMinutes());
                        form.findField('endTimeHour').setValue(endDate.getHours());
                        form.findField('endTimeMin').setValue(endDate.getMinutes());
                        form.findField('roomid').setValue(resourceRecord.data.ResourceId);
                        form.findField('roomname').setValue(resourceRecord.data.FormattedRoomName);


                    }
                }
            },
            eventRenderer: function (item, resourceRec, tplData, row, col, ds) {
                if (resourceRec.data.EventName == 'New') {

                    item.setResizable(true);
                }
                else
                    item.setResizable(false);

                var css = '';
                if (resourceRec.data.Classification == "Floor") {
                    css += ' color: #FFFFFF; background-color:' + (resourceRec.get('Color') || 'Coral');
                }

                if (resourceRec.data.IsLoud == true && resourceRec.data.DoNotMove == true) {
                    css += " background: url('public/icons/lock_icon.png'), url('public/icons/loud.png');";
                    css += " background-position: left center, 20px center;";
                    css += " background-repeat: no-repeat, no-repeat;";
                    css += " text-indent:35px;;";
                }
                else if (resourceRec.data.IsLoud == true) {
                    css += " url('public/icons/loud.png');";
                    css += " background-position: left center";
                    css += " background-repeat: no-repeat";
                    css += " text-indent:15px;;";
                }
                else if (resourceRec.data.DoNotMove == true) {
                    css = " url('public/icons/lock_icon.png');";
                    css += " background-position: left center";
                    css += " background-repeat: no-repeat";
                    css += " text-indent:15px;;";
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
                }

                if (item.raw.IsLinkedEvent == true) {
                    css = "background-color:#808080;color: white;";
                }

                css += 'height:10';

                tplData.style = css;


                if (item.data.Cls == "turnTime") {
                    return '';
                }


                var combo = Ext.ComponentQuery.query('addneweventscheduler combo[itemid="itemDescriptionCombo"]')[0];
                var descriptionValue = combo.getValue();
                
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
                if (!Utils.isEmpty(item.raw.BookingName) && descriptionValue == 1) {
                    return item.raw.BookingName + bookingtitle;
                }
                else if (Utils.isValid(item.raw.Description) && descriptionValue == 2) {
                    return item.raw.Description + bookingtitle;
                }
                else if (!Utils.isEmpty(item.raw.BookingName)) {
                    return item.raw.BookingName + bookingtitle;
                }
                else {
                    return "Event".l('SC50400');
                }
            },
            plugins:
                Ext.create("Sch.plugin.Lines", {
                    innerTpl: '<span class="line-text">{Text}</span>',
                    store: lineStore
                }),

            viewConfig: {
                loadMask: true,
                getRowClass: function (r) {
                    if (r.get('Id') === -1) {
                        return "special-event".l('SC50400');
                    }
                }
            }
        });

        me.items = {
            xtype: 'fieldcontainer',
            layout: 'vbox',
            itemid: 'itemBigPanelAddNewEventScheduler',
            //id: 'itemBigPanelStep2',            
            //anchor: '100%',            
            items: [
                {
                    xtype: 'form',
                    // height: parseInt(schGridHeight * 0.33),
                    height: parseInt(me.height * (0.20)),
                    autoScroll: true,
                    itemid: 'addeventplanboardPanel',
                    cls: 'propertyEdit',
                    width: schGridWidth,
                    frame: false,
                    layout: 'hbox',
                    collapsible: false,
                    items: [
                        {
                            xtype: 'hidden',
                            name: 'PropertyId'
                        },
                        {
                            xtype: 'hidden',
                            name: 'date'
                        },
                        {
                            xtype: 'hidden',
                            name: 'bookingTrackingId'
                        },
                        {
                            xtype: 'hidden',
                            name: 'eventName'
                        },
                        {
                            xtype: 'hidden',
                            name: 'NumberOfPeople'
                        },
                         {
                             xtype: 'hidden',
                             name: 'roomSetupId'
                         },
                         {
                             xtype: 'hidden',
                             name: 'startDate'
                         },
                         {
                             xtype: 'hidden',
                             name: 'startTimeHour',
                             itemid: 'startTimeHour'
                         },
                         {
                             xtype: 'hidden',
                             name: 'startTimeMin',
                             itemid: 'startTimeMin'
                         },
                         {
                             xtype: 'hidden',
                             name: 'endTimeHour',
                             itemid: 'endTimeHour'
                         },
                         {
                             xtype: 'hidden',
                             name: 'endTimeMin',
                             itemid: 'endTimeMin'
                         },
                         {
                             xtype: 'hidden',
                             name: 'roomid',
                             itemid: 'roomid'
                         },
                         {
                             xtype: 'hidden',
                             name: 'roomname',
                             itemid: 'roomname'
                         },
                        { // Column 2
                            layout: 'vbox',
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    margin: '15',
                                    items: [
                                    //                                    {
                                    //                                        xtype: 'checkbox',
                                    //                                        itemid: 'cbEnableSlider'
                                    //                                    },
                                    {
                                    xtype: 'label',
                                    itemid: 'itemHourStart',
                                    text: '08:00',
                                    padding: '0 5 0 5'
                                },
                                 {
                                     xtype: 'multislider',
                                     itemid: 'itemHoursSlider',
                                     width: 120,
                                     constrainThumbs: true, //default is set to true but added anyway to learn it
                                     width: 135,
                                     values: [105, 118],
                                     minValue: 0,
                                     maxValue: 287,
                                     increment: 1
                                 },
                                 {
                                     xtype: 'label',
                                     itemid: 'itemHourEnd',
                                     text: '22:00',
                                     padding: '0 0 0 5'
                                 }]
                            }
                            ,
                            {
                                xtype: 'combo',
                                name: 'starttime',
                                displayField: 'Name',
                                valueField: 'value',
                                itemid: 'itemDisplayStartTime2',
                                emptyText: "Start Time".l('SC51000'),
                                width: 100,
                                margin: '15',
                                //value: 0700,
                                store: me.startTimeStore
                            }
                                ]
                        }, //End Column 2
                        {//Column 3 - Row 1 Meeting type
                        layout: 'vbox',
                        xtype: 'panel',
                        //id: "configurationPanel",
                        margin: 10,
                        items: [
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
                            },
                            {
                                xtype: 'textfield',
                                name: 'min_area',
                                emptyText: "Min area".l('SC50400')
                            },
                            {
                                xtype: 'radiogroup',
                                //fieldLabel: "Rooms".l('SC50400'),                                                           
                                itemid: 'itemRadioGroupPositions',
                                columns: 1,
                                vertical: true,
                                items: [
						               {
						                   boxLabel: 'Available'.l('SC50400'),
						                   name: 'Positions',
						                   inputValue: 1,
						                   //margin: '0 5 0 5',
						                   id: 'rdAvailable2',
						                   checked: true
						               }, {
						                   boxLabel: 'All'.l('SC50400'),
						                   name: 'Positions',
						                   //margin: '0 5 0 5',
						                   inputValue: 2,
						                   id: 'rdAll2id',
						                   itemid: 'rdAll2id'

						               }
					                ]
                            }]

                    },
                        {//Column 4 - Row 1 Checkbox
                            layout: 'vbox',
                            xtype: 'panel',
                            margin: 10,
                            items: [{
                                xtype: 'checkbox',
                                name: 'IndividualCheckboxId',
                                displayField: 'Individual',
                                itemid: 'itemIndividualCheck',
                                valueField: 'IndividualId',
                                boxLabel: 'Individual'.l('SC50400'),
                                checked: true
                            },
                            {
                                xtype: 'checkbox',
                                name: 'CombinedCheckboxId',
                                displayField: 'Combined',
                                itemid: 'itemCombinedCheck',
                                valueField: 'CombinedId',
                                boxLabel: 'Combined'.l('SC50400'),
                                checked: true

                            },
                             {
                                 xtype: 'checkbox',
                                 name: 'SharableCheckboxId',
                                 displayField: 'Sharable',
                                 valueField: 'SharableId',
                                 itemid: 'itemSharableCheck',
                                 boxLabel: 'Sharable'.l('SC50400'),
                                 checked: true
                                 //disabled: true

                             }]

                        },
                        {//Column 5
                            //layout: 'form',
                            frame: true,
                            // width: 100,
                            items: [
                                {
                                    xtype: 'combo',
                                    name: 'SORT_BY',
                                    itemid: 'itemSortByCombo',
                                    fieldLabel: 'Sort By'.l('SC50400'),
                                    displayField: 'Name',
                                    labelWidth: 100,
                                    valueField: 'value',
                                    //emptyText: "Default".l('SC72000'),
                                    value: 'default',
                                    anchor: '100%',
                                    store: me.sortyByField,
                                    value: 0
                                },
                                {
                                    xtype: 'combo',
                                    name: 'description',
                                    itemid: 'itemDescriptionCombo',
                                    fieldLabel: 'Description'.l('SC50400'),
                                    displayField: 'Name',
                                    labelWidth: 100,
                                    valueField: 'value',
                                    value: 1,
                                    anchor: '100%',
                                    store: me.descriptionField
                                },
                                {
                                    defaultType: 'radiofield',
                                    xtype: 'fieldcontainer',
                                    labelWidth: 100,
                                    layout: 'hbox',
                                    itemid: 'itemFieldsBar',
                                    fieldLabel: 'Bar'.l('SC50400'),
                                    items: [
                                        {
                                            boxLabel: 'Show'.l('SC50400'),
                                            name: 'bar',
                                            itemid: 'BarShow',
                                            inputValue: '1',
                                            padding: '0 10 0 0'
                                        },
                                        {
                                            boxLabel: "Don't Show".l('SC50400'),
                                            name: 'bar',
                                            itemid: 'BarHide',
                                            inputValue: '2',
                                            checked: true
                                        }
                                    ]
                                }
                            ]
                        }]
                },
                me.propertyEditItemsForm,
            //                {
            //                    xtype: 'displayfield',
            //                    value: 'To select room, select the room from left panel and then click on Select Button'.l('SC50400'),
            //                    padding: 5
            //                },
                {
                xtype: 'panel',
                height: parseInt(me.height * (0.65)),
                //anchor: '100%',
                items: sched
            }
            ]
        };
        me.dockedItems = [{
            dock: 'bottom',
            align: 'right',
            buttonAlign: 'right',
            style: 'margin-right: 15px',
            buttons: [
				{
				    xtype: "button",
				    text: 'Cancel'.l('g'),
				    handler: function () {
				        me.close();
				    }
				}, {
				    xtype: "button",
				    text: 'Select'.l('g'),
				    action: 'selectRoomAction'
				}
			]
        }];
        me.callParent();
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
});