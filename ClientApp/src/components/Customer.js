import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Customer extends Component {
    static displayName = Customer.name;

    constructor(props) {
        super(props);
        this.state = { customers: [], loading: true };
    }

    componentDidMount() {
        this.populateCustomerData();
    }

    static renderCustomerssTable(customers) {
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
                    {customers.map(customer =>
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.address}</td>
                            <td>
                                <button className="btn btn-success" onClick={(id) => this.handleEdit(customer.id)}>Edit</button>&nbsp;
                                <button className="btn btn-danger" onClick={(id) => this.handleDelete(customer.id)}>Delete</button>&nbsp;
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
            : Customer.renderCustomerssTable(this.state.customers);

        return (
            <div>
                <h1 id="tabelLabel" >Customers</h1>
                <p>This component demonstrates fetching data from the server.</p>
                <p>
                    <Link to="/add-customer">Add New Customer</Link>
                </p>
                {contents}
            </div>
        );
    }

    async populateCustomerData() {
        const response = await fetch('customer');
        const data = await response.json();
        this.setState({ customers: data, loading: false });
    }

    handleEdit(id) {
        this.props.history.push("/customers/edit/" + id);
    }
    handleDelete(id) {
        if (!window.confirm("Do You Want To Delete Product With Id : " + id)) {
            return;
        }
        else {
            fetch('api/customer/' + id, { method: 'delete' })
                .then(data => {
                    this.setState({
                        products: this.state.filter((rec) => {
                            return (rec.id !== id);
                        })
                    });
                });
        }
    }

}
