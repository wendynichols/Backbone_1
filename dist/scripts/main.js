(function () {

  App.Models.Contact = Backbone.Model.extend({

    // className: 'Contact',

    idAttribute: '_id',

    defaults: {
      firstName: '',
      lastName: '',
      phone: '',
      email: ''
    },

    initialize: function() {
      var c = this.get('firstName');
      console.log(c + " has been added");

    }

  });

}());

(function () {

  App.Collections.Contacts = Backbone.Collection.extend({
    model: App.Models.Contact,
    url: 'https://tiy-atl-fe-server.herokuapp.com/collections/wendysContacts'
  });

}());

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

(function () {

  App.Views.AddContact = Backbone.View.extend({

    el: '#contactForm',

    events: {
      'submit #addContact' : 'addContact'
    },

    initialize: function(){
      this.render();
    },

    render: function(){
      this.$el.html($('#addContact').html());
    },

    addContact: function (e) {
      e.preventDefault();

      var per = new App.Models.Contact({
        firstName: $('#contact_firstName').val(),
        lastName: $('#contact_lastName').val(),
        phone: $('#contact_phone').val(),
        email: $('#contact_email').val()
      });

      App.contacts.add(per).save();

    }

  });
}());

(function () {


  App.Views.ListContact = Backbone.View.extend({

    tagName: 'ul',
    className: 'allContacts',

    events: {

      'click li' : 'gotoEdit'
    },

    template: _.template($('#allContacts').html()),



    initialize: function() {

      this.render();
      this.collection.on('sync', this.render, this);


      $('#contactList').html(this.$el);

    },

    render: function () {
      var self = this;

      this.$el.empty();

      this.collection.each(function (c) {
        self.$el.append(self.template(c.toJSON()));
      });

      return this;
    },

    gotoEdit: function (e) {
      e.preventDefault();

      var editID = $(e.currentTarget).attr('id');
      App.router.navigate('edit/'+editID, {trigger: true});
    }

  });


}());

(function () {

  App.Views.SingleContact = Backbone.View.extend({

    tagName: 'ul',
    className: 'contactSingle',

    events: {
      'submit #updateContact' : 'updateContact',
      'click #delete' : 'deleteContact'
    },

    template: _.template($('#updateContact').html()),

    initialize: function (options) {
      this.options = options;
      this.render();

      $('#contactForm').empty();
      $('#contactList').html(this.$el);
    },

    render: function () {

      this.$el.empty();
      this.$el.html(this.template(this.options.contact.toJSON()));

    },

    updateContact: function (e) {
      e.preventDefault();

      this.options.contact.set({
        firstName: $('#update_firstName').val(),
        lastName: $('#update_lastName').val(),
        phone: $('#update_phone').val(),
        email: $('#update_email').val()
      });


      this.options.contact.save();
      App.router.navigate('', {trigger: true});

    },

    deleteContact: function (e) {
      e.preventDefault();

      this.options.contact.destroy();

      App.router.navigate('', {trigger: true});

    }

  });

}());

(function () {

  App.contacts = new App.Collections.Contacts();

  App.contacts.fetch().done( function () {
    App.router = new App.Routers.AppRouter();

  });

}());
