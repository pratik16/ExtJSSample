Ext.define('Regardz.controller.configuration.FixedPricePackages', {
    extend: 'Ext.app.Controller',
    views: ['configuration.FixedPricePackages'],
    stores: ['configuration.FixedPriceManageStore'],

    refs: [{
        ref: 'FixedPriceManagePackages',
        selector: 'FixedPriceManagePackages'
    }],
    //FixedPriceManageEventsController: false,

    init: function () {

        this.control({

            'button[action="tree"]': {
                click: function () {
                    //alert('tree');

                }
            }

        });
    }

});
