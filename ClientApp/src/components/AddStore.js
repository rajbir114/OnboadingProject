import React, { Component } from 'react';


export class Store {
    constructor() {
        this.id = 0;
        this.name = "";
        this.address = "";

    }
}

export class AddStore extends Component {
    constructor(props) {
        super(props);

        this.state = { title: "", store: new Store(), loading: true };
        this.initialize();

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    async initialize() {
        var id = this.props.match.params["id"];
        if (id > 0) {
            const response = await fetch('/api/store' + id);
            const data = await response.json();
            this.setState({ title: "Edit", store: data, loading: false });
        }
        else {
            this.state = { title: "Create", store: new Store(), loading: false };
        }
    }



    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Store.renderCreateForm(this.state.stores);
        return (
            <div>
                <h1>{Store.state.title}</h1>
                <h3>Stores</h3>
                <hr />
                {contents}
            </div>
        );
    }


    hadleSave(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        if (this.state.product.id) {
            var response1 = fetch('/store/' + this.state.store.id, { method: 'PUT', body: data });
            this.props.history.push('/stores');
        }
        else {
            var response2 = fetch('/store/', { method: 'POST', body: data });
            this.props.history.push('/stores');
        }
    }

    handleCancel(event) {
        event.preventDefault();
        this.prop.history.push('/stores');
    }

    renderCreateForm() {
        return (
            <form onSubmit={this.handleSave}>
                <div className="form-group row">
                    <input type="hidden" name="id" value={this.state.store.id} />
                </div>
                <div className="form-group row">
                    <label className="control-label col-med-12" htmlFor="name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.store.name} required />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="control-label col-med-12" htmlFor="address">Address</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="address" defaultValue={this.state.store.address} required />
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

