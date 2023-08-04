import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Sale extends Component {
    static displayName = Sale.name;

    constructor(props) {
        super(props);
        this.state = { sales: [], loading: true };
    }

    componentDidMount() {
        this.populateSalesData();
    }

    static renderSalesTable(sales) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>ProductId</th>
                        <th>CustomerId</th>
                        <th>StoreId</th>
                        <th>DateSold</th>

                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale =>
                        <tr key={sale.id}>

                            <td>{sale.id}</td>
                            <td>{sale.productid}</td>
                            <td>{sale.customerid}</td>
                            <td>{sale.storeid}</td>
                            <td>{sale.datesold}</td>
                            <td>
                                <button className="btn btn-success" onClick={(id) => this.handleEdit(sale.id)}>Edit</button>&nbsp;
                                <button className="btn btn-danger" onClick={(id) => this.handleDelete(sale.id)}>Delete</button>&nbsp;
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
            : Sale.renderSalesTable(this.state.sales);
        return (
            <div>
                <h1 id="tabelLabel">Sales</h1>
                <p>This component demonstrates fetching data from the server.</p>
                <p>
                    <Link to="/add-sale">Create New Sale</Link>
                </p>
                {contents}
            </div>
        );
    }

    async populateSalesData() {
        const response = await fetch('sale');
        const data = await response.json();

        this.setState({ sales: data, loading: false });
    }

    handleEdit(id) {
        this.props.history.push('/sale/edit/' + id);
    }

    handleDelete(id) {
        if (!window.confirm("Do You Want To Delete Sale With Id : " + id)) {
            return;
        }
        else {
            fetch('sale' + id, { method: 'delete' })
                .then(data => {
                    this.setState({
                        sales: this.state.filter((rec) => {
                            return (rec.id !== id);
                        })
                    });
                });
        }
    }
}