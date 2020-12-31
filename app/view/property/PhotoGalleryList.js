Ext.define('Regardz.view.property.PhotoGalleryList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.photogallerylist',
    store: 'property.PhotoGalleryListStore',
    loadMask: true,
    uses: ['Regardz.view.common.RadioRow'],
    initComponent: function () {

        var me = this;
        // me.autoHeight = true;
        me.layout = "hbox";

        me.childHeight = parseInt(parseInt(Ext.getCmp('propertyEditWindow').getHeight() - gridHeaderHeight) * (0.98));

        me.items = [
            {
                xtype: 'grid',
                frame: true,
                width: '48%',
                height: '98%',
                layout: 'fit',
                itemid: 'ProeprtyPhotoGallery',
                store: Ext.getStore('property.PhotoGalleryListStore'),
                autoScroll: true,
                style: "margin: 10px 0 0 0px;",
                tbar: [{
                    xtype: 'button',
                    action: 'addPhotoGallery',
                    iconCls: 'new',
                    text: 'Add New'.l('SC31500'),
                    tooltip: 'Add new photo gallery'.l('SC31500'),
                    height: 21
                }, '->', {
                    xtype: 'button',
                    iconCls: 'filter',
                    disabled: true
                }, {
                    xtype: 'searchfield',
                    //xtype: 'textfield',
                    store: Ext.getStore('property.PhotoGalleryListStore'),
                    iconCls: 'filter',
                    paramName: 'searchParam'
                }
                //                ,
                //                {
                //                    xtype: 'button',
                //                    action: 'searchString',
                //                    text: 'OK'
                //                }
                ],
                viewConfig: {
                    forceFit: true,
                    markDirty: false,
                    plugins: {
                        ptype: 'gridviewdragdrop'
                    },
                    listeners: {
                        drop: function (node, data, dropRec, dropPosition) {

                            //console.log("start = " + data.records[0].data.Sequence + "\n end=" + dropRec.data.Sequence);

                            var PropertyId = data.records[0].data.PropertyId;
                            var PhotoGalleryId = data.records[0].data.PhotoGalleryId;
                            var startSequence = data.records[0].data.Sequence;
                            var endSequence = dropRec.data.Sequence;

                            Ext.data.JsonP.request({
                                url: webAPI_path + 'api/photogallery/UpdatePhotoSequance',
                                type: "GET",
                                params: {
                                    id: PhotoGalleryId,
                                    id1: PropertyId,
                                    id2: startSequence,
                                    languageId: endSequence
                                },
                                success: function (r) {
                                    var ResultText = r.result;
                                    if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                        ResultText = ResultText.l("SP_DynamicCode");
                                    // var r = jsonDecode(response);
                                    if (r.success == true) {
                                        Ext.getStore('property.PhotoGalleryListStore').reload();
                                    } else {
                                        Ext.Msg.alert('Error'.l('g'), ResultText);
                                    }
                                },
                                failure: function () { }
                            })
                        }
                    }
                },
                columns: [
                    { header: 'Photo Title'.l('SC31500'), dataIndex: 'PhotoTitle', name: 'PhotoTitle', flex: 1 },
                    { header: 'Description'.l('SC31500'), dataIndex: 'Description', name: 'Description' },
                    { header: 'CoverPhoto'.l('SC31500'), dataIndex: 'IsCoverPhoto', name: 'IsCoverPhoto', align: 'center', width: 50, xtype: 'radiorow' },
                    { header: 'Rotation'.l('SC31500'), dataIndex: 'IsRotate', name: 'IsRotate', align: 'center', width: 50, xtype: 'checkboxrow' },
                    { dataIndex: 'PropertyId', renderer: this.editPhotoGallery, align: 'center', width: 25, name: 'PhotoGalleryEdit', hideable: false },
                     { dataIndex: 'PropertyId', renderer: this.previewPhoto, align: 'center', width: 25, name: 'PhotoPreview', hideable: false },
                    { dataIndex: 'PropertyId', renderer: this.detelePhotoGallery, align: 'center', width: 25, name: 'PhotoGalleryDelete', hideable: false },
                    { dataIndex: 'IsActive', renderer: this.photoStatus, align: 'center', width: 25, name: 'PhotoStatusChange', hidden: true },
                    { hidden: true, dataIndex: 'PhotoGalleryId', align: 'center', hideable: false }
                ]
            },
            {
                xtype: 'panel',
                width: '48%',
                title: 'Preview'.l('SC31500'),
                style: "margin: 15px 0 0 20px;",
                height: me.childHeight,
                // style: 'border: 1px solid',
                // layout: 'fit',
                items: [
                    {
                        xtype: 'panel',
                        height: parseInt(me.childHeight * (0.7)),
                        style: 'border: 1px solid;vertical-align: middle;',
                        resizable: false,
                        items: [
                            {
                                xtype: 'container',
                                items: [
                                    {
                                        xtype: 'image',
                                        title: 'Preview'.l('SC31500'),
                                        width: '100%',
                                        itemid: 'imageThumb',
                                        alias: 'imageThumb',
                                        src: ''
                                        //src : 'http://www.sencha.com/img/20110215-feat-html5.png'
                                    }
                                     
                                ]
                            }
                        ]
                    },

                    {
                        xtype: 'container',
                        height: parseInt(me.childHeight * (0.05))
                    },

                    {
                        xtype: 'fieldset',
                        title: 'Description',
                        height: parseInt(me.childHeight * (0.15)),
                        items: [
                            {
                                xtype: 'displayfield',
                                autoScroll: true,
                                name: 'description'
                            }
                        ]
                    }
                ]
            }
        ]


        me.callParent();
    },
    UpdatePhotoSequanceUp: function (value, metadata, record, rowIndex, colIndex, store) {
        var up = 'Move Up';
        if (record.data.Sequence == 1) {
            if (record.data.aps_type != 'APP')
                return "<img src='public/icons/arrow_up_blue.png' title='" + up + "' style='opacity:0.4;filter:alpha(opacity=40);'>";
        }
        else {
            if (record.data.aps_type != 'APP')
                return "<img src='public/icons/arrow_up_blue.png' title='" + up + "' style='cursor:pointer'>";
        }
    },
    UpdatePhotoSequanceDown: function (value, metadata, record, rowIndex, colIndex, store) {

        var down = 'Move Down';
        if (record.data.Sequence == (store.getTotalCount())) {
            if (record.data.aps_type != 'APP')
                return "<img src='public/icons/arrow_down_blue.png' title='" + down + "' style='opacity:0.4;filter:alpha(opacity=40);'>";
        }
        else {
            if (record.data.aps_type != 'APP')
                return "<img src='public/icons/arrow_down_blue.png' title='" + down + "' style='cursor:pointer'>";
        }
    },
    IsCoverPhoto: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value == true)
            metadata.css = 'icon-tick';
        else
            metadata.css = 'icon-untick';
    },

    IsRotate: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value == true)
            metadata.css = 'icon-tick';
        else
            metadata.css = 'icon-untick';
    },
    photoStatus: function (value, metadata, r, rowIndex, colIndex, store) {
        if (value == true) {
            var tooltipText = 'De Activate'.l('SC31500');
            metadata.css = 'icon-active';
        }
        else {
            var tooltipText = 'Activate'.l('SC31500');
            metadata.css = 'icon-deactive';
        }

        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';

    },
    editPhotoGallery: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Update photo gallery".l('SC31500');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.css = 'icon-edit';
    },

    viewPhotoGallery: function (value, metadata, record, rowIndex, colIndex, store) {
        metadata.css = 'icon-e';
    },

    detelePhotoGallery: function (value, metadata, record, rowIndex, colIndex, store) {

        var tooltipText = "Delete photo gallery".l('SC31500');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.css = 'icon-delete';
    },

    previewPhoto: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Preview Photo".l('SC31500');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.css = 'searchIcon';
    }

});