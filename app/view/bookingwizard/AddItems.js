Ext.namespace("Ext.ux");

Ext.require([
    'Regardz.view.common.ExpandedRow'
]);
Ext.define('Regardz.view.bookingwizard.AddItems', {
    extend: 'Ext.window.Window',
    alias: 'widget.additems',
    modal: true,
    border: false,
    title: 'Add New Items_Title'.l('SC54300'),
    bookingEventTrackingId: null,
    bookingTrackingId: null,
    BookingId: null,
    //BarId: null,
    bookingEventId: null,
    EventId: null,
    fixedPriceId: null,
    id: 'idAddItems',
    itemid: 'additemswindow',
    width: '85%',
    height: parseInt(Ext.getBody().getViewSize().height * (0.60)),
    initComponent: function () {

        var me = this;
        me.departmentStore = Ext.data.StoreManager.lookup('configuration.ItemCategoryStore');
        var hoursArray = new Array();
        //        for (var i = 8; i <= 22; i++) {
        //            if (i < 10) {
        //                hoursArray.push(['0' + i + ':00', '0' + i + ':00:00']);
        //                hoursArray.push(['0' + i + ':30', '0' + i + ':30:00']);
        //            } else {
        //                hoursArray.push([i + ':00', i + ':00:00']);
        //                hoursArray.push([i + ':30', i + ':30:00']);
        //            }
        //        }
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
            value: '08:00:00',
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
        //        me.itemPriceCombo = Ext.create('Ext.form.field.ComboBox', {
        //            displayField: 'FormattedText',
        //            valueField: 'BarId',
        //            itemid: 'itemPriceCombo',
        //            width: 100,
        //            store: Ext.getStore('bookingwizard.ItemPriceBarStore')

        //        });
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });

        me.itemid = 'setnewitems';
        var comboTypes = {
            xtype: 'combo',
            name: 'ItemCategoryId',
            itemid: 'itemcategorycomboid',
            displayField: 'ItemCategoryName',
            valueField: 'ItemCategoryId',
            store: me.departmentStore,
            listeners: {
                afterrender: function (combo) {
                    combo.getStore().on('load', function (store) {
                        var theStore = Ext.data.StoreManager.lookup('configuration.ItemCategoryStore');
                        if (theStore.data.length == 0) {
                            theStore.load();
                            me.reloadStore(me, '1');
                        }
                        else {
                            var recordSelected = theStore.getAt(0);
                            log("recordSelected", recordSelected);
                            var valueSelected = recordSelected.get('ItemCategoryId');
                            log("valueSelected", valueSelected);
                            log("combo", combo);
                            combo.store = theStore;
                            combo.setValue(valueSelected);
                            me.reloadStore(me, '1');
                        }
                    });
                    combo.getStore().load();
                },

                select: function (combo, newValue, oldValue) {
                    me.reloadStore(me, '1');
                }
            }
        };
        var checkboxFiltering = {
            xtype: 'checkbox',
            itemid: 'showeventrelatedid',
            margin: 5,
            boxLabel: 'Show Event related items'.l('SC54300'),
            checked: true,
            listeners: {
                change: function (ev) {
                    me.reloadStore(me);
                }
            }
        };
        var filterText = Ext.create('Ext.form.TextField', {
            xtype: 'textfield',
            name: 'filterAddItems',
            itemid: 'fieldAddItems',
            emptyText: 'Filter'.l("g"),
            selectOnFocus: true,
            listeners:
                {
                    specialkey: function (t, eventObject) {
                        if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                            if (t.getValue().length > 0) {
                                var clearIcon = Ext.ComponentQuery.query('[action="clearAddItemsFilter"]')[0];
                                clearIcon.show();
                            }
                            me.reloadStore(me, '1');
                        }
                    }
                }
        });
        var buttonSearch = Ext.create('Ext.Button', {
            scale: 'small',
            action: 'filterAddItems',
            itemid: 'buttonAddItemsFilter',
            iconCls: 'search-icon',
            width: 20,
            iconAlign: 'left',
            listeners: {
                click: function () {
                    var value = Ext.ComponentQuery.query('textfield[name="filterAddItems"]');
                    var comp = Utils.getFirstComp(value);
                    log('value', value);
                    if (value.length > 0) {
                        var clearIcon = Ext.ComponentQuery.query('[action="clearAddItemsFilter"]')[0];
                        clearIcon.show();
                    }
                    me.reloadStore(me);
                }
            }
        });
        var clearButton = {
            xtype: 'button',
            iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
            action: 'clearAddItemsFilter',
            hidden: true,
            listeners:
                {
                    click: function () {
                        var value = Ext.ComponentQuery.query('textfield[name="filterAddItems"]');
                        var comp = Utils.getFirstComp(value);
                        comp.setValue('');
                        var clearIcon = Ext.ComponentQuery.query('[action="clearAddItemsFilter"]')[0];
                        clearIcon.hide();
                        me.reloadStore(me);
                    }
                }
        };
        var closeButton = Ext.create('Ext.Button', {
            text: 'Close'.l('g'),
            margin: 10,
            style: 'float:right',
            listeners:
                {
                    click: function () {
                        me.close();
                    }
                }
        });

        var gridPanel = new Ext.grid.GridPanel({
            extend: 'Ext.grid.Panel',
            title: 'Items'.l('SC54300'),
            padding: 10,
            width: '100%',
            //viewConfig: {
            //    forceFit: true
            //},            
            itemid: 'allItemsGrid',
            frame: false,
            autoScroll: true,
            //autoExpandColumn: 'ItemName',
            store: Ext.data.StoreManager.lookup('bookingwizard.BookingTrackingItemsListAllStore'),
            //initComponent: function () {
            //    this.features = [{ ftype: 'filters', encode: false, local: true }, { ftype: 'grouping' }];
            //},
            // tree-icon-itemgroup-add 
            //tree-icon-item-add
            plugins: [
                    rowEditing,
                    {
                        ptype: 'expandedrowitemgroup',
                        pluginId: 'expanderId',
                        rowBodyTpl: ['{ItemGroupDescription}']
                    }],
            columns: [
                { width: 16, sortable: false, renderer: this.addIconClassByType, align: 'center' },
                { header: 'Item'.l('SC54000'), width: '25%', flex: 2, sortable: true, dataIndex: 'ItemName' },
                { width: 16, height: 16, align: 'center', sortable: false, renderer: this.externalRentedRender }, //16
                {header: "Price".l('SC54300'), width: '8%', sortable: true, renderer: this.priceRenderer, dataIndex: 'Price', align: 'right', editor: new Ext.form.NumberField({}) }, //60
                {header: "Quantity".l('SC54300'), width: '8%', sortable: true, dataIndex: 'Quantity', name: 'quantity', editor: new Ext.form.NumberField({}), align: 'center' }, //60
                {header: "Red.%".l('SC54300'), width: '8%', sortable: true, dataIndex: 'ReductionPercentage', editor: new Ext.form.NumberField({ maxValue: 100, minValue: 0 }), align: 'center' }, //60
                {header: "Red.".l('SC54300'), width: '8%', sortable: true, dataIndex: 'Reduction', style: 'text-align:right', align: 'right', renderer: this.reductionRenderer, editor: new Ext.form.NumberField({}) },
                { header: "Total".l('SC54300'), width: '8%', sortable: true, align: 'right', dataIndex: 'TotalPrice', renderer: this.totalPriceRenderer },
                { header: "Start".l('SC54300'), width: '10%', sortable: true, dataIndex: 'StartTimeHHMM', editor: me.startTimeCombo, align: 'center' }, //80
                {header: "End".l('SC54300'), width: '10%', sortable: true, dataIndex: 'EndTimeHHMM', editor: me.endTimeCombo, align: 'center' }, //80
                {tdCls: 'selectItem', align: 'left', width: 18, name: 'ItemSelect', hideable: false}//16
            ],
            tbar: [
                comboTypes, checkboxFiltering, { xtype: 'tbfill' }, filterText, clearButton, buttonSearch
            ],
            bbar: [{
                xtype: 'pagingtoolbar',
                store: Ext.getStore('bookingwizard.BookingTrackingItemsListAllStore'),
                displayInfo: true,
                width: '100%',
                //emptyMsg: "No data to display".l('g')
                //displayMsg: 'Displaying topics {0} - {1} of {2}',
                emptyMsg: "No data to display".l('g')
            }],
            //buttons: [{
            //    text: 'Close'.l('w'),
            //    handler: function () {
            //        me.close();
            //    }
            //}],
            listeners: {
                edit: function (editor, e) {

                    log('Item group', e.record);

                    var selectedBar = e.record.data.BarId;

                    // var st = Ext.getStore('bookingwizard.ItemPriceBarStore');

                    //   var ind = st.findExact('BarId', selectedBar);

                    //                    var el = st.getAt(ind);
                    //                    try {

                    //                        e.record.data.BarId = selectedBar;
                    //                        e.record.data.Price = el.data.Price;
                    //                    } catch (e) {

                    //                    }

                    var bookingEventItemDetailTrackingId = e.record.data.BookingEventItemDetailTrackingId;
                    var newTime = e.record.data.StartTimeHHMM;
                    var endTime = e.record.data.EndTimeHHMM;
                    var reductionPercentageValue = e.record.data.ReductionPercentage;

                    var reductionValue = e.record.data.Reduction;
                    var updateTimeApi = webAPI_path + 'api/Booking/UpdateItemRowEditor';

                    var obj = {};
                    obj.BookingEventItemDetailTrackingId = bookingEventItemDetailTrackingId;
                    obj.BookingEventItemDetailId = e.record.data.BookingEventItemDetailId;
                    obj.StartTime = newTime;
                    obj.DiscountValue = e.record.data.Reduction;
                    obj.PartOfPackage = e.record.data.PartOfPackage;
                    obj.Price = e.record.data.Price;
                    //obj.DisplayPrice = e.record.data.Price;
                    obj.EndTime = endTime;
                    obj.GroupName = e.record.data.GroupName;
                    obj.BarId = selectedBar;
                    obj.Quantity = e.record.data.Quantity;
                    obj.ItemGroupId = e.record.data.ItemGroupId;
                    obj.BookingTrackingId = me.bookingTrackingId;
                    obj.BookingEventTrackingId = e.record.data.BookingEventTrackingId;
                    obj.BookingEventId = e.record.data.BookingEventId;
                    obj.PartOfPackage = e.record.data.PartOfPackage;
                    if (me.BookingId > 0)
                        obj.BookingId = me.BookingId;
                    var item = true;
                    if (Utils.isValid(obj.ItemGroupId)) {
                        item = false;
                    }
                    var startDate = new Date(new Date().toDateString() + ' ' + obj.StartTime);
                    var endDate = new Date(new Date().toDateString() + ' ' + obj.EndTime);
                    if (obj.StartTime > obj.EndTime) {
                        endDate.setDate(endDate.getDate() + 1);
                    }
                    if (((endDate - startDate) / 1000 / 60) > 1439) {
                        Ext.Msg.alert('Error'.l('g'), 'End date is before start'.l('SC54000'));
                        editor.grid.getStore().reload();
                        return;
                    }
                    //                    if (startDate >= endDate) {
                    //                        Ext.Msg.alert('Error', 'End date is before start'.l('SC54000'));
                    //                        editor.grid.getStore().reload();
                    //                        return;
                    //                    }

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
                            Ext.Msg.alert('Error'.l('g'), 'End date is before start'.l('SC54000'));
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


//                        //Validate StartTime
//                        if (Utils.isValid(eventStartTime)) {
//                            if (Utils.isValid(itemStartTime)) {
//                                if (eventStartTime.indexOf(':') > 0) eventStartTime = parseInt(eventStartTime.replace(":", ""));
//                                if (itemStartTime.indexOf(':') > 0) itemStartTime = parseInt(itemStartTime.replace(":", ""));

//                                if (eventStartTime > itemStartTime) {
//                                    Ext.Msg.alert('Error'.l('g'), "Please enter time within event time range".l('SC54000'));
//                                    editor.grid.getStore().reload();
//                                    return;
//                                }

//                                if (Utils.isValid(eventEndTime)) {
//                                    if (eventEndTime.indexOf(':') > 0) eventEndTime = parseInt(eventEndTime.replace(":", ""))

//                                    if (eventEndTime < itemStartTime) {
//                                        Ext.Msg.alert('Error'.l('g'), "Please enter time within event time range".l('SC54000'));
//                                        editor.grid.getStore().reload();
//                                        return;
//                                    }
//                                }
//                            }
//                        } else
//                            obj.StartTime = null;

//                        //Validate EndTime
//                        if (Utils.isValid(eventEndTime)) {
//                            if (Utils.isValid(itemEndTime)) {
//                                if (eventEndTime.toString().indexOf(':') > 0) eventEndTime = parseInt(eventEndTime.toString().replace(":", ""));
//                                if (itemEndTime.indexOf(':') > 0) itemEndTime = parseInt(itemEndTime.replace(":", ""));

//                                if (eventEndTime < itemEndTime) {
//                                    Ext.Msg.alert('Error'.l('g'), "Please enter time within event time range".l('SC54000'));
//                                    editor.grid.getStore().reload();
//                                    return;
//                                }

//                                if (Utils.isValid(eventStartTime)) {
//                                    if (eventStartTime.toString().indexOf(':') > 0) eventStartTime = parseInt(eventStartTime.toString().replace(":", ""))

//                                    if (eventStartTime > itemEndTime) {
//                                        Ext.Msg.alert('Error'.l('g'), "Please enter time within event time range".l('SC54000'));
//                                        editor.grid.getStore().reload();
//                                        return;
//                                    }
//                                }
//                            }
//                        } else
//                            obj.EndTime = null;
                    }

                    //User changed the percentage
                    //                    if (percentageBefore != reductionPercentageValue) {
                    //                        var value = (reductionPercentageValue * obj.Price) / 100;
                    //                        obj.DiscountValue = value;
                    //                        obj.DiscountPercentage = reductionPercentageValue;
                    //                        e.record.data.Reduction = value;
                    //                    } else {
                    //                        if (reductionBefore != reductionValue) { //User changed reduction
                    //                            var percentage = ((reductionValue * 100) / (obj.Price * obj.Quantity)).toFixed(2);
                    //                            e.record.data.ReductionPercentage = percentage;
                    //                        }
                    //                    }
                    if (reductionPercentageValue != '' && reductionPercentageValue != null && reductionPercentageValue >= 0) {
                        var value = (reductionPercentageValue * obj.Price) / 100;
                        obj.DiscountValue = value;
                        obj.DiscountPercentage = reductionPercentageValue;
                        e.record.data.ReductionPercentage = reductionPercentageValue;
                        e.record.data.Reduction = value;
                        e.record.data.DiscountPercentage = reductionPercentageValue;
                        e.record.data.Discount = value;
                        if (value == null) { value = 0; }
                        e.record.data.TotalPrice = (obj.Price - value) * obj.Quantity;
                    } else {
                        if (reductionBefore != reductionValue) {
                            //User changed reduction
                            var value = reductionValue;
                            obj.DiscountValue = reductionValue;
                            obj.DiscountPercentage = null;
                            e.record.data.ReductionPercentage = null;
                            e.record.data.Reduction = reductionValue;
                            e.record.data.DiscountPercentage = null;
                            e.record.data.Discount = reductionValue;
                            if (value == null) { value = 0; }
                            e.record.data.TotalPrice = (obj.Price - value) * obj.Quantity;
                        }
                    }
                    e.record.commit();
                    // e.record.data = obj;
                    Utils.LoadBookingInformationForRightPane(obj.BookingId, obj.BookingTrackingId, user_language);
                },
                beforeedit: function (editor, e, eOpts) {
                    log('Current record is', e.record);
                    if (e.record.data.PartOfPackage == true) {
                        alert('Cannot edit part of package'.l('SC54000'));
                        return false;
                    }

                    /* Based on depth disable fields */
                    var depth = e.record.data.depth;

                    depth = depth + 1;

                    switch (depth) {
                        case 2: // Children

                            /* Enable all fields */
                            me.enableAllFields(editor, e);

                            /* Function params: editor, colIdx, e */

                            /* Disable quantity for childrens  colIdx = 5 */
                            me.disableField(editor, 5, e);

                            /* Disable percentage for childrens colIdx = 6*/
                            me.disableField(editor, 6, e);

                            /* Disable startime for childrens  colIdx = 1 */
                            me.disableField(editor, 1, e);

                            /* Disable endtime for childrens  colIdx = 2 */
                            if (!e.record.data.IsEndtimeRequire) {
                                me.disableField(editor, 2, e);
                            }

                            /* Disable price for childrens  colIdx = 3 */
                            this.disableField(editor, 3, e);
                            this.disableField(editor, 4, e);
                            break;
                        case 1: // Root
                            var itemGroupId = e.record.data.ItemGroupId;
                            me.enableAllFields(editor, e);

                            if (Utils.isValid(itemGroupId)) { //Editing itemgroup row

                                /* Disable reduction amount for childrens colIdx = 7 */
                                me.disableField(editor, 7, e);

                                /* Disable endtime for childrens  colIdx = 2 */
                                if (!e.record.data.IsEndtimeRequire) {
                                    me.disableField(editor, 2, e);
                                }

                                me.disableField(editor, 4, e);
                            } else { //Editing item row
                                /* Disable endtime for childrens  colIdx = 2 */
                                if (!e.record.data.IsEndtimeRequire) {
                                    me.disableField(editor, 2, e);
                                }

                                var price = e.record.data.Price;
                                if (price == null || price == undefined || price == 0) {
                                } else {
                                    me.disableField(editor, 4, e);
                                }
                            }

                            break;
                        default:
                    }

                    percentageBefore = e.record.data.ReductionPercentage;
                    reductionBefore = e.record.data.Reduction;
                    //                    var store = Ext.getStore('bookingwizard.ItemPriceBarStore');
                    //                    store.proxy.setExtraParam('id', me.BookingId);
                    //                    store.proxy.setExtraParam('id1', me.bookingTrackingId);
                    //                    var itemID = e.record.data.ItemId;
                    //                    if (Utils.isValid(itemID)) {
                    //                        store.proxy.setExtraParam('id2', itemID);
                    //                    } else {
                    //                        store.proxy.setExtraParam('id2', 0);
                    //                    }
                    //                    var itemGroupId = e.record.data.ItemGroupId;
                    //                    if (Utils.isValid(itemGroupId)) {
                    //                        store.proxy.setExtraParam('id3', itemGroupId);
                    //                    } else
                    //                        store.proxy.setExtraParam('id3', 0);
                    //                    store.load();

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

                                var storeST = editor.grid.columns[9].getEditor(e.record, e).getStore();
                                storeST.loadData(hoursArray);

                                var storeET = editor.grid.columns[10].getEditor(e.record, e).getStore();
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

                                var storeST = editor.grid.columns[9].getEditor(e.record, e).getStore();
                                storeST.loadData(hoursArrayEST);

                                var storeET = editor.grid.columns[10].getEditor(e.record, e).getStore();
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

                        var storeST = editor.grid.columns[9].getEditor(e.record, e).getStore();
                        storeST.loadData(hoursArray);

                        var storeET = editor.grid.columns[10].getEditor(e.record, e).getStore();
                        storeET.loadData(hoursArray);
                    }
                },
                //beforerender: function (grid) {
                //    var expander = grid.getPlugin('expanderId');
                //    expander.renderer = function (v, p, record) {
                //        alert(record);
                //        return record.get('ItemGroupId') != null ? '<div class="x-grid-row-expander">&#160;</div>' : '&#160;';
                //    };
                //},
                renderer: function (grid, p, record) {
                    log("grid render", grid);
                    log("record render", record);
                    if (record.get('ItemGroupId') != null) {
                        //return grid.replace('class="x-grid-row-expander">&#160;</div>', '');
                    }
                },
                afterrender: function (grid, p, record) {
                    log('Grid', grid);
                    //grid.headerCt.getGridColumns()[0].hide();
                    log("grid", grid);
                    log("p", p);
                    log("record", record);
                    var expander = grid.getPlugin('expanderId');
                    log("expander", expander);
                    //expander.renderer = function (v, p, record) {
                    //    alert(record);
                    //    return record.get('ItemGroupId') != null ? '<div class="x-grid-row-expander">&#160;</div>' : '&#160;';
                    //};
                    var columnId = expander.getHeaderId();
                    log("columnId", columnId);
                    //for (i = 0; i <= grid.getStore().getCount() ; i++) {
                    //    expander.expandRow(i);
                    //}
                    //if (grid.getPlugin('expanderId').cmp.columns.length < 5) {
                    //    Ext.getCmp(columnId).hide();
                    //}
                    //log("columnid", columnId);
                    //log("plugin", grid.getPlugin('expanderId'));
                    //renderer: function (v, p, record) {
                    //    alert(record);
                    //    return record.get('ItemGroupId') != null ? '<div class="x-grid-row-expander">&#160;</div>' : '&#160;';
                    //}
                },
                cellclick: function (gridView, htmlElement, columnIndex, dataRecord) {
                    if (columnIndex == 11) {
                        var dataObj = dataRecord.data;

                        if (Utils.isValid(dataObj.ItemGroupId && dataObj.ItemGroupId > 0)) {

                            var bookingEventTrackingId = me.bookingEventTrackingId;
                            var bookingEventId = me.bookingEventId;
                            var userId = CurrentSessionUserId;
                            var bookingId = me.BookingId;
                            var bookingTrackingId = me.bookingTrackingId

                            var urlItem = webAPI_path + 'api/booking/AddItemGroupToTrackingEvent';
                            var itemGroupMap = {};
                            itemGroupMap.BookingItem = dataObj;
                            itemGroupMap.BookingEventId = (bookingEventId > 0) ? bookingEventId : 0;
                            itemGroupMap.BookingEventTrackingId = (bookingEventTrackingId > 0) ? bookingEventTrackingId : 0;
                            itemGroupMap.BookingId = bookingId;
                            itemGroupMap.BookingTrackingId = bookingTrackingId;
                            itemGroupMap.UserId = userId;
                            itemGroupMap.DiscountPercentage = dataObj.DiscountPercentage;
                            itemGroupMap.Price = dataObj.NetPrice; //Gross price
                            itemGroupMap.DisplayPrice = dataObj.Price; //Net price
                            itemGroupMap.DiscountValue = dataObj.Reduction;
                            itemGroupMap.PartOfPackage = dataObj.PartOfPackage;

                            $.post(urlItem, itemGroupMap,
                                function (response) {
                                    log('response', response);
                                    var ResultText = response.Message;
                                    if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                        ResultText = ResultText.l("SP_DynamicCode");
                                    if (response.success) {
                                        var win = Ext.WindowManager.getActive();
                                        if (win) {
                                            win.close();
                                        }
                                        // alert("1-> " + response.newBTID);
                                        // me.bookingTrackingId = response.newBTID;
                                        /*Edit booking we have BookingEventID, and current booking we have bookingtrackingid*/
                                        var storeitemid = (me.bookingEventTrackingId > 0) ? me.bookingEventTrackingId : bookingEventId;

                                        var grid = Ext.ComponentQuery.query('[itemid=' + storeitemid + '_grid]')[0];
                                        var localStore = Ext.create('Regardz.store.bookingwizard.BookingTrackingItemsListStore');
                                        // localStore.proxy.setExtraParam('id', 0); // As DS instructions
                                        // localStore.proxy.setExtraParam('id1', me.bookingEventTrackingId);
                                        localStore.proxy.setExtraParam('id', itemGroupMap.BookingEventId); // As DS instructions
                                        localStore.proxy.setExtraParam('id1', itemGroupMap.BookingEventTrackingId);
                                        localStore.proxy.setExtraParam('languageId', user_language);
                                        localStore.load();
                                        grid.getStore().load(localStore);

                                        Utils.LoadBookingInformationForRightPane(me.BookingId, me.bookingTrackingId, user_language);

                                    } else {
                                        Ext.Msg.alert('Error'.l('g'), ResultText);
                                        return false;
                                    }
                                });
                        } else {

                            var itemObj = {};
                            log("dataObj", dataObj);
                            // itemObj.BookingEventItemDetailTrackingId = dataObj.ItemId;
                            itemObj.BookingEventTrackingId = (me.bookingEventTrackingId > 0) ? me.bookingEventTrackingId : 0;
                            itemObj.BookingEventItemDetailId = null;
                            itemObj.BookingEventId = (me.bookingEventId > 0) ? me.bookingEventId : 0;
                            itemObj.FixedPriceId = null;
                            itemObj.BarId = dataObj.BarId;
                            itemObj.ItemTypeId = dataObj.ItemTypeId;
                            itemObj.ItemId = dataObj.ItemId;
                            itemObj.OutletId = null;
                            itemObj.Price = dataObj.NetPrice; //Gross price
                            itemObj.DisplayPrice = dataObj.Price; // net price
                            itemObj.ItemName = dataObj.ItemName;
                            itemObj.GroupName = dataObj.GroupName;
                            itemObj.DiscountPercentage = dataObj.DiscountPercentage;
                            itemObj.BookingId = me.BookingId;
                            itemObj.GroupDescription = null;
                            itemObj.PartOfPackage = null;
                            itemObj.CreatedDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
                            itemObj.CreatedBy = CurrentSessionUserId;
                            itemObj.UpdatedDate = new Date();
                            itemObj.UpdatedBy = null;
                            itemObj.Quantity = dataObj.Quantity;
                            itemObj.IsBedRoomItem = dataObj.IsBedRoomItem;
                            log('IsSold', dataObj.IsSoldPerPerson);
                            if (!dataObj.IsSoldPerPerson) {
                                itemObj.ServedQuantity = dataObj.Quantity;
                            }

                            itemObj.StartTime = dataObj.StartTimeHHMM;
                            itemObj.EndTime = dataObj.EndTimeHHMM;
                            itemObj.ItemGroupId = dataObj.ItemGroupId;

                            if (Utils.isValid(itemObj.ItemGroupId) && itemObj.ItemGroupId != 0) {
                                itemObj.ItemGroupName = itemObj.ItemName;
                            }

                            itemObj.RoomRent = null;
                            itemObj.DiscountValue = dataObj.Reduction;
                            itemObj.PartOfPackage = dataObj.PartOfPackage;
                            itemObj.VatValue = dataObj.Vat;
                            itemObj.VatPercentage = dataObj.VatPercentage;
                            itemObj.ItemGroupQuantity = null;
                            itemObj.State = 1;
                            itemObj.RecordStatus = 1;
                            itemObj.ConfirmationOn = null;
                            itemObj.RAPBy = CurrentSessionUserId;
                            itemObj.ROPBy = null;

                            /*
                            if (itemObj.DisplayPrice != null && itemObj.DisplayPrice != undefined && itemObj.Price != itemObj.DisplayPrice) {
                            itemObj.Price = itemObj.DisplayPrice;
                            }
                            */

                            urlItem = webAPI_path + 'api/booking/AddItemToTrackingEvent';
                            log("itemObj", itemObj);
                            $.ajax({
                                url: urlItem,
                                type: 'POST',
                                data: itemObj,
                                success: function (form, response) {
                                    //var r = response.result;     
                                    if (response == "success") {
                                        var win = Ext.WindowManager.getActive();
                                        if (win) {
                                            win.close();
                                        }
                                        //alert("2-> " + form.newBTID);
                                        // me.bookingTrackingId = form.newBTID;
                                        var storeid = (me.bookingEventTrackingId > 0) ? me.bookingEventTrackingId : me.bookingEventId;

                                        var grid = Ext.ComponentQuery.query('[itemid=' + storeid + '_grid]')[0];
                                        var localStore = Ext.create('Regardz.store.bookingwizard.BookingTrackingItemsListStore');
                                        //localStore.proxy.setExtraParam('id', 0); // As DS instructions
                                        //localStore.proxy.setExtraParam('id1', me.bookingEventTrackingId);
                                        localStore.proxy.setExtraParam('id', itemObj.BookingEventId);
                                        localStore.proxy.setExtraParam('id1', itemObj.BookingEventTrackingId);
                                        localStore.proxy.setExtraParam('languageId', user_language);
                                        localStore.load();
                                        grid.getStore().load(localStore);

                                        Utils.LoadBookingInformationForRightPane(me.BookingId, me.bookingTrackingId, user_language);
                                    } else {
                                        Ext.Msg.alert('Error'.l('g'), response.Message);
                                        return false;
                                    }
                                },
                                failure: function (form, response) {

                                    Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));

                                    return false;
                                }
                            });
                        }
                    }
                }
            }
        });
        me.items = [gridPanel, closeButton];
        me.callParent(arguments);
    },
    checkboxrenderer: function (value, metadata, record, rowIdx, colIndex, store) {
        return '<input ' + (record.data.Checked == true ? 'checked=checked' : '') + ' type=checkbox name="rgrp' + this.body.id + '">';
    },
    reloadStore: function (me, loadPage1) {

        var combo = Ext.ComponentQuery.query('additems [itemid="itemcategorycomboid"]')[0];

        if (combo.getValue() != null) {
            var localStore = Ext.data.StoreManager.lookup('bookingwizard.BookingTrackingItemsListAllStore');
            //localStore.removeAll();
            var eventRelated = Ext.ComponentQuery.query('additems [itemid="showeventrelatedid"]')[0];
            log('eventRelated', eventRelated);
            var value = Ext.ComponentQuery.query('additems textfield[name="filterAddItems"]');
            var comp = Utils.getFirstComp(value);
            var eventId = 0;
            var bookingId = me.BookingId;
            if (!Utils.isValid(bookingId)) {
                bookingId = 0;
            }
            obj = new Object();
            obj.LanguageId = user_language;
            obj.BookingEventTrackingId = me.bookingEventTrackingId;
            obj.BookingTrackingId = me.bookingTrackingId;
            obj.BookingId = bookingId;
            obj.BookingEventId = me.bookingEventId;
            if (eventRelated.value) {
                eventId = me.EventId;
            }
            obj.eventId = eventId;

            obj.ItemCategoryId = (combo.getValue() > 0) ? combo.getValue() : 0;
            obj.priceType = 1;
            obj.FilterText = comp.value;
            obj.start = 0;
            obj.limit = 10;
            obj = Ext.encode(obj);

            localStore.proxy.setExtraParam('param', obj);
//            localStore.proxy.setExtraParam('limit', 10);

            if (loadPage1 != null && loadPage1 != undefined && loadPage1 == '1')
                localStore.loadPage(1);
            else
                localStore.load();
        }
    },
    loadItems: function (combo, me) {
        var localStore = Ext.data.StoreManager.lookup('bookingwizard.BookingTrackingItemsListAllStore');
        //localStore.removeAll();
        var bookingId = me.BookingId;
        if (!Utils.isValid(bookingId)) {
            bookingId = 0;
        }
        obj = new Object();
        obj.LanguageId = user_language;
        obj.BookingEventTrackingId = (me.bookingEventTrackingId > 0) ? me.bookingEventTrackingId : 0;
        obj.BookingTrackingId = (me.bookingTrackingId > 0) ? me.bookingTrackingId : 0;
        obj.BookingId = (bookingId > 0) ? bookingId : 0;
        obj.BookingEventId = (me.bookingEventId > 0) ? me.bookingEventId : 0;
        obj.eventId = 0;
        obj.ItemCategoryId = (combo.getValue() > 0) ? combo.getValue() : 0;
        obj.priceType = 1;
        obj.FilterText = '';
        obj.start = 0;
        obj.limit = 10;
        obj = Ext.encode(obj);
        localStore.proxy.setExtraParam('param', obj);
        localStore.load();
        log('localstore', localStore);
    },
    disableField: function (editor, colIdx, e) {
        editor.grid.columns[colIdx].getEditor(e.record, e).setDisabled(true);
    },
    enableAllFields: function (editor, e) {
        var length = editor.grid.columns.length;
        for (var i = 0; i < length; i++) {
            editor.grid.columns[i].getEditor(e.record, e).setDisabled(false);
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
    externalRentedRender: function (value, metadata, record, rowIndex, colIndex, store) {
        if (record.data.ExternalRented == true) {
            log("ExternalRented true", record.data.ExternalRented);
            metadata.tdCls = ' icon-info-blue ';
            var tooltipText = "Tooltip".l('SC54300');
            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';

        }
    },
    addIconClassByType: function (value, metadata, record, rowIndex, colIndex, store) {
        if (record.data.ItemGroupId != null) {
            metadata.tdCls = ' tree-icon-itemgroup-add ';
        }
        else {
            metadata.tdCls = ' tree-icon-item-add ';
        }
    }
});
