import React, { Component } from 'react';


export class Product extends Component {
    static displayName = Product.name;

    constructor(props) {
        super(props);
        this.state = { products: [], loading: true };
    }
}

export class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", product: new Product(), loading: true };
        this.initialize();
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    async initialize() {
        var id = this.props.match.params["id"];
        if (id > 0) {

            const response = await fetch('/product' + id);
            const data = await response.json();
            this.setState({ title: "Edit", product: data, loading: false });
        }
        else {
           this.state = { title: "Create", product: new Product(), loading: false };
        }
    }

   

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Product.renderCreateForm(this.state.products);
        return (
            <div>
                <h1>{Product.state.title}</h1>
                <h3>Products</h3>
                <hr/>
                {contents}
            </div>
        );
    }


    hadleSave(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        if (this.state.product.id) {
            var response1 = fetch('product' + this.state.product.id, { method: 'PUT', body: data });
            this.props.history.push('products');
        }
        else {
            var response2 = fetch('product', { method: 'POST', body: data });
            this.props.history.push('products');
        }
    }

    handleCancel(event) {
        event.preventDefault();
        this.prop.history.push('products');
    }

    renderCreateForm() {
        return (
            <form onSubmit={this.handleSave}>
                <div className="form-group row">
                    <input type="hidden" name="id" value={this.state.product.id} />
                </div>
                <div className="form-group row">
                    <label className="control-label col-med-12" htmlFor="name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.product.name} required />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="control-label col-med-12" htmlFor="price">Price</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="price" defaultValue={this.state.product.price} required />
                    </div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-success">Save</button>
                    <button className="btn btn-danger" onClick={this.handleCancel}>Cancel</button>
                </div>
            </form>
        );
    }
}