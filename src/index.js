import React from 'react/addons';
import TagsInput from 'react-tagsinput';

const TagsComponent = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState() {
    return {
      tags: []
    };
  },

  asyncValidate(tag, cb) {
    function validate(tag) {
      return tag !== 'bad';
    };

    setTimeout(function() {
      cb(validate(tag));
    }, 1000);

  },

  validate(tag, done) {
    var unique = this.state.tags.indexOf(tag) === -1;
    if (!unique) { return done(false); }
    this.asyncValidate(tag, function() {
      return done(true);
    });
  },

  render() {
    return (
      <TagsInput
        validate={this.validate}
        valueLink={this.linkState('tags')}
      />
    );
  }

});


const App = React.createClass({
  render() {
    return (
      <div>
        <h1>TagsInput Test</h1>
        <TagsComponent />
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));
