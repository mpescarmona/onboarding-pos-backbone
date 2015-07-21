define('CategoryCollection', [
  'jquery',
  'underscore',
  'backbone',
  'CategoryModel',
  'WsConfig'
], function($, _, Backbone, Category, wsConfig) {
  var CategoryCollection;

  CategoryCollection = Backbone.Collection.extend({
    model : Category,
    url   : wsConfig.wsBaseUrl() + "/onboarding-pos-demo/ws/category",

    initialize: function () {
      var that = this;

      $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
        options.accept = "application/json";
        // options.crossDomain = {
        //   crossDomain: true
        // };
        // options.xhrFields = {
        //   withCredentials: true
        // };
      });
    }

  });

  return CategoryCollection;
});
