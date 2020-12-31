Ext.define('Regardz.controller.bookingwizard.BWContactList', {
    extend: 'Ext.app.Controller',
    views: ['bookingwizard.BWContactList', 'bookingwizard.BookingContactListWindow'],
    //store: 'demo.CustomDataStore',
    stores: ['bookingwizard.CompanyContactListStore'],
    init: function () {
        this.control(
      {
          'bwcontactlist': {
              afterrender: function () {
                  Ext.getStore('bookingwizard.CompanyContactListStore').load();
              }
          }
      });
    }


});