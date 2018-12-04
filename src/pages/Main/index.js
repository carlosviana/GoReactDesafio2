import React, { Component } from "react";

import api from "../../services/api";
import moment from "moment";

import logo from "../../assets/logo.png";

import { Form, Container } from "./styles";

import CompareList from "../../components/CompareList";

export default class Main extends Component {
    state = {
        repositoryInut: "",
        repositories: [],
        repositoryError: false,
        loading: false
    };

    handleAddRepository = async e => {
        e.preventDefault();

        this.setState({ loading: true });

        try {
            const { data: repository } = await api.get(
                `/repos/${this.state.repositoryInut}`
            );

            repository.last_commit = moment(repository.pushed_at).fromNow();

            this.setState({
                repositoryInut: "",
                repositories: [...this.state.repositories, repository],
                repositoryError: false
            });
        } catch (err) {
            this.setState({ repositoryError: true });
        } finally {
            this.setState({ loading: false });
        }
    };

    render() {
        return (
            <Container>
                <img src={logo} alt="Git Compare" />
                <Form
                    withError={this.state.repositoryError}
                    onSubmit={this.handleAddRepository}
                >
                    <input
                        type="text"
                        placeholder="usuario/repositorio"
                        value={this.state.repositoryInut}
                        onChange={e =>
                            this.setState({ repositoryInut: e.target.value })
                        }
                    />
                    <button type="submit">
                        {this.state.loading ? (
                            <i className="fa fa-spinner fa-pulse" />
                        ) : (
                            "OK"
                        )}
                    </button>
                </Form>
                <CompareList repositories={this.state.repositories} />
            </Container>
        );
    }
}
