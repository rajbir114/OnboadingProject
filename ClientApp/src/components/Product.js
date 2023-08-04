import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Product extends Component {
    static displayName = "Products";

    constructor(props) {
        super(props);
        this.state = { products:[], loading: true };
    }

    componentDidMount() {
        this.populateProductsData();
    }

    static renderProductsTable(products) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product =>
                        <tr key={product.id}>
                          
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                                <button className="btn btn-success" onClick={(id) => this.handleEdit(product.id)}>Edit</button>&nbsp;
                                <button className="btn btn-danger" onClick={(id) => this.handleDelete(product.id)}>Delete</button>&nbsp;
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
            : Product.renderProductsTable(this.state.products);
        return (
            <div>             
                <h1 id="tabelLabel">Products</h1>
                <p>This component demonstrates fetching data from the server.</p>
                <p>
                    <Link to="/add-product">Create New Product</Link>
                </p>
                {contents}    
            </div>
        );
    }

    async populateProductsData() {
        const response = await fetch('product');
        const data = await response.json();

        this.setState({ products: data, loading: false });
    }

    handleEdit(id) {
        this.props.history.push('/product/edit' + id);
    }

    handleDelete(id) {
        if (!window.confirm("Do You Want To Delete Product With Id : " + id)) {
            return;
        }
        else {
            fetch('product' + id, { method: 'delete' })
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