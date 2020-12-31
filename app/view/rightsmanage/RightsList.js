Ext.namespace("Ext.ux");
Ext.require([	
	'Ext.ux.CheckColumn'
]);

	Ext.define('Regardz.view.rightsmanage.RightsList', {
	    extend: 'Ext.grid.Panel',
	    alias: 'widget.rightslist',
	    store: 'rightsmanage.RightsListStore',
	    requires: ['Ext.ux.form.SearchField'],
	    loadMask: true,
	    columnLines: true,
	    viewConfig: {
	        forceFit: true
	    },
	    //plugins: [editorType],
	    //plugins : [rowEditing],

	    initComponent: function () {

	        var me = this;

	        me.rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
	            clicksToMoveEditor: 1,
	            autoCancel: false,
	            listeners: {
	                afteredit: {
	                    fn: function (roweditor, obj, data, rowindex) {
	                        $.ajax({
	                            url: webAPI_path + 'api/RoleRight/UpdateActivityDisplayName',
	                            type: 'POST',
	                            data: obj.newValues, //obj.originalValues
	                            complete: function (response) {
	                                var res = Ext.decode(response.responseText);
	                                if (res.data == true) {
	                                    Ext.Msg.alert('Success'.l('g'), 'Updated successfully.'.l('g'));
	                                }
	                                if (res.data == "false") {
	                                    var win = Ext.WindowManager.getActive();
	                                    Ext.Msg.alert('Error'.l('g'), 'Try again.'.l('g'));
	                                }
	                            }
	                        });
	                    }
	                }
	            }
	        });

	        me.plugins = [me.rowEditing];
	        //me.title = "Rights List_Title".l('SC33000');
	        me.title = "Rights List";
	        me.columns = [{
	            header: 'Activity Name'.l('SC33000'),
	            dataIndex: 'ActivityName',
	            flex: 1
	        }, {
	            header: 'Description'.l('SC33000'),
	            dataIndex: 'Description',
	            flex: 1
	        }, {
	            header: 'DisplayName'.l('SC33000'),
	            dataIndex: 'DisplayName',
	            flex: 1,
	            editor: {
	                allowBlank: false
	            }
	        },
	        //{ dataIndex: 'ActivityId', renderer: this.editDisplayName, align: 'center', width: 25, name: 'EditDisplayName', hideable: false },
			{
			hidden: true,
			dataIndex: 'ActivityId',
			align: 'center',
			hideable: false
}
		];

	        /*me.tbar = [
	        '->', {
	        xtype: 'button',
	        iconCls: 'filter',
	        disabled: true
	        },{
	        xtype: 'searchfield',
	        store: Ext.getStore('rightsmanage.RightsListStore'),
	        iconCls: 'filter',
	        paramName: 'searchString'
	        }
	        ];*/

	        me.layout = 'fit';
	        me.autoScroll = true;

	        //me.autoExpandColumn = 'PropertyName';
	        me.height = 250;
	        me.viewConfig = {
	            forceFit: true
	        };

	        me.bbar = {
	            xtype: 'pagingtoolbar',
	            store: me.store,
	            displayInfo: true
	        };

	        me.callParent();
	    },

	    editDisplayName: function (value, metadata, record, rowIndex, colIndex, store) {
	        var tooltipText = "Update Dispay Name".l('SC33000');
	        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
	        metadata.tdCls = 'icon-edit';
	    }

	});