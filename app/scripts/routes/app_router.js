(function () {

  App.Routers.AppRouter = Backbone.Router.extend({

    initialize: function () {

      Backbone.history.start();
    },

    routes: {
      '' : 'home',
      'edit/:contactID' : 'editContact'

    },

    home: function () {
      new App.Views.AddContact();
      new App.Views.ListContact({ collection: App.contacts });

    },

    editContact: function (contactID) {

      var p = App.contacts.get(contactID);

      new App.Views.SingleContact({ contact: p });
    }

  });

}());
