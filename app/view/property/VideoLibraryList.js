Ext.define('Regardz.view.property.VideoLibraryList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.videolibrarylist',
    store: 'property.VideoLibraryListStore',
    loadMask: true,

    initComponent: function () {

        var me = this;
        me.height = parseInt(Ext.getBody().getViewSize().height * (0.75));

        me.layout = "hbox";

        /*Its prevent to reload grid from resize function from common file*/
        me.noResize = true;

        me.items = [
            {
                xtype: 'grid',
                frame: true,
                noResize: true,
                width: '48%',
                height: parseInt(Ext.getBody().getViewSize().height * (0.65)),
                layout: 'fit',
                itemid: 'videolibrarygrid',
                store: Ext.getStore('property.VideoLibraryListStore'),
                autoScroll: true,
                style: "margin: 10px 0 0 0px;",
                viewConfig: {
                    forceFit: true,
                    plugins: {
                        ptype: 'gridviewdragdrop'
                    },
                    listeners: {
                        drop: function (node, data, dropRec, dropPosition) {

                            //console.log("start = " + data.records[0].data.Sequence + "\n end=" + dropRec.data.Sequence);

                            var PropertyId = data.records[0].data.PropertyId;
                            var VideoDetailId = data.records[0].data.VideoDetailId;
                            var startSequence = data.records[0].data.Sequence;
                            var endSequence = dropRec.data.Sequence;

                            Ext.data.JsonP.request({
                                url: webAPI_path + 'api/PropertyVideoDetail/UpdateVideoSequance',
                                type: "GET",
                                params: {
                                    id: VideoDetailId,
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
                                        Ext.getStore('property.VideoLibraryListStore').reload();
                                    } else {
                                        Ext.Msg.alert('Error'.l('g'), ResultText);
                                    }
                                },
                                failure: function () { }
                            })

                        }
                    }
                },
                tbar: [{
                    xtype: 'button',
                    action: 'addVideoLibrary',
                    iconCls: 'new',
                    text: 'Add New'.l('SC31300'),
                    tooltip: 'Add Video Library'.l('SC31300'),
                    height: 21
                }, '->', {
                    xtype: 'button',
                    iconCls: 'filter',
                    disabled: true
                }, {
                    xtype: 'searchfield',
                    store: Ext.getStore('property.VideoLibraryListStore'),
                    iconCls: 'filter',
                    paramName: 'searchParam'
                }],
                columns: [
                //                    { renderer: this.UpdateVideoSequanceUp, name: 'UpdateVideoSequance', align: 'center', width: 25, hideable: false },
                //                    { renderer: this.UpdateVideoSequanceDown, name: 'UpdateVideoSequance', align: 'center', width: 25, hideable: false },
                    {header: 'Video Name'.l('SC31300'), dataIndex: 'VideoName', name: 'VideoName', flex: 1 },
                    { header: 'Youtube URL'.l('SC31300'), dataIndex: 'youtubeIFramURL', name: 'youtubeIFramURL' },
                    { dataIndex: 'PropertyId', renderer: this.editVideoLibrary, align: 'center', width: 25, name: 'VideoLibraryEdit' },
                    { dataIndex: 'PropertyId', renderer: this.previewVideoLibrary, align: 'center', width: 25, name: 'VideoLibraryPreview' },
                    { dataIndex: 'PropertyId', renderer: this.deteleVideoLibrary, align: 'center', width: 25, name: 'VideoLibraryDelete' },
                    { dataIndex: 'IsActive', hidden: true, renderer: this.videoStatus, align: 'center', width: 25, name: 'VideoStatusChange' },
                    { hidden: true, dataIndex: 'VideoDetailId', align: 'center' }
                ],
                bbar: {
                    xtype: 'pagingtoolbar',
                    store: this.store,
                    displayInfo: true,
                    displayMsg: 'Displaying topics {0} - {1} of {2}',
                    emptyMsg: "No topics to display".l('g')
                }
            },
            {
                xtype: 'container',
                width: '48%',
                style: ";margin: 10px 0 0 20px;",
                height: '90%',
                //border: 1,
                items: [
                    {
                        xtype: 'panel',
                        title: 'Preview'//,
                        //width: parseInt(Ext.getBody().getViewSize().width * (0.45))
                    },
                    {
                        xtype: 'container',
                        itemid: 'youtubeViewer',
                        title: 'Preview',
                        style: "border: 1px solid",
                        height: parseInt(Ext.getBody().getViewSize().height * (0.60)),
                        width: '100%'//,
                        //html: Pohon.ux.YouTubeUtils.embedCode('VejBNaBmeAM', parseInt(Ext.getBody().getViewSize().width * (0.40)), parseInt(Ext.getBody().getViewSize().height * (0.60)))
                    }
                ]
            }
        ]

        me.callParent();
    },
    UpdateVideoSequanceUp: function (value, metadata, record, rowIndex, colIndex, store) {
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
    UpdateVideoSequanceDown: function (value, metadata, record, rowIndex, colIndex, store) {
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
    videoStatus: function (value, metadata, r, rowIndex, colIndex, store) {
        if (value == true) {
            var tooltipText = 'De Activate'.l('SC31300');
            metadata.css = 'icon-active';
        }
        else {
            var tooltipText = 'Activate'.l('SC31300');
            metadata.css = 'icon-deactive';
        }

        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';

    },

    editVideoLibrary: function (value, metadata, record, rowIndex, colIndex, store) {

        var tooltipText = "Update Video Library".l('SC31300');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.css = 'icon-edit';
    },

    deteleVideoLibrary: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Delete Video Library".l('SC31300');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.css = 'icon-delete';
    },

    previewVideoLibrary: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Preview Video".l('SC31300');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.css = 'searchIcon';
    }

});