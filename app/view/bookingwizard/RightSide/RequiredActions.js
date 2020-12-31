Ext.define('Regardz.view.bookingwizard.RightSide.RequiredActions', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.rightrequiredactions',
    initComponent: function () {
        var me = this;
        me.layout = 'fit';
        me.items = [{
            xtype: 'requitredactionstree',
            itemid: 'requitredactionstree',
            layout: 'fit',
            frame: true,
            autoScroll: true
        }]
        me.callParent();

    },
    renderIcon: function (value, metadata, record, rowIndex, colIndex, store) {
        metadata.css = metadata.css + ' selectUser';
        var tooltipText = 'Go to event'.l('SC50000');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
    }
});