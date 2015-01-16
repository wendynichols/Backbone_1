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
