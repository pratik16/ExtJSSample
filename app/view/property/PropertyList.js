Ext.define('Regardz.view.property.PropertyList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.propertylist',

    store: 'property.PropertyListStore',
    //renderTo: 'right_region', //
    requires: [
		'Ext.ux.form.SearchField'
	],
    initComponent: function () {

        var me = this;
        me.title = "Property List_Title".l('SC31000');
        me.remoteSort = true;
        me.columns = [
            {
                header: 'Act'.l('SC31000'),
                dataIndex: 'IsActive',
                renderer: this.IsActiveIcon,
                align: 'center',
                width: 25,
                name: 'IsActive'
            },
			{
			    header: 'Name'.l('SC31000'),
			    dataIndex: 'PropertyName',
			    flex: 1,
			    name: 'PropertyName'
			},
            {
                header: 'Abbiviation'.l('SC31000'),
                width: 75,
                dataIndex: 'Abbreviation',
                name: 'Abbreviation'
            },

             {
                 header: 'Postal Code'.l('SC31000'),
                 dataIndex: 'Postalcode',
                 width: 100,
                 align: 'center',
                 name: 'Postalcode'
             }, {
                 header: 'City'.l('SC31000'),
                 dataIndex: 'City',
                 width: 100,
                 align: 'center',
                 name: 'City'
             }, {
                 header: 'ABP'.l('SC31000'),
                 dataIndex: 'IsPartner',
                 width: 25,
                 align: 'center',
                 name: 'ABP',
                 renderer: this.ABPIcon
             }, {
                 header: 'Score'.l('SC31000'),
                 dataIndex: 'ReviewScore',
                 width: 75,
                 align: 'center',
                 name: 'ReviewScore',
                 renderer: this.decimalComma
             }, {
                 dataIndex: 'PropertyId',
                 renderer: this.editproperty,
                 align: 'center',
                 width: 25,
                 name: 'PropertyEdit'
             }, {
                 dataIndex: 'PropertyId',
                 renderer: this.deleteProperty,
                 align: 'center',
                 width: 25,
                 name: 'deleteProperty'
             },

        //             {
        //				dataIndex : 'PropertyId',
        //				renderer : this.propertymap,
        //				align : 'center',
        //				width : 25,
        //				name : 'PropertyMap'
        //			}, {
        //				dataIndex : 'IsActive',
        //				renderer : this.propertystatus,
        //				align : 'center',
        //				width : 25,
        //				name : 'PropertyStatusChange'
        //            },

             {
             hidden: true,
             dataIndex: 'PropertyId'
         }];

        me.tbar = [{
            xtype: 'button',
            iconCls: 'new',
            text: 'Add new'.l('SC31000'),
            tooltip: 'Add New Property'.l('SC31000'),
            action: 'addNewProperty'
        },
			'->', {
			    xtype: 'button',
			    iconCls: 'filter',
			    disabled: true
			}, {
			    xtype: 'searchfield',
			    store: Ext.getStore('property.PropertyListStore'),
			    iconCls: 'filter',
			    paramName: 'searchParam'
			}
		];
        me.layout = 'fit';
        me.autoScroll = true;
        me.autoExpandColumn = 'PropertyName';
        me.height = 250;
        me.viewConfig = {
            forceFit: true
        };

        me.bbar = {
            xtype: 'pagingtoolbar',
            store: this.store,
            //pageSize: 5,
            displayInfo: true,
           // displayMsg: 'Displaying topics {0} - {1} of {2}',
            emptyMsg: "No topics to display".l('g')
        };

        me.callParent();
    },

    partnericn: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value == true)
            metadata.tdCls = 'icon-yes';
        else
            metadata.tdCls = 'icon-no';
    },

    editproperty: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Edit Property".l('SC31000');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-edit';
    },

    propertymap: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = 'Map'.l('SC31000');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-map';
    },

    propertyvideo: function (value, metadata, record, rowIndex, colIndex, store) {
        metadata.tdCls = 'icon-video';
    },

    propertyfloorplan: function (value, metadata, record, rowIndex, colIndex, store) {
        metadata.tdCls = 'icon-floorplan';
    },

    propertyphotos: function (value, metadata, record, rowIndex, colIndex, store) {
        metadata.tdCls = 'icon-propertyphoto';
    },

    propertystatus: function (value, metadata, r, rowIndex, colIndex, store) {

        if (value == true) {
            var tooltipText = 'De Activate'.l('SC31000');
            metadata.tdCls = 'icon-active';
        } else {
            var tooltipText = 'Activate'.l('SC31000');
            metadata.tdCls = 'icon-deactive';
        }

        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';

    },
    ABPIcon: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value == true)
            metadata.tdCls = 'icon-yes';
    },

    IsActiveIcon: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value == true)
            metadata.tdCls = 'icon-yes';
    },

    deleteProperty: function (value, metadata, record, rowIndex, colIndex, store) {
        //var tooltipText = "Property delete is not functional yet as its depeneds on Booking section";
        var tooltipText = "Delete Property".l('SC31000');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-delete';
    },

    decimalComma: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value != null)
            return String(value).replace('.', Ext.util.Format.decimalSeparator);
        else
            return '0';
    }
});