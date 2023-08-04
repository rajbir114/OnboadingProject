import React, { Component } from 'react';

export class Sale {
    constructor() {
        this.id = 0;
        

    }
}

export class AddSale extends Component {
    constructor(props) {
        super(props);

        this.state = { title: "", sale: new Sale(), loading: true };
        this.initialize();

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    async initialize() {
        var id = this.props.match.params["id"];
        if (id > 0) {
            const response = await fetch('/api/sale' + id);
            const data = await response.json();
            this.setState({ title: "Edit", sale: data, loading: false });
        }
        else {
            this.state = { title: "Create", sale: new Sale(), loading: false };
        }
    }



    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Sale.renderCreateForm(this.state.sales);
        return (
            <div>
                <h1>{Sale.state.title}</h1>
                <h3>Sales</h3>
                <hr />
                {contents}
            </div>
        );
    }


    hadleSave(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        if (this.state.sale.id) {
            var response1 = fetch('/sale/' + this.state.sale.id, { method: 'PUT', body: data });
            this.props.history.push('/sales');
        }
        else {
            var response2 = fetch('/sale/', { method: 'POST', body: data });
            this.props.history.push('/sales');
        }
    }

    handleCancel(event) {
        event.preventDefault();

        this.prop.history.push('/sales');
    }

    renderCreateForm() {
        return (
            <form onSubmit={this.handleSave}>
                <div className="form-group row">
                    <input type="hidden" name="id" value={this.state.sale.id} />
                </div>
                <div className="form-group row">
                    <label className="control-label col-med-12" htmlFor="id">Id</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.sale.id} required />
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