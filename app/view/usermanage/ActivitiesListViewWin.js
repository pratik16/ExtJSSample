Ext.define('Regardz.view.usermanage.ActivitiesListViewWin', {
	extend : 'Ext.window.Window',
	alias : 'widget.activitieslistwin',

	store : 'usermanage.ActivitiesListStore',

	requires : ['Regardz.view.usermanage.ActivitiesListView'],
	initComponent : function () {
		var me = this;
		me.title = "Activities View_Title".l('SC32210');
		me.width = 650;
		me.layout = 'fit';
		Ext.apply(me, {
			items : [{
					layout : 'fit',
					width : me.windowWidth,
					xtype : 'activitieslistview'
				}
			]
		});
		me.callParent();
	}
});