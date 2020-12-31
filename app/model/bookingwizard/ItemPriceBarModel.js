Ext.define('Regardz.model.bookingwizard.ItemPriceBarModel', {
    extend: 'Ext.data.Model',
    fields: ['ItemId', 'ItemGroupId', 'BarId', 'Price',

    {
        name: 'FormattedText',
        mapping: 'BarId',
        convert: function (v, record) {
            var stringBar = "";
            switch (v) {
                case 1:
                    stringBar = 'A';
                    break;
                case 2:
                    stringBar = 'B';
                    break;
                case 3:
                    stringBar = 'C';
                    break;
                case 4:
                    stringBar = 'D';
                    break;
                default:

            }
            return stringBar + ' : ' + record.data.Price;
        }
    }],
    getFormattedText: function () {
        var bar = this.get('BarId');
        var stringBar = "";
        switch (bar) {
            case 1:
                stringBar = 'A';
                break;
            case 2:
                stringBar = 'B';
                break;
            case 3:
                stringBar = 'C';
                break;
            case 4:
                stringBar = 'D';
                break;
            default:

        }
        return stringBar + ":" + get('Price');
    }
});