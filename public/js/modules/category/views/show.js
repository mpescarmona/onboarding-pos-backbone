define('CategoryView', [
  'jquery',
  'underscore',
  'backbone',
  'moment',
  'text!modules/category/templates/show.html',
  'CategoryModel'
], function($, _, Backbone, moment, tpl, Category) {
  var CategoryView;

  CategoryView = Backbone.View.extend({
    initialize: function() {
      this.template = _.template(tpl);
    },
    events: {
      "click .delete-btn": "removeCategory"
    },
    render: function() {
      var that = this, tmpl;

      tmpl = that.template({ category: this.model.toJSON() });
      $(that.el).html(tmpl);

      return this;
    },
    removeCategory: function(e) {
      e.preventDefault();

      this.model.destroy({
        sync: true,
        success: function(model) {
          model.trigger('delete-success');
        },
        error: function(model, res) {
          if (res.status === 404) {
            // TODO: handle 404 Not Found
          } else if (res.status === 500) {
            // TODO: handle 500 Internal Server Error
          }
        }
      })
    }
  });

  return CategoryView;
});
