(function () {

  App.Collections.Contacts = Backbone.Collection.extend({
    model: App.Models.Contact,
    url: 'https://tiy-atl-fe-server.herokuapp.com/collections/wendysContacts'
  });

}());
