Ext.define('Regardz.view.bookingwizard.MeetingSharableRoomsItems', {
    extend: 'Ext.grid.Panel',
    itemid: 'meetingItemsId',
    alias: 'widget.meetingsharableroomsitems',
    width: '100%',
    //store: 'bookingwizard.MeetingItemsStore',
    loadMask: true,
    viewConfig: {
        markDirty: false
    },

    padding: '10px 0 0 0',

    initComponent: function () {

        var me = this;
        me.noResize = true;
        me.frame = true;
        me.columns = [
             { header: 'Item'.l('SC54000'), dataIndex: 'Item', flex: 1 },
            { header: 'Start'.l('SC54000'), dataIndex: 'Start', flex: 1 },
            { header: 'End'.l('SC54000'), dataIndex: 'End', flex: 1 },
            { header: 'Price'.l('SC54000'), dataIndex: 'Price', flex: 1 },
            { header: 'Persons'.l('SC54000'), dataIndex: 'Persons', flex: 1 },
            { header: 'Quantity'.l('SC54000'), dataIndex: 'Quantity', flex: 1 },
            { header: 'Red.%'.l('SC54000'), dataIndex: 'RedPercent', flex: 1 },
            { header: 'Red.'.l('SC54000'), dataIndex: 'Red', flex: 1 },
            { header: 'Group name'.l('SC54000'), dataIndex: 'groupName', flex: 1 },
            { header: 'Total'.l('SC54000'), dataIndex: 'Total', flex: 1 },
            { dataIndex: 'ItemId', renderer: this.deteleItem, align: 'center', width: 25, name: 'ItemDelete', hideable: false },
            { dataIndex: 'ItemId', renderer: this.editItem, align: 'center', width: 25, name: 'ItemEdit', hideable: false },
            { hidden: true, dataIndex: 'ItemId', align: 'center', hideable: false }
        ];

        var buttonAdd = Ext.create('Ext.Button', {
            //id: 'button_add_sharable',
            scale: 'small',
            action: 'addItemButtonAction',
            iconCls: 'new',
            width: 25,
            iconAlign: 'left'
        });

        var buttonStatus = Ext.create('Ext.Button', {
            //id: 'button_status_sharable',
            scale: 'small',
            action: 'changeStatusButtonAction',
            iconCls: 'icon-signal',
            width: 20,
            iconAlign: 'left'
        });

        var buttonEditRemark = Ext.create('Ext.Button', {
           // id: 'button_edit_remark_sharable',
            scale: 'small',
            action: 'editRemarkButtonAction',
            iconCls: 'icon-documentadd',
            width: 20,
            iconAlign: 'left'
        });

        var buttonShareRooms = Ext.create('Ext.Button', {
            //id: 'button_share_rooms_sharable',
            scale: 'small',
            action: 'shareRoomButtonAction',
            iconCls: 'icon-sharable',
            width: 20,
            iconAlign: 'left'
        });

        var buttonEditEvent = Ext.create('Ext.Button', {
            //id: 'button_edit_event_sharable',
            scale: 'small',
            action: 'editEventButtonAction',
            iconCls: 'icon-edit',
            width: 20,
            iconAlign: 'left'
        });

        var buttonDelete = Ext.create('Ext.Button', {
            //id: 'button_delete_sharable',
            scale: 'small',
            action: 'deleteButtonAction',
            iconCls: 'icon-delete-item',
            width: 20,
            iconAlign: 'left'
        });


        me.tbar = [buttonAdd, buttonStatus, buttonEditRemark, buttonShareRooms, buttonEditEvent, buttonDelete];
        me.bbar = {
            xtype: 'pagingtoolbar',
            store: this.store,
            displayInfo: true,
            emptyMsg: "No data to display".l("g")
        };

        me.callParent();
    }
});