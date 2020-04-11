import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as AnimalCrossingNewHorizionsStore from '../store/AnimalCrossingNewHorizions';

// At runtime, Redux will merge together...
type AnimalCrossingNewHorizonsProps =
  AnimalCrossingNewHorizionsStore.AnimalCrossingNewHorizonsState // ... state we've requested from the Redux store
  & typeof AnimalCrossingNewHorizionsStore.actionCreators // ... plus action creators we've requested

class FetchData extends React.PureComponent<AnimalCrossingNewHorizonsProps> {
  // This method is called when the component is first added to the document
  public componentDidMount() {
    this.ensureDataFetched();
  }

  // This method is called when the route parameters change
  public componentDidUpdate() {
    this.ensureDataFetched();
  }

  public render() {
    return (
      <React.Fragment>
        <h1 id="tabelLabel">Fish Prices</h1>
        <p>Animal Crossing New Horizons Fish Data</p>
        {this.renderForecastsTable()}
        {this.renderPagination()}
      </React.Fragment>
    );
  }

  private ensureDataFetched() {
    console.log(this.props);
    if (this.props.isLoading) {
      return;
    }

    if (!this.props.fish || !this.props.fish[0]) {
      this.props.requestPrices();
    }
  }

  private renderForecastsTable() {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Available</th>
          </tr>
        </thead>
        <tbody>
          {this.props.fish.map((fish: AnimalCrossingNewHorizionsStore.Items) =>
            <tr key={fish.name}>
              <td>{fish.name}</td>
              <td><img src={fish.imageURL} alt={fish.name} /></td>
              <td>{fish.price}</td>
              <td>{fish.available ? 'Yes' : 'No'}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  private renderPagination() {
    return (
      <div className="d-flex justify-content-between">
        <Link className='btn btn-outline-secondary btn-sm' to={`/acnh`}>Refresh</Link>
        {this.props.isLoading && <span>Loading...</span>}
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.acnh, // Selects which state properties are merged into the component's props
  AnimalCrossingNewHorizionsStore.actionCreators // Selects which action creators are merged into the component's props
)(FetchData as any);
