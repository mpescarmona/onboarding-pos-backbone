define('CategoryCollection', [
  'jquery',
  'underscore',
  'backbone',
  'CategoryModel',
  'WsConfig'
], function($, _, Backbone, Category, config) {
  var CategoryCollection;

  // console.log(config.wsBaseUrl());

  CategoryCollection = Backbone.Collection.extend({
    model : Category,
    // url   : config.wsBaseUrl() + "/onboarding-pos-demo/ws/category",
    url   : "http://172.17.100.138:8080/onboarding-pos-demo/ws/category",

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
