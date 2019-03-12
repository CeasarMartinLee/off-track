import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getWalks, getMeals, setError } from '../actions/walks';

class WalkListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    walks: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      walks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    fetchWalks: PropTypes.func.isRequired,
    fetchMeals: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
  }

  static defaultProps = {
    match: null,
  }

  componentDidMount = () => this.fetchWalks();

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchWalks = () => {
    const { fetchWalks, fetchMeals, showError } = this.props;
    return fetchWalks()
      .then(() => fetchMeals())
      .catch((err) => {
        console.log(`Error: ${err}`);
        return showError(err);
      });
  }

  render = () => {
    const { Layout, walks, match } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;
    console.log(this.props, '<========')
    return (
      <Layout
        walkId={id}
        error={walks.error}
        loading={walks.loading}
        walks={walks.walks}
        reFetch={() => this.fetchWalks()}
      />
    );
  }
}

const mapStateToProps = state => ({
  walks: state.walks || {},
});

const mapDispatchToProps = {
  fetchWalks: getWalks,
  fetchMeals: getMeals,
  showError: setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalkListing);
