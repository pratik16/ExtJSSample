Ext.define('Regardz.view.bookingwizard.InfoPanelLeftView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.infopanelleftview',
    store: 'bookingwizard.InfoLeftPanelStore',
    itemid: 'itemMultipleDatesGrid',
    loadMask: true,


    initComponent: function () {
        var me = this;
        me.noResize = true;
        me.border = false;
        me.bodyStyle = 'background: none';
        autoHeight = true;

        me.columns = [
            { header: 'Date'.l('SC52000'), dataIndex: 'EventDateName', width: 120 },
            { header: '', dataIndex: 'Date', width: 120, hidden: true },
            { header: '', dataIndex: 'IsRoomSelected', width: 20, renderer: this.renderIcon }
        ];


        me.callParent();
    },
    renderIcon: function (value, metadata, record, rowIndex, colIndex, store) {
        // set the icon for the cells metadata tags
        if (value == 1) {
            metadata.css = metadata.css + ' icon-checked';
        } else {
            metadata.css = metadata.css + ' icon-rightArrow';
        }

        // add an individual qtip/tooltip over the icon with the real value
        metadata.attr = 'ext:qtip="' + (value) + '"';

        return '&nbsp;';
    }
});
