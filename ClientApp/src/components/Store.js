import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Store extends Component {
    static displayName = Store.name;

    constructor(props) {
        super(props);
        this.state = { stores: [], loading: true };
    }

    componentDidMount() {
        this.populateStoreData();
    }

    static renderStoresTable(stores) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Address</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {stores.map(store =>
                        <tr key={store.id}>
                            <td>{store.id}</td>
                            <td>{store.name}</td>
                            <td>{store.address}</td>
                            <td>
                                <button className="btn btn-success" onClick={(id) => this.handleEdit(store.id)}>Edit</button>&nbsp;
                                <button className="btn btn-danger" onClick={(id) => this.handleDelete(store.id)}>Delete</button>&nbsp;
                            </td>  
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Store.renderStoresTable(this.state.stores);

        return (
            <div>
                <h1 id="tabelLabel" >Store</h1>
                <p>This component demonstrates fetching data from the server.</p>
                <p>
                    <Link to="/add-store">Add New Store</Link>
                </p>
                {contents}
            </div>
        );
    }

    async populateStoreData() {
        const response = await fetch('store');
        const data = await response.json();
        this.setState({ stores: data, loading: false });
    }
}
