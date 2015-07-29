define('CategoryModel', [
  'jquery',
  'underscore',
  'backbone',
  'WsConfig'
], function($, _, Backbone, wsConfig) {
  var Category;

  Category = Backbone.Model.extend({
    urlRoot: wsConfig.wsBaseUrl() + "/onboarding-pos-demo/ws/category",
    // set defaults for checking existance in the template for the new model
    defaults: {
      categoryName    : ''
    },
    validate: function(attrs) {
      var fields, i, len, nameLen, compLen, errors = {};

      /**
       * HACK: don't validate when silent is passed as an attribute
       * Useful when fetching model from server only by id
       */
      if (!attrs._silent) {
        // check required fields
        fields = ['categoryName'];
        for (i = 0, len = fields.length; i < len; i++) {
          if (!attrs[fields[i]]) {
            errors[fields[i]] = fields[i] + ' required';
          }
        }

        // check valid name
        categoryNameLen = (attrs.categoryName) ? attrs.categoryName.length : null;
        if (categoryNameLen < 2 || categoryNameLen > 100) {
          errors.name = "invalid name";
        }

        // check valid company
        // compLen = (attrs.company) ? attrs.company.length : null;
        // if (!compLen || (compLen < 7 || compLen > 100)) {
        //   errors.company = "invalid company";
        // }

        // check valid email
        // if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(attrs.email))) {
        //   errors.email = "invalid email";
        // }

        if (_.keys(errors).length) {
          return {
            errors: errors
          };
        }
      }

    }
  });

  return Category;
});
