Ext.define('Regardz.view.bookingwizard.RightSide.Windows.CompanyContract.PurchaseConditionsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.purchaseconditionslist',
    store: 'bookingwizard.RightSide.Windows.CompanyContract.PurchaseConditionsStore',
    loadMask: true,

    initComponent: function () {

        var me = this;
        me.autoHeight = true;

        me.itemid = "purchaseConditionsGrid";
        me.title = "Purchase Conditions".l("SC50300");
        me.height = 200;
        me.width = '100%';
        me.margin = '10';
        me.noResize = true;

        me.columns = [
                { header: 'Property', dataIndex: 'PropertyName', flex: 1, width: 175 },
                { header: 'Invoice'.l('SC50300'), dataIndex: 'DiscountInvoice', renderer: this.renderPercent, width: 75 },
                { header: 'Room'.l('SC50300'), dataIndex: 'DiscountRoomHire', renderer: this.renderPercent, width: 75 },
                { header: 'Items'.l('SC50300'), dataIndex: 'DiscountItems', renderer: this.renderPercent, width: 75 },

                { header: 'DiscountAV'.l('SC50300'), dataIndex: 'DiscountAV', renderer: this.renderPercent, width: 75 },
                { header: 'DiscountFB'.l('SC50300'), dataIndex: 'DiscountFB', renderer: this.renderPercent, width: 75 },
                { header: 'DiscountBedroom'.l('SC50300'), dataIndex: 'DiscountBedroom', renderer: this.renderPercent, width: 75 },
                { header: 'Fixed Price Packages'.l('SC50300'), renderer: this.renderFixed, width: 100, name: 'fixedpackagedetailswindow' },
                { header: 'Fixed Price Item'.l('SC50300'), renderer: this.renderFixedItems, width: 75, name: 'fixedpriceitemswindow' },
                { header: 'Kick Back'.l('SC50300'), renderer: this.renderKickBack, width: 75, name: 'kickbackdetailswindow' },
                { header: 'Commision'.l('SC50300'), renderer: this.renderComission, width: 75, name: 'commissiondetailswindow' },
                { header: 'Fixed Bar'.l('SC50300'), renderer: this.renderFixedBar, width: 75, name: 'fixedbardetailswindow' },
                { header: 'Fixed room prices'.l('SC50300'), renderer: this.renderFixedRoomPrice, width: 75, name: 'fixedroompricedetailswindow', renderer: this.renderFixedRoomPrice, align: 'right' },
                { header: 'Bedroom Price'.l('SC50300'), dataIndex: 'BedroomPrice', width: 75, renderer: this.renderFormat },
                { hidden: true, dataIndex: 'PropertyIdValue', hideable: false }
		];

        me.callParent();
    },
    renderPercent: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value != null)
            return value + " %";
    },
    renderFixed: function (value, metadata, record, rowIndex, colIndex, store) {
        if (record.data.IsFixedPackage == 1) {
            metadata.css = metadata.css + ' searchIcon';
        }
    },
    renderFixedItems: function (value, metadata, record, rowIndex, colIndex, store) {
        if (record.data.IsFixedPriceItems == 1) {
            metadata.css = metadata.css + ' searchIcon';
        }
    },
    renderKickBack: function (value, metadata, record, rowIndex, colIndex, store) {
        if (record.data.IsKickBack == 1) {
            metadata.css = metadata.css + ' searchIcon';
        }
    },
    renderComission: function (value, metadata, record, rowIndex, colIndex, store) {
        if (record.data.IsComission == 1) {
            metadata.css = metadata.css + ' searchIcon';
        }
    },
    renderFixedBar: function (value, metadata, record, rowIndex, colIndex, store) {
        if (record.data.IsFixedBarPrice == 1) {
            metadata.css = metadata.css + ' searchIcon';
        }
    },
    renderFixedRoomPrice: function (value, metadata, record, rowIndex, colIndex, store) {
        if (record.data.IsFixedRoomPrice == 1) {
            metadata.css = metadata.css + ' searchIcon';
        }
    },
    renderFormat: function (value, metadata, record, rowIndex, colIndex, store) {
        return Ext.util.Format.number(value, '0,000.00'); ;
    }
});