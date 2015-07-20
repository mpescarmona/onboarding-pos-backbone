define('CategoryEditView', [
  'jquery',
  'underscore',
  'backbone',
  'moment',
  'text!modules/category/templates/edit.html',
  'CategoryModel'
], function($, _, Backbone, moment, tpl, Category) {
  var CategoryEditView;

  CategoryEditView = Backbone.View.extend({
    initialize: function() {
      this.template = _.template(tpl);

      this.errTmpl  = '<div class="span4">';
      this.errTmpl += '<div class="alert alert-error">';
      this.errTmpl += '<button type="button" class="close" data-dismiss="alert">x</button>';
      this.errTmpl += '<%- msg %>';
      this.errTmpl += '</div>';
      this.errTmpl += '</div>';
      this.errTmpl = _.template(this.errTmpl);
    },
    events: {
      "focus .input-prepend input" : "removeErrMsg",
      "click .save-btn"            : "saveCategory",
      "click .back-btn"            : "goBack"
    },
    render: function() {
      var tmpl, formattedDate = ' ', bornAttr;

      // bornAttr = this.model.get('born');
      // formattedDate = moment(new Date(bornAttr)).format("MM/DD/YYYY");

      tmpl = this.template({ category: this.model.toJSON() });
      $(this.el).html(tmpl);

      return this;
    },
    goBack: function(e) {
      e.preventDefault();
      this.trigger('back');
    },
    saveCategory: function(e) {
      var categoryName, that;

      e.preventDefault();

      that    = this;
      categoryName    = $.trim($('#name-input').val());

      this.model.save({
        categoryName    : categoryName
      }, {
        silent  : false,
        sync    : true,
        success : function(model, res) {
          if (res && res.errors) {
            that.renderErrMsg(res.errors);
          } else {
            model.trigger('save-success', model.get('id'));
          }
        },
        error: function(model, res) {
          if (res && res.errors) {
            that.renderErrMsg(res.errors);
          } else if (res.status === 404) {
            // TODO: handle 404 Not Found
          } else if (res.status === 500) {
            // TODO: handle 500 Internal Server Error
          }
        }
      });
    },
    renderErrMsg: function(err) {
      var msgs = [];

      this.removeErrMsg();

      if (_.isString(err)) {
        msgs.push(err);
      } else {
        if (err.general) {
          msgs.push(err.general);
          delete err.general;
        }
        if (_.keys(err).length) {
          msgs.push(_.keys(err).join(', ') + ' field(s) are invalid');
        }
      }
      msgs = _.map(msgs, function(string) {
        // uppercase first letter
        return string.charAt(0).toUpperCase() + string.slice(1);
      }).join('.');
      $(this.el).find('form').after(this.errTmpl({ msg: msgs }));
    },
    removeErrMsg: function() {
      $(this.el).find('.alert-error').remove();
    }
  });

  return CategoryEditView;
});
