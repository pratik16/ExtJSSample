Ext.define('Regardz.view.bookingwizard.RightSide.Windows.CompetitorInfoWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.competitorinfowindow',
    modal: true,
    border: false,
    title: 'Competitor info_Title'.l('SC50800'),
    iconCls: 'info_icon',
    width: '100%',
    height: 400,
    initComponent: function () {

        var me = this;

        me.itemid = 'competitorinfo';
        me.width = '40%';


        me.items = [{
            xtype: 'label',
            text: 'Still to be determined in another release'.l('SC50800')
        }];


        me.callParent(arguments);
    }
});