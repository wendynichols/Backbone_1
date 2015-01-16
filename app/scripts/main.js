(function () {

  App.contacts = new App.Collections.Contacts();

  App.contacts.fetch().done( function () {
    App.router = new App.Routers.AppRouter();

  });

}());
