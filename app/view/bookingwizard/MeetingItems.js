Ext.define('Regardz.view.bookingwizard.MeetingItems', {
    extend: 'Ext.tree.Panel',
    //itemid: 'meetingItemsId',
    rootVisible: false,
    //multiSelect: false,
    //singleExpand: true,
    alias: 'widget.meetingitems',
    collapsible: true,
    //autoScroll: true,
    width: '98%',
    //store: 'bookingwizard.BookingTrackingItemsListStore',
    //store: 'configuration.RightsPerRoleStore',

    renderTo: Ext.getBody(),
    minHeight: 165,
    viewConfig: {
        //        markDirty: false
        loadMask: false,
        forceFit: true
    },
    viewConfig: {
        getRowClass: function (record) {
            if (record.data.IsCanceled == true) {
                return " dashboardRedRow ";
            }
            else if (record.data.IsRoomRent) {
                return " row-rent ";
            }
            return record.get('Class');
        }
    },
    BookingId: null,
    BookingEventTrackingId: null,
    BookingEventId: null,
    EventId: null,
    BookingTrackingId: null,
    StartTime: null,
    EndTime: null,
    Persons: null,
    OutletId: null,
    OutletName: null,
    BarId: null,
    internalRemarkId: null,
    internalRemarkText: null,
    externalRemarkId: null,
    externalRemarkText: null,
    dayNumber: null,
    date: null,
    disableSharable: true,
    disableDeleteEventButton: true,
    doNotMove: false,
    isLoud: false,
    PropertyId: null,
    //title: 'Meeting'.l('SC54100'),
    title: 'Meeting',
    tempTitle: '',
    //store: null,
    elements: null,
    padding: '10px 0 0 0',
    margin: '10',
    statusId: null,
    statusName: null,
    OriginalStatusId: 0,
    RoomSetupId: 0,
    IsMainEvent: false,
    uniqueid: 0,
    Quantity: 0,
    RoomId: 0,
    IsSharable: false,
    IsPartOfPackage: false,
    NoOfPeople: 0,
    initComponent: function () {
        var me = this;
        //me.disableSharable = false;
        //var store = Ext.create('Ext.data.TreeStore', {
        //    root: {
        //        expanded: true,
        //        children: [
        //            { text: "detention", leaf: true },
        //            {
        //                text: "homework", expanded: true, children: [
        //                  { text: "book report", leaf: true },
        //                  { text: "alegrbra", leaf: true }
        //                ]
        //            },
        //            { text: "buy lottery tickets", leaf: true }
        //        ]
        //    }
        //});

        // var store =
        //me.store = store;

        me.tempTitle = me.title;
        me.title = "<span id='span_" + me.BookingEventTrackingId + "'>" + me.title + "</span>";
        if (Utils.isValid(me.statusName)) {
            me.title += ": " + me.statusName;
        }
        me.title += "<span style='float:right'>Day " + this.dayNumber + ": " + this.date + "</span>";

        //me.store = this.elements;        
        me.noResize = true;
        me.frame = true;
        var hoursArray = new Array();
        for (var i = 0; i <= 23; i++) {
            for (var j = 0; j <= 55; ) {
                var mint = 0;
                mint = mint + j;
                if (j == 0 || j == 5) {
                    mint = '0' + mint;
                }
                if (i < 10) {
                    hoursArray.push(['0' + i + ':' + mint, '0' + i + ':' + mint]);
                    //hoursArray.push(['0' + i + ':05', '0' + i + ':05']);
                } else {
                    hoursArray.push([i + ':' + mint, i + ':' + mint]);
                    //hoursArray.push([i + ':05', i + ':05']);
                }
                j = j + 5;
            }
        }
        me.startTimeStore = new Ext.data.SimpleStore({
            fields: ['Name', 'value'],
            data: hoursArray
        });
        me.endTimeStore = new Ext.data.SimpleStore({
            fields: ['Name', 'value'],
            data: hoursArray
        });
        me.startTimeCombo = Ext.create('Ext.form.field.ComboBox', {
            name: 'starttime',
            displayField: 'Name',
            valueField: 'value',
            itemid: 'itemDisplayStartTime',
            width: 100,
            value: '00:00',
            store: me.startTimeStore
            //added below code not allow to change combo values
            //            forceSelection: true,
            //            onFocus: function () {
            //                var me = this;
            //                if (!me.isExpanded)
            //                    me.expand()
            //                me.getPicker().focus();
            //            }
        });
        me.endTimeCombo = Ext.create('Ext.form.field.ComboBox', {
            name: 'endtime',
            displayField: 'Name',
            valueField: 'value',
            itemid: 'itemDisplayEndTime',
            width: 100,
            store: me.endTimeStore
            //added below code not allow to change combo values
            //            forceSelection: true,
            //            onFocus: function () {
            //                var me = this;
            //                if (!me.isExpanded)
            //                    me.expand()
            //                me.getPicker().focus();
            //            }
        });
        me.itemPriceCombo = Ext.create('Ext.form.field.ComboBox', {
            displayField: 'FormattedText',
            valueField: 'FormattedText',
            itemid: 'itemPriceCombo',
            width: 100,
            //store: Ext.create('Regardz.store.bookingwizard.ItemPriceBarStore')
            store: Ext.getStore('bookingwizard.ItemPriceBarStore')
        });
        me.columns = [
             {
                 xtype: 'treecolumn', //this is so we know which column will show the tree
                 header: 'Item'.l('SC54000'),
                 width: 200,
                 flex: 10,
                 sortable: true,
                 dataIndex: 'ItemName',
                 editor: new Ext.form.TextField({})
             },
        //{
        //        header: 'Item'.l('SC54000'),
        //        width: 200,
        //        flex: 2,
        //        sortable: true,
        //        dataIndex: 'ItemName'
        //},
            {header: 'Start'.l('SC54000'), dataIndex: 'StartTimeHHMM', flex: 4, editor: me.startTimeCombo, align: 'center' },
            { header: 'End'.l('SC54000'), dataIndex: 'EndTimeHHMM', flex: 4, editor: me.endTimeCombo, align: 'center' },
            {
                header: 'Price'.l('SC54000'), dataIndex: 'Price', flex: 4, editor: me.itemPriceCombo, align: 'right',
                renderer: this.priceRenderer
            },

            { header: 'Persons'.l('SC54000'), dataIndex: 'Quantity', flex: 3, editor: new Ext.form.NumberField({ minValue: 0 }), align: 'center' },
            { header: 'Quantity'.l('SC54000'), dataIndex: 'ServedQuantity', flex: 3, editor: new Ext.form.NumberField({}), align: 'center' },
            { header: 'Red.%'.l('SC54000'), dataIndex: 'ReductionPercentage', flex: 3, editor: new Ext.form.NumberField({ maxValue: 100, minValue: 0 }), align: 'center' },
            { header: 'Red.'.l('SC54000'), dataIndex: 'Reduction', flex: 3, editor: new Ext.form.NumberField({}), align: 'right', renderer: this.reductionRenderer },
            { header: 'Group name'.l('SC54000'), dataIndex: 'GroupName', flex: 8, editor: new Ext.form.TextField({}) },
            {
                header: 'Total'.l('SC54000'), dataIndex: 'TotalPrice', flex: 4, align: 'right',
                renderer: this.totalPriceRenderer
            },

            { renderer: this.itemMenuRender, align: 'center', width: 25 },
        //tdCls: 'icon-document', align: 'center', width: 25, name: 'EditMenu', hideable: false },
            {align: 'center', width: 25, name: 'ItemDelete', renderer: this.iconsRenderer },
            { align: 'center', width: 25, name: 'ItemEdit', renderer: this.iconsRenderer },
            { hidden: true, dataIndex: 'ItemId', align: 'center', hideable: false },
            { hidden: true, dataIndex: 'ItemGroupId', align: 'center', hideable: false },
             { hidden: true, dataIndex: 'PartOfPackage', align: 'center', hideable: false },
              { hidden: true, dataIndex: '_ItemGroupId', align: 'center', hideable: false },
              { hidden: true, dataIndex: 'ItemEditable', align: 'center', hideable: false },
        { hidden: true, dataIndex: 'BarId', align: 'center', hideable: false }
        ];

        var buttonAdd = Ext.create('Ext.Button', {
            itemid: 'button_add' + me.BookingEventTrackingId,
            scale: 'small',
            bookingEventTrackingId: me.BookingEventTrackingId,
            BookingEventId: me.BookingEventId,
            EventId: me.EventId,
            //BarId: me.BarId,
            action: 'addItemButtonAction',
            iconCls: 'new',
            tooltip: 'Add New Items_Title'.l('SC54300'),
            width: 25,
            iconAlign: 'left'
        });

        var optionalState = false; var definiteState = false; var tentitiveState = false; var cancelState = false;
        var changeStatusDisabled = false;

        switch (me.statusId) {
            case 1: //OFF => Disable all
                optionalState = true;
                definiteState = true;
                tentitiveState = true;
                cancelState = true;
                changeStatusDisabled = true;
                break;
            case 3: //Cancel => Disable all
                optionalState = true;
                definiteState = false;
                tentitiveState = false;
                cancelState = false;
                changeStatusDisabled = false;
                break;
            case 4: //OP2 => Disable all
                optionalState = true;
                definiteState = true;
                tentitiveState = true;
                cancelState = true;
                changeStatusDisabled = true;
                break;
            case 5: //Tentitive => Disable Optional 
                optionalState = true;
                tentitiveState = true;
                definiteState = false;
                cancelState = false;
                changeStatusDisabled = false;
                break;
            case 6: //Def => Disable Optional and Tentitive
                optionalState = true;
                tentitiveState = true;
                definiteState = true;
                cancelState = false;
                changeStatusDisabled = false;
                break;
            case 7: //Cancel => Disable all
                optionalState = true;
                definiteState = true;
                tentitiveState = true;
                cancelState = true;
                changeStatusDisabled = false;
                break;
            case 4:
                changeStatusDisabled = true;
                break;
            default:
                optionalState = true;
                definiteState = false;
                tentitiveState = false;
                cancelState = false;
                changeStatusDisabled = false;
                break;
        }

        var statusMenu = Ext.create('Ext.menu.Menu', {
            //   margin: '0 0 10 0',
            itemid: 'menu' + me.BookingEventTrackingId,
            floating: true,  // usually you want this set to True (default)            
            plain: true,
            items: [{
                text: 'Optional'.l('SC54000'),
                disabled: optionalState,
                statusId: 3
            }, {
                text: 'Tentitive'.l('SC54000'),
                disabled: tentitiveState,
                statusId: 5
            }, {
                text: 'Definite'.l('SC54000'),
                disabled: definiteState,
                statusId: 6
            }, {
                text: 'Cancel'.l('SC54000'),
                disabled: cancelState,
                statusId: 7
            }],
            listeners: {
                click: function (menu, item, e, eOpts) {

                    log('item', item);
                    var bId = me.BookingEventId;
                    var bTrackingId = me.BookingEventTrackingId;
                    if (!Utils.isValid(bId)) {
                        bId = 0;
                    }
                    if (!Utils.isValid(bTrackingId)) {
                        bTrackingId = 0;
                    }

                    if (item.statusId == 7 && bId == 0) {
                        var urlItem = webAPI_path + 'api/booking/ValidateEventForDeletion';
                        Ext.data.JsonP.request({
                            url: urlItem,
                            type: 'GET',
                            params: { "id": me.BookingTrackingId, "id1": me.BookingId, "id2": bTrackingId, "id3": bId },
                            //data: BIobj,
                            success: function (response) {
                                if (response.success == true) {
                                    Ext.MessageBox.confirm('Delete'.l('g'), 'Are you sure you want to delete?'.l('g'), function (btn) {
                                        if (btn === 'yes') {
                                            var urlItem = webAPI_path + 'api/booking/DeleteBookingEventTracking';
                                            Ext.data.JsonP.request({
                                                url: urlItem,
                                                type: 'GET',
                                                params: { "id": bId, "id1": bTrackingId, "id2": CurrentSessionUserId, "id3": me.BookingTrackingId, "id4": me.BookingId },
                                                //data: BIobj,                            
                                                success: function (response) {
                                                    if (response.success == true) {
                                                        var c = _currentApp.getController('bookingwizard.BookingWizardStep4');
                                                        /*Update tabpanel*/
                                                        var tabeventPanel = Ext.ComponentQuery.query('tabpanel[itemid=tabeventpanel]')[0];
                                                        var tabActivate = tabeventPanel.getActiveTab();
                                                        c.loadBookingTrackingEvents(c, tabActivate);
                                                        /*----*/
                                                        Utils.LoadBookingInformationForRightPane(me.BookingId, me.BookingTrackingId, user_language);
                                                    } else {
                                                        var ResultText = response.result;
                                                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                                            ResultText = ResultText.l("SP_DynamicCode");
                                                        Ext.Msg.alert('Error'.l('g'), ResultText);
                                                        return false;
                                                    }
                                                    log("Utils.StepOneObj", Utils.StepOneObj);
                                                },
                                                failure: function (form, response) {
                                                    Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                                                    return false;
                                                }
                                            });
                                        }
                                    });
                                } else {
                                    var ResultText = response.result;
                                    if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                        ResultText = ResultText.l("SP_DynamicCode");
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                    return false;
                                }
                            }
                        });
                    }
                    else if ((item.statusId == 7) && (me.OriginalStatusId == 6 || me.OriginalStatusId == 5) && me.BookingEventId > 0) {
                        //if (!Utils.isValid(item)) return;

                        /*Event cancellation screen*/
                        Ext.create('widget.bookingnavigationcancelwindow',
                        {
                            ReservationId: Utils.RightPanObj.ReservationId,
                            BookingEventId: me.BookingEventId,
                            BookingId: me.BookingId,
                            typeCancellation: 'BookingEvent'

                        }).show();
                        return;
                        /*End Event cancellation screen*/

                    }
                    else { //UNC/LOST/CAN should be disable
                        var url = webAPI_path + 'api/Booking/UpdateEventStatus';
                        $.get(url, { id: bId, id1: bTrackingId, id2: item.statusId, id3: CurrentSessionUserId, id4: me.BookingTrackingId, id5: me.BookingId },
                         function (response) {
                             if (response.success) {
                                 /*Update tabpanel*/
                                 var c = _currentApp.getController('bookingwizard.BookingWizardStep4');
                                 var tabeventPanel = Ext.ComponentQuery.query('tabpanel[itemid=tabeventpanel]')[0];
                                 var tabActivate = tabeventPanel.getActiveTab();
                                 c.loadBookingTrackingEvents(c, tabActivate);
                                 /*----*/
                                 //                                 var eventsPanel = Ext.ComponentQuery.query('bookingwizardstep4 [itemid="eventsPanel"]')[0];
                                 //                                 eventsPanel.removeAll();
                                 //                                 var store = Ext.data.StoreManager.lookup('bookingwizard.BookingTrackingEventListStore');
                                 //                                 store.removeAll();
                                 //                                 store.reload();
                             } else {
                                 var ResultText = response.result;
                                 if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                     ResultText = ResultText.l("SP_DynamicCode");
                                 Ext.Msg.alert('Error'.l('g'), ResultText);
                                 return false;
                             }
                         });
                    }
                }
            }
        });
        var buttonStatus = Ext.create('Ext.Button', {
            itemid: 'button_status' + me.BookingEventTrackingId,
            scale: 'small',
            action: 'changeStatusButtonAction',
            tooltip: 'Change status'.l('SC54300'),
            iconCls: 'icon-signal',
            width: 35,
            iconAlign: 'left',
            menu: statusMenu,
            disabled: changeStatusDisabled

        });

        var buttonEditRemark = Ext.create('Ext.Button', {
            itemidid: 'button_edit_remark' + me.BookingEventTrackingId,
            scale: 'small',
            internalRemarkId: me.internalRemarkId,
            internalRemarkText: me.internalRemarkText,
            externalRemarkId: me.externalRemarkId,
            externalRemarkText: me.externalRemarkText,
            typeId: 5, //Event remark
            bookingEventId: me.BookingEventId,
            itemId: me.BookingEventTrackingId,
            action: 'editRemarkButtonAction',
            iconCls: 'icon-documentadd',
            width: 25,
            iconAlign: 'left',
            tooltip: 'Add/Edit event remark'.l('SC54300')
        });

        var buttonShareRooms = Ext.create('Ext.Button', {
            itemid: 'button_share_rooms' + me.BookingEventTrackingId,
            scale: 'small',
            action: 'shareRoomButtonAction',
            iconCls: 'icon-sharable',
            bookingEventTrackingId: me.BookingEventTrackingId,
            bookingEventId: me.BookingEventId,
            outletId: me.OutletId,
            outletName: me.OutletName,
            startTime: me.StartTime,
            endTime: me.EndTime,
            Persons: me.Persons,
            width: 25,
            disabled: this.disableSharable,
            iconAlign: 'left',
            tooltip: 'Open sharable rooms configuration'.l('SC54300')
        });

        var buttonEditEvent = Ext.create('Ext.Button', {
            itemid: 'button_edit_event' + me.BookingEventTrackingId,
            scale: 'small',
            bookingEventTrackingId: me.BookingEventTrackingId,
            bookingEventTitle: me.tempTitle,
            bookingEventId: me.BookingEventId,
            RoomSetupId: me.RoomSetupId,
            IsPartOfPackage: me.IsPartOfPackage,
            NoOfPeople: me.NoOfPeople,
            uniqueid: me.uniqueid,
            RoomId: me.RoomId,
            Quantity: me.Quantity,
            IsSharable: me.IsSharable,
            action: 'editEventButtonAction',
            iconCls: 'icon-edit',
            width: 25,
            iconAlign: 'left',
            tooltip: 'Edit event name'.l('SC54300')
        });

        var buttonDelete = Ext.create('Ext.Button', {
            itemid: 'button_delete' + me.BookingEventTrackingId,
            scale: 'small',
            //  action: 'deleteEventButtonAction',
            iconCls: 'icon-delete-item',
            tooltip: 'Delete event'.l('SC54300'),
            disabled: this.disableDeleteEventButton,
            BookingEventTrackingId: me.BookingEventTrackingId,
            BookingTrackingId: me.BookingTrackingId,
            BookingId: me.BookingId,
            width: 25,
            listeners: {
                click: function (r, a, l) {
                    var bId = (me.BookingEventId > 0) ? me.BookingEventId : 0;
                    var bTrackingId = (me.BookingEventTrackingId > 0) ? me.BookingEventTrackingId : 0;
                    log(" BookingTrackingId-bookingid", me.BookingTrackingId + " - " + me.BookingId);

                    var urlItem = webAPI_path + 'api/booking/ValidateEventForDeletion';
                    Ext.data.JsonP.request({
                        url: urlItem,
                        type: 'GET',
                        params: { "id": me.BookingTrackingId, "id1": me.BookingId, "id2": bTrackingId, "id3": bId },
                        //data: BIobj,
                        success: function (response) {
                            if (response.success == true) {
                                Ext.MessageBox.confirm('Delete'.l('g'), 'Are you sure you want to delete?'.l('g'), function (btn) {
                                    if (btn === 'yes') {
                                        var urlItem = webAPI_path + 'api/booking/DeleteBookingEventTracking';
                                        Ext.data.JsonP.request({
                                            url: urlItem,
                                            type: 'GET',
                                            params: { "id": bId, "id1": bTrackingId, "id2": CurrentSessionUserId, "id3": me.BookingTrackingId, "id4": me.BookingId },
                                            //data: BIobj,                            
                                            success: function (response) {
                                                if (response.success == true) {
                                                    var c = _currentApp.getController('bookingwizard.BookingWizardStep4');
                                                    /*Update tabpanel*/
                                                    var tabeventPanel = Ext.ComponentQuery.query('tabpanel[itemid=tabeventpanel]')[0];
                                                    var tabActivate = tabeventPanel.getActiveTab();
                                                    c.loadBookingTrackingEvents(c, tabActivate);
                                                    /*----*/
                                                    //                                                  
                                                    Utils.LoadBookingInformationForRightPane(me.BookingId, me.BookingTrackingId, user_language);
                                                } else {
                                                    var ResultText = response.result;
                                                    if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                                        ResultText = ResultText.l("SP_DynamicCode");
                                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                                    return false;
                                                }
                                                log("Utils.StepOneObj", Utils.StepOneObj);
                                            },
                                            failure: function (form, response) {
                                                Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                                                return false;
                                            }
                                        });
                                    }
                                });
                            } else {
                                var ResultText = response.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                                return false;
                            }
                        }
                    });
                }

            },
            iconAlign: 'left'
        });

        var doNotMoveField = Ext.create('Ext.form.Checkbox', {
            iconalign: 'right',
            xtype: 'checkbox',
            name: 'doNotMoveSelection',
            itemid: 'donotmoveid',
            boxLabel: 'Do not move'.l('SC54300'),
            checked: me.doNotMove,
            //            bookingEventTrackingId: (me.BookingEventTrackingId > 0) ? me.BookingEventTrackingId : 0,
            //            bookingEventId: (me.BookingEventId > 0) ? me.BookingEventId : 0,
            disabled: !this.disableSharable,
            //selectOnFocus: true,
            listeners: {
                change: function (r, a, l) {
                    log("r", r);
                    var urlItem = webAPI_path + 'api/booking/UpdateIndicatorStatus';
                    var bookingEventId = me.BookingEventId;
                    var bookingEventTrackingId = me.BookingEventTrackingId;
                    if (!Utils.isValid(bookingEventId)) {
                        bookingEventId = 0;
                    }
                    if (!Utils.isValid(bookingEventTrackingId)) {
                        bookingEventTrackingId = 0;
                    }
                    Ext.data.JsonP.request({
                        url: urlItem,
                        type: 'GET',
                        params: {
                            id: bookingEventTrackingId,
                            id1: bookingEventId,
                            id2: 2,
                            id3: r.value
                        },

                        success: function (response) {
                            log("response", response);
                            if (response.success == true) {
                            }

                        },
                        failure: function (response) {
                            //Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                        }
                    });
                }
            }
        });

        var loudField = Ext.create('Ext.form.Checkbox', {
            iconalign: 'right',
            xtype: 'checkbox',
            name: 'loudSelection',
            itemid: 'loudid',
            boxLabel: 'Loud'.l('SC54300'),
            checked: me.isLoud,
            //            bookingEventTrackingId: (me.BookingEventTrackingId > 0) ? me.BookingEventTrackingId : 0,
            //            bookingEventId: (me.BookingEventId > 0) ? me.BookingEventId : 0,
            selectOnFocus: true,
            disabled: !this.disableSharable,
            width: 80,
            listeners: {
                change: function (r, a, l) {
                    log("r", r);
                    var urlItem = webAPI_path + 'api/booking/UpdateIndicatorStatus';
                    var bookingEventId = me.BookingEventId;
                    var bookingEventTrackingId = me.BookingEventTrackingId;
                    if (!Utils.isValid(bookingEventId)) {
                        bookingEventId = 0;
                    }
                    if (!Utils.isValid(bookingEventTrackingId)) {
                        bookingEventTrackingId = 0;
                    }
                    Ext.data.JsonP.request({
                        url: urlItem,
                        type: 'GET',
                        params: {
                            id: bookingEventTrackingId,
                            id1: bookingEventId,
                            id2: 1,
                            id3: r.value
                        },

                        success: function (response) {
                            log("response", response);
                            if (response.success == true) {
                            }

                        },
                        failure: function (response) {
                            //Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                        }
                    });
                }
            }
        });
        me.tbar = [buttonAdd, buttonStatus, buttonEditRemark, buttonShareRooms, buttonEditEvent, buttonDelete,
        { xtype: 'tbfill' }, { xtype: 'tbfill' }, doNotMoveField, loudField];
        //me.bbar = {
        //    xtype: 'pagingtoolbar',
        //    store: Ext.data.StoreManager.lookup('bookingwizard.BookingTrackingItemsListStore'),
        //    displayInfo: true,
        //    emptyMsg: "No data to display"
        //};

        me.callParent();
    },
    listeners: {
        cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
            /*BY PRatik, no action on isCanceled and rend code was not here so added as icon is not shown for that*/
            if ((iRecord.data.IsCanceled == true && iColIdx > 0) || iRecord.data.IsRoomRent == true)
                return false;

            var column = iColIdx;
            switch (iColIdx) {
                case 12:
                    var obj = $(iCellEl);
                    var cls = obj.attr('class');
                    if (cls.indexOf('icon-documentadd') < 0) {
                        return;
                    }

                    Utils.ShowWindow('widget.addremarks', null);
                    urlItem = webAPI_path + 'api/booking/GetEntityRemarkById';

                    var BEIDId = iRecord.data.BookingEventItemDetailId;
                    var BEIDTId = iRecord.data.BookingEventItemDetailTrackingId;
                    var itemId = BEIDTId;
                    var typeId = 6;
                    if (BEIDTId == null) {
                        itemId = BEIDId;
                        typeId = 3;
                    }
                    if (BEIDTId == null && BEIDId == null) {
                        var CBEIDId = iRecord.childNodes[0].data.BookingEventItemDetailId;
                        var CBEIDTId = iRecord.childNodes[0].data.BookingEventItemDetailTrackingId;
                        itemId = CBEIDTId;
                        typeId = 8;
                        if (CBEIDTId == null) {
                            itemId = CBEIDId;
                            typeId = 7;
                        }
                    }

                    log("itemid", itemId);
                    Ext.data.JsonP.request({
                        url: urlItem,
                        type: 'GET',
                        params: {
                            id: typeId,
                            id1: itemId
                        },
                        success: function (response) {
                            log("response", response);
                            if (response.success == true) {
                                Ext.ComponentQuery.query('textfield[itemid="internalRemarkTextField"]')[0].setValue(response.data.InternalNoteText);
                                Ext.ComponentQuery.query('textfield[itemid="externalRemarkTextField"]')[0].setValue(response.data.ExternalNoteText);
                                Ext.ComponentQuery.query('[itemid="internalRemarkId"]')[0].setValue(response.data.NoteId);
                            }
                        },
                        failure: function (response) {
                            //Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                        }
                    });
                    Ext.ComponentQuery.query('[itemid="itemId"]')[0].setValue(itemId);
                    Ext.ComponentQuery.query('[itemid="typeId"]')[0].setValue(typeId);
                    break;
                case 11:
                    var localThis = this;
                    var obj = $(iCellEl);
                    var cls = obj.attr('class');
                    if (cls.indexOf('icon-delete-item') > 0) {
                        Ext.MessageBox.confirm('Delete'.l('g'), 'Are you sure you want to delete?'.l('g'), function (btn) {
                            if (btn === 'yes') {
                                var bTrackingId = (iRecord.data.BookingEventItemDetailTrackingId > 0) ? iRecord.data.BookingEventItemDetailTrackingId : 0;
                                var bId = (iRecord.data.BookingEventItemDetailId > 0) ? iRecord.data.BookingEventItemDetailId : 0;
                                var beTrackingId = (iRecord.data.BookingEventTrackingId > 0) ? iRecord.data.BookingEventTrackingId : 0;
                                var BookingEventId = (iRecord.data.BookingEventId > 0) ? iRecord.data.BookingEventId : 0;
                                localThis.beTrackingId = beTrackingId;
                                localThis.BookingEventId = BookingEventId;

                                var myParams = { "id": bId, "id1": bTrackingId, 'id2': CurrentSessionUserId };
                                var urlItem = webAPI_path + 'api/booking/DeleteItemFromTrackingEvent';

                                if (bId == 0 && bTrackingId == 0) {
                                    urlItem = webAPI_path + 'api/booking/DeleteItemGroupFromTrackingEvent';
                                    var beId = (iRecord.data.BookingEventId > 0) ? iRecord.data.BookingEventId : 0;
                                    if (!Utils.isValid(beId)) {
                                        beId = 0;
                                    }

                                    var beTid = (iRecord.data.BookingEventTrackingId > 0) ? iRecord.data.BookingEventTrackingId : 0;
                                    if (!Utils.isValid(beTid)) {
                                        beTid = 0;
                                    }

                                    var itemGr = (iRecord.data.ItemGroupId > 0) ? iRecord.data.ItemGroupId : 0;

                                    if (!Utils.isValid(itemGr)) {
                                        itemGr = 0;
                                    }

                                    // myParams = { "id": beId, "id1": beTid, "id2": itemGr, "id3": CurrentSessionUserId };
                                    myParams = { "id": iRecord.data.DetailIds, "id1": iRecord.data.TrackingIds, "id2": CurrentSessionUserId };
                                }
                                myParams.id3 = false;
                                Utils.StepFourObj.tmpObj = {};
                                Utils.StepFourObj.tmpObj.beTrackingId = beTrackingId;
                                Utils.StepFourObj.tmpObj.BookingEventId = BookingEventId;

                                Ext.data.JsonP.request({
                                    url: urlItem,
                                    type: 'GET',
                                    params: myParams,
                                    //data: BIobj,                            
                                    success: function (response) {
                                        if (response.confirm == true) {
                                            myParams.id3 = true
                                            //                                            localThis.myParams = myParams;
                                            //                                            localThis.urlItem = urlItem;

                                            Utils.StepFourObj.tmpObj.myParams = myParams;
                                            Utils.StepFourObj.tmpObj.urlItem = urlItem;

                                            var text = response.result;
                                            //text = str_replace(array("\n", "\r"), array("\\n", "\\r"), text);                              
                                            text = text.replace(/\\n\\r/g, '<br />');
                                            var cCost = 0;
                                            var cPer = 0;
                                            if (typeof (response.CancelPer) != "undefined") {
                                                cPer = response.CancelPer;
                                            }
                                            if (typeof (response.CancelCost) != "undefined") {
                                                cCost = response.CancelCost;
                                            }
                                            cCost = "€ " + Ext.util.Format.number(cCost, '0,000.00');

                                            if (text.length > 0) {
                                                if (text.substring(0, 4) == "SPC_")
                                                    display_alert(text.l("SP_DynamicCode", cCost, cPer), "", "C", localThis.SecondAPICall, true);
                                                else
                                                    display_alert(text, "", "C", localThis.SecondAPICall, true);
                                            }
                                            else {
                                                localThis.SecondAPICall('yes');
                                            }
                                            Utils.LoadBookingInformationForRightPane(localThis.BookingId, localThis.BookingTrackingId, user_language);
                                        }
                                        else {
                                            if (response.success == true) {
                                                /*Edit booking we have BookingEventID, and current booking we have bookingtrackingid*/
                                                var storeitemid = (beTrackingId > 0) ? beTrackingId : BookingEventId;

                                                var grid = Ext.ComponentQuery.query('[itemid=' + storeitemid + '_grid]')[0];
                                                var localStore = Ext.create('Regardz.store.bookingwizard.BookingTrackingItemsListStore');
                                                //localStore.proxy.setExtraParam('id', 0); // As DS instructions
                                                localStore.proxy.setExtraParam('id', BookingEventId); // resolved by Pratik
                                                localStore.proxy.setExtraParam('id1', beTrackingId);
                                                localStore.proxy.setExtraParam('languageId', user_language);
                                                localStore.load();
                                                grid.getStore().load(localStore);
                                                Utils.LoadBookingInformationForRightPane(localThis.BookingId, localThis.BookingTrackingId, user_language);

                                            } else {
                                                Ext.Msg.alert('Error'.l('g'), response.data);
                                                return false;
                                            }
                                        }
                                        log("Utils.StepOneObj", Utils.StepOneObj);
                                    },
                                    failure: function (form, response) {
                                        Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                                        return false;
                                    }
                                });
                            }
                        });
                    }
                    break;
                case 10:

                    log('irecord is', iRecord);
                    //log("this", this.PropertyId);
                    log("view", iView);
                    var propertyID = Ext.ComponentQuery.query('[itemid="PropertyId"]')[0];
                    var store = Ext.getStore('bookingwizard.BookingMenuListStore');
                    store.proxy.setExtraParam('id', iRecord.data.ItemGroupId);
                    store.proxy.setExtraParam('id1', propertyID.getValue());
                    store.proxy.setExtraParam('languageId', user_language);
                    store.load();
                    urlItem = webAPI_path + 'api/booking/GetCurrentMenuItem';
                    /// <param name="id">BookingEventItem Detail TrackingId</param>
                    /// <param name="id1">BookingEventItem Detail Id</param>
                    /// <param name="languageId">Language Id</param>
                    var currentMenuText = "";
                    var bookingEventId = iRecord.data.BookingEventId;
                    if (!Utils.isValid(bookingEventId)) {
                        bookingEventId = 0;
                    }
                    Ext.data.JsonP.request({
                        url: urlItem,
                        type: 'GET',
                        params: {
                            id: iRecord.data.BookingEventTrackingId,
                            id1: bookingEventId,
                            id2: iRecord.data.ItemGroupId,
                            languageId: user_language
                        },
                        success: function (response) {
                            log("response", response);
                            if (response.success == true) {

                                if (response.result != null) {
                                    currentMenuText = response.result;
                                }
                                Ext.create('widget.editmenu', { currentMenu: currentMenuText, bookingEventTrackingId: iRecord.data.BookingEventTrackingId, bookingEventId: iRecord.data.BookingEventId, IGroupId: iRecord.data.ItemGroupId }).show();
                            }
                        },
                        failure: function (response) {
                            //Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                        }
                    });
                    //alert(currentMenuText);
                    //Ext.create('widget.editmenu', { currentMenu: currentMenuText, bookingEventTrackingId: iRecord.data.BookingEventTrackingId, bookingEventId: iRecord.data.BookingEventId, IGroupId: iRecord.data.ItemGroupId }).show();
                    //Ext.create('widget.editmenu').center();
                    //Ext.create('widget.meetingsharableroomsoccupation', { bookingEventTrackingId: t.bookingEventTrackingId, bookingEventId: t.bookingEventId, outletId: t.outletId, outletName: t.outletName, startTime: t.startTime, endTime: t.endTime, Persons: t.Persons }).show();                    

                    break;
                default:

            }

        },

        edit: function (editor, e) {

            var selectedPrice = null;

            // culture based replace of decimal places for price
            var tempPrice = null;
            var isPriceEditable = true;

            if (e.record.data.IsRoomRent == true || e.record.data.ItemEditable == false) {
                isPriceEditable = false;
            }

            if (isPriceEditable) {
                tempPrice = String(e.record.data.Price).replace(Ext.util.Format.thousandSeparator, '');
                e.record.data.Price = String(tempPrice).replace(Ext.util.Format.decimalSeparator, '.');
            }

            var st = Ext.getStore('bookingwizard.ItemPriceBarStore');
            var indx = st.findExact('FormattedText', e.record.data.Price);
            var el = st.getAt(indx);

            if (el != null && el != undefined && isPriceEditable) {
                selectedPrice = el.data.Price;
            }
            else {
                selectedPrice = e.record.data.Price;
            }

            log('selected bar is', selectedPrice);
            log('element is', el);

            try {// only assing 
                if (e.record.data.ItemEditable == true && e.record.data.IsRoomRent == false) {
                    if (el != null && el != undefined) {
                        e.record.data.BarId = el.data.BarId;
                        e.record.data.Price = el.data.Price;
                    }
                    else {
                        e.record.data.BarId = barIdBefore;
                    }
                }

            } catch (e) {

            }


            var bookingEventItemDetailTrackingId = e.record.data.BookingEventItemDetailTrackingId;
            var newTime = e.record.data.StartTimeHHMM;
            var endTime = e.record.data.EndTimeHHMM;
            var reductionPercentageValue = e.record.data.ReductionPercentage;

            //itemPriceCombo
            var reductionValue = e.record.data.Reduction;
            var updateTimeApi = webAPI_path + 'api/Booking/UpdateItemRowEditor';

            var obj = {};
            obj.VatPercentage = e.record.data.VatPercentage;
            obj.BookingEventItemDetailTrackingId = bookingEventItemDetailTrackingId;
            obj.BookingEventItemDetailId = e.record.data.BookingEventItemDetailId;
            obj.StartTime = newTime;
            obj.DiscountValue = e.record.data.Reduction;
            obj.Price = e.record.data.Price;
            obj.DisplayPrice = e.record.data.Price;
            obj.EndTime = endTime;
            obj.GroupName = e.record.data.GroupName;
            obj.BarId = e.record.data.BarId;
            obj.Quantity = e.record.data.Quantity;
            obj.ServedQuantity = e.record.data.ServedQuantity;
            obj.ItemGroupId = e.record.data.ItemGroupId;
            obj.CreatedBy = CurrentSessionUserId;
            obj.ItemId = e.record.data.ItemId;
            obj.IsRoomRent = e.record.data.IsRoomRent;
            obj.PartOfPackage = e.record.data.PartOfPackage;
            obj._ItemGroupId = e.record.data._ItemGroupId;
            obj.ItemEditable = e.record.data.ItemEditable;
            obj.IsMainEvent = this.IsMainEvent;
            obj.IsCanceled = e.record.data.IsCanceled;

            if (reductionValue > obj.Price) {
                e.record.data.Reduction = reductionBefore;
                Ext.Msg.alert('Error', 'Reduction bigger than price'.l('SC54000'));
                editor.grid.getStore().reload();
                return;
            }
            // if (Utils.isValid(this.BookingTrackingId)) {
            //            if (this.BookingTrackingId > 0) {
            //                obj.BookingId = 0;
            //                obj.BookingTrackingId = this.BookingTrackingId;
            //            }
            //            else if (this.BookingId > 0) {
            //                obj.BookingId = this.BookingId;
            //                obj.BookingTrackingId = 0;
            //            }

            if (this.BookingTrackingId <= 0 && this.BookingId <= 0) {
                Ext.Msg.alert('Error', 'Booking tracking id or booking id missing'.l('SC54000'));
                editor.grid.getStore().reload();
                return;
            }

            obj.BookingId = this.BookingId > 0 ? this.BookingId : 0;
            obj.BookingTrackingId = this.BookingTrackingId > 0 ? this.BookingTrackingId : 0;
            obj.BookingEventTrackingId = e.record.data.BookingEventTrackingId;
            obj.BookingEventId = e.record.data.BookingEventId;
            var item = true;
            if (Utils.isValid(obj.ItemGroupId)) {
                item = false;
            }

            /*if group then pass itemgroupname or pass item name*/
            if (item == true) {
                obj.ItemName = e.record.data.ItemName;
            }
            else
                obj.ItemGroupName = e.record.data.ItemName;

            if (Utils.isValid(obj._ItemGroupId)) { item = true; obj.ItemGroupId = obj._ItemGroupId; obj.DiscountPercentage = null; }
            var startDate = new Date(new Date().toDateString() + ' ' + obj.StartTime);
            var endDate = new Date(new Date().toDateString() + ' ' + obj.EndTime);
            if (obj.StartTime > obj.EndTime) {
                endDate.setDate(endDate.getDate() + 1);
            }
            if (((endDate - startDate) / 1000 / 60) > 1439) {
                Ext.Msg.alert('Error', 'End date is before start'.l('SC54000'));
                editor.grid.getStore().reload();
                return;
            }
            //            if (startDate >= endDate) {
            //                Ext.Msg.alert('Error', 'End date is before start'.l('SC54000'));
            //                editor.grid.getStore().reload();
            //                return;
            //            }

            //User changed the percentage
            // if (percentageBefore != reductionPercentageValue){
            if (reductionPercentageValue != '' && reductionPercentageValue != null && reductionPercentageValue >= 0) {
                var value = (reductionPercentageValue * obj.Price) / 100;
                obj.DiscountValue = value;
                obj.DiscountPercentage = reductionPercentageValue;
                e.record.data.Reduction = value;
                if (value == null) { value = 0; }
                e.record.data.TotalPrice = (obj.Price - value) * obj.Quantity;

            } else {
                if (reductionBefore != reductionValue) { //User changed reduction
                    //                    var percentage = ((reductionValue * 100) / (obj.Price * obj.Quantity)).toFixed(2);
                    //                    e.record.data.ReductionPercentage = percentage;
                    obj.DiscountValue = reductionValue;
                    obj.DiscountPercentage = null;
                    e.record.data.ReductionPercentage = null;
                    e.record.data.Reduction = reductionValue;
                    if (value == null) { value = 0; }
                    e.record.data.TotalPrice = (obj.Price - value) * obj.Quantity;
                }
                else if (Utils.isValid(obj._ItemGroupId)) {
                    // if Discount amount is not changed then we should retain the origional discount percentage of item group 
                    // So get percentage of parent node
                    if (e.record.parentNode != null && e.record.parentNode.data != null && e.record.parentNode.data.ItemId != null && e.record.parentNode.data.ItemId != '') {
                        reductionPercentageValue = e.record.parentNode.data.ReductionPercentage;
                    }

                    obj.DiscountPercentage = reductionPercentageValue;
                }
            }

            if (selectedPrice != null && parseInt(selectedPrice).toString() == 'NaN' && selectedPrice.indexOf(':') > 0) {
                obj.BarName = selectedPrice.split(':')[0].trim();
                //obj.Price = selectedPrice.split(':')[1].trim();
                obj.DisplayPrice = selectedPrice.split(':')[1].trim();
            }
            else if (selectedPrice != null && parseInt(selectedPrice)) {
                obj.DisplayPrice = selectedPrice;
            }

            obj.DetailIds = e.record.data.DetailIds
            obj.TrackingIds = e.record.data.TrackingIds

            if (e.record.parentNode != null && e.record.parentNode.data != null && e.record.parentNode.data.ItemId != null && e.record.parentNode.data.ItemId != '') {

                obj.BookingEventId = e.record.parentNode.data.BookingEventId;
                obj.BookingEventTrackingId = e.record.parentNode.data.BookingEventTrackingId;

                obj.DetailIds = e.record.parentNode.data.DetailIds;
                obj.TrackingIds = e.record.parentNode.data.TrackingIds;
            }

            log('Obj is', obj);

            if (!e.record.data.IsRoomRent) {
                var eventStartTime = e.record.data.EventStartTime;
                var eventEndTime = e.record.data.EventEndTime;
                var itemStartTime = e.record.data.StartTimeHHMM;
                var itemEndTime = e.record.data.EndTimeHHMM;

                startDate = new Date(new Date().toDateString() + ' ' + e.record.data.EventStartTime);
                endDate = new Date(new Date().toDateString() + ' ' + e.record.data.EventEndTime);
                if (e.record.data.EventStartTime > e.record.data.EventEndTime) {
                    endDate.setDate(endDate.getDate() + 1);
                }
                if (((endDate - startDate) / 1000 / 60) > 1439) {
                    Ext.Msg.alert('Error', 'End date is before start'.l('SC54000'));
                    editor.grid.getStore().reload();
                    return;
                }

                var ItemstartDate = new Date(new Date().toDateString() + ' ' + e.record.data.StartTimeHHMM);
                var ItemendDate = new Date(new Date().toDateString() + ' ' + e.record.data.EndTimeHHMM);
                if (ItemstartDate > ItemendDate) {
                    ItemendDate.setDate(ItemendDate.getDate() + 1);
                }

                if (Utils.isValid(startDate)) {
                    if (Utils.isValid(ItemstartDate)) {

                        if (startDate > ItemstartDate) {
                            Ext.Msg.alert('Error'.l('g'), "Please enter time within event time range".l('SC54000'));
                            editor.grid.getStore().reload();
                            return;
                        }
                        if (Utils.isValid(endDate)) {
                            if (endDate < ItemstartDate) {
                                Ext.Msg.alert('Error'.l('g'), "Please enter time within event time range".l('SC54000'));
                                editor.grid.getStore().reload();
                                return;
                            }
                        }
                    }
                } else
                    obj.StartTime = null;
                //Validate EndTime
                if (Utils.isValid(endDate)) {
                    if (Utils.isValid(ItemendDate)) {
                        if (endDate < ItemendDate) {
                            Ext.Msg.alert('Error'.l('g'), "Please enter time within event time range".l('SC54000'));
                            editor.grid.getStore().reload();
                            return;
                        }

                        if (Utils.isValid(startDate)) {
                            if (startDate > ItemendDate) {
                                Ext.Msg.alert('Error'.l('g'), "Please enter time within event time range".l('SC54000'));
                                editor.grid.getStore().reload();
                                return;
                            }
                        }
                    }
                } else
                    obj.EndTime = null;




                //                  //Validate StartTime
                //                if (Utils.isValid(eventStartTime)) {
                //                    if (Utils.isValid(itemStartTime)) {
                //                        if (eventStartTime.indexOf(':') > 0) eventStartTime = parseInt(eventStartTime.replace(":", ""));
                //                        if (itemStartTime.indexOf(':') > 0) itemStartTime = parseInt(itemStartTime.replace(":", ""));

                //                        if (eventStartTime > itemStartTime) {
                //                            Ext.Msg.alert('Error'.l('g'), "Please enter time within event time range".l('SC54000'));
                //                            editor.grid.getStore().reload();
                //                            return;
                //                        }

                //                        if (Utils.isValid(eventEndTime)) {
                //                            if (eventEndTime.indexOf(':') > 0) eventEndTime = parseInt(eventEndTime.replace(":", ""))

                //                            if (eventEndTime < itemStartTime) {
                //                                Ext.Msg.alert('Error'.l('g'), "Please enter time within event time range".l('SC54000'));
                //                                editor.grid.getStore().reload();
                //                                return;
                //                            }
                //                        }
                //                    }
                //                } else
                //                    obj.StartTime = null;

                //                //Validate EndTime
                //                if (Utils.isValid(eventEndTime)) {
                //                    if (Utils.isValid(itemEndTime)) {
                //                        if (eventEndTime.toString().indexOf(':') > 0) eventEndTime = parseInt(eventEndTime.toString().replace(":", ""));
                //                        if (itemEndTime.indexOf(':') > 0) itemEndTime = parseInt(itemEndTime.replace(":", ""));

                //                        if (eventEndTime < itemEndTime) {
                //                            Ext.Msg.alert('Error'.l('g'), "Please enter time within event time range".l('SC54000'));
                //                            editor.grid.getStore().reload();
                //                            return;
                //                        }

                //                        if (Utils.isValid(eventStartTime)) {
                //                            if (eventStartTime.toString().indexOf(':') > 0) eventStartTime = parseInt(eventStartTime.toString().replace(":", ""))

                //                            if (eventStartTime > itemEndTime) {
                //                                Ext.Msg.alert('Error'.l('g'), "Please enter time within event time range".l('SC54000'));
                //                                editor.grid.getStore().reload();
                //                                return;
                //                            }
                //                        }
                //                    }
                //                } else
                //                    obj.EndTime = null;
            }

            $.get(updateTimeApi, { obj: obj, isItem: item, isConfirmed: false },
                function (response) {
                    if (response.success == true) {
                        if (response.confirm == true) {
                            var MSGResult = response.result
                            var cCost = 0;
                            var cPer = 0;
                            if (typeof (response.CancelPer) != "undefined") {
                                cPer = response.CancelPer;
                            }
                            if (typeof (response.CancelCost) != "undefined") {
                                cCost = response.CancelCost;
                            }
                            cCost = "€ " + Ext.util.Format.number(cCost, '0,000.00');
                            if (MSGResult.substring(0, 4) == "SPC_") {
                                MSGResult = response.result.l("SP_DynamicCode", cCost, cPer);
                            }

                            Ext.Msg.confirm('Success'.l('g'), MSGResult,
                             function (btn) {
                                 if (btn === 'yes') {
                                     $.get(updateTimeApi, { obj: obj, isItem: item, isConfirmed: true },
                                        function (response) {

                                            var newBookingTrackingid = response.BookingTrackingid;
                                            if (newBookingTrackingid > 0) {
                                                obj.BookingTrackingId = response.BookingTrackingid;
                                                Utils.UpdateStepFourDataFromRowEdit(newBookingTrackingid);
                                            }
                                            editor.grid.getStore().reload();
                                            Utils.LoadBookingInformationForRightPane(obj.BookingId, newBookingTrackingid > 0 ? newBookingTrackingid : obj.BookingTrackingId, user_language);
                                        })
                                 } else {
                                     editor.grid.getStore().reload();
                                 }
                             });
                        }
                        else {
                            var newBookingTrackingid = response.BookingTrackingid;
                            if (newBookingTrackingid > 0) {
                                obj.BookingTrackingId = response.BookingTrackingid;
                                Utils.UpdateStepFourDataFromRowEdit(newBookingTrackingid);
                            }
                            editor.grid.getStore().reload();
                            Utils.LoadBookingInformationForRightPane(obj.BookingId, newBookingTrackingid > 0 ? newBookingTrackingid : obj.BookingTrackingId, user_language);
                        }
                    }
                    else {
                        if (response.data.substring(0, 4) == "SPC_") {
                            Ext.Msg.alert('Error'.l('g'), response.data.l("SP_DynamicCode"));
                        }
                        else {
                            Ext.Msg.alert('Error'.l('g'), response.data);
                        }
                    }
                });
        },
        beforeedit: function (editor, e, eOpts) {

            /* Based on depth disable fields */
            var depth = e.record.data.depth;

            if (e.record.data.IsCanceled == true) {
                this.disableAllField(editor, e);

                if (e.record.data.ItemGroupId > 0) { //groupitem:root
                    this.enableField(editor, 6, e); //%                    
                }
                else if (e.record.data._ItemGroupId > 0) { //childitems of the group
                    this.enableField(editor, 7, e); //price value
                }
                else { //children
                    this.enableField(editor, 7, e); //price value
                    this.enableField(editor, 6, e); //%
                }
                return true;
            }


            switch (depth) {
                case 2: // Children

                    /* Enable all fields */
                    this.enableAllFields(editor, e);

                    /* Function params: editor, colIdx, e */

                    /* Disable price for childrens  colIdx = 3 */
                    this.disableField(editor, 3, e);
                    /* Disable quantity for childrens  colIdx = 4 */
                    this.disableField(editor, 4, e);

                    /* Disable percentage for childrens colIdx = 4*/
                    //  this.disableField(editor, 4, e); comment was right but percentage colIdx wrong. by PratikV
                    //  this.disableField(editor, 6, e); 

                    /* Disable startime for childrens  colIdx = 1 */
                    this.disableField(editor, 1, e);
                    /* Disable endtime for childrens  colIdx = 2 */
                    this.disableField(editor, 2, e);
                    /* Disable groupname for childrens  colIdx = 8 */
                    this.disableField(editor, 8, e);
                    /* Disable endtime for childrens  colIdx = 8 */
                    //                    if (!e.record.data.IsEndtimeRequire && e.record.data.IsRoomRent == 0) {
                    //                        this.disableField(editor, 8, e);
                    //}

                    break;
                case 1: // Root
                    var itemGroupId = e.record.data.ItemGroupId;

                    this.enableAllFields(editor, e);

                    if (itemGroupId > 0) { //Editing itemgroup row

                        /* Disable reduction amount for childrens colIdx = 5 */
                        //this.disableField(editor, 7, e);

                        /* Disable endtime for childrens  colIdx = 8*/
                        if (!e.record.data.IsEndtimeRequire) {
                            this.disableField(editor, 2, e);
                        }

                        this.disableField(editor, 3, e);

                    } else { //Editing item row
                        /* Disable endtime for childrens  colIdx = 8 */
                        if (!e.record.data.IsEndtimeRequire && e.record.data.IsRoomRent == 0) {
                            this.disableField(editor, 2, e);
                        }
                    }

                    break;
                default:

            }

            if (e.record.data.IsRoomRent == true) {
                this.disableAllField(editor, e);
                if (this.IsMainEvent == true) {
                    /* enableField dis % for childrens  colIdx = 6 */
                    this.enableField(editor, 6, e);
                    /* enableField dis val for childrens  colIdx = 7 */
                    this.enableField(editor, 7, e);
                }
                else {
                    if (this.disableSharable == false) {
                        /* enableField startime for childrens  colIdx = 1 */
                        this.enableField(editor, 1, e);
                        /* enableField endtime for childrens  colIdx = 2 */
                        this.enableField(editor, 2, e);
                    }
                    if (e.record.data.Price > 0) {
                        /* enableField dis % for childrens  colIdx = 6 */
                        this.enableField(editor, 6, e);
                        /* enableField dis val for childrens  colIdx = 7 */
                        this.enableField(editor, 7, e);
                    }
                }
            }



            /*If itemgroupid > 0 then group, else item*/
            /*depth > 1 condition added, as this disable should not apply which items are at root
            It should only apply when this item is child of parent itemgroup
            */
            if (e.record.data.ItemId > 0 && depth > 1) {
                this.disableField(editor, 6, e); //Item then red amount enable and % disable
                this.enableField(editor, 7, e);
            }
            else if (e.record.data.ItemGroupId > 0) {
                this.disableField(editor, 7, e); //ItemGroup then red % enable and amount disable
            }

            var qunatity = e.record.data.Quantity;
            if (!Utils.isValid(qunatity)) {

                this.disableField(editor, 4, e);
            }
            var served = e.record.data.ServedQuantity;
            if (!Utils.isValid(served)) {

                this.disableField(editor, 5, e);
            }

            /*KB: uncomment this: Itemgroup price logic to set disable price field or not*/
       //     if (e.record.data.ItemGroupItemEditable == true && depth > 1) {
        //        this.enableField(editor, 3, e);
       //     }
            /*end of itemgroup logic*/

            percentageBefore = e.record.data.ReductionPercentage;
            reductionBefore = e.record.data.Reduction;
            barIdBefore = e.record.data.BarId;

            var bid = this.BookingId;
            if (!Utils.isValid(bid)) {
                bid = 0;
            }

            var btid = this.BookingTrackingId;
            var store = Ext.getStore('bookingwizard.ItemPriceBarStore');
            store.proxy.setExtraParam('id', bid);
            store.proxy.setExtraParam('id1', btid);
            var itemID = e.record.data.ItemId;

            if (Utils.isValid(itemID)) {
                store.proxy.setExtraParam('id2', itemID);
            } else {
                store.proxy.setExtraParam('id2', 0);
            }
            var itemGroupId = e.record.data.ItemGroupId;
            if (Utils.isValid(itemGroupId)) {
                store.proxy.setExtraParam('id3', itemGroupId);
            } else
                store.proxy.setExtraParam('id3', 0);

                /*KB uncomment it for groupprice 0*/
         //   if (e.record.data.ItemGroupItemEditable == true && depth > 1) {
                store.load({
                    callback: function () {
                        // language based price format
                        for (var i = 0; i < this.data.items.length; i++) {
                            var tempText = this.data.items[i].data.FormattedText;
                            tempText = tempText.replace(",", "#");
                            tempText = tempText.replace(".", Ext.util.Format.decimalSeparator);
                            tempText = tempText.replace("#", Ext.util.Format.thousandSeparator);
                            this.data.items[i].data.FormattedText = tempText;
                        }

                        barName = Ext.util.Format.number(e.record.data.Price, '0,000.00');
                        var barprice = editor.grid.columns[3].getEditor(e.record, e);
                        barprice.setRawValue(barName);
                    }
                });
         //   }

            if (e.record.data.ItemEditable == false) {
                //    Ext.Msg.alert('Error', 'Cannot edit part of package');
                /*PV: commented-- Because of this line, all above condition has no any effect*/
                // this.enableAllFields(editor, e); 
                this.disableField(editor, 3, e); //Disable price
                this.disableField(editor, 5, e); //Disable unit
                this.disableField(editor, 4, e); //Disable person
            }


            if (!e.record.data.IsRoomRent) {
                var eventStartTime = e.record.data.EventStartTime;
                var eventEndTime = e.record.data.EventEndTime;

                if (eventStartTime != null && eventStartTime != undefined && eventStartTime.toString().indexOf(':') >= 0) {
                    var shour = parseInt(eventStartTime.split(':')[0].trim());
                    var sminute = parseInt(eventStartTime.split(':')[1].trim());

                    var ehour = 23;
                    var eminute = 55;

                    if (eventEndTime != null && eventEndTime != undefined && eventEndTime.toString().indexOf(':') >= 0) {
                        ehour = parseInt(eventEndTime.split(':')[0].trim());
                        eminute = parseInt(eventEndTime.split(':')[1].trim());
                    }

                    var hoursArrayEST = new Array();
                    var hoursArrayEET = new Array();

                    var isStartTime = false, isEndTime = false;
                    if (shour > ehour) {
                        var hoursArray = new Array();
                        for (var i = 0; i <= 23; i++) {
                            for (var j = 0; j <= 55; ) {
                                var mint = 0;
                                mint = mint + j;
                                if (j == 0 || j == 5) {
                                    mint = '0' + mint;
                                }
                                if (i < 10) {
                                    hoursArray.push(['0' + i + ':' + mint, '0' + i + ':' + mint]);
                                    //hoursArray.push(['0' + i + ':05', '0' + i + ':05']);
                                } else {
                                    hoursArray.push([i + ':' + mint, i + ':' + mint]);
                                    //hoursArray.push([i + ':05', i + ':05']);
                                }
                                j = j + 5;
                            }
                        }

                        var storeST = editor.grid.columns[1].getEditor(e.record, e).getStore();
                        storeST.loadData(hoursArray);

                        var storeET = editor.grid.columns[2].getEditor(e.record, e).getStore();
                        storeET.loadData(hoursArray);

                    }
                    else {
                        for (var i = shour; i <= ehour; i++) {
                            for (var j = 0; j <= 55; j += 5) {
                                if (i == shour && j < sminute) continue; //continue upto startime - dont include before times
                                if (i == ehour && j == eminute) isEndTime = true;
                                if (i == ehour && j > eminute) break; //break after endtime

                                var mint = 0;
                                mint = mint + j;
                                if (j == 0 || j == 5) {
                                    mint = '0' + mint;
                                }

                                if (i < 10) {
                                    if (!isEndTime) hoursArrayEST.push(['0' + i + ':' + mint, '0' + i + ':' + mint]);
                                    if (isStartTime) hoursArrayEET.push(['0' + i + ':' + mint, '0' + i + ':' + mint]);
                                } else {
                                    if (!isEndTime) hoursArrayEST.push([i + ':' + mint, i + ':' + mint]);
                                    if (isStartTime) hoursArrayEET.push([i + ':' + mint, i + ':' + mint]);
                                }

                                isStartTime = true;
                            }
                        }

                        var storeST = editor.grid.columns[1].getEditor(e.record, e).getStore();
                        storeST.loadData(hoursArrayEST);

                        var storeET = editor.grid.columns[2].getEditor(e.record, e).getStore();
                        storeET.loadData(hoursArrayEET);
                    }
                }
            }
            else {
                var hoursArray = new Array();
                for (var i = 0; i <= 23; i++) {
                    for (var j = 0; j <= 55; ) {
                        var mint = 0;
                        mint = mint + j;
                        if (j == 0 || j == 5) {
                            mint = '0' + mint;
                        }
                        if (i < 10) {
                            hoursArray.push(['0' + i + ':' + mint, '0' + i + ':' + mint]);
                            //hoursArray.push(['0' + i + ':05', '0' + i + ':05']);
                        } else {
                            hoursArray.push([i + ':' + mint, i + ':' + mint]);
                            //hoursArray.push([i + ':05', i + ':05']);
                        }
                        j = j + 5;
                    }
                }

                var storeST = editor.grid.columns[1].getEditor(e.record, e).getStore();
                storeST.loadData(hoursArray);

                var storeET = editor.grid.columns[2].getEditor(e.record, e).getStore();
                storeET.loadData(hoursArray);

            }

            var barId = e.record.data.BarId;
            var barName = '';


        }
    },
    SecondAPICall: function (btn) {

        var myParams = Utils.StepFourObj.tmpObj.myParams;
        var urlItem = Utils.StepFourObj.tmpObj.urlItem;
        var beTrackingId = Utils.StepFourObj.tmpObj.beTrackingId
        var BookingEventId = Utils.StepFourObj.tmpObj.BookingEventId;
        Utils.StepFourObj.tmpObj = {};

        var localThis = this;
        //this.myParams.IsConfirmed = true;

        if (btn == "yes") {
            Ext.data.JsonP.request({
                url: urlItem,
                type: 'GET',
                params: myParams,
                //data: BIobj,                            
                success: function (response) {
                    if (response.success == true) {
                        /*Edit booking we have BookingEventID, and current booking we have bookingtrackingid*/
                        var storeitemid = (beTrackingId > 0) ? beTrackingId : BookingEventId;
                        var grid = Ext.ComponentQuery.query('[itemid=' + storeitemid + '_grid]')[0];
                        var localStore = Ext.create('Regardz.store.bookingwizard.BookingTrackingItemsListStore');
                        localStore.proxy.setExtraParam('id', BookingEventId);
                        localStore.proxy.setExtraParam('id1', beTrackingId);
                        localStore.proxy.setExtraParam('languageId', user_language);
                        localStore.load();
                        grid.getStore().load(localStore);
                        localThis.myParams = null;
                        localThis.urlItem = null;
                        localThis.beTrackingId = null;
                        localThis.BookingEventId = null;

                    } else {
                        if (response.data.substring(0, 4) == "SPC_") {
                            Ext.Msg.alert('Error'.l('g'), response.data.l("SP_DynamicCode"));
                        }
                        else {
                            Ext.Msg.alert('Error'.l('g'), response.data);
                        }
                        return false;
                    }
                }
            })
        }
        else {
            //not do anything on cancel button
        }
    },
    itemMenuRender: function (value, metadata, record, rowIndex, colIndex, store) {
        if (record.raw.ItemGroupId == null) {
            return "";
        }
        else {
            metadata.css = metadata.css + ' icon-document';
            var tooltipText = "Edit menu".l('SC54300');
            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        }
    },
    dateRender: function (value, metadata, record, rowIndex, colIndex, store) {
        log("record", record);
        if (colIndex == 1) {
            if (record.data.StartTime != null)
                return Ext.Date.format(new Date(record.data.StartTime), 'g:i');
        }
    },
    priceRenderer: function (val, metadata, record) {
        return Ext.util.Format.number(record.data.Price, '0,000.00');
    },
    totalPriceRenderer: function (val, metadata, record) {
        return Ext.util.Format.number(record.data.TotalPrice, '0,000.00');
    },
    reductionRenderer: function (val, metadata, record) {
        return Ext.util.Format.number(record.data.Reduction, '0,000.00');
    },
    iconsRenderer: function (value, metaData, record, row, col, store, gridView) {
        if (record.data.IsRoomRent == true) {
            log('record.data.IsRoomRent', record.data.IsRoomRent);
            return "";
        }
        else if (record.data.IsCanceled == true) {
            return;
        }
        else {
            if (col == 11) {
                if (!record.data.Leaf) {
                    metaData.css = metaData.css + ' icon-delete-item ';
                    var tooltipText = "Delete item".l('SC54300');
                    metaData.tdAttr = 'data-qtip="' + tooltipText + '"';
                }
            }
            if (col == 12) {
                if (!record.data.Leaf) {
                    metaData.css = metaData.css + ' icon-documentadd ';
                    var tooltipText = "Add/Edit item remark".l('SC54300');
                    metaData.tdAttr = 'data-qtip="' + tooltipText + '"';
                }
            }
        }

    },
    disableField: function (editor, colIdx, e) {
        editor.grid.columns[colIdx].getEditor(e.record, e).setDisabled(true);

    },
    enableField: function (editor, colIdx, e) {
        editor.grid.columns[colIdx].getEditor(e.record, e).setDisabled(false);

    },
    enableAllFields: function (editor, e) {
        var length = editor.grid.columns.length;
        for (var i = 0; i < length; i++) {
            editor.grid.columns[i].getEditor(e.record, e).setDisabled(false);
        }

    },
    disableAllField: function (editor, e) {
        var length = editor.grid.columns.length;
        for (var i = 0; i < length; i++) {
            editor.grid.columns[i].getEditor(e.record, e).setDisabled(true);
        }

    }
});
var percentageBefore = 0; reductionBefore = 0; barIdBefore = 0;
