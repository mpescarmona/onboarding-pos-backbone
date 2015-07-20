define('CategoryListView', [
  'jquery',
  'underscore',
  'backbone',
  'moment',
  'text!modules/category/templates/index.html',
  'CategoryCollection'
], function($, _, Backbone, moment, tpl, CategoryCollection) {
  var CategoryListView;

  CategoryListView = Backbone.View.extend({
    initialize: function() {
      var categoryList;

      this.template = _.template(tpl);
      this.collection = new CategoryCollection();
    },
    getData: function(callback) {
      this.collection.fetch({
        success: function(collection) {
          callback(collection);
        },
        error: function(coll, res) {
          if (res.status === 404) {
            // TODO: handle 404 Not Found
          } else if (res.status === 500) {
            // TODO: handle 500 Internal Server Error
          }
        }
      });
    },
    // render template after data refresh
    render: function(callback) {
      var that = this, tmpl;

      this.getData(function(collection) {
        tmpl = that.template({ categories: collection.toJSON() });
        $(that.el).html(tmpl);

        callback();
      });
    }
  });

  return CategoryListView;
});
