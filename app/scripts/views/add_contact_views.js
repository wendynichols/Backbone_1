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
