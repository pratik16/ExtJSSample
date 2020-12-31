///*Minify by P*/
Ext.define('Regardz.view.common.ExpandedRow', {
    extend: 'Ext.ux.RowExpander',
    alias: 'plugin.expandedrowitemgroup',
    rowBodyTpl: null,
    expandOnEnter: true,
    expandOnDblClick: true,
    selectRowOnExpand: false,
    rowBodyTrSelector: '.x-grid-rowbody-tr',
    rowBodyHiddenCls: 'x-grid-row-body-hidden',
    rowCollapsedCls: 'x-grid-row-collapsed',
    //renderer: function (value, metadata, record, rowIdx, colIdx) {
    //    if (colIdx === 0) {
    //        try {
    //            var it = record.ItemGroupId;
    //            if (it == null) {
    //                metadata.tdCls = 'x-grid-td-expander';
    //                return '<div class="x-grid-row-expander">&#160;</div>'
    //            }
    //            else {

    //            }
    //        } catch (e) {

    //        }
    //    }
    //}
    //, constructor: function () {
    //    this.callParent(arguments);
    //    var grid = this.getCmp();
    //    this.recordsExpanded = {};
    //    if (!this.rowBodyTpl) {
    //        Ext.Error.raise("The 'rowBodyTpl' config is required and is not defined.")
    //    }
    //    var rowBodyTpl = Ext.create('Ext.XTemplate', this.rowBodyTpl),
    //    features = [{ ftype: 'rowbody', columnId: this.getHeaderId(), recordsExpanded: this.recordsExpanded, rowBodyHiddenCls: this.rowBodyHiddenCls, rowCollapsedCls: this.rowCollapsedCls, getAdditionalData: this.getRowBodyFeatureData, getRowBodyContents: function (data) { return rowBodyTpl.applyTemplate(data) } }, { ftype: 'rowwrap' }]; if (grid.features) { grid.features = features.concat(grid.features) } else { grid.features = features }
    //},
    //init: function (grid) {
    //    this.callParent(arguments);
    //    this.grid = grid; this.addExpander(); grid.on('render', this.bindView, this, { single: true }); grid.on('reconfigure', this.onReconfigure, this)
    //},
    //onReconfigure: function ()
    //{ this.addExpander() },
    //addExpander: function () {
    //    this.grid.headerCt.insert(0, this.getHeaderConfig())
    //},
    //getHeaderId: function () {
    //    if (!this.headerId) { this.headerId = Ext.id() } return this.headerId
    //},
    //getRowBodyFeatureData: function (data, idx, record, orig) {
    //    var o = Ext.grid.feature.RowBody.prototype.getAdditionalData.apply(this, arguments), id = this.columnId; o.rowBodyColspan = o.rowBodyColspan - 1; o.rowBody = this.getRowBodyContents(data); o.rowCls = this.recordsExpanded[record.internalId] ? '' : this.rowCollapsedCls; o.rowBodyCls = this.recordsExpanded[record.internalId] ? '' : this.rowBodyHiddenCls; o[id + '-tdAttr'] = ' valign="top" rowspan="2" '; if (orig[id + '-tdAttr']) { o[id + '-tdAttr'] += orig[id + '-tdAttr'] } return o
    //},
    //bindView: function () {
    //    var view = this.getCmp().getView(), viewEl; if (!view.rendered) { view.on('render', this.bindView, this, { single: true }) } else { viewEl = view.getEl(); if (this.expandOnEnter) { this.keyNav = Ext.create('Ext.KeyNav', viewEl, { 'enter': this.onEnter, scope: this }) } if (this.expandOnDblClick) { view.on('itemdblclick', this.onDblClick, this) } this.view = view }
    //},
    //onEnter: function (e) {
    //    var view = this.view, ds = view.store, sm = view.getSelectionModel(), sels = sm.getSelection(), ln = sels.length, i = 0, rowIdx; for (; i < ln; i++) { rowIdx = ds.indexOf(sels[i]); this.toggleRow(rowIdx) }
    //},
    //toggleRow: function (rowIdx) {
    //    var view = this.view, rowNode = view.getNode(rowIdx), row = Ext.get(rowNode), nextBd = Ext.get(row).down(this.rowBodyTrSelector), record = view.getRecord(rowNode), grid = this.getCmp(); if (row.hasCls(this.rowCollapsedCls)) { row.removeCls(this.rowCollapsedCls); nextBd.removeCls(this.rowBodyHiddenCls); this.recordsExpanded[record.internalId] = true; view.refreshSize(); view.fireEvent('expandbody', rowNode, record, nextBd.dom) } else { row.addCls(this.rowCollapsedCls); nextBd.addCls(this.rowBodyHiddenCls); this.recordsExpanded[record.internalId] = false; view.refreshSize(); view.fireEvent('collapsebody', rowNode, record, nextBd.dom) }
    //},
    //onDblClick: function (view, cell, rowIdx, cellIndex, e) { this.toggleRow(rowIdx) },
    getHeaderConfig: function () {
        var me = this, toggleRow = Ext.Function.bind(me.toggleRow, me), selectRowOnExpand = me.selectRowOnExpand;
        return {
            //id: this.getHeaderId(),
            width: 24,
            sortable: false,
            resizable: false,
            draggable: false,
            hideable: false,
            menuDisabled: true,
            cls: Ext.baseCSSPrefix + 'grid-header-special',
            renderer: function (value, metadata, a) {
                //log("value", value);
                //log("metadata", metadata);
                //log("a", a);
                var fieldFound = false;
                try {
                    for (var field in a.data) {
                        if (field == "ItemGroupId") {
                            fieldFound = true;
                        }
                    }

                    if (fieldFound) {
                        var it = a.data.ItemGroupId;
                        if (it != null) {
                            metadata.tdCls = Ext.baseCSSPrefix + 'grid-cell-special';
                            return '<div class="' + Ext.baseCSSPrefix + 'grid-row-expander">&#160;</div>';
                        }
                        else {

                        }
                    }
                    else {
                        metadata.tdCls = Ext.baseCSSPrefix + 'grid-cell-special';
                        return '<div class="' + Ext.baseCSSPrefix + 'grid-row-expander">&#160;</div>';
                    }
                } catch (e) {
                    metadata.tdCls = Ext.baseCSSPrefix + 'grid-cell-special';
                    return '<div class="' + Ext.baseCSSPrefix + 'grid-row-expander">&#160;</div>';
                }
                //return '<div class="' + Ext.baseCSSPrefix + 'grid-row-expander">&#160;</div>'
            },
            processEvent: function (type, view, cell, recordIndex, cellIndex, e) {
                if (type == "mousedown" && e.getTarget('.x-grid-row-expander')) {
                    var row = e.getTarget('.x-grid-row');
                    toggleRow(row); return selectRowOnExpand
                }
            }
        }
    }
});