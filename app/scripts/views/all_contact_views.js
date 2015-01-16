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
