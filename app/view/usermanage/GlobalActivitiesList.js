Ext.define('Regardz.view.usermanage.GlobalActivitiesList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.globalactivitieslist',
    store: 'usermanage.GlobalActivitiesStore',
    loadMask: true,
    requires: ['Ext.ux.form.SearchField'],
    width: '100%',
    frame: false,
    autoScroll: true,
    noResize: true,

    initComponent: function () {
        var me = this;
        me.title = 'Global activities'.l('SC32210');
        me.layout = 'fit';
        me.columns = [
                { width: 25, renderer: this.renderIcon },
                { header: 'Activity Name'.l('SC32210'), dataIndex: 'DisplayName', flex: 1, renderer: this.renderIsGlobal },
                { hidden: true, dataIndex: 'ActivityId' }
        ];
        me.callParent();
    },
    renderIcon: function (value, metadata, record, rowIndex, colIndex, store) {
        metadata.tdCls = 'icon-rights-g';
    },
    renderIsGlobal: function (value, metadata, record, rowIndex, colIndex, store) {
        return value + ' [G]';
    }
});
