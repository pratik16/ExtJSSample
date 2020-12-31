Ext.define('Regardz.view.usermanage.ActivitiesListView', {
	extend : 'Ext.grid.Panel',
	//extend: 'Ext.window.Window',
	alias : 'widget.activitieslistview',

	store : 'usermanage.ActivitiesListViewStore',
	//renderTo: 'right_region', //
	requires : [
		'Ext.ux.form.SearchField'
	],
	initComponent : function () {
		var me = this;

		me.columns = [
			{
				header : 'Activity Name'.l('SC32210'),
				dataIndex : 'ActivityName',
				flex : 1,
				name : 'ActivityName'
			},
			{
				header : 'Description'.l('SC32210'),
				dataIndex : 'Description',
				width : 200,
				align : 'left',
				name : 'Description'
			}, {
				header : 'DisplayName'.l('SC32210'),
				dataIndex : 'DisplayName',
				align : 'left',
				width : 200,
				name : 'DisplayName'
			}
		];

		me.layout = 'fit';
		me.autoScroll = true;

		me.height = 250;
		me.viewConfig = {
			forceFit : true
		};

		me.bbar = {
			xtype : 'pagingtoolbar',
			store : this.store,
			//pageSize: 5,
			displayInfo : true,
			//displayMsg : 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No data to display".l('g')
		};

		me.callParent();

	}
});