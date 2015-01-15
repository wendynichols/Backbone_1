(function () {

  App.Models.Contact = Backbone.Model.extend({

    // className: 'Contact',

    idAttribute: '_id',

    defaults: {
      firstName: '',
      lastName: '',
      phone: '',
      city: '',
      state: ''
    },

    initialize: function() {
      var c = this.get('title');
      console.log(c + " has been added");

    }

  });

}());
