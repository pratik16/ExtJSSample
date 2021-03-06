/*

Ext Scheduler 2.1.15
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/license

*/
/**
* @class Sch.util.Patch
* @static
* Utility class for Ext JS patches
*/
Ext.define('Sch.util.Patch', {
    /**
    * @cfg {String} target The class name to override
    */
    target: null,

    /**
    * @cfg {String} minVersion The minimum Ext JS version for which this override is applicable. E.g. "4.0.5"
    */
    minVersion: null,

    /**
    * @cfg {String} maxVersion The minimum Ext JS version for which this override is applicable. E.g. "4.0.7"
    */
    maxVersion: null,

    /**
    * @cfg {String} reportUrl A url to the forum post describing the bug/issue in greater detail
    */
    reportUrl: null,

    /**
    * @cfg {String} description A brief description of why this override is required
    */
    description: null,

    /**
    * @cfg {Function} applyFn A function that will apply the patch(es) manually, instead of using 'overrides';
    */
    applyFn: null,

    /**
    * @cfg {Boolean} ieOnly true if patch is only applicable to IE
    */
    ieOnly: false,

    onClassExtended: function (cls, data) {

        if (Sch.disableOverrides) {
            return;
        }

        if (data.ieOnly && !Ext.isIE) {
            return;
        }

        if ((!data.minVersion || Ext.versions.extjs.equals(data.minVersion) || Ext.versions.extjs.isGreaterThan(data.minVersion)) &&
            (!data.maxVersion || Ext.versions.extjs.equals(data.maxVersion) || Ext.versions.extjs.isLessThan(data.maxVersion))) {
            if (data.applyFn) {
                // Custom override, implementor has full control
                data.applyFn();
            } else {
                // Simple case, just an Ext override
                data.requires[0].override(data.overrides);
            }
        }
    }
});

Ext.define('Sch.patches.LoadMask', {
    extend: "Sch.util.Patch",
    requires: ['Ext.view.AbstractView'],

    minVersion: "4.1.0b3",

    reportURL: 'http://www.sencha.com/forum/showthread.php?187700-4.1.0-B3-Ext.AbstractView-no-longer-binds-its-store-to-load-mask',
    description: 'In Ext4.1 loadmask no longer bind the store',

    overrides: {
        // @NICK REVIEW, breaks on incremental node loading
        //        bindStore : function (store, initial) {
        //                
        //            this.callParent(arguments);
        //            
        //            if (!this.loadMask || !this.loadMask.bindStore) {
        //                return;
        //            }
        //            
        //            if (store && Ext.Array.contains(store.alias, 'store.node')) {
        //                store = this.ownerCt.store;
        //            }
        //            
        //            this.loadMask.bindStore(store);
        //        }
    }
});

Ext.define('Sch.patches.Table', {
    extend: "Sch.util.Patch",
    requires: ['Ext.view.Table'],

    minVersion: "4.1.1",
    maxVersion: "4.1.1",

    reportURL: 'http://www.sencha.com/forum/showthread.php?238026-4.1.1-Alt-row-styling-lost-after-record-update&p=874190#post874190',

    description: 'In Ext4.1.1 when record is updated, the alternate row styling is lost',

    overrides: {
        onUpdate: function (store, record, operation, changedFieldNames) {
            var index = this.store.indexOf(record);
            this.callParent(arguments);
            this.doStripeRows(index, index);
        }
    }
});

// adds "providedStore" config option, which allows to have the same NodeStore both in the locked and normal parts of the grid
// code copied from 4.1.0 need to keep in sync
Ext.define('Sch.patches.TreeView', {
    extend: "Sch.util.Patch",
    requires: ['Ext.tree.View'],
    maxVersion: '4.1.3',   // Fixed in 4.1.3

    applyFn: function () {
        Ext.tree.View.addMembers({

            providedStore: null,

            initComponent: function () {
                var me = this,
                    treeStore = me.panel.getStore();

                if (me.initialConfig.animate === undefined) {
                    me.animate = Ext.enableFx;
                }

                // BEGIN OF MODIFICATIONS
                me.store = me.providedStore || new Ext.data.NodeStore({
                    treeStore: treeStore,
                    recursive: true,
                    rootVisible: me.rootVisible
                });

                me.store.on({
                    beforeexpand: me.onBeforeExpand,
                    expand: me.onExpand,
                    beforecollapse: me.onBeforeCollapse,
                    collapse: me.onCollapse,
                    write: me.onStoreWrite,
                    datachanged: me.onStoreDataChanged,
                    collapsestart: me.beginBulkUpdate,
                    collapsecomplete: me.endBulkUpdate,
                    scope: me
                });

                if (Ext.versions.extjs.isGreaterThanOrEqual('4.1.2')) {
                    me.mon(treeStore, {
                        scope: me,
                        beforefill: me.onBeforeFill,
                        fillcomplete: me.onFillComplete,
                        beforebulkremove: me.beginBulkUpdate,
                        bulkremovecomplete: me.endBulkUpdate
                    });

                    if (!treeStore.remoteSort) {
                        me.mon(treeStore, {
                            scope: me,
                            beforesort: me.onBeforeSort,
                            sort: me.onSort
                        });
                    }
                }
                if (me.node && !me.store.node) {
                    me.setRootNode(me.node);
                }
                // EOF MODIFICATIONS

                me.animQueue = {};
                me.animWraps = {};
                me.addEvents(
                /**
                * @event afteritemexpand
                * Fires after an item has been visually expanded and is visible in the tree. 
                * @param {Ext.data.NodeInterface} node         The node that was expanded
                * @param {Number} index                        The index of the node
                * @param {HTMLElement} item                    The HTML element for the node that was expanded
                */
                    'afteritemexpand',
                /**
                * @event afteritemcollapse
                * Fires after an item has been visually collapsed and is no longer visible in the tree. 
                * @param {Ext.data.NodeInterface} node         The node that was collapsed
                * @param {Number} index                        The index of the node
                * @param {HTMLElement} item                    The HTML element for the node that was collapsed
                */
                    'afteritemcollapse'
                );
                me.callParent(arguments);
                me.on({
                    element: 'el',
                    scope: me,
                    delegate: me.expanderSelector,
                    mouseover: me.onExpanderMouseOver,
                    mouseout: me.onExpanderMouseOut
                });
                me.on({
                    element: 'el',
                    scope: me,
                    delegate: me.checkboxSelector,
                    click: me.onCheckboxChange
                });
            }
        });
    }
});
Ext.define('Sch.patches.DataOperation', {
    extend: "Sch.util.Patch",
    requires: ['Ext.data.Operation'],

    reportURL: 'http://www.sencha.com/forum/showthread.php?198894-4.1-Ext.data.TreeStore-CRUD-regression.',
    description: 'In Ext 4.1.0 newly created records do not get the Id returned by server applied',

    maxVersion: '4.1.0',

    overrides: {
        commitRecords: function (serverRecords) {
            var me = this,
            mc, index, clientRecords, serverRec, clientRec, i, len;

            if (!me.actionSkipSyncRe.test(me.action)) {
                clientRecords = me.records;

                if (clientRecords && clientRecords.length) {
                    if (clientRecords.length > 1) {
                        // If this operation has multiple records, client records need to be matched up with server records
                        // so that any data returned from the server can be updated in the client records. If we don't have
                        // a clientIdProperty specified on the model and we've done a create, just assume the data is returned in order.
                        // If it's an update, the records should already have an id which should match what the server returns.
                        if (me.action == 'update' || clientRecords[0].clientIdProperty) {
                            mc = new Ext.util.MixedCollection();
                            mc.addAll(serverRecords);

                            for (index = clientRecords.length; index--; ) {
                                clientRec = clientRecords[index];
                                serverRec = mc.findBy(me.matchClientRec, clientRec);

                                // Replace client record data with server record data
                                clientRec.copyFrom(serverRec);
                            }
                        } else {
                            for (i = 0, len = clientRecords.length; i < len; ++i) {
                                clientRec = clientRecords[i];
                                serverRec = serverRecords[i];
                                if (clientRec && serverRec) {
                                    me.updateRecord(clientRec, serverRec);
                                }
                            }
                        }
                    } else {
                        // operation only has one record, so just match the first client record up with the first server record
                        this.updateRecord(clientRecords[0], serverRecords[0]);
                    }

                    if (me.actionCommitRecordsRe.test(me.action)) {
                        for (index = clientRecords.length; index--; ) {
                            clientRecords[index].commit();
                        }
                    }
                }
            }
        },

        updateRecord: function (clientRec, serverRec) {
            // if the client record is not a phantom, make sure the ids match before replacing the client data with server data.
            if (serverRec && (clientRec.phantom || clientRec.getId() === serverRec.getId())) {
                clientRec.copyFrom(serverRec);
            }
        }
    }
});
Ext.define('Sch.patches.TreeStore', {
    extend: "Sch.util.Patch",
    requires: ['Ext.data.TreeStore'],
    description: 'http://www.sencha.com/forum/showthread.php?208602-Model-s-Id-field-not-defined-after-sync-in-TreeStore-%28CRUD%29',
    maxVersion: '4.1.0',

    overrides: {
        onCreateRecords: function (records) {
            this.callParent(arguments);

            var i = 0,
                len = records.length,
                tree = this.tree,
                node;

            for (; i < len; ++i) {
                node = records[i];
                tree.onNodeIdChanged(node, null, node.getId());
            }
        },

        setRootNode: function (root, /* private */preventLoad) {
            var me = this,
            model = me.model,
            idProperty = model.prototype.idProperty;

            root = root || {};
            if (!root.isModel) {
                // create a default rootNode and create internal data struct.
                Ext.applyIf(root, {
                    text: 'Root',
                    allowDrag: false
                });
                if (root[idProperty] === undefined) {
                    root[idProperty] = me.defaultRootId;
                }
                Ext.data.NodeInterface.decorate(model);
                root = Ext.ModelManager.create(root, model);
            } else if (root.isModel && !root.isNode) {
                Ext.data.NodeInterface.decorate(model);
            }


            // Because we have decorated the model with new fields,
            // we need to build new extactor functions on the reader.
            me.getProxy().getReader().buildExtractors(true);

            // When we add the root to the tree, it will automaticaly get the NodeInterface
            me.tree.setRootNode(root);

            // If the user has set expanded: true on the root, we want to call the expand function
            if (preventLoad !== true && !root.isLoaded() && (me.autoLoad === true || root.isExpanded())) {
                me.load({
                    node: root
                });
            }

            return root;
        }
    }
});

/**
* @class Sch.view.Locking
* @extends Ext.grid.LockingView
*/
Ext.define('Sch.view.Locking', {

    extend: 'Ext.grid.LockingView',

    scheduleEventRelayRe: /^(schedule|event|beforeevent|afterevent|dragcreate|beforedragcreate|afterdragcreate|beforetooltipshow)/,

    constructor: function (config) {
        this.callParent(arguments);

        var me = this,
            eventNames = [],
            eventRe = me.scheduleEventRelayRe,
            normal = config.normal.getView(),
            events = normal.events,
            event;

        for (event in events) {
            if (events.hasOwnProperty(event) && eventRe.test(event)) {
                eventNames.push(event);
            }
        }
        me.relayEvents(normal, eventNames);
    },

    getElementFromEventRecord: function (record) {
        return this.normal.getView().getElementFromEventRecord(record);
    },


    onClear: function () {
        this.relayFn('onClear', arguments);
    },

    // For tree view
    beginBulkUpdate: function () {
        this.relayFn('beginBulkUpdate', arguments);
    },

    // For tree view
    endBulkUpdate: function () {
        this.relayFn('endBulkUpdate', arguments);
    },

    refreshKeepingScroll: function () {
        this.locked.getView().refresh();
        this.normal.getView().refreshKeepingScroll();
    }
});
/*
* @class Sch.ClockTemplate
* @private
* Template showing a clock, accepts an object containing a 'date' and a 'text' property to its apply method.
* @constructor
* @param {Object} config The object containing the configuration of this model.
*/
Ext.define("Sch.tooltip.ClockTemplate", {

    constructor: function () {
        var toRad = Math.PI / 180,
            cos = Math.cos,
            sin = Math.sin,
            minuteHeight = 7,
            minuteTop = 2,
            minuteLeft = 10,
            hourHeight = 6,
            hourTop = 3,
            hourLeft = 10;

        function getHourStyleIE(degrees) {
            var rad = degrees * toRad,
                cosV = cos(rad),
                sinV = sin(rad),
                y = hourHeight * sin((90 - degrees) * toRad),
                x = hourHeight * cos((90 - degrees) * toRad),
                topAdjust = Math.min(hourHeight, hourHeight - y),
                leftAdjust = degrees > 180 ? x : 0,
                matrixString = "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11 = " + cosV + ", M12 = " + (-sinV) + ", M21 = " + sinV + ", M22 = " + cosV + ")";

            return Ext.String.format("filter:{0};-ms-filter:{0};top:{1}px;left:{2}px;", matrixString, topAdjust + hourTop, leftAdjust + hourLeft);
        }

        function getMinuteStyleIE(degrees) {
            var rad = degrees * toRad,
                cosV = cos(rad),
                sinV = sin(rad),
                y = minuteHeight * sin((90 - degrees) * toRad),
                x = minuteHeight * cos((90 - degrees) * toRad),
                topAdjust = Math.min(minuteHeight, minuteHeight - y),
                leftAdjust = degrees > 180 ? x : 0,
                matrixString = "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11 = " + cosV + ", M12 = " + (-sinV) + ", M21 = " + sinV + ", M22 = " + cosV + ")";

            return Ext.String.format("filter:{0};-ms-filter:{0};top:{1}px;left:{2}px;", matrixString, topAdjust + minuteTop, leftAdjust + minuteLeft);
        }

        function getStyle(degrees) {
            return Ext.String.format("transform:rotate({0}deg);-moz-transform: rotate({0}deg);-webkit-transform: rotate({0}deg);-o-transform:rotate({0}deg);", degrees);
        }

        return new Ext.XTemplate(
            '<div class="sch-clockwrap {cls}">' +
                '<div class="sch-clock">' +
                    '<div class="sch-hourIndicator" style="{[this.getHourStyle((values.date.getHours()%12) * 30)]}">{[Ext.Date.monthNames[values.date.getMonth()].substr(0,3)]}</div>' +
                    '<div class="sch-minuteIndicator" style="{[this.getMinuteStyle(values.date.getMinutes() * 6)]}">{[values.date.getDate()]}</div>' +
                '</div>' +
                '<span class="sch-clock-text">{text}</span>' +
            '</div>',
            {
                compiled: true,
                disableFormats: true,

                getMinuteStyle: Ext.isIE ? getMinuteStyleIE : getStyle,
                getHourStyle: Ext.isIE ? getHourStyleIE : getStyle
            }
        );
    }
});

/*
@class "Sch.tooltip.Tooltip"
@extends Ext.ToolTip
@private

Internal plugin showing a tooltip with event start/end information.
*/
Ext.define("Sch.tooltip.Tooltip", {
    extend: "Ext.tip.ToolTip",
    requires: [
        'Sch.tooltip.ClockTemplate'
    ],
    autoHide: false,
    anchor: 'b',
    padding: '0 3 0 0',
    showDelay: 0,
    hideDelay: 0,
    quickShowInterval: 0,
    dismissDelay: 0,
    trackMouse: false,
    valid: true,
    anchorOffset: 5,
    shadow: false,
    frame: false,

    constructor: function (config) {
        var clockTpl = Ext.create("Sch.tooltip.ClockTemplate");
        this.renderTo = document.body;
        this.startDate = this.endDate = new Date();

        if (!this.template) {
            this.template = Ext.create("Ext.XTemplate",
                '<div class="{[values.valid ? "sch-tip-ok" : "sch-tip-notok"]}">',
                   '{[this.renderClock(values.startDate, values.startText, "sch-tooltip-startdate")]}',
                   '{[this.renderClock(values.endDate, values.endText, "sch-tooltip-enddate")]}',
                '</div>',
                {
                    compiled: true,
                    disableFormats: true,

                    renderClock: function (date, text, cls) {
                        return clockTpl.apply({
                            date: date,
                            text: text,
                            cls: cls
                        });
                    }
                }
            );
        }

        this.callParent(arguments);
    },

    update: function (startDate, endDate, valid) {

        if (this.startDate - startDate !== 0 ||
            this.endDate - endDate !== 0 ||
            this.valid !== valid) {

            // This will be called a lot so cache the values
            this.startDate = startDate;
            this.endDate = endDate;
            this.valid = valid;
            var startText = this.schedulerView.getFormattedDate(startDate),
                endText = this.schedulerView.getFormattedEndDate(endDate, startDate);

            // If resolution is day or greater, and end date is greater then start date
            if (this.mode === 'calendar' && endDate.getHours() === 0 && endDate.getMinutes() === 0 &&
                !(endDate.getYear() === startDate.getYear() && endDate.getMonth() === startDate.getMonth() && endDate.getDate() === startDate.getDate())) {
                endDate = Sch.util.Date.add(endDate, Sch.util.Date.DAY, -1);
            }

            this.callParent([
                this.template.apply({
                    valid: valid,
                    startDate: startDate,
                    startText: startText,
                    endText: endText,
                    endDate: endDate
                })
            ]);
        }
    },

    show: function (el, xOffset) {
        if (!el) {
            return;
        }

        if (Sch.util.Date.compareUnits(this.schedulerView.getTimeResolution().unit, Sch.util.Date.DAY) >= 0) {
            this.mode = 'calendar';
            this.addCls('sch-day-resolution');
        } else {
            this.mode = 'clock';
            this.removeCls('sch-day-resolution');
        }
        this.mouseOffsets = [xOffset - 18, -7];

        this.setTarget(el);
        this.callParent();
        this.alignTo(el, 'bl-tl', this.mouseOffsets);

        this.mon(Ext.getBody(), 'mousemove', this.onMyMouseMove, this);
        this.mon(Ext.getBody(), 'mouseup', this.onMyMouseUp, this, { single: true });
    },

    onMyMouseMove: function () {
        this.el.alignTo(this.target, 'bl-tl', this.mouseOffsets);
    },

    onMyMouseUp: function () {
        this.mun(Ext.getBody(), 'mousemove', this.onMyMouseMove, this);
    },

    afterRender: function () {
        this.callParent(arguments);

        // In slower browsers, the mouse pointer may end up over the tooltip interfering with drag drop etc
        this.el.on('mouseenter', this.onElMouseEnter, this);
    },

    onElMouseEnter: function () {
        this.alignTo(this.target, 'bl-tl', this.mouseOffsets);
    }
});

/**
* @class Sch.util.Date
* @static
* Static utility class for Date manipulation
*/
Ext.define('Sch.util.Date', {
    requires: 'Ext.Date',
    singleton: true,

    unitHash: null,
    unitsByName: {},

    // Override this to localize the time unit names.
    unitNames: {
        YEAR: { single: 'year', plural: 'years', abbrev: 'yr' },
        QUARTER: { single: 'quarter', plural: 'quarters', abbrev: 'q' },
        MONTH: { single: 'month', plural: 'months', abbrev: 'mon' },
        WEEK: { single: 'week', plural: 'weeks', abbrev: 'w' },
        DAY: { single: 'day', plural: 'days', abbrev: 'd' },
        HOUR: { single: 'hour', plural: 'hours', abbrev: 'h' },
        MINUTE: { single: 'minute', plural: 'minutes', abbrev: 'min' },
        SECOND: { single: 'second', plural: 'seconds', abbrev: 's' },
        MILLI: { single: 'ms', plural: 'ms', abbrev: 'ms' }
    },


    constructor: function () {
        var ED = Ext.Date;
        var unitHash = this.unitHash = {
            /**
            * Date interval constant
            * @static
            * @type String
            */
            MILLI: ED.MILLI,

            /**
            * Date interval constant
            * @static
            * @type String
            */
            SECOND: ED.SECOND,

            /**
            * Date interval constant
            * @static
            * @type String
            */
            MINUTE: ED.MINUTE,

            /** Date interval constant
            * @static
            * @type String
            */
            HOUR: ED.HOUR,

            /**
            * Date interval constant
            * @static
            * @type String
            */
            DAY: ED.DAY,

            /**
            * Date interval constant
            * @static
            * @type String
            */
            WEEK: "w",

            /**
            * Date interval constant
            * @static
            * @type String
            */
            MONTH: ED.MONTH,

            /**
            * Date interval constant
            * @static
            * @type String
            */
            QUARTER: "q",

            /**
            * Date interval constant
            * @static
            * @type String
            */
            YEAR: ED.YEAR
        };
        Ext.apply(this, unitHash);

        var me = this;
        this.units = [me.MILLI, me.SECOND, me.MINUTE, me.HOUR, me.DAY, me.WEEK, me.MONTH, me.QUARTER, me.YEAR];

        this.setUnitNames(this.unitNames);
    },


    /**
    * Call this method to provide your own, localized values for duration unit names. See the "/js/Sch/locale/sch-lang-*.js" files for examples
    * 
    * @param {Object} unitNames
    */
    setUnitNames: function (unitNames) {
        var unitsByName = this.unitsByName = {};
        this.unitNames = unitNames;

        var unitHash = this.unitHash;

        // Make it possible to lookup readable date names from both 'DAY' and 'd' etc.
        for (var name in unitHash) {
            if (unitHash.hasOwnProperty(name)) {
                var unitValue = unitHash[name];

                unitNames[unitValue] = unitNames[name];

                unitsByName[name] = unitValue;
                unitsByName[unitValue] = unitValue;
            }
        }
    },


    /**
    * Checks if this date is >= start and < end.
    * @param {Date} date The source date
    * @param {Date} start Start date
    * @param {Date} end End date
    * @return {Boolean} true if this date falls on or between the given start and end dates.
    * @static
    */
    betweenLesser: function (date, start, end) {
        var t = date.getTime();
        return start.getTime() <= t && t < end.getTime();
    },

    /**
    * Constrains the date within a min and a max date
    * @param {Date} date The date to constrain
    * @param {Date} min Min date
    * @param {Date} max Max date
    * @return {Date} The constrained date
    * @static
    */
    constrain: function (date, min, max) {
        return this.min(this.max(date, min), max);
    },

    /**
    * Returns 1 if first param is a greater unit than second param, -1 if the opposite is true or 0 if they're equal
    * @static
    * 
    * @param {String} unit1 The 1st unit
    * @param {String} unit2 The 2nd unit
    */
    compareUnits: function (u1, u2) {
        var ind1 = Ext.Array.indexOf(this.units, u1),
            ind2 = Ext.Array.indexOf(this.units, u2);

        return ind1 > ind2 ? 1 : (ind1 < ind2 ? -1 : 0);
    },

    /**
    * Returns true if first unit passed is strictly greater than the second.
    * @static
    * 
    * @param {String} unit1 The 1st unit
    * @param {String} unit2 The 2nd unit
    */
    isUnitGreater: function (u1, u2) {
        return this.compareUnits(u1, u2) > 0;
    },

    /**
    * Copies hours, minutes, seconds, milliseconds from one date to another
    * @static
    * 
    * @param {String} targetDate The target date
    * @param {String} sourceDate The source date
    */
    copyTimeValues: function (targetDate, sourceDate) {
        targetDate.setHours(sourceDate.getHours());
        targetDate.setMinutes(sourceDate.getMinutes());
        targetDate.setSeconds(sourceDate.getSeconds());
        targetDate.setMilliseconds(sourceDate.getMilliseconds());
    },

    /**
    * Adds a date unit and interval 
    * @param {Date} date The source date 
    * @param {String} unit The date unit to add
    * @param {Int} value The number of units to add to the date
    * @return {Date} The new date
    * @static
    */
    add: function (date, unit, value) {
        var d = Ext.Date.clone(date);
        if (!unit || value === 0) return d;

        switch (unit.toLowerCase()) {
            case this.MILLI:
                d = new Date(date.getTime() + value);
                break;
            case this.SECOND:
                d = new Date(date.getTime() + (value * 1000));
                break;
            case this.MINUTE:
                d = new Date(date.getTime() + (value * 60000));
                break;
            case this.HOUR:
                d = new Date(date.getTime() + (value * 3600000));
                break;
            case this.DAY:
                d.setDate(date.getDate() + value);
                break;
            case this.WEEK:
                d.setDate(date.getDate() + value * 7);
                break;
            case this.MONTH:
                var day = date.getDate();
                if (day > 28) {
                    day = Math.min(day, Ext.Date.getLastDateOfMonth(this.add(Ext.Date.getFirstDateOfMonth(date), this.MONTH, value)).getDate());
                }
                d.setDate(day);
                d.setMonth(d.getMonth() + value);
                break;
            case this.QUARTER:
                d = this.add(date, this.MONTH, value * 3);
                break;
            case this.YEAR:
                d.setFullYear(date.getFullYear() + value);
                break;
        }
        return d;
    },


    getMeasuringUnit: function (unit) {
        if (unit === this.WEEK) {
            return this.DAY;
        }
        return unit;
    },


    /**
    * Returns a duration of the timeframe in the given unit.   
    * @static
    * @param {Date} start The start date of the timeframe
    * @param {Date} end The end date of the timeframe
    * @param {String} unit Duration unit
    * @return {Number} The duration in the units 
    */
    getDurationInUnit: function (start, end, unit) {
        var units;

        switch (unit) {
            case this.YEAR:
                units = Math.round(this.getDurationInYears(start, end));
                break;

            case this.QUARTER:
                units = Math.round(this.getDurationInMonths(start, end) / 3);
                break;

            case this.MONTH:
                units = Math.round(this.getDurationInMonths(start, end));
                break;

            case this.WEEK:
                units = Math.round(this.getDurationInDays(start, end)) / 7;
                break;

            case this.DAY:
                units = Math.round(this.getDurationInDays(start, end));
                break;

            case this.HOUR:
                units = Math.round(this.getDurationInHours(start, end));
                break;

            case this.MINUTE:
                units = Math.round(this.getDurationInMinutes(start, end));
                break;

            case this.SECOND:
                units = Math.round(this.getDurationInSeconds(start, end));
                break;

            case this.MILLI:
                units = Math.round(this.getDurationInMilliseconds(start, end));
                break;
        }

        return units;
    },


    getUnitToBaseUnitRatio: function (baseUnit, unit) {
        if (baseUnit === unit) {
            return 1;
        }

        switch (baseUnit) {
            case this.YEAR:
                switch (unit) {
                    case this.QUARTER:
                        return 1 / 4;

                    case this.MONTH:
                        return 1 / 12;
                }
                break;

            case this.QUARTER:
                switch (unit) {
                    case this.YEAR:
                        return 4;

                    case this.MONTH:
                        return 1 / 3;
                }
                break;

            case this.MONTH:
                switch (unit) {
                    case this.YEAR:
                        return 12;

                    case this.QUARTER:
                        return 3;
                }
                break;

            case this.WEEK:
                switch (unit) {
                    case this.DAY:
                        return 1 / 7;

                    case this.HOUR:
                        return 1 / 168;
                }
                break;

            case this.DAY:
                switch (unit) {
                    case this.WEEK:
                        return 7;

                    case this.HOUR:
                        return 1 / 24;

                    case this.MINUTE:
                        return 1 / 1440;
                }
                break;

            case this.HOUR:
                switch (unit) {
                    case this.DAY:
                        return 24;

                    case this.MINUTE:
                        return 1 / 60;
                }
                break;

            case this.MINUTE:
                switch (unit) {
                    case this.HOUR:
                        return 60;

                    case this.SECOND:
                        return 1 / 60;

                    case this.MILLI:
                        return 1 / 60000;
                }
                break;

            case this.SECOND:
                switch (unit) {
                    case this.MILLI:
                        return 1 / 1000;
                }
                break;


            case this.MILLI:
                switch (unit) {
                    case this.SECOND:
                        return 1000;
                }
                break;

        }

        return -1;
    },

    /**
    * Returns the number of Milliseconds between the two dates
    * @param {Date} start Start date
    * @param {Date} end End date
    * @return {Int} true number of minutes between the two dates
    * @static
    */
    getDurationInMilliseconds: function (start, end) {
        return (end - start);
    },

    /**
    * Returns the number of Seconds between the two dates
    * @param {Date} start Start date
    * @param {Date} end End date
    * @return {Int} true number of minutes between the two dates
    * @static
    */
    getDurationInSeconds: function (start, end) {
        return (end - start) / 1000;
    },

    /**
    * Returns the number of minutes between the two dates
    * @param {Date} start Start date
    * @param {Date} end End date
    * @return {Int} true number of minutes between the two dates
    * @static
    */
    getDurationInMinutes: function (start, end) {
        return (end - start) / 60000;
    },

    /**
    * Returns the number of hours between the two dates
    * @param {Date} start Start date
    * @param {Date} end End date
    * @return {Int} true number of hours between the two dates
    * @static
    */
    getDurationInHours: function (start, end) {
        return (end - start) / 3600000;
    },

    /**
    * Returns the number of whole days between the two dates
    * @param {Date} start Start date
    * @param {Date} end End date
    * @return {Int} true number of days between the two dates
    * @static
    */
    getDurationInDays: function (start, end) {
        return (end - start) / 86400000;
    },

    /**
    * Returns the number of business days between the two dates
    * @deprecated Will be removed in v3.0. Use Calendar instead to find duration for a period of time, excluding non-working time.
    * @param {Date} start Start date
    * @param {Date} end End date
    * @return {Int} true number of business days between the two dates
    * @static
    */
    getDurationInBusinessDays: function (start, end) {
        var nbrDays = Math.round((end - start) / 86400000),
            nbrBusinessDays = 0,
            d;

        for (var i = 0; i < nbrDays; i++) {
            d = this.add(start, this.DAY, i).getDay();
            if (d !== 6 && d !== 0) {
                nbrBusinessDays++;
            }
        }
        return nbrBusinessDays;
    },

    /**
    * Returns the number of whole months between the two dates
    * @param {Date} start Start date
    * @param {Date} end End date
    * @return {Int} The number of whole months between the two dates
    * @static
    */
    getDurationInMonths: function (start, end) {
        return ((end.getFullYear() - start.getFullYear()) * 12) + (end.getMonth() - start.getMonth());
    },

    /**
    * Returns the number of years between the two dates
    * @param {Date} start Start date
    * @param {Date} end End date
    * @return {Int} The number of whole months between the two dates
    * @static
    */
    getDurationInYears: function (start, end) {
        return this.getDurationInMonths(start, end) / 12;
    },

    /**
    * Returns the lesser of the two dates
    * @param {Date} date 1
    * @param {Date} date 2
    * @return {Date} Returns the lesser of the two dates
    * @static
    */
    min: function (d1, d2) {
        return d1 < d2 ? d1 : d2;
    },

    /**
    * Returns the greater of the two dates
    * @param {Date} date 1
    * @param {Date} date 2
    * @return {Date} Returns the greater of the two dates
    * @static
    */
    max: function (d1, d2) {
        return d1 > d2 ? d1 : d2;
    },

    /**
    * Returns true if dates intersect
    * @param {Date} start 1
    * @param {Date} end 1
    * @param {Date} start 2
    * @param {Date} end 2
    * @return {Boolean} Returns true if dates intersect
    * @static
    */
    intersectSpans: function (date1Start, date1End, date2Start, date2End) {
        return this.betweenLesser(date1Start, date2Start, date2End) ||
               this.betweenLesser(date2Start, date1Start, date1End);
    },

    /**
    * Returns a name of the duration unit, matching its property on the Sch.util.Date class. 
    * So, for example:
    * 
    *      Sch.util.Date.getNameOfUnit(Sch.util.Date.DAY) == 'DAY' // true
    * 
    * @static
    * @param {String} unit Duration unit
    * @return {String} 
    */
    getNameOfUnit: function (unit) {
        unit = this.getUnitByName(unit);

        switch (unit.toLowerCase()) {
            case this.YEAR: return 'YEAR';
            case this.QUARTER: return 'QUARTER';
            case this.MONTH: return 'MONTH';
            case this.WEEK: return 'WEEK';
            case this.DAY: return 'DAY';
            case this.HOUR: return 'HOUR';
            case this.MINUTE: return 'MINUTE';
            case this.SECOND: return 'SECOND';
            case this.MILLI: return 'MILLI';
        }

        throw "Incorrect UnitName";
    },

    /**
    * Returns a human-readable name of the duration unit. For for example for `Sch.util.Date.DAY` it will return either
    * "day" or "days", depending from the `plural` argument
    * @static
    * @param {String} unit Duration unit
    * @param {Boolean} plural Whether to return a plural name or singular
    * @return {String} 
    */
    getReadableNameOfUnit: function (unit, plural) {
        return this.unitNames[unit][plural ? 'plural' : 'single'];
    },

    /**
    * Returns an abbreviated form of the name of the duration unit. 
    * @static
    * @param {String} unit Duration unit
    * @return {String} 
    */
    getShortNameOfUnit: function (unit) {
        return this.unitNames[unit].abbrev;
    },

    getUnitByName: function (name) {
        if (!this.unitsByName[name]) {
            Ext.Error.raise('Unknown unit name: ' + name);
        }

        return this.unitsByName[name];
    },


    /**
    * Returns the beginning of the Nth next duration unit, after the provided `date`.
    * For example for the this call:
    *      Sch.util.Date.getNext(new Date('Jul 15, 2011'), Sch.util.Date.MONTH, 1)
    *      
    * will return: Aug 1, 2011
    *      
    * @static
    * @param {Date} date The date
    * @param {String} unit The duration unit
    * @param {Integer} increment How many duration units to skip
    * @param {Number} weekStartDay The day index of the 1st day of the week.
    *                Only required when `unit` is `WEEK`. 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on (defaults to 1).
    * @return {Date} The beginning of the next duration unit interval
    */
    getNext: function (date, unit, increment, weekStartDay) {
        var dt = Ext.Date.clone(date);

        weekStartDay = arguments.length < 4 ? 1 : weekStartDay;
        increment = increment || 1;

        switch (unit) {
            case this.MILLI:
                dt = this.add(date, unit, increment);
                break;

            case this.SECOND:
                dt = this.add(date, unit, increment);
                dt.setMilliseconds(0);
                break;

            case this.MINUTE:
                dt = this.add(date, unit, increment);
                dt.setSeconds(0);
                dt.setMilliseconds(0);
                break;

            case this.HOUR:
                dt = this.add(date, unit, increment);
                dt.setMinutes(0);
                dt.setSeconds(0);
                dt.setMilliseconds(0);
                break;

            case this.DAY:
                // Check if date has 23 hrs and is in Chile timezone
                var midnightNotInTimeScale = date.getHours() === 23 && this.add(dt, this.HOUR, 1).getHours() === 1;

                if (midnightNotInTimeScale) {
                    // Correct the date manually for DST transitions happening at 00:00
                    dt = this.add(dt, this.DAY, 2);
                    Ext.Date.clearTime(dt);
                    return dt;
                }

                Ext.Date.clearTime(dt);

                dt = this.add(dt, this.DAY, increment);
                break;

            case this.WEEK:

                Ext.Date.clearTime(dt);
                var day = dt.getDay();
                dt = this.add(dt, this.DAY, weekStartDay - day + 7 * (increment - (weekStartDay <= day ? 0 : 1)));

                // For south american timezones, midnight does not exist on DST transitions, adjust...
                if (dt.getDay() !== weekStartDay) {
                    dt = this.add(dt, this.HOUR, 1);
                } else {
                    Ext.Date.clearTime(dt);
                }
                break;

            case this.MONTH:
                dt = this.add(dt, this.MONTH, increment);
                dt.setDate(1);
                Ext.Date.clearTime(dt);
                break;

            case this.QUARTER:
                dt = this.add(dt, this.MONTH, ((increment - 1) * 3) + (3 - (dt.getMonth() % 3)));
                Ext.Date.clearTime(dt);
                dt.setDate(1);
                break;

            case this.YEAR:
                dt = new Date(dt.getFullYear() + increment, 0, 1);
                break;

            default:
                throw 'Invalid date unit';
        }

        return dt;
    },

    getNumberOfMsFromTheStartOfDay: function (date) {
        return date - Ext.Date.clearTime(date, true) || 86400000;
    },

    getNumberOfMsTillTheEndOfDay: function (date) {
        return this.getStartOfNextDay(date, true) - date;
    },

    getStartOfNextDay: function (date, clone) {
        var nextDay = this.add(Ext.Date.clearTime(date, clone), this.DAY, 1);

        // DST case
        if (nextDay.getDate() == date.getDate()) {
            var offsetNextDay = this.add(Ext.Date.clearTime(date, clone), this.DAY, 2).getTimezoneOffset();
            var offsetDate = date.getTimezoneOffset();

            nextDay = this.add(nextDay, this.MINUTE, offsetDate - offsetNextDay);
        }

        return nextDay;
    },

    getEndOfPreviousDay: function (date) {
        var dateOnly = Ext.Date.clearTime(date, true);

        // dates are different
        if (dateOnly - date) {
            return dateOnly;
        } else {
            return this.add(dateOnly, this.DAY, -1);
        }
    },

    /**
    * Returns true if the first time span completely 'covers' the second time span. E.g.
    *      Sch.util.Date.timeSpanContains(new Date(2010, 1, 2), new Date(2010, 1, 5), new Date(2010, 1, 3), new Date(2010, 1, 4)) ==> true
    *      Sch.util.Date.timeSpanContains(new Date(2010, 1, 2), new Date(2010, 1, 5), new Date(2010, 1, 3), new Date(2010, 1, 6)) ==> false
    * @static
    * @param {Date} spanStart The start date for initial time span
    * @param {Date} spanEnd The end date for initial time span
    * @param {Date} otherSpanStart The start date for the 2nd time span
    * @param {Date} otherSpanEnd The end date for the 2nd time span
    * @return {Boolean} 
    */
    timeSpanContains: function (spanStart, spanEnd, otherSpanStart, otherSpanEnd) {
        return (otherSpanStart - spanStart) >= 0 && (spanEnd - otherSpanEnd) >= 0;
    }
});


/*
* To analyze possible errors in your setup, include this on your HTML page and use Firebug (or any other console application) to execute line below:
* >
* > Sch.util.Debug.runDiagnostics();
* > ...
*/
Ext.define("Sch.util.Debug", {
    singleton: true,

    runDiagnostics: function () {
        var log;
        var C = console;

        if (C && C.log) {
            log = function () {
                C.log.apply(console, arguments);
            };
        } else {
            if (!window.schedulerDebugWin) {
                window.schedulerDebugWin = new Ext.Window({
                    height: 400,
                    width: 500,
                    bodyStyle: 'padding:10px',
                    closeAction: 'hide',
                    autoScroll: true
                });
            }
            window.schedulerDebugWin.show();
            schedulerDebugWin.update('');
            log = function (text) { schedulerDebugWin.update((schedulerDebugWin.body.dom.innerHTML || '') + text + '<br/>'); };
        }

        var els = Ext.select('.sch-schedulerpanel');

        if (els.getCount() === 0) log('No scheduler component found');

        var s = Ext.getCmp(els.elements[0].id),
            resourceStore = s.getResourceStore(),
            eventStore = s.getEventStore();

        if (!eventStore.isEventStore) {
            log("Your event store must be or extend Sch.data.EventStore");
        }

        log('Scheduler view start: ' + s.getStart() + ', end: ' + s.getEnd());

        if (!resourceStore) { log('No store configured'); return; }
        if (!eventStore) { log('No event store configured'); return; }

        log(resourceStore.getCount() + ' records in the resource store');
        log(eventStore.getCount() + ' records in the eventStore');
        var eventIdProp = eventStore.model.prototype.idProperty;
        var resourceIdProp = resourceStore.model.prototype.idProperty;

        var eventIdPropertyFound = eventStore.model.prototype.fields.getByKey(eventIdProp);
        var resourceIdPropertyFound = resourceStore.model.prototype.fields.getByKey(resourceIdProp);

        if (!(eventStore.model.prototype instanceof Sch.model.Event)) {
            log("Your event model must extend Sch.model.Event");
        }
        if (!(resourceStore.model.prototype instanceof Sch.model.Resource)) {
            log("Your event model must extend Sch.model.Resource");
        }

        if (!eventIdPropertyFound) {
            log("idProperty on the event model is incorrectly setup, value: " + eventIdProp);
        }
        if (!resourceIdPropertyFound) {
            log("idProperty on the resource model is incorrectly setup, value: " + resourceIdProp);
        }

        var view = s.getSchedulingView();

        log(view.el.select(view.eventSelector).getCount() + ' events present in the DOM');

        if (eventStore.getCount() > 0) {
            if (!eventStore.first().getStartDate() || !(eventStore.first().getStartDate() instanceof Date)) {
                log('The eventStore reader is misconfigured - The StartDate field is not setup correctly, please investigate');
                log('StartDate is configured with dateFormat: ' + eventStore.model.prototype.fields.getByKey('StartDate').dateFormat);
                log('See Ext JS docs for information about different date formats: http://docs.sencha.com/ext-js/4-0/#!/api/Ext.Date');
            }

            if (!eventStore.first().getEndDate() || !(eventStore.first().getEndDate() instanceof Date)) {
                log('The eventStore reader is misconfigured - The EndDate field is not setup correctly, please investigate');
                log('EndDate is configured with dateFormat: ' + eventStore.model.prototype.fields.getByKey('EndDate').dateFormat);
                log('See Ext JS docs for information about different date formats: http://docs.sencha.com/ext-js/4-0/#!/api/Ext.Date');
            }

            if (eventStore.proxy && eventStore.proxy.reader && eventStore.proxy.reader.jsonData) {
                log('Dumping jsonData to console');
                console.dir(eventStore.proxy.reader.jsonData);
            }

            log('Records in the event store:');
            eventStore.each(function (r, i) {
                log((i + 1) + '. ' + r.startDateField + ':' + r.getStartDate() + ', ' + r.endDateField + ':' + r.getEndDate() + ', ' + r.resourceIdField + ':' + r.getResourceId());
                if (!r.getStartDate()) {
                    log(r.getStartDate());
                }
            });
        } else {
            log('Event store has no data. Has it been loaded properly?');
        }

        if (resourceStore.getCount() > 0) {
            log('Records in the resource store:');
            resourceStore.each(function (r, i) {
                log((i + 1) + '. ' + r.idProperty + ':' + r.getId());
                return;
            });
        } else {
            log('Resource store has no data.');
            return;
        }

        log('Everything seems to be setup ok!');
    }
});

/**
@class Sch.util.HeaderRenderers
@static
 
A utility class for providing helper methods used to render header cells. These helpers can be used to "emulate" fine grained views with higher resolution.

Normally, each unit in the time axis is represented with a separate column. This is a very flexible solution, as it allows you to customize the presentation
of each and every cell in the timeline. However, when the number of columns grows, the DOM footprint becomes larger and larger.
So in cases when the customization of an arbitrary cell is not required, you can use one of these lightweight renderers to only visualize the small time units in the header.

For example, see this screenshot: {@img scheduler/images/header-renderer2.png}

It might seem that it uses a single day resolution. However, it uses "weeks" for both bottom and middle rows and for bottom row it uses
the `dayLetter` header renderer (see the `weekAndDayLetter` view preset).

To use the helper, specify the it as the `renderer` property of the {@link Sch.preset.ViewPresetHeaderRow}, like this:

headerConfig : {
bottom         : {
unit        : "WEEK",
increment   : 1,
renderer    : function() {
return Sch.util.HeaderRenderers.dayLetter.apply(this, arguments);
}
},
middle : {
unit        : "WEEK",
dateFormat  : 'D d M Y',
align       : 'left'
}
}

Available helpers are:

- `quarterMinute` - outputs the quarter of the minute or hour: 00 / 15 / 30 / 45
- `dateNumber` - outputs the the number of day: {@img scheduler/images/dateNumber.png}
- `dayLetter` - outputs the single letter name for each day: {@img scheduler/images/header-renderer2.png}
- `dayStartEndHours` - outputs the start and end hours for each date {@img scheduler/images/header-renderer1.png}

There's also a special "meta" helper, which when being called, will return a usual helper, suitable for usage as `renderer`. Its called `dateCells` and accepths the following signature:

dateCells : function(unit, increment, format) {}

So, for example a `dateNumber` helper can be received by using: `dateCells(Sch.util.Date.DAY, 1, 'd')`

*/
Ext.define("Sch.util.HeaderRenderers", {
    singleton: true,
    requires: [
        'Sch.util.Date',
        'Ext.XTemplate'
    ],
    constructor: function () {
        var dayTemplate = Ext.create("Ext.XTemplate",
            '<table class="sch-nested-hdr-tbl ' + Ext.baseCSSPrefix + 'column-header-text' + '" cellpadding="0" cellspacing="0"><tr>' +
                '<tpl for="."><td style="width:{[100/xcount]}%" class="{cls} sch-dayheadercell-{dayOfWeek}">{text}</td></tpl>' +
            '</tr></table>'
        ).compile();

        var cellTemplate = Ext.create("Ext.XTemplate",
            '<table class="sch-nested-hdr-tbl" cellpadding="0" cellspacing="0"><tr>' +
                '<tpl for="."><td style="width:{[100/xcount]}%" class="{cls}">{text}</td></tpl>' +
            '</tr></table>'
        ).compile();

        return {
            quarterMinute: function (start, end, cfg, i) {
                cfg.headerCls = 'sch-nested-hdr-pad';
                return '<table class="sch-nested-hdr-tbl" cellpadding="0" cellspacing="0"><tr><td>00</td><td>15</td><td>30</td><td>45</td></tr></table>';
            },

            dateCells: function (unit, increment, format) {

                return function (start, end, cfg) {
                    cfg.headerCls = 'sch-nested-hdr-nopad';

                    var vals = [],
                        dt = Ext.Date.clone(start);

                    while (dt < end) {
                        vals.push({
                            text: Ext.Date.format(dt, format)
                        });
                        dt = Sch.util.Date.add(dt, unit, increment);
                    }

                    vals[0].cls = 'sch-nested-hdr-cell-first';
                    vals[vals.length - 1].cls = 'sch-nested-hdr-cell-last';

                    return cellTemplate.apply(vals);
                };
            },

            dateNumber: function (start, end, cfg) {
                cfg.headerCls = 'sch-nested-hdr-nopad';
                var vals = [],
                    dt = Ext.Date.clone(start);

                while (dt < end) {
                    vals.push({
                        dayOfWeek: dt.getDay(),
                        text: dt.getDate()
                    });
                    dt = Sch.util.Date.add(dt, Sch.util.Date.DAY, 1);
                }

                return dayTemplate.apply(vals);
            },

            dayLetter: function (start, end, cfg) {
                cfg.headerCls = 'sch-nested-hdr-nopad';
                var vals = [],
                    dt = start;

                while (dt < end) {
                    vals.push({
                        dayOfWeek: dt.getDay(),
                        text: Ext.Date.dayNames[dt.getDay()].substr(0, 1)
                    });
                    dt = Sch.util.Date.add(dt, Sch.util.Date.DAY, 1);
                }
                vals[0].cls = 'sch-nested-hdr-cell-first';
                vals[vals.length - 1].cls = 'sch-nested-hdr-cell-last';

                return dayTemplate.apply(vals);
            },

            dayStartEndHours: function (start, end, cfg) {
                cfg.headerCls = 'sch-hdr-startend';
                return Ext.String.format('<span class="sch-hdr-start">{0}</span><span class="sch-hdr-end">{1}</span>', Ext.Date.format(start, 'G'), Ext.Date.format(end, 'G'));
            }
        };
    }
});

/*
* @class Sch.util.DragTracker
* @private
* 
* Simple drag tracker with an extra useful getRegion method
*/
Ext.define('Sch.util.DragTracker', {
    extend: 'Ext.dd.DragTracker',

    /**
    * @cfg {Number} xStep
    * The number of horizontal pixels to snap to when dragging
    */
    xStep: 1,

    /**
    * @cfg {Number} yStep
    * The number of vertical pixels to snap to when dragging
    */
    yStep: 1,

    /**
    * Set the number of horizontal pixels to snap to when dragging
    * @param {Number} step
    */
    setXStep: function (step) {
        this.xStep = step;
    },

    /**
    * Set the number of vertical pixels to snap to when dragging
    * @param {Number} step
    */
    setYStep: function (step) {
        this.yStep = step;
    },

    getRegion: function () {
        var startXY = this.startXY,
            currentXY = this.getXY(),
            minX = Math.min(startXY[0], currentXY[0]),
            minY = Math.min(startXY[1], currentXY[1]),
            width = Math.abs(startXY[0] - currentXY[0]),
            height = Math.abs(startXY[1] - currentXY[1]);

        return new Ext.util.Region(minY, minX + width, minY + height, minX);
    },

    onMouseDown: function (e, target) {
        // If this is disabled, or the mousedown has been processed by an upstream DragTracker, return
        if (this.disabled || e.dragTracked) {
            return;
        }

        var xy = e.getXY(),
            elX, elY,
            x = xy[0],
            y = xy[1];
        // TODO handle if this.el is scrolled
        if (this.xStep > 1) {
            elX = this.el.getX();
            x -= elX;
            x = Math.round(x / this.xStep) * this.xStep;
            x += elX;
        }

        if (this.yStep > 1) {
            elY = this.el.getY();
            y -= elY;
            y = Math.round(y / this.yStep) * this.yStep;
            y += elY;
        }

        // This information should be available in mousedown listener and onBeforeStart implementations
        this.dragTarget = this.delegate ? target : this.handle.dom;
        this.startXY = this.lastXY = [x, y];
        this.startRegion = Ext.fly(this.dragTarget).getRegion();

        if (this.fireEvent('mousedown', this, e) === false ||
            this.fireEvent('beforedragstart', this, e) === false ||
            this.onBeforeStart(e) === false) {
            return;
        }

        // Track when the mouse is down so that mouseouts while the mouse is down are not processed.
        // The onMouseOut method will only ever be called after mouseup.
        this.mouseIsDown = true;

        // Flag for downstream DragTracker instances that the mouse is being tracked.
        e.dragTracked = true;

        if (this.preventDefault !== false) {
            e.preventDefault();
        }
        Ext.getDoc().on({
            scope: this,
            mouseup: this.onMouseUp,
            mousemove: this.onMouseMove,
            selectstart: this.stopSelect
        });
        if (this.autoStart) {
            this.timer = Ext.defer(this.triggerStart, this.autoStart === true ? 1000 : this.autoStart, this, [e]);
        }
    },

    onMouseMove: function (e, target) {

        if (this.active && Ext.isIE && !e.browserEvent.button) {
            e.preventDefault();
            this.onMouseUp(e);
            return;
        }

        e.preventDefault();
        var xy = e.getXY(),
            s = this.startXY;

        if (!this.active) {
            if (Math.max(Math.abs(s[0] - xy[0]), Math.abs(s[1] - xy[1])) > this.tolerance) {
                this.triggerStart(e);
            } else {
                return;
            }
        }

        var x = xy[0],
            y = xy[1];

        // TODO handle if this.el is scrolled
        if (this.xStep > 1) {
            x -= this.startXY[0];
            x = Math.round(x / this.xStep) * this.xStep;
            x += this.startXY[0];
        }

        if (this.yStep > 1) {
            y -= this.startXY[1];
            y = Math.round(y / this.yStep) * this.yStep;
            y += this.startXY[1];
        }

        var snapping = this.xStep > 1 || this.yStep > 1;

        if (!snapping || x !== xy[0] || y !== xy[1]) {
            this.lastXY = [x, y];

            if (this.fireEvent('mousemove', this, e) === false) {
                this.onMouseUp(e);
            } else {
                this.onDrag(e);
                this.fireEvent('drag', this, e);
            }
        }
    }
});

/**
@class Sch.preset.Manager
@singleton

Provides a registry of the possible view presets that any instance of an grid with {@link Sch.mixin.SchedulerPanel} mixin can use.

See the {@link Sch.preset.ViewPreset}, {@link Sch.preset.ViewPresetHeaderRow} for description of the view preset properties.

Available presets are:

- `minuteAndHour` - creates 2 level headers - hour and minutes within it
- `hourAndDay` - creates 2 level headers - day and hours within it: {@img scheduler/images/hourAndDay.png} 
- `dayAndWeek` - creates 2 level headers - week and days within it: {@img scheduler/images/dayAndWeek.png} 
- `weekAndDay` - just like `dayAndWeek` but with different formatting: {@img scheduler/images/weekAndDay.png} 
- `weekAndMonth` - creates 2 level headers - month and weeks within it: {@img scheduler/images/weekAndMonth.png}

- `monthAndYear` - creates 2 level headers - year and months within it: {@img scheduler/images/monthAndYear.png}
- `year` - creates 2 level headers - year and quarters within it: {@img scheduler/images/year-preset.png}
- `weekAndDayLetter` - creates a lightweight 2 level headers - weeks and days within it (days are not real columns). 
See {@link Sch.util.HeaderRenderers} for details. {@img scheduler/images/header-renderer2.png}
- `weekDateAndMonth` - creates 2 level headers - month and weeks within it (weeks shown by first day only): {@img scheduler/images/weekDateAndMonth.png}

You can register your own preset with the {@link #registerPreset} call 

*/

Ext.define('Sch.preset.Manager', {
    extend: 'Ext.util.MixedCollection',
    requires: [
        'Sch.util.Date',
        'Sch.util.HeaderRenderers'
    ],
    singleton: true,

    constructor: function () {
        this.callParent(arguments);
        this.registerDefaults();
    },

    /**
    * Registers a new view preset to be used by any scheduler grid or tree on the page.
    * @param {String} name The unique name identifying this preset
    * @param {Object} config The configuration properties of the view preset (see {@link Sch.preset.ViewPreset} for more information)
    */
    registerPreset: function (name, cfg) {
        if (cfg) {
            var headerConfig = cfg.headerConfig;
            var DATE = Sch.util.Date;

            // Make sure date "unit" constant specified in the preset are resolved
            for (var o in headerConfig) {
                if (headerConfig.hasOwnProperty(o)) {
                    if (DATE[headerConfig[o].unit]) {
                        headerConfig[o].unit = DATE[headerConfig[o].unit.toUpperCase()];
                    }
                }
            }

            if (!cfg.timeColumnWidth) {
                cfg.timeColumnWidth = 50;
            }

            // Resolve date units
            if (cfg.timeResolution && DATE[cfg.timeResolution.unit]) {
                cfg.timeResolution.unit = DATE[cfg.timeResolution.unit.toUpperCase()];
            }

            // Resolve date units
            if (cfg.shiftUnit && DATE[cfg.shiftUnit]) {
                cfg.shiftUnit = DATE[cfg.shiftUnit.toUpperCase()];
            }
        }

        if (this.isValidPreset(cfg)) {
            if (this.containsKey(name)) {
                this.removeAtKey(name);
            }
            this.add(name, cfg);
        } else {
            throw 'Invalid preset, please check your configuration';
        }
    },

    isValidPreset: function (cfg) {
        var D = Sch.util.Date,
            valid = true,
            validUnits = Sch.util.Date.units;

        // Make sure all date "unit" constants are valid
        for (var o in cfg.headerConfig) {
            if (cfg.headerConfig.hasOwnProperty(o)) {
                valid = valid && Ext.Array.indexOf(validUnits, cfg.headerConfig[o].unit) >= 0;
            }
        }

        if (cfg.timeResolution) {
            valid = valid && Ext.Array.indexOf(validUnits, cfg.timeResolution.unit) >= 0;
        }

        if (cfg.shiftUnit) {
            valid = valid && Ext.Array.indexOf(validUnits, cfg.shiftUnit) >= 0;
        }

        return valid;
    },

    /**
    * Fetches a view preset from the global cache
    * @param {String} name The name of the preset
    * @return {Object} The view preset, see {@link Sch.preset.ViewPreset} for more information
    */
    getPreset: function (name) {
        return this.get(name);
    },

    /**
    * Deletes a view preset 
    * @param {String} name The name of the preset
    */
    deletePreset: function (name) {
        this.removeAtKey(name);
    },

    registerDefaults: function () {
        var pm = this,
            vp = this.defaultPresets;

        for (var p in vp) {
            pm.registerPreset(p, vp[p]);
        }
    },

    defaultPresets: {
        minuteAndHour: {
            timeColumnWidth: 100,   // Time column width (used for rowHeight in vertical mode)
            rowHeight: 24,          // Only used in horizontal orientation
            resourceColumnWidth: 100,  // Only used in vertical orientation
            displayDateFormat: 'G:i',  // Controls how dates will be displayed in tooltips etc
            shiftIncrement: 1,     // Controls how much time to skip when calling shiftNext and shiftPrevious.
            shiftUnit: "HOUR",      // Valid values are "MILLI", "SECOND", "MINUTE", "HOUR", "DAY", "WEEK", "MONTH", "QUARTER", "YEAR".
            defaultSpan: 24,       // By default, if no end date is supplied to a view it will show 24 hours
            timeResolution: {      // Dates will be snapped to this resolution
                unit: "MINUTE",    // Valid values are "MILLI", "SECOND", "MINUTE", "HOUR", "DAY", "WEEK", "MONTH", "QUARTER", "YEAR".
                increment: 30
            },
            headerConfig: {    // This defines your header, you must include a "middle" object, and top/bottom are optional. For each row you can define "unit", "increment", "dateFormat", "renderer", "align", and "scope"
                middle: {
                    unit: "MINUTE",
                    increment: '30',
                    dateFormat: 'i'
                },
                top: {
                    unit: "HOUR",
                    dateFormat: 'D, GA/m'
                }
            }
        },
        hourAndDay: {
            timeColumnWidth: 60,   // Time column width (used for rowHeight in vertical mode)
            rowHeight: 24,          // Only used in horizontal orientation
            resourceColumnWidth: 100,  // Only used in vertical orientation
            displayDateFormat: 'G:i',  // Controls how dates will be displayed in tooltips etc
            shiftIncrement: 1,     // Controls how much time to skip when calling shiftNext and shiftPrevious.
            shiftUnit: "DAY",      // Valid values are "MILLI", "SECOND", "MINUTE", "HOUR", "DAY", "WEEK", "MONTH", "QUARTER", "YEAR".
            defaultSpan: 24,       // By default, if no end date is supplied to a view it will show 24 hours
            timeResolution: {      // Dates will be snapped to this resolution
                unit: "MINUTE",    // Valid values are "MILLI", "SECOND", "MINUTE", "HOUR", "DAY", "WEEK", "MONTH", "QUARTER", "YEAR".
                increment: 30
            },
            headerConfig: {    // This defines your header, you must include a "middle" object, and top/bottom are optional. For each row you can define "unit", "increment", "dateFormat", "renderer", "align", and "scope"
                middle: {
                    unit: "HOUR",
                    dateFormat: 'G:i'
                },
                top: {
                    unit: "DAY",
                    dateFormat: 'D d/m'
                }
            }
        },
        dayAndWeek: {
            timeColumnWidth: 100,
            rowHeight: 24,          // Only used in horizontal orientation
            resourceColumnWidth: 100,  // Only used in vertical orientation
            displayDateFormat: 'Y-m-d G:i',
            shiftUnit: "DAY",
            shiftIncrement: 1,
            defaultSpan: 5,       // By default, show 5 days
            timeResolution: {
                unit: "HOUR",
                increment: 1
            },
            headerConfig: {
                middle: {
                    unit: "DAY",
                    dateFormat: 'D d M'
                },
                top: {
                    unit: "WEEK",
                    dateFormat: 'W M Y',
                    renderer: function (start, end, cfg) {
                        return Sch.util.Date.getShortNameOfUnit("WEEK") + '.' + Ext.Date.format(start, 'W M Y');
                    }
                }
            }
        },

        weekAndDay: {
            timeColumnWidth: 100,
            rowHeight: 24,          // Only used in horizontal orientation
            resourceColumnWidth: 100,  // Only used in vertical orientation
            displayDateFormat: 'Y-m-d',
            shiftUnit: "WEEK",
            shiftIncrement: 1,
            defaultSpan: 1,       // By default, show 1 week
            timeResolution: {
                unit: "DAY",
                increment: 1
            },
            headerConfig: {
                bottom: {
                    unit: "DAY",
                    increment: 1,
                    dateFormat: 'd/m'
                },
                middle: {
                    unit: "WEEK",
                    dateFormat: 'D d M',
                    align: 'left'
                }
            }
        },

        weekAndMonth: {
            timeColumnWidth: 100,
            rowHeight: 24,          // Only used in horizontal orientation
            resourceColumnWidth: 100,  // Only used in vertical orientation
            displayDateFormat: 'Y-m-d',
            shiftUnit: "WEEK",
            shiftIncrement: 5,
            defaultSpan: 6,       // By default, show 6 weeks
            timeResolution: {
                unit: "DAY",
                increment: 1
            },
            headerConfig: {
                middle: {
                    unit: "WEEK",
                    renderer: function (start, end, cfg) {
                        cfg.align = 'left';
                        return Ext.Date.format(start, 'd M');
                    }
                },
                top: {
                    unit: "MONTH",
                    dateFormat: 'M Y'
                }
            }
        },

        monthAndYear: {
            timeColumnWidth: 110,
            rowHeight: 24,          // Only used in horizontal orientation
            resourceColumnWidth: 100,  // Only used in vertical orientation
            displayDateFormat: 'Y-m-d',
            shiftIncrement: 3,
            shiftUnit: "MONTH",
            defaultSpan: 12,       // By default, show 12 months
            timeResolution: {
                unit: "DAY",
                increment: 1
            },
            headerConfig: {
                middle: {
                    unit: "MONTH",
                    dateFormat: 'M Y'
                },
                top: {
                    unit: "YEAR",
                    dateFormat: 'Y'
                }
            }
        },
        year: {
            timeColumnWidth: 100,
            rowHeight: 24,          // Only used in horizontal orientation
            resourceColumnWidth: 100,  // Only used in vertical orientation
            displayDateFormat: 'Y-m-d',
            shiftUnit: "YEAR",
            shiftIncrement: 1,
            defaultSpan: 1,       // By default, show 1 year
            timeResolution: {
                unit: "MONTH",
                increment: 1
            },
            headerConfig: {
                bottom: {
                    unit: "QUARTER",
                    renderer: function (start, end, cfg) {
                        return Ext.String.format(Sch.util.Date.getShortNameOfUnit("QUARTER").toUpperCase() + '{0}', Math.floor(start.getMonth() / 3) + 1);
                    }
                },
                middle: {
                    unit: "YEAR",
                    dateFormat: 'Y'
                }
            }
        },
        weekAndDayLetter: {
            timeColumnWidth: 20,
            rowHeight: 24,          // Only used in horizontal orientation
            resourceColumnWidth: 100,  // Only used in vertical orientation
            displayDateFormat: 'Y-m-d',
            shiftUnit: "WEEK",
            shiftIncrement: 1,
            defaultSpan: 10,       // By default, show 10 weeks
            timeResolution: {
                unit: "DAY",
                increment: 1
            },
            headerConfig: {
                bottom: {
                    unit: "DAY",
                    increment: 1,
                    renderer: function (start) {
                        return Ext.Date.dayNames[start.getDay()].substring(0, 1);
                    }
                },
                middle: {
                    unit: "WEEK",
                    dateFormat: 'D d M Y',
                    align: 'left'
                }
            }
        },
        weekDateAndMonth: {
            timeColumnWidth: 30,
            rowHeight: 24,          // Only used in horizontal orientation
            resourceColumnWidth: 100,  // Only used in vertical orientation
            displayDateFormat: 'Y-m-d',
            shiftUnit: "WEEK",
            shiftIncrement: 1,
            defaultSpan: 10,       // By default, show 10 weeks
            timeResolution: {
                unit: "DAY",
                increment: 1
            },
            headerConfig: {
                middle: {
                    unit: "WEEK",
                    dateFormat: 'd'
                },
                top: {
                    unit: "MONTH",
                    dateFormat: 'Y F',
                    align: 'left'
                }
            }
        }
    }
});

/**
@class Sch.preset.ViewPreset
Not used directly, but the properties below are rather provided inline as seen in the source of {@link Sch.preset.Manager}. This class is just provided for documentation purposes.

A sample preset looks like:

hourAndDay : {
timeColumnWidth         : 60,       // Time column width (used for rowHeight in vertical mode)
rowHeight               : 24,       // Only used in horizontal orientation
resourceColumnWidth     : 100,      // Only used in vertical orientation
            
displayDateFormat       : 'G:i',    // Controls how dates will be displayed in tooltips etc
            
shiftIncrement          : 1,        // Controls how much time to skip when calling shiftNext and shiftPrevious.
shiftUnit               : "DAY",    // Valid values are "MILLI", "SECOND", "MINUTE", "HOUR", "DAY", "WEEK", "MONTH", "QUARTER", "YEAR".
defaultSpan             : 12,       // By default, if no end date is supplied to a view it will show 12 hours
            
timeResolution          : {         // Dates will be snapped to this resolution
unit        : "MINUTE",         // Valid values are "MILLI", "SECOND", "MINUTE", "HOUR", "DAY", "WEEK", "MONTH", "QUARTER", "YEAR".
increment   : 15
},
            
headerConfig            : {         // This defines your header, you must include a "middle" object, and top/bottom are optional. 
middle      : {                 // For each row you can define "unit", "increment", "dateFormat", "renderer", "align", and "scope"
unit        : "HOUR",
dateFormat  : 'G:i'
},
top         : {
unit        : "DAY",
dateFormat  : 'D d/m'
}
}
},

See the {@link Sch.preset.Manager} for the list of available presets.
 
*/
Ext.define("Sch.preset.ViewPreset", {
    /**
    * @cfg {Int} timeColumnWidth The column width 
    */

    /**
    * @cfg {Int} rowHeight The height of the row 
    */

    /**
    * @cfg {Int} resourceColumnWidth The width of the resource column (only being used in vertical orientation) 
    */

    /**
    * @cfg {String} displayDateFormat Defines how dates will be formatted in tooltips etc
    */

    /**
    * @cfg {String} shiftUnit The unit to shift when calling shiftNext/shiftPrevious to navigate in the chart. 
    * Valid values are "MILLI", "SECOND", "MINUTE", "HOUR", "DAY", "WEEK", "MONTH", "QUARTER", "YEAR".
    */

    /**
    * @cfg {Int} shiftIncrement The amount to shift (in shiftUnits)
    */

    /**
    * @cfg {Int} defaultSpan The amount of time to show by default in a view (in the unit defined by the middle header)
    */

    /**
    * @cfg {Object} timeResolution An object containing a unit identifier and an increment variable. Example:
    * 
    timeResolution : {
    unit        : "HOUR",  //Valid values are "MILLI", "SECOND", "MINUTE", "HOUR", "DAY", "WEEK", "MONTH", "QUARTER", "YEAR".
    increment   : 1
    }
    * 
    */

    /**
    * @cfg {Object} headerConfig An object containing one or more {@link Sch.preset.ViewPresetHeaderRow} rows defining how your headers shall be composed. 
    * Your 'main' unit should be the middle header unit. This object can contain "bottom", "middle" and "top" header definitions. The 'middle' header is mandatory.
    */
});


/**
@class Sch.preset.ViewPresetHeaderRow

A part of the {@link Sch.preset.ViewPreset} declaration. Not used directly, but the properties below are rather provided 
inline as seen in sources of {@link Sch.preset.Manager}. This class is just provided for documentation purposes.

A sample header configuration will looks like: 

headerConfig    : {
bottom     : {
unit        : "WEEK",
increment   : 1,
renderer    : function(start, end, headerConfig) {
return Sch.util.HeaderRenderers.dayLetter.apply(this, arguments);
}
},
middle : {
unit        : "MONTH",
renderer : function(start, end, headerConfig) {
var month = start.getMonth();
// Simple alternating month in bold
if (start.getMonth()) % 2) {
return '<strong>' + month + '</strong'>';
}
return month
},
align       : 'left'
}
}

*/
Ext.define("Sch.preset.ViewPresetHeaderRow", {
    /**
    * @cfg {String} unit The unit of time represented by each cell in this header row. See also increment property. 
    * Valid values are "MILLI", "SECOND", "MINUTE", "HOUR", "DAY", "WEEK", "MONTH", "QUARTER", "YEAR".
    */

    /**
    * @cfg {Int} increment The number of units each header cell will represent (e.g. 30 together with unit: "MINUTE" for 30 minute cells)
    */

    /**
    * @cfg {String} dateFormat Defines how the cell date will be formatted 
    */

    /**
    * @cfg {Function} renderer A custom renderer function used to render the cell contents. It should return the text to put in the header cell.
    * The render function is called with the following parameters:
    * 
    * - `startDate` : Date - The start date of the cell.
    * - `endDate` : Date - The end date of the cell
    * - `headerConfig` : Object - An object containing the header config object. You can set 'align' (for text-align) and headerCls (a CSS class added to the cell) properties on it.
    * - `i` : Int - The index of the cell in the row.
    * 
    * Example : 

    function (startDate, endDate, headerConfig, i) {
    headerConfig.align = "left";
    headerConfig.headerCls = "myClass"; // will be added as a CSS class of the header cell DOM element

    return Ext.Date.format(startDate, 'Y-m-d');
    }

    */

    /**
    * @cfg {Object} scope The scope to use for the renderer function
    */

    /**
    * @cfg {Function} cellGenerator A function that should return an array of objects containing 'start', 'end' and 'header' properties. 
    * Use this if you want full control over how the header rows are generated. This is not applicable for the lowest row in your configuration. 
    */
});


/**
@class Sch.feature.AbstractTimeSpan
@extends Ext.util.Observable

Plugin for visualizing "global" time span in the scheduler grid, these can by styled easily using just CSS. This is an abstract class not intended for direct use.

*/
Ext.define("Sch.feature.AbstractTimeSpan", {
    extend: 'Ext.AbstractPlugin',
    lockableScope: 'normal',

    schedulerView: null,
    timeAxis: null,
    containerEl: null,

    // If lines/zones should stretch to fill the whole view container element in case the table does not fill it
    expandToFitView: false,

    disabled: false,

    /**
    * @property {String} cls An internal css class which is added to each rendered time span element
    * @private
    */
    cls: null,

    /**
    * @cfg {Ext.XTemplate} template Template to render the time span elements
    */
    template: null,

    /**
    * @property {Ext.data.Store} store The store containing the time spans to be visualized
    * @cfg {Ext.data.Store} store A store with time span data
    */
    store: null,

    renderElementsBuffered: false,

    /**
    * @cfg {Int} renderDelay Delay the zones rendering by this amount (to speed up the default rendering of rows and events).
    */
    renderDelay: 15,

    constructor: function (cfg) {
        // unique css class to be able to identify only the zones belonging to this plugin instance
        this.uniqueCls = this.uniqueCls || ('sch-timespangroup-' + Ext.id());

        Ext.apply(this, cfg);
    },


    /**
    * @param {Boolean} disabled Pass `true` to disable the plugin (and remove all lines)
    */
    setDisabled: function (disabled) {
        if (disabled) {
            this.removeElements();
        }

        this.disabled = disabled;
    },


    /**
    * Returns the currently rendered DOM elements of this plugin (if any), as the {@link Ext.CompositeElementLite} instance.  
    * @return {Ext.CompositeElementLite}
    */
    getElements: function () {
        if (this.containerEl) {
            return this.containerEl.select('.' + this.uniqueCls);
        }

        return null;
    },


    // private
    removeElements: function () {
        var els = this.getElements();
        if (els) {
            els.remove();
        }
    },


    init: function (scheduler) {
        this.timeAxis = scheduler.getTimeAxis();
        this.schedulerView = scheduler.getSchedulingView();

        if (!this.store) {
            Ext.Error.raise("Error: You must define a store for this plugin");
        }

        this.schedulerView.on({
            afterrender: this.onAfterRender,
            destroy: this.onDestroy,
            scope: this
        });
    },


    onAfterRender: function (scheduler) {
        var view = this.schedulerView;
        this.containerEl = view.el;

        view.mon(this.store, {
            load: this.renderElements,
            datachanged: this.renderElements,
            clear: this.renderElements,

            add: this.renderElements,
            remove: this.renderElements,
            update: this.refreshSingle,

            scope: this
        });

        if (Ext.data.NodeStore && view.store instanceof Ext.data.NodeStore) {
            // if the view is animated, then update the elements in "after*" events (when the animation has completed)
            if (view.animate) {
                // NOT YET SUPPORTED
                //                view.on({
                //                    afterexpand     : this.renderElements, 
                //                    aftercollapse   : this.renderElements,
                //                    
                //                    scope           : this
                //                });
            } else {
                view.mon(view.store, {
                    expand: this.renderElements,
                    collapse: this.renderElements,

                    scope: this
                });
            }
        }

        view.on({
            refresh: this.renderElements,
            itemadd: this.renderElements,
            itemremove: this.renderElements,
            itemupdate: this.renderElements,
            // start grouping events
            groupexpand: this.renderElements,
            groupcollapse: this.renderElements,

            columnwidthchange: this.renderElements,
            resize: this.renderElements,

            scope: this
        });

        view.headerCt.on({
            add: this.renderElements,
            remove: this.renderElements,
            scope: this
        });

        view.ownerCt.up('panel').on({
            viewchange: this.renderElements,
            orientationchange: this.renderElements,

            scope: this
        });

        this.renderElements();
    },

    renderElements: function () {
        if (this.renderElementsBuffered || this.disabled || this.schedulerView.headerCt.getColumnCount() === 0) return;

        this.renderElementsBuffered = true;

        // Defer to make sure rendering is not delayed by this plugin
        // deferring on 15 because the cascade delay is 10 (cascading will trigger a view refresh)
        Ext.Function.defer(this.renderElementsInternal, this.renderDelay, this);
    },

    renderElementsInternal: function () {
        this.renderElementsBuffered = false;

        //                            | component could be destroyed during the buffering time frame
        if (this.disabled || this.schedulerView.isDestroyed || this.schedulerView.headerCt.getColumnCount() === 0) return;

        this.removeElements();

        Ext.core.DomHelper.insertHtml('afterBegin', this.containerEl.dom, this.generateMarkup());
    },

    generateMarkup: function (isPrint) {

        var start = this.timeAxis.getStart(),
            end = this.timeAxis.getEnd(),
            data = this.getElementData(start, end, null, isPrint);

        return this.template.apply(data);
    },

    getElementData: function (viewStart, viewEnd) {
        throw 'Abstract method call';
    },


    onDestroy: function () {
        if (this.store.autoDestroy) {
            this.store.destroy();
        }
    },

    refreshSingle: function (store, record) {
        var el = Ext.get(this.uniqueCls + '-' + record.internalId);

        if (el) {
            var start = this.timeAxis.getStart(),
                end = this.timeAxis.getEnd(),
                data = this.getElementData(start, end, [record])[0],
                clsField = record.clsField || 'Cls';

            if (data) {
                // Reapply CSS classes
                el.dom.className = this.cls + ' ' + this.uniqueCls + ' ' + (data[clsField] || '');

                el.setTop(data.top);
                el.setLeft(data.left);
                el.setSize(data.width, data.height);
            } else {
                Ext.destroy(el);
            }
        } else {
            // Should not happen, fallback to full refresh
            this.renderElements();
        }
    }
});

/**
* @private
* @class Sch.feature.DragCreator
* @constructor
* An internal class which shows a drag proxy while clicking and dragging.
* Create a new instance of this plugin
* @param {Sch.schedulerViewPanel} scheduler The scheduler instance
* @param {Object} config The configuration options
*/
Ext.define("Sch.feature.DragCreator", {
    requires: [
        'Ext.XTemplate',
        'Sch.util.Date',
        'Sch.util.DragTracker',
        'Sch.tooltip.Tooltip',
        'Sch.tooltip.ClockTemplate'
    ],

    /**
    * @cfg {Boolean} disabled true to start disabled 
    */
    disabled: false,

    /**
    * @cfg {Boolean} showHoverTip true to show a time tooltip when hovering over the time cells
    */
    showHoverTip: true,

    /**
    * @cfg {Boolean} showDragTip true to show a time tooltip when dragging to create a new event
    */
    showDragTip: true,

    /**
    * @cfg {Int} dragTolerance Number of pixels the drag target must be moved before dragging is considered to have started. Defaults to 2.
    */
    dragTolerance: 2,

    /**
    * @cfg {Ext.Template} template The HTML template shown when dragging to create new items
    */

    /**
    * An empty function by default, but provided so that you can perform custom validation on the item being created
    * @param {Ext.data.Model} resourceRecord the resource for which the event is being created
    * @param {Date} startDate
    * @param {Date} endDate
    * @param {Event} e The event object
    * @return {Boolean} isValid True if the creation event is valid, else false to cancel
    */
    validatorFn: Ext.emptyFn,

    /**
    * @cfg {Object} validatorFnScope
    * The scope for the validatorFn
    */
    validatorFnScope: null,


    constructor: function (config) {
        Ext.apply(this, config || {});

        this.lastTime = new Date();
        this.template = this.template || Ext.create("Ext.Template",
            '<div class="sch-dragcreator-proxy sch-event">' +
                '<div class="sch-event-inner">&#160;</div>' +
            '</div>',
            {
                compiled: true,
                disableFormats: true
            }
        );

        this.schedulerView.on("destroy", this.onSchedulerDestroy, this);

        // Lazy setup and rendering of the tooltips
        this.schedulerView.el.on('mousemove', this.setupTooltips, this, { single: true });

        this.callParent([config]);
    },


    /**
    * Enable/disable the plugin
    * @param {Boolean} disabled True to disable this plugin
    */
    setDisabled: function (disabled) {
        this.disabled = disabled;
        if (this.hoverTip) {
            this.hoverTip.setDisabled(disabled);
        }

        if (this.dragTip) {
            this.dragTip.setDisabled(disabled);
        }
    },

    getProxy: function () {
        if (!this.proxy) {
            this.proxy = this.template.append(this.schedulerView.panel.el, {}, true);
        }
        return this.proxy;
    },

    // private
    onMouseMove: function (e) {
        var tip = this.hoverTip;

        // If tip is disabled, return
        if (tip.disabled || this.dragging) {
            return;
        }

        if (e.getTarget('.' + this.schedulerView.timeCellCls, 2)) {

            var time = this.schedulerView.getDateFromDomEvent(e, 'floor');

            if (time) {
                if (time - this.lastTime !== 0) {
                    this.updateHoverTip(time);

                    if (tip.hidden) { // HACK, find better solution
                        tip[Sch.util.Date.compareUnits(this.schedulerView.getTimeResolution().unit, Sch.util.Date.DAY) >= 0 ? 'addCls' : 'removeCls']('sch-day-resolution');
                        tip.show();
                    }
                }
            } else {
                tip.hide();
                this.lastTime = null;
            }
        } else {
            tip.hide();
            this.lastTime = null;
        }
    },

    // private
    updateHoverTip: function (date) {
        if (date) {
            var formattedDate = this.schedulerView.getFormattedDate(date);

            this.hoverTip.update(this.hoverTipTemplate.apply({
                date: date,
                text: formattedDate
            }));
            this.lastTime = date;
        }
    },

    // private
    onBeforeDragStart: function (tracker, e) {
        var s = this.schedulerView,
            t = e.getTarget('.' + s.timeCellCls, 2);

        if (t) {
            var resourceRecord = s.resolveResource(t);
            var dateTime = s.getDateFromDomEvent(e);

            if (!this.disabled && t && s.fireEvent('beforedragcreate', s, resourceRecord, dateTime, e) !== false) {

                // Save record if the user ends the drag outside the current row
                this.resourceRecord = resourceRecord;

                // Start time of the event to be created
                this.originalStart = dateTime;

                // Constrain the dragging within the current row schedule area
                this.resourceRegion = s.getScheduleRegion(this.resourceRecord, this.originalStart);

                // Save date constraints
                this.dateConstraints = s.getDateConstraints(this.resourceRecord, this.originalStart);

                // TODO apply xStep or yStep to drag tracker
                return true;
            }
        }
        return false;
    },

    // private
    onDragStart: function () {
        var me = this,
            view = me.schedulerView,
            proxy = me.getProxy(),
            snap = me.schedulerView.snapToIncrement;

        this.dragging = true;

        if (this.hoverTip) {
            this.hoverTip.disable();
        }

        me.start = me.originalStart;
        me.end = me.start;

        if (view.getOrientation() === 'horizontal') {
            me.rowBoundaries = {
                top: me.resourceRegion.top,
                bottom: me.resourceRegion.bottom
            };

            proxy.setRegion({
                top: me.rowBoundaries.top,
                right: me.tracker.startXY[0],
                bottom: me.rowBoundaries.bottom,
                left: me.tracker.startXY[0]
            });
        } else {
            me.rowBoundaries = {
                left: me.resourceRegion.left,
                right: me.resourceRegion.right
            };

            proxy.setRegion({
                top: me.tracker.startXY[1],
                right: me.resourceRegion.right,
                bottom: me.tracker.startXY[1],
                left: me.resourceRegion.left
            });
        }

        proxy.show();

        me.schedulerView.fireEvent('dragcreatestart', me.schedulerView);

        if (me.showDragTip) {
            me.dragTip.enable();
            me.dragTip.update(me.start, me.end, true);
            me.dragTip.show(proxy);

            // for some reason Ext set `visibility` to `hidden` after a couple of `.hide()` calls
            me.dragTip.el.setStyle('visibility', 'visible');
        }
    },

    // private
    onDrag: function (tracker, e) {
        var me = this,
            view = me.schedulerView,
            dragRegion = me.tracker.getRegion().constrainTo(me.resourceRegion),
            dates = view.getStartEndDatesFromRegion(dragRegion, 'round');

        if (!dates) {
            return;
        }

        me.start = dates.start || me.start;
        me.end = dates.end || me.end;

        var dc = me.dateConstraints;

        if (dc) {
            me.end = Sch.util.Date.constrain(me.end, dc.start, dc.end);
            me.start = Sch.util.Date.constrain(me.start, dc.start, dc.end);
        }

        me.valid = this.validatorFn.call(me.validatorFnScope || me, me.resourceRecord, me.start, me.end) !== false;

        if (me.showDragTip) {
            me.dragTip.update(me.start, me.end, me.valid);
        }

        Ext.apply(dragRegion, me.rowBoundaries);

        this.getProxy().setRegion(dragRegion);
    },

    // private
    onDragEnd: function (tracker, e) {
        this.dragging = false;
        var s = this.schedulerView;

        if (this.showDragTip) {
            this.dragTip.disable();
        }

        if (!this.start || !this.end || (this.end - this.start <= 0)) {
            this.valid = false;
        }

        if (this.valid) {
            var ev = Ext.create(this.schedulerView.eventStore.model);
            ev.assign(this.resourceRecord);
            ev.setStartEndDate(this.start, this.end);
            s.fireEvent('dragcreateend', s, ev, this.resourceRecord, e);
        } else {
            this.proxy.hide();
        }

        this.schedulerView.fireEvent('afterdragcreate', s);

        if (this.hoverTip) {
            this.hoverTip.enable();
        }
    },

    tipCfg: {
        trackMouse: true,
        bodyCssClass: 'sch-hovertip',
        autoHide: false,
        dismissDelay: 1000,
        showDelay: 300
    },

    dragging: false,

    setupTooltips: function () {
        var me = this,
            sv = me.schedulerView;

        me.tracker = new Sch.util.DragTracker({
            el: sv.el,
            tolerance: me.dragTolerance,
            listeners: {
                beforedragstart: me.onBeforeDragStart,
                dragstart: me.onDragStart,
                drag: me.onDrag,
                dragend: me.onDragEnd,
                scope: me
            }
        });

        if (this.showDragTip) {
            this.dragTip = Ext.create("Sch.tooltip.Tooltip", {
                cls: 'sch-dragcreate-tip',
                schedulerView: sv,
                listeners: {
                    beforeshow: function () { return me.dragging; }
                }
            });
        }

        if (me.showHoverTip) {
            var gridViewBodyEl = sv.el;

            me.hoverTipTemplate = me.hoverTipTemplate || Ext.create("Sch.tooltip.ClockTemplate");

            me.hoverTip = new Ext.ToolTip(Ext.applyIf({
                renderTo: document.body,
                target: gridViewBodyEl,
                disabled: me.disabled
            }, me.tipCfg));

            me.hoverTip.on('beforeshow', me.tipOnBeforeShow, me);

            sv.mon(gridViewBodyEl, {
                mouseleave: function () {
                    me.hoverTip.hide();
                },
                mousemove: me.onMouseMove,
                scope: me
            });
        }
    },

    onSchedulerDestroy: function () {
        if (this.hoverTip) {
            this.hoverTip.destroy();
        }

        if (this.dragTip) {
            this.dragTip.destroy();
        }

        if (this.tracker) {
            this.tracker.destroy();
        }

        if (this.proxy) {
            Ext.destroy(this.proxy);
            this.proxy = null;
        }
    },

    tipOnBeforeShow: function (tip) {
        return !this.disabled && !this.dragging && this.lastTime !== null;
    }
});

Ext.define("Sch.feature.DragZone", {
    extend: "Ext.dd.DragZone",

    containerScroll: true,

    onStartDrag: function () {
        var s = this.schedulerView;
        s.fireEvent('eventdragstart', s, this.dragData.records);
    },

    // On receipt of a mousedown event, see if it is within a draggable element.
    // Return a drag data object if so. The data object can contain arbitrary application
    // data, but it should also contain a DOM element in the ddel property to provide
    // a proxy to drag.
    getDragData: function (e) {
        var s = this.schedulerView,
            sourceNode = e.getTarget(s.eventSelector);

        if (sourceNode) {
            var sm = s.getSelectionModel(),
                sourceNodeEl = Ext.get(sourceNode),
                eventEl = sourceNodeEl.is(s.eventSelector) ? sourceNode : sourceNodeEl.up(s.eventSelector).dom,
                sourceEventRecord = s.getEventRecordFromDomId(eventEl.id);

            if (s.fireEvent('beforeeventdrag', s, sourceEventRecord, e) === false) {
                return null;
            }

            var nodes,
                start = sourceEventRecord.getStartDate(),
                selectedRecords = [sourceEventRecord],   // Not supporting dragging of multiple records
                copy,
                wrap = Ext.get(Ext.core.DomHelper.createDom({
                    cls: 'sch-dd-wrap',
                    children: [{
                        cls: 'sch-dd-proxy-hd',
                        html: '&nbsp'
                    }]
                }));

            for (var i = 0, len = selectedRecords.length; i < len; i++) {
                copy = s.getElementFromEventRecord(selectedRecords[i]).dom.cloneNode(true);
                copy.id = Ext.id();
                wrap.appendChild(copy);
            }
            return {
                repairXY: Ext.fly(sourceNode).getXY(),
                ddel: wrap.dom,
                sourceEventRecord: sourceEventRecord,
                records: selectedRecords,
                duration: sourceEventRecord.getEndDate() - start
            };
        }
        return null;
    },

    // Override, get rid of weird highlight fx in default implementation
    afterRepair: function () {
        this.dragging = false;
        var s = this.schedulerView;
        s.fireEvent('aftereventdrop', s);
    },

    // Provide coordinates for the proxy to slide back to on failed drag.
    // This is the original XY coordinates of the draggable element.
    getRepairXY: function () {
        return this.dragData.repairXY;
    },

    onDragKeyDown: function (e) {
        var p = this.getProxy();
        if (e.ctrlKey && (p.dropStatus === p.dropAllowed || p.dropStatus === (p.dropAllowed + " add"))) {
            p.setStatus(p.dropAllowed + " add");
        }
    },

    onDragKeyUp: function (e) {
        if (!e.ctrlKey) {
            var p = this.getProxy();
            p.setStatus(p.dropStatus.replace(' add', ''));
        }
    },

    // Register key listener for copy functionality
    onMouseDown: function () {
        if (this.enableCopy) {
            Ext.getBody().on({
                'keydown': this.onDragKeyDown,
                'keyup': this.onDragKeyUp,
                scope: this
            });
        }
    },

    // Deregister key listener for copy functionality
    onMouseUp: function () {
        var b = Ext.getBody();
        b.un('keydown', this.onDragKeyDown, this);
        b.un('keyup', this.onDragKeyUp, this);
    }
});

Ext.define("Sch.feature.DropZone", {
    extend: "Ext.dd.DropZone",

    constructor: function () {
        this.callParent(arguments);
        var schedulerView = this.schedulerView;

        this.proxyTpl = this.proxyTpl || new Ext.XTemplate(
            '<span class="sch-dd-newtime">' +
                '{[ this.getText(values) ]}' +
            '</span>',
            {
                getText: function (vals) {
                    var retVal = schedulerView.getFormattedDate(vals.StartDate);

                    if (vals.Duration) {
                        retVal += ' - ' + schedulerView.getFormattedEndDate(Sch.util.Date.add(vals.StartDate, Sch.util.Date.MILLI, vals.Duration), vals.StartDate);
                    }
                    return retVal;
                }
            }
        );
    },

    validatorFn: Ext.emptyFn,

    getTargetFromEvent: function (e) {
        return e.getTarget('.' + this.schedulerView.timeCellCls);
    },

    // On entry into a target node, highlight that node.
    onNodeEnter: function (target, dragSource, e, data) {
        Ext.fly(target).addCls('sch-dd-cellover');
    },

    // On exit from a target node, unhighlight that node.
    onNodeOut: function (target, dragSource, e, data) {
        Ext.fly(target).removeCls('sch-dd-cellover');
    },

    onNodeOver: function (target, dragSource, e, data) {
        var s = this.schedulerView,
            date = s.getDateFromDomEvent(e, 'round'),
            newText;

        if (!date) return this.dropNotAllowed;

        this.proxyTpl.overwrite(dragSource.proxy.el.down('.sch-dd-proxy-hd'), {
            StartDate: date,
            Duration: data.duration
        });

        var targetRecord = s.resolveResource(e.getTarget('.' + s.timeCellCls));

        if (this.validatorFn.call(this.validatorFnScope || this, data.records, targetRecord, date, data.duration, e) !== false) {
            return this.dropAllowed + ((this.enableCopy && e.ctrlKey) ? ' add' : '');
        } else {
            return this.dropNotAllowed;
        }
    },

    onNodeDrop: function (target, dragSource, e, data) {
        var s = this.schedulerView,
            targetRecord = s.resolveResource(target),
            date = s.getDateFromDomEvent(e, 'round'),
            valid = false,
            isCopy = this.enableCopy && e.ctrlKey;

        if (date && this.validatorFn.call(this.validatorFnScope || this, data.records, targetRecord, date, data.duration, e) !== false) {
            var copies,
                index = s.resourceStore.indexOf(targetRecord);

            if (isCopy) {
                copies = this.copyRecords(data.records, date, targetRecord, data.sourceEventRecord, index);
                valid = true;
            } else {
                valid = this.updateRecords(data.records, date, targetRecord, data.sourceEventRecord, index, data);
            }

            // Clear selections after succesful drag drop
            if (valid) {
                s.getSelectionModel().deselectAll();
            }
            s.fireEvent('eventdrop', s, isCopy ? copies : data.records, isCopy);
        }

        s.fireEvent('aftereventdrop', s);
        return valid;
    },

    /** 
    *  Update the event record with the new information
    */
    updateRecords: function (records, newStartDate, dropResourceRecord, sourceEventRecord, targetIndex, data) {
        // Simplified scenario, 1 drag drop item
        if (records.length === 1) {
            sourceEventRecord.beginEdit();
            sourceEventRecord.assign(dropResourceRecord);
            sourceEventRecord.setStartDate(newStartDate);
            sourceEventRecord.setEndDate(Sch.util.Date.add(newStartDate, Sch.util.Date.MILLI, data.duration));
            sourceEventRecord.endEdit();
            return true;
        }

        var sourceEventRecordStart = sourceEventRecord.getStartDate(),
            resourceStore = this.schedulerView.resourceStore,
            diffStart = newStartDate - sourceEventRecordStart,
            sourceIndex = resourceStore.indexOf(sourceEventRecord.getResource()),
            diff,
            oldIndex,
            newResourceRecord,
            r,
            newIndex,
            nbrRecords = resourceStore.getCount(),
            i;

        // Validate, make sure all items fit within the current view
        for (i = 0; i < records.length; i++) {
            r = records[i];
            oldIndex = resourceStore.indexOf(r.getResource());
            newIndex = oldIndex - sourceIndex + targetIndex;
            if (newIndex < 0 || newIndex > nbrRecords) {
                return false;
            }
        }

        for (i = 0; i < records.length; i++) {
            r = records[i];
            oldIndex = resourceStore.indexOf(r.getResource());
            diff = oldIndex - sourceIndex;
            newResourceRecord = resourceStore.getAt(targetIndex + diff);
            r.beginEdit();
            r.assign(newResourceRecord);
            r.setStartDate(Sch.util.Date.add(r.getStartDate(), Sch.util.Date.MILLI, diffStart));
            r.setEndDate(Sch.util.Date.add(r.getEndDate(), Sch.util.Date.MILLI, diffStart));
            r.endEdit();
        }

        return true;
    },

    // Update the event record with the new information
    copyRecords: function (records, newStartDate, targetRecord, sourceEventRecord, targetIndex) {
        var record = records[0],
            newItem = record.copy(),
            duration = sourceEventRecord.getEndDate() - sourceEventRecord.getStartDate();

        newItem.assign(targetRecord);
        newItem.setStartDate(newStartDate);
        newItem.setEndDate(Sch.util.Date.add(newStartDate, Sch.util.Date.MILLI, duration));

        return [newItem];
    }
});


/*
* @class Sch.PointSchedulerDragZone
* @extends Ext.dd.DragZone
* A custom dragzone that also acts as the dropzone, and optionally constrains the drag to the resource area that contains the dragged element.
* @constructor
* @param {Object} config The object containing the configuration of this model.
*/
Ext.define("Sch.feature.PointDragZone", {
    extend: "Ext.dd.DragZone",

    requires: [
        'Sch.tooltip.Tooltip'
    ],

    repairHighlight: false,
    containerScroll: true,
    dropAllowed: "sch-dragproxy",
    dropNotAllowed: "sch-dragproxy",

    // private
    constructor: function (el, config) {
        this.proxy = this.proxy || Ext.create("Ext.dd.StatusProxy", {
            shadow: false,
            dropAllowed: "sch-dragproxy",
            dropNotAllowed: "sch-dragproxy"
        });
        this.callParent(arguments);
        this.isTarget = true;
        this.scroll = false;
        this.ignoreSelf = false;
        Ext.dd.ScrollManager.register(this.el);
    },

    // private
    destroy: function () {
        this.callParent(arguments);
        Ext.dd.ScrollManager.unregister(this.el);
    },

    // private
    autoOffset: function (x, y) {
        var xy = this.dragData.repairXY, // Original position of the element
            xDelta = x - xy[0],
            yDelta = y - xy[1];

        this.setDelta(xDelta, yDelta);
    },

    // private
    constrainTo: function (constrainingRegion, elRegion) {
        this.resetConstraints();
        this.initPageX = constrainingRegion.left;
        this.initPageY = constrainingRegion.top;
        this.setXConstraint(constrainingRegion.left, constrainingRegion.right - (elRegion.right - elRegion.left), this.xTickSize);
        this.setYConstraint(constrainingRegion.top, constrainingRegion.bottom - (elRegion.bottom - elRegion.top), this.yTickSize);
    },

    constrainToResource: function (constrainingRegion, elRegion, orientation) {
        this.resetConstraints();
        this.initPageX = constrainingRegion.left;
        this.initPageY = constrainingRegion.top;

        if (orientation === 'horizontal') {
            this.setXConstraint(constrainingRegion.left, constrainingRegion.right - (elRegion.right - elRegion.left), this.xTickSize);
            this.setYConstraint(elRegion.top, elRegion.top, this.yTickSize);
        } else {
            this.setXConstraint(elRegion.left, elRegion.left, this.xTickSize);
            this.setYConstraint(constrainingRegion.top, constrainingRegion.bottom - (elRegion.bottom - elRegion.top), this.yTickSize);
        }
    },

    // private
    setXConstraint: function (iLeft, iRight, iTickSize) {
        this.leftConstraint = iLeft;
        this.rightConstraint = iRight;

        this.minX = iLeft;
        this.maxX = iRight;
        if (iTickSize) { this.setXTicks(this.initPageX, iTickSize); }

        this.constrainX = true;
    },

    setYConstraint: function (iUp, iDown, iTickSize) {
        this.topConstraint = iUp;
        this.bottomConstraint = iDown;

        this.minY = iUp;
        this.maxY = iDown;
        if (iTickSize) { this.setYTicks(this.initPageY, iTickSize); }

        this.constrainY = true;
    },

    // Don't seem to need these
    onDragEnter: Ext.emptyFn,
    onDragOut: Ext.emptyFn,

    // private
    resolveStartEndDates: function (proxyRegion) {
        var dd = this.dragData,
            startEnd,
            start = dd.origStart,
            end = dd.origEnd;

        if (!dd.startsOutsideView) {
            startEnd = this.schedulerView.getStartEndDatesFromRegion(proxyRegion, 'round');
            if (startEnd) {
                start = startEnd.start || dd.start;
                end = Sch.util.Date.add(start, Sch.util.Date.MILLI, dd.duration);
            }
        } else if (!dd.endsOutsideView) {
            startEnd = this.schedulerView.getStartEndDatesFromRegion(proxyRegion, 'round');
            if (startEnd) {
                end = startEnd.end || dd.end;
                start = Sch.util.Date.add(end, Sch.util.Date.MILLI, -dd.duration);
            }
        }

        return {
            startDate: start,
            endDate: end
        };
    },

    // private
    onDragOver: function (e, id) {
        var dd = this.dragData;

        if (!dd.originalHidden) {
            // Hide dragged event elements at this time
            Ext.each(dd.eventEls, function (el) {
                el.hide();
            });

            dd.originalHidden = true;
        }

        if (this.showTooltip) {
            var context = this.getDragContext(e);

            if (context) {
                this.tip.update(context.startDate, context.endDate, context.valid);
            }
        }
    },

    // private
    getDragContext: function (e) {
        var dd = this.dragData;

        if (!dd.refElement) return;

        var s = this.schedulerView,
            proxyRegion = dd.refElement.getRegion();

        var context = this.resolveStartEndDates(proxyRegion);
        context.resource = s.constrainDragToResource ? dd.resourceRecord : this.resolveResource([proxyRegion.left + dd.offsets[0], proxyRegion.top + dd.offsets[1]], e);

        if (context.resource) {
            context.valid = this.validatorFn.call(this.validatorFnScope || this, dd.eventRecords, context.resource, context.startDate, dd.duration, e);
        } else {
            context.valid = false;
        }
        return context;
    },

    // private
    onStartDrag: function (x, y) {
        var s = this.schedulerView,
            dd = this.dragData;

        this.start = dd.origStart;
        this.end = dd.origEnd;

        s.fireEvent('eventdragstart', s, dd.eventRecords);
    },

    // HACK, overriding private method, proxy needs to be shown before aligning to it
    startDrag: function () {
        var retVal = this.callParent(arguments);

        // This is the representation of the original element inside the proxy
        this.dragData.refElement = this.proxy.el.down('#sch-id-dd-ref');

        if (this.showTooltip) {
            var s = this.schedulerView;

            if (!this.tip) {
                this.tip = Ext.create("Sch.tooltip.Tooltip", {
                    schedulerView: s,
                    cls: 'sch-dragdrop-tip'
                });
            }
            this.tip.update(this.start, this.end, true);
            // Seems required as of Ext 4.1.0, to clear the visibility:hidden style.
            this.tip.el.setStyle('visibility');
            this.tip.show(this.dragData.refElement, this.dragData.offsets[0]);
        }

        return retVal;
    },

    // private
    getDragData: function (e) {
        var s = this.schedulerView,
            t = e.getTarget(s.eventSelector);

        if (!t) {
            return;
        }

        var eventRecord = s.resolveEventRecord(t);

        if (eventRecord.isDraggable() === false || s.fireEvent('beforeeventdrag', s, eventRecord, e) === false) {
            return null;
        }

        var xy = e.getXY(),
            eventEl = Ext.get(t),
            eventXY = eventEl.getXY(),
            offsets = [xy[0] - eventXY[0], xy[1] - eventXY[1]],
            resource = s.resolveResource(t),
            eventRegion = eventEl.getRegion(),
            tickSize = s.getSnapPixelAmount();

        if (!resource) {
            throw 'Resource could not be resolved for event: ' + eventRecord.getId();
        }

        this.clearTicks();

        if (s.constrainDragToResource) {
            this.constrainToResource(s.getScheduleRegion(resource, eventRecord), eventRegion, s.getOrientation());
        } else {
            this.constrainTo(s.getScheduleRegion(null, eventRecord), eventRegion);
        }

        if (tickSize >= 1) {
            if (s.getOrientation() === 'horizontal') {
                this.setXConstraint(this.leftConstraint, this.rightConstraint, tickSize);
            } else {
                this.setYConstraint(this.topConstraint, this.bottomConstraint, tickSize);
            }
        }

        var origStart = eventRecord.getStartDate(),
            ta = s.timeAxis,
            viewStart = ta.getStart(),
            viewEnd = ta.getEnd(),
            origEnd = eventRecord.getEndDate(),
            startsOutsideView = origStart < viewStart,
            endsOutsideView = origEnd > viewEnd,
            bodyScroll = Ext.getBody().getScroll(),
            relatedRecords = this.getRelatedRecords(eventRecord),
            eventEls = [eventEl];

        // Collect additional elements to drag 
        Ext.Array.each(relatedRecords, function (r) {
            var el = s.getElementFromEventRecord(r);

            if (el) {
                eventEls.push(el);
            }
        });

        var dragData = {
            offsets: offsets,
            eventEls: eventEls,
            repairXY: eventXY,
            eventRecords: [eventRecord].concat(relatedRecords),
            relatedEventRecords: relatedRecords,
            resourceRecord: resource,
            origStart: origStart,
            origEnd: origEnd,
            duration: origEnd - origStart,
            startsOutsideView: startsOutsideView,
            endsOutsideView: endsOutsideView,
            bodyScroll: bodyScroll,
            eventObj: e
        };

        dragData.ddel = this.getDragElement(eventEl, dragData);

        return dragData;
    },


    /**
    * Provide your custom implementation of this to allow additional event records to be dragged together with the original one.
    * @param {Sch.model.Event} eventRecord The eventRecord about to be dragged
    * @return {Sch.model.Event[]} An array of event records to drag together with the original event
    */
    getRelatedRecords: function (sourceEventRecord) {
        var s = this.schedulerView;
        var sm = s.panel.up('tablepanel').getEventSelectionModel(); // HACK, should be able to get selected model without this much effort
        var result = [];

        if (sm.selected.getCount() > 1) {
            sm.selected.each(function (rec) {
                if (rec !== sourceEventRecord && rec.isDraggable() !== false) {
                    result.push(rec);
                }
            });
        }

        return result;
    },

    /**
    * This function should return a DOM node representing the markup to be dragged. By default it just returns the selected element(s) that are to be dragged.
    * If dragging multiple events, the clone of the original item should be assigned the special id 'sch-id-dd-ref'
    * @param {Ext.Element} sourceEl The event element that is the source drag element
    * @param {Object} dragData The drag drop context object
    * @return {HTMLElement} The DOM node to drag
    */
    getDragElement: function (sourceEl, dragData) {
        var s = this.schedulerView;
        var relatedEventEls = dragData.eventEls;
        var copy;

        if (relatedEventEls.length > 1) {
            var ctEl = Ext.get(Ext.core.DomHelper.createDom({
                tag: 'div',
                cls: 'sch-dd-wrap',
                style: {
                    overflow: 'visible'
                }
            }));

            Ext.Array.each(relatedEventEls, function (el) {
                copy = el.dom.cloneNode(true);
                if (el.dom === sourceEl.dom) {
                    copy.id = "sch-id-dd-ref";
                } else {
                    copy.id = Ext.id();
                }
                ctEl.appendChild(copy);

                var elOffsets = el.getOffsetsTo(sourceEl);

                // Adjust each element offset to the source event element 
                Ext.fly(copy).setStyle({
                    left: elOffsets[0] + 'px',
                    top: elOffsets[1] + 'px'
                });
            });

            return ctEl.dom;
        } else {
            copy = sourceEl.dom.cloneNode(true);
            copy.id = "sch-id-dd-ref";
            copy.style.left = 0;
            copy.style.top = 0;
            return copy;
        }

    },

    onDragDrop: function (e, id) {
        var me = this,
            s = me.schedulerView,
            resourceStore = s.resourceStore,
            target = me.cachedTarget || Ext.dd.DragDropMgr.getDDById(id),
            dragData = me.dragData,
            context = me.getDragContext(e),
            modified = false;

        if (context &&
            context.valid &&
            context.startDate &&
            context.endDate &&
            this.isValidDrop(dragData.resourceRecord, context.resource, dragData.relatedEventRecords)) {
            var rec = dragData.eventRecords[0],
                start = context.startDate,
                relatedEventRecords = dragData.relatedEventRecords,
                timeDiff = start - dragData.origStart,
                newResource = context.resource;

            modified = (context.startDate - dragData.origStart) !== 0 ||
                        newResource !== dragData.resourceRecord;

            rec.beginEdit();
            if (newResource !== dragData.resourceRecord) {
                rec.unassign(dragData.resourceRecord);
                rec.assign(newResource);
            }
            rec.setStartDate(context.startDate, true, s.eventStore.skipWeekendsDuringDragDrop);
            rec.endEdit();

            // Process related records
            var indexDiff;
            var isTreeStore = Ext.data.TreeStore && resourceStore instanceof Ext.data.TreeStore;

            if (isTreeStore) {
                indexDiff = s.indexOf(dragData.resourceRecord) - s.indexOf(newResource);
            } else {
                indexDiff = resourceStore.indexOf(dragData.resourceRecord) - resourceStore.indexOf(newResource);
            }

            Ext.each(relatedEventRecords, function (related) {
                related.shift(Ext.Date.MILLI, timeDiff);

                if (isTreeStore) {
                    var newIndex = s.store.indexOf(related.getResource()) - indexDiff;

                    related.setResource(s.store.getAt(newIndex));
                } else {
                    related.setResource(resourceStore.getAt(resourceStore.indexOf(related.getResource()) - indexDiff));
                }
            });

            // Tell the world we're done
            s.fireEvent('eventdrop', s, [rec].concat(relatedEventRecords), false);
        }
        if (me.tip) {
            me.tip.hide();
        }

        if (context && context.valid && modified) {
            // For our good friend IE9, the pointer cursor gets stuck without the defer
            if (Ext.isIE9) {
                me.proxy.el.setStyle('visibility', 'hidden');
                Ext.Function.defer(me.onValidDrop, 10, me, [target, e, id]);
            } else {
                me.onValidDrop(target, e, id);
            }
            s.fireEvent('aftereventdrop', s);
        } else {
            this.onInvalidDrop(target, e, id);
        }
    },

    // Process related records, see if they all fit in the current view (required)
    isValidDrop: function (oldResource, newResource, relatedRecords) {
        if (oldResource === newResource || relatedRecords.length === 0) {
            return true;
        }

        var me = this,
            s = me.schedulerView,
            valid = true,
            indexDiff,
            resourceStore = s.resourceStore,
            newIndex,
            isTreeStore = Ext.data.TreeStore && resourceStore instanceof Ext.data.TreeStore;

        if (isTreeStore) {
            indexDiff = s.indexOf(oldResource) - s.indexOf(newResource);
        } else {
            indexDiff = resourceStore.indexOf(oldResource) - resourceStore.indexOf(newResource);
        }

        Ext.each(relatedRecords, function (related) {
            if (isTreeStore) {
                newIndex = s.store.indexOf(oldResource) - indexDiff;

                if (newIndex < 0 || newIndex >= s.store.getCount()) {
                    valid = false;
                    return false;
                }
            } else {
                newIndex = resourceStore.indexOf(oldResource) - indexDiff;

                if (newIndex < 0 || newIndex >= resourceStore.getCount()) {
                    valid = false;
                    return false;
                }
            }
        });

        return valid;
    },

    onInvalidDrop: function () {
        var s = this.schedulerView;

        if (this.tip) {
            this.tip.hide();
        }
        Ext.each(this.dragData.eventEls, function (el) {
            el.show();
        });
        this.callParent(arguments);
        s.fireEvent('aftereventdrop', s);
    },

    resolveResource: function (xy, e) {
        var proxyDom = this.proxy.el.dom;

        proxyDom.style.display = 'none';
        var node = document.elementFromPoint(xy[0] - this.dragData.bodyScroll.left, xy[1] - this.dragData.bodyScroll.top);

        // IE8 like it twice, for simulated events..
        if (Ext.isIE8 && e && e.browserEvent.synthetic) {
            node = document.elementFromPoint(xy[0] - this.dragData.bodyScroll.left, xy[1] - this.dragData.bodyScroll.top);
        }

        proxyDom.style.display = 'block';

        if (!node) {
            return null;
        }

        if (!node.className.match(this.schedulerView.timeCellCls)) {
            var parent = Ext.fly(node).up('.' + this.schedulerView.timeCellCls);
            if (parent) {
                node = parent.dom;
                return this.schedulerView.resolveResource(node);
            }
            return null;
        }
        return this.schedulerView.resolveResource(node);
    }
});


/**
* @class Sch.feature.DragDrop
* Internal class enabling drag and drop for event nodes and creating drag proxy (classic or simplified). 
* Type of proxy can be configured with {@link Sch.mixin.SchedulerPanel#cfg-dragConfig SchedulerPanel} dragConfig property.
* @constructor
* @param {Sch.panel.SchedulerGrid} scheduler The scheduler instance
* @param {Object} config The object containing the configuration of this model.
*/
Ext.define("Sch.feature.DragDrop", {

    requires: [
        'Ext.XTemplate',
        'Sch.feature.PointDragZone',
        'Sch.feature.DragZone',
        'Sch.feature.DropZone'
    ],

    /**
    * An empty function by default, but provided so that you can perform custom validation on 
    * the item being dragged. This function is called during the drag and drop process and also after the drop is made
    * @param {Array} dragRecords an array containing the records for the events being dragged
    * @param {Ext.data.Model} targetResourceRecord the target resource of the the event 
    * @param {Date} date The date corresponding to the current mouse position
    * @param {Int} duration The duration of the item being dragged
    * @param {Event} e The event object
    * @return {Boolean} true if the drop position is valid, else false to prevent a drop
    */
    validatorFn: function (dragRecords, targetResourceRecord, date, duration, e) {
        return true;
    },

    /**
    * @cfg {Object} validatorFnScope
    * The scope for the validatorFn
    */

    /**
    * @cfg {Boolean} enableCopy (Experimental) true to enable copy by pressing CTRL key during drag drop,
    *                only supported for a single record.
    */
    enableCopy: false,

    /**
    * @cfg {Boolean} useDragProxy true to force classic drag-drop mode using a proxy.
    */
    useDragProxy: false,

    /**
    * @cfg {Boolean} showTooltip true to show a tooltip when dragging without proxy
    */
    showTooltip: true,

    constructor: function (schedulerView, config) {
        Ext.apply(this, config);

        this.schedulerView = schedulerView;

        var supportsElementFromPoint = !!document.elementFromPoint;

        if (!this.useDragProxy && !this.dragConfig.useDragProxy && supportsElementFromPoint) {
            this.initProxyLessDD();
        } else {
            this.initProxyDD();
        }

        this.schedulerView.on("destroy", this.cleanUp, this);

        this.callParent([config]);
    },

    cleanUp: function () {
        if (this.schedulerView.dragZone) {
            this.schedulerView.dragZone.destroy();
        }

        if (this.schedulerView.dropZone) {
            this.schedulerView.dropZone.destroy();
        }

        if (this.tip) {
            this.tip.destroy();
        }
    },

    initProxyLessDD: function () {
        var s = this.schedulerView;

        // The drag zone behaviour
        s.dragZone = Ext.create("Sch.feature.PointDragZone", s.el, Ext.apply({
            ddGroup: s.id,
            schedulerView: s,
            enableCopy: this.enableCopy,
            validatorFn: this.validatorFn,
            validatorFnScope: this.validatorFnScope,
            showTooltip: this.showTooltip
        }, this.dragConfig));
    },

    initProxyDD: function () {
        var s = this.schedulerView,
            el = s.el;

        // The drag zone behaviour
        s.dragZone = Ext.create("Sch.feature.DragZone", el, Ext.apply({
            ddGroup: s.id,
            schedulerView: s,
            enableCopy: this.enableCopy
        }, this.dragConfig));

        // The drop zone behaviour
        s.dropZone = Ext.create("Sch.feature.DropZone", el, Ext.apply({
            ddGroup: s.id,
            schedulerView: s,
            enableCopy: this.enableCopy,
            validatorFn: this.validatorFn,
            validatorFnScope: this.validatorFnScope
        }, this.dropConfig));
    }
});


/**
* @class Sch.feature.ResizeZone
* @extends Ext.util.Observable
* @private
* Internal classing enabling resizing of rendered events
* @constructor
* @param {Sch.panel.SchedulerGrid} scheduler The scheduler instance
* @param {Object} config The object containing the configuration of this model.
*/


Ext.define("Sch.feature.ResizeZone", {
    extend: "Ext.util.Observable",
    requires: [
        'Ext.resizer.Resizer',
        'Sch.tooltip.Tooltip'
    ],

    /**
    * @cfg showTooltip {Boolean} false to not show a tooltip while resizing
    */
    showTooltip: true,

    /**
    * An empty function by default, but provided so that you can perform custom validation on 
    * the item being resized.
    * @param {Ext.data.Model} resourceRecord the resource to which the event belongs
    * @param {Ext.data.Model} eventRecord the event being resized
    * @param {Date} startDate
    * @param {Date} endDate
    * @param {Ext.EventObject} e The event object
    * @return {Boolean} true if the new duration is valid, else false to signal that it is not.
    */
    validatorFn: Ext.emptyFn,

    /**
    * @cfg {Object} validatorFnScope
    * The scope for the validatorFn
    */
    validatorFnScope: null,

    origEl: null,


    constructor: function (config) {
        Ext.apply(this, config);
        var s = this.schedulerView;

        s.on({
            destroy: this.cleanUp,
            scope: this
        });

        s.mon(s.el, {
            mousedown: this.onMouseDown,
            mouseup: this.onMouseUp,
            scope: this,
            delegate: '.sch-resizable-handle'
        });
        this.callParent(arguments);
    },

    onMouseDown: function (e, t) {
        var s = this.schedulerView;
        var eventRec = this.eventRec = s.resolveEventRecord(t);
        var handlePos = this.getHandlePosition(t);
        var isResizable = eventRec.isResizable();

        if (isResizable === false || typeof isResizable === 'string' && !t.className.match(isResizable)) {
            return;
        }

        this.eventRec = eventRec;
        this.handlePos = handlePos;
        this.origEl = Ext.get(e.getTarget('.sch-event'));

        s.el.on({
            mousemove: this.onMouseMove,
            scope: this,
            single: true
        });
    },

    onMouseUp: function (e, t) {
        var s = this.schedulerView;

        s.el.un({
            mousemove: this.onMouseMove,
            scope: this,
            single: true
        });
    },

    onMouseMove: function (e, t) {
        var s = this.schedulerView;
        var eventRec = this.eventRec;

        if (!eventRec || s.fireEvent('beforeeventresize', s, eventRec, e) === false) {
            return;
        }
        delete this.eventRec;
        e.stopEvent();

        var handlePos = this.handlePos;
        this.resizer = this.createResizer(this.origEl, eventRec, handlePos, e, t);

        this.resizer.resizeTracker.onMouseDown(e, this.resizer[handlePos].dom);

        if (this.showTooltip) {
            if (!this.tip) {
                this.tip = Ext.create("Sch.tooltip.Tooltip", {
                    schedulerView: s,
                    cls: 'sch-resize-tip'
                });
            }
            this.tip.update(eventRec.getStartDate(), eventRec.getEndDate(), true);
            this.tip.show(this.origEl);
        }
        s.fireEvent('eventresizestart', s, eventRec);
    },

    getHandlePosition: function (node) {
        if (this.schedulerView.getOrientation() === 'horizontal') {
            return node.className.match('start') ? 'west' : 'east';
        } else {
            return node.className.match('start') ? 'north' : 'south';
        }
    },

    // private
    createResizer: function (el, eventRecord, handlePos) {

        var s = this.schedulerView,
            resourceRecord = s.resolveResource(el),
            increment = s.getSnapPixelAmount(),
            constrainRegion = s.getScheduleRegion(resourceRecord, eventRecord),
            dateConstraints = s.getDateConstraints(resourceRecord, eventRecord),
            resizerCfg = {
                target: el,
                dateConstraints: dateConstraints,
                resourceRecord: resourceRecord,
                eventRecord: eventRecord,
                handles: handlePos.substring(0, 1),
                minHeight: el.getHeight(),
                constrainTo: constrainRegion,
                listeners: {
                    resizedrag: this.partialResize,
                    resize: this.afterResize,
                    scope: this
                }
            };

        // Apply orientation specific configs
        if (s.getOrientation() === 'vertical') {
            if (increment > 0) {
                Ext.apply(resizerCfg, {
                    minHeight: increment,
                    heightIncrement: increment
                });
            }
        } else {
            if (increment > 0) {
                Ext.apply(resizerCfg, {
                    minWidth: increment,
                    widthIncrement: increment
                });
            }
        }

        var resizer = Ext.create('Ext.resizer.Resizer', resizerCfg);

        // Make sure the resizing event is on top of other events
        el.setStyle('z-index', parseInt(el.getStyle('z-index'), 10) + 1);
        return resizer;
    },

    getStartEndDates: function (xy) {
        var r = this.resizer,
            rEl = r.el,
            s = this.schedulerView,
            isStart = r.handles[0] === 'w' || r.handles[0] === 'n',
            start,
            end;

        if (isStart) {
            end = r.eventRecord.getEndDate();
            start = s.getDateFromXY([rEl.getLeft(), rEl.getTop()], 'round');
        } else {
            start = r.eventRecord.getStartDate();
            end = s.getDateFromXY([rEl.getRight(), rEl.getBottom()], 'round');
        }

        if (r.dateConstraints) {
            start = Sch.util.Date.constrain(start, r.dateConstraints.start, r.dateConstraints.end);
            end = Sch.util.Date.constrain(end, r.dateConstraints.start, r.dateConstraints.end);
        }

        return {
            start: start,
            end: end
        };
    },

    // private
    partialResize: function (r, width, height, e) {
        var s = this.schedulerView,
            startEndDates = this.getStartEndDates(e.getXY()),
            start = startEndDates.start,
            end = startEndDates.end;

        if (!start || !end || ((r.start - start === 0) && (r.end - end === 0))) {
            return;
        }

        var valid = this.validatorFn.call(this.validatorFnScope || this, r.resourceRecord, r.eventRecord, start, end) !== false;

        r.end = end;
        r.start = start;

        s.fireEvent('eventpartialresize', s, r.eventRecord, start, end, r.el);

        if (this.showTooltip) {
            this.tip.update(start, end, valid);
        }
    },

    // private
    afterResize: function (r, w, h, e) {
        if (this.showTooltip) {
            this.tip.hide();
        }
        var resourceRecord = r.resourceRecord,
            eventRecord = r.eventRecord,
            oldStart = eventRecord.getStartDate(),
            oldEnd = eventRecord.getEndDate(),
            start = r.start || oldStart,
            end = r.end || oldEnd,
            sv = this.schedulerView;

        if (start && end && (end - start > 0) && // Input sanity check
            ((start - oldStart !== 0) || (end - oldEnd !== 0)) && // Make sure start OR end changed
            this.validatorFn.call(this.validatorFnScope || this, resourceRecord, eventRecord, start, end, e) !== false) {

            //                                      Gantt task store normalization
            eventRecord.setStartEndDate(start, end, sv.eventStore.skipWeekendsDuringDragDrop);
        } else {
            sv.refreshKeepingScroll();
        }

        // Destroy resizer 
        this.resizer.destroy();

        sv.fireEvent('eventresizeend', sv, eventRecord);
    },

    cleanUp: function () {
        if (this.tip) {
            this.tip.destroy();
        }
    }
});

/*
* @class Sch.feature.Scheduling
* @extends Ext.grid.feature.Feature
* @private
* Internal class used to modify the row template for the table rows.
* Removes standard text-align property of 
* @constructor
*/
Ext.define('Sch.feature.Scheduling', {
    extend: 'Ext.grid.feature.Feature',
    alias: 'feature.scheduling',

    getMetaRowTplFragments: function () {
        return {
            embedRowAttr: function () { return 'style="height:{rowHeight}px"'; }
        };
    }
});
/*
@class Sch.column.Time
@extends Ext.grid.Column
@private

A Column representing a time span in the schedule
*/
Ext.define('Sch.column.Time', {
    extend: 'Ext.grid.column.Column',
    alias: 'timecolumn',

    draggable: false,
    groupable: false,
    hideable: false,
    sortable: false,

    fixed: true,

    align: 'center',
    tdCls: 'sch-timetd',
    menuDisabled: true,

    initComponent: function () {
        this.addEvents('timeheaderdblclick');
        this.enableBubble('timeheaderdblclick');

        this.callParent();
    },

    initRenderData: function () {
        var me = this;
        me.renderData.headerCls = me.renderData.headerCls || me.headerCls;
        return me.callParent(arguments);
    },

    // HACK, overriding private method    
    onElDblClick: function (e, t) {
        this.callParent(arguments);

        this.fireEvent('timeheaderdblclick', this, this.startDate, this.endDate, e);
    }
}, function () {
    // Inject placeholder for {headerCls} and sch-timeheader
    Sch.column.Time.prototype.renderTpl = Sch.column.Time.prototype.renderTpl.replace('column-header-inner', 'column-header-inner sch-timeheader {headerCls}');
});


/*
@class Sch.column.Resource
@extends Ext.grid.Column
@private

A Column representing a resource, used only in vertical orientation

*/
Ext.define("Sch.column.Resource", {
    extend: "Ext.grid.Column",
    alias: "widget.resourcecolumn",
    cls: 'sch-resourcecolumn-header',

    /**
    * Default resource column properties
    */
    align: 'center',
    menuDisabled: true,
    hideable: false,
    sortable: false,

    // Overridden since default implementation for some reason sets minWidth = width
    initComponent: function () {
        this.callParent(arguments);
        this.minWidth = undefined;
    }
});
/*
* @class Sch.column.timeAxis.Horizontal
* @extends Ext.grid.column.Column
* @private
*
* A visual representation of the time axis. This class can represent up to three different axes, that are defined in the
* view preset config object.
*/
Ext.define("Sch.column.timeAxis.Horizontal", {
    extend: "Ext.grid.column.Column",
    alias: 'widget.timeaxiscolumn',

    requires: [
        'Ext.Date',
        'Ext.XTemplate',
        'Sch.column.Time',
        'Sch.preset.Manager'
    ],


    cls: 'sch-timeaxiscolumn',

    timeAxis: null,

    renderTpl:
        '<div id="{id}-titleEl" class="' + Ext.baseCSSPrefix + 'column-header-inner">' +
            '<span id="{id}-textEl" style="display:none" class="' + Ext.baseCSSPrefix + 'column-header-text"></span>' +
            '<tpl if="topHeaderCells">' +
                '{topHeaderCells}' +
            '</tpl>' +
            '<tpl if="middleHeaderCells">' +
                '{middleHeaderCells}' +
            '</tpl>' +
        '</div>' +
        '{%this.renderContainer(out,values)%}',

    headerRowTpl:
        '<table border="0" cellspacing="0" cellpadding="0" style="{tstyle}" class="sch-header-row sch-header-row-{position}">' +
            '<thead>' +
                '<tr>{cells}</tr>' +
            '</thead>' +
        '</table>',

    headerCellTpl:
        '<tpl for=".">' +
            '<td class="sch-column-header x-column-header {headerCls}" style="position : static; text-align: {align}; {style}" tabIndex="0" id="{headerId}" ' +
                'headerPosition="{position}" headerIndex="{index}">' +
                    '<div class="x-column-header-inner">{header}</div>' +
            '</td>' +
        '</tpl>',

    columnConfig: {},

    timeCellRenderer: null,
    timeCellRendererScope: null,

    // cache for single column width value
    columnWidth: null,

    // own width / height value
    previousWidth: null,
    previousHeight: null,


    initComponent: function () {
        if (!(this.headerRowTpl instanceof Ext.Template)) {
            this.headerRowTpl = Ext.create("Ext.XTemplate", this.headerRowTpl);
        }

        if (!(this.headerCellTpl instanceof Ext.Template)) {
            this.headerCellTpl = Ext.create("Ext.XTemplate", this.headerCellTpl);
        }

        // to turn this column into group (the actual sub-columns will be added in the `onTimeAxisReconfigure`
        // which seems requires initialized "items"
        this.columns = [{}];

        this.addEvents('timeheaderdblclick', 'timeaxiscolumnreconfigured');
        this.enableBubble('timeheaderdblclick');

        this.stubForResizer = new Ext.Component({
            isOnLeftEdge: function () {
                return false;
            },

            isOnRightEdge: function () {
                return false;
            },

            el: {
                dom: {
                    style: {}
                }
            }
        });

        this.callParent(arguments);

        this.onTimeAxisReconfigure();

        this.mon(this.timeAxis, 'reconfigure', this.onTimeAxisReconfigure, this);
    },


    getSchedulingView: function () {
        return this.getOwnerHeaderCt().view;
    },


    onTimeAxisReconfigure: function () {
        var timeAxis = this.timeAxis,
            proposedTimeColumnWidth = timeAxis.preset.timeColumnWidth,
            schedulingView = this.rendered && this.getSchedulingView(),
            headerConfig = timeAxis.headerConfig,
            start = timeAxis.getStart(),
            end = timeAxis.getEnd(),
            columnDefaults = {
                renderer: this.timeColumnRenderer,
                scope: this,
                width: this.rendered ? schedulingView.calculateTimeColumnWidth(proposedTimeColumnWidth) : proposedTimeColumnWidth
            };

        // clear the previous values to bypass the guard in the "afterLayout"
        delete this.previousWidth;
        delete this.previousHeight;

        var columnConfig = this.columnConfig = this.createColumns(this.timeAxis, headerConfig, columnDefaults);

        Ext.suspendLayouts();

        this.removeAll();

        if (this.rendered) {
            var innerCt = this.el.child('.x-column-header-inner');

            innerCt.select('table').remove();

            var renderData = this.initRenderData();

            if (columnConfig.top) {
                Ext.core.DomHelper.append(innerCt, renderData.topHeaderCells);
            }

            if (columnConfig.middle) {
                Ext.core.DomHelper.append(innerCt, renderData.middleHeaderCells);
            }

            if (!columnConfig.top && !columnConfig.middle) {
                this.addCls('sch-header-single-row');
            } else {
                this.removeCls('sch-header-single-row');
            }
        }

        Ext.resumeLayouts();

        //        // need to calculate the own total width myself - starting as of 4.0.6
        //        var width   = 0;
        //
        //        Ext.each(columnConfig.bottom, function (column) { width += column.width; });
        //
        //        this.width  = width;

        // this call will reset the "suspendLayout" to false and will trigger a "doLayout" at the end,
        // so generally the following call is not required
        this.add(columnConfig.bottom);

        if (this.rendered) {
            if (this.fireEvent('timeaxiscolumnreconfigured', this) !== false) {
                schedulingView.refresh();
            }
        }
    },


    beforeRender: function () {
        var columnConfig = this.columnConfig;

        if (!columnConfig.middle && !columnConfig.top) {
            this.addCls('sch-header-single-row');
        }

        this.callParent(arguments);
    },


    // private
    timeColumnRenderer: function (v, m, rec, row, col, ds, events) {
        var retVal = '';

        // Thanks Condor for this fix!
        if (Ext.isIE) {
            m.style += ';z-index:' + (this.items.getCount() - col);
        }

        if (this.timeCellRenderer) {
            var ta = this.timeAxis,
                colTick = ta.getAt(col),
                colStart = colTick.start,
                colEnd = colTick.end;

            retVal = this.timeCellRenderer.call(this.timeCellRendererScope || this, m, rec, row, col, ds, colStart, colEnd);
        }

        return retVal;
    },


    initRenderData: function () {
        var columnConfig = this.columnConfig;

        var topHeaderCells = columnConfig.top ? this.headerRowTpl.apply({
            cells: this.headerCellTpl.apply(columnConfig.top),
            position: 'top',
            // for webkit, table need to have the width defined upfront,
            // for the "table-layout : fixed" style to have any effect
            // so we set it to 100px in all cases
            // we'll overwrite it with correct value in the `refreshHeaderRow` anyway
            tstyle: 'border-top : 0; width : 100px'
        }) : '';

        var middleHeaderCells = columnConfig.middle ? this.headerRowTpl.apply({
            cells: this.headerCellTpl.apply(columnConfig.middle),
            position: 'middle',
            tstyle: columnConfig.top ? 'width : 100px' : 'border-top : 0; width : 100px'
        }) : '';

        return Ext.apply(this.callParent(arguments), {
            topHeaderCells: topHeaderCells,
            middleHeaderCells: middleHeaderCells
        });
    },


    // Default renderer method if no renderer is supplied in the header config
    defaultRenderer: function (start, end, dateFormat) {
        return Ext.Date.format(start, dateFormat);
    },


    // Method generating the column config array for the time columns
    createColumns: function (timeAxis, headerConfig, defaults) {
        if (!timeAxis || !headerConfig) {
            throw 'Invalid parameters passed to createColumns';
        }

        var columns = [],
            lowestHeader = headerConfig.bottom || headerConfig.middle,
            colConfig,
            me = this;

        timeAxis.forEachInterval(headerConfig.bottom ? 'bottom' : 'middle', function (start, end, i) {
            colConfig = {
                align: lowestHeader.align || 'center',
                headerCls: '',

                startDate: start,
                endDate: end
            };

            if (lowestHeader.renderer) {
                colConfig.header = lowestHeader.renderer.call(lowestHeader.scope || me, start, end, colConfig, i);
            } else {
                colConfig.header = me.defaultRenderer(start, end, lowestHeader.dateFormat);
            }

            columns[columns.length] = Ext.create("Sch.column.Time", Ext.apply(colConfig, defaults));
        });

        var headerRows = this.createHeaderRows(timeAxis, headerConfig);

        return {
            bottom: columns,
            middle: headerRows.middle,
            top: headerRows.top
        };
    },

    /*
    * Method generating the config array for any additional header rows
    * @private
    * @param {Sch.data.TimeAxis} timeAxis The time axis used by the scheduler
    * @param {Object} headerConfig The current scheduler header config object
    * @return {Object} the extra header rows
    */
    createHeaderRows: function (timeAxis, headerConfig) {
        var rows = {};

        if (headerConfig.top) {
            var topRow;
            if (headerConfig.top.cellGenerator) {
                topRow = headerConfig.top.cellGenerator.call(this, timeAxis.getStart(), timeAxis.getEnd());
            } else {
                topRow = this.createHeaderRow(timeAxis, headerConfig.top);
            }
            rows.top = this.processHeaderRow(topRow, 'top');
        }

        if (headerConfig.bottom) {
            var middleRow;
            if (headerConfig.middle.cellGenerator) {
                middleRow = headerConfig.middle.cellGenerator.call(this, timeAxis.getStart(), timeAxis.getEnd());
            } else {
                middleRow = this.createHeaderRow(timeAxis, headerConfig.middle);
            }
            rows.middle = this.processHeaderRow(middleRow, 'middle');
        }

        return rows;
    },


    processHeaderRow: function (rowCells, position) {
        var me = this;

        Ext.each(rowCells, function (rowCell, index) {

            rowCell.index = index;
            rowCell.position = position;
            // this additional config will allow the top level headers act "on behalf" of the whole column
            // see "Ext.grid.plugin.HeaderResizer#onHeaderCtMouseMove"
            rowCell.headerId = me.stubForResizer.id;
        });

        return rowCells;
    },


    // private
    createHeaderRow: function (timeAxis, headerConfig) {
        var cells = [],
            colConfig,
            start = timeAxis.getStart(),
            end = timeAxis.getEnd(),
            totalDuration = end - start,
            cols = [],
            dt = start,
            i = 0,
            cfg,
            align = headerConfig.align || 'center',
            intervalEnd;

        while (dt < end) {
            intervalEnd = Sch.util.Date.min(timeAxis.getNext(dt, headerConfig.unit, headerConfig.increment || 1), end);

            colConfig = {
                align: align,
                start: dt,
                end: intervalEnd,
                headerCls: ''
            };

            if (headerConfig.renderer) {
                colConfig.header = headerConfig.renderer.call(headerConfig.scope || this, dt, intervalEnd, colConfig, i);
            } else {
                colConfig.header = this.defaultRenderer(dt, intervalEnd, headerConfig.dateFormat, colConfig, i);
            }

            cells.push(colConfig);
            dt = intervalEnd;
            i++;
        }

        return cells;
    },


    afterLayout: function () {
        // clear the cached value
        delete this.columnWidth;

        this.callParent(arguments);

        var width = this.getWidth();
        var height = this.getHeight();

        if (width === this.previousWidth && height === this.previousHeight) { return; }

        this.previousWidth = width;
        this.previousHeight = height;


        var columnConfig = this.columnConfig;
        var me = this;
        var thisEl = this.el;

        var top = columnConfig.top;

        var sumTop = 0;
        var sumMiddle = 0;

        if (top) {
            thisEl.select('.sch-header-row-top').setWidth(this.lastBox.width);

            thisEl.select('.sch-header-row-top td').each(function (el, composite, index) {
                var width = me.getHeaderGroupCellWidth(top[index].start, top[index].end);

                el.setVisibilityMode(Ext.Element.DISPLAY);

                if (width) {
                    sumTop += width;

                    el.show();
                    el.setWidth(width);
                } else {
                    el.hide();
                }
            });
        }

        var middle = columnConfig.middle;

        if (middle) {
            thisEl.select('.sch-header-row-middle').setWidth(this.lastBox.width);

            thisEl.select('.sch-header-row-middle td').each(function (el, composite, index) {
                var width = me.getHeaderGroupCellWidth(middle[index].start, middle[index].end);

                el.setVisibilityMode(Ext.Element.DISPLAY);

                if (width) {
                    sumMiddle += width;

                    el.show();
                    el.setWidth(width);
                } else {
                    el.hide();
                }
            });
        }
    },


    getHeaderGroupCellWidth: function (start, end/*, headerRowUnit, headerRowIncrement*/) {
        var baseUnit = this.timeAxis.unit,
            baseIncrement = this.timeAxis.increment,
            width,
            measuringUnit = Sch.util.Date.getMeasuringUnit(baseUnit),
            durationInMeasuringUnit = Sch.util.Date.getDurationInUnit(start, end, measuringUnit),
            schedulingView = this.getSchedulingView();

        if (this.timeAxis.isContinuous()) {
            width = durationInMeasuringUnit * schedulingView.getSingleUnitInPixels(measuringUnit);
        } else {
            width = schedulingView.getXYFromDate(end)[0] - schedulingView.getXYFromDate(start)[0];
        }

        return width;
    },


    onElDblClick: function (event, target) {
        this.callParent(arguments);

        var headerCell = event.getTarget('.sch-column-header');

        if (headerCell) {
            var position = Ext.fly(headerCell).getAttribute('headerPosition'),
                index = Ext.fly(headerCell).getAttribute('headerIndex'),
                headerConfig = this.columnConfig[position][index];

            this.fireEvent('timeheaderdblclick', this, headerConfig.start, headerConfig.end, event);
        }
    },


    getTimeColumnWidth: function () {
        if (this.columnWidth === null) {
            this.columnWidth = this.items.get(0).getWidth();
        }

        return this.columnWidth;
    },


    setTimeColumnWidth: function (width) {
        //        console.time('setTimeColumnWidth')

        //this.suspendLayouts();
        this.suspendEvents();

        this.items.each(function (column) {
            column.setWidth(width);
        });

        //        this.updateLayout();
        //
        this.resumeEvents();
        //        Ext.resumeLayouts(true);

        //        this.updateLayout();

        //        console.timeEnd('setTimeColumnWidth')
    }
});


/*
* @class Sch.column.timeAxis.HorizontalSingle
* @extends Ext.grid.column.Column
* @private
*
* A "lightweight" visual representation of the time axis. This class does not produce any real Ext grid columns, instead it just renders the timeaxis as its HTML content.
* This class can represent up to three different axes, that are defined in the
* view preset config object. 
*/
Ext.define("Sch.column.timeAxis.HorizontalSingle", {
    extend: "Sch.column.Time",
    alias: 'widget.singletimeaxiscolumn',

    requires: [
        'Ext.Date',
        'Ext.XTemplate',
        'Sch.preset.Manager'
    ],

    cls: 'sch-simple-timeaxis',

    timeAxis: null,

    /**
    * @cfg {Boolean} trackHeaderOver `true` to highlight each header cell when the mouse is moved over it. 
    */
    trackHeaderOver: true,

    /**
    * @cfg {Int} compactCellWidthThreshold The minimum width for a bottom row header cell to be considered 'compact', which adds a special CSS class to the row. 
    *            Defaults to 16px.
    */
    compactCellWidthThreshold: 16,

    renderTpl:
        '<div id="{id}-titleEl" class="' + Ext.baseCSSPrefix + 'column-header-inner">' +
            '<span id="{id}-textEl" style="display:none" class="' + Ext.baseCSSPrefix + 'column-header-text"></span>' +
            '<tpl if="topHeaderCells">' +
                '{topHeaderCells}' +
            '</tpl>' +
            '<tpl if="middleHeaderCells">' +
                '{middleHeaderCells}' +
            '</tpl>' +
            '<tpl if="bottomHeaderCells">' +
                '{bottomHeaderCells}' +
            '</tpl>' +
        '</div>' +
        '{%this.renderContainer(out,values)%}',

    headerRowTpl:
        '<table border="0" cellspacing="0" cellpadding="0" style="{tstyle}" class="sch-header-row sch-header-row-{position}">' +
            '<thead>' +
                '<tr>' +
                    '<tpl for="cells">' +
                        '<td class="sch-column-header x-column-header {headerCls}" style="position : static; text-align: {align}; {style}" tabIndex="0" id="{headerId}" ' +
                            'headerPosition="{parent.position}" headerIndex="{[xindex-1]}">' +
                                '<div class="sch-simple-timeheader">{header}</div>' +
                        '</td>' +
                    '</tpl>' +
                '</tr>' +
            '</thead>' +
        '</table>',

    columnConfig: {},

    // cache for single column width value
    columnWidth: null,
    nbrTimeColumns: null,

    initComponent: function () {
        this.tdCls += ' sch-singletimetd';

        if (!(this.headerRowTpl instanceof Ext.Template)) {
            this.headerRowTpl = Ext.create("Ext.XTemplate", this.headerRowTpl);
        }

        this.addEvents('timeheaderdblclick', 'timeaxiscolumnreconfigured');
        this.enableBubble('timeheaderdblclick');

        this.callParent(arguments);

        this.onTimeAxisReconfigure();

        this.mon(this.timeAxis, 'reconfigure', this.onTimeAxisReconfigure, this);
        this.on('resize', this.refreshHeaderSizes, this);

        // Keep this and use for our own TDs hover functionality.
        this.ownHoverCls = this.hoverCls;

        // Do not want the default hover cls to be added to container column TD.
        this.hoverCls = '';
    },


    getSchedulingView: function () {
        return this.getOwnerHeaderCt().view;
    },


    onTimeAxisReconfigure: function () {

        var timeAxis = this.timeAxis,
            proposedTimeColumnWidth = timeAxis.preset.timeColumnWidth,
            schedulingView = this.rendered && this.getSchedulingView(),
            headerConfig = timeAxis.headerConfig,
            start = timeAxis.getStart(),
            end = timeAxis.getEnd(),
            width = this.rendered ? schedulingView.calculateTimeColumnWidth(proposedTimeColumnWidth) : proposedTimeColumnWidth;

        var columnConfig = this.columnConfig = this.createHeaderRows(headerConfig);

        var lowestRow = columnConfig.bottom || columnConfig.middle;

        if (this.rendered) {
            var rowEl;
            var innerCt = this.el.child('.x-column-header-inner');
            var ctDom = innerCt.dom;
            var oldDisplay = ctDom.style.display;
            var parent = ctDom.parentNode;
            ctDom.style.display = 'none';
            parent.removeChild(ctDom);

            ctDom.innerHTML = '';

            var renderData = this.initRenderData();

            if (columnConfig.top) {
                rowEl = Ext.core.DomHelper.append(innerCt, renderData.topHeaderCells);
                this.refreshHeaderRow("top", rowEl);
            }

            if (columnConfig.middle) {
                rowEl = Ext.core.DomHelper.append(innerCt, renderData.middleHeaderCells);
                this.refreshHeaderRow("middle", rowEl);
            }

            if (columnConfig.bottom) {
                rowEl = Ext.core.DomHelper.append(innerCt, renderData.bottomHeaderCells);
                this.refreshHeaderRow("bottom", rowEl);
            }

            if (!columnConfig.top && !columnConfig.middle) {
                this.addCls('sch-header-single-row');
            } else {
                this.removeCls('sch-header-single-row');
            }


            parent.appendChild(ctDom);
            ctDom.style.display = oldDisplay;

            if (width !== this.columnWidth || this.nbrTimeColumns !== lowestRow.length) {
                this.nbrTimeColumns = lowestRow.length;
                this.setTimeColumnWidth(width);
            }

            if (this.fireEvent('timeaxiscolumnreconfigured', this) !== false) {
                schedulingView.refreshKeepingResourceScroll(true);
            }
        } else {

            if (width !== this.columnWidth || this.nbrTimeColumns !== lowestRow.length) {
                this.nbrTimeColumns = lowestRow.length;
                this.setTimeColumnWidth(width);
            }
        }
    },


    beforeRender: function () {
        var me = this,
            columnConfig = this.columnConfig;

        if (!columnConfig.middle && !columnConfig.top) {
            me.addCls('sch-header-single-row');
        }
        me.callParent(arguments);
    },

    afterRender: function () {
        var me = this;

        if (this.trackHeaderOver) {
            me.el.on({
                mousemove: me.highlightCell,
                delegate: 'div.sch-simple-timeheader',
                scope: me
            });

            me.el.on({
                mouseleave: me.clearHighlight,
                scope: me
            });
        }

        me.callParent(arguments);
    },

    initRenderData: function () {
        var columnConfig = this.columnConfig;

        var topHeaderCells = columnConfig.top ? this.headerRowTpl.apply({
            cells: columnConfig.top,
            position: 'top',
            // for webkit, table need to have the width defined upfront,
            // for the "table-layout : fixed" style to have any effect
            // so we set it to 100px in all cases
            // we'll overwrite it with correct value in the `refreshHeaderRow` anyway
            tstyle: 'border-top : 0; width : 100px'
        }) : '';

        var middleHeaderCells = columnConfig.middle ? this.headerRowTpl.apply({
            cells: columnConfig.middle,
            position: 'middle',
            tstyle: columnConfig.top ? 'width : 100px' : 'border-top : 0; width : 100px'
        }) : '';

        var bottomHeaderCells = columnConfig.bottom ? this.headerRowTpl.apply({
            cells: columnConfig.bottom,
            position: 'bottom',
            tstyle: 'width : 100px'
        }) : '';

        return Ext.apply(this.callParent(arguments), {
            topHeaderCells: topHeaderCells,
            middleHeaderCells: middleHeaderCells,
            bottomHeaderCells: bottomHeaderCells
        });
    },

    // Default renderer method if no renderer is supplied in the header config
    defaultRenderer: function (start, end, dateFormat) {
        return Ext.Date.format(start, dateFormat);
    },

    /*
    * Method generating the config array for any additional header rows
    * @private
    * @param {Object} headerConfig The current scheduler header config object
    * @return {Object} the rows configuration object for the current view preset
    */
    createHeaderRows: function (headerConfig) {
        var rows = {};

        for (var pos in headerConfig) {
            if (headerConfig[pos].cellGenerator) {
                rows[pos] = headerConfig[pos].cellGenerator.call(this, this.timeAxis.getStart(), this.timeAxis.getEnd());
            } else {
                rows[pos] = this.createHeaderRow(pos, headerConfig[pos]);
            }
        }

        return rows;
    },

    // private
    createHeaderRow: function (position, headerConfig) {
        var cells = [],
            me = this,
            colConfig,
            align = headerConfig.align || 'center';

        this.timeAxis.forEachInterval(position, function (start, end, i) {
            colConfig = {
                align: align,
                start: start,
                end: end,
                headerCls: ''
            };

            if (headerConfig.renderer) {
                colConfig.header = headerConfig.renderer.call(headerConfig.scope || me, start, end, colConfig, i);
            } else {
                colConfig.header = me.defaultRenderer(start, end, headerConfig.dateFormat, colConfig, i);
            }

            // To be able to style individual day cells, weekends or other important days
            if (headerConfig.unit === Sch.util.Date.DAY && (!headerConfig.increment || headerConfig.increment === 1)) {
                colConfig.headerCls += ' sch-dayheadercell-' + start.getDay();
            }

            cells.push(colConfig);
        });

        return cells;
    },

    afterLayout: function () {
        this.callParent(arguments);
        this.refreshHeaderSizes();
    },

    refreshHeaderSizes: function () {
        var columnConfig = this.columnConfig;

        if (columnConfig.top) {
            this.refreshHeaderRow('top');
        }

        if (columnConfig.middle) {
            this.refreshHeaderRow('middle');
        }

        if (columnConfig.bottom) {
            this.refreshHeaderRow('bottom');
        }
    },

    refreshHeaderRow: function (position, rowEl) {
        var thisEl = this.el;
        var rowData = this.columnConfig[position];
        var me = this;
        var width;
        var isLowest = position === 'bottom' || (position === 'middle' && !this.columnConfig.bottom);

        rowEl = rowEl || thisEl.down('.sch-header-row-' + position, true);
        Ext.fly(rowEl).setWidth(me.getTotalWidth());

        Ext.fly(rowEl).select(' thead > tr > td').each(function (el, composite, index) {
            width = isLowest ? me.columnWidth : me.getHeaderGroupCellWidth(rowData[index].start, rowData[index].end);

            el.setVisibilityMode(Ext.Element.DISPLAY);

            if (width) {
                if (Ext.isSafari && Ext.isMac) {
                    // https://www.assembla.com/spaces/bryntum/support/tickets/356
                    width -= 2;
                }
                el.show();
                // weird bug in Chromium 19 - seems to be related to the `box-sizing` style
                // in combination with table cells - only first cell will honor it
                // for other cells need to reduce the width by 1px
                el.setWidth(width - (Ext.chromeVersion === 19 ? (index ? 1 : 0) : 0));
            } else {
                el.hide();
            }
        });

        if (position === 'bottom') {
            if (width < this.compactCellWidthThreshold) {
                Ext.fly(rowEl).addCls('sch-header-row-compact');
            } else {
                Ext.fly(rowEl).removeCls('sch-header-row-compact');
            }
        }
    },

    getHeaderGroupCellWidth: function (start, end) {
        var schedulingView = this.getSchedulingView();

        return schedulingView.getXYFromDate(end)[0] - schedulingView.getXYFromDate(start)[0];
    },


    onElDblClick: function (event, target) {
        var headerCell = event.getTarget('.sch-column-header');

        if (headerCell) {
            var position = Ext.fly(headerCell).getAttribute('headerPosition'),
                index = Ext.fly(headerCell).getAttribute('headerIndex'),
                headerConfig = this.columnConfig[position][index];

            this.fireEvent('timeheaderdblclick', this, headerConfig.start, headerConfig.end, event);
        }
    },


    getTimeColumnWidth: function () {
        if (this.columnWidth === null) {
            this.columnWidth = this.getWidth() / this.nbrTimeColumns;
        }

        return this.columnWidth;
    },


    setTimeColumnWidth: function (width) {
        //console.time('setTimeColumnWidth');
        this.columnWidth = width;
        if (this.rendered) {
            Ext.suspendLayouts();
            // Very expensive call
            this.setWidth(width * this.nbrTimeColumns);
            Ext.resumeLayouts();
            this.refreshHeaderSizes();
            this.ownerCt.updateLayout();
        } else {
            this.setWidth(width * this.nbrTimeColumns);
        }
        //console.timeEnd('setTimeColumnWidth');
    },

    getTotalWidth: function () {
        return this.columnWidth * this.nbrTimeColumns;
    },

    highlightCell: function (e, cell) {
        var me = this;

        if (cell !== me.highlightedCell) {
            me.clearHighlight();
            me.highlightedCell = cell;
            Ext.fly(cell).addCls(me.ownHoverCls);
        }
    },

    clearHighlight: function () {
        var me = this,
            highlighted = me.highlightedCell;

        if (highlighted) {
            Ext.fly(highlighted).removeCls(me.ownHoverCls);
            delete me.highlightedCell;
        }
    }
});



/*
* @class Sch.column.timeAxis.Vertical
* @private
* @extends Ext.grid.column.Column
* A Column representing the time span in vertical orientation
* @constructor
* @param {Object} config The configuration options
*/
Ext.define('Sch.column.timeAxis.Vertical', {

    extend: 'Ext.grid.column.Column',

    alias: 'widget.verticaltimeaxis',


    /**
    * Default timeaxis column properties
    */
    align: 'right',

    draggable: false,
    groupable: false,
    hideable: false,
    sortable: false,
    menuDisabled: true,

    dataIndex: 'start',

    timeAxis: null,

    initComponent: function () {
        this.callParent(arguments);
        this.tdCls = (this.tdCls || '') + ' sch-verticaltimeaxis-cell';
        this.scope = this;
    },

    renderer: function (v, m, r) {
        var hConfig = this.timeAxis.headerConfig,
            hc = hConfig.bottom || hConfig.middle;

        if (hc.renderer) {
            return hc.renderer.call(hc.scope || this, v, r.data.end, m, 0);
        } else {
            return Ext.Date.format(v, hc.dateFormat);
        }
    }
});


// Private
Ext.define('Sch.mixin.Lockable', {
    extend: 'Ext.grid.Lockable',

    requires: [
        'Sch.column.timeAxis.Horizontal',
        'Sch.column.timeAxis.HorizontalSingle'
    ],

    findEditingPlugin: function () {
        var plugins = this.plugins || [];
        var me = this;
        var editing;

        Ext.each(plugins, function (p, index) {
            if (Ext.grid.plugin && Ext.grid.plugin.CellEditing && p instanceof Ext.grid.plugin.CellEditing) {
                editing = p;
                Ext.Array.remove(plugins, p);
                return false;
            }
        });
        return editing;
    },

    // Decide based on the plugin 'lockableScope' where it should be placed
    processSchedulerPlugins: function () {
        var lockedPlugins = [];
        var normalPlugins = [];
        var topPlugins = [];
        var plugins = this.plugins || [];
        var me = this;


        for (var i = plugins.length - 1; i >= 0; i--) {
            var p = plugins[i];

            if (p.lockableScope) {
                switch (p.lockableScope) {
                    case 'top':
                        topPlugins.push(p);
                        break;
                    case 'locked':
                        lockedPlugins.push(p);
                        break;
                    case 'normal':
                        normalPlugins.push(p);
                        break;
                }
                Ext.Array.remove(plugins, p);
            }
        }

        if (lockedPlugins.length > 0) {
            me.lockedGridConfig.plugins = (me.lockedGridConfig.plugins || []).concat(lockedPlugins);
        }
        if (normalPlugins.length > 0) {
            me.normalGridConfig.plugins = (me.normalGridConfig.plugins || []).concat(normalPlugins);
        }

        me.topPlugins = topPlugins;
    },

    // overridden
    injectLockable: function () {

        // Editing feature of 4.1.0 is not compatible with locking grid, manually move it to locked grid
        var editPlugin = this.findEditingPlugin();

        var me = this;
        var isTree = Ext.data.TreeStore && me.store instanceof Ext.data.TreeStore;
        var isBuffered = me.store.buffered;

        var eventSelModel = me.getEventSelectionModel ? me.getEventSelectionModel() : me.getSelectionModel();

        // Make local copies of these configs in case someone puts them on the prototype of a subclass.
        me.lockedGridConfig = Ext.apply({}, me.lockedGridConfig || {});
        me.normalGridConfig = Ext.apply({}, me.schedulerConfig || me.normalGridConfig || {});

        var lockedGrid = me.lockedGridConfig,
            normalGrid = me.normalGridConfig;

        Ext.applyIf(me.lockedGridConfig, {
            xtype: me.lockedXType,
            id: me.id + '_locked',

            enableLocking: false,
            lockable: false,

            useArrows: true,
            columnLines: me.columnLines,
            rowLines: me.rowLines,
            stateful: me.stateful,

            // HACK until Ext JS supports column state in locked grids.
            // http://www.assembla.com/spaces/bryntum/support/tickets/272-2-1-2-throws-exception-when-restoring-grid-state-after-column-move#last_comment
            delayScroll: function () {
                if (this.rendered) { return this.self.prototype.delayScroll.apply(this, arguments); }
            },

            // Some nice border layout defaults
            split: true,
            animCollapse: false,
            collapseDirection: 'left',
            region: 'west'
        });

        if (editPlugin) {
            me.lockedGridConfig.plugins = (me.lockedGridConfig.plugins || []).concat(editPlugin);
        }

        me.processSchedulerPlugins();

        Ext.applyIf(me.normalGridConfig, {
            xtype: me.normalXType,

            enableLocking: false,
            lockable: false,

            viewType: me.viewType,

            layout: 'fit',

            sortableColumns: false,
            enableColumnMove: false,
            enableColumnResize: false,
            enableColumnHide: false,

            selModel: eventSelModel,
            eventSelModel: eventSelModel,

            _top: me,
            orientation: me.orientation,
            viewPreset: me.viewPreset,
            timeAxis: me.timeAxis,

            // TODO remove for 3.0 - as this currently only affect users of timeCellRenderer (otherwise only 1 col used)
            columnLines: me.columnLines,
            rowLines: me.rowLines,

            // Some nice border layout defaults
            collapseDirection: 'right',
            animCollapse: false,
            region: 'center'
        });

        // For locked tree support
        me.bothCfgCopy = me.bothCfgCopy ||
                        (Ext.grid.Panel && Ext.grid.Panel.prototype.bothCfgCopy) ||
                        ['invalidateScrollerOnRefresh',
                          'hideHeaders',
                          'enableColumnHide',
                          'enableColumnMove',
                          'enableColumnResize',
                          'sortableColumns'
                        ];

        if (me.orientation === 'vertical') {
            lockedGrid.store = normalGrid.store = me.timeAxis.tickStore;

            me.mon(me.resourceStore, {
                clear: me.refreshResourceColumns,
                datachanged: me.refreshResourceColumns,
                update: me.refreshResourceColumns,
                load: me.refreshResourceColumns,
                scope: me
            });
        }

        if (lockedGrid.width) {
            // User has specified a fixed width for the locked section, disable the syncLockedWidth method 
            me.syncLockedWidth = Ext.emptyFn;
            // Enable scrollbars for locked section
            lockedGrid.scroll = 'horizontal';
            lockedGrid.scrollerOwner = true;
        }

        if (me.resourceStore) {
            normalGrid.resourceStore = me.resourceStore;
        }

        if (me.eventStore) {
            normalGrid.eventStore = me.eventStore;
        }

        if (me.dependencyStore) {
            normalGrid.dependencyStore = me.dependencyStore;
        }

        var lockedViewConfig = me.lockedViewConfig = me.lockedViewConfig || {};
        var normalViewConfig = me.normalViewConfig = me.normalViewConfig || {};

        if (isTree && isBuffered && Ext.getScrollbarSize().width === 0) {
            // https://www.assembla.com/spaces/bryntum/support/tickets/252
            me.lockedGridConfig.scroll = 'horizontal';
        }

        if (isBuffered) lockedViewConfig.preserveScrollOnRefresh = true;

        lockedViewConfig.enableAnimations = me.normalViewConfig.enableAnimations = false;

        if (isTree) {
            // re-use the same NodeStore for both grids (construction of NodeStore is an expensive operation, shouldn't just unbind the extra one)
            if (Ext.versions.extjs.isLessThan('4.1.3')) {
                me.normalViewConfig.providedStore = lockedViewConfig.providedStore = me.store.nodeStore/* || me.createNodeStore(isBuffered, me.store)*/;
            } else {
                me.normalViewConfig.store = lockedViewConfig.store = me.store.nodeStore/* || me.createNodeStore(isBuffered, me.store)*/;
            }
            me.overrideNodeStore(me.store.nodeStore);
        }


        var origLayout = me.layout;

        this.callParent(arguments);

        // At this point, the 2 child grids are created
        // As of 4.1.1, top panel plugins are now cleared and empty - we need to manually initialize any plugins that want 
        // to run attached to the top panel.
        if (me.topPlugins) {
            me.plugins = me.topPlugins;
        }

        // Now post processing, changing and overriding some things that Ext.grid.Lockable sets up
        if (lockedGrid.width) {
            me.lockedGrid.setWidth(lockedGrid.width);

            // Force horizontal scrollbar to be shown to keep spacerEl magic working when scrolling to bottom
            me.normalGrid.getView().addCls('sch-timeline-horizontal-scroll');
            me.lockedGrid.getView().addCls('sch-locked-horizontal-scroll');
        } else if (me.normalGrid.collapsed) {
            // Need to workaround this, child grids cannot be collapsed initially
            me.normalGrid.collapsed = false;

            // Note, for the case of buffered view/store we need to wait for the view box to be ready before collapsing
            // since the paging scrollbar reads the view height during setup. When collapsing to soon, its viewSize will be 0.
            me.normalGrid.view.on('boxready', function () {
                me.normalGrid.collapse();
            }, me, { delay: 10 });
        }

        var lockedView = me.lockedGrid.getView();
        var normalView = me.normalGrid.getView();

        var verticalScroller;

        // Buffered support for locked grid
        if (isBuffered) {
            verticalScroller = me.normalGrid.verticalScroller;

            lockedView.on('render', this.onLockedViewRender, this);

            this.fixPagingScroller(verticalScroller);

            if (Ext.getVersion('extjs').isLessThan('4.1.1')) {
                // React to using scrollbar handle (Ext already handles locked mousewheel)
                // https://www.assembla.com/spaces/bryntum/support/tickets/268
                if (Ext.getScrollbarSize().width > 0) {
                    lockedView.on({
                        scroll: {
                            fn: me.onLockedViewScroll,
                            element: 'el',
                            scope: me
                        }
                    });
                }
            }
        }

        // Without this fix, scrolling on Mac Chrome does not work in locked grid
        if (Ext.getScrollbarSize().width === 0) {
            // https://www.assembla.com/spaces/bryntum/support/tickets/252
            lockedView.addCls('sch-ganttpanel-force-locked-scroll');
        }

        if (isTree) {
            this.setupLockableTree();
        }


        // a temporary fix for http://www.sencha.com/forum/showthread.php?220386-4.1.1-rc2-quot-refresh-quot-event-is-fired-before-the-quot-render-quot-event-for-the-tree-views&p=832879
        if (!normalView.deferInitialRefresh) {
            var prevOnRender = normalView.onRender;

            normalView.onRender = function () {
                this.doFirstRefresh = function () { };

                prevOnRender.apply(this, arguments);

                delete this.doFirstRefresh;
            };
        }


        if (isBuffered) {
            // dummy object to make the "normalView.el.un()" call to work in the "bindView" below
            normalView.el = { un: function () { } };

            // re-bind the view of the scroller
            // this will:
            // 1) update the `store` of the scroller from TreeStore instance to NodeStore
            // 2) will update the listener of `guaranteedrange` event
            //    so it will use the override for `onGuaranteedRange` from `setupLockableTree`
            // 3) will update the listener of `refresh` to use the override from `fixPagingScroller`
            verticalScroller.bindView(normalView);
            // unbind the old listener for `refresh` event, which is still tied to original `onViewRefresh` which 
            // was overridden
            normalView.un('refresh', verticalScroller.self.prototype.onViewRefresh, verticalScroller);

            delete normalView.el;
        }


        me.view.clearListeners();

        lockedView.on({
            refresh: me.updateSpacer,
            scope: me
        });

        // there's no spacer in Ext 4.1.2+
        if (!Ext.grid.Lockable.prototype.updateSpacer) {
            normalView.on({
                refresh: me.updateSpacer,
                scope: me
            });
        }

        // Create new view
        me.view = Ext.create('Sch.view.Locking', {
            locked: me.lockedGrid,
            normal: me.normalGrid,
            panel: me
        });

        if (me.syncRowHeight) {
            lockedView.on('refresh', this.onLockedViewRefresh, this);

            if (isTree) {
                // For tree store, each added node during a load fires an 'add' event
                // This is very inefficient and messy, instead we wait for the load event and perform a full row height sync then
                me.mon(me.store, {
                    'beforeload': function () {
                        lockedView.un({
                            itemadd: me.onViewItemAdd,
                            scope: me
                        });

                        normalView.un({
                            itemadd: me.onViewItemAdd,
                            scope: me
                        });
                    },

                    'load': function () {
                        lockedView.un({
                            itemadd: me.onViewItemAdd,
                            scope: me
                        });

                        normalView.un({
                            itemadd: me.onViewItemAdd,
                            scope: me
                        });

                        me.prepareFullRowHeightSync();
                        me.syncRowHeights();
                    }
                });

                me.normalGrid.on('afteritemexpand', me.afterNormalGridItemExpand, me);
            }

            lockedView.on({
                itemadd: me.onViewItemAdd,
                scope: me
            });

            normalView.on({
                itemadd: me.onViewItemAdd,
                itemupdate: me.onNormalViewItemUpdate,

                // required for grouping
                groupexpand: me.onNormalViewGroupExpand,
                scope: me
            });

            // PATCH broken implementation broken for IE9
            if (Ext.isIE9 && Ext.isStrict) {
                me.onNormalViewItemUpdate = function (record, index, node) {
                    node = node.dom ? node.dom : node;

                    if (me.lockedGridDependsOnSchedule) {
                        var lockedView = me.lockedGrid.getView();
                        lockedView.suspendEvents();
                        lockedView.onUpdate(me.lockedGrid.store, record);
                        lockedView.resumeEvents();
                    }

                    // HACK: Row height must be synced manually
                    var row = me.normalGrid.getView().getNode(index);
                    row.style.height = node.style.height;
                    me.normalHeights[index] = node.style.height;

                    me.syncRowHeights();
                };
            }
        }

        if (origLayout !== 'fit') {
            me.layout = origLayout;
        }

        me.normalGrid.on({
            collapse: me.onNormalGridCollapse,
            expand: me.onNormalGridExpand,
            scope: me
        });

        me.lockedGrid.on({
            collapse: me.onLockedGridCollapse,
            scope: me
        });

        if (this.lockedGrid.view.store !== this.normalGrid.view.store) {
            Ext.Error.raise('Sch.mixin.Lockable setup failed, not sharing store between the two views');
        }
    },

    onLockedGridCollapse: function () {
        if (this.normalGrid.collapsed) {
            this.normalGrid.expand();
        }
    },

    onNormalGridCollapse: function () {
        var me = this;

        //Hack for Gantt to prevent creating second expander when normal grid initially collapsed
        if (!me.normalGrid.reExpander) {
            me.normalGrid.reExpander = me.normalGrid.placeholder;
        }

        if (!me.lockedGrid.rendered) {
            me.lockedGrid.on('render', me.onNormalGridCollapse, me, { delay: 1 });
        } else {
            me.lastLockedWidth = me.lockedGrid.getWidth();
            me.lockedGrid.setWidth(me.getWidth() - 35);

            if (me.lockedGrid.collapsed) {
                me.lockedGrid.expand();
            }

            // Show a vertical scrollbar in locked grid if normal grid is collapsed
            me.addCls('sch-normalgrid-collapsed');
        }
    },

    onNormalGridExpand: function () {
        this.removeCls('sch-normalgrid-collapsed');
        this.lockedGrid.setWidth(this.lastLockedWidth);
    },


    fixPagingScroller: function (scroller) {
        var prevOnViewRefresh = scroller.onViewRefresh;

        // XXX need to keep in sync!
        scroller.onViewRefresh = function () {
            // PREV
            //            var me      = this,
            //                store   = me.store;
            //                
            //            var totalCount  = store.getTotalCount();
            //                
            //            //
            //            if (store.getCount() === store.getTotalCount()) store.getTotalCount = function () { return String(totalCount); };
            //            
            //            prevOnViewRefresh.apply(this, arguments);
            //            
            //            delete store.getTotalCount;
            //    
            //            if (store.getCount() === store.getTotalCount() || (store.isFiltered() && !store.remoteFilter)) {
            //                me.stretcher.setHeight(me.getScrollHeight());
            //            }
            // EOF PREV


            var me = this,
                store = me.store,
                newScrollHeight,
                view = me.view,
                viewEl = view.el,
                viewDom = viewEl.dom,
                rows,
                newScrollOffset,
                scrollDelta,
                table = view.table.dom,
                tableTop,
                scrollTop;

            // Refresh causes loss of focus
            if (me.focusOnRefresh) {
                viewEl.focus();
                me.focusOnRefresh = false;
            }

            // Scroll events caused by processing in here must be ignored, so disable for the duration
            me.disabled = true;

            // No scroll monitoring is needed if
            //    All data is in view OR
            //  Store is filtered locally.
            //    - scrolling a locally filtered page is obv a local operation within the context of a huge set of pages 
            //      so local scrolling is appropriate.

            // MODIFICATION
            var isFull = store.getCount() === store.getTotalCount();

            //            if (store.getCount() === store.getTotalCount() || (store.isFiltered() && !store.remoteFilter)) {
            //                me.stretcher.setHeight(0);
            //                me.position = viewDom.scrollTop = 0;
            //    
            //                // Chrome's scrolling went crazy upon zeroing of the stretcher, and left the view's scrollTop stuck at -15
            //                // This is the only thing that fixes that
            //                me.setTablePosition('absolute');
            //    
            //                // We remain disabled now because no scrolling is needed - we have the full dataset in the Store
            //                return;
            //            }
            // EOF MODIFICATION


            me.stretcher.setHeight(newScrollHeight = me.getScrollHeight());

            scrollTop = viewDom.scrollTop;

            // Flag to the refreshSize interceptor that regular refreshSize postprocessing should be vetoed.
            me.isScrollRefresh = (scrollTop > 0);

            // If we have had to calculate the store position from the pure scroll bar position,
            // then we must calculate the table's vertical position from the scrollProportion
            if (me.scrollProportion !== undefined) {
                me.setTablePosition('absolute');
                me.setTableTop((me.scrollProportion && me.tableStart > 0 ? (newScrollHeight * me.scrollProportion) - (table.offsetHeight * me.scrollProportion) : 0) + 'px');
            } else {
                me.setTablePosition('absolute');
                me.setTableTop((tableTop = (me.tableStart || 0) * me.rowHeight) + 'px');

                // ScrollOffset to a common row was calculated in beforeViewRefresh, so we can synch table position with how it was before
                if (me.scrollOffset) {
                    rows = view.getNodes();
                    newScrollOffset = -viewEl.getOffsetsTo(rows[me.commonRecordIndex])[1];
                    scrollDelta = newScrollOffset - me.scrollOffset;
                    me.position = (viewDom.scrollTop += scrollDelta);
                }

                // If the table is not fully in view view, scroll to where it is in view.
                // This will happen when the page goes out of view unexpectedly, outside the
                // control of the PagingScroller. For example, a refresh caused by a remote sort or filter reverting
                // back to page 1.
                // Note that with buffered Stores, only remote sorting is allowed, otherwise the locally
                // sorted page will be out of order with the whole dataset.
                else if ((tableTop > scrollTop) || ((tableTop + table.offsetHeight) < scrollTop + viewDom.clientHeight)) {
                    // MODIFICATION
                    if (!(isFull && !tableTop)) {
                        me.lastScrollDirection = -1;
                        me.position = viewDom.scrollTop = tableTop;
                    }
                    // EOF MODIFICATION
                }
            }

            // Re-enable upon function exit
            me.disabled = false;

        };


        // covered with view/203_buffered_view_1.t.js in _Gantt_
        // new method, as of 4.1.1
        // COMPLETELY OVERRIDEN, NEED TO KEEP IN SYNC!
        scroller.setViewTableStyle = function (view, prop, value) {
            // additional check for presence of <table> element inside of view
            // <table> could be missing, if grid was originally collapsed
            if (view.table.dom) view.table.dom.style[prop] = value;

            view = view.lockingPartner;

            if (view) {
                if (view.table.dom) view.table.dom.style[prop] = value;
            }
        };

        // Without this extra if-check, buffered tree breaks in 4.1.1
        var partner = scroller.view.lockingPartner;
        if (partner) {
            var onLockRefresh = scroller.onLockRefresh;

            var newOnLockRefresh = function (view) {
                if (view.table.dom) {
                    onLockRefresh.apply(this, arguments);
                }
            };

            partner.un('refresh', onLockRefresh, scroller);
            partner.on('refresh', newOnLockRefresh, scroller);

            scroller.onLockRefresh = newOnLockRefresh;
        }

        scroller.view.un('render', scroller.onViewRender, scroller);

        scroller.onViewRender = function () {
            var me = this,
            el = me.view.el;

            el.setStyle('position', 'relative');
            me.stretcher = el.createChild({
                style: {
                    position: 'absolute',
                    width: '1px',
                    height: 0,
                    top: 0,
                    left: 0
                }
            }, el.dom.firstChild);
        };

        scroller.view.on('render', scroller.onViewRender, scroller);

        if (Ext.getVersion('extjs').isLessThan('4.1.3')) scroller.scrollTo = function (recordIdx, doSelect, callback, scope) {
            var me = this,
                view = me.view,
                viewDom = view.el.dom,
                store = me.store,
                total = store.getTotalCount(),
                startIdx, endIdx,
                targetRec,
                tableTop;

            // Sanitize the requested record
            recordIdx = Math.min(Math.max(recordIdx, 0), total - 1);

            // Calculate view start index
            startIdx = Math.max(Math.min(recordIdx - ((me.leadingBufferZone + me.trailingBufferZone) / 2), total - me.viewSize + 1), 0);
            tableTop = startIdx * me.rowHeight;
            endIdx = startIdx + me.viewSize - 1;

            // So that we will not attempt to find any common row between refreshes which may not exist
            me.lastScrollDirection = undefined;

            me.disabled = true;
            store.guaranteeRange(startIdx, endIdx, function () {
                targetRec = store.pageMap.getRange(recordIdx, recordIdx)[0];
                view.table.dom.style.top = tableTop + 'px';
                viewDom.scrollTop = tableTop = Math.min(Math.max(0, tableTop - view.table.getOffsetsTo(view.getNode(targetRec))[1]), viewDom.scrollHeight - viewDom.clientHeight);

                // https://sencha.jira.com/browse/EXTJSIV-7166 IE 6, 7 and 8 won't scroll all the way down first time
                if (Ext.isIE) {
                    viewDom.scrollTop = tableTop;
                }
                me.disabled = false;
                if (doSelect) {
                    me.grid.selModel.select(targetRec);
                }
                if (callback) {
                    callback.call(scope || me, recordIdx, targetRec);
                }
            });
        };

    },


    onLockedViewScroll: function () {
        //        // TODO once we'll drop the support for 4.1.0 this check can be simplified to
        //        if (this.store.buffered && !this.normalGrid.getView().table.dom) return
        if (this.store.buffered) {
            // in case of buffered store, lockable mixin will try to sync the absolute positions of the <table> elements inside of
            // normal and locked views
            // but, when one of the panels is initally collapsed, there will be no <table> element, resulting in exception
            var normalViewEl = this.normalGrid.getView().el;

            if (!normalViewEl || !normalViewEl.child('table', true)) return;
        }

        return this.callParent(arguments);
    },


    onNormalViewScroll: function () {
        //        // TODO once we'll drop the support for 4.1.0 this check can be simplified to
        //        if (this.store.buffered && !this.normalGrid.getView().table.dom) return
        if (this.store.buffered) {
            // in case of buffered store, lockable mixin will try to sync the absolute positions of the <table> elements inside of
            // normal and locked views
            // but, when one of the panels is initally collapsed, there will be no <table> element, resulting in exception
            var lockedViewEl = this.lockedGrid.getView().el;

            if (!lockedViewEl || !lockedViewEl.child('table', true)) return;
        }

        return this.callParent(arguments);
    },


    setupLockableTree: function () {
        var me = this;

        var isBuffered = me.store.buffered;
        var topView = me.getView();
        var lockedView = me.lockedGrid.getView();
        var normalView = me.normalGrid.getView();
        var normalStore = normalView.store;
        var treeStore = me.store;

        // enable filtering support for trees
        var filterableProto = Sch.mixin.FilterableTreeView.prototype;

        lockedView.initTreeFiltering = filterableProto.initTreeFiltering;
        lockedView.onFilterChangeStart = filterableProto.onFilterChangeStart;
        lockedView.onFilterChangeEnd = filterableProto.onFilterChangeEnd;
        lockedView.onFilterCleared = filterableProto.onFilterCleared;
        lockedView.onFilterSet = filterableProto.onFilterSet;

        lockedView.initTreeFiltering();

        if (isBuffered) {
            treeStore.on('nodestore-datachange-end', function () {
                if (normalView.rendered) me.onNormalViewScroll();
            });
        } else {
            this.mon(treeStore, {
                'root-fill-start': function () {
                    normalStore.suspendEvents();
                },
                'root-fill-end': function () {
                    normalStore.resumeEvents();

                    topView.refresh();
                }
            });
        }

        // TODO remove in 2.2.0 
        this.mon(treeStore, 'filter', function (treeStore, args) {
            normalStore.filter.apply(normalStore, args);

            topView.refresh();
        });

        // TODO remove in 2.2.0
        this.mon(treeStore, 'clearfilter', function (treeStore) {
            normalStore.clearFilter();

            topView.refresh();
        });

        var verticalScroller = me.normalGrid.verticalScroller;

        if (isBuffered && verticalScroller) {
            var prevOnGuaranteedRange = verticalScroller.onGuaranteedRange;

            // native buffering is based on the assumption, that "refresh" event
            // from the store will trigger the view refresh - thats not true for tree case 
            // (search for "blockRefresh" in Ext sources)
            // so, after "onGuaranteedRange" we need to perform view refresh manually (for both locked/normal views)
            // we are doing "light" refresh - the one, not causing any changes in layout
            verticalScroller.onGuaranteedRange = function () {
                prevOnGuaranteedRange.apply(this, arguments);

                Ext.suspendLayouts();
                topView.refresh();
                Ext.resumeLayouts();
            };
        }

        // Override locked view to prevent unnecessary re-layouts after adding or removing rows
        var oldOnAdd = lockedView.onAdd;
        var oldOnRemove = lockedView.onRemove;

        lockedView.onAdd = function () {
            Ext.suspendLayouts();
            oldOnAdd.apply(this, arguments);
            Ext.resumeLayouts();
        };

        lockedView.onRemove = function () {
            Ext.suspendLayouts();
            oldOnRemove.apply(this, arguments);
            Ext.resumeLayouts();
        };
    },

    // Sync locked section after an event update
    onNormalViewItemUpdate: function (record, index, node) {
        // Change in 4.1.3 - node is an Ext.Element
        node = node.dom ? node.dom : node;

        if (this.lockedGridDependsOnSchedule) {
            var lockedView = this.lockedGrid.getView();
            lockedView.suspendEvents();
            lockedView.onUpdate(this.lockedGrid.store, record);
            lockedView.resumeEvents();
        }

        // HACK: Row height must be synced manually
        var row = this.normalGrid.getView().getNode(index);
        var changed = row.style.height !== node.style.height;
        row.style.height = node.style.height;
        this.normalHeights[index] = node.style.height;

        this.syncRowHeights(changed);
    },

    // Sync node + children after a tree node expand
    afterNormalGridItemExpand: function (record) {
        var me = this;
        var normalView = me.getSchedulingView();

        record.cascadeBy(function (rec) {
            if (rec !== record) {
                var node = normalView.getNode(rec);

                if (node) {
                    var index = normalView.indexOf(node);
                    me.normalHeights[index] = node.style.height;
                }
            }
        });

        me.syncRowHeights(true);
    },

    onViewItemAdd: function (records, index, nodes) {
        var normalView = this.normalGrid.getView();
        var lockedView = this.lockedGrid.getView();

        if (normalView.getNodes().length !== lockedView.getNodes().length) {
            return;
        }

        var normalHeights = this.normalHeights;

        Ext.each(records, function (record, idx) {
            var node = normalView.getNode(record);
            if (node) {
                normalHeights[node.viewIndex] = node.style.height;
            }
        });
        this.syncRowHeights();
    },


    processColumns: function (columns) {
        var res = this.callParent(arguments);
        var rightColumns = [];

        Ext.each(columns, function (column) {
            if (column.position == 'right') {
                column.processed = true;

                if (!Ext.isNumber(column.width)) {
                    Ext.Error.raise('"Right" columns must have a fixed width');
                }
                rightColumns.push(column);
                Ext.Array.remove(res.locked.items, column);

                // Adjust the locked width since 'right' columns (which Ext JS is knows nothing of) are not part of the locked section.
                res.lockedWidth -= column.width;
            }
        });

        if (this.orientation === 'horizontal') {
            res.normal.items = [
                {
                    xtype: this.lightWeight ? 'singletimeaxiscolumn' : 'timeaxiscolumn',
                    timeAxis: this.timeAxis,

                    timeCellRenderer: this.timeCellRenderer,
                    timeCellRendererScope: this.timeCellRendererScope,

                    trackHeaderOver: this.trackHeaderOver
                }
            ].concat(rightColumns);
        } else {
            res.locked.items = [
                Ext.apply({
                    xtype: 'verticaltimeaxis',
                    width: 100,
                    timeAxis: this.timeAxis
                }, this.timeAxisColumnCfg || {})
            ];
            res.lockedWidth = res.locked.items[0].width;
        }

        return res;
    },

    prepareFullRowHeightSync: function () {
        var me = this,
            view = me.normalGrid.getView(),
            lockedView = me.lockedGrid.getView();

        if (!view.rendered || !lockedView.rendered) {
            return;
        }

        var el = view.el,
            lockedEl = lockedView.el,
            rowEls = el.query(view.getItemSelector()),
            lockedRowEls = lockedEl.query(lockedView.getItemSelector()),
            ln = rowEls.length,
            i = 0;

        me.lockedHeights = [];
        me.normalHeights = [];

        if (lockedRowEls.length !== ln) {
            return;
        }

        for (; i < ln; i++) {
            me.normalHeights[i] = rowEls[i].style.height;
        }
    },

    onLockedViewRefresh: function () {
        this.prepareFullRowHeightSync();
        this.syncRowHeights();
    },

    onNormalViewRefresh: function () {
        var lockedView = this.lockedGrid.getView();

        if (this.lockedGridDependsOnSchedule) {
            lockedView.un('refresh', this.onLockedViewRefresh, this);
            this.lockedGrid.getView().refresh();
            lockedView.on('refresh', this.onLockedViewRefresh, this);
        }

        this.prepareFullRowHeightSync();
        this.syncRowHeights();
    },

    syncRowHeights: function (updateSpacer) {
        if (!this.lockedGrid.getView().rendered || !this.normalGrid.getView().rendered) {
            return;
        }

        var me = this,
            lockedHeights = me.lockedHeights,
            normalHeights = me.normalHeights,
            calcHeights = [],
            ln = lockedHeights.length || normalHeights.length,
            i = 0,
            lockedView, normalView,
            lockedRowEls, normalRowEls;

        if (lockedHeights.length || normalHeights.length) {
            lockedView = me.lockedGrid.getView();
            normalView = me.normalGrid.getView();

            lockedRowEls = lockedView.el.query(lockedView.getItemSelector());
            normalRowEls = normalView.el.query(normalView.getItemSelector());

            // Make sure both view have equal nbr of rows (during tree insert/expand they can be temporarily out of sync)
            if (normalRowEls.length !== lockedRowEls.length) {
                return;
            }

            for (; i < ln; i++) {
                if (lockedRowEls[i] && normalHeights[i]) {
                    lockedRowEls[i].style.height = normalHeights[i];
                }
            }

            me.lockedHeights = [];
            me.normalHeights = [];
        }

        if (updateSpacer !== false) {
            me.updateSpacer();
        }
    },

    // Don't add locking/unlocking menu actions, changed in 4.1.2
    getMenuItems: function () {
        if (Ext.versions.extjs.isGreaterThanOrEqual('4.1.2')) {
            return this.callParent(arguments);
        }

        return function () {
            return Ext.grid.header.Container.prototype.getMenuItems.apply(this, arguments);
        };
    },

    // @PATCH Broken in 4.1 RC2
    applyColumnsState: Ext.emptyFn,

    updateSpacer: function () {

        var lockedView = this.lockedGrid.getView();
        var normalView = this.normalGrid.getView();

        if (lockedView.rendered && normalView.rendered && lockedView.el.child('table')) {
            var me = this,
            // This affects scrolling all the way to the bottom of a locked grid
            // additional test, sort a column and make sure it synchronizes
                lockedViewEl = lockedView.el,
                normalViewEl = normalView.el.dom,
                spacerId = lockedViewEl.dom.id + '-spacer',
                spacerHeight = (normalViewEl.offsetHeight - normalViewEl.clientHeight) + 'px';


            me.spacerEl = Ext.getDom(spacerId);

            // HACK ie 6-7 and 8 in quirks mode fail to set style of hidden elements, so we must remove it manually
            if (Ext.isIE6 || Ext.isIE7 || (Ext.isIEQuirks && Ext.isIE8) && me.spacerEl) {

                Ext.removeNode(me.spacerEl);
                me.spacerEl = null;
            }

            if (me.spacerEl) {
                me.spacerEl.style.height = spacerHeight;
            } else {
                // put the spacer inside of stretcher with special css class (see below), which will cause the 
                // stretcher to increase its height on the height of spacer 
                var spacerParent;

                if (this.store.buffered) {
                    // Find stretcher of the locked view
                    spacerParent = me.normalGrid.verticalScroller.stretcher.item(0).dom.parentNode === lockedViewEl.dom ?
                                   me.normalGrid.verticalScroller.stretcher.item(0) : me.normalGrid.verticalScroller.stretcher.item(1);
                } else {
                    spacerParent = lockedViewEl;
                }

                Ext.core.DomHelper.append(spacerParent, {
                    id: spacerId,
                    cls: this.store.buffered ? 'sch-locked-buffered-spacer' : '',
                    style: 'height: ' + spacerHeight
                });
            }
        }
    },

    onLockedViewRender: function () {
        var normalGrid = this.normalGrid;

        if (!this.lockedStretcher) {
            var lockedViewEl = this.lockedGrid.getView().el;

            var lockedStretcher = this.lockedStretcher = lockedViewEl.createChild({
                cls: 'x-stretcher',
                style: {
                    position: 'absolute',
                    width: '1px',
                    height: 0,
                    top: 0,
                    left: 0
                }
            }, lockedViewEl.dom.firstChild);
        }

        if (!normalGrid.rendered) {
            normalGrid.getView().on('render', this.onLockedViewRender, this);

            return;
        }

        //        if (normalGrid.verticalScroller.stretcher instanceof Ext.CompositeElement) {
        //            // in Ext 4.1.1, locking + buffering is supported
        //            return;
        //        }

        var me = this;

        // looks like something has changed and now the "scroll" listener of the normal view element
        // appears slightly later than this stage
        // because of that, `normalGrid.getView().el.un('scroll', me.onNormalViewScroll, me)` does not work
        // (there's not listener yet) and we double the listener
        // delay to actually replace the old listener
        setTimeout(function () {
            var normalViewEl = normalGrid.getView().el;

            if (normalViewEl && normalViewEl.dom) {
                // make sure the listener for "scroll" event is the last one 
                // (it should be called _after_ same listener of the PagingScroller)
                // only relevant for IE generally, but won't hurt for other browsers too
                normalGrid.getView().el.un('scroll', me.onNormalViewScroll, me);
                normalGrid.getView().el.on('scroll', me.onNormalViewScroll, me);
            }
        }, 0);

        var verticalScroller = normalGrid.verticalScroller;

        verticalScroller.stretcher.addCls('x-stretcher');

        verticalScroller.stretcher = new Ext.dom.CompositeElement([this.lockedStretcher, verticalScroller.stretcher]);
    },

    onNormalViewGroupExpand: function () {
        this.prepareFullRowHeightSync();
        this.syncRowHeights();
    },


    // Nodestore expand/collapse has too many layout side effects, bypass them
    overrideNodeStore: function (nodeStore) {

        var oldOnNodeCollapse = nodeStore.onNodeCollapse;
        var oldOnNodeExpand = nodeStore.onNodeExpand;

        nodeStore.onNodeCollapse = function () {
            Ext.suspendLayouts();
            oldOnNodeCollapse.apply(this, arguments);
            Ext.resumeLayouts();
        };

        nodeStore.onNodeExpand = function () {
            Ext.suspendLayouts();
            oldOnNodeExpand.apply(this, arguments);
            Ext.resumeLayouts();
        };
    }
});


/**

@class Sch.model.Customizable
@extends Ext.data.Model

This class represent a model with customizable field names. Customizable fields are defined in separate 
class config `customizableFields`. The format of definition is just the same as for usual fields:

Ext.define('BaseModel', {
extend      : 'Sch.model.Customizable',
        
customizableFields  : [
{ name      : 'StartDate',  type    : 'date', dateFormat : 'c' },
{ name      : 'EndDate',    type    : 'date', dateFormat : 'c' }
],
        
fields              : [
'UsualField'
],
        
getEndDate : function () {
return "foo"
}
});

For each customizable field will be created getter and setter, using the camel-cased name of the field ("stable name"), 
prepended with "get/set" respectively. They will not overwrite any existing methods:

var baseModel       = new BaseModel({
StartDate   : new Date(2012, 1, 1),
EndDate     : new Date(2012, 2, 3)
});
    
// using getter for "StartDate" field
// returns date for "2012/02/01"
var startDate   = baseModel.getStartDate();
    
// using custom getter for "EndDate" field
// returns "foo"
var endDate     = baseModel.getEndDate();
    
You can change the name of the customizable fields in the subclasses of the model or completely re-define them. 
For that, add a special property to the class, name of this property should be formed as name of the field with lowercased first
letter, appended with "Field". The value of the property should contain the new name of the field.

Ext.define('SubModel', {
extend      : 'BaseModel',
        
startDateField      : 'beginDate',
endDateField        : 'finalizeDate',
        
fields              : [
{ name      : 'beginDate',  type    : 'date', dateFormat : 'Y-m-d' },
]
});
    
var subModel       = new SubModel({
beginDate       : new Date(2012, 1, 1),
finalizeDate    : new Date(2012, 2, 3)
});
    
// name of getter is still the same
var startDate   = subModel.getStartDate();

In the example above the `StartDate` field was completely re-defined to the `beginDate` field with different date format.
The `EndDate` has just changed its name to "finalizeDate". Note, that getters and setters are always named after "stable"
field name, not the customized one.

*/
Ext.define('Sch.model.Customizable', {
    extend: 'Ext.data.Model',

    /**
    * @cfg {Array} customizableFields
    * 
    * The array of customizale fields definitions.
    */
    customizableFields: null,

    onClassExtended: function (cls, data, hooks) {
        var onBeforeCreated = hooks.onBeforeCreated;

        hooks.onBeforeCreated = function (cls, data) {
            onBeforeCreated.call(this, cls, data);

            var proto = cls.prototype;

            if (!proto.customizableFields) {
                return;
            }

            // combining our customizable fields with ones from superclass
            // our fields goes after fields from superclass to overwrite them if some names match
            proto.customizableFields = (cls.superclass.customizableFields || []).concat(proto.customizableFields);

            var customizableFields = proto.customizableFields;

            // collect fields here, overwriting old ones with new
            var customizableFieldsByName = {};

            Ext.Array.each(customizableFields, function (field) {
                // normalize to object 
                if (typeof field == 'string') field = { name: field };

                customizableFieldsByName[field.name] = field;
            });

            // already processed by the Ext.data.Model `onBeforeCreated`
            var fields = proto.fields;

            var toRemove = [];

            fields.each(function (field) {
                if (field.isCustomizableField) toRemove.push(field);
            });

            fields.removeAll(toRemove);

            Ext.Object.each(customizableFieldsByName, function (name, customizableField) {
                // mark all customizable fields with special property, to be able remove them later
                customizableField.isCustomizableField = true;

                var stableFieldName = customizableField.name;

                var fieldProperty = stableFieldName === 'Id' ? 'idProperty' : stableFieldName.charAt(0).toLowerCase() + stableFieldName.substr(1) + 'Field';
                var overrideFieldName = proto[fieldProperty];

                var realFieldName = overrideFieldName || stableFieldName;

                if (fields.containsKey(realFieldName)) {
                    // if user has re-defined some customizable field, mark it accordingly
                    // such fields weren't be inheritable though (won't replace the customizable field)
                    fields.getByKey(realFieldName).isCustomizableField = true;

                    // add it to our customizable fields list on the last position, so in the subclasses
                    // it will overwrite other fields with this name
                    customizableFields.push(
                        new Ext.data.Field(
                            Ext.applyIf({ name: stableFieldName, isCustomizableField: true }, fields.getByKey(realFieldName))
                        )
                    );
                } else
                // we create a new copy of the `customizableField` using possibly new name 
                    fields.add(new Ext.data.Field(Ext.applyIf({ name: realFieldName, isCustomizableField: true }, customizableField)));

                var capitalizedStableName = Ext.String.capitalize(stableFieldName);

                // don't overwrite `getId` method
                if (capitalizedStableName != 'Id') {
                    var getter = 'get' + capitalizedStableName;
                    var setter = 'set' + capitalizedStableName;

                    // overwrite old getters, pointing to a different field name
                    if (!proto[getter] || proto[getter].__getterFor__ && proto[getter].__getterFor__ != realFieldName) {
                        proto[getter] = function () {
                            return this.data[realFieldName];
                        };

                        proto[getter].__getterFor__ = realFieldName;
                    }

                    // same for setters
                    if (!proto[setter] || proto[setter].__setterFor__ && proto[setter].__setterFor__ != realFieldName) {
                        proto[setter] = function (value) {
                            return this.set(realFieldName, value);
                        };

                        proto[setter].__setterFor__ = realFieldName;
                    }
                }
            });
        };
    },

    // Overridden to be able to track previous record field values
    set: function (fieldName, value) {
        if (arguments.length === 2) {
            this.previous = this.previous || {};
            var currentValue = this.get(fieldName);

            // Store previous field value
            if (currentValue !== value) {
                this.previous[fieldName] = currentValue;
            }
        }
        this.callParent(arguments);
    },

    // Overridden to be able to track previous record field values
    afterEdit: function () {
        this.callParent(arguments);

        // Reset the previous tracking object
        delete this.previous;
    },

    // Overridden to be able to track previous record field values
    reject: function () {
        var me = this,
            modified = me.modified,
            field;

        me.previous = me.previous || {};
        for (field in modified) {
            if (modified.hasOwnProperty(field)) {
                if (typeof modified[field] != "function") {
                    me.previous[field] = me.get(field);
                }
            }
        }
        me.callParent(arguments);

        // Reset the previous tracking object
        delete me.previous;
    }
});



Ext.define('Sch.patches.Model', {
    extend: "Sch.util.Patch",
    requires: 'Sch.model.Customizable',

    reportURL: 'http://www.sencha.com/forum/showthread.php?198250-4.1-Ext.data.Model-regression',
    description: 'In Ext 4.1 Models cannot be subclassed',
    maxVersion: '4.1.0',

    applyFn: function () {
        try {
            Ext.define('Sch.foo', { extend: 'Ext.data.Model', fields: ['a'] });
            Ext.define('Sch.foo.Sub', { extend: 'Sch.foo', fields: ['a'] });
        } catch (e) {
            // PATCH
            Ext.data.Types.AUTO.convert = function (v) { return v; };
        }
    }
});

/**

@class Sch.model.Range
@extends Sch.model.Customizable

This class represent a simple date range. It is being used in various subclasses and plugins which operate on date ranges. 

Its a subclass of the {@link Sch.model.Customizable}, which is in turn subclass of {@link Ext.data.Model}.
Please refer to documentation of those classes to become familar with the base interface of this class. 

A range has the following fields:

- `StartDate`   - start date of the task in the ISO 8601 format
- `EndDate`     - end date of the task in the ISO 8601 format (not inclusive)
- `Name`        - an optional name of the range
- `Cls`         - an optional CSS class to be associated with the range. 

The name of any field can be customized in the subclass. Please refer to {@link Sch.model.Customizable} for details.

*/
Ext.define('Sch.model.Range', {
    extend: 'Sch.model.Customizable',

    requires: [
        'Sch.util.Date',
        'Sch.patches.DataOperation'
    ],

    /**
    * @cfg {String} startDateField The name of the field that defines the range start date. Defaults to "StartDate".
    */
    startDateField: 'StartDate',

    /**
    * @cfg {String} endDateField The name of the field that defines the range end date. Defaults to "EndDate".
    */
    endDateField: 'EndDate',

    /**
    * @cfg {String} nameField The name of the field that defines the range name. Defaults to "Name".
    */
    nameField: 'Name',

    /**
    * @cfg {String} clsField The name of the field that holds the range "class" value (usually corresponds to a CSS class). Defaults to "Cls".
    */
    clsField: 'Cls',

    customizableFields: [
    /**
    * @method getStartDate
    * 
    * Returns the range start date
    * 
    * @return {Date} The start date 
    */

        {name: 'StartDate', type: 'date', dateFormat: 'c' },

    /**
    * @method getEndDate
    * 
    * Returns the range end date
    * 
    * @return {Date} The end date 
    */

        {name: 'EndDate', type: 'date', dateFormat: 'c' },

    /**
    * @method getCls
    * 
    * Gets the "class" of the range
    * 
    * @return {String} cls The "class" of the range 
    */
    /**
    * @method setCls
    * 
    * Sets the "class" of the range
    * 
    * @param {String} cls The new class of the range 
    */
        {
        name: 'Cls', type: 'string'
    },

    /**
    * @method getName
    * 
    * Gets the name of the range
    * 
    * @return {String} name The "name" of the range 
    */
    /**
    * @method setName
    * 
    * Sets the "name" of the range
    * 
    * @param {String} name The new name of the range 
    */
        {
        name: 'Name', type: 'string'
    }
    ],

    /**
    * @method setStartDate
    *
    * Sets the range start date
    *
    * @param {Date} date The new start date
    * @param {Boolean} keepDuration Pass `true` to keep the duration of the task ("move" the event), `false` to change the duration ("resize" the event).
    * Defaults to `false`
    */
    setStartDate: function (date, keepDuration) {
        var endDate = this.getEndDate();
        var oldStart = this.getStartDate();

        this.set(this.startDateField, date);

        if (keepDuration === true && endDate && oldStart) {
            this.setEndDate(Sch.util.Date.add(date, Sch.util.Date.MILLI, endDate - oldStart));
        }
    },

    /**
    * @method setEndDate
    *
    * Sets the range end date
    *
    * @param {Date} date The new end date
    * @param {Boolean} keepDuration Pass `true` to keep the duration of the task ("move" the event), `false` to change the duration ("resize" the event).
    * Defaults to `false`
    */
    setEndDate: function (date, keepDuration) {
        var startDate = this.getStartDate();
        var oldEnd = this.getEndDate();

        this.set(this.endDateField, date);

        if (keepDuration === true && startDate && oldEnd) {
            this.setStartDate(Sch.util.Date.add(date, Sch.util.Date.MILLI, -(oldEnd - startDate)));
        }
    },

    /**
    * Sets the event start and end dates
    * 
    * @param {Date} start The new start date 
    * @param {Date} end The new end date 
    */
    setStartEndDate: function (start, end) {
        this.beginEdit();
        this.set(this.startDateField, start);
        this.set(this.endDateField, end);
        this.endEdit();
    },

    /**
    * Returns an array of dates in this range. If the range starts/ends not at the beginning of day, the whole day will be included.
    * @return {Array[Date]}
    */
    getDates: function () {
        var dates = [],
            endDate = this.getEndDate();

        for (var date = Ext.Date.clearTime(this.getStartDate(), true); date < endDate; date = Sch.util.Date.add(date, Sch.util.Date.DAY, 1)) {

            dates.push(date);
        }

        return dates;
    },


    /**
    * Iterates over the results from {@link #getDates}
    * @param {Function} func The function to call for each date
    * @param {Object} scope The scope to use for the function call
    */
    forEachDate: function (func, scope) {
        return Ext.each(this.getDates(), func, scope);
    },

    // Simple check if end date is greater than start date
    isValid: function () {
        var valid = this.callParent(arguments);

        if (valid) {
            var start = this.getStartDate(),
                end = this.getEndDate();

            valid = !start || !end || (end - start >= 0);
        }

        return valid;
    },

    /**
    * Shift the dates for the date range by the passed amount and unit
    * @param {String} unit The unit to shift by (e.g. range.shift(2, Sch.util.Date.DAY); ) to bump the range 2 days forward
    * @param {Int} amount The amount to shift
    */
    shift: function (unit, amount) {
        this.setStartEndDate(Sch.util.Date.add(this.getStartDate(), unit, amount),
                             Sch.util.Date.add(this.getEndDate(), unit, amount));
    }
});
/**

@class Sch.model.Event
@extends Sch.model.Range

This class represent a single event in your schedule. Its a subclass of the {@link Sch.model.Range}, which is in turn subclass of {@link Sch.model.Customizable} and {@link Ext.data.Model}.
Please refer to documentation of those classes to become familar with the base interface of the task.

The Event model has a few predefined fields as seen below. If you want to add new fields or change the options for the existing fields,
you can do that by subclassing this class (see example below). 

Fields
------

- `Id`          - (mandatory) unique identificator of task
- `Name`        - name of the event (task title)
- `StartDate`   - start date of the task in the ISO 8601 format
- `EndDate`     - end date of the task in the ISO 8601 format,
- `ResourceId`  - The id of the associated resource
- `Resizable`   - A field allowing you to easily control how an event can be resized. You can set it to: true, false, 'start' or 'end' as its value.
- `Draggable`   - A field allowing you to easily control if an event can be dragged. (true or false)
- `Cls`         - A field containing a CSS class to be added to the rendered event element.

Subclassing the Event model class
--------------------

Ext.define('MyProject.model.Event', {
extend      : 'Sch.model.Event',
                
fields      : [
// adding new field
{ name: 'MyField', type : 'number', defaultValue : 0 }
],
                
myCheckMethod : function () {
return this.get('MyField') > 0 
},
...
});

If you want to use other names for the StartDate, EndDate, ResourceId and Name fields you can configure them as seen below:

Ext.define('MyProject.model.Event', {
extend      : 'Sch.model.Event',
                
startDateField  : 'taskStart',
endDateField    : 'taskEnd',
                
// just rename the fields
resourceIdField : 'userId',
nameField       : 'taskTitle',
        
fields      : [
// completely change the definition of fields
{ name: 'taskStart', type: 'date', dateFormat : 'Y-m-d' },
{ name: 'taskEnd', type: 'date', dateFormat : 'Y-m-d' },
]
...
});
    
Please refer to {@link Sch.model.Customizable} for additional details.
    
*/
Ext.define('Sch.model.Event', {
    extend: 'Sch.model.Range',

    idProperty: 'Id',

    customizableFields: [
        { name: 'Id' },
        { name: 'ResourceId' },
        { name: 'Draggable', type: 'boolean', persist: false, defaultValue: true },   // true or false
        {name: 'Resizable', persist: false, defaultValue: true}                     // true, false, 'start' or 'end'
    ],

    /**
    * @cfg {String} resourceIdField The name of the field identifying the resource to which an event belongs. Defaults to "ResourceId".
    */
    resourceIdField: 'ResourceId',

    /**
    * @cfg {String} draggableField The name of the field specifying if the event should be draggable in the timeline
    */
    draggableField: 'Draggable',

    /**
    * @cfg {String} resizableField The name of the field specifying if/how the event should be resizable.
    */
    resizableField: 'Resizable',

    /**
    * Returns either the resource associated with this event (when called w/o `resourceId`) or resource with specified id. 
    * 
    * @param {String} resourceId (optional)
    * @return {Sch.model.Resource} 
    */
    getResource: function (resourceId) {
        if (this.stores.length > 0) {
            var rs = this.stores[0].resourceStore;
            resourceId = resourceId || this.get(this.resourceIdField);

            if (Ext.data.TreeStore && rs instanceof Ext.data.TreeStore) {
                return rs.getNodeById(resourceId) || rs.getRootNode().findChildBy(function (r) { return r.internalId === resourceId; });
            } else {
                return rs.getById(resourceId) || rs.data.map[resourceId];
            }
        }

        return null;
    },

    /**
    * Sets the resource which the event should belong to.
    * 
    * @param {Sch.model.Resource/Mixed} resource The new resource
    */
    setResource: function (resourceOrId) {
        this.set(this.resourceIdField, (resourceOrId instanceof Ext.data.Model) ? resourceOrId.getId() || resourceOrId.internalId : resourceOrId);
    },

    /**
    * Assigns this event to the specified resource, alias for 'setResource'
    * 
    * @param {Sch.model.Resource/Mixed} resource The new resource for this event
    */
    assign: function (resourceOrId) {
        this.setResource.apply(this, arguments);
    },

    /**
    * Unassigns this event from the specified resource
    * 
    * @param {Sch.model.Resource/Mixed} resource The new resource for this event
    */
    unassign: function (resourceOrId) {
        // TODO
        //this.setResourceId(null);
    },

    /**
    * @method isDraggable
    * 
    * Returns true if event can be drag and dropped
    * @return {Mixed} The draggable state for the event.
    */
    isDraggable: function () {
        return this.getDraggable();
    },

    /**
    * @method setDraggable
    * 
    * Sets the new draggable state for the event
    * @param {Boolean} draggable true if this event should be draggable
    */

    /**
    * @method isResizable
    * 
    * Returns true if event can be resized, but can additionally return 'start' or 'end' indicating how this event can be resized. 
    * @return {Mixed} The resource Id
    */
    isResizable: function () {
        return this.getResizable();
    },

    /**
    * @method setResizable
    * 
    * Sets the new resizable state for the event. You can specify true/false, or 'start'/'end' to only allow resizing one end of an event.
    * @param {Boolean} resizable true if this event should be resizable
    */

    /**
    * @method getResourceId
    * 
    * Returns the resource id of the resource that the event belongs to.
    * @return {Mixed} The resource Id
    */

    /**
    * @method setResourceId
    * 
    * Sets the new resource id of the resource that the event belongs to.
    * @param {Mixed} The resource Id
    */

    /**
    * Returns false if a linked resource is a phantom record, i.e. it's not persisted in the database.
    * @return {Boolean} valid
    */
    isPersistable: function () {
        var resources = this.getResources();
        var persistable = true;

        Ext.each(resources, function (r) {
            if (r.phantom) {
                persistable = false;
                return false;
            }
        });

        return persistable;
    },

    forEachResource: function (fn, scope) {
        var rs = this.getResources();
        for (var i = 0; i < rs.length; i++) {
            if (fn.call(scope || this, rs[i]) === false) {
                return;
            }
        }
    },

    getResources: function () {
        var resource = this.getResource();

        return resource ? [resource] : [];
    }
});
/**

@class Sch.model.Resource
@extends Sch.model.Customizable

This class represent a single Resource in the scheduler chart. Its a subclass of the {@link Sch.model.Customizable}, which is in turn subclass of {@link Ext.data.Model}.
Please refer to documentation of those classes to become familar with the base interface of the resource.

A Resource has only 2 mandatory fields - `Id` and `Name`. If you want to add more fields with meta data describing your resources then you should subclass this class:

Ext.define('MyProject.model.Resource', {
extend      : 'Sch.model.Resource',
        
fields      : [
// `Id` and `Name` fields are already provided by the superclass
{ name: 'Company',          type : 'string' }
],
        
getCompany : function () {
return this.get('Company');
},
...
});

If you want to use other names for the Id and Name fields you can configure them as seen below:

Ext.define('MyProject.model.Resource', {
extend      : 'Sch.model.Resource',
        
nameField   : 'UserName',
...
});
    
Please refer to {@link Sch.model.Customizable} for details.

*/
Ext.define('Sch.model.Resource', {
    extend: 'Sch.model.Customizable',

    idProperty: 'Id',

    /**
    * @cfg {String} nameField The name of the field that holds the resource name. Defaults to "Name".
    */
    nameField: 'Name',

    customizableFields: [
        'Id',

    /**
    * @method getName
    * 
    * Returns the resource name
    * 
    * @return {String} The name of the resource
    */
    /**
    * @method setName
    * 
    * Sets the resource name
    * 
    * @param {String} The new name of the resource
    */
        {name: 'Name', type: 'string' }
    ],

    getEventStore: function () {
        return this.stores[0] && this.stores[0].eventStore || this.parentNode && this.parentNode.getEventStore();
    },


    /**
    * Returns an array of events, associated with this resource 
    * @param {Sch.data.EventStore} eventStore (optional) The event store to get events for (if a resource is bound to multiple stores)
    * @return {Array[Sch.model.Event]}
    */
    getEvents: function (eventStore) {
        var events = [],
            ev,
            id = this.getId() || this.internalId;

        eventStore = eventStore || this.getEventStore();

        for (var i = 0, l = eventStore.getCount(); i < l; i++) {
            ev = eventStore.getAt(i);
            if (ev.data[ev.resourceIdField] === id) {
                events.push(ev);
            }
        }

        return events;
    }
});
/**
@class Sch.data.mixin.EventStore

This is a mixin, containing functionality related to managing events. 

It is consumed by the regular {@link Sch.data.EventStore} class and {@link Gnt.data.TaskStore} class 
to allow data sharing between gantt chart and scheduler. Please note though, that datasharing is still
an experimental feature and not all methods of this mixin can be used yet on a TaskStore. 

*/
Ext.define("Sch.data.mixin.EventStore", {
    model: 'Sch.model.Event',

    requires: [
        'Sch.util.Date'
    ],

    isEventStore: true,

    /**
    * Sets the resource store for this store
    * 
    * @param {Sch.data.ResourceStore} resourceStore
    */
    setResourceStore: function (resourceStore) {
        if (this.resourceStore) {
            this.resourceStore.un({
                beforesync: this.onResourceStoreBeforeSync,
                write: this.onResourceStoreWrite,
                scope: this
            });
        }

        this.resourceStore = resourceStore;

        if (resourceStore) {
            resourceStore.on({
                beforesync: this.onResourceStoreBeforeSync,
                write: this.onResourceStoreWrite,
                scope: this
            });
        }
    },

    onResourceStoreBeforeSync: function (records, options) {
        var recordsToCreate = records.create;

        if (recordsToCreate) {
            for (var r, i = recordsToCreate.length - 1; i >= 0; i--) {
                r = recordsToCreate[i];

                // Save the phantom id to be able to replace the task phantom task id's in the dependency store
                r._phantomId = r.internalId;
            }
        }
    },

    /* 
    * This method will update events that belong to a phantom resource, to make sure they get the 'real' resource id
    */
    onResourceStoreWrite: function (store, operation) {
        if (operation.wasSuccessful()) {
            var me = this,
                rs = operation.getRecords();

            Ext.each(rs, function (resource) {
                if (resource._phantomId && !resource.phantom) {
                    me.each(function (event) {
                        if (event.getResourceId() === resource._phantomId) {
                            event.assign(resource);
                        }
                    });
                }
            });
        }
    },

    /**
    * Checks if a date range is allocated or not for a given resource.
    * @param {Date} start The start date
    * @param {Date} end The end date
    * @param {Sch.model.Event} excludeEvent An event to exclude from the check (or null)
    * @param {Sch.model.Resource} resource The resource
    * @return {Boolean} True if the timespan is available for the resource
    */
    isDateRangeAvailable: function (start, end, excludeEvent, resource) {
        var available = true,
            DATE = Sch.util.Date;

        this.each(function (ev) {
            if (DATE.intersectSpans(start, end, ev.getStartDate(), ev.getEndDate()) &&
                resource === ev.getResource() &&
                (!excludeEvent || excludeEvent !== ev)) {
                available = false;
                return false;
            }
        });
        return available;
    },

    /**
    * Returns events between the supplied start and end date
    * @param {Date} start The start date
    * @param {Date} end The end date
    * @param {Boolean} allowPartial false to only include events that start and end inside of the span
    * @return {Ext.util.MixedCollection} the events
    */
    getEventsInTimeSpan: function (start, end, allowPartial) {

        if (allowPartial !== false) {
            var DATE = Sch.util.Date;

            return this.queryBy(function (event) {
                var eventStart = event.getStartDate(),
                    eventEnd = event.getEndDate();

                return eventStart && eventEnd && DATE.intersectSpans(eventStart, eventEnd, start, end);
            });
        } else {
            return this.queryBy(function (event) {
                var eventStart = event.getStartDate(),
                    eventEnd = event.getEndDate();

                return eventStart && eventEnd && (eventStart - start >= 0) && (end - eventEnd >= 0);
            });
        }
    },

    /**
    * Returns an object defining the earliest start date and the latest end date of all the events in the store.
    * 
    * @return {Object} An object with 'start' and 'end' Date properties (or null values if data is missing).
    */
    getTotalTimeSpan: function () {
        var earliest = new Date(9999, 0, 1),
            latest = new Date(0),
            D = Sch.util.Date;

        this.each(function (r) {
            if (r.getStartDate()) {
                earliest = D.min(r.getStartDate(), earliest);
            }
            if (r.getEndDate()) {
                latest = D.max(r.getEndDate(), latest);
            }
        });

        earliest = earliest < new Date(9999, 0, 1) ? earliest : null;
        latest = latest > new Date(0) ? latest : null;

        return {
            start: earliest || null,
            end: latest || earliest || null
        };
    },

    /**
    * Returns the events associated with a resource
    * @param {Sch.model.Resource} resource
    * @return {Sch.model.Event[]} the events
    */
    getEventsForResource: function (resource) {
        var events = [],
            ev,
            id = resource.getId() || resource.internalId;

        for (var i = 0, l = this.getCount(); i < l; i++) {
            ev = this.getAt(i);
            if (ev.data[ev.resourceIdField] == id) {
                events.push(ev);
            }
        }

        return events;
    },

    /**
    * Returns the event closest in time for a specified event
    * @param {Sch.model.Event} event The event to use as reference
    * @param {Sch.model.Event[]} (optional) If provided, only the subset of events in this array will be searched.
    * @return {Sch.model.Event} the events
    */
    getClosestSuccessor: function (event, events) {
        var minGap = Infinity,
            eventEnd = event.getEnd(),
            closest,
            gap;

        events = events || this.getRange();

        for (var i = 0, l = events.length; i < l; i++) {
            gap = events[i].getStart() - eventEnd;

            if (gap >= 0 && gap < minGap) {
                closest = events[i];
                minGap = gap;
            }
        }
        return closest;
    }
});
/**
@class Sch.data.EventStore

This is a class holding all the {@link Sch.model.Event events} to be rendered into a {@link Sch.panel.SchedulerGrid scheduler panel}.

*/
Ext.define("Sch.data.EventStore", {
    extend: 'Ext.data.Store',

    mixins: [
        'Sch.data.mixin.EventStore'
    ],

    getByInternalId: function (id) {
        return this.data.getByKey(id);
    }
});
/**
* @class Sch.data.mixin.ResourceStore
* This is a mixin for the ResourceStore functionality. It is consumed by the {@link Sch.data.ResourceStore} class ("usual" store) and {@link Sch.data.ResourceTreeStore} - tree store.
* 
*/
Ext.define("Sch.data.mixin.ResourceStore", {
});
Ext.define("Sch.data.FilterableNodeStore", {
    extend: 'Ext.data.NodeStore',


    onNodeExpand: function (parent, records, suppressEvent) {
        var visibleRecords = [];

        for (var i = 0; i < records.length; i++) {
            var record = records[i];

            if (!(record.isHidden && record.isHidden() || record.hidden || record.data.hidden)) visibleRecords[visibleRecords.length] = record;
        }

        return this.callParent([parent, visibleRecords, suppressEvent]);
    }
});
/**
@class Sch.data.mixin.FilterableTreeStore

This is a mixin for the Ext.data.TreeStore, providing filtering functionality. Please note, that ExtJS does not support filtering of the tree stores,
and the functionality of this mixin is not related to standard ExtJS filtering (which utilizes Ext.util.Filter etc). This implementation however should be flexible
enough to cover all common uses cases.

The functionality of this class can be divided into two sections:

Filtering
=========

Filtering of the tree store is different from filtering of the flat stores. In flat stores all nodes (items) are of the same type and on the same hieararchy level.
Filtering can hide any of nodes, that does not match some criteria. 

On the other hand, in tree stores, some of the nodes represent the hieararchy points with child nodes ("parent", "folder", "group" etc) and other are "leafs" (has no child nodes).
And usually "leaf" node can't be sufficiently identified, w/o its parents - iow its important to know, to which parents this particular leaf node belongs to. So, when filtering
tree stores, we need to show all parent nodes of the filtered nodes.

Moreover, filtering is usually being used for searching and thus should ignore the "expanded/collapsed" state of tree nodes (we need to search among all nodes,
including collapsed ones). Because of that and underlaying ExtJS implementation **expanding/collapsing/adding/removing nodes when tree store is filtered is not supported.** This limitation
could be removed in future releases.

Filtering can be activated with the {@link #filterTreeBy} method and cleared with {@link #clearTreeFilter}.

Hiding/Showing nodes
====================

Sometimes we want to keep some nodes in tree, but remove them from visual presentation - hide them. This can be done with {@link #hideNodesBy} method and {@link #showAllNodes} can be
used to restore the previous state. When node is hidden all its child nodes are hidden too.

"Hidden" nodes will never appear in filtering results - consider them removed from the tree store completely. They will, however, appear in data package of `store.sync()` operation
(you can override the the "filterUpdated" method to exclude them from there, if needed). 

Note, that its is possible to filter the store with hidden nodes, but not the other way around (hide some nodes of the filtered store).

*/
Ext.define("Sch.data.mixin.FilterableTreeStore", {

    requires: [
        'Sch.data.FilterableNodeStore'
    ],


    nodeStoreClassName: 'Sch.data.FilterableNodeStore',

    nodeStore: null,

    isFilteredFlag: false,


    /**
    * Should be called in the constructor of the consuming class, to activate the filteirng functionality.
    */
    initTreeFiltering: function () {
        if (!this.nodeStore) this.nodeStore = this.createNodeStore(this);

        this.addEvents(
            'filter-set',
            'filter-clear',
            'nodestore-datachange-start',
            'nodestore-datachange-end'
        );
    },


    createNodeStore: function (treeStore) {
        return Ext.create(this.nodeStoreClassName, {
            treeStore: treeStore,
            recursive: true,
            rootVisible: this.rootVisible
        });
    },


    /**
    * Clears current filter (if any).
    * 
    * See also {@link Sch.data.mixin.FilterableTreeStore} for additional information.
    */
    clearTreeFilter: function () {
        if (!this.isTreeFiltered()) return;

        this.refreshNodeStoreContent();

        this.isFilteredFlag = false;

        this.fireEvent('filter-clear', this);
    },


    refreshNodeStoreContent: function (skipUIRefresh) {
        var root = this.getRootNode(),
            linearNodes = [];

        var rootVisible = this.rootVisible;

        var collectNodes = function (node) {
            if (node.isHidden && node.isHidden() || node.hidden || node.data.hidden) return;

            if (rootVisible || node != root) linearNodes[linearNodes.length] = node;

            if (!node.data.leaf && node.isExpanded()) {
                var childNodes = node.childNodes,
                    length = childNodes.length;

                for (var k = 0; k < length; k++) collectNodes(childNodes[k]);
            }
        };

        collectNodes(root);

        this.fireEvent('nodestore-datachange-start', this);

        var nodeStore = this.nodeStore;

        // "loadDataInNodeStore" is a special hook for buffered case
        // in buffered case, instead of "loadRecords" we need to use "cachePage"
        if (!this.loadDataInNodeStore || !this.loadDataInNodeStore(linearNodes)) nodeStore.loadRecords(linearNodes);

        // HACK - forcing view to refresh, the usual "refresh" event is blocked by the tree view (see `blockRefresh` property)
        if (!skipUIRefresh) nodeStore.fireEvent('clear', nodeStore);

        this.fireEvent('nodestore-datachange-end', this);
    },


    getIndexInTotalDataset: function (record) {
        var root = this.getRootNode();
        index = -1;

        var rootVisible = this.rootVisible;

        if (!rootVisible && record == root) return -1;

        var collectNodes = function (node) {
            if (node.isHidden && node.isHidden() || node.hidden || node.data.hidden)
            // stop scanning if record we are looking for is hidden
                if (node == record) return false;

            if (rootVisible || node != root) index++;

            // stop scanning if we found the record
            if (node == record) return false;

            if (!node.data.leaf && node.isExpanded()) {
                var childNodes = node.childNodes,
                    length = childNodes.length;

                for (var k = 0; k < length; k++)
                    if (collectNodes(childNodes[k]) === false) return false;
            }
        };

        collectNodes(root);

        return index;
    },



    /**
    * Returns the boolean, indicating whether this store is currently filtered
    * 
    * @return {Boolean}
    */
    isTreeFiltered: function () {
        return this.isFilteredFlag;
    },


    /**
    * This method filters the tree store. It accept an object with following properties:
    * 
    * - `filter` - a function to check if the node should be included in the results. It will be called for each **leaf** node in tree and will receive the current node as the first argument.
    * It should return `true` if node should remain visible, `false` otherwise. The results will also contain all parents nodes of all matching leafs. Results will not include
    * parent nodes, which do not have at least one matching child.
    * To call this method for parent nodes too, pass an additional parameter - `checkParents` (see below).
    * - `scope` - a scope to call the filter with (optional)
    * - `checkParents` - when set to `true` will also call the `filter` function for each parent node. If function returns `false` for some parent node, 
    * it still may be included in filter results, if some of its children matches the `filter` (see also "shallow" option below). If function returns `true` for some parent node, it will be
    * included in the filtering results even if it does not have any matching child nodes. 
    * - `shallow` - implies `checkParents`. When set to `true` will stop checking child nodes if the `filter` function return `false` for some parent node. Whole sub-tree, starting
    * from non-matching parent, will be excluded from filtering results in such case.
    * - `onlyParents` - alternative for `checkParents`. When set to `true` will only call the provided `filter` function for parent tasks. If 
    * filter returns `true`, parent, and all its direct children leaf will be included in the results. If `filter` returns `false`, parent node still can
    * be included in the results (w/o direct children leafs), if some of its child nodes matches the filter.
    * - `fullMatchingParents` - implies `onlyParents`. In this mode, if parent node matches the filter, then not only its direct children
    * will be included in the results, but a whole sub-tree, starting form matching node.
    * 
    * Repeated calls to this method will clear previous filters.
    * 
    * This function can be also called with 2 arguments, which should be the `filter` function and `scope` in such case.
    * 
    * See also {@link Sch.data.mixin.FilterableTreeStore} for additional information.
    * 
    * @param {Object} params
    */
    filterTreeBy: function (params, scope) {
        var filter;

        if (arguments.length == 1 && Ext.isObject(arguments[0])) {
            scope = params.scope;
            filter = params.filter;
        } else {
            filter = params;
            params = {};
        }

        this.fireEvent('nodestore-datachange-start', this);

        params = params || {};

        var shallowScan = params.shallow;
        var checkParents = params.checkParents || shallowScan;
        var fullMathchingParents = params.fullMathchingParents;
        var onlyParents = params.onlyParents || fullMathchingParents;
        var rootVisible = this.rootVisible;

        if (onlyParents && checkParents) throw new Error("Can't combine `onlyParents` and `checkParents` options");

        var keepTheseParents = {};

        var root = this.getRootNode(),
            linearNodes = [];

        var includeParentNodesInResults = function (node) {
            var parent = node.parentNode;

            while (parent && !keepTheseParents[parent.internalId]) {
                keepTheseParents[parent.internalId] = true;

                parent = parent.parentNode;
            }
        };

        var collectNodes = function (node) {
            if (node.isHidden && node.isHidden() || node.hidden || node.data.hidden) return;

            var nodeMatches, childNodes, length, k;

            // `collectNodes` should not be called for leafs at all
            if (node.data.leaf) {
                if (filter.call(scope, node, keepTheseParents)) {
                    linearNodes[linearNodes.length] = node;

                    includeParentNodesInResults(node);
                }
            } else {
                // include _all_ parent nodes in intermediate result set originally, except the root one
                // intermediate result set will be filtered
                if (rootVisible || node != root) linearNodes[linearNodes.length] = node;

                if (onlyParents) {
                    nodeMatches = filter.call(scope, node);

                    childNodes = node.childNodes;
                    length = childNodes.length;

                    if (nodeMatches) {
                        keepTheseParents[node.internalId] = true;

                        includeParentNodesInResults(node);

                        if (fullMathchingParents) {
                            node.cascadeBy(function (currentNode) {
                                if (currentNode != node) {
                                    linearNodes[linearNodes.length] = currentNode;

                                    if (!currentNode.data.leaf) keepTheseParents[currentNode.internalId] = true;
                                }
                            });

                            return;
                        }
                    }

                    // at this point nodeMatches and fullMathchingParents can't be both true
                    for (k = 0; k < length; k++)
                        if (nodeMatches && childNodes[k].data.leaf)
                            linearNodes[linearNodes.length] = childNodes[k];
                        else if (!childNodes[k].data.leaf)
                            collectNodes(childNodes[k]);

                } else {
                    // mark matching nodes to be kept in results
                    if (checkParents) {
                        nodeMatches = filter.call(scope, node, keepTheseParents);

                        if (nodeMatches) {
                            keepTheseParents[node.internalId] = true;

                            includeParentNodesInResults(node);
                        }
                    }

                    // recurse if
                    // - we don't check parents
                    // - shallow scan is not enabled
                    // - shallow scan is enabled and parent node matches the filter or it does not, but its and invisible root, so we don't care
                    if (!checkParents || !shallowScan || shallowScan && (nodeMatches || node == root && !rootVisible)) {
                        childNodes = node.childNodes;
                        length = childNodes.length;

                        for (k = 0; k < length; k++) collectNodes(childNodes[k]);
                    }
                }
            }
        };

        collectNodes(root);

        // additional filtering of the result set
        // removes the parent nodes which do not match filter themselves and have no macthing children  
        var nodesToKeep = [];

        for (var i = 0, len = linearNodes.length; i < len; i++) {
            var node = linearNodes[i];

            if (node.data.leaf || keepTheseParents[node.internalId]) nodesToKeep[nodesToKeep.length] = node;
        }

        var nodeStore = this.nodeStore;

        // "loadDataInNodeStore" is a special hook for buffered case
        // in buffered case, instead of "loadRecords" we need to use "cachePage"
        if (!this.loadDataInNodeStore || !this.loadDataInNodeStore(nodesToKeep)) {
            nodeStore.loadRecords(nodesToKeep, false);

            // HACK - forcing view to refresh, the usual "refresh" event is blocked by the tree view (see `blockRefresh` property)
            nodeStore.fireEvent('clear', nodeStore);
        }

        this.isFilteredFlag = true;

        this.fireEvent('nodestore-datachange-end', this);

        this.fireEvent('filter-set', this);
    },


    /**
    * Hide nodes from the tree store rendering presenation (they still remains in the store).
    * 
    * See also {@link Sch.data.mixin.FilterableTreeStore} for additional information.
    * 
    * @param {Function} filter - A filtering function. Will be called for each node in the tree store and receive a current node as 1st argument. Should return `true` to **hide** the node
    * and `false`, to **keep it visible**.
    * @param {Object} scope (optional).
    */
    hideNodesBy: function (filter, scope) {
        if (this.isFiltered()) throw new Error("Can't hide nodes of the filtered tree store");

        var me = this;
        scope = scope || this;

        this.getRootNode().cascadeBy(function (node) {
            node.hidden = filter.call(scope, node, me);
        });

        this.refreshNodeStoreContent();
    },


    /**
    * Shows all nodes, previously hidden with {@link #hideNodesBy}
    * 
    * See also {@link Sch.data.mixin.FilterableTreeStore} for additional information.
    */
    showAllNodes: function () {
        this.getRootNode().cascadeBy(function (node) {
            node.hidden = node.data.hidden = false;
        });

        this.refreshNodeStoreContent();
    }
});
// requires consuming class to also consume
Ext.define("Sch.data.mixin.BufferableTreeStore", {

    viewSize: 50,
    buffered: false,

    rangeStart: null,
    rangeEnd: null,


    initTreeBuffering: function () {
        // do nothing if we are not buffered
        if (!this.buffered) return;

        var me = this;

        var listeners = {
            append: this.updateBufferedNodeStore,
            insert: this.updateBufferedNodeStore,
            remove: this.updateBufferedNodeStore,
            move: this.updateBufferedNodeStore,
            expand: this.updateBufferedNodeStore,
            collapse: this.updateBufferedNodeStore,
            sort: this.updateBufferedNodeStore,

            scope: this,
            buffer: 1
        };

        this.on(listeners);

        this.on('root-fill-start', function () {
            me.nodeStore.suspendEvents();

            me.un(listeners);

            // setting the root node of NodeStore to null - so we now should update the NodeStore manually for all CRUD operations in tree
            // with `updateBufferedNodeStore` call
            me.nodeStore.setNode();
        });

        this.on('root-fill-end', function () {
            me.nodeStore.resumeEvents();

            me.on(listeners);

            this.updateBufferedNodeStore();
        });
    },


    updateBufferedNodeStore: function () {
        // skipping UI update, since we manually update the view in our override for `onGuaranteedRange` of paging scroller
        this.refreshNodeStoreContent(true);
    },



    loadDataInNodeStore: function (linearNodes) {
        if (!this.buffered) return false;

        var nodeStore = this.nodeStore;

        nodeStore.totalCount = linearNodes.length;

        // special case, seems "cachePage" assumes there's always a content
        if (!linearNodes.length) nodeStore.removeAll();

        nodeStore.cachePage(linearNodes, 1);

        // this will end up in usual "nodeStore.loadRecords" call
        this.guaranteeRange(this.rangeStart || 0, this.rangeEnd || this.viewSize || 50);

        return true;
    },


    // this function is covered with "203_buffered_view_2.t.js" in Gantt
    // not to be confused with regular "guaranteeRange" of the flat store
    guaranteeRange: function (rangeStart, rangeEnd) {
        var pageSize = this.viewSize || 50;
        var nodeStore = this.nodeStore;
        var totalCount = nodeStore.getTotalCount();

        if (totalCount) {
            var rangeLength = rangeEnd - rangeStart + 1;

            // if current range is less than a page size but in total we have at least one full page
            if (rangeLength < pageSize && totalCount >= rangeLength) {

                // then expand the range till the page size
                rangeEnd = rangeStart + pageSize - 1;
            }

            // if the end of range goes after limit
            if (rangeEnd >= totalCount) {
                // then adjust it
                rangeStart = totalCount - (rangeEnd - rangeStart);
                rangeEnd = totalCount - 1;

                rangeStart = Math.max(0, rangeStart);
            }

            nodeStore.guaranteeRange(rangeStart, rangeEnd);
        }
    },


    // note, that filtered tree store and bufferable tree store conflicts on this method
    // when need to consume both mixins, need to consume the bufferable mixin first, since its version is a super-set of 
    // filterable version of this method
    createNodeStore: function (treeStore) {
        var nodeStore = Ext.create(this.nodeStoreClassName || 'Ext.data.NodeStore', {
            treeStore: treeStore,
            recursive: true,
            rootVisible: this.rootVisible,

            buffered: treeStore.buffered,
            // never purge any data, we prefetch all up front
            purgePageCount: 0,
            pageSize: 1e10
        });

        if (treeStore.buffered) {
            this.mon(nodeStore, 'guaranteedrange', function (range, start, end) {
                this.rangeStart = start;
                this.rangeEnd = end;
            }, this);
        }

        return nodeStore;
    }
});
/**
@class Sch.data.ResourceStore
 
This is a class holding the collection the {@link Sch.model.Resource resources} to be rendered into a {@link Sch.panel.SchedulerGrid scheduler panel}. 
Its a subclass of "Ext.data.Store" - a store with linear data presentation.

*/
Ext.define("Sch.data.ResourceStore", {
    extend: 'Ext.data.Store',
    model: 'Sch.model.Resource',

    mixins: [
        'Sch.data.mixin.ResourceStore'
    ]
});
/**
* @class Sch.data.ResourceTreeStore
* @mixin Sch.data.mixin.FilterableTreeStore
* 
* This is a class holding all the resources to be rendered into a SchedulerPanel. Its a subclass of "Ext.data.TreeStore" - a store with data, organized as tree.
* 
* Filtering capabilities are provided by {@link Sch.data.mixin.FilterableTreeStore}, please refer to its documentation for additional information.
*/
Ext.define("Sch.data.ResourceTreeStore", {
    extend: 'Ext.data.TreeStore',
    model: 'Sch.model.Resource',

    mixins: [
        'Sch.data.mixin.ResourceStore',
        'Sch.data.mixin.BufferableTreeStore',
        'Sch.data.mixin.FilterableTreeStore'
    ],

    constructor: function () {
        this.callParent(arguments);

        this.initTreeFiltering();
    }
});
/**
@class Sch.data.TimeAxis
@extends Ext.util.Observable

A class representing the time axis of the scheduler. The scheduler timescale is based on the ticks generated by this class.
This is a pure "data" (model) representation of the time axis and has no UI elements.
 
Time axis can be {@link #continuous} or not. In continuos time axis, each timespan start where the previous ended, in non-continuous - well, not.
Non-continuous time axis can be used when want to filter out certain days (like weekends) from the time axis.

To create a non-continuos time axis you have 2 options. First, you can create the time axis w/o unneeded timeframes from start.
To do that, subclass the time axis class and override the {@link #generateTicks} method. See the `noncontinuous-timeaxis` example.

Second, you can call the {@link #filterBy} method of the time axis, passing the function to it, which should return `true` if the time tick should be filtered out.
Calling the {@link #clearFilter} method will return you to full time axis.
 
*/
Ext.define("Sch.data.TimeAxis", {
    extend: "Ext.util.Observable",

    requires: [
        'Ext.data.JsonStore',
        'Sch.util.Date'
    ],

    /**
    * @cfg {Boolean} continuous
    * Set to false if the timeline is not continuous, e.g. the next timespan does not start where the previous ended (for example skipping weekends etc).
    */
    continuous: true,

    /**
    * @cfg {Boolean} autoAdjust
    * Automatically adjust the timespan when generating ticks with {@link #generateTicks} according to the `viewPreset` configuration. Setting this to false
    * may lead to shifting time/date of ticks.
    */
    autoAdjust: true,

    // private
    constructor: function (config) {
        Ext.apply(this, config);
        this.originalContinuous = this.continuous;

        this.addEvents(
        /**
        * @event beforereconfigure
        * Fires before the timeaxis is about to be reconfigured (e.g. new start/end date or unit/increment). Return false to abort the operation.
        * @param {Sch.data.TimeAxis} timeAxis The timeAxis object
        * @param {Date} startDate The new time axis start date
        * @param {Date} endDate The new time axis end date
        */
            'beforereconfigure',

        /**
        * @event reconfigure
        * Fires when the timeaxis has been reconfigured (e.g. new start/end date or unit/increment)
        * @param {Sch.data.TimeAxis} timeAxis The timeAxis object
        */
            'reconfigure'
        );

        this.tickStore = new Ext.data.JsonStore({
            fields: ['start', 'end']
        });

        this.tickStore.on('datachanged', function () {
            this.fireEvent('reconfigure', this);
        }, this);

        this.callParent(arguments);
    },

    /**
    * Reconfigures the time axis based on the config object supplied and generates the new 'ticks'.
    * @param {Object} config
    * @private
    */
    reconfigure: function (config) {
        Ext.apply(this, config);
        var tickStore = this.tickStore,
            ticks = this.generateTicks(this.start, this.end, this.unit, this.increment || 1, this.mainUnit);

        if (this.fireEvent('beforereconfigure', this, this.start, this.end) !== false) {
            // Suspending to be able to detect an invalid filter
            tickStore.suspendEvents(true);
            tickStore.loadData(ticks);

            if (tickStore.getCount() === 0) {
                Ext.Error.raise('Invalid time axis configuration or filter, please check your input data.');
            }
            tickStore.resumeEvents();
        }
    },

    /**
    * Changes the time axis timespan to the supplied start and end dates.
    * @param {Date} start The new start date
    * @param {Date} end The new end date
    */
    setTimeSpan: function (start, end) {
        this.reconfigure({
            start: start,
            end: end
        });
    },

    /**
    * [Experimental] Filter the time axis by a function. The passed function will be called with each tick in time axis. 
    * If the function returns true, the 'tick' is included otherwise it is filtered.
    * @param {Function} fn The function to be called, it will receive an object with start/end properties, and 'index' of the tick.
    * @param {Object} scope (optional) The scope (`this` reference) in which the function is executed. 
    */
    filterBy: function (fn, scope) {
        this.continuous = false;
        scope = scope || this;

        var tickStore = this.tickStore;

        tickStore.clearFilter(true);
        // Suspending to be able to detect an invalid filter
        tickStore.suspendEvents(true);
        tickStore.filter([{
            filterFn: function (t, index) {
                return fn.call(scope, t.data, index);
            }
        }]);

        if (tickStore.getCount() === 0) {
            Ext.Error.raise('Invalid time axis filter - no columns passed through the filter. Please check your filter method.');
            this.clearFilter();
        }
        tickStore.resumeEvents();
    },

    /**
    * Returns `true` if the time axis is continuos (will return `false` when filtered)
    * @return {Boolean}
    */
    isContinuous: function () {
        return this.continuous && !this.tickStore.isFiltered();
    },

    /**
    * Clear the current filter of the time axis
    */
    clearFilter: function () {
        this.continuous = this.originalContinuous;
        this.tickStore.clearFilter();
    },

    /**
    * Method generating the ticks for this time axis. Should return an array of ticks. Each tick is an object of the following structure:
    {
    start       : ..., // start date
    end         : ...  // end date
    }
    *
    * Take notice, that this function either has to be called with `start`/`end` parameters, or create those variables.
    * 
    * @param {Date} startDate The start date of the interval
    * @param {Date} endDate The end date of the interval
    * @param {String} unit The unit of the time axis
    * @param {Mixed} increment The increment for the unit specified.
    * @return {Array} ticks The ticks representing the time axis
    */
    generateTicks: function (start, end, unit, increment) {

        var ticks = [],
            intervalEnd,
            DATE = Sch.util.Date,
            dstDiff = 0;

        unit = unit || this.unit;
        increment = increment || this.increment;

        if (this.autoAdjust) {
            start = this.floorDate(start || this.getStart(), false);
            end = this.ceilDate(end || DATE.add(start, this.mainUnit, this.defaultSpan), false);
        }

        while (start < end) {
            intervalEnd = this.getNext(start, unit, increment);

            // Handle hourly increments crossing DST boundaries to keep the timescale looking correct
            // Only do this for HOUR resolution currently, and only handle it once per tick generation.
            if (unit === DATE.HOUR && increment > 1 && ticks.length > 0 && dstDiff === 0) {
                var prev = ticks[ticks.length - 1];

                dstDiff = ((prev.start.getHours() + increment) % 24) - prev.end.getHours();

                if (dstDiff !== 0) {
                    // A DST boundary was crossed in previous tick, adjust this tick to keep timeaxis "symmetric".
                    intervalEnd = DATE.add(intervalEnd, DATE.HOUR, dstDiff);
                }
            }

            ticks.push({
                start: start,
                end: intervalEnd
            });
            start = intervalEnd;
        }
        return ticks;
    },

    /**
    * Gets a tick coordinate representing the date parameter on the time scale
    * @param {Date} date the date to get x coordinate for
    * @return {Float} the tick position on the scale
    */
    getTickFromDate: function (date) {

        if (this.getStart() > date || this.getEnd() < date) {
            return -1;
        }

        var ticks = this.tickStore.getRange(),
            tickStart, tickEnd, i, l;

        for (i = 0, l = ticks.length; i < l; i++) {
            tickEnd = ticks[i].data.end;
            if (date <= tickEnd) {
                tickStart = ticks[i].data.start;

                return i + (date > tickStart ? (date - tickStart) / (tickEnd - tickStart) : 0);
            }
        }

        return -1;
    },

    /**
    * Gets the time represented by a tick "coordinate".
    * @param {Float} tick the tick "coordinate"
    * @param {String} roundingMethod The rounding method to use
    * @return {Date} The date to represented by the tick "coordinate", or null if invalid.
    */
    getDateFromTick: function (tick, roundingMethod) {
        var count = this.tickStore.getCount();

        if (tick === count) {
            return this.getEnd();
        }

        var wholeTick = Math.floor(tick),
            fraction = tick - wholeTick,
            t = this.getAt(wholeTick);

        var date = Sch.util.Date.add(t.start, Sch.util.Date.MILLI, fraction * (t.end - t.start));

        if (roundingMethod) {
            date = this[roundingMethod + 'Date'](date);
        }

        return date;
    },

    /**
    * Gets the tick with start and end date for the indicated tick index
    * @param {Float} tick the tick "coordinate"
    * @return {Object} The tick object containing a "start" date and an "end" date.
    */
    getAt: function (index) {
        return this.tickStore.getAt(index).data;
    },

    // private
    getCount: function () {
        return this.tickStore.getCount();
    },

    /**
    * Returns the ticks of the timeaxis in an array of objects with a "start" and "end" date.
    * @return {Array[Object]} the ticks on the scale
    */
    getTicks: function () {
        var ticks = [];

        this.tickStore.each(function (r) { ticks.push(r.data); });
        return ticks;
    },

    /**
    * Method to get the current start date of the time axis
    * @return {Date} The start date
    */
    getStart: function () {
        var first = this.tickStore.first();

        if (first) {
            return Ext.Date.clone(first.data.start);
        }
        return null;
    },

    /**
    * Method to get a the current end date of the time axis
    * @return {Date} The end date
    */
    getEnd: function () {
        var last = this.tickStore.last();

        if (last) {
            return Ext.Date.clone(last.data.end);
        }
        return null;
    },

    // Floors the date to nearest minute increment
    // private
    roundDate: function (date) {
        var dt = Ext.Date.clone(date),
            relativeTo = this.getStart(),
            increment = this.resolutionIncrement;

        switch (this.resolutionUnit) {
            case Sch.util.Date.MILLI:
                var milliseconds = Sch.util.Date.getDurationInMilliseconds(relativeTo, dt),
                    snappedMilliseconds = Math.round(milliseconds / increment) * increment;
                dt = Sch.util.Date.add(relativeTo, Sch.util.Date.MILLI, snappedMilliseconds);
                break;

            case Sch.util.Date.SECOND:
                var seconds = Sch.util.Date.getDurationInSeconds(relativeTo, dt),
                    snappedSeconds = Math.round(seconds / increment) * increment;
                dt = Sch.util.Date.add(relativeTo, Sch.util.Date.MILLI, snappedSeconds * 1000);
                break;

            case Sch.util.Date.MINUTE:
                var minutes = Sch.util.Date.getDurationInMinutes(relativeTo, dt),
                    snappedMinutes = Math.round(minutes / increment) * increment;
                dt = Sch.util.Date.add(relativeTo, Sch.util.Date.SECOND, snappedMinutes * 60);
                break;

            case Sch.util.Date.HOUR:
                var nbrHours = Sch.util.Date.getDurationInHours(this.getStart(), dt),
                    snappedHours = Math.round(nbrHours / increment) * increment;
                dt = Sch.util.Date.add(relativeTo, Sch.util.Date.MINUTE, snappedHours * 60);
                break;

            case Sch.util.Date.DAY:
                var nbrDays = Sch.util.Date.getDurationInDays(relativeTo, dt),
                    snappedDays = Math.round(nbrDays / increment) * increment;
                dt = Sch.util.Date.add(relativeTo, Sch.util.Date.DAY, snappedDays);
                break;

            case Sch.util.Date.WEEK:
                Ext.Date.clearTime(dt);

                var distanceToWeekStartDay = dt.getDay() - this.weekStartDay,
                    toAdd;

                if (distanceToWeekStartDay < 0) {
                    distanceToWeekStartDay = 7 + distanceToWeekStartDay;
                }

                if (Math.round(distanceToWeekStartDay / 7) === 1) {
                    toAdd = 7 - distanceToWeekStartDay;
                } else {
                    toAdd = -distanceToWeekStartDay;
                }

                dt = Sch.util.Date.add(dt, Sch.util.Date.DAY, toAdd);
                break;

            case Sch.util.Date.MONTH:
                var nbrMonths = Sch.util.Date.getDurationInMonths(relativeTo, dt) + (dt.getDate() / Ext.Date.getDaysInMonth(dt)),
                    snappedMonths = Math.round(nbrMonths / increment) * increment;
                dt = Sch.util.Date.add(relativeTo, Sch.util.Date.MONTH, snappedMonths);
                break;

            case Sch.util.Date.QUARTER:
                Ext.Date.clearTime(dt);
                dt.setDate(1);
                dt = Sch.util.Date.add(dt, Sch.util.Date.MONTH, 3 - (dt.getMonth() % 3));
                break;

            case Sch.util.Date.YEAR:
                var nbrYears = Sch.util.Date.getDurationInYears(relativeTo, dt),
                    snappedYears = Math.round(nbrYears / increment) * increment;
                dt = Sch.util.Date.add(relativeTo, Sch.util.Date.YEAR, snappedYears);
                break;

        }
        return dt;
    },

    // Floors a date to the current resolution
    // private
    floorDate: function (date, relativeToStart, resolutionUnit) {
        relativeToStart = relativeToStart !== false;

        var dt = Ext.Date.clone(date),
            relativeTo = relativeToStart ? this.getStart() : null,
            increment = this.resolutionIncrement,
            unit;

        if (resolutionUnit) {
            unit = resolutionUnit;
        } else {
            unit = relativeToStart ? this.resolutionUnit : this.mainUnit;
        }

        switch (unit) {
            case Sch.util.Date.MILLI:
                if (relativeToStart) {
                    var milliseconds = Sch.util.Date.getDurationInMilliseconds(relativeTo, dt),
                        snappedMilliseconds = Math.floor(milliseconds / increment) * increment;
                    dt = Sch.util.Date.add(relativeTo, Sch.util.Date.MILLI, snappedMilliseconds);
                }
                break;

            case Sch.util.Date.SECOND:
                if (relativeToStart) {
                    var seconds = Sch.util.Date.getDurationInSeconds(relativeTo, dt),
                        snappedSeconds = Math.floor(seconds / increment) * increment;
                    dt = Sch.util.Date.add(relativeTo, Sch.util.Date.MILLI, snappedSeconds * 1000);
                } else {
                    dt.setMilliseconds(0);
                }
                break;

            case Sch.util.Date.MINUTE:
                if (relativeToStart) {
                    var minutes = Sch.util.Date.getDurationInMinutes(relativeTo, dt),
                        snappedMinutes = Math.floor(minutes / increment) * increment;
                    dt = Sch.util.Date.add(relativeTo, Sch.util.Date.SECOND, snappedMinutes * 60);
                } else {
                    dt.setSeconds(0);
                    dt.setMilliseconds(0);
                }
                break;

            case Sch.util.Date.HOUR:
                if (relativeToStart) {
                    var nbrHours = Sch.util.Date.getDurationInHours(this.getStart(), dt),
                        snappedHours = Math.floor(nbrHours / increment) * increment;
                    dt = Sch.util.Date.add(relativeTo, Sch.util.Date.MINUTE, snappedHours * 60);
                } else {
                    dt.setMinutes(0);
                    dt.setSeconds(0);
                    dt.setMilliseconds(0);
                }
                break;

            case Sch.util.Date.DAY:
                if (relativeToStart) {
                    var nbrDays = Sch.util.Date.getDurationInDays(relativeTo, dt),
                        snappedDays = Math.floor(nbrDays / increment) * increment;
                    dt = Sch.util.Date.add(relativeTo, Sch.util.Date.DAY, snappedDays);
                } else {
                    Ext.Date.clearTime(dt);
                }
                break;

            case Sch.util.Date.WEEK:
                var day = dt.getDay();
                Ext.Date.clearTime(dt);
                if (day !== this.weekStartDay) {
                    dt = Sch.util.Date.add(dt, Sch.util.Date.DAY, -(day > this.weekStartDay ? (day - this.weekStartDay) : (7 - day - this.weekStartDay)));
                }
                break;

            case Sch.util.Date.MONTH:
                if (relativeToStart) {
                    var nbrMonths = Sch.util.Date.getDurationInMonths(relativeTo, dt),
                        snappedMonths = Math.floor(nbrMonths / increment) * increment;
                    dt = Sch.util.Date.add(relativeTo, Sch.util.Date.MONTH, snappedMonths);
                } else {
                    Ext.Date.clearTime(dt);
                    dt.setDate(1);
                }
                break;

            case Sch.util.Date.QUARTER:
                Ext.Date.clearTime(dt);
                dt.setDate(1);
                dt = Sch.util.Date.add(dt, Sch.util.Date.MONTH, -(dt.getMonth() % 3));
                break;

            case Sch.util.Date.YEAR:
                if (relativeToStart) {
                    var nbrYears = Sch.util.Date.getDurationInYears(relativeTo, dt),
                        snappedYears = Math.floor(nbrYears / increment) * increment;
                    dt = Sch.util.Date.add(relativeTo, Sch.util.Date.YEAR, snappedYears);
                } else {
                    dt = new Date(date.getFullYear(), 0, 1);
                }
                break;

        }
        return dt;
    },

    // private
    ceilDate: function (date, relativeToStart, resolutionUnit) {
        var dt = Ext.Date.clone(date);
        relativeToStart = relativeToStart !== false;

        var increment = relativeToStart ? this.resolutionIncrement : 1,
            doCall = false,
            unit;

        if (resolutionUnit) {
            unit = resolutionUnit;
        } else {
            unit = relativeToStart ? this.resolutionUnit : this.mainUnit;
        }

        switch (unit) {
            case Sch.util.Date.DAY:
                if (dt.getMinutes() > 0 || dt.getSeconds() > 0 || dt.getMilliseconds() > 0) {
                    doCall = true;
                }
                break;

            case Sch.util.Date.WEEK:
                Ext.Date.clearTime(dt);
                if (dt.getDay() !== this.weekStartDay) {
                    doCall = true;
                }
                break;

            case Sch.util.Date.MONTH:
                Ext.Date.clearTime(dt);
                if (dt.getDate() !== 1) {
                    doCall = true;
                }
                break;

            case Sch.util.Date.QUARTER:
                Ext.Date.clearTime(dt);
                if (dt.getMonth() % 3 !== 0) {
                    doCall = true;
                }
                break;

            case Sch.util.Date.YEAR:
                Ext.Date.clearTime(dt);
                if (dt.getMonth() !== 0 && dt.getDate() !== 1) {
                    doCall = true;
                }
                break;

            default:
                break;
        }

        if (doCall) {
            return this.getNext(dt, unit, increment);
        } else {
            return dt;
        }
    },

    // private
    getNext: function (date, unit, increment) {
        return Sch.util.Date.getNext(date, unit, increment, this.weekStartDay);
    },

    // private
    getResolution: function () {
        return {
            unit: this.resolutionUnit,
            increment: this.resolutionIncrement
        };
    },

    // private
    setResolution: function (unit, increment) {
        this.resolutionUnit = unit;
        this.resolutionIncrement = increment || 1;
    },

    /**
    * Moves the time axis forward in time in units specified by the view preset `shiftUnit`, and by the amount specified by the `shiftIncrement` 
    * config of the current view preset.
    * @param {Int} amount (optional) The number of units to jump forward
    */
    shiftNext: function (amount) {
        amount = amount || this.getShiftIncrement();
        var unit = this.getShiftUnit();
        this.setTimeSpan(Sch.util.Date.add(this.getStart(), unit, amount), Sch.util.Date.add(this.getEnd(), unit, amount));
    },

    /**
    * Moves the time axis backward in time in units specified by the view preset `shiftUnit`, and by the amount specified by the `shiftIncrement` config of the current view preset.
    * @param {Int} amount (optional) The number of units to jump backward
    */
    shiftPrevious: function (amount) {
        amount = -(amount || this.getShiftIncrement());
        var unit = this.getShiftUnit();
        this.setTimeSpan(Sch.util.Date.add(this.getStart(), unit, amount), Sch.util.Date.add(this.getEnd(), unit, amount));
    },

    getShiftUnit: function () {
        return this.shiftUnit || this.getMainUnit();
    },

    // private
    getShiftIncrement: function () {
        return this.shiftIncrement || 1;
    },

    // private
    getUnit: function () {
        return this.unit;
    },

    // private
    getIncrement: function () {
        return this.increment;
    },

    /**
    * Returns true if the passed timespan is part of the current time axis (in whole or partially).
    * @param {Date} start The start date
    * @param {Date} end The end date
    * @return {boolean} true if the timespan is part of the timeaxis
    */
    timeSpanInAxis: function (start, end) {
        if (this.continuous) {
            return Sch.util.Date.intersectSpans(start, end, this.getStart(), this.getEnd());
        } else {
            return (start < this.getStart() && end > this.getEnd()) ||
                   this.getTickFromDate(start) !== this.getTickFromDate(end);
        }
    },

    /**
    * Calls the supplied iterator function once per interval. The function will be call with three parameters, start date and end date and an index.
    * Return false to break the iteration.
    * @param {String} position 'main' (middle), 'top' or 'bottom'
    * @param {Function} iteratorFn The function to call
    * @param {Date} scope (optional) The "this" object to use for the function call
    */
    forEachInterval: function (position, iteratorFn, scope) {
        scope = scope || this;

        if (position === 'top' || (position === 'middle' && this.headerConfig.bottom)) {
            this.forEachAuxInterval(position, iteratorFn, scope);
        } else {
            // This is the lowest header row, which should be fed the data in the tickStore
            this.tickStore.each(function (r, index) {
                return iteratorFn.call(scope, r.data.start, r.data.end, index);
            });
        }
    },

    /**
    * Calls the supplied iterator function once per interval. The function will be call with three parameters, start date and end date and an index.
    * Return false to break the iteration.
    * @protected
    * @param {Function} iteratorFn The function to call
    * @param {Date} scope (optional) The "this" object to use for the function call
    */
    forEachMainInterval: function (iteratorFn, scope) {
        this.forEachInterval('middle', iteratorFn, scope);
    },

    /**
    * Calls the supplied iterator function once per interval. The function will be call with three parameters, start date and end date and an index.
    * @protected
    * @param {Function} iteratorFn The function to call
    * @param {Date} scope (optional) The "this" object to use for the function call
    */
    forEachAuxInterval: function (position, iteratorFn, scope) {
        scope = scope || this;

        var end = this.getEnd(),
            dt = this.getStart(),
            i = 0,
            intervalEnd;

        while (dt < end) {
            intervalEnd = Sch.util.Date.min(this.getNext(dt, this.headerConfig[position].unit, this.headerConfig[position].increment || 1), end);
            iteratorFn.call(scope, dt, intervalEnd, i);
            dt = intervalEnd;
            i++;
        }
    }
});
/**
@class Sch.view.Horizontal

A mixin, purposed to be consumed along with {@link Sch.mixin.TimelineView} and providing the implementation of some methods, specific to horizontal orientation.

*/
Ext.define("Sch.view.Horizontal", {
    props: {
        translateToScheduleCoordinate: function (x) {
            return x - this.el.getX() + this.el.getScroll().left;
        },

        translateToPageCoordinate: function (x) {
            return x + this.el.getX() - this.el.getScroll().left;
        },

        /**
        * Gets the date for an XY coordinate
        * @param {Array} xy The page X and Y coordinates
        * @param {String} roundingMethod The rounding method to use
        * @returns {Date} the Date corresponding to the xy coordinate
        * @param {Boolean} local, true if the passed x/y coordinates are "local" to the scheduling view element
        * @abstract
        */
        getDateFromXY: function (xy, roundingMethod, local) {
            var date,
                x = local ? xy[0] : this.translateToScheduleCoordinate(xy[0]),
                tick = x / this.getActualTimeColumnWidth(),
                maxCol = this.timeAxis.getCount();

            if (tick < 0 || tick > maxCol) {
                date = null;
            } else {
                var diff = tick - this.resolveColumnIndex(x);
                if (diff > 2 && tick >= maxCol) {
                    return null;
                }
                date = this.timeAxis.getDateFromTick(tick, roundingMethod);
            }
            return date;
        },

        /**
        *  Gets xy coordinates relative to the element containing the time columns time for a date
        *  @param {Date} xy, the page X and Y coordinates
        *  @param {Boolean} local, true to return a coordinate local to the element containing the calendar columns
        *  @returns {Array} the XY coordinates representing the date
        */
        getXYFromDate: function (date, local) {
            var x,
                tick = this.timeAxis.getTickFromDate(date);

            if (tick >= 0) {
                x = this.getActualTimeColumnWidth() * tick;
            }

            if (local === false) {
                x = this.translateToPageCoordinate(x);
            }

            return [Math.round(x), 0];
        },

        getEventBox: function (start, end) {
            var startX = Math.floor(this.getXYFromDate(start)[0]),
                endX = Math.floor(this.getXYFromDate(end)[0]),
                M = Math;

            if (this.managedEventSizing) {

                return {
                    top: Math.max(0, (this.barMargin - (Ext.isIE && !Ext.isStrict) ? 0 : this.eventBorderWidth - this.cellBorderWidth)),
                    left: M.min(startX, endX),
                    width: M.max(1, M.abs(startX - endX) - this.eventBorderWidth),
                    height: this.rowHeight - (2 * this.barMargin) - this.eventBorderWidth
                };
            }
            return {
                left: M.min(startX, endX),
                width: M.max(1, M.abs(startX - endX))
            };
        },

        layoutEvents: function (events) {

            var rowEvents = Ext.Array.clone(events);

            // Sort events by start date, and text properties.
            rowEvents.sort(this.sortEvents);

            var nbrBandsRequired = this.layoutEventsInBands(0, rowEvents);

            return nbrBandsRequired;
        },

        layoutEventsInBands: function (bandIndex, events) {
            var ev = events[0],
                bandTop = bandIndex === 0 ? this.barMargin : (bandIndex * this.rowHeight - ((bandIndex - 1) * this.barMargin));

            if (bandTop >= this.cellBorderWidth) {
                bandTop -= this.cellBorderWidth;
            }

            while (ev) {
                // Apply band height to the event cfg
                ev.top = bandTop;

                // Remove it from the array and continue searching
                Ext.Array.remove(events, ev);
                ev = this.findClosestSuccessor(ev, events);
            }

            bandIndex++;

            if (events.length > 0) {
                return this.layoutEventsInBands(bandIndex, events);
            } else {
                // Done!
                return bandIndex;
            }
        },

        /**
        * Gets the Ext.util.Region represented by the schedule and optionally only for a single resource. This method will call getDateConstraints to 
        * allow for additional resource/event based constraints. By overriding that method you can constrain events differently for
        * different resources.
        * @param {Ext.data.Model} resourceRecord (optional) The resource record 
        * @param {Ext.data.Model} eventRecord (optional) The event record 
        * @return {Ext.util.Region} The region of the schedule
        */
        getScheduleRegion: function (resourceRecord, eventRecord) {
            var region = resourceRecord ? Ext.fly(this.getNodeByRecord(resourceRecord)).getRegion() : this.el.down('.x-grid-table').getRegion(),
                taStart = this.timeAxis.getStart(),
                taEnd = this.timeAxis.getEnd(),
                dateConstraints = this.getDateConstraints(resourceRecord, eventRecord) || { start: taStart, end: taEnd },
                startX = this.translateToPageCoordinate(this.getXYFromDate(dateConstraints.start)[0]),
                endX = this.translateToPageCoordinate(this.getXYFromDate(dateConstraints.end)[0]) - this.eventBorderWidth,
                top = region.top + this.barMargin,
                bottom = region.bottom - this.barMargin - this.eventBorderWidth;

            return new Ext.util.Region(top, Math.max(startX, endX), bottom, Math.min(startX, endX));
        },


        /**
        * Gets the Ext.util.Region representing the passed resource and optionally just for a certain date interval.
        * @param {Ext.data.Model} resourceRecord The resource record 
        * @param {Date} startDate A start date constraining the region
        * @param {Date} endDate An end date constraining the region
        * @return {Ext.util.Region} The region of the resource
        */
        getResourceRegion: function (resourceRecord, startDate, endDate) {
            var region = Ext.fly(this.getNodeByRecord(resourceRecord)).getRegion(),
                taStart = this.timeAxis.getStart(),
                taEnd = this.timeAxis.getEnd(),
                start = startDate ? Sch.util.Date.max(taStart, startDate) : taStart,
                end = endDate ? Sch.util.Date.min(taEnd, endDate) : taEnd,
                startX = this.getXYFromDate(start)[0],
                endX = this.getXYFromDate(end)[0] - this.eventBorderWidth,
                ctElTop = this.el.getTop(),
                ctElScroll = this.el.getScroll(),
                top = region.top + 1 - ctElTop + ctElScroll.top,
                bottom = region.bottom - 1 - ctElTop + ctElScroll.top;

            return new Ext.util.Region(top, Math.max(startX, endX), bottom, Math.min(startX, endX));
        },

        collectRowData: function (rowData, resourceRecord, index) {
            var resourceEvents = this.eventStore.getEventsForResource(resourceRecord);

            if (resourceEvents.length === 0 || this.headerCt.getColumnCount() === 0) {
                rowData.rowHeight = this.rowHeight;
                return rowData;
            }

            var D = Sch.util.Date,
                ta = this.timeAxis,
                viewStart = ta.getStart(),
                viewEnd = ta.getEnd(),
                eventsToRender = [],
                i, l;

            // Iterate events belonging to current row
            for (i = 0, l = resourceEvents.length; i < l; i++) {
                var event = resourceEvents[i],
                    start = event.getStartDate(),
                    end = event.getEndDate();

                // Determine if the event should be rendered or not
                if (start && end && ta.timeSpanInAxis(start, end)) {
                    var tplData = this.generateTplData(event, viewStart, viewEnd, resourceRecord, index);
                    eventsToRender[eventsToRender.length] = tplData;
                }
            }

            var nbrOfBandsRequired = 1;

            // Event data is now gathered, calculate layout properties for each event (if dynamicRowHeight is used)
            if (this.dynamicRowHeight) {
                nbrOfBandsRequired = this.layoutEvents(eventsToRender);
            }

            // Set rowHeight property that is applied by Scheduling feature
            rowData.rowHeight = (nbrOfBandsRequired * this.rowHeight) - ((nbrOfBandsRequired - 1) * this.barMargin);

            // Inject the rendered events into the first cell for the row
            rowData[this.getFirstTimeColumn().id] += '&#160;' + this.eventTpl.apply(eventsToRender);

            return rowData;
        },

        // private
        resolveResource: function (t) {
            var node = this.findItemByChild(t);
            if (node) {
                return this.getRecord(node);
            }

            return null;
        },

        /**
        *  Returns the region for a "global" time span in the view. Coordinates are relative to element containing the time columns
        *  @param {Date} startDate The start date of the span
        *  @param {Date} endDate The end date of the span
        *  @return {Ext.util.Region} The region for the time span
        */
        getTimeSpanRegion: function (startDate, endDate, useViewSize) {
            var startX = this.getXYFromDate(startDate)[0],
                endX = this.getXYFromDate(endDate || startDate)[0],
                height,
                tableEl;

            if (this.store.buffered) {
                var stretcher;

                if (this.panel.verticalScroller.stretcher instanceof Ext.CompositeElement) {
                    // in Ext 4.1.1, locking + buffering is supported
                    stretcher = this.panel.verticalScroller.stretcher.first();
                } else {
                    stretcher = this.el.down('.x-stretcher');
                }

                // when the buffered dataset is small and fully cached in the store
                // stretcher height is set to 0
                // in such cases we don't use its height
                if (stretcher.dom.clientHeight) tableEl = stretcher;
            }

            if (!tableEl) tableEl = this.el.down('.x-grid-table');

            if (useViewSize) {
                height = Math.max(tableEl ? tableEl.dom.clientHeight : 0, this.el.dom.clientHeight); // fallback in case grid is not rendered (no rows/table)
            } else {
                height = tableEl ? tableEl.dom.clientHeight : 0;
            }
            return new Ext.util.Region(0, Math.max(startX, endX), height, Math.min(startX, endX));
        },

        /**
        * Gets the start and end dates for an element Region
        * @param {Region} region The region to map to start and end dates
        * @param {String} roundingMethod The rounding method to use
        * @returns {Object} an object containing start/end properties
        */
        getStartEndDatesFromRegion: function (region, roundingMethod) {
            var leftDate = this.getDateFromXY([region.left, 0], roundingMethod),
                rightDate = this.getDateFromXY([region.right, 0], roundingMethod);

            if (rightDate && leftDate) {
                return {
                    start: Sch.util.Date.min(leftDate, rightDate),
                    end: Sch.util.Date.max(leftDate, rightDate)
                };
            } else {
                return null;
            }
        },

        // private
        onEventAdd: function (s, events) {
            var affectedResources = {};

            for (var i = 0, l = events.length; i < l; i++) {
                var resources = events[i].getResources();

                for (var j = 0, k = resources.length; j < k; j++) {
                    var resource = resources[j];

                    affectedResources[resource.getId()] = resource;
                }
            }

            Ext.Object.each(affectedResources, function (id, resource) {
                this.onUpdate(this.resourceStore, resource);
            }, this);
        },

        // private
        onEventRemove: function (s, eventRecord) {
            var resources = eventRecord.getResources();
            var resourceStore = this.resourceStore;
            var isTree = Ext.tree.View && this instanceof Ext.tree.View;

            var updateResource = function (resource) {
                if (isTree && this.store.indexOf(resource)) {
                    this.onUpdate(this.store, resource);
                } else if (resourceStore.indexOf(resource) >= 0) {
                    this.onUpdate(resourceStore, resource);
                }
            };

            if (resources.length > 1) {
                Ext.each(resources, updateResource, this);
            } else {
                var el = this.getElementFromEventRecord(eventRecord);

                if (el) {
                    var resource = this.resolveResource(el);

                    el.fadeOut({
                        callback: function () { updateResource.call(this, resource); },
                        scope: this
                    });
                }
            }
        },

        // private
        onEventUpdate: function (store, model, operation) {
            var previous = model.previous;

            if (previous && previous[model.resourceIdField]) {
                // If an event has been moved to a new row, refresh old row first
                var resource = model.getResource(previous[model.resourceIdField]);
                if (resource) {
                    this.onUpdate(this.resourceStore, resource);
                }
            }

            var resources = model.getResources();

            Ext.each(resources, function (resource) {
                this.onUpdate(this.resourceStore, resource);
            }, this);
        },

        /**
        * Returns the amount of pixels for a single unit
        * @private
        * @return {String} The unit in pixel
        */
        getSingleTickInPixels: function () {
            return this.getActualTimeColumnWidth();
        },

        getColumnWidth: function () {
            if (this.getTimeAxisColumn()) {
                return this.getTimeAxisColumn().getTimeColumnWidth();
            }
        },

        setColumnWidth: function (width, preventRefresh) {
            if (this.getTimeAxisColumn()) {
                this.getTimeAxisColumn().setTimeColumnWidth(width);

                if (!preventRefresh) {
                    this.refreshKeepingScroll();
                }
            }
            this.fireEvent('columnwidthchange', this, width);
        },

        /**
        * Method to get a currently visible date range in a scheduling view. Please note that it only work when scheduler is rendered.
        * @return {Object} object with `startDate` and `endDate` properties.
        */
        getVisibleDateRange: function () {
            if (!this.rendered) {
                return null;
            }

            var scroll = this.getEl().getScroll(),
                startDate = this.panel.getStart(),
                endDate = this.panel.getEnd(),
                width = this.getWidth(),
                innerTable = this.getEl().down('.x-grid-table').dom,
                tableWidth = innerTable.clientWidth;


            if (tableWidth < width) {
                return { startDate: startDate, endDate: endDate };
            }

            return {
                startDate: this.getDateFromXY([scroll.left, 0], null, true),
                endDate: this.getDateFromXY([Math.min(scroll.left + width, tableWidth), 0], null, true)
            };
        }
    }
});

/**
@class Sch.view.Vertical

A mixin, purposed to be consumed along with {@link Sch.mixin.TimelineView} and providing the implementation of some methods, specific to vertical orientation.

*/
Ext.define("Sch.view.Vertical", {
    props: {

        translateToScheduleCoordinate: function (y) {
            return y - this.el.getY() + this.el.getScroll().top;
        },

        // private
        translateToPageCoordinate: function (y) {
            var el = this.el,
                scroll = el.getScroll();

            return y + el.getY() - scroll.top;
        },

        /**
        * Gets the date for an XY coordinate
        * @param {Array} xy The page X and Y coordinates
        * @param {String} roundingMethod The rounding method to use
        * @returns {Date} the Date corresponding to the xy coordinate
        * @param {Boolean} local, true if the passed x/y coordinates are "local" to the scheduling view element
        * @abstract
        */
        getDateFromXY: function (xy, roundingMethod, local) {
            var date,
                y = local ? xy[1] : this.translateToScheduleCoordinate(xy[1]);

            var tick = y / this.rowHeight,
                max = this.timeAxis.getCount();

            if (tick < 0 || tick > max) {
                date = null;
            } else {
                date = this.timeAxis.getDateFromTick(tick, roundingMethod);
            }
            return date;
        },

        /**
        *  Gets xy coordinates relative to the element containing the time columns time for a date
        *  @param {Date} xy, the page X and Y coordinates
        *  @param {Boolean} local, true to return a coordinate local to the element containing the calendar columns
        *  @returns {Array} the XY coordinates representing the date
        */
        getXYFromDate: function (date, local) {
            var y = -1,
                tick = this.timeAxis.getTickFromDate(date);

            if (tick >= 0) {
                y = this.rowHeight * tick;
            }

            if (local === false) {
                y = this.translateToPageCoordinate(y);
            }

            return [0, Math.round(y)];
        },

        getEventBox: function (start, end) {
            var startY = Math.floor(this.getXYFromDate(start)[1]),
                endY = Math.floor(this.getXYFromDate(end)[1]),
                M = Math;

            if (this.managedEventSizing) {
                return {
                    left: this.barMargin,
                    width: this.panel.resourceColumnWidth - (2 * this.barMargin) - this.eventBorderWidth,
                    top: M.max(0, M.min(startY, endY) - this.eventBorderWidth),
                    height: M.max(1, M.abs(startY - endY))
                };
            }
            return {
                top: M.min(startY, endY),
                height: M.max(1, M.abs(startY - endY))
            };
        },

        getScheduleRegion: function (resourceRecord, eventRecord) {
            var region = resourceRecord ? Ext.fly(this.getCellByPosition({ column: this.resourceStore.indexOf(resourceRecord), row: 0 })).getRegion() : this.el.down('.x-grid-table').getRegion(),

                taStart = this.timeAxis.getStart(),
                taEnd = this.timeAxis.getEnd(),

                dateConstraints = this.getDateConstraints(resourceRecord, eventRecord) || { start: taStart, end: taEnd },

                startY = this.translateToPageCoordinate(this.getXYFromDate(Sch.util.Date.min(taStart, dateConstraints.start))[1]),
                endY = this.translateToPageCoordinate(this.getXYFromDate(Sch.util.Date.max(taEnd, dateConstraints.end))[1]),

                left = region.left + this.barMargin,
                right = (resourceRecord ? (region.left + this.panel.resourceColumnWidth) : region.right) - this.barMargin;

            return new Ext.util.Region(Math.min(startY, endY), right, Math.max(startY, endY), left);
        },

        /**
        * Gets the Ext.util.Region representing the passed resource and optionally just for a certain date interval.
        * @param {Ext.data.Model} resourceRecord The resource record 
        * @param {Date} startDate A start date constraining the region
        * @param {Date} endDate An end date constraining the region
        * @return {Ext.util.Region} The region of the resource
        */
        getResourceRegion: function (resourceRecord, startDate, endDate) {
            var cellLeft = this.resourceStore.indexOf(resourceRecord) * this.panel.resourceColumnWidth,
                taStart = this.timeAxis.getStart(),
                taEnd = this.timeAxis.getEnd(),
                start = startDate ? Sch.util.Date.max(taStart, startDate) : taStart,
                end = endDate ? Sch.util.Date.min(taEnd, endDate) : taEnd,
                startY = this.getXYFromDate(start)[1],
                endY = this.getXYFromDate(end)[1],
                left = cellLeft + this.barMargin + this.cellBorderWidth,
                right = cellLeft + this.panel.resourceColumnWidth - this.barMargin - this.cellBorderWidth;

            return new Ext.util.Region(Math.min(startY, endY), right, Math.max(startY, endY), left);
        },

        // Try to pack the events to consume as little space as possible
        layoutEvents: function (events) {

            if (events.length === 0) {
                return;
            }

            // Sort events by start date, and text properties.
            events.sort(this.sortEvents);

            var start, end,
                D = Sch.util.Date,
                band = 1,
                startFraction,
                slot,
                totalAvailableWidth = this.panel.resourceColumnWidth - (2 * this.barMargin),
                firstInCluster,
                j;

            for (var i = 0, l = events.length; i < l; i++) {
                firstInCluster = events[i];
                start = firstInCluster.start;
                end = firstInCluster.end;

                slot = this.findStartSlot(events, firstInCluster);

                var cluster = this.getCluster(events, i);

                if (cluster.length > 1) {
                    firstInCluster.left = slot.start;
                    firstInCluster.width = slot.end - slot.start;

                    // If there are multiple slots and events in the cluster have multiple start dates, group all same-start events into first slot
                    j = 1;

                    while (j < (cluster.length - 1) && cluster[j + 1].start - firstInCluster.start === 0) {
                        j++;
                    }

                    // See if there's more than 1 slot available for this cluster, if so - first group in cluster consumes the entire first slot
                    var nextSlot = this.findStartSlot(events, cluster[j]);
                    if (nextSlot && nextSlot.start < 0.8) {
                        cluster = cluster.slice(0, j);
                    }
                }

                var count = cluster.length,
                    barWidth = (slot.end - slot.start) / count;

                // Apply fraction values
                for (j = 0; j < count; j++) {
                    cluster[j].width = barWidth;
                    cluster[j].left = slot.start + (j * barWidth);
                }

                i += count - 1;
            }

            for (i = 0, l = events.length; i < l; i++) {
                events[i].width = events[i].width * totalAvailableWidth;
                events[i].left = this.barMargin + (events[i].left * totalAvailableWidth);
            }
        },

        findStartSlot: function (events, event) {
            var D = Sch.util.Date,
                start = event.start,
                end = event.end,
                slotStart = 0,
                slotEnd,
                overlapMax = 0,
                j,
                rightEdge,
                eventIndex = Ext.Array.indexOf(events, event),
                priorOverlappers = this.getPriorOverlappingEvents(events, event),
                i;

            if (priorOverlappers.length === 0) {
                return {
                    start: 0,
                    end: 1
                };
            }

            for (i = 0; i < priorOverlappers.length; i++) {
                if (i === 0 && priorOverlappers[0].left > 0) {
                    return {
                        start: 0,
                        end: priorOverlappers[0].left
                    };
                } else if (priorOverlappers[i].left + priorOverlappers[i].width < (i < priorOverlappers.length - 1 ? priorOverlappers[i + 1].left : 1)) {
                    return {
                        start: priorOverlappers[i].left + priorOverlappers[i].width,
                        end: i < priorOverlappers.length - 1 ? priorOverlappers[i + 1].left : 1
                    };
                }
            }

            return false;
        },

        getPriorOverlappingEvents: function (events, event) {
            var D = Sch.util.Date,
                start = event.start,
                end = event.end,
                overlappers = [];

            for (var i = 0, l = Ext.Array.indexOf(events, event); i < l; i++) {
                if (D.intersectSpans(start, end, events[i].start, events[i].end)) {
                    overlappers.push(events[i]);
                }
            }

            overlappers.sort(function (e1, e2) {
                return e1.left < e2.left ? -1 : 1;
            });
            return overlappers;
        },

        getCluster: function (events, startIndex) {
            if (startIndex >= events.length - 1) return [events[startIndex]];

            var evts = [events[startIndex]],
                l = events.length,
                start = events[startIndex].start,
                end = events[startIndex].end,
                D = Sch.util.Date,
                i = startIndex + 1;

            while (i < l && D.intersectSpans(start, end, events[i].start, events[i].end)) {
                evts.push(events[i]);
                start = D.max(start, events[i].start);
                end = D.min(events[i].end, end);
                i++;
            }

            return evts;
        },

        collectRowData: function (rowData, record, rowIndex) {

            if (rowIndex === 0) {
                var D = Sch.util.Date,
                    ta = this.timeAxis,
                    viewStart = ta.getStart(),
                    viewEnd = ta.getEnd(),
                    rowEvents = [],
                    colCount = this.headerCt.getColumnCount(),
                    resourceRecord,
                    columnEvents,
                    resourceEvents,
                    header, i, l;

                // Render events in the first cell of top row
                for (var colIndex = 0; colIndex < colCount; colIndex++) {
                    header = this.getHeaderAtIndex(colIndex);
                    columnEvents = [];
                    resourceRecord = this.resourceStore.getAt(colIndex);
                    resourceEvents = this.eventStore.getEventsForResource(resourceRecord);

                    // Iterate events (belonging to current resource) 
                    for (i = 0, l = resourceEvents.length; i < l; i++) {
                        var event = resourceEvents[i],
                            start = event.getStartDate(),
                            end = event.getEndDate();

                        // Determine if the event should be rendered or not
                        if (start && end && ta.timeSpanInAxis(start, end)) {
                            columnEvents.push(this.generateTplData(event, viewStart, viewEnd, resourceRecord, colIndex));
                        }
                    }
                    this.layoutEvents(columnEvents);
                    rowData[header.id] += '&#160;' + this.eventTpl.apply(columnEvents);
                }
            }

            rowData.rowHeight = this.rowHeight;

            if (Ext.isIE7 && Ext.isStrict) {
                rowData.rowHeight -= 2;
            }

            return rowData;
        },

        // private
        resolveResource: function (el) {
            el = Ext.fly(el).is(this.cellSelector) ? el : Ext.fly(el).up(this.cellSelector);

            if (el) {
                var hd = this.getHeaderByCell(el.dom ? el.dom : el);

                if (hd) {
                    return this.resourceStore.getAt(this.headerCt.getHeaderIndex(hd));
                }
            }

            return null;
        },

        // private
        onEventUpdate: function (store, model) {
            this.renderSingle(model);
            var previous = model.previous;
            var newResource = model.getResource();

            if (previous && previous[model.resourceIdField]) {
                // If an event has been moved to a new resource, refresh old resource first
                var resource = model.getResource(previous[model.resourceIdField]);
                if (resource) {
                    this.relayoutRenderedEvents(resource);
                }
            }

            if (newResource) {
                this.relayoutRenderedEvents(newResource);
            }
        },

        // private
        onEventAdd: function (s, recs) {
            if (recs.length === 1) {
                this.renderSingle(recs[0]);
                this.relayoutRenderedEvents(recs[0].getResource());
            } else {
                this.onUpdate(this.store, this.store.first());
            }
        },

        // private
        onEventRemove: function (s, recs) {
            if (recs.length === 1) {
                this.relayoutRenderedEvents(this.getResourceByEventRecord(recs[0]));
            } else {
                this.onUpdate(this.store, this.store.first());
            }
        },

        relayoutRenderedEvents: function (resource) {
            var data = [],
                i, l, event, node,
                events = this.eventStore.getEventsForResource(resource);

            if (events.length > 0) {

                for (i = 0, l = events.length; i < l; i++) {
                    event = events[i];
                    node = this.getEventNodeByRecord(event);

                    if (node) {
                        data.push({
                            start: event.getStartDate(),
                            end: event.getEndDate(),
                            id: node.id
                        });
                    }
                }

                this.layoutEvents(data);

                for (i = 0; i < data.length; i++) {
                    event = data[i];
                    Ext.fly(event.id).setStyle({
                        left: event.left + 'px',
                        width: event.width + 'px'
                    });
                }
            }
        },

        renderSingle: function (event) {
            // Inject moved event into correct cell
            var resource = event.getResource();
            var existing = this.getEventNodeByRecord(event);
            var rIndex = this.resourceStore.indexOf(resource);

            if (existing) {
                Ext.fly(existing).remove();
            }

            // Resource might not exist anymore
            if (rIndex < 0) {
                return;
            }

            var containerCell = this.getCell(this.store.getAt(0), this.headerCt.getHeaderAtIndex(rIndex)).first();
            var data = this.generateTplData(event, this.timeAxis.getStart(), this.timeAxis.getEnd(), resource, rIndex);

            this.eventTpl.append(containerCell, [data]);
        },

        /**
        *  Returns the region for a "global" time span in the view. Coordinates are relative to element containing the time columns
        *  @param {Date} startDate The start date of the span
        *  @param {Date} endDate The end date of the span
        *  @return {Ext.util.Region} The region for the time span
        */
        getTimeSpanRegion: function (startDate, endDate) {
            var startY = this.getXYFromDate(startDate)[1],
                endY = this.getXYFromDate(endDate || startDate)[1],
                tableEl = this.el.down('.x-grid-table'),
                width = (tableEl || this.el).dom.clientWidth; // fallback in case grid is not rendered (no rows/table)

            return new Ext.util.Region(Math.min(startY, endY), width, Math.max(startY, endY), 0);
        },

        /**
        * Gets the start and end dates for an element Region
        * @param {Region} region The region to map to start and end dates
        * @param {String} roundingMethod The rounding method to use
        * @returns {Object} an object containing start/end properties
        */
        getStartEndDatesFromRegion: function (region, roundingMethod) {
            var topDate = this.getDateFromXY([0, region.top], roundingMethod),
                bottomDate = this.getDateFromXY([0, region.bottom], roundingMethod);

            if (top && bottomDate) {
                return {
                    start: Sch.util.Date.min(topDate, bottomDate),
                    end: Sch.util.Date.max(topDate, bottomDate)
                };
            } else {
                return null;
            }
        },

        /**
        * Returns the amount of pixels for a single unit
        * @private
        * @return {String} The unit in pixel
        */
        getSingleTickInPixels: function () {
            return this.rowHeight;
        },

        // private
        timeColumnRenderer: function (v, m, rec, row, col, ds) {
            var retVal = '';

            if (this.timeCellRenderer) {
                var ta = this.timeAxis,
                    rowTick = ta.getAt(row),
                    rowStart = rowTick.start,
                    rowEnd = rowTick.end,
                    resourceStore = this.resourceStore,
                    resource = resourceStore.getAt(col);

                retVal = this.timeCellRenderer.call(this.timeCellRendererScope || this, m, resource, row, col, resourceStore, rowStart, rowEnd);
            }

            // Thanks Condor for this fix!
            if (Ext.isIE) {
                m.tdAttr = 'style="z-index:' + (this.store.getCount() - row) + '"';
            }

            if (col % 2 === 1) {
                m.tdCls += ' ' + this.altColCls;
            }

            return retVal;
        },


        setColumnWidth: function (width, preventRefresh) {
            if (this.panel) {
                this.panel.resourceColumnWidth = width;
            }

            var headerCt = this.headerCt;

            headerCt.suspendLayout = true;

            headerCt.items.each(function (column) {
                if (column.rendered) {
                    // otherwise column "remembers" its width and doesn't update
                    column.minWidth = undefined;

                    column.setWidth(width);
                }
            });

            headerCt.suspendLayout = false;

            headerCt.doLayout();

            if (!preventRefresh) {
                this.refresh();
            }

            this.fireEvent('columnwidthchange', this, width);
        },

        /**
        * Method to get a currently visible date range in a scheduling view. Please note that it only work when scheduler is rendered.
        * @return {Object} object with `startDate` and `endDate` properties.
        */
        getVisibleDateRange: function () {
            if (!this.rendered) {
                return null;
            }

            var scroll = this.getEl().getScroll(),
                startDate = this.panel.getStart(),
                endDate = this.panel.getEnd(),
                height = this.getHeight();

            var innerTable = Ext.query('.x-grid-table', this.getEl().dom)[0];

            if (innerTable.clientHeight < height) {
                return { startDate: startDate, endDate: endDate };
            }

            return {
                startDate: this.getDateFromXY([0, scroll.top], null, true),
                endDate: this.getDateFromXY([0, scroll.top + height], null, true)
            };
        }

    }
});

/**
@class Sch.selection.EventModel
@extends Ext.selection.Model

This class provides the basic implementation event selection in a grid.

*/
Ext.define("Sch.selection.EventModel", {
    extend: 'Ext.selection.Model',

    alias: 'selection.eventmodel',

    requires: ['Ext.util.KeyNav'],

    /**
    * @cfg {Boolean} deselectOnContainerClick `True` to deselect all events when user clicks on free space in scheduler (outside of any event). Default is `true`. 
    */
    deselectOnContainerClick: true,


    constructor: function (cfg) {
        this.addEvents(
        /**
        * @event beforedeselect
        * Fired before a record is deselected. If any listener returns false, the
        * deselection is cancelled.
        * @param {Sch.selection.EventModel} this
        * @param {Sch.model.Event} record The selected event
        */
            'beforedeselect',

        /**
        * @event beforeselect
        * Fired before a record is selected. If any listener returns false, the
        * selection is cancelled.
        * @param {Sch.selection.EventModel} this
        * @param {Sch.model.Event} record The selected event
        */
            'beforeselect',

        /**
        * @event deselect
        * Fired after a record is deselected
        * @param {Sch.selection.EventModel} this
        * @param {Sch.model.Event} record The selected event
        */
            'deselect',

        /**
        * @event select
        * Fired after a record is selected
        * @param {Sch.selection.EventModel} this
        * @param {Sch.model.Event} record The selected event
        */
            'select'
        );
        this.callParent(arguments);
    },

    // Overridden to prevent default grid overwriting the eventStore binding
    bindStore: function (store, initial) {
        this.callParent([this.view.getEventStore(), initial]);
    },

    bindComponent: function (view) {
        var me = this,
            eventListeners = {
                refresh: me.refresh,
                scope: me
            };

        me.view = view;
        me.bindStore(view.getEventStore());

        view.on({
            eventclick: me.onEventClick,
            itemclick: me.onItemClick,
            scope: this
        });

        view.on(eventListeners);
    },

    onEventClick: function (view, record, e) {
        this.selectWithEvent(record, e);
    },

    onItemClick: function () {
        if (this.deselectOnContainerClick) {
            this.deselectAll();
        }
    },

    onSelectChange: function (record, isSelected, suppressEvent, commitFn) {
        var me = this,
            view = me.view,
            store = me.store,
            eventName = isSelected ? 'select' : 'deselect',
            i = 0;

        if ((suppressEvent || me.fireEvent('before' + eventName, me, record)) !== false &&
                commitFn() !== false) {

            if (isSelected) {
                view.onEventSelect(record, suppressEvent);
            } else {
                view.onEventDeselect(record, suppressEvent);
            }

            if (!suppressEvent) {
                me.fireEvent(eventName, me, record);
            }
        }
    },

    // Not supported.
    selectRange: function () { },

    selectNode: function (node, keepExisting, suppressEvent) {
        var r = this.view.resolveEventRecord(node);
        if (r) {
            this.select(r, keepExisting, suppressEvent);
        }
    },

    deselectNode: function (node, keepExisting, suppressEvent) {
        var r = this.view.resolveEventRecord(node);
        if (r) {
            this.deselect(r, suppressEvent);
        }
    }
});
/**
@class Sch.plugin.Printable

Plugin for printing an Ext Scheduler instance.

To use this plugin, add it to scheduler as usual. The plugin will add an additional `print` method to the scheduler:

var scheduler = Ext.create('Sch.panel.SchedulerGrid', {
...
    
resourceStore   : resourceStore,
eventStore      : eventStore,
            
plugins         : [
Ext.create('Sch.plugin.Printable', { 
// default values
docType             : '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">',
autoPrintAndClose   : true
})
]
});
        
...
        
scheduler.print();
        

*/
Ext.define("Sch.plugin.Printable", {
    extend: 'Ext.AbstractPlugin',
    lockableScope: 'top',

    /**
    * @cfg {String} docType This is the DOCTYPE to use for the print window. It should be the same DOCTYPE as on your application page.
    */
    docType: '<!DOCTYPE HTML>',

    /**
    * An empty function by default, but provided so that you can perform a custom action
    * before the print plugin extracts data from the scheduler.
    * @param {SchedulerPanel} scheduler The scheduler instance
    * @method beforePrint
    */
    beforePrint: Ext.emptyFn,

    /**
    * An empty function by default, but provided so that you can perform a custom action
    * after the print plugin has extracted the data from the scheduler.
    * @param {SchedulerPanel} scheduler The scheduler instance
    * @method afterPrint
    */
    afterPrint: Ext.emptyFn,

    /**
    * @cfg {Boolean} autoPrintAndClose True to automatically call print and close the new window after printing. Default value is `true`
    */
    autoPrintAndClose: true,

    /**
    * @cfg {Boolean} fakeBackgroundColor True to reset background-color of events and enable use of border-width to fake background color (borders print by default in every browser). Default value is `true`
    */
    fakeBackgroundColor: true,

    scheduler: null,


    constructor: function (config) {
        Ext.apply(this, config);
    },

    init: function (scheduler) {
        this.scheduler = scheduler;
        scheduler.print = Ext.Function.bind(this.print, this);
    },

    // private, the template for the new window
    mainTpl: new Ext.XTemplate('{docType}' +
          '<html class="x-border-box {htmlClasses}">' +
            '<head>' +
              '<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />' +
              '<title>{title}</title>' +
              '{styles}' +
            '</head>' +
            '<body class="sch-print-body {bodyClasses}">' +
                '<div class="sch-print-ct {componentClasses}" style="width:{totalWidth}px">' +
                    '<div class="sch-print-headerbg" style="border-left-width:{totalWidth}px;height:{headerHeight}px;"></div>' +
                    '<div class="sch-print-header-wrap">' +
                        '{[this.printLockedHeader(values)]}' +
                        '{[this.printNormalHeader(values)]}' +
                    '</div>' +
                    '{[this.printLockedGrid(values)]}' +
                    '{[this.printNormalGrid(values)]}' +
                '</div>' +
                '<script type="text/javascript">' +
                    '{setupScript}' +
                '</script>' +
            '</body>' +
          '</html>',
          {
              printLockedHeader: function (values) {
                  var str = '';

                  if (values.lockedGrid) {
                      str += '<div style="left:-' + values.lockedScroll + 'px;margin-right:-' + values.lockedScroll + 'px;width:' + (values.lockedWidth + values.lockedScroll) + 'px"';
                      str += 'class="sch-print-lockedheader x-grid-header-ct x-grid-header-ct-default x-docked x-docked-top x-grid-header-ct-docked-top x-grid-header-ct-default-docked-top x-box-layout-ct x-docked-noborder-top x-docked-noborder-right x-docked-noborder-left">';
                      str += values.lockedHeader;
                      str += '</div>';
                  }
                  return str;
              },
              printNormalHeader: function (values) {
                  var str = '';

                  if (values.normalGrid) {
                      str += '<div style="left:' + (values.lockedGrid ? values.lockedWidth : '0') + 'px;width:' + values.normalWidth + 'px;" class="sch-print-normalheader x-grid-header-ct x-grid-header-ct-default x-docked x-docked-top x-grid-header-ct-docked-top x-grid-header-ct-default-docked-top x-box-layout-ct x-docked-noborder-top x-docked-noborder-right x-docked-noborder-left">';
                      str += '<div style="margin-left:-' + values.normalScroll + 'px">' + values.normalHeader + '</div>';
                      str += '</div>';
                  }
                  return str;
              },
              printLockedGrid: function (values) {
                  var str = '';

                  if (values.lockedGrid) {
                      str += '<div id="lockedRowsCt" style="left:-' + values.lockedScroll + 'px;margin-right:-' + values.lockedScroll + 'px;width:' + (values.lockedWidth + values.lockedScroll) + 'px;top:' + values.headerHeight + 'px;" class="sch-print-locked-rows-ct ' + values.innerLockedClasses + ' x-grid-inner-locked">';
                      str += values.lockedRows;
                      str += '</div>';
                  }
                  return str;
              },
              printNormalGrid: function (values) {
                  var str = '';

                  if (values.normalGrid) {
                      str += '<div id="normalRowsCt" style="left:' + (values.lockedGrid ? values.lockedWidth : '0') + 'px;top:' + values.headerHeight + 'px;width:' + values.normalWidth + 'px" class="sch-print-normal-rows-ct ' + values.innerNormalClasses + '">';
                      str += '<div style="position:relative;overflow:visible;margin-left:-' + values.normalScroll + 'px">' + values.normalRows + '</div>';
                      str += '</div>';
                  }
                  return str;
              }
          }),

    // private
    getGridContent: function (component) {
        var normalGrid = component.normalGrid,
            lockedGrid = component.lockedGrid,
            lockedView = lockedGrid.getView(),
            normalView = normalGrid.getView(),
            header, lockedRows, normalRows, lockedScroll, normalScroll,
            normalWidth, lockedWidth;

        this.beforePrint(component);

        if (lockedGrid.collapsed && !normalGrid.collapsed) {
            normalWidth = lockedGrid.getWidth() + normalGrid.getWidth();
        } else {
            normalWidth = normalGrid.getWidth();
            lockedWidth = lockedGrid.getWidth();
        }

        // Render rows
        var records = lockedView.store.getRange();
        lockedRows = lockedView.tpl.apply(lockedView.collectData(records, 0));
        normalRows = normalView.tpl.apply(normalView.collectData(records, 0));
        lockedScroll = lockedView.el.getScroll().left;
        normalScroll = normalView.el.getScroll().left;

        // Hide hidden columns
        var div = document.createElement('div');
        div.innerHTML = lockedRows;

        lockedGrid.headerCt.items.each(function (column, i) {
            if (column.isHidden()) {
                Ext.fly(div).down('th:nth-child(' + (i + 1) + ')').setWidth(0);
            }
        });

        lockedRows = div.innerHTML;

        // Print additional markup produced by lines plugins, zones plugins etc
        if (Sch.feature && Sch.feature.AbstractTimeSpan) {
            Ext.each((component.normalGrid.plugins || []).concat(component.columnLinesFeature || []), function (plug) {
                if (plug instanceof Sch.feature.AbstractTimeSpan) {
                    normalRows = plug.generateMarkup(true) + normalRows;
                }
            });
        }

        this.afterPrint(component);

        return {
            normalHeader: normalGrid.headerCt.el.dom.innerHTML,
            lockedHeader: lockedGrid.headerCt.el.dom.innerHTML,
            lockedGrid: !lockedGrid.collapsed,
            normalGrid: !normalGrid.collapsed,
            lockedRows: lockedRows,
            normalRows: normalRows,
            lockedScroll: lockedScroll,
            normalScroll: normalScroll,
            lockedWidth: lockedWidth,
            normalWidth: normalWidth,
            headerHeight: normalGrid.headerCt.getHeight(),
            innerLockedClasses: lockedGrid.view.el.dom.className,
            innerNormalClasses: normalGrid.view.el.dom.className + (this.fakeBackgroundColor ? ' sch-print-fake-background' : ''),
            width: component.getWidth()
        };
    },

    getStylesheets: function () {
        return Ext.getDoc().select('link[rel="stylesheet"]');
    },

    /**
    * Prints a scheduler panel. This method will be aliased to the main scheduler instance, so you can call it directly:
    * 
    *      scheduler.print()
    */
    print: function () {
        var component = this.scheduler;

        if (!(this.mainTpl instanceof Ext.Template)) {
            // Compile the tpl upon first call
            var headerRowHeight = 22;

            this.mainTpl = Ext.create("Ext.XTemplate", this.mainTpl, {
                compiled: true,
                disableFormats: true
            });
        }

        var v = component.getView(),
            styles = this.getStylesheets(),
            ctTmp = Ext.get(Ext.core.DomHelper.createDom({
                tag: 'div'
            })),
            styleFragment;

        styles.each(function (s) {
            ctTmp.appendChild(s.dom.cloneNode(true));
        });

        styleFragment = ctTmp.dom.innerHTML + '';

        var gridContent = this.getGridContent(component),
            html = this.mainTpl.apply(Ext.apply({
                waitText: this.waitText,
                docType: this.docType,
                htmlClasses: '',
                bodyClasses: Ext.getBody().dom.className,
                componentClasses: component.el.dom.className,
                title: (component.title || ''),
                styles: styleFragment,
                totalWidth: component.getWidth(),
                setupScript: "(" + this.setupScript.toString() + ")();"
            }, gridContent));

        // Assign to this for testability, need a reference to the opened window
        var win = window.open('', 'printgrid');
        this.printWindow = win;
        win.document.write(html);
        win.document.close();

        if (this.autoPrintAndClose) {
            win.print();
            // Chrome cannot print the page if you close the window being printed
            if (!Ext.isChrome) {
                win.close();
            }
        }
    },

    // Script executed in the newly open window, to sync row heights
    setupScript: function () {

        var lockedTableCt = document.getElementById('lockedRowsCt'),
            normalTableCt = document.getElementById('normalRowsCt'),

        //checks added in case of hidden/collapsed grids
            lockedRows = lockedTableCt && lockedTableCt.getElementsByTagName('tr'),
            normalRows = normalTableCt && normalTableCt.getElementsByTagName('tr'),
            count = normalRows && lockedRows ? normalRows.length : 0,
            i = 0;
        for (; i < count; i++) {
            lockedRows[i].style.height = normalRows[i].style.height;
        }
    }
});
/**
@class Sch.plugin.Export
@extends Ext.util.Observable
 
A plugin for generating PDF/PNG out of a Scheduler panel.

#Configuring/usage

To use this plugin, add it to your scheduler as any other plugin. It is also required to have [PhantomJS][1] and [Imagemagick][2]
installed on the server. The complete process of setting up a backend for this plugin can be found in the readme file inside export examples
as well as on our [blog][3].

var scheduler = Ext.create('Sch.panel.SchedulerGrid', {
...
    
resourceStore   : resourceStore,
eventStore      : eventStore,
            
plugins         : [
Ext.create('Sch.plugin.Export', { 
// default values
printServer: 'server.php'
})
]
});
        
Scheduler will be extended with three new methods: 

* {@link #setFileFormat}, which allows setting the format to which panel should be exported. Default format is `pdf`.

* {@link #showExportDialog}, which shows export settings dialog
        
scheduler.showExportDialog();

* {@link #doExport} which actually performs the export operation using {@link #defaultConfig} or provided config object :

scheduler.doExport(
{
format: "A5",
orientation: "landscape",
range: "complete",
showHeader: true,
singlePageExport: false          
}
);

#Export options

In the current state, plugin gives few options to modify the look and feel of the generated PDF document throught a dialog window :

{@img scheduler/images/export_dialog.png}

If no changes are made to the form, the {@link #defaultConfig} will be used.

##Export Range

This setting controls the timespan visible on the exported document. Three options are available here :

{@img scheduler/images/export_dialog_ranges.png}

###Complete schedule

Whole current timespan will be visible on the exported document.

###Date range

User can select the start and end dates (from the total timespan of the panel) visible on the exported document.

{@img scheduler/images/export_dialog_ranges_date.png}

###Current view

Timespan of the exported document/image will be set to the currently visible part of the time axis. User can control
the width of the time column and height of row.

{@img scheduler/images/export_dialog_ranges_current.png}

##Paper Format

This combo gives control of the size of the generated document/image by choosing one from a list of supported ISO paper sizes : (`A5`, `A4`, `A3`, `Letter`).
Generated PDF has a fixed DPI value of 72. Dafault format is `A4`.

{@img scheduler/images/export_dialog_format.png}

##Orientation

This setting defines the orientation of the generated document/image.

{@img scheduler/images/export_dialog_orientation.png}

Default option is the `portrait` (horizontal) orientation :

{@img scheduler/images/export_dialog_portrait.png}

Second option is the `landscape` (vertical) orientation :

{@img scheduler/images/export_dialog_landscape.png}

[1]: http://www.phantomjs.org
[2]: http://www.imagemagick.org
[3]: http://bryntum.com/blog

*/
Ext.define('Sch.plugin.Export', {
    extend: 'Ext.util.Observable',
    alternateClassName: 'Sch.plugin.PdfExport',
    mixins: ['Ext.AbstractPlugin'],
    lockableScope: 'top',

    /**
    * @cfg {String}
    * URL of server responsible for running the export steps.
    */
    printServer: undefined,

    //private template for the temporary export html page
    tpl: new Ext.XTemplate('<!DOCTYPE html>' +
          '<html class="x-border-box {htmlClasses}">' +
            '<head>' +
              '<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />' +
              '<title>{column}/{row}</title>' +
              '{styles}' +
            '</head>' +
            '<body class="x-webkit sch-export {bodyClasses}">' +
                '{[this.showHeader(values)]}' +
                '<div class="{componentClasses}" style="height:{bodyHeight}px; width:{totalWidth}px; position: relative !important">' +
                    '{HTML}' +
                '</div>' +
            '</body>' +
          '</html>',
        {
            disableFormats: true,

            //shows/hides page header displaying row/column number
            showHeader: function (val) {
                if (val.showHeader) {
                    return '<div class="sch-export-header" style="width:' + val.totalWidth + 'px"><h2>' + val.column + '/' + val.row + '</h2></div>';
                }
                return '';
            }
        }
    ),

    /**
    * @cfg {String}
    * Class name of the dialog used to change export settings.
    */
    exportDialogClassName: 'Sch.widget.ExportDialog',

    /**
    * @cfg {Object} 
    * Config object for the {@link #exportDialogClass}. Use this to override default values for the export dialog.
    */
    exportDialogConfig: {},

    /**
    * @cfg {Object}
    * Default export configuration.
    */
    defaultConfig: {
        format: "A4",
        orientation: "portrait",
        range: "complete",
        showHeader: true,
        singlePageExport: false
    },

    /**
    * @private
    * @cfg {Object}
    * Predefined paper sizes in inches for different formats, as defined by ISO standards.
    */
    pageSizes: {
        "A5": {
            "width": 5.8,
            "height": 8.3
        },
        "A4": {
            "width": 8.3,
            "height": 11.7
        },
        "A3": {
            "width": 11.7,
            "height": 16.5
        },
        "Letter": {
            "width": 8.5,
            "height": 11
        }
    },

    /**
    * @cfg {Boolean}
    * If set to true, open new window with the generated document after the operation has finished.
    */
    openAfterExport: true,

    /**
    * @cfg {String}
    * Format of the exported file, selectable from `pdf` or `png`. By default plugin exports panel contents to PDF but PNG file format is also available.
    */
    fileFormat: 'pdf',

    //private Constant DPI value for generated PDF
    DPI: 72,

    constructor: function (config) {
        config = config || {};

        if (config.exportDialogConfig) {
            Ext.Object.each(this.defaultConfig, function (k, v, o) {
                var configK = config.exportDialogConfig[k];
                if (configK) {
                    o[k] = configK;
                }
            });
        }

        this.callParent(arguments);

        this.addEvents(
        /**
        * @event hidedialogwindow
        * Fires to hide the dialog window.
        */
            'hidedialogwindow',

        /**
        * @event showdialogerror
        * Fires to show error in the dialog window.
        * @param {String} message                    Error message to show in the dialog window.
        */
            'showdialogerror',

        /**
        * @event updateprogressbar
        * Fires when a progressbar of the {@link #exportDialogClassName dialog} should update it's value.
        * @param {Number} value                       Value (between 0 and 1) to set on the progressbar.
        */
            'updateprogressbar'
        );

        this.setFileFormat(this.fileFormat);
    },

    init: function (scheduler) {
        this.scheduler = scheduler;

        scheduler.showExportDialog = Ext.Function.bind(this.showExportDialog, this);
        scheduler.doExport = Ext.Function.bind(this.doExport, this);
    },

    /**
    * Function for setting the {@link #fileFormat} of exporting panel. Can be either `pdf` or `png`.
    *
    * @param {String} format format of the file to set. Can take either `pdf` or `png`.
    */
    setFileFormat: function (format) {
        if (typeof format !== 'string') {
            this.fileFormat = 'pdf';
        } else {
            format = format.toLowerCase();

            if (format === 'png') {
                this.fileFormat = format;
            } else {
                this.fileFormat = 'pdf';
            }
        }
    },

    /**
    * Instantiates and shows a new {@link #exportDialogClassName} class using {@link #exportDialogConfig} config.
    * This popup should give user possibility to change export settings.
    */
    showExportDialog: function () {
        var me = this,
            view = me.scheduler.getSchedulingView();

        //dialog window is always removed to avoid resetting its layout after hiding
        if (me.win) {
            me.win.destroy();
            me.win = null;
        }

        me.win = Ext.create(me.exportDialogClassName, {
            plugin: me,
            exportDialogConfig: Ext.apply({
                startDate: me.scheduler.getStart(),
                endDate: me.scheduler.getEnd(),
                rowHeight: view.rowHeight,
                columnWidth: view.getSingleTickInPixels(),
                defaultConfig: me.defaultConfig
            }, me.exportDialogConfig)
        });

        me.saveRestoreData();

        me.win.show();
    },

    /*
    * @private
    * Save values to restore panel after exporting
    */
    saveRestoreData: function () {
        var component = this.scheduler,
            view = component.getSchedulingView();

        //values needed to restore original size/dates of panel
        this.restoreSettings = {
            width: component.getWidth(),
            height: component.getHeight(),
            rowHeight: view.rowHeight,
            columnWidth: view.getSingleTickInPixels(),
            startDate: component.getStart(),
            endDate: component.getEnd(),
            normalWidth: component.normalGrid.getWidth(),
            normalLeft: component.normalGrid.getEl().getStyle('left'),
            lockedWidth: component.lockedGrid.getWidth()
        };
    },

    /*
    * @private
    * Get links to the stylesheets of current page.
    */
    getStylesheets: function () {
        var styleSheets = Ext.getDoc().select('link[rel="stylesheet"]'),
            ctTmp = Ext.get(Ext.core.DomHelper.createDom({
                tag: 'div'
            })),
            stylesString;

        styleSheets.each(function (s) {
            ctTmp.appendChild(s.dom.cloneNode(true));
        });

        stylesString = ctTmp.dom.innerHTML + '';

        return stylesString;
    },

    /**
    * Function performing the export operation using config from arguments or default {@link #defaultConfig config}. After getting data
    * from the scheduler an XHR request to {@link #printServer} will be made with the following JSON encoded data :
    *
    * * `html` {Array}         - array of html strings containing data of each page
    * * `format` {String}      - paper size of the exported file
    * * `orientation` {String} - orientation of the exported file
    * * `range`       {String} - range of the exported file
    * * `fileFormat`  {String} - file format of the exported file
    * 
    * @param {Object} [conf] Config options for exporting. If not provided, {@link #defaultConfig} is used. 
    * Possible parameters are :
    *
    * * `format` {String}            - format of the exported document/image, selectable from the {@link #pageSizes} list.
    * * `orientation` {String}       - orientation of the exported document/image. Either `portrait` or `landscape`.
    * * `range` {String}             - range of the panel to be exported. Selectable from `complete`, `current`, `date`.
    * * `showHeader` {Boolean}       - boolean value defining if exported pages should have row/column numbers added in the headers.
    * * `singlePageExport` {Boolean} - boolean value defining if exported file should be divided into separate pages or not
    *
    * @param {Function} [callback] Optional function that will be called after successful response from export backend script.
    * @param {Function} [errback] Optional function that will be called if export backend script returns error.
    */
    doExport: function (conf, callback, errback) {
        //put mask on the panel
        this.mask();

        var me = this,
            component = me.scheduler,
            view = component.getSchedulingView(),
            styles = me.getStylesheets(),
            config = conf || me.defaultConfig,
            normalGrid = component.normalGrid,
            headerHeight = normalGrid.headerCt.getHeight();

        if (!me.restoreSettings) {
            me.saveRestoreData();
        }

        me.fireEvent('updateprogressbar', 0.1);

        //for Tree grid expand all nodes
        if (component.expandAll) {
            component.expandAll();
        }

        var ticks = component.timeAxis.getTicks(),
            timeColumnWidth = view.getSingleTickInPixels(),
            paperWidth,
            printHeight,
            paperHeight;

        //check if we're not exporting to single image as those calculations are not needed in this case
        if (!config.singlePageExport) {
            //size of paper we will be printing on. 72 DPI used by phantomJs generator
            //take orientation into account
            if (config.orientation === 'landscape') {
                paperWidth = me.pageSizes[config.format].height * me.DPI;
                paperHeight = me.pageSizes[config.format].width * me.DPI;
            } else {
                paperWidth = me.pageSizes[config.format].width * me.DPI;
                paperHeight = me.pageSizes[config.format].height * me.DPI;
            }

            var pageHeaderHeight = 41;

            printHeight = Math.floor(paperHeight) - headerHeight - (config.showHeader ? pageHeaderHeight : 0);
        }

        if (config.range !== 'complete') {
            var newStart,
                newEnd,
                visibleDates,
                startTick,
                endTick;

            if (config.range === 'date') {
                newStart = new Date(config.dateFrom);
                newEnd = new Date(config.dateTo);

                if (Sch.util.Date.getDurationInDays(newStart, newEnd < 1)) {
                    newEnd = Sch.util.Date.add(newEnd, Sch.util.Date.DAY, 1);
                    newEnd = Sch.util.Date.constrain(newEnd, component.getStart(), component.getEnd());
                }
            } else if (config.range === 'current') {
                visibleDates = view.getVisibleDateRange();
                newStart = visibleDates.startDate;
                newEnd = visibleDates.endDate;
            }

            startTick = Math.floor(view.timeAxis.getTickFromDate(newStart));
            endTick = Math.floor(view.timeAxis.getTickFromDate(newEnd));

            //filter only needed ticks, performed in this way instead of using getRange() to work on simple objects
            //and not models
            ticks = ticks.filter(function (tick, index) {
                return index >= startTick && index <= endTick;
            });

            component.setTimeSpan(newStart, newEnd);
        }

        var format, htmlArray;

        if (!config.singlePageExport) {
            component.setWidth(paperWidth);
            component.setTimeColumnWidth(timeColumnWidth);

            //calculate amount of pages in the document
            var calculatedPages = me.calculatePages(config, ticks, timeColumnWidth, paperWidth, printHeight),
                params = {
                    ticks: ticks,
                    printHeight: printHeight,
                    paperWidth: paperWidth,
                    headerHeight: headerHeight,
                    styles: styles,
                    config: config
                };

            htmlArray = me.getExportJsonHtml(calculatedPages, params);
            format = config.format;
        } else {
            htmlArray = me.getExportJsonHtml(null, {
                styles: styles,
                config: config,
                timeColumnWidth: timeColumnWidth,
                ticks: ticks
            });
            var sizeInInches = me.getRealSize(),
                width = Ext.Number.toFixed(sizeInInches.width / me.DPI, 1),
                height = Ext.Number.toFixed(sizeInInches.height / me.DPI, 1);

            format = width + 'in*' + height + 'in';
        }

        //further update progress bar
        me.fireEvent('updateprogressbar', 0.4);


        if (me.printServer) {
            Ext.Ajax.request({
                type: 'POST',
                url: me.printServer,
                params: {
                    html: { 'array': htmlArray },
                    format: format,
                    orientation: config.orientation,
                    range: config.range,
                    fileFormat: me.fileFormat
                },
                success: function (response) {
                    me.onSuccess(response, callback, errback);
                },
                failure: function (response) {
                    me.onFailure(response, errback);
                },
                scope: me
            });
        } else {
            throw 'Server url not defined !';
        }

        me.restorePanel();
    },

    /*
    * @private
    * Function returning full width and height of both grids.
    *
    * @return {Object} values Object containing width and height properties.
    */
    getRealSize: function () {
        var component = this.scheduler,
            headerHeight = component.normalGrid.headerCt.getHeight(),
            height = (headerHeight + component.lockedGrid.getView().getEl().down('.x-grid-table').getHeight()),
            width = (component.lockedGrid.headerCt.getEl().first().getWidth() +
                component.normalGrid.body.select('.x-grid-table').first().getWidth());

        return {
            width: width,
            height: height
        };
    },

    /*
    * @private
    * Function calculating amount of pages in vertical/horizontal direction in the exported document/image.
    *
    * @param {Array} ticks Ticks from the TickStore.
    * @param {Int} timeColumnWidth Width of a single time column.
    * @return {Object} valuesObject Object containing calculated amount of pages, rows and columns.
    */
    calculatePages: function (config, ticks, timeColumnWidth, paperWidth, printHeight) {
        var me = this,
            component = me.scheduler,
            lockedGrid = component.lockedGrid,
            rowHeight = component.getSchedulingView().rowHeight,
            lockedHeader = lockedGrid.headerCt,
            lockedGridWidth = lockedHeader.getEl().first().getWidth(),
            lockedColumnPages = null,
        //amount of columns with locked grid visible
            columnsAmountLocked = 0;

        if (lockedGridWidth > lockedGrid.getWidth()) {
            var startCursor = 0,
                    endCursor = 0,
                    width = 0,
                    addItem = false,
                    columnWidth;
            lockedColumnPages = [];

            lockedGrid.headerCt.items.each(function (column, idx, len) {
                columnWidth = column.width;

                if (!width || width + columnWidth < paperWidth) {
                    width += columnWidth;
                    if (idx === len - 1) {
                        addItem = true;

                        //we still need to check if any time columns fit
                        var widthLeft = paperWidth - width;
                        columnsAmountLocked = Math.floor(widthLeft / timeColumnWidth);
                    }
                } else {
                    addItem = true;
                }

                if (addItem) {
                    endCursor = idx;

                    lockedColumnPages.push({
                        firstColumnIdx: startCursor,
                        lastColumnIdx: endCursor,
                        totalColumnsWidth: width || columnWidth
                    });

                    startCursor = endCursor + 1;
                    width = 0;
                }
            });
        } else {
            columnsAmountLocked = Math.floor((paperWidth - lockedGridWidth) / timeColumnWidth);
        }

        //amount of columns without locked grid visible
        var columnsAmountNormal = Math.floor(paperWidth / timeColumnWidth),
        //amount of pages horizontally
            columnPages = Math.ceil((ticks.length - columnsAmountLocked) / columnsAmountNormal) + 1,
            totalRows = component.getSchedulingView().store.getCount(),
            rowsAmount = Math.floor(printHeight / rowHeight),
        //amount of pages vertically
            rowPages = Math.ceil(totalRows / rowsAmount);

        return {
            columnsAmountLocked: columnsAmountLocked,
            columnsAmountNormal: columnsAmountNormal,
            lockedColumnPages: lockedColumnPages,
            rowsAmount: rowsAmount,
            rowPages: rowPages,
            columnPages: columnPages,
            timeColumnWidth: timeColumnWidth,
            lockedGridWidth: lockedGridWidth,
            rowHeight: rowHeight,
            panelHTML: {}
        };
    },

    /*
    * @private
    * Method exporting panel's HTML to JSON structure. This function is taking snapshots of the visible panel (by changing timespan
    * and hiding rows) and pushing their html to an array, which is then encoded to JSON.
    *
    * @param {Object} calculatedPages Object with values returned from {@link #calculatePages}.
    * @param {Object} params Object with additional properties needed for calculations.
    *
    * @return {Array} htmlArray JSON string created from an array of objects with stringified html.
    */
    getExportJsonHtml: function (calculatedPages, params) {
        var me = this,
            component = me.scheduler,
            htmlArray = [],

        //Remove any non-webkit browser-specific css classes
            re = new RegExp(/x-ie\d?|x-gecko/g),
            bodyClasses = Ext.getBody().dom.className.replace(re, ''),
            componentClasses = component.el.dom.className,
            styles = params.styles,
            config = params.config,
            ticks = params.ticks,
            panelHTML, readyHTML, htmlObject, html,
            timeColumnWidth;

        //Hack for IE
        if (Ext.isIE) {
            bodyClasses += ' x-ie-export';
        }

        //we need to prevent Scheduler from auto adjusting the timespan
        component.timeAxis.autoAdjust = false;

        if (!config.singlePageExport) {
            var columnsAmountLocked = calculatedPages.columnsAmountLocked,
                columnsAmountNormal = calculatedPages.columnsAmountNormal,
                lockedColumnPages = calculatedPages.lockedColumnPages,
                rowsAmount = calculatedPages.rowsAmount,
                rowPages = calculatedPages.rowPages,
                columnPages = calculatedPages.columnPages,
                paperWidth = params.paperWidth,
                printHeight = params.printHeight,
                headerHeight = params.headerHeight,
                lastColumn, columns, lockedColumnPagesLen;

            timeColumnWidth = calculatedPages.timeColumnWidth;
            panelHTML = calculatedPages.panelHTML;

            if (lockedColumnPages) {
                lockedColumnPagesLen = lockedColumnPages.length;
                columnPages += lockedColumnPagesLen;
            }

            //horizontal pages
            for (var i = 0; i < columnPages; i += 1) {

                //set visible time range to corresponding ticks
                if (lockedColumnPages && i < lockedColumnPagesLen) {
                    if (i === lockedColumnPagesLen - 1 && columnsAmountLocked !== 0) {
                        component.normalGrid.show();
                        lastColumn = Ext.Number.constrain((columnsAmountLocked - 1), 0, (ticks.length - 1));
                        component.setTimeSpan(ticks[0].start, ticks[lastColumn].end);
                    } else {
                        component.normalGrid.hide();
                    }
                    var visibleColumns = lockedColumnPages[i];

                    this.showLockedColumns();
                    this.hideLockedColumns(visibleColumns.firstColumnIdx, visibleColumns.lastColumnIdx);

                    //resize lockedGrid to width of visible columns + 1px of border
                    component.lockedGrid.setWidth(visibleColumns.totalColumnsWidth + 1);
                } else {
                    this.showLockedColumns();

                    if (i === 0) {
                        if (columnsAmountLocked !== 0) {
                            component.normalGrid.show();
                        }

                        lastColumn = Ext.Number.constrain((columnsAmountLocked - 1), 0, (ticks.length - 1));
                        component.setTimeSpan(ticks[0].start, ticks[lastColumn].end);
                    } else {
                        component.normalGrid.show();

                        //hide locked grid
                        if (!columns) {
                            columns = component.lockedGrid.hide();
                        }

                        if (ticks[lastColumn + columnsAmountNormal]) {
                            component.setTimeSpan(ticks[lastColumn + 1].start, ticks[lastColumn + columnsAmountNormal].end);
                            lastColumn = lastColumn + columnsAmountNormal;
                        } else {
                            component.setTimeSpan(ticks[lastColumn + 1].start, ticks[ticks.length - 1].end);
                        }
                    }
                }

                //changing timespan resets column width
                component.setTimeColumnWidth(timeColumnWidth);

                //vertical pages
                for (var k = 0; k < rowPages; k += 1) {

                    //hide rows that are not supposed to be visible on the current page
                    me.hideRows(rowsAmount, k);

                    panelHTML.dom = component.body.dom.innerHTML;
                    panelHTML.k = k;
                    panelHTML.i = i;
                    readyHTML = me.resizePanelHTML(panelHTML);

                    html = me.tpl.apply(Ext.apply({
                        bodyClasses: bodyClasses,
                        bodyHeight: printHeight + headerHeight,
                        componentClasses: componentClasses,
                        styles: styles,
                        showHeader: config.showHeader,
                        HTML: readyHTML.dom.innerHTML,
                        totalWidth: paperWidth,
                        headerHeight: headerHeight,
                        column: i + 1,
                        row: k + 1
                    }));

                    htmlObject = { 'html': html };
                    htmlArray.push(htmlObject);

                    //unhide all rows
                    me.showRows();
                }
            }

        } else {
            timeColumnWidth = params.timeColumnWidth;
            panelHTML = calculatedPages ? calculatedPages.panelHTML : {};

            component.setTimeSpan(ticks[0].start, ticks[ticks.length - 1].end);
            component.lockedGrid.setWidth(component.lockedGrid.headerCt.getEl().first().getWidth());
            component.setTimeColumnWidth(timeColumnWidth);

            var realSize = me.getRealSize();

            Ext.apply(panelHTML, {
                dom: component.body.dom.innerHTML,
                column: 1,
                row: 1
            });

            readyHTML = me.resizePanelHTML(panelHTML);
            html = me.tpl.apply(Ext.apply({
                bodyClasses: bodyClasses,
                bodyHeight: realSize.height,
                componentClasses: componentClasses,
                styles: styles,
                showHeader: false,
                HTML: readyHTML.dom.innerHTML,
                totalWidth: realSize.width
            }));

            htmlObject = { 'html': html };
            htmlArray.push(htmlObject);
        }

        component.timeAxis.autoAdjust = true;

        return Ext.JSON.encode(htmlArray);
    },

    /*
    * @private
    * Resizes panel elements to fit on the print page. This has to be done manually in case of wrapping Scheduler
    * inside another, smaller component.
    * 
    * @param {Object} HTML Object with html of panel, and row & column number.
    *
    * @return {Object} frag Ext.dom.Element with resized html.
    */
    resizePanelHTML: function (HTML) {
        //create empty div that will temporarily hold our panel current HTML
        var frag = Ext.get(Ext.core.DomHelper.createDom({
            tag: 'div',
            html: HTML.dom
        })),
            component = this.scheduler,
            lockedGrid = component.lockedGrid,
            normalGrid = component.normalGrid,
            lockedElements,
            normalElements;

        //HACK for resizing in IE6/7 and Quirks mode. Requires operating on a document fragment with DOM methods 
        //instead of using unattached div and Ext methods.
        if (Ext.isIE6 || Ext.isIE7 || Ext.isIEQuirks) {
            var dFrag = document.createDocumentFragment(),
                method, selector;

            //IE removed getElementById from documentFragment in later browsers
            if (dFrag.getElementById) {
                method = 'getElementById';
                selector = '';
            } else {
                method = 'querySelector';
                selector = '#';
            }

            dFrag.appendChild(frag.dom);

            lockedElements = [
                dFrag[method](selector + component.id + '-targetEl'),
                dFrag[method](selector + component.id + '-innerCt'),
                dFrag[method](selector + lockedGrid.id),
                dFrag[method](selector + lockedGrid.body.id),
                dFrag[method](selector + lockedGrid.body.child('.x-grid-view').id)
            ];
            normalElements = [
                dFrag[method](selector + normalGrid.id),
                dFrag[method](selector + normalGrid.headerCt.id),
                dFrag[method](selector + normalGrid.body.id),
                dFrag[method](selector + normalGrid.getView().id)
            ];

            Ext.Array.each(lockedElements, function (el) {
                if (el !== null) {
                    el.style.height = '100%';
                    el.style.width = '100%';
                }
            });

            Ext.Array.each(normalElements, function (el, idx) {
                if (el !== null) {
                    if (idx === 1) {
                        el.style.width = '100%';
                    } else {
                        el.style.height = '100%';
                        el.style.width = '100%';
                    }
                }
            });

            frag.dom.innerHTML = dFrag.firstChild.innerHTML;
        } else {
            lockedElements = [
                frag.select('#' + component.id + '-targetEl').first(),
                frag.select('#' + component.id + '-innerCt').first(),
                frag.select('#' + lockedGrid.id).first(),
                frag.select('#' + lockedGrid.body.id).first(),
                frag.select('#' + lockedGrid.body.child('.x-grid-view').id).first()
            ];
            normalElements = [
                frag.select('#' + normalGrid.id).first(),
                frag.select('#' + normalGrid.headerCt.id).first(),
                frag.select('#' + normalGrid.body.id).first(),
                frag.select('#' + normalGrid.getView().id).first()
            ];

            Ext.Array.each(lockedElements, function (el, idx) {
                if (el) {
                    el.setHeight('100%');
                    idx !== 3 && el.setWidth('100%');
                }
            });

            Ext.Array.each(normalElements, function (el, idx) {
                //don't change height of the header, just width
                if (idx === 1) {
                    el.setWidth('100%');
                } else {
                    el.applyStyles({
                        height: '100%',
                        width: '100%'
                    });
                }
            });
        }

        return frag;
    },

    //Private used to prevent using old reference in the response callbacks
    getWin: function () {
        return this.win || null;
    },

    //Private.
    onSuccess: function (response, callback, errback) {
        var me = this,
            win = me.getWin(),
            result;

        try {
            result = Ext.JSON.decode(response.responseText);
        } catch (e) {
            this.onFailure(response, errback);
            return;
        }

        //set progress to 100%
        me.fireEvent('updateprogressbar', 1);

        if (result.success) {
            //close print widget
            setTimeout(function () {

                //fire event for hiding window
                me.fireEvent('hidedialogwindow');
                me.unmask();

                if (me.openAfterExport) {
                    window.open(result.url, 'ExportedPanel');
                }
            }, win ? win.hideTime : 3000);
        } else {
            //show error message in print widget window
            me.fireEvent('showdialogerror', win, result.msg);
            me.unmask();
        }

        if (callback) {
            callback.call(this, response);
        }
    },

    //Private.
    onFailure: function (response, errback) {
        var win = this.getWin(),
            msg = response.statusText;

        this.fireEvent('showdialogerror', win, msg);
        this.unmask();

        if (errback) {
            errback.call(this, response);
        }
    },

    /*
    * @private 
    * Hide rows from the panel that are not needed on current export page by adding css class to them.
    *
    * @param {Int} rowsAmount Amount of rows to be hidden.
    * @param {Int} page Current page number.
    */
    hideRows: function (rowsAmount, page) {
        var lockedRows = this.scheduler.lockedGrid.getEl().select('.x-grid-row'),
            normalRows = this.scheduler.normalGrid.getEl().select('.x-grid-row'),
            start = rowsAmount * page,
            end = start + rowsAmount;

        for (var i = 0; i < normalRows.elements.length; i += 1) {
            if (i < start || i >= end) {
                lockedRows.elements[i].className += ' sch-none';
                normalRows.elements[i].className += ' sch-none';
            }
        }
    },

    /*
    * @private 
    * Unhide all rows of the panel by removing the previously added css class from them.
    */
    showRows: function () {
        var lockedRows = this.scheduler.lockedGrid.getEl().select('.x-grid-row'),
            normalRows = this.scheduler.normalGrid.getEl().select('.x-grid-row');

        lockedRows.each(function (el) {
            el.removeCls('sch-none');
        });
        normalRows.each(function (el) {
            el.removeCls('sch-none');
        });
    },

    hideLockedColumns: function (startColumn, endColumn) {
        var lockedColumns = this.scheduler.lockedGrid.headerCt.items.items;

        for (var i = 0, l = lockedColumns.length; i < l; i += 1) {
            if (i < startColumn || i > endColumn) {
                lockedColumns[i].hide();
            }
        }
    },

    showLockedColumns: function () {
        this.scheduler.lockedGrid.headerCt.items.each(function (column) {
            column.show();
        });
    },

    /*
    * @private 
    * Mask the body, hiding panel to allow changing it's parameters in the background.
    */
    mask: function () {
        var mask = Ext.getBody().mask();
        mask.addCls('sch-export-mask');
    },

    //Private.
    unmask: function () {
        Ext.getBody().unmask();
    },

    /*
    * @private 
    * Restore panel to pre-export state.
    */
    restorePanel: function () {
        var s = this.scheduler,
            config = this.restoreSettings;

        s.setWidth(config.width);
        s.setHeight(config.height);
        s.setTimeSpan(config.startDate, config.endDate);
        s.setTimeColumnWidth(config.columnWidth, true);
        s.getSchedulingView().setRowHeight(config.rowHeight);
        s.lockedGrid.show();
        s.normalGrid.setWidth(config.normalWidth);
        s.normalGrid.getEl().setStyle('left', config.normalLeft);
        s.lockedGrid.setWidth(config.lockedWidth);
    },

    destroy: function () {
        if (this.win) {
            this.win.destroy();
        }
    }
});
/**
@class Sch.plugin.Lines
@extends Sch.feature.AbstractTimeSpan
 
Plugin for showing "global" time lines in the scheduler grid. It uses a store to populate itself, records in this store should have the following fields:

- `Date` The date of the line
- `Text` The Text to show when hovering over the line (optional)
- `Cls`  A CSS class to add to the line (optional)

To add this plugin to scheduler:

var dayStore    = new Ext.data.Store({
fields  : [ 'Date', 'Text', 'Cls' ],
            
data    : [
{
Date        : new Date(2011, 06, 19),
Text        : 'Some important day'
}
]
}); 


var scheduler = Ext.create('Sch.panel.SchedulerGrid', {
...
    
resourceStore   : resourceStore,
eventStore      : eventStore,
            
plugins         : [
Ext.create('Sch.plugin.Lines', { store : dayStore })
]
});


*/
Ext.define("Sch.plugin.Lines", {
    extend: "Sch.feature.AbstractTimeSpan",

    cls: 'sch-timeline',

    /**
    * @cfg {Boolean} showTip 'true' to include a native browser tooltip when hovering over the line.
    */
    showTip: true,

    /**
    * @cfg {String/Ext.XTemplate} innerTpl A template providing additional markup to render into each timespan element
    */
    innerTpl: null,

    init: function (scheduler) {
        this.callParent(arguments);

        var view = this.schedulerView;

        if (Ext.isString(this.innerTpl)) {
            this.innerTpl = new Ext.XTemplate(this.innerTpl);
        }

        var innerTpl = this.innerTpl;

        if (!this.template) {
            this.template = new Ext.XTemplate(
                '<tpl for=".">',
                    '<div id="' + this.uniqueCls + '-{id}"' + (this.showTip ? 'title="{[this.getTipText(values)]}" ' : '') + 'class="' + this.cls + ' ' + this.uniqueCls + ' {Cls}" style="left:{left}px;top:{top}px;height:{height}px;width:{width}px">' +
                    (innerTpl ? '{[this.renderInner(values)]}' : '') +
                    '</div>',
                '</tpl>',
                {
                    getTipText: function (values) {
                        return view.getFormattedDate(values.Date) + ' ' + (values.Text || "");
                    },

                    renderInner: function (values) {
                        return innerTpl.apply(values);
                    }
                }
            );
        }
    },


    getElementData: function (viewStart, viewEnd, records) {
        var s = this.store,
            scheduler = this.schedulerView,
            rs = records || s.getRange(),
            data = [],
            r, date, region;

        for (var i = 0, l = rs.length; i < l; i++) {
            r = rs[i];
            date = r.get('Date');

            if (date && Sch.util.Date.betweenLesser(date, viewStart, viewEnd)) {
                region = scheduler.getTimeSpanRegion(date, null, this.expandToFitView);

                data[data.length] = Ext.apply({
                    id: r.internalId,

                    left: region.left,
                    top: region.top,
                    width: 1,
                    height: region.bottom - region.top
                }, r.data);
            }
        }
        return data;
    }
});

/**
@class Sch.plugin.CurrentTimeLine
@extends Sch.plugin.Lines

Plugin indicating the current date and time as a line in the schedule. 

To add this plugin to scheduler:

var scheduler = Ext.create('Sch.panel.SchedulerGrid', {
...
    
resourceStore   : resourceStore,
eventStore      : eventStore,
            
plugins         : [
Ext.create('Sch.plugin.CurrentTimeLine', { updateInterval : 30000 })
]
});


*/
Ext.define("Sch.plugin.CurrentTimeLine", {
    extend: "Sch.plugin.Lines",

    /**
    * @cfg {String} tooltipText The text to show in the tooltip next to the current time (defaults to 'Current time').
    */
    tooltipText: 'Current time',

    /**
    * @cfg {Int} updateInterval This value (in ms) defines how often the timeline shall be refreshed. Defaults to every once every minute.
    */
    updateInterval: 60000,

    /**
    * @cfg {Boolean} autoUpdate true to automatically update the line position over time. Default value is `true`
    */
    autoUpdate: true,

    expandToFitView: true,

    init: function (cmp) {
        var store = Ext.create("Ext.data.JsonStore", {
            fields: ['Date', 'Cls', 'Text'],
            data: [{ Date: new Date(), Cls: 'sch-todayLine', Text: this.tooltipText}]
        });

        var record = store.first();

        if (this.autoUpdate) {
            this.runner = Ext.create("Ext.util.TaskRunner");
            this.runner.start({
                run: function () {
                    record.set('Date', new Date());
                },
                interval: this.updateInterval
            });
        }

        cmp.on('destroy', this.onHostDestroy, this);

        this.store = store;
        this.callParent(arguments);
    },

    onHostDestroy: function () {
        if (this.runner) {
            this.runner.stopAll();
        }

        if (this.store.autoDestroy) {
            this.store.destroy();
        }
    }
});

/**
@class Sch.plugin.DragSelector
@extends Ext.util.Observable

Plugin for selecting multiple events by "dragging" an area in the scheduler chart. Currently only enabled **when CTRL is pressed**

{@img scheduler/images/drag-selector.png}

To add this plugin to scheduler:

var scheduler = Ext.create('Sch.panel.SchedulerGrid', {
...
    
resourceStore   : resourceStore,
eventStore      : eventStore,
            
plugins         : [
Ext.create('Sch.plugin.DragSelector')
]
});


*/
Ext.define("Sch.plugin.DragSelector", {
    extend: "Sch.util.DragTracker",
    mixins: ['Ext.AbstractPlugin'],
    lockableScope: 'normal',

    constructor: function (cfg) {
        cfg = cfg || {};

        Ext.applyIf(cfg, {
            onBeforeStart: this.onBeforeStart,
            onStart: this.onStart,
            onDrag: this.onDrag,
            onEnd: this.onEnd
        });

        this.callParent(arguments);
    },

    init: function (scheduler) {
        scheduler.on({
            afterrender: this.onSchedulerRender,
            destroy: this.onSchedulerDestroy,
            scope: this
        });

        this.scheduler = scheduler;
    },

    onBeforeStart: function (e) {
        return e.ctrlKey;
    },

    onStart: function (e) {
        var schedulerView = this.schedulerView;

        if (!this.proxy) {
            this.proxy = schedulerView.el.createChild({ cls: 'sch-drag-selector x-view-selector' });
        } else {
            this.proxy.show();
        }
        this.bodyRegion = schedulerView.getScheduleRegion();

        var eventData = [];
        schedulerView.getEventNodes().each(function (el) {
            eventData[eventData.length] = {
                region: el.getRegion(),
                node: el.dom
            };
        }, this);

        this.eventData = eventData;

        this.sm.deselectAll();
    },

    onDrag: function (e) {
        var sm = this.sm,
            eventData = this.eventData,
            dragRegion = this.getRegion().constrainTo(this.bodyRegion),
            i, ev, len, sel;

        this.proxy.setRegion(dragRegion);

        for (i = 0, len = eventData.length; i < len; i++) {
            ev = eventData[i];
            sel = dragRegion.intersect(ev.region);

            if (sel && !ev.selected) {
                ev.selected = true;
                sm.selectNode(ev.node, true);
            } else if (!sel && ev.selected) {
                ev.selected = false;
                sm.deselectNode(ev.node);
            }
        }
    },

    onEnd: function (e) {
        if (this.proxy) {
            this.proxy.setDisplayed(false);
        }
    },

    onSchedulerRender: function (s) {
        this.sm = s.getEventSelectionModel();
        this.schedulerView = s.getSchedulingView();
        this.initEl(s.el);
    },

    onSchedulerDestroy: function () {
        Ext.destroy(this.proxy);

        this.destroy();
    }
});


/**
@class Sch.plugin.EventEditor
@extends Ext.form.FormPanel

A plugin used to edit event start/end dates as well as any meta data. It inherits from {@link Ext.form.FormPanel} so you can define any fields and use any layout you want.

{@img scheduler/images/event-editor.png}

Normally, this plugin shows the same form for all events. However you can show different forms for different event types. To do that:

- the event type is supposed to be provided as the value of the `EventType` field in the event model.
- in the {@link #fieldsPanelConfig} provide the container with card layout. The children of that container should be the forms which will be used to edit different 
event types
- each such form should contain the `EventType` configuration option, matching to the appropriate event type.
- the small top form, containing the start date, start time and duration fields is always shared among all forms.
- this whole behavior can be disabled with the `dynamicForm : false` option.

The overall picture will look like:
fieldsPanelConfig : {
xtype       : 'container',
                
layout      : 'card',
                    
items       : [
// form for "Meeting" EventType
{
EventType   : 'Meeting',
                        
xtype       : 'form',
                        
items       : [
...
]                    
},
// eof form for "Meeting" EventType
                    
// form for "Appointment" EventType
{
EventType   : 'Appointment',
                        
xtype       : 'form',
                        
items       : [
...
]                    
}
// eof form for "Appointment" EventType
]
}   

Note, that you can customize the start date, start time and duration fields with appropriate configuration options: {@link #dateConfig}, {@link #timeConfig}, {@link #durationConfig}


var eventEditor    = Ext.create('Sch.plugin.EventEditor', {
...
timeConfig      : {
minValue    : '08:00',
maxValue    : '18:00'
},
...
}); 


var scheduler = Ext.create('Sch.panel.SchedulerGrid', {
...
    
resourceStore   : resourceStore,
eventStore      : eventStore,
            
plugins         : [
eventEditor
]
});


If you include additional components which have floating sub-components, such as combo boxes or date pickers -
you need to decorate them with a special CSS class so the editor will stay open when clicking 'outside' of the editor element.

var myComboBox = new Ext.form.ComboBox({
width           : 70,
...
});

// Tell the editor that this component and its picker are part of the editor, clicking them should not hide the editor.
myComboBox.getPicker().addCls('sch-event-editor-ignore-click');

*/
Ext.define("Sch.plugin.EventEditor", {
    extend: "Ext.form.FormPanel",
    mixins: ['Ext.AbstractPlugin'],
    alias: 'widget.eventeditor',

    lockableScope: 'normal',

    requires: [
        'Sch.util.Date'
    ],

    /**
    * @cfg {String} saveText The text to show on the save button
    */
    saveText: 'Save',

    /**
    * @cfg {String} deleteText The text to show on the delete button
    */
    deleteText: 'Delete',

    /**
    * @cfg {String} cancelText The text to show on the cancel button
    */
    cancelText: 'Cancel',

    /**
    * @cfg {Boolean} hideOnBlur True to hide this panel if a click is detected outside the panel (defaults to true)
    */
    hideOnBlur: true,

    /**
    * This property provides access to the start date field 
    * @property {Ext.form.field.Date} startDateField
    */
    startDateField: null,

    /**
    * This property provides access to the start time field
    * @property {Ext.form.field.Time} startTimeField
    */
    startTimeField: null,

    /**
    * This property provides access to the duration spinner field 
    * @property {Ext.form.field.Number} durationField
    */
    durationField: null,

    /**
    * @cfg {Object} timeConfig Config for the `startTimeField` constructor.
    */
    timeConfig: null,

    /**
    * @cfg {Object} dateConfig Config for the `startDateField` constructor.
    */
    dateConfig: null,

    /**
    * @cfg {Object} durationConfig A custom config object that is used to configure the {@link Ext.form.field.Number duration field}.
    */
    durationConfig: null,

    /**
    * @cfg {String} durationUnit The unit in which the duration is measured, defaults to Sch.util.Date.HOUR.
    */
    durationUnit: null,

    /**
    * @cfg {String} durationText The text to show after the duration spinner field
    */
    durationText: null,

    /**
    * @cfg {String} triggerEvent The event that shall trigger showing the editor. Defaults to 'eventdblclick', set to '' or null to disable editing of existing events.
    */
    triggerEvent: 'eventdblclick',

    /**
    * @cfg {Object} fieldsPanelConfig A panel config representing your fields that is associated with a scheduled event.
    * 
    * Example:
     
    fieldsPanelConfig : {
    layout      : 'form',
            
    style       : 'background : #fff',
    border      : false,
    cls         : 'editorpanel',
    labelAlign  : 'top',
            
    defaults    : {
    width : 135
    },
            
    items       : [
    titleField      = new Ext.form.TextField({
    name            : 'Title',
    fieldLabel      : 'Task'
    }),
                
    locationField   = new Ext.form.TextField({
    name            : 'Location',
    fieldLabel      : 'Location'
    })
    ]
    }
    * 
    */
    fieldsPanelConfig: null,

    /**
    * @cfg {String} dateFormat This config parameter is passed to the `startDateField` constructor.
    */
    dateFormat: 'Y-m-d',

    /**
    * @cfg {String} timeFormat This config parameter is passed to the `startTimeField` constructor.
    */
    timeFormat: 'H:i',


    cls: 'sch-eventeditor',
    border: false,
    shadow: false,

    /**
    * @cfg {Boolean} dynamicForm True to use several forms. Default is `true`.
    */
    dynamicForm: true,

    /**
    * @property {Ext.data.Model} eventRecord The current {@link Sch.model.Event} record, which is being edited by the event editor 
    */
    eventRecord: null,

    hidden: true,
    collapsed: true,
    currentForm: null,
    scheduler: null,
    schedulerView: null,
    preventHeader: true,
    floating: true,
    hideMode: 'offsets',
    ignoreCls: 'sch-event-editor-ignore-click',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    /**
    * @cfg {Boolean} constrain Pass `true` to enable the constraining - ie editor panel will not exceed the document edges. This option will disable the animation
    * during the expansion. Default value is `false`.  
    */
    constrain: false,

    constructor: function (config) {
        config = config || {};
        Ext.apply(this, config);

        this.durationUnit = this.durationUnit || Sch.util.Date.HOUR;

        this.addEvents(
        /**
        * @event beforeeventdelete
        * Fires before an event is deleted (return false to cancel the operation)
        * @param {Sch.plugin.EventEditor} editor The editor instance
        * @param {Ext.data.Model} eventRecord The record about to be deleted
        */
            'beforeeventdelete',

        /**
        * @event beforeeventsave
        * Fires before an event is saved (return false to cancel the operation)
        * @param {Sch.plugin.EventEditor} editor The editor instance
        * @param {Ext.data.Model} eventRecord The record about to be saved
        */
            'beforeeventsave'
        );

        this.callParent(arguments);
    },


    initComponent: function () {

        if (!this.fieldsPanelConfig) throw 'Must define a fieldsPanelConfig property';

        Ext.apply(this, {
            fbar: this.buttons || this.buildButtons(),

            items: [
                {
                    layout: 'hbox',
                    height: 35,
                    border: false,
                    cls: 'sch-eventeditor-timefields',

                    items: this.buildDurationFields()
                },
                Ext.applyIf(this.fieldsPanelConfig, {
                    flex: 1,
                    activeItem: 0
                })
            ]
        });

        this.callParent(arguments);
    },


    init: function (scheduler) {
        // setting the ownerCt helps a possible container of the scheduler (such as a window), to not try to
        // position itself above the editor, since it's in sort of a "child" of the Window component in that case.
        this.ownerCt = scheduler;

        this.scheduler = scheduler;
        this.schedulerView = scheduler.getSchedulingView();
        this.eventStore = scheduler.getEventStore();

        this.schedulerView.on({
            afterrender: this.onSchedulerRender,
            destroy: this.onSchedulerDestroy,
            dragcreateend: this.onDragCreateEnd,

            scope: this
        });

        if (this.triggerEvent) {
            this.schedulerView.on(this.triggerEvent, this.onActivateEditor, this);
        }

        this.schedulerView.registerEventEditor(this);
    },


    onSchedulerRender: function () {
        this.render(Ext.getBody());

        if (this.hideOnBlur) {
            // Hide when clicking outside panel
            this.mon(Ext.getDoc(), 'mousedown', this.onMouseDown, this);
        }
    },


    /**
    * Expands the editor
    * @param {Ext.data.Model} eventRecord The record to show in the editor panel
    */
    show: function (eventRecord, alignToEl) {

        // Only show delete button if the event belongs to a store
        if (this.deleteButton) {
            this.deleteButton.setVisible(this.eventStore.indexOf(eventRecord) >= 0);
        }

        this.eventRecord = eventRecord;

        // Manually set the duration field value
        this.durationField.setValue(Sch.util.Date.getDurationInUnit(eventRecord.getStartDate(), eventRecord.getEndDate(), this.durationUnit));

        var startDate = eventRecord.getStartDate();
        this.startDateField.setValue(startDate);
        this.startTimeField.setValue(startDate);

        // If the scheduler we're attached to is inside a floating component (window etc)
        // we need to make sure we're on top of it at show time.
        var floatingContainer = this.scheduler.up('[floating=true]');
        if (floatingContainer) {
            this.getEl().setZIndex(floatingContainer.getEl().getZIndex() + 1);
            floatingContainer.addCls(this.ignoreCls);
        }

        this.callParent();

        alignToEl = alignToEl || this.schedulerView.getElementFromEventRecord(eventRecord);

        this.alignTo(alignToEl, this.scheduler.orientation == 'horizontal' ? 'bl' : 'tl-tr', this.getConstrainOffsets(alignToEl));

        this.expand(!this.constrain);

        if (this.constrain) {
            this.doConstrain(Ext.util.Region.getRegion(Ext.getBody()));
        }

        var form,
            eventType = eventRecord.get('EventType');

        if (eventType && this.dynamicForm) {
            var fieldsPanel = this.items.getAt(1),
                forms = fieldsPanel.query('> component[EventType=' + eventType + ']');

            if (!forms.length) {
                throw "Can't find form for EventType=" + eventType;
            }
            if (!fieldsPanel.getLayout().setActiveItem) {
                throw "Can't switch active component in the 'fieldsPanel'";
            }

            form = forms[0];

            if (!(form instanceof Ext.form.Panel)) {
                throw "Each child component of 'fieldsPanel' should be a 'form'";
            }

            fieldsPanel.getLayout().setActiveItem(form);
        } else {
            form = this;
        }

        this.currentForm = form;

        // get the "basicForm" from current form and load it from event record
        form.getForm().loadRecord(eventRecord);
    },

    // Override this to add support for constraining the editor panel to the viewport or scheduler
    getConstrainOffsets: function (eventEl) {
        return [0, 0];
    },

    onSaveClick: function () {
        var formPanel = this,
            record = formPanel.eventRecord,
            form = this.currentForm.getForm();

        if (form.isValid() && this.fireEvent('beforeeventsave', this, record) !== false) {

            var startDate = formPanel.startDateField.getValue(),
                endDate,
                startTime = formPanel.startTimeField.getValue(),
                duration = formPanel.durationField.getValue();

            if (startDate && duration >= 0) {

                if (startTime) {
                    Sch.util.Date.copyTimeValues(startDate, startTime);
                }

                endDate = Sch.util.Date.add(startDate, this.durationUnit, duration);
            } else {
                return;
            }

            // Manually locate the event resource for new records
            var resource = record.getResource() || this.resourceRecord;

            if (!this.schedulerView.allowOverlap && !this.schedulerView.isDateRangeAvailable(startDate, endDate, record, resource)) {
                return;
            }

            record.beginEdit();

            // wrap the call to `updateRecord` with the code, which
            // disables the `endEdit` method of the record
            // this will prevent the double "update" event from being fired (and double "sync" call) 
            // (as we need to batch the form update with our own updates)
            // this is ugly, but `updateRecord` should been really providing the parameter 
            // to omit the `beginUpdate/endUpdate` calls..
            var prevEndEdit = record.endEdit;
            record.endEdit = Ext.emptyFn;

            form.updateRecord(record);

            record.endEdit = prevEndEdit;

            record.setStartDate(startDate);
            record.setEndDate(endDate);

            record.endEdit();

            // Check if this is a new record
            if (this.eventStore.indexOf(this.eventRecord) < 0) {
                if (this.schedulerView.fireEvent('beforeeventadd', this.schedulerView, record) !== false) {
                    this.eventStore.add(record);
                }
            }
            formPanel.collapse(null, true);
        }
    },


    onDeleteClick: function () {
        if (this.fireEvent('beforeeventdelete', this, this.eventRecord) !== false) {
            this.eventStore.remove(this.eventRecord);
        }
        this.collapse(null, true);
    },


    onCancelClick: function () {
        this.collapse(null, true);
    },

    buildButtons: function () {

        this.saveButton = new Ext.Button({
            text: this.saveText,

            scope: this,
            handler: this.onSaveClick
        });

        this.deleteButton = new Ext.Button({
            text: this.deleteText,

            scope: this,
            handler: this.onDeleteClick
        });

        this.cancelButton = new Ext.Button({
            text: this.cancelText,

            scope: this,
            handler: this.onCancelClick
        });

        return [this.saveButton, this.deleteButton, this.cancelButton];
    },


    buildDurationFields: function () {

        this.startDateField = new Ext.form.field.Date(Ext.apply({
            width: 90,
            allowBlank: false,
            format: this.dateFormat
        }, this.dateConfig || {}));

        this.startDateField.getPicker().addCls(this.ignoreCls);

        this.startTimeField = new Ext.form.field.Time(Ext.apply({
            width: 70,
            style: 'margin-left : 5px',
            allowBlank: false,
            format: this.timeFormat

        }, this.timeConfig || {}));

        this.startTimeField.getPicker().addCls(this.ignoreCls);

        this.durationField = new Ext.form.field.Number(Ext.apply({

            width: 45,

            value: 0,

            minValue: 0,
            allowNegative: false,

            style: 'margin-left : 15px'
        }, this.durationConfig || {}));


        this.durationLabel = Ext.create("Ext.form.Label", {
            text: this.getDurationText(),

            style: 'margin-left : 5px'
        });

        return [this.startDateField, this.startTimeField, this.durationField, this.durationLabel];
    },


    onActivateEditor: function (g, evtRecord) {
        this.show(evtRecord);
    },


    onMouseDown: function (e) {

        if (
            this.collapsed || e.within(this.getEl()) ||
        // ignore the click on the menus and combo-boxes (which usually floats as the direct child of <body> and
        // leaks through the `e.within(this.getEl())` check

        // if clicks should be ignored for any other element - it should have this class
            e.getTarget('.' + this.ignoreCls, 9)
        ) {
            return;
        }

        this.collapse();
    },


    onSchedulerDestroy: function () {
        this.destroy();
    },


    onDragCreateEnd: function (s, eventRecord, resourceRecord) {
        if (!this.dragProxyEl && this.schedulerView.dragCreator) {
            this.dragProxyEl = this.schedulerView.dragCreator.getProxy();
        }

        this.resourceRecord = resourceRecord;

        // Call scheduler template method
        this.schedulerView.onEventCreated(eventRecord);

        this.show(eventRecord, this.dragProxyEl);
    },

    hide: function () {
        this.callParent(arguments);
        var dpEl = this.dragProxyEl;

        if (dpEl) {
            dpEl.hide();
        }
    },

    // Always hide drag proxy on collapse
    afterCollapse: function () {
        // currently the header is kept even after collapse, so need to hide the form completely
        this.hide();

        this.callParent(arguments);
    },


    getDurationText: function () {
        if (this.durationText) {
            return this.durationText;
        }

        return Sch.util.Date.getShortNameOfUnit(Sch.util.Date.getNameOfUnit(this.durationUnit));
    }
});

/**
@class Sch.plugin.EventTools
@extends Ext.Container

A plugin showing a tools menu with event actions when the mouse hovers over a rendered event in the timeline. 
Each tool can also define a visibleFn, which is called before the tools menu is shown. This allows you to get control over which actions
can be performed on which events.

Sample usage:
    
plugins : [
Ext.create('Sch.plugin.EventTools', {
items : [
{ type: 'details',  handler: onToolClick, tooltip: 'Show Event Details' },
{ type: 'edit',     handler: onToolClick, tooltip: 'Edit Event' },
{ type: 'repeat',   handler: onToolClick, tooltip: 'Repeat Event' },
{ type: 'drop',     handler: onToolClick, tooltip: 'Remove Event', visibleFn: function(model) { return !!model.get('Deletable'); } }
]
})
]

*/
Ext.define('Sch.plugin.EventTools', {
    extend: 'Ext.Container',
    mixins: ['Ext.AbstractPlugin'],
    lockableScope: 'normal',

    /**
    * @cfg {Int} hideDelay The menu will be hidden after this number of ms, when the mouse leaves the tools element. 
    */
    hideDelay: 500,

    /**
    * @cfg {String} align The alignment of the tools menu
    */
    align: 'right',

    /**
    * @cfg {Object} defaults The defaults for each action item in the tools menu
    */
    defaults: {
        xtype: 'tool',
        baseCls: 'sch-tool',
        overCls: 'sch-tool-over',
        width: 20,
        height: 20,
        visibleFn: Ext.emptyFn
    },

    // private
    fadeOutTimer: null,

    // private
    lastTarget: null,

    // private
    lastPosition: null,

    // private
    cachedSize: null,

    // private
    offset: { x: 0, y: 1 },

    autoRender: true,
    floating: true,
    hideMode: 'offsets',

    /**
    * Returns the record that this tools menu is currently associated with
    * @return {Sch.model.Event} record The event record
    */
    getRecord: function () {
        return this.record;
    },

    init: function (scheduler) {
        if (!this.items) throw 'Must define items property for this plugin to function correctly';

        // Let client use 'cls' property
        this.addCls('sch-event-tools');

        this.scheduler = scheduler;

        scheduler.on({
            // Suspend during resize
            'eventresizestart': this.onOperationStart,
            'eventresizeend': this.onOperationEnd,

            // Suspend during drag drop
            'eventdragstart': this.onOperationStart,
            'eventdrop': this.onOperationEnd,

            'eventmouseenter': this.onEventMouseEnter,
            'eventmouseleave': this.onContainerMouseLeave,

            scope: this
        });
    },

    onRender: function () {
        this.callParent(arguments);

        this.scheduler.mon(this.el, {
            'mouseenter': this.onContainerMouseEnter,
            'mouseleave': this.onContainerMouseLeave,
            scope: this
        });
    },

    onEventMouseEnter: function (sch, model, event) {
        if (!this.rendered) {
            this.doAutoRender();
            this.hide();
        }

        var node = event.getTarget(sch.eventSelector);
        var box = Ext.fly(node).getBox();

        this.lastTarget = node;
        this.record = model;

        this.items.each(function (tool) {
            tool.setVisible(tool.visibleFn(model) !== false);
        }, this);

        this.doLayout();

        // Needs to be done after doLayout
        var size = this.getSize();

        this.lastPosition = [
            event.getXY()[0] - (size.width / 2),
            box.y - size.height - this.offset.y
        ];
        this.onContainerMouseEnter();
    },

    onContainerMouseEnter: function () {
        window.clearTimeout(this.fadeOutTimer);
        this.setPosition.apply(this, this.lastPosition);
        this.el.fadeIn();
    },

    onContainerMouseLeave: function () {
        window.clearTimeout(this.fadeOutTimer);
        this.fadeOutTimer = Ext.defer(this.el.fadeOut, this.hideDelay, this.el);
    },

    onOperationStart: function () {
        this.scheduler.un("eventmouseenter", this.onEventMouseEnter, this);
        window.clearTimeout(this.fadeOutTimer);
        this.hide();
    },

    // Bypass regular hide
    hide: function () {
        this.el.hide();
    },

    onOperationEnd: function () {
        this.scheduler.on("eventmouseenter", this.onEventMouseEnter, this);
    }
});



/**
@class Sch.plugin.Pan

A plugin enabling panning by clicking and dragging in a scheduling view.

To add this plugin to your scheduler or gantt view:

var scheduler = Ext.create('Sch.panel.SchedulerGrid', {
...
    
resourceStore   : resourceStore,
eventStore      : eventStore,
            
plugins         : [
Ext.create('Sch.plugin.Pan', { enableVerticalPan : true })
]
});


*/
Ext.define("Sch.plugin.Pan", {
    alias: 'plugin.pan',

    extend: 'Ext.AbstractPlugin',
    lockableScope: 'normal',

    /**
    * @cfg {Boolean} enableVerticalPan
    * True to allow vertical panning
    */
    enableVerticalPan: true,

    panel: null,


    constructor: function (config) {
        Ext.apply(this, config);
    },

    init: function (pnl) {
        this.panel = pnl.normalGrid || pnl;
        this.view = pnl.getSchedulingView();

        this.view.on('afterrender', this.onRender, this);
    },

    onRender: function (s) {
        this.view.el.on('mousedown', this.onMouseDown, this);
    },

    onMouseDown: function (e, t) {
        // ignore clicks on tasks and events
        if (e.getTarget('.' + this.view.timeCellCls, 10) && !e.getTarget(this.view.eventSelector)) {
            this.mouseX = e.getPageX();
            this.mouseY = e.getPageY();
            Ext.getBody().on('mousemove', this.onMouseMove, this);
            Ext.getDoc().on('mouseup', this.onMouseUp, this);

            // For IE (and FF if using frames), if you move mouse onto the browser chrome and release mouse button
            // we won't know about it. Next time mouse enters the body, cancel any ongoing pan activity as a fallback.
            if (Ext.isIE || Ext.isGecko) {
                Ext.getBody().on('mouseenter', this.onMouseUp, this);
            }

            // required for some weird chrome bug/behavior, when whole panel was scrolled-out
            e.stopEvent();
        }
    },

    onMouseMove: function (e) {
        e.stopEvent();

        var x = e.getPageX(),
            y = e.getPageY(),
            xDelta = x - this.mouseX,
            yDelta = y - this.mouseY;

        this.panel.scrollByDeltaX(-xDelta);
        this.mouseX = x;
        this.mouseY = y;

        if (this.enableVerticalPan) {
            this.panel.scrollByDeltaY(-yDelta);
        }
    },

    onMouseUp: function (e) {
        Ext.getBody().un('mousemove', this.onMouseMove, this);
        Ext.getDoc().un('mouseup', this.onMouseUp, this);

        if (Ext.isIE || Ext.isGecko) {
            Ext.getBody().un('mouseenter', this.onMouseUp, this);
        }
    }
});

/**
@class Sch.plugin.SimpleEditor
@extends Ext.Editor

Simple plugin for editing event names/titles inline.

{@img scheduler/images/simple-editor.png}

To add this plugin to scheduler:

var scheduler = Ext.create('Sch.panel.SchedulerGrid', {
...
    
resourceStore   : resourceStore,
eventStore      : eventStore,
            
plugins         : [
Ext.create('Sch.plugin.SimpleEditor', { dataIndex : 'Title' })
]
});


*/
Ext.define("Sch.plugin.SimpleEditor", {
    extend: "Ext.Editor",
    mixins: ['Ext.AbstractPlugin'],
    lockableScope: 'normal',


    cls: 'sch-simpleeditor',
    allowBlur: false,
    newEventText: 'New booking...',

    // private
    delegate: '.sch-event-inner',

    /**
    * @cfg {String} dataIndex Required. A field, containing the task's title. This field will be updated by the editor. Defaults to the value of the {@link Sch.model.Event#nameField}.
    */
    dataIndex: null,

    completeOnEnter: true,
    cancelOnEsc: true,
    ignoreNoChange: true,
    height: 19,

    autoSize: {
        width: 'boundEl' // The width will be determined by the width of the boundEl, the height from the editor (21)
    },


    constructor: function (config) {
        config = config || {};
        config.field = config.field || Ext.create("Ext.form.TextField", { selectOnFocus: true });
        this.callParent(arguments);
    },


    init: function (scheduler) {
        this.scheduler = scheduler.getSchedulingView();

        scheduler.on('afterrender', this.onSchedulerRender, this);
        this.scheduler.registerEventEditor(this);

        this.dataIndex = this.dataIndex || this.scheduler.getEventStore().model.prototype.nameField;
    },

    // Programmatically enter edit mode
    edit: function (record, el) {
        el = el || this.scheduler.getElementFromEventRecord(record);
        this.startEdit(el.child(this.delegate));
        this.record = record;
        this.setValue(this.record.get(this.dataIndex));
    },


    onSchedulerRender: function (scheduler) {

        this.on({
            startedit: this.onBeforeEdit,

            complete: function (editor, value, original) {
                var record = this.record;
                var eventStore = this.scheduler.eventStore;
                record.set(this.dataIndex, value);

                // Check if this is a new record
                if (eventStore.indexOf(record) < 0) {
                    if (this.scheduler.fireEvent('beforeeventadd', this.scheduler, record) !== false) {
                        eventStore.add(record);
                    }
                }

                this.onAfterEdit();
            },

            canceledit: this.onAfterEdit,

            hide: function () {
                if (this.dragProxyEl) {
                    this.dragProxyEl.hide();
                }
            },

            scope: this
        });

        scheduler.on({
            eventdblclick: function (s, r, e) {
                this.edit(r);
            },
            dragcreateend: this.onDragCreateEnd,
            scope: this
        });
    },

    onBeforeEdit: function () {
        if (!this.allowBlur) {
            // This should be removed when this bug is fixed:
            // http://www.sencha.com/forum/showthread.php?244580-4.1-allowBlur-on-Ext.Editor-not-working
            Ext.getBody().on('mousedown', this.onMouseDown, this);
            this.scheduler.on('eventmousedown', function () { this.cancelEdit(); }, this);
        }
    },

    onAfterEdit: function () {
        if (!this.allowBlur) {
            Ext.getBody().un('mousedown', this.onMouseDown, this);
            this.scheduler.un('eventmousedown', function () { this.cancelEdit(); }, this);
        }
    },

    onMouseDown: function (e, t) {
        if (this.editing && this.el && !e.within(this.el)) {
            this.cancelEdit();
        }
    },

    onDragCreateEnd: function (s, eventRecord) {
        if (!this.dragProxyEl && this.scheduler.dragCreator) {
            this.dragProxyEl = this.scheduler.dragCreator.getProxy();
        }

        // Call scheduler template method
        this.scheduler.onEventCreated(eventRecord);

        if (eventRecord.get(this.dataIndex) === '') {
            eventRecord.set(this.dataIndex, this.newEventText);
        }
        this.edit(eventRecord, this.dragProxyEl);
    }
});

/**
@class Sch.plugin.SummaryColumn
@extends Ext.grid.column.Column

Plugin, showing the currently allocated time for the resources. It will simply summarize the durations **of the events that are in the current view**. 
The information can be displayed as either a time unit or a percentage of the available time.

To add this plugin to scheduler:

var summaryCol = Ext.create("Sch.plugin.SummaryColumn", { 
header : 'Time allocated', 
width: 80,
showPercent : false 
});

var scheduler = Ext.create('Sch.panel.SchedulerGrid', {
resourceStore   : resourceStore,
eventStore      : eventStore,
            
columns         : [
...
summaryCol,
...
],

plugins : [summaryCol]
});

*/
Ext.define('Sch.plugin.SummaryColumn', {
    extend: "Ext.grid.column.Column",
    mixins: ['Ext.AbstractPlugin'],

    lockableScope: 'top',
    alias: "widget.summarycolumn",

    /**
    * @cfg {Boolean} showPercent True to show percentage values, false to show summarized time. Default value is `false`.
    */
    showPercent: false,

    /**
    * @cfg {Int} nbrDecimals The number of decimals to show, only applicable when `showPercent` is set to false
    */
    nbrDecimals: 1,

    sortable: false,
    fixed: true,
    menuDisabled: true,

    width: 80,
    dataIndex: '_sch_not_used',


    constructor: function (config) {
        this.scope = this;
        this.callParent(arguments);
    },


    init: function (scheduler) {
        // Only attach to a scheduler 
        if (!('eventStore' in scheduler)) return;

        this.scheduler = scheduler;

        // This plugin requires the scheduler to refresh its locked grid when the unlocked scheduler view is refreshed
        // e.g. when currently viewed timespan is changed.
        this.scheduler.lockedGridDependsOnSchedule = true;

        this.eventStore = scheduler.eventStore;
    },


    renderer: function (v, p, record) {
        var g = this.scheduler,
            s = this.eventStore,
            viewStart = g.getStart(),
            viewEnd = g.getEnd(),
            retVal = 0,
            totalAllocatedMinutesInView = this.calculate(record.getEvents(), viewStart, viewEnd);

        if (totalAllocatedMinutesInView <= 0) {
            return '';
        }

        if (this.showPercent) {
            var timeInView = Sch.util.Date.getDurationInMinutes(viewStart, viewEnd);
            return (Math.round((totalAllocatedMinutesInView * 100) / timeInView)) + ' %';
        } else {
            if (totalAllocatedMinutesInView > 1440) {
                return (totalAllocatedMinutesInView / 1440).toFixed(this.nbrDecimals) + ' ' + Sch.util.Date.getShortNameOfUnit("DAY");
            }
            if (totalAllocatedMinutesInView >= 30) {
                return (totalAllocatedMinutesInView / 60).toFixed(this.nbrDecimals) + ' ' + Sch.util.Date.getShortNameOfUnit("HOUR");
            }
            return totalAllocatedMinutesInView + ' ' + Sch.util.Date.getShortNameOfUnit("MINUTE");
        }
    },

    calculate: function (eventRecords, viewStart, viewEnd) {
        var totalTime = 0,
            eventStart,
            eventEnd,
            D = Sch.util.Date;

        Ext.each(eventRecords, function (eRec) {
            eventStart = eRec.getStartDate();
            eventEnd = eRec.getEndDate();

            if (D.intersectSpans(viewStart, viewEnd, eventStart, eventEnd)) {
                totalTime += D.getDurationInMinutes(D.max(eventStart, viewStart), D.min(eventEnd, viewEnd));
            }
        });

        return totalTime;
    }
});
/**
@class Sch.plugin.Zones
@extends Sch.feature.AbstractTimeSpan

Plugin for showing "global" zones in the scheduler grid, these can by styled easily using just CSS. 
To populate this plugin you need to pass it a store having the `Sch.model.Range` as the model.

{@img scheduler/images/scheduler-grid-horizontal.png}

To add this plugin to scheduler:

var zonesStore = Ext.create('Ext.data.Store', {
model   : 'Sch.model.Range',
data    : [
{
StartDate   : new Date(2011, 0, 6),
EndDate     : new Date(2011, 0, 7),
Cls         : 'myZoneStyle'
}
]
});

var scheduler = Ext.create('Sch.panel.SchedulerGrid', {
...
    
resourceStore   : resourceStore,
eventStore      : eventStore,
            
plugins         : [
Ext.create('Sch.plugin.Zones', { store : zonesStore })
]
});


*/
Ext.define("Sch.plugin.Zones", {
    extend: "Sch.feature.AbstractTimeSpan",

    /**
    * @cfg {String/Ext.XTemplate} innerTpl A template providing additional markup to render into each timespan element
    */
    innerTpl: null,

    requires: [
        'Sch.model.Range'
    ],

    cls: 'sch-zone',

    init: function (scheduler) {
        if (Ext.isString(this.innerTpl)) {
            this.innerTpl = new Ext.XTemplate(this.innerTpl);
        }

        var innerTpl = this.innerTpl;

        if (!this.template) {
            this.template = new Ext.XTemplate(
                '<tpl for=".">' +
                    '<div id="' + this.uniqueCls + '-{id}" class="' + this.cls + ' ' + this.uniqueCls + ' {Cls}" style="left:{left}px;top:{top}px;height:{height}px;width:{width}px;{style}">' +
                    (innerTpl ? '{[this.renderInner(values)]}' : '') +

                    '</div>' +
                '</tpl>',
                {
                    renderInner: function (values) {
                        return innerTpl.apply(values);
                    }
                }
            );
        }
        this.callParent(arguments);
    },


    getElementData: function (viewStart, viewEnd, records, isPrint) {
        var s = this.store,
            scheduler = this.schedulerView,
            rs = records || s.getRange(),
            data = [],
            r, spanStart, spanEnd, region;

        for (var i = 0, l = rs.length; i < l; i++) {
            r = rs[i];

            spanStart = r.getStartDate();
            spanEnd = r.getEndDate();

            if (spanStart && spanEnd && Sch.util.Date.intersectSpans(spanStart, spanEnd, viewStart, viewEnd)) {

                region = scheduler.getTimeSpanRegion(Sch.util.Date.max(spanStart, viewStart), Sch.util.Date.min(spanEnd, viewEnd), this.expandToFitView);

                var width = region.right - region.left;
                data[data.length] = Ext.apply({
                    id: r.internalId,

                    left: region.left,
                    top: region.top,
                    width: isPrint ? 0 : width,
                    height: region.bottom - region.top,

                    style: isPrint ? ('border-left-width:' + width + 'px') : "",
                    Cls: r.getCls()
                }, r.data);
            }
        }
        return data;
    }
});

/**
@class Sch.plugin.TimeGap
@extends Sch.plugin.Zones

Plugin for highlighting unallocated slots of time for all resources. You can use the `getZoneCls` method to customize the css class of the "gaps".

{@img scheduler/images/plugin-timegap.png}

To add this plugin to scheduler:

var scheduler = Ext.create('Sch.panel.SchedulerGrid', {
...
    
resourceStore   : resourceStore,
eventStore      : eventStore,
            
plugins         : [
Ext.create('Sch.plugin.TimeGap', {
                
getZoneCls : function (startDate, endDate) {
return 'myGapCls'
}
})
]
});

*/
Ext.define("Sch.plugin.TimeGap", {
    extend: "Sch.plugin.Zones",

    /**
    * An empty function by default, but provided so that you can return a custom CSS class for each unallocated zone area
    * @param {Date} start The start date of the unallocated time slot
    * @param {Date} end The end date of the unallocated time slot
    * @return {String} The CSS class to be applied to the zone element
    */
    getZoneCls: Ext.emptyFn,

    init: function (scheduler) {

        this.store = new Ext.data.JsonStore({
            model: 'Sch.model.Range'
        });

        this.scheduler = scheduler;

        scheduler.mon(scheduler.eventStore, {
            'load': this.populateStore,
            'update': this.populateStore,
            'remove': this.populateStore,
            'add': this.populateStore,
            'datachanged': this.populateStore,
            scope: this
        });

        scheduler.on('viewchange', this.populateStore, this);

        this.schedulerView = scheduler.getSchedulingView();

        this.callParent(arguments);
    },

    populateStore: function (eventStore) {
        var eventsInView = this.schedulerView.getEventsInView(),
            timeGaps = [],
            viewStart = this.scheduler.getStart(),
            viewEnd = this.scheduler.getEnd(),
            l = eventsInView.getCount(),
            cursor = viewStart,
            eventStart,
            index = 0,
            r;

        // Sort by start time    
        eventsInView.sortBy(function (r1, r2) {
            return r1.getStartDate() - r2.getStartDate();
        });

        r = eventsInView.getAt(0);

        while (cursor < viewEnd && index < l) {
            eventStart = r.getStartDate();

            if (!Sch.util.Date.betweenLesser(cursor, eventStart, r.getEndDate()) && cursor < eventStart) {
                timeGaps.push(new this.store.model({
                    StartDate: cursor,
                    EndDate: eventStart,
                    Cls: this.getZoneCls(cursor, eventStart) || ''
                }));
            }
            cursor = Sch.util.Date.max(r.getEndDate(), cursor);
            index++;
            r = eventsInView.getAt(index);
        }

        // Check if there's a gap between last cursor and view end time
        if (cursor < viewEnd) {
            timeGaps.push(new this.store.model({
                StartDate: cursor,
                EndDate: viewEnd,
                Cls: this.getZoneCls(cursor, viewEnd) || ''
            }));
        }

        // Don't refresh twice, the add will cause the zones to redraw
        this.store.removeAll(timeGaps.length > 0);
        this.store.add(timeGaps);
    }
});

/**
@class Sch.plugin.TreeCellEditing
@extends Ext.grid.plugin.CellEditing

A specialized "cell editing" plugin, purposed to correctly work with trees. Add it to your component (scheduler with tree view or gantt)
as usual grid plugin:

var gantt = Ext.create('Gnt.panel.Gantt', {
        
plugins             : [
Ext.create('Sch.plugin.TreeCellEditing', {
clicksToEdit: 1
})
],
...
})
*/
Ext.define("Sch.plugin.TreeCellEditing", {
    extend: "Ext.grid.plugin.CellEditing",

    init: function (pnl) {
        this._grid = pnl;

        this.on('beforeedit', this.checkReadOnly, this);

        this.callParent(arguments);
    },

    /* 
    * Checks if panel is not locked for editing, and prevents cell edits if needed
    */
    checkReadOnly: function () {
        var pnl = this._grid;

        if (!(pnl instanceof Sch.panel.TimelineTreePanel)) {
            pnl = pnl.up('tablepanel');
        }
        return !pnl.isReadOnly();
    },

    // IE7 breaks otherwise
    startEditByClick: function (view, cell, colIdx, record, row, rowIdx, e) {
        // do not start editing when click occurs on the expander icon
        if (e.getTarget(view.expanderSelector)) {
            return;
        }

        this.callParent(arguments);
    },


    startEdit: function (record, columnHeader) {
        // MODIFICATION
        if (!record || !columnHeader) {
            return;
        }
        // EOF MODIFICATION

        var me = this,
            ed = me.getEditor(record, columnHeader),
            value = record.get(columnHeader.dataIndex),
            context = me.getEditingContext(record, columnHeader);

        record = context.record;
        columnHeader = context.column;

        // Complete the edit now, before getting the editor's target
        // cell DOM element. Completing the edit causes a view refresh.
        me.completeEdit();

        //Re-read the value since the complete might have had side effects
        value = record.get(columnHeader.dataIndex);

        // See if the field is editable for the requested record
        if (columnHeader && !columnHeader.getEditor(record)) {
            return false;
        }

        if (ed) {
            context.originalValue = context.value = value;
            if (me.beforeEdit(context) === false || me.fireEvent('beforeedit', context) === false || context.cancel) {
                return false;
            }

            me.context = context;
            me.setActiveEditor(ed);
            me.setActiveRecord(record);
            me.setActiveColumn(columnHeader);

            // MODIFICATION
            me.grid.view.focusCell({ column: context.colIdx, row: context.rowIdx });
            // Defer, so we have some time between view scroll to sync up the editor
            //                                                        enables the value adjustment in the 'beforeedit' event 
            //                                                                         |         

            me.editTask.delay(15, me.showEditor, me, [ed, context, context.value]);
            // EOF MODIFICATION

        } else {
            // BrowserBug: WebKit & IE refuse to focus the element, rather
            // it will focus it and then immediately focus the body. This
            // temporary hack works for Webkit and IE6. IE7 and 8 are still
            // broken
            me.grid.getView().getEl(columnHeader).focus((Ext.isWebKit || Ext.isIE) ? 10 : false);
        }
    },


    showEditor: function (ed, context, value) {
        var me = this,
            record = context.record,
            columnHeader = context.column,
            sm = me.grid.getSelectionModel(),
            selection = sm.getCurrentPosition && sm.getCurrentPosition();

        me.context = context;
        me.setActiveEditor(ed);
        me.setActiveRecord(record);
        me.setActiveColumn(columnHeader);

        // Select cell on edit only if it's not the currently selected cell
        if (sm.selectByPosition && (!selection || selection.column !== context.colIdx || selection.row !== context.rowIdx)) {
            sm.selectByPosition({
                row: context.rowIdx,
                column: context.colIdx
            });
        }

        // MODIFICATION - passing `context` as 3rd arguments
        ed.startEdit(me.getCell(record, columnHeader), value, context);
        // EOF MODIFICATION
        me.editing = true;
        me.scroll = me.view.el.getScroll();
    },


    getEditingContext: function (record, columnHeader) {
        var me = this,
            grid = me.grid,
            store = grid.store,
            rowIdx,
            colIdx,
            view = grid.getView(),
            value;


        if (Ext.isNumber(record)) {
            rowIdx = record;
            record = store.getAt(rowIdx);
        } else {
            if (store instanceof Ext.data.Store) {
                rowIdx = store.indexOf(record);
            } else {
                rowIdx = view.indexOf(view.getNode(record));
            }
        }
        if (Ext.isNumber(columnHeader)) {
            colIdx = columnHeader;
            columnHeader = grid.headerCt.getHeaderAtIndex(colIdx);
        } else {
            colIdx = columnHeader.getIndex();
        }

        value = record.get(columnHeader.dataIndex);
        return {
            grid: grid,
            record: record,
            field: columnHeader.dataIndex,
            value: value,
            row: view.getNode(rowIdx),
            column: columnHeader,
            rowIdx: rowIdx,
            colIdx: colIdx
        };
    },

    startEditByPosition: function (position) {
        var me = this,
            grid = me.grid,
            sm = grid.getSelectionModel(),
            view = me.view,
            node = this.view.getNode(position.row),
            editColumnHeader = grid.headerCt.getHeaderAtIndex(position.column),
            editRecord = view.getRecord(node);

        if (sm.selectByPosition) {
            sm.selectByPosition(position);
        }
        me.startEdit(editRecord, editColumnHeader);
    },


    onEditComplete: function (ed, value, startValue) {
        var me = this,
            grid = me.grid,
            activeColumn = me.getActiveColumn(),
            sm = grid.getSelectionModel(),
            record;

        if (activeColumn) {
            record = me.context.record;

            me.setActiveEditor(null);
            me.setActiveColumn(null);
            me.setActiveRecord(null);

            if (!me.validateEdit()) {
                return;
            }

            // Only update the record if the new value is different than the
            // startValue. When the view refreshes its el will gain focus
            if (!me.context.doNotUpdateRecord && !record.isEqual(value, startValue)) {
                record.set(activeColumn.dataIndex, value);
            }

            // Restore focus back to the view's element.
            if (sm.setCurrentPosition) {
                sm.setCurrentPosition(sm.getCurrentPosition());
            }
            grid.getView().getEl(activeColumn).focus();

            me.context.value = value;
            me.fireEvent('edit', me, me.context);
        }
    },

    onSpecialKey: function (ed, field, e) {

        // Patch for change in 4.1.2
        // http://www.sencha.com/forum/showthread.php?242059-4.1.2-CellSelectionModel-grid-editing-plugin-used-for-TreePanel-editing
        if (!Ext.versions.extjs.equals('4.1.2.381')) {
            return this.callParent(arguments);
        }

        var me = this,
            grid = this.grid,
            sm;

        if (e.getKey() === e.TAB) {
            e.stopEvent();

            if (ed) {
                ed.onEditorTab(e);
            }

            sm = grid.getSelectionModel();
            if (sm.onEditorTab) {
                return sm.onEditorTab(grid === me.grid ? me : me.lockingPartner, e);
            }
        }
    }
});
/**
@class Sch.plugin.ResourceZones
@extends Sch.feature.AbstractTimeSpan

A plugin for visualizing resource specific meta data such as availability, used internally by the Scheduler.
To use this feature, assign an EventStore to the 'resourceZones' config on the main Scheduler panel class.

Records in the store should be regular {@link Sch.model.Event events} where you can specify the Resource, StartDate, EndDate and Cls (to set a CSS class on the rendered zone).
*/
Ext.define("Sch.plugin.ResourceZones", {
    extend: 'Sch.plugin.Zones',

    /**
    * @cfg {Sch.data.EventStore} store The store containing the meta 'events' to be rendered for each resource
    * @Required
    */
    store: null,

    cls: 'sch-resourcezone',

    getElementData: function (viewStart, viewEnd, records) {
        var store = this.store,
            view = this.schedulerView,
            data = [],
            spanStartDate, spanEndDate,
            resRegion;

        if (view.getNodes().length > 0) {
            Ext.each(records || store.getRange(), function (record) {
                var resource = record.getResource();
                spanStartDate = record.getStartDate();
                spanEndDate = record.getEndDate();

                // Make sure resource exists in resourceStore (filtering etc)
                if (resource &&
                // Check for TreeStore, since it has no indexOf method.
                    (view.resourceStore.indexOf ? view.resourceStore : view.store).indexOf(resource) >= 0 &&
                // Make sure this zone is inside current view
                    Sch.util.Date.intersectSpans(spanStartDate, spanEndDate, viewStart, viewEnd)) {
                    resRegion = view.getResourceRegion(resource, spanStartDate, spanEndDate);

                    data[data.length] = Ext.apply({
                        id: record.internalId,

                        left: resRegion.left,
                        top: resRegion.top,
                        width: resRegion.right - resRegion.left,
                        height: resRegion.bottom - resRegion.top,

                        Cls: record.getCls()
                    }, record.data);
                }
            });
        }
        return data;
    }
});
/**
@class Sch.widget.ResizePicker
@private
@extends Ext.Panel

Size picker widget for changing columns width/rows height.

*/
Ext.define('Sch.widget.ResizePicker', {
    extend: 'Ext.Panel',
    alias: 'widget.dualrangepicker',
    width: 200,
    height: 200,
    border: true,
    collapsible: false,
    bodyStyle: 'position:absolute; margin:5px',

    verticalCfg: {
        height: 120,
        value: 24,
        increment: 2,
        minValue: 20,
        maxValue: 80,
        reverse: true,
        disabled: true
    },

    horizontalCfg: {
        width: 120,
        value: 100,
        minValue: 25,
        increment: 5,
        maxValue: 200,
        disable: true
    },

    initComponent: function () {
        var me = this;

        me.addEvents('change', 'changecomplete', 'select');

        me.horizontalCfg.value = me.dialogConfig.columnWidth;
        me.verticalCfg.value = me.dialogConfig.rowHeight;
        me.verticalCfg.disabled = me.dialogConfig.scrollerDisabled || false;

        me.dockedItems = [
            me.vertical = new Ext.slider.Single(Ext.apply({
                dock: 'left',
                style: 'margin-top:10px',
                vertical: true,
                listeners: {
                    change: me.onSliderChange,
                    changecomplete: me.onSliderChangeComplete,
                    scope: me
                }
            }, me.verticalCfg)),

            me.horizontal = new Ext.slider.Single(Ext.apply({
                dock: 'top',
                style: 'margin-left:28px',
                listeners: {
                    change: me.onSliderChange,
                    changecomplete: me.onSliderChangeComplete,
                    scope: me
                }
            }, me.horizontalCfg))
        ];

        me.callParent(arguments);
    },

    afterRender: function () {
        var me = this;

        me.addCls('sch-ux-range-picker');
        me.valueHandle = this.body.createChild({
            cls: 'sch-ux-range-value',
            cn: {
                tag: 'span'
            }
        });
        me.valueSpan = this.valueHandle.down('span');

        var dd = new Ext.dd.DD(this.valueHandle);


        Ext.apply(dd, {
            startDrag: function () {
                me.dragging = true;
                this.constrainTo(me.body);
            },
            onDrag: function () {
                me.onHandleDrag.apply(me, arguments);
            },
            endDrag: function () {
                me.onHandleEndDrag.apply(me, arguments);
                me.dragging = false;
            },
            scope: this
        });

        this.setValues(this.getValues());
        this.callParent(arguments);

        this.body.on('click', this.onBodyClick, this);
    },

    onBodyClick: function (e, t) {
        var xy = [e.getXY()[0] - 8 - this.body.getX(), e.getXY()[1] - 8 - this.body.getY()];

        this.valueHandle.setLeft(Ext.Number.constrain(xy[0], 0, this.getAvailableWidth()));
        this.valueHandle.setTop(Ext.Number.constrain(xy[1], 0, this.getAvailableHeight()));

        this.setValues(this.getValuesFromXY([this.valueHandle.getLeft(true), this.valueHandle.getTop(true)]));
        this.onSliderChangeComplete();
    },

    getAvailableWidth: function () {
        return this.body.getWidth() - 18;
    },

    getAvailableHeight: function () {
        return this.body.getHeight() - 18;
    },

    onHandleDrag: function () {
        this.setValues(this.getValuesFromXY([this.valueHandle.getLeft(true), this.valueHandle.getTop(true)]));
    },

    onHandleEndDrag: function () {
        this.setValues(this.getValuesFromXY([this.valueHandle.getLeft(true), this.valueHandle.getTop(true)]));
    },

    getValuesFromXY: function (xy) {
        var xFraction = xy[0] / this.getAvailableWidth();
        var yFraction = xy[1] / this.getAvailableHeight();

        var horizontalVal = Math.round((this.horizontalCfg.maxValue - this.horizontalCfg.minValue) * xFraction);
        var verticalVal = Math.round((this.verticalCfg.maxValue - this.verticalCfg.minValue) * yFraction) + this.verticalCfg.minValue;

        return [horizontalVal + this.horizontalCfg.minValue, verticalVal];
    },

    getXYFromValues: function (values) {
        var xRange = this.horizontalCfg.maxValue - this.horizontalCfg.minValue;
        var yRange = this.verticalCfg.maxValue - this.verticalCfg.minValue;

        var x = Math.round((values[0] - this.horizontalCfg.minValue) * this.getAvailableWidth() / xRange);

        var verticalVal = values[1] - this.verticalCfg.minValue;
        var y = Math.round(verticalVal * this.getAvailableHeight() / yRange);

        return [x, y];
    },

    updatePosition: function () {
        var values = this.getValues();
        var xy = this.getXYFromValues(values);

        this.valueHandle.setLeft(Ext.Number.constrain(xy[0], 0, this.getAvailableWidth()));
        if (this.verticalCfg.disabled) {
            this.valueHandle.setTop(this.dialogConfig.rowHeight);
        } else {
            this.valueHandle.setTop(Ext.Number.constrain(xy[1], 0, this.getAvailableHeight()));
        }

        this.positionValueText();
        this.setValueText(values);
    },

    positionValueText: function () {
        var handleTop = this.valueHandle.getTop(true);
        var handleLeft = this.valueHandle.getLeft(true);

        this.valueSpan.setLeft(handleLeft > 30 ? -30 : 10);
        this.valueSpan.setTop(handleTop > 10 ? -20 : 20);
    },

    setValueText: function (values) {
        if (this.verticalCfg.disabled) values[1] = this.dialogConfig.rowHeight;
        this.valueSpan.update('[' + values.toString() + ']');
    },

    setValues: function (values) {
        this.horizontal.setValue(values[0]);

        if (this.verticalCfg.reverse) {
            if (!this.verticalCfg.disabled) this.vertical.setValue(this.verticalCfg.maxValue + this.verticalCfg.minValue - values[1]);
        } else {
            if (!this.verticalCfg.disabled) this.vertical.setValue(values[1]);
        }

        if (!this.dragging) {
            this.updatePosition();
        }
        this.positionValueText();

        this.setValueText(values);
    },

    getValues: function () {
        var verticalVal = this.vertical.getValue();

        if (this.verticalCfg.reverse) {
            verticalVal = this.verticalCfg.maxValue - verticalVal + this.verticalCfg.minValue;
        }

        return [this.horizontal.getValue(), verticalVal];
    },

    onSliderChange: function () {
        this.fireEvent('change', this, this.getValues());

        if (!this.dragging) {
            this.updatePosition();
        }
    },

    onSliderChangeComplete: function () {
        this.fireEvent('changecomplete', this, this.getValues());
    },

    afterLayout: function () {
        this.callParent(arguments);
        this.updatePosition();
    }
});
/**
@class Sch.widget.ExportDialogForm
@private
@extends Ext.form.Panel

Form for {@link Sch.widget.ExportDialog}. This is a private class and can be overriden by providing `formPanel` option to 
{@link Sch.plugin.Export#cfg-exportDialogConfig exportDialogConfig}.
*/
Ext.define('Sch.widget.ExportDialogForm', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.ProgressBar',
        'Sch.widget.ResizePicker'
    ],
    border: false,
    bodyPadding: '10 10 0 10',
    autoHeight: true,

    initComponent: function () {
        var me = this;

        me.createFields();

        Ext.apply(this, {
            fieldDefaults: {
                labelAlign: 'top',
                labelWidth: 100,
                anchor: '90%'
            },
            items: [
                me.rangeField,
                me.resizePicker,
                me.dateFromField,
                me.dateToField,
                me.showHeaderField,
                me.exportToSingleField,
                me.formatField,
                me.orientationField,

                me.progressBar || me.createProgressBar()
            ]
        });

        me.callParent(arguments);

        me.on({
            hideprogressbar: me.hideProgressBar,
            showprogressbar: me.showProgressBar,
            updateprogressbar: me.updateProgressBar,
            scope: me
        });
    },

    createFields: function () {
        var me = this,
            cfg = me.dialogConfig;

        me.rangeField = new Ext.form.field.ComboBox({
            xtype: 'combo',
            value: cfg.defaultConfig.range,
            triggerAction: 'all',
            cls: 'sch-export-dialog-range',
            forceSelection: true,
            editable: false,
            fieldLabel: cfg.rangeFieldLabel,
            name: 'range',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value',
            store: Ext.create('Ext.data.Store', {
                fields: ['name', 'value'],
                data: [
                    { name: cfg.completeViewText, value: 'complete' },
                    { name: cfg.dateRangeText, value: 'date' },
                    { name: cfg.currentViewText, value: 'current' }
                ]
            }),
            listeners: {
                change: me.onRangeChange,
                scope: me
            }
        });

        me.resizePicker = new Sch.widget.ResizePicker({
            dialogConfig: cfg,
            hidden: true,
            padding: '0 0 5 0'
        });

        me.dateFromField = new Ext.form.field.Date({
            fieldLabel: cfg.dateRangeFromText,
            labelAlign: 'left',
            labelWidth: 80,
            baseBodyCls: 'sch-exportdialogform-date',
            padding: '10 0 5 0',
            name: 'dateFrom',
            format: cfg.dateRangeFormat || Ext.Date.defaultFormat,
            hidden: true,
            allowBlank: false,
            maxValue: cfg.endDate,
            minValue: cfg.startDate,
            value: cfg.startDate,
            validator: function (value) {
                return Ext.Date.parse(value, this.format) >= new Date(cfg.startDate);
            }
        });

        me.dateToField = new Ext.form.field.Date({
            fieldLabel: cfg.dateRangeToText,
            labelAlign: 'left',
            labelWidth: 80,
            name: 'dateTo',
            format: cfg.dateRangeFormat || Ext.Date.defaultFormat,
            baseBodyCls: 'sch-exportdialogform-date',
            hidden: true,
            allowBlank: false,
            maxValue: cfg.endDate,
            minValue: cfg.startDate,
            value: cfg.endDate,
            validator: function (value) {
                return Ext.Date.parse(value, this.format) <= new Date(cfg.endDate);
            }
        });

        me.showHeaderField = new Ext.form.field.Checkbox({
            xtype: 'checkboxfield',
            fieldLabel: me.dialogConfig.showHeaderLabel,
            name: 'showHeader',
            checked: (cfg.defaultConfig.showHeaderLabel ? true : false)
        });

        me.exportToSingleField = new Ext.form.field.Checkbox({
            xtype: 'checkboxfield',
            fieldLabel: me.dialogConfig.exportToSingleLabel,
            name: 'singlePageExport',
            checked: (cfg.defaultConfig.singlePageExport ? true : false)
        });

        me.formatField = new Ext.form.field.ComboBox({
            value: cfg.defaultConfig.format,
            triggerAction: 'all',
            forceSelection: true,
            editable: false,
            fieldLabel: cfg.formatFieldLabel,
            name: 'format',
            queryMode: 'local',
            store: ["A5", "A4", "A3", "Letter"]
        });

        var orientationLandscapeCls = cfg.defaultConfig.orientation === "portrait" ? 'class="sch-none"' : '',
            orientationPortraitCls = cfg.defaultConfig.orientation === "landscape" ? 'class="sch-none"' : '';

        me.orientationField = new Ext.form.field.ComboBox({
            value: cfg.defaultConfig.orientation,
            triggerAction: 'all',
            baseBodyCls: 'sch-exportdialogform-orientation',
            forceSelection: true,
            editable: false,
            fieldLabel: me.dialogConfig.orientationFieldLabel,
            afterSubTpl: new Ext.XTemplate('<span id="sch-exportdialog-imagePortrait" ' + orientationPortraitCls +
                '></span><span id="sch-exportdialog-imageLandscape" ' + orientationLandscapeCls + '></span>'),
            name: 'orientation',
            displayField: 'name',
            valueField: 'value',
            queryMode: 'local',
            store: Ext.create('Ext.data.Store', {
                fields: ['name', 'value'],
                data: [
                    { name: cfg.orientationPortraitText, value: 'portrait' },
                    { name: cfg.orientationLandscapeText, value: 'landscape' }
                ]
            }),
            listeners: {
                change: function (field, newValue) {
                    switch (newValue) {
                        case 'landscape':
                            Ext.fly('sch-exportdialog-imagePortrait').toggleCls('sch-none');
                            Ext.fly('sch-exportdialog-imageLandscape').toggleCls('sch-none');
                            break;
                        case 'portrait':
                            Ext.fly('sch-exportdialog-imagePortrait').toggleCls('sch-none');
                            Ext.fly('sch-exportdialog-imageLandscape').toggleCls('sch-none');
                            break;
                    }
                }
            }
        });
    },

    createProgressBar: function () {
        return this.progressBar = new Ext.ProgressBar({
            text: this.config.progressBarText,
            animate: true,
            hidden: true,
            id: 'print-widget-progressbar'
        });
    },

    onRangeChange: function (field, newValue) {
        switch (newValue) {
            case 'complete':
                this.dateFromField.hide();
                this.dateToField.hide();
                this.resizePicker.hide();
                break;
            case 'date':
                this.dateFromField.show();
                this.dateToField.show();
                this.resizePicker.hide();
                break;
            case 'current':
                this.dateFromField.hide();
                this.dateToField.hide();
                this.resizePicker.show();
                this.resizePicker.expand(true);
                break;
        }
    },

    showProgressBar: function () {
        if (this.progressBar) this.progressBar.show();
    },

    hideProgressBar: function () {
        if (this.progressBar) this.progressBar.hide();
    },

    updateProgressBar: function (value) {
        if (this.progressBar) this.progressBar.updateProgress(value);
    }
});
/**
@class Sch.widget.ExportDialog
@private
@extends Ext.window.Window

Widget for export options.

*/
Ext.define('Sch.widget.ExportDialog', {
    alternateClassName: 'Sch.widget.PdfExportDialog',
    extend: 'Ext.window.Window',
    alias: "widget.exportdialog",

    //Panel settings. Overridable with {@link Sch.plugin.Export#cfg-exportDialogConfig}
    modal: false,
    width: 240,
    cls: 'sch-exportdialog',
    frame: false,
    layout: 'fit',
    draggable: false,
    padding: 0,

    //Private
    plugin: null,

    /**
    * @cfg {Ext.Component} buttonsPanel Component with buttons controlling export.
    */
    buttonsPanel: null,

    /**
    * @cfg {Object} buttonsPanelScope
    * The scope for the {@link #buttonsPanel}
    */
    buttonsPanelScope: null,

    /**
    * @cfg {Ext.Component} progressBar Progress bar component.
    */
    progressBar: null,

    /**
    * @cfg {String} generalError Text used for displaying errors, when no error message was returned from the server.
    */
    generalError: 'An error occured, try again.',

    /**
    * @cfg {String} title Text displayed in the header of the dialog.
    */
    title: 'Export Settings',

    /**
    * @cfg {String} formatFieldLabel Text used as a label for the paper format setting.
    */
    formatFieldLabel: 'Paper format',

    /**
    * @cfg {String} orientationFieldLabel Text used as a label for the orientation setting.
    */
    orientationFieldLabel: 'Orientation',

    /**
    * @cfg {String} rangeFieldLabel Text used as a label for the export range setting.
    */
    rangeFieldLabel: 'Export range',

    /**
    * @cfg {String} showHeaderLabel Text used as a label for the showing/hiding of page numbers checkbox.
    */
    showHeaderLabel: 'Add page number',

    /**
    * @cfg {String} exportToSingleLabel Text used as a label for the checkbox defining if export should create single page.
    */
    exportToSingleLabel: 'Export as single page',

    /**
    * @cfg {String} orientationPortraitText Text used for the portrait orientation setting.
    */
    orientationPortraitText: 'Portrait',

    /**
    * @cfg {String} orientationLandscape Text used for the landscape orientation setting.
    */
    orientationLandscapeText: 'Landscape',

    /**
    * @cfg {String} completeViewText Text used for the complete view export range setting.
    */
    completeViewText: 'Complete schedule',

    /**
    * @cfg {String} currentViewText Text used for the current view export range setting.
    */
    currentViewText: 'Current view',

    /**
    * @cfg {String} dateRangeText Text used for the date range export range setting.
    */
    dateRangeText: 'Date range',

    /**
    * @cfg {String} dateRangeFromText Text indicating the start of timespan when exporting a date range.
    */
    dateRangeFromText: 'Export from',

    /**
    * @cfg {String} pickerText Text used as a legend for the row/column picker.
    */
    pickerText: 'Resize column/rows to desired value',

    /**
    * @cfg {String} dateRangeToText Text indicating the end of timespan when exporting a date range.
    */
    dateRangeToText: 'Export to',

    /**
    * @cfg {String} exportButtonText Text displayed on the button starting the export operation.
    */
    exportButtonText: 'Export',

    /**
    * @cfg {String} cancelButtonText Text displayed on the button cancelling the export and hiding the dialog.
    */
    cancelButtonText: 'Cancel',

    /**
    * @cfg {String} progressBarText Text displayed on the progress bar while exporting.
    */
    progressBarText: 'Exporting...',

    /**
    * @cfg {String} dateRangeFormat Valid date format to be used by the date ranges fields.
    */
    dateRangeFormat: '',

    requires: [
        'Sch.widget.ExportDialogForm'
    ],

    constructor: function (config) {
        Ext.apply(this, config.exportDialogConfig);

        //store fields texts in the config object for further use by form
        this.config = Ext.apply({
            progressBarText: this.progressBarText,
            cancelButtonText: this.cancelButtonText,
            exportButtonText: this.exportButtonText,
            dateRangeToText: this.dateRangeToText,
            pickerText: this.pickerText,
            dateRangeFromText: this.dateRangeFromText,
            dateRangeText: this.dateRangeText,
            currentViewText: this.currentViewText,
            formatFieldLabel: this.formatFieldLabel,
            orientationFieldLabel: this.orientationFieldLabel,
            rangeFieldLabel: this.rangeFieldLabel,
            showHeaderLabel: this.showHeaderLabel,
            exportToSingleLabel: this.exportToSingleLabel,
            orientationPortraitText: this.orientationPortraitText,
            orientationLandscapeText: this.orientationLandscapeText,
            completeViewText: this.completeViewText,
            dateRangeFormat: this.dateRangeFormat,
            defaultConfig: this.defaultConfig
        }, config.exportDialogConfig);

        this.callParent(arguments);
    },

    initComponent: function () {
        var me = this,
            listeners = {
                hidedialogwindow: me.destroy,
                showdialogerror: me.showError,
                updateprogressbar: function (value) {
                    me.fireEvent('updateprogressbar', value);
                },
                scope: this
            };

        Ext.apply(this, {
            items: [
                me.form = me.buildForm(me.config)
            ],
            fbar: me.buildButtons(me.buttonsPanelScope || me)
        });

        me.callParent(arguments);

        me.plugin.on(listeners);
    },

    afterRender: function () {
        var me = this;

        me.on('changecomplete', function (picker, values) {
            me.plugin.scheduler.setTimeColumnWidth(values[0], true);

            //don't change the row height if horizontal scroller is disabled
            if (!me.config.scrollerDisabled) {
                if (me.form.resizePicker.verticalCfg.reverse) {
                    var value = values[1];
                    me.plugin.scheduler.getSchedulingView().setRowHeight(value);
                } else {
                    me.plugin.scheduler.getSchedulingView().setRowHeight(values[1]);
                }
            }
        });

        me.relayEvents(me.form.resizePicker, ['change', 'changecomplete', 'select']);

        me.form.relayEvents(me, ['updateprogressbar', 'hideprogressbar', 'showprogressbar']);

        me.callParent(arguments);
    },

    /**
    * Create Dialog's buttons.
    *
    * @param {Object} buttonsScope Scope for the buttons.
    * @return {Object} buttons Object containing buttons for Exporting/Cancelling export.
    */
    buildButtons: function (buttonsScope) {
        return [{
            xtype: 'button',
            scale: 'medium',
            text: this.exportButtonText,
            handler: function () {
                var form = this.form.getForm();

                if (form.isValid()) {
                    var values = form.getValues();

                    this.fireEvent('showprogressbar');
                    this.plugin.doExport(values);
                }
            },
            scope: buttonsScope
        },
        {
            xtype: 'button',
            scale: 'medium',
            text: this.cancelButtonText,
            handler: function () {
                this.destroy();
            },
            scope: buttonsScope
        }];
    },

    /**
    * Build the {@link Sch.widget.ExportDialogForm} for the dialog window.
    *
    * @param {Object} config Config object for the form, containing field names and values.
    * @return {@link Sch.widget.ExportDialogForm} form
    */
    buildForm: function (config) {
        return new Sch.widget.ExportDialogForm({
            progressBar: this.progressBar,
            dialogConfig: config
        });
    },

    /**
    * @private
    * Displays error message in the dialog. When it's called, both form and buttons are hidden. Dialog will be automatically
    * hidden after {@link #hideTime} time.
    * 
    * @param {String} (optional) error Text of the message that will be displayed in the dialog. If not provided, {@link #generalErrorText}
    * will be used.
    */
    showError: function (dialog, error) {
        var me = dialog,
            text = error || me.generalError;

        me.fireEvent('hideprogressbar');
        alert(text);
    }
});
/**
@class Sch.feature.ColumnLines
@extends Sch.plugin.Lines

A simple feature adding column lines (to be used when using the SingleTimeAxis column).

*/
Ext.define("Sch.feature.ColumnLines", {
    extend: 'Sch.plugin.Lines',

    cls: 'sch-column-line',

    showTip: false,

    requires: [
        'Ext.data.Store'
    ],

    init: function (panel) {
        this.timeAxis = panel.getTimeAxis();

        this.store = Ext.create("Ext.data.JsonStore", {
            model: Ext.define("Sch.model.TimeLine", {
                extend: 'Ext.data.Model',
                fields: [
                    'start',
                    { name: 'Date', convert: function (val, r) { return r.data.start; } }
                ]
            }),
            data: panel.getOrientation() === 'horizontal' ? this.getData() : []
        });

        this.callParent(arguments);

        var view = this.schedulerView;
        view.timeAxis.on('reconfigure', this.populate, this);
    },

    populate: function () {
        var sv = this.schedulerView;
        var refresh = sv.getOrientation() === 'horizontal' && sv.store.getCount() > 0;

        this.store.removeAll(refresh);

        if (refresh) {
            this.store.add(this.getData());
        }
    },

    getElementData: function () {
        var sv = this.schedulerView;
        if (sv.getOrientation() === 'horizontal' && sv.store.getCount() > 0) {
            return this.callParent(arguments);
        }

        return [];
    },

    getData: function () {
        var ticks = [];

        this.timeAxis.forEachMainInterval(function (start, end, i) {
            if (i > 0) {
                ticks.push({ start: start });
            }
        });

        // Manually inject last tick end date
        ticks.push({ start: this.timeAxis.getEnd() });

        return ticks;
    }
});
/**
@class Sch.mixin.TimelineView
 
A base mixing for {@link Ext.view.View} classes, giving to the consuming view the "time line" functionality. 
This means that the view will be capabale to display a list of "events", ordered on the {@link Sch.data.TimeAxis time axis}.

By itself this mixin is not enough for correct rendering. The class, consuming this mixin, should also consume one of the 
{@link Sch.view.Horizontal} or {@link Sch.view.Vertical} mixins, which provides the implementation of some orientation-specfic methods.

Generally, should not be used directly, if you need to subclass the view, subclass the {@link Sch.view.SchedulerGridView} or {@link Sch.view.SchedulerTreeView} 
instead.

*/
Ext.define("Sch.mixin.TimelineView", {
    requires: [
        'Sch.column.Time',
        'Sch.data.TimeAxis'
    ],

    /**
    * @cfg {String} orientation The view orientation
    */
    orientation: 'horizontal',

    /**
    * @cfg {String} overScheduledEventClass
    * A CSS class to apply to each event in the view on mouseover (defaults to 'sch-event-hover').
    */
    overScheduledEventClass: 'sch-event-hover',

    /**
    * @cfg {String} selectedEventCls
    * A CSS class to apply to each event in the view on mouseover (defaults to 'sch-event-selected').
    */
    selectedEventCls: 'sch-event-selected',

    // private
    altColCls: 'sch-col-alt',

    timeCellCls: 'sch-timetd',
    timeCellSelector: '.sch-timetd',

    ScheduleEventMap: {
        click: 'Click',
        mousedown: 'MouseDown',
        mouseup: 'MouseUp',
        dblclick: 'DblClick',
        contextmenu: 'ContextMenu',
        keydown: 'KeyDown',
        keyup: 'KeyUp'
    },

    suppressFitCheck: 0,

    forceFit: false,

    inheritables: function () {
        return {
            cellBorderWidth: 1,

            // private
            initComponent: function () {

                this.setOrientation(this.panel._top.orientation || this.orientation);

                this.addEvents(
                /**
                * @event beforetooltipshow
                * Fires before the event tooltip is shown, return false to suppress it.
                * @param {Sch.mixin.SchedulerPanel} scheduler The scheduler object
                * @param {Ext.data.Model} eventRecord The event record of the clicked record
                */
                    'beforetooltipshow',

                /**
                * @event scheduleclick
                * Fires after a click on the schedule area
                * @param {Sch.mixin.SchedulerPanel} scheduler The scheduler object
                * @param {Date} clickedDate The clicked date 
                * @param {Int} rowIndex The row index 
                * @param {Ext.EventObject} e The event object
                */
                    'scheduleclick',

                /**
                * @event scheduledblclick
                * Fires after a doubleclick on the schedule area
                * @param {Sch.mixin.SchedulerPanel} scheduler The scheduler object
                * @param {Date} clickedDate The clicked date 
                * @param {Int} rowIndex The row index 
                * @param {Ext.EventObject} e The event object
                */
                    'scheduledblclick',

                /**
                * @event schedulecontextmenu
                * Fires after a context menu click on the schedule area
                * @param {Sch.mixin.SchedulerPanel} scheduler The scheduler object
                * @param {Date} clickedDate The clicked date 
                * @param {Int} rowIndex The row index 
                * @param {Ext.EventObject} e The event object
                */
                    'schedulecontextmenu',

                    'columnwidthchange'
                );

                this.enableBubble('columnwidthchange');

                var largeUnits = {},
                    D = Sch.util.Date;

                largeUnits[D.DAY] = largeUnits[D.WEEK] = largeUnits[D.MONTH] = largeUnits[D.QUARTER] = largeUnits[D.YEAR] = null;

                Ext.applyIf(this, {
                    eventPrefix: this.id + '-',
                    largeUnits: largeUnits
                });

                this.callParent(arguments);

                if (this.orientation === 'horizontal') {
                    this.getTimeAxisColumn().on('timeaxiscolumnreconfigured', this.checkHorizontalFit, this);
                }

                var pnl = this.panel._top;

                Ext.apply(this, {
                    eventRendererScope: pnl.eventRendererScope,
                    eventRenderer: pnl.eventRenderer,
                    eventBorderWidth: pnl.eventBorderWidth,
                    timeAxis: pnl.timeAxis,
                    dndValidatorFn: pnl.dndValidatorFn || Ext.emptyFn,
                    resizeValidatorFn: pnl.resizeValidatorFn || Ext.emptyFn,
                    createValidatorFn: pnl.createValidatorFn || Ext.emptyFn,
                    tooltipTpl: pnl.tooltipTpl,
                    validatorFnScope: pnl.validatorFnScope || this,
                    snapToIncrement: pnl.snapToIncrement,
                    timeCellRenderer: pnl.timeCellRenderer,
                    timeCellRendererScope: pnl.timeCellRendererScope,
                    readOnly: pnl.readOnly,
                    eventResizeHandles: pnl.eventResizeHandles,
                    enableEventDragDrop: pnl.enableEventDragDrop,
                    enableDragCreation: pnl.enableDragCreation,
                    dragConfig: pnl.dragConfig,
                    dropConfig: pnl.dropConfig,
                    resizeConfig: pnl.resizeConfig,
                    createConfig: pnl.createConfig,
                    tipCfg: pnl.tipCfg,
                    orientation: pnl.orientation,
                    getDateConstraints: pnl.getDateConstraints || Ext.emptyFn
                });

                // Manipulate the text, wrapping it in a SPAN tag that we can easily grab and remove 
                if (this.emptyText) {
                    this.emptyText = '<span class="sch-empty-text">' + this.emptyText + '</span>';
                }
            },

            // private, clean up
            onDestroy: function () {
                if (this.tip) {
                    this.tip.destroy();
                }
                this.callParent(arguments);
            },

            afterComponentLayout: function () {
                this.callParent(arguments);

                var width = this.getWidth();
                var height = this.getHeight();

                if (width === this.__prevWidth && height === this.__prevHeight) { return; }

                this.__prevWidth = width;
                this.__prevHeight = height;

                if (!this.lockable && !this.suppressFitCheck) {
                    this.checkHorizontalFit();
                }
            },

            // private
            beforeRender: function () {
                this.callParent(arguments);
                this.addCls("sch-timelineview");

                if (this.readOnly) {
                    this.addCls(this._cmpCls + '-readonly');
                }
            },

            afterRender: function () {
                this.callParent(arguments);

                if (this.overScheduledEventClass) {
                    this.mon(this.el, {
                        "mouseover": this.onMouseOver,
                        "mouseout": this.onMouseOut,
                        delegate: this.eventSelector,
                        scope: this
                    });
                }

                if (this.tooltipTpl) {
                    this.el.on('mousemove', this.setupTooltip, this, { single: true });
                }

                this.setupTimeCellEvents();
            },

            processUIEvent: function (e) {
                var me = this,
                    eventBarNode = e.getTarget(this.eventSelector),
                    map = me.ScheduleEventMap,
                    type = e.type,
                    preventViewEvent = false;

                if (eventBarNode && type in map) {
                    this.fireEvent(this.scheduledEventName + type, this, this.resolveEventRecord(eventBarNode), e);

                    // In Scheduler, clicking or interacting with an event should not trigger itemclick or other itemXXX events 
                    // In gantt, a rendered bar corresponds to the row, so let view superclass process the event too
                    preventViewEvent = !(this.panel.getSelectionModel() instanceof Ext.selection.RowModel);
                }

                if (!preventViewEvent) {
                    // For gantt, default actions should be executed too
                    this.callParent(arguments);
                }
            },

            refresh: function () {
                // Force view to clear its contents
                this.fixedNodes = 0;

                this.callParent(arguments);
            },

            clearViewEl: function () {
                // Avoid clearing rendered zones/lines
                var me = this,
                    el = me.getTargetEl();

                el.down('table').remove();

                // HACK Manually remove the empty text
                if (this.emptyText) {
                    var span = el.down('.sch-empty-text');
                    if (span) {
                        span.remove();
                    }
                }
            },

            // private
            onMouseOver: function (e, t) {
                if (t !== this.lastItem) {
                    this.lastItem = t;

                    Ext.fly(t).addCls(this.overScheduledEventClass);
                    this.fireEvent('eventmouseenter', this, this.resolveEventRecord(t), e);
                }
            },

            // private
            onMouseOut: function (e, t) {
                if (this.lastItem) {
                    if (!e.within(this.lastItem, true, true)) {
                        Ext.fly(this.lastItem).removeCls(this.overScheduledEventClass);
                        this.fireEvent('eventmouseleave', this, this.resolveEventRecord(this.lastItem), e);
                        delete this.lastItem;
                    }
                }
            },

            // Overridden since locked grid can try to highlight items in the unlocked grid while it's loading/empty
            highlightItem: function (item) {
                if (item) {
                    var me = this;
                    me.clearHighlight();
                    me.highlightedItem = item;
                    Ext.fly(item).addCls(me.overItemCls);
                }
            },

            // Don't want Ext guessing if this row should be repainted or not, just do it
            shouldUpdateCell: function () { return true; }
        };
    },

    /**
    * Returns true, if there are any columns with `position : right` provided to this view
    * @return {Boolean} The formatted date
    */
    hasRightColumns: function () {
        return this.headerCt.items.getCount() > 1;
    },


    // returns `false` if the refresh has been happened
    checkHorizontalFit: function () {

        if (this.orientation === 'horizontal') {
            var actualWidth = this.getActualTimeColumnWidth();
            var fittingWidth = this.getFittingColumnWidth();

            if (this.forceFit) {
                if (fittingWidth != actualWidth) {
                    this.fitColumns();
                }
            } else if (this.snapToIncrement) {
                var snapColumnWidth = this.calculateTimeColumnWidth(actualWidth);
                if (snapColumnWidth > 0 && snapColumnWidth !== actualWidth) {
                    this.setColumnWidth(snapColumnWidth);
                }
            } else if (actualWidth < fittingWidth) {
                this.fitColumns();
            }
        }
    },


    getTimeAxisColumn: function () {
        return this.headerCt.items.get(0);
    },

    getFirstTimeColumn: function () {
        return this.headerCt.getGridColumns()[0];
    },

    /**
    * Method to get a formatted display date
    * @private
    * @param {Date} date The date
    * @return {String} The formatted date
    */
    getFormattedDate: function (date) {
        return Ext.Date.format(date, this.getDisplayDateFormat());
    },

    /**
    * Method to get a formatted end date for a scheduled event, the grid uses the "displayDateFormat" property defined in the current view preset.
    * @private
    * @param {Date} endDate The date to format
    * @param {Date} startDate The start date 
    * @return {String} The formatted date
    */
    getFormattedEndDate: function (endDate, startDate) {
        var ta = this.timeAxis,
            resUnit = ta.getResolution().unit;

        // If resolution is day or greater, and end date is greater then start date
        if (resUnit in this.largeUnits && endDate.getHours() === 0 && endDate.getMinutes() === 0 &&
            !(endDate.getYear() === startDate.getYear() && endDate.getMonth() === startDate.getMonth() && endDate.getDate() === startDate.getDate())) {
            endDate = Sch.util.Date.add(endDate, Sch.util.Date.DAY, -1);
        }

        //            // experimental, this should turn "<" into "<="
        //            endDate = Sch.util.Date.add(endDate, Sch.util.Date.MILLI, -1);

        return Ext.Date.format(endDate, this.getDisplayDateFormat());
    },

    // private
    getDisplayDateFormat: function () {
        return this.displayDateFormat;
    },

    // private
    setDisplayDateFormat: function (format) {
        this.displayDateFormat = format;
    },


    /**
    * Returns the amount of pixels for a single unit
    * @private
    * @return {String} The unit in pixel
    */
    getSingleUnitInPixels: function (unit) {
        return Sch.util.Date.getUnitToBaseUnitRatio(this.timeAxis.getUnit(), unit) * this.getSingleTickInPixels() / this.timeAxis.getIncrement();
    },

    /**
    * Returns the amount of pixels for a single unit
    * @private
    * @return {String} The unit in pixel
    */
    getSingleTickInPixels: function () {
        throw 'Must be implemented by horizontal/vertical';
    },

    /**
    *  Scrolls an event record into the viewport. In scheduler, this method only works for events that have already been rendered 
    *  (so won't work for events outside of the current timespan).
    *  
    *  In gantt, this method will also expand all the parent nodes of the passed task, so it will work with collapsed tasks too.
    *  It will not change the current time span of the gantt chart either, as in scheduler. Buffered TaskStore is supported.  
    *  
    *  @param {Sch.model.Event/Gnt.model.Task} eventRec, the event record to scroll into view
    *  @param {Boolean/Object} highlight, either `true/false` or a highlight config object used to highlight the element after scrolling it into view
    *  @param {Boolean/Object} animate, either `true/false` or an animation config object used to scroll the element
    */
    scrollEventIntoView: function (eventRec, highlight, animate, callback, scope) {
        scope = scope || this;

        var me = this;
        // will be a taskStore instance in Gantt
        var eventStore = this.panel._top.store;

        var basicScroll = function (el) {
            el.scrollIntoView(me.el, true, animate);

            if (highlight) {
                if (typeof highlight === "boolean") {
                    el.highlight();
                } else {
                    el.highlight(null, highlight);
                }
            }

            // XXX callback will be called too early, need to wait for scroll & highlight to complete
            callback && callback.call(scope);
        };

        var isCollapsed = Ext.data && Ext.data.TreeStore && eventStore instanceof Ext.data.TreeStore && !eventRec.isVisible();

        if (isCollapsed) eventRec.bubble(function (node) { node.expand(); });

        var el = this.getOuterElementFromEventRecord(eventRec);

        if (el) {
            basicScroll(el);
        } else {
            var verticalScroller = this.panel.verticalScroller;

            if (eventStore.buffered && verticalScroller) {

                Ext.Function.defer(function () {
                    verticalScroller.scrollTo(eventStore.getIndexInTotalDataset(eventRec), false, function () {
                        // el should present now
                        var el = me.getOuterElementFromEventRecord(eventRec);

                        if (el) basicScroll(el);
                    });

                }, isCollapsed ? 10 : 0);
            }
        }
    },

    calculateTimeColumnWidth: function (proposedTimeColumnWidth) {
        if (!this.panel.rendered) {
            return proposedTimeColumnWidth;
        }

        var forceFit = this.forceFit;

        var width = 0,
            timelineUnit = this.timeAxis.getUnit(),
            nbrTimeColumns = this.timeAxis.getCount(),
            ratio = Number.MAX_VALUE;

        if (this.snapToIncrement) {
            var res = this.timeAxis.getResolution(),
                unit = res.unit,
                resIncr = res.increment;


            // Not all view resolutions can accomodate snap to increment, e.g. a month view with day resolution is not possible
            // since months have different nbr of days, and the 'columns' have a fixed width. For such scenarios, -1 is returned by the call below.
            ratio = Sch.util.Date.getUnitToBaseUnitRatio(timelineUnit, unit) * resIncr;
        }

        var measuringUnit = Sch.util.Date.getMeasuringUnit(timelineUnit);

        ratio = Math.min(ratio, Sch.util.Date.getUnitToBaseUnitRatio(timelineUnit, measuringUnit));

        var fittingWidth = Math.floor(this.getAvailableWidthForSchedule() / nbrTimeColumns);

        width = (forceFit || proposedTimeColumnWidth < fittingWidth) ? fittingWidth : proposedTimeColumnWidth;

        if (ratio > 0 && (!forceFit || ratio < 1)) {
            width = Math.round(Math.max(1, Math[forceFit ? 'floor' : 'round'](ratio * width)) / ratio);
        }

        return width;
    },


    getFittingColumnWidth: function () {
        var proposedWidth = Math.floor(this.getAvailableWidthForSchedule() / this.timeAxis.getCount());

        return this.calculateTimeColumnWidth(proposedWidth);
    },


    /**
    * This function fits the time columns into the available space in the grid.
    * @param {Boolean} preventRefresh `true` to prevent the refresh of view
    */
    fitColumns: function (preventRefresh) {
        var w = 0;

        if (this.orientation === 'horizontal') {
            w = this.getFittingColumnWidth();
        } else {
            w = Math.floor((this.panel.getWidth() - Ext.getScrollbarSize().width - 1) / this.headerCt.getColumnCount());
        }

        // will call `refresh` if `preventRefresh` is not true
        this.setColumnWidth(w, preventRefresh);
    },

    // private
    getAvailableWidthForSchedule: function () {
        var available = (this.lastBox && this.lastBox.width) || this.getWidth();
        var items = this.headerCt.items.items;

        // substracting the widths of all columns starting from 2nd ("right" columns)
        for (var i = 1; i < items.length; i++) {
            available -= items[i].getWidth();
        }

        return available - Ext.getScrollbarSize().width - 1;
    },


    getRightColumnsWidth: function () {
        var total = 0;
        var items = this.headerCt.items.items;

        for (var i = 1; i < items.length; i++) {
            total += items[i].getWidth();
        }

        return total;
    },


    // monkey patch for "right column" + "forceFit" combination
    // the positions of the headers for right columns are calculated wrong - fixing them manually 
    fixRightColumnsPositions: function () {
        var items = this.headerCt.items.items;

        var leftPos = items[0].getWidth();

        for (var i = 1; i < items.length; i++) {
            var item = items[i];

            item.el.setLeft(leftPos);

            leftPos += item.getWidth();
        }
    },

    /**
    * <p>Returns the Ext Element representing an event record</p> 
    * @param {Sch.model.Event} record The event record
    * @return {Ext.Element} The Ext.Element representing the event record
    */
    getElementFromEventRecord: function (record) {
        return Ext.get(this.eventPrefix + record.internalId);
    },


    getEventNodeByRecord: function (record) {
        return document.getElementById(this.eventPrefix + record.internalId);
    },


    /**
    * <p>Returns the Ext Element representing an event record</p> 
    * @param {Ext.data.Model} record The record
    * @return {Ext.Element} The Ext Element representing the event record
    */
    getOuterElementFromEventRecord: function (record) {
        return Ext.get(this.eventPrefix + record.internalId);
    },


    // private
    resolveColumnIndex: function (x) {
        return Math.floor(x / this.getActualTimeColumnWidth());
    },

    /**
    * Gets the start and end dates for an element Region
    * @param {Region} region The region to map to start and end dates
    * @param {String} roundingMethod The rounding method to use
    * @returns {Object} an object containing start/end properties
    */
    getStartEndDatesFromRegion: function (region, roundingMethod) {
        throw 'Must be implemented by horizontal/vertical';
    },


    // private
    setupTooltip: function () {
        var me = this,
            tipCfg = Ext.apply({
                renderTo: Ext.getBody(),
                delegate: me.eventSelector,
                target: me.el,
                anchor: 'b'
            }, me.tipCfg);

        me.tip = Ext.create('Ext.ToolTip', tipCfg);
        me.tip.on({
            beforeshow: function (tip) {
                if (!tip.triggerElement || !tip.triggerElement.id) {
                    return false;
                }

                var record = this.resolveEventRecord(tip.triggerElement);

                if (!record || this.fireEvent('beforetooltipshow', this, record) === false) {
                    return false;
                }

                tip.update(this.tooltipTpl.apply(this.getDataForTooltipTpl(record)));

                return true;
            },
            scope: this
        });
    },

    /**
    * Template method to allow you to easily provide data for your {@link Sch.mixing.TimelinePanel#tooltipTpl} template.
    * @return {Mixed} The data to be applied to your template, typically any object or array.
    */
    getDataForTooltipTpl: function (record) {
        return record.data;
    },

    /**
    * Returns the current time resolution object, which contains a unit identifier and an increment count.
    * @return {Object} The time resolution object
    */
    getTimeResolution: function () {
        return this.timeAxis.getResolution();
    },

    /**
    * Sets the current time resolution, composed by a unit identifier and an increment count.
    * @return {Object} The time resolution object
    */
    setTimeResolution: function (unit, increment) {
        this.timeAxis.setResolution(unit, increment);

        // View will have to be updated to support snap to increment
        if (this.snapToIncrement) {
            this.refreshKeepingScroll();
        }
    },

    /**
    * <p>Returns the event id for a DOM id </p>
    * @private
    * @param {String} id The id of the DOM node
    * @return {Ext.data.Model} The event record
    */
    getEventIdFromDomNodeId: function (id) {
        return id.substring(this.eventPrefix.length);
    },


    /**
    *  Gets the time for a DOM event such as 'mousemove' or 'click'
    *  @param {Ext.EventObject} e, the EventObject instance
    *  @param {String} roundingMethod (optional), 'floor' to floor the value or 'round' to round the value to nearest increment
    *  @returns {Date} The date corresponding to the EventObject x coordinate
    */
    getDateFromDomEvent: function (e, roundingMethod) {
        return this.getDateFromXY(e.getXY(), roundingMethod);
    },

    // private
    handleScheduleEvent: function (e) {
        var t = e.getTarget('.' + this.timeCellCls, 2);

        if (t) {
            var clickedDate = this.getDateFromDomEvent(e, 'floor');
            this.fireEvent('schedule' + e.type, this, clickedDate, this.indexOf(this.findItemByChild(t)), e);
        }
    },

    setupTimeCellEvents: function () {
        this.mon(this.el, {
            click: this.handleScheduleEvent,
            dblclick: this.handleScheduleEvent,
            contextmenu: this.handleScheduleEvent,
            scope: this
        }, this);
    },

    /**
    * [Experimental] Returns the pixel increment for the current view resolution.
    * @return {Int} The width increment
    */
    getSnapPixelAmount: function () {
        if (this.snapToIncrement) {
            var resolution = this.timeAxis.getResolution();
            return (resolution.increment || 1) * this.getSingleUnitInPixels(resolution.unit);
        } else {
            return 1;
        }
    },

    getActualTimeColumnWidth: function () {
        return this.headerCt.items.get(0).getTimeColumnWidth();
    },

    /**
    * Controls whether the scheduler should snap to the resolution when interacting with it.
    * @param {Boolean} enabled true to enable snapping when interacting with events.
    */
    setSnapEnabled: function (enabled) {
        this.snapToIncrement = enabled;

        if (enabled) {
            this.refreshKeepingScroll();
        }
    },

    /**
    * Sets the readonly state which limits the interactivity (resizing, drag and drop etc).
    * @param {Boolean} readOnly The new readOnly state
    */
    setReadOnly: function (readOnly) {
        this.readOnly = readOnly;
        this[readOnly ? 'addCls' : 'removeCls'](this._cmpCls + '-readonly');
    },

    /**
    * Returns true if the view is currently readOnly.
    * @return {Boolean} readOnly 
    */
    isReadOnly: function () {
        return this.readOnly;
    },

    /**
    * Sets the current orientation.
    * 
    * @param {String} orientation Either 'horizontal' or 'vertical'
    */
    setOrientation: function (orientation) {
        this.orientation = orientation;
        // Apply the orientation specific view methods/properties from the horizontal or vertical meta classes
        Ext.apply(this, Sch.view[Ext.String.capitalize(orientation)].prototype.props);
    },

    /**
    * Returns the current view orientation
    * @return {String} The view orientation ('horizontal' or 'vertical')
    */
    getOrientation: function () {
        return this.orientation;
    },

    translateToScheduleCoordinate: function (x) {
        throw 'Abstract method call!';
    },

    translateToPageCoordinate: function (x) {
        throw 'Abstract method call!';
    },

    /**
    * Gets the date for an XY coordinate
    * @param {Array} xy The page X and Y coordinates
    * @param {String} roundingMethod The rounding method to use
    * @returns {Date} the Date corresponding to the xy coordinate
    * @param {Boolean} local, true if the passed x/y coordinates are "local" to the scheduling view element
    * @abstract
    */
    getDateFromXY: function (xy, roundingMethod, local) {
        throw 'Abstract method call!';
    },

    /**
    *  Gets xy coordinates relative to the element containing the time columns time for a date
    *  @param {Date} xy, the page X and Y coordinates
    *  @param {Boolean} local, true to return a coordinate local to the element containing the calendar columns
    *  @returns {Array} the XY coordinates representing the date
    */
    getXYFromDate: function (date, local) {
        throw 'Abstract method call!';
    },

    /**
    *  Returns the region for a "global" time span in the view. Coordinates are relative to element containing the time columns
    *  @param {Date} startDate The start date of the span
    *  @param {Date} endDate The end date of the span
    *  @return {Ext.util.Region} The region for the time span
    */
    getTimeSpanRegion: function (startDate, endDate) {
        throw 'Abstract method call!';
    },

    /**
    * Method to get a the current start date of the scheduler view
    * @return {Date} The start date
    */
    getStart: function () {
        return this.timeAxis.getStart();
    },

    /**
    * Method to get a the current end date of the scheduler view
    * @return {Date} The end date
    */
    getEnd: function () {
        return this.timeAxis.getEnd();
    },

    /**
    * Sets the amount of margin to keep between bars and rows.
    * @param {Int} margin The new margin value
    * @param {Boolean} preventRefresh true to skip refreshing the view
    */
    setBarMargin: function (margin, preventRefresh) {
        this.barMargin = margin;
        if (!preventRefresh) {
            this.refreshKeepingScroll();
        }
    },


    /**
    * Sets the height of row
    * @param {Number} height The height to set
    * @param {Boolean} preventRefresh `true` to prevent view refresh
    */
    setRowHeight: function (height, preventRefresh) {
        this.rowHeight = height || 24;

        if (this.rendered && !preventRefresh) {
            this.refreshKeepingScroll();
        }
    },

    /**
    * Refreshes the view and maintains the scroll position.
    */
    refreshKeepingScroll: function (lightRefresh) {
        this.saveScrollState();
        if (this.lightRefresh) {
            this.lightRefresh();
        } else {
            this.refresh();
        }
        this.restoreScrollState();
    },

    /**
    * Refreshes the view and maintains the resource axis scroll position.
    */
    refreshKeepingResourceScroll: function (lightRefresh) {
        var dom = this.el.dom,
            top = dom.scrollTop,
            left = dom.scrollLeft;

        if (this.lightRefresh) {
            this.lightRefresh();
        } else {
            this.refresh();
        }

        if (this.getOrientation() === 'horizontal') {
            dom.scrollTop = top;
        } else {
            dom.scrollLeft = left;
        }
    },

    /**
    * Refreshes the view without causing resize calculations, layout cycles.
    */
    lightRefresh: function () {
        var old = this.refreshSize;
        Ext.suspendLayouts();
        this.refreshSize = Ext.emptyFn;
        this.refresh();
        this.refreshSize = old;
        Ext.resumeLayouts();
    }

    /**
    * Sets the width of individual time column
    * @param {Number} width The width to set
    * @param {Boolean} preventRefresh `true` to prevent view refresh
    */
    //    setColumnWidth : function (width, preventRefresh) {
    //        throw 'Abstract method call!';
    //    }
}, function () {
    Ext.apply(Sch, {
        /*PKGVERSION*/VERSION: '2.1.15'
    });
});




/**

@class Sch.view.TimelineGridView
@extends Ext.grid.View
@mixin Sch.mixin.TimelineView

A grid view class, that have consumed the {@link Sch.mixin.TimelineView} mixin. Used internally.

*/

Ext.define("Sch.view.TimelineGridView", {
    extend: "Ext.grid.View",
    mixins: ['Sch.mixin.TimelineView']
}, function () {
    this.override(Sch.mixin.TimelineView.prototype.inheritables() || {});
});
/**

@class Sch.mixin.SchedulerView

A mixin for {@link Ext.view.View} classes, providing "scheduling" functionality to the consuming view. A consuming class
should have already consumed the {@link Sch.mixin.TimelineView} mixin.

Generally, should not be used directly, if you need to subclass the view, subclass the {@link Sch.view.SchedulerGridView} or {@link Sch.view.SchedulerTreeView} 
instead.

*/
Ext.define('Sch.mixin.SchedulerView', {
    uses: [
        'Sch.tooltip.Tooltip'
    ],
    requires: [
        'Sch.feature.DragCreator',
        'Sch.feature.DragDrop',
        'Sch.feature.ResizeZone',
        'Sch.feature.Scheduling',
        'Sch.column.Resource',
        'Sch.view.Horizontal',
        'Sch.view.Vertical'
    ],

    _cmpCls: 'sch-schedulerview',
    scheduledEventName: 'event',

    /**
    * @cfg {Int} barMargin
    * Controls how much space to leave between the event bars and the row borders.
    */
    barMargin: 1,

    /**
    * @cfg {String} eventResizeHandles Defines which resize handles to use. Possible values: 'none', 'start', 'end', 'both'. Defaults to 'end'
    */
    eventResizeHandles: 'end',

    /**
    * @cfg {Boolean} allowOverlap Set to false if you don't want to allow events overlapping (defaults to true).
    */
    allowOverlap: true,

    /**
    * @cfg {Boolean} constrainDragToResource Set to true to only allow dragging events within the same resource.
    */
    constrainDragToResource: false,

    /**
    * @cfg {Boolean} readOnly true to disable editing and interaction such as drag and drop, resizing and creation of new events.
    */
    readOnly: false,

    /**
    * @cfg {Boolean} dynamicRowHeight
    * True to layout events without overlapping, meaning the row height will be dynamically calculated to fit any overlapping events.
    */
    dynamicRowHeight: true,

    /**
    * @cfg {Boolean} managedEventSizing
    * True to size events based on the rowHeight and barMargin settings. Set this to false if you want to control height and top properties via CSS instead.
    */
    managedEventSizing: true,

    /**
    * @cfg {Boolean} eventAnimations
    * True to animate event updates, currently only used in vertical orientation in CSS3 enabled browsers.
    */
    eventAnimations: true,

    /**
    * @property {String} eventSelector
    * @readonly
    * The selector used to identify a scheduled event in the timeline. 
    */
    eventSelector: '.sch-event',

    eventTpl: [
        '<tpl for=".">',
            '<div unselectable="on" id="{{evt-prefix}}{id}" style="left:{left}px;top:{top}px;height:{height}px;width:{width}px;{style}" class="sch-event x-unselectable {internalCls} {cls}">',
                '<div unselectable="on" class="sch-event-inner {iconCls}">',
                    '{body}',
                '</div>',
            '</div>',
        '</tpl>'
    ],

    /**
    * An empty function by default, but provided so that you can perform custom validation on 
    * the item being dragged. This function is called during a drag and drop process and also after the drop is made
    * @param {[Sch.model.Event]} dragRecords an array containing the records for the events being dragged
    * @param {Sch.model.Resource} targetResourceRecord the target resource of the the event 
    * @param {Date} date The date corresponding to the drag proxy position
    * @param {Int} duration The duration of the item being dragged in milliseconds
    * @param {Event} e The event object
    * @return {Boolean} true if the drop position is valid, else false to prevent a drop
    */
    dndValidatorFn: function (dragRecords, targetResourceRecord, date, duration, e) {
        return true;
    },

    /**
    * An empty function by default, but provided so that you can perform custom validation on 
    * an item being resized.
    * @param {Sch.model.Resource} resourceRecord the resource of the row in which the event is located
    * @param {Sch.model.Event} eventRecord the event being resized
    * @param {Date} startDate
    * @param {Date} endDate
    * @param {Event} e The event object
    * @return {Boolean} true if the resize state is valid, else false
    */
    resizeValidatorFn: function (resourceRecord, eventRecord, startDate, endDate, e) {
        return true;
    },

    /**
    * An empty function by default, but provided so that you can perform custom validation on the item being created
    * @param {Sch.model.Resource} resourceRecord the resource for which the event is being created
    * @param {Date} startDate
    * @param {Date} endDate
    * @param {Event} e The event object
    * @return {Boolean} true if the creation event is valid, else false
    */
    createValidatorFn: function (resourceRecord, startDate, endDate, e) {
        return true;
    },

    inheritables: function () {
        return {

            // Configuring underlying grid view 
            loadingText: 'Loading events...',
            trackOver: false,
            overItemCls: '',
            // EOF: Configuring underlying grid view 

            // private
            initComponent: function () {

                this.addEvents(
                // Scheduled events: click events --------------------------

                /**
                * @event eventclick
                * Fires when an event is clicked
                * @param {Mixed} view The scheduler view instance
                * @param {Sch.model.Event} eventRecord The event record of the clicked event
                * @param {Ext.EventObject} e The event object
                */
                    'eventclick',

                /**
                * @event eventmousedown
                * Fires when a mousedown event is detected on a rendered event
                * @param {Mixed} view The scheduler view instance
                * @param {Sch.model.Event} eventRecord The event record
                * @param {Ext.EventObject} e The event object
                */
                    'eventmousedown',

                /**
                * @event eventmouseup
                * Fires when a mouseup event is detected on a rendered event
                * @param {Mixed} view The scheduler view instance
                * @param {Sch.model.Event} eventRecord The event record
                * @param {Ext.EventObject} e The event object
                */
                    'eventmouseup',

                /**
                * @event eventdblclick
                * Fires when an event is double clicked
                * @param {Mixed} view The scheduler view instance
                * @param {Sch.model.Event} eventRecord The event record of the clicked event
                * @param {Ext.EventObject} e The event object
                */
                    'eventdblclick',

                /**
                * @event eventcontextmenu
                * Fires when contextmenu is activated on an event
                * @param {Mixed} view The scheduler view instance
                * @param {Sch.model.Event} eventRecord The event record of the clicked event
                * @param {Ext.EventObject} e The event object
                */
                    'eventcontextmenu',

                /**
                * @event eventmouseenter
                * Fires when the mouse moves over an event 
                * @param {Mixed} view The scheduler view instance
                * @param {Sch.model.Event} eventRecord The event record 
                * @param {Ext.EventObject} e The event object
                */
                    'eventmouseenter',
                /**
                * @event eventmouseout
                * Fires when the mouse moves out of an event 
                * @param {Mixed} view The scheduler view instance
                * @param {Sch.model.Event} eventRecord The event record
                * @param {Ext.EventObject} e The event object
                */
                    'eventmouseout',

                // Resizing events start --------------------------
                /**
                * @event beforeeventresize
                * Fires before a resize starts, return false to stop the execution
                * @param {Mixed} view The scheduler view instance
                * @param {Sch.model.Event} record The record about to be resized
                * @param {Ext.EventObject} e The event object
                */
                    'beforeeventresize',

                /**
                * @event eventresizestart
                * Fires when resize starts
                * @param {Mixed} view The scheduler view instance
                * @param {Sch.model.Event} record The event record being resized
                */
                    'eventresizestart',

                /**
                * @event eventpartialresize
                * Fires during a resize operation and provides information about the current start and end of the resized event
                * @param {Mixed} view The scheduler view instance
                * @param {Sch.model.Event} record The event record being resized
                * @param {Date} startDate The new start date of the event
                * @param {Date} endDate The new end date of the event
                * @param {Ext.Element} element The proxy element being resized
                */
                    'eventpartialresize',

                /**
                * @event eventresizeend
                * Fires after a succesful resize operation
                * @param {Mixed} view The scheduler view instance
                * @param {Sch.model.Event} record The updated event record
                */
                    'eventresizeend',
                // Resizing events end --------------------------

                // Dnd events start --------------------------
                /**
                * @event beforeeventdrag
                * Fires before a dnd operation is initiated, return false to cancel it
                * @param {Mixed} view The scheduler view instance
                * @param {Sch.model.Event} record The record corresponding to the node that's about to be dragged
                * @param {Ext.EventObject} e The event object
                */
                    'beforeeventdrag',

                /**
                * @event eventdragstart
                * Fires when a dnd operation starts
                * @param {SchedulerPanel} scheduler The scheduler object
                * @param {Array} records the records being dragged
                */
                    'eventdragstart',

                /**
                * @event eventdrop
                * Fires after a succesful drag and drop operation
                * @param {Mixed} view The scheduler view instance
                * @param {[Sch.model.Event]} records the affected records (if copies were made, they were not inserted into the store)
                * @param {Boolean} isCopy True if the records were copied instead of moved
                */
                    'eventdrop',

                /**
                * @event aftereventdrop
                * Fires when after a drag n drop operation, even when drop was performed on an invalid location
                * @param {Mixed} view The scheduler view instance
                */
                    'aftereventdrop',
                // Dnd events end --------------------------

                // Drag create events start --------------------------
                /**
                * @event beforedragcreate
                * Fires before a drag starts, return false to stop the execution
                * @param {Mixed} view The scheduler view instance
                * @param {Sch.model.Resource} resource The resource record
                * @param {Ext.EventObject} e The event object
                */
                    'beforedragcreate',

                /**
                * @event dragcreatestart
                * Fires before a drag starts, return false to stop the execution
                * @param {Mixed} view The scheduler view instance
                */
                    'dragcreatestart',

                /**
                * @event dragcreateend
                * Fires after a successful drag-create operation
                * @param {Mixed} view The scheduler view instance
                * @param {Sch.model.Event} newEventRecord The newly created event record (added to the store in onEventCreated method)
                * @param {Sch.model.Resource} resource The resource record to which the event belongs
                * @param {Ext.EventObject} e The event object
                */
                    'dragcreateend',

                /**
                * @event afterdragcreate
                * Always fires after a drag-create operation
                * @param {Mixed} view The scheduler view instance
                */
                    'afterdragcreate',
                // Drag create events end --------------------------

                /**
                * @event beforeeventadd
                * Fires after a successful drag-create operation, before the new event is added to the store. Return false to prevent the event from being added to the store.
                * @param {Mixed} view The scheduler view instance
                * @param {Sch.model.Event} newEventRecord The newly created event record 
                */
                    'beforeeventadd'
                );

                this.callParent(arguments);
                var pnl = this.panel._top;

                Ext.apply(this, {
                    eventStore: pnl.eventStore,
                    resourceStore: pnl.resourceStore,

                    eventBodyTemplate: pnl.eventBodyTemplate,
                    eventTpl: pnl.eventTpl || this.eventTpl,
                    eventBarTextField: pnl.eventBarTextField || pnl.eventStore.model.prototype.nameField,
                    allowOverlap: pnl.allowOverlap,

                    eventBarIconClsField: pnl.eventBarIconClsField,
                    onEventCreated: pnl.onEventCreated || Ext.emptyFn,
                    constrainDragToResource: pnl.constrainDragToResource
                });

                var me = this;

                if (Ext.isArray(me.eventTpl)) {
                    var clone = Ext.Array.clone(me.eventTpl),
                        resizeTpl = '<div class="sch-resizable-handle sch-resizable-handle-{0}"></div>';

                    if (this.eventResizeHandles === 'start' || this.eventResizeHandles === 'both') {
                        clone.splice(2, 0, Ext.String.format(resizeTpl, 'start'));
                    }
                    if (this.eventResizeHandles === 'end' || this.eventResizeHandles === 'both') {
                        clone.splice(2, 0, Ext.String.format(resizeTpl, 'end'));
                    }

                    var tplString = clone.join('').replace('{{evt-prefix}}', this.eventPrefix);
                    me.eventTpl = Ext.create('Ext.XTemplate', tplString);
                }
            },


            setReadOnly: function (readOnly) {
                if (this.dragCreator) {
                    this.dragCreator.setDisabled(readOnly);
                }
                this.callParent(arguments);
            },

            prepareData: function (data, idx, record) {
                var orig = this.callParent(arguments);
                orig = this.collectRowData(orig, record, idx);
                return orig;
            },

            initFeatures: function () {
                this.features = this.features || [];
                this.features.push({
                    ftype: 'scheduling'
                });
                this.callParent(arguments);
            },

            beforeRender: function () {
                this.callParent(arguments);
                this.addCls(this._cmpCls);

                if (this.eventAnimations) {
                    this.addCls('sch-animations-enabled');
                }
            },

            afterRender: function () {
                this.callParent(arguments);

                this.bindEventStore(this.eventStore, true);

                this.setupEventListeners();

                this.configureFunctionality();

                var resizer = this.headerCt.resizer;

                if (resizer) {
                    resizer.doResize = Ext.Function.createSequence(resizer.doResize, this.afterHeaderResized, this);
                }
            },

            // private, clean up
            onDestroy: function () {
                this.bindEventStore(null);
                this.callParent(arguments);
            }
        };
    },


    /**
    * Returns the current row height used by the view (only applicable in a horizontal view)
    * @return {Number} The row height
    */
    getRowHeight: function () {
        return this.rowHeight;
    },


    /**
    *  Takes a global page-X coordinate and returns the x position on the SchedulerView element.
    *  @private
    *  @param {Int} x the page x coordinate
    *  @return {Int} The 'local' scheduler view X coordinate
    */
    translateToScheduleCoordinate: function (x) {
        throw 'Must be defined by horizontal/vertical class';
    },


    getEventBox: function (start, end) {
        throw 'Must be defined by horizontal/vertical class';
    },

    generateTplData: function (event, viewStart, viewEnd, resourceRecord, resourceIndex) {
        var start = event.getStartDate(),
            end = event.getEndDate(),
            eventBox = this.getEventBox(Sch.util.Date.max(start, viewStart), Sch.util.Date.min(end, viewEnd)),
            internalCls = event.getCls(),
            tplData;

        internalCls += ' sch-event-resizable-' + event.getResizable();

        if (event.dirty) internalCls += ' sch-dirty ';
        if (end > viewEnd) internalCls += ' sch-event-endsoutside ';
        if (start < viewStart) internalCls += ' sch-event-startsoutside ';
        if (end - start === 0) internalCls += ' sch-event-milestone';
        if (this.eventBarIconClsField) internalCls += ' sch-event-withicon ';
        if (event.isDraggable() === false) internalCls += ' sch-event-fixed ';
        if (end - start === 0) internalCls += ' sch-event-milestone ';

        tplData = Ext.apply(eventBox, {
            id: event.internalId,
            internalCls: internalCls,
            start: start,
            end: end,
            iconCls: event.data[this.eventBarIconClsField] || ''
        });

        if (this.eventRenderer) {
            // User has specified a renderer fn, either to return a simple string, or an object intended for the eventBodyTemplate
            var value = this.eventRenderer.call(this.eventRendererScope || this, event, resourceRecord, tplData, resourceIndex);
            if (Ext.isObject(value) && this.eventBodyTemplate) {
                tplData.body = this.eventBodyTemplate.apply(value);
            } else {
                tplData.body = value;
            }
        } else if (this.eventBodyTemplate) {
            // User has specified an eventBodyTemplate, but no renderer - just apply the entire event record data.
            tplData.body = this.eventBodyTemplate.apply(event.data);
        } else if (this.eventBarTextField) {
            // User has specified a field in the data model to read from
            tplData.body = event.data[this.eventBarTextField];
        }
        return tplData;
    },

    sortEvents: function (a, b) {
        var sameStart = (a.start - b.start === 0);

        if (sameStart) {
            return a.end > b.end ? -1 : 1;
        } else {
            return (a.start < b.start) ? -1 : 1;
        }
    },

    // Layout the items to consume as little vertical space as possible
    layoutEvents: function (row) {
        throw 'Must be defined by horizontal/vertical class';
    },

    findClosestSuccessor: function (event, events) {
        var minGap = Infinity,
            closest,
            eventEnd = event.end,
            gap;

        for (var i = 0, l = events.length; i < l; i++) {
            gap = events[i].start - eventEnd;

            if (gap >= 0 && gap < minGap) {
                closest = events[i];
                minGap = gap;
            }
        }
        return closest;
    },

    /**
    * Resolves the resource based on a dom element
    * @param {HtmlElement} node The HTML element
    * @return {Sch.model.Resource} The resource corresponding to the element, or null if not found.
    */
    resolveResource: function (node) {
        throw 'Must be defined by horizontal/vertical class';
    },

    /**
    * Gets the Ext.util.Region represented by the schedule and optionally only for a single resource. The view will ask the scheduler for 
    * the resource availability by calling getResourceAvailability. By overriding that method you can constrain events differently for
    * different resources.
    * @param {Sch.model.Resource} resourceRecord (optional) The resource record 
    * @param {Sch.model.Event} eventRecord (optional) The event record 
    * @return {Ext.util.Region} The region of the schedule
    */
    getScheduleRegion: function (resourceRecord, eventRecord) {
        throw 'Must be defined by horizontal/vertical class';
    },

    /**
    * <p>Returns the event record for a DOM element </p>
    * @param {mixed} el The DOM node or Ext Element to lookup
    * @return {Sch.model.Event} The event record
    */
    resolveEventRecord: function (el) {
        var element = Ext.get(el);
        if (!element.is(this.eventSelector)) {
            element = element.up(this.eventSelector);
        }
        return this.getEventRecordFromDomId(element.id);
    },

    // DEPRECATED
    getResourceByEventRecord: function (eventRecord) {
        return eventRecord.getResource();
    },

    /**
    * <p>Returns the event record for a DOM id </p>
    * @param {String} id The id of the DOM node
    * @return {Sch.model.Event} The event record
    */
    getEventRecordFromDomId: function (id) {
        var trueId = this.getEventIdFromDomNodeId(id);
        return this.eventStore.getByInternalId(trueId);
    },


    configureFunctionality: function () {
        var vfScope = this.validatorFnScope || this;

        if (this.eventResizeHandles !== 'none' && Sch.feature.ResizeZone) {
            this.resizePlug = Ext.create("Sch.feature.ResizeZone", Ext.applyIf({
                schedulerView: this,
                validatorFn: function (resourceRecord, eventRecord, startDate, endDate) {
                    return (this.allowOverlap || this.isDateRangeAvailable(startDate, endDate, eventRecord, resourceRecord)) &&
                            this.resizeValidatorFn.apply(vfScope, arguments) !== false;
                },
                validatorFnScope: this
            }, this.resizeConfig || {}));
        }

        if (this.enableEventDragDrop !== false && Sch.feature.DragDrop) {

            this.dragdropPlug = Ext.create("Sch.feature.DragDrop", this, {
                validatorFn: function (dragRecords, targetResourceRecord, date, duration, e) {
                    return (this.allowOverlap || this.isDateRangeAvailable(date, Sch.util.Date.add(date, Sch.util.Date.MILLI, duration), dragRecords[0], targetResourceRecord)) &&
                            this.dndValidatorFn.apply(vfScope, arguments) !== false;
                },
                validatorFnScope: this,
                dragConfig: this.dragConfig || {},
                dropConfig: this.dropConfig || {}
            });
        }

        if (this.enableDragCreation !== false && Sch.feature.DragCreator) {
            this.dragCreator = Ext.create("Sch.feature.DragCreator", Ext.applyIf({
                schedulerView: this,
                disabled: this.readOnly,
                validatorFn: function (resourceRecord, startDate, endDate) {
                    return (this.allowOverlap || this.isDateRangeAvailable(startDate, endDate, null, resourceRecord)) &&
                            this.createValidatorFn.apply(vfScope, arguments) !== false;
                },
                validatorFnScope: this
            }, this.createConfig || {}));
        }
    },

    /**
    * Checks if a date range is allocated or not for a given resource.
    * @param {Date} start The start date
    * @param {Date} end The end date
    * @param {Sch.model.Event} excludeEvent An event to exclude from the check (or null)
    * @param {Sch.model.Resource} resource The resource
    * @return {Boolean} True if the timespan is available for the resource
    */
    isDateRangeAvailable: function (start, end, excludeEvent, resource) {
        return this.eventStore.isDateRangeAvailable(start, end, excludeEvent, resource);
    },

    /**
    * Returns events that are (partly or fully) inside the timespan of the current view.
    * @return {Ext.util.MixedCollection} The collection of events
    */
    getEventsInView: function () {
        var viewStart = this.timeAxis.getStart(),
            viewEnd = this.timeAxis.getEnd();

        return this.eventStore.getEventsInTimeSpan(viewStart, viewEnd);
    },

    /**
    * Returns the current set of rendered event nodes
    * @return {CompositeElement} The collection of event nodes
    */
    getEventNodes: function () {
        return this.el.select(this.eventSelector);
    },

    /**
    * Empty by default but provided so that you can override it. This is called when before a drag/resize/create operation which 
    * enables you to restrict the editing to a portion of the visible scheduler (for example the availability of a resource).
    * @param {Sch.model.Resource} resourceRecord The resource record
    * @param {Sch.model.Event/Date} eventRecord The resource record if operating on an existing event, or the clicked date if the operation is a create operation.
    */


    onBeforeDragDrop: function (s, rec, e) {
        return !this.readOnly && !e.getTarget().className.match('sch-resizable-handle');
    },

    onDragDropStart: function () {
        if (this.dragCreator) {
            this.dragCreator.setDisabled(true);
        }

        if (this.tip) {
            this.tip.hide();
            this.tip.disable();
        }
    },

    onDragDropEnd: function () {
        if (this.dragCreator) {
            this.dragCreator.setDisabled(false);
        }

        if (this.tip) {
            this.tip.enable();
        }
    },

    onBeforeDragCreate: function (s, resourceRecord, date, e) {
        return !this.readOnly && !e.ctrlKey;
    },

    onDragCreateStart: function () {
        if (this.overClass) {
            var v = this.getView().mainBody;
            this.mun(v, "mouseover", this.onMouseOver, this);
            this.mun(v, "mouseout", this.onMouseOut, this);
        }

        if (this.tip) {
            this.tip.hide();
            this.tip.disable();
        }
    },

    onDragCreateEnd: function (s, newEventRecord, e) {
        // If an event editor is defined, it has to manage how/if/when the event is added to the event store
        if (!this.eventEditor) {
            if (this.fireEvent('beforeeventadd', this, newEventRecord) !== false) {
                this.onEventCreated(newEventRecord);
                this.eventStore.add(newEventRecord);
            }
            this.dragCreator.getProxy().hide();
        }
    },

    onEventCreated: function (newEventRecord) {
        // Empty but provided so that you can override it to supply default record values etc.
    },

    onAfterDragCreate: function () {
        if (this.overClass) {
            this.mon(this.getView().mainBody, {
                "mouseover": this.onMouseOver,
                "mouseout": this.onMouseOut,
                scope: this
            });
        }

        if (this.tip) {
            this.tip.enable();
        }
    },

    onBeforeResize: function (s, rec, e) {
        return !this.readOnly;
    },

    onResizeStart: function () {
        if (this.tip) {
            this.tip.hide();
            this.tip.disable();
        }

        if (this.dragCreator) {
            this.dragCreator.setDisabled(true);
        }
    },

    onResizeEnd: function () {
        if (this.tip) {
            this.tip.enable();
        }

        if (this.dragCreator) {
            this.dragCreator.setDisabled(false);
        }
    },

    getEventStore: function () {
        return this.eventStore;
    },

    registerEventEditor: function (editor) {
        this.eventEditor = editor;
    },

    getEventEditor: function () {
        return this.eventEditor;
    },


    setupEventListeners: function () {
        this.on({
            beforeeventdrag: this.onBeforeDragDrop,
            eventdragstart: this.onDragDropStart,
            aftereventdrop: this.onDragDropEnd,

            beforedragcreate: this.onBeforeDragCreate,
            dragcreatestart: this.onDragCreateStart,
            dragcreateend: this.onDragCreateEnd,
            afterdragcreate: this.onAfterDragCreate,

            beforeeventresize: this.onBeforeResize,
            eventresizestart: this.onResizeStart,
            eventresizeend: this.onResizeEnd,

            scope: this
        });
    },

    // Call orientation specific implementation
    _onEventUpdate: function (store, model, operation) {
        if (operation !== Ext.data.Model.COMMIT) {
            this.onEventUpdate.apply(this, arguments);
        }
    },

    // Call orientation specific implementation
    _onEventAdd: function (s, recs) {
        this.onEventAdd.apply(this, arguments);
    },

    // Call orientation specific implementation
    _onEventRemove: function (s, recs) {
        this.onEventRemove.apply(this, arguments);
    },

    bindEventStore: function (eventStore, initial) {
        var me = this;

        var listeners = {
            scope: me,
            refresh: me.onEventDataRefresh,
            add: me._onEventAdd,
            remove: me._onEventRemove,
            update: me._onEventUpdate,
            clear: me.refresh
        };

        // "refresh" event is not fired for TreeStores as of 4.1.x, so we need to track some
        // other event - "load" in this case
        if (Ext.ClassManager.isCreated('Ext.data.TreeStore') && (eventStore || me.eventStore) instanceof Ext.data.TreeStore) {
            listeners.load = me.onEventDataRefresh;
        }

        if (!initial && me.eventStore) {
            if (eventStore !== me.eventStore && me.eventStore.autoDestroy) {
                me.eventStore.destroy();
            }
            else {
                me.mun(me.eventStore, listeners);
            }
            if (!eventStore) {
                if (me.loadMask && me.loadMask.bindStore) {
                    me.loadMask.bindStore(null);
                }
                me.eventStore = null;
            }
        }
        if (eventStore) {
            eventStore = Ext.data.StoreManager.lookup(eventStore);
            me.mon(eventStore, listeners);
            if (me.loadMask && me.loadMask.bindStore) {
                me.loadMask.bindStore(eventStore);
            }
        }

        me.eventStore = eventStore;

        if (eventStore && !initial) {
            me.refresh();
        }
    },

    onEventDataRefresh: function () {
        this.refreshKeepingScroll();
    },

    afterHeaderResized: function () {
        var resizer = this.headerCt.resizer;

        if (resizer && resizer.dragHd instanceof Sch.column.Resource) {
            var w = resizer.dragHd.getWidth();
            this.setColumnWidth(w);
        }
    },


    // invoked by the selection model to maintain visual UI cues
    onEventSelect: function (record) {
        var node = this.getEventNodeByRecord(record);
        if (node) {
            Ext.fly(node).addCls(this.selectedEventCls);
        }
    },

    // invoked by the selection model to maintain visual UI cues
    onEventDeselect: function (record) {
        var node = this.getEventNodeByRecord(record);
        if (node) {
            Ext.fly(node).removeCls(this.selectedEventCls);
        }
    }
});

/**

@class Sch.view.SchedulerGridView
@extends Sch.view.TimelineGridView
@mixin Sch.mixin.SchedulerView

Desc

*/
Ext.define("Sch.view.SchedulerGridView", {
    extend: 'Sch.view.TimelineGridView',
    mixins: ['Sch.mixin.SchedulerView'],
    alias: 'widget.schedulergridview',
    alternateClassName: 'Sch.HorizontalSchedulerView'
}, function () {
    this.override(Sch.mixin.SchedulerView.prototype.inheritables() || {});
});


/**
@class Sch.mixin.Zoomable

A mixin for {@link Sch.mixin.TimelinePanel} class, providing "zooming" functionality to the consuming panel. 

The zooming feature works by reconfiguring panel's time axis with the current zoom level values selected from the {@link #zoomLevels} array. 
Zoom levels can be added and removed from the array to change the amount of available steps. Range of zooming in/out can be also
modified with {@link #maxZoomLevel} / {@link #minZoomLevel} properties.

This mixin adds additional methods to the scheduler : {@link #setMaxZoomLevel}, {@link #setMinZoomLevel}, {@link #zoomToLevel}, {@link #zoomIn}, 
{@link #zoomOut}, {@link #zoomInFull}, {@link #zoomOutFull}.

Notice: zooming doesn't work properly when `forceFit` option is set to true for the panel.
*/

Ext.define('Sch.mixin.Zoomable', {
    /**
    * @cfg {Array} [zoomLevels=Array] Predefined map of zoom levels for each preset in the ascending order. Zoom level is basically a {@link Sch.preset.ViewPreset view preset},
    * which is based on another preset, with some values overriden. 
    * 
    * Each element is an {Object} with the following parameters :
    * 
    * - `preset` (String)      - {@link Sch.preset.ViewPreset} to be used for this zoom level. This must be a valid preset name registered in {@link Sch.preset.Manager preset manager}.
    * - `width` (Int)          - {@link Sch.preset.ViewPreset#timeColumnWidth timeColumnWidth} time column width value from the preset 
    * - `increment` (Int)      - {@link Sch.preset.ViewPresetHeaderRow#increment increment} value from the bottom header row of the preset
    * - `resolution` (Int)     - {@link Sch.preset.ViewPreset#timeResolution increment} part of the `timeResolution` object in the preset
    * - `resolutionUnit` (String) (Optional) - {@link Sch.preset.ViewPreset#timeResolution unit} part of the `timeResolution` object in the preset
    */
    zoomLevels: [
    //YEAR
        {width: 30, increment: 1, resolution: 1, preset: 'year', resolutionUnit: 'MONTH' },
        { width: 50, increment: 1, resolution: 1, preset: 'year', resolutionUnit: 'MONTH' },
        { width: 100, increment: 1, resolution: 1, preset: 'year', resolutionUnit: 'MONTH' },
        { width: 200, increment: 1, resolution: 1, preset: 'year', resolutionUnit: 'MONTH' },

    //MONTH
        {width: 100, increment: 1, resolution: 7, preset: 'monthAndYear', resolutionUnit: 'DAY' },
        { width: 30, increment: 1, resolution: 1, preset: 'weekDateAndMonth', resolutionUnit: 'DAY' },

    //WEEK
        {width: 35, increment: 1, resolution: 1, preset: 'weekAndMonth', resolutionUnit: 'DAY' },
        { width: 50, increment: 1, resolution: 1, preset: 'weekAndMonth', resolutionUnit: 'DAY' },
        { width: 20, increment: 1, resolution: 1, preset: 'weekAndDayLetter' },

    //DAY
        {width: 50, increment: 1, resolution: 1, preset: 'weekAndDay', resolutionUnit: 'HOUR' },
        { width: 100, increment: 1, resolution: 1, preset: 'weekAndDay', resolutionUnit: 'HOUR' },

    //HOUR
        {width: 50, increment: 6, resolution: 30, preset: 'hourAndDay', resolutionUnit: 'MINUTE' },
        { width: 100, increment: 6, resolution: 30, preset: 'hourAndDay', resolutionUnit: 'MINUTE' },
        { width: 60, increment: 2, resolution: 30, preset: 'hourAndDay', resolutionUnit: 'MINUTE' },
        { width: 60, increment: 1, resolution: 30, preset: 'hourAndDay', resolutionUnit: 'MINUTE' },

    //MINUTE
        {width: 30, increment: 15, resolution: 5, preset: 'minuteAndHour' },
        { width: 60, increment: 15, resolution: 5, preset: 'minuteAndHour' },
        { width: 130, increment: 15, resolution: 5, preset: 'minuteAndHour' },
        { width: 60, increment: 5, resolution: 5, preset: 'minuteAndHour' },
        { width: 100, increment: 5, resolution: 5, preset: 'minuteAndHour' }
    ],

    /**
    * @cfg {Int} minZoomLevel Minimal zoom level to which {@link #zoomOut} will work.
    */
    minZoomLevel: null,

    /**
    * @cfg {Int} maxZoomLevel Maximal zoom level to which {@link zoomIn} will work.
    */
    maxZoomLevel: null,


    /**
    * Integer number indicating the size of timespan during zooming. When zooming, the timespan is adjusted to make the scrolling area `visibleZoomFactor` times
    * wider than the scheduler size itself. 
    */
    visibleZoomFactor: 5,


    cachedCenterDate: null,
    isFirstZoom: true,
    isZooming: false,


    initializeZooming: function () {
        //create instance-specific copy of zoomLevels
        this.zoomLevels = this.zoomLevels.slice();

        this.setMinZoomLevel(this.minZoomLevel || 0);
        this.setMaxZoomLevel(this.maxZoomLevel !== null ? this.maxZoomLevel : this.zoomLevels.length - 1);

        this.on('viewchange', this.clearCenterDateCache, this);
    },


    getZoomLevelUnit: function (zoomLevel) {
        var headerConfig = Sch.preset.Manager.getPreset(zoomLevel.preset).headerConfig;

        return headerConfig.bottom ? headerConfig.bottom.unit : headerConfig.middle.unit;
    },


    getMilliSecondsPerPixelForZoomLevel: function (level) {
        var DATE = Sch.util.Date;

        // trying to convert the unit + increment to a number of milliseconds
        // this number is not fixed (month can be 28, 30 or 31 day), but at least this convertion 
        // will be consistent (should be no DST changes at year 1 
        return Math.round(
            (DATE.add(new Date(1, 0, 1), this.getZoomLevelUnit(level), level.increment) - new Date(1, 0, 1)) / level.width
        );
    },


    // XXX possibly merge into "calculateCurrentZoomLevel" and remove after
    presetToZoomLevel: function (presetName) {
        var preset = Sch.preset.Manager.getPreset(presetName);
        var headerConfig = preset.headerConfig;
        var bottom = headerConfig.bottom;
        var middle = headerConfig.middle;

        return {
            preset: presetName,
            increment: (bottom ? bottom.increment : middle.increment) || 1,
            resolution: preset.timeResolution.increment,
            resolutionUnit: preset.timeResolution.unit,
            width: preset.timeColumnWidth
        };
    },


    calculateCurrentZoomLevel: function () {
        var zoomLevel = this.presetToZoomLevel(this.viewPreset);
        var headerConfig = this.timeAxis.headerConfig;
        var bottom = headerConfig.bottom;
        var middle = headerConfig.middle;

        // update the `width` of the zoomLevel 
        zoomLevel.width = this.timeAxis.preset.timeColumnWidth;
        zoomLevel.increment = (bottom ? bottom.increment : middle.increment) || 1;

        return zoomLevel;
    },


    getCurrentZoomLevelIndex: function () {
        var currentZoomLevel = this.calculateCurrentZoomLevel();
        var currentFactor = this.getMilliSecondsPerPixelForZoomLevel(currentZoomLevel);

        var zoomLevels = this.zoomLevels;

        for (var i = 0; i < zoomLevels.length; i++) {
            var zoomLevelFactor = this.getMilliSecondsPerPixelForZoomLevel(zoomLevels[i]);

            if (zoomLevelFactor == currentFactor) return i;

            // current zoom level is outside of pre-defined zoom levels
            if (i === 0 && currentFactor > zoomLevelFactor) return -0.5;
            if (i == zoomLevels.length - 1 && currentFactor < zoomLevelFactor) return zoomLevels.length - 1 + 0.5;

            var nextLevelFactor = this.getMilliSecondsPerPixelForZoomLevel(zoomLevels[i + 1]);

            if (zoomLevelFactor > currentFactor && currentFactor > nextLevelFactor) return i + 0.5;
        }

        throw "Can't find current zoom level index";
    },


    /**
    * Sets the {@link #maxZoomLevel} value.
    * @param {Int} level The level to limit zooming in to.
    */
    setMaxZoomLevel: function (level) {
        if (level < 0 || level >= this.zoomLevels.length) {
            throw new Error("Invalid range for `setMinZoomLevel`");
        }

        this.maxZoomLevel = level;
    },

    /**
    * Sets the {@link #minZoomLevel} value.
    * @param {Int} level The level to limit zooming out to.
    */
    setMinZoomLevel: function (level) {
        if (level < 0 || level >= this.zoomLevels.length) {
            throw new Error("Invalid range for `setMinZoomLevel`");
        }

        this.minZoomLevel = level;
    },


    // when zooming out, the precision for the center date becomes not so good (1px starts to contains too big time interval)
    // because of that zooming will be "floating"
    // to prevent that we cache the center date
    // cache will be cleared after any user scroll operation
    getViewportCenterDateCached: function () {
        if (this.cachedCenterDate) return this.cachedCenterDate;

        return this.cachedCenterDate = this.getViewportCenterDate();
    },


    clearCenterDateCache: function () {
        this.cachedCenterDate = null;
    },


    /**
    * 
    * Allows zooming to certain level of {@link #zoomLevels} array. Automatically limits zooming between {@link #maxZoomLevel} and {@link #minZoomLevel}.
    *
    * @param {Int} level Level to zoom to.
    *
    * @return {Int} level Current zoom level or null if it hasn't changed.
    */
    zoomToLevel: function (level) {
        level = Ext.Number.constrain(level, this.minZoomLevel, this.maxZoomLevel);

        var currentZoomLevel = this.calculateCurrentZoomLevel();
        var currentFactor = this.getMilliSecondsPerPixelForZoomLevel(currentZoomLevel);

        var nextZoomLevel = this.zoomLevels[level];
        var nextFactor = this.getMilliSecondsPerPixelForZoomLevel(nextZoomLevel);

        if (currentFactor == nextFactor) {
            // already at requested zoom level
            return null;
        }

        var me = this;
        var view = this.getSchedulingView();
        var viewEl = view.getEl();

        if (this.isFirstZoom) {
            this.isFirstZoom = false;

            // clear the center date cache on any scroll operation 
            viewEl.on('scroll', this.clearCenterDateCache, this);
        }

        var isVertical = this.orientation == 'vertical';

        var centerDate = this.getViewportCenterDateCached();

        var panelSize = isVertical ? viewEl.getHeight() : viewEl.getWidth();

        var presetCopy = Ext.clone(Sch.preset.Manager.getPreset(nextZoomLevel.preset));

        var optimalDates = this.calculateOptimalDateRange(centerDate, panelSize, nextZoomLevel);

        var headerConfig = presetCopy.headerConfig;
        var bottom = headerConfig.bottom;
        var middle = headerConfig.middle;

        presetCopy[isVertical ? 'rowHeight' : 'timeColumnWidth'] = nextZoomLevel.width;

        if (bottom) {
            bottom.increment = nextZoomLevel.increment;
        } else {
            middle.increment = nextZoomLevel.increment;
        }

        this.isZooming = true;

        this.viewPreset = nextZoomLevel.preset;

        var unit = bottom ? bottom.unit : middle.unit;

        this.timeAxis.reconfigure({
            preset: presetCopy,
            headerConfig: headerConfig,

            unit: unit,
            increment: nextZoomLevel.increment,

            resolutionUnit: Sch.util.Date.getUnitByName(nextZoomLevel.resolutionUnit || unit),
            resolutionIncrement: nextZoomLevel.resolution,

            weekStartDay: this.weekStartDay,

            mainUnit: middle.unit,
            shiftUnit: presetCopy.shiftUnit,
            shiftIncrement: presetCopy.shiftIncrement || 1,

            defaultSpan: presetCopy.defaultSpan || 1,

            start: optimalDates.startDate || this.getStart(),
            end: optimalDates.endDate || this.getEnd()
        });

        var position = view.getXYFromDate(centerDate, true);

        // restore the cached center date to keep it stable
        // this handler will be called 2nd after the clearing handler and will restore the cache
        // this handler will be called only for the programming scroll  called below
        viewEl.on('scroll', function () { me.cachedCenterDate = centerDate; }, this, { single: true });

        if (isVertical) {
            viewEl.scrollTo('top', position[1] - panelSize / 2);
        } else {
            viewEl.scrollTo('left', position[0] - panelSize / 2);
        }

        me.isZooming = false;

        /**
        * @event zoomchange
        * 
        * Fires after zoom level has been changed
        * 
        * @param {Sch.mixin.SchedulerPanel} scheduler The scheduler object
        * @param {Integer} level The index of the new zoom level
        */
        this.fireEvent('zoomchange', this, level);

        return level;
    },

    /**
    * Zooms in Scheduler view following map of zoom levels. If the amount of levels to zoom is given, view will zoom in by this value.
    * Otheriwse a value of `1` will be used.
    *
    * @param {Int levels}[1] (optional) amount of levels to zoom in
    *
    * @return {Int} currentLevel New zoom level of the panel or null if level hasn't changed.
    */
    zoomIn: function (levels) {
        //if called without parameters or with 0, zoomIn by 1 level
        levels = levels || 1;

        var currentZoomLevelIndex = this.getCurrentZoomLevelIndex();

        if (currentZoomLevelIndex >= this.zoomLevels.length - 1) return null;

        return this.zoomToLevel(Math.floor(currentZoomLevelIndex) + levels);
    },

    /**
    * Zooms out Scheduler view following map of zoom levels. If the amount of levels to zoom is given, view will zoom out by this value.
    * Otheriwse a value of `1` will be used.
    *
    * @param {Int levels}[1] (optional) amount of levels to zoom out
    *
    * @return {Int} currentLevel New zoom level of the panel or null if level hasn't changed.
    */
    zoomOut: function (levels) {
        //if called without parameters or with 0, zoomIn by 1 level
        levels = levels || 1;

        var currentZoomLevelIndex = this.getCurrentZoomLevelIndex();

        if (currentZoomLevelIndex <= 0) return null;

        return this.zoomToLevel(Math.ceil(currentZoomLevelIndex) - levels);
    },

    /**
    * Zooms in Scheduler view to the {@link maxZoomLevel} following map of zoom levels.
    * 
    * @return {Int} currentLevel New zoom level of the panel or null if level hasn't changed.
    */
    zoomInFull: function () {
        return this.zoomToLevel(this.maxZoomLevel);
    },

    /**
    * Zooms out Scheduler view to the {@link minZoomLevel} following map of zoom levels.
    * 
    * @return {Int} currentLevel New zoom level of the panel or null if level hasn't changed.
    */
    zoomOutFull: function () {
        return this.zoomToLevel(this.minZoomLevel);
    },


    /*
    * Adjusts the timespan of panel to the new zoom level. Used for performance reasons, 
    * as rendering too many columns takes noticeable amount of time so their number is limited. 
    */
    calculateOptimalDateRange: function (centerDate, panelSize, zoomLevel) {
        var schDate = Sch.util.Date;

        var headerConfig = Sch.preset.Manager.getPreset(zoomLevel.preset).headerConfig;
        var topUnit = headerConfig.top ? headerConfig.top.unit : headerConfig.middle.unit;

        var unit = this.getZoomLevelUnit(zoomLevel);
        //        this is weird, but we need to floor/ceil to the "topUnit" above, not the resolution unit..
        //        var resolutionUnit      = zoomLevel.resolutionUnit ? schDate.getUnitByName(zoomLevel.resolutionUnit) : unit;

        var difference = Math.ceil(panelSize / zoomLevel.width * zoomLevel.increment * this.visibleZoomFactor / 2);

        var startDate = schDate.add(centerDate, unit, -difference);
        var endDate = schDate.add(centerDate, unit, difference);

        return {
            startDate: this.timeAxis.floorDate(startDate, false, topUnit),
            endDate: this.timeAxis.ceilDate(endDate, false, topUnit)
        };
    }
});
/**

@class Sch.mixin.TimelinePanel

A base mixing for {@link Ext.panel.Panel} classes, giving to the consuming panel the "time line" functionality. 
This means that the panel will be capabale to display a list of "events", ordered on the {@link Sch.data.TimeAxis time axis}.

Generally, should not be used directly, if you need to subclass the scheduler panel, subclass the {@link Sch.panel.SchedulerGrid} or {@link Sch.panel.SchedulerTree} 
instead.

*/

Ext.define('Sch.mixin.TimelinePanel', {
    requires: [
        'Sch.util.Patch',
        'Sch.patches.LoadMask',
        'Sch.patches.Model',
        'Sch.patches.Table',

        'Sch.data.TimeAxis',
        'Sch.feature.ColumnLines',
        'Sch.view.Locking',
        'Sch.preset.Manager'
    ],

    mixins: [
        'Sch.mixin.Zoomable',
        'Sch.mixin.Lockable'
    ],

    /**
    * @cfg {String} orientation An initial orientation of the view - can be either `horizontal` or `vertical`. Default value is `horizontal`.
    */
    orientation: 'horizontal',

    /**
    * @cfg {Int} weekStartDay A valid JS date index between 0-6. (0: Sunday, 1: Monday etc.).
    */
    weekStartDay: 1,

    /**
    * @cfg {Boolean} snapToIncrement true to snap to resolution increment while interacting with scheduled events.
    */
    snapToIncrement: false,

    /**
    * @cfg {Boolean} readOnly true to disable editing.
    */
    readOnly: false,

    /**
    * @cfg {String} eventResizeHandles Defines which resize handles to use for resizing events. Possible values: 'none', 'start', 'end', 'both'. Defaults to 'both'
    */
    eventResizeHandles: 'both',

    /**
    * @cfg {Int} rowHeight The row height (used in horizontal mode only)
    */

    /**
    * @cfg {Object} validatorFnScope
    * The scope used for the different validator functions.
    */

    /**
    * @cfg {String} viewPreset A key used to lookup a predefined {@link Sch.preset.ViewPreset} (e.g. 'weekAndDay', 'hourAndDay'), managed by {@link Sch.preset.Manager}. See Sch.preset.Manager for more information.
    */
    viewPreset: 'weekAndDay',

    /**
    * @property {String} viewPreset A name of the current view preset: {@link Sch.ViewPreset}. Required.
    */


    /**
    * @cfg {Boolean} trackHeaderOver `true` to highlight each header cell when the mouse is moved over it. Only used when the "lightWeight" mode is enabled.
    */
    trackHeaderOver: true,

    /**
    * @cfg {Date} startDate The start date of the timeline. Required
    */
    startDate: null,

    /**
    * @cfg {Date} endDate The end date of the timeline.
    */
    endDate: null,


    // The width of the left + right border of your event, needed to calculate the correct start/end positions
    eventBorderWidth: 1,

    /**
    * @cfg {Object} lockedGridConfig A custom config object used to initialize the left (locked) grid panel.
    */

    /**
    * @cfg {Object} schedulerConfig A custom config object used to initialize the right (schedule) grid panel. 
    */

    /**
    * @cfg {Ext.Template} tooltipTpl 
    * Template used to show a tooltip over a scheduled item, null by default (meaning no tooltip). The tooltip will be populated with the data in 
    * record corresponding to the hovered element. See also {@link #tipCfg}.
    */
    tooltipTpl: null,

    /**
    * @cfg {Object} tipCfg
    * The {@link Ext.Tooltip} config object used to configure a tooltip (only applicable if tooltipTpl is set).
    */
    tipCfg: {
        cls: 'sch-tip',

        showDelay: 1000,
        hideDelay: 0,

        autoHide: true,
        anchor: 'b'
    },

    /**
    * @cfg {Boolean} lightWeight
    * @deprecated 3.0.0, this will be the only available behavior in 3.0
    *
    * When this option is set to true (by default), scheduler will _not_ generate a separate cell for each time interval in the bottom row of the timeline.
    * Instead, only single cell will be generated, providing lightweight DOM footprint and much better performance. The downside of this optimization
    * is that its not possible to customize every cell in the scheduler view. Because of that, this option is automatically disabled 
    * if {@link #timeCellRenderer} is provided.
    */
    lightWeight: true,


    /**
    * @deprecated 3.0.0, to style areas for individual resources, instead use the resourceZones config for Ext Scheduler

    * @cfg {Function} timeCellRenderer An empty function by default, but provided so that you can manipulate the html cells that make up the schedule.
    * This is called once for each cell, just like a normal GridPanel renderer though returning values from it has no effect.
    * @param {Object} meta The same meta object as seen in a standard GridPanel cell renderer. Use it to modify CSS/style of the cell.
    * @param {Ext.data.Model} record The resource record to which the cell belongs
    * @param {Int} row The row index
    * @param {Int} col The col index
    * @param {Ext.data.Store} ds The resource store
    * @param {Date} startDate The start date of the cell
    * @param {Date} endDate The end date of the cell
    */
    timeCellRenderer: null,

    /**
    * @deprecated 3.0.0
    * @cfg {Object} timeCellRendererScope The scope to use for the `timeCellRenderer` function
    */
    timeCellRendererScope: null,

    inheritables: function () {
        return {
            // Configuring underlying table panel
            columnLines: true,
            enableColumnMove: false,
            enableLocking: true,
            lockable: true,
            // EOF: Configuring underlying table panel

            lockedXType: null,
            normalXType: null,

            // private
            initComponent: function () {
                // If user is not using timeCellRenderer, try to speed things up a bit
                this.lightWeight = this.lightWeight && !this.timeCellRenderer;

                this.addEvents(

                /** 
                * @event timeheaderdblclick
                * Fires after a doubleclick on a time header cell
                * @param {Sch.column.Time} column The column object
                * @param {Date} startDate The start date of the header cell
                * @param {Date} endDate The start date of the header cell
                * @param {Ext.EventObject} e The event object
                */
                    'timeheaderdblclick',

                /**
                * @event beforeviewchange
                * Fires before the current view changes to a new view type or a new time span. Return false to abort this action.
                * @param {Sch.mixin.SchedulerPanel} scheduler The scheduler object
                * @param {Object} preset The new preset
                */
                    'beforeviewchange',

                /**
                * @event viewchange
                * Fires after current view preset or time span has changed
                * @param {Sch.mixin.SchedulerPanel} scheduler The scheduler object
                */
                    'viewchange'
                );

                if (!this.timeAxis) {
                    this.timeAxis = Ext.create("Sch.data.TimeAxis");
                }

                if (!this.columns && !this.colModel) {
                    // No columns specified at all, fall back to empty array
                    this.columns = [];
                }

                this.timeAxis.on('reconfigure', this.onTimeAxisReconfigure, this);

                if (this.enableLocking) {
                    var i = 0,
                        len = this.columns.length,
                        column;

                    for (; i < len; ++i) {
                        column = this.columns[i];
                        if (column.locked !== false) {
                            column.locked = true;
                        }
                        column.lockable = false;
                    }
                    this.switchViewPreset(this.viewPreset, this.startDate || this.timeAxis.getStart(), this.endDate || this.timeAxis.getEnd(), true);
                }

                this.callParent(arguments);

                // HACK - too early to call 'applyViewSettings' in the 'switchViewPreset' before calling parent's `initComponent` - requires a view presence

                if (this.lockable) {
                    this.applyViewSettings(this.timeAxis.preset);
                    if (!this.viewPreset) {
                        throw 'You must define a valid view preset object. See Sch.preset.Manager class for reference';
                    }

                    if (this.lightWeight && this.columnLines) {
                        this.columnLinesFeature = new Sch.feature.ColumnLines();
                        this.columnLinesFeature.init(this);
                    }
                }

                this.initializeZooming();

                this.relayEvents(this.getView(), [
                /**
                * @event beforetooltipshow
                * Fires before the event tooltip is shown, return false to suppress it.
                * @param {Sch.mixin.SchedulerPanel} scheduler The scheduler object
                * @param {Ext.data.Model} eventRecord The event record of the clicked record
                */
                    'beforetooltipshow',

                /**
                * @event scheduleclick
                * Fires after a click on the schedule area
                * @param {Sch.mixin.SchedulerPanel} scheduler The scheduler object
                * @param {Date} clickedDate The clicked date 
                * @param {Int} rowIndex The row index 
                * @param {Ext.EventObject} e The event object
                */
                    'scheduleclick',

                /**
                * @event scheduledblclick
                * Fires after a doubleclick on the schedule area
                * @param {Sch.mixin.SchedulerPanel} scheduler The scheduler object
                * @param {Date} clickedDate The clicked date 
                * @param {Int} rowIndex The row index 
                * @param {Ext.EventObject} e The event object
                */
                    'scheduledblclick',

                /**
                * @event schedulecontextmenu
                * Fires after a context menu click on the schedule area
                * @param {Sch.mixin.SchedulerPanel} scheduler The scheduler object
                * @param {Date} clickedDate The clicked date 
                * @param {Int} rowIndex The row index 
                * @param {Ext.EventObject} e The event object
                */
                    'schedulecontextmenu'
                ]);
            },

            getState: function () {
                var me = this,
                    state = me.callParent(arguments);

                Ext.apply(state, {
                    viewPreset: me.viewPreset,
                    startDate: me.getStart(),
                    endDate: me.getEnd(),
                    zoomMinLevel: me.zoomMinLevel,
                    zoomMaxLevel: me.zoomMaxLevel,
                    currentZoomLevel: me.currentZoomLevel
                });
                return state;
            },

            /**
            * Returns the orientation of this panel, "horizontal" or "vertical"
            * @return {String}  
            */
            getOrientation: function () {
                return this.orientation;
            },

            applyState: function (state) {
                var me = this;

                me.callParent(arguments);

                if (state && state.viewPreset) {
                    me.switchViewPreset(state.viewPreset, state.startDate, state.endDate);
                }
                if (state && state.currentZoomLevel) {
                    me.zoomToLevel(state.currentZoomLevel);
                }
            },

            beforeRender: function () {
                this.callParent(arguments);

                if (this.lockable) {
                    this.addCls('sch-' + this.orientation);
                }
            },

            afterRender: function () {
                this.callParent(arguments);
                if (this.lockable) {
                    this.lockedGrid.on('itemdblclick', function (grid, record, el, rowIndex, event) {
                        if (this.orientation == 'vertical' && record) {
                            this.fireEvent('timeheaderdblclick', this, record.get('start'), record.get('end'), rowIndex, event);
                        }
                    }, this);
                } else {
                    var header = this.headerCt;

                    if (header && header.reorderer && header.reorderer.dropZone) {
                        var dz = header.reorderer.dropZone;
                        dz.positionIndicator = Ext.Function.createSequence(dz.positionIndicator, function () {
                            this.valid = false;
                        });
                    }
                }
            },


            // this fixed the column width change case
            // when syncing the scroll position need to read the scrollLeft at the time of actual sync, not before 
            delayScroll: function () {
                var target = this.getScrollTarget().el;

                if (target) {
                    this.scrollTask.delay(10, function () {

                        if (target.dom) {
                            this.syncHorizontalScroll(target.dom.scrollLeft);
                        }
                    }, this);
                }
            }
        };
    },

    /**
    * The {@link #readOnly} accessor. Use it to switch the `readonly` state. 
    */
    setReadOnly: function (readOnly) {
        this.getSchedulingView().setReadOnly(readOnly);
    },

    /**
    * Returns true if the panel is currently readOnly.
    * @return {Boolean} readOnly 
    */
    isReadOnly: function () {
        return this.getSchedulingView().isReadOnly();
    },

    /**
    * Switches the current header preset. See the {@link Sch.preset.Manager} for details. Will fire the {@link #beforeviewchange} event, as well as try
    * to auto set the current zoom level.
    * Returning `false` from the listener will cancel the switch.
    *
    * Take notice, that calling this method without dates requires start/end dates to be created in {@link Sch.data.TimeAxis#method-generateTicks generateTicks} if
    * a custom `generateTicks` function is used.
    * 
    * @param {String} preset The name of the new preset
    * @param {Date} startDate (optional) A new start date for the time axis
    * @param {Date} endDate (optional) A new end date for the time axis
    */
    switchViewPreset: function (preset, startDate, endDate, initial) {
        if (this.fireEvent('beforeviewchange', this, preset, startDate, endDate) !== false) {
            if (Ext.isString(preset)) {
                this.viewPreset = preset;
                preset = Sch.preset.Manager.getPreset(preset);
            }

            if (!preset) {
                throw 'View preset not found';
            }

            var hConf = preset.headerConfig;

            var timeAxisCfg = {
                unit: hConf.bottom ? hConf.bottom.unit : hConf.middle.unit,
                increment: (hConf.bottom ? hConf.bottom.increment : hConf.middle.increment) || 1,
                resolutionUnit: preset.timeResolution.unit,
                resolutionIncrement: preset.timeResolution.increment,

                weekStartDay: this.weekStartDay,

                mainUnit: hConf.middle.unit,
                shiftUnit: preset.shiftUnit,

                headerConfig: preset.headerConfig,
                shiftIncrement: preset.shiftIncrement || 1,
                preset: preset,
                defaultSpan: preset.defaultSpan || 1
            };

            if (initial) {
                // in case of shared timeaxis (between gantt/scheduler) we don't want to 
                // re-configure it, during initial rendering of 2nd component
                // we detect that it's shared by the number of ticks
                if (this.timeAxis.getCount() === 0 || startDate) {
                    timeAxisCfg.start = startDate || new Date();
                    timeAxisCfg.end = endDate;
                }
            } else {
                timeAxisCfg.start = startDate || this.timeAxis.getStart();
                timeAxisCfg.end = endDate;
            }

            // Apply view specific properties to the view
            if (!initial) {
                this.applyViewSettings(preset); // Subclass may decide which property from the preset to use (orientation specific)
            }

            this.timeAxis.reconfigure(timeAxisCfg);
        }
    },

    // Applies view specific settings from the preset about to be used
    applyViewSettings: function (preset) {
        var view = this.getSchedulingView();

        view.setDisplayDateFormat(preset.displayDateFormat);

        if (this.orientation === 'horizontal') {
            view.setRowHeight(this.rowHeight || preset.rowHeight, true);
        }
    },

    /**
    * Method to get a the current start date of the scheduler view
    * @return {Date} The start date
    */
    getStart: function () {
        return this.timeAxis.getStart();
    },

    /**
    * Method to get a the current end date of the scheduler view
    * @return {Date} The end date
    */
    getEnd: function () {
        return this.timeAxis.getEnd();
    },

    /**
    * Returns the center date of the currently visible timespan of scheduler.
    *
    * @return {Date} date Center date for the viewport.
    */
    getViewportCenterDate: function () {
        var view = this.getSchedulingView(),
            viewEl = view.getEl(),
            scroll = viewEl.getScroll(),
            xy;

        if (this.orientation === 'vertical') {
            xy = [0, scroll.top + viewEl.getHeight() / 2];
        } else {
            xy = [scroll.left + viewEl.getWidth() / 2, 0];
        }

        return view.getDateFromXY(xy, null, true);
    },

    /**
    * Updates the widths of all time columns to the supplied value. Only applicable when forceFit is set to false on the view.
    * @param {Int} width The new time column width
    */
    setTimeColumnWidth: function (width, preventRefresh) {
        this.getSchedulingView().setColumnWidth(width, preventRefresh);
    },

    // private
    onTimeAxisReconfigure: function () {
        this.fireEvent('viewchange', this);

        if (this.stateful && this.lockedGrid) {
            this.saveState();
        }
    },

    // Only care about state for the locked section, the rest are generated
    getColumnsState: function () {
        var me = this,
            locked = me.lockedGrid.headerCt.getColumnsState();

        return locked;
    },

    /**
    * Moves the time axis forward in time in units specified by the view preset 'shiftUnit', and by the amount specified by the parameter or by the shiftIncrement config of the current view preset.
    * @param {Int} amount (optional) The number of units to jump forward
    */
    shiftNext: function (amount) {
        this.timeAxis.shiftNext(amount);
    },

    /**
    * Moves the time axis backward in time in units specified by the view preset 'shiftUnit', and by the amount specified by the parameter or by the shiftIncrement config of the current view preset.
    * @param {Int} amount (optional) The number of units to jump backward
    */
    shiftPrevious: function (amount) {
        this.timeAxis.shiftPrevious(amount);
    },

    /**
    * Convenience method to go to current date.
    */
    goToNow: function () {
        this.setTimeSpan(new Date());
    },

    /**
    * Changes the time axis timespan to the supplied start and end dates.
    * @param {Date} start The new start date
    * @param {Date} end (Optional) The new end date. If not supplied, the {@link Sch.preset.ViewPreset#defaultSpan} property of the current view preset will be used to calculate the new end date.
    */
    setTimeSpan: function (start, end) {
        if (this.timeAxis) {
            this.timeAxis.setTimeSpan(start, end);
        }
    },

    /**
    * Changes the time axis start date to the supplied date.
    * @param {Date} amount The new start date
    */
    setStart: function (date) {
        this.setTimeSpan(date);
    },

    /**
    * Changes the time end start date to the supplied date.
    * @param {Date} amount The new end date
    */
    setEnd: function (date) {
        this.setTimeSpan(null, date);
    },

    /**
    * Returns the {@link Sch.data.TimeAxis} instance in use.
    */
    getTimeAxis: function () {
        return this.timeAxis;
    },

    // DEPRECATED
    getResourceByEventRecord: function (eventRecord) {
        return eventRecord.getResource();
    },


    /**
    * Scrolls the time line to the specified `date`.
    * @param {Date} date The date to which to scroll the time line
    */
    scrollToDate: function (date, animate) {
        var view = this.getSchedulingView(),
              xy = view.getXYFromDate(date, true);

        if (this.orientation == 'horizontal') {
            view.getEl().scrollTo('left', Math.max(0, xy[0]), animate);
        }
        else {
            view.getEl().scrollTo('top', Math.max(0, xy[1]), animate);
        }
    },


    /**
    * Returns the view of the scheduler part with time columns. This method should be used instead of usual `getView`, 
    * because `getView` will return an instance of special "locking" view, which has no any scheduler-specific features.
    * 
    * @return {Sch.mixin.SchedulerView} view A view implementing the {@link Sch.mixin.SchedulerView} mixin
    */
    getSchedulingView: function () {
        return this.lockable ? this.normalGrid.getView() : this.getView();
    },


    setOrientation: function (orientation) {
        this.removeCls('sch-' + this.orientation);
        this.addCls('sch-' + orientation);

        this.orientation = orientation;
    }
});
/**

@class Sch.mixin.SchedulerPanel
A mixin for {@link Ext.panel.Panel} classes, providing "scheduling" functionality to the consuming panel. 
A consuming class should have already consumed the {@link Sch.mixin.TimelinePanel} mixin.

Generally, should not be used directly, if you need to subclass the scheduler panel, subclass the {@link Sch.panel.SchedulerGrid} or {@link Sch.panel.SchedulerTree} 
instead.

*/

Ext.define('Sch.mixin.SchedulerPanel', {
    requires: [
        'Sch.view.SchedulerGridView',
        'Sch.model.Event',
        'Sch.model.Resource',
        'Sch.data.EventStore',
        'Sch.data.ResourceStore',
        'Sch.selection.EventModel',
        'Sch.plugin.ResourceZones',
        'Sch.util.Date',

        'Sch.column.timeAxis.Vertical'
    ],

    /**
    * @cfg {Number} resourceColumnWidth
    * Used only in vertical orientation. Defines the width of a single column.
    */
    resourceColumnWidth: null,

    /**
    * @cfg {String} eventBarIconClsField
    * A field in the Event model whose value will be applied as a CSS class to each event bar to place a 16x16 icon.
    */
    eventBarIconClsField: '',

    /**
    * @cfg {String} eventSelModelType The xtype of the selection model to be used to events. Should be a {@link Sch.selection.EventModel} or its subclass.
    */
    eventSelModelType: 'eventmodel',

    /**
    * @cfg {Object} eventSelModel The configuration object for the event selection model. See {@link Sch.selection.EventModel} for available configuration options.
    */
    eventSelModel: null,

    /**
    * @cfg {Boolean} enableEventDragDrop true to enable drag and drop of events, defaults to true
    */
    enableEventDragDrop: true,

    /**
    * @cfg {Boolean} enableDragCreation true to enable creating new events by click and drag, defaults to true
    */
    enableDragCreation: true,

    /**
    * @cfg {Object} dragConfig
    * The {@link Sch.feature.DragDrop} config object used to configure {@link Sch.feature.DragZone} or {@link Sch.feature.PointDragZone} depending on the value of useDragProxy parameter.
    */
    dragConfig: null,

    /**
    * @cfg {Object} dropConfig
    * The {@link Sch.feature.DragDrop} config object used to configure {@link Sch.feature.DropZone} or {@link Sch.feature.PointDragZone} depending on the value of useDragProxy parameter.
    */
    dropConfig: null,

    /**
    * @cfg {String} eventBarTextField The field in your data model that will be rendered into each event bar. 
    * You can alternatively use the eventBarRenderer to get full control over what gets displayed.
    */
    eventBarTextField: null,

    /**
    * @cfg {Boolean} allowOverlap Set to false if you don't want to allow events overlapping (defaults to true).
    */
    allowOverlap: true,

    /**
    * @cfg {String} startParamName The name of the start date parameter that will be passed to in every `eventStore` load request.
    */
    startParamName: 'startDate',

    /**
    * @cfg {String} endParamName The name of the end date parameter that will be passed to in every `eventStore` load request.
    */
    endParamName: 'endDate',

    /**
    * @cfg {Boolean} passStartEndParameters true to apply start and end dates of the current view to any `eventStore` load requests.
    */
    passStartEndParameters: false,

    /**
    * @cfg {Function} eventRenderer
    * An empty function by default, but provided so that you can override it. This function is called each time an event 
    * is rendered into the schedule and allows you to control the content and attributes of the event DOM node. 
    * 
    * By default, the outer eventTpl includes placeholders for 'cls' and 'style' which you can set in the tplData parameter object. 
    * The cls property is a CSS class that will be added to the containing DOM element. 
    * The style property is an inline style declaration for the containing DOM element. 
    * 
    * To control the contents of the event you have two options: 
    *   
    *   * If you just want to output simple text into the event body, just return any string from this function.
    *   
    *   * If you provide your own eventBodyTemplate, you should return an object containing the 
    *     the data for any placeholders in your template markup.
    *
    * <pre>
    *  eventRenderer : function (eventRec, resourceRec, tplData) {
    *      tplData.cls = resourceRec.get('Category');     // Read a property from the resource record, used as a CSS class to style the event
    *      tplData.style = 'color:white';                 // You can use inline styles too.
    *      return Ext.Date.format(eventRec.getStartDate(), 'Y-m-d') + ': ' + eventRec.getName();
    *  }
    *</pre>
    * 
    * Or using a renderer together with an eventBodyTemplate:
    * 
    *<pre>
    *  eventBodyTemplate: '<div class="header">{headerText}</div><div class="footer">{footerText}</div>',
    * 
    *  eventRenderer : function (eventRec, resourceRec, tplData) {
    *      
    *       return { 
    *           headerText : 'foo',
    *           footerText : 'bar'
    *       };
    *  }
    *</pre>
    * 
    * @param {Sch.model.Event} eventRecord The event about to be rendered
    * @param {Sch.model.Resource} resourceRecord The resource to which the event belongs
    * @param {Object} tplData A custom object used to set the 'class' and 'style' attributes for the outer event DOM node.
    * @param {Int} row The row index
    * @param {Int} col The column index
    * @param {Sch.data.ResourceStore} ds The resource store
    * @return {String/Object} A simple string, or a custom object which will be applied to the {@link #eventBodyTemplate}, creating the actual HTML
    */
    eventRenderer: null,

    /**
    * @cfg {Object} eventRendererScope The scope to use for the `eventRenderer` function 
    */
    eventRendererScope: null,

    /**
    * The {@link Sch.data.EventStore} holding the events to be rendered into the scheduler (required).
    * 
    * Experimental: This config option can also be an instance of {@link Gnt.data.TaskStore}. In this case
    * {@link #resourceStore} should also be an instance of {@link Gnt.data.ResourceStore}
    * 
    * @cfg {Sch.data.EventStore/Gnt.data.TaskStore} eventStore 
    */
    eventStore: null,

    /**
    * @cfg {Sch.data.ResourceStore/Gnt.data.ResourceStore} resourceStore The {@link Sch.data.ResourceStore} holding the resources to be rendered into the scheduler (required).
    */
    resourceStore: null,


    /**
    * @cfg {Ext.Template} eventTpl The wrapping template used to renderer your events in the scheduler. Normally you should not override this,
    * only do so if you need total control of how the events are rendered/styled. See the {@link eventBodyTemplate} for more information. 
    */
    eventTpl: null,

    /**
    * @cfg {String/Ext.Template} eventBodyTemplate The template used to generate the markup of your events in the scheduler. To 'populate' the eventBodyTemplate with data, use the {@link eventRenderer} method 
    */
    eventBodyTemplate: null,

    /**
    *  @cfg {Object} timeAxisColumnCfg A {@link Ext.grid.column.Column} config used to configure the time axis column in vertical orientation.
    */


    /**
    * @cfg {Sch.data.EventStore} resourceZones A special store containing data used to highlight the underlying schedule for the resources. This can 
    *                            be used to color non-working time or any other meta data associated with a resource.
    */
    resourceZones: null,

    /**
    *  @cfg {Object} createConfig Custom config to pass to the {@link Sch.feature.DragCreator} instance
    */

    /**
    *  @cfg {Object} resizeConfig Custom config to pass to the {@link Sch.Resize} instance
    */

    /**
    *  @cfg {Object} dragConfig Custom config to pass to the {@link Sch.SchedulerDragZone} instance
    */

    /**
    *  @cfg {Object} dropConfig Custom config to pass to the {@link Sch.SchedulerDropZone} instance
    */

    componentCls: 'sch-schedulerpanel',

    /**
    * @cfg {Boolean} lockedGridDependsOnSchedule set this to true if you require the left (locked) grid section to be refreshed when the schedule is updated.
    */
    lockedGridDependsOnSchedule: false,

    /**
    * @method dndValidatorFn
    * An empty function by default, but provided so that you can perform custom validation on 
    * the item being dragged. This function is called during a drag and drop process and also after the drop is made.  To control what 'this' points to inside this function, use {@link #validatorFnScope}.
    * @param {Array} dragRecords an array containing the records for the events being dragged
    * @param {Ext.data.Model} targetResourceRecord the target resource of the the event 
    * @param {Date} date The date corresponding to the drag proxy position
    * @param {Int} duration The duration of the item being dragged in milliseconds
    * @param {Event} e The event object
    * @return {Boolean} true if the drop position is valid, else false to prevent a drop
    */

    /**
    * @method resizeValidatorFn
    * An empty function by default, but provided so that you can perform custom validation on 
    * an item being resized. To control what 'this' points to inside this function, use {@link #validatorFnScope}.
    * @param {Ext.data.Model} resourceRecord the resource of the row in which the event is located
    * @param {Ext.data.Model} eventRecord the event being resized
    * @param {Date} startDate
    * @param {Date} endDate
    * @param {Event} e The event object
    * @return {Boolean} true if the resize state is valid, else false
    */

    /**
    * @method createValidatorFn
    * An empty function by default, but provided so that you can perform custom validation on the item being created. To control what 'this' points to inside this function, use {@link #validatorFnScope}.
    * @param {Ext.data.Model} resourceRecord the resource for which the event is being created
    * @param {Date} startDate
    * @param {Date} endDate
    * @param {Event} e The event object
    * @return {Boolean} true if the creation event is valid, else false
    */

    /**
    * @cfg {Object} validatorFnScope
    * The scope ("this"-object) for the createValidatorFn, resizeValidatorFn and dndValidatorFn methods.
    */

    initStores: function () {
        var resourceStore = this.resourceStore;

        if (!resourceStore) {
            Ext.Error.raise("You must specify a resourceStore config");
        }

        if (!this.eventStore) {
            Ext.Error.raise("You must specify an eventStore config");
        }

        this.eventStore = Ext.StoreManager.lookup(this.eventStore);
        this.resourceStore = Ext.StoreManager.lookup(resourceStore);

        if (!this.eventStore.isEventStore) {
            Ext.Error.raise("Your eventStore should be a Sch.data.EventStore (or consume the Sch.data.mixin.EventStore)");
        }

        Ext.applyIf(this, {
            store: resourceStore,          // For the grid panel API
            resourceStore: resourceStore
        });

        this.resourceStore.eventStore = this.eventStore;
        this.eventStore.setResourceStore(this.resourceStore);

        if (this.lockable) {
            if (this.resourceZones) {
                this.plugins = this.plugins || [];

                var resourceZoneStore = Ext.StoreManager.lookup(this.resourceZones);
                resourceZoneStore.setResourceStore(this.resourceStore);

                this.resourceZonesPlug = Ext.create('Sch.plugin.ResourceZones', {
                    store: resourceZoneStore
                });
                this.plugins.push(this.resourceZonesPlug);
            }

            if (this.passStartEndParameters) {
                this.eventStore.on('beforeload', this.applyStartEndParameters, this);
            }
        }
    },

    inheritables: function () {
        return {
            // private
            initComponent: function () {
                this.initStores();

                if (this.eventBodyTemplate && Ext.isString(this.eventBodyTemplate)) {
                    this.eventBodyTemplate = Ext.create("Ext.XTemplate", this.eventBodyTemplate);
                }

                this.callParent(arguments);

                // Relaying after parent class has setup the locking grid components
                this.relayEvents(this.getView(), [
                /**
                * @event eventclick
                * Fires when an event is clicked
                * @param {SchedulerView} scheduler The scheduler view
                * @param {Sch.model.Event} eventRecord The event record of the clicked event
                * @param {Ext.EventObject} e The event object
                */
                    'eventclick',

                /**
                * @event eventmousedown
                * Fires when a mousedown event is detected on a rendered event
                * @param {Mixed} view The scheduler view instance
                * @param {Sch.model.Event} eventRecord The event record
                * @param {Ext.EventObject} e The event object
                */
                    'eventmousedown',

                /**
                * @event eventmouseup
                * Fires when a mouseup event is detected on a rendered event
                * @param {Mixed} view The scheduler view instance
                * @param {Sch.model.Event} eventRecord The event record
                * @param {Ext.EventObject} e The event object
                */
                    'eventmouseup',

                /**
                * @event eventdblclick
                * Fires when an event is double clicked
                * @param {SchedulerView} scheduler The scheduler view
                * @param {Sch.model.Event} eventRecord The event record of the clicked event
                * @param {Ext.EventObject} e The event object
                */
                    'eventdblclick',

                /**
                * @event eventcontextmenu
                * Fires when contextmenu is activated on an event
                * @param {SchedulerView} scheduler The scheduler view
                * @param {Sch.model.Event} eventRecord The event record of the clicked event
                * @param {Ext.EventObject} e The event object
                */
                    'eventcontextmenu',

                /**
                * @event eventmouseenter
                * Fires when the mouse moves over an event 
                * @param {Mixed} view The scheduler view instance
                * @param {Sch.model.Event} eventRecord The event record 
                * @param {Ext.EventObject} e The event object
                */
                    'eventmouseenter',

                /**
                * @event eventmouseleave
                * Fires when the mouse moves out of an event 
                * @param {Mixed} view The scheduler view instance
                * @param {Sch.model.Event} eventRecord The event record
                * @param {Ext.EventObject} e The event object
                */
                    'eventmouseleave',

                // Resizing events start --------------------------
                /**
                * @event beforeeventresize
                * Fires before a resize starts, return false to stop the execution
                * @param {SchedulerView} scheduler The scheduler view
                * @param {Sch.model.Event} record The record about to be resized
                * @param {Ext.EventObject} e The event object
                */
                    'beforeeventresize',

                /**
                * @event eventresizestart
                * Fires when resize starts
                * @param {SchedulerView} scheduler The scheduler view
                * @param {Sch.model.Event} record The event record being resized
                */
                    'eventresizestart',

                /**
                * @event eventpartialresize
                * Fires during a resize operation and provides information about the current start and end of the resized event
                * @param {SchedulerView} scheduler The scheduler view
                * @param {Sch.model.Event} record The event record being resized
                * @param {Date} startDate The new start date of the event
                * @param {Date} endDate The new end date of the event
                * @param {Ext.Element} element The proxy element being resized
                */
                    'eventpartialresize',

                /**
                * @event eventresizeend
                * Fires after a succesful resize operation
                * @param {SchedulerView} scheduler The scheduler view
                * @param {Sch.model.Event} record The updated event record
                */
                    'eventresizeend',
                // Resizing events end --------------------------

                // Dnd events start --------------------------
                /**
                * @event beforeeventdrag
                * Fires before a dnd operation is initiated, return false to cancel it
                * @param {SchedulerView} scheduler The scheduler view
                * @param {Sch.model.Event} record The record corresponding to the node that's about to be dragged
                * @param {Ext.EventObject} e The event object
                */
                    'beforeeventdrag',

                /**
                * @event eventdragstart
                * Fires when a dnd operation starts
                * @param {SchedulerView} scheduler The scheduler view
                * @param {Array} records the records being dragged
                */
                    'eventdragstart',

                /**
                * @event eventdrop
                * Fires after a succesful drag and drop operation
                * @param {SchedulerView} scheduler The scheduler view
                * @param {[Sch.model.Event]} records the affected records (if copies were made, they were not inserted into the store)
                * @param {Boolean} isCopy True if the records were copied instead of moved
                */
                    'eventdrop',

                /**
                * @event aftereventdrop
                * Fires when after a drag n drop operation, even when drop was performed on an invalid location
                * @param {SchedulerView} scheduler The scheduler view
                */
                    'aftereventdrop',
                // Dnd events end --------------------------

                // Drag create events start --------------------------
                /**
                * @event beforedragcreate
                * Fires before a drag starts, return false to stop the execution
                * @param {SchedulerView} scheduler The scheduler view
                * @param {Sch.model.Resource} resource The resource record
                * @param {Ext.EventObject} e The event object
                */
                    'beforedragcreate',

                /**
                * @event dragcreatestart
                * Fires before a drag starts, return false to stop the execution
                * @param {SchedulerView} scheduler The scheduler view
                */
                    'dragcreatestart',

                /**
                * @event dragcreateend
                * Fires after a successful drag-create operation
                * @param {SchedulerView} scheduler The scheduler view
                * @param {Sch.model.Event} newEventRecord The newly created event record (added to the store in onEventCreated method)
                * @param {Sch.model.Resource} resource The resource record to which the event belongs
                * @param {Ext.EventObject} e The event object
                */
                    'dragcreateend',

                /**
                * @event afterdragcreate
                * Always fires after a drag-create operation
                * @param {SchedulerView} scheduler The scheduler view
                */
                    'afterdragcreate',
                // Drag create events end --------------------------

                /**
                * @event beforeeventadd
                * Fires after a successful drag-create operation, before the new event is added to the store. Return false to prevent the event from being added to the store.
                * @param {SchedulerView} scheduler The scheduler view
                * @param {Sch.model.Event} newEventRecord The newly created event record 
                */
                    'beforeeventadd'
                ]);

                this.addEvents(
                /**
                * @event orientationchange
                * Fires after an orientation change
                * @param {SchedulerPanel} scheduler The scheduler panel
                * @param {String} orientation The new orientation ('horizontal' or 'vertical')
                */
                    'orientationchange'
                );
            },

            /**
            * Switch the orientation of this panel
            * 
            * @param {String} orientation Either "horizontal" or "vertical"
            */
            setOrientation: function (orientation, force) {
                if (orientation === this.orientation && !force) {
                    return;
                }

                this.callParent(arguments);

                var me = this,
                    normalGrid = me.normalGrid,
                    lockedGrid = me.lockedGrid,
                    schedulingView = me.getSchedulingView(),
                    normalHeaderCt = normalGrid.headerCt;

                schedulingView.setOrientation(orientation);

                normalHeaderCt.suspendLayouts();
                normalHeaderCt.items.each(function (col) {
                    normalHeaderCt.remove(col);
                });
                normalHeaderCt.resumeLayouts();

                if (orientation === 'horizontal') {
                    me.mun(me.resourceStore, {
                        clear: me.refreshResourceColumns,
                        datachanged: me.refreshResourceColumns,
                        load: me.refreshResourceColumns,

                        scope: me
                    });

                    schedulingView.suspendEvents();

                    schedulingView.setRowHeight(me.rowHeight || me.timeAxis.preset.rowHeight, true);

                    schedulingView.suppressFitCheck++;

                    me.reconfigureLockable(me.resourceStore, me.columns);
                    schedulingView.suppressFitCheck--;

                    schedulingView.resumeEvents();

                    schedulingView.setColumnWidth(me.timeAxis.preset.timeColumnWidth || 60, true);
                    schedulingView.checkHorizontalFit();

                    schedulingView.getTimeAxisColumn().on({
                        timeaxiscolumnreconfigured: schedulingView.checkHorizontalFit,
                        scope: schedulingView
                    });
                } else {

                    schedulingView.setRowHeight(me.timeAxis.preset.timeColumnWidth || 60, true);
                    schedulingView.setColumnWidth(me.timeAxis.preset.resourceColumnWidth || 100, true);

                    me.mon(me.resourceStore, {
                        clear: me.refreshResourceColumns,
                        datachanged: me.refreshResourceColumns,
                        load: me.refreshResourceColumns,

                        scope: me
                    });
                    var cols = me.processColumns(me.columns);

                    me.reconfigureLockable(me.timeAxis.tickStore, cols.locked.items);
                    //me.reconfigure(me.timeAxis.tickStore, me.processColumns(me.columns).locked.items);
                    normalGrid.reconfigure(me.timeAxis.tickStore, me.createResourceColumns());
                }

                normalGrid.view.refresh();
                lockedGrid.view.refresh();

                this.fireEvent('orientationchange', this, orientation);
            },

            applyViewSettings: function (preset) {
                this.callParent(arguments);

                var v = this.getSchedulingView(),
                    height;

                if (this.orientation === 'horizontal') {
                    height = this.rowHeight = this.rowHeight || preset.rowHeight;
                } else {
                    // timeColumnWidth is used for row height in vertical mode
                    // though user can still supply a value when configuring the panel that overrides the view preset value
                    height = this.timeColumnWidth = this.timeColumnWidth || preset.timeColumnWidth || 60;
                    v.setColumnWidth(preset.resourceColumnWidth || 100, true);
                }

                v.setRowHeight(height, true);
            },


            // Needed to properly initialize vertical view upon first rendering
            afterRender: function () {
                this.callParent(arguments);
                if (this.lockable && this.lockedGridDependsOnSchedule) {
                    if (!this.syncRowHeight) {
                        this.normalGrid.getView().on('refresh', this.onNormalViewRefresh, this);
                        this.normalGrid.getView().on('itemupdate', this.onNormalViewItemUpdate, this);
                    }
                }
            }
        };
    },

    /**
    * Returns the resource store instance
    * @return {Ext.data.Store} 
    */
    getResourceStore: function () {
        return this.resourceStore;
    },


    /**
    * Returns the event store instance
    * @return {Ext.data.Store} 
    */
    getEventStore: function () {
        return this.eventStore;
    },

    /**
    * Returns the selection model being used, and creates it via the configuration
    * if it has not been created already.
    * @return {Sch.selection.EventModel} selModel
    */
    getEventSelectionModel: function () {
        // already has the event selection model
        if (this.eventSelModel && this.eventSelModel.events) {
            return this.eventSelModel;
        }

        if (!this.eventSelModel) {
            this.eventSelModel = {};
        }

        var eventSelModel = this.eventSelModel;

        var mode = 'SINGLE';

        if (this.simpleSelect) {
            mode = 'SIMPLE';
        } else if (this.multiSelect) {
            mode = 'MULTI';
        }

        Ext.applyIf(eventSelModel, {
            allowDeselect: this.allowDeselect,
            mode: mode
        });

        if (!eventSelModel.events) {
            eventSelModel = this.eventSelModel = Ext.create('selection.' + this.eventSelModelType, eventSelModel);
        }

        if (!eventSelModel.hasRelaySetup) {
            this.relayEvents(eventSelModel, [
            /**
            * @event
            * Fired after a selection change has occurred
            * @param {Sch.selection.EventModel} this
            * @param {[Sch.model.Event]} selected The selected events
            */
                'selectionchange',

            /**
            * @event deselect
            * Fired after a record is deselected
            * @param {Sch.selection.EventModel} this
            * @param  {Sch.model.Event} record The deselected event
            */
                'deselect',

            /**
            * @event select
            * Fired after a record is selected
            * @param {Sch.selection.EventModel} this
            * @param  {Sch.model.Event} record The selected event
            */
                'select'
            ]);
            eventSelModel.hasRelaySetup = true;
        }

        // lock the selection model if user
        // has disabled selection
        if (this.disableSelection) {
            eventSelModel.locked = true;
        }

        return eventSelModel;
    },



    applyStartEndParameters: function (eventStore, options) {
        options.params = options.params || {};

        options.params[this.startParamName] = this.getStart();
        options.params[this.endParamName] = this.getEnd();
    },




    refreshResourceColumns: function () {
        var headerCt = this.normalGrid.headerCt;

        if (headerCt.getColumnCount() > 0) {
            headerCt.removeAll();
        }

        headerCt.add(this.createResourceColumns());
        this.getView().refresh();
    },


    createResourceColumns: function () {
        var newItems = [],
            view = this.getSchedulingView();

        var me = this;

        this.resourceStore.each(function (resource) {

            newItems.push(Ext.create("Sch.column.Resource", {
                tdCls: view.timeCellCls,
                renderer: view.timeColumnRenderer,
                scope: view,

                width: me.resourceColumnWidth || me.timeAxis.preset.resourceColumnWidth || 100,
                text: resource.getName()
            }));
        });

        return newItems;
    }
});


// !XXX when adding new methods to this mixing need to also update the 
// `setupLockableTree` method in the Sch.mixin.Lockable
Ext.define("Sch.mixin.FilterableTreeView", {

    initTreeFiltering: function () {
        var doInit = function () {
            var treeStore = this.up('tablepanel').store;

            this.mon(treeStore, 'nodestore-datachange-start', this.onFilterChangeStart, this);
            this.mon(treeStore, 'nodestore-datachange-end', this.onFilterChangeEnd, this);

            this.mon(treeStore, 'filter-clear', this.onFilterCleared, this);
            this.mon(treeStore, 'filter-set', this.onFilterSet, this);
        };

        if (this.rendered)
            doInit.call(this);
        else
            this.on('beforerender', doInit, this, { single: true });
    },


    onFilterChangeStart: function () {
        Ext.suspendLayouts();
    },


    onFilterChangeEnd: function () {
        Ext.resumeLayouts();
    },


    onFilterCleared: function () {
        delete this.toggle;

        var el = this.getEl();

        if (el) el.removeCls('sch-tree-filtered');
    },


    onFilterSet: function () {
        this.toggle = function () { };

        var el = this.getEl();

        if (el) el.addCls('sch-tree-filtered');
    }
});
/**

@class Sch.view.TimelineTreeView
@extends Ext.tree.View
@mixin Sch.mixin.TimelineView

A tree view class, that have consumed the {@link Sch.mixin.TimelineView} mixin. Used internally.

*/
Ext.define("Sch.view.TimelineTreeView", {
    extend: "Ext.tree.View",
    mixins: [
        'Sch.mixin.TimelineView',
        'Sch.mixin.FilterableTreeView'
    ],

    requires: [
        'Sch.patches.TreeView'
    ],

    cellBorderWidth: 0,


    constructor: function () {
        this.callParent(arguments);

        this.initTreeFiltering();
    }

}, function () {
    this.override(Sch.mixin.TimelineView.prototype.inheritables() || {});
});
/**

@class Sch.view.SchedulerTreeView
@extends Sch.view.TimelineTreeView
@mixin Sch.mixin.SchedulerView

Desc

*/
Ext.define('Sch.view.SchedulerTreeView', {
    extend: 'Sch.view.TimelineTreeView',
    alias: 'widget.schedulertreeview',
    mixins: ['Sch.mixin.SchedulerView']
}, function () {
    this.override(Sch.mixin.SchedulerView.prototype.inheritables() || {});
});
/**

@class Sch.panel.TimelineGridPanel
@extends Ext.grid.Panel
@mixin Sch.mixin.TimelinePanel

Internal class. 

*/
Ext.define("Sch.panel.TimelineGridPanel", {
    extend: "Ext.grid.Panel",
    mixins: ['Sch.mixin.TimelinePanel']
}, function () {
    this.override(Sch.mixin.TimelinePanel.prototype.inheritables() || {});
});
/**

@class Sch.panel.TimelineTreePanel
@extends Ext.tree.Panel
@mixin Sch.mixin.TimelinePanel

Internal class.

*/
Ext.define("Sch.panel.TimelineTreePanel", {
    extend: "Ext.tree.Panel",
    requires: ['Ext.data.TreeStore'],
    mixins: ['Sch.mixin.TimelinePanel'],

    useArrows: true,
    rootVisible: false,

    constructor: function (config) {
        config = config || {};
        config.animate = false;
        this.callParent(arguments);
    },

    initComponent: function () {
        this.callParent(arguments);

        if (this.lockable && this.lockedGrid.headerCt.query('treecolumn').length === 0) {
            Ext.Error.raise("You must define an Ext.tree.Column (or use xtype : 'treecolumn').");
        }
    },

    // TreePanel does not support locked columns
    onRootChange: function (root) {
        if (!this.lockable) {
            this.callParent(arguments);
        }
    },


    bindStore: function (store) {
        this.callParent(arguments);

        if (Ext.getVersion('extjs').isGreaterThanOrEqual('4.1.2')) {
            var me = this,
                view = me.getView();

            // the following piece of code is copied from the #bindStore of Ext.panel.Table of 4.1.2
            // previously (<=4.1.1) it was inside of initComponent of the table
            // as of 4.1.2 TreePanel also has own "bindStore" method, with the following comment :    // Do not callParent in TreePanel's bindStore
            // naturally, all the buffering is broken, since implementation was moved to a "bindStore" method of the parent class (Ext.panel.Table)
            // and Ext.tree.Panel does not callParent in the `bindStore`..

            // BUFFERING BEGIN
            // If the Store is buffered, create a PagingScroller to monitor the View's scroll progress,
            // load the Store's prefetch buffer when it detects we are nearing an edge.
            if (store.buffered && me.verticalScroll) {
                me.verticalScroller = new Ext.grid.PagingScroller(Ext.apply({
                    panel: me,
                    store: store,
                    view: me.view
                }, me.initialConfig.verticalScroller));
            }

            // Buffered scrolling must preserve scroll on refresh
            if (store && store.buffered) {
                view.preserveScrollOnRefresh = true;
            } else if (me.invalidateScrollerOnRefresh !== undefined) {
                view.preserveScrollOnRefresh = !me.invalidateScrollerOnRefresh;
            }
            // BUFFERING END
        }
    }

}, function () {
    this.override(Sch.mixin.TimelinePanel.prototype.inheritables() || {});
});
/** 

@class Sch.panel.SchedulerGrid
@extends Sch.panel.TimelineGridPanel
@mixin Sch.mixin.SchedulerPanel

@alternateClassName Sch.SchedulerPanel

A scheduler panel based on the {@link Ext.grid.Panel} class which allows you to visualize and manage "resources" and their scheduled "events".

Please refer to <a href="#!/guide/scheduler_getting_started">getting started guide</a> for detailed introduction.

{@img scheduler/images/ext-scheduler.png}

*/
Ext.define("Sch.panel.SchedulerGrid", {
    extend: "Sch.panel.TimelineGridPanel",
    mixins: [
        'Sch.mixin.SchedulerPanel'
    ],
    alias: ['widget.schedulergrid', 'widget.schedulerpanel'],
    alternateClassName: 'Sch.SchedulerPanel',

    viewType: 'schedulergridview',
    lockedXType: 'gridpanel',
    normalXType: 'schedulergrid',

    onRender: function () {
        this.callParent(arguments);

        // `refreshResourceColumns` requires the presence of scheduling view, so can do this only here
        // after normalView creation
        if (this.lockable && this.orientation === 'vertical') {
            this.refreshResourceColumns(true);
        }
    }
}, function () {
    this.override(Sch.mixin.SchedulerPanel.prototype.inheritables() || {});
});
/** 

@class Sch.panel.SchedulerTree
@extends Sch.panel.TimelineTreePanel
@mixin Sch.mixin.SchedulerPanel

A complete scheduler panel using a tree view. This class can be used when you have a lot of resources organized in a hierarchical structure.

{@img scheduler/images/scheduler-tree.png}

Please refer to the {@link Sch.panel.SchedulerGrid} for additional documentation, as these classes
are virtually identical. This document will only provide the tree-specific details.

In the scheduler tree case:

- the `resourceStore` is expected to be an instance of the {@link Sch.data.ResourceTreeStore}.
- the scheduler tree does not support vertical orientation.
- in your columns definition, you must include a column which will contain the tree itself (the `treecolumn` xtype):

var schedulerTree = Ext.create('Sch.panel.SchedulerTree', {
columns: [
{
xtype       : 'treecolumn',
                    
text        : 'Name',
width       : 200,
sortable    : true,
dataIndex   : 'Name'
}
]
});


*/
Ext.define("Sch.panel.SchedulerTree", {
    extend: "Sch.panel.TimelineTreePanel",
    mixins: ['Sch.mixin.SchedulerPanel'],
    alias: ['widget.schedulertree'],
    requires: ['Sch.view.SchedulerTreeView'],
    lockedXType: 'treepanel',
    normalXType: 'schedulertree',
    viewType: 'schedulertreeview',

    setOrientation: function (orientation) {
        if (orientation == 'vertical') {
            Ext.Error.raise("Sch.panel.SchedulerTree does not support vertical orientation");
        }
    },

    initComponent: function () {
        this.callParent(arguments);

        if (!this.lockable && (this.resourceStore instanceof Ext.data.TreeStore)) {
            this.getView().store.eventStore = this.eventStore;
        }
    }
}, function () {
    this.override(Sch.mixin.SchedulerPanel.prototype.inheritables() || {});
});
