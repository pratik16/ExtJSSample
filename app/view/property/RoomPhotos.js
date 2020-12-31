Ext.define('Regardz.view.property.RoomPhotos', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.roomphotos',
    store: 'property.RoomPhotoListStore',
    loadMask: true,
    initComponent: function () {

        var me = this;
        // me.autoHeight = true;
        me.layout = "hbox";

        me.items = [
            {
                xtype: 'grid',
                noResize: true,
                frame: false,
                cls: 'gridwhitebackground',
                width: '50%',
                height: '90%',
                layout: 'fit',
                itemid: 'ProeprtyPhotoGallery',
                store: Ext.getStore('property.RoomPhotoListStore'),
                autoScroll: true,
                style: "margin: 10px 0 0 0px;",
                tbar: [{
                    xtype: 'button',
                    action: 'addRoomPhoto',
                    iconCls: 'new',
                    text: 'Add New'.l('SC33150'),
                    tooltip: 'Add new photo gallery'.l('SC33150'),
                    height: 21
                }, '->', {
                    xtype: 'button',
                    iconCls: 'filter',
                    disabled: true
                }, {
                    xtype: 'searchfield',
                    //xtype: 'textfield',
                    store: Ext.getStore('property.RoomPhotoListStore'),
                    iconCls: 'filter',
                    paramName: 'searchParam'
                }
                ],
                viewConfig: {
                    forceFit: true,
                    markDirty: false,
                    plugins: {
                        ptype: 'gridviewdragdrop'
                    },
                    listeners: {
                        drop: function (node, data, dropRec, dropPosition) {
   
                            var RoomId = data.records[0].data.RoomId;
                            var RoomPhotosId = data.records[0].data.RoomPhotosId;
                            var startSequence = data.records[0].data.Sequence;
                            var endSequence = dropRec.data.Sequence;

                            Ext.data.JsonP.request({
                                url: webAPI_path + 'api/room/UpdateRoomPhotoSequance',
                                type: "GET",
                                params: {
                                    id: RoomPhotosId,
                                    id1: RoomId,
                                    id2: startSequence,
                                    languageId: endSequence
                                },
                                success: function (r) {
                                    var ResultText = r.result;
                                    if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                        ResultText = ResultText.l("SP_DynamicCode");
                                    if (r.success == true) {
                                        Ext.getStore('property.RoomPhotoListStore').reload();
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
                    { header: 'Name'.l('SC33150'), dataIndex: 'PhotoTitle', flex: 1 },
                    { dataIndex: 'RoomPhotosId', renderer: this.editPhotoGallery, align: 'center', width: 25, name: 'RoomPhotoEdit', hideable: false },
                     { dataIndex: 'RoomPhotosId', renderer: this.previewPhoto, align: 'center', width: 25, name: 'RoomPhotoPreview', hideable: false },
                    { dataIndex: 'RoomPhotosId', renderer: this.detelePhotoGallery, align: 'center', width: 25, name: 'RoomPhotoDelete', hideable: false },
                    { hidden: true, dataIndex: 'RoomPhotosId', align: 'center', hideable: false }
                ]
            },
            {
                xtype: 'container',
                width: '49%',
                style: "margin: 10px 0 0 10px;",
                height: '90%',
                //border: 1,
                items: [
                    {
                        xtype: 'panel',
                        title: 'Preview'.l('SC33150')
                    },
                    {
                        xtype: 'image',
                        title: 'Preview'.l('SC33150'),
                        height: '90%',
                        width: '100%',
                        style: "border: 1px solid",
                        itemid: 'roomPhotoThumb',
                        alias: 'roomPhotoThumb',
                        src: ''
                    }
                ]
            }
        ]

        me.callParent();
    },
    editPhotoGallery: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Update photo gallery".l('SC33150');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.css = 'icon-edit';
    },

    viewPhotoGallery: function (value, metadata, record, rowIndex, colIndex, store) {
        metadata.css = 'icon-e';
    },

    detelePhotoGallery: function (value, metadata, record, rowIndex, colIndex, store) {

        var tooltipText = "Delete photo gallery".l('SC33150');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.css = 'icon-delete';
    },

    previewPhoto: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Preview Photo".l('SC33150');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.css = 'searchIcon';
    }

});