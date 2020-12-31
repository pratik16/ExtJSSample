Ext.define('Regardz.view.property.RoomPriceandRevenueList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.roompriceandrevenuelist',
    loadMask: true,
    initComponent: function () {
        var me = this;
        // me.layout = "hbox";

        /*Its prevent to reload grid from resize function from common file*/
        me.noResize = true;

        me.height = parseInt(Ext.getBody().getViewSize().height * (0.75));
        me.title = "Room Price and Revenue_Title".l('SC31070');
        me.frame = true;
        me.style = "padding: 25px;";
        me.items = [{
            xtype: 'panel',
            layout: 'hbox',
            height: me.height - 15,
            items: [{
                xtype: 'grid',
                frame: true,
                title: 'Room Prices'.l('SC31070'),
                itemid: 'roompricelist',
                noResize: true,
                width: '48%',
                height: '95%',
                store: Ext.getStore('property.RoomPriceStore'),
                autoScroll: true,
                style: "margin: 10px 0 0 0px;",
                viewConfig: {
                    forceFit: true
                },
                tbar: [{
                    xtype: 'button',
                    action: 'addRoomPrice',
                    iconCls: 'new',
                    text: 'Add New'.l('SC31070'),
                    tooltip: 'Add room price'.l('SC31070'),
                    height: 21
                }],
                columns: [{
                    header: 'Start Date'.l('SC31070'),
                    dataIndex: 'StartDate',
                    flex: 0.5,
                    renderer: this.dateRenderer
                }, {
                    header: 'End Date'.l('SC31070'),
                    dataIndex: 'EndDate',
                    flex: 0.5,
                    align: 'center',
                    hideable: false,
                    renderer: this.dateRenderer
                }, {
                    dataIndex: 'PropertyId',
                    renderer: this.editRoomPrice,
                    align: 'center',
                    width: 25,
                    name: 'RoomPriceEdit',
                    hideable: false
                }]
            }, {
                xtype: 'tbspacer',
                width: 10
            }, {
                xtype: 'grid',
                frame: true,
                title: 'Minimum Revenue'.l('SC31070'),
                itemid: 'minimumrevenuelist',
                noResize: true,
                width: '48%',
                height: '95%',
                store: Ext.getStore('property.MinimumRevenueStore'),
                autoScroll: true,
                style: "margin: 10px 0 0 0px;",
                viewConfig: {
                    forceFit: true
                },
                tbar: [{
                    xtype: 'button',
                    action: 'addMinimumRevenue',
                    iconCls: 'new',
                    text: 'Add New'.l('SC31070'),
                    tooltip: 'Add minimum revenue'.l('SC31070'),
                    height: 21
                }],
                columns: [{
                    header: 'Start Date'.l('SC31070'),
                    dataIndex: 'StartDate',
                    flex: 0.5,
                    renderer: this.dateRenderer
                }, {
                    header: 'End Date'.l('SC31070'),
                    dataIndex: 'EndDate',
                    flex: 0.5,
                    align: 'center',
                    hideable: false,
                    renderer: this.dateRenderer
                }, {
                    dataIndex: 'PropertyId',
                    renderer: this.editMinimumRevenue,
                    align: 'center',
                    width: 25,
                    name: 'MinimumRevenueEdit',
                    hideable: false
                }]
            }]
        }]

        me.callParent();
    },

    editRoomPrice: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Edit Room Price".l('SC31070');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.css = 'icon-edit';
    },

    editMinimumRevenue: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Edit Minimum Revenue".l('SC31070');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.css = 'icon-edit';
    },

    dateRenderer: function (value, metadata, record, rowIndex, colIndex, store) {
        var d = Ext.Date.parse(value, 'c');
        return Ext.util.Format.date(d, usr_dateformat);
    }
});