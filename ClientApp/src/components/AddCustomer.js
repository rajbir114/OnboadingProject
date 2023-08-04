import React, { Component } from 'react';


export class Customer {
    constructor() {
        this.id = 0;
        this.name = "";
        this.address = "";

    }
}

export class AddCustomer extends Component {
    constructor(props) {
        super(props);

        this.state = { title: "", customer: new Customer(), loading: true };
        this.initialize();

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    async initialize() {
        var id = this.props.match.params["id"];
        if (id > 0) {
            const response = await fetch('customer' + id);
            const data = await response.json();
            this.setState({ title: "Edit", customer: data, loading: false });
        }
        else {
            this.state = { title: "Create", customer: new Customer(), loading: false };
        }
    }



    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Customer.renderCreateForm(this.state.customers);
        return (
            <div>
                <h1>{Customer.state.title}</h1>
                <h3>Customers</h3>
                <hr />
                {contents}
            </div>
        );
    }


    hadleSave(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        if (this.state.customer.id) {
            var response1 = fetch('/customer/' + this.state.customer.id, { method: 'PUT', body: data });
            this.props.history.push('/customers');
        }
        else {
            var response2 = fetch('/customer/', { method: 'POST', body: data });
            this.props.history.push('/customers');
        }
    }

    handleCancel(event) {
        event.preventDefault();

        this.prop.history.push('/customers');
    }

    renderCreateForm() {
        return (
            <form onSubmit={this.handleSave}>
                <div className="form-group row">
                    <input type="hidden" name="id" value={this.state.customer.id} />
                </div>
                <div className="form-group row">
                    <label className="control-label col-med-12" htmlFor="name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.customer.name} required />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="control-label col-med-12" htmlFor="address">Address</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="price" defaultValue={this.state.customer.price} required />
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

